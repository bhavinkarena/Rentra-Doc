# Shared Rentra project context

Read README.md and HANDOFF.md before starting. This repository owns shared product decisions, design, runbooks, progress and BMad artifacts. Use this directory as BMad `{project-root}`, including when the editor opens the common parent workspace.

For a new developer or machine, read [BMAD_SETUP.md](BMAD_SETUP.md). To resume existing work:

1. Read HANDOFF.md for the selected task's last state, source revisions, blockers and next action; use README.md to locate its detailed plan/runbook.
2. Read that plan or BMad document, its `.memlog.md` and relevant working files. Compare current source revisions with the handoff; report differences before relying on historical checks.
3. State where the task stopped and what remains unfinished, then continue the user's selected task. If no task is selected, orient the user from the latest continuation in HANDOFF.md. Do not restart completed work or infer approval from the presence of a draft or mockup.
4. Before ending the session, update the affected progress documents and HANDOFF.md with actual results and an exact next action. Keep current task status in HANDOFF.md rather than duplicating it in this instruction file.

The sibling `../Rentra` owns the frontend; `../rentra-backend` owns the API, migrations and workers. Read each repository's instructions before changing its code. Run application commands from the relevant code repository. Keep code-owned fixtures, baselines, rollback SQL and generated QA output destinations there.

Project skills are in `.agents/skills` and `.claude/skills`. Team BMad configuration is in `_bmad/custom/config.toml`; personal overrides are ignored. Rendered workflows and browser profiles are local state. Never commit credentials, environment files, personal settings or provider secrets.

Before resuming planning, read the existing document spine and hidden `.memlog.md`. Preserve draft status, user decisions, previews and unfinished gates. Append BMad decision logs through `_bmad/scripts/memlog.py` as directed by the skill. Historical verification does not establish current deployment readiness.

When finishing implementation, update the matching plan, session history and part runbook here, then HANDOFF.md with code revisions, actual check results, blockers and the next action. For customer parts, retain the detailed completion-card requirements in the frontend AGENTS.md; progress counts alone are insufficient.

Use relative shared-doc and sibling-source links. Do not create competing progress copies in code repos. Link matching code/docs commits or PRs and identify uncommitted work because these repositories cannot commit atomically.
