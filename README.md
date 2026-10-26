# Rentra shared documentation

The team's source of truth for product decisions, design, progress, runbooks and BMad. Start with [HANDOFF.md](HANDOFF.md) to see where work stopped and what to do next.

New developer or new computer? Follow [BMad setup for Windows and macOS](BMAD_SETUP.md), including the copyable AI continuation prompt.

## Workspace setup

Clone the repositories beside one another, keeping these directory names:

```text
your-workspace/
  Rentra/          # Frontend code
  rentra-backend/  # Backend, migrations and workers
  Rentra-Doc/      # Shared documentation and BMad project root
```

```sh
git clone https://github.com/bhavinkarena/Rentra.git
git clone https://github.com/bhavinkarena/rentra-backend.git
git clone https://github.com/bhavinkarena/Rentra-Doc.git
```

Each developer needs access to all three repositories. Relative source links and migration verification use this layout. Code repositories retain their own setup instructions and environment templates. Keep credentials in local environment files.

## Find the right document

| Need | Start here |
| --- | --- |
| Current work and continuation | [Team handoff](HANDOFF.md) |
| Launch requirements | [Final PRD](_bmad-output/planning-artifacts/prds/prd-Rentra-2026-10-25/prd.md) |
| UX work in progress | [Design](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/DESIGN.md), [experience](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/EXPERIENCE.md) |
| Latest UX decisions | [Decision log](_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.memlog.md) |
| Customer implementation | [Sessions](frontend/docs/rentra-customer-sessions.md), [plan](frontend/docs/rentra-customer-plan.html) |
| Client/admin implementation | [Sessions](frontend/docs/rentra-client-admin-sessions.md), [plan](frontend/docs/rentra-client-admin-plan.md) |
| Owner experience | [Plan](frontend/docs/OWNER-EXPERIENCE-PLAN.md) |
| Admin experience | [Plan](frontend/docs/ADMIN-EXPERIENCE-PLAN.md) |
| Hotels and launch gates | [Hotel plan](frontend/docs/HOTEL-PLAN.md) |
| Existing frontend guidance | [Product](frontend/PRODUCT.md), [design](frontend/DESIGN.md) |
| Backend contracts | [API](backend/docs/API.md), [architecture](backend/docs/ARCHITECTURE.md), [migration guide](backend/docs/MIGRATION.md) |

Historical runbooks may refer to code before backend extraction. Their check results apply to their recorded dates and environments. Check current source before using them. The finalized launch PRD carries later product decisions; resolve conflicts explicitly.

## Start BMad

Use Python 3.11 or newer, `uv`, and an agent supporting project skills. BMad 6.12.4 and its project skills are included here; teammates do not need the founder's global installation. If needed, install uv:

```sh
python -m pip install --user uv
```

Open `Rentra-Doc` as the agent's project root. Codex skills are in `.agents/skills`; Claude skills are in `.claude/skills`. If your editor opens the parent workspace, explicitly tell the agent to use `Rentra-Doc` as `{project-root}` and allow access to sibling code repositories. Restart the agent session if newly cloned skills are not discovered.

From `Rentra-Doc`, check configuration:

```sh
python -m uv run _bmad/scripts/resolve_config.py --project-root .
```

`python -m uv` works when pip's Scripts directory is not on PATH. The skills' `uv run ...` commands work directly when `uv` is on PATH; otherwise substitute `python -m uv` for `uv`.

Start with `bmad-help` and the task to continue. For example: “Resume the existing Rentra UX work; read HANDOFF.md and the UX decision log before continuing the admin verification and support mockups.”

Shared overrides belong in `_bmad/custom/config.toml` or the skill's team override. Personal `*.user.toml`, rendered workflows, browser profiles and local agent settings are ignored. The shared knowledge root is this repository; source code remains in the sibling repositories.

## Keep progress shared

Pull the three repositories before starting and coordinate task ownership with your teammate. Run application checks from the applicable code repository.

1. Update the relevant plan, session history and part runbook here; keep unfinished gates explicit.
2. Update HANDOFF.md with changes, checks actually run, blockers, the next action and full frontend/backend commit IDs. Obtain IDs with `git rev-parse HEAD` in each repository. Say when work is uncommitted.
3. Commit and push the matching code and documentation changes, linking their commits or PRs in the handoff. Changes across three Git repositories are not atomic.

Code-local `docs/` directories retain code-owned inputs, operational SQL and generated verification outputs. Keep shared progress here. Retained root product/design files are pointers to their canonical shared versions.

Private chat history does not transfer between developers. Save decisions, evidence and continuation instructions in these files before handing work over.

## Resume UX mockup checks

From `Rentra-Doc`, serve the saved UX `.working` directory:

```sh
python -m http.server 8766 --bind 127.0.0.1 --directory _bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working
```

The mockups are available at `http://127.0.0.1:8766/`. The saved `check-admin-mocks.js`, `check-owner-mocks.js` and `check-room-mocks.js` files in that directory are `async page => { ... }` Playwright callback snippets. Use an existing Playwright-capable browser/agent driver that accepts a page callback and supplies a browser `page`; they are not standalone Node executables. The driver needs Playwright and its browser available, with its process working directory set to `Rentra-Doc`. Screenshots are written relative to that cwd into `_bmad-output/planning-artifacts/ux-designs/ux-Rentra-2026-10-25/.working/evidence/`; ensure that directory exists. The HTTP server alone does not execute the checks.

## Migration verification

From any directory, run `python path/to/Rentra-Doc/scripts/verify-migration.py` with all three sibling checkouts present. The [inventory](scripts/migration-inventory.json) records transferred files and historical missing references separately from relocation failures.

Run the verifier's stdlib-only regression tests from `Rentra-Doc` with `python scripts/test_verify_migration.py`. They execute the real verifier against temporary synthetic sibling checkouts without changing project documents.

This is a one-time migration snapshot, not an ongoing CI gate: later legitimate document edits change its recorded hashes. Do not refresh hashes to conceal a failed migration check. Historical missing links remain listed for follow-up; they do not establish that old acceptance evidence exists.

Snapshot text hashes deliberately normalize CRLF to LF for the extensions listed in the inventory; binary hashes remain exact. The check validates local file targets, not URL availability, fragment anchors, browser behavior or product acceptance. Its credential-pattern scan is limited: any permitted `.env.example` must remain sanitized, with placeholders instead of real credentials, and still needs human review before sharing.
