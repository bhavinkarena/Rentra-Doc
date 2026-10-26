---
title: 'Story 2.1 - approve ready properties and publish automatically'
type: 'feature'
created: '2026-10-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Story2.1 approved in epics.md; user decided the approval and dates questions on 26 October 2026">

## Intent

FR-6: a property becomes public automatically, without a separate publish step, when team approval and publication setup are complete. Before this story, CP07 required a passed verification visit, then a manual Publish, and allowed publishing with no open dates for day properties.

User decisions (26 October 2026):
- **Approval without a visit:** a new review outcome `approved` (migration 0073). Video requests and site visits stay optional extra checks. Legacy `approved_for_visit` still requires a passed visit.
- **Sellable dates required:** a property never goes public without bookable future dates, for every property type. It publishes automatically once the owner opens dates.

## Behavior

A property in `pending_verification` publishes automatically when every condition holds:
- the owner account is active;
- the owner's `client_application` is approved;
- the current submission is `approved` (or `approved_for_visit` with a passed visit) and matches the current content version;
- the revision is complete;
- the inventory is bookable;
- no scheduled verification visit is still open.

Triggers:
- after an `approved` decision (a failure is swallowed, and the sweep retries);
- after a passed visit;
- a 5-minute `auto-publish` cron sweep over every waiting property.

What publication does and does not do:
- Hidden, paused and restricted states are never touched.
- `verified_at` is set only from a real passed visit, so approval alone never earns the public verified badge.
- An automatic publish writes a `system` audit row with a reason and sends the owner a `listing_published` update.
- Manual Publish stays available.
- Owner copy says "Approved — goes live automatically once your identity is approved and you open bookable dates" unless a visit is scheduled.

</frozen-after-approval>

## Verification

Backend `cab43467177389ec3fc0ad6e3c5472b78c9ca646`, frontend `4a641349e8da01f5a324f6d49d4b7e70f5819544`, both pushed. The user applied migration 0073 on Neon (a read-only check showed 74 migrations and the enum value present).

`auto-publication.integration.test.js` covers:
- approval without a visit;
- unapproved identity and missing dates block publication;
- a replayed decision is refused;
- the sweep publishes once only after dates open;
- `verified_at` stays null and the system audit row and owner notice are written;
- a hidden property is not bypassed;
- the legacy path still needs a visit;
- a scheduled visit holds publication;
- approval with everything ready publishes at once.

Seven older tests that published without identity or dates now opt in through the `makePublishable` fixture helper just before publishing. "Live but unbookable" is reached the realistic way, by closing dates after publication.

Backend 331 of 331 with no skips; frontend 115 of 115. No browser gate was run for this story.

## Review Triage Log

- high / fixed: the sweep used `LIMIT 200` with no order, so eligible properties could starve. It now scans all of them in id order (marked `ponytail:` for paging later).
- medium / fixed: auto-publish ignored a scheduled visit. A scheduled visit now blocks publication, which also avoids an orphaned open visit.
- medium / fixed: owner copy implied a visit.
- medium / fixed: a post-commit auto-publish error surfaced as a failed decision.
- dismissed:
  - The notice key per submission: the same submission cannot be published twice.
  - A `FOR SHARE` lock on the application: it fails inside the read-only review transaction, and `lockProperty` already holds the owner row.
