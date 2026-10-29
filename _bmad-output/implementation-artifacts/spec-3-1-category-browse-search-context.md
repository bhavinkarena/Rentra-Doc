---
title: 'Story 3.1 - browse categories while retaining guest search context'
type: 'feature'
created: '2026-10-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 2
context: ['_bmad-output/implementation-artifacts/epic-3-context.md']
baseline_commit: 'backend e1f3e20d8b76f1e151d52c47da28b439041db18d; frontend 915eadbe4aa5db3189dd729f7787f435682a5a1c'
---

<frozen-after-approval reason="Story 3.1 in epics.md; standing authorization; defaults chosen by agent (user would not notice beyond stated behavior)">

## Intent

**Problem:** A guest's search context is lost in three places.
- Switching the category tab (`searchTabHref`) keeps only vertical, city, area and date. Party, date ranges, slot, removable filters and `q` are dropped.
- After login, `next` is not allowed to be `/search`, so the guest lands on `/` and loses everything.
- The results page shows "no results" without saying whether nothing exists in that area and category (**no inventory**) or whether the guest's filters exclude everything (**no match**).

**Approach:** treat the URL as the single source of guest search context.
- Category is optional and switching it carries every compatible parameter.
- Login returns to the exact search URL.
- The results page distinguishes no inventory, no match and failed refresh, and keeps the guest's valid inputs plus a retry.

## Boundaries & Constraints

**Always:**
- **Context** = location (city, area, `q`), dates (date, dates, end, start, duration, slot, checkin, checkout), party (guests, rooms, adults, children ages) and removable filters (min, max, bedrooms, verified, cancellation, page reset to 1). It must survive:
  - category switch and "All" (no category);
  - filter chip removal;
  - pagination;
  - login and back;
  - reload.
- **Category switch to a different vertical** (e.g. farmhouse to hotel): map compatible fields and drop only incompatible ones.
  - Map `dates`/`date` to `checkin`; map `end` to `checkout` when it is a range.
  - Map `guests` to `adults` and back.
  - Show a one-line notice naming what was dropped, e.g. "Time slot doesn't apply to hotels and was removed."
  - Never silently invent dates or party.
- **Category is optional:** "All" removes only `category` (and `vertical` when it was implied) and keeps the rest.
- **Login:** `next` accepts `/search` with its query string. It is same-origin, path-only, has no `//` and is length-capped at 2000. Every "sign in" link reached from search or results passes `next` with the current URL. The existing allowlist protection stays for everything else.
- **Results states, each with a distinct message:**
  - (a) No inventory: zero results with no user filters beyond location, category and dates, e.g. "No farmhouses listed in Lonavala yet". It offers browsing all categories or nearby areas, but only if such an existing link is present.
  - (b) No match: zero results with active filters. It lists the active filters as removable chips plus "Clear filters".
  - (c) Failed refresh: the fetch failed. It keeps the form populated from the URL and shows "Try again" (a re-request of the same URL). It never shows stale results as current.

  Use backend `meta.totalUnfiltered` or the equivalent to tell (a) from (b). If the backend cannot cheaply count, add an unfiltered count query in `searchDiscovery` for zero-result pages only.
- **Prices:** search results keep the existing server-backed dated inclusive totals and honest rating and verified badges. Nothing new is cached client-side.
- **Search fetch:** `cache: 'no-store'`, so no price or stock is served from a stale cache.

**Never:**
- No localStorage or service-worker persistence of prices or availability.
- No private-home contact or address in search payloads (unchanged).
- No pets parameter (Story 3.9).
- No new filters.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Farmhouse search, city+dates+guests+min price, switch to Villa | all kept, page reset |
| Same, switch to Hotel | city kept, dates→checkin/checkout, guests→adults, slot dropped + notice |
| Hotel with adults+children ages, switch to Farmhouse | adults+children count→guests, rooms dropped + notice |
| Choose "All" | category removed, rest kept |
| Remove one filter chip | that key only removed |
| Guest clicks sign in on results, logs in | returns to identical `/search?...` |
| `next=//evil.com` or `next=https://x` or >2000 chars | falls back to `/` |
| Zero results, no filters | no-inventory copy |
| Zero results, filters active | no-match copy + removable chips + Clear filters |
| Backend 5xx | failed-refresh copy, form keeps values, Try again |
| Invalid params | existing validation messages, valid params kept |

</frozen-after-approval>

## Code Map

Frontend (`Rentra`):
- `lib/domain/vertical-ui.js:43-53` `searchTabHref` -- rebuild it to carry context through a new pure helper `carrySearchContext(params, toVertical)` in `lib/domain/discovery.js`. The helper returns `{query, dropped[]}`.
- `lib/domain/discovery.js:151-224,374` -- `parseDiscoveryQuery` and `discoveryQuery` param lists. Reuse them; do not duplicate param names.
- `components/rentra/HeaderSearch.jsx:117-128,321` -- category tabs. `components/rentra/DiscoveryFilters.jsx:198,227,364,418` -- chips and category select (add an "All" option if missing).
- `components/rentra/DiscoveryResults.jsx:30-57,223-235,291-389` -- the fetch, failure state and empty states. Split the empty states into no inventory and no match. Show the dropped-fields notice when it arrives via a `notice` query param or the helper result. Prefer a short-lived `dropped` param that is removed on the next navigation.
- `lib/api/endpoints.js:56` `discoveryApi.search` -- add `cache: 'no-store'`.
- `app/(app)/login/page.js:26-30` -- extend the `next` validation with a shared `safeNext(next)` helper in `lib/` and a unit test.
- `components/customer/SignInAgain.jsx:13`, `components/customer/SavedPlaces.jsx:34,43`, and every sign-in link rendered on search or results pages -- pass `next`.
- Tests:
  - `test/` -- unit tests for `carrySearchContext` covering every matrix switch row, and for `safeNext`.

Backend (`rentra-backend`):
- `src/services/db/discovery.js:57` `searchDiscovery` and the hotel branch :266-332 -- when results are zero and user filters are active, also return `meta.inventory` (the count for location, category and vertical, ignoring filters and dates). Read-only.
- `src/controllers/discovery.controller.js:61-86` -- pass it through.
- Test:
  - `test/integration/` -- assert `meta.inventory` for no-inventory vs no-match. Extend the existing discovery test if there is one.

## Tasks & Acceptance

- [x] `carrySearchContext`, `safeNext` + unit tests
- [x] tabs, chips, "All", notice wiring
- [x] login `next` for search + sign-in links
- [x] results states (no inventory / no match / failed) + no-store
- [x] backend `meta.inventory` + test

**Acceptance Criteria:**
- Given a filled search, when the guest switches category, signs in and returns, then every compatible parameter is still in the URL and the form shows it.
- Given zero results, when the page renders, then the copy differs for no inventory and no match.
- Given a fetch failure, when the page renders, then no prices are shown and the guest's inputs remain.

## Verification

- In `rentra-backend`, never against Neon: `PORTAL_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres CP01_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres DATABASE_URL=postgres://nobody@127.0.0.1:1/never node --import ./loader/register.mjs --env-file=.env --test --test-concurrency=1 "test/**/*.test.js"`. All pass (baseline 444). Never run db:migrate. Do not commit.
- Frontend `npm test` (baseline 136), targeted eslint/prettier, `git diff --check`. Read `Rentra/AGENTS.md` and the relevant `node_modules/next/dist/docs/` guide before touching Next.js APIs.

## Implementation Notes

- `carrySearchContext(params, toVertical, category)` in `lib/domain/discovery.js` returns `{query, dropped}`. A short-lived `dropped` param shows the notice and is stripped on the next navigation and from login `next`.
- `safeNext` (frontend) and `safeCustomerAreaPath` (backend) use one rule: `/search` plus a query, URL-decoded, rejecting whitespace, backslash, `@`, `//` and control characters, at most 2000 characters. `/saved` was added to the allowlist so the SavedPlaces sign-in returns there (accepted).
- `meta.inventory` (count for location, category and vertical, using the same `visibleVertical` and hotel rate-plan rules as search) on every zero-result page. Copy: 0 is no inventory; above 0 with filters is no match (chips + Clear filters); above 0 with dates or party only is booked copy (hotel "No rooms left…", farm "Fully booked for these dates").
- Accepted: the partner "List your space/venue" buttons carry no `next`; entertainment keeps its own empty states; the inventory count does not mirror farm or venue inventory-readiness or the landmark radius (SQL comment).

## Review Triage Log

- Review 1: 0 high, 5 medium (inventory visibility, hotel bookable predicate, two sign-in paths without `next`, `dropped` leaking into `next`, missing hostile `next` tests), 2 low, 6 questions. Fixed or answered.
- One fix (count only when filtered) caused untruthful "not listed" copy for fully booked dates; reverted, three-way copy added.
- Closure: CLOSED.

## Results

- Backend 446/446 on local PostgreSQL (DATABASE_URL unreachable); frontend 144/144; `npx next build` succeeds (111 pages, no Suspense errors; API offline, fallbacks rendered); `git diff --check` clean. No migration.
- Release: deploy the backend (`meta.inventory`, `next` rule) before the frontend.
- Not run: browser and device QA of the switch, sign-in and return flow.
