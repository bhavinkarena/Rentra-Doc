---
title: 'Story 2.12: Control effective payout modes and eligibility'
type: 'feature'
created: '2026-10-26'
status: 'done'
route: 'dispatch'
baseline_commit: '2de5da728415345f8cb5a13a859b7ff683838d52'
review_loop_iteration: 0
---

<frozen-after-approval reason="Approved FR13/AD9 and standing authorization; no new product choice">

## Intent

Finance admins can review and confirm one global Auto/Manual payout mode and an optional owner-wide override. Auto is the launch default; clearing an override inherits the current global mode. Owners cannot set it. New payout eligibility follows verified capture and confirmed booking, without check-in/completion/Tuesday waits. Reuse existing financial records and guards.

## Boundaries & Constraints

Both modes share accounting eligibility: verified scoped capture, supported confirmed-booking evidence, immutable booked owner, active owner/current verified destination and remaining capacity after completed/reserved refunds and initiated/uncertain payouts. Disputed/unresolved attribution and unsupported records stay held. Policy-settled guest cancellations can retain net owner entitlement; preserve existing non-refundable cancellation behavior rather than paying a full cancelled amount or treating late capture alone as confirmation.

Recheck current mode and eligibility for uninitiated work under shared guards. A mode toggle never updates, cancels, redirects or duplicates existing payout/uncertain transfer records. Historical payout/destination snapshots remain pinned. No per-property mode, scheduled settings, fees, new tax/cost/funding amounts, debt offsets or automatic bank debit.

Provider transfer execution/claims/reconciliation are absent and belong to Story2.13. This story MUST NOT invent an Auto worker, provider readiness flag or movement. Configure Auto truthfully while showing the transfer/provider/funding gate. Preserve authorized admin Test hotel runs under either mode only as explicitly unfunded statements, not manual transfer overrides or Auto initiation. Fail closed for NEW Live initiation and entered-UTR Live settlement until verified provider execution exists; Test actual bank money remains zero. No hosted migrations, provider calls or pushes.

## I/O & Edge-Case Matrix

| Scenario | Expected behavior |
|---|---|
| Global Auto default / owner override / inherit | Immediate append-only changes with reason, authenticated finance authorization and review/confirm; latest owner clear must not revive an older override |
| Read-only admin, owner, stale or repeated save | No unauthorized mutation or duplicate setting; stale confirmation returns truthful reload/review recovery |
| Verified pre-arrival booking | Same accounting eligibility in both modes; no check-in/Tuesday wait or bank settlement promise |
| Refund/cancellation/unverified or inactive owner/destination | Count reserved/completed money, hold unsupported/incompatible work and preserve immutable booked-owner attribution |
| Queued uninitiated work and mode toggle | Current mode/version governs new initiation checks; old initiated/uncertain rows and snapshots unchanged |
| Test statement / new Live request | Test statement explicitly moves no money under either mode; Live initiation/UTR completion refuses without mutation while provider/funding gates remain |

</frozen-after-approval>

## Code Map

Paths relative to this spec directory:

- `../../../rentra-backend/src/services/finance/hotel-payouts.js`: legacy statement/run path, requireAdmin, payableStays/buildRun/preview/execute/settle. Remove old time waits and Tuesday promises for new work; preserve old snapshots, amount rules and pinned obligations. Live execution is currently NOT fail-closed and manual UTR can mark paid; close that path rather than broadening it.
- `../../../rentra-backend/src/services/finance/statements.js`, `owner-earnings.js`: generic immutable owner attribution, verified captures, refunds and accounting DTOs; current allocation waits completed/no_show and DTOs explicitly say rail/disbursement unavailable. Use shared eligibility and expose effective mode/source without admin history/private fields to owners. Accounting eligibility is not a final disbursable amount.
- `../../../rentra-backend/src/services/finance/service-fee.js`, `admin/hotel-finance.js`: reuse audited append-only/stale-preview/admin.payments.read/write patterns, but payout settings must authorize in the service too. Add `finance/payout-modes.js` and only the shared policy/eligibility helper needed by actual readers/guards; no placeholder queue.
- `../../../rentra-backend/drizzle/0068_hotel_post_stay.sql`: financial-source trigger also enforces obsolete time/current-property-owner payout rules. Migration `0077_payout_mode.sql` plus journal must update only necessary eligibility/immutable-owner conditions, retaining capture, currency, environment, capacity, pinned destination and existing historical protections. Add append-only mode settings seeded global Auto; nullable latest owner mode clears override, no historical payout rewrite.
- `../../../rentra-backend/src/services/booking/inventory.js`, `payments/refunds.js`, `payouts/destinations.js`: existing lock order, refund reservations and versioned destination supersession. New statement/initiation decisions must revalidate under common order/booking guards with stable order, not just the legacy unrelated run mutex. Mode writes/new decisions serialize so a stale mode cannot win a race. No network in transactions.
- `../../../rentra-backend/src/controllers/hotel-finance.controller.js`, `routes/admin.route.js`: add finance-authorized read/preview/confirm settings endpoints. Preserve all existing callers. Owner APIs have no write path.
- `../../../Rentra/components/admin/ServiceFeePanel.jsx`, `lib/actions/hotel-finance.js`, `lib/api/endpoints.js`, `app/(admin)/admin/finance/page.js`: reuse house form/transport/navigation for a small payout-mode page/panel. Expose effective source/inheritance, current and proposed values, reason, consent, pending/error/stale recovery and read-only controls. Do not copy the service-fee future-date option.
- `../../../Rentra/components/admin/HotelPayouts.jsx`, `components/partner/earnings/HotelEarnings.jsx`, `components/finance/Statements.jsx`: remove new-work Tuesday/check-in/completion promises. Distinguish configuration, accounting eligibility, unfunded Test statements, initiation and verified bank outcome. Preserve historical dates. Owners may read effective mode but never edit it.

## Tasks & Acceptance

- [x] Add focused policy/settings/eligibility tests first where practical; global/override/reset, stale/repeat/races, read/write/owner denial, before-arrival capture, refund capacity and immutable owner/destination.
- [x] Add migration0077/journal and service-authorized audited preview/confirm settings; prove populated0076 upgrade preserves existing payout rows/snapshots and enforces history immutability.
- [x] Reuse shared current-mode/eligibility logic in real hotel/generic readers and guards; remove obsolete waits at service and SQL boundary while keeping provider/funding execution unavailable.
- [x] Revalidate Test statement creation with cancellation/refunds/mode under shared ordered locks. Preserve existing initiated/uncertain records and stop any new Live/UTR bypass. Do not change provider jobs or create a pretend Auto queue.
- [x] Add admin UI/API wiring, permission/read-only behavior and owner-safe status/copy. Read installed Next docs before unfamiliar APIs. Use existing components/44px targets and test real component handlers/response recovery.
- [x] Update affected existing tests/fixtures to the ratified policy, preserving prior safety assertions. Include new pre-arrival, mode-toggle, reserved-refund, destination supersession, attribution and Live refusal evidence.
- [x] Run full backend/frontend suites, targeted configured lint/format, service syntax, journal and whitespace checks; independent money/edge/verification review and triage/fixes.
- [x] Write actual evidence/open gates/full local commits here and HANDOFF; commit with attribution, no push.

Given a verified confirmed booking before arrival, when either mode evaluates uninitiated work, then the same current owner/refund/capacity checks apply without a clock wait and real initiation remains subject to provider/funding readiness.
Given a reviewed settings change, when confirmed or raced/replayed, then only an authorized current-version change is recorded and existing initiated/uncertain payouts remain unchanged.
Given cancellation/refund decisions, unsupported ownership, unverified destination or missing transfer capability, when new work is attempted, then incompatible money is not reserved/sent and the UI reports a truthful hold rather than bank completion.

## Implementation Notes

Entire implementation (backend, migration, frontend and focused tests) is assigned to the Step3 implementer; work sequentially and leave changes uncommitted. Parent handles final full suites, independent review, docs and commits. Parent already rendered bmad-build successfully with the repository-supported `python -m uv` fallback using Rentra-Doc as project root; this is an implementation dispatch within that workflow, NOT a new skill activation. Do not rerender/restart discovery.

Clean baseline: backend `2de5da728415345f8cb5a13a859b7ff683838d52`, frontend `a7d43d2c36d64e6fc150f568037f30af6c53d80b`, docs `abb429bb92c000347dbbcc07497ab4eed7585b55`; matches HANDOFF. Previous actual full checks367/367 serialized backend and127/127 frontend. Existing strict discovery300ms gate also fails unchanged baseline; do not weaken it or expand scope to unrelated performance work.

Implemented contract: `GET /admin/payments/payout-modes` returns authorized history, current global mode, write capability and the execution gate. `POST` accepts ownerEmail (empty means global), mode auto/manual/inherit, reason and preview:true; confirmation sends the same values plus preview:false, previewHash and accepted:true. The hash binds actor, resolved owner, current global/owner versions, proposed value and reason. Stale/repeated confirmation returns STALE_PREVIEW; invalid/absent consent returns422; unauthorized actors return403. Latest owner NULL means inherit, never resurrection of an older override. The shared policy mutex serializes mode writes with new statement decisions; candidate listing/order/booking/owner/destination/payment-order locks and a second hash comparison recheck current facts. No provider network operation occurs in a transaction.

The existing hotel run endpoints only create/close unfunded Test statements. The compatibility settle command no longer needs a UTR for Test closure and never updates its payout rows. New Live execute/settle returns PAYOUT_EXECUTION_UNAVAILABLE without mutation. Historical dates, terms, amounts and destination versions stay pinned; status updates of pre-0077 funded obligations retain their original identity without requiring a newly invented owner snapshot. New unsupported hotel multi-capture work is consistently held in hotel/allocation readers and new-obligation SQL guards.

Tests only on disposable PostgreSQL127.0.0.1:55432. Set PORTAL_TEST_DATABASE_URL and CP01_TEST_DATABASE_URL to postgres://postgres@127.0.0.1:55432/postgres and DATABASE_URL=postgres://nobody@127.0.0.1:1/never. Parent starts/cleans the cluster. Never test/migrate/fixture Neon. Existing backend services are intentionally ignored by lint/Prettier; preserve style and check syntax. No dependencies or provider accounts added.

## Spec Change Log

## Review Triage Log

All three context-free layers reviewed the combined backend/frontend diff, including untracked source/tests/migration. Every finding is recorded below before grouping. The blind layer's size arithmetic is metadata, not a finding.

| ID | Verdict / route | Finding and evidence |
| --- | --- | --- |
| B1 | medium / patch | Future-only Test statements initialize the minimum period date from a future check-in while periodEnd is today. Initialize the minimum with periodEnd and assert the persisted range. |
| B2 | medium / patch | Admin past-run UI still renders completed Test statements as Paid, although closure moves no money. Use statement completion labels for Test rows. |
| B3 | low / patch | The compatibility Test close command validates a bank UTR, then discards it. Remove this irrelevant requirement while retaining Live refusal. |
| B4 | medium / patch | Removing bank-recording controls also removed the existing Test closure UI operation. Restore a small Test-only close action through the existing command, without bank completion or payout-row mutation. |
| B5 | medium / patch | Hotel previews explicitly hold multiple verified rent captures, while the allocation reader can report that same unsupported hotel booking as eligible. Share the reconciliation hold and test both consumers. |
| B6 | high / patch | New INSERT eligibility predicates also run on status-only updates of pre-0077 funded obligations; old valid rows can lack owner snapshots. Preserve pinned historical status transitions and all source/capacity/destination guards; prove the populated-upgrade case. |
| B7 | false / reject | The claim that admins cannot inspect an owner's effective mode without proposing a change is disproved by the existing admin financial statement Owner ID filter: readStatement resolves that owner's current mode and Statements renders its source, even with no allocations. The settings review also displays the current value before commit. A separate lookup surface is unnecessary. |
| B8 | low / patch | Hotel preview lines include current mode/source but the review UI omits them. Render the existing value per owner. |
| B9 | medium / patch | New-work copy still calls the accounting date a payout date and implies a stay-date cutoff although future bookings qualify. Correct the labels without rewriting historical dates. |
| B10 | low / reject | Native checkbox/browser pending behavior is not covered by a browser run; the existing component test verifies required consent markup, edit/stale recovery and disabled controls, and backend race tests enforce one save. Adding a browser harness is more than a direct correction. Browser/responsive/native-interaction acceptance remains explicitly unexecuted, not a claimed pass. Server-side consent coverage is added separately under V2. |
| E1 | medium / patch | Independently confirms B1's future-only reversed period. The cited guard is the proposed bounded reduce; the actual tree initializes with the first future line. Same fix, separate verdict. |
| V1 | medium / patch | Pre-verified regression gap: the generic allocation transfer test never executes the changed hotel earnings/candidate queries. Add original/new hotel owner counts, captured money and candidate assertions before recording a run. |
| V2 | medium / patch | Pre-verified regression gap: valid-hash requests without consent are never exercised. Assert omitted/false consent changes no setting, effective mode or audit count. |

B1/E1 share the period-initialization defect; B3/B4 share Test-closure presentation/contract cleanup. Remaining patches retain their separate outcomes. No intent or product decision changed and no finding is deferred.

Closure on27 October2026: all three original reviewers inspected the fixed combined diff and confirmed their actionable outcomes closed. Blind B1-B6/B8-B9 and verification V1/V2 closed; edge E1 closed, including a read-only evaluation of the actual reduce expression for future-only/mixed/same-day inputs3/3. Reviewers did not claim database/full-suite execution. No unresolved material review findings remain.

## Verification

Pre-review evidence: focused affected integrations28/28; extended migration/settings and narrowed-lock hotel checks passed; real component handlers3/3. Parent frontend full suite130/130, zero skips/failures. Targeted configured lint/format, four service syntax checks, journal78 and whitespace checks passed.

The first parent serialized backend run finished366/369 with three migration failures, zero skips. All three applied older files plus0077 in one transaction; PostgreSQL55P04 rejected newly added enum value no_show in the SQL helper. Text comparisons fixed the migration; the actual older release/schema upgrade paths plus settings integration then passed4/4. A corrected full run was started; final post-review evidence will supersede this intermediate result.

The second run overlapped review patches and was stopped after SQL42883 in a disposable database setup left its worker connected. The new capture-count helper's parameter collided with the environment column; renaming it capture_environment fixed that query. Only the identified test runner/worker were stopped. That mixed run is not acceptance evidence. Final verification runs after the implementer returned, with no subsequent source edits.

Post-review focused backend16/16 and frontend Test-closure/render/transport3/3 passed. Final parent frontend suite133/133, zero failures/skips. Parent targeted backend lint/format, four changed-service syntax checks, journal78 and whitespace checks passed again.

**Final local acceptance,27 October2026:** backend full serialized suite **371/371**, zero failures/skips (410461ms); frontend full suite **133/133**, zero failures/skips. Both backend test URLs were explicitly postgres://postgres@127.0.0.1:55432/postgres and application DATABASE_URL was poisoned to localhost:1. The final backend run began only after all source patches returned and no source changed during it. The default discovery timing assertion passed with p95402ms against its2000ms shared budget; this does not satisfy the separate strict300ms gate. Final targeted frontend/backend configured ESLint/Prettier, four service syntax checks, journal78 and both source whitespace checks passed. The task-specific PostgreSQL cluster was stopped and its verified temporary directory deleted; generated task logs/control files were removed. No tests were skipped as acceptance evidence.

**Local, unpushed source commits:** backend `26a964282146641d9ff75edfb8f92c89e72fd5bb`; frontend `02c38a6ae4125e3312245beaf65d352eb6f3968c`. Both carry the Codex attribution trailer. Matching documentation is recorded in this checkpoint commit; see [HANDOFF](../../HANDOFF.md). There is no sprint-status.yaml to update.

Matrix audit (focused tests executed and passed; final full suite also runs these):

| Matrix row | Executed covering evidence |
| --- | --- |
| Default/override/reset | payout-modes.integration: global Auto, owner Auto override, latest NULL reset inherits later global changes; immutable history. |
| Authorization/stale/repeated | payout-modes.integration: owner/read-only refusal, valid-hash missing/false consent, unchanged settings/audit counts, competing confirmation and repeat refusal; payout-mode component handlers: read-only, edit/stale/lost-response recovery. |
| Before arrival | payout-modes.integration: Auto/Manual accounting parity before arrival; hotel-post-stay: future-only execution and ordered persisted dates. |
| Refunds/ownership/destination | hotel-post-stay: listing-blocked reserved-refund recheck, multi-capture holds in Live hotel/allocation readers, inactive-owner hold, superseded/current unverified/verified destinations, original/new owner summary/candidate isolation. |
| Current mode/history | hotel-post-stay: toggle invalidates old candidate preview; payout-modes.integration: unchanged old payout/run snapshots, pinned unattributed legacy payout status update, immutable terms and refusal of new unattributed payout. |
| Test/Live truth | hotel-post-stay: zero actual bank amount/funding, UTR-free Test closure leaves payout rows unchanged; payout-modes.integration: Live creation/UTR completion refuses without mutation; hotel-payouts component/transport tests show Test status and closure/error/pending behavior. |

Focused pure/service, disposable integration and component tests must cover every matrix row. Reuse hotel-post-stay, finance/security, early-departure and destination fixtures. Full backend (serialized to avoid the known shared-machine performance contention), frontend npm test, configured targeted ESLint/Prettier, node --check for changed services, db:check (78 files/entries), git diff --check. Verify no test skip as acceptance evidence.

## Open Gates

Migrations0076 and0077 are local; user must apply both before backend reads deploy, then read-only verify and release backend before frontend only with explicit authorization. Actual transfer adapter/claims/reconciliation is Story2.13, not delivered here. Provider eligibility, payout amount/tax/cost allocation, funding/exposure ceiling, recovery/accounting, hosted/real-provider acceptance and strict discovery performance remain open. Auto configured is not Auto money enabled.

No production build, browser/responsive/device/screen-reader, native consent/pending interaction, hosted/provider/bank acceptance or strict performance rerun is claimed. The previous strict300ms performance gate remains open; no discovery source/threshold was changed. No Neon access, hosted migration, provider operation or push occurred.
