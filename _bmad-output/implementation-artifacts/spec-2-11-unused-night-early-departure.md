---
title: 'Story 2.11: End stays using booked unused-night rules'
type: 'feature'
created: '2026-10-26'
status: 'done'
route: 'dispatch'
baseline_commit: '9a7501d991604c45e775e69c5c4b5054c3183872'
review_loop_iteration: 0
---

<frozen-after-approval reason="Approved backlog and standing implementation authorization; PRD FR9 settles the policy">

## Intent

Guests can explicitly end selected rooms of an already-started supported hotel stay early. The existing editor stores early-departure policy, but no command applies it or releases only unused inventory. Reuse the cancellation preview/confirm flow with a distinct early-departure operation and truthful receipt.

## Boundaries & Constraints

Use the confirmed request instant and booked timezone/check-in schedule. Night starts strictly later are unused; equality and commenced nights are consumed. Apply each room's booked earlyDeparture percentage only to unused original rent (including paid extras), tax and allocated fee. No offer means zero entitlement; an offered 0% also means zero. Explicit consent may end occupancy with no refund; preview or merely leaving does nothing. Property/access claims remain support/dispute work.

Preserve original dates, nights, amounts and policy snapshots. Preserve retained rooms completely. Split original stay fee over all original rooms using Story2.10's stable ID/rent allocation, then each room's fee over all original nightly rent weights in date order. Apply refundOfPaid once per room's aggregate unused components. Never redistribute consumed charges or prorate hours. Reject unsafe or unsupported snapshot shapes rather than guessing. Count prior/reserved refunds; ambiguous historical attribution requires admin resolution.

Reuse authenticated ownership, listing/order locking, server previews, explicit consent, atomic refund obligations and idempotency. Omitted operation preserves existing cancellation payload/hash/replay behavior. No provider calls in transactions, refund timing promises, Live enablement, hosted writes or pushes. Local migration only; the user applies hosted migrations before any backend release.

## I/O & Edge-Case Matrix

| Scenario | Expected behavior |
|---|---|
| Begun stay, mixed room offers | Preview selected consumed/unused nights, original components, percentages, prior reservations and exact refundable amount; only confirmed selected scope ends |
| Exact nightly start | Equal/current night consumed; only later starts unused; booked schedule survives owner edits |
| Zero/no offer/no unused nights | Explicit end is separate from money; no refund row/provider work and no release of consumed nights |
| Wrong owner/foreign room/not started/ended/legacy unsupported | Refuse without mutation and provide recovery/support copy |
| Stale night-boundary preview | Fresh DB time changes scope/hash; refuse and require new preview |
| Replay/conflict/overlap | Same request returns receipt; changed action/payload conflicts; stock and money effects at most once |
| Prior refunds/subsequent room actions | Recognize attributable history, refuse ambiguous history, cap captured capacity, never double-release freed nights |

</frozen-after-approval>

## Code Map

Paths below are relative to this spec directory.

- `../../../rentra-backend/src/services/booking/cancellation.js`: existing strict input, preview digest, attribution refusal, allocation/obligations, atomic commit and replay. Add optional literal operation `early_departure`, preserving absent-field hashes. Existing actions/controller/routes already pass the input unchanged; extend customer error messages in `cancellation-actions.js`.
- `../../../rentra-backend/src/services/domain/hotel.js`, `booking-money.js`, `booking-dates.js`: checked money, refundOfPaid, stable allocations and propertyLocalInstant. Add focused pure unused-night logic in `domain/early-departure.js`, with unit tests. Nights contain rateMinor including extras and taxMinor. Booked schedule is order.policy_snapshot.hotel.checkInMinute plus booking.time_zone; never query current hotel hours.
- `../../../rentra-backend/drizzle/0064_hotel_inventory.sql`, `0067_hotel_checkout.sql`: existing sold-night and follow-booking triggers. Add migration `0076_early_departure.sql` and journal entry. Nullable booking_room departed_at/inventory_end, no historical backfill; existing stayed state plus explicit metadata. Replace inventory trigger using old/new effective ranges so consumed counts remain and freed nights cannot release twice; retain capacity, immutability, state and stop-sell guards.
- `../../../rentra-backend/src/services/booking/records.js`, `staff-visits.js`, `owner-visits.js`: expose departure facts, keep early-completed stays visible in past history before original checkout, omit departed rooms from active room summaries. When no booked rooms remain, finish the booking using existing completed state; do not fabricate actual visit evidence or review eligibility. Keep original order/payment amounts and dates.
- `../../../rentra-backend/src/services/analytics/hotel-analytics.js`, `finance/hotel-payouts.js`: occupancy/night-count expansions must respect effective inventory end. Financial ledger/payable values still come from original payments and refunds; no repricing. Audit booking_room readers for direct consequences.
- `../../../Rentra/components/customer/CancelVisits.jsx`: add a clearly labelled end-early operation on existing page, reuse room picker and recovery. Show consumed/unused nights, booked percentage/components and explicit occupancy consequence; reset consent/preview/retry on operation changes. Avoid new routes/APIs. `BookingRecords.jsx` links to manage cancellation/early departure and shows room departure facts; `test/cancel-visits.test.js` already executes real JSX/handlers via installed SWC.

## Tasks & Acceptance

- [x] Add pure `early-departure` tests first: nightly equality/before/after, timezone/schedule, uneven rent/tax/fee/extra amounts, stable rounding, zero and invalid snapshots.
- [x] Add migration0076 plus journal; verify fresh and existing-row preservation, inventory release/consumed counts, capacity enforcement and subsequent trigger transitions.
- [x] Extend existing cancellation engine/messages with operation-specific estimate/apply and compatible replay; keep normal cancellation unchanged.
- [x] Update records/history/active-room/occupancy consumers and visible departure labels; audit original-date readers for disappearance or false active occupancy.
- [x] Extend UI and component behavior tests for operation changes, consumed/unused facts, consent, zero/no-offer receipt, rejection and lost-response retry. Read installed Next docs before any unfamiliar Next API; existing JSX/hooks need no new API.
- [x] Add disposable-Postgres integration using existing hotel capture fixture: mixed selected rooms, retained snapshots, prior/ambiguous/failed reservations, stock on every night, history visibility, replay/conflict/races/stale boundary and no preview side effects.
- [x] Run full backend/frontend suites, targeted configured ESLint/Prettier, service syntax checks, migration journal and whitespace checks; independent financial/edge/verification review, triage and fixes.
- [x] Record actual evidence, full local code commits, migration release gate and exact next action in this spec and HANDOFF; commit with attribution, no push.

Given an eligible begun stay, when the guest confirms early departure, then only selected rooms end and only strictly unused future stock releases, with exact policy-entitled obligations separate from refund completion.
Given used nights, retained rooms or earlier refunds, when the command executes or races another action, then original terms/history remain, captured capacity is respected and stock/money cannot duplicate.
Given no confirmation, unsupported policy, stale scope or unauthorized caller, when preview/confirm is attempted, then no departure/refund/release silently occurs.

## Implementation Notes

Baseline matches the previous checkpoint; all three working trees clean. Backend `9a7501d991604c45e775e69c5c4b5054c3183872`, frontend `3621f649a5da66d19d5077502a3bdf74c7916a23`, docs `95a252875f3d85953cbd0401817c5284af408b21`. Previous actual full checks: backend348/348, frontend120/120; rerun after this change. Read-only investigation confirmed no early-departure execution and no new product decision needed (PRD FR9 and architecture AD10).

Use disposable local PostgreSQL at 127.0.0.1:55432 only: PORTAL_TEST_DATABASE_URL and CP01_TEST_DATABASE_URL point to postgres://postgres@127.0.0.1:55432/postgres; DATABASE_URL must be postgres://nobody@127.0.0.1:1/never before tests. Fixture helper validates localhost. Parent starts/cleans the cluster and runs final broad suites. Implementer runs focused checks and leaves changes uncommitted for parent review. No Neon/provider/deployment commands. Backend services are intentionally ignored by configured ESLint/Prettier; preserve formatting and check syntax. No new dependency.

## Spec Change Log

## Review Triage Log

## Verification

Focused pure and disposable integration/component tests; full `npm test` in both code repositories with explicit local test URLs for backend. `npm run db:check` must verify 77 migration files/entries. Targeted configured ESLint/Prettier, service `node --check`, `git diff --check`. Review against every matrix row; no skipped tests as acceptance evidence.

## Open Gates

Migration0076 must remain local until the user applies it to Neon; backend reads of new columns must not deploy before that. Real provider refund limits/timing, GST/accounting (including unused-night accounting), gateway costs, hosted acceptance, published 8% policy, discovery filter and dispute caps remain open. No local engineering result authorizes Live financial release.

### Investigation follow-through before implementation

- Migration0030 `client_update_from_lifecycle()` only recognizes confirmed/cancel events. Extend that existing transactional owner booking-update path for the distinct departure event, preserving simulation suppression/preferences and tracked delivery. Add the owner event title in `notifications/owner-domain.js`; include scoped room/date/departure facts so the notice does not say the whole booking was cancelled. This follows AD13 and existing property-owner booking notifications; no new recipient/channel policy.
- `rentra_review_eligible()` in0068 uses existing completed-hotel eligibility and original ends_at+30-day window. Preserve those review rules; do not invent new evidence or a new review window. The command itself creates only a truthful early-departure record.
- Audit booking summaries/calendar presentation: original booked dates remain original; include departure facts where a current record/export otherwise conceals early end. Reuse the backend/frontend domain booking-record summary pattern and test any changed output. Do not silently replace accepted terms or fabricate a tax invoice.
- The parent successfully started a fresh disposable PostgreSQL17 cluster on127.0.0.1:55432; it is ready for focused tests. The parent has already rendered and activated bmad-build. The Step3 implementer must continue the dispatched workflow rather than re-running the skill renderer.

- State-guard audit: migration0060 `rentra_visit_transition_proof()` normally requires returned+complete evidence before booking.completed. Migration0076 must add a narrowly scoped ended-early proof path (hotel, started active stay, persisted explicit departure receipt/room markers, no remaining booked rooms) while preserving every existing no-show/evidence guard for ordinary transitions. Never insert fictitious visit_evidence just to satisfy the old guard. Exercise this path and refusal of unrelated evidence-free completion in integration tests.
- Already-started hotel fulfillment can be confirmed or handed_over (actual handover recorded); do not accidentally reject the normal checked-in state. Returned state is already physically checked out, but can still request the booked early-departure refund while within original stay and with booked rooms; use the same explicit request-time rule. Disputed/no_show/cancelled/completed states remain separately reviewed/terminal and are refused by this guest operation. Preserve open support/property incident records independently.

### Pre-review checks

Focused integration10/10, pure3/3, frontend component8/8. Populated0075->0076 real migration preserves original room/stock rows and adds only NULL metadata. All source implementation complete; parent removed speculative historical-overlap SQL because valid prior commands atomically release/end affected rooms and terminal guards prevent restoring them. Existing missing-attribution refusal and capture caps remain. Configured targeted ESLint/Prettier and whitespace pass; journal verifies77 entries. Full post-change suites are running. Parent fixed two test-only lint errors (unused import and const). No hosted operation ran.

### Independent review - pass 1

All three configured review layers completed. Parent read the source/diff, traced inventory and staff/analytics consumers, and classified each finding separately before grouping:

| Finding | Verdict / route | Evidence and disposition |
|---|---|---|
| Edge1: released nights also remove retained revenue | medium / patch | The new WHERE predicate filters both count and revenue. Preserve the existing gross booked-revenue-before-refunds/tax sum, filter occupancy counts separately, and label the distinction. Net accounting is not introduced. |
| Edge2: caretaker active guest count remains original | medium / patch | Staff visitDTO maps b.guests while owner active counts now use booked rooms. Derive active hotel counts and show sanitized room/departure facts. |
| Verification1: admin rankings/owner earnings lack departure assertions | medium / patch | Existing tests cover only owner daily occupancy for departures. Add direct admin hotel/city aggregate and owner earnings room-night assertions, with gross revenue expectations matching the preserved definition. |
| Verification2: caretaker Past path untested | medium / patch | listBookingRecords checks do not execute listStaffVisits; add assigned caretaker list/count/detail checks before original checkout. |
| Blind1: bank copy contains question mark | low / patch | Visible payment notice was corrupted by a text write. Use existing money(0) formatter and assert output. |
| Blind2: staff cannot identify retained/departed rooms | medium / patch | Existing caretaker records expose no room facts and original guest totals. Add only authorized operational facts, preserving no-money/no-customer-identity and contact permissions. |
| Blind3: revenue falls despite no refund | medium / patch | Same filtering defect as Edge1; correct without changing existing gross financial semantics or inventing new net accounting. |
| Blind4: original schedule/instants disagreement not refused | medium / patch | Dates are checked but actual starts/ends can disagree with booked hotel minutes on inconsistent historical rows. Fail closed and test both disagreements. |
| Blind5: operation clock precedes room lock | medium / patch | Outer inventory mutex locks booking/order rows, not booking_room. A separately locked room can delay after clock capture. Acquire scoped sorted room locks before clock and prove behavior under contention. |
| Blind6: post-payout recovery accounting evidence | medium / defer | Ordinary booked-policy cancellation already permits refunds after payout; payout runs exclude earlier payouts. Owner responsibility/recovery is explicitly Story 2.17 and a pre-existing financial release gate. Add a bounded payout immutability/refund regression if practical, but do not invent recovery policy or claim financial acceptance. |
| Blind7: staff partial/full regression absent | medium / patch | Same consumer gap as Edge2/Verification2; cover real staff list/detail and past counts. |
| Blind8: blocked-lock cutoff regression absent | medium / patch | Existing proxy boundary test changes clocks between previews, not while waiting on a room lock. Add a deterministic lock-contention regression for the clock fix. |
| Blind9: one remaining room branch untested | low / patch | New departure operation always sends roomIds even when picker hidden. Exercise one booked plus previously departed rows, consent/retry and full receipt. |
| Blind10: own refund failure after departure untested | medium / patch | Historical failed reservation before departure does not prove replay after this operation's refund becomes uncertain. Verify immutable departure/stock and single obligation on exact retry. |

Grouped patches returned to the original implementer. Source/API privacy boundaries remain binding. Full first pass after implementation: backend 361/361, frontend 123/123, zero failures/skips; final suites will rerun after these corrections.

### Review closure and final focused evidence

All three original reviewers inspected the patched code/tests and confirmed their actionable findings closed. Caretaker room facts include no guest names, prices, fees or payment/customer identifiers; contact permissions and assignment removal are tested. Direct financial-consumer assertions cover owner earnings nights, admin hotel/city counts and zero/partial-refund gross booked revenue. Existing gross-before-refunds/tax semantics are preserved and labelled, not replaced with invented net accounting.

The authoritative clock is now acquired after scoped sorted room locks. A deterministic competing transaction proves a blocked request classifies the nightly boundary using the fresh clock. Strict booked minute/start/end consistency is validated. Unknown/provider-failed refund replay preserves departed room state, stock and one provider dispatch. A Test payout preceding departure remains unchanged and cannot be included in a second run; owner recovery/accounting remains Story 2.17 rather than being silently implemented.

The implementer's final focused run passed 18/18 (departure and existing caretaker regression), frontend component 12/12, with pure policy 3/3 preserved. Parent added a test-only failsafe so a missing expected room lock fails within 5 seconds rather than keeping the disposable fixture blocked; the departure integration then passed 16/16 again. Configured targeted ESLint/Prettier, syntax checks for 10 changed service modules, whitespace and the 77-file journal check pass. Final frontend full suite: 127/127, zero failed/skipped.

### Discovery performance gate - pre-existing on this machine

The post-review default parallel backend suite ran 367 tests: 365 passed, 2 failed (the same hotel-discovery performance subtest plus its parent), zero skipped. Shared-run p95 was 2595 ms against the existing 2000 ms shared limit. No threshold was changed.

A dedicated `PERF_GATES=1` run measured p95 330 ms against the existing 300 ms target. A detached clean checkout at the unchanged baseline `9a7501d991604c45e775e69c5c4b5054c3183872` also failed that strict target at p95 521 ms using the same local cluster and command. Its temporary worktree and dependency junction were removed safely afterwards. These samples establish that the strict target is not currently met before this feature too; they do not establish a performance improvement or a precise host/root cause. Discovery code and its thresholds remain unchanged.

A full serialized backend run with the default existing limits is in progress to distinguish functional verification from shared-machine contention. The strict 300 ms gate remains explicitly open regardless of that result; profile it on representative hardware before performance acceptance.

### Final verification and local commits

**Engineering result:** Story 2.11 is complete locally. Explicit selected-room early departure preserves original terms and consumed stock, releases only strictly unused future nights, and creates only the booked attributable refund obligation. Retained rooms, caretaker privacy, historical payouts and normal cancellation replay remain intact.

- Full backend, final tree: **367 passed, 0 failed, 0 skipped**, using `node --import ./loader/register.mjs --env-file=.env --test --test-concurrency=1 'test/**/*.test.js'` with both test URLs on the disposable localhost cluster and the application URL on unusable localhost port1. Discovery p95 in this default-limit serialized run was **393 ms**, below its unchanged 2000 ms default budget. This does not pass the separate strict 300 ms gate.
- Full frontend: **127 passed, 0 failed, 0 skipped** via `npm test`.
- Parent final departure integration: **16/16**, after the bounded lock-wait test guard; real staff-page rendering tests **2/2** after formatting. The full frontend run includes both staff tests and all 10 cancellation/departure component tests.
- Targeted configured ESLint/Prettier: passed for all changed tests/frontend files, including the new `test/staff-departure.test.js`. The existing backend service exclusions were preserved; `node --check` passed for all 10 changed service modules.
- `npm run db:check`: **77 migration files/journal entries verified**. The populated 0075-to-0076 integration proves no original room or stock mutation at upgrade; existing rows receive NULL metadata.
- Git whitespace checks passed. All three independent reviewers confirmed their actionable findings closed. Pre-existing post-payout responsibility/recovery accounting and the strict discovery-performance gate remain explicitly deferred in deferred-work.md.
- Disposable PostgreSQL was stopped and its verified task-specific scratch directory removed. The temporary performance baseline worktree/junction and generated test logs were removed. No test fixture or migration ran on Neon.

Backend: `2de5da728415345f8cb5a13a859b7ff683838d52`.
Frontend: `a7d43d2c36d64e6fc150f568037f30af6c53d80b`.
Docs baseline: `95a252875f3d85953cbd0401817c5284af408b21`.
All feature commits are local and unpushed, with attribution trailers.

**Additional implementation reach:** sanitized staff API facts in staff-visits.js are rendered by `../../../Rentra/app/(staff)/staff/page.js` and `../../../Rentra/app/(staff)/staff/visits/[orderId]/page.js`; their real JSX is covered by `../../../Rentra/test/staff-departure.test.js`. Owner/admin analytics explain that revenue is gross booked charges before refunds/tax and room-night counts exclude released nights. Existing ordinary review eligibility/window rules remain unchanged; no fictitious completion evidence is inserted.

**Release:** the user must apply migration0076 before backend deployment because records/analytics now read the new columns. Then verify hosted schema read-only, and push backend before frontend only when release is explicitly authorized. No production build, real-browser/device/screen-reader, actual provider or hosted acceptance is claimed. Strict discovery p95<300 ms remains unmet on this machine (330 ms here, 521 ms on unchanged baseline). Provider/tax/fee/accounting/funding/recovery and other launch gates above remain open.

**Exact next action:** Story 2.12, payout mode and eligibility. Start its read-only bmad-build investigation in finance/hotel-payouts.js, existing payout destination/funding/worker paths and the admin payout UI. The backlog requires global Auto plus authorized owner override, eligibility after verified capture and confirmation without check-in/Tuesday delay, and mode revalidation for uninitiated work while preserving initiated/uncertain transfers. Owners must not set their mode. Do not invent provider eligibility or funding evidence and do not deploy before migration0076.
