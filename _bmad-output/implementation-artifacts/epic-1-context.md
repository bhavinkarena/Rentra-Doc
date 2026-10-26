# Epic 1 Context: Owners prepare properties and receive trustworthy review

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Owners can prepare private property drafts while identity verification is pending, supply requested evidence, understand correction or rejection reasons, and explicitly resubmit the same property. Authorized reviewers can assess the exact submitted revision, record performed checks and follow up reliably. This epic delivers private preparation and trustworthy review; it does not make approval synonymous with publication or bookability. The user authorized batch story creation and implementation from the approved decisions, so repetitive story-approval prompts are superseded. Implementation and release evidence still require verification.

## Stories

- Story 1.1: Prepare and resume a private property draft during verification
- Story 1.2: Inspect the evidence for a submitted property revision
- Story 1.3: Request and securely receive additional property video evidence
- Story 1.4: Arrange and record selective physical verification
- Story 1.5: Send specific property correction requests
- Story 1.6: Save corrections privately and explicitly resubmit
- Story 1.7: Deliver response and unanswered-correction alerts
- Story 1.8: Reject with reason and retain same-listing history

## Requirements & Constraints

- Pending identity verification must not prevent eligible owners creating, saving and resuming private drafts. Draft-save validation differs from complete publication readiness. Acknowledged saves persist under the same owner/listing; failed saves must not claim persistence.
- Drafts and private evidence must not enter public discovery or booking. Backend authorization must protect records and direct file access against other owners, anonymous users and insufficient admin capabilities. Preserve separately authorized owner/caretaker access without expanding it through admin views.
- Review the specific submitted revision, not whatever an owner most recently edited. Replacement evidence and later corrections cannot overwrite earlier reviewed material, reasons or outcomes. Retain attributable chronological transitions, including previous/new state, actor/system trigger, reason and timestamp.
- Video is requested when clarification is needed; physical checks are selective. Uploaded video, video call, document review and physical inspection are different evidence. Missing, failed or incomplete evidence cannot imply a passed check. Approval without physical inspection cannot claim a physical visit.
- Additional-video intake is a coherent request, private upload, explicit owner response and reviewer inspection workflow. Upload alone is not a submitted response, property resubmission or approval. Define and enforce supported formats, limits, access and cleanup before enabling the upload capability; existing video-call controls do not prove it exists.
- Correction requests identify actionable missing or incorrect items. Owners save corrections privately; explicit resubmission alerts reviewers and returns the property to review without approval. Rejection may occur directly without a mandatory correction cycle, includes an owner-visible reason and permits correction/resubmission under the same listing identity.
- Owner verification, property approval, publication completeness, pause and date availability remain separate facts. Material identity/authority/location/unit changes cannot inherit inaccurate verification. Publication and financial lifecycle changes belong to subsequent work; preserve their existing safeguards.
- Correction notices and reviewer alerts use a durable authenticated portal record plus tracked transactional email. An email send is not owner receipt or response. No-response alerts occur at elapsed days 7, 15 and 30 from the original correction request; resubmission/closure stops future alerts, draft saves do not, and unanswered work is not automatically rejected.
- Local authority-document sufficiency, privacy/retention and actual media/channel capabilities remain evidence gates. No third-party identity API, new universal checklist, mandatory physical visit or fabricated operational guarantee is introduced.

## Technical Decisions

- Preserve the existing application/repository boundaries, routes, response/error contracts, design system and supported behavior. Backend owns authoritative validation, permissions and transitions; frontend checks and disabled controls cannot replace backend enforcement. No shared package or replacement platform is selected.
- Before dependent frontend/backend changes, ratify the slice's request/response, state, error, capability and version contract. Implement only demonstrated gaps. Schema/migration additions belong to the first story that needs them, never a speculative all-entity setup.
- Reads and formatting cannot trigger approval, rejection, correction or publication. Private internal notes cannot change case, booking or financial state. Commands bind the current actor, submission scope and version; stale consequences require explicit recovery rather than silent overwrite.
- Persist sensitive decisions and required notification intent together. Replay must not create duplicate logical requests, responses or milestone notices; changed payload/scope cannot reuse an earlier confirmation silently. Run deadline work from durable business timestamps so restart or delayed delivery does not corrupt the schedule.
- Private evidence needs bounded authorized access, protected references and preserved committed history. Failures must not expose orphaned assets publicly, delete prior evidence or appear as successful submission. Exact storage, retention and request shapes are settled in the relevant bounded implementation spec, not inferred from this context.

## UX & Interaction Patterns

- Improve only when an incumbent comparison demonstrates clearer information, easier action, stronger accessibility or useful hierarchy. Retain the premium, trustworthy, relaxing, modern and simple direction, existing emerald/champagne identity, local typography and operational shell.
- Preserve existing owner wizard grouping and draft/dirty-state protection. Show effective defaults and overrides, visible labels, linked errors and retained safe inputs. A session, validation or stale-version failure has an honest recovery path; no new offline write queue is implied.
- Review detail exposes property/revision identity, evidence, checks, next action and reasoned history while retaining queue filters and return context. Missing attachments and insufficient permissions are explicit states, not invented verification results.
- Save, upload, evidence submission, correction resubmission and completed review have distinct feedback. Pending remains pending until backend acknowledgement; use durable record outcomes rather than a disappearing toast alone.
- Phone and desktop layouts remain readable, keyboard/touch operable and responsive. Preserve visible focus, labelled file/evidence controls, at least 44px primary targets, readable phone inputs, stable pending controls and reflow without clipped actions or page overflow. Respect reduced motion and do not communicate state by color alone.
- Approved mockups are presentation references with illustrative data. They do not demonstrate application behavior, accessibility conformance, private-media capability or operational readiness. Record actual checks and unresolved device/runtime evidence honestly.

## Cross-Story Dependencies

- Draft access starts from existing authentication and private-draft services. Evidence inspection uses existing submitted records/intake and needs no future submission story.
- Video request/response uses draft ownership and revision-aware inspection; deliver both sides together. Physical-verification work builds on evidence inspection.
- Correction requests precede explicit correction resubmission; their response and unanswered-request alerts follow both. Direct rejection reuses inspection and same-listing resubmission without requiring a new correction cycle.
- Later booking/publication features consume these review facts. This epic does not depend on a later financial, accommodation-extension, incident or review-publication epic to deliver its private preparation/review outcome.
