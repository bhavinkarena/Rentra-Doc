---
title: 'Story 2.20 - restrict overdue owners and clear only settled debt (Test slice)'
type: 'feature'
created: '2026-10-28'
status: 'in-progress'
route: 'dispatch'
review_loop_iteration: 0
context: []
baseline_commit: 'backend 076cf6fb889af2371f579472696e263f14d6df7c; frontend b9e7a5ce4a138bdd00f79f505d2e43fefe9539c6'
---

<frozen-after-approval reason="Story 2.20 in epics.md; user decision 28 Oct 2026">

## Intent

**Problem:** Story 2.19 stores a durable `due_at` for each owner repayment notice. Nothing yet happens when it passes. FR-14/FR-6/FR-23 require an owner-wide restriction for overdue debt that clears only when that debt is settled.

**User decision (28 Oct 2026):**
- An overdue owner gets no **new bookings on any of their listings**: no new quote, hold, request approval or payment start.
- This is checked in the database at admission time.
- Confirmed stays remain.
- The owner can still sign in, see the debt and pay.
- A verified full repayment lifts only this restriction.

## Boundaries & Constraints

**Always:**
- **Canonical rule:** one SQL function, `owner_repayment_overdue(owner uuid) returns boolean`. It is true when the owner has a notice with `due_at <= now()` whose recovery has `obligation_minor - recovered_minor > 0`. It is evaluated in the admission transaction, never from a cached or worker flag.
- **Admission guards:** every admission path refuses with `OWNER_REPAYMENT_OVERDUE` (409) when the function is true for the listing's owner:
  - quote (`createBookingQuote`);
  - checkout hold (`createCheckoutHold`);
  - approve (`decideBookingRequest` with approve=true);
  - payment start (`startCheckoutPayment` for a new provider order).
- **Database backstop:** a database trigger on the row that creates a new hold or booking order raises the same code, so a new path or another listing cannot bypass it.
- **What still works:** declining a request, reading an existing in-flight payment, cancellations, refunds, check-ins and confirmed stays.
- **Partial or unknown payment:** a partial repayment, an unknown payment, a link under review, or a replaced or new link does not clear the restriction. Only `outstanding = 0` through verified settlement (2.18) does.
- **Other restrictions:** a second overdue recovery, an owner pause, `account_status` restriction or a listing review state each persist independently.
- **Activating, publishing or resuming** a listing is allowed but cannot admit bookings while overdue.
- **Owner portal:** shows a clear banner on the earnings page and the listings dashboard: "New bookings are stopped because a Test repayment is overdue", with the amount and a link to pay.
- **Admin:** the owner recoveries row shows "Overdue - new bookings stopped (Test)".

**Never:**
- No auto-cancel of confirmed stays, no auto-debit, no payout offset.
- No listing status mutation; the restriction is derived, not stored.
- No SMS or email.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Notice received, now < due_at | bookings admitted |
| now >= due_at, outstanding > 0 | quote, hold, approve and new payment start refused `OWNER_REPAYMENT_OVERDUE`, on every listing of that owner |
| Other owner | unaffected |
| Confirmed stay of overdue owner | unchanged; decline still works |
| Direct insert bypassing service (backstop) | trigger raises |
| Partial or needs_review payment | still blocked |
| Verified full repayment | admission works again |
| Two overdue recoveries, one repaid | still blocked |
| Owner paused listing, debt repaid | still paused |
| No receipt evidence (due_at null) | not blocked |
| Admin earlier-receipt correction makes it overdue | blocked immediately |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- `drizzle/0082_owner_repayment_notice.sql` -- `due_at`. Read only.
- New `drizzle/0083_owner_repayment_overdue.sql` plus journal idx 83:
  - the function;
  - a BEFORE INSERT trigger on the table that holds new booking orders or holds (find the single insert point used by `createCheckoutHold` and request creation; check `booking_order` vs `inventory_reservation`). Resolve owner via `rentable.owner_id` (verify the column name).
- Guards (existing patterns):
  - `src/services/booking/quotes.js:214-225,326-334` -- the `owner_active` EXISTS checks. Add the overdue check beside them.
  - `src/services/booking/booking-requests.js:36-52` -- owner FOR SHARE check, `LISTING_PAUSED`.
  - `src/services/payments/checkout-service.js:27-38` -- `startCheckoutPayment` (refuse only when creating a new provider order; returning an existing in-flight order still works).
  - `src/services/booking/checkout.js:66` -- `createCheckoutHold`.
- `src/middlewares/error.middleware.js:30-31` -- map `OWNER_REPAYMENT_OVERDUE` to 409 with an owner-safe / guest-safe message. The guest sees "This property is not taking bookings right now"; do not leak the debt to guests.
- `src/services/finance/owner-repayment.js` `listOwnerRepayments` -- add `overdue: boolean` (from the function).
- `src/services/finance/owner-recovery.js` -- `overdue` on rows.
- The partner listings dashboard payload (find where listings for the owner are served, e.g. `src/services/auth/listings.js`) -- add `repaymentOverdue`.
- Test: `test/integration/owner-repayment-overdue.integration.test.js`, covering every matrix row. Build on the setup in `owner-repayment-notice.integration.test.js` and the admission setup in `pause-bookings.integration.test.js`. Set `due_at` in the past via the admin earlier-receipt path, not raw UPDATE where possible.

Frontend (`Rentra`):
- `components/partner/earnings/RepaymentDue.jsx` -- overdue banner.
- The partner listings dashboard -- the same banner, linking to earnings.
- `components/admin/OwnerRecoveries.jsx` -- overdue label.
- Guest booking error copy: reuse the existing unavailable message for code `OWNER_REPAYMENT_OVERDUE`.

## Tasks & Acceptance

- [ ] migration 0083 + journal; `npm run db:check`
- [ ] guards in 4 services + trigger backstop + error mapping
- [ ] backend test, every matrix row
- [ ] frontend banners and label

**Acceptance Criteria:**
- Given an overdue owner, when a guest attempts a quote on any of their listings, then the response is 409 and its body does not mention repayment or debt.
- Given verified full repayment, when the next quote is requested, then it succeeds without any worker run.

## Verification

- In `rentra-backend`, never against Neon: `PORTAL_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres CP01_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres DATABASE_URL=postgres://nobody@127.0.0.1:1/never node --import ./loader/register.mjs --env-file=.env --test --test-concurrency=1 "test/**/*.test.js"`. All pass (baseline 419). Never run db:migrate. Do not commit.
- Frontend `npm test` (baseline 136), targeted eslint/prettier, `git diff --check`.
