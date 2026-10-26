---
project: Rentra
status: final
created: 2026-10-25
updated: 2026-10-26
sources:
  - ../../prds/prd-Rentra-2026-10-25/prd.md
  - ../../prds/prd-Rentra-2026-10-25/addendum.md
  - ../../prds/prd-Rentra-2026-10-25/market-questions-and-answers.md
  - ../../briefs/brief-Rentra-2026-10-24/brief.md
  - ../../briefs/brief-Rentra-2026-10-24/addendum.md
  - ../../prds/prd-Rentra-2026-10-25/market-stay-rules.md
  - ../../prds/prd-Rentra-2026-10-25/market-money-rules.md
  - ../../prds/prd-Rentra-2026-10-25/market-operations-rules.md
  - ../../../../../Rentra/README.md
  - ../../../../frontend/DESIGN.md
  - ../../../../frontend/docs/rentra-customer-sessions.md
  - ../../../../frontend/docs/rentra-payment-flow.md
  - ../../../../frontend/docs/OWNER-WORKSPACE-UI.md
  - ../../../../frontend/docs/ADMIN-FINANCE-WORKSPACE.md
  - ../../../../../rentra-backend/README.md
  - ../../../../backend/docs/ARCHITECTURE.md
  - ../../../../backend/docs/API.md
---

# Rentra - Experience

## Foundation

Responsive web for guests, owners and admins, with the existing caretaker surface retained where it supports review/visit evidence. Guest discovery is mobile-prioritized, with desktop-capable owner/admin tools. The user approved representative phone/desktop layouts; real-device usage and usability still require validation. Inherit Tailwind 4, shadcn/Radix, existing route groups, APIs, validation, permissions and session behavior. [DESIGN.md](DESIGN.md) owns visual identity; behavioral specifications here reference its tokens.

Authority: finalized PRD, its addendum and the decision register are primary; later approved decisions override earlier proposals. Supporting brief/research and implementation records explain context. Current source establishes what exists, not what is commercially approved or production-ready. This contract captures approved rules by reference and records the accepted presentation changes.

| Classification | Meaning and examples |
|---|---|
| Existing baseline | Discovery/saved places, authentication recovery, quotes/holds, hosted Test checkout, booking records, support/reviews and substantial owner/admin tools have implementation evidence. Hotel rooms/plans/date rates and manual approval exist. Preserve working behavior. |
| Approved requirement; gap or unproven | New fee/payout alignment, richer child/bedding/pet policies, complete facilities, whole-apartment rules and expanded incident/recovery/review exceptions require implementation reconciliation. A design does not mark these delivered. |
| Approved UX direction | Optional cross-category filtering and the demonstrated photo-first room, owner setup, admin and guest money/status layouts are approved. Further changes require comparison with the incumbent; specimen approval does not establish implementation or production readiness. |

The improvement test is explicit: identify the current problem, compare the proposed screen at phone and desktop sizes, and retain it only if it improves comprehension/action without losing functionality, accessibility or truthful information. No wholesale replacement is authorized by the words “next level.”

## Information Architecture

Preserve existing supported routes and links; this is a logical surface map, not a request for new URLs. Profiles in the last column supply state coverage in State Patterns. All private surfaces additionally inherit permissions/session handling.

| Surface | Reached from | Job / journey | State profile |
|---|---|---|---|
| Home, search, category and saved results | Entry, search, saved navigation | Find suitable stays across categories; optionally filter type; UJ-2 | Browse |
| Property detail, photos and verification detail | Result card | Understand place, actual checks, facilities, policies and availability; UJ-2 | Browse + Detail |
| Stay/party, room and rate-plan selection | Property detail | Select valid dates/slot, people, rooms and offer; UJ-2 | Selection |
| Login, OTP and account recovery | Booking gate or navigation | Restore authenticated selection and requote; UJ-2 | Form + Identity |
| Quote review, payment and booking outcome | Valid selection / approved request | Accept total/policies, pay, recover authoritative outcome; UJ-2 | Selection + Money |
| Booking list/detail and cancellation preview | Bookings or confirmation link | Track booking/payment/refund; manage accepted booking; UJ-2 | Records + Money |
| Booking-linked support, issues and review | Booking detail / eligible invitation | Seek help, submit evidence or genuine review; UJ-2 and UJ-3 | Form + Records |
| Guest account, notifications, privacy and policy pages | Account/navigation/context links | Retain existing settings/history and reference content; UJ-2 supporting surfaces | Form + Records |
| Owner onboarding and identity evidence | Owner entry / account state | Verify owner while allowing private drafts; UJ-1 | Form + Review |
| Owner dashboard, search and property portfolio | Owner navigation | Identify next operational task and property state; UJ-1 supporting surface | Records |
| Property setup, correction and review history | Portfolio/detail/reviewer notice | Configure property, hotel/apartment rules and submit/resubmit; UJ-1 | Form + Review |
| Property overview and calendar | Portfolio / owner calendar | Distinguish publication, open dates, rates and restrictions; UJ-1 | Selection + Records |
| Owner booking detail, requests and deactivation preview | Dashboard/booking queue/property | Decide unpaid request or manage existing commitments; UJ-1 and UJ-2 | Records + Review + Money |
| Owner earnings, statements and recovery obligation | Owner finance / notification | Distinguish rent, receipts, payout and debt; UJ-4 | Records + Money |
| Owner support, reviews, team, settings and updates | Owner navigation | Preserve existing operational supporting tasks; UJ-1 and UJ-4 supporting surfaces | Form + Records |
| Admin verification queue, property/evidence detail | Admin navigation / review alert | Assess evidence and itemized corrections; UJ-1 | Records + Review |
| Admin bookings, support and incident detail | Queue / booking-linked issue | Review evidence and select remedy; UJ-3 | Records + Review |
| Admin finance and recovery detail | Incident / finance queues | Preview refund responsibility, track execution and owner obligation; UJ-3 and UJ-4 | Records + Review + Money |
| Admin operations, content, access and audit | Existing capability-filtered navigation | Preserve existing health, privacy, export and governance tasks | Records + Review + Form |
| Caretaker assignment and evidence | Existing authorized assignment | Support performed physical-check/visit evidence where applicable; UJ-1 | Records + Form + Review |

Visual coverage is approved: existing supporting surfaces retain their layouts and follow the written behavior/state rules. The user accepted the [20-surface coverage map](.working/final-mock-coverage.md), including the written-only portions of partially mocked flows. No standalone new caretaker experience or new admin queue taxonomy is inferred.

## Voice and Tone

Use plain action labels, exact scope and a supported next step. Brand voice lives in DESIGN.md. Booking, payment, refund, payout and verification are separate facts; avoid a single ambiguous “Success.” INR formatting, dates and references use the existing domain formatters.

| Situation | Meaning to communicate |
|---|---|
| No dates or unresolved party | “Add dates and guests for your total.” Estimates must be labelled; do not claim a final payable total. |
| Manual request | “Waiting for owner approval.” After approval: payment required before the displayed deadline; approval alone is not confirmation. |
| Unknown payment outcome | “We’re checking your payment and booking.” Preserve recovery; do not invite another charge before reconciliation permits it. |
| Test checkout | Explicit Test label and no-real-money disclosure. Never imply bank collection from a Test capture. |
| Cancellation/refund | State booking cancellation separately from refund requested/processing/completed/failed. Include amount and reference when authoritative. |
| Verification | Describe the actual document/video/physical checks performed. Unchecked or unavailable evidence does not become “verified.” |
| Owner draft/corrections | “Draft saved” does not imply submitted. “Resubmit for review” is a separate action. |
| Support | Acknowledge receipt and next step; preserve the approved 12-elapsed-hour initial human response commitment. Resolution is separate; support hours and urgent/on-call coverage must be established before launch. |
| Payout/recovery | Recorded initiation is not bank settlement. Owner repayment is separate from future payouts. |

## Component Patterns

Approved admin interaction references: [verification](mockups/key-admin-verification.html) shows submitted evidence, revision-specific reasons and separate publication/bookability states; [support](mockups/key-admin-support.html) separates guest replies from internal notes and keeps booking/payment/refund context distinct. Internal-note mode hides status-changing controls. All operational commands remain disabled in these offline specimens. [Limitations and continuation](mockups/admin-workflow-notes.md) apply; the user approved both demonstrated directions on 26 October.

Owner setup interaction references: [Rooms](mockups/key-owner-rooms.html) and [Rates](mockups/key-owner-rates.html) show editable native fields, optional-detail disclosures and local step navigation. Saving and operational commands are disabled in these specimens; preserve production guards and server validation. [Preview limits](mockups/owner-setup-notes.md) apply; the user approved the demonstrated Rooms and Rates direction.

Component names match DESIGN.md. These are behavioral rules above the inherited native/shadcn primitives.

| Component | Behavioral rules |
|---|---|
| Navigation | Keep supported role navigation, active location and deep links. Returning from detail restores useful list filters/position. Mobile navigation remains keyboard/touch operable; role switching cannot expose another identity's cached data. |
| Search and filters | Category choice is optional. Preserve location/dates/party and selected type across navigation where supported. Expose applied filters and clear/remove actions. Category filtering must not silently reset valid trip inputs. |
| Listing card | Open property through its primary link; Save is independently operable. Display server-backed verification/rating and honest missing states. Dated price context must match the trip. |
| Room card and rate plan | Let Priya compare room identity, beds/capacity, included meals, cancellation and total before selecting quantity/offer. Preserve server availability and existing quantity guards. Advanced facts may be disclosed, but mandatory constraints/charges cannot be hidden. |
| Forms and setup | Keep labels, field errors and entered values. Save draft and submit/resubmit remain distinct. Additional advanced controls inherit visible defaults and explicit overrides, without hiding required child/bedding/cancellation configuration. Preserve unsaved-change guards. |
| Calendar | Retain existing keyboard/date selection, property-local dates, open/close commands and rate overrides. Do not equate payment-unavailable with date-unavailable. Preserve owner nested-dialog/unsaved-change behavior where already implemented. |
| Booking summary | Reflect the authoritative selected-trip quote, mandatory known charges, tax status, policies and environment. Show one fee-inclusive total with understandable breakdown. Requote changed inputs/versions; require review before proceeding on a changed quote. |
| State badge and trust details | Keep domain-specific state labels; do not flatten booking/payment/refund/payout or owner/property states into a generic enum. Expose explanatory checks and next action only where evidence/permissions support them. |
| Record list and detail | Preserve filters, pagination, references, keyboard navigation and direct URLs. Show each record's important state/action before secondary metadata. Financial tables retain distinct amounts and environments. |
| Review and confirm | Preview affected rooms/nights/bookings, amounts, prior refunds, consequence and responsibility before a consequential command. Revalidate stale previews. Read-only roles see no mutation controls. |
| Feedback and loading | Keep action pending while the server decides; prevent duplicate commands through existing guards. Inline errors remain near the affected field/task. Persist financial outcomes in the record rather than relying on a disappearing toast. |
| Photo gallery | Keep real photos, explicit missing/failure states, meaningful alternative text and accessible previous/next/close controls. Proposed expanded room photo access must not hijack card selection or rely on swipe alone. |

## State Patterns

Every IA surface inherits its assigned profiles plus the global rules below. Exceptions are additive; they never remove server validation or security boundaries.

| Profile | Empty / initial | Loading / focus | Error / offline / permission |
|---|---|---|---|
| Browse | Explain no inventory or no matching results separately; offer supported filter/date correction. Missing images/reviews remain explicit. | Layout-matched skeletons for initial fetch; stable results while refreshing with honest busy state. Focus follows document order. | Preserve search on failure; retry supported fetch. Offline content cannot promise current inventory or price. Private Saved prompts authentication. |
| Detail | Missing property/record uses existing not-found handling; incomplete optional facts are not fabricated. | Reserve photo/summary geometry; details and gallery have labelled focus targets. | Unavailable/deleted/private listings follow existing access rules; no leak of private address/contact. |
| Selection | Explain missing dates/party/offer and invalid occupancy, child age, pet or stay-length inputs. | Recalculate with clear pending state; announce changed totals without moving focus. | Sold-out, quote-changed and hold-expired states preserve valid selections and explain what must change. Offline cannot confirm price or stock. |
| Form | Clear starting instructions; inherited/default settings explicitly identified. | Pending labels and submitted scope remain visible; validation directs focus to errors and links to fields. | Preserve entered data on rejected save; never claim unsaved values persisted. Existing navigation guard protects dirty work. No invented offline write queue. |
| Identity | Explain OTP/login requirements; selection context retained safely. | Existing sending/verification/rate-limit states remain; input labels and recovery links usable. | Expired/invalid OTP, unavailable service and session expiry give supported recovery; preserve only safe context. Unauthorized private data is withheld. |
| Records | Honest empty list with supported next action; zero is not unknown. | Preserve list geometry, filters and detail return context. | Retry failed loads without wiping context. Capabilities control record visibility and commands; stale private content is not another role's fallback. |
| Review | Distinguish not submitted, pending, corrections requested, rejected and approved. | Existing preview/review pending state retains itemized evidence and actor/reason history. | Stale version requires new preview. Permission-denied forbids the command; unsent corrections are not reviewer notifications. |
| Money | Distinguish no transaction, no eligible payout, no refund and zero actual collection. | Processing/unknown remains non-final. Persist identifiers and status recovery; disable duplicate action while appropriate. | Verified failure differs from unknown. Test/simulated/live namespaces remain separate. Provider timeout does not confirm or fail a booking by itself. |

Global: visible focus uses the inherited ring; semantic errors use `{colors.danger}` with text. Offline and reconnect must revalidate before a write. Gateway-disabled browsing remains usable; no new payment attempt is offered when disabled, while existing attempts/refunds continue according to server rules. A page rendered from cache must not pretend its money/availability facts were freshly verified.

Special states: owner identity, property approval, publication completeness, pause, availability and overdue-debt restriction are individually explainable. Owner deactivation preview separates unpaid requests from confirmed upcoming stays. Issue filing is neither cancellation nor refund approval. Cancellation completion does not imply refund completion. Live payout execution remains unavailable until its release gates are met.

## Interaction Primitives

Approved financial-exception reference: [refund decision](mockups/key-admin-refund-decision.html) illustrates UJ-3/UJ-4 using two frozen responsibility comparisons at the same 100% cumulative guest target. Switching allocation changes owner/Rentra responsibility and projected recovery, not additional guest money. The reason is locally editable; the target and amounts are static examples. All review/confirmation/collection commands are disabled. [Fixture and limits](mockups/refund-decision-notes.md) apply; user visual approval was recorded on 26 October.

Approved guest flow references: [checkout](mockups/key-guest-checkout.html) and [booking/payment/refund status](mockups/key-guest-booking-status.html) illustrate UJ-2 acceptance, disclosures and separate money/booking facts. Review-only radio controls select static example records, not application transitions. All financial commands remain disabled; production quote, hold, policy and recovery behavior is inherited. [Check results and limits](mockups/guest-checkout-notes.md) apply. The user approved the demonstrated guest directions on 26 October.

Status-specific fixture limits are recorded in [guest-status notes](mockups/guest-status-notes.md); the four review scenarios are static examples, not live transaction controls.

Approved hotel interaction direction: [hotel room selection](mockups/key-hotel-rooms.html) demonstrates native offer selection, matching example totals, facilities/price disclosures and narrow-screen summary access. [Baseline comparison and limits](mockups/mockup-notes.md) distinguish the simplified one-room specimen from existing quantity, inventory and payment behavior. Preserve those production rules when implementing the approved direction. This is not a functional booking implementation.

Preserve existing behavior first. The user's “top level interaction” direction is interpreted as purposeful, responsive feedback and continuity; the demonstrated refinements are approved. Further changes must pass the incumbent comparison before replacing working behavior.

| Interaction | Intended refinement / boundary |
|---|---|
| Press, hover and focus | Immediate acknowledgement using existing styles. Hover is optional enhancement; all actions remain available by touch/keyboard. Keep visible focus independent of animation. |
| Filter and room selection | Preserve focus and trip context, update only relevant results/summary, show pending/revised state. Do not animate a price change as if it were a discount or move the selection target. |
| Dialog and disclosure | Clear origin, labelled content, Escape/close and focus return. Interruptible short opacity/translation only if it improves orientation. Preserve existing owner calendar nesting instead of imposing a blanket modal rewrite. |
| Saving and mutation | Stable action position and pending label; success follows server acknowledgement. No optimistic confirmation for booking, payment, refunds, publication or permission changes. |
| Page and list transitions | Preserve scroll/filter context where supported. Do not add forced scroll, scroll-jacking or whole-page choreography to task flows. |
| Motion | Prefer existing timing/easing. [ASSUMPTION] If a new transition is needed, begin testing at 150–220ms with the inherited ease-out, then verify responsiveness. Reduced motion removes translation/scale and nonessential autoplay; feedback remains understandable without motion. |

No new animation dependency is assumed. Do not add elastic buttons, cursor effects, decorative parallax or confetti to financial/operational flows without a specific user benefit.

## Accessibility Floor

Target WCAG 2.2 AA across supported responsive web surfaces; this is a requirement, not a conformance claim. Contrast rules are in DESIGN.md. Semantic controls, descriptive links, visible labels, accessible names and errors must survive refinements.

- Preserve at least 44px primary touch targets and spacing; never make swipe/hover the only way to act. Fields remain readable at `{typography.body.fontSize}` on phones.
- Keyboard traversal follows reading order. Dialogs manage initial focus, containment, close and return; error summaries connect to fields. Sticky controls do not cover focused elements.
- Expose selected/expanded/pending states programmatically. Announce meaningful quote/status updates politely without repeating the entire page; errors requiring immediate action are identifiable.
- At zoom/reflow, stack details/price rather than clipping amounts or policies. Tables that must remain tables scroll locally with accessible region labels; the page does not overflow horizontally.
- Respect reduced motion and forced colors. Do not use color alone to communicate verified, selected, unavailable, failed or completed.
- Test image alternatives, calendar keyboard operation, screen-reader naming and actual phone ergonomics. Automated checks supplement manual evaluation.

## Responsive & Platform

| Context | Behavior |
|---|---|
| Phone | Guest search, photos, trip inputs, total and next action stay readable with one-hand use. Photo-first room proposal retains details-left/price-right only while it fits. Sticky booking affordances honor safe areas and keyboard/focus visibility. |
| Tablet | Preserve useful comparison space; collapse operational navigation according to existing shell behavior. Do not squeeze multiple panes below readable widths. |
| Desktop | Guest comparison may use a summary rail; owner/admin retain task-dense lists, forms and contextual detail. Keep the current portfolio photo treatment. |

Use current breakpoints rather than inventing a second responsive system. Validate at least 320/390/768/1024/1440px and keyboard/zoom, then real iOS Safari/Android Chrome before release. The approved device emphasis is a design choice, not measured usage evidence; no native app or offline booking capability is implied.

## Inspiration & Anti-patterns

Airbnb and hotel-booking platforms are references for familiar discovery, photo-led comparison and transparent total prices. Official-source notes are in [.working/room-presentation-reference-check.md](.working/room-presentation-reference-check.md); those checks did not establish the platforms' current visual geometry.

Taste contributes intentional hierarchy, product-specific imagery and restraint; Impeccable contributes coherent task flow, state completeness, responsive craft and bounded visual validation. Inherit Rentra's palette/type/sidebar even where a generic style rule would suggest a different identity. Reject hidden charges, misleading verification, fake scarcity, overcrowded forms and changes made only for novelty.


## Inherited Timing Contracts

These approved source rules are explicit timing constraints, not new defaults. Use authoritative property-local instants and recorded receipt evidence; implementation must preserve the booked/versioned rule.

| Flow | Timing contract |
|---|---|
| Manual booking request | Owner response window up to 24 hours, followed by 12 hours to pay after approval; both capped by arrival. Approval does not confirm a booking. |
| Guest issue report | Normal reporting target: 72 hours from discovery, with approved exceptions. Access/safety issues require prompt urgent escalation; late evidence is assessed under the source rules rather than automatically rejected. |
| Support first response | Human initial response within 12 elapsed hours; resolution is separate. Staffing, published support hours and urgent/on-call coverage must support this commitment before launch; no invented 24/7 claim. |
| Guest reviews | Preserve the 30-day review window, invitation after checkout and one day-7 reminder. Eligibility and reviewed arrival-without-stay exceptions follow the PRD; no owner veto. |
| Owner corrections | Reviewer reminders at 7, 15 and 30 days from the original correction request. Draft save is not resubmission. |
| Owner recovery | Reminder on day 5 and repayment due by day 7 from evidenced receipt, not mere sending. An unpaid overdue blocking balance restricts owner-wide new bookings; verified full repayment clears only that restriction. Replacing a link does not restart the original clock. |

## Key Flows

These preserve the PRD's named examples and titles. The steps express the approved experience contract, not new interviewed-user evidence. Demonstrated layouts are approved; changes beyond those references still require comparison with the incumbent.

### UJ-1: Raj gets his property approved and available to guests

1. Raj enters owner onboarding and submits identity evidence; he can prepare a private property draft while verification is pending.
2. He completes property facts, photos, category-specific rooms/pricing/policies and at least one future sellable priced period through existing setup/calendar surfaces.
3. Authorized reviewers inspect evidence and request itemized corrections, video or a selective physical check as needed; caretaker evidence remains scoped to assigned work.
4. Raj saves corrections privately and explicitly resubmits. Submission receipt/history distinguishes saved from awaiting review; reviewer reminder timing follows the PRD.
5. Owner verification, property approval and publication prerequisites are independently visible. **Climax:** Raj sees that the property is public and whether dates are actually bookable, with the supported next action for any remaining restriction.
6. Later, deactivation presents the two approved choices and previews affected confirmed stays versus unpaid requests before execution.

Failure: upload/save errors retain valid work; rejection includes reason and supported same-listing resubmission. Approval alone does not override incomplete pricing, owner pause or overdue-debt restriction. Owner cancellations route full guest refund entitlement and separate recovery handling through the approved money workflow.

### UJ-2: Priya finds and pays for a stay

1. Priya searches near Ahmedabad for a weekend with friends using location, dates and party. She can browse suitable categories together or apply a villa/farm/hotel/apartment filter.
2. She opens a property, examines real photos, actual verification detail, facilities and policies. Private-home address/contact restrictions remain intact.
3. She selects a supported booking option: slot-aware farm/villa flow, hotel room/rate plan or exclusive whole-apartment nightly stay when implemented. Hotel comparison leads with photos, facts and the total; child ages, bedding, meals and pet requirements stay explicit.
4. Login restores valid selection and requotes. In manual mode she requests owner approval before payment; approval opens the supported deadline. Automatic mode proceeds with eligible inventory.
5. She reviews the authoritative full-trip total/breakdown, tax status, booked policies and payment environment, then explicitly accepts and pays in full through Rentra.
6. **Climax:** authoritative verified payment plus valid inventory produces a confirmed booking with accessible booking, payment and policy records. Test confirmation is clearly identified as Test, with no actual bank collection claimed.
7. From booking detail she tracks payment/refund separately, previews policy cancellation before confirming, seeks booking-linked help and submits a genuine eligible review.

Failure: unavailable dates, expired hold or changed quote preserve recoverable selection and require revalidation. Unknown payment is processing, not another charge invitation. Late capture without inventory enters visible resolution/refund handling, never overbooking. Filing an issue does not silently cancel; owner early-departure policy applies only to eligible unused unstarted nights and is not an automatic entitlement.

### UJ-3: Kunj reviews an incident and resolves the guest request

1. Kunj opens a booking-linked issue with discovery time, affected rooms/nights, requested remedy and credible available evidence. The guest need not wait for an owner response first.
2. Authorized staff assess the issue, related booking/policy and prior refunds; internal notes and private attachments remain protected.
3. Kunj declines with reason or chooses the approved cumulative 0–100% refund target and proportional/owner-funded responsibility separately.
4. Review and confirm shows additional guest money due separately from historical responsibility reassignment, affected records and audit reason.
5. **Climax:** the persisted decision and guest-facing next step are visible; refund initiation, provider completion and any owner obligation remain distinct tracked outcomes.

Failure: stale preview requires recalculation; missing finance capability prevents the command. Provider uncertainty stays unresolved with investigation reference. No unsupported urgent response hours, resolution guarantee or reserve-funding claim is introduced.

### UJ-4: Raj repays his share after Rentra refunds the guest

1. After Rentra funds the approved guest refund, Raj opens his separate assigned repayment obligation and evidence-backed calculation.
2. Admin sends the obligation-linked collection route. The receipt-evidence clock and due/reminder dates are displayed without claiming a sent email proves receipt.
3. Raj repays through the supported verified collection process; an expired/replaced link does not reset the debt.
4. If unpaid beyond the approved deadline, owner-wide new-booking restriction is visible with the obligation and supported repayment action. Existing bookings and unrelated restrictions remain distinguishable.
5. **Climax:** verified full repayment clears that debt restriction, while any separate pause/verification restriction remains. No future-payout offset or automatic bank debit is implied.

Failure: incomplete/unknown repayment does not clear the obligation. Provider collection capability and live execution remain release gates; the UI cannot manufacture an actionable live link before those capabilities exist.

## Requirement and Delivery Boundaries

| PRD requirements | UX location |
|---|---|
| FR-1–6 | UJ-1, owner setup/review, verification states and caretaker evidence scope |
| FR-7 | UJ-1 deactivation and UJ-3/4 money consequences |
| FR-8 | UJ-2 search/filter and comparison |
| FR-9–11 | UJ-2 booked-policy/cancellation preview, owner default/override setup |
| FR-12–15 | UJ-2 total/payment, UJ-3 refund, UJ-4 recovery and separate owner/admin finance records |
| FR-16–18 | UJ-2 category/party/offer selection and UJ-1 category-specific setup |
| FR-19–21 | UJ-2 support/reviews and UJ-3 incident review |
| FR-22–24 | UJ-1 hotel setup/calendar and UJ-2 selection/authentication/booking records |

All demonstrated visual directions and the remaining written-only coverage are approved. The selected rubric, accessibility/responsive and money/status reviews are complete; findings are resolved and source reconciliation/editorial polish are recorded in the validation report. Approval of a simplified specimen does not replace testing the running application. Evidence-derived verification copy, real-device usability, operational support coverage, tax treatment, live provider/account capabilities, reserve funding and legal/local evidence constraints remain implementation/release dependencies. Do not solve them by inventing UX promises.
