---
title: 'Story 3.6 - configure explicit child age and accommodation policies'
type: 'feature'
created: '2026-10-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: ['_bmad-output/implementation-artifacts/epic-3-context.md', '_bmad-output/implementation-artifacts/spec-3-4-bedding-per-night.md']
baseline_commit: 'backend ad5f86c530e161eb71ba8d7004d80332f39aebdd; frontend 8049e2d20924de025dea2deb8deb9d4d5818baa2'
---

<frozen-after-approval reason="Story 3.6 in epics.md; user decisions 29 Oct 2026">

## Intent

**Problem:** Hotels have one hotel-wide age, "children under N stay free", plus one extra-child price per room. Owners cannot:
- define infant and child bands;
- set an adult-rate age;
- override the policy per room;
- declare cots.

Guests see only "Children under N stay free".

**User decisions (29 Oct 2026):**
- **Pricing now:** quotes use the new bands immediately for `free` and `fixed` rules. The `percent` rule is Story 3.7; it is not offered or accepted in 3.6.
- **Overrides:** the property default plus an optional override per room type. No rate-plan override.
- **Cots:** the owner declares cots per room (count 0-4, free or fixed ₹/night).
  - Infants count toward physical occupancy.
  - If the party exceeds `maxOccupancy` only because of infants, each overflow infant needs a cot.
  - With not enough cots, the quote is refused with `HotelError('COT_UNAVAILABLE', '{room} has no cot for infant N')`.
  - Charged cots add to that night's rate before tax, like 3.4 bedding.
- **Supervision:** each room needs at least one guest aged 18 or over. The existing `adults >= 1` is that guest. A minor on the adult rate is still a child: they are in `childAges`, never counted as an adult for maxAdults or supervision.

## Boundaries & Constraints

**Always:**
- **Policy shape (`childPolicy`):**
  - `{ adultRateFromAge: 2..18, bands: [{ kind: 'infant'|'child', fromAge, toAge, rule: { type: 'free'|'fixed', amount } }] }`.
  - The bands must exactly cover `0 .. adultRateFromAge-1`, sorted, with no gaps or overlaps.
  - Infant bands, when present, come first and start at 0.
  - `amount` is whole rupees 0-50000 per child per night (fixed); 0 for free.
  - `adultRateFromAge` 18 means no minor pays the adult rate.
  - Validated in zod with a clear message ("Ages 6-7 are not covered").
- **Pricing (in `roomOccupancy`/`priceRoomStay`):** each child is matched by actual age to a band.
  - Ages at or above `adultRateFromAge` are priced as an extra adult: they use `baseOccupancy` and `extraAdultMinor` like adults, but stay children for maxAdults and supervision.
  - Band children: free costs 0; fixed costs `amount` per night. They are charged beyond base occupancy only, the same position the current extra-child charge has.
  - The actual age is never altered and is stored as given.
- **Fallback (no policy saved):** derive from current data, so existing quotes do not change:
  - infant 0..childFreeAge-1 free;
  - child childFreeAge..17 fixed `extraChildMinor`;
  - `adultRateFromAge` 18.

  Add a test that existing hotel quotes are identical under the fallback.
- **Versioning:** `hotel_profile.child_policy_version` is bumped whenever the default or any room override or cot setting changes. Each quote line carries `childPolicy: { version, source: 'property'|'room', policy }` and cot details, so stale quotes become QUOTE_CHANGED at checkout through the existing digest. The snapshot also goes into `room_snapshot`.
- **Disclosure:** guest hotel facts and each room list the effective bands in plain words ("Under 2: free · 2-11: ₹500/night · 12+: adult rate"). They also show cots ("1 cot · free") and "At least one guest 18+ per room". This replaces the "Children under N stay free" line.
- **Owner UI:**
  - The policy editor is on the hotel profile step: add/remove bands and the adult-rate age, with live gap/overlap errors.
  - Each room gets "Use property child policy" (default) or "Room-specific policy" (the same editor), plus a cots count and price.
  - Values survive a failed save.
  - Child and cot settings are visible, not hidden in optional detail.

**Never:**
- No percent rule (3.7).
- No rate-plan override.
- No non-hotel child rules.
- No date of birth.
- No change to bedding (3.4).
- Changes are audit only; no re-review.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Bands 0-1 infant free, 2-11 child ₹500, adult from 12 | saves |
| Bands 0-1, 3-11 (gap 2) | 422 "Age 2 is not covered" |
| Overlap 0-5 and 4-11 | 422 |
| Existing hotel, no policy | quotes unchanged (fallback) |
| Child age 13, adult from 12, base 2, 2 adults | charged extraAdultMinor; not counted in maxAdults |
| Child age 5, ₹500 fixed, beyond base | +₹500 per night |
| Room override differs from property | room override applies; line source 'room' |
| Party over maxOccupancy by 1 infant, 1 cot | accepted, cot charged if priced |
| Same, 0 cots | COT_UNAVAILABLE |
| Owner changes policy after quote | checkout QUOTE_CHANGED |
| Percent rule submitted | 422 |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- Migration `drizzle/0086_child_policy.sql` + journal (`IF NOT EXISTS`; extend the early-departure stub pattern):
  - `hotel_profile.child_policy jsonb NULL`, `child_policy_version int NOT NULL DEFAULT 1`;
  - `room_type.child_policy jsonb NULL`, `cots jsonb NOT NULL DEFAULT '{"count":0}'`.
- `src/services/domain/hotel-rooms.js` (or new `child-policy.js` in domain): `effectiveChildPolicy(profile, room)`, `policyProblem(policy)`, `bandFor(policy, age)`, `cotNeed(...)`.
- `src/services/domain/hotel.js:62` `roomOccupancy` / `:103` `priceRoomStay`: band pricing and cots (reuse the 3.4 per-night addition).
- `src/services/schemas/zod/listing.js:230-235,312`: `childPolicy` (profile and room), `cots`.
- `src/services/booking/hotel-setup.js:64-78,190,213-217`: save/read; bump the version on change; audit.
- `src/services/booking/hotel-stays.js`: load the policy, version and cots (:54, :104, :126-133); add to quote lines and `room_snapshot`.
- `src/services/db/queries.js:453-472`: guest detail effective policy per room plus cots.
- Tests: `test/services/hotel-domain.test.js` (+ new domain test), `hotel-owner-flow`, `hotel-checkout` (QUOTE_CHANGED, fallback identical); fixtures at `test/helpers/hotel-fixture.js:24`.

Frontend (`Rentra`):
- `components/partner/listing/HotelSections.jsx`: profile child age at :1075-1087 (replace with the band editor), rooms :149/:154/:368/:373/:519/:533 (override toggle + cots; extra-child input moves into the policy).
- `components/rentra/hotels/HotelFacts.jsx:60`: disclosure; `HotelRooms.jsx`: per-room policy line + cots.
- `lib/domain/hotel-ui.js`: a mirrored `policyProblem` + `policyLine` with unit tests.
- Admin read-only `app/(admin)/admin/properties/[id]/page.js:874,964,968`: show the policy.

## Tasks & Acceptance

- [x] 0086 + journal; db:check
- [x] domain policy/cot helpers + pricing + fallback
- [x] schema, setup save/read, version bump, snapshot
- [x] owner UI + guest disclosure + admin read
- [x] tests for every matrix row

**Acceptance Criteria:**
- Given bands with a gap, when the owner saves, then the save is refused naming the uncovered ages, and the entries remain.
- Given a 13-year-old with adult-rate from 12, when quoted, then they pay the adult rate but are stored as age 13 and do not count as a supervising adult.
- Given no saved policy, when an existing hotel is quoted, then the totals are unchanged.

## Verification

- Backend suite on local PG only (command in the 3.3 spec; baseline 453). Never Neon, never db:migrate, do not commit.
- Frontend `npm test` (baseline 149), eslint/prettier on changed files, `npx next build`, `git diff --check`.

## Implementation Notes

- Adult-rate minors pay the extra adult price but get no bedding charge. This is intended: per Story 3.4, children share beds.
- When only some fixed-band children are beyond base occupancy, the oldest pay first. Guests are told this rule.
- If no policy is saved, the hotel uses the fallback: under `childFreeAge` free, then each room's `extraChildMinor`. Fallback rooms keep a visible "Extra child ₹" input.
- An overflow made up only of infants in a room with 0 cots now returns `COT_UNAVAILABLE` (it was `OCCUPANCY`).
- Every quote line now carries `childPolicy`, so quotes open at deploy time requote once.

## Review Triage Log

- Review 1 found 7 issues. All are fixed.
  1. A first property policy seeded the child band at ₹0.
     - It now seeds the rooms' common extra-child price.
     - If rooms differ, a warning names the prices and the one the policy applies, and a "Keep each room's price" button saves room-specific overrides with each room's current price.
  2. A blank age or price was saved as 0. Blanks now stay blank, `policyProblem` names them, and both forms block the submit.
  3. A room-specific policy is now seeded from the property's effective policy, or from `childFreeAge`, instead of a fixed 6. Fallback rooms keep the "Extra child ₹" input.
  4. The rooms save now bumps the version only on a real change to a room's effective terms: own policy, cots, and `extra_child_minor` while there is no property policy. It ignores inactive and omitted rooms, and new or reactivated rooms with no policy and no cots.
  5. A `childFreeAge` change bumps the version only when no property policy is saved.
  6. The disclosure adds "for guests beyond the room's base occupancy; when only some children pay, the oldest pay first".
  7. `policyProblem` runs the same checks on both sides: kinds, integer ranges, a free band's amount must be 0, fixed amounts, and an explicit order message before the coverage check. Both sides have tests.
- Review 2 found 2 closure items.
  1. Fixed. "Keep each room's price" now replaces only the price on child bands with a fixed price. Infant bands and other amounts the owner set stay as they are. The "applies ₹X" warning reads the same bands.
  2. Checked; no change needed. The keep form's version field takes the highest of the listing version, the page-level version and the versions returned by the stay and keep saves (`ownedHotel` returns the current version). The rooms save therefore always sends the latest version after a stay save, and the reverse holds too.

## Results

- Backend: 462/462 on local PostgreSQL. `db:check` passes with 87 migrations. eslint/prettier are clean and `git diff --check` is clean.
- Frontend: `npm test` 150/150. eslint/prettier are clean, `next build` passes and `git diff --check` is clean.
- Nothing is committed. 0086 is not on Neon; 0076-0086 are pending there.
- Not run: browser QA.

- Closure: CLOSED (rooms-form version question accepted: shared VersionField/chrome mechanism unchanged). Committed backend 2d318cb, frontend 0717024; backend 462/462, frontend 150/150.
