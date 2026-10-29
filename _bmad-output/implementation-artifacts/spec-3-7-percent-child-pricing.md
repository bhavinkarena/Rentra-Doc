---
title: 'Story 3.7 - price actual child ages with room-local adults'
type: 'feature'
created: '2026-10-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: ['_bmad-output/implementation-artifacts/epic-3-context.md', '_bmad-output/implementation-artifacts/spec-3-6-child-age-policies.md', '_bmad-output/implementation-artifacts/spec-3-4-bedding-per-night.md']
baseline_commit: 'backend 2d318cbcaeb44bedef327f8ccf6f6ae564f8b4b8; frontend 071702418574d4f73c00c06540aec414a4ffe97a'
---

<frozen-after-approval reason="Story 3.7 in epics.md; epic-3 child rule; 3.6 user decisions carried; standing authorization">

## Intent

**Problem:** Story 3.6 left out the `percent` child band rule, which the epic requires. A family quote cannot price a child as a share of the room.

**Approach:**
- Add `rule: {type: 'percent', amount: 1..100}` to child bands (not infant bands; infants are free or fixed only).
- Price per qualifying child per night: `round_half_up(roomOnlyMinor_night × pct / 100 / roomAdults)`. Here `roomAdults` is the actual adults (18+) in that room.
- Example: ₹4,000, 2 adults, 25% gives ₹500 per child per night.

## Boundaries & Constraints

**Always:**
- **Percent base:** `roomOnlyMinor` from 3.4/3.5 (the base plan's own effective nightly rate). It excludes meals (derived plan adjustment), per-guest derived charges, bedding, cots, extra-adult supplements, tax and fee.
- **Arithmetic:** compute in integer paise as `(roomOnly × pct × 100 + half) / (10000 × adults)` with half-up rounding, once per child per night. No float.
- **Qualifying children:** the same position rule as 3.6 fixed bands. A child is charged only beyond base occupancy, and when only some children pay, the oldest pay first. Adult-rate minors stay as in 3.6.
- **Taxes and fee:** the child charge is added to that night's rate before tax, like the current child charges, so tax, fee and refund allocation include it.
- **Room rules:** a zero-adult room is refused (existing `OCCUPANCY`), and an unavailable required cot is refused (existing `COT_UNAVAILABLE`).
- **Ages:** whole-year ages, including 0, are stored unchanged through availability, allocation, quote, `booking_room.child_ages` and confirmation views. Add a test that age 0 survives the full quote, checkout and booking path.
- **Validation:** `policyProblem` accepts `percent` (1-100, integer) for child-kind bands only; an infant band with percent gets 422. The zod schema is the same. Keep the backend and frontend mirror in step.
- **Owner UI:** the rule select gets "% of room price ÷ adults" with a helper line, e.g. "₹4,000 room, 2 adults, 25% = ₹500/child/night".
- **Guest UI:** the disclosure says "2-11: 25% of the room price per adult/night", and it never shows a fixed ₹ amount for a percent band.
- **Quote:** each line records a per-night `childMinor` when charged. Policy changes still give QUOTE_CHANGED through the 3.6 version.

**Never:**
- No change to free or fixed behavior, bedding or cots.
- No rate-plan override.
- No migration (the policy is jsonb).

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| ₹4,000 night, 2 adults, base 2, 1 child age 5 at 25% | +₹500/night |
| Same, weekend ₹6,000 | +₹750 that night |
| 3 adults, ₹4,000, 25%, base 3 | ₹333.33, so 33333 paise |
| Derived CP plan +20% over ₹4,000 | base ₹4,000 (meals excluded) |
| Child within base occupancy | free |
| Infant band percent | 422 |
| Percent 0 or 101 | 422 |
| Child age 0, infant free band | age 0 stored and shown |
| Owner changes % after quote | QUOTE_CHANGED |
| Adults 0 | OCCUPANCY |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- `src/services/domain/child-policy.js`: `policyProblem` gets the percent rule and the infant restriction.
- `src/services/domain/hotel.js` `roomOccupancy` / `priceRoomStay`: per-night child charge for percent bands (fixed and free stay as they are; reuse the oldest-first selection). `roomOnlyMinor` is already returned by `planNightRate` (3.4).
- `src/services/schemas/zod/listing.js` `childPolicySchema`: the percent type.
- Tests: `test/services/child-policy.test.js`, `hotel-domain.test.js` (matrix), `hotel-checkout.integration.test.js` (age 0 path, QUOTE_CHANGED).

Frontend (`Rentra`):
- `lib/domain/hotel-ui.js`: mirror `policyProblem`; `policyLine` percent wording; test.
- `components/partner/listing/HotelSections.jsx`: the rule select option + helper; percent hidden for infant bands.

## Tasks & Acceptance

- [x] validation (both sides) + tests
- [x] pricing per night + tests for every matrix row
- [x] owner UI option + guest wording
- [x] age-0 end-to-end test

**Acceptance Criteria:**
- Given a ₹4,000 night, 2 adults and a 25% child beyond base, when quoted, then that night adds 50000 paise before tax.
- Given an infant age 0, when booked, then age 0 is stored and shown in the confirmation.

## Verification

- Backend suite on local PG only (command in the 3.3 spec; baseline 462). Never Neon, never db:migrate, do not commit.
- Frontend `npm test` (baseline 150), eslint/prettier on changed files, `npx next build`, `git diff --check`.

## Implementation Notes

- Guest wording deliberately replaces the frozen example "2-11: 25% of the room price per adult/night" with "2-11: 25% of the room price ÷ adults, per child/night": the frozen string read as 25% per adult and misled guests (review fix).
- Per-night `childMinor` is recorded on a night only when a percent charge applies, so fixed-only quotes keep their 3.6 shape and digest.
- Zod accepts a percent `amount` of number or '' so `policyProblem` returns the "whole number from 1 to 100" message rather than a type error.
- `roomOccupancy` returns `childPercents` for charged percent children (oldest-first selection shared with fixed); `priceRoomStay` adds `percentChildMinor(roomOnlyMinor, pct, adults)` per night before tax.

## Review Triage Log

| # | Finding | Decision |
|---|---|---|
| 1 | Guest line "per adult/night" read as 25% per adult | Fixed: "÷ adults, per child/night"; test updated |
| 2 | Blank percent rejected by zod type check before policyProblem | Fixed: zod lets '' through; test asserts the 1-100 message |

## Results

- Backend (`rentra-backend`, uncommitted): child-policy.js, hotel.js, zod listing.js; tests child-policy.test.js, hotel-checkout.integration.test.js (age 0 + percent + QUOTE_CHANGED), hotel-owner-flow.integration.test.js (3.6 "percent refused" assertion now an infant-band percent). Full suite on local PG: 465/465 (baseline 462).
- Frontend (`Rentra`, uncommitted): lib/domain/hotel-ui.js, components/partner/listing/HotelSections.jsx, test/domain/hotel-ui.test.js. `npm test` 151/151 (baseline 150); eslint/prettier clean; `next build` passes; `git diff --check` clean in both repos.
- No migration; Neon untouched.
