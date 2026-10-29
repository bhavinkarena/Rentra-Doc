---
title: 'Story 3.3 - configure accurate rooms, offers and inclusions'
type: 'feature'
created: '2026-10-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 1
context: ['_bmad-output/implementation-artifacts/epic-3-context.md', '_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/mockups/key-owner-rooms.html', '_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/mockups/owner-setup-notes.md']
baseline_commit: 'backend 8af1ef397918ca78b0cf7352e652304e8b5f3f92; frontend 31b4d8813c116b5e5c6aaeb39ca7bdc138f0cb32'
---

<frozen-after-approval reason="Story 3.3 in epics.md; user decisions 29 Oct 2026">

## Intent

**Problem:** Hotel room setup has four gaps.
- An owner can save "max 3 adults" with one double bed. No sleeping place backs the third adult.
- Room facilities exist in the payload but have no picker.
- Meal inclusions are only a code (EP/CP/MP/AP) with no visible meaning or override.
- An accepted booking stores only the plan snapshot. The room name, beds, facilities and size are read live, so later edits change what the guest was promised.

**User decisions (29 Oct 2026):**
- **Adults need a real place.** Bed capacity plus declared extra sleeping places must cover Max adults.
  - Bed capacity: king, queen, double and bunk sleep 2; single and sofa bed sleep 1.
  - Children may share existing beds (child rules come in Story 3.6).
  - A save that breaks this is refused with a clear message.
- **Existing non-compliant rooms:** flag them and fix on the next save. They stay bookable as now. The owner portal shows the warning "Add a sleeping place or lower max adults", and the next rooms save must comply.

## Boundaries & Constraints

**Always:**
- **Extra sleeping places** are a new per-room list: `extraPlaces: [{type: 'extra_bed'|'mattress', count 1-4}]` (max 2 rows). Each sleeps 1.
  - They are a physical promise, not a price. The extra adult or child price fields stay separate.
  - Bedding prices are Story 3.4; nothing here charges for them.
- **Capacity rule (server-side, in `hotelRoomSchema` superRefine):** `sum(beds capacity) + sum(extraPlaces) >= maxAdults`. The error names the room and the shortfall, e.g. "Deluxe: 1 double bed sleeps 2; add a sleeping place or lower max adults to 2". The frontend shows the same check live.
- **Room facilities picker:** checkboxes from a fixed list of room facility keys, reusing existing keys where they exist. It is labelled "In this room", separate from hotel-wide facilities ("At the hotel", existing `rentable_amenity`, unchanged).
- **Meal inclusions per rate plan:** each meal plan code has a visible default:
  - EP: none.
  - CP: breakfast.
  - MP: breakfast + one of lunch/dinner. The owner picks which; this is required.
  - AP: breakfast, lunch and dinner.

  The owner may override to add meals, never to remove the code's minimum. The UI shows "Default for {code}" and marks overrides. Stored as `inclusions: {breakfast, lunch, dinner}` on `rate_plan`.
- **Snapshot:** on stay booking, `booking_room.room_snapshot` stores name, beds, extraPlaces, sizeSqm, view, room amenities, baseOccupancy, maxAdults, maxChildren and meal inclusions. Records, vouchers and guest and owner booking views read the snapshot when present, falling back to live data for old rows.
- **Failed save:** owner-entered values survive a failed save (rooms and rates already keep local state; keep that, and add inclusions and facilities to it).
- **Flag:** `hotelForEdit` and the partner listing view return `capacityWarnings: [{roomTypeId, message}]` for saved rooms that break the rule. A banner on the rooms step lists them. Guest booking is unchanged.

**Never:**
- No bedding charges or quote changes (Story 3.4).
- No child-age rules (Story 3.6).
- No change to guest occupancy checks at quote time.
- No new room photo upload. The existing PhotosSection room assignment stays.
- No invented tax.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| 1 double, max adults 2 | saves |
| 1 double, max adults 3, no extra | 422 with shortfall message, nothing saved, form keeps values |
| 1 double + 1 extra bed, max adults 3 | saves |
| 2 singles + mattress, max adults 3 | saves |
| Existing saved room 1 king max adults 3 | still bookable; owner sees warning; next save refused until fixed |
| CP plan, no override | inclusions breakfast only, shown as default |
| MP plan without lunch/dinner choice | 422 |
| AP plan, try to remove dinner | refused |
| Booking made, owner later renames room/changes beds | booking views show snapshot values |
| Old booking without snapshot | views use live values (unchanged) |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- `src/services/schemas/zod/listing.js:212-233` `hotelRoomSchema`: add `extraPlaces`, the capacity superRefine and a bed capacity map. `:258` `hotelPlanSchema`: add `inclusions` and the meal minimum rule. Put the shared constants in one small module (e.g. `src/services/domain/hotel-rooms.js`) with `bedCapacity` and `mealDefaults`.
- New `drizzle/0084_room_promises.sql` plus journal idx 84:
  - `room_type.extra_places jsonb NOT NULL DEFAULT '[]'`;
  - `rate_plan.inclusions jsonb` (null means use the code default; backfill not needed);
  - `booking_room.room_snapshot jsonb`.
- `src/services/booking/hotel-setup.js:46-105` `saveHotelRooms`: write `extra_places` and amenities. Rates save: write inclusions. `hotelForEdit`: return them plus `capacityWarnings`.
- `src/services/booking/hotel-stays.js:135-139,253-260`: build `room_snapshot` from the locked room_type and plan at insert.
- Readers: `src/services/booking/records.js:277` (room name join) and any voucher or booking detail reading room fields -- prefer the snapshot.
- `src/services/db/queries.js:450-480` guest detail payload: include `extraPlaces` and per-plan `inclusions` (resolved with defaults) so guests see what is included. Display only; no Story 3.2 change needed beyond the existing labels.
- Tests: extend `test/integration/hotel-owner-flow.integration.test.js`, which already saves rooms with 1 king and maxAdults 3 at :71-86 (update that fixture to declare an extra bed). Cover every matrix row, and the snapshot in `hotel-checkout`/`hotel-stays` integration tests. Add a unit test for `bedCapacity` and `mealDefaults`.

Frontend (`Rentra`):
- `components/partner/listing/HotelSections.jsx`:
  - :156-336 rooms: an "Extra sleeping places" sub-section beside the beds, a live capacity line ("Sleeps 2 in beds + 1 extra = 3 adults"), the inline shortfall message, and the "In this room" facility checkboxes;
  - the warning banner from `capacityWarnings`;
  - :467-610 rates: under the meal plan select, show default inclusions and override checkboxes (MP needs a lunch or dinner pick);
  - :182-197 payload: include `extraPlaces` and `inclusions`.
- Guest-facing: `components/rentra/hotels/HotelRooms.jsx`:
  - plan rows show the included meals from `inclusions`;
  - the room facts show extra sleeping places ("+1 extra bed").
- Booking views (find where `booking_room` room fields render for guest and owner) use the snapshot fields from the backend.
- Tests: unit tests for the shared helpers if mirrored on the frontend (`lib/domain/hotel-ui.js`).

## Tasks & Acceptance

- [x] migration 0084 + journal; `db:check`
- [x] schema rules + setup save/read + capacityWarnings
- [x] snapshot at booking + readers
- [x] owner UI (extra places, capacity line, facilities, inclusions, banner)
- [x] guest display of inclusions/extra places
- [x] tests (every matrix row)

**Acceptance Criteria:**
- Given a room with fewer sleeping places than max adults, when the owner saves, then the save is refused with the shortfall and their entries remain.
- Given an accepted stay, when the owner changes the room afterwards, then the guest's booking shows the original room promises.

## Verification

- In `rentra-backend`, never against Neon: `PORTAL_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres CP01_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres DATABASE_URL=postgres://nobody@127.0.0.1:1/never node --import ./loader/register.mjs --env-file=.env --test --test-concurrency=1 "test/**/*.test.js"`. All pass (baseline 446). Never run db:migrate. Do not commit.
- Frontend `npm test` (baseline 146), targeted eslint/prettier, `npx next build`, `git diff --check`.

## Implementation Notes

- Shared rules live in `src/services/domain/hotel-rooms.js` (bed capacity, shortfall message, meal defaults and checks) and are mirrored in `Rentra/lib/domain/hotel-ui.js`. Keep the two copies in step.
- Migration 0084 uses `ADD COLUMN IF NOT EXISTS`; the early-departure test adds the columns on the 0075 schema, as it does for the 0083 stub.
- The capacity rule checks active rooms only.
- User decision (29 Oct 2026): adding or changing extra sleeping places on a live hotel does **not** send it back to review; an audit row is still written. Bed changes keep the existing review rule.
- `room_snapshot` is written in `holdHotelRooms` under the listing mutex plus `FOR SHARE` on `room_type`/`rate_plan`. Records, owner and staff visit readers prefer it and fall back to live data for old rows.
- Room facility keys: the fixed list is enforced in the frontend only; the backend still accepts any lowercase key.
- MP plans saved before 0084 resolve to breakfast only, so the owner's next rates save needs a lunch or dinner pick.

## Review Triage Log

- Review 1: 3 medium (snapshot rows not locked, removed rooms blocking saves, MP error not announced), 2 low (aria-live per keystroke, duplicate labels), 2 questions (re-review on extra places: user decided no; `ac` label: shows "Air conditioning"). All fixed.
- Closure: CLOSED; lock order verified (listing row first on every path).

## Results

- Backend 449/449 on local PostgreSQL (DATABASE_URL unreachable); frontend 147/147; `db:check` 85; `next build` passes; `git diff --check` clean.
- Migration 0084 added; 0076-0084 unapplied on Neon. 0084 must be applied before this backend deploys.
- Not run: browser QA of the owner rooms and rates steps.
