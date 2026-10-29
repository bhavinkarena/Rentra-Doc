---
title: 'Story 3.9 - declare pets and include their complete trip charge'
type: 'feature'
created: '2026-10-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: ['_bmad-output/implementation-artifacts/epic-3-context.md', '_bmad-output/implementation-artifacts/spec-3-8-pet-policy.md', '_bmad-output/implementation-artifacts/spec-3-4-bedding-per-night.md']
baseline_commit: 'backend 57d541d3e6ae0031362e1c80c0a488abb9ab09d2; frontend 7aaf4dd33bc9e53b031ce78205670156a7a2fc72'
---

<frozen-after-approval reason="Story 3.9 in epics.md; user decisions 29 Oct 2026">

## Intent

**Problem:** Story 3.8 lets owners set pet rules and fees, but guests cannot declare pets. Quotes never charge the fee, and nothing stops a pet booking on a "No pets" listing.

**User decisions (29 Oct 2026):**
- **Declaration:** the guest gives a pet count (0-5) and, when the count is above 0, ticks one confirmation built from the listing's own rule ("My pets are dogs or cats under 25 kg"). The booking records the count, the confirmation text and the policy version. There are no per-pet details.
- **Farm/villa "night" units:** `per_night` and `per_pet_night` count each booked date (visit) once, whatever the slot length.

## Boundaries & Constraints

**Always:**
- **Party param:** `pets` (integer 0-5, default 0) joins the search context. It must survive category switch, login and reload (reuse the 3.1 `carrySearchContext` lists) and travel through search, listing, quote, checkout and booking.
- **Search filter:** `pets > 0` excludes listings whose effective policy is not_allowed or whose `maxPets < pets` (farm/villa and hotel; venues are unaffected).
- **Quote refusals:**
  - `pets > 0` on a not_allowed listing: 422 `PETS_NOT_ALLOWED` ("This stay doesn't allow pets").
  - Over the max: 422 `PETS_OVER_LIMIT` ("Up to N pets").
  - `pets > 0` without `petsConfirmed: true` at checkout start (hold): 422 `PETS_UNCONFIRMED`.

  The quote may be previewed without the confirmation.
- **Fee math (whole rupees × 100 = paise):**
  - free: 0;
  - per_stay: amount once per order;
  - per_night: amount × units;
  - per_pet: amount × pets;
  - per_pet_night: amount × pets × units.

  Units are hotel nights, or farm booked dates.
- **Farm/villa placement:** the pet charge is a paid extra inside the existing per-visit rent before the one service fee, so `allocateOrderFee` and the existing refund allocation cover it. A per_stay charge goes on the first visit; per-unit charges go on each visit. Each visit records `petMinor`. No tax (farm tax is `not_configured`).
- **Hotel placement:** the pet charge sits on the first room line as `petMinor` (per night on that line's nights, per_stay on its first night). It is added to the line's `roomMinor`/`totalMinor`, so the service fee and `hotelRefund` include it. It is not added to the nightly `rateMinor`, so it does not move tax slabs or tax. No invented tax.
- **Quote and terms:** they carry `pets: {count, confirmed, confirmation, unit, amount, totalMinor}` alongside the 3.8 stamp, now including the fee. The digest covers it, so a count, date or selection change gives a fresh quote, and a policy change gives QUOTE_CHANGED. Zero pets on any listing keeps the old quote shape and digest.
- **Storage:** farm stores the declaration in the order's terms snapshot (existing jsonb), and hotel stores it in `guest_details` jsonb. No migration.
- **Guest UI:**
  - The pet count stepper sits next to the party fields in search and on both booking panels.
  - The confirmation checkbox is shown before payment.
  - The summary shows "Pet fee · ₹X" as its own row inside the total.
  - The 3.8 fee text is now shown to guests, as the fee is charged.
  - Refusals give a visible message, and the entered values are kept.
- **Assistance animals:** unchanged truthful line. They are never counted as pets, and the stepper's helper says "Don't count assistance animals".

**Never:**
- No per-pet type or size entry.
- No on-request approval.
- No assistance-animal exemption logic.
- No migration.
- No entertainment change.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Hotel 2 nights, 1 pet, per_pet_night ₹300 | petMinor 60000 on first line, fee includes it, tax unchanged |
| Farm 2 dates, 2 pets, per_pet ₹200 | ₹400 on first visit (per_pet is once per pet) |
| Farm 2 dates, 1 pet, per_night ₹300 | ₹300 per visit |
| Free policy, 2 pets | allowed, 0 charge, declaration stored |
| not_allowed + pets 1 | PETS_NOT_ALLOWED |
| maxPets 1, pets 2 | PETS_OVER_LIMIT |
| Hold without confirmation | PETS_UNCONFIRMED |
| Pets 0 | quote identical to before |
| Search pets=2 | hides not_allowed and maxPets<2 |
| Owner raises fee after quote | QUOTE_CHANGED |
| Free cancel of whole hotel order | pet fee refunded with line |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- `src/services/domain/pet-policy.js`: add `petChargeMinor(policy, pets, units)` and `petProblem(policy, pets)`.
- Farm: `src/services/booking/quotes.js:156` `prepareQuote` (+ `:149` petPolicyStamp, which now includes the fee); `src/services/domain/booking-money.js:34,123` (visit rent extra); `checkout.js:66` `createCheckoutHold` confirmation check; `revalidateBookingQuote` :311.
- Hotel: `src/services/booking/hotel-stays.js:212` `buildQuote` (first-line `petMinor`); `hotel-checkout.js:50` `stayTerms`, `:88-93` `priceStay`, `:118/:145/:170` create/revalidate; `guest_details` write.
- Search: `src/services/domain/discovery.js:83-110,184,187` param; `src/services/db/discovery.js` filter (the effective policy, including the legacy derivation, in SQL or a helper).
- Zod: `src/services/schemas/zod/booking.js` (pets, petsConfirmed).
- Tests: `test/services/pet-policy.test.js` (math), the farm booking-cases/quote integration, `hotel-checkout`, `hotel-discovery` + farm discovery: every matrix row.

Frontend (`Rentra`):
- `lib/domain/discovery.js` (`pets` in the param lists/carry), `components/rentra/SearchFields.jsx` (stepper).
- `components/rentra/listing/AvailabilityPicker.jsx`, `ListingDetail.jsx`, `booking-state.js` (farm), `components/rentra/hotels/StayPicker.jsx`, `HotelRooms.jsx` (hotel): the pets in the quote request plus the fee row.
- The checkout confirmation checkbox and "Pet fee" row: `components/customer/checkout/*` (Checkout.jsx, parts.jsx `PetsNote`).
- Tests: discovery carry + a pet fee line helper.

## Tasks & Acceptance

- [x] domain math + refusals + tests
- [x] farm quote/hold + hotel quote/terms/guest_details
- [x] search param + filter
- [x] guest UI (stepper, confirmation, fee row, messages)
- [x] tests for every matrix row

**Acceptance Criteria:**
- Given a pet-allowed listing with a fee, when a guest declares pets and confirms, then the total includes the pet fee row and the one service fee covers it.
- Given a not_allowed listing, when pets > 0 is quoted, then it is refused with PETS_NOT_ALLOWED and no hold is made.

## Verification

- Backend suite on local PG only (command in the 3.3 spec; baseline 471). Never Neon, never db:migrate, do not commit.
- Frontend `npm test` (baseline 152), eslint/prettier on changed files, `npx next build`, `git diff --check`.

## Implementation Notes

- **Digest:** the 3.8 `petPolicy` stamp stays fee-free, so a pets=0 quote keeps the pre-3.9 shape and digest (farm and hotel tests compare pets=0 with no pets, and the stamp with the 3.8 shape). The fee is only in the pets>0 `pets` block (`unit`, `amount`, `totalMinor`), so a fee change voids a pet quote (QUOTE_CHANGED).
- **`pets.confirmed`** is false in the quote and true in the held order: the tick is a hold input (`petsConfirmed`), outside the quote digest.
- **Hotel pet fee is trip-level:** it is `totals.petMinor` / `visit.petMinor`, not on any room line. It is inside the service-fee base (its own fee share, `visit.petFeeMinor`) and outside tax.
  - The ledger enum `payment_component` has no `pet` value. Adding one needs a migration, which this spec forbids, so pet money is captured and refunded as `rent`. Its own amount is recorded in the payment snapshot allocation (`petMinor`, `petFeeMinor`) and on the visit snapshot.
  - Refunds (`cancellation.js` `stayEntitlement`): a partial room cancel refunds 0 of the pet fee. Cancelling every remaining room refunds the pet fee and its fee share at the ratio of room rent refunded in that cancellation, floored to the paisa.
  - Early departure (`departureEntitlement`) never refunds the pet fee, because the pets came.
- **Farm cancel (review decision, 29 Oct 2026):**
  - Once-only charges (per_stay, per_pet) are spread over all visits by largest remainder in paise, and earlier visits take the extra paise. The "Farm 2 dates, 2 pets, per_pet ₹200" row now reads "₹400 spread over visits (20000 + 20000 paise)".
  - Per-night units stay on each visit.
  - Each visit's `petMinor` sits inside its rent, so cancelling one visit refunds only that visit's share, at the visit's existing proportional rule.
  - Tests: `pet-policy.test.js` (20000 + 20000; [34, 33, 33] for an odd split; a 50% single-visit refund).
- **Ledger (review decision):** pet money is booked as `rent` in payment and refund allocation (a paid extra inside rent). The split is kept in the snapshots. No migration.
- **Search:** farm and hotel use the same SQL effective-policy check. NULL and JSON-null columns fall back to the legacy flag (max 1), matching `effectivePetPolicy`. Hotel card totals include the pet charge (`hotelSearchOffers` gets `pets`).
- **Errors:**
  - Pet refusals are 422 everywhere: the customer actions, the hold, and the public `POST /discovery/listings/:code/stay-quote`.
  - An out-of-range or non-integer value gives `PETS_INVALID`. `petsSchema` accepts anything and the quote's `petProblem` validates it.
- **UI:** the stepper shows only for farm/villa and hotel searches and panels. It is a labelled `role=group`, uses aria-disabled at the bounds, and has a live value.

## Review Triage Log

- Review 1 (coordinator), 8 items, all fixed:
  1. HIGH, digest: the stamp stays fee-free at pets=0. Tests: `pet-policy.test.js` and `hotel-checkout`.
  2. HIGH, hotel partial cancel: the pet fee moved to order level with the refund rule above. Tests in `hotel-checkout`: free whole cancel refunds 60000; partial cancel refunds 0; a 50% late whole cancel refunds 30000, equal to floor(pet × rent ratio). Farm first-visit gap fixed after the owner decision (spread over visits).
  3. HIGH: hotel card totals include the pet fee. Test in `hotel-discovery`.
  4. Public stay route returns 422 for PETS_*. This is a mapping in `stayError` with no HTTP-level test.
  5. SQL and domain agree on JSON null. Farm search integration case added in `request-to-book`.
  6. `PETS_INVALID` 422.
  7. PetsStepper a11y.
  8. Stepper shown for stay searches only.

## Results

- After review 1: backend 475/475 on local PostgreSQL (DATABASE_URL unreachable); eslint 0 errors (warnings are ignored files); `git diff --check` clean.
- Frontend `npm test` 154/154; eslint and prettier clean on changed files; `next build` passes; `git diff --check` clean.
- Not committed. Browser QA not run. See Implementation Notes for the ledger-component and farm first-visit limits.

- Closure: last money item fixed (kept pet + fee remainder in chargeMinor; paid = refund + charge asserted). Committed backend 2778bda, frontend d76f690; backend 475/475, frontend 154/154.
