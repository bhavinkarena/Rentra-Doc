---
title: 'Story 3.12 - verify suitable-stay journeys across categories and devices'
type: 'chore'
created: '2026-10-30'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: ['_bmad-output/implementation-artifacts/epic-3-context.md']
baseline_commit: 'backend 2ee11661ba7714b4546a5dc2197a92996d96e39a; frontend a49eb5b64dd37abeeedef8c5011fb785396c9d45; docs a49d89704f5ed42006afd079320619c6c2b58550'
---

<frozen-after-approval reason="Story 3.12; owner standing authorization covers local verification and small reviewed fixes">

## Intent

Stories 3.1-3.11 have automated checks but no recorded application browser acceptance. Verify representative guest and owner journeys together using disposable local fixtures, repair demonstrated defects narrowly, and record reproducible evidence and remaining gates.

## Boundaries & Constraints

Always use PostgreSQL at 127.0.0.1:55432, with isolated databases created by the existing disposable helper. Keep application DATABASE_URL unreachable during the backend suite. Use fixture identities and local APIs; distinguish service/API assertions from browser interactions. Use fake Test payment responses only. Record actual checks, screenshots, failures and unavailable evidence honestly.

Never run db:migrate, hosted fixtures/tests, real provider money, bank debits, payout offsets, push or deploy. No new product scope or financial release certification. Read installed Next guides before changing Next APIs. Preserve unrelated work. Commit locally per affected repository with the requested Co-Authored-By trailer.

## I/O & Edge-Case Matrix

| Context | Exercise | Expected |
|---|---|---|
| Farm/villa/hotel/apartment | Search and change category, navigation/reload/auth recovery | Dates, location, party, ages and pets persist; eligible dated totals and honest empty/unavailable states |
| Hotel rooms | Photos/gallery, complete facilities, room/meal offer, bedding | Accessible controls; full trip total; identifiable room-only base; no duplicate bedding |
| Family | Fixed/percent child bands, age 0, room-local adults, cot overflow | Correct amounts and occupancy; unsupported supervision/cot rejected |
| Pets | Allowed/free/charged, limits and disallowed | Fee disclosed and included once, declaration in accepted snapshot, truthful refusal |
| Apartment | Quote/hold/Test confirmation/record/cancel/early departure | Whole unit exclusive incl. turnover; accepted amounts retained; cancellation reconciles; unused nights released |
| Owner | Apartment block/partial unblock; effective hotel/farm date edits | Booked dates protected; preview/version check; stale edits refused; unsaved work guarded |
| Failure/privacy | Stale quote/save, retry, repeated request, another identity | No hidden success, duplicate reservation or private-data disclosure; valid inputs retained |

</frozen-after-approval>

## Code Map

- Backend `test/helpers/disposable-db.js`, `hotel-fixture.js`, `listing-review-fixture.js`: reuse isolation, supply and identities. `test/integration/apartment-booking.integration.test.js` supplies apartment/category/payment examples; `test/helpers/fake-razorpay.mjs` supplies deterministic provider responses.
- Backend `test/helpers/serve-owner-wizard.mjs`, `serve-property-review.mjs`: reuse API bootstrap, scoped sessions and shutdown pattern in a new `test/helpers/serve-suitable-stays.mjs`. Bind loopback and reject other database hosts/ports before connecting. Store tokens/database URL only in ignored scratch output.
- Frontend `scripts/portal-gate/hotel_checkout_gate.mjs`, `hotel_discovery_gate.mjs`, `browser-audit.mjs`: reuse browser and axe patterns in `scripts/portal-gate/suitable-stays.mjs`; older gates assume Mac Chrome and an obsolete database name, so do not execute unchanged.
- Frontend listing components, `components/customer/Checkout.jsx`, owner calendar components and existing domain tests: change only demonstrated defects and add focused regression proof at the responsible layer.
- Shared `epics.md`, Epic 3 context and all done 3.1-3.11 specs: continuity; Results are historical, not current acceptance. 3.2 phone/zoom/gallery and 3.5 keyboard/dirty-state gaps require attention.
- Shared `frontend/docs/rentra-customer-plan.html`, `rentra-customer-sessions.md`, `rentra-customer-part20.md`, `HOTEL-PLAN.md`, and `HANDOFF.md`: record this story without claiming a numbered customer part or release is complete.

## Tasks & Acceptance

- [x] `rentra-backend/test/helpers/serve-suitable-stays.mjs` -- create isolated farm/villa/hotel/apartment fixtures, scoped sessions and fake provider; expose local API with cleanup.
- [x] `Rentra/scripts/portal-gate/suitable-stays.mjs` -- verify the matrix using the real local application; save sanitized assertion output/screenshots in code-owned QA destinations. Separate seeded setup and direct API/service checks from actions driven through UI.
- [x] Relevant source and existing test files -- fix demonstrated defects with focused regression assertions; review every change.
- [x] This spec and shared progress documents -- record actual results, limits, commits and exact continuation.

Acceptance criteria:
- Given representative local listings, when guests select and book supported stays, then authoritative totals, eligibility and accepted snapshots agree with the displayed trip and survive supported navigation/auth flows.
- Given owner calendar edits, when preview/save/retry and partial unblock occur, then current effective prices and protected inventory remain accurate and stale changes are refused.
- Given 320/390/768/1024/1440 widths, when representative guest/owner screens are used with keyboard and zoom, then record actual reflow, labels, focus, primary-target and automated accessibility findings; repair scoped defects and retain unfinished checks explicitly.
- Given unavailable real devices, screen readers, field traffic or load evidence, when reporting results, then mark those gates unexecuted rather than deriving them from desktop emulation or unit tests.

## Verification

Backend, from `rentra-backend`, with PORTAL_TEST_DATABASE_URL and CP01_TEST_DATABASE_URL both `postgres://postgres@127.0.0.1:55432/postgres`, and DATABASE_URL `postgres://nobody@127.0.0.1:1/never`:

`node --import ./loader/register.mjs --env-file=.env --test --test-concurrency=1 "test/**/*.test.js"`

The supplied `test/*/.test.js` pattern was checked and discovers zero tests. The recursive pattern above is the actual executed serial suite, with the same safe environment.

Run frontend `npm test` (baseline 158), targeted eslint/prettier, `npx next build`; backend `npm run db:check` (90 migrations), targeted lint/format for changes; `git diff --check` in both repos. Browser evidence uses the new guarded local stack only. Record lab measurements as lab observations; no field p75 or load claim without data.

## Implementation Notes

- Proceeding under the owner's explicit standing authorization for all non-product local work; no new product decision or release action is needed. BMad planning checkpoint is covered by that instruction. Cached Epic 3 context is newer than all planning artifacts. Branches are docs main, backend master, frontend main.
- Required commit trailer: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Git currently requires command-local `-c safe.directory=C:/Kunj/Rentra/<repository>` due to differing Windows checkout ownership; do not alter global Git configuration. Leave commits until the parent has reviewed the full diff. Use the current Windows workspace, not the original Mac path in the continuation prompt.

## Spec Change Log

## Review Triage Log

Review 1: all three layers completed. Edge-case hunter returned no findings. Blind-hunter arithmetic is metadata; its ten findings and the verification-gap finding are individually recorded below before grouping.

| ID | Verdict / route | Evidence and disposition |
| --- | --- | --- |
| B1 supplied clock versus fee now | false | HTTP quote validation rejects a supplied `now`; controllers use the current server clock. Persisted checkout's canonical fee resolver also uses transaction now. Historical fee simulation is not an exposed contract; changing only public fee timing would diverge from checkout. |
| B2 Unsplash fixture requests | false | Seed rows contain Unsplash URLs, but the public-photo normalizer rejects that host before rendering. Actual farm/villa screenshots show the honest missing-photo state; hotel gallery uses local assets. No demonstrated external photo request follows from the cited rows. |
| B3 custom fixture path | low / patch | Server accepts a custom output filename while consumers read the fixed scratch filename. Remove unused configurability so reproduction cannot consume stale identities. |
| B4 owner/global/future fee coverage | medium / patch | New correlated public fee selection has only 5% fixture coverage; canonical resolver tests do not exercise it. Add public search/comparison/quote versus persisted checkout assertions for effective zero owner override, global fallback and future settings. |
| B5 apartment accepted amount chain | medium / patch | Main browser journey asserts navigation/identity, while direct services cover amounts. Compare rendered review, fake capture and accepted record components within the browser journey to close that specific regression gap. |
| B6 departure partition/refund | medium / patch | Existing browser assertion checks retained cleaning/pet text but not actual night lists or refund amount. Use prepared expected nights and unused rent/fee to assert preview and receipt. |
| B7 cancellation postconditions | medium / patch | Preview total and generic receipt do not independently establish committed requested refund, cancelled record and reopened dates. Add these postconditions to the browser runner. |
| B8 interactive-state axe | medium / patch | Automated scans cover base screens; supplemental dialogs/refusals/previews lack scans. Scan the exercised interactive states, without claiming human WCAG acceptance. |
| B9 stale results after startup failure | medium / patch | Fixture/package/browser setup precedes output handlers. A normal missing-browser rerun can leave previous green JSON. Mark evidence explicitly incomplete/failed before setup and replace it only with the completed run. |
| B10 supplemental runtime errors | low / patch | Supplemental-only UI actions are outside the main runner's runtime listener. Add the same scoped page/React error collection and assertions to those runners. |
| G1 public fee precedence gap | medium / patch | Pre-verified verification-gap evidence confirms B4's missing public zero/future/owner coverage and persisted-checkout comparison. Group with B4; do not count canonical resolver tests as covering the new SQL. |

Survivor grouping: B4/G1 share one missing fee-precedence regression; all other patch entries are independent small verification corrections. No product defect was confirmed by the review, no intent/spec re-derivation is required, and no finding is deferred. Existing device, accessibility, performance and financial release gates remain open.

Review 1 closure: B3 is removed; B4/G1 now has independent default/global7%/owner3%/owner0% and future-setting coverage against persisted checkout (11/11 focused, 503/503 full). The original gap reviewer independently confirmed closure. B5 now compares rendered review, fake capture and accepted record components. B6 verifies exact night partition and unused rent/refundable fee against preview, receipt and committed refund. B7 verifies committed cancellation amount, cancelled record and reopened dates. B8 scans the exercised refusal, drawer/discard, cancellation/departure preview and receipt states. B9 has four actual nonexistent-browser startup proofs and output invalidation before setup. B10 now checks supplemental runtime/React errors. All patches passed targeted lint/format and their browser checks.

Additional coordinator finding C1: medium / patch. New farm-preview axe scans demonstrated low contrast on interactive outside-month dates and closed-slot labels in PortfolioCalendar. Darkened closed/past/outside labels and removed whole-button past fading. Focused scans pass; an independent closure review found no changed handlers, focus, selection or state semantics. This narrow repair is inside the owner's explicit instruction to fix demonstrated verification defects.

No review findings remain unresolved or deferred. Real-device, specialist, field/load and financial release gates below remain open and were never passed by this review.

## Results

Verified 30 October 2026 against disposable PostgreSQL 17 on 127.0.0.1:55432 and local API/Next/Chrome only.

- Starting full revisions matched the owner exactly and all trees were clean. Backend AGENTS.md is absent. Installed Next guides were read before changing the canonical redirect. Installed Python uv 0.13.5 rendered the workflow through a process-local wrapper; no installation/global configuration change was needed.
- Final backend serial recursive suite: **503/503**, zero skips/failures, 641566.2668 ms. The supplied `test/*/.test.js` glob discovers zero tests; the actual suite used `test/**/*.test.js` with both required local test URLs and poisoned application DATABASE_URL. Frontend **158/158**, final production build, configured targeted ESLint/Prettier, journal **90**, syntax checks and both code diff whitespace checks passed. Ported backend services are deliberately excluded by repository lint/format configuration; their changes were syntax-checked and exercised by integration tests.
- Journey assertions: **165/165 at 1440**, **165/165 at 390**, detailed hotel/context **67/67**, farm calendar **13/13**, apartment cancellation **9/9 per width**, departure **12/12 per width**: **452/452 total** (440 browser assertions and 12 explicitly labelled API/provider/SQL observations). Additional explicit target remediation **16/16** and startup failure guards **4/4**. Automated scans/reflow sampled 320/390/768/1024/1440. Direct apartment service assertions **9/9** are separately labelled.
- [Sanitized code-owned evidence and reproduction](../../../Rentra/docs/qa/story-3-12/README.md) retain JSON assertions and selected screenshots. Main-run JSON lists cases outside that runner; supplemental reports close the corresponding local browser cases. Screenshots of final hotel checkout, owner calendar and apartment departure were visually inspected. CSS zoom is a lab reflow observation, not native browser zoom.

### Demonstrated fixes

- Apartment public DTO applied hotel fields, overwriting unit_night with night and preventing Reserve. Preserve whole-unit type and apartment starting price; integration regression asserts both.
- Canonical hotel/apartment redirects lost pets; public hotel quote validation rejected pets. Retain the declaration, validate 0-5, refuse policy limits, and include it once in comparison/quote totals. Regression covers accepted/invalid counts, unchanged room GST, pet amount and public quote agreement.
- Public hotel comparison/quote totals omitted the existing owner/global service fee; checkout added it later and incorrectly claimed "no fee". Public totals now use one fee on room rent and pets, excluding GST, matching checkout; the checkout row discloses it. Batched search retains fixed query count through a correlated fee selection. Internal room-inventory hash stays compatible; persisted checkout separately binds its fee. The first hash change broke legacy hold tests and was corrected, not accepted. Final suite passes unchanged hold/stock behavior. Existing inventory price expectations now explicitly include the already-required 5% fee; nightly rent and GST expectations are unchanged.
- Apartment departure preview/consent/receipt called the whole unit zero rooms. Show whole-apartment wording, consumed/unused nights and retained cleaning/pet amounts. No refund math changed.
- Stable apartment price-row keys remove the observed React warning. Explicit 44px primary calendar controls override portal density. Apartment state labels and property identity remain readable on phones. Category mapping explicitly names removed child age information.

### Matrix audit

| Row | Actual executed evidence |
| --- | --- |
| Farm/villa/category/context | Main five-width listing scans; detailed desktop/phone category links retain location/dates/mapped party/pets and disclose discarded ages; farm/villa login handoff plus seeded session return reaches owned checkout review; frontend context suite |
| Rooms/meals/bedding | Actual gallery keyboard next/previous, tenth facility disclosure; room-only percentage child base unchanged under breakfast; fixed bedding per night and no fictitious bedding for two adults; backend fixed/percent bedding and accepted snapshot suites |
| Family | Browser age-zero restoration, percentage child amount and missing-cot refusal; full suite fixed bands, supervising adults, room-local adults and available/unavailable cots |
| Pets | Browser declared charge through comparison/checkout, limit refusal and consent; service charge/limit; full suite free/disallowed policies and snapshots |
| Apartment lifecycle | Desktop/phone Reserve, review, hold, fake capture, confirmation and record; cancellation reconciles paid total; departure preview/receipt/completed record; suite concurrency/turnover/unused stock release |
| Owner calendars | Desktop/phone apartment block/partial unblock; hotel dirty Escape, Tab wrap, before/after preview, actual concurrent save refusal, refreshed preview and explicit retry; farm fixed override then 10% of current effective price saved/reloaded; service stale version/booked-date protection |
| Failure/privacy | Actual stale calendar recovery; service other-identity record denial and idempotent hold; full suite stale quotes, authorization, replay and financial reconciliation |

### Evidence limits and setup

- Login recovery injects a scoped fixture cookie after the actual login handoff; actual OTP delivery was not exercised. Early-departure fixtures are fake-paid and explicitly time-shifted locally with triggers restored before browser actions; completed scenario reservations are reset between cases. This setup is not production mutation evidence; integration tests independently assert snapshot/turnover invariants.
- Initial bare-code links hit 404 shells and weak h1 checks falsely passed; those outputs were discarded, then canonical URLs/exact fixture identities were asserted. Initial streaming title, optional-GST-checkbox and image-seed issues were runner/setup corrections, not product acceptance. An early dummy-key payment reached pending before the process-local fake transport was installed; no real money was captured. Final payment runs use the guarded fake provider.
- **Open/unexecuted:** actual iOS/Android, human screen readers, native zoom, field p75 LCP/INP/CLS, sustained load and opt-in strict backend performance. Configured axe scans do not certify full WCAG 2.2 AA. Existing specialist assistance-animal, family/cot supply, apartment duration/local rules and every hosted Test/provider/bank/financial release gate remain open.
- No migrations added or hosted operations run. Neon remains recorded at 0075, owner-applied 0076-0089 pending via the normal migrator. No push/deploy. Local commits: backend `c5fb4286e39857bd6bca40e654f607ff80f11444`, frontend `7989a254b8687559af89ac5a4b1c9a76e81537a5`; shared documents are in the matching checkpoint commit. All reviews are closed. API/Next stopped; task-owned local PostgreSQL stopped after dropping its fixture.
