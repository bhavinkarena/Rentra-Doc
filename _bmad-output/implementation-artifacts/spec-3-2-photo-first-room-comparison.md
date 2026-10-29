---
title: 'Story 3.2 - compare photo-first rooms and complete facilities'
type: 'feature'
created: '2026-10-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 1
context: ['_bmad-output/implementation-artifacts/epic-3-context.md', '_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/mockups/key-hotel-rooms.html', '_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/mockups/mockup-notes.md']
baseline_commit: 'backend 8af1ef397918ca78b0cf7352e652304e8b5f3f92; frontend 59570d4ce13f7f9ad845d049c47a19510193e444'
---

<frozen-after-approval reason="Story 3.2 in epics.md; approved key-hotel-rooms mock; standing authorization; agent defaults">

## Intent

**Problem:** The hotel rooms list (`HotelRooms.jsx`) departs from the approved mock in four ways:
- On phones (below 640px) it hides room photos.
- It shows only the first photo.
- It silently truncates facilities to 8 with `slice(0, 8)`.
- A missing image is shown only as an icon that screen readers ignore.

**Approach:** bring the room card to the approved `key-hotel-rooms` mock.
- Photo-first on every width.
- A labelled, keyboard-accessible gallery of all the room's photos.
- Full facilities in a "Room details & facilities" disclosure.
- An honest missing-photo state.
- On desktop, facts on the left and the plan totals on the right; under narrow width or zoom they stack.

Existing selection, quantity, party, availability, cancellation and total behaviour is kept.

**Agent defaults** (the user would not notice a difference from the mock intent):
- Keep the per-plan quantity steppers. Multi-room quantity guards need them; the mock notes say radios were a simplification.
- Do not add a Save button. None exists, and adding one is out of scope.

## Boundaries & Constraints

**Always:**
- **Photo:** the room photo renders at every width, with the first photo leading the card on phones.
  - **Gallery:** when there is more than one photo, it is reachable by Previous and Next buttons (44px). Each has an aria-label ("Previous photo of {room}"). A position label reads "Photo 2 of 5". The image alt comes from the photo alt, or falls back to "{room} photo N".
  - **No selection effects:** gallery controls are `type="button"`, never change selection or quantity, and never submit.
- **Missing photo:** a visible text "No photo provided for this room" with the icon, not an empty box.
- **Facilities:** all facilities appear in a native `<details>` "Room details & facilities". The summary line may show up to 4 with a visible "+N more" that opens the disclosure. No silent truncation.
- **Facts:** beds, size, guests and view stay as they are now; identity is the room name heading.
- **Layout:** at the desktop breakpoint, room facts are on the left and the plan rows with totals on the right of the card. Below it, or at 200% zoom, they stack with no horizontal scroll at 320px.
- **Totals:** a changed plan or stay total is announced through the existing polite live region without moving focus. Tax and fees stay visible ("incl. ₹X tax"). No mandatory charge is hidden in a collapsed region.
- **Guards:** quantity, party split, availability, "Only N left", sold-out and cancellation guards are unchanged.

**Never:**
- No backend change to prices or quotes.
- No new Save or wishlist.
- No change to the booking flow after "Review stay".

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Phone 360px, room with 3 photos | photo first, "Photo 1 of 3", next/prev work by keyboard, selection unchanged |
| Room with 0 photos | "No photo provided for this room" visible |
| Room with 1 photo | no gallery buttons |
| Room with 14 facilities | summary shows 4 + "+10 more"; disclosure lists all 14 |
| Desktop 1280px | facts left, plans/totals right |
| 320px / 200% zoom | stacked, no horizontal scroll |
| Pressing gallery next inside a selected plan | counts unchanged |
| Plan total changes | announced politely, focus stays |

</frozen-after-approval>

## Code Map

Frontend (`Rentra`):
- `components/rentra/hotels/HotelRooms.jsx`:
  - :515-590 `RoomCard`. Photo at :516 (`photos?.[0]`), :530 `hidden sm:block`, :535-540 img and ImageOff fallback.
  - :562 `slice(0, 8)`.
  - :596+ `PlanRow` (steppers :672-690, per-plan total :657-665).
  - :701-840 `StayRail` (live region :741).

  Extract a small `RoomPhotos` component in the same file, or a sibling `RoomPhotos.jsx` if large.
- `lib/domain/hotel-ui.js` -- add a pure `facilitySummary(amenities, n = 4)` returning `{shown, more}`, and `photoLabel(i, total)`. Reuse `humanize`.
- Backend detail payload `rentra-backend/src/services/db/queries.js:450-480` already returns `photos[]` and `amenities`. Read only, no backend change expected.
- Tests: `test/domain/hotel-ui.test.js` (new or extend) for `facilitySummary` and `photoLabel`. If the repo has a component-render test setup (check `test/` and `package.json`), add a render test for the gallery and the missing photo. Otherwise unit tests only, and say so.
- Verify with `npx next build` (read `Rentra/AGENTS.md` and the relevant `node_modules/next/dist/docs` before touching Next APIs).

## Tasks & Acceptance

- [x] photo-first + gallery + missing-photo text
- [x] full facilities disclosure (no silent truncation)
- [x] desktop two-column card / narrow stack
- [x] helpers + tests; next build

**Acceptance Criteria:**
- Given any room, when rendered, then no facility is hidden without a visible "+N more" disclosure.
- Given gallery interaction, when the guest moves between photos, then no selection, quantity or total changes.

## Verification

- Frontend `npm test` (baseline 144), targeted eslint/prettier, `npx next build`, `git diff --check`.
- Backend suite only if the backend is touched (baseline 446; local PG 127.0.0.1:55432 with `DATABASE_URL=postgres://nobody@127.0.0.1:1/never`). Never Neon. Do not commit.

## Review Triage Log

- Review 1: 0 high, 5 medium (gallery index not reset on photo change, null photos crash, photo change not announced, first photo lazy, facility list overflow at 320px). All fixed. Fixes verified by the coordinator (small, local); no separate closure pass.
- Accepted: photo stays in the left column at desktop (facts left, plans right); no `fetchPriority` on the first card.

## Results

- Frontend `31b4d8813c116b5e5c6aaeb39ca7bdc138f0cb32`, local only. Backend unchanged.
- Frontend 146/146; eslint/prettier clean on touched files; `npx next build` passes; `git diff --check` clean.
- Helper unit tests only (`facilitySummary`, `photoLabel`); the repo has no component render harness.
- Not run: browser check of 320px / 200% zoom reflow, desktop two-column layout, screen reader. Story readiness ("actual runtime usability") stays open until that is done.
