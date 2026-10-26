---
title: 'Story 1.1 - reliable private draft recovery'
type: bugfix
created: 2026-10-26
status: done
route: oneshot
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="User approved Story1.1 and authorized implementation without repeated planning checkpoints">

## Intent

Preserve the existing pending-owner private-draft workflow and fix two demonstrated frontend recovery gaps: optional browser storage failures must not abort autosave or mislabel an acknowledged server save, and backend HTTP401/CLIENT_REQUIRED must offer the existing sign-in recovery. Keep stale-version, ownership, draft-only and current UI behavior. Reuse existing transport and server guards; do not change backend contracts, publication, categories or financial behavior.

The change is reversible and small: `../Rentra/components/partner/listing/DraftSave.jsx` plus a focused component-behavior regression test under `../Rentra/test/`. Existing pending-owner/private-access database integration remains a separate acceptance check; no live database or provider operation is authorized by this slice. No unresolved user-visible choice or migration is needed.

</frozen-after-approval>

## Implementation Notes

- Source investigation: backend `auth/listings.js` already scopes draft lookup to owner and permits pending-owner drafts with version checks; no confirmed backend change needed. `DraftSave.jsx` has unguarded storage read/removals despite already guarded writes, and only recognizes legacy expiry codes. `runApiAction` preserves HTTP status including401 from CLIENT_REQUIRED.
- Plan: treat sessionStorage recovery as optional, keep acknowledged save signals even if cleanup fails, recognize HTTP401, and exercise the actual compiled component effect through isolated behavior tests with browser/action boundaries controlled. Existing Next version-matched forms guidance was read. No new dependency or public API is required.
- Verification: focused regression tests before/after patch, frontend unit suite, targeted lint/format and an independent oneshot reviewer. Full owner onboarding/wizard DB/browser acceptance is not assumed from those checks.

- Implemented optional storage read/cleanup guards in the existing component and HTTP401 sign-in recovery. A review exposed a discard loop when removal fails; discard now displays an honest failure and does not reload stale recovery text.
- Added eight isolated component-effect regressions using the installed Next SWC compiler and controlled hook/browser/action boundaries, including denied read/write/removal, acknowledged autosave, HTTP401/legacy expiry, stale-save blocking, persistent discard/remount and explicit-save acknowledgement. Four of the initial six cases failed before the fix; final eight pass.
- Final frontend suite:113 passed,0failed/skipped. Targeted ESLint, Prettier and Git whitespace pass. No backend code/schema/provider changes. Running-app browser and disposable-DB owner tests were not executed, so the broader Story1.1 acceptance remains in progress.
- Configured oneshot blind review completed; all three findings addressed and original reviewer confirmed bounded closure. No additional configured layers were skipped. Tests use controlled boundaries and do not certify real browser/React scheduling or backend integration.
- Frontend local commit:1b1058306573d714a3a9ef64fe33307786910b79. No push/deployment. Patch spec is done; it is not a claim that every Story1.1 AC or the full backlog is implemented.

## Review Triage Log

- medium / patch: swallowed discard cleanup could reload and restore the same text. Confirmed reachable when reads work but removal is denied. Helper returns cleanup success; failed discard stays in place with explicit error. Persistent successful discard/remount and denied-discard tests pass.
- low / patch: initial denied-storage fixture did not deny writes. Confirmed test coverage gap; fixture now independently denies read/write/remove and successful autosave is still asserted.
- low / patch: idle explicit-save acknowledgement cleanup lacked coverage. Added actual form-saved then focusout behavior check proving no duplicate autosave after failed storage cleanup.
- Closure: reviewer rechecked these three findings against the final source/tests; no residual findings. This was bounded closure, not a second broad review. No deferred reviewer issue.
