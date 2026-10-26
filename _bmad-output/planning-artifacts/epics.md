---
status: final
stepsCompleted: [step-01-validate-prerequisites, step-02-design-epics, step-03-create-stories, step-04-final-validation]
currentStep: complete
requirementsExtracted: true
awaiting: none
approvalMode: user-authorized-batch
approvedStories: user-authorized-batch
storyCount: 51
implementationReadiness: prepare-each-story-spec
externalReleaseGates: open
proposedStructure: epic-structure-proposal.md
epicStructureApproved: true
created: 2026-10-26
updated: 2026-10-26
inputDocuments:
  - prds/prd-Rentra-2026-10-25/prd.md
  - prds/prd-Rentra-2026-10-25/addendum.md
  - prds/prd-Rentra-2026-10-25/market-questions-and-answers.md
  - ux-designs/ux-Rentra-2026-10-25/DESIGN.md
  - ux-designs/ux-Rentra-2026-10-25/EXPERIENCE.md
  - architecture/architecture-Rentra-2026-10-26/ARCHITECTURE-SPINE.md
  - architecture/architecture-Rentra-2026-10-26/source-evidence.md
  - ../specs/spec-Rentra/SPEC.md
  - ../specs/spec-Rentra/capability-map.md
  - ../../frontend/PRODUCT.md
  - ../../frontend/DESIGN.md
  - ../../frontend/docs/architecture-alignment.md
  - ../../backend/docs/API.md
  - ../../backend/docs/ARCHITECTURE.md
---

# Rentra - Epic Breakdown

## Overview

The user confirmed the requirements inventory with C on 26 October 2026. The user approved the five-epic structure with c on 26 October 2026. Step 3 is processing Epic 1 sequentially; The user authorized batch story creation from the approved decisions and implementation without further per-story checkpoints. The user confirmed this input set; finalized product/UX/architecture decisions take precedence over historical contextual implementation documents. PRD details below are preserved in full with links relocated; IDs FR1-24 correspond to original FR-1-24. Existing code is a baseline to preserve, not evidence that every approved requirement is delivered.

The approved five-epic structure and FR coverage are saved below. The [approval snapshot](epic-structure-proposal.md) retains dependency and UX coverage notes. Stories follow the user-authorized batch mode. Approval records planning intent, not implementation completion, provider capability or release readiness.

This draft follows the approved launch scope and new 13-capability spec. No feature API/schema contract is claimed complete: those must precede dependent implementation under AD-1. Open release gates remain blocking for affected financial sign-off and launch.

## Requirements Inventory

### Functional Requirements

#### FR1: Prepare a private property draft during owner verification

Supports UJ-1.

An owner awaiting identity/application verification can enter and save a private property draft. The draft does not appear to guests. Owner approval and property approval remain distinct stages. Owners can prepare drafts and submit evidence while owner verification is pending, but owner identity verification must finish before property approval/publication. Preserve existing supported draft access.

#### FR2: Review property evidence and request further checks

Supports UJ-1.

The review team can check submitted property information and documents, request a video upload when needed, and selectively conduct physical visits. Owners can receive a video request and upload the requested evidence. Verification records distinguish performed checks; approval without a physical visit must not imply physical inspection.

#### FR3: Request corrections and recheck updated information

Supports UJ-1.

A reviewer can record the specific missing or incorrect items in a correction request. The owner can view the request and save corrections privately. The owner explicitly selects "Resubmit for review" to submit the updated information for team recheck. Saving a draft does not resubmit the property, alert reviewers or constitute approval. Deliver correction requests through the authenticated owner portal plus transactional email, with the portal as the durable request record. Record delivery outcomes without treating an email send as an owner response.

#### FR4: Alert reviewers about responses and unanswered requests

Supports UJ-1.

The system alerts the team when the owner selects "Resubmit for review" for requested corrections, not on draft saves. For a request still awaiting resubmission, send no-response alerts at 7, 15 and 30 elapsed days after the request was sent. These are milestones from the original request date, not successive waiting intervals. Response alerts and unanswered-request alerts are distinct. Each alert identifies the property and request so the team can choose the next action. Stop future no-response alerts for that request after resubmission or closure; draft saves do not stop them. Deliver reviewer alerts through both the admin portal and transactional email as the adopted batch-research operational default. Resubmission returns the property to review; it does not establish that corrections are adequate or approved. Do not automatically reject an unanswered request; that behavior was not requested.

#### FR5: Reject a property without requiring a correction cycle

Supports UJ-1.

A reviewer can reject a property directly instead of requesting corrections and must record a reason visible to the owner. The owner can correct and explicitly resubmit the same listing for review. Saving corrections privately does not resubmit it; rejection and resubmission do not establish approval or publication. Rejected submissions remain non-public until a later approval and FR-6 publication readiness.

Preserve the complete property review-status history across correction cycles, rejection and resubmission. Each transition records the previous and new status, who or what made the change, timestamp and reason; later transitions must not overwrite earlier entries. An automatic transition records its triggering reason. Admin can inspect the history; owners can see their rejection/correction reasons. This does not authorize owners to see private reviewer notes or another owner's records.

**Consequences (testable):**
- A rejected listing can be corrected and explicitly resubmitted under the same listing identity.
- Repeated rejection/resubmission cycles preserve every earlier status entry and reason in order.
- Resubmission returns to review without automatically approving or publishing the property.
- Status history remains available after the current status changes, with access restricted to authorized users.

#### FR6: Publish approved properties automatically and allow owner activation control

Supports UJ-1.

Team property approval and publication readiness are separate conditions. A property becomes public automatically without a separate owner publish step only when team approval is complete and required pricing, availability, photos and policies are complete. An approved property with incomplete required setup remains non-public. Owner activation cannot bypass these publication prerequisites; readiness does not override an owner pause or another admin restriction. The owner can make the property active or inactive. During deactivation, offer two distinct choices: stop new bookings while keeping existing bookings, or stop new bookings and cancel upcoming stays too. Merely choosing the stop-new-bookings option must not cancel existing bookings. The bulk cancellation option applies only to upcoming stays; stays already in progress and completed stays are excluded. Owner activation is distinct from team verification status and date availability. The owner can cancel upcoming paid bookings immediately without prior admin approval. Upcoming means scheduled check-in strictly in the future using the booked property timezone; at exact check-in the stay is outside the upcoming bulk action. Preview affected bookings, notify affected guests through portal and email, and show individual cancellation/refund outcomes rather than claiming all succeeded. Pending/unpaid requests are shown separately: stop-new-only prevents new approvals/confirmations while inactive but preserves existing holds until decline/expiry; explicit cancel-upcoming also cancels applicable unpaid requests and releases holds. No refund is issued for uncaptured money; raced captures enter resolution. Confirmed stays remain intact under stop-new-only.

Publication readiness requires verified owner identity, approved property evidence, accurate category/location/contact and photos, capacity/bedding, applicable house/cancellation/child/pet policies, booking timing and at least one future sellable period with valid rates. Hotels need sellable room types, quantities and rate plans; apartments need exclusive-unit and stay-limit setup. All future dates need not be open. Material identity, ownership/authority, address/location or unit changes require recheck and cannot inherit an inaccurate verified badge; preserve existing booking snapshots. Routine rate/calendar edits do not inherently trigger identity review. Local proof-of-authority sufficiency remains a validation gate.

#### FR7: Fully refund guest payments when the owner cancels

Supports UJ-1, UJ-2.

An owner-initiated cancellation of an upcoming stay entitles the guest to a full refund of the amount paid, including Rentra's platform fee, taxes and paid booking extras. Cancellation takes effect independently of refund completion; display refund progress truthfully rather than treating cancellation as money returned. Any earlier refund counts toward the full-refund entitlement; total refunds must not exceed the amount paid. Stays already in progress or completed are excluded from the deactivation bulk action; this requirement does not define their cancellation/refund policy. Recovery of owner funds already paid out follows FR-14. Notify affected guests through portal and email with separate cancellation/refund progress, provider tracking and current estimates where available. Unknown/failed outcomes are reconciled by admin before retry; do not promise instant or guaranteed bank credit. Rentra bears standard payment-gateway processing charges from its service fee, including standard charges retained by the provider after an ordinary refund. Do not deduct an ordinary gateway-cost share from the owner accommodation subtotal or add a guest processing surcharge. This replaces the earlier shared-cost proposal. Applicable statutory/tax adjustments, exceptional provider products and separately reviewed owner-funded guest-refund responsibility remain distinct; this does not authorize new owner penalties, automatic bank debits or unrelated future-payout offsets.

#### FR8: Search by location, dates and guest count

Supports UJ-2.

A guest can enter a location, select booking dates and guest count, and submit a search. Preserve existing validated search behavior and supported filters. Results must respect publication/active status, dates, actual party and room capacity, declared pets, owner stay limits and hotel room/plan allocation. Show the selected trip/party total prominently with mandatory known charges, tax status and an itemized final payable amount before payment; do not defer required bedding, pet or Rentra fees until after selection. Revalidate authoritative price and eligibility before payment/confirmation. Retain valid selections through authentication/navigation under FR-24; show changed or invalid selections explicitly rather than silently substituting another trip.

#### FR9: Let owners configure cancellation windows and refund rules

Supports UJ-2.

**Pre-arrival rules.** Owners can define multiple time windows before arrival/check-in and specify a refund percentage for each. Fixed-amount cancellation rules are excluded: the founder chose percentages so the refund scales with differing property and room prices. The founder's 24-hour full-refund and 12-hour partial-refund examples illustrate configurability, not mandatory platform thresholds. Apply the selected percentage to the full amount the guest paid for the booking, including rental, Rentra's platform fee, taxes and paid extras, rather than a room's current edited price. Any prior refund counts toward the entitlement; do not refund twice. This percentage-only rule applies to cancellation, not extra-bedding pricing, which still supports fixed or percentage charges.

**Cutoff boundaries.** Rules must have unambiguous cutoff behavior and no overlapping or uncovered pre-arrival windows. Guests see the applicable policy before booking and the refund calculation before confirming cancellation. Preserve the policy accepted for that booking; later owner edits must not silently change existing bookings. These consistency requirements support the requested multiple-window behavior; exact ranges remain owner-configurable. Use request submission time against the booked local check-in timestamp; define contiguous intervals so an exact cutoff matches one rule, with equality taking the at/after-cutoff rule. Store the accepted boundary and property timezone with the booking.

**Proportional allocation.** For guest-initiated cancellations, apply the refund percentage proportionally to the owner's rental amount and Rentra's platform fee. The owner and Rentra each retain the remaining percentage of their respective amount; do not take Rentra's refundable fee portion solely from the owner. Allocation-only example (not a quote at the 5% launch rate): INR 10,000 paid = INR 9,500 rental + INR 500 platform fee; a 50% refund returns INR 5,000 (INR 4,750 rental + INR 250 fee), leaving INR 4,750 rental and INR 250 fee retained. No tax or extra component is specified in this example.

**No-show and post-check-in requests.** A guest no-show alone does not trigger cancellation or an automatic refund. If the guest requests a refund, assess entitlement using the booking's accepted cancellation policy; do not assume all owners use the same near-arrival no-refund window. Ordinary policy-entitled refunds follow FR-11, while claimed property/access issues and discretionary exceptions follow FR-20 review. The absence of a refund request must not trigger a refund. Owners must also configure the refund percentage for requests made at or after scheduled check-in, including 0%. Use the time the guest submits the cancellation/refund request, measured against the booked check-in time and property timezone, to select the applicable window. Preserve this post-check-in rule with the booking's accepted policy and disclose it before payment. A no-show without a request still triggers no refund. This ordinary policy rule does not bypass FR-20 review for property/access complaints. 

**Voluntary early departure.** Voluntary early departure follows the booked policy, with no automatic refund merely for leaving. Owners control whether voluntary early-departure refunds are offered after check-in and the applicable time-based percentage, including no refund. Disclose and snapshot this policy before booking; a guest cannot force unused-night reimbursement merely by leaving. If the owner offers it, apply the booked early-departure refund percentage only to unused nights and their attributable booked components; already used nights are non-refundable under the ordinary policy. This is the founder-approved exception to the full-paid-booking basis for pre-arrival cancellation. Allocate the booked service fee and applicable taxes to the unused-night scope consistently with the original component allocation; do not refund consumed services or move their charges onto retained nights. Use the confirmed early-departure request timestamp and booked property timezone/schedule: a night is consumed for ordinary refund purposes when the confirmed request timestamp is at or after its booked local nightly start, including exact equality and the current commenced night; only nights whose starts are strictly later are unused. No automatic hourly proration is introduced. Preview the affected nights, booked amounts, policy percentage and prior refunds before confirmation. 

**Inventory consequences.** Once the guest confirms an eligible early-departure action, record the affected stay as ended early and release only its unused future property/room-night inventory; retain the used-stay history and other retained room reservations. Booking/inventory changes and refund completion have separate status. No refund or inventory release is triggered merely by an unconfirmed preview or unsupported claim of leaving. Property/access incidents can still receive reviewed remedies for affected used nights under FR-20. Verified property/access complaints remain eligible for FR-20 review regardless of a no-refund owner policy. Property/access incidents use FR-20; normal issue reporting follows FR-19.

**Exceptions and evidence gates.** Owner-initiated upcoming-stay cancellation continues to require a full refund under FR-7 regardless of the owner's guest-cancellation policy. Guest entitlement still includes taxes and paid extras at the selected percentage; tax/extra settlement accounting still needs specialist validation; Rentra-funded standard gateway costs and the unused-night early-departure exception are defined above; no-show request handling and the at/after-check-in percentage rule are defined above. Current template-based owner forms do not establish delivery of this dynamic editor.

#### FR10: Reuse a default hotel policy with optional rate-plan overrides

Supports UJ-2.

**Policy inheritance.** An owner can configure one default cancellation policy for a hotel. Room rate plans use that policy unless the owner explicitly selects a different cancellation policy for a specific plan, such as a non-refundable offer. A different room type or meal inclusion does not require a separate policy. Guests see the effective policy for the selected offer before booking, and the booking retains the policy accepted at that time. Later default or override edits must not silently change existing bookings. 

**Mixed-policy calculation.** When a booking contains rooms with different effective policies, calculate each room's eligible refund under its own booked policy and add those amounts for the booking refund. Do not apply one room's policy to the other rooms. Apply FR-9's full-paid-amount basis and proportional owner/Rentra allocation to each room's attributable booked amount, counting prior refunds and enforcing the booking-level paid cap. The preview identifies each room's policy, eligible amount and the total. For example, a refundable room receives its policy-entitled refund while a non-refundable room does not; owner-initiated cancellation still follows FR-7. 

**Selected-room cancellation.** Guests can cancel selected rooms from a multi-room booking while keeping the remaining rooms. Apply each cancelled room's booked policy to its attributable amount; count earlier refunds for those rooms. The preview identifies the rooms being cancelled, rooms being retained and the refund. Cancellation releases only the affected room inventory; retained rooms keep their booked dates, terms and confirmation. Do not silently cancel or reprice retained rooms. Partial-room cancellation is distinct from the supported early-departure action under FR-9; it does not add general stay-shortening, date-change or rebooking capability. 

**Shared-charge allocation.** Allocate shared booking-level charges between rooms in proportion to their booked room prices; charges attributable to one room stay with that room. Preserve the booked allocation for later partial cancellations rather than reallocating charges onto retained rooms. Founder example: room prices INR 6,000 and INR 4,000 split a shared INR 500 fee into INR 300 and INR 200; the first room's policy applies to its INR 6,300 attributable total in this example. Refund the allocated components at that room's applicable percentage, subject to prior refunds. Use the deterministic integer-paise, largest-remainder allocation and zero-price handling defined in NFR-2; preserve the booked allocation for all later refunds. This allocation rule does not resolve tax accounting or processing-cost responsibility.

#### FR11: Automatically initiate policy-based guest cancellation refunds

Supports UJ-2.

The guest can review a refund preview calculated from the booking's accepted policy and confirm cancellation. The system then initiates the eligible refund without routine admin approval. Repeated submissions or provider callbacks must not create duplicate refunds. Show cancellation and refund progress separately, distinguishing pending, completed and unsuccessful or unresolved refund outcomes; initiation does not mean money has reached the guest.

The team can handle exceptions, disputes and payment-provider failures without silently reducing the guest's policy entitlement or issuing duplicate refunds. Recovery of previously paid-out owner funds follows FR-14. Use provider-specific estimates and verified status, with unresolved outcomes handled by admin. Actual provider capability and team service coverage remain evidence/business gates. This requirement does not add a cancellation-charge waiver or promise immediate bank credit.

#### FR12: Apply a global fee default with optional overrides

Supports UJ-2.

Rentra uses one global percentage-based platform fee by default, added to the owner's subtotal. The founder confirms one guest-facing charge named "Rentra service fee." Commission and Rentra service/platform fee refer to this same single charge; do not levy one commission and then another platform fee. The guest-facing quoted trip total already includes that charge. An itemized fee line explains part of the total and must not add it again at checkout. Standard payment-gateway cost is a separate underlying expense borne by Rentra from its service fee; no additional guest recharge, convenience or processing surcharge is approved. The fee base includes rental and paid booking extras such as breakfast and extra bedding, before taxes. Exclude taxes and Rentra's own fee from the calculation base. Rentra can select an owner and configure an owner-specific percentage override; when present, that override replaces the global default. This does not give owners permission to edit Rentra's fee. No category or individual-property overrides are requested. The owner override applies across all that owner's listings. Only an admin with the authorized finance capability may change the owner-specific percentage override; record the actor, reason, previous and new values, and effective timestamp. New quotes use effective settings; invalid unpaid quotes refresh for guest acceptance. The approved launch global default is 5%, with the existing optional admin owner-specific overrides taking precedence. Rentra covers standard gateway charges from this fee. Review actual contribution, provider costs and cancellation losses after the first five paid bookings and completed-stay learning checks; do not automatically change rates after that milestone or reprice accepted bookings. Guests must be shown the applicable quoted fee before payment; later configuration changes must not silently alter the fee accepted for an existing booking or its refund allocation.

#### FR13: Pay owners after successful guest payment

Supports UJ-4.

The founder chooses owner payout after verified successful guest payment rather than requiring check-in or stay completion. Admin can set one global Auto/Manual payout mode and optionally override that mode for each owner. The global launch default is Auto. An owner-specific override takes precedence; without one, the owner inherits the global setting. This is separate from platform-fee percentage configuration, and owners do not control the setting themselves. No per-property payout-mode setting is requested. In Auto mode, the system initiates eligible owner payouts after verified successful guest payment; in Manual mode, the team initiates eligible payouts. Both modes use the same eligibility checks and transfer-status handling. A client-side payment success message alone is not sufficient evidence. Current Auto/Manual settings govern new initiation; mode changes do not cancel or duplicate initiated/uncertain transfers. Recheck uninitiated queued work against current mode and eligibility. Auto initiates after verified capture and confirmed-booking/owner/provider eligibility; provider processing and bank settlement remain distinct. Payout amount after tax/cost allocation and actual provider readiness remain gates. Do not represent the payout as completed until transfer completion is verified.

The selected timing means owner funds may already have been transferred when a guest or owner cancels. If the owner's refundable share cannot be recovered promptly, Rentra funds the eligible guest refund first and recovers the owner share separately. Do not delay the policy-entitled refund solely waiting for owner recovery. Under ordinary proportional allocation, do not charge the owner for Rentra's own refundable fee share; reviewed owner-funded incident refunds under FR-20 are a distinct exception. Refund funding and owner debt/recovery are distinct from transfer/refund completion. Do not deduct recovery amounts from future owner payouts; the founder excludes this because reduced later payouts would confuse owners. Separate admin handling is described in FR-14. Outstanding-debt limits, available refund funding and provider support remain unresolved; do not assume authorization to debit the owner's bank account. These are blockers for a complete payout/refund flow.

#### FR14: Recover refunded owner funds separately in admin

Supports UJ-4.

**Collection.** For a guest refund already completed from Rentra's account, admin can identify the owner's outstanding refundable share and generate/send an owner repayment link. The owner pays Rentra through that link; verified successful collection reduces the outstanding owner balance. Creating or sending a link does not count as collection. This action does not issue another guest refund or send an owner payout. Do not deduct recovery amounts from future owner payouts or debit the owner's bank account automatically. Provider support, link delivery and authorization/security details remain to be validated.

**Verified outcomes.** Keep attempts, failures, uncertain outcomes and verified completion distinguishable; do not treat an action click as completed collection or allow duplicate recovery. Recovery must not exceed the owner's remaining assigned refund obligation. For ordinary proportional refunds this excludes Rentra's own refundable fee portion; for reviewed incident refunds use the admin-selected responsibility under FR-20. 

**Deadlines and restrictions.** Send a repayment reminder on day 5 and set repayment due by day 7 after the owner receives the repayment link. If still unpaid after day 7, automatically block all properties belonging to that owner from accepting new bookings. This is not an instruction to cancel existing bookings or deduct from future payouts. Owner active/inactive controls or another listing must not bypass the owner-wide restriction. Remove this repayment restriction automatically once full repayment is verified, preserving owner pauses and any other publication/verification/admin restrictions. A pending or partial payment does not establish full repayment. 

**Multiple obligations.** Keep debts, original due dates, payments and adjustments separate. Keep the owner-wide restriction while any overdue blocking balance remains; paying one debt cannot clear another. Replacement links cannot restart the original debt clock. Link expiry is separate from debt due date and must not unnecessarily prevent payment by the deadline; replacements collect only the outstanding amount. Reconcile in-flight/excess payments and flag overpayments for admin return/reconciliation, not revenue or automatic cross-debt allocation. Portal plus email carry the notice and reminder. 

**Receipt evidence.** Start the day-5/day-7 clock at the earliest evidenced confirmed delivery or authenticated owner portal view/acknowledgement of the repayment notice. If neither can be evidenced, admin must confirm and record receipt before deadline blocking can start. Record event type, timestamp and evidence with the obligation, never label a send as a read receipt, and never reset the clock merely by replacing a link. Provider/channel event support must be validated. Funding/exposure limits remain open.

#### FR15: Route guest booking payments and refunds through Rentra

Supports UJ-2, UJ-4.

Guests pay the full booking amount to Rentra at booking through the platform's supported payment flow. Exclude advance-plus-later-balance and pay-at-property booking collection from launch scope. For manual-approval properties, owner approval enables payment; verified successful full payment confirms an eligible booking. Existing illustrative advance amounts are not an approved launch payment option. Rentra makes guest refunds from its account; owners do not collect guest booking payments directly through a guest-to-owner flow. Owner payouts and owner-to-Rentra refund-share recovery are separate money movements. Show and reconcile guest payment/refund status independently from owner payout/recovery status; a completed guest refund stays completed while owner recovery is pending. Provider account setup and contractual/settlement arrangements remain to be validated.

#### FR16: Price and accommodate children using explicit owner policies

Supports UJ-2.

**Age classification.** Each hotel owner defines infant and child age ranges with their applicable free/charged policies; ages above the child cutoff use adult rates. Cover younger ages explicitly rather than classifying an infant below a selected child minimum as an adult. Preserve actual declared ages through search, availability, room allocation, quotation and confirmation: adult-rate treatment does not change actual age or by itself determine admission or physical occupancy. Ranges must have clear endpoints without gaps or overlaps for accepted ages. Rentra does not prescribe universal age cutoffs, free stays or fee amounts. 

**Child pricing.** Owners can configure a paid child stay using either a fixed amount per child per night or a percentage-based charge. Free stays remain supported. For percentage child charges, use the per-adult price: divide the applicable nightly room-only price by the number of adults allocated to that room, then multiply by the configured percentage. Exclude meal charges, extra-bed charges, taxes and Rentra's platform fee from this base; handle those components separately without double charging services already included. Founder example: INR 4,000 for two adults yields INR 2,000 per adult; a 25% child rate charges INR 500 per child per night. Use room-local adult counts, not adults in other booked rooms; never divide by zero. Multiply the applicable child charge by qualifying child count and calculate each night using its applicable room rate. Exclude separately charged extra-adult supplements from this base. Use deterministic integer-paise rounding under NFR-2. Reject zero-adult room allocations rather than divide by zero; require an eligible supervising adult per hotel room under the validated check-in policy. An adult-priced minor does not become an eligible supervising adult merely because of pricing. Meal-inclusive offers must retain an identifiable room-only component for this calculation; do not use the full meal-plan total as a substitute.

**Guest ages and accommodation.** Collect the adult count and each child's age for hotel searches and bookings. Preserve actual ages through availability, room allocation, quotation and confirmation. Owners configure whether children are accepted, age-based free/paid rules, existing-bed sharing, child meal charges and extra-bed/cot availability and charges. Avoid a universal free-child age imposed on every property.

**Occupancy and inclusions.** Validate child pricing and physical occupancy separately: free stay does not automatically exempt a child from capacity checks or include a cot, meals or an extra bed. Each selected room must accommodate its allocated adults and children under its configured limits and sleeping arrangement. Show included and chargeable child services in the quote and prevent double charges for bedding or meals already included in the selected plan. Collect each minor's age in completed years at scheduled check-in (0 means under one), with inclusive whole-year ranges; no date of birth is needed solely for search pricing. Property child defaults apply unless an explicit room/rate-plan override exists; disclose and preserve the effective policy. Cot quantities and availability require confirmation: if a cot is required for the party to fit, final booking cannot promise accommodation until confirmed. No pay-at-property cot exception is introduced. Actual supervising-adult/check-in-age eligibility and cot inventory must be validated before launch.

**Consequences (testable):**
- A young guest below the child range matches an explicit younger-age policy rather than automatically becoming an adult.
- Age-range boundaries yield one applicable pricing rule for each accepted age; gaps and overlaps cannot silently price a booking.
- Adult-rate treatment preserves the submitted age and still validates the actual party against admission and occupancy rules.
- Free infant/child stay does not silently promise free meals, cots or extra bedding.
- A 25% child rate on an INR 4,000 room for two adults yields INR 500 per qualifying child per night; other rooms' adult counts do not alter this calculation.

#### FR17: Disclose pet policy and include declared pets in the booking flow

Supports UJ-2.

Owners choose one of two ordinary-pet policies: "Pets allowed" or "Pets not allowed," and describe applicable limits and charges. Exclude "Allowed on request" and a separate pet-approval workflow from launch scope. For "Pets not allowed," guests declaring ordinary pets cannot book that property with pets or submit a pet-approval request to bypass the policy. For "Pets allowed," apply configured limits/charges and the property's existing automatic/manual booking mode without a separate pet-approval step. Guests can declare pet count, identify suitable properties, read the pet policy before payment, and see confirmed pet charges in the quoted total and booking confirmation. Pet count is distinct from human guest count and bed occupancy.

Owners can choose the pet-fee unit: per stay, per night, per pet or per pet per night. Show the unit and calculated total in the guest quote; apply pet-count and night-count multipliers only where the chosen unit requires them. No pet price is prescribed. Allow zero-priced/free pets. Owners can set clearly disclosed maximum count, permitted types/size and stay restrictions; validate the declared pets before payment. Paid pet extras use the already-agreed fee/refund rules unless an explicit exception is agreed. Assistance-animal treatment requires a distinct policy; ordinary pet restrictions/fees must not be applied blindly. Apply the ordinary-pet model across all four accommodation categories, using property defaults and explicit hotel-room applicability where relevant. India-specific assistance-animal rules still require specialist validation; no foreign legal test or ordinary-pet refusal/fee is imported automatically.

#### FR18: Book an entire apartment as one exclusive unit

Supports UJ-2.

Founder confirms apartments are whole-property rentals alongside farms/villas, not hotel room inventory. One booking reserves the entire apartment, not a separately sold room; prevent overlapping exclusive reservations. Record apartment bedrooms, bed configurations, bathrooms and facilities clearly. This product grouping does not require changing the existing farmhouse/villa booking units.

Price whole-apartment stays by night with check-in/check-out dates. Owners configure minimum/maximum nights, open/blocked dates, check-in/out times and default/weekend/date-specific rates. Preserve Rentra's established automatic/manual booking modes and guest fee/payout/refund decisions rather than importing Airbnb's different commercial policies.

Long-stay monthly installment billing, recurring rent and leases are not approved scope merely because an owner can set a long maximum stay. Owners may set date/arrival-day minimum-night variations, an optional preparation buffer (including none) and an optional separately disclosed one-off per-stay cleaning fee (zero allowed). Include cleaning in the approved paid-extra fee/refund model. Declare every occupant and validate whole-unit guest/sleeping limits; do not automatically copy hotel child tariffs. Validate supported maximum duration and booking lead time against actual platform/provider/local constraints; there is no market-mandated 28-night cap, nor permission to add installments. Existing apartment booking support has not been established by current source checks.

#### FR19: Let guests contact the owner and raise a Rentra support request

Supports UJ-2, UJ-3.

A guest experiencing an access problem or materially incorrect listing can contact the owner and separately raise a request with Rentra from the portal. Rentra support must not depend on the guest first obtaining an owner response. Reuse the existing support/request flow where it meets the requirement rather than creating a second ticket system. The founder mentions mail, form or raised request as possible access paths; a separate email-ingestion system is not added merely by this research; preserve the existing portal/form route and communicate its reference through transactional email.

Support entry should preserve relevant booking context when available. Existing support/dispute routes are documented and present in source, but this does not establish complete runtime coverage for the requested incident flow. Reviewed issue cancellation/refund decisions follow FR-20. Keep private owner contact and exact private-home address for authorized confirmed guests; a hotel's public business address may remain public. Collect issue category/description, discovery time, affected rooms/nights, desired remedy and available photos/video/messages or other credible evidence. Do not require impossible photos or an owner response before Rentra accepts an urgent issue. Use 72 hours from discovery as the normal reporting target, with prompt reporting for access/safety and reviewed exceptions for inability to report; this is not a waiver of statutory rights. Classify denied access, safety and currently stranded guests as urgent. Founder sets a human support acknowledgement/initial-response target within 12 elapsed hours of request submission; this is not a final resolution or bank-credit guarantee. Actual coverage/on-call ownership remains OQ-11. Urgent access/safety reports require immediate automated routing/escalation and truthful contact options; a 12-hour general response target does not prove adequate urgent coverage. No 24/7 team or automatic rebooking guarantee is invented. A support report must not silently cancel or refund a booking without a defined decision flow.

#### FR20: Provide cancellation and refund actions for booking-issue resolution

Supports UJ-3.

**Case decision.** Guests can submit a booking-issue refund request, but the request does not automatically cancel the booking or grant a discretionary refund. Admin reviews the reported issue before approving or declining an issue-based cancellation/refund outcome. An unverified claim must not bypass the booked cancellation policy to obtain an automatic full refund. Review the issue rather than presuming a report true or false solely because it was submitted.

**Refund target.** Authorized admin can enter a refund percentage from 0 to 100 after reviewing the issue. A value of 100 means a full refund; a lower value means a partial refund of the booking's paid amount. Preview the monetary amount and account for prior refunds before confirmation; total refunded must not exceed verified payment. Record the acting admin, decision reason, percentage and amount for the booking issue. The guest cannot grant themselves a discretionary refund by entering a percentage. Admin-selected percentages do not rewrite the cancellation policy accepted for the booking.

**Responsibility.** For a reviewed incident refund, authorized admin selects either the usual proportional owner/Rentra allocation or owner-funded allocation, where the owner bears the full guest refund cost when found responsible, including the refunded platform-fee portion. Rentra retains its original gross platform fee in owner-funded mode, before Rentra-funded gateway and operating expenses. The percentage determines what the guest receives; the allocation determines who bears that refund. Record the selected allocation and reason separately. Allocation-only example (not a quote at the 5% launch rate): INR 10,000 paid (INR 9,500 owner rental plus INR 500 fee), with a 50% owner-funded refund, means INR 5,000 returned to the guest entirely at the owner's cost; Rentra retains INR 500. This exception does not change ordinary cancellation allocation. If owner proceeds were paid out, recover the assigned obligation through the separate repayment flow; do not deduct from future payouts or initiate an unauthorized bank debit. Tax/extra accounting for this exception remains to be validated.

**Cumulative refund and reassignment.** Cancellation and refund are separate outcomes; preserve existing booking status and verified money-movement distinctions. Ordinary guest cancellation with a policy-entitled refund remains automatic under FR-11 and must not be blocked by introducing this discretionary review flow. Use FR-19 evidence intake, request owner response when feasible without blocking urgent intake, and retain an auditable case/decision history. Admin refund percentage is a final cumulative target for the selected scope: show prior/in-flight refunds and pay only the unpaid difference. A lower target does not automatically reclaim guest money. For a reviewed owner-funded incident, the founder authorizes cumulative reassignment of prior refund responsibility so the owner bears the approved total guest refund and Rentra retains its original fee, including when the assigned obligation exceeds original owner proceeds. Show the change explicitly, require an authorized reasoned decision, preserve prior history and obtain clear owner agreement to these terms; do not silently rewrite allocations. Guest money still due and responsibility adjustments must be previewed separately. Using a historical allocation-only example rather than a new 5% quote: guest paid INR 10,000 (owner INR 9,500, fee INR 500), then received a proportional INR 5,000 refund; a later 100% owner-funded award pays only another INR 5,000 to the guest, reassigns Rentra's earlier INR 250 responsibility to the owner, and makes total owner responsibility INR 10,000. This includes INR 500 beyond original owner proceeds. Apply any verified recovery already collected before determining remaining debt. No extra guest refund or unauthorized bank debit is created by reallocation. Tax/accounting treatment and enforceable owner terms still require specialist validation. Dispute/provider outcomes must reconcile other reimbursement channels to prevent double refund.

#### FR21: Collect booking-linked reviews and invite genuine guests to respond

Supports UJ-2.

Guests with a genuine booked stay can submit a property review linked to their booking. Invite guests after their stay and send a reminder; send one reminder on day 7 after checkout unless already submitted, closed or ineligible; this is an adopted Rentra cadence, not a universal marketplace schedule. Provide a reviewed eligibility exception for a booked guest who arrived but could not stay because of an access/property issue. A cancelled reservation or no-show alone does not establish firsthand experience or exception approval. Review content must reflect what the guest actually experienced; do not imply they assessed facilities or stay quality they did not experience.

Show honest new-listing/no-review states while reviews accrue; do not invent ratings or counts. This does not approve importing third-party testimonials or mixing external scores into Rentra ratings. Eligible ordinary reviews publish automatically after basic eligibility/content checks; flagged or reported reviews go to admin handling. The arrived-but-could-not-stay eligibility exception still requires review. A negative rating alone is not a moderation violation or removal reason. Record moderation actions and reasons; do not require an owner to approve a guest's review. Retain the existing 30-day review window from booked checkout in the property timezone; approved arrival/access exceptions use an equivalent case-linked stay endpoint. Check booking ownership, eligibility and duplicates plus travel relevance, privacy leaks, threats/abuse, spam and manipulation. Owners can report/dispute with reasons/evidence, not delete or veto reviews. Preserve public owner replies only if already supported; otherwise defer rather than adding them solely from research. Use support-case evidence for arrival exceptions. Current source uses a completed-stay eligibility gate; the broader arrival-exception and publication requirements are not implementation-completion claims.

#### FR22: Configure hotel rooms, facilities, offers and bedding

Supports UJ-2.

Owners can describe hotel room types, quantities, existing bed types/counts, occupancy, photographs and detailed room facilities. Distinguish hotel-wide facilities from what the selected room provides, and expose the full relevant room-facility list rather than silently truncating it to eight items. Describe meals and other inclusions per selected rate plan.

Allow room-only and meal-inclusive offerings with the applicable room price, cancellation terms and total for the guest party. Owners can configure weekday/weekend defaults, date-specific overrides and bulk calendar edits, preserving existing supported behavior. Derive linked offerings from the effective nightly rate, not an unrelated stale base price.

Distinguish included facilities/services from those available at an additional charge; a breakfast discount does not mean breakfast is included. Preserve the selected sleeping arrangement, room facilities, meal inclusions and promised bedding in booking details and confirmations so later edits do not rewrite what the guest purchased.

For extra bedding, owners specify whether it is allowed, type/count and a fixed or percentage charge per bed/mattress per night. Percentage uses that night's room-only price before meals, taxes and Platform fee. Accepted adult occupancy must fit existing sleeping places plus permitted additional places; a double-only room accepting three adults needs an additional sleeping place and configured pricing. Existing beds, price-included guests and maximum occupancy are distinct. Do not charge twice when the extra-person rate already includes bedding. Child accommodation follows FR-16 rather than a universal adult-bed formula.

**Consequences (testable):**
- Two adults in a room with one double bed do not acquire a fictitious extra-bed charge.
- A double plus single can fit three without an added mattress, while its configured extra-person price may still apply.
- A double-only room cannot promise three adult sleeping places with extra bedding disabled.
- Fixed and percentage bedding quotes multiply by required quantity and nights, and do not include taxes or meals in the percentage base.
- Different nightly room prices produce the correct corresponding percentage-based bedding amounts.
- A selected room/plan shows its actual facilities, meals, cancellation terms and complete quoted price.

#### FR23: Preserve owner availability and booking confirmation modes

Supports UJ-2.

Owners control availability by date. Whole properties are exclusive inventory; hotels sell quantities by room type and night. Closed, unavailable or insufficient-capacity selections cannot proceed merely because a listing is active. Check availability again when committing inventory; concurrent guests must not produce confirmed overselling.

Each property supports automatic or manual booking confirmation, default automatic. In manual mode, hold the requested inventory while awaiting the owner and do not start guest payment until approval. Approval opens payment but does not by itself confirm a paid booking. Declined or expired requests release the corresponding held inventory.

Preserve the existing acceptance baselines documented in the [source evidence](briefs/brief-Rentra-2026-10-24/addendum.md#existing-booking-confirmation-and-availability): changing booking mode does not convert pending requests; owner response is allowed up to 24 hours followed by 12 hours to pay, capped by arrival; an ineligible verified capture enters resolution rather than reclaiming expired inventory. Calendar percentage bulk edits use the current effective nightly rate, including overrides; holiday shortcuts select dates without automatically changing prices, as recorded in [date-pricing evidence](briefs/brief-Rentra-2026-10-24/addendum.md#date-dependent-hotel-pricing).

**Consequences (testable):**
- Unavailable dates or insufficient room quantities are rejected before an eligible booking is confirmed.
- A pending manual request cannot launch payment through the UI or by bypassing it.
- Repeated requests/retries do not multiply bookings or permanent holds.
- An expired hold cannot reclaim inventory already sold to someone else.
- Automatic confirmation still requires verified successful full payment and valid inventory.

#### FR24: Preserve guest account, selection and booking records

Supports UJ-2.

Retain existing supported guest authentication, saved places, listing details, quote review, checkout, account and booking records. Preserve valid location/date/party/room selections through authentication and supported navigation. Show a clear recovery path if prices, inventory, permissions or session state change.

**Consequences (testable):**
- Login recovery retains valid booking selections and obtains a fresh applicable quote.
- Guests can find their confirmed or cancelled booking and its payment/refund progress.
- A price or policy change cannot silently collect more than the guest accepted.
- No account switch exposes another person's private bookings or saved data.
- These are preservation requirements, not an assertion that every journey has passed runtime checks.

### NonFunctional Requirements

#### NFR1: Authorization and privacy

Only the appropriate Guest, Owner or authorized admin can read or change a booking, evidence file, policy, fee, payout or refund. Backend checks must enforce permissions even when a UI control is bypassed. Identity/property documents and private case evidence must not enter public listings. Payout-mode and Platform fee overrides are admin-controlled. Preserve account isolation and existing safe error/session behavior.

#### NFR2: Money and state correctness

Component totals reconcile to the guest-paid amount, using consistent rounding in the smallest supported currency unit. Never confirm success from an unverified client message. No duplicate capture, payout, refund or Recovery from retries, repeated clicks or callbacks. Total refunded, including in-flight reserved amounts, cannot exceed verified paid money; total collected for Recovery cannot exceed the remaining assigned obligation. Use integer paise and stable largest-remainder allocation for proportional shared charges so lines sum exactly to the booked component. Zero-price lines receive zero proportional share; an all-zero base with a nonzero shared charge needs a defined allocation basis or validation error. Cumulative refund targets pay only the unrefunded difference; zero due is a no-money record, never a zero-value refund API request. Coordinate payout/refund/recovery against one current booking obligation, accounting for initiated and uncertain movements; after cancellation/refund approval prevent a new incompatible payout and reconcile late transfer outcomes. This never authorizes offsets against another future booking. Previewed amounts must match confirmed actions or require fresh review.

#### NFR3: Inventory and policy consistency

No confirmed overlap for an exclusive property or oversold hotel room-night. Quotes and later operations use the appropriate accepted terms; later owner/admin edits cannot rewrite a booking's policy or payment allocation silently. Calculate time windows relative to the property's declared arrival/check-in time and timezone, with explicit boundary behavior. Release expired inventory without altering already-confirmed bookings.

#### NFR4: Operational visibility and recoverability

Track pending, verified completed, failed and uncertain money outcomes distinctly. Admin can identify unresolved work without treating failure as success or retrying uncertain transactions blindly. Record who performed sensitive actions, the reason, affected booking/owner, amount/percentage and resulting status. A bulk action reports individual outcomes rather than claiming all succeeded when some failed. Verified Recovery removes only the relevant debt restriction.

#### NFR5: Accessible, usable and honest interfaces

Preserve keyboard access, meaningful labels, focus/error feedback, reduced-motion behavior and usable touch controls across guest, owner and admin journeys. Target WCAG 2.2 Level AA across complete core flows; combine automated checks with manual keyboard, focus, labels/errors, contrast and screen-reader checks. Test representative phone and desktop layouts against a recorded browser/device matrix. Use Core Web Vitals good targets: LCP <=2.5 seconds, INP <=200 milliseconds and CLS <=0.1 at the field 75th percentile separately for mobile/desktop. Lab checks precede launch; field validation needs sufficient traffic. These are targets, not current conformance or performance claims; backend load capacity must be measured. Make empty, loading, unavailable, pending and failed states understandable. Show genuine photos, facilities, review counts, verification evidence and quoted prices; do not fabricate trust claims or display an action as complete before it succeeds.

### Additional Requirements

**Brownfield scope:** no starter template or replacement application is selected. Preserve existing repositories, routes, supported flows and design system. These are target requirements, not implementation-completion claims.

- **AR1 (AD-1): Backend authority and API compatibility [ADOPTED]** - Backend owns authoritative eligibility, price, policy evaluation, authorization and mutations. Frontend validation is guidance, never authority. Keep the existing repositories; no shared package is introduced. Every changed API contract includes request/response examples, authorization, stable error codes, money units, state meanings and producer/consumer compatibility checks before dependent work. Preserve response envelopes, field errors, redirect/revalidation metadata and intentional streamed/webhook exceptions. Extend compatibly before retiring an old shape; record coordinated rollout when compatibility cannot be preserved. Never branch on human message text.

- **AR2 (AD-2): Domain ownership and shared mutations [ADOPTED]** - Listing/review owns property revisions and approval; booking owns quotes, accepted terms and reservations; payments owns verified captures/refunds; finance owns payout eligibility, responsibility adjustments and recovery obligations; notifications owns delivery attempts, not business entitlement. Planned recovery joins backend finance, not a new service. Cross-domain actions use their owning services within a caller-supplied transaction when atomicity is required. Only the owning service defines transitions; readers do not mutate state while formatting it. Exact files remain code-owned.

- **AR3 (AD-3): Inventory serialization and admission [ADOPTED]** - Reuse the listing-inventory mutation protocol for quotes that reserve, owner calendar edits, approval, expiry, confirmation and cancellation. Preserve its listing -> sorted orders -> visits -> sorted reservations lock order and bounded whole-transaction retries for serialization/deadlock errors. No provider call occurs inside that transaction. Admission must also serialize against owner-wide blocking changes, with an owner guard acquired before listing locks wherever both are needed. Multi-listing actions acquire listing locks in stable ID order. Every admission/confirmation checks current publication, owner restrictions, eligibility and stock under the same guards. Owner admission evaluates canonical overdue debt and receipt-based deadlines at authoritative database time; a stale worker-maintained restriction projection cannot permit a blocked admission. Worker outage does not relax this gate. Search is advisory; a stale public page confers no booking entitlement. Hotel quantity is room-type/night capacity; apartment inventory is one exclusive whole unit with configured buffers.

- **AR4 (AD-4): Accepted terms and stale previews [ADOPTED]** - Accepted bookings retain authoritative component amounts/allocations, effective fee and policies, room/night scope, party ages/pets, property timezone/schedule, and configuration/source versions. Resolve hotel cancellation policy from the property default unless an explicit rate-plan override replaces it; room type/meal inclusion alone does not require another policy. New invalid unpaid quotes require a fresh guest review; accepted bookings keep their terms. Consequential preview/confirm commands bind actor, action, affected records, amounts and relevant versions using a server-verified digest/version; reject changed consequences for fresh review. Frontend submits selection/reference and consent, not trusted payable amounts. Later actions use booked terms, not edited listing prices.

- **AR5 (AD-5): Monetary representation and allocation [ADOPTED]** - Monetary computation uses integer paise with checked bounds; explicit `Minor` values and currency cross APIs. Preserve existing legacy-major conversion at the existing booking-money boundary; do not reinterpret legacy columns. Percentage settings have an explicit scale. Calculate Rentra's one service fee on rental plus paid extras before tax; global launch default 5%, authorized owner-wide override replaces it. Ordinary gateway expense belongs to Rentra. Allocate shared charges by booked room price using stable largest remainder and deterministic line-ID tie order; zero-price lines receive zero share, and nonzero charges with all-zero weights require an explicit basis or validation failure. Persist allocations; never redistribute onto retained rooms/nights during refunds. Tax/remittance accounting remains gated.

- **AR6 (AD-6): Verified payment, distinct state and environment [ADOPTED]** - Keep booking, owner approval, payment, refund, payout and recovery states distinct. Manual approval enables full payment; it does not confirm a booking. Verified capture plus valid guarded inventory/eligibility enables confirmation. Ineligible late capture enters resolution and applicable refund work without reacquiring sold inventory. Pin provider configuration/environment to the attempt; scope provider IDs and events by provider/environment. Before applying a verified money outcome, match provider account/environment, operation and local/provider references, currency, expected amount and authoritative result state. A valid signature alone is insufficient. Preserve mismatched/excess or unlinked movement evidence for exception reconciliation rather than silently applying or discarding it. Simulated, Test and Live facts cannot be mixed; Test actual bank collection/payout/recovery stays zero. Gateway disablement blocks new attempts, while pinned existing attempts and obligations remain reconcilable. Existing order state labels need not be renamed to achieve this separation.

- **AR7 (AD-7): Durable financial intents and event processing [ADOPTED]** - Persist each authorized movement intent and its reserved amount atomically with the domain decision, before dispatch. Use actor/scope-bound idempotency key plus canonical request hash; replay returns the recorded outcome, while a changed payload conflicts. Dispatch outside the transaction through existing durable job/operation patterns. Verify raw signed webhook bytes before normalization; atomically deduplicate and persist an event plus processing work before success acknowledgement. Worker claims are durable and fenced locally; persist dispatch identity before network I/O and reuse the same provider-supported idempotency identity for a movement. Lease expiry does not prove a call was unsent: takeover of potentially dispatched work is uncertain and requires reconciliation before another create. If the provider lacks safe duplicate prevention/reconciliation, automatic redispatch is disabled and an exception path is required; retain its reservation. Repeated/out-of-order events reconcile provider facts against current state. Timeout is unknown, not failed. Retain the original operation identity and reconcile before retrying an uncertain movement. No exactly-once network guarantee is assumed.

- **AR8 (AD-8): One coordinated booking obligation [ADOPTED]** - Serialize all money decisions for an order through its current obligation and ordered locking protocol. Refund capacity counts completed plus reserved initiated/uncertain refunds and reconciled reimbursements through disputes/reversals against verified paid money. Link bank disputes to their provider-deadline exception workflow; money already returned by another channel cannot be refunded again. Payout initiation follows verified capture plus confirmed-booking/owner/provider eligibility, without waiting for check-in or checkout. Authorized admin controls global Auto/Manual (launch default Auto) and optional owner-wide override; override replaces global mode. Both modes use identical eligibility. Recheck current mode/eligibility for queued uninitiated work; changing mode neither cancels nor duplicates initiated/uncertain transfers. Payout eligibility counts current refund/cancellation decisions and all initiated/uncertain transfers; cancellation/refund approval prevents an incompatible new payout. Reconcile late transfer results rather than assuming a cancellation stopped them. Recovery accounts for actual prior payout/refund and verified recovery allocations; its capacity reserves in-flight/uncertain collections against remaining assigned debt. No negative entitlement, duplicate recovery, cross-booking payout offset or automatic owner-bank debit. Zero guest due records a no-money result and creates no zero-value provider refund.

- **AR9 (AD-9): Guest entitlement and responsibility are separate [ADOPTED]** - Ordinary cancellation percentages apply to the affected scope's full booked paid components, including rental, Rentra fee, taxes and paid extras, with proportional owner/Rentra responsibility. Confirmed policy-entitled cancellation automatically initiates its eligible refund without routine admin review; the unused-night early-departure exception remains AD-10. Reviewed owner-funded responsibility is a separate incident exception. Admin incident percentages are cumulative guest-refund targets; pay only the additional unrefunded amount, respecting AD-8 reservations. Preserve proportional versus owner-funded responsibility separately from guest money movement. Audited cumulative owner-funded reassignment may include earlier refunds and liability above owner proceeds; record adjustment, reason, actor and prior/new allocation without overwriting prior ledger facts or paying the guest twice. Lower targets do not claw back guest money. Owner cancellation targets full paid entitlement including earlier refunds. Owner recovery follows completed Rentra-funded refunds and verified owner proceeds/assigned responsibility; it does not delay guest entitlement or undo a completed guest refund. Enforceable consent/accounting and actual funding remain release gates.

- **AR10 (AD-10): Scope and time boundaries [ADOPTED]** - Use booked property timezone/check-in schedule plus authoritative request time; retain local dates separately from UTC instants. At an exact cancellation cutoff use the at/after rule. Mixed-room cancellation evaluates each selected room's effective booked policy and allocated components; retain other rooms unchanged. Confirmed voluntary early departure affects only unused nights whose starts are strictly later than the confirmed request; current/commenced nights are consumed, without hourly proration. Release only affected future inventory. Owner bulk upcoming cancellation uses check-in strictly in the future; separate unpaid requests from confirmed bookings and reconcile raced captures. Preserve up-to-24-hour manual response then 12-hour payment windows capped by arrival; setting changes do not convert existing requests.

- **AR11 (AD-11): Composed publication and debt restrictions [ADOPTED]** - Derive sellability from distinct owner verification, property approval, required setup, pause/admin restrictions, owner debt restriction and date inventory. A material reviewed-identity/unit/location change cannot inherit inaccurate verification. Draft save never submits corrections; explicit resubmission creates the review transition. Preserve reasoned review history and evidence-backed claims. Recovery debt is per obligation: day 5 reminder/day 7 due derives from earliest verified confirmed delivery or authenticated notice view/acknowledgement; otherwise recorded admin confirmation of receipt is required. Preserve evidence/history and canonical receipt timestamp. Reconcile late earlier verified evidence as an audited correction of that same clock and milestones, never a replacement-link reset; evaluate subsequent admission against the corrected deadline without cancelling already-confirmed bookings. Late-evidence/reminder-order cases require feature acceptance tests. Send success alone cannot start blocking. Link replacement/expiry does not reset the clock. Owner-wide new-booking restriction remains while any overdue blocking balance remains; verified full repayment clears only the debt restriction. Preserve existing bookings and other restrictions. Reconcile excess/in-flight repayments without revenue recognition or automatic cross-debt allocation.

- **AR12 (AD-12): Authorization, evidence and audit [ADOPTED]** - Resolve current identity, record ownership and required capability in backend reads and commands. Public projections exclude identity documents, internal case notes, private contact/evidence and bank/provider secrets. Private file access requires authorization and bounded access; preserve existing approved disclosure rules. Log sensitive decisions with actor/system trigger, reason, affected IDs, versions, amounts and transition, without secrets or unnecessary personal data. Internal-note commands remain private and cannot change case, booking or financial status; public replies and authorized status/financial commands are distinct operations. Receipt evidence is restricted and attributable. Retain existing step-up and session protections for sensitive actions. Retention/deletion must preserve required financial/audit evidence under validated policy; no new retention period is invented.

- **AR13 (AD-13): Durable notifications and scheduled work [ADOPTED]** - Commit domain state and required notification intent together. Portal is the durable request record; transactional email is a separately tracked delivery. Delivery failure cannot roll back guest entitlement or imply owner response. Key scheduled work by subject/request, milestone and version; calculate due work from persisted business timestamps, not process uptime. Correction reminders are at elapsed days 7/15/30 and stop after resubmission/closure; review window is 30 days with day-7 reminder; issue reporting target is 72 hours from discovery with exceptions. Denied access, safety and currently stranded cases create immediate automated routing/escalation independently of owner response; report intake does not itself cancel or refund. Human first response target is 12 elapsed hours, separate from resolution, with truthful urgent contact options. Use the existing registry/worker with durable claims, retries and visible terminal failures; horizontal worker scaling requires proven fencing, not a second uncoordinated scheduler. Reviews publish after ordinary booking eligibility/content checks; flagged/reported content goes to reasoned admin moderation. Arrival/access exceptions require reviewed case-linked eligibility. Owners cannot veto/delete a review, and negativity alone is not a removal reason. Staffing remains an operating gate.

- **AR14 (AD-14): UI projections and cache isolation [ADOPTED]** - Render authoritative totals, effective policies, separate state facts and permitted actions through existing adapters. No optimistic success for finance, booking, approval or permission changes. Private caches are scoped to identity/role and cleared on identity changes; public cache contains only public projections. Revalidate affected views after acknowledged commands and revalidate stock/price before writes. Preserve valid trip/form context safely across auth recovery. Keep assistance-animal intake separate from ordinary pets; do not automatically block or charge it under ordinary pet rules. Applicable accommodation/exemption/documentation handling remains specialist-gated. Use finalized DESIGN/EXPERIENCE and the existing design system; approved mockups remain references. Accessibility, keyboard/focus, responsive images and performance budgets apply to complete flows, not just isolated controls. No offline money/inventory queue is introduced.

- **AR15 (AD-15): Deployment, migration and operational isolation [ADOPTED]** - Keep separate frontend/API/worker processes and environment-specific database, provider credentials, webhook and storage/delivery configuration. Browser bundles contain no secrets. Deploy compatible backend/schema expansion before dependent frontend/worker use; run explicit forward Drizzle migrations separately from application startup, preserving applied history and schema-source consistency. Destructive/data-conversion changes need their own reviewed migration and recovery plan. Code rollback must remain compatible with retained schema/history and cannot erase settled movements. Keep live financial initiation gated until provider, funding, specialist and hosted acceptance evidence is recorded; disabled initiation must leave investigation/reconciliation available. Operations must surface stale worker heartbeats, aged unknown movements, delivery failures, exposure and restriction failures with an assigned responder. Host choice, restore drills and measured capacity are deployment acceptance work, not certified here.

- **AR16: Release and evidence gates** - Preserve the named owners and revisit conditions in the architecture Deferred and Evidence Gates table and PRD OQ-1-13. Feature contracts must settle exact DTO/state/schema/locking and adapter retry details before dependent implementation. Funding/exposure, provider/account and signed hosted Test capability, specialist accounting/legal/owner terms, receipt evidence, support staffing, category eligibility, hosting/restore/load and real-device/accessibility evidence are not passed by planning. INR 40,000 remains proposed. No deployment, financial initiation or schema migration is authorized here.

### UX Design Requirements

UX-DR1: Retain the incumbent unless phone/desktop comparison demonstrates better comprehension, action, accessibility or hierarchy without losing behavior; use approved mockups as presentation references with illustrative data, never production evidence.

UX-DR2: Inherit DESIGN frontmatter and runtime semantic tokens: Emerald Ink #064e3b, restrained Champagne #f8e7c9, warm light surfaces and existing status families. Keep one primary action per task region; status requires text. Verify rendered text contrast 4.5:1, large text 3:1 and meaningful controls/focus 3:1. No new dark mode or palette.

UX-DR3: Use locally served Plus Jakarta Sans and current fallback/type scale, including guest display versus operational typography. Use tabular INR figures, stronger full-trip total, explicit period/rooms/party, readable policies/errors, and at least 16px phone inputs below 768px; do not shrink essential copy into tiny type.

UX-DR4: Preserve the 1280px container, 16px phone/24px wider gutters, 4px spacing base and current public header/search geometry. Keep owner/admin queues task-dense and retain the photo-led owner portfolio.

UX-DR5: Keep the existing 8/12/16/24px/pill radii, flat working surfaces and existing popover/dialog/summary elevation. Preserve visible 2px focus outline/offset, including inverse sidebar/footer surfaces.

UX-DR6: Navigation: retain supported role routes, deep links, active location, Rentra artwork and emerald operational sidebar. Mobile navigation works by keyboard/touch; detail return restores useful filters/position and identity changes cannot expose another cache.

UX-DR7: Search and filters: category choice is optional across farms/villas/hotels/apartments. Preserve valid location/dates/party and applied type across supported navigation; show removable selections and clear actions without silently resetting the trip.

UX-DR8: Listing card: reuse real 4:3 photography, honest identity/rating/new-listing/capacity and dated total context. Property navigation and Save are separately operable; verification/rating is server-backed with explicit missing-photo/review states.

UX-DR9: Room card/rate plan: photos remain visible on phones and lead the composition; details/inclusions align left and selected-trip price right where readable, stacking on narrow width/zoom. Keep room identity, beds, meals, cancellation, quantity, party and full total with existing availability/quantity guards; show the full facilities list through accessible disclosure.

UX-DR10: Forms/setup: reuse labelled inputs, linked help/field errors, retained values and unsaved-change guards. Group required basics versus optional advanced fields using current wizard sections; expose inherited defaults and explicit overrides. Saving drafts is separate from submitting/resubmitting; required child/bedding/cancellation configuration cannot hide in optional detail.

UX-DR11: Calendar: preserve property-local dates, keyboard/date selection, open/blocked labels, effective rates and overrides. Payment downtime is not unavailable stock. Retain existing nested-dialog and unsaved-change behavior, percentage edits of effective nightly rates and date-only holiday selection.

UX-DR12: Booking summary: render the authoritative selected-trip total with mandatory known charges, itemized single service fee, tax status, accepted policies and payment environment. Requote changed selections/versions and obtain renewed review before changed-price payment; no mandatory late surcharge or nightly teaser over known total.

UX-DR13: State badges/trust detail: separately label booking/payment/refund/payout/recovery and owner identity/property approval/publication/pause/debt/availability. Describe only performed document/video/physical checks; do not imply all approved properties were physically inspected.

UX-DR14: Record lists/detail: retain guest booking cards/rows, owner tables and admin contextual detail with filters, pagination, references, direct URLs, keyboard access and aligned financial columns. Show record state and next action ahead of secondary data; keep environments and money types separate.

UX-DR15: Review/confirm: preview affected rooms/nights/bookings, amounts, prior/in-flight refunds, consequences and responsibility before consequential commands; stale previews require fresh review. Read-only roles see no mutation controls, and destructive actions remain visually distinct.

UX-DR16: Feedback/loading: use geometry-matched initial skeletons, stable pending actions and nearby field errors. Success follows server acknowledgement; no optimistic finance/booking/publication/permission success. Keep financial outcomes and recovery references in durable records rather than transient toasts.

UX-DR17: Photo gallery: real property/room photos, reserved aspect ratio, honest missing/failure states, meaningful alternatives, labelled previous/next/close and readable captions. Room photo expansion must not hijack selection or rely on swipe alone.

UX-DR18: Browse state profile: distinguish empty inventory from no matches; preserve search on failed refresh, show stable existing results with honest busy state, and offer supported retry/date/filter correction. Offline content cannot promise current price/stock; private Saved requires authentication.

UX-DR19: Detail state profile: use existing not-found/access handling for unavailable/deleted/private records; reserve photo/summary geometry and do not fabricate optional facts or leak private-home address/contact.

UX-DR20: Selection state profile: explain missing or invalid dates/party/offer, age/pet/occupancy/stay limits. Announce recalculated totals politely without moving focus; preserve valid selection after sold-out/quote-changed/expired-hold outcomes. Offline cannot confirm stock/price.

UX-DR21: Form state profile: show starting instructions and effective defaults; retain submitted scope while pending, preserve entered work after rejected save and direct focus from error summary to fields. Never claim unsaved work persisted or queue offline writes.

UX-DR22: Identity state profile: retain existing OTP sending/verification/rate-limit and expired/invalid/session recovery. Preserve only safe trip context through login, then revalidate/requote; unauthorized private records are withheld.

UX-DR23: Records state profile: zero is distinct from unknown, empty lists offer a supported next step, loading retains layout/context, failed reads can retry and stale private content is never a fallback for another identity/capability.

UX-DR24: Review state profile: distinguish not submitted, pending, corrections requested, rejected and approved; retain itemized evidence, revision and actor/reason history. Permission failure forbids the command; unsent corrections do not count as reviewer notifications.

UX-DR25: Money state profile: distinguish absent/zero/pending/verified/failed/unknown transactions. Keep processing non-final with persistent references and recovery. Gateway disablement preserves browsing and reconciliation of pinned existing attempts/refunds; cached pages do not imply freshly verified money/availability.

UX-DR26: Press/filter/selection interactions acknowledge input immediately with inherited styles and visible focus. Hover is optional; keep trip context, stable control position and supported scroll/list context; do not animate price changes as discounts or introduce forced scrolling/choreography.

UX-DR27: Dialogs/disclosures have labelled content, appropriate initial focus/containment, Escape/close and focus return. Preserve current calendar nesting; short interruptible opacity/translation is used only when it improves orientation.

UX-DR28: Motion uses existing timing/easing. The 150-220ms ease-out range is a starting test assumption if new motion is needed, not a fixed approved runtime requirement. Reduced motion removes translation/scale and nonessential autoplay while preserving feedback; no new animation dependency or decorative financial confetti/parallax.

UX-DR29: Accessibility: semantic controls/links and visible labels/names/errors expose selected/expanded/pending state. Meaningful quote/status changes announce politely, critical errors remain identifiable, and color alone never communicates state. Support keyboard reading order, reduced motion and forced colors.

UX-DR30: Keep at least 44px primary touch targets/spacing and readable phone fields; hover/swipe is never the only interaction. Sticky booking controls honor safe areas, keyboard and focused-element visibility.

UX-DR31: Zoom/reflow stacks details/price without clipped totals or policies. Necessary financial tables scroll locally in labelled accessible regions; pages do not overflow horizontally. Verify focus/error links, calendar keyboard operation, image alternatives and screen-reader names manually as well as automatically.

UX-DR32: Reuse current responsive breakpoints. Validate 320/390/768/1024/1440px, keyboard/zoom, then actual iOS Safari/Android Chrome; retain mobile-friendly guest tasks and desktop-capable owner/admin tools without cramped multipane layouts. Device emphasis remains to be validated; no native/offline booking app is implied.

UX-DR33: Owner Rooms/Rates direction: preserve current wizard, editable field grouping, explicit defaults/overrides and optional-detail disclosure; preserve production room counts/guards and server validation. Approved specimen save buttons are disabled examples, not implemented commands.

UX-DR34: Admin verification direction: show evidence, performed checks, revision-specific corrections/reasons and review history alongside separate publication/bookability prerequisites. Retain authorized caretaker assignment/evidence scope; do not invent a new caretaker product or queue taxonomy.

UX-DR35: Admin support direction: retain booking/payment/refund context and evidence intake; distinguish public guest reply from private internal note. Internal-note commands cannot change case/booking/financial state. Urgent denied-access/safety/stranded intake does not wait for owner response or imply automatic refund/cancellation.

UX-DR36: Guest checkout direction: emphasize the full selected-trip total, meaningful guest/room labels, existing arrival/request/invoice fields and explicit accepted terms. Preserve recovery and full-upfront/manual-before-payment rules; visual approval does not adopt illustrative prices/taxes.

UX-DR37: Guest status direction: provide authoritative checking/confirmed/cancellation/refund views with amounts/references and honest next action. Test labels and actual bank zero remain explicit; unknown payment never invites another charge before reconciliation permits it.

UX-DR38: Admin refund decision direction: show additional guest money due first on phones, separately from cumulative target, proportional/owner-funded responsibility, historical reassignment and projected owner recovery. Require reasoned capability-checked confirmation; static historical mock allocations are not launch quotes.

UX-DR39: Expose approved time contracts where relevant: up to24h owner response then12h payment capped arrival; issue target72h from discovery with exceptions; initial human response12 elapsed hours separate from resolution/urgent coverage; review30day/day7 reminder; correction7/15/30days; receipt-based recovery day5/day7 without link-reset.

UX-DR40: Preserve all 20 IA surfaces and their assigned state profiles, including supporting guest privacy/notifications/policies, owner support/team/settings and admin operations/content/access/audit. Written-only approved surfaces inherit their existing layouts and required behavior; mock absence does not remove them from testing.

UX-DR41: Test complete-flow WCAG2.2AA and Core Web Vitals good targets: field p75 mobile/desktop LCP<=2.5s, INP<=200ms, CLS<=0.1 when traffic permits, with lab checks before launch. Measure backend load/device ergonomics separately; inherited tokens or mock checks are not conformance/performance evidence.

UX-DR42: Use plain scope-specific copy and supported next steps; no fake scarcity, guarantees, ratings, hidden charges or misleading verification. Keep private-home address/owner contact for authorized confirmed guests under existing rules; public hotel business address may remain public. Publish truthful support/urgent options without invented24/7, instant bank-credit or automatic rebooking promises.

### FR Coverage Map

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

## Epic 1: Owners prepare properties and receive trustworthy review

Owners can privately prepare listings and receive reasoned evidence review, corrections and same-listing resubmission. FR1-5; CAP-1. Individual stories below are approved for planning, not marked implemented.

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

**Scope and implementation evidence:**

- **Includes:** the existing create-draft path, private draft read/save access, supported form recovery and status wording. Preserve existing request duplicate guards; no new universal idempotency system is implied.
- **Excludes:** identity-provider integration, review decisions/evidence-request changes, correction resubmission/reminders, property publication, new categories/policies, checkout and all financial/provider operations. Their existing behavior must not regress.
- **Dependencies:** existing owner authentication and draft services only; no dependency on future Story 1.2 or a later epic. A new shared package or broad schema setup is unnecessary.
- **Source inspected:** backend `src/services/auth/listings.js` has `createListingFromBasics`, pending-owner draft access, owner-scoped edit lookup and version checks. Frontend `components/partner/listing/DraftSave.jsx` and `NewListingStart.jsx` provide existing draft and recovery controls. This is code-presence evidence, not a newly passed end-to-end test. Check current source and repository instructions when implementing.
- **Verification scope:** focused service/API checks with isolated test data plus representative running-app form/keyboard validation; do not contact owners, apply production migrations or invoke financial providers. Record unavailable checks honestly. Story approval records the backlog contract, not implementation completion or release readiness.

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

**Scope and implementation evidence:**

- **Includes:** read-only inspection of already submitted records, existing documents/check history, revision identity, truthful verification wording and private-file access behavior.
- **Excludes:** new owner evidence requests, uploaded-video intake, visit scheduling/recording changes, correction/rejection/approval commands, publication rules and new legal/checklist sufficiency decisions. Retained working commands must not regress.
- **Dependencies:** current submitted-listing intake, admin queue and document services, plus preserved owner draft behavior from Story 1.1. Existing submitted records or isolated submission fixtures make this usable without a future story; no new submission workflow is deferred as a hidden dependency.
- **Source inspected:** backend `src/services/admin/verification.js` records exact submitted revision and performed-check concepts; `src/services/auth/documents.js` retains private document metadata and replacement history; frontend `components/admin/VerificationPanel.jsx` contains existing verification controls. Current `video_call` support is not proof of uploaded-video support. These are read-only findings, not new end-to-end acceptance.
- **Implementation boundary:** existing checklist/publication comments may describe historical rules. Final PRD/addendum/register govern the target; this read-only slice must not invent mandatory physical visits, waive identity verification, or certify locally sufficient ownership documents. Those evidence decisions remain their documented gates.

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

**Scope and implementation evidence:**

- **Includes:** one cohesive request -> private upload -> explicit owner response -> reviewer inspection workflow, with durable portal/email notices and revision-aware history. Only records/storage extensions needed for this slice are introduced.
- **Excludes:** new physical-visit scheduling/recording, correction/rejection/approval decisions, automatic publication, mandatory video for every listing, identity-provider integrations, financial actions and a general media-platform rewrite. Existing supported behavior remains intact.
- **Dependencies:** approved Stories 1.1/1.2 and existing authentication, submissions, notification and private-media foundation. The owner response and reviewer inspection are delivered here; neither depends on a future request/response story. Existing correction resubmission remains separately preserved.
- **Source evidence:** `admin/verification.js` supports video-call/physical visit concepts; that does not establish video-upload intake. `auth/documents.js` and `uploads/cloudinary.js` provide private-document patterns, with authenticated private assets distinct from public listing photography. Uploaded-video capability is planned and must be checked against actual configured storage support.
- **Feature contract before dependent work:** define the request/response shape, capability checks, allowed video formats/size limits, private resource handling, submission binding, duplicate behavior and cleanup in this slice before frontend/backend implementation diverges. Do not invent numerical limits or a new storage provider from this planning document. Validate retention/access terms under the existing specialist/privacy gate before applicable release.


### Story 1.4: Arrange and record selective physical verification

As a reviewer,
I want to schedule and record a physical check when warranted,
So that verification claims match performed checks.

**Requirements:** FR2; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR13, UX-DR14, UX-DR24, UX-DR34; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 1.2. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; applicable release evidence remains required.

**Acceptance Criteria:**

**Given** a submission needing a physical check,
**When** authorized staff schedule or change a visit,
**Then** assignment, property-local time, scope and reason are recorded without requiring physical visits for every property.

**Given** a completed assigned visit,
**When** authorized staff record evidence and outcome,
**Then** checklist, findings, actor, exact submission revision and required existing location evidence persist; incomplete/failed checks cannot become passed physical verification.

**Given** stale data or an unauthorized command,
**When** the operation is attempted,
**Then** capability/version guards reject it without losing history or exposing private findings through owner notices.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 1.5: Send specific property correction requests

As a reviewer,
I want to identify missing or incorrect submitted items,
So that owners know exactly what to correct.

**Requirements:** FR3; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR10, UX-DR14, UX-DR15, UX-DR24, UX-DR34; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 1.2. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; applicable release evidence remains required.

**Acceptance Criteria:**

**Given** a current deficient submission,
**When** the reviewer confirms itemized corrections,
**Then** a reasoned revision-bound request/history and durable portal plus tracked email intent are saved.

**Given** the owning user opens the request,
**When** the correction detail loads,
**Then** actionable items and permitted evidence are visible without internal notes or another owner's records.

**Given** repeat clicks, stale versions or email failure,
**When** request delivery is retried,
**Then** no duplicate logical request occurs, changed scope requires fresh review and email failure does not erase the portal request.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 1.6: Save corrections privately and explicitly resubmit

As a owner,
I want to correct and resubmit the same listing,
So that the team can recheck changes without confusing saves and submissions.

**Requirements:** FR3, FR5; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR10, UX-DR21, UX-DR24, UX-DR34; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 1.1, 1.5. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; applicable release evidence remains required.

**Acceptance Criteria:**

**Given** a requested correction or existing rejected listing,
**When** the owner saves permitted changes,
**Then** the same listing retains a private draft; save does not submit, alert reviewers, approve or publish.

**Given** the owner is ready to respond,
**When** Resubmit for review is explicitly confirmed,
**Then** current revision and response transition persist once with durable reviewer portal/email intent and earlier rejection/correction history.

**Given** a stale version, failed command or expired session,
**When** resubmission is recovered,
**Then** safe entered work and acknowledged state remain distinguishable; ownership/version guards prevent overwrite and invented submission success.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 1.7: Deliver response and unanswered-correction alerts

As a reviewer,
I want to receive reliable correction milestones,
So that unanswered work is followed up without automatic rejection.

**Requirements:** FR4; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR14, UX-DR16, UX-DR24, UX-DR39; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 1.5, 1.6. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; applicable release evidence remains required.

**Acceptance Criteria:**

**Given** a request still awaiting resubmission,
**When** elapsed days7,15,30 are reached from the original sent instant,
**Then** each applicable portal/email milestone is durably generated once, not as successive intervals.

**Given** a request is resubmitted or closed,
**When** due work is scanned,
**Then** future unanswered notices stop; draft saves alone do not stop them and response alerts identify the actual submission.

**Given** restart, missed tick or delivery error,
**When** processing resumes,
**Then** persisted business timestamps and deduplication preserve milestones with visible failures and no automatic rejection.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 1.8: Reject with reason and retain same-listing history

As a reviewer,
I want to reject an unsuitable submission directly,
So that owners understand the decision and can correct the same listing.

**Requirements:** FR5; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR13, UX-DR14, UX-DR15, UX-DR24, UX-DR34; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 1.2, 1.6. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; applicable release evidence remains required.

**Acceptance Criteria:**

**Given** a submission warrants rejection,
**When** an authorized reviewer confirms a reason,
**Then** no correction cycle is mandatory; owner-visible reason and actor/time/from/to status are appended without exposing internal notes.

**Given** a rejected listing is corrected,
**When** the owner explicitly resubmits,
**Then** the same identity and every earlier transition persist; review resumes without approval/publication.

**Given** stale/repeated decisions or unauthorized history access,
**When** the command or detail is requested,
**Then** capability/version checks prevent conflicting outcomes and keep history appropriately scoped.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

## Epic 2: Guests book and manage stays with clear money outcomes

Deliver the approved user outcome through the ordered stories below.

### Story 2.1: Approve ready properties and explain restrictions

As a reviewer,
I want to approve accurate complete supply,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR6; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR13, UX-DR14, UX-DR15, UX-DR24, UX-DR34; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 1.2, 1.8. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Local proof sufficiency and supported category readiness remain required.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Owner identity and current property evidence must be approved; publication is automatic only with complete supported pricing, photos, policies, capacity and future sellable availability; approval and bookability remain distinct.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Incomplete setup, pauses or admin restrictions cannot be bypassed by activation; material identity/authority/location/unit edits require recheck without rewriting booked snapshots.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.2: Configure and quote one inclusive service fee

As a finance admin,
I want to quote a transparent full-trip total,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR8, FR12; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR12, UX-DR15, UX-DR25, UX-DR36; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.1. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Actual contracted gateway costs and accounting remain gates.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Global launch5percent or authorized owner-wide override applies once to rental plus paid extras before tax, excluding tax and fee itself; known mandatory charges and tax status reconcile.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Hotel zero-fee paths must reconcile; audit actor/reason/old/new/effective time; no owner/category/property fee permission, guest gateway surcharge or ordinary owner gateway deduction; accepted quotes retain allocations.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.3: Retain accepted trip terms through login

As a guest,
I want to recover and accept the actual quote,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR12, FR15, FR24; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR10, UX-DR12, UX-DR20, UX-DR22, UX-DR36; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.2. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Existing authentication contracts retained.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Server amounts, policies, allocations, rooms/nights/inclusions, timezone and environment are explicit; valid selection survives supported authentication/navigation.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Changed prices/policies/eligibility require fresh quote and acceptance; no silent substitution; account switches isolate private forms/caches and preserve existing saved/account/privacy behavior.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.4: Hold eligible inventory and respect booking modes

As a guest,
I want to reserve stock without overselling,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR23; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR11, UX-DR20, UX-DR25, UX-DR39; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.1, 2.3. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Disposable database concurrency evidence required.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Guarded listing/order/visit/reservation protocol creates eligible holds; manual approval precedes payment; up to24h response then12h pay is capped by arrival.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Decline/expiry releases matching holds; settings do not convert pending requests; both race orders reject overlap/room oversell and expired stock cannot reclaim sold inventory; provider calls stay outside locks.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.5: Verify full payment and recover uncertain checkout

As a guest,
I want to pay once and recover authoritative outcome,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR15, FR23, FR24; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR12, UX-DR20, UX-DR25, UX-DR36, UX-DR37; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.3, 2.4. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Provider/account and signed hosted Test evidence before financial sign-off; no Live authorization.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Verified provider account/environment/references/currency/amount/state and guarded eligible inventory confirm full payment; approval alone never confirms.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Duplicate/out-of-order callbacks use durable pinned identity; late ineligible capture creates visible resolution/refund obligation without reacquisition; timeout is unknown, disablement preserves browsing and Test bank collection is zero.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.6: Configure percentage cancellation and plan inheritance

As a owner,
I want to set effective booked cancellation terms,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR9, FR10; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR10, UX-DR12, UX-DR15, UX-DR33; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.3. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Tax component acceptance remains specialist-gated.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Contiguous nonoverlapping percentage-only windows cover pre/at/post-check-in with equality semantics; hotel default applies unless explicit plan override; mixed rooms retain their own policy.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Room/meal differences do not force duplicate policies; accepted versions/timezone remain; voluntary early departure is owner-offered including0; no-show alone triggers no refund.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.7: Preview exact booked-policy refunds

As a guest,
I want to understand cancellation consequences,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR7, FR9, FR10, FR11; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR12, UX-DR15, UX-DR25; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.5, 2.6. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Specialist accounting does not alter guest entitlement silently.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Full paid rental/fee/tax/extras basis uses ordinary proportional owner/Rentra responsibility and booked local cutoffs; preview binds scope/actor/versions.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Integer paise stable largest remainder preserves shared allocation; zero-price lines get zero, all-zero nonzero weights error unless defined; completed/in-flight/unknown/dispute reimbursement caps apply; zero due creates no provider call.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.8: Confirm cancellation and reserve eligible refund

As a guest,
I want to cancel entitled scope without routine admin review,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR9, FR11; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR15, UX-DR16, UX-DR25, UX-DR37; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.7. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; No Live refund initiation until provider/funding gates pass.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Explicit current-preview confirmation commits booking/inventory changes and positive eligible refund intent atomically using booked allocations; routine admin approval is unnecessary.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Replay returns recorded outcome, changed payload conflicts, stale consequence requotes; cancellation stays distinct from refund completion and unsupported provider outcomes preserve entitlement.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.9: Dispatch refunds and reconcile verified outcomes

As a finance operator,
I want to resolve refund uncertainty without blind retries,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR7, FR11, FR15; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR14, UX-DR16, UX-DR25, UX-DR37; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.8. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Actual partial/old-payment and hosted capability evidence required.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Dispatch identity is persisted before network outside domain locks and safe provider idempotency is reused while reserved amount remains.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Expired lease does not prove unsent; reconcile possibly dispatched work before create, disable unsafe automatic redispatch, verify scoped outcomes and expose old-payment restrictions/estimates without bank-credit guarantees.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.10: Cancel selected rooms without repricing retained rooms

As a guest,
I want to keep unaffected rooms unchanged,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR9, FR10, FR11; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR9, UX-DR12, UX-DR15, UX-DR25; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.6, 2.7, 2.9. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Existing common financial gate applies.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Each selected room uses its own booked policy and attributable component/shared-charge allocation with prior/reserved refunds counted.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Release only affected room nights; keep retained rooms dates/terms/price; concurrent/stale/replayed/zero-due actions cannot duplicate money or release other stock.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.11: End stays using booked unused-night rules

As a guest,
I want to request an eligible voluntary early departure,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR9; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR12, UX-DR15, UX-DR20, UX-DR25; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.7, 2.9, 2.10. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Unused-night acceptance fixtures and accounting required.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Only booked nightly starts strictly later than confirmed request are unused; current/commenced/equality nights are consumed with original fee/tax/extra allocations and no hourly proration.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Explicit confirmation ends affected scope early and releases only unused future inventory; no confirmation/no-refund means no automatic entitlement; property/access incidents remain separately reviewable.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.12: Control effective payout modes and eligibility

As a finance admin,
I want to set global and owner-wide payout behavior,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR13; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR14, UX-DR15, UX-DR25; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.5, 2.9. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Provider eligibility remains required.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Launch global Auto and optional authorized owner override share eligibility after verified capture and confirmed booking; no check-in/Tuesday wait; audit changes.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Recheck current mode for queued uninitiated work; owners cannot set it; cancellation/refund prevents incompatible new payout and mode toggles do not cancel/duplicate initiated or uncertain transfers.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.13: Initiate and reconcile eligible owner payouts

As a owner,
I want to track proceeds separately from bank completion,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR13, FR15; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR14, UX-DR16, UX-DR25; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.9, 2.12. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Funding/exposure, provider transfer, accounting and hosted evidence block financial acceptance.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** One coordinated reserved transfer with stable provider identity dispatches outside locks under current Auto or authorized Manual eligibility.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Payout/refund and late-transfer race orders preserve entitlement/caps; Test bank proceeds stay zero; uncertainty stays visible and no future offset/owner auto-debit occurs.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.14: Pause new bookings while retaining commitments

As a owner,
I want to stop new admissions without cancelling stays,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR6, FR23; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR13, UX-DR14, UX-DR15, UX-DR25; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.1, 2.4, 2.13. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Existing owner/admin restrictions remain composed.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Deactivation preview separates stop-new-only versus cancel-upcoming and unpaid requests versus confirmed stays.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Stop-new-only retains confirmed stays and unpaid holds until decline/expiry but blocks new approvals/confirmations; capture races resolve without overbooking or uncaptured refunds.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.15: Cancel upcoming owner stays with full entitlement

As a owner,
I want to honor full guest refunds on owner cancellation,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR6, FR7; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR14, UX-DR15, UX-DR25, UX-DR37; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.9, 2.10, 2.13, 2.14. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Real money remains gated.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** No prior admin approval is needed; preview selects strictly future booked check-in using property timezone; exact check-in/in-progress/completed are excluded.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Full fee/tax/extras paid target counts prior/reserved refunds; unpaid requests release without refund; portal/email notices and bulk results show each outcome including late capture/transfer exceptions.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.16: Show distinct guest owner and admin money records

As a guest and owner,
I want to understand each movement and next action,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR13, FR14, FR15, FR24; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR14, UX-DR16, UX-DR23, UX-DR25, UX-DR37; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.9, 2.13, 2.15. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; No preview is bank evidence.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Quoted rent/capture/refund/payout/environment have separate labels, components, tax context and durable references; existing account/record navigation remains.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Zero is not unknown; preserve filters/context, honest pending/failure and accessible feedback; backend capabilities/private cache isolation prevent cross-identity leakage.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.17: Assign owner recovery after funded guest refunds

As a finance admin,
I want to record outstanding ordinary refund responsibility,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR14; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR14, UX-DR15, UX-DR25; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.9, 2.13, 2.16. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Owner terms/accounting remain gated.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Completed Rentra-funded guest refund and verified prior owner proceeds determine ordinary proportional obligation excluding Rentra refundable fee, subtracting verified recovery.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Lock current obligation and reserve uncertain movements; audit current-version adjustments; pending owner recovery neither delays entitlement nor undoes completed guest refund or offsets future payouts.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.18: Generate and verify owner repayment links

As a owner,
I want to pay the assigned obligation separately,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR14; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR12, UX-DR14, UX-DR15, UX-DR25; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.17. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Repayment product/security and signed hosted Test evidence required.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Authorized link binds owner/obligation/outstanding amount; creation/send is not collection; only matching verified active payment reduces debt.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Partial/unknown stays unsettled, in-flight reservations prevent overcollection and excess enters admin return/reconciliation not revenue or cross-debt allocation; replacement/expiry is not a due reset and no auto-debit occurs.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.19: Record evidenced repayment notice receipt

As a finance operator,
I want to retain an auditable debt clock,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR14; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR14, UX-DR16, UX-DR25, UX-DR39; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.18. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Actual receipt channel/privacy capability must be validated.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Earliest confirmed delivery or authenticated notice view/ack starts day5 reminder/day7 due with event type/time/evidence; absent evidence admin confirms actual receipt.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Send success cannot start blocking; late earlier evidence corrects milestones audibly without replacing/resetting debt clock or cancelling confirmed stays.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.20: Restrict overdue owners and clear only settled debt

As a owner,
I want to regain eligible access after verified full repayment,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR6, FR14, FR23; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR13, UX-DR14, UX-DR25, UX-DR39; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.1, 2.4, 2.18, 2.19. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Receipt/funding/provider gates still apply.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Durable day5 reminder/day7 due drives owner-wide restriction for any overdue blocking balance; guarded admission evaluates canonical debt at database time independent of stale worker projection.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Verified full repayment clears only that debt restriction; other overdue balances/owner pauses/review restrictions persist; partial/unknown, replacement links, activation or another listing cannot bypass guards; confirmed stays remain.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 2.21: Demonstrate financial release gates without unsafe enablement

As a finance operator,
I want to inspect commercial readiness evidence,
So that the approved booking and financial rules remain consistent and understandable.

**Requirements:** FR6, FR7, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR23, FR24; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR25, UX-DR37, UX-DR39, UX-DR41, UX-DR42; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.5, 2.9, 2.10, 2.11, 2.13, 2.15, 2.18, 2.20. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; External evidence blocks financial release; fail-closed engineering can proceed.

**Acceptance Criteria:**

**Given** an authorized user and current supported record,
**When** the described operation is reviewed and confirmed,
**Then** Acceptance records both race orders, stale/replay/takeover, dispute caps, room/unused-night allocation, receipt ordering and debt restrictions in isolated/hosted Test environments.

**Given** a relevant boundary, state change or competing operation,
**When** the edge case is processed,
**Then** Funding/exposure limit/monitor/breach action, specialist terms, actual provider and staffing evidence remain owned blockers; proposedINR40000 is not funded/adequacy proof; disable initiation without disabling investigation, and preserve compatible migration/restore and worker/delivery/unknown/exposure alerts.

**Given** a failed, stale, unauthorized or repeated request,
**When** the command is retried or recovered,
**Then** the documented contract returns a truthful scoped outcome without silent state corruption; applicable permission, version, duplicate and UI recovery checks pass.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

## Epic 3: Guests find the right stay with accurate accommodation details

Deliver the approved user outcome through the ordered stories below.

### Story 3.1: Browse categories while retaining guest search context

As a guest,
I want to optionally filter suitable stays,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR8, FR24; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR7, UX-DR8, UX-DR18, UX-DR19, UX-DR20; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.2, 2.3, 2.4. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Existing guest identity and financial gates preserved.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Category is optional; preserve location/dates/party and removable filter selections through navigation/login; server-backed dated inclusive totals and honest ratings/verification remain.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Distinguish no inventory/no match/failed refresh, retain valid inputs and supported retry; cached/offline data cannot promise current stock/price or leak private-home contact/address.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 3.2: Compare photo-first rooms and complete facilities

As a guest,
I want to understand room differences on phone and desktop,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR8, FR22; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR8, UX-DR9, UX-DR17, UX-DR19, UX-DR20; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 3.1. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Approved mock comparison and actual runtime usability required.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Real photos lead on phones; facts left/full-trip total right where readable and stack under narrow width/zoom; identity, beds, meals, policy, party and quantity guards remain.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Full facilities and labelled accessible gallery replace silent truncation; missing images are honest, Save/gallery does not hijack selection, changed totals announce without moving focus or hiding mandatory charges.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 3.3: Configure accurate rooms offers and inclusions

As a owner,
I want to describe physical capacity and promised services,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR22; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR9, UX-DR10, UX-DR33; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.6, 3.2. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; No generic new wizard or theme.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Existing wizard records room quantity, bed types/counts, real occupancy, room versus hotel facilities, photos and per-plan meal inclusions with visible defaults/overrides.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Double-only three-adult configuration needs real permitted additional sleeping place; extra-person price is not fictitious bedding; snapshot room/facility/meal/bedding promises and preserve failed-save work.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 3.4: Quote fixed or percentage bedding per night

As a guest,
I want to understand all required sleeping-place charges,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR22; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR9, UX-DR12, UX-DR20, UX-DR33; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.2, 2.3, 3.3. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Accepted bedding fixtures required.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Required beds/mattresses times nights use fixed price or each night's room-only percentage base before meals/tax/fee; feed paid-extra fee/refund allocation.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Double versus double-plus-single and included extra-person bedding produce correct quantity without double charge; unavailable bedding/capacity is rejected and stale rate changes requote.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 3.5: Apply effective date rates and safe calendar edits

As a owner,
I want to control intended nightly prices,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR22, FR23; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR10, UX-DR11, UX-DR33; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.4, 3.3, 3.4. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Existing calendar contracts retained.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Weekday/weekend/date overrides determine effective nightly room/linked offer and percentage pricing; bulk percentage applies current effective rates including overrides.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Holiday shortcuts only select dates; explicit change preview/version checks, open/blocked labels, keyboard/nested dialogs and dirty guards remain; booked prices never change retroactively.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 3.6: Configure explicit child age and accommodation policies

As a owner,
I want to separate child tariffs from actual accommodation,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR16; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR10, UX-DR20, UX-DR33; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 3.3. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Actual check-in/supervision and cot supply evidence before family release.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Infant/child bands and adult-rate threshold cover accepted ages without gaps/overlaps; free/fixed/percentage rules and property default/explicit room-plan override are disclosed and versioned.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Actual age is not changed by adult-rate treatment; existing-bed sharing, meals/cots/beds and inclusions are distinct; supervising-adult eligibility and required cot inventory must be validated rather than universally assumed.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 3.7: Price actual child ages with room-local adults

As a guest,
I want to receive a complete family quote,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR16; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR9, UX-DR12, UX-DR20; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 3.4, 3.5, 3.6. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Validated family eligibility and inventory required.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Preserve whole-year ages at check-in including0 through availability/allocation/confirmation; percentage uses that night's room-only price divided by room-local adult count times percent and qualifying children with deterministic paise rounding.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Exclude meals/beds/tax/fee/separate extra-adult supplements from percentage base; reject zero-adult room and unavailable required cot; free children still count physically, adult-priced minors do not become supervising adults and inclusions are not double charged.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 3.8: Configure ordinary pet eligibility and fee units

As a owner,
I want to set predictable pet limits and charges,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR17; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR10, UX-DR12, UX-DR33; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.2, 3.3. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Specialist assistance-animal accommodation/exemption/documentation remains required.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Across launch accommodations owner chooses allowed/not-allowed, applicable limits, free or per-stay/per-night/per-pet/per-pet-night fee; no on-request workflow.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Effective new quotes use versioned policy and earlier bookings retain terms; assistance animals are separate and cannot be automatically blocked/charged as ordinary pets.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 3.9: Declare pets and include their complete trip charge

As a guest,
I want to book eligible accommodation with pets,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR8, FR17; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR7, UX-DR9, UX-DR12, UX-DR20; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 3.1, 3.8. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Same specialist pet-policy gate applies.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Declared ordinary pet count is retained through search/selection/quote; not-allowed/limit violations cannot bypass policy and applicable charge is inside the total under normal booking mode.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Date/count/selection changes requote one component with normal paid-extra fee/refund allocation; free is valid and assistance-animal cases receive distinct truthful handling without invented exemptions.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 3.10: Configure exclusive whole-apartment stays

As a owner,
I want to describe and price an apartment as one unit,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR18; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR10, UX-DR11, UX-DR33; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.1, 2.3, 2.4. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Actual supported duration/lead-time/local boundary before apartment release.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Bedrooms/beds/bathrooms/facilities and all occupants are explicit with owner min/max nights, arrival-date/day minimums, check-in/out, optional turnover buffer and disclosed one-off per-stay cleaning including zero.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Validate supported durations/local/provider constraints without universal28-night cap; no individual rooms, lease/installment product or change to existing farmhouse/villa booking units is inferred.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 3.11: Book apartments with exclusive stock and buffers

As a guest,
I want to reserve an entire eligible apartment,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR8, FR18, FR23; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR7, UX-DR12, UX-DR20, UX-DR36; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.10, 2.11, 3.9, 3.10. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Apartment eligibility and concurrency evidence required.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** All occupants, min/max/arrival rules and preparation buffer determine whole-unit quote/hold; one-off cleaning/extras/fee are inclusive and auto/manual/full-upfront semantics use shared booking core.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Concurrent requests cannot overlap exclusive reservations; cancellations/early departure use original component allocations and release only eligible scope, preserving accepted history.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 3.12: Verify suitable-stay journeys across categories and devices

As a guest,
I want to complete selection without losing context,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR8, FR16, FR17, FR18, FR22, FR24; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR7, UX-DR8, UX-DR9, UX-DR10, UX-DR11, UX-DR12, UX-DR17, UX-DR18, UX-DR19, UX-DR20, UX-DR33, UX-DR40, UX-DR41, UX-DR42; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 3.2, 3.5, 3.7, 3.9, 3.11. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Missing device/traffic/load evidence remains open rather than certified.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Representative farm/villa/hotel/apartment fixtures exercise party/age/pet/bedding/meal/date eligibility, totals and accepted snapshots across auth/navigation and honest unavailable states.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Record320/390/768/1024/1440 keyboard/zoom/reflow plus actual iOS/Android/screen-reader evidence; targetWCAG2.2AA and p75 mobile/desktop LCP<=2.5s INP<=200ms CLS<=0.1 with lab then sufficient field data, separately measured backend load.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

## Epic 4: Guests get booking-linked help and admins resolve incidents

Deliver the approved user outcome through the ordered stories below.

### Story 4.1: Raise a contextual issue without waiting for the owner

As a guest,
I want to report a property or access problem,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR19; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR10, UX-DR14, UX-DR21, UX-DR35; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.16. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; No new parallel ticket/email-ingestion product.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Existing booking-linked intake collects category, discovery time, affected rooms/nights, desired remedy and credible available evidence with a durable reference; no owner response or impossible photo is prerequisite.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Normal72h-from-discovery target permits reviewed inability-to-report exceptions and prompt access/safety reporting; duplicate/error recovery and authorized private contact/address scope remain; filing does not cancel/refund.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 4.2: Route urgent cases with truthful support commitments

As a support operator,
I want to receive immediate urgent escalation,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR19; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR16, UX-DR21, UX-DR35, UX-DR39, UX-DR42; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 4.1. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Founder/operations support and urgent/on-call coverage before guest support release.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Denied access/safety/currently-stranded classification creates immediate durable routing independently of owner response with truthful contact options.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Track initial human response within12 elapsed hours separately from resolution; actual published support/on-call ownership is required, with visible aged/unassigned/failed delivery and no invented24/7, rebooking or bank-credit guarantee.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 4.3: Separate guest replies from private internal notes

As a support operator,
I want to communicate to the right audience,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR19, FR20; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR14, UX-DR15, UX-DR21, UX-DR24, UX-DR35; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 4.1. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Backend command audience/state boundary required.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Public replies are explicit guest-visible persisted communications under existing supported channels; internal notes remain private with separate command permissions.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Internal-note command cannot change case/booking/financial state and offers no such controls; stale/unauthorized/failed send preserves truthful pending/error recovery without invented delivery or leaked evidence.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 4.4: Review evidence and preview cumulative incident remedies

As a finance reviewer,
I want to decide a reasoned target and responsibility,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR20; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR14, UX-DR15, UX-DR25, UX-DR35, UX-DR38; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.7, 2.17, 4.1, 4.3. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Accounting and owner terms cannot be invented.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Evidence assessment and feasible owner response do not block urgent intake; reasoned denial or cumulative0-100percent target and proportional/owner-funded responsibility are separate; ordinary entitled refunds stay automatic.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Preview prior/in-flight/dispute reimbursements, additional guest due, historical responsibility reassignment and remaining recovery separately; lower target cannot claw back, zero due creates no provider call and stale consequences require review.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 4.5: Execute incident awards through the owned financial core

As a finance admin,
I want to apply the reviewed remedy without paying twice,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR20; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR15, UX-DR16, UX-DR25, UX-DR38; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.9, 2.18, 2.20, 4.4. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Enforceable owner consent, tax/accounting, funding/provider evidence before financial acceptance.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Current authorized reasoned decision creates only additional guest refund under current obligation; cancellation and provider completion remain separate facts.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Audited cumulative owner-funded reassignment can cover prior proportional fee and exceed original proceeds while retaining Rentra fee; subtract verified prior recovery, preserve history and reconcile disputes/late transfers/replay without extra guest refund, owner auto-debit or future offset.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 4.6: Track case and financial resolution separately

As a guest and support operator,
I want to see the persisted decision and supported next action,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR19, FR20; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR13, UX-DR14, UX-DR16, UX-DR23, UX-DR25, UX-DR35, UX-DR37, UX-DR38; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 4.2, 4.3, 4.5. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Existing operations/audit/supporting surfaces preserved.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Permitted guest/owner/admin views show reasoned case outcome, additional money, distinct payment/refund/recovery progress and references.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Unknown/unsupported financial outcomes remain actionable for investigation without blind retry or fabricated live links/credit dates; capability/version/privacy/cache controls retain list context and internal-note isolation.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

## Epic 5: Genuine guest reviews build trustworthy marketplace feedback

Deliver the approved user outcome through the ordered stories below.

### Story 5.1: Publish genuine eligible stay reviews after checks

As a guest,
I want to review genuine booked experience,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR21; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR8, UX-DR14, UX-DR16, UX-DR21, UX-DR23; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 2.16. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Ordinary review baseline retained.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Booking ownership, duplicate, relevance/content/privacy/abuse/spam/manipulation checks allow ordinary eligible reviews to publish within30day booked-checkout window without owner approval.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** No-show/cancellation alone is not firsthand experience; honest new-listing/count and failed-form recovery remain, flagged content routes to moderation without universal admin preapproval or external/fabricated scores.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 5.2: Review arrived-but-unable-to-stay eligibility

As a moderator,
I want to assess case-linked arrival/access experience,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR21; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR14, UX-DR15, UX-DR21, UX-DR24; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 4.1, 4.6, 5.1. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Review moderation/eligibility contract required.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Authorized case-evidence review records reasoned eligibility exception or denial with equivalent case-linked stay endpoint and actual experience scope.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Approved exception still uses ordinary content checks and cannot imply full-stay assessment; cancelled/no-show status alone, duplicate or unauthorized requests cannot create eligibility or leak private case material.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 5.3: Invite reviews and send one scheduled reminder

As a guest,
I want to respond within the actual review window,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR21; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR16, UX-DR23, UX-DR39; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 5.1, 5.2. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Delivery channel configuration must be demonstrated.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Booked property-local checkout or approved case endpoint anchors30day window, invitation after endpoint and one day7 reminder while eligible/unsubmitted.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Submission/ineligibility/closure stop reminders; restart/retry uses durable timestamps/deduplication and tracked delivery without treating send as read.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

### Story 5.4: Moderate reported reviews without owner veto

As a moderator,
I want to resolve real content violations fairly,
So that the approved stay experience remains accurate, private and recoverable.

**Requirements:** FR21; applicable NFR1-5 and AR1-16/AD-1-15. **UX:** UX-DR8, UX-DR14, UX-DR15, UX-DR21, UX-DR24, UX-DR42; shared UX-DR1-6,26-32,40-42.

**Dependencies:** 5.1, 5.2, 5.3. Only earlier stories or the existing supported baseline.

**Readiness:** Bounded implementation spec required; Existing review governance preserved.

**Acceptance Criteria:**

**Given** an authorized user and supported current context,
**When** the described operation is completed,
**Then** Authorized reasoned moderation handles flagged/reported privacy/abuse/spam/manipulation with retained history; negative rating alone is not a violation.

**Given** a relevant boundary or changed context,
**When** the exceptional case is processed,
**Then** Owner may report/dispute with evidence but cannot delete/veto/preapprove; honest counts and version/capability checks remain, public replies only if already supported and no reciprocal/imported-review product.

**Given** a failed, stale, repeated or unauthorized operation,
**When** the user retries or recovers,
**Then** the scoped contract gives truthful errors/recovery without lost acknowledged data, hidden success or privacy leakage; applicable focused checks are recorded.

**Delivery boundary:** Ratify the slice-specific existing/additive API, state, error and permission contract before dependent work. Reuse existing services and approved UX; create only records/migrations needed here. Demonstrate focused success, failure, stale/replay and authorization behavior as applicable. UI work includes shared labels/focus, pending/error recovery,44px primary targets, readable phone fields and responsive reflow. Record actual evidence and unresolved gates; completion never implies permission for Live money or production deployment.

## Story validation and implementation readiness

The user explicitly superseded repetitive approval checkpoints and authorized batch story creation plus implementation on26October. Coverage/dependency/template validation passes51 unique stories across five user-value epics, all24FR and42UX requirements, NFR/AR inheritance, three or more Given/When/Then cases per story and no forward dependencies or placeholders. The ordinary financial core is consolidated to avoid duplicate ownership; later category/incident/review changes extend existing contracts. No starter or all-tables-upfront story is introduced.

Final status applies to the planning backlog. Each story needs a bounded source-investigated build spec before coding. Financial provider/funding/exposure/specialist/receipt/staffing and category/device gates remain explicitly open; their release-evidence stories are not unconditionally ready for Live use. Story1.1 is selected first.
