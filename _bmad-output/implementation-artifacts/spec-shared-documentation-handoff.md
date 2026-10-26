ï»¿---
title: 'Shared Rentra documentation and BMad handoff'
type: 'chore'
created: '2026-10-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: NO_VCS
context: []
---

<frozen-after-approval reason="User approved the proposed shared repository structure and instructed us to do the migration properly">

## Intent

Rentra's delivery history lives in the frontend repository, backend documents live separately, and BMad planning and installed workflows live in an unversioned parent workspace. Make Rentra-Doc the canonical, portable team home for documentation, planning, and handoff so a teammate can resume work without the founder's chat history or local absolute paths.

The user approved this structure in conversation: shared README and HANDOFF, frontend and backend documentation, _bmad runtime, _bmad-output artifacts, and project .agents/skills. Implement the approved migration locally; publishing is outside this run.

## Boundaries & Constraints

Always preserve original document content and completion states, including draft UX and pending provider acceptance. Preserve hidden .memlog.md decision histories and referenced mockup assets. Keep application runtime, migrations, build/test inputs and generated QA output destinations in code repositories. Keep root code README, AGENTS.md and CLAUDE.md; replace relocated root product/design/progress documents with short pointers where existing agent discovery needs them. Keep repository histories and all unrelated files intact.

Share team BMad configuration and installed skills for both already-installed supported agents where practical. Exclude personal *.user.toml overrides, .claude/settings.local.json, credentials, caches, Python bytecode and rendered workflows containing machine-specific absolute paths. Do not copy database-schema-live.json or environment files. No database operations, deployment, remote Git operations, commits or push. No new package dependency. The installed uv prerequisite is already authorized and installed.

The three working trees were clean before migration. Frontend baseline is 6f2f72075c37457f24acc5d2628deec6e77f9563, backend baseline is c11b3109644be2e341e6a22f17c26fd7d89789b8 and docs baseline is 0228c1432a258c2bb4867c9485921b7a68f6d5a8.

</frozen-after-approval>

## Code Map

- Workspace root is C:/Kunj/Rentra with sibling repos Rentra, rentra-backend, Rentra-Doc. Only the three children are Git repositories. Docs remote is https://github.com/bhavinkarena/Rentra-Doc.git; frontend and backend remotes use the same owner and their directory names.
- Rentra/docs holds shared delivery plans, customer/client/admin session histories, design mockups and operational runbooks. Root DESIGN.md, PRODUCT.md, RENTra-UI-REDESIGN-PLAN.md and Rentra_Post_Development_Launch_Roadmap.md also contain shared knowledge. README and AGENTS carry existing docs links to update.
- Rentra/scripts/performance/bundles.mjs reads docs/performance-baseline.json: keep this input local. Many scripts write docs/evidence and gate/redesign JSON reports: keep local outputs and add a docs README explaining canonical shared documentation. There is no need to modify dozens of QA scripts merely to move their outputs.
- rentra-backend/docs contains API, architecture, migration, payment testing and database review guides plus performance reports and rollback SQL. Keep docs/rollback operational SQL and performance input/output files local; update relocated runbook references to these. README links need updating.
- _bmad/config.toml is installer managed; use _bmad/custom/config.toml team overrides for project_knowledge and other necessary routing. Existing _bmad runtime is v6.12.4. _bmad/render is generated and must not be shared. _bmad/scripts/resolve_config.py and render_skill.py verify configuration and workflow portability.
- .agents/skills and .claude/skills contain installed BMad skills. These directories at the original workspace may have write restrictions. Preserve the existing local install if required; clearly route new work to the docs project instead of creating another editable progress source. Shared copies must work from Rentra-Doc as project root.
- _bmad-output contains brief, final PRD and draft UX plus hidden decision logs, .working assets and mockups. Preserve work-in-progress evidence; avoid copying incidental server error logs or personal metadata.

## Tasks & Acceptance

**Execution:**
- [x] Move shared frontend and backend documentation into Rentra-Doc/frontend and Rentra-Doc/backend; preserve local machine-consumed files and provide source-repository pointers.
- [x] Transfer BMad runtime, installed team skills and output history into Rentra-Doc; configure knowledge paths and ignore local/personal files. Make workspace-root compatibility explicit so the current developer is not stranded.
- [x] Update local Markdown/HTML/CSS/JS asset references affected by relocation, BMad source references and code README/agent links; distinguish pre-existing missing historical links from new broken links. Avoid unnecessary edits to historical SQL migration files.
- [x] Add Rentra-Doc README, HANDOFF and agent instructions for sibling checkout setup, prerequisites, starting BMad, current progress, exact source revisions, next steps and updating cross-repo handoffs. Explicitly identify evidence gaps and stale historical plans rather than inventing completion.
- [x] Add and run a small dependency-free verification check for migration preservation, routing and relocation links. Run relevant offline code checks and BMad configuration/render checks from the docs root. Record results and outstanding limitations in handoff.

**Acceptance Criteria:**
- Given the existing files, when migration completes, then each shared document has one canonical copy in Rentra-Doc and all excluded runtime/test inputs remain usable locally.
- Given a teammate with the three sibling checkouts and Python/uv, when they follow README, then they can locate project skills, resolve BMad configuration, render a workflow and read recorded progress without the founder's local paths or chat.
- Given pending customer Part 20, CP32 and draft UX evidence, when the teammate reads HANDOFF, then pending work remains pending and older verification is clearly distinguished from migration checks.
- Given the staged-for-review local changes, when validation runs, then no newly broken local relocation links or missing migrated assets remain, and no excluded personal/configuration secrets are introduced into shared Git candidates.

## Implementation Notes

Intent gaps: none; the user explicitly approved the described migration. Irreversible actions: none; all changes remain local and recoverable. Footprint: document moves plus a few README/agent/config changes and one small verification check. User approval of the original concrete structure applies; no repeated authorization requested.

## Spec Change Log

## Review Triage Log

| Finding | Verdict | Evidence and disposition |
| --- | --- | --- |
| Blind 1: raw checkout hashes differ by line endings | medium | Confirmed 535 copied files contain CRLF. Patched text hashes to normalize CRLF; binary hashes remain exact. Regression and clean-room checks cover both newline forms. |
| Blind 2: before hashes not checked against original revisions | low | The standalone snapshot checker checks after hashes, by design. Independent verification compared all 154 moved code-repository documents against original Git HEADs with zero mismatches. 445 vendor files and all three decision logs were independently compared too. Do not add permanent Git-history coupling to a one-time check. |
| Blind 3: generated performance JSON may be absent from fresh clone | false | All three named backend JSON files are tracked at the recorded baseline and present in the Git-only export. Requiring preservation of these existing tracked files does not require ignored future outputs. |
| Blind 4: sanitized .env.example rejected | low | Confirmed blanket filename rule conflicted with template allowance. Patched exemption, retained content-pattern scanning and documented sanitization; regression fixture covers it. |
| Blind 5: checker omits incoming code references | low | Its checks are deliberately bounded to local target/preservation checks. Independent caller search found the one machine reader of root DESIGN.md and fixed it; baselines/output paths stay local. README and agent entry links were updated. Broad scanning of historical source comments would add noise without another demonstrated broken caller. |
| Blind 6: fragment targets are not validated | maybe-false | File targets are checked, fragments are explicitly excluded. No newly broken fragment was identified and relocated document sections were preserved. A broken anchor reproduction would settle the claim; reject adding a full anchor parser for an unverified low-impact case. |
| Blind 7: absolute path schemes skipped | false | Preserved absolute addresses are explicitly historical local evidence, not setup dependencies. Git-only export successfully resolved configuration and rendered workflows from a different temporary workspace. Two old links to private .env evidence were removed. The verifier does not claim arbitrary URL validation. |
| Blind 8: saved Playwright callbacks lack setup instructions | medium | Callback snippets require a page driver and port 8766. Added server command, driver requirements, docs-root cwd and output-directory instructions without adding dependencies. |
| Blind 9: verifier lacks regression proof | medium | Added isolated stdlib integration fixtures invoking the actual verifier for valid/missing/historical links, newline equivalence, private environment rejection and sanitized template acceptance. |
| Blind 10: handoff verification placeholder | low | Replaced placeholder with actual preservation, clean-room and BMad portability results and explicit unrun checks. |
| Edge 1: LF teammate checkout fails raw byte hashes | medium | Same root cause as Blind 1; patched normalized text hashes and tested LF/CRLF. |
| Verification-gap layer | false | Reviewer found no verification gaps. No additional implementation requested by this lens. |


## Verification

Verify file preservation using before/after inventory and hashes for files whose contents did not need path updates. Verify moved Markdown/HTML asset targets against their old locations, reporting existing missing historical paths separately. Run the migration self-check, resolve_config and a representative rendered BMad skill from Rentra-Doc. Run frontend tests and backend migration ordering check if available without database access; do not contact providers or run financial/database mutations.


Migration implementation check: python scripts/verify-migration.py passed for 667 migrated files and 1,730 relocated targets, with 580 pre-existing missing reference occurrences recorded separately. Docs-root configuration resolution and representative bmad-build rendering passed with python -m uv; frontend 105/105 tests and backend 71 migration-order entries passed in the orchestrator. Root compatibility routing points new BMad output to Rentra-Doc. Code operational inputs and generated-output destinations remain local. No database/provider/deployment/remote/commit operations ran.

Final verification: nine isolated migration-verifier regression tests passed; Git-only export with LF-normalized text passed preservation and link checks, the same nine tests, BMad config resolution and bmad-build rendering. Original frontend/backend source hashes matched all 154 migration-start documents; 445 vendor files and three decision histories independently matched retained originals. Tracked diffs passed whitespace checks. No remote actions or commits were taken; the approved frozen boundary keeps this a local reviewable migration.
