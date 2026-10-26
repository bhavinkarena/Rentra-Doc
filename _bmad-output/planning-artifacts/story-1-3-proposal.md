---
project: Rentra
status: approved
created: 2026-10-26
updated: 2026-10-26
epic: 1
story: '1.3'
approved: 2026-10-26
approvalMode: user-authorized-batch
promotedTo: epics.md
---

# Epic 1: Owners prepare properties and receive trustworthy review

### Story 1.3: Request and securely receive additional property video evidence

As an authorized reviewer and the property's owner,
I want to request and provide a property video when further evidence is needed,
So that the team can investigate specific uncertainties without requiring a physical visit for every property.

**Requirements:** FR2 video-request/response slice; CAP-1; NFR1, NFR4, NFR5; AD-1, AD-2, AD-11-15. UX-DR10, UX-DR13-16, UX-DR21, UX-DR24, UX-DR34 and applicable shared accessibility requirements. Physical visits and final approval remain separate review actions.

**Acceptance Criteria:**

**Given** a current property submission and a reviewer with the required command capability,
**When** the reviewer explicitly confirms a video request with the information/checks needing clarification,
**Then** the backend records the request against that property/submission with actor, reason, timestamp and current version,
**And** the owner receives a durable portal request with tracked transactional email notification. Requesting video is optional and does not automatically reject, approve or publish the listing; email failure remains visible without erasing the request.

**Given** the owning user's open video request,
**When** the owner opens it and supplies a supported video,
**Then** the interface explains the requested evidence, permitted file types and configured limits before transfer and stores the accepted asset privately through an authorized upload path,
**And** selecting or uploading a file is visibly distinct from explicitly submitting the evidence response; it cannot claim reviewer receipt or property resubmission merely because transfer started.

**Given** a successfully uploaded video associated with the request,
**When** the owner explicitly submits the evidence response,
**Then** the backend records the response, request identity, submission/revision association, evidence reference and timestamp and queues the reviewer's response notice durably,
**And** the owner receives an acknowledged response state and the reviewer can inspect the submitted video in the existing review detail. This does not approve the property or replace the separate Resubmit for review action when correction resubmission is required.

**Given** an unsupported, oversized, malformed or failed upload, or an expired session,
**When** the backend validates or receives the upload/response,
**Then** it enforces the documented server-side file/size/access rules rather than trusting a filename, browser MIME or client check,
**And** it reports a recoverable error, preserves the open request and safe entered context, and does not show evidence as submitted. Upload cleanup and retry must not delete previously committed evidence or expose orphaned private assets publicly.

**Given** repeated request/response confirmation, a changed submission or a replacement video,
**When** the operation is retried or no longer matches the reviewed request/version,
**Then** replay cannot create duplicate logical requests/responses/notices and stale scope requires explicit refresh/review rather than silent reassociation,
**And** prior requests, responses and reviewed evidence retain attributable history; replacement evidence cannot overwrite what an earlier review inspected. This does not prohibit a distinct later authorized evidence request.

**Given** a private requested video,
**When** another owner, an anonymous user or an admin lacking the relevant capability requests its upload, response or file access directly,
**Then** backend ownership/capability checks deny access and no public listing/media projection exposes the video,
**And** reviewer access uses the existing private-media security model with bounded access, protected references and auditable access where supported; private credentials and unrestricted asset locations are not exposed.

**Given** the reviewer inspects a submitted video or an owner sees its response status,
**When** the evidence view or request status is displayed,
**Then** it distinguishes requested, uploading/failed, uploaded-but-not-submitted and acknowledged submitted evidence from a completed review outcome,
**And** video evidence is not labelled physical inspection, owner verification and property approval remain distinct, and viewing a video cannot itself approve/publish the listing or silently change booking state. These are state meanings, not a mandatory new enum taxonomy.

**Given** the owner/reviewer request flow on representative phone and desktop layouts,
**When** users operate it with keyboard/touch or an attachment/delivery error occurs,
**Then** labelled file/status controls, visible focus, readable limits, stable pending/error feedback and supported retry remain usable in the existing shells,
**And** completion evidence includes contract/permission checks, private upload/access, explicit response, validation/failure/retry, stale revision/history and notice tracking. Provider media configuration must be demonstrated before enabling uploads; a video-call control or static mock does not prove uploaded-video support.

## Scope and current evidence

- **Includes:** one cohesive request -> private upload -> explicit owner response -> reviewer inspection workflow, with durable portal/email notices and revision-aware history. Only records/storage extensions needed for this slice are introduced.
- **Excludes:** new physical-visit scheduling/recording, correction/rejection/approval decisions, automatic publication, mandatory video for every listing, identity-provider integrations, financial actions and a general media-platform rewrite. Existing supported behavior remains intact.
- **Dependencies:** approved Stories 1.1/1.2 and existing authentication, submissions, notification and private-media foundation. The owner response and reviewer inspection are delivered here; neither depends on a future request/response story. Existing correction resubmission remains separately preserved.
- **Source evidence:** `admin/verification.js` supports video-call/physical visit concepts; that does not establish video-upload intake. `auth/documents.js` and `uploads/cloudinary.js` provide private-document patterns, with authenticated private assets distinct from public listing photography. Uploaded-video capability is planned and must be checked against actual configured storage support.
- **Feature contract before dependent work:** define the request/response shape, capability checks, allowed video formats/size limits, private resource handling, submission binding, duplicate behavior and cleanup in this slice before frontend/backend implementation diverges. Do not invent numerical limits or a new storage provider from this planning document. Validate retention/access terms under the existing specialist/privacy gate before applicable release.

Approved through the user's batch instruction on 26 October and promoted to [epics.md](epics.md). The canonical backlog owns current story content; approval is not implementation completion.
