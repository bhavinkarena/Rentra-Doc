# Rentra launch PRD: supporting inputs

The [product brief's addendum](../../briefs/brief-Rentra-2026-10-24/addendum.md) supplies source references, prior research, screenshot interpretations and focused test evidence. Reuse those inputs; do not repeat an implementation audit without a new concern.

Technical choices and mechanism details discovered during the PRD workflow belong here, while user-facing capabilities and testable requirements belong in `prd.md`.

## Batch market resolution and precedence

The founder requested collecting all remaining questions, researching market behavior, adopting compatible answers and asking only what market evidence cannot settle. The [complete 83-entry register](market-questions-and-answers.md) is the current resolution index; its linked accommodation, money and operations reports preserve primary evidence and distinguish market facts from Rentra synthesis. These answers update FR-1-24 and the existing OQ-1-13 groups without claiming implementation. Earlier pending/open wording in dated discovery evidence is superseded only where the register and PRD explicitly adopt an answer.

Routine lifecycle, shared-charge rounding, child/cot pricing boundaries, publication readiness, pet applicability, reporting/review schedules and quality targets no longer require repeated founder micro-questions. Existing early-payout, full-upfront, full-paid refund and no-future-offset decisions remain. Voluntary early-departure basis, funding/rate/cost/owner-liability choices, auditable repayment receipt and real support coverage remain business choices. Provider, India-specific tax/legal and measured performance evidence remain external release gates. Research is not a live provider test, legal opinion or production-readiness certificate.


## Approved launch fee and gateway cost policy

Founder approves the proposed launch package: 5% global Rentra service fee, preserving admin owner-specific overrides, with Rentra covering standard gateway charges from that fee. This supersedes the earlier shared-cost approval and removes the ordinary processing-cost split question. Guest sees one fee-inclusive total and one service-fee breakdown line; no new guest gateway/convenience surcharge. Owner accommodation subtotal has no ordinary gateway deduction; statutory/tax adjustments remain subject to validated accounting. Owner-funded reviewed guest-refund liability remains as approved, but retained Rentra fee is gross before gateway/operating expenses, not profit.

Review actual contribution, contracted gateway/product costs and ordinary cancellation losses after the first five paid bookings and completed-stay learning checks; milestone definitions do not change. Review does not automatically raise the fee or modify booked quotes. The earlier 2% gateway arithmetic remains an illustrative baseline, not contracted rate proof. The INR 40,000 reserve remains proposed/unfunded until confirmed and stress-tested. Exceptional paid provider products are not automatically a new owner cost or guest surcharge.

Earlier pending 5%/shared-cost passages in this addendum and dated research reports describe historical proposals; this approved section, current FR-7/FR-12 and the full decision register take precedence. No code/configuration, live transaction, deployment or owner communication was performed.


## Approved early-departure unused-night basis

Founder approves recommendation: owner retains control over offering voluntary early-departure refunds and time-based percentages, including 0%/no refund. When offered, percentage applies to unused nights and their attributable booked components only; used nights remain non-refundable under ordinary policy. This explicitly qualifies the prior full-paid-booking basis for this specific action, not pre-arrival cancellation or owner-initiated full refunds. Verified property/access complaints remain reviewable under FR20, including consumed nights where appropriate.

Compatible boundary default under the earlier batch authorization: use confirmed request submission time with booked local nightly schedule; commenced/current night is consumed, future unstarted nights are unused, no automatic hourly proration. Preview affected nights/components and previous refunds before confirmation. Use original booked fee/tax allocations for the unused scope and do not refund consumed services or shift charges to retained nights. Exact accounting treatment remains a specialist gate. Example: three booked nights, first used and next two unstarted; an owner's 50% early-departure policy applies to the booked unused two-night scope, not all three nights. No refund occurs merely because the guest leaves without submitting/confirming an applicable action.

The unused-night basis is directly founder-approved; detailed timestamp/rounding/preservation boundaries are consistent product defaults to test downstream, not claims of a universal market rule. No app or live transaction was changed.
## Refund reserve proposal and confirmed liability/receipt rules

Founder proposes INR 40,000 as possible starting refund reserve and asks whether it is suitable; this is a candidate planning amount, not proof of money committed/deposited or an approved debt/exposure cap. Arithmetic scenarios assuming the entire INR 40,000 is liquid and available, no other obligations and ignoring taxes/processing costs: four full INR 10,000 refunds or two full INR 20,000 refunds consume it. This does not show adequacy for actual concurrent bookings. Early payouts and guest-refund-first promises mean reserve assessment must consider maximum simultaneous refund exposure, costs and owner recovery delays/nonpayment; a seven-day repayment deadline does not guarantee actual collection. Keep the reserve separate from earned fees and funds owed to others in planning, and validate provider access to refund liquidity. For a planning check, subtract committed/in-flight refund cash from available dedicated refund cash, then compare the remainder against the chosen remaining exposure and contingency; the exposure tolerance still needs founder/finance approval. No automatic payout-pause rule, booking cap, warning threshold or funding commitment is silently adopted.

Founder approves explained owner-funded liability: audited retrospective reassignment can preserve Rentra original fee and exceed owner original proceeds. For a guest payment of INR 10,000 = INR 9,500 owner amount + INR 500 fee, an ordinary 50% refund initially allocates INR 4,750 to the owner and INR 250 to Rentra. A later 100% owner-funded award sends only the remaining INR 5,000 to the guest, but makes the owner's total responsibility INR 10,000, reassigning Rentra's earlier INR 250 responsibility to the owner. Subtract verified collections already made when calculating the remaining recovery. Clear advance owner terms/consent and visible statement lines are required; accounting/legal validity still needs validation. No automatic bank debit or unrelated future-payout offset is authorized.

Founder approves receipt-based repayment countdown: earliest evidenced confirmed delivery or authenticated owner notice view/acknowledgement; absent either, admin confirms and records actual receipt before countdown blocking. Keep evidence/event timestamp and original due date. Sending is not proof of reading, and email delivery is delivery evidence rather than claimed read proof. Actual channel capabilities must be verified.

Financial/provider evidence remains [official Razorpay refund documentation](https://razorpay.com/docs/payments/refunds/issue/) and [official refund FAQ source](https://github.com/razorpay/markdown-docs/blob/master/payments/refunds/faqs.md): refund limits/outcomes and available funding must be respected. No source certifies INR 40,000 as an adequate Rentra reserve. No live account or new runtime test was run.


## Known evidence boundaries

The prior assessment found hotel room-amenity editing/display gaps, extra-bedding policy/percentage-pricing gaps and a hotel fee/payout mismatch with the selected model. Whole-apartment inventory and maximum stays remain unverified. Focused tests passed, but request-to-book database integration was skipped without a disposable test database. No browser, hosted release or live provider readiness was established.

## Configurable cancellation policy assessment

Owner forms currently expose named tiers: `Rentra/components/partner/listing/TermsSection.jsx` for regular listings and `HotelSections.jsx:41` for hotels. Hotel templates map to free-cancellation hours and first-night/full-stay retained charges in `rentra-backend/src/services/schemas/zod/listing.js:239`. The regular evaluator in `src/services/domain/cancellation.js` already reads bands from the booking's policy snapshot and applies component-specific handling. Reuse existing snapshots and money/refund paths where appropriate; a configurable editor is not established by this source check.

Market references: [Booking.com cancellation policies](https://developers.booking.com/connectivity/docs/policies-api/understanding-cancellation-policy) describes time deadlines and percentage/night penalties assigned per room rate; [Agoda search API](https://developer.agoda.com/demand/docs/json-search-api) exposes dated cancellation policies. These support deadline-based modeling, but do not determine Rentra's fee/tax refund treatment. Do not copy competitor fee/tax handling without an explicit Rentra policy.

Owner policy decision: cancellation refunds use percentages only, with owner-defined time windows. Fixed amounts are excluded so refunds scale with the booked property/room price. Extra-bedding pricing remains fixed-or-percentage; this cancellation decision does not alter it.

Confirmed refund base: guest-cancellation percentages apply to the full amount paid, including rental, Rentra's fee, taxes and paid extras. Earlier refunds count toward entitlement; never return more than the verified paid amount.

Confirmed rental/fee allocation: apply the same percentage separately to owner rental and Rentra's platform fee. Founder example: INR 9,500 rental + INR 500 fee = INR 10,000 paid. At 50%, refund INR 4,750 rental and INR 250 fee, totaling INR 5,000. Owner retains INR 4,750; Rentra retains INR 250 before costs. No taxes/extras are stated in this example. Guest entitlement for tax/extras remains proportional, but their accounting, provider-cost allocation and recovery from owners already paid out remain unresolved. Do not interpret this example as tax/legal validation.

Proposed consistency details for downstream design: ordered non-overlapping pre-arrival windows with exact-boundary semantics; one matching rule per instant; no refund greater than eligible paid money; policy version/snapshot attached to booking; price-change/review handling for later policy edits; refund preview and disclosure; explicit exception for owner cancellation under full-refund policy. Calculate against the actual booked payment, not a later edited listing price. Tax/extra accounting, processing settlement and no-show/in-progress rules remain open. No application code was changed or new tests added during this assessment.

### Hotel cancellation policy assignment: market check

Founder requested research on assigning hotel cancellation policies; the approved default-and-override model follows below.

- [Booking.com Policies API](https://developers.booking.com/connectivity/docs/policies-api/policies-overview): create policies for a property and assign policy IDs to room rates. This permits reuse; it does not require a unique policy per rate plan.
- [Agoda rate-plan setup](https://partnerhub.agoda.com/how-can-i-manage-my-rate-plans/): owners select a cancellation policy when creating a rate plan and may offer free-cancellation and non-refundable options. Meal benefits and cancellation terms are separate attributes; changing breakfast inclusion need not change cancellation rules.

Founder approved one reusable default hotel policy with an optional explicit override for a specific rate plan. Do not force separate policy authoring for every room/meal combination. Different room rates can use the same policy; refundable/non-refundable choices may use different ones. Effective policy must be clear before booking and retained for that booking. If multi-room bookings mix policies, guest disclosure and refund allocation need explicit requirements. This is a requirement, not an implementation claim.

### Policy-based refund automation: market check

Founder asked for evidence before choosing whether each guest cancellation refund needs admin approval.

- [Airbnb host cancellation guidance](https://www.airbnb.com/help/article/43): guests receive automatic refunds when the applicable cancellation policy permits them.
- [Agoda Help Center](https://www.agoda.com/info/contact.html): eligible refunds are initiated after cancellation confirmation. Requests to waive cancellation charges are a separate property-response process; refund initiation is distinct from money arriving in the guest's account.
- [Booking.com connectivity FAQ](https://developers.booking.com/connectivity/docs/con-faq-reservations-general-information): required refunds are automatic for the Payments by Booking payment model. Do not generalize to all property-collected bookings.

Founder approved the guest reviewing the policy-based refund preview, confirming cancellation, and the system initiating the eligible refund without routine admin approval. Flag disputed exceptions, provider failures or uncertain payment outcomes for team handling without issuing duplicate refunds or presenting an uncompleted refund as complete. No instant bank-credit promise, cancellation-charge waiver feature or implementation is established by this decision.

## Payout mode and post-payout refund funding

Founder selects payout after verified successful guest payment. Admin controls a global Auto/Manual mode (default Auto) and optional owner-specific override; owner override takes precedence. Auto initiates eligible transfers; Manual requires team initiation. Provider transfer completion remains separate from initiation. No live payout provider or settlement eligibility is established here.

Provider research: [Razorpay Route payment reversals](https://razorpay.com/docs/payments/route/reversal/) describes full/partial reversals of linked-account transfers and requires sufficient available linked-account balance. It does not establish that money already paid to an owner's bank can always be recovered automatically. The dashboard guide restricts its Reverse All shortcut for partial refunds, so do not assume that shortcut implements Rentra's proportional partial-refund requirement. Route availability, account setup, contracts and the actual refund/transfer API integration need validation; this is an option to assess, not a chosen integration.

Founder-approved product decision: all guest booking payments/refunds flow through Rentra's account, with no direct guest-to-owner booking payment flow. If owner proceeds were already paid out, Rentra completes the eligible guest refund first and separately recovers the owner's refundable share. Admin generates/sends an owner repayment link; the owner actively pays Rentra through it. Only verified collection reduces the outstanding balance. This is not another guest refund or owner payout. Pending owner recovery does not undo the completed guest refund. For ordinary proportional cancellation, owner recovery excludes Rentra's own refundable platform-fee portion; reviewed owner-funded incident refunds are the exception described below. Do not deduct debt from upcoming owner payouts; keep recovery separate so later payouts are not unexpectedly reduced. Never collect the same amount twice; link creation and pending recovery are not completion. Automatic owner-bank debits are not authorized. Provider support, link security/delivery/expiry, debt limits and refund funding remain open; the agreed reminder/deadline/blocking rules follow. No provider setup or recovery success is established.

Repayment timing: day-5 reminder and payment due by day 7 after the owner receives the link. Deadline is distinct from link expiry. If unpaid after day 7, automatically block all of the owner's properties from new bookings. Owner listing activation cannot bypass this owner-wide restriction. Once full repayment is verified, automatically remove only the debt restriction; preserve owner pauses and unrelated admin/verification restrictions. Partial or pending payment does not establish full repayment. This does not authorize cancellation of existing bookings, penalties or payout offsets. Delivery mechanics and funding/debt limits remain open.

## Reviewed incident-refund responsibility

Admin chooses the usual proportional allocation or owner-funded allocation after reviewing an incident. In owner-funded mode the owner bears the full guest refund cost when found responsible, including the refunded Rentra-fee portion; Rentra retains its original fee. Founder confirms the example: INR 9,500 rental plus INR 500 fee = INR 10,000 paid;50% owner-funded refund returns INR 5,000 at the owner's cost, while Rentra retains INR 500. Guest refund percentage and cost allocation are separate decisions. This is a distinct incident exception: statements about Rentra bearing its refundable fee portion in ordinary cancellations apply to the proportional mode, not to owner-funded mode. Record responsibility and reason, never recover twice, and use separate owner repayment rather than future-payout deductions. Provider/accounting, taxes/extras and owner terms must support the selected flow; no bank debit or live money movement is authorized here.

## Child and pet policy research and existing support

Founder requests following market practice for children and pets. Market platforms offer configurable policies rather than one universal free-child age or pet fee.

- [Agoda child/occupancy setup](https://www.partnerhub.agoda.com/how-do-i-set-up-room-occupancy-child-rate-and-age-groups-and-extra-beds/): property age groups, child charges on existing beds and breakfast settings, with extra-bed/cot rules separate. Different pricing bases require explicit definition; do not copy an adult-percentage calculation without agreeing the denominator.
- [Booking.com child policies](https://developers.booking.com/demand/docs/accommodations/child-policies): preserve actual child ages; distinguish pricing from capacity and cots/extra beds. A free child can still count toward occupancy. A free stay does not establish free meals or bedding.
- [Booking.com property settings](https://developers.booking.com/connectivity/docs/content-api-modules/property-details-api/implementing-property-api-settings): ordinary pets may be allowed, prohibited or on request, with free/charges-may-apply flags. These flags alone are not a complete authoritative pet quote.
- [Airbnb pet fees](https://www.airbnb.com/help/article/3623): configurable pet count and flat fee units per booking, night, pet or pet-night, with charges reflected in the guest price. Its assistance-animal policy distinguishes service animals from ordinary pets; this is a comparator policy, not a statement of Rentra's local legal requirements.

Targeted source findings: `Rentra/components/partner/listing/HotelSections.jsx` offers `childFreeAge`, `maxChildren`, fixed `extraChild` and a pets yes/no control. Backend `schemas/zod/listing.js:284`/`:294` and `booking/hotel-setup.js` validate/save those; `domain/hotel.js:60` uses one free-age threshold and validates human occupancy. `HotelRooms.jsx:147` carries child ages; `HotelFacts.jsx:60`/`:78` displays basic child/pet wording. This does not establish multi-band child pricing, cot promises or pet count/fee/approval support. Broader pet behavior outside inspected hotel paths remains unassessed.

Product flow: owner defines policy, guest declares ages/pets, search and room selection respect eligibility, server quote includes charges, checkout clearly discloses policies and booking preserves them. Founder selects only Pets allowed/Not allowed at launch; no Allowed-on-request or pet-approval workflow. Allowed pets follow owner limits/pricing and normal booking mode. Owner-selectable pet units are per stay, per night, per pet and per pet-night. Do not silently convert children into adults or include pets as human guests. Child-policy detail, free-pet pricing, supported pet restrictions, accommodation scope and assistance-animal handling remain open. No application code changed or new runtime tests ran.

## Review eligibility and early marketplace trust

Founder requested market research because completed-stay-only eligibility could slow early review collection. The approved booking-linked eligibility and arrival/access exception follow below.

- [Airbnb review guidance](https://www.airbnb.com/help/article/13) ties home reviews to reservations and provides a post-checkout review window. [Its authenticity policy](https://www.airbnb.com/help/article/2673) requires relevant first-hand experience; certain check-in-day cancellations may allow review, but this is not blanket eligibility for a no-show.
- [Booking.com guest-review standards](https://bookitbutton.booking.com/content-moderation-policy/guest-reviews-standards.en-us.html) permit reviews for a platform-booked accommodation where the reviewer stayed or arrived but did not stay. This is broader than completed-stays-only, but still linked to actual booked experience.

Founder approved booking-linked reviews for genuine stays, with a reviewed path for arrival/access incidents, and post-stay invitations/reminders. Use honest "New listing/No reviews yet" states while reviews accrue. Do not fabricate ratings, present an inspection badge as guest satisfaction, or infer permission to import third-party reviews. External testimonials or review import would need a separate provenance/permission and score-display decision; no such feature is approved. Invitation timing and review window remain open; the agreed publication/moderation rule follows. Current `rentra-backend/src/services/reviews/service.js` invokes `rentra_review_eligible` and describes completed-stay reviews within 30 days; extending eligibility needs source/database validation, not just UI changes.

### Review publication and moderation: market comparison

Founder requested the global-market approach; interpreted as established marketplace practice, not a global toggle setting. No universal publication rule exists.

- [Airbnb home reviews](https://www.airbnb.com/help/article/13): no prepublication moderation; reviews publish when both parties submit or the review window ends. The timing depends on Airbnb's two-sided review system, which Rentra has not adopted.
- [Booking.com content verification](https://www.booking.com/content-moderation-policy/content-verification-and-enforcement.en-us.html): automated content checks and human moderation, with ongoing enforcement. Do not label every platform instant-publish or manually approved.

Founder approved automatically publishing eligible ordinary reviews after basic checks and routing flagged/reported content to admin. Retain a clear reason/audit trail for moderation; do not remove a review solely for being negative or require owner approval to publish it. Arrived-but-could-not-stay review eligibility remains a reviewed exception. This requires no assumed machine-learning service or reciprocal host reviews. Existing Rentra source has reason-coded admin moderation; exact automatic/publication behavior still needs schema/runtime validation.

## Airbnb whole-apartment model: market research

Founder requested this research before agreeing how apartments should be priced.

- [Entire-place listing definition](https://www.airbnb.ca/help/article/317): guest has the whole place privately, distinct from a private/shared room. Relevant for Rentra's already-confirmed exclusive apartment unit.
- [Minimum/maximum nights](https://www.airbnb.com/help/article/880): host sets trip-length limits in nights, with optional custom minimum-stay rules. No universal Rentra maximum is derived from this.
- [Nightly pricing](https://www.airbnb.com/help/article/52) and [pricing overview](https://www.airbnb.com/resources/hosting-homes/a/understanding-pricing-on-airbnb-370): owner nightly rates can vary through default, weekend and date-specific values. [Guest total](https://www.airbnb.com/help/article/125) includes applicable owner charges, platform fees and taxes. Do not copy Airbnb's fee rate or payout policy into Rentra.
- [Calendar management](https://www.airbnb.com/resources/hosting-homes/a/manage-your-calendar-654): availability, check-in/out, preparation time and instant/manual booking choices are distinct controls.
- [Monthly payment behavior](https://www.airbnb.com/help/article/245): stays of 28 nights or more use monthly installments. This is a separate feature/financial model, not a necessary consequence of nightly pricing or permission for Rentra to add monthly billing. Rentra long-stay limits/payment policy remain open.

Founder approved a whole apartment as one exclusive inventory unit priced nightly, with owner-defined minimum/maximum nights, check-in/out times, availability and date rates. Founder groups apartments with whole-property farm/villa rentals rather than hotel room inventory. Guest chooses dates/party, sees whole-unit details, facilities and authoritative total, and follows Rentra's existing booking mode and approved money policies. Do not use hotel room quantity for a single apartment or infer that this changes existing farm/villa booking units. Source helper `domain/verticals.js` branches hourly versus slot while hotels use dedicated stay paths elsewhere; the helper alone does not prove apartment readiness or decide architecture. No implementation made.


## Child-age classification: follow-up market evidence

Founder requested market evidence after clarifying an owner-selected child range with all other ages treated as adults. This research does not by itself replace that decision.

- [Agoda property child policies](https://partnerhub.agoda.com/how-do-i-setup-child-age-policies-with-different-age-brackets-and-prices/) lets hotel-type properties define infant/child ages and child pricing ranges, with room/rate-plan child rates.
- [Agoda occupancy and child-rate setup](https://www.partnerhub.agoda.com/how-do-i-set-up-room-occupancy-child-rate-and-age-groups-and-extra-beds/) separates minimum permitted guest age, child age groups, existing-bed child charges, extra beds, occupancy and cots. It supports up to three child pricing groups. Its percentage-of-adult-price example uses room rate divided by searched adults; this is not evidence for using the entire nightly room rate as a child percentage base.
- [Booking.com child policies](https://developers.booking.com/demand/docs/accommodations/child-policies) describes children as ages 0–17 and preserves actual ages throughout the flow. Property minimum guest age is an admission restriction, not a rule converting younger guests to adults. Free/paid age bands, room occupancy and cot/extra-bed rules are separate. Do not silently change actual ages or guest classification simply to obtain a rate or fit a room.

Founder-approved follow-up model (supersedes the earlier outside-range-means-adult interpretation): collect actual ages and distinguish infant/child pricing ranges from the adult-rate threshold; cover younger ages explicitly rather than treating an infant below a selected child minimum as an adult. Owners can configure their infant/child charging rules, while admission, occupancy, bedding and meals stay separately disclosed. Illustrative ranges are not universal Rentra defaults. No automatic free-infant, free-cot or additional child fee is approved by this research. The earlier fixed-versus-percentage child-charge proposal remains unanswered.


## Historical proposals and decision rationale

Earlier proposals below are retained as rationale; current approved policy above takes precedence.

### Founder follow-up on the seven business choices

Founder confirms owner-controlled early-departure refund availability and time-dependent terms, including refusing unused-night refunds after check-in. Keep guest-facing terms and booked snapshots. Do not interpret this as automatic entitlement or a chosen unused-night calculation base; that base/current-night boundary remains to be defined if offered. Reviewed property/access issues remain separate.

Founder confirms processing/refund costs shared between Rentra and owner and explicitly asks that owners be informed. Share ratio is not specified; do not infer 50/50 or rental/fee proportions. Record owner acceptance and separate statement lines. Guest entitlement and prohibition on unrelated future-payout offsets remain. Owner-set price cannot be described as guaranteed net after agreed shared costs.

Founder says support within 12 hours: record initial human acknowledgement/response within 12 elapsed hours, with final resolution distinct. Do not invent staffed 24/7 coverage; urgent denied-access/safety escalation and actual team ownership still need operating arrangements.

Current fee research checked 2026-10-25:

- [Airbnb official service fees](https://www.airbnb.com/help/article/1857): transitioning home hosts from split fees to single fee. Single fee: most hosts pay 15.5%; remaining hosts typically pay 14-16%, and hosts in Brazil/Mexico pay 16%. The fee is deducted from the host payout. Split model: most hosts pay 3%, plus a guest fee typically ranging from 14.1-16.5%, with variation. Hotels/serviced apartments generally use single fee. Do not call Airbnb3% its total marketplace charge or apply a single universal rate.
- [Airbnb fee transition update](https://www.airbnb.com/resources/hosting-homes/a/simplifying-airbnb-service-fees-746), updated2026-10-13, explains15.5% host fee and net-price adjustment. Its percentage denominator/payer differs from Rentra owner-price-plus-guest-fee model.
- [Booking.com official registration FAQ](https://join.booking.com/faq.html) says actual commission appears in the property agreement; it does not establish one global fixed percentage for every property.

Proposal, not approved: a5% guest-added launch fee on the previously agreed pre-tax owner rental/extras subtotal is materially below Airbnb's cited single-fee benchmark. Owner subtotal10000 -> Rentra fee500 -> guest10500 before tax; refund reserve and processing-cost shares reduce usable margin. This is an introductory pricing hypothesis, not validated unit economics, and cannot guarantee a lower guest total when owner prices, promotions, inclusions, taxes and fee bases differ. Preserve global/owner overrides. Do not set an automatic competitor-linked live rate or assume all competitors charge more in every booking.

Founder asks explanations of funding, retrospective/beyond-proceeds owner liability, and notice/receipt start; these remain unanswered business choices rather than implicit acceptance.


### Commission, platform fee and displayed total: clarification

Founder pauses to clarify whether displayed booking price contains commission and whether a platform fee is a further recharge. No new fee model or rate is approved by the question. Under existing selected Rentra owner-subtotal-plus-fee model, commission and Rentra service/platform fee mean one revenue charge, not two. Guest-facing trip price already includes it; the breakdown line identifies its component without adding it twice. Payment-gateway processing charges are an underlying supplier expense shared under owner terms; no extra guest convenience/processing/recharge fee is authorized.

Illustration only, not approval of proposed5percent: owner subtotal10000 + Rentra service fee500 =10500 before applicable tax. Guest discovery shows10500 before tax (clearly labelled if tax excluded), and price details show10000+500, not10500+another500. Final payable amount/taxes are disclosed before payment; known all-in totals should be shown where calculable. Owner settlement separately itemizes any agreed processing-cost share, so owner subtotal is not a promise of net cash after all costs.

Official market sources checked 2026-10-25:

- [Airbnb service fee structures](https://www.airbnb.com/help/article/1857) distinguishes host-deducted single fee from split host/guest fees; [total price breakdown](https://www.airbnb.com/help/article/125) says single-fee listings do not also charge a guest service fee. Thus do not describe15.5percent host fee plus another ordinary guest fee on the same single-fee booking.
- [Airbnb global total-price display](https://news.airbnb.com/total-price-display-is-now-standard-globally) includes fees in search trip totals, with tax-display differences by jurisdiction and final tax-inclusive total before checkout. Itemized service fee does not mean another charge outside that total.
- [Booking.com owner FAQ](https://join.booking.com/faq.html) says property pays booking commission set in its agreement. This supports owner-paid commission as a distinct commercial model; it is not proof every booking/channel has identical taxes/payment fees.

No actual frontend display or live checkout was verified in this clarification. Existing hotel fee/payout mismatch remains a code gap; documentation intent is not implementation evidence.


Founder confirms the recommendation above: one "Rentra service fee," included in the displayed trip total and itemized once in its breakdown. This approval addresses fee structure/display, not the still-proposed5percent rate. Payment-gateway expense remains separate internally; owner/Rentra processing-cost split remains undecided.


### Proposed launch approach to gateway costs: pending founder choice

Founder asks the assistant to propose the best approach rather than another cost-split quiz. Recommendation for initial owner acquisition and simple price communication: Rentra absorbs ordinary payment-gateway charges from its one service fee, with no extra guest processing surcharge and no ordinary gateway deduction from the owner accommodation subtotal. This is a proposed change to the previously confirmed shared-cost approach, not an approved replacement; the PRD retains shared costs until the founder accepts the proposal. Existing tax/statutory adjustments and reviewed incident-refund owner liability remain distinct. Ordinary cancellation processing costs retained by the provider are a Rentra expense under this proposal; they are not silently charged to guests or offset against unrelated owner payouts.

Why: honors the original owner-set-price promise, makes onboarding easier to explain, avoids small surprise deductions and leaves one transparent guest fee. The alternative proportional share remains available if the founder prioritizes near-term margin, but it reduces owner proceeds below their set accommodation subtotal and must be clearly disclosed. No claim that one model is best for all marketplaces.

Primary sources checked 2026-10-25: [Razorpay pricing](https://razorpay.com/pricing/) FAQ gives baseline 2% plus GST, with payment-method variation, optional services and promotional/custom offers; do not budget against a temporary 0% offer without eligibility evidence. [Airbnb fee explanation](https://www.airbnb.com/resources/hosting-homes/a/how-much-does-airbnb-charge-hosts-288) lists guest-payment processing among costs covered by its service fee. This supports fee-funded processing as a real market approach, not proof of Rentra profitability.

Illustrative planning only; no 5% rate was approved at this stage: owner subtotal INR 10,000 + service fee INR 500 = guest total INR 10,500 before booking taxes. At an assumed 2% gateway charge on INR 10,500, the gateway cost is INR 210 before GST. Rentra retains INR 290 before gateway GST, Route/payout/other product fees, support, hosting, marketing, refund losses and applicable tax/accounting adjustments. Owner accommodation subtotal10000 has no ordinary gateway deduction under this proposal; statutory treatment still needs validation. Recalculate using contracted total-payment fees and taxes, not just owner subtotal. Five percent may be an introductory pilot hypothesis, not a sustainable universal price. Review actual contribution and cancellation costs after first five paid bookings and completed stays without changing milestone definitions.

No new fixed fee, cost-allocation setting, pricing automation or application code is requested or added. Existing confirmed fee structure remains; proposed cost responsibility and5percent rate await founder decision.


