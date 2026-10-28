---
title: 'Story 2.18 - generate and verify owner repayment links (Test slice)'
type: 'feature'
created: '2026-10-28'
status: 'done'
route: 'dispatch'
review_loop_iteration: 4
context: []
baseline_commit: 'backend 3da392ff9ae18ff2f6d1cb49d738c25f8046c252; frontend 617b038f68788fb84d1dc14daf8bea8a51fb3e26'
---

<frozen-after-approval reason="Story 2.18 in epics.md; user decisions 28 Oct 2026">

## Intent

**Problem:** Story 2.17 records what an owner owes back (`owner_recovery.obligation_minor`), but the owner has no way to pay it, and nothing reduces the debt.

**Approach (user decisions, 28 Oct 2026):**
- Use a Razorpay **Test** payment, through the existing Test adapter. Live stays gated.
- A finance admin creates the link from the owner recoveries page.
- The owner sees and pays it in the partner portal on the earnings page. No SMS or email; notice evidence is Story 2.19.

"Link" = a Rentra repayment record bound to a Razorpay Test **order**, paid with the existing checkout flow. The Payment Links API is not used, because no adapter or fake exists for it, and an order gives the same binding and verification.

## Boundaries & Constraints

**Always:**
- Integer paise. Environment `test`. Every label says Test.
- A link binds owner, recovery and `amount_minor`. `amount_minor` = outstanding at creation = `obligation_minor - recovered_minor`.
- Creating or replacing a link is not collection. Only a verified, `captured` provider payment on the link's own order, with the exact amount, reduces the debt (`recovered_minor += amount`).
- At most one `open` link per recovery (partial unique index).
- Replacing: the old link becomes `replaced` only if the provider shows no authorized or captured payment on its order. Otherwise `REPAYMENT_IN_FLIGHT` and nothing changes. Replacement or expiry never resets what is due.
- Payment status `unknown`, a provider failure, or an amount mismatch leaves the debt unsettled (link `needs_review`). There is no partial settlement.
- If outstanding has fallen below the paid amount since creation, `recovered_minor` rises only to the obligation, and the difference is stored as `excess_minor` for admin return. It is never revenue and never moved to another debt.
- Commands are idempotent. Admin create: `{expectedVersion, requestKey}` on recovery version; unique `(actor_id, request_key)`. Owner verify: replay of the same `paymentId` returns the recorded outcome.
- Permissions: admin create and list need `admin.payments.write|read`. The owner sees only their own links; another owner gets 404.

**Never:**
- No Live keys, no auto-debit, no payout offset, no owner bank debit.
- No change to guest refunds, payouts, fixtures, the funds cap, or 0078/0080 guards.
- No SMS or email.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Admin creates on obligation 9000 | link open, amount 9000, Razorpay Test order created |
| Nothing outstanding | `NOTHING_TO_COLLECT`, no order |
| Stale recovery version | `RECOVERY_CHANGED`, nothing written |
| Replay same requestKey / changed payload | same link / `IDEMPOTENCY_CONFLICT` |
| Replace with no provider payment | old `replaced`, new open with current outstanding |
| Replace while payment authorized or captured | `REPAYMENT_IN_FLIGHT`, nothing changes |
| Owner pays, verified capture 9000 | link `paid`, recovered 9000, obligation outstanding 0 |
| Bad signature / wrong order / amount mismatch | 4xx or `needs_review`; recovered unchanged |
| Verify replay | same outcome, recovered counted once |
| Obligation dropped below paid amount before verify | recovered capped, `excess_minor` stored |
| Another owner / non-finance admin | 404 / 403 |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- `src/services/payments/razorpay-test.js:55,94,105,111` -- `razorpayTestAdapter`, `createOrder`, `payment(id)`, `payments(order)`; `assertPayment` :31-45. Reuse; do not add Payment Links.
- `src/services/payments/checkout-service.js:83-96` -- `verifyCheckoutSignature` (HMAC `order|payment`) and the provider fetch pattern to copy for owner verify.
- `src/services/payments/provider-credentials.js` -- Test key gate. Keep it.
- `src/services/finance/owner-recovery.js:14,72,84` -- `facts`, `assignOwnerRecovery`, `withListingInventory`. Add outstanding and the open link to list/preview rows.
- `src/services/finance/payout-modes.js:17` -- `authorize(tx, actor, write)`.
- New `drizzle/0081_owner_repayment.sql` plus journal idx 81. `owner_repayment`:
  - `id`, `recovery_id` FK, `owner_id`;
  - `environment` check 'test';
  - `amount_minor` > 0, `state` check ('open','paid','replaced','needs_review');
  - `provider_order_id` unique, `provider_payment_id` unique null, `excess_minor` default 0;
  - `actor_id` admin_user, `request_key`, `request_hash`, unique(actor_id, request_key);
  - `created_at`, `settled_at`;
  - partial unique (recovery_id) where state='open'.
- New `src/services/finance/owner-repayment.js`: `createRepaymentLink(db, actor, sourceId, {expectedVersion, requestKey}, opts)`, `listOwnerRepayments(db, ownerId)`, `verifyOwnerRepayment(db, ownerId, id, {paymentId, signature}, opts)`. Run under `withListingInventory` for the recovery's listing. Write an audit_log row on create and settle.
- Routes: admin POST `/payments/owner-recoveries/:sourceId/repayment-link` (hotel-finance controller, noStore). Partner GET `/repayments`, POST `/repayments/:id/verify` (partner.route.js near :501, requireActiveClient, noStore).
- Test `test/integration/owner-repayment.integration.test.js`, covering every matrix row with `fileBackedRazorpay` / `providerCaptures`. Build the 2.17 setup from `owner-recovery.integration.test.js`.

Frontend (`Rentra`):
- `components/admin/OwnerRecoveries.jsx` -- outstanding column, "Create Test repayment link" / "Replace link" button, and link state.
- `components/partner/earnings/Earnings.jsx` -- "Test repayment due" panel, shown only when open links exist. A Pay button opens the existing Razorpay checkout (reuse the customer checkout script loader), then calls the verify action. Show the paid, needs-review and error states.
- `lib/api/endpoints.js`, `lib/actions/hotel-finance.js`, `lib/actions/partner.js` -- follow existing patterns.

## Tasks & Acceptance

- [x] migration 0081 + journal; `npm run db:check`
- [x] backend service, controllers, routes
- [x] backend integration test, every matrix row
- [x] frontend admin button, owner panel, actions

**Acceptance Criteria:**
- Given a created link, when no verified capture exists, then `recovered_minor` is unchanged.
- Given a verified captured payment, when it is verified twice, then `recovered_minor` rises once.
- Given any new endpoint, when it responds, then `Cache-Control` is `private, no-store`.

## Verification

- In `rentra-backend`, never against Neon: `PORTAL_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres CP01_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres DATABASE_URL=postgres://nobody@127.0.0.1:1/never node --import ./loader/register.mjs --env-file=.env --test --test-concurrency=1 "test/**/*.test.js"`. All pass (baseline 401). Never run db:migrate. Do not commit.
- Frontend `npm test` (baseline 136), targeted eslint/prettier, `git diff --check`.

## Implementation Notes

- 2.17 change: `obligationMinor` is now gross (assigned); rows carry `outstandingMinor` (obligation - recovered) and the latest link. Avoids subtracting recovered twice on re-assign.
- Create binds `{hash, expectedVersion, requestKey}` to live `facts()`; the link amount is `outstandingMinor`. Settling bumps `owner_recovery.version`.
- Lock order everywhere: `owner_recovery` then `owner_repayment` (`lockLink`).
- Created/authorized/failed payments keep the link `open` (`paymentStatus: 'pending'`). Only amount mismatch or unknown provider state sets `needs_review`.
- A capture on a `replaced` link still settles (cap + excess); settling closes any open replacement with no payment.
- Admin `.../repayment-link/check` re-reads provider payments; `.../repayment-link/resolve {linkId, reason}` closes a `needs_review` link. A wrong-amount capture found at resolve is recorded on the closed link with its whole amount in `excess_minor` for admin return (never recovered, never revenue). The debt stays unsettled until a new link is paid. Accepted as a deliberate reading of "excess enters admin return".
- Adapter gained read-only `orderPayments(orderId)`; `orderState` judges each payment on its own.

## Review Triage Log

- Review 1: 3 high (replace race lost money, authorized became terminal review, needs_review ignored on replace), 6 medium, 6 low. All fixed.
- Closure 1: 3 new medium (lock-order deadlock, over-collection after replaced settle, needs_review dead end), 2 low. All fixed.
- Closure 2: 1 new medium (wrong-amount capture dead end). Fixed.
- Closure 3: 1 medium (excess_minor now holds two causes vs matrix wording) accepted and documented above; 1 low (second capture on one order overwrites provider_payment_id; Razorpay blocks with partial_payment=false) accepted.
- Test gap, disclosed: create-vs-create, verify-vs-replace, check-vs-verify and verify-vs-resolve run only sequentially; parallel double verify and capture-racing-replacement are tested.

## Results

- Backend full suite **411/411** on local PostgreSQL (DATABASE_URL unreachable). Frontend **136/136**. `db:check` 82 files. `git diff --check` clean; targeted ESLint/Prettier clean.
- Migration 0081 added; 0076-0081 unapplied on Neon.
- Not run: browser Razorpay Test checkout; signed hosted Test evidence (story readiness gate stays open).
- Open: no admin action to return `excess_minor`; no link expiry; links do not record the creating Test key; an unused Test order remains if the DB write fails after order creation.
