---
title: 'Story 2.17 - assign owner recovery after funded guest refunds (Test fixture slice)'
type: 'feature'
created: '2026-10-28'
status: 'done'
route: 'dispatch'
review_loop_iteration: 2
context: []
---

<frozen-after-approval reason="Story 2.17 in epics.md; user decision 28 Oct 2026: Test-only fixture slice, like 2.13">

## Intent

**Problem:** FR-14 needs the owner's outstanding refund responsibility to be recorded after Rentra refunds a guest whose rent was already paid out to the owner. Nothing records it today.

Real payouts cannot produce such a debt. The funds cap (0009 `rentra_reconcile_payment`) refuses the refund, and Story 2.15 marks those stays `FUNDS_ALREADY_PAID_OUT`. A "Rentra-funded refund" has no source of funds, because funding is unset (Story 2.13).

Test payout fixtures (0078) sit outside the cap, so a guest refund after a succeeded fixture does complete.

**Approach (user decision, 28 Oct 2026):** a Test-only slice.
- Verified owner proceeds = a `payout_transfer_fixture` in `succeeded` state.
- A finance admin previews and assigns the owner's ordinary obligation for that source. Assigning is versioned and audited.
- Real funding, real payouts and owner terms/accounting stay gated.

## Boundaries & Constraints

**Always:**
- Integer paise. The environment is always `test`, and every label says Test.
- **Obligation** for one fixture source (one rent allocation):
  - `paidMinor` = the fixture `expected_minor`.
  - `refundedAfterMinor` = the sum of `actual_minor` of `succeeded` rent refund allocations on that source, created after the fixture's `verified_at`.
  - `obligationMinor = min(paidMinor, refundedAfterMinor) - recoveredMinor` (recovered is 0 until Story 2.18).
  - Fee, tax and deposit refunds are excluded. Rentra's fee is not the owner's.
- `reservedMinor` = rent refunds after the fixture that are still `requested`, `processing` or `unknown`. They are shown separately and are never part of the obligation.
- Preview and assign are bound by a hash, `expectedVersion` and `requestKey`. A replay returns the recorded outcome; a changed payload gives `IDEMPOTENCY_CONFLICT`; a stale hash or version gives `RECOVERY_CHANGED` with nothing written.
- Assigning again after the numbers change updates the row: version +1, an append-only adjustment row (before, after, actor, reason) and an audit_log entry.
- Permission is `admin.payments.write` (read: `admin.payments.read`). Another role gets 403 or 404.

**Never:**
- No real money, no payment link, no owner bank debit.
- Never touch any guest refund or payout row. Never offset future payouts.
- Nothing on the owner side yet (Story 2.18 sends the notice).
- No change to the funds cap or the 0078 guard.

## I/O & Edge-Case Matrix

| Scenario | State | Expected |
|---|---|---|
| Full refund after succeeded fixture | fixture 9000, rent refunds after 9000 succeeded | obligation 9000 |
| Partial | refunds after 4000 succeeded | 4000 |
| Refund before fixture only | refunds before the fixture | not a candidate (0) |
| Fee refunded too | fee refund 500 succeeded | excluded, obligation stays rent-only |
| Uncertain refund | rent refund `processing` after fixture | obligation 0, reserved shown, assign refused `NOTHING_TO_ASSIGN` |
| Fixture not succeeded | reserved, processing or unknown | not a candidate |
| Stale preview | refund succeeds after preview | `RECOVERY_CHANGED`, nothing written |
| Replay / changed payload | same key | same result / `IDEMPOTENCY_CONFLICT` |
| Re-assign after more refunds | version 1 → 2 | adjustment row + audit, obligation grows |
| Non-finance admin / owner | | 403 or 404 |

</frozen-after-approval>

## Code Map

- `rentra-backend/drizzle/0078_payout_transfer_fixture.sql` -- fixture schema, state, `verified_at`, `source_id` → `payment_allocation` (rent). Read only.
- `rentra-backend/src/services/finance/payout-transfer-fixtures.js:104-124,154-182` -- the idempotency pattern (actor + request_key + hash, FOR UPDATE) and the admin actor shape. Reuse its `authorize` / actor helpers.
- `rentra-backend/src/services/finance/payout-modes.js` -- versioned command + audit-with-reason pattern.
- `rentra-backend/src/routes/admin.route.js:357-358` -- where finance `/payments/*` routes live, gated by `admin.payments.*`.
- `rentra-backend/test/integration/payout-transfer-fixtures.integration.test.js:71-77,625-700` -- the fixture-then-refund helper to copy for setup.
- New migration `rentra-backend/drizzle/0080_owner_recovery.sql` plus journal entry. `owner_recovery` has:
  - `id`, `owner_id`, `source_id` (unique, FK payment_allocation), `fixture_id` (FK);
  - `environment` (check 'test');
  - `obligation_minor`, `reserved_minor`, `recovered_minor` (default 0);
  - `version`, `actor_id` (admin_user), `reason`, timestamps.

  Plus append-only `owner_recovery_adjustment` (recovery_id, version, before jsonb, after jsonb, actor_id, reason, request_key, request_hash, unique(actor_id, request_key)).
- New `rentra-backend/src/services/finance/owner-recovery.js` -- `listRecoveryCandidates`, `previewOwnerRecovery(sourceId)` and `assignOwnerRecovery({sourceId, hash, expectedVersion, requestKey, reason 10-500})`.
- Controller and routes: GET `/payments/owner-recoveries`, GET `/payments/owner-recoveries/:sourceId`, POST `/payments/owner-recoveries/:sourceId`.
- Frontend:
  - `Rentra/app/(admin)/admin/finance/owner-recoveries/page.js` plus one component: a list with owner, booking ref, paid, refunded after, obligation, reserved, version, and Test labels. The Assign dialog requires a reason. A stale result refetches.
  - Follow `Rentra/app/(admin)/admin/finance/payout-modes` for structure.
  - `lib/api/endpoints.js` and actions follow the existing admin finance ones.

## Tasks & Acceptance

**Execution:**
- [x] migration 0080 + journal; `npm run db:check`
- [x] backend service + controller + routes
- [x] backend test `test/integration/owner-recovery.integration.test.js` -- every matrix row
- [x] frontend page, component, endpoints, actions; nav link next to the other finance pages

**Acceptance Criteria:**
- Given an assigned recovery, when guest refund and fixture rows are compared before and after, then they are unchanged.
- Given any admin finance list, when it is read, then the response sends `Cache-Control: private, no-store`.

## Implementation Notes

- The refund anchor is the fixture's reserve time (`ra.created_at > f.created_at`), not its `verified_at`. 0078 fixes `expected_minor` at reserve, net of the refunds that existed then. A refund landing between reserve and dispatch makes the dispatch fail with `STALE_PREVIEW`; this is tested.
- The assign runs inside `withListingInventory`, the same mutex refund completion takes. The replay is checked again under the lock, and 23505 is mapped to a replay or a conflict.
- `owner_recovery_adjustment` is append-only: UPDATE, DELETE and TRUNCATE are all blocked.
- Assigning again with unchanged figures returns `NOTHING_TO_ASSIGN`.
- `authorize` is exported from `payout-modes.js` and reused.

## Spec Change Log

## Review Triage Log

**First review:**
- **high / fixed:** the assign was not serialized with refund completion.
- **medium / fixed:**
  - replay before the lock, and the 23505 race;
  - TRUNCATE bypassing the append-only table;
  - missing matrix tests;
  - the frontend network error;
  - missing Test labels.
- **Question, answered:** the frontend's `result.result.version` is correct.

**Closure check:**
- **high / fixed:** a refund created between reserve and verification was dropped. The anchor moved to reserve time.

**Final closure check:** CLOSED.

## Results

- Backend `3da392ff9ae18ff2f6d1cb49d738c25f8046c252` and frontend `617b038f68788fb84d1dc14daf8bea8a51fb3e26` are local commits. They have not been pushed.
- Backend full suite: **401/401**, on local PostgreSQL with `DATABASE_URL` pointed at an unreachable address.
- Frontend: **136/136**.
- `db:check`: 81 files.
- `git diff --check` is clean.
- ESLint and Prettier pass on linted files. `src/services/finance/*` is excluded by the ESLint config.
- Not run: a browser check of the new page.

## Verification

**Commands:**
- In `rentra-backend`, NEVER against hosted Neon: `PORTAL_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres CP01_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres DATABASE_URL=postgres://nobody@127.0.0.1:1/never node --import ./loader/register.mjs --env-file=.env --test --test-concurrency=1 "test/**/*.test.js"` -- all pass (baseline 389). Never run db:migrate. Do not commit.
- Frontend `npm test`, targeted eslint/prettier, `git diff --check` -- pass.
