---
project: Rentra
status: approved
created: 2026-10-26
updated: 2026-10-26
approved: 2026-10-26
input: epics.md
---

# Proposed Rentra epic structure

The requirements inventory and then this five-epic structure were approved with C/c on 26 October. This is the approved structure snapshot; [epics.md](epics.md) owns the current epic/story content and HANDOFF.md owns continuation status. Structure approval is not story approval or implementation completion. [epics.md](epics.md) retains the confirmed 24 FR, five NFR, 16 architecture and 42 UX requirements. The [spec](../specs/spec-Rentra/SPEC.md) and all adopted companions remain binding.

## Epic List

### Epic 1: Owners prepare properties and receive trustworthy review

**User outcome:** Owners can privately prepare a listing during identity review, submit evidence, understand requested corrections or rejection, and explicitly resubmit the same property. Admins can inspect real evidence and the complete review history without misleading verification claims.

**FRs covered:** FR1, FR2, FR3, FR4, FR5.

**Capability:** CAP-1.

**Complete increment:** Private preparation, evidence access, correction/resubmission, reasoned rejection and durable reviewer notices/reminders work together. Approval is visible, but is not presented as public availability. No later epic is needed to complete this review outcome.

**Dependencies:** Existing owner/admin authentication, upload and listing baseline. No new authentication product or greenfield setup epic is needed.

**Implementation/UX scope:** Reuse owner setup and admin verification; preserve owner identity versus property approval, private/internal evidence boundaries, explicit draft-versus-resubmit and 7/15/30-day milestones. Introduce shared contracts and migrations only where this workflow needs them; preserve the incumbent unless comparison demonstrates improvement.

### Epic 2: Guests book and manage stays with clear money outcomes

**User outcome:** A ready approved property accepts eligible bookings; guests review one total, pay in full, track booking/payment/refund separately and cancel eligible scope. Owners receive eligible payouts, can safely pause/deactivate properties, and repay assigned refund obligations separately. Admins can reconcile financial exceptions and overdue debt without duplicate movements.

**FRs covered:** FR6, FR7, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR23, FR24.

**Capabilities:** CAP-2, CAP-8, CAP-9, CAP-10, CAP-12; account/context preservation in CAP-3 and hotel policy resolution in CAP-4.

**Complete increment:** This includes publication/readiness and guarded admission, manual-before-payment and automatic modes, accepted quotes/policies, global/owner fee and payout settings, ordinary/full/selected-room/eligible early-departure cancellation, provider reconciliation, owner recovery and composed debt restrictions. It works with the currently supported accommodation paths; it does not require the new child/pet/apartment capabilities of Epic 3 or discretionary incident awards of Epic 4. Unsupported setup cannot silently become bookable. Existing supported category and auth behavior is preserved.

**Dependencies:** Epic 1's owner/property review records plus existing listing, booking, inventory, payment and portal foundation. No later epic is needed for ordinary booking/cancellation/recovery. The shared operation and allocation rules must be designed here so later category/incident features extend them without replacing their meaning.

**Implementation/UX scope:** Correct the observed hotel zero-fee and check-in/Tuesday payout conflicts; use authoritative snapshots, integer-paise allocations, per-room policies, current payout mode, durable dispatch identity, guarded inventory and owner debt admission. Preserve full guest entitlement, receipt-based day-5/day-7 clock, paid caps including disputes, and recovery separate from future payouts. Implement approved guest checkout/status, consequence previews and owner/admin finance views. Feature API/state/schema/locking contracts precede dependent frontend/backend work. No speculative shared package, broker or service split.

**Release boundary:** This is deliberately the largest epic because ordinary cancellation, early payout, funded refunds, recovery and overdue admission share one booking obligation. Stories will be individually reviewable inside it. Local/Test progress does not complete Live delivery: provider/account/hosted evidence, funding/exposure, specialist accounting/legal, receipt capability and operations gates must be closed before affected financial sign-off or enablement. INR 40,000 is not an approved reserve. No unapproved Manual fallback or weakening of guest entitlement is introduced to bypass a gate.

### Epic 3: Guests find the right stay with accurate accommodation details

**User outcome:** Guests can browse broadly or optionally filter property type, compare photo-first rooms and full-trip totals, and book eligible hotel/farm/villa/whole-apartment options with accurate children, bedding, meals and pet rules. Owners can configure the corresponding supply and date prices clearly.

**FRs covered:** FR8, FR16, FR17, FR18, FR22.

**Capabilities:** CAP-3, CAP-4, CAP-5, CAP-6, CAP-7, using Epic 2's account, policy and money contracts.

**Complete increment:** Setup, discovery, selection, authoritative quotation, accepted-term snapshots and booking validation for each supported policy/category extension are end-to-end. Actual ages, room-local pricing/capacity, required cots, pet count/fee units, exclusive apartments/stay limits and complete facilities are not implemented as display-only options. Each delivered extension is either operable or explicitly unavailable, never falsely promised.

**Dependencies:** Epic 2's ordinary booking, quote/policy/fee, cancellation and admission contracts, and Epic 1's review. No dependency on future incident/review features. Existing browse/photo/form refinements may be investigated earlier where current contracts support them; full epic completion requires its earlier dependencies and relevant category gates.

**Implementation/UX scope:** Preserve optional type filtering and trip continuity. Apply approved photo-first room presentation, owner Rooms/Rates grouping, all facilities and photo access without losing quantity/availability guards. Child prices, per-night bedding and pet fees use approved component bases and feed the existing fee/refund model. Keep assistance-animal cases separate and specialist-gated; do not add pet approval or universal age/duration rules. Validate category-specific eligibility and real device usability.

### Epic 4: Guests get booking-linked help and admins resolve incidents

**User outcome:** Guests can report an issue without first obtaining an owner response. Urgent cases route immediately; authorized admins review evidence and decide a reasoned remedy with clear additional guest money, cumulative responsibility and owner recovery consequences.

**FRs covered:** FR19, FR20.

**Capability:** CAP-11.

**Complete increment:** Intake, private/public communication, urgent routing, case decisions, stale-safe financial preview, approved cumulative awards/responsibility reassignment and resulting guest/owner records work together. Issue submission alone cannot cancel/refund; internal notes cannot change status. An incident decision uses the existing Epic 2 finance/recovery authority, not a second refund engine.

**Dependencies:** Epic 2's booking record, refund/obligation/recovery core; applicable category snapshots from Epic 3. Existing baseline-category incidents can use Epic 2 records without waiting for a new category rollout. No dependence on future review publication.

**Implementation/UX scope:** Reuse booking-linked support/disputes and approved admin support/refund-decision layouts. Preserve discovery time, affected rooms/nights, credible evidence, 72-hour reporting target with exceptions, cumulative 0-100 percent targets, proportional versus owner-funded responsibility, audited historical reassignment and above-proceeds liability. Actual 12-elapsed-hour human first-response coverage and urgent/on-call operations are release gates, not automatic promises of resolution or 24/7 staffing.

### Epic 5: Genuine guest reviews build trustworthy marketplace feedback

**User outcome:** Guests with genuine eligible booking experience can publish a review; arrived-but-unable-to-stay guests can receive reviewed eligibility. Admins can moderate flagged content with reasons, while owners cannot suppress a review simply because it is negative.

**FRs covered:** FR21.

**Capability:** CAP-13.

**Complete increment:** Booking-linked eligibility, ordinary publication checks, reviewed arrival/access exception, invitation/day-7 reminder, 30-day window, duplicate prevention and reasoned moderation work together with honest no-review/new-listing states.

**Dependencies:** Epic 2 booking identity/history and Epic 4's case evidence for arrival/access exceptions. No later epic is required. Existing completed-stay review behavior is preserved while the approved exception/publication gaps are closed.

**Implementation/UX scope:** Reuse existing review/support and notification services. Do not add imported testimonials, fabricated counts, owner approval/veto or an unapproved reciprocal review product. Public owner replies remain only where already supported.

## FR Coverage Map

| Requirement | Primary epic | Outcome |
| --- | --- | --- |
| FR1 | Epic 1 | Private listing preparation during owner verification |
| FR2 | Epic 1 | Evidence review and additional checks |
| FR3 | Epic 1 | Itemized corrections and explicit resubmission |
| FR4 | Epic 1 | Response and unanswered-request alerts |
| FR5 | Epic 1 | Reasoned rejection and preserved review history |
| FR6 | Epic 2 | Publication/readiness, activation and safe deactivation |
| FR7 | Epic 2 | Full guest entitlement after owner cancellation |
| FR8 | Epic 3 | Suitable location/date/party/type discovery |
| FR9 | Epic 2 | Booked configurable cancellation and early-departure rules |
| FR10 | Epic 2 | Hotel policy inheritance and mixed/selected-room cancellation |
| FR11 | Epic 2 | Automatic entitled refunds and truthful outcome tracking |
| FR12 | Epic 2 | One configured service fee included in the total |
| FR13 | Epic 2 | Eligible early Auto/Manual payouts |
| FR14 | Epic 2 | Separate owner collection and overdue restrictions |
| FR15 | Epic 2 | Full guest payment/refund through Rentra |
| FR16 | Epic 3 | Accurate children pricing and accommodation |
| FR17 | Epic 3 | Declared pets, eligibility and charges |
| FR18 | Epic 3 | Exclusive whole-apartment booking |
| FR19 | Epic 4 | Contextual support and immediate urgent routing |
| FR20 | Epic 4 | Reviewed incident remedy and cumulative responsibility |
| FR21 | Epic 5 | Genuine reviews, invitations and fair moderation |
| FR22 | Epic 3 | Hotel rooms, facilities, offers and bedding |
| FR23 | Epic 2 | Availability and automatic/manual confirmation guards |
| FR24 | Epic 2 | Safe guest identity, selection and booking records |

Each FR has one accountable primary epic. Later feature extensions also preserve earlier requirements: Epic 3 must retain FR10/12/23/24, Epic 4 must retain FR7/9/11/13/14/15, and Epic 5 must retain FR19/24. This cross-cutting preservation does not duplicate ownership or require earlier epics to wait for later features.

## Quality, architecture and UX coverage

NFR1-5 apply to every epic according to its scope. Authorization/privacy, integer money/state correctness, inventory/snapshot consistency, operational recovery/audit and complete-flow accessibility/usability are acceptance criteria inside user-facing stories, not separate database/API/frontend epics. AR1-16 and AD-1-15 remain binding; each feature begins with its required shared contract and deploys compatible migrations only when needed.

Shared UX requirements across all epics: UX-DR1-6 (incumbent/brand/type/layout/shapes/navigation), UX-DR26-32 (interaction/dialog/motion/accessibility/touch/reflow/platform) and UX-DR40-42 (supporting surfaces, measured quality and truthful copy). Primary workflow-specific coverage follows; the source inventory retains exact tests and state profiles.

| Epic | Workflow-specific UX-DR coverage |
| --- | --- |
| 1 | UX-DR10, UX-DR14-16, UX-DR21-24, UX-DR34, UX-DR39 |
| 2 | UX-DR10-16, UX-DR20-25, UX-DR36-37, UX-DR39 |
| 3 | UX-DR7-12, UX-DR17-20, UX-DR33 |
| 4 | UX-DR13-16, UX-DR21, UX-DR23-25, UX-DR35, UX-DR38-39 |
| 5 | UX-DR8, UX-DR14, UX-DR16, UX-DR21, UX-DR23, UX-DR39 |

All 42 UX-DRs are covered by shared or workflow-specific assignments. All 20 IA surfaces are preserved through UX-DR40; no new standalone caretaker/operations redesign or replacement theme is inferred.

## Dependency and overlap check

Delivery order is Epic 1 -> Epic 2 -> Epic 3, with Epic 4 requiring Epic 2 and relevant available category snapshots, and Epic 5 requiring Epic 4 for its arrival/access exception. These are dependency boundaries, not calendar estimates or permission for gated Live use. Existing functioning code is reused in every epic; a planning label does not imply a rebuild.

- Booking, inventory, cancellation/refund and finance modify the same core services (`booking/inventory.js`, `hotel-checkout.js`, `hotel-stays.js`, `payments/refund*.js`, `finance/hotel-payouts.js`) and their guest/owner/admin views. Epic 2 consolidates their ordinary end-to-end obligation instead of splitting technical layers or making refund/recovery a forward dependency.
- Room/child/pet/apartment configuration and selection share owner `HotelSections.jsx` / `TermsSection.jsx`, guest `HotelRooms.jsx` and booking-domain evaluators. Epic 3 groups this policy/selection work; Epic 2 owns cancellation-policy and financial semantics so later edits cannot fork them.
- Incident awards reuse refund/recovery code but add a distinct evidence/decision boundary and operational risk. Epic 4 owns only this extension and must invoke the already-owned financial mutations.
- Arrival/access review eligibility uses incident evidence but does not implement a new support workflow. Epic 5 owns public feedback/moderation and consumes Epic 4 case facts.

No all-tables-upfront setup, API-only, frontend-only, generic design-system rewrite or deployment-only epic is proposed. Structure approval is recorded; individual stories are reviewed sequentially under workflow Step 3. No estimates or staffing assignment is invented.
