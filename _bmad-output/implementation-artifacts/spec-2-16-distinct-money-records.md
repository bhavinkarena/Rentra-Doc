---
title: 'Story 2.16 - show distinct guest, owner and admin money records'
type: 'feature'
created: '2026-10-28'
status: 'done'
route: 'dispatch'
review_loop_iteration: 1
context: []
baseline_commit: 'backend 8af21f2180d2ab18fcc9d2de33e835432a063b47; frontend 1ec599a4b62b5bafa0047ee75ad9a21f133471de'
---

<frozen-after-approval reason="Story 2.16 approved in epics.md; user decisions 28 Oct 2026; standing authorization">

## Intent

**Problem:** One booking record payload serves guest, owner and admin, so the owner sees the guest's raw payment internals and nothing about their own payout. Some views also blur money facts:
- missing amounts become ₹0;
- `simulated` money is not labelled;
- record and admin payment endpoints send no `Cache-Control`.

**Approach:** Shape the money part of the record per audience. Show the owner a guest-payment summary and a per-booking payout state, also on earnings rows. Keep null as "Not recorded", label every non-live environment, and send `private, no-store` on these endpoints.

User decisions (28 Oct 2026):
- The owner sees a guest summary only: paid in full or not, and refund progress with amounts. No provider IDs or capture internals.
- The payout state is shown on both the owner booking detail and each earnings row.

## Boundaries & Constraints

**Always:**
- Integer paise.
- `null` means unknown or not recorded. `0` means a known zero.
- Booking state, guest payment/refund state and owner payout state are separate fields and separate labels.
- Every non-live amount carries its environment label (test, simulated, legacy).
- The guest never sees payout data.
- The owner never sees provider order or refund IDs.
- The admin view is unchanged except for labels and cache headers.

**Never:**
- No new money movement, migration or provider call.
- Do not change refund, payout or eligibility logic.
- A payout state is never shown as paid without `succeeded` (fixture) or `paid` (payout) evidence.
- No bank-credit timing promises.

## I/O & Edge-Case Matrix

| Scenario | State | Expected |
|---|---|---|
| Unpaid hold | no verified capture | guest `capturedMinor: null` ("Not recorded"); owner `guestPayment.state: 'unpaid'` |
| Paid, no refunds | capture verified | owner `paid`, refund `none`, refunded 0 |
| Refund reserved/processing | refund created/processing | owner refund `in_progress` with requested amount |
| Refund unknown/failed exec | execution failure | owner refund `needs_review` |
| No payout row | eligible or not | payout `not_started` |
| Fixture reserved / payout pending | | `scheduled` |
| Fixture processing / payout processing | | `processing` |
| Fixture unknown | | `needs_check` |
| Fixture succeeded / payout paid | | `paid` |
| Payout failed / frozen | | `failed` / `on_hold` |
| Simulated payment | environment simulated | labelled "Simulation", no actual-bank amount (`actualBankMinor: null`) |

</frozen-after-approval>

## Code Map

- `rentra-backend/src/services/booking/records.js:241-294` -- the shared record.
  - `payments` SQL coalesces capture to 0 → return null when there is no verified capture.
  - `actualBankMinor` hard 0 → null when the payment is not live and real.
  - Owner branch: replace `payments` with `guestPayment` and add per-visit `payout`.
  - :284: make owner totals null-safe.
- `rentra-backend/src/services/finance/owner-earnings.js:21-44,84` -- add a `payout_state` per row using the same derivation. Export one helper `payoutState(rows)` from a shared module.
- `rentra-backend/src/controllers/records.controller.js:56-62` and `payments.controller.js:56-66` -- add `Cache-Control: private, no-store`. Follow the `finance.controller.js` pattern.
- `Rentra/components/partner/OwnerBookingDetail.jsx:374-415` -- replace the payments block with the guest summary and a payout row. Deposit 0 shows ₹0. Use `displayMoney`.
- `Rentra/components/partner/earnings/Earnings.jsx:194-204` -- add a payout state chip.
- `Rentra/components/customer/BookingRecords.jsx:96,511,619` -- label `simulated`, make room plus tax null-safe, and show actual bank null as "Not applicable (not live)".
- `Rentra/lib/domain/owner-earnings.js:17` -- reuse `environmentLabel`.
- `Rentra/lib/domain/display-money.js` -- reuse `displayMoney`.
- Add one shared payout-state label map in `Rentra/lib/domain/owner-earnings.js`.

## Tasks & Acceptance

**Execution:**
- [x] backend `src/services/finance/payout-state.js` -- `payoutStates(tx, bookingIds)` returns a Map from booking to `{state, amountMinor, environment}`.
- [x] backend records.js -- per-audience money shape, null capture, null actual bank.
- [x] backend owner-earnings.js -- `payoutState` per item.
- [x] backend controllers -- no-store headers.
- [x] backend test `test/integration/money-records.integration.test.js` -- per-audience fields, null and zero, payout states, cache header, owner and guest isolation.
- [x] frontend OwnerBookingDetail, Earnings, BookingRecords, lib labels, plus a unit test for the labels.

**Acceptance Criteria:**
- Given an owner record, when it is read, then it has no `providerOrderId` or `providerRefundId` anywhere, and it has `guestPayment` and `visits[].payout`.
- Given a guest record, when it is read, then it has no `payout` field.
- Given record and admin payment endpoints, when they respond, then `Cache-Control` is `private, no-store`.
- Given another owner or guest, when they request the record, then the existing 404 scope holds.

## Implementation Notes

- Owner `guestPayment` is computed against the amount the guest was asked to pay, which is the largest `payment_order.expected_minor`. This covers hotel tax; payment retries are not added up. Sums cover only the latest payment order's environment, and `mixedEnvironments` flags any others.
- A payout amount is shown only once funded (`actual_net_minor` with a funding allocation). Otherwise it is null and shows as "Not recorded". Test fixtures show `expected_minor`, labelled Test.
- The owner printable summary and .ics use `guestPayment` and print each visit's payout state.
- Outside the original code map: `voucher/page.js`, `lib/domain/booking-record.js`, `AdminBookingDetail.jsx`, the backend `domain/booking-record.js` and `booking-calendar.js`.

## Spec Change Log

## Review Triage Log

**Independent review (cavecrew-reviewer):**
- **high / fixed:** the owner printable summary and .ics crashed with no `payments`.
- **high / fixed:** the payout amount used the quoted `net_minor`.
- **medium / fixed:**
  - The text summary still used the old test and simulation wording.
  - Admin showed null actual bank as "Not recorded".
  - The voucher showed a simulated booking as Paid ₹0.
  - Owner sums mixed money from different environments.
  - The I/O matrix was not fully tested.
- **Questions:** decided by the agent, since the user would not notice and both answers are conservative. No amount is shown until funded. The owner summary keeps the guest-summary lines.
- **Closure check:** CLOSED, with no new medium or high findings.

## Results

- Backend `04a7a1cd29fa55f8f31c298ea64bea1da1d54178` and frontend `2504e91e01ab574a4607d956a752c96b06d45fb0` are local commits. They have not been pushed.
- Backend full suite: **389/389**, on local PostgreSQL with `DATABASE_URL` pointed at an unreachable address.
- Frontend: **136/136**.
- `db:check`: 80 files, no migration.
- `git diff --check` is clean, and ESLint and Prettier pass on the touched files.
- Not run: browser, visual and accessibility checks.

## Verification

**Commands:**
- in `rentra-backend`, NEVER against hosted Neon: `PORTAL_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres CP01_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres DATABASE_URL=postgres://nobody@127.0.0.1:1/never node --import ./loader/register.mjs --env-file=.env --test --test-concurrency=1 "test/**/*.test.js"` -- all pass (baseline 387/387). Fixture patterns: `test/integration/owner-cancel-upcoming.integration.test.js`. Do not commit.
- frontend `npm test`, targeted eslint/prettier, `npm run db:check`, `git diff --check` -- pass
