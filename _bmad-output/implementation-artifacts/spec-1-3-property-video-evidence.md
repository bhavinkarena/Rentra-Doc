---
title: 'Story 1.3 - request and securely receive additional property video evidence'
type: 'feature'
created: '2026-10-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Story1.3 approved in epics.md; user answered the open contract choices on 26 October 2026">

## Intent

**Problem:** Reviewers can schedule video calls and site visits but cannot ask an owner for a recorded property video. Owners have no private way to send one.

**Approach:** Add one request, upload, submit and inspect workflow, bound to the submission being reviewed:
1. A reviewer with `admin.properties.write` records a reason-bearing request against the current submission. The owner gets a portal update, which fans out to email through the existing `client_update` → `owner_notification` path.
2. The owner uploads a video directly to private Cloudinary storage using a short-lived server signature.
3. The backend verifies the stored asset's real format and size from Cloudinary's own metadata.
4. The owner explicitly submits the video.
5. The reviewer plays it through an authorized, audited proxy in the review detail.

The request never changes review, publication or booking state.

**User decisions (26 October 2026):**
- Formats: MP4 and MOV, judged by the container Cloudinary detects, never by filename or browser MIME.
- Size: at most 50 MB per video, that is, 52,428,800 bytes.
- Transfer: a server-signed direct upload to `type: authenticated` storage, then server-side metadata verification. Rejected uploads are destroyed.
- Retention: keep indefinitely, like ownership documents. Retention stays an open privacy/specialist gate before release.

## Boundaries & Constraints

**Always:**
- **Release gate:** the whole flow is off unless `EVIDENCE_VIDEO_UPLOADS=true`. While off, request and upload commands answer 409 `VIDEO_EVIDENCE_DISABLED`. Turn it on only after a real Cloudinary account demonstrates an authenticated video upload, metadata read and signed playback.
- **One open request per submission.** A replayed request returns the existing one, and a portal update is created at most once (`event_key = evidence_request:<id>`).
- **Request guard:** the reviewer must name the current submission. The pass number and content version must match the property, and the property must be in `pending_review` or `pending_verification`; otherwise 409 `SUBMISSION_CHANGED`.
- **Before submission:** the owner may replace an uploaded but unsubmitted video. The replaced asset is destroyed.
- **After submission:** the row's video fields are immutable, enforced by a database trigger. Replaying submit with the same video is idempotent; a different video answers 409. A later need requires a new request.
- **Reviewer notice:** submitting writes an `evidence_response_submitted` audit row, shown in property activity. No new admin outbox is built (see Deferred).
- **Access:** the owner sees only their own property's requests (otherwise 404). Video playback requires admin `properties` read. It streams through the API with Range passthrough from a 60-second signed URL and writes an `evidence_video_viewed` audit row. No Cloudinary URL reaches the browser.
- Video evidence is never labelled a physical inspection.

**Never:** approve, reject, correct, publish or resubmit as a side effect; public projections of the video; trusting client type or size; mandatory video.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Reviewer requests on the current pass | Row created, portal update + email queued, audit `evidence_requested` |
| Same request replayed | Same row; no second update |
| Stale submission | 409 SUBMISSION_CHANGED |
| Owner signs an upload | Returns the Cloudinary URL, fields and the expected `publicId`; `pending_public_id` stored |
| Confirm a 60 MB file, or a format other than mp4/mov | 422 with a recoverable message; asset destroyed; request still open |
| Confirm a valid file | `uploaded`: video fields set, not submitted |
| Submit | `submitted_at` set, audit row, owner sees "Sent to Rentra" |
| Another owner or anonymous user on any route | 404 / 401 |
| Admin without `properties` write requests | 403; without read, video playback is 403 |

</frozen-after-approval>

## Code Map

- BE `drizzle/0071_property_evidence_request.sql` plus a journal entry: the `property_evidence_request` table, a partial unique open-per-submission index and an immutability trigger.
- BE `src/services/uploads/video-store.js`: a Cloudinary video store (sign, inspect, remove, stream) and a test-injectable memory store, following the `evidence-store.js` pattern.
- BE `src/services/admin/evidence-requests.js`: `requestVideo`, `listEvidenceRequests`, `ownerEvidenceRequests`, `signVideoUpload`, `confirmVideoUpload`, `submitVideoResponse`, `streamEvidenceVideo`.
- BE routes and controllers: admin `POST /properties/:id/evidence-requests`, `GET /properties/:id/evidence-requests/:requestId/video`; partner `GET /listings/:id/evidence-requests`, `POST /listings/:id/evidence-requests/:requestId/{sign,confirm,submit}`.
- BE `readPropertyReview`: add `evidenceRequests`. `owner-domain.js`: add the `evidence_requested` title. Env: `EVIDENCE_VIDEO_UPLOADS`.
- FE: an admin Verification-tab "Video evidence" card (request form with explicit confirmation, history with states, player through `/admin/evidence-videos/...`); an owner overview panel (explanation, limits, file picker, upload progress, separate Submit button); API helpers and actions.
- Tests: an integration test with a memory video store; a browser gate on the existing fixture.

## Spec Change Log

- The owner submits by an opaque reference (the random suffix of the stored id) so a reload can still send an uploaded video. The storage path is never sent to the owner.
- The persisted owner line "Video sent to Rentra on <date>. A reviewer will look at it; this does not change your property's review on its own." replaces a transient message that revalidation unmounted.
- The signed upload also carries `allowed_formats=mp4,mov`, so Cloudinary refuses other containers at the source. The server metadata check is still authoritative.

## Review Triage Log

- high / fixed: playback audit was skipped for Range requests not starting at byte 0. Every stream is now audited, with an integration regression.
- medium / fixed: the rejected-upload branch threw inside the transaction, rolling back the `pending_public_id` reset. It now commits the reset, then destroys the asset and throws. Regression added.
- medium / fixed: `allowed_formats` added to the signed params.
- medium / fixed: the stream copy used bare `pipe`. It now uses `pipeline`, ignoring client aborts.
- medium / fixed: owner commands could throw on a dropped connection and leave the screen in "uploading". They now return a recoverable error.
- dismissed:
  - Submit against a superseded pass: the response stays attributed to its own request/pass and is never reassociated, which is the intended history behavior.
  - Cloudinary `inspect` inside the row lock: the owner's own request row only.
  - The 23505 race: `FOR UPDATE` on the rentable serializes requests, so the partial index is a backstop.
  - Proxy Range forwarding and the fetch timeout: no Range is sent by the proxy yet, already marked `ponytail:`; a 50 MB stream must not be cut by a fixed timeout.

## Verification

Backend `42d9c566514a0b6ba91a2acd10a169e54299b59d`, frontend `00dc3dc8e43dc5ab1b65b44056d9bc4ebdae1bd9`. Both are local and **not pushed**: the backend reads the new table, so it must deploy only after migration 0071 is applied to Neon. The frontend tolerates the backend's absence.

- Backend full suite on the disposable cluster: 327 passed, 0 failed, 0 skipped, including `property-evidence.integration.test.js`.
- `db:check`: 72 migration files.
- Frontend: 115 passed; targeted ESLint and Prettier pass.
- Browser gates on a fresh fixture (`OWNER_FIXTURE_VIDEO=1`, in-memory private video store, intercepted provider upload): `property-video-evidence.mjs` 4 of 4, `owner-wizard.mjs` 14, `owner-draft-recovery.mjs` 5, `admin-revision-evidence.mjs` 6.

Not verified: real Cloudinary authenticated video upload, metadata or signed playback (the release gate); actual email delivery (only the queued `owner_notification` row was checked); real devices or a screen reader; production builds.

## Deferred

- Admin-side email or queue notification of submitted responses; the activity entry is the durable notice.
- Video duration limits; none were decided.
- The retention period, which remains an open privacy gate.
