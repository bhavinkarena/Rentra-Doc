---
title: 'Story 1.4 - arrange and record selective physical verification'
type: 'bugfix'
created: '2026-10-26'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Story1.4 approved in epics.md; user authorized implementation without repeated planning checkpoints">

## Intent

Most of Story 1.4 already exists from CP07 (`src/services/admin/verification.js`). That code is kept unchanged:
- Scheduling is bound to the exact submission approved for verification and recorded in IST, the property-local time zone. The scheduler is recorded as the assignee.
- Reschedule and cancel require a reason and are version-guarded.
- An outcome is version- and revision-guarded. A pass needs every checklist item, at least 20 characters of findings and, for a physical visit, on-site coordinates.
- An incomplete or failed check can never pass.
- Owner notices come from the audit trigger in 0030 and never carry findings, notes, assignment or operator identity.
- The public projection exposes only the `physically_verified` boolean.

Investigation found two gaps against the acceptance criteria:
1. A physical visit could be scheduled without saying why it is warranted or what it must check. The AC requires scope and reason, so a physical visit now needs a note of at least 10 characters. It is stored as the `verification_scheduled` audit reason. Video calls keep an optional note.
2. A failed outcome copied the internal findings into `rentable.rejection_reason`, which the owner sees. The AC forbids exposing private findings, so a failed outcome now needs a separate `ownerMessage` (10–1000 characters). That message becomes the owner-facing reason; findings stay admin-only.

There is no migration, no new command, and no change to assignment or publication. The admin form labels follow the change.

</frozen-after-approval>

## Implementation Notes

- Backend: the `scheduleInput` refine and the `outcomeInput.ownerMessage` check in `verification.js`. Test-first additions to `verification-publication.integration.test.js` failed before the change and pass after it. They cover:
  - a missing physical scope is refused;
  - the scope is recorded in the audit row;
  - a failure without an owner message is refused;
  - `rejection_reason` equals the owner message;
  - no `client_update` detail contains the findings.
- Frontend `VerificationPanel.jsx`:
  - a required "Why a site visit is needed and what to check" field for physical visits;
  - the findings label now says "private to Rentra; never shown to the client";
  - a required "Message to the client (what to fix)" on failure;
  - the field errors are wired up.
- `cp07_gate.py`: physical schedule body and labels updated. A stale tab selector, "History & activity", became "History" (pre-existing drift).
- Checks: backend 327 of 327 with no skips; frontend 115 of 115; targeted ESLint and Prettier pass. `cp07_gate.py` on a fresh `serve-property-review.mjs` fixture: 52 of 53. The single failure, "client sees live and not-bookable state", is pre-existing drift: that owner copy now lives only in the wizard `SubmitBar`, not the page the gate checks. It is not caused by this change and is left for a gate refresh.
- Not changed: choosing a different assignee (the scheduler remains the recorded assignee), and the property time zone (all properties are Indian; IST is fixed in CP07).

## Review Triage Log

- medium / checked, no action: drafts that failed before this change kept findings in `rejection_reason`. A read-only Neon query on 26 October found 0 such rows, so no cleanup is needed.
- low / accepted: the zod refine reports the missing scope only after the time and id fields parse. This costs one extra round trip; the server still refuses.
- low / accepted: `cp07_gate.py` does not exercise a failed outcome in the browser. The backend integration test covers the owner message and the absence of leaked findings.
- question / confirmed: the "History" tab rename matches `properties/[id]/page.js`.

## Release

Backend `089346c049f452841dcff789947a5712ad1d835c`, frontend `125b3dc064598993cb5769780c85587786586472`. No migration. Pushed on 26 October with user approval. Hosted acceptance not checked.
