---
project: Rentra
status: approved
created: 2026-10-26
updated: 2026-10-26
epic: 1
story: '1.2'
approved: 2026-10-26
promotedTo: epics.md
---

# Epic 1: Owners prepare properties and receive trustworthy review

### Story 1.2: Inspect the evidence for a submitted property revision

As an authorized admin reviewer,
I want to inspect a property's submitted information, private evidence and recorded checks together,
So that I can identify what is verified and what still needs investigation without confusing revisions or overstating verification.

**Requirements:** FR2 evidence-inspection slice; CAP-1; NFR1, NFR4, NFR5; AD-1, AD-2, AD-11, AD-12, AD-14. UX-DR13, UX-DR14, UX-DR24, UX-DR34 and applicable shared visual/accessibility requirements. This story does not complete all of FR2: additional-evidence requests and owner responses are separate later slices.

**Acceptance Criteria:**

**Given** an authorized reviewer and an existing submitted property revision,
**When** the reviewer opens it from the current verification queue or an authorized direct link,
**Then** the detail identifies the property, owner verification state and specific submitted revision alongside its available information, documents and recorded checks,
**And** returning to the queue preserves supported filters/context; owner identity, property review and publication/bookability remain distinct facts.

**Given** documents or verification records associated with that submission,
**When** the reviewer inspects them,
**Then** each record is attributable to its submission/revision and exposes available type, timestamp, recorded outcome and findings,
**And** later draft edits or replacement evidence cannot silently appear as the evidence already reviewed for an earlier revision. Prior records retain their history and existing authorization boundaries.

**Given** no evidence of a completed physical visit, an incomplete check or an unavailable attachment,
**When** the review detail renders,
**Then** it explicitly identifies the missing, incomplete or unavailable evidence rather than inventing a successful check,
**And** document approval or a video call is not labelled as physical inspection; an attachment failure offers supported recovery without claiming evidence was reviewed.

**Given** private identity/property evidence and internal findings,
**When** an anonymous user, another owner or an admin without the relevant capability requests the detail or file directly,
**Then** the backend denies unauthorized access without returning private contents or an unrestricted file location,
**And** evidence never enters public listing projections; existing separately authorized owner/caretaker access is preserved rather than expanded by the admin view.

**Given** the reviewer is only viewing evidence,
**When** the detail loads, refreshes or an attachment is opened,
**Then** the read does not approve, reject, request corrections, submit a draft or publish a property,
**And** existing read-only roles remain read-only; any retained mutation controls continue using their separately authorized commands and current version safeguards.

**Given** review detail on a representative phone or desktop viewport,
**When** the reviewer navigates by keyboard/touch and opens evidence through supported controls,
**Then** evidence links have descriptive accessible names, focus remains visible, statuses include text, loading/error states are explicit and details remain readable without page overflow,
**And** the existing admin shell and approved verification direction are reused; list context and document-access security survive the presentation changes.

**Given** the existing verification and private-file paths,
**When** this slice is completed,
**Then** the relevant read/file contract, capability rules and revision semantics are ratified before dependent changes and focused checks demonstrate revision association, missing evidence, unauthorized direct-file denial and absence of read-triggered mutations,
**And** only demonstrated gaps are changed; code-presence or mock approval alone is not reported as passed runtime or operational verification.

## Scope and current evidence

- **Includes:** read-only inspection of already submitted records, existing documents/check history, revision identity, truthful verification wording and private-file access behavior.
- **Excludes:** new owner evidence requests, uploaded-video intake, visit scheduling/recording changes, correction/rejection/approval commands, publication rules and new legal/checklist sufficiency decisions. Retained working commands must not regress.
- **Dependencies:** current submitted-listing intake, admin queue and document services, plus preserved owner draft behavior from Story 1.1. Existing submitted records or isolated submission fixtures make this usable without a future story; no new submission workflow is deferred as a hidden dependency.
- **Source inspected:** backend `src/services/admin/verification.js` records exact submitted revision and performed-check concepts; `src/services/auth/documents.js` retains private document metadata and replacement history; frontend `components/admin/VerificationPanel.jsx` contains existing verification controls. Current `video_call` support is not proof of uploaded-video support. These are read-only findings, not new end-to-end acceptance.
- **Implementation boundary:** existing checklist/publication comments may describe historical rules. Final PRD/addendum/register govern the target; this read-only slice must not invent mandatory physical visits, waive identity verification, or certify locally sufficient ownership documents. Those evidence decisions remain their documented gates.

Approved by the user on 26 October and appended to [epics.md](epics.md). The canonical backlog owns current story content; this is the approval snapshot. Approval is not implementation completion.
