# Story1.1 implementation progress -26October2026

**State:** complete locally (26 October 2026). Disposable-DB integration and running-app phone/desktop acceptance recorded below. Pushed; hosted acceptance not checked. The user authorized batch backlog generation and implementation without repeated per-story/spec confirmation. New user-visible decisions or genuine blockers still require discussion.

## Delivered

Frontend commit `1b1058306573d714a3a9ef64fe33307786910b79` fixes optional recovery-storage failures interrupting autosave, failed cleanup mislabelling server success, missed HTTP401/CLIENT_REQUIRED sign-in recovery and unsuccessful discard reloading the same recovered text. Backend draft/owner/version behavior is retained. [Bounded build spec and triage](spec-1-1-private-draft-recovery.md).

Final validation: eight focused regression cases; full frontend Node suite113passed/0failed/0skipped; targeted ESLint/Prettier/Git whitespace passed. Configured independent review completed, three findings fixed and closure checked. No backend/database/provider code, migration or live operation.

## Acceptance still required

Run existing owner-onboarding and owner-wizard integration against an explicitly disposable database, then authenticated running-app pending-owner create/save/resume, other-owner/public denial, stale conflict and session/storage recovery at representative phone/desktop keyboard layouts. Existing paths include backend `test/integration/owner-onboarding.integration.test.js`, `test/integration/owner-wizard.integration.test.js` and frontend `scripts/portal-gate/owner-wizard.mjs`; inspect their fixture/setup requirements first and never point write fixtures at a shared/live database. The isolated component tests use controlled browser/React-hook boundaries and are not substitutes for this evidence.

Backend baseline `7612e4a8c46c66c16057d10412a86679ec859bbc` unchanged. Frontend advanced from `726c966ec463daebc6a6399a6aadd7109b06a2de` to the patch commit above. Docs starting revision `87b70f709ac0c1974106bc343fe8a4f4a179c3e3`; current documentation edits remain local/uncommitted. Code commit is local/unpushed. No production build, real device/screen-reader or deployment acceptance is claimed.

After Story1.1 evidence is complete, prepare/implement Story1.2 using current source and the approved backlog, without reopening resolved product decisions or requesting repetitive approvals. Keep external funding/provider/legal/receipt/staffing/runtime gates explicit.

## Acceptance results - 26 October 2026

Source: frontend `8a35a97d244a5199f9e779666731bd88296565e1` (from `1b1058306573d714a3a9ef64fe33307786910b79`), backend `f67fc02627b9f9cababb569913310d446a3e63aa` (from `7612e4a8c46c66c16057d10412a86679ec859bbc`). Both were pushed on 26 October.

Environment: a throwaway Homebrew PostgreSQL 14 cluster on `127.0.0.1:55432`, created in the session scratchpad. Tests ran with `DATABASE_URL=postgres://nobody@127.0.0.1:1/never`, so the hosted `.env` database could not be reached. The fixture API was `serve-owner-wizard.mjs` on 4143, and Next ran with `next dev` on 3143 using `RENTRA_BROWSER_FIXTURE=1`. The browser was system Chrome through Playwright.

- Backend `owner-onboarding` and `owner-wizard` integration tests: 2 passed, 0 failed. They need `node --import ./loader/register.mjs --env-file=.env`; without the loader they fail on the `@/services` alias.
- `scripts/portal-gate/owner-wizard.mjs` at 360px: 14 of 14 passed after updating two stale selectors. The farmhouse type is now chosen with a radio button since hotel commit `b18d23e`, and deleting a draft now redirects to `?deleted=1`.
- New `scripts/portal-gate/owner-draft-recovery.mjs`: 5 of 5 passed:
  - At 1280px, an owner creates a draft, saves it by keyboard and resumes it.
  - A signed-out visitor is redirected to sign in and never receives the draft text.
  - A second owner gets not-found.
  - At 360px, a stale second tab is blocked, and Load latest shows the newer save.
  - At 360px, an ended session offers a sign-in link back to the same step.
- **Defect found and fixed:** Load latest reloaded the page but restored the stale tab's sessionStorage typing over the newer server version, and the next autosave would have overwritten it. `DraftSave.jsx` now clears the recovery storage before reloading and refuses with an explicit message if it cannot. Two regression tests failed before the fix and pass after it.
- Frontend suite: 115 passed, 0 failed. Targeted ESLint, Prettier and Git whitespace checks pass. Independent review: the remount test gap and the missing refusal-state assertion were fixed. Its `blocked`-save question was answered from source: `save()` returns early when blocked.
- **Deferred:** if storage removal throws but reads still work, the stale tab has no in-page route to the newer version. This matches the existing Discard refusal.

Not run: real devices, a screen reader or a production build.
