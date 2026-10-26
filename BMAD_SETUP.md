# BMad setup and AI handoff: Windows and macOS

Use this guide when joining Rentra or setting up a new computer. **This repository already includes BMad 6.12.4**, its workflows and the team's project skills. Cloning it gives you the shared BMad installation; you only need Git, uv, Python and your chosen AI coding tool to use it.

Do not install a second BMad copy in the frontend or backend. Keep this repository as the BMad project root.

## 1. Install the prerequisites

Install [Git](https://git-scm.com/downloads) if `git --version` is unavailable. Install and sign in to your AI coding tool separately. This repository includes project skills for Codex and Claude Code; it does not include either tool or an account/subscription.

Python 3.11+ is required by the included configuration scripts. The commands below install Python 3.12 through uv, so a separate system Python installation is optional.

### Windows: PowerShell

Install uv using WinGet:

```powershell
winget install --id=astral-sh.uv -e
```

Close and reopen PowerShell and your editor so they receive the updated PATH. Then run:

```powershell
git --version
uv --version
uv python install 3.12
uv run --no-cache --python 3.12 python --version
```

If WinGet is unavailable, use the Windows installer in the [official uv installation guide](https://docs.astral.sh/uv/getting-started/installation/).

### macOS: Terminal

Install uv using its official installer:

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

If you already use Homebrew, `brew install uv` is an alternative; choose one installation method. Close and reopen Terminal and your editor, then run:

```sh
git --version
uv --version
uv python install 3.12
uv run --no-cache --python 3.12 python --version
```

Git may prompt you to install Apple's command line tools if they are missing. Finish that installation before cloning.

## 2. Clone the shared workspace

Your GitHub account needs access to all three repositories. From your preferred development directory, run these commands on either platform:

```sh
git clone https://github.com/bhavinkarena/Rentra.git
git clone https://github.com/bhavinkarena/rentra-backend.git
git clone https://github.com/bhavinkarena/Rentra-Doc.git
cd Rentra-Doc
```

If already cloned, use the existing checkouts. Keep the directory names and sibling layout:

```text
your-workspace/
  Rentra/
  rentra-backend/
  Rentra-Doc/       <-- BMad project root
    _bmad/
    _bmad-output/
    .agents/skills/
    .claude/skills/
```

The same layout works on Windows and macOS; no developer's personal absolute path is required. Application setup and environment templates remain in each code repository. Node.js 22+ is required for the backend; it is not needed just to read these docs or run the included Python configuration scripts.

## 3. Verify BMad

From `Rentra-Doc`, these commands work in PowerShell and macOS Terminal:

```sh
uv run --no-cache --python 3.12 _bmad/scripts/resolve_config.py --project-root . --key core.output_folder --key modules.bmm
uv run --no-cache --python 3.12 _bmad/scripts/render_skill.py --project-root . --skill .agents/skills/bmad-build
```

Configuration should point to `{project-root}/_bmad-output` and use `{project-root}` as project knowledge. The second command should print a local rendered `workflow.md` path. This is a setup check; it does not start implementation. Rendered snapshots are local and ignored by Git.

Open `Rentra-Doc` in your AI tool and start a fresh session so it discovers project skills. Codex uses `.agents/skills`; Claude Code uses `.claude/skills` and the `CLAUDE.md` entry point. If the tool opens the common parent folder, explicitly tell it to use `Rentra-Doc` as the BMad project root and allow access to sibling code when needed. Invoke the installed `bmad-help` skill for guidance.

## 4. Tell the AI where to continue

These files have distinct jobs:

| File | Purpose |
| --- | --- |
| [AGENTS.md](AGENTS.md) | AI instructions: project root, reading order, code boundaries and progress-update rules. |
| [CLAUDE.md](CLAUDE.md) | Claude entry point that imports the same agent instructions. |
| [HANDOFF.md](HANDOFF.md) | Current continuation, source revisions, completed work, blockers, checks and next actions. |
| [README.md](README.md) | Index to detailed plans, runbooks and requirements. |
| Each BMad workspace's `.memlog.md` | Saved decisions and prior approvals for that particular document. |

Paste this into a new AI session:

```text
Use Rentra-Doc as the BMad project root. Read AGENTS.md, README.md and
HANDOFF.md first. Follow the handoff to the relevant plan/runbook or BMad
document, including its .memlog.md and working files. Compare the recorded
source revisions with the current frontend and backend checkouts.

Tell me where this work stopped, which checks or decisions remain open,
and the next unfinished action. Continue the task I select from the saved
work; do not restart completed work or treat drafts as approved. If I have
not selected a task, use the latest continuation in HANDOFF.md to orient me.

Before finishing, update the relevant progress documents and HANDOFF.md
with what changed, checks actually run, blockers, source revisions and
the exact next action for another developer.
```

Private chat history is not shared. The AI must read the saved files; it cannot recover decisions that were never recorded. Keep HANDOFF.md current after every work session, and publish matching code/docs commits or PRs so teammates can obtain the versions it describes.

## Troubleshooting and reinstalling

- **`uv` is not found:** reopen the terminal and editor after installation. If you installed uv through pip instead, `python -m uv` on Windows or `python3 -m uv` on macOS can replace `uv`, using the Python environment where you installed it.
- **Missing `_bmad` or project skills:** first check that you opened `Rentra-Doc` and pulled the complete shared repository. Cloning the committed setup is the normal Rentra installation path.
- **Skills do not appear:** restart the AI session from the docs root and ask it to read `AGENTS.md`. Check the tool's project-skill support; copying only `_bmad-output` does not install the workflows.
- **Configuration points outside the shared repo:** inspect your ignored `*.user.toml` overrides. Personal overrides can supersede team settings.
- **Setting up BMad in an unrelated new project:** with Node.js/npm installed, the upstream stable installer command is `npx bmad-method install`. Select your coding tool and modules when prompted. For Rentra repairs or upgrades, coordinate with the team first and match its recorded version; an unpinned installer can differ from the checked-in 6.12.4 setup. Do not replace the team's work with a fresh blank project.

## Sources

Checked on 26 October 2026. Rentra's bundled version is recorded in [_bmad/_config/manifest.yaml](_bmad/_config/manifest.yaml). Upstream setup instructions can describe newer releases; the checked-in Rentra version is the team baseline.

- [Official BMad installation guide](https://docs.bmad-method.org/start/install-bmad/)
- [Official uv installation guide](https://docs.astral.sh/uv/getting-started/installation/)
- [Installing Python through uv](https://docs.astral.sh/uv/guides/install-python/)
