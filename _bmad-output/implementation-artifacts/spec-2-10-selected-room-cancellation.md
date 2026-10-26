---
title: 'Story 2.10: Cancel selected rooms without repricing retained rooms'
type: 'bugfix'
created: '2026-10-26'
status: 'done'
baseline_commit: '1082e2f3ae6601dfd86420eebcbbdf812150353b'
route: 'dispatch'
review_loop_iteration: 0
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The existing selected-room cancellation flow lacks evidence for mixed booked policies, prior reservations, stale/replayed commands and retained-room invariants. Its hotel preview reads absent visit policy fields and can show an invalid percentage.

**Approach:** Reuse the existing preview/confirm API, room snapshots, refund reservations and inventory triggers. Fix the narrow defects and prove selected-room safety on disposable local Postgres.

## Boundaries & Constraints

**Always:** Each selected room keeps its booked policy and original shared-fee allocation. Count prior and reserved refunds; never over-refund verified captures. Preserve every retained room's dates, prices, terms and stock. Require authenticated ownership, explicit confirmation, server revalidation and idempotency. Keep booking state, refund obligations and actual bank outcomes separate. Use integer paise and existing largest-remainder helpers.

**Never:** Reprice retained rooms, infer bank credit or refund timing, mutate Neon, enable Live money, invent historical room attribution, migrate existing data without a user decision, or push without release authorization.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|---|---|---|---|
| Mixed policies | Some booked rooms selected | Their own snapshots determine rent/tax/fee entitlement; retained snapshots stay equal | No live-plan lookup |
| Wrong scope | Other customer, foreign/released room, multiple stays with room IDs | No refund, stock or booking mutation | Existing ownership/scope errors |
| Replay / race | Same key, conflicting payload, overlapping confirmations | One effect; matching replay returns recorded receipt | Conflict or stale outcome |
| Zero due | Nonrefundable room | Release only selected inventory; no refund obligation | Truthful zero-money receipt |
| Earlier reservations | Previous attributable cancellations / multiple capture sources | Allocate only remaining verified capacity | Refuse ambiguous history with an admin-resolution explanation |
| Boundary | Request at/after check-in | Honor booked at/after-check-in percentage consistently | Evaluate only affected rooms; preserve legacy restrictions |

**User decisions (26 October):** Require admin resolution before selected-room cancellation when older refunds lack room attribution. Apply the booked at/after-check-in percentage consistently to selected rooms and whole-stay cancellation. Do not redistribute historical refunds.

</frozen-after-approval>

## Code Map

- `../../../rentra-backend/src/services/booking/cancellation.js`: `stayEntitlement`, `capturedAllocations`, `allocateRefund`, `applyCancellation`, preview/confirm. Reuse strict selection, binding, atomic obligations and replay records. Fix remaining-capacity allocation that currently exhausts entitlement before reservation caps.
- `../../../rentra-backend/src/services/booking/hotel-stays.js`: `previewHotelCancellation` reads booked room snapshots; currently evaluates unselected rooms before filtering.
- `../../../rentra-backend/src/services/booking/checkout.js`: `ownedCheckout` authorizes the customer under existing listing/inventory serialization.
- `../../../rentra-backend/drizzle/0064_*.sql`, `0067_*.sql`: existing room-state/inventory triggers; reuse, do not duplicate stock arithmetic.
- `../../../rentra-backend/test/integration/hotel-growth.integration.test.js`: existing quote/capture fixture and equal-room cancellation evidence.
- `../../../Rentra/components/customer/CancelVisits.jsx`: existing room picker, preview, consent, retained selection and retry request; replace invalid hotel policy display using server-owned facts.
- `../../../Rentra/lib/actions/customer.js`: existing cancellation transport; keep its input/error boundary.

## Tasks & Acceptance

**Execution:**
- [x] Resolve the two product questions and record the answers in frozen intent.
- [x] `../../../rentra-backend/test/integration/hotel-growth.integration.test.js` — extend real service evidence for mixed policy rooms, unchanged retained snapshots, inventory, ownership/scope, replay/race/stale, zero due and prior reservations.
- [x] `../../../rentra-backend/src/services/booking/cancellation.js` — correct capture-capacity allocation and implement the ratified attribution/boundary behavior; add a focused allocation regression test.
- [x] `../../../rentra-backend/src/services/booking/hotel-stays.js` — constrain calculation to selected rooms if required by ratified boundary behavior; update all callers compatibly.
- [x] `../../../Rentra/components/customer/CancelVisits.jsx` and focused component test — show affected/retained room facts, valid policy/component labels and truthful pending/error outcomes with accessible touch targets.
- [x] Run full suites, targeted formatting/lint, whitespace and independent review; record actual outcomes and triage.
- [x] Update this spec and HANDOFF with exact code commits, release status and next action; commit with existing attribution convention.

**Acceptance Criteria:**
- Given mixed booked room policies, when the selected cancellation is confirmed, then only selected room nights release and retained dates, terms and amounts remain unchanged.
- Given competing, stale, replayed or zero-due requests, when processed, then stock and money effects occur at most once with truthful scoped outcomes.
- Given earlier refund reservations, when calculating an attributable selected-room entitlement, then neither room entitlement nor verified capture capacity is exceeded.

## Implementation Notes

Startup succeeded using the README's `python -m uv` fallback. Working trees were clean before workflow-generated context/spec files. Code HEADs are frontend `3865893f33bcd37cbeeb409d978cf36b8e116eec`, backend `1082e2f3ae6601dfd86420eebcbbdf812150353b`; docs HEAD is `9c2ff58bc9d1e5f88355074dd1cbc62af1f5861b` (Epic 1). The requested Story 2.2–2.9 specs and checkpoint are absent from this docs checkout; fetching origin failed because GitHub was unreachable. Treat attachment decisions as user context, not historical test proof.

Disposable PostgreSQL 17 was initialized locally on 127.0.0.1:55432. Tests receive explicit local test URLs and an unusable application DATABASE_URL; no Neon command is authorized. Frontend baseline: 115 passed, zero failed/skipped. Backend baseline is running separately in the parent session; implementation must run focused tests and the parent will run full post-change suites. An inline reproduction confirmed allocateRefund returns zero rather than 100 minor units when a fully reserved first source precedes a free second source. Disposable local URLs: postgres://postgres@127.0.0.1:55432/postgres. Set both PORTAL_TEST_DATABASE_URL and CP01_TEST_DATABASE_URL; set DATABASE_URL=postgres://nobody@127.0.0.1:1/never. Do not read hosted credentials into output. Parent owns cluster cleanup and final commits; leave changes uncommitted for review. Tests first where practical. No new migration expected: recognize attributable earlier cancellations using existing booking_cancellation snapshots/refund IDs and fail closed for unmatched reservations; test this explicitly.

## Spec Change Log

## Review Triage Log

Read-only investigation independently confirmed the preview display, capture-capacity allocation and started-operation inconsistencies. Implementation review remains pending.

## Verification

- Backend: full `npm test` with both test database URLs set to the disposable localhost cluster and `DATABASE_URL=postgres://nobody@127.0.0.1:1/never`.
- Frontend: `npm test`.
- Targeted ESLint/Prettier and `git diff --check` in affected repositories; migration journal check if a migration becomes necessary.
- Independent nontrivial-diff review, including financial allocation and selected stock scope.

## Open Gates

Real provider refund limits/timing, fee GST/accounting, gateway costs, hosted acceptance, outdated published 8% policy, discovery filter and dispute caps remain unresolved. Local verification does not establish hosted or Live release readiness.

### Pre-review verification

Focused backend: 14/14; frontend behavior: 3/3. Baselines: backend340/340, frontend115/115, no skips. Recovered docs by fetching and fast-forwarding to fd429dd19f29f2b7dd88bfa1957d23ad4ad193fc; its Story2.9 checkpoint and Story2.6/2.7 specs match code HEADs. Existing at/after0% refusal is preserved; positive booked percentages are consistent for hotel rooms and whole hotel stays. Source services are deliberately excluded by repository ESLint/Prettier configs; preserve their formatting and check syntax. Test files and frontend use configured format/lint.

### Independent review - pass 1

All three configured layers completed: blind hunter, edge-case hunter (no findings), verification-gap reviewer. Each finding was triaged separately:

| Finding | Verdict / route | Evidence and disposition |
|---|---|---|
| Blind 1: full-paid exception crosses check-in | medium / patch | The exception admits a stay whose estimate preceded check-in; limit the exception to already-started-at-estimate stays and apply the same bound to selected release. |
| Blind 2: mixed legacy/window selection changes formula | false | Existing accepted stay snapshots are created together by one quote generation. Pre-window stays have legacy snapshots; later stays have a policy on every room. Immutable snapshots and no add-room-in-place command prevent the claimed mixed state. Story2.7 explicitly records this invariant. |
| Blind 3: legacy policy detail absent | medium / patch | Legacy entitlement has no roomDetails and the room branch suppresses its applicable free/late rule; show the rule and exact charge/refund facts. |
| Blind 4: identical room-type labels | medium / patch | The same type can have several guest/plan lines; add a stable original room ordinal and available guest/plan facts in all affected/retained summaries. |
| Blind 5: full-stay receipt says one visit | low / patch | Receipt is technically accurate but omits cancelled room count; use server room facts for full and partial stay receipts. |
| Blind 6: stale final explicit room uses generic error | low / patch | Empty booked-row branch precedes explicit scope check; use the specific room refusal. |
| Blind 7: failed historical reservation branch untested | medium / patch | Failure exclusion needs direct evidence. Attributed earlier cancellation is already covered by the remaining-room preview and confirmation assertions. Add only the missing failed-history proof. |
| Blind 8: distinct-room race absent | medium / patch | Same-room overlap/replay does not exercise independent rooms sharing capture capacity; add exact refund/stock/retained assertions. |
| Verification: last-room receipt classification test absent | low / patch | All existing successful receipt fixtures set partial:true; add submitted-subset/server-partial:false evidence. |

All patch findings returned to the original implementer for focused fixes. No findings were deferred. Existing provider, hosted, legal and financial release gates remain open.

### Review closure

The original implementer fixed all seven actionable blind-hunter findings and the separate last-room verification gap. The blind reviewer inspected the final code and tests and confirmed no remaining defect from those findings; the verification reviewer ran the focused last-room test and confirmed the demonstrated regression is caught. Edge-case hunter returned no findings. No review issue was deferred.

The final implementation binds startedAtEstimate into the preview hash. Both selected-room release and whole-stay cancellation retain the update-time check-in guard unless a positive-policy hotel stay was already started at estimation. A deterministic disposable-transaction test crosses check-in between estimate and apply in each path and proves rollback without a refund obligation. Existing legacy and at/after-zero refusals remain intact.

Matrix audit: mixed-policy/retained facts, scope refusals, replay/overlap/distinct-room concurrency, zero due, earlier attributable/ambiguous/failed reservations, and positive/zero/legacy/crossed check-in boundaries all have executed focused tests. The component harness executes the real JSX and handlers for policy/amount labels, selection and consent resets, lost-response identical retry, refusal recovery, legacy rules, and server-authoritative last-room receipt wording.

### Additional changed files

- `../../../rentra-backend/src/services/booking/cancellation-actions.js`: maps room/history refusals to actionable customer messages.
- `../../../rentra-backend/test/services/refund-basis.test.js`: multiple-capture remaining-capacity regression, zero and existing whole-visit behavior.
- `../../../Rentra/test/cancel-visits.test.js`: five component behavior tests, using installed Next SWC and the repository's hook-harness pattern.

### Next story gap scan

Story2.11 has stored/editable earlyDeparture policy configuration, but a source search found no execution command or unused-night refund/inventory transition. Start its full read-only investigation from epics.md, domain/cancellation-policy.js, hotel-stays.js, cancellation.js and room inventory triggers. Do not mistake the configuration editor for delivered early-departure behavior.

### Final verification and commits

- Backend full suite: **348 passed, 0 failed, 0 skipped** (278 top-level tests), after all review patches. Both test URLs used the disposable cluster on 127.0.0.1:55432; application DATABASE_URL was the unusable localhost port1 URL. No Neon test or fixture ran.
- Frontend full suite: **120 passed, 0 failed, 0 skipped**, after all review patches.
- Focused patched checks: backend16/16; component behavior5/5. Matrix rows are covered and passed in the full runs.
- Targeted configured ESLint: passed for changed tests/frontend with zero warnings. Backend services are intentionally ignored by the repository config; all three changed service modules passed `node --check`.
- Prettier: changed backend tests/frontend passed. Service formatting exclusions were preserved.
- Migration journal: **76 files/entries verified**; no new migration and no database access in this check.
- `git diff --check`: passed in frontend/backend/docs.
- Independent review: all three configured layers completed; all actionable findings fixed and bounded reviewer closure confirmed; one unreachable mixed-snapshot finding dismissed with evidence, none deferred.

Backend commit: `9a7501d991604c45e775e69c5c4b5054c3183872`.
Frontend commit: `3621f649a5da66d19d5077502a3bdf74c7916a23`.
Docs baseline after checkpoint recovery: `fd429dd19f29f2b7dd88bfa1957d23ad4ad193fc`.
All new commits are local and unpushed, with attribution trailers. No release approval is inferred.

Not run: browser/responsive/device/screen-reader acceptance, production build, real provider or hosted acceptance. No bank/provider operation, hosted migration or deployment occurred. Existing release gates above remain open.

Exact next action: start Story2.11 through bmad-build. Read its acceptance criteria and investigate the existing policy storage, nightly snapshots and room inventory triggers before selecting an early-departure command/state contract. Preserve strict unused-night starts, original allocations, explicit consent and zero-refund behavior; ask only for genuinely new product choices.
