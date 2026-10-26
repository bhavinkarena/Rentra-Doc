---
title: 'Story 1.2 - inspect the evidence for a submitted property revision'
type: 'feature'
created: '2026-10-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Story1.2 approved in finalized epics.md; user authorized implementation without repeated planning checkpoints">

## Intent

**Problem:** The admin property review detail already reads a frozen per-revision snapshot, proxies private files and runs read-only, but it understates or blurs some facts. Owner identity state is not shown. Document status reads like a current verdict. Visits are not tied to a pass number. A missing physical visit is never stated. An unavailable attachment gives a bare "Temporarily unavailable." with no explanation that the evidence was not reviewed.

**Approach:** Close only these demonstrated gaps on the existing page and file route, using the approved verification mockup's separate-facts wording. Add one read-only field to the existing backend read. Add focused backend checks for detail denial and absence of read-triggered mutation. No schema change, no new commands.

## Boundaries & Constraints

**Always:** Keep the snapshot as the revision attribution for documents. Keep the existing capability gates (`admin.properties.read` for detail and `admin.documents.read` for files) and 404-for-missing behavior. Keep `readPropertyReview` in its read-only transaction. Statuses stay as text. Wording: "Site visit" means physical only; a video call or document acceptance is never called an inspection.

**Never:** No migration or document `submission_id`. No change to approve, reject, correct, schedule or record commands, or to publication rules. Do not change the document-review `content_version` trigger (it is a separate command, see Deferred). No new mandatory-visit or ownership-sufficiency rule.

## I/O & Edge-Case Matrix

| Scenario | State | Expected |
|---|---|---|
| Owner identity | client_application status approved / submitted / none | Fact strip: "Owner identity: Approved / Submitted / No application", separate from property review, publication and bookability |
| Document line | snapshot doc status accepted | "Status when submitted: accepted", plus a descriptive link "Open {type} (opens in new tab)" with visible focus |
| Visit history | visits for passes 1 and 2 | Each visit shows "Pass N" and marks the selected pass |
| No physical visit | selected pass has no completed passed site visit | "No completed site visit for pass N." Incomplete ones are shown as not a passed check |
| Attachment fails | upstream 5xx | Text page: could not be loaded, not reviewed, how to retry |
| Unauthorized | anonymous, client token, admin lacking properties capability on `/properties/:id` | 401 / 401 / 403 |
| Read only | detail read twice and file audit | No change to rentable status/content_version, submissions or reviews |

</frozen-after-approval>

## Code Map

- BE `src/services/admin/listings.js:196` `readPropertyReview`: add `application_status` subquery beside `application_id`.
- BE `test/integration/property-review.integration.test.js`: after `readPropertyReview`, assert rentable status/content_version and submission/review counts unchanged; assert `property.applicationStatus` is present.
- BE `test/integration/portal-access.integration.test.js:167-185`: mirror the `/documents/123/file` denials for `/properties/123`.
- FE `app/(admin)/admin/properties/[id]/page.js`: fact strip near `MetricStrip`/header; doc list at ~407-431; Verification history at ~538-566 (map `v.submissionId` to `data.submissions[].passNumber`; selected = `selected.id`).
- FE `app/(admin)/admin/documents/[id]/route.js`: on upstream status >= 500, return a no-store text explanation. Reuse `proxyApiFile`; do not change its other callers.
- Reuse the existing `admin-reviews.py` gate pattern for the browser check if time allows; otherwise record it as not run.
- Public projection (verified, no change): `db/discovery.js` and `db/queries.js` only expose the boolean `physically_verified` (physical + passed + completed).

## Tasks & Acceptance

1. Backend field + tests (red first for the denial and read-only asserts where possible).
2. Frontend page wording and file route.
3. Frontend suite, lint and format; backend integration on the disposable DB; browser check of the detail at 360/1280 on the fixture.

## Spec Change Log

- Implementation found `content_version` already shown; only owner identity and bookability facts were added. The "Pass N" history label uses "Not linked to a revision" for legacy visits with null `submission_id`, and the missing-visit line says such a visit does not count for the pass (review finding).

## Review Triage Log

- medium / patch: legacy visits with null `submission_id` could make "No completed site visit" read as if no visit ever happened. Fixed with explicit wording.
- medium / patch: the browser gate never exercised a passed site visit. Added a final case that inserts a completed physical passed visit for the current pass in the disposable DB; the missing-visit line disappears.
- dismissed: no-`selected` case (legacy property with no submissions already shows "predates versioned submissions"); pass 0 (`pass_number` defaults to 1); route mount (`admin.route.js` applies `requireAdmin` and `requirePortalCapability('admin')` to every route); `client_application.user_id` is unique; fixture tokens stay in the scratchpad and are deleted afterwards; Windows Chrome default matches the other gates (set `CHROME`); hardcoded "Pass 1" matches a fresh fixture owner's first submission.
- process: the session's token-mint script temporarily overwrote and deleted tracked `rentra-backend/.qa-admin-token.mjs`; restored from Git before commit, so no change is committed.

## Verification

Frontend `7bee16f44d7100c770166b880c34621467fec6b7`, backend `6ea66b7c63a573fd0e32b4ccba0b68793df327ba` (both local, unpushed). Backend full suite on the disposable cluster: 326 passed, 0 failed, 0 skipped. Frontend: 115 passed. Targeted ESLint, Prettier and whitespace pass. `admin-revision-evidence.mjs` 6 of 6 at 360 and 1280: the revision and facts render, there is no overflow or serious axe violation, the link has a focus outline, no storage URL is returned, anonymous and limited admins are denied, the database is unchanged by inspection, and the passed-visit branch works. A successful file stream was not exercised because the fixture file is not in Cloudinary, so the route answered 502 with the new explanation. Real devices, a screen reader and a production build were not run.

## Deferred

- Accepting or rejecting a document bumps `rentable.content_version` through the `document_content_version` trigger, so the submitted revision reads as stale. This belongs to the review-command slice.
- The file route does not check that a document belongs to the property being viewed. Any `admin.documents.read` holder may open any id; this is the existing capability model and was not changed.
