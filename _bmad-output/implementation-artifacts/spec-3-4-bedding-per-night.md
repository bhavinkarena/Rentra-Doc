---
title: 'Story 3.4 - quote fixed or percentage bedding per night'
type: 'feature'
created: '2026-10-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: ['_bmad-output/implementation-artifacts/epic-3-context.md', '_bmad-output/implementation-artifacts/spec-3-3-rooms-offers-inclusions.md']
baseline_commit: 'backend 281c3c79f9dd376679070dcc010c76bec3eadc75; frontend 3e10301506251d1378cd0a13951b46f77bff7e63'
---

<frozen-after-approval reason="Story 3.4 in epics.md; user decisions 29 Oct 2026">

## Intent

**Problem:** Story 3.3 lets owners declare extra beds and mattresses, but no quote charges for them. A guest who needs one sees no price for it, and an owner can't charge for it.

**User decisions (29 Oct 2026):**
- **When charged:** only for adults the room's beds cannot hold. `needed = max(0, adults - bedCapacity(beds))`. Children share beds (child rules come in Story 3.6).
  - 2 adults in a double: 0 places.
  - A double + single with 3 adults: 0 places.
  - A double with 3 adults: 1 place.
- **Double-charge guard:** a per-room owner checkbox "Extra adult price includes bedding" (`extraAdultIncludesBedding`, default false).
  - When ticked and the extra adult price is above 0, places for paying extra adults are not charged again: `covered = min(needed, extraAdults)`.
  - When unticked, both the extra adult price and the bedding are charged.
- **Price per type:** each `extraPlaces` row gets its own `charge: {mode: 'fixed'|'percent', amount}`:
  - fixed: whole rupees 0-50000 per place per night;
  - percent: 0-100 of that night's room-only price.

  Charged places are filled cheapest-per-night type first.

## Boundaries & Constraints

**Always:**
- **Room-only base:** the percentage base is the base plan's own nightly rate for that night (override, weekend or weekday), before the derived meal-plan adjustment, the per-guest charge and extras. Rounding is half-up to paise via `applyBasisPoints`, with percent × 100 as bps.
- **Where bedding goes:** each night's bedding is added to that night's `rateMinor` before tax, like the extra guest charges. It is therefore inside the tax slab, the Rentra fee and refund allocation (`allocateOrderFee`, `hotelRefund` and the late charge), as a paid extra. Each priced night also records `beddingMinor`. The line records `bedding: [{type, count, mode, amount}]`.
- **Unavailable places:** if `needed - covered` is more than the declared places, the quote is refused with `HotelError('BEDDING_UNAVAILABLE', '{room} has no sleeping place for adult N')`. The 3.3 save rule normally prevents this; old non-compliant rooms reach it.
- **Stale prices:** the bedding is part of the quote content, so `quoteDigest` covers it. A changed bedding price or checkbox after quoting gives the existing `QUOTE_CHANGED` requote at checkout. Accepted bookings keep the quoted bedding in the quote/terms snapshot and `room_snapshot` (add the charges and the checkbox).
- **Old data:** places without a `charge` are free (charge 0). Saves accept it as optional; the owner UI defaults to fixed ₹0.
- **Owner UI:** each extra-place row gets a fixed ₹ / % choice plus an amount, and the room gets the checkbox. Values survive a failed save.
- **Guest UI:** when bedding is charged, the plan row and stay rail show "Includes 1 extra bed · ₹X/night". It is never hidden in a collapsed region.

**Never:**
- No child bedding (Story 3.6).
- No new tax rule.
- No change to the 3.3 capacity rule.
- No re-review trigger: bedding prices follow the 3.3 extra-places decision (audit only).

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Double, 2 adults | no bedding |
| Double+single, 3 adults | no bedding |
| Double + extra bed fixed ₹500, 3 adults, 2 nights | +50000 paise each night, taxed, fee-allocated |
| Extra bed 10%, weekday 4000 / weekend 6000 | 400 / 600 per night |
| Mattress ₹300 + extra bed ₹500, 1 needed | mattress charged |
| Ticked includes-bedding, extra adult ₹800, base 2, 3 adults | no bedding |
| Unticked, same | ₹800 + bedding |
| Old room 1 king max 3, no places, 3 adults | BEDDING_UNAVAILABLE |
| Owner changes bedding price after quote | checkout QUOTE_CHANGED |
| Place without charge (pre-3.4) | free |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- `src/services/domain/hotel.js:103` `priceRoomStay`: compute bedding per night after `planNightRate`. Get the room-only base via a small helper, or the base plan's own rate. Reuse `roomOccupancy.extraAdults`.
- `src/services/domain/hotel-rooms.js`: add the pure `beddingPlan({beds, extraPlaces, adults, extraAdults, extraAdultMinor, includesBedding})`, which returns the places to charge (cheapest is chosen per night in `priceRoomStay`, since percent varies). Mirror it in `Rentra/lib/domain/hotel-ui.js` if the UI needs it.
- `src/services/schemas/zod/listing.js:218`: add the `charge` to `extraPlaces` items, and `extraAdultIncludesBedding` boolean to rooms.
- Migration `drizzle/0085_bedding_charge.sql` + journal: `room_type.extra_adult_includes_bedding boolean NOT NULL DEFAULT false` (use `IF NOT EXISTS`, and the early-departure 0075 stub pattern). The charges live inside the `extra_places` jsonb, so no column is needed for them.
- `src/services/booking/hotel-setup.js`: save and read both. Changing them is audit only, with no re-review.
- `src/services/booking/hotel-stays.js:126` `priceLine` / `:200` `buildQuote` / `:139` snapshot: pass the room fields through; quote lines carry `bedding` and `beddingMinor`.
- `src/services/db/queries.js` guest detail: expose the charges per room for display.
- Tests:
  - `test/services/hotel-domain.test.js` and `hotel-rooms.test.js`: every pricing row.
  - `test/integration/hotel-checkout.integration.test.js`: QUOTE_CHANGED on a bedding change, and fee/refund including bedding.
  - `hotel-owner-flow`: save/read.

Frontend (`Rentra`):
- `components/partner/listing/HotelSections.jsx:169` `ExtraPlaces`: charge mode and amount; the checkbox near the extra adult input (:476); the save map at :311.
- `components/rentra/hotels/HotelRooms.jsx` `PlanRow` (:680) / `StayRail` (:785): the bedding line from the quote response.
- `lib/domain/hotel-ui.js`: label helper + test.

## Tasks & Acceptance

- [x] 0085 + journal; db:check
- [x] schema + setup save/read
- [x] pricing + quote/snapshot + BEDDING_UNAVAILABLE
- [x] owner + guest UI
- [x] tests for every matrix row

**Acceptance Criteria:**
- Given 3 adults in a double with an extra bed at 10%, when quoted, then each night adds 10% of that night's room-only price before tax and fee.
- Given the extra adult price includes bedding, when the guest needs a place, then bedding is not charged twice.
- Given a bedding price change after the quote, when the guest pays, then checkout returns QUOTE_CHANGED.

## Verification

- Backend suite on local PG only (the command in the 3.3 spec); baseline 449. Never Neon, never db:migrate, do not commit.
- Frontend `npm test` (baseline 147), targeted eslint/prettier, `npx next build`, `git diff --check`.

## Implementation Notes

- `beddingPlan` and `placeNightMinor` live in `src/services/domain/hotel-rooms.js`; `priceRoomStay` fills cheapest per night. `planNightRate` now also returns `roomOnlyMinor` (the base plan's own rate).
- Nights carry `beddingMinor` and lines carry `bedding` only when a night's bedding is above ₹0. Quotes for pre-3.4 rooms with ₹0 places keep their old shape and hash, and guests see no unpriced "Includes" line.
- Rooms with no declared beds (seeded/imported rows; `beds` defaults to `[]`) charge no bedding and are never refused. Otherwise every seeded hotel would become unbookable. Accepted in review.
- The line's `bedding` lists every type charged on any night, at its largest nightly count, with that type's mode and amount. With mixed fixed and percent types, the label can therefore name both types even though each night charges only one.
- Availability plans return `bedding: [{bedding, nights:[{beddingMinor}]}]` per charged room for the plan-row label. `beddingLine` in `Rentra/lib/domain/hotel-ui.js` shows a ₹low–₹high range when a percentage varies by night.
- The 3.3 owner-flow test "old room 1 king max 3 still quotable with 3 adults" now expects BEDDING_UNAVAILABLE for 3 adults and stays bookable for 2, as this spec's matrix requires.

## Review Triage Log

- Review 1 found 5 issues. All are fixed.
  - The line label came from night 0 only. It now uses every night.
  - ₹0 places changed the quote shape. Bedding is now omitted unless it is priced, with a test.
  - Switching between ₹ and % kept the old amount. The amount now resets to 0.
  - A blank amount saved as ₹0. The input is now required, so the browser blocks the save, and an inline "Enter a price (0 for free)" alert shows.
  - `beddingLine` broke when `nights` was missing. It now guards for that.
- Review 1 also asked whether the checkout terms (`visit.rooms` in `hotel-checkout.js`) render bedding. Confirmed: they carry no bedding fields, and the bedding label is used only in `HotelRooms.jsx`.

## Results

- Backend (after review fixes): 452/452 on local PostgreSQL, 0 skipped. `db:check` passes with 86 files. `git diff --check` is clean. Uncommitted.
- Frontend: `npm test` 148/148, targeted eslint/prettier clean, `next build` passes, `git diff --check` clean. Uncommitted.
- 0085 is not on Neon. 0076-0085 are pending, and 0085 must be applied before this backend deploys.
- Not run: browser QA of the owner rooms step and the guest room list.

- Closure re-check: line label keyed by place row (two rows of one type no longer merge); blank-amount programmatic submit accepted (native required blocks the form). Committed backend 4fc5a8b, frontend 391ff18; backend 452/452 after final fix.
