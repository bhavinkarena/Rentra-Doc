---
title: "Rentra launch PRD"
status: final
created: 2026-10-25
updated: 2026-10-25
---

# PRD: Rentra launch

## Document purpose

Define testable launch requirements for Rentra's existing web marketplace, preserving working functionality and distinguishing code evidence from founder intent and unverified readiness. This is the finalized requirements baseline for UX and architecture. Owned funding, provider, accounting/legal and operational evidence gates remain before implementation sign-off or release of the affected flows; this is not deployment authorization or launch certification.

Source baseline: [product brief](../../briefs/brief-Rentra-2026-10-24/brief.md) and [supporting evidence](../../briefs/brief-Rentra-2026-10-24/addendum.md). Their founder decisions carry forward. The founder subsequently authorized batch market research and compatible defaults: the complete [83-entry question-and-answer register](market-questions-and-answers.md) records answers, primary evidence, Rentra synthesis and remaining business/evidence gates. Market differences do not silently override explicit Rentra decisions.

## Vision and launch scope

Rentra helps guests find a suitable rental with trustworthy information and reviews, while giving owners a place to offer their properties. The long-term vision is one marketplace for anything rentable. The founder's ambition is an independently owned million-dollar business; the measure and timeframe remain undefined.

The intended benefits are reliable listing information, straightforward booking, competitive total prices and useful choice. These are desired outcomes, not validated advantages. Early demand is expected mainly from leisure guests seeking farms/villas. Preserve the existing premium, trustworthy, relaxing, nature-oriented, modern and simple brand direction from `frontend/PRODUCT.md`; UX work must translate it without inventing ratings, guarantees or supply.

- Long-term vision: one marketplace for anything rentable.
- Launch: farms, villas, entire apartments and hotels. Ahmedabad is the probable starting market, dependent on owner supply.
- Initial audience: owners supplying properties and guests seeking leisure stays, especially farms/villas. Hotel and apartment customer segments need further validation.
- Free listings; owner subtotal plus a guest-paid Rentra percentage fee, calculated on rental plus paid extras before taxes. Admin sets a global default with owner-specific overrides. The approved launch global default is 5%; Rentra absorbs standard gateway costs from its service fee. Tax and exceptional-product settlement treatment still require validation.
- Manual team review before properties appear to guests; video optional unless reviewers need clarification. Verification claims must match performed checks.
- Preserve owner-managed availability and automatic/manual booking modes, default automatic; manual approval precedes payment.
- Hotel requirements include room types, detailed facilities and occupancy-consistent bedding. Extra bedding is charged per bed/mattress per night, fixed or percentage of each night's room-only price before meals, taxes and Rentra's fee; avoid duplicate charges for included bedding.
- Whole apartments are exclusive units with owner-configured maximum stay length; implementation support is unverified.
- Owner-controlled date pricing at launch. Automatic demand pricing is a post-launch priority.
- Milestone 0: five team-approved real properties. Milestone 1: five genuine bookings with successful payments. No fixed deadline or category quota.
- Entertainment and its research, vehicles, subscriptions and third-party identity APIs are later scope.

## Dependencies and launch readiness

The founder and one or two teammates operate verification and support. There are no established owner leads or commitments. Recruiting the first supply, testing onboarding with real owners and learning how guests find it must accompany the product work.

Before accepting real money, demonstrate the approved complete journeys, applied hosted migrations, appropriate provider/account setup, payout/refund/Recovery capabilities, financial reconciliation, support operations and funding for promised refunds. Validate owner terms and applicable tax/accounting treatment with the appropriate specialist. These are release dependencies, not newly asserted legal conclusions.

Retain the existing web architecture, routes, contracts and design system unless a confirmed gap requires change. Implementation belongs to downstream work after requirements and architecture validation; this document does not authorize a deployment or external financial action.

## User journeys

These named examples structure the founder's narrated flows; they are not evidence of interviewed customers.

### UJ-1: Raj gets his property approved and available to guests

Raj owns a property he wants to list on Rentra. He provides personal details and identity documents, and can prepare a private property draft while owner verification is pending. The team reviews owner/property evidence, requests video or a physical visit when further checks are needed, and may ask Raj to correct specified information or reject directly. Raj saves corrections privately, then selects "Resubmit for review"; the team is alerted and rechecks. Unanswered correction requests generate reviewer alerts on days 7, 15 and 30. Property approval plus verified owner identity and complete publication setup make the listing public automatically, subject to owner pauses and other restrictions. When making the property inactive, Raj chooses to stop new bookings only or also cancel upcoming stays without prior admin approval. Owner-cancelled upcoming stays carry full guest refund entitlement, including fees, taxes and paid extras; in-progress/completed stays are excluded. Refund and owner-recovery requirements follow FR-7 and FR-13-15; actual provider execution timing remains a validation gate; portal/email notices follow FR-7 and FR-19. Publication prerequisites and portal/email notices follow FR-1-6; exact document sufficiency still needs local operational validation.


### UJ-2: Priya finds and pays for a stay

Priya wants a villa near Ahmedabad for a weekend with friends. She enters location, dates and guest count, then searches. She selects a property and booking option, sees the quote and policies, and pays the full amount through Rentra. Use existing supported listing/search/checkout behavior as the baseline. Automatic mode confirms an eligible booking after verified payment; manual mode requires owner approval before payment. If Priya cancels, she previews the booked policy's refund and confirms before automatic initiation. If she arrives and encounters a property problem, she can contact the owner and raise a Rentra request; a discretionary issue refund requires review.

### UJ-3: Kunj reviews an incident and resolves the guest request

Kunj receives a guest's booking-linked issue request. The team assesses the issue before granting a discretionary refund, rather than accepting a claim as proof. Authorized admin can decline or enter a 0–100 refund percentage, preview the amount and choose usual proportional or owner-funded responsibility. Rentra returns approved guest funds through its account and tracks refund completion separately from cancellation and owner recovery.

### UJ-4: Raj repays his share after Rentra refunds the guest

If Raj was already paid, Rentra funds the guest refund first. Admin sends Raj a link for his assigned refund obligation, separately from later payouts. The system reminds him on day 5. If the obligation remains unpaid after the day-7 deadline, the system automatically blocks new bookings across his properties. Verified full repayment clears only that debt restriction; existing pauses and unrelated restrictions remain. There are no future-payout offsets.

## Glossary

- **Property:** a listing offered by an owner; hotel room types sit within a hotel property.
- **Owner:** the property supplier; Rentra controls fee and payout-mode overrides.
- **Guest:** the person booking and paying through Rentra.
- **Property approval:** the team's decision after required checks; distinct from owner verification and date availability.
- **Room type:** a hotel's category of interchangeable rooms with defined beds, occupancy and available quantity.
- **Rate plan:** the price/meal/cancellation offering attached to a room type.
- **Quote:** the authoritative price and policy review for selected dates, people, rooms and paid extras.
- **Platform fee:** Rentra's guest-added percentage of rental plus paid extras before taxes. This is the same Rentra revenue charge called commission in discovery, not an additional second fee. Payment-gateway processing cost is a distinct supplier expense.
- **Payout:** Rentra-to-owner money movement after verified guest payment.
- **Refund:** Rentra-to-guest return of paid money; initiation and completion differ.
- **Recovery:** owner-to-Rentra repayment of an assigned refund obligation, separately from payouts.
- **Ordinary cancellation:** guest cancellation governed by the booking's accepted policy.
- **Incident refund:** a discretionary remedy after admin reviews a reported issue.
- **Proportional responsibility:** owner and Rentra each return the selected percentage of their components.
- **Owner-funded responsibility:** owner bears the full approved incident refund, while Rentra retains its original fee.

## Features: owner onboarding and property review

The following requirements are captured from founder discovery. Additional conditions remain open; they are not implementation-completion claims.

### Owner draft access

#### FR-1: Prepare a private property draft during owner verification

Supports UJ-1.

An owner awaiting identity/application verification can enter and save a private property draft. The draft does not appear to guests. Owner approval and property approval remain distinct stages. Owners can prepare drafts and submit evidence while owner verification is pending, but owner identity verification must finish before property approval/publication. Preserve existing supported draft access.

### Property verification

#### FR-2: Review property evidence and request further checks

Supports UJ-1.

The review team can check submitted property information and documents, request a video upload when needed, and selectively conduct physical visits. Owners can receive a video request and upload the requested evidence. Verification records distinguish performed checks; approval without a physical visit must not imply physical inspection.

#### FR-3: Request corrections and recheck updated information

Supports UJ-1.

A reviewer can record the specific missing or incorrect items in a correction request. The owner can view the request and save corrections privately. The owner explicitly selects "Resubmit for review" to submit the updated information for team recheck. Saving a draft does not resubmit the property, alert reviewers or constitute approval. Deliver correction requests through the authenticated owner portal plus transactional email, with the portal as the durable request record. Record delivery outcomes without treating an email send as an owner response.

#### FR-4: Alert reviewers about responses and unanswered requests

Supports UJ-1.

The system alerts the team when the owner selects "Resubmit for review" for requested corrections, not on draft saves. For a request still awaiting resubmission, send no-response alerts at 7, 15 and 30 elapsed days after the request was sent. These are milestones from the original request date, not successive waiting intervals. Response alerts and unanswered-request alerts are distinct. Each alert identifies the property and request so the team can choose the next action. Stop future no-response alerts for that request after resubmission or closure; draft saves do not stop them. Deliver reviewer alerts through both the admin portal and transactional email as the adopted batch-research operational default. Resubmission returns the property to review; it does not establish that corrections are adequate or approved. Do not automatically reject an unanswered request; that behavior was not requested.

#### FR-5: Reject a property without requiring a correction cycle

Supports UJ-1.

A reviewer can reject a property directly instead of requesting corrections and must record a reason visible to the owner. The owner can correct and explicitly resubmit the same listing for review. Saving corrections privately does not resubmit it; rejection and resubmission do not establish approval or publication. Rejected submissions remain non-public until a later approval and FR-6 publication readiness.

Preserve the complete property review-status history across correction cycles, rejection and resubmission. Each transition records the previous and new status, who or what made the change, timestamp and reason; later transitions must not overwrite earlier entries. An automatic transition records its triggering reason. Admin can inspect the history; owners can see their rejection/correction reasons. This does not authorize owners to see private reviewer notes or another owner's records.

**Consequences (testable):**
- A rejected listing can be corrected and explicitly resubmitted under the same listing identity.
- Repeated rejection/resubmission cycles preserve every earlier status entry and reason in order.
- Resubmission returns to review without automatically approving or publishing the property.
- Status history remains available after the current status changes, with access restricted to authorized users.

### Publication and owner visibility

#### FR-6: Publish approved properties automatically and allow owner activation control

Supports UJ-1.

Team property approval and publication readiness are separate conditions. A property becomes public automatically without a separate owner publish step only when team approval is complete and required pricing, availability, photos and policies are complete. An approved property with incomplete required setup remains non-public. Owner activation cannot bypass these publication prerequisites; readiness does not override an owner pause or another admin restriction. The owner can make the property active or inactive. During deactivation, offer two distinct choices: stop new bookings while keeping existing bookings, or stop new bookings and cancel upcoming stays too. Merely choosing the stop-new-bookings option must not cancel existing bookings. The bulk cancellation option applies only to upcoming stays; stays already in progress and completed stays are excluded. Owner activation is distinct from team verification status and date availability. The owner can cancel upcoming paid bookings immediately without prior admin approval. Upcoming means scheduled check-in strictly in the future using the booked property timezone; at exact check-in the stay is outside the upcoming bulk action. Preview affected bookings, notify affected guests through portal and email, and show individual cancellation/refund outcomes rather than claiming all succeeded. Pending/unpaid requests are shown separately: stop-new-only prevents new approvals/confirmations while inactive but preserves existing holds until decline/expiry; explicit cancel-upcoming also cancels applicable unpaid requests and releases holds. No refund is issued for uncaptured money; raced captures enter resolution. Confirmed stays remain intact under stop-new-only.

Publication readiness requires verified owner identity, approved property evidence, accurate category/location/contact and photos, capacity/bedding, applicable house/cancellation/child/pet policies, booking timing and at least one future sellable period with valid rates. Hotels need sellable room types, quantities and rate plans; apartments need exclusive-unit and stay-limit setup. All future dates need not be open. Material identity, ownership/authority, address/location or unit changes require recheck and cannot inherit an inaccurate verified badge; preserve existing booking snapshots. Routine rate/calendar edits do not inherently trigger identity review. Local proof-of-authority sufficiency remains a validation gate.

#### FR-7: Fully refund guest payments when the owner cancels

Supports UJ-1, UJ-2.

An owner-initiated cancellation of an upcoming stay entitles the guest to a full refund of the amount paid, including Rentra's platform fee, taxes and paid booking extras. Cancellation takes effect independently of refund completion; display refund progress truthfully rather than treating cancellation as money returned. Any earlier refund counts toward the full-refund entitlement; total refunds must not exceed the amount paid. Stays already in progress or completed are excluded from the deactivation bulk action; this requirement does not define their cancellation/refund policy. Recovery of owner funds already paid out follows FR-14. Notify affected guests through portal and email with separate cancellation/refund progress, provider tracking and current estimates where available. Unknown/failed outcomes are reconciled by admin before retry; do not promise instant or guaranteed bank credit. Rentra bears standard payment-gateway processing charges from its service fee, including standard charges retained by the provider after an ordinary refund. Do not deduct an ordinary gateway-cost share from the owner accommodation subtotal or add a guest processing surcharge. This replaces the earlier shared-cost proposal. Applicable statutory/tax adjustments, exceptional provider products and separately reviewed owner-funded guest-refund responsibility remain distinct; this does not authorize new owner penalties, automatic bank debits or unrelated future-payout offsets.

## Features: guest discovery

#### FR-8: Search by location, dates and guest count

Supports UJ-2.

A guest can enter a location, select booking dates and guest count, and submit a search. Preserve existing validated search behavior and supported filters. Results must respect publication/active status, dates, actual party and room capacity, declared pets, owner stay limits and hotel room/plan allocation. Show the selected trip/party total prominently with mandatory known charges, tax status and an itemized final payable amount before payment; do not defer required bedding, pet or Rentra fees until after selection. Revalidate authoritative price and eligibility before payment/confirmation. Retain valid selections through authentication/navigation under FR-24; show changed or invalid selections explicitly rather than silently substituting another trip.

## Features: guest cancellation policies

#### FR-9: Let owners configure cancellation windows and refund rules

Supports UJ-2.

**Pre-arrival rules.** Owners can define multiple time windows before arrival/check-in and specify a refund percentage for each. Fixed-amount cancellation rules are excluded: the founder chose percentages so the refund scales with differing property and room prices. The founder's 24-hour full-refund and 12-hour partial-refund examples illustrate configurability, not mandatory platform thresholds. Apply the selected percentage to the full amount the guest paid for the booking, including rental, Rentra's platform fee, taxes and paid extras, rather than a room's current edited price. Any prior refund counts toward the entitlement; do not refund twice. This percentage-only rule applies to cancellation, not extra-bedding pricing, which still supports fixed or percentage charges.

**Cutoff boundaries.** Rules must have unambiguous cutoff behavior and no overlapping or uncovered pre-arrival windows. Guests see the applicable policy before booking and the refund calculation before confirming cancellation. Preserve the policy accepted for that booking; later owner edits must not silently change existing bookings. These consistency requirements support the requested multiple-window behavior; exact ranges remain owner-configurable. Use request submission time against the booked local check-in timestamp; define contiguous intervals so an exact cutoff matches one rule, with equality taking the at/after-cutoff rule. Store the accepted boundary and property timezone with the booking.

**Proportional allocation.** For guest-initiated cancellations, apply the refund percentage proportionally to the owner's rental amount and Rentra's platform fee. The owner and Rentra each retain the remaining percentage of their respective amount; do not take Rentra's refundable fee portion solely from the owner. Allocation-only example (not a quote at the 5% launch rate): INR 10,000 paid = INR 9,500 rental + INR 500 platform fee; a 50% refund returns INR 5,000 (INR 4,750 rental + INR 250 fee), leaving INR 4,750 rental and INR 250 fee retained. No tax or extra component is specified in this example.

**No-show and post-check-in requests.** A guest no-show alone does not trigger cancellation or an automatic refund. If the guest requests a refund, assess entitlement using the booking's accepted cancellation policy; do not assume all owners use the same near-arrival no-refund window. Ordinary policy-entitled refunds follow FR-11, while claimed property/access issues and discretionary exceptions follow FR-20 review. The absence of a refund request must not trigger a refund. Owners must also configure the refund percentage for requests made at or after scheduled check-in, including 0%. Use the time the guest submits the cancellation/refund request, measured against the booked check-in time and property timezone, to select the applicable window. Preserve this post-check-in rule with the booking's accepted policy and disclose it before payment. A no-show without a request still triggers no refund. This ordinary policy rule does not bypass FR-20 review for property/access complaints. 

**Voluntary early departure.** Voluntary early departure follows the booked policy, with no automatic refund merely for leaving. Owners control whether voluntary early-departure refunds are offered after check-in and the applicable time-based percentage, including no refund. Disclose and snapshot this policy before booking; a guest cannot force unused-night reimbursement merely by leaving. If the owner offers it, apply the booked early-departure refund percentage only to unused nights and their attributable booked components; already used nights are non-refundable under the ordinary policy. This is the founder-approved exception to the full-paid-booking basis for pre-arrival cancellation. Allocate the booked service fee and applicable taxes to the unused-night scope consistently with the original component allocation; do not refund consumed services or move their charges onto retained nights. Use the confirmed early-departure request timestamp and booked property timezone/schedule: a night is consumed for ordinary refund purposes when the confirmed request timestamp is at or after its booked local nightly start, including exact equality and the current commenced night; only nights whose starts are strictly later are unused. No automatic hourly proration is introduced. Preview the affected nights, booked amounts, policy percentage and prior refunds before confirmation. 

**Inventory consequences.** Once the guest confirms an eligible early-departure action, record the affected stay as ended early and release only its unused future property/room-night inventory; retain the used-stay history and other retained room reservations. Booking/inventory changes and refund completion have separate status. No refund or inventory release is triggered merely by an unconfirmed preview or unsupported claim of leaving. Property/access incidents can still receive reviewed remedies for affected used nights under FR-20. Verified property/access complaints remain eligible for FR-20 review regardless of a no-refund owner policy. Property/access incidents use FR-20; normal issue reporting follows FR-19.

**Exceptions and evidence gates.** Owner-initiated upcoming-stay cancellation continues to require a full refund under FR-7 regardless of the owner's guest-cancellation policy. Guest entitlement still includes taxes and paid extras at the selected percentage; tax/extra settlement accounting still needs specialist validation; Rentra-funded standard gateway costs and the unused-night early-departure exception are defined above; no-show request handling and the at/after-check-in percentage rule are defined above. Current template-based owner forms do not establish delivery of this dynamic editor.

#### FR-10: Reuse a default hotel policy with optional rate-plan overrides

Supports UJ-2.

**Policy inheritance.** An owner can configure one default cancellation policy for a hotel. Room rate plans use that policy unless the owner explicitly selects a different cancellation policy for a specific plan, such as a non-refundable offer. A different room type or meal inclusion does not require a separate policy. Guests see the effective policy for the selected offer before booking, and the booking retains the policy accepted at that time. Later default or override edits must not silently change existing bookings. 

**Mixed-policy calculation.** When a booking contains rooms with different effective policies, calculate each room's eligible refund under its own booked policy and add those amounts for the booking refund. Do not apply one room's policy to the other rooms. Apply FR-9's full-paid-amount basis and proportional owner/Rentra allocation to each room's attributable booked amount, counting prior refunds and enforcing the booking-level paid cap. The preview identifies each room's policy, eligible amount and the total. For example, a refundable room receives its policy-entitled refund while a non-refundable room does not; owner-initiated cancellation still follows FR-7. 

**Selected-room cancellation.** Guests can cancel selected rooms from a multi-room booking while keeping the remaining rooms. Apply each cancelled room's booked policy to its attributable amount; count earlier refunds for those rooms. The preview identifies the rooms being cancelled, rooms being retained and the refund. Cancellation releases only the affected room inventory; retained rooms keep their booked dates, terms and confirmation. Do not silently cancel or reprice retained rooms. Partial-room cancellation is distinct from the supported early-departure action under FR-9; it does not add general stay-shortening, date-change or rebooking capability. 

**Shared-charge allocation.** Allocate shared booking-level charges between rooms in proportion to their booked room prices; charges attributable to one room stay with that room. Preserve the booked allocation for later partial cancellations rather than reallocating charges onto retained rooms. Founder example: room prices INR 6,000 and INR 4,000 split a shared INR 500 fee into INR 300 and INR 200; the first room's policy applies to its INR 6,300 attributable total in this example. Refund the allocated components at that room's applicable percentage, subject to prior refunds. Use the deterministic integer-paise, largest-remainder allocation and zero-price handling defined in NFR-2; preserve the booked allocation for all later refunds. This allocation rule does not resolve tax accounting or processing-cost responsibility.

#### FR-11: Automatically initiate policy-based guest cancellation refunds

Supports UJ-2.

The guest can review a refund preview calculated from the booking's accepted policy and confirm cancellation. The system then initiates the eligible refund without routine admin approval. Repeated submissions or provider callbacks must not create duplicate refunds. Show cancellation and refund progress separately, distinguishing pending, completed and unsuccessful or unresolved refund outcomes; initiation does not mean money has reached the guest.

The team can handle exceptions, disputes and payment-provider failures without silently reducing the guest's policy entitlement or issuing duplicate refunds. Recovery of previously paid-out owner funds follows FR-14. Use provider-specific estimates and verified status, with unresolved outcomes handled by admin. Actual provider capability and team service coverage remain evidence/business gates. This requirement does not add a cancellation-charge waiver or promise immediate bank credit.

## Features: Rentra platform fee

#### FR-12: Apply a global fee default with optional overrides

Supports UJ-2.

Rentra uses one global percentage-based platform fee by default, added to the owner's subtotal. The founder confirms one guest-facing charge named "Rentra service fee." Commission and Rentra service/platform fee refer to this same single charge; do not levy one commission and then another platform fee. The guest-facing quoted trip total already includes that charge. An itemized fee line explains part of the total and must not add it again at checkout. Standard payment-gateway cost is a separate underlying expense borne by Rentra from its service fee; no additional guest recharge, convenience or processing surcharge is approved. The fee base includes rental and paid booking extras such as breakfast and extra bedding, before taxes. Exclude taxes and Rentra's own fee from the calculation base. Rentra can select an owner and configure an owner-specific percentage override; when present, that override replaces the global default. This does not give owners permission to edit Rentra's fee. No category or individual-property overrides are requested. The owner override applies across all that owner's listings. Only an admin with the authorized finance capability may change the owner-specific percentage override; record the actor, reason, previous and new values, and effective timestamp. New quotes use effective settings; invalid unpaid quotes refresh for guest acceptance. The approved launch global default is 5%, with the existing optional admin owner-specific overrides taking precedence. Rentra covers standard gateway charges from this fee. Review actual contribution, provider costs and cancellation losses after the first five paid bookings and completed-stay learning checks; do not automatically change rates after that milestone or reprice accepted bookings. Guests must be shown the applicable quoted fee before payment; later configuration changes must not silently alter the fee accepted for an existing booking or its refund allocation.

## Features: owner payouts

#### FR-13: Pay owners after successful guest payment

Supports UJ-4.

The founder chooses owner payout after verified successful guest payment rather than requiring check-in or stay completion. Admin can set one global Auto/Manual payout mode and optionally override that mode for each owner. The global launch default is Auto. An owner-specific override takes precedence; without one, the owner inherits the global setting. This is separate from platform-fee percentage configuration, and owners do not control the setting themselves. No per-property payout-mode setting is requested. In Auto mode, the system initiates eligible owner payouts after verified successful guest payment; in Manual mode, the team initiates eligible payouts. Both modes use the same eligibility checks and transfer-status handling. A client-side payment success message alone is not sufficient evidence. Current Auto/Manual settings govern new initiation; mode changes do not cancel or duplicate initiated/uncertain transfers. Recheck uninitiated queued work against current mode and eligibility. Auto initiates after verified capture and confirmed-booking/owner/provider eligibility; provider processing and bank settlement remain distinct. Payout amount after tax/cost allocation and actual provider readiness remain gates. Do not represent the payout as completed until transfer completion is verified.

The selected timing means owner funds may already have been transferred when a guest or owner cancels. If the owner's refundable share cannot be recovered promptly, Rentra funds the eligible guest refund first and recovers the owner share separately. Do not delay the policy-entitled refund solely waiting for owner recovery. Under ordinary proportional allocation, do not charge the owner for Rentra's own refundable fee share; reviewed owner-funded incident refunds under FR-20 are a distinct exception. Refund funding and owner debt/recovery are distinct from transfer/refund completion. Do not deduct recovery amounts from future owner payouts; the founder excludes this because reduced later payouts would confuse owners. Separate admin handling is described in FR-14. Outstanding-debt limits, available refund funding and provider support remain unresolved; do not assume authorization to debit the owner's bank account. These are blockers for a complete payout/refund flow.

#### FR-14: Recover refunded owner funds separately in admin

Supports UJ-4.

**Collection.** For a guest refund already completed from Rentra's account, admin can identify the owner's outstanding refundable share and generate/send an owner repayment link. The owner pays Rentra through that link; verified successful collection reduces the outstanding owner balance. Creating or sending a link does not count as collection. This action does not issue another guest refund or send an owner payout. Do not deduct recovery amounts from future owner payouts or debit the owner's bank account automatically. Provider support, link delivery and authorization/security details remain to be validated.

**Verified outcomes.** Keep attempts, failures, uncertain outcomes and verified completion distinguishable; do not treat an action click as completed collection or allow duplicate recovery. Recovery must not exceed the owner's remaining assigned refund obligation. For ordinary proportional refunds this excludes Rentra's own refundable fee portion; for reviewed incident refunds use the admin-selected responsibility under FR-20. 

**Deadlines and restrictions.** Send a repayment reminder on day 5 and set repayment due by day 7 after the owner receives the repayment link. If still unpaid after day 7, automatically block all properties belonging to that owner from accepting new bookings. This is not an instruction to cancel existing bookings or deduct from future payouts. Owner active/inactive controls or another listing must not bypass the owner-wide restriction. Remove this repayment restriction automatically once full repayment is verified, preserving owner pauses and any other publication/verification/admin restrictions. A pending or partial payment does not establish full repayment. 

**Multiple obligations.** Keep debts, original due dates, payments and adjustments separate. Keep the owner-wide restriction while any overdue blocking balance remains; paying one debt cannot clear another. Replacement links cannot restart the original debt clock. Link expiry is separate from debt due date and must not unnecessarily prevent payment by the deadline; replacements collect only the outstanding amount. Reconcile in-flight/excess payments and flag overpayments for admin return/reconciliation, not revenue or automatic cross-debt allocation. Portal plus email carry the notice and reminder. 

**Receipt evidence.** Start the day-5/day-7 clock at the earliest evidenced confirmed delivery or authenticated owner portal view/acknowledgement of the repayment notice. If neither can be evidenced, admin must confirm and record receipt before deadline blocking can start. Record event type, timestamp and evidence with the obligation, never label a send as a read receipt, and never reset the clock merely by replacing a link. Provider/channel event support must be validated. Funding/exposure limits remain open.

#### FR-15: Route guest booking payments and refunds through Rentra

Supports UJ-2, UJ-4.

Guests pay the full booking amount to Rentra at booking through the platform's supported payment flow. Exclude advance-plus-later-balance and pay-at-property booking collection from launch scope. For manual-approval properties, owner approval enables payment; verified successful full payment confirms an eligible booking. Existing illustrative advance amounts are not an approved launch payment option. Rentra makes guest refunds from its account; owners do not collect guest booking payments directly through a guest-to-owner flow. Owner payouts and owner-to-Rentra refund-share recovery are separate money movements. Show and reconcile guest payment/refund status independently from owner payout/recovery status; a completed guest refund stays completed while owner recovery is pending. Provider account setup and contractual/settlement arrangements remain to be validated.

## Features: children and pets

Founder requests market-informed child handling and adds pet handling to scope. Owner-defined infant/child age ranges, adult-rate threshold and free/charged policies are confirmed, as are the pet-policy choices below. Compatible child accommodation defaults below are adopted through the batch market resolution; owner age/fee amounts are configuration, not universal platform values. Local eligibility and inventory evidence gates remain.

#### FR-16: Price and accommodate children using explicit owner policies

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

#### FR-17: Disclose pet policy and include declared pets in the booking flow

Supports UJ-2.

Owners choose one of two ordinary-pet policies: "Pets allowed" or "Pets not allowed," and describe applicable limits and charges. Exclude "Allowed on request" and a separate pet-approval workflow from launch scope. For "Pets not allowed," guests declaring ordinary pets cannot book that property with pets or submit a pet-approval request to bypass the policy. For "Pets allowed," apply configured limits/charges and the property's existing automatic/manual booking mode without a separate pet-approval step. Guests can declare pet count, identify suitable properties, read the pet policy before payment, and see confirmed pet charges in the quoted total and booking confirmation. Pet count is distinct from human guest count and bed occupancy.

Owners can choose the pet-fee unit: per stay, per night, per pet or per pet per night. Show the unit and calculated total in the guest quote; apply pet-count and night-count multipliers only where the chosen unit requires them. No pet price is prescribed. Allow zero-priced/free pets. Owners can set clearly disclosed maximum count, permitted types/size and stay restrictions; validate the declared pets before payment. Paid pet extras use the already-agreed fee/refund rules unless an explicit exception is agreed. Assistance-animal treatment requires a distinct policy; ordinary pet restrictions/fees must not be applied blindly. Apply the ordinary-pet model across all four accommodation categories, using property defaults and explicit hotel-room applicability where relevant. India-specific assistance-animal rules still require specialist validation; no foreign legal test or ordinary-pet refusal/fee is imported automatically.

## Features: whole-apartment stays

#### FR-18: Book an entire apartment as one exclusive unit

Supports UJ-2.

Founder confirms apartments are whole-property rentals alongside farms/villas, not hotel room inventory. One booking reserves the entire apartment, not a separately sold room; prevent overlapping exclusive reservations. Record apartment bedrooms, bed configurations, bathrooms and facilities clearly. This product grouping does not require changing the existing farmhouse/villa booking units.

Price whole-apartment stays by night with check-in/check-out dates. Owners configure minimum/maximum nights, open/blocked dates, check-in/out times and default/weekend/date-specific rates. Preserve Rentra's established automatic/manual booking modes and guest fee/payout/refund decisions rather than importing Airbnb's different commercial policies.

Long-stay monthly installment billing, recurring rent and leases are not approved scope merely because an owner can set a long maximum stay. Owners may set date/arrival-day minimum-night variations, an optional preparation buffer (including none) and an optional separately disclosed one-off per-stay cleaning fee (zero allowed). Include cleaning in the approved paid-extra fee/refund model. Declare every occupant and validate whole-unit guest/sleeping limits; do not automatically copy hotel child tariffs. Validate supported maximum duration and booking lead time against actual platform/provider/local constraints; there is no market-mandated 28-night cap, nor permission to add installments. Existing apartment booking support has not been established by current source checks.

## Features: guest support and owner contact

#### FR-19: Let guests contact the owner and raise a Rentra support request

Supports UJ-2, UJ-3.

A guest experiencing an access problem or materially incorrect listing can contact the owner and separately raise a request with Rentra from the portal. Rentra support must not depend on the guest first obtaining an owner response. Reuse the existing support/request flow where it meets the requirement rather than creating a second ticket system. The founder mentions mail, form or raised request as possible access paths; a separate email-ingestion system is not added merely by this research; preserve the existing portal/form route and communicate its reference through transactional email.

Support entry should preserve relevant booking context when available. Existing support/dispute routes are documented and present in source, but this does not establish complete runtime coverage for the requested incident flow. Reviewed issue cancellation/refund decisions follow FR-20. Keep private owner contact and exact private-home address for authorized confirmed guests; a hotel's public business address may remain public. Collect issue category/description, discovery time, affected rooms/nights, desired remedy and available photos/video/messages or other credible evidence. Do not require impossible photos or an owner response before Rentra accepts an urgent issue. Use 72 hours from discovery as the normal reporting target, with prompt reporting for access/safety and reviewed exceptions for inability to report; this is not a waiver of statutory rights. Classify denied access, safety and currently stranded guests as urgent. Founder sets a human support acknowledgement/initial-response target within 12 elapsed hours of request submission; this is not a final resolution or bank-credit guarantee. Actual coverage/on-call ownership remains OQ-11. Urgent access/safety reports require immediate automated routing/escalation and truthful contact options; a 12-hour general response target does not prove adequate urgent coverage. No 24/7 team or automatic rebooking guarantee is invented. A support report must not silently cancel or refund a booking without a defined decision flow.

#### FR-20: Provide cancellation and refund actions for booking-issue resolution

Supports UJ-3.

**Case decision.** Guests can submit a booking-issue refund request, but the request does not automatically cancel the booking or grant a discretionary refund. Admin reviews the reported issue before approving or declining an issue-based cancellation/refund outcome. An unverified claim must not bypass the booked cancellation policy to obtain an automatic full refund. Review the issue rather than presuming a report true or false solely because it was submitted.

**Refund target.** Authorized admin can enter a refund percentage from 0 to 100 after reviewing the issue. A value of 100 means a full refund; a lower value means a partial refund of the booking's paid amount. Preview the monetary amount and account for prior refunds before confirmation; total refunded must not exceed verified payment. Record the acting admin, decision reason, percentage and amount for the booking issue. The guest cannot grant themselves a discretionary refund by entering a percentage. Admin-selected percentages do not rewrite the cancellation policy accepted for the booking.

**Responsibility.** For a reviewed incident refund, authorized admin selects either the usual proportional owner/Rentra allocation or owner-funded allocation, where the owner bears the full guest refund cost when found responsible, including the refunded platform-fee portion. Rentra retains its original gross platform fee in owner-funded mode, before Rentra-funded gateway and operating expenses. The percentage determines what the guest receives; the allocation determines who bears that refund. Record the selected allocation and reason separately. Allocation-only example (not a quote at the 5% launch rate): INR 10,000 paid (INR 9,500 owner rental plus INR 500 fee), with a 50% owner-funded refund, means INR 5,000 returned to the guest entirely at the owner's cost; Rentra retains INR 500. This exception does not change ordinary cancellation allocation. If owner proceeds were paid out, recover the assigned obligation through the separate repayment flow; do not deduct from future payouts or initiate an unauthorized bank debit. Tax/extra accounting for this exception remains to be validated.

**Cumulative refund and reassignment.** Cancellation and refund are separate outcomes; preserve existing booking status and verified money-movement distinctions. Ordinary guest cancellation with a policy-entitled refund remains automatic under FR-11 and must not be blocked by introducing this discretionary review flow. Use FR-19 evidence intake, request owner response when feasible without blocking urgent intake, and retain an auditable case/decision history. Admin refund percentage is a final cumulative target for the selected scope: show prior/in-flight refunds and pay only the unpaid difference. A lower target does not automatically reclaim guest money. For a reviewed owner-funded incident, the founder authorizes cumulative reassignment of prior refund responsibility so the owner bears the approved total guest refund and Rentra retains its original fee, including when the assigned obligation exceeds original owner proceeds. Show the change explicitly, require an authorized reasoned decision, preserve prior history and obtain clear owner agreement to these terms; do not silently rewrite allocations. Guest money still due and responsibility adjustments must be previewed separately. Using a historical allocation-only example rather than a new 5% quote: guest paid INR 10,000 (owner INR 9,500, fee INR 500), then received a proportional INR 5,000 refund; a later 100% owner-funded award pays only another INR 5,000 to the guest, reassigns Rentra's earlier INR 250 responsibility to the owner, and makes total owner responsibility INR 10,000. This includes INR 500 beyond original owner proceeds. Apply any verified recovery already collected before determining remaining debt. No extra guest refund or unauthorized bank debit is created by reallocation. Tax/accounting treatment and enforceable owner terms still require specialist validation. Dispute/provider outcomes must reconcile other reimbursement channels to prevent double refund.

## Features: authentic guest reviews

#### FR-21: Collect booking-linked reviews and invite genuine guests to respond

Supports UJ-2.

Guests with a genuine booked stay can submit a property review linked to their booking. Invite guests after their stay and send a reminder; send one reminder on day 7 after checkout unless already submitted, closed or ineligible; this is an adopted Rentra cadence, not a universal marketplace schedule. Provide a reviewed eligibility exception for a booked guest who arrived but could not stay because of an access/property issue. A cancelled reservation or no-show alone does not establish firsthand experience or exception approval. Review content must reflect what the guest actually experienced; do not imply they assessed facilities or stay quality they did not experience.

Show honest new-listing/no-review states while reviews accrue; do not invent ratings or counts. This does not approve importing third-party testimonials or mixing external scores into Rentra ratings. Eligible ordinary reviews publish automatically after basic eligibility/content checks; flagged or reported reviews go to admin handling. The arrived-but-could-not-stay eligibility exception still requires review. A negative rating alone is not a moderation violation or removal reason. Record moderation actions and reasons; do not require an owner to approve a guest's review. Retain the existing 30-day review window from booked checkout in the property timezone; approved arrival/access exceptions use an equivalent case-linked stay endpoint. Check booking ownership, eligibility and duplicates plus travel relevance, privacy leaks, threats/abuse, spam and manipulation. Owners can report/dispute with reasons/evidence, not delete or veto reviews. Preserve public owner replies only if already supported; otherwise defer rather than adding them solely from research. Use support-case evidence for arrival exceptions. Current source uses a completed-stay eligibility gate; the broader arrival-exception and publication requirements are not implementation-completion claims.

## Features: hotel setup, pricing and safe booking

#### FR-22: Configure hotel rooms, facilities, offers and bedding

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

#### FR-23: Preserve owner availability and booking confirmation modes

Supports UJ-2.

Owners control availability by date. Whole properties are exclusive inventory; hotels sell quantities by room type and night. Closed, unavailable or insufficient-capacity selections cannot proceed merely because a listing is active. Check availability again when committing inventory; concurrent guests must not produce confirmed overselling.

Each property supports automatic or manual booking confirmation, default automatic. In manual mode, hold the requested inventory while awaiting the owner and do not start guest payment until approval. Approval opens payment but does not by itself confirm a paid booking. Declined or expired requests release the corresponding held inventory.

Preserve the existing acceptance baselines documented in the [source evidence](../../briefs/brief-Rentra-2026-10-24/addendum.md#existing-booking-confirmation-and-availability): changing booking mode does not convert pending requests; owner response is allowed up to 24 hours followed by 12 hours to pay, capped by arrival; an ineligible verified capture enters resolution rather than reclaiming expired inventory. Calendar percentage bulk edits use the current effective nightly rate, including overrides; holiday shortcuts select dates without automatically changing prices, as recorded in [date-pricing evidence](../../briefs/brief-Rentra-2026-10-24/addendum.md#date-dependent-hotel-pricing).

**Consequences (testable):**
- Unavailable dates or insufficient room quantities are rejected before an eligible booking is confirmed.
- A pending manual request cannot launch payment through the UI or by bypassing it.
- Repeated requests/retries do not multiply bookings or permanent holds.
- An expired hold cannot reclaim inventory already sold to someone else.
- Automatic confirmation still requires verified successful full payment and valid inventory.

#### FR-24: Preserve guest account, selection and booking records

Supports UJ-2.

Retain existing supported guest authentication, saved places, listing details, quote review, checkout, account and booking records. Preserve valid location/date/party/room selections through authentication and supported navigation. Show a clear recovery path if prices, inventory, permissions or session state change.

**Consequences (testable):**
- Login recovery retains valid booking selections and obtains a fresh applicable quote.
- Guests can find their confirmed or cancelled booking and its payment/refund progress.
- A price or policy change cannot silently collect more than the guest accepted.
- No account switch exposes another person's private bookings or saved data.
- These are preservation requirements, not an assertion that every journey has passed runtime checks.

## Existing functionality and launch gaps

| Area | Source evidence | Launch work |
| --- | --- | --- |
| Core farmhouse marketplace | Existing discovery, accounts, owner/admin tools and booking paths are documented. | Preserve, reconcile with new requirements and test complete journeys. |
| Booking modes | Default automatic and owner-approval-before-payment are source-confirmed. | Validate integration and preserve existing requests when settings change. |
| Hotel rooms and date rates | Room types, beds, meal plans, fixed extra-person pricing and calendar rates exist. | Add/validate room amenity editing/full display, explicit bedding rules and percentage pricing. |
| Apartments | Whole-unit nightly scope is founder-approved; implemented support is unverified. | Assess category/setup, exclusive inventory, stay limits and date pricing. |
| Fee/payout/refund model | Hotel checkout/payout source conflicts with the selected fee model; historical live gates remain open. | Reconcile all components, validate provider support and prove safe failure/recovery behavior. |
| Children and pets | Basic child-age/charge and pets yes/no settings exist in inspected hotel paths. | Validate richer age/bed/meal rules and declared pet-count/fee behavior. |
| Support and reviews | Booking-linked support exists; review eligibility currently describes completed stays. | Validate incident remedies, arrival-review exception and agreed publication/reminders. |

The [PRD addendum](addendum.md) preserves research, source references and evidence limits. Prior focused checks passed: 8 hotel domain tests, 5 bedding-gap assertions, 4 mixed-date pricing assertions, 6 frontend checkout-display tests and 1 backend deadline test. The request-to-book database integration was invoked but skipped without a disposable test database. No browser journey, hosted migration or live provider test ran in discovery. Code presence and historic local tests do not prove hosted deployment or live provider readiness.

## Cross-cutting quality requirements

These requirements express correctness and preserve existing protections. Actual support coverage and backend-load budgets still require operating-capacity evidence; WCAG and Core Web Vitals targets are adopted below. No certification is claimed.

### NFR-1: Authorization and privacy

Only the appropriate Guest, Owner or authorized admin can read or change a booking, evidence file, policy, fee, payout or refund. Backend checks must enforce permissions even when a UI control is bypassed. Identity/property documents and private case evidence must not enter public listings. Payout-mode and Platform fee overrides are admin-controlled. Preserve account isolation and existing safe error/session behavior.

### NFR-2: Money and state correctness

Component totals reconcile to the guest-paid amount, using consistent rounding in the smallest supported currency unit. Never confirm success from an unverified client message. No duplicate capture, payout, refund or Recovery from retries, repeated clicks or callbacks. Total refunded, including in-flight reserved amounts, cannot exceed verified paid money; total collected for Recovery cannot exceed the remaining assigned obligation. Use integer paise and stable largest-remainder allocation for proportional shared charges so lines sum exactly to the booked component. Zero-price lines receive zero proportional share; an all-zero base with a nonzero shared charge needs a defined allocation basis or validation error. Cumulative refund targets pay only the unrefunded difference; zero due is a no-money record, never a zero-value refund API request. Coordinate payout/refund/recovery against one current booking obligation, accounting for initiated and uncertain movements; after cancellation/refund approval prevent a new incompatible payout and reconcile late transfer outcomes. This never authorizes offsets against another future booking. Previewed amounts must match confirmed actions or require fresh review.

### NFR-3: Inventory and policy consistency

No confirmed overlap for an exclusive property or oversold hotel room-night. Quotes and later operations use the appropriate accepted terms; later owner/admin edits cannot rewrite a booking's policy or payment allocation silently. Calculate time windows relative to the property's declared arrival/check-in time and timezone, with explicit boundary behavior. Release expired inventory without altering already-confirmed bookings.

### NFR-4: Operational visibility and recoverability

Track pending, verified completed, failed and uncertain money outcomes distinctly. Admin can identify unresolved work without treating failure as success or retrying uncertain transactions blindly. Record who performed sensitive actions, the reason, affected booking/owner, amount/percentage and resulting status. A bulk action reports individual outcomes rather than claiming all succeeded when some failed. Verified Recovery removes only the relevant debt restriction.

### NFR-5: Accessible, usable and honest interfaces

Preserve keyboard access, meaningful labels, focus/error feedback, reduced-motion behavior and usable touch controls across guest, owner and admin journeys. Target WCAG 2.2 Level AA across complete core flows; combine automated checks with manual keyboard, focus, labels/errors, contrast and screen-reader checks. Test representative phone and desktop layouts against a recorded browser/device matrix. Use Core Web Vitals good targets: LCP <=2.5 seconds, INP <=200 milliseconds and CLS <=0.1 at the field 75th percentile separately for mobile/desktop. Lab checks precede launch; field validation needs sufficient traffic. These are targets, not current conformance or performance claims; backend load capacity must be measured. Make empty, loading, unavailable, pending and failed states understandable. Show genuine photos, facilities, review counts, verification evidence and quoted prices; do not fabricate trust claims or display an action as complete before it succeeds.

## Success metrics and counter-metrics

- **SM-1 / Milestone 0:** five real, team-approved properties. Leads, registrations and unfinished drafts do not count. No category quota or fixed date is agreed. Supports UJ-1 and FR-1–6.
- **SM-2 / Milestone 1:** five genuine bookings on the initial supply with verified successful guest payments. Deduplicate by booking; exclude test/demo payments, attempts and repeated callbacks. Completed stays are tracked separately, not required for this milestone. Supports UJ-2, FR-15 and FR-23–24.
- **Counter-metrics:** track owner cancellations, completed stays, guest issues, outstanding/failed refunds, overdue owner Recovery and review response rate alongside paid-booking counts. Do not treat refunded/cancelled bookings as evidence of successful stays.
- **Correctness gates:** zero duplicate financial movements, confirmed overselling, unauthorized private-data access or confirmed ineligible bookings in the relevant release checks. These gates do not imply those incidents have been tested or prevented in production.
- **Measurement limits:** owner/customer willingness, acquisition cost, profitability, repeat usage and support workload are not yet validated. After the first five paid bookings and first completed stays, collect guest suitability/trust feedback, owner onboarding/support effort and cancellation/incident outcomes. Validate like-for-like final prices before claiming a price advantage; preserve the agreed milestone definitions. Business-growth targets and escalation thresholds still need real evidence, not copied competitor scale.

## Non-goals and post-launch scope

- Entertainment and its research are deferred; existing entertainment code does not add it to the launch.
- Vehicles and other rentable assets are longer-term scope.
- Automatic demand pricing is a post-launch priority. Launch uses owner-controlled date prices.
- Owner subscriptions and third-party identity-document APIs are later possibilities.
- No individual-room apartment rental, monthly installments, recurring residential rent or lease-management requirement is approved.
- No guest advance-plus-balance or pay-at-property collection at launch.
- No ordinary-pet Allowed-on-request approval workflow.
- No third-party review import, fabricated reviews or reciprocal host-review system is approved.
- No automatic owner-bank debit, future-payout debt offset or interest/penalty feature is approved.

## Open decisions and assumptions

| Item | Needed decision/evidence | Owner and revisit condition |
| --- | --- | --- |
| OQ-1 | Provider/account approval and test evidence for full collection, early Auto transfers, partial/old-payment refunds, owner repayment links, status reconciliation and disputes. Routine lifecycle rules are adopted, not proof of readiness. | Engineering + founder/finance; before financial architecture sign-off and real money. |
| OQ-2 | Founder proposes INR 40,000 as a starting refund reserve and requests an assessment; this is not a funded commitment or approved exposure cap. Adequacy depends on largest bookings, simultaneous refundable exposure, costs and recovery delays. Actual funding, monitored exposure limits, responsible monitor and action before exceeding limits remain to be confirmed. | Founder/finance; before Auto payout/refund launch; launch blocker. |
| OQ-3 | Validate tax/invoice/remittance/credit and component settlement. Rentra-funded standard gateway processing replaces shared costs; no ordinary owner gateway deduction or additional guest surcharge. Validate actual contracted costs and any exceptional-product treatment. Founder approves retrospective cumulative owner-funded liability, including beyond original proceeds; validate enforceable owner consent and accounting rather than treating the commercial choice as open. | Founder/finance + Indian accounting/legal specialist; before financial acceptance and owner terms. |
| OQ-4 | Infant/child ranges, free/fixed/percentage tariffs, room-only per-adult base, extras exclusions, whole-year age entry, policy inheritance and required cot confirmation are answered. Validate actual supervising-adult/check-in-age eligibility, owner cot inventory and pricing examples. | Product/engineering + owners and specialist as needed; before family quote release. |
| OQ-5 | Mixed-room policy, partial-room cancellation, shared-charge allocation, rounding and cumulative refund amounts are answered. Owner controls whether/time-based terms for voluntary early-departure refunds, including no refund. Approved early-departure exception: when offered by owner, apply the booked percentage only to unused unstarted nights and attributable booked components; consumed/current commenced nights are ordinarily non-refundable. Use booked local schedule/request time and preview the affected nights; validate acceptance cases. Prior responsibility reassignment is OQ-3. | Founder/product/finance; before early-departure financial acceptance. |
| OQ-6 | Owner verification, publication checklist, priced future availability, sensitive-change recheck and reasoned rejection/resubmission are answered. Validate locally sufficient authority documents and operations checklist. | Operations + local specialist; before verification/publication release. |
| OQ-7 | Owner min/max, arrival-day rules, optional turnover buffer, one-off cleaning and whole-unit guest counts are answered. Validate supported duration/lead time against actual inventory/provider and local conditions, without inventing a universal 28-night cap or adding installments. | Product/architecture + provider/local specialist; before apartment release. |
| OQ-8 | Upcoming cutoff, unpaid holds/deactivation, mode changes and aggregate overdue-debt blocking are answered by the market decision register. Prove both event orders, partial batch outcomes and late capture/transfer cases. | Engineering/QA; before affected state transitions release; not a new founder questionnaire. |
| OQ-9 | Approved: 5% launch global service fee, admin owner-wide overrides, and Rentra-funded standard gateway costs. Validate contribution and actual costs after the first five paid bookings; introductory pricing is not a proven sustainable margin. Preserve booked snapshots and require authorized audited changes for any later rate adjustment. | Founder/finance + engineering; verify configuration before launch and review actual margin after first five paid bookings. |
| OQ-10 | Portal/email notice and reminder channels, separate link expiry, replacement links and overpayment handling are answered. Founder approves clock start on evidenced confirmed delivery or authenticated notice view/acknowledgement, with admin-confirmed receipt fallback. Validate channel evidence and acceptance cases; send success alone is not receipt proof. | Founder/operations + engineering; before automated overdue blocking. |
| OQ-11 | Evidence intake, 72h discovery reporting target with exceptions, contact disclosure, 30-day review window, day-7 reminder and moderation/reporting are answered. Initial human response within 12 elapsed hours is confirmed; resolution is separate. Need truthful support hours/on-call owner and appropriate urgent escalation coverage; no invented 24/7 guarantee. | Founder/operations; before real guest support launch. |
| OQ-12 | Free pets, owner restrictions, four fee units and accommodation-wide applicability are answered. Validate India-specific assistance-animal accommodation/exemption/documentation and private evidence retention/deletion. | Product + India specialist/operations; before applicable release policies. |
| OQ-13 | WCAG 2.2 AA and Core Web Vitals good targets are adopted. Measure deployment load/failure behavior, establish browser/device matrix and test quality targets; no current compliance claim. | UX/engineering/QA with founder launch expectations; before release gates. |

**Resolved A-1:** portal plus transactional email is adopted under the founder batch-market-default authorization. The earlier ambiguous channel assumption no longer needs a separate founder prompt.

**Inherited baseline:** preserve existing supported guest search/listing/account/booking behavior and the existing brand direction; verify code and runtime coverage rather than asking the founder to redesign conventional steps or presenting source inference as a completed feature.

**Status:** final for downstream planning, following discovery audit, input reconciliation, reviewer triage and editorial polish. The question register distinguishes adopted rules from owned funding, provider, specialist and operational release gates. No application code, production migration, live payment or owner outreach is performed by this document. Open items are not silently approved.
