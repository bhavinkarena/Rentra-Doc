# Epic 2 acceptance evidence (local only)

Story 2.21. Local integration evidence for Epic 2 money rules. **This is not release evidence.** Hosted signed Test evidence and every external gate on the admin "Financial release gates" page stay open. Overall status: **Not ready for Live money**.

Run on 2026-10-28 against a disposable local Postgres (`127.0.0.1:55432`), never Neon:
`node --import ./loader/register.mjs --env-file=.env --test --test-concurrency=1 "test/**/*.test.js"` in `rentra-backend`, with uncommitted Story 2.21 changes on backend `93cd69c`. Actual TAP totals (baseline before this story: 435):

```
# tests 444
# pass 444
# fail 0
```

Every quoted name below was grepped verbatim in `rentra-backend/test/` (… marks a quoted fragment of a longer name).

| Area | Test file (`rentra-backend/test/integration/`) | Test name | Result |
|---|---|---|---|
| Both race orders | `request-to-book.integration.test.js` | "request to book: owner accepts before payment…" (the race check is a block inside this test, marked by the code comment "both race orders on one date leave exactly one hold", not a separate test name) | pass |
| Both race orders (capture vs. replacement) | `owner-repayment.integration.test.js` | "capture racing a replacement still settles the replaced link" (inside Story 2.18 matrix) | pass |
| Races, refund single effect | `booking-cases.integration.test.js` | "CP14 booking cases: … one refund effect, races and audiences" | pass |
| Stale and replay | `owner-repayment.integration.test.js` | "create, replay, conflict, stale, pay once" | pass |
| Stale and replay | `early-departure.integration.test.js` | "omitted operation preserves the original preview/hash/replay contract"; "same-key and distinct-room races cannot duplicate effects…" | pass |
| Stale and replay | `owner-repayment-notice.integration.test.js` | "admin confirm: validation, permissions, stale, earlier, later, replay" | pass |
| Takeover | - | **Missing.** No money test covers takeover; the only `takeover` match is application review (`application-review.integration.test.js`), which is not a money flow. | missing |
| Dispute caps | - | **Missing.** No test asserts a dispute cap. `disputes.integration.test.js` "CP23 financial context … resolution never executes money" moves no money, so it does not prove a cap. Related but not dispute caps: `refund-operations.integration.test.js` "CP20 refunds: capped operator refunds…" (pass). | missing |
| Room allocation | `../services/refund-basis.test.js` | "Story 2.10 remaining-room allocation skips reserved capacity without consuming entitlement" | pass |
| Unused-night allocation | `early-departure.integration.test.js` | "mixed offers … strictly unused stock, exact money…"; "zero/no offer and no unused nights…"; "a nightly boundary changes the hash…" | pass |
| Receipt ordering | `owner-repayment-notice.integration.test.js` | "owner view sets receipt, +5d reminder, +7d due…"; "admin confirm: … earlier, later…" | pass |
| Receipt ordering (statement dates) | `hotel-post-stay.integration.test.js` | "multiple verified hotel rent captures hold both readers; future-only statement dates stay ordered" | pass |
| Debt restrictions | `owner-repayment-overdue.integration.test.js` | "Story 2.20 overdue owner repayment stops new bookings owner-wide until settled" (14 subtests) | pass |
| Kill switch + release gates | `release-gates.integration.test.js` | "Story 2.21 financial release gates and initiation kill switch" (8 subtests, incl. owner cancel-upcoming with switch on) | pass |

## Open hosted evidence (blocks release)

- Hosted signed Razorpay Test webhooks, refunds and owner repayments on the deployed stack.
- Neon migrations: last recorded at 0075 (HANDOFF); 0076-0083 pending. Not applied by this story.
- Live keys, funding source and exposure limit (INR 40,000 is a proposal, not funded, not adequacy proof), specialist terms/accounting/tax, staffing and support, alert paging.
- Missing local coverage above: takeover, dispute caps.
