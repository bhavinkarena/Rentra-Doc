---
title: 'Story 3.5 - apply effective date rates and safe calendar edits'
type: 'feature'
created: '2026-10-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: ['_bmad-output/implementation-artifacts/epic-3-context.md', '_bmad-output/implementation-artifacts/spec-3-4-bedding-per-night.md']
baseline_commit: 'backend 4fc5a8b53e9b93bd562f30806afadf34a2e3d86a; frontend 391ff187fbc314ff9cc10588b9e4eb2159859f57'
---

<frozen-after-approval reason="Story 3.5 in epics.md; standing authorization; story text settles every choice">

## Intent

**Problem:** Owner rate calendars break three Story 3.5 rules.
- **Farm/villa bulk "% change":** it applies to the base weekday or weekend price and ignores an existing date override, so a date already set to ₹12,000 is overwritten from ₹10,000.
- **Hotel ARI change:** it checks only a hash of the request. Two tabs, or a change made after the preview, silently overwrite. The preview shows counts, not prices.
- **Hotel calendar drawer:** it has no Escape, no unsaved-change guard, and the grid never shows what linked (derived) offers will cost.

**Approach:** both calendars apply percentage edits to the current effective rate. Hotel previews show before and after prices and carry a data version that the save must match. The drawer gets an Escape key and a dirty guard. Derived offers show their effective rate read-only.

## Boundaries & Constraints

**Always:**
- **Effective rate** = date override, else the weekend or weekday price. Derived plans follow their base plan's effective rate through the existing `planNightRate` (do not duplicate the math; reuse `src/services/domain/hotel.js`).
- **Farm/villa `deltaBps`:** the base for each date is the existing override amount when present, else the base price. Rounding is unchanged. The preview shows before and after per date.
- **Hotel preview:** returns `changes: [{roomTypeId, night, beforeMinor, afterMinor}]`, capped at the first 60 rows plus a total count, for price ops. It also returns `version`, a digest of the current state of every affected `rate_override`/`room_night`/`rate_plan` row (prices, allotment, stop_sell, min_nights, closed_to_arrival). Compute it inside the transaction.
- **Hotel save:** must send `expectedVersion`. It is recomputed under row locks; a mismatch is 409 `CALENDAR_CHANGED` with nothing written, and the UI says "Prices changed since your preview — review again" and re-previews. The existing previewHash check stays.
- **Holiday shortcuts:** these only select dates, as now.
- **Labels:** the open/blocked labels stay.
- **Drawer:** Escape closes it. With unsaved form changes, closing by Escape, overlay or close asks "Discard changes?" through a nested confirm dialog. That dialog is focus-trapped, Escape cancels only the inner dialog, and focus returns to the drawer. After close, focus returns to the cell that opened the drawer.
- **Navigation:** a `beforeunload` guard applies while dirty.
- **Booked prices:** never changed. Booked rooms keep their snapshot (existing). Add a test that a price edit after booking leaves `booking_room.amount_room_minor` and the order totals unchanged.
- **Derived offers:** the grid shows each derived plan's effective nightly rate (base-plan derived, room price for base occupancy) as read-only text under the base row.
- **Targets:** 44px targets, labels, and errors kept in the form.

**Never:**
- No migration (the version is a digest, not a column).
- No change to quote math.
- No new holiday price presets.
- No change to the farm/villa undo contract beyond the base fix.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Farm weekday ₹10,000, date override ₹12,000, +10% | override date → ₹13,200; plain dates → ₹11,000 |
| Hotel +10% over override night | from override (existing, keep test) |
| Hotel preview then another edit then save | 409 CALENDAR_CHANGED, nothing written |
| Hotel save without expectedVersion | 422 |
| Preview price op | before/after rows shown |
| Derived CP +20% of base ₹4,000 | grid shows ₹4,800 read-only |
| Price edit after a booking | booked amount unchanged |
| Holiday shortcut | only selects dates |
| Escape with dirty form | confirm; Escape again cancels confirm only |
| Other owner/listing | 404 (existing) |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- `src/services/booking/hotel-ari.js:50` `hotelAriGrid`: add derived plans' effective rates (filter at ~:64).
- `:108` `changeSchema`: `expectedVersion` is required on save (not on preview).
- `:129` `changeHotelAri`: preview hash at :152 and stale check at :154. Add a version digest (reuse `quoteDigest`/`canonical` from `src/services/booking/quotes.js`) over affected rows `FOR UPDATE` on save. Add before/after rows for price, pricePct and resetPrice.
- `src/services/booking/calendar-bulk.js:35-36`: base from the existing override.
- `src/controllers/hotel-ops.controller.js`: map `CALENDAR_CHANGED` to 409 (check the error middleware for an existing mapping).
- Tests:
  - `test/integration/hotel-ari.integration.test.js`: version, preview rows, derived grid, booked-price unchanged.
  - The farm calendar-bulk test (find it): the override base row.

Frontend (`Rentra`):
- `components/partner/HotelRatesCalendar.jsx`:
  - `:321` `EditDrawer` (preview :347, save :352, dialog :365, overlay :362): before/after list, expectedVersion, 409 re-preview, Escape, dirty confirm, focus return;
  - grid derived rows.
- `components/partner/PortfolioCalendar.jsx:253-263`: copy "Change from current price".
- Test: a pure helper in `lib/domain/` (e.g. dirty-compare or preview formatting) with a unit test; there is no component harness.

## Tasks & Acceptance

- [x] farm/villa effective-rate base + test
- [x] hotel version + preview rows + 409 + tests
- [x] derived rates in grid
- [x] drawer Escape/dirty/nested confirm/focus
- [x] booked-price-unchanged test

**Acceptance Criteria:**
- Given a date with an override, when the owner applies +10%, then the new price is 10% above the override in both calendars.
- Given data changed after the preview, when the owner saves, then the save is refused with CALENDAR_CHANGED and nothing changes.

## Verification

- Backend suite on local PG only (command in the 3.3 spec; baseline 452). Never Neon, never db:migrate, do not commit.
- Frontend `npm test` (baseline 148), eslint/prettier on changed files, `npx next build`, `git diff --check`.

## Review Triage Log

| # | Finding | Decision |
|---|---|---|
| 1 | Version digest omitted `hotel_profile.weekend_nights` | Fixed: included (locked on save); test: weekend change after preview → 409 |
| 2 | Stale save with out-of-range value answered 422 before 409 | Fixed: expectedVersion/previewHash/version checks run under lock before the bounds check |
| 3 | Drawer did not trap Tab | Fixed: document keydown keeps Tab inside the drawer (confirm traps its own) |
| 4 | `beforeunload` lacked `returnValue` | Fixed: sets `event.returnValue = ''` |
| 5 | Focus return to a detached opener after refresh | Fixed: falls back to the grid region |
| 6 | Escape/focus/dirty behaviour has no component harness | Open: manual QA item (below) |

## Results

- Backend (uncommitted): `calendar-bulk.js` % base = override else base; `hotel-ari.js` derived-plan grid rates via `planNightRate`, preview `changes` (≤60) + `changeCount` + `version`, required `expectedVersion`, 409 `CALENDAR_CHANGED` under `FOR UPDATE`. Tests in `hotel-ari` and `owner-calendar-phase7` integration files.
- Frontend (uncommitted): `HotelRatesCalendar.jsx` linked-offer rows, before/after preview table, expectedVersion + re-preview on 409, Escape, dirty confirm (nested, focus-trapped), Tab trap, beforeunload, focus return; `PortfolioCalendar.jsx` "current price" copy; `formDirty` in `lib/domain/hotel-ui.js` + unit test.
- Checks: backend 453/453 on local PG (DATABASE_URL unreachable); frontend 149/149; eslint clean on changed frontend files; prettier clean on changed files; `next build` passes; `git diff --check` clean both repos. No migration, no Neon, no commit.
- Manual QA pending: Escape with dirty form → confirm; Escape again cancels only the confirm; Tab stays in drawer/confirm; focus returns to the opening cell (or grid); browser leave prompt while dirty.
- Not covered by test: a stale save with an out-of-range value (ordering is by code inspection; no fixture produces an out-of-bounds pricePct within schema limits cheaply).
- Phone cards do not show linked-offer rates (desktop grid only).
- **Deploy risk:** saves without `expectedVersion` now get 422, so the old frontend breaks hotel calendar saves until the new frontend deploys. Deploy backend and frontend together (frontend immediately after backend).

- Closure: CLOSED. Committed backend ad5f86c, frontend 8049e2d; backend 453/453, frontend 149/149.
