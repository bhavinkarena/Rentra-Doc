# Rentra team handoff

Updated: 28 October 2026 (Asia/Kolkata), Story 2.13 local fixture slice complete.

## Start here

This migration centralizes existing documentation and BMad work. It does not complete the product work below. Read [workspace setup](README.md#workspace-setup), then choose the relevant continuation. Historical local checks do not establish current hosted acceptance.

## Source revisions at migration start

All three Git working trees were clean before migration. Documentation moves and routing edits in this session remain local and uncommitted until explicitly recorded otherwise.

| Repository | Full commit ID |
| --- | --- |
| Frontend `Rentra` | `6f2f72075c37457f24acc5d2628deec6e77f9563` |
| Backend `rentra-backend` | `c11b3109644be2e341e6a22f17c26fd7d89789b8` |
| `Rentra-Doc` before migration | `0228c1432a258c2bb4867c9485921b7a68f6d5a8` |

When this migration is committed, record the matching code/docs commit or PR links before handing it to a teammate. Local changes are not visible to others until published.

## Most recent BMad work

### Story 2.13 local fixture slice complete; real transfer delivery remains gated - 28 October 2026

Continued bmad-build under standing authorization. Clean starting revisions matched Story2.12: backend `26a964282146641d9ff75edfb8f92c89e72fd5bb`, frontend `02c38a6ae4125e3312245beaf65d352eb6f3968c`, docs `bc2ad81bb03183c190186155c74fc188e0c300f9`. Independent read-only analysis found no transfer adapter/beneficiary verification/durable claim and confirmed the existing real cap prevents a full guest refund after owner money has already been paid. That cap was not weakened.

**User decisions:** build the local payout lifecycle with provider fixtures and keep network transfers blocked; keep funded reserve, exposure limit, monitoring owner and stop-before-limit controls unset. INR40,000 remains a proposal. No actual provider/account or final net payable calculation was approved. This completes the approved fixture slice; actual Story2.13 transfer delivery and financial acceptance remain open.

**Delivered:** migration0078 adds an isolated hypothetical Test transfer ledger with one operation per verified Test rent allocation, immutable source/owner/destination/policy terms, scoped request-key replay, durable one-shot dispatch and exact fixture outcome evidence. SQL and service guards reject mutations outside actual disposable localhost rentra_test_* databases. Current Auto eligibility or fresh explicit Manual consent governs uninitiated claims; the claim pins its actual actor/mode/version snapshot. Fixture calls happen only after commit and shared lock release. Lost, failed, missing, mismatched and one-second timed-out callbacks remain unknown; retries only look up. Late success remains reconcilable despite later mode/owner/destination changes and never creates another transfer.

Fixture expected amount is remaining captured rent after refund reservations, explicitly not an approved net owner payable calculation. Real refunds/payouts/cash caps/totals/CSV are unchanged. No funded payout, real recovery debt or funding-authority record is created. Refunds after fixture dispatch remain intact and show simulated overlap exposure/funding authority unset. Existing owner/admin statement and allocation views display fixture state, source/destination version, expected amount and actual bank proceeds0. There is no public mutation endpoint, production worker, network-capable adapter or actual bank operation.

**Local, unpushed commits:**
- Backend: `12527f36ef8dcb3375b5c6c7aaf5aba62585c1d2`.
- Frontend: `17767b3d4d786ab0419cff82f4ecb3adfc255fab`.
- Matching docs are in this checkpoint commit. [Approved fixture spec, matrix evidence and complete review triage](_bmad-output/implementation-artifacts/spec-2-13-owner-payout-transfers.md).

**Verification:** final full backend **384/384**, frontend **135/135**, zero failures/skips. Backend used explicit disposable localhost PostgreSQL17 URLs, poisoned application DATABASE_URL and --test-concurrency=1. Focused matrix13/13 covers populated0077 upgrade/history, permissions/local connection/SQL guards, reserved-only inserts, unique/replayed/raced requests, Manual current-version consent, one-shot concurrent claims, actual authenticated revocation in both lock orders, committed claim and NOWAIT/try-lock release during both callbacks, bounded hanging create/lookup, every evidence field, late success, source isolation, real cap rejection and unchanged payout/totals/CSV. Actual component rendering2/2 verifies every fixture state/zero-bank/exposure label and owner/admin attachment. Targeted configured ESLint/Prettier, two changed-service syntax checks, journal79 and whitespace passed. All three independent review layers confirmed closure; no findings were deferred. PostgreSQL and task files were cleaned up. Neon was not used.

**Review correction worth preserving:** owner eligibility only needs FOR SHARE. FOR UPDATE would deadlock against a destination revocation holding its row while inserting an owner-notification FK. The actual reverse-overlap regression verifies revocation completes, the queued fixture is blocked and no provider create occurs. Trusted privileged local SQL maintenance is not a new dispatch authorization surface; supported mutations remain behind guarded services and network execution remains absent.

**Release order:**
1. The user applies migrations0076,0077 and0078 to Neon (last recorded at0075); do not apply them yourself.
2. Verify schema/journal read-only.
3. Push backend, then frontend, only with explicit release authorization. Statement/allocation/CSV reads with allocation records now need0078 even though hosted fixture writes are blocked.

No production build, browser/responsive/device/screen-reader, actual provider/bank/hosted or strict performance acceptance was run. Default discovery p95316ms passed its2000ms shared suite budget; the strict300ms gate remains open. Actual provider/account eligibility, beneficiary verification, payable tax/component allocation, funded refund path/exposure controls, recovery/accounting and existing legal/operational gates remain required before financial sign-off or enablement.

**Exact next action:** Story2.14 through bmad-build: Pause new bookings while retaining commitments. First inspect existing owner property pause/resume and scheduled-end handling, availability/admission guards and all verticals; preserve existing confirmed stays, payments, refunds and history. Keep the Story2.13 actual transfer/funding gates open, and migrations0076-0078 unreleased until user application. No repeated per-story approval or invented funding/provider readiness.

### Story 2.12 complete locally; migrations 0076/0077 and transfer execution gates open - 27 October 2026

Continued with bmad-build under standing authorization. Starting revisions matched the previous checkpoint: backend `2de5da728415345f8cb5a13a859b7ff683838d52`, frontend `a7d43d2c36d64e6fc150f568037f30af6c53d80b`, docs `abb429bb92c000347dbbcc07497ab4eed7585b55`. No new product decision was needed.

**Delivered:** append-only global Auto/Manual payout configuration, launch Auto, optional owner-wide override and explicit reset to current global inheritance. Finance admins review the current/proposed mode and reason, then confirm an actor/scope/version-bound hash with consent. Service authorization rejects owners/read-only writes; stale/raced/repeated confirmations cannot append duplicate changes. Owners see mode/source through existing financial readers and have no write path.

Shared booking/capture checks remove check-in/completion/Tuesday waits from new accounting eligibility. Hotel and allocation readers retain immutable booked-owner attribution, current active-owner/current verified destination checks, completed/reserved refunds and pinned payout capacity. Unsupported hotel multiple-capture work is held consistently. Test statements revalidate mode and reviewed candidates under ordered listing/order/booking/owner/destination/payment-order locks. Existing payout snapshots/dates/amounts/destinations stay unchanged; pre-0077 funded obligations without modern owner snapshots retain status transitions while new unattributed obligations refuse.

**Execution remains unavailable:** no Auto worker, provider adapter or pretend readiness flag was added. New Live hotel initiation and entered-UTR settlement now fail closed instead of allowing the old unverified bank-completion path. Authorized Test runs remain explicitly unfunded; the Test-only close action requires no UTR and changes no payout row. UI labels distinguish configuration, accounting eligibility, Test closure and recorded historical status. No bank settlement date is promised.

**Local, unpushed commits:**
- Backend: `26a964282146641d9ff75edfb8f92c89e72fd5bb`.
- Frontend: `02c38a6ae4125e3312245beaf65d352eb6f3968c`.
- Matching docs are in this checkpoint commit. [Spec, API contract, matrix audit and complete review triage](_bmad-output/implementation-artifacts/spec-2-12-payout-mode-and-eligibility.md).

**Final verification:** backend **371/371**, frontend **133/133**, zero failures/skips. Backend used explicit disposable localhost PostgreSQL17 URLs, poisoned application DATABASE_URL and `--test-concurrency=1`. Checks cover populated0076-to0077 preservation, older multi-file transactional upgrades, default/override/reset, owner/read-only denial, valid-hash missing/false consent with unchanged audits, competing/repeated/stale confirmation, Auto/Manual before-arrival parity, blocked reserved-refund recheck, unsupported cancellations/multiple captures, owner transfer isolation, inactive owner, destination supersession, pinned legacy status updates, future-only ordered statement periods, Live refusal and UTR-free unfunded Test closure. Real component/transport tests cover settings and Test closure labels/recovery/pending behavior. Targeted configured ESLint/Prettier, four service syntax checks, journal78 and whitespace checks passed. All three independent review layers confirmed closure; no findings were deferred. Disposable PostgreSQL and generated task files were cleaned up; Neon was not used.

**Intermediate failures are not acceptance:** the first full run366/369 exposed the new no_show enum comparison in older all-in-one migration transactions. Text comparisons fixed it and the actual upgrade checks passed. A second run overlapped review edits and was stopped after a temporary SQL helper parameter/column collision left a failed setup connection open. The corrected helper uses capture_environment. The final full run above started after all source edits and passed. Default discovery p95402ms passed its2000ms shared test budget; the separate strict300ms gate remains open from Story2.11, with no threshold/source change or new strict performance acceptance.

**Release order:**
1. The user applies migrations0076 and0077 to Neon (last recorded at0075). Do not apply them yourself.
2. Verify schema/journal read-only.
3. Push backend, then frontend, only with explicit release authorization. Existing financial/earnings readers now require0077 functions/settings; deploying before migration breaks those reads.

No production build, browser/responsive/device/screen-reader/native consent interaction, actual provider/bank or hosted acceptance was run. Provider transfer eligibility, final payable tax/cost allocation, funding/exposure ceiling, recovery/accounting, refund limits/timing, outdated published8% policy, discovery cancellation filter and dispute-cap gates remain open. Local completion is not Live approval.

**Exact next action:** Story2.13 through bmad-build. First inspect actual provider transfer/claim/reconciliation gaps and the existing refund durable-claim pattern, current mode resolver, shared eligibility/source/capacity/destination guards and Test statement boundary. Implement only supported coordinated reservation/dispatch outside locks and verified outcome reconciliation; obtain genuinely new provider/funding/accounting decisions in one batch when needed. Preserve visible uncertainty, stable identity, Test bank proceeds0, existing obligations, no automatic owner-bank debit or future payout offset. Keep migrations0076/0077 unreleased until the user applies them; no repeated per-story approval and no invented funding/provider readiness.

### Story 2.11 complete locally; migration 0076 and performance gate open - 26 October 2026

Continued with bmad-build under standing authorization. Starting revisions matched Story 2.10: backend `9a7501d991604c45e775e69c5c4b5054c3183872`, frontend `3621f649a5da66d19d5077502a3bdf74c7916a23`, docs `95a252875f3d85953cbd0401817c5284af408b21`. All working trees were clean before this story.

**Delivered:** an explicit early-departure operation on the existing guest preview/confirm flow. Each selected room uses its booked early-departure policy and original nightly rent/extras, tax and fee allocation. Only starts strictly later than the confirmed request are unused; equality/current nights are consumed. No offer/0% can end occupancy with explicit consent but creates no refund. The original dates, prices, policy, used-stay history and retained rooms remain unchanged.

Migration `0076_early_departure.sql` adds nullable departure/effective inventory-end metadata without a historical backfill. Its trigger keeps consumed stock sold, releases only unused future nights, and prevents repeated release or marker changes. The command reuses refund capacity, ambiguity refusal, atomic obligations and idempotency; ordinary cancellation payloads/replays remain compatible. It records a separate owner update, never fictitious inspection evidence. Caretaker views show authorized active room/guest facts and preserve Past visibility; analytics separates occupied nights from existing gross booked charges before tax/refunds. Historical Test payout snapshots remain unchanged after a later departure refund; recovery/accounting remains Story 2.17.

**Local, unpushed commits:**
- Backend: `2de5da728415345f8cb5a13a859b7ff683838d52`.
- Frontend: `a7d43d2c36d64e6fc150f568037f30af6c53d80b`.
- Matching docs are in this checkpoint commit. [Full spec, evidence and triage](_bmad-output/implementation-artifacts/spec-2-11-unused-night-early-departure.md).

**Verification:** final full backend **367/367**, no failures/skips, with explicit local test URLs and `--test-concurrency=1`; frontend **127/127**, no failures/skips. The final departure integration passed **16/16** and real staff-page rendering **2/2**. Tests include populated 0075-to0076 preservation, strict nightly equality, blocked-lock clock freshness, schedule mismatch, mixed/zero offers, all-night stock, retained snapshots, staff permissions/Past, financial consumers, stale/replay/races, unknown/provider-failed refunds and an earlier Test payout. Configured targeted ESLint/Prettier, 10 service syntax checks, 77-file journal and whitespace checks passed. Three independent reviewers confirmed closure; existing recovery/accounting and performance work were explicitly deferred. Task-specific PostgreSQL, baseline worktree/junction and generated logs were cleaned up. Neon was not used.

**Performance evidence, not a pass:** the default parallel backend run failed the discovery timing assertion (p95 2595 ms versus its 2000 ms shared budget; the subtest and parent account for 2 failures). Isolated `PERF_GATES=1` measured 330 ms against 300 ms. The unchanged Story 2.10 baseline also failed, at 521 ms. The serialized default-limit run passed with 393 ms p95. Discovery source/thresholds were not changed; these samples do not establish root cause or performance acceptance. Keep the strict 300 ms gate open on representative hardware.

**Release order:**
1. The user applies migration 0076 to Neon (last recorded at 0075). Do not run it against Neon yourself.
2. Verify schema/journal read-only.
3. Push backend, then frontend, only with explicit release authorization. Backend reads new columns on existing record/analytics paths, so pushing before migration breaks those paths.

No production build, browser/responsive/device/screen-reader, actual provider or hosted acceptance was run. Provider refund limits/timing, GST/unused-night accounting, gateway costs, funding/recovery, outdated published 8% policy, discovery filter and dispute-cap gates remain open. Local completion is not Live approval.

**Exact next action:** Story 2.12 through bmad-build. Investigate existing payout modes, finance/hotel-payouts.js, funding/destination guards, worker claims and admin controls before editing. Required target: global Auto and authorized owner override, verified capture+confirmation eligibility without check-in/Tuesday wait, current-mode checks for uninitiated work, no owner-controlled mode and no duplication/cancellation of initiated or uncertain transfers. Keep provider eligibility/funding gates explicit and migration 0076 unreleased until the user applies it. No repeated per-story approval.

### Story 2.10 complete locally; Story 2.11 next - 26 October 2026

Continued with bmad-build and the existing standing authorization. Recovered the docs checkpoint by fetching and fast-forwarding from `9c2ff58bc9d1e5f88355074dd1cbc62af1f5861b` to `fd429dd19f29f2b7dd88bfa1957d23ad4ad193fc`; the frontend/backend HEADs matched its Story2.9/2.8 commits before changes. The README's `python -m uv` fallback works on this machine.

The existing selected-room flow was reused. Fixed capture-capacity allocation, selected-only booked-policy evaluation, a check-in transition guard, legacy fee scope, specific refusal messages and hotel policy/receipt presentation. Retained room snapshots and inventory remain unchanged. No migration or dependency was added.

**User decisions:**
- Historical refunds without room attribution require admin resolution before room cancellation; do not guess or redistribute them. The guard also prevents bypass through cancellation of the whole remaining stay.
- Apply booked positive at/after-check-in percentages consistently for selected rooms and whole hotel stays. Preserve the recorded Story2.6 at/after0% and legacy support-only restrictions.

**Evidence:** backend **348/348**, frontend **120/120**, zero failures/skips. Tests used a new disposable localhost PostgreSQL17 cluster with both test URLs explicit and an unusable application URL; Neon was not used. Focused money/room tests cover mixed policies, unchanged retained snapshots, all affected nights, prior/ambiguous/failed refunds, multi-capture capacity, ownership/foreign scope, stale/replay/overlap/distinct-room races, zero money and deterministic check-in-crossing rollback. Component tests cover policy/amount labels, unique room identity, consent/reset, lost-response identical retry, legacy rules and last-room receipts.

Targeted configured ESLint/Prettier, service syntax checks, whitespace checks and the 76-file migration journal check passed. Backend service files remain excluded by their existing lint/format configuration. Three independent review layers completed; all actionable findings fixed and reviewers confirmed closure. One mixed legacy/window finding was dismissed under the accepted atomic-snapshot invariant; none deferred.

**Local, unpushed commits:**
- Backend: `9a7501d991604c45e775e69c5c4b5054c3183872`.
- Frontend: `3621f649a5da66d19d5077502a3bdf74c7916a23`.
- Matching docs are recorded in this checkpoint commit. [Spec, tests and triage](_bmad-output/implementation-artifacts/spec-2-10-selected-room-cancellation.md).

**Not checked:** browser/responsive/device/screen-reader acceptance, production builds, hosted acceptance or real providers. No push, hosted migration, bank/provider operation or deployment. Existing provider refund limits/timing, GST/accounting, gateway costs, outdated 8% publication, discovery cancellation filter and dispute-cap gates remain open. This is local engineering completion, not Live readiness.

**Exact next action:** Story 2.11 through bmad-build. Read its ACs and run the read-only gap analysis on `domain/cancellation-policy.js`, `booking/hotel-stays.js`, `booking/cancellation.js`, booked night allocations and room inventory triggers. Only early-departure configuration/editor exists; no execution command was found. Preserve strictly later nightly starts as unused, original allocations, explicit confirmation and no automatic entitlement at zero refund. Continue with the smallest supported command/state contract and independent financial review. Do not repeat per-story approval.

### Story 2.9 complete; provider evidence gate open - 26 October 2026

Refund dispatch and reconciliation already existed (`payments/refunds.js`, CP20). It already provides:
- a durable dispatch claim persisted before the network call, outside domain locks;
- after the claim it is lookup-only and never posts again;
- a lost response becomes `unknown` and is looked up;
- a provider failure keeps the reservation and is never resent;
- completion only after a verified, scoped provider record, with duplicate callbacks counted once.

The proof is `refund-operations.integration.test.js` (CP20).

Added in frontend `3865893` (pushed): the guest booking record states that a refund is complete only when the provider confirms it, and that bank timing is not promised.

**Not done (evidence gate, PRD OQ-1 and spine line 203):** provider-specific old-payment refund limits and timing estimates. No provider limit or estimate was invented. These need account-specific evidence and signed hosted Test acceptance before Live.

**Exact next action:** Story 2.10.

### Story 2.8 complete and pushed - 26 October 2026

The confirm-and-reserve contract already existed (CP12/Phase 10):
- an explicit `accepted` flag plus the current preview hash;
- an atomic cancellation with a single refund intent, with no admin approval;
- idempotent replay, `IDEMPOTENCY_CONFLICT` on a changed payload, `CANCELLATION_CHANGED` on a stale preview;
- in the UI, a refused commit clears the preview and a lost response retries the same key.

Added evidence in backend `1082e2f` (pushed, tests only):
- a stale hash changes nothing;
- a different payload conflicts;
- one refund intent matches the preview and stays distinct from completion;
- a 0% cancellation cancels without creating any refund row.

Backend 340 of 340. Story 2.7 is backend `0e1972c`.

**Exact next action:** Story 2.9 (dispatch refunds and reconcile verified outcomes).

### Story 2.7 complete and pushed - 26 October 2026

Refunds under booked windows now apply the policy percentage to everything paid: rent and fee, and for hotel rooms the room, tax and the room's fee share. The amount is rounded down once and split by stable largest remainder, and the preview binds the customer, rooms and policy versions. Backend `0e1972c6d9f10ea72191f9d7285f004d908b2962`, pushed, no migration. Backend 340 of 340. [spec](_bmad-output/implementation-artifacts/spec-2-7-refund-preview-basis.md)

**Exact next action:** Story 2.8 (confirm cancellation and reserve the eligible refund).

### Story 2.6 complete locally; migration 0075 blocks the push - 26 October 2026

Owner percentage cancellation windows, decided by the user: hours, up to 6 windows; presets only fill the windows; one at-or-after-check-in percentage; optional early departure. Hotels get a default that each rate can override, and existing tiers and plans are migrated. [spec](_bmad-output/implementation-artifacts/spec-2-6-cancellation-windows.md)

Commits: backend `9c8f2c9860a9002215680580decaefb6b0d28683`, frontend `01b718f38d36b3f8588d1e7f1fa713b1450ac04a`. **Released 26 October:** the user applied 0075. A read-only check showed 76 migrations, both columns present, and every rentable with an object policy. Both repositories were pushed. Checks: backend 338 of 338, frontend 115 of 115.

**Release order:**
1. The user runs `npm run db:migrate` (Neon is at 0074; this applies 0075 only).
2. Push the backend.
3. Push the frontend.

**Exact next action:** after the release, Story 2.7 (preview exact booked-policy refunds on the full paid basis).

### Stories 2.1-2.5 complete; migration 0074 blocks the push - 26 October 2026

- **Story 2.1 (pushed):**
  - A new `approved` outcome (migration 0073, on Neon) and automatic publication once the owner identity is approved and sellable dates exist.
  - A scheduled visit holds publication; approval alone never sets `verified_at`.
  - [spec](_bmad-output/implementation-artifacts/spec-2-1-automatic-publication.md)
- **Stories 2.2-2.5 (local):**
  - One guest-paid 5% Rentra service fee: owner overrides, append-only audited settings, rounded once per order, hotels moved to the guest fee, and commission retired for new stays.
  - Return to the customer page after login.
  - New hold and payment evidence tests.
  - [spec](_bmad-output/implementation-artifacts/spec-2-2-to-2-5-fee-quote-hold-payment.md)

Commits: backend `880e8bb64cc212559bff895e5c089038b54de0d8`, frontend `e4c5f46d702699ed13052245a20f1bf37cfa8b74`. **Released 26 October:** the user applied 0074 (a read-only check showed 75 migrations and the global 5% row) and both repositories were pushed. The policy text still needs a new version. Checks: backend 334 of 334, frontend 115 of 115.

**Release order:**
1. The user runs `npm run db:migrate` in `rentra-backend`. Neon is at 0073, so this applies 0074 only. The fee becomes 5% for new quotes from that moment.
2. Push the backend.
3. Push the frontend.
4. Publish a new policy version replacing the 8% wording.

**Open gates:** GST on the fee, gateway costs and accounting.

**Exact next action:** after the release, continue with Story 2.6 through `bmad-build`.

### Stories 1.5-1.8 complete; migration 0072 blocks the backend push - 26 October 2026

The user asked to finish Epic 1 through Story 1.8.

- **Story 1.5 (pushed):** the owner property detail leaked the reviewer's email and id. It was fixed in the shared `getListingForEdit` query and the controller, with an acceptance test. [spec](_bmad-output/implementation-artifacts/spec-1-5-property-correction-requests.md)
- **Stories 1.6/1.7:** reviewer alerts. The user chose the recipients (assigned reviewer, else all property reviewers) and approved building migration `0072_admin_alert` with tracked email.
  - A resubmission alert names the submission.
  - Correction milestones fire at day 7, 15 and 30 from the decision instant, once each, catching up after missed ticks, with no automatic rejection.
  - Delivery failures are visible in the admin queue inbox.
  - Owners now see refused or failed resubmissions.
  - [spec](_bmad-output/implementation-artifacts/spec-1-6-1-7-resubmission-and-correction-alerts.md)
- **Story 1.8:** direct rejection already existed; the decision audit now records the `from` status too. [spec](_bmad-output/implementation-artifacts/spec-1-8-reject-with-reason.md)

Commits: backend `c0f4a932eea85b2e480bff0a8981dcfbe84bfa94` (**local, unpushed**), frontend `4973c19b79815bacb97f182549bebce759a84d1f` (pushed; it tolerates the missing backend route).

Checks: backend 330 of 330 with no skips; frontend 115 of 115; browser gates `reviewer-alerts` 3, `owner-wizard` 14, `owner-draft-recovery` 5, `admin-revision-evidence` 6.

**Release order:**
1. The user runs `npm run db:migrate` in `rentra-backend`. Neon is at 0071, so this applies 0072 only. The Claude permission classifier blocks this command.
2. Verify the table, then push the backend.
3. Reviewer emails also need `OWNER_NOTIFICATION_DELIVERY=enabled` and the Resend settings on Render; until then alerts show "Email not configured".

**Released 26 October:** the user applied 0072 (a read-only check showed 73 migrations and the `admin_alert` table) and the backend was pushed. Epic 1 Stories 1.1-1.8 are delivered. Hosted acceptance and reviewer email configuration are still unchecked.

**Exact next action:** Continue with Epic 2 Story 2.1 through `bmad-build`.

### Story 1.4 complete and pushed - 26 October 2026

Story 1.4 (selective physical verification). The existing CP07 verification code already covered most of the acceptance criteria; two gaps were fixed:
- A physical visit now needs a recorded reason and scope.
- A failed visit sends the owner a separate message, so internal findings are never shown to them.

No migration. Neon had 0 legacy rows leaking findings (read-only check). Backend `089346c049f452841dcff789947a5712ad1d835c`, frontend `125b3dc064598993cb5769780c85587786586472`, both pushed.

Checks: backend 327 of 327 with no skips; frontend 115 of 115; `cp07_gate.py` 52 of 53. The one failure is pre-existing copy drift: "Guests can see it but cannot book yet" now appears only in the wizard `SubmitBar`. The gate needs a refresh. Details: [spec](_bmad-output/implementation-artifacts/spec-1-4-selective-physical-verification.md).

**Exact next action:** Story 1.5 (send specific property correction requests) from [epics.md](_bmad-output/planning-artifacts/epics.md) through `bmad-build`. Story 1.3's video flag remains off pending the real Cloudinary demonstration.

### Story 1.3 complete locally; migration 0071 and release gate open - 26 October 2026

Story 1.3 (property video evidence) was built through `bmad-build`. On 26 October the user decided the open contract choices:
- MP4 and MOV only.
- 50 MB maximum.
- Server-signed direct upload to authenticated Cloudinary storage, with server-side metadata verification.
- Videos kept indefinitely; retention remains an open privacy gate.

What the story delivers:
- A reviewer request with explicit confirmation, bound to the current submission.
- An owner portal update and queued email.
- A private upload, then a separate explicit Send.
- Immutable submitted evidence.
- Audited reviewer playback through the API.
- No review, publication or booking side effects.

Details: [spec, triage and verification](_bmad-output/implementation-artifacts/spec-1-3-property-video-evidence.md).

Commits: backend `42d9c566514a0b6ba91a2acd10a169e54299b59d`, frontend `00dc3dc8e43dc5ab1b65b44056d9bc4ebdae1bd9`. **Released 26 October:** the user applied migration 0071 to Neon. A read-only check afterwards showed 72 applied migrations and the `property_evidence_request` table present. The frontend, backend and docs were then pushed. Hosted acceptance was not checked.

Checks:
- Backend: 327 passed, 0 failed, 0 skipped.
- Frontend: 115 passed.
- Browser gates: 4, 14, 5 and 6 passed on a disposable fixture.
- Independent review: one high and four medium findings fixed; the rest dismissed with reasons.

**Release order (blocking):**
1. Get approval to apply migration `0071_property_evidence_request.sql` to Neon. Neon was last recorded much earlier than 0070; check its applied state first.
2. Push and deploy the backend.
3. Push and deploy the frontend.
4. Show that a real Cloudinary account handles an authenticated video upload, a `resource` metadata read and signed playback.
5. Only then set `EVIDENCE_VIDEO_UPLOADS=true`.

Pushing the backend before step 1 breaks the admin property review detail, because `readPropertyReview` reads the new table.

**Remaining release gate:** steps 1–3 below are done. Still required: demonstrate a real Cloudinary authenticated video upload, metadata read and signed playback, then set `EVIDENCE_VIDEO_UPLOADS=true` on Render. Until then, video requests are refused as not enabled.

**Exact next action:** smoke-check the hosted admin property review detail after the Render deploy, then continue to Story 1.4 (arrange and record selective physical verification) from [epics.md](_bmad-output/planning-artifacts/epics.md) through `bmad-build`.

### Story 1.1 complete; Story 1.2 complete locally - 26 October 2026

Continued through `bmad-build` under the standing authorization below. Revisions at the start matched the previous entry: frontend `1b1058306573d714a3a9ef64fe33307786910b79` and backend `7612e4a8c46c66c16057d10412a86679ec859bbc`. Docs had already advanced to `bba903b7ae6d146c3931f932def8e6e3834b22fa`, which commits the previous checkpoint.

**Story 1.1 (private draft recovery) is complete locally.**
- Backend owner-onboarding and owner-wizard integration: 2 of 2 passed on a disposable local cluster.
- `owner-wizard.mjs`: 14 of 14 passed after updating two stale selectors.
- New `owner-draft-recovery.mjs`: 5 of 5 passed. It checks desktop resume, signed-out denial, other-owner not-found, the stale-tab conflict at 360px and the ended-session sign-in at 360px.
- A real defect was found and fixed: Load latest restored the stale tab's typing over the newer server save. Frontend `8a35a97d244a5199f9e779666731bd88296565e1`, backend `f67fc02627b9f9cababb569913310d446a3e63aa`.
- Details: [Story 1.1 progress](_bmad-output/implementation-artifacts/story-1-1-progress.md).

**Story 1.2 (inspect the evidence for a submitted revision) is complete locally.**
- The review detail now shows separate owner identity, property review and bookability facts.
- Document status is labelled as recorded at submission, and evidence links have descriptive names and visible focus.
- Each visit is tied to its pass, and the page states when the viewed pass has no completed site visit.
- An unavailable document explains that it was not reviewed.
- The backend adds `application_status` to the read, with denial and no-mutation integration checks. There is no migration and no command change.
- Results: backend 326 of 326 passed with no skips; frontend 115 of 115 passed; new `admin-revision-evidence.mjs` 6 of 6 passed at 360 and 1280px.
- Frontend `7bee16f44d7100c770166b880c34621467fec6b7`, backend `6ea66b7c63a573fd0e32b4ccba0b68793df327ba`.
- Details: [spec, triage and verification](_bmad-output/implementation-artifacts/spec-1-2-inspect-submitted-revision-evidence.md).

**Not verified:** a successful private-file stream (the fixture file is not in Cloudinary, so only the 502 path ran), real devices, a screen reader and production builds.

**Deferred:** accepting or rejecting a document bumps `content_version` and makes the submitted revision appear stale; this belongs to the review-command slice. The file route does not check that a document belongs to the property being viewed (existing capability model). The Load latest refusal has no in-page route to the newer version when storage removal fails.

**How to run the checks:**
1. Run `initdb -U postgres --auth=trust` on port 55432.
2. Run backend tests with `PORTAL_TEST_DATABASE_URL` and `CP01_TEST_DATABASE_URL` pointing at that cluster and `DATABASE_URL=postgres://nobody@127.0.0.1:1/never`.
3. For browser gates, start `serve-owner-wizard.mjs` with `OWNER_WIZARD_FIXTURE=<temp json>`, then start Next fixture mode on 3143.
4. Run `owner-wizard.mjs`, then `owner-draft-recovery.mjs` and `admin-revision-evidence.mjs`. The last one also needs `POSTGRES_MODULE=<rentra-backend>/node_modules/postgres`. Set `CHROME` on macOS.

The fixture JSON contains live fixture sessions; keep it outside the repositories and delete it afterwards.

On 26 October, the code commits were pushed to `Rentra` `main` and `rentra-backend` `master` and this documentation was committed and pushed, at the user's instruction. Those branches may auto-deploy through Vercel/Render; hosted acceptance was not checked. No hosted database, migration, provider or deployment action occurred.

**Exact next action:** start Story 1.3 (request and securely receive additional property video evidence) from [epics.md](_bmad-output/planning-artifacts/epics.md) through `bmad-build`. Read the Story 1.2 spec's Deferred list first. Story 1.3 likely adds an owner evidence-request flow and may need a migration; any migration must stay local until explicitly approved for Neon.

### Backlog complete; Story1.1 implementation started - 26 October 2026

**Standing authorization:** the user explicitly said the decisions were already discussed/approved and instructed creating stories quickly and starting implementation. This supersedes repetitive per-story and planning approval checkpoints for the established scope. Continue autonomously within those decisions; ask only about genuine new user-visible choices, external evidence or blockers. Do not restart discovery or require C after every story.

The finalized [epics.md](_bmad-output/planning-artifacts/epics.md) now contains **51 stories**: Epic1 eight, Epic2 twenty-one, Epic3 twelve, Epic4 six, Epic5 four. Original approved Stories1.1-1.3 are preserved; all24FR and42UX requirements are covered with NFR/architecture inheritance, three or more Given/When/Then cases each, backward-only dependencies and no template placeholders. [Backlog validation](_bmad-output/planning-artifacts/backlog-validation.md) records planning checks. Each story still needs its own investigated build spec; financial/category/external release gates remain open, not universally ready for Live use. Final PRD/UX/architecture and the [13-capability spec](_bmad-output/specs/spec-Rentra/SPEC.md) remain binding.

Started implementation through bmad-build, selecting Story1.1. Read-only investigation confirmed existing backend pending-owner draft/ownership/version guards. Delivered a small reviewed frontend fix: optional browser storage cannot abort autosave or mislabel server success; HTTP401/CLIENT_REQUIRED now exposes sign-in recovery; failed discard no longer reloads the same recovery text. Eight focused component-effect tests pass. Full frontend suite **113passed/0failed/0skipped**; targeted ESLint, Prettier and Git whitespace pass. Configured independent review completed and its three findings were fixed, with bounded reviewer closure. [Build spec/triage](_bmad-output/implementation-artifacts/spec-1-1-private-draft-recovery.md), [story progress](_bmad-output/implementation-artifacts/story-1-1-progress.md).

Frontend advanced to local commit `1b1058306573d714a3a9ef64fe33307786910b79` from `726c966ec463daebc6a6399a6aadd7109b06a2de`. Backend remains `7612e4a8c46c66c16057d10412a86679ec859bbc`, unchanged. Docs starting revision `87b70f709ac0c1974106bc343fe8a4f4a179c3e3`; current planning/progress edits remain local/uncommitted. Code commit is local/unpushed. No production migration, provider/bank action or deployment occurred.

**Exact next action:** finish Story1.1's existing disposable-DB owner-onboarding/wizard integration and authenticated running-app phone/desktop recovery/access checks, inspecting fixture setup before any write test. Do not run fixtures against a shared/live database. Then prepare/implement Story1.2 from the approved backlog, without repetitive approval. The bounded recovery patch is complete; the broader Story1.1 remains in progress until its remaining acceptance evidence is recorded. No real-browser/device/screen-reader/backend integration or production-build pass is claimed for this patch.

Preserve external funding/exposure/provider/account/specialist/receipt/staffing and category/runtime/device gates. Share matching documentation/code commits before teammates rely on this checkpoint. This current entry supersedes older planning continuation text below.


### Architecture finalized - 26 October 2026

The user selected architecture continuation, **developer contract only**, **API contracts in existing repositories**, and the **full recommended review**. The [architecture spine](_bmad-output/planning-artifacts/architecture/architecture-Rentra-2026-10-26/ARCHITECTURE-SPINE.md) is final for downstream planning. It retains the existing layered backend, Next frontend and separate worker. Backend owns authoritative business rules; no shared package, service split, stack upgrade or infrastructure replacement was introduced.

Current source revisions: frontend `726c966ec463daebc6a6399a6aadd7109b06a2de`, backend `7612e4a8c46c66c16057d10412a86679ec859bbc`, docs starting revision `87b70f709ac0c1974106bc343fe8a4f4a179c3e3`. Frontend/backend working trees remain clean. These match the final UX checkpoint. [Source evidence](_bmad-output/planning-artifacts/architecture/architecture-Rentra-2026-10-26/source-evidence.md) records current hotel zero-fee and check-in/Tuesday payout conflicts, which remain implementation work.

Completed: [five-input reconciliation](_bmad-output/planning-artifacts/architecture/architecture-Rentra-2026-10-26/reconcile-inputs.md), fifteen invariant decisions, capability map and explicit release gates. The selected rubric, technology/current-code, adversarial divergence and security/financial-integrity reviews completed. Four distinct gate findings were resolved; the two affected reviewers confirmed their own findings closed through bounded checks. [Validation](_bmad-output/planning-artifacts/architecture/architecture-Rentra-2026-10-26/validation-report.md) links all reports. Architecture lint passes with zero findings; local references and Git whitespace pass. Diagrams were inspected as text, not rendered.

**Exact next action:** use `bmad-spec` if adopting this spine as a concise implementation-spec companion, preserving AD IDs, then `bmad-create-epics-and-stories` to turn the finalized PRD/UX/architecture into feature work. Before dependent frontend/backend implementation, publish the feature API/state/schema contract and coherent owner/listing/order locking design required by the spine. Reuse existing functionality and approved mockups; do not restart UX discovery. Funding/exposure, actual provider and hosted evidence, specialist accounting/legal, receipt evidence, staffing and runtime/device/load gates remain unresolved and block affected financial architecture sign-off/release. Final document status is not live-readiness approval.

Read the architecture [.memlog.md](_bmad-output/planning-artifacts/architecture/architecture-Rentra-2026-10-26/.memlog.md) to resume. No application build/runtime/provider/bank operation, migration, deployment, commit or push occurred. Documentation remains local and uncommitted; share its commit before a teammate relies on this checkpoint. This architecture continuation supersedes the historical next-action text in the completed UX section below.

### UX continuation — 26 October 2026

UX planning is finalized through `bmad-ux` as of 26 October. DESIGN.md and EXPERIENCE.md are final contracts; all shown mockups and remaining written-only coverage are approved. The selected rubric, accessibility/responsive and money/status reviews completed, findings were resolved, source inputs reconciled and configured structure/prose polish applied. The founder approved the refund-decision direction on 26 October; its HTML/notes are promoted to `mockups/`. Guest checkout and payment/refund tracking directions were approved on 26 October and promoted to `mockups/`. Admin verification/support directions were approved on 26 October and promoted to the shared mockup references. Continued the existing migrated candidates; hotel room-selection and owner Rooms/Rates approvals remain intact. Canonical work is in this repository, not the parent workspace's retained compatibility folders.

Current source revisions inspected: frontend `726c966ec463daebc6a6399a6aadd7109b06a2de`, backend `7612e4a8c46c66c16057d10412a86679ec859bbc`, docs starting revision `87b70f709ac0c1974106bc343fe8a4f4a179c3e3`. These supersede migration-start revisions for this continuation. Frontend/backend latest commits relocate documentation; relevant current review/support components were re-read. Historical migration checks above/below are not new application acceptance.

Completed locally: refined the existing [verification candidate](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/key-admin-verification.html) and [support candidate](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/key-admin-support.html), corrected internal-note mode so it cannot present status-changing controls, and linked scope/check evidence from both draft spines. All command buttons remain disabled; no decision, message, payment or application change occurred.

Fresh Edge/Playwright checks: both candidates at 320/390/768/1440px passed overflow, images/font, labels/field sizing, disclosures, native editing, focus, internal/public audience separation and mobile keyboard navigation. Desktop/phone screenshots inspected. See [admin mockup notes and exact continuation](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/admin-workflow-notes.md). Running-app, backend authorization, screen-reader/real-device/provider checks and optional multi-lens UX review were not run.

Fresh guest-flow continuation on 26 October: created [checkout](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/key-guest-checkout.html) and [booking/payment/refund status](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/key-guest-booking-status.html). Full-trip pricing, existing lead-guest/arrival/invoice fields, terms acceptance and four static Test status scenarios are documented in [guest scope/check notes](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/guest-checkout-notes.md). Fresh Edge checks passed both pages at320/390/768/1440, all four scenarios at every width, labels/field sizing, native validation/disclosures/keyboard, local navigation and disabled financial commands. Screenshots inspected. No application, provider or bank operation ran.

Financial-exception continuation on 26 October: built the [admin refund-decision candidate](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/key-admin-refund-decision.html) and [fixture/check notes](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/refund-decision-notes.md). It compares the same additional INR5,000 guest refund under proportional and owner-funded responsibility, including INR250 historical reassignment and projected recovery after the explicitly assumed prior INR2,000 collection. This is an allocation-only historical example, not a launch-rate quote. Both snapshots passed fresh Edge checks at320/390/768/1440, displayed-amount/math assertions, labels/field sizing, keyboard/native disclosures, reason editing and disabled-command checks; screenshots inspected. Existing source revisions recorded above are unchanged. No application or financial operation occurred.

**Exact next action:** hand the finalized [DESIGN.md](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/DESIGN.md) and [EXPERIENCE.md](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/EXPERIENCE.md), approved `mockups/`, [validation report](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/validation-report.md), [input reconciliation](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/reconcile-inputs.md) and [finalization checks](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/finalization-checks.md) to architecture/story planning. Recommend bmad-architecture followed by bmad-create-epics-and-stories. Do not reopen approved UX decisions or mark implementation/release gates passed. Application work has not started in this UX session. A separate user instruction is needed to select the next implementation/planning task or publish the local documentation changes.

This continuation's edits and new screenshots are local and uncommitted. No commit/push or remote publication was requested or performed; teammates need the documentation changes shared before relying on this new checkpoint. Browser session/cache files are ignored; saved mockups, callback and evidence remain shareable.

The launch PRD and the two UX spines are final. The earlier product brief retains its recorded status. Final UX contracts define approved target behavior and visual direction; they do not certify delivery or live readiness.

Read the [UX decision log](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.memlog.md) before resuming. It records approval of hotel room-selection and owner Rooms/Rates visual directions. These are design approvals, not production implementation or approval of illustrative commercial terms.

**Latest recorded next work:** choose architecture/story planning using the finalized UX contracts. All selected validation findings are resolved: one medium and three low reviewer findings plus one facilitator urgency supplement. Source reconciliation also made approved timing constraints explicit. Final mechanical checks cover 47 colors, 38 token paths, 12 matched compositions, 20 IA surfaces, four exact source journeys, FR1-24 and 15 promoted screen/note files. Focused browser confirmation passed the changed label, urgent-support default, internal-note isolation and disabled-command checks at320/390/768/1440. The report renders without phone overflow. No app build, real device/screen reader, provider/bank or deployment test is claimed.

Continue this workspace with `bmad-ux`; use `bmad-help` if uncertain about the next planning phase. This migration does not assert new architecture or sprint completion.

For saved mockup checks, follow [the mockup runner setup](README.md#resume-ux-mockup-checks): serve the UX `.working` directory at `127.0.0.1:8766` from the docs root. `check-admin-mocks.js`, `check-owner-mocks.js` and `check-room-mocks.js` are Playwright `async page` callbacks, not standalone Node programs. An existing Playwright-capable driver must supply the browser page and run with `Rentra-Doc` as cwd so screenshot output reaches the saved `.working/evidence/` directory.

## Implementation tracks and open gates

These summarize recorded documents, not a fresh code or deployment audit.

| Track | Recorded position | Continue from |
| --- | --- | --- |
| Customer | Parts 01–19 recorded complete; Part 20 in progress. Commercial decisions and actual hosted Test capture/refund/signed webhook evidence remain open before live enablement. | [Sessions](frontend/docs/rentra-customer-sessions.md), [Part 20](frontend/docs/rentra-customer-part20.md), [provider acceptance](frontend/docs/rentra-customer-part19-provider-acceptance.md) |
| Client/admin | CP01–CP31 recorded complete; CP32 pending live prerequisites. CP30 hosted CA24 acceptance was explicitly waived/unexecuted, not passed. | [Sessions](frontend/docs/rentra-client-admin-sessions.md), [plan](frontend/docs/rentra-client-admin-plan.md) |
| Owner experience | Phases 10–12/14 retain follow-up QA, device/performance, design-system merge and coverage gaps. | [Owner plan](frontend/docs/OWNER-EXPERIENCE-PLAN.md) |
| Admin experience | Twelve phases recorded locally verified; this does not establish deployment. | [Admin plan](frontend/docs/ADMIN-EXPERIENCE-PLAN.md) |
| Hotels | Progress table records phases 1–9 engineering locally complete and phase 10 sprint 1 complete. Discovery, owner/operations approvals and hosted migration/launch evidence remain open. The headline is older than the detailed table. | [Hotel plan](frontend/docs/HOTEL-PLAN.md), [runbooks](frontend/docs/HOTEL-RUNBOOKS.md) |

The final PRD adds later launch decisions. Reconcile those with existing implementation when picking a task; older entertainment/payment plans may describe an earlier direction. Do not apply migrations or enable payments because an old runbook reports local success.

## Checks run in this migration session

- `npm test` in `Rentra`: 105 passed, zero failures or skips.
- `npm run db:check` in `rentra-backend`: 71 migration files and journal entries verified without database access.
- `uv` 0.13.5 installed; `python -m uv --version` works. Use this form if pip's Scripts directory is not on PATH.

- Migration snapshot verifier: 667 transferred files and 1,730 relocated targets passed. The inventory separately records 580 reference occurrences already missing before migration; these are historical evidence gaps, not newly broken relocations.
- `python scripts/test_verify_migration.py`: nine regression tests passed, including missing Markdown/HTML/CSS targets, permitted historical gaps, changed content, LF/CRLF equivalence and environment-file handling.
- Original hashes for 154 moved frontend/backend documents matched their migration-start Git revisions (allowing checkout line endings). The 445 unchanged installed BMad runtime/skill files matched the retained installation; the team routing override changed deliberately. All three hidden BMad decision logs retained their content.
- A clean-room export containing only Git-shareable candidates from the three repositories, with migrated text converted to LF, passed verification, all nine regression tests, configuration resolution and representative `bmad-build` rendering. Private environment files, personal overrides, browser profiles and original cached workflows were absent.
- The relocated frontend foundation-check reader resolves the canonical design document and preserves its palette. Its historical hardcoded expectation is 36 extracted tokens; both original and migrated design files yield 47. This pre-existing gate mismatch needs follow-up; the browser foundation gate was not run or reported passed.

No full application build, live database audit, provider transaction or deployment was performed in this migration session. Fragment anchors, external URLs and fresh browser behavior are outside the migration verifier's checks. Review fixes and regression-check results are recorded in the [migration spec](_bmad-output/implementation-artifacts/spec-shared-documentation-handoff.md).

## Leave the next handoff

Record the date, task and owner, full code revisions or PRs, changes, check results, unverified behavior, blockers and the exact next action. Update the detailed plan/runbook too; this index points to evidence rather than replacing it.
