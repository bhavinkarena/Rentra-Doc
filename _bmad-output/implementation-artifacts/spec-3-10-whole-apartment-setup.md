---
title: 'Story 3.10 - configure exclusive whole-apartment stays'
type: 'feature'
created: '2026-10-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: ['_bmad-output/implementation-artifacts/epic-3-context.md', '_bmad-output/implementation-artifacts/spec-3-8-pet-policy.md']
baseline_commit: 'backend 2778bda7e72082256a66f44ba2e0936885133c07; frontend d76f6903f7ffd8c30d47e9cb9961beae7fcb8ce4'
---

<frozen-after-approval reason="Story 3.10 in epics.md; user decisions 29 Oct 2026">

## Intent

**Problem:** Rentra has no whole-apartment stay. Owners cannot list an apartment as one exclusive nightly unit with its own beds, bathrooms, night limits, times, turnover buffer and cleaning fee.

**User decisions (29 Oct 2026):**
- **Before Story 3.11:**
  - Owners can create, save and submit apartment listings, and admins can review and approve them.
  - Approved apartments stay hidden from every guest surface (search, category tabs, listing page, saved places, quotes) until 3.11 makes them bookable.
  - The owner portal says "Apartments go live for guests soon".
- **Pricing:** a flat weekday and weekend nightly price for the whole unit, the same for any party up to max occupants, plus the one-off cleaning fee. There are no per-guest or child charges.
- **Max nights:** the owner sets 1-90, with `minNights ≤ maxNights`.
- **Turnover buffer:** whole nights, 0-3, blocked after each checkout. It is stored now and enforced in 3.11.

## Boundaries & Constraints

**Always:**
- **Type identity:**
  - An apartment is a category `whole-apartment` (name "Whole apartment") under the existing stay vertical `hotel`, with a new `rental_unit` enum value `unit_night`.
  - Migration 0088 uses `ALTER TYPE ... ADD VALUE IF NOT EXISTS` plus the category seed row, and is idempotent.
  - Apartments must never enter hotel branches, which key on `rental_unit = 'night'`. They must also never enter farm slot or venue hour branches.
- **Apartment profile:** `apartment_profile` (1:1 with rentable, FK cascade), in migration 0088:
  - `bedrooms 0-20`, `bathrooms 1-20`;
  - `beds jsonb` (reuse the 3.3 bed types and the `bedCapacity` helper);
  - `max_adults 1-30`, `max_children 0-20`, `max_occupants`;
  - `min_nights 1-90`, `max_nights 1-90`;
  - `arrival_rules jsonb`: optional per-weekday minimum nights `{mon..sun: 1-90}` and optional date-range minimums `[{from, to, minNights}]`, max 20;
  - `check_in_minute`, `check_out_minute`;
  - `turnover_nights 0-3`;
  - `cleaning_fee_minor` (whole rupees 0-50000, zero allowed and shown as "No cleaning fee");
  - `weekday_minor`, `weekend_minor`, `weekend_nights`, reusing the hotel weekend convention;
  - `version int`.
- **Facilities:** use the existing amenity mechanism.
- **Validation (zod plus a shared domain `apartmentProblem`, mirrored in the frontend):**
  - Bed capacity must be at least `max_adults` (the 3.3 rule; no extra-place concept here).
  - `max_occupants ≥ max_adults`; `min ≤ max nights`; every arrival minimum is within `[min, max]`.
  - Check-out must be before check-in on the same day, or the times are simply both valid times.
  - No 28-night cap or other universal cap beyond the user's 90.
- **Owner wizard:** an apartment chapter set, mirroring the hotel chapter structure in `lib/domain/listing-steps.js` (FE and BE):
  - Unit (bedrooms, bathrooms, beds, occupants);
  - Stay rules (min/max nights, arrival minimums, times, turnover);
  - Price (weekday/weekend, cleaning fee);
  - then the shared location, photos, facilities, house rules (pet policy from 3.8), terms and submit.

  Values survive a failed save. Saves use an expectedVersion check and audit. Completion checks the required fields.
- **Admin review:** shows the apartment profile read-only. The approve flow is unchanged.
- **Guest gate:** every discovery, listing-detail, saved-place and quote path excludes `unit_night`. A direct listing URL returns not found to guests; the owner and admin still see it.

**Never:**
- No individual room sales.
- No lease or installment product.
- No quote, hold or calendar booking (3.11).
- No child tariff.
- No change to farm/villa or hotel units or behavior.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Owner creates Whole apartment draft | rental_unit unit_night; apartment wizard |
| 1 double bed, max adults 3 | 422 sleeping-place message |
| min 5 max 3 | 422 |
| Saturday arrival min 2 with min 1 max 30 | saves |
| max nights 91 | 422 |
| Cleaning fee 0 | saves; owner preview "No cleaning fee" |
| Stale save (old version) | 409, entries kept |
| Approved apartment, guest search/category/listing URL | not shown / 404 |
| Hotel and farm listings | unchanged (existing suites green) |
| Other owner edits | not found |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- `drizzle/0088_whole_apartment.sql` + journal: enum value, `apartment_profile`, category seed (vertical `hotel`, `default_rental_unit unit_night`). Update the drizzle schema (`src/services/db/schema/index.js:113` enum, `:702` category). Extend the early-departure stub if it recreates the schema.
- New `src/services/domain/apartment.js` (`apartmentProblem`, defaults) and `src/services/booking/apartment-setup.js` (save/read, version, audit), modelled on `hotel-setup.js`.
- `src/services/auth/listings.js`:
  - create at :158 / basics at :183 / type at :803 (the category default unit check);
  - add apartment save actions like `hotelProfileAction` :462;
  - `saveRules` :292 routing.
- `src/services/domain/listing-steps.js:31-78`, `listing-completion.js:108,209` (apartment sections).
- `src/services/admin/listings.js:100-104` (apartment payload), `admin/verification.js` checklist.
- Guest exclusion: `src/services/db/discovery.js:78,134,217,300-312`, `listing-queries.js:131`, `queries.js` getListingByCode, saved places, quote entry points: guard on `unit_night`.
- Validation enums: `src/validations/listings.validation.js:27` if needed.
- Tests: domain unit test; integration test for create, save, 422s, version 409, admin read and the guest 404/search exclusion; existing suites stay green.

Frontend (`Rentra`):
- `lib/domain/listing-steps.js:27-80`, `lib/domain/listing-completion.js`, `lib/validation/zod/listing.js:17` (enum).
- New `components/partner/listing/ApartmentSections.jsx` (reuse the HotelSections bed editor pieces and `SectionPrimitives`).
- Partner pages that switch on `rental_unit` (find the hotel branches) plus the "go live soon" note.
- `components/admin/PropertyReviewForm.jsx`: apartment read-only block.
- `lib/domain/apartment.js` mirror + test.

## Tasks & Acceptance

- [x] 0088 + journal + schema; db:check
- [x] domain validation (both sides) + setup service + actions
- [x] wizard chapters + sections UI + completion
- [x] admin read + guest exclusion
- [x] tests for every matrix row; existing suites green

**Acceptance Criteria:**
- Given an owner, when they configure and submit an apartment with valid rules, then it saves with a version and audit, and it reaches admin review.
- Given an approved apartment, when a guest searches or opens its URL, then it is not shown until Story 3.11.

## Verification

- Backend suite on local PG only (command in the 3.3 spec; baseline 475). Never Neon, never db:migrate, do not commit.
- Frontend `npm test` (baseline 154), eslint/prettier on changed files, `npx next build`, `git diff --check`.

## Review Triage Log

- Review 1 found 9 items, all fixed.
  1. `bookingModel` returned 'slot' for unit_night. It now returns 'apartment'. The slot entry points refuse apartments with 409 `UNSUPPORTED_INVENTORY`: `saveBookingConfiguration`, `saveBookingPriceOverride`, `openBookingDates`, `setAutoOpen`, `prepareInventoryCheck`, `changeCalendarCells` and `prepareQuote`. Tested on `saveBookingConfiguration`.
  2. `saveApartment` now reads the profile first and inserts it only when it is missing. An unchanged save keeps `content_version` (tested).
  3. `apartmentProfile` added to the drizzle schema.
  4. The `saveBasics` booking-model guard applies only when either side is unit_night.
  5. Apartments use the night cancellation presets (24 h, 3 days, 7 days) through `presetFamily`, on both backend and frontend. `listingCancellationPolicy` derives from the tier with night presets. Unit tested.
  6. Hotel-only admin and ops queries now filter `rental_unit='night'`: `hotel-finance.js` (commission counts, hotel picker, commission resolve), `hotel-analytics.js` (owner hotels, admin scope) and `hotel-release.js` (live hotels).
  7. The category seed moved into `src/scripts/apartment-category.js` (`seedApartmentCategory`), which `migrate.js` calls after commit. The test calls it twice against local PG and expects one row.
  8. Owner, unit and version checks run before payload validation in `saveApartment`. `apartmentAction` already checks ownership through `getListingForEdit` first.
  9. Apartments use the hotel photo limits (8 to 40) on both sides, plus their own photo hint. Farm ownership documents are kept. Empty `weekendNights` is allowed.

## Results

- After review fixes: backend 484/484 on local PostgreSQL, frontend 156/156, `db:check` 89, eslint/prettier clean, `next build` passes, `git diff --check` clean.
- First pass: backend 482/482 on local PostgreSQL (baseline 475, +7); `db:check` 89; prettier clean on changed tests; `git diff --check` clean.
- Frontend `npm test` 156/156 (baseline 154); eslint/prettier clean on changed files; `next build` passes; `git diff --check` clean.
- Deviation: the "Whole apartment" category seed is not in 0088. `db:migrate` runs every pending file in one transaction, so a row using `unit_night` there fails with 55P04. `src/scripts/migrate.js` inserts it (idempotent, `ON CONFLICT (slug) DO NOTHING`) after the migration commits.
- Nothing committed. 0088 not on Neon. Browser QA not run.

- Closure: CLOSED. Committed backend 2f090be, frontend edee443; backend 484/484, frontend 156/156, db:check 89.
