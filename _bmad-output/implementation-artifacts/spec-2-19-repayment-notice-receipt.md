---
title: 'Story 2.19 - record evidenced repayment notice receipt (Test slice)'
type: 'feature'
created: '2026-10-28'
status: 'done'
route: 'dispatch'
review_loop_iteration: 1
context: []
baseline_commit: 'backend a2b633318572b42e133299fd4a7bbaa49fae38aa; frontend fa61c5df8888a947eee7d87f2e59d4d45e7b4185'
---

<frozen-after-approval reason="Story 2.19 in epics.md; user decision 28 Oct 2026">

## Intent

**Problem:** FR-14 needs an auditable debt clock. A day-5 reminder and day-7 due date must start only from evidence that the owner actually received the repayment notice. Story 2.18 creates repayment links but records no receipt.

**User decision (28 Oct 2026):** receipt = the earliest of three events:
- the owner views the notice in the signed-in portal;
- the owner presses Acknowledge;
- a finance admin confirms actual receipt with a reason and the receipt time.

The day-5 reminder is shown in the portal only. No SMS or email.

## Boundaries & Constraints

**Always:**
- One notice per `owner_recovery`, not per link. Creating, replacing or closing a link is never receipt and never resets the clock.
- `received_at` = the earliest recorded evidence time. `reminder_at = received_at + 5 days` and `due_at = received_at + 7 days` are stored columns (durable for Story 2.20).
- Every evidence event is appended to an append-only event table: type (`portal_view`, `owner_ack`, `admin_confirmed`), time, actor, evidence (jsonb: session id / user agent for owner events, reason for admin) and request key.
- Later evidence that is earlier than the current `received_at` moves the milestones earlier. This is audited (audit_log before/after), bumps `version`, and never resets the debt, changes amounts, or cancels stays. Later evidence that is not earlier changes no milestone and is still appended.
- Owner view and ack are recorded only from an authenticated owner request for their own notice, by explicit POST. A GET never records evidence.
- Admin confirm: `admin.payments.write`, `{receivedAt, reason 10-500, expectedVersion, requestKey}`. `receivedAt` must be at or after the first link's creation and not in the future.
- Idempotent: the same requestKey with the same payload replays; a changed payload gives `IDEMPOTENCY_CONFLICT`; a stale version gives `NOTICE_CHANGED`.
- A notice exists only once a link exists. A recovery fully recovered still keeps its notice history.

**Never:**
- No SMS, email or push. Nothing blocks bookings here (Story 2.20).
- A notice is never counted as received because a link or message was sent.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Link created, nothing seen | notice issued, `received_at` null, no milestones |
| Owner views panel (POST view) | received via portal_view, reminder +5d, due +7d |
| Owner acks after view | event appended, milestones unchanged |
| Admin confirms receipt earlier than view | milestones move earlier, audit row, version+1 |
| Admin confirms later than current | event appended, milestones unchanged |
| Link replaced | notice and milestones unchanged |
| Replay view/ack/confirm | one event, same outcome |
| Admin receivedAt in future / before issue | 422 |
| Another owner POSTs view/ack | 404 |
| Non-finance admin confirms | 403 |
| GET /partner/repayments | no event recorded |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- `drizzle/0081_owner_repayment.sql` -- link table. Read only.
- New `drizzle/0082_owner_repayment_notice.sql` plus journal idx 82:
  - `owner_repayment_notice` with: `id`; `recovery_id` unique; `owner_id` (composite FK to `owner_recovery(id, owner_id)` like 0081); `issued_at`; `received_at`; `received_via`; `reminder_at`; `due_at`; `version`; `updated_at`.
  - `owner_repayment_notice_event` with: `id`; `notice_id`; `type`; `occurred_at`; `actor_kind`; `actor_id`; `evidence` jsonb; `request_key`; `request_hash`; `created_at`; unique(notice_id, actor_kind, actor_id, request_key).
  - Append-only triggers blocking UPDATE, DELETE and TRUNCATE, as in 0080.
- `src/services/finance/owner-repayment.js:125` `createRepaymentLink` -- in the same transaction, insert the notice on the first link (`ON CONFLICT (recovery_id) DO NOTHING`). Lock order is `owner_recovery` first.
- `src/services/finance/owner-repayment.js:196` `listOwnerRepayments` -- add per-recovery `notice {receivedAt, reminderAt, dueAt, acknowledged, reminderDue (now >= reminder_at), version}`. Read only.
- New `src/services/finance/owner-repayment-notice.js`:
  - `recordOwnerNoticeEvent(db, owner, recoveryId, type, {requestKey}, ctx)` for `portal_view` or `owner_ack`;
  - `confirmNoticeReceipt(db, actor, sourceId, input)` for the admin;
  - a shared `applyEvidence(tx, notice, at)` that moves milestones only earlier and writes audit_log on change.
  - Reuse `authorize` from `payout-modes.js`.
- Routes:
  - partner POST `/repayments/notices/:recoveryId/view` and `/ack` (`partner.route.js` near :503, requireActiveClient);
  - admin POST `/payments/owner-recoveries/:sourceId/notice-receipt` (`admin.route.js` near :363).
  - All noStore.
  - Admin list and preview rows (`owner-recovery.js`) gain `notice`.
- Test: new `test/integration/owner-repayment-notice.integration.test.js` covering every matrix row. Build on the setup in `owner-repayment.integration.test.js`.

Frontend (`Rentra`):
- `components/partner/earnings/RepaymentDue.jsx`:
  - On mount, for each notice with no receipt yet, call the view action once (per page load; ref guard).
  - Show "Reminder: due on {date} (Test)" once `reminderDue`, otherwise "Due on {date}".
  - Add an Acknowledge button (44px) with pending and error states.
- `components/admin/OwnerRecoveries.jsx` -- show received time and via, reminder and due dates, and a "Confirm receipt (Test)" dialog (datetime-local, reason) with one kept request key per row.
- `lib/actions/partner.js`, `lib/actions/hotel-finance.js`, `lib/api/endpoints.js`.

## Tasks & Acceptance

- [x] migration 0082 + journal; `npm run db:check`
- [x] backend service, link-create hook, list fields, routes
- [x] backend test, every matrix row
- [x] frontend owner view/ack, admin confirm

**Acceptance Criteria:**
- Given a created link with no owner or admin evidence, when the notice is read, then `due_at` is null.
- Given any recorded evidence, when events are listed, then each has a type, time and evidence, and none can be updated or deleted.

## Verification

- In `rentra-backend`, never against Neon: `PORTAL_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres CP01_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres DATABASE_URL=postgres://nobody@127.0.0.1:1/never node --import ./loader/register.mjs --env-file=.env --test --test-concurrency=1 "test/**/*.test.js"`. All pass (baseline 411). Never run db:migrate. Do not commit.
- Frontend `npm test` (baseline 136), targeted eslint/prettier, `git diff --check`.

## Implementation Notes

- `reminder_at`/`due_at` are stored; a CHECK keeps them null or exactly +5d/+7d from `received_at`.
- The notice is issued in the same transaction as the first link (`ON CONFLICT DO NOTHING`); replace/close never touches it.
- Lock order: `owner_recovery` first, then the notice, on every path.
- The owner panel POSTs `view` once per page load (ref guard); a failed view retries when the list or route changes.
- Links created before 0082 get a notice only when a new link is created.
- Admin `receivedAt` is read in the browser's time zone and sent as ISO; display is Asia/Kolkata.

## Review Triage Log

- Review 1: 0 high, 6 medium (two lock-order breaks, stale receipt body reused on retry, invalid date crash, SSR/client time-zone mismatch x2), 1 question (audit actor 'client': valid enum), 2 low. All fixed.
- Closure: CLOSED; one comment wording fixed.

## Results

- Backend 419/419 on local PostgreSQL (DATABASE_URL unreachable); frontend 136/136; `db:check` 83; `git diff --check` clean; targeted ESLint/Prettier clean.
- Migration 0082 added; 0076-0082 unapplied on Neon.
- Not run: browser QA.
