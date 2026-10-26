# Rentra team handoff

Updated: 26 October 2026 (Asia/Kolkata), Stories 1.1-2.6 session.

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
