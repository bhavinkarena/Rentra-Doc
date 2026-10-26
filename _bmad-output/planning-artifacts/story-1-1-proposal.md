---
project: Rentra
status: approved
created: 2026-10-26
updated: 2026-10-26
epic: 1
story: '1.1'
approved: 2026-10-26
promotedTo: epics.md
---

# Epic 1: Owners prepare properties and receive trustworthy review

Owners can prepare private properties during identity verification and receive reasoned, evidence-based review. This epic covers FR1-5 and CAP-1. NFR1-5 apply according to the workflow's scope; AD-1/2/11/12/14/15 govern authority, draft/publication separation, privacy, UI and compatible delivery. Draft/form/identity/review state profiles remain binding. No later epic is needed for the private draft outcome below.

### Story 1.1: Prepare and resume a private property draft during verification

As an owner whose identity/application verification is pending,
I want to create, save and resume my private property draft,
So that I can prepare my listing while the team completes verification.

**Requirements:** FR1; CAP-1; NFR1, NFR4, NFR5. UX-DR10, UX-DR21, UX-DR22, UX-DR24 and applicable shared visual/accessibility requirements. FR3/FR6 draft-versus-submission/publication boundaries must remain intact; this story does not implement their later workflows.

**Acceptance Criteria:**

**Given** an authenticated owner with pending verification who is eligible for private draft access,
**When** the owner creates a draft using an already supported accommodation category and saves valid existing setup fields,
**Then** the backend persists that draft under the owner's identity,
**And** the owner can reopen it from existing owner navigation and see the last acknowledged saved values under the same listing ID without completing verification first.

**Given** a private draft with incomplete final-publication setup,
**When** the owner saves work that meets the existing draft-save validation rules,
**Then** draft preparation does not require completing publication prerequisites,
**And** saving neither submits/resubmits the listing, alerts reviewers as a submission, approves it nor publishes it; any existing safe autosave remains draft-only.

**Given** an owner's draft and an anonymous visitor or another signed-in owner,
**When** the visitor tries public search/detail/quote access or the other owner directly requests the draft's read/save operation,
**Then** public discovery and booking expose no sellable draft and unauthorized private access is denied by the backend,
**And** neither private fields nor evidence are disclosed or modified; UI hiding alone is insufficient.

**Given** invalid input, an expired session or a failed save,
**When** the existing save operation cannot acknowledge persistence,
**Then** the owner sees linked field errors or an honest recoverable session/save error instead of “Draft saved,”
**And** existing persisted values remain intact, valid entered work is retained safely for recovery, and another identity cannot inherit that private form or cache state. No new offline write queue is introduced.

**Given** the wizard holds a known content version that has since changed,
**When** the owner attempts to save that stale version,
**Then** the backend returns the existing conflict/reload recovery instead of silently overwriting the newer draft,
**And** unsaved-change protection and clear next actions remain available; this does not mandate breaking older supported API clients.

**Given** the draft form on a representative phone and desktop viewport,
**When** the owner edits and saves using keyboard or touch,
**Then** existing labelled controls, visible focus, linked errors, at least 44px primary targets, readable phone inputs and stable pending feedback remain usable without clipped actions or page overflow,
**And** a save-success state follows server acknowledgement, while draft and verification status remain distinguishable. Broader device/screen-reader release evidence is not claimed by a mock or source inspection.

**Given** the current frontend/backend draft path,
**When** the developer completes this slice,
**Then** the existing request/response/error/ownership contract is documented or ratified before any dependent change and focused checks demonstrate pending-owner resume, unauthorized access denial, non-public/non-submitted state, validation/session recovery and stale-version behavior,
**And** changes are limited to demonstrated gaps, existing passing functionality is retained, and only data/schema changes needed for this slice are made. If the implementation already meets the criteria, evidence and necessary contract documentation can complete the story without a UI rewrite.

## Scope and current evidence

- **Includes:** the existing create-draft path, private draft read/save access, supported form recovery and status wording. Preserve existing request duplicate guards; no new universal idempotency system is implied.
- **Excludes:** identity-provider integration, review decisions/evidence-request changes, correction resubmission/reminders, property publication, new categories/policies, checkout and all financial/provider operations. Their existing behavior must not regress.
- **Dependencies:** existing owner authentication and draft services only; no dependency on future Story 1.2 or a later epic. A new shared package or broad schema setup is unnecessary.
- **Source inspected:** backend `src/services/auth/listings.js` has `createListingFromBasics`, pending-owner draft access, owner-scoped edit lookup and version checks. Frontend `components/partner/listing/DraftSave.jsx` and `NewListingStart.jsx` provide existing draft and recovery controls. This is code-presence evidence, not a newly passed end-to-end test. Check current source and repository instructions when implementing.
- **Verification scope:** focused service/API checks with isolated test data plus representative running-app form/keyboard validation; do not contact owners, apply production migrations or invoke financial providers. Record unavailable checks honestly. This is a planning proposal, not implementation authorization or completion.

Approved by the user on 26 October and appended to [epics.md](epics.md). The canonical backlog owns current story content; this is the approval snapshot. Approval does not mark implementation complete.
