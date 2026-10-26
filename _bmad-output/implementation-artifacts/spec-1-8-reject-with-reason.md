---
title: 'Story 1.8 - reject with reason and retain same-listing history'
type: 'bugfix'
created: '2026-10-26'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Story1.8 approved in epics.md; user authorized implementation without repeated planning checkpoints">

## Intent

Direct rejection already exists in CP06 and is kept:
- `decidePropertyReview` with outcome `rejected` requires a reason and needs no correction cycle first.
- The reason is shown to the owner.
- Rejected listings stay editable as the same listing and resubmit through `submitProperty`.
- Version, assignment and `ALREADY_DECIDED` guards apply.
- History lives in immutable `listing_review` and submission rows.
- The admin form needs an explicit outcome, a required reason and a submit.

The gap was that the decision audit recorded the new status but not the previous one. The audit now records `from` alongside `status`, together with the actor and time. Owner views exclude reviewer identity (Story 1.5 fix).

</frozen-after-approval>

## Verification

Backend `c0f4a932eea85b2e480bff0a8981dcfbe84bfa94` (same local commit as Stories 1.6/1.7). `property-rejection.integration.test.js` covers:
- a short reason refused;
- reject leads to `rejected`, with the owner-visible reason;
- the audit records actor, time, from `pending_review` and to `rejected`;
- repeat and conflicting decisions refused;
- the owner sees the outcome and reason but no admin id; another owner gets 404;
- correct then resubmit keeps the same id, moves to `pending_review`, publishes nothing, starts pass 2 and keeps the rejection history.

It is part of the 330 of 330 backend run.
