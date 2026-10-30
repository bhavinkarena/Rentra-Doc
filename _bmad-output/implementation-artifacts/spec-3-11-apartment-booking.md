---
title: 'Story 3.11 - book apartments with exclusive stock and buffers'
type: 'feature'
created: '2026-10-30'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: ['_bmad-output/implementation-artifacts/epic-3-context.md', '_bmad-output/implementation-artifacts/spec-3-10-whole-apartment-setup.md', '_bmad-output/implementation-artifacts/spec-3-9-pet-declaration-charge.md']
baseline_commit: 'backend 2f090be2b595d8b8b63ac32ce00da157e7e12eaf; frontend edee4433802c91ee55d3f34bac4e77d7b517756d'
---

<frozen-after-approval reason="Story 3.11 in epics.md; user decisions 29-30 Oct 2026">

## Intent

**Problem:** Story 3.10 apartments can be set up but are hidden and refused everywhere. Guests cannot quote, hold, pay for, cancel or leave early from a whole-apartment stay. Owners cannot block dates.

**User decisions (30 Oct 2026):**
- **Owner calendar:** block and unblock date ranges only. The calendar shows booked, turnover-buffer and blocked nights. Per-date prices are out of scope (a later story).
- **Cleaning fee on cancel before arrival:** refunded at the same share as the rent refund.
- **Cleaning fee on early departure:** kept by the owner. Only unused nights follow the existing early-departure rule.
- Earlier decisions stay: flat unit price; max nights 1-90; turnover 0-3 whole nights; night cancellation presets; pets per 3.8/3.9 (`per_night` counts nights).

## Boundaries & Constraints

**Always:**
- **Booking shape:** one `booking` row with `slot='stay'` per order plus one `inventory_reservation` (`resource_id` NULL).
  - The range is property-local midnight of check-in up to local midnight of `checkOut + turnover_nights` days, `[)`.
  - The existing GiST exclusion `reservation_active_overlap_excl` is the overlap guard, so concurrent holds cannot overlap: the loser gets 409 `DATES_UNAVAILABLE`.
  - It runs under `withListingInventory`, with no provider calls inside the transaction.
  - Owner blocks use the same table (`createOwnerBlock`, source owner_block), so they also exclude.
- **Quote (new selection `kind: 'apartment'`):** `{rentableId, checkIn, checkOut, adults, childAges, pets}`. Validation:
  - occupants ≤ max_adults/max_children/max_occupants, and at least 1 adult;
  - nights within [min, max], and the arrival weekday/date-range minimum applies;
  - dates within the existing lead time/horizon rules;
  - availability (reservation overlap including turnover) is checked advisorily at quote time and authoritatively at hold.
- **Price:**
  - Each night uses the weekend price if its weekday is in `weekend_nights`, else the weekday price.
  - Plus the cleaning fee once, plus the pet charge (3.9 math; units = nights).
  - One service fee (`allocateOrderFee`) over rent + cleaning + pet.
  - No tax (`not_configured`, like farm). Integer paise.
  - Quote content carries the per-night prices, cleaning, pets and the profile version, so `quoteDigest` makes stale quotes `QUOTE_CHANGED`.
- **Hold/payment:** reuse `createCheckoutHold` (idempotency, live-hold cap, RN001 overdue-owner admission, manual approval via `instant_book=false` + respondBy, full upfront), `startCheckoutPayment`/`verifyCheckoutPayment`/`settleVerifiedPayment`.
  - Expiry or decline releases the reservation.
  - Confirmation, records and voucher show the dates, guests, nightly breakdown, cleaning and pet rows.
  - The ledger records cleaning and pet as `rent` (the 3.9 precedent), with the split in the snapshots.
- **Cancellation:** night presets with the existing windows. The refund ratio is applied to rent; cleaning and pet follow the same ratio; the fee follows the existing rules; floors in paise. Refund + charge = paid (assert it). The reservation is released on cancel.
- **Early departure:** reuse `earlyDepartureRoom` over the stored per-night snapshot. Unused nights are refunded per the existing rule; cleaning and pet are kept. The reservation end shrinks to the new checkout + turnover (the released nights become bookable). Accepted history is kept.
- **Guest surfaces:** lift the 3.10 exclusions for `unit_night` in discovery (stay vertical and the Whole apartment tab), the listing page, saved places, login selection and quotes.
  - Search shows the dated full-stay total including cleaning (and pets when declared), and excludes apartments unavailable for the dates, occupants or nights rules.
  - The listing page has an apartment booking panel: dates, guests, pets, nightly breakdown, cleaning row, total, and clear errors ("Minimum 3 nights for Saturday arrival").
- **Owner calendar:** apartment month view with booked/buffer/blocked/open labels and a block/unblock date range (keyboard-accessible, preview, version check like 3.5). A block over booked nights is refused.
- **Values:** form values survive errors; 44px targets.

**Never:**
- No per-date prices.
- No room sales.
- No hotel `room_night` or `booking_room` usage.
- No lease.
- No change to farm/hotel booking behavior.
- No migration unless strictly required (prefer existing tables; if one is needed, number it 0089 and justify it).

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| 3 nights Fri-Mon, weekday 5000/weekend 7000 (Fri, Sat weekend), cleaning 1000 | 7000+7000+5000+1000 = ₹20,000 + fee |
| 2 nights, min 3 | 422 MIN_NIGHTS |
| Saturday arrival min 3, 2 nights | 422 with arrival message |
| 91 nights / over max | 422 |
| Too many occupants | 422 OCCUPANCY |
| Booked 10-12, turnover 1, new 12-14 | DATES_UNAVAILABLE (12 is buffer) |
| Booked 10-12, turnover 0, new 12-14 | allowed |
| Two concurrent holds same dates | one wins, other 409 |
| Owner block 20-22 | quotes over it refused; block over booked nights refused |
| Manual approval decline / hold expiry | reservation released |
| Free cancel | full refund incl. cleaning, pet |
| Late cancel 50% | 50% rent, cleaning, pet; refund+charge=paid |
| Early departure after night 1 of 3 | unused nights per rule; cleaning kept; nights released |
| Price change after quote | QUOTE_CHANGED |
| Search with dates and party | eligible apartments with stay total |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- **Guards to lift:**
  - `src/services/booking/quotes.js:164-166,238-252,258,368`, `time-slots.js:20`, `hotel-checkout.js:94`, `inventory.js:308`;
  - `db/queries.js:165-168` (`publiclyListed`), `db/discovery.js:39,79,87,388,430,454`, `customer/saved.js:21,56`, `auth/customer-actions.js:26`, `admin/verification.js:136-138`, `domain/verticals.js:10`.
  - Keep the farm slot owner-setting refusals.
- **New `src/services/booking/apartment-stays.js`:** `quoteApartment`, `holdApartment` (the booking + inventory_reservation insert), availability and the search offer. Pure math in `src/services/domain/apartment.js` (night prices, rules).
- **Wire-in:**
  - The selection union in `schemas/zod/booking.js:47`.
  - `checkout.js:91` branches the kind to `holdApartment`.
  - `settlement.js` for the allocation plan (check the per-local-day plan).
  - `booking-requests.js:69,77` approve/decline.
- **Cancellation and early departure:** `cancellation.js:156` branch for apartments (new entitlement using `cancellationEntitlement`/`refundPct` with a component ratio); `allocateRefund` :124 components; `departureEntitlement`/early departure via `domain/early-departure.js:5`; shrink the reservation.
- **Owner calendar:** `inventory.js:369` `createOwnerBlock` (+ unblock) with an apartment calendar read (new owner endpoint, like `owner-calendar.js:183`).
- **Discovery:** `db/discovery.js:293-340` adds an apartment branch (join `apartment_profile`, rules, an overlap batch query).
- **Tests:** a new `test/integration/apartment-booking.integration.test.js` covering every matrix row, including true concurrency (two transactions) and refund + charge = paid; unit tests for the price/rules math.

Frontend (`Rentra`):
- `components/rentra/listing/ListingDetail.jsx:78-80`: dispatch `unit_night` to a new `ApartmentListing`/`ApartmentBookingPanel` (reuse the PetsStepper, the date inputs pattern and the QuoteSummary style).
- `components/customer/Checkout.jsx:206,213,339`: apartment branch (lead guest; reuse StayGuestForm for one guest); `ConfirmedView`, records and voucher rows.
- Owner: an apartment calendar component with block/unblock on the partner calendar page (pattern from `HotelRatesCalendar.jsx` drawer: preview, Escape, dirty guard).
- Discovery cards and the Whole apartment tab; `lib/api/endpoints.js`.
- Tests: `lib/domain/apartment.js` price/rules mirror test.

## Tasks & Acceptance

- [x] domain math + quote + hold/exclusion + payment/confirm
- [x] cancellation + early departure + reservation release/shrink
- [x] owner block/unblock + calendar read
- [x] discovery + listing panel + checkout/records UI; lift exclusions
- [x] tests for every matrix row incl. concurrency

**Acceptance Criteria:**
- Given two guests holding overlapping dates at the same time, when both commit, then exactly one succeeds and the other gets DATES_UNAVAILABLE.
- Given a late cancellation at 50%, when refunded, then rent, cleaning and pet are refunded at 50% and refund + charge equals paid.

## Verification

- Backend suite on local PG only (command in the 3.3 spec; baseline 484). Never Neon, never db:migrate, do not commit.
- Frontend `npm test` (baseline 156), eslint/prettier on changed files, `npx next build`, `git diff --check`.

## Implementation Notes

- **Order shape:** an apartment order's policy says `kind: 'stay'` with an `apartment` block, and its payment snapshot uses collection policy `hotel-v1`. This lets the existing triggers and the pinned-payment check accept full upfront payment. Branches tell apartments from hotels by the `apartment` block (`policy_snapshot ? 'apartment'`, `slot_snapshot->'apartment'`).
- **Intervals:** the booking's blocked interval covers its checkout time. The reservation alone runs to midnight of checkout + turnover (`visit.reservationEndAt`), computed with `propertyLocalInstant` (no hard-coded offset).
- **Completion:**
  - A normal stay completes through the existing visit lifecycle (handover, return, then `completeReturnedVisits` after 24 h), which never checks booking_room.
  - Early departure shrinks the reservation and moves the booking to `completed` at once, like a hotel. The 0076 transition proof only accepted hotel departures (it needs booking_room rows), so **migration 0089** (`0089_apartment_departure.sql`) re-creates `rentra_visit_transition_proof` with one added case: the apartment's early-departure receipt. This migration was strictly required. It is not applied to Neon.
  - The earlier note that early departure stays `confirmed` is superseded.
- **Every `slot='stay'` / `kind 'stay'` use, decided (owner decision 30 Oct: apartment payouts use the hotel stay payout run):**
  - `finance/hotel-payouts.js:97` (payable stays): **kept**. Apartments are paid out in the hotel run.
  - `hotel-payouts.js:290/296` (`getOwnerHotelEarnings`: stays, refunds and the next payout preview): **kept**. It feeds the payout screen.
  - `analytics/hotel-analytics.js:78/128`: already hotel-only through `rental_unit='night'` in `scope`; unchanged.
  - `hotel-analytics.js:151` (quotes): apartment quotes use kind `apartment`, so they are already excluded.
  - `hotel-analytics.js:152-157` (holds, paid, guest and hotel cancellations, cases): **apartments excluded**.
  - `operations/hotel-release.js:60/68`: **excluded**.
  - `operations/overview.js:33` (stay_hold_expiry_spike): **excluded**.
  - `settlement.js:96`: the booking_room clause is hotel-only; apartments are held by their reservation. Unchanged.
  - `cancellation.js`: apartment branches added.
  - `booking-requests.js:77` and `owner-cancel-upcoming.js:166` (`releaseHotelRooms`): no-ops for apartments; their reservations are released by the generic updates. Unchanged.
  - `hotel-checkout.js:118` (change a hotel stay): hotel listings only. Unchanged.
  - `records.js:273`, `checkout-review.js`: apartment facts added.
  - `owner-visits.js:29` and `staff-visits.js:43` (active guests from booking_room): **apartments use booking guests**.
  - `domain/booking-cases.js:72` (full case entitlement from room/tax): **apartments use the generic full entitlement**.
  - `domain/booking-record.js:32` (stay label), `notifications/owner-domain.js:42-43`, `notifications/jobs.js:45` (stay wording): suitable for apartments; unchanged.
- **Overlap error:** the 23P01 → `DATES_UNAVAILABLE` mapping applies only when the held quote is an apartment.

## Review Triage Log

- Review 1 (coordinator), 8 items, all fixed:
  1. HIGH: unblocking part of a block now reopens only the chosen nights. The block is released and its outer parts re-blocked. Test: block 6 nights, unblock 1, the other 5 stay blocked.
  2. Cancel refund + charge is reconciled against the succeeded payment_allocation actuals. A mismatch is refused with `PAYMENT_MISMATCH` (tested).
  3. Completion via the lifecycle job (normal end) and at early departure (0089). Both tested.
  4. A held apartment is no longer refused with QUOTE_EXPIRED inside its hold window (tested).
  5. 23P01 mapping scoped to apartment holds.
  6. The +330-minute offsets are replaced by `propertyLocalInstant` / `propertyToday` on both sides.
  7. The ApartmentCalendar Escape key is ignored while focus is in an input, textarea or select.
  8. Confirmed: StayForm in apartment mode renders no Rooms stepper, labels the field "Guests" and drops `rooms` from the URL.

- Review 2 (frontend), 5 items, all fixed:
  1. The checkout error map has `DATES_UNAVAILABLE` ("These dates were just taken. Return to your dates and choose another.").
  2. ApartmentBooking: a "Try again" button for a failed price request. It bumps a `retry` counter that is in the effect dependencies and in the quote key.
  3. StayForm is no longer remounted on every stay change (`key={key}` removed), so focus stays put. It remounts only when a restored login selection rewrites the URL (`formVersion`).
  4. StayForm in apartment mode: the party popover's aria-label is "Select guests".
  5. Voucher lead guest: the apartment hold stores `guest_details.guestNames` (`checkout.js`, `value.stay.guestNames.slice(0, 1)`), and `apartment-booking.integration.test.js` asserts `record.stay.details.guestNames[0] === 'Asha Patel'`. No change needed.
  - Frontend after review 2: `npm test` 158/158, eslint and prettier clean on changed files, `next build` passes, `git diff --check` clean. Backend not touched in review 2, apart from the coordinator's `checkout.js` quoteId regex patch, which is kept.

## Results

- After review 1: backend 503/503 on local PostgreSQL; `db:check` 90; frontend 158/158.
- First pass: backend 499/499 on local PostgreSQL (baseline 484; +12 integration subtests, +3 unit), DATABASE_URL unreachable; `git diff --check` clean. No migration in the first pass (0089 added in review 1).
- Frontend `npm test` 158/158 (baseline 156); eslint/prettier clean on changed files; `next build` passes; `git diff --check` clean.
- Not committed. Browser QA not run.
- Implementation notes: apartment orders carry policy `kind: 'stay'` plus an `apartment` block (so the existing full-payment trigger applies) and payment `collectionPolicyVersion: 'hotel-v1'`; every hotel branch checks for the `apartment` block. The booking's blocked interval covers its checkout time; the reservation alone runs to midnight of checkout + turnover (`visit.reservationEndAt`). Early departure keeps the booking `confirmed` (the `completed` transition needs booking_room evidence) and only shrinks the reservation.

- Closure: backend CLOSED; frontend review 2 fixed (coordinator verified tests). Committed backend 2ee1166, frontend a49eb5b; backend 503/503, frontend 158/158, db:check 90.
