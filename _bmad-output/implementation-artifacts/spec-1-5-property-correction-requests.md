---
title: 'Story 1.5 - send specific property correction requests'
type: 'bugfix'
created: '2026-10-26'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Story1.5 approved in epics.md; user authorized implementation without repeated planning checkpoints">

## Intent

The existing CP06 `decidePropertyReview(changes_requested)` already meets most of Story 1.5, and it matches the approved verification mockup ("Sections to correct" plus one owner-facing reason). It is kept unchanged:
- At least one flagged section is required, together with a reason.
- The decision is bound to the exact submission, pass and content version.
- It is idempotent through `ALREADY_DECIDED` and `SUBMISSION_CHANGED`.
- The audit trigger produces a durable `client_update` (kind `action`, carrying the reason), which fans out to an `owner_notification` email row.
- The owner detail shows `reviewFlags` mapped to wizard steps.

One gap was found: the owner property detail leaked reviewer identity. It returned `review.assignee` (the reviewer's email and id) and raw `listing_review` rows that include `reviewed_by`. The fix:
- `getListingForEdit` now selects only owner-safe review fields.
- The owner controller drops the assignee.

The frontend reads none of the removed fields.

</frozen-after-approval>

## Verification

Backend `f6e47a1b61fb99232eee9632ad621498520b7448`. New `property-corrections.integration.test.js` covers:
- an itemized requirement;
- one `client_update` and one email intent;
- an email marked failed leaving the portal request intact;
- replay and stale decisions refused, with no duplicates;
- the owner sees the flags, outcome and reason but no reviewer email, id, `reviewedBy` or assignee;
- another owner gets 404.

It failed on the leak before the fix. Full backend suite: 328 of 328, 0 skipped. No frontend change and no migration.

## Review Triage Log

- medium / fixed: the strip moved from the controller to the shared `getListingForEdit` query, which is the root cause.
- low / fixed: the test now asserts the response shape (no `reviewedBy` and no `assignee` keys), not only string absence.
- low / accepted: the integration test skips without `PORTAL_TEST_DATABASE_URL`, the same convention as every other integration test.
