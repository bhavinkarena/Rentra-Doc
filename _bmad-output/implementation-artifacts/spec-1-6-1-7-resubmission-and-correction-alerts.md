---
title: 'Stories 1.6 and 1.7 - explicit resubmission and reviewer correction alerts'
type: 'feature'
created: '2026-10-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Stories 1.6/1.7 approved in epics.md; user answered the recipient and migration questions on 26 October 2026">

## Intent

Kept from existing code:
- Private draft saves (Story 1.1).
- An explicit `submitProperty`, guarded by version and ownership, with `ALREADY_SUBMITTED`.
- Immutable submission and review history.

Missing before this work: any reviewer-side alert, and any owner-visible failure for a refused resubmission.

User decisions (26 October 2026):
- **Recipients:** the assigned reviewer when active with `admin.properties.write`; otherwise every such admin; if there are none, every active admin.
- **Build:** a durable `admin_alert` table (migration 0072) with tracked email through the existing Resend owner adapter.

## Behavior

- **Story 1.6:**
  - A resubmission that answers an earlier decision raises one `property_resubmitted` alert, keyed `resubmitted:<submissionId>`, naming the new submission and the previous outcome.
  - Draft saves and edits while still pending raise nothing.
  - `SubmitForReview` shows refused or failed submits: stale, already submitted, or an ended session with a sign-in link.
- **Story 1.7:**
  - `correction_unanswered` alerts fire at day 7, 15 and 30, counted from the `changes_requested` instant and keyed `unanswered:<reviewId>:<days>`, each once.
  - A missed tick catches up on every milestone already reached.
  - Milestones stop once the owner resubmits (`review_pass` advances) or the property leaves draft.
  - Nothing is rejected automatically. Rejected properties get no correction milestones.
- **Email:**
  - Uses per-alert Resend idempotency, a 10-row batch and a 3-minute lease, and retries up to 5 attempts.
  - When delivery is not configured, alerts are `blocked`, and they retry automatically once delivery is configured.
  - The state and failure code show in the reviewer inbox. The portal alert is never removed.
- **Inbox:** the admin property queue lists the signed-in reviewer's unread alerts, with Mark read. A failed load is stated.

</frozen-after-approval>

## Verification

Backend `c0f4a932eea85b2e480bff0a8981dcfbe84bfa94` (local; **needs migration 0072 on Neon before push**). Frontend `4973c19b79815bacb97f182549bebce759a84d1f` (pushed; it tolerates the missing backend route).

- `reviewer-alerts.integration.test.js` covers:
  - no alert on a first submission;
  - draft saves raise nothing;
  - day 6 raises nothing; day 8 raises day 7 for the assigned reviewer only;
  - catch-up at day 31 plus a replay gives exactly 7, 15 and 30;
  - no automatic rejection;
  - resubmission raises one alert with the submission id and stops milestones;
  - fallback recipients exclude records-only admins;
  - unconfigured email becomes `blocked`, then retry and sent states;
  - inbox scoping and other-admin read denial.
- Backend full suite: 330 of 330, 0 skipped. `db:check`: 73 files. Frontend: 115 passed.
- Browser gates on a fresh fixture: `reviewer-alerts.mjs` 3 of 3 at 360 and 1280 (own alerts only, visible email failure, axe and overflow clean, Mark read); `owner-wizard` 14, `owner-draft-recovery` 5, `admin-revision-evidence` 6.
- Not verified: real Resend delivery to reviewers; a browser run of a resubmission failure; hosted cron.

## Review Triage Log

- fixed:
  - Stuck `sending` rows now respect the attempt cap.
  - Lease and batch sizing fit the provider timeout.
  - `blocked` alerts retry once configured.
  - A missing site URL counts as blocked.
  - Zero eligible recipients fall back to all active admins.
  - A reviewer-job failure no longer fails customer and owner delivery.
  - The inbox states when alerts fail to load.
- accepted:
  - The milestone scan is O(open corrections) per tick; add a marker if volume grows.
  - The alert insert is inside the submit transaction, so it is durable with the resubmission.
  - Mark-read errors leave the alert visible to retry.
- confirmed: `assignPropertyReview` updates `listing_submission.assigned_to`. Edits while pending are not a response.
