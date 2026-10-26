# Product source extraction for UX discovery

Extracted 2026-10-25. This report is supporting evidence, not a design decision or implementation-completion claim. Paths below are relative to repository root; `PRD/` abbreviates `_bmad-output/planning-artifacts/prds/prd-Rentra-2026-10-25/`, `Brief/` abbreviates `_bmad-output/planning-artifacts/briefs/brief-Rentra-2026-10-24/`.

## Authority and historical conflicts

- `PRD/prd.md:3` is final for downstream UX/architecture; `PRD/prd.md:12` expressly does not certify release readiness.
- `PRD/market-questions-and-answers.md:5` and `PRD/addendum.md:9` give explicit founder decisions precedence over competitor differences and replace dated unresolved wording only where adopted.
- Approved 5% global service fee with admin owner-wide overrides and Rentra-funded standard gateway costs supersedes historical shared-cost and pending-rate proposals (`PRD/addendum.md:14`, `:16`, `:20`; `PRD/prd.md:197`). One service-fee line is already included in displayed total; no extra processing surcharge.
- Owner-controlled voluntary early-departure refunds use unused, unstarted nights and attributable booked components, superseding earlier full-booking ambiguity for this action alone (`PRD/addendum.md:23`, `:25`, `:27`). Pre-arrival and owner-cancellation bases remain unchanged.
- Retrospective owner-funded cumulative liability, including above original owner proceeds, and receipt-evidence-based repayment clock are approved; earlier passages calling them unresolved are historical (`PRD/addendum.md:34`, `:36`).
- Human initial response within 12 elapsed hours is approved; actual urgent/on-call coverage is still unresolved (`PRD/prd.md:280`).
- Explicit infant/child ranges preserve actual ages and do not convert infants to adults; earlier outside-range-as-adult wording is superseded (`PRD/addendum.md:144`; `PRD/prd.md:237`).

## Settled guest experience

- Farms, villas, entire apartments and hotels are launch categories. Leisure farm/villa demand and Ahmedabad starting market remain hypotheses/supply-dependent; entertainment, vehicles, subscriptions and identity APIs are deferred (`PRD/prd.md:16`, `:32`, `:402`; `Brief/brief.md:17`).
- Preserve premium, trustworthy, relaxing, nature-oriented, modern and simple direction and existing routes/contracts/design system unless a confirmed gap needs change (`PRD/prd.md:20`, `:40`).
- UJ-2 protagonist Priya searches location, dates and party, chooses property/offer, understands price/policies, pays fully through Rentra, then accesses booking/payment/refund records (`PRD/prd.md:51`, `:53`, `:227`, `:347`). No advance/balance or pay-at-property collection.
- Show selected-trip/party total prominently with mandatory known charges and clear tax status; final payable breakdown before payment. Refresh/review changed quotes; preserve valid selections across login/navigation (`PRD/prd.md:149`, `:197`, `:347`).
- Default automatic confirmation needs verified full payment and valid inventory. Manual owner approval comes before payment; approval is not confirmation. Preserve up-to-24h owner response then 12h payment, capped by arrival (`PRD/prd.md:330`, `:332`, `:334`).
- Policy cancellation shows booked terms, affected room(s)/nights, prior refunds and calculated refund before confirmation; eligible refunds initiate automatically. Cancellation and refund progress are separate; pending/failed/unknown provider outcomes do not become success (`PRD/prd.md:157`, `:159`, `:175`, `:177`, `:179`, `:187`). Owner cancellation gives full paid refund, including fee/tax/extras, counting earlier refunds (`:141`).
- Early departure is not automatic entitlement; owner policy may be 0%. Confirmed eligible action releases unused future inventory only. Current commenced night is consumed; no hourly proration (`PRD/prd.md:165`, `:167`).
- Hotels collect child ages in completed years at check-in, not DOB for pricing; occupancy, admission, bedding/cots, meals and price are distinct. Do not hide required bedding or imply free child means free cot/meals (`PRD/prd.md:237`, `:239`, `:241`, `:243`, `:316`).
- Pets allowed/not allowed only; no on-request approval workflow. Declare count separately; show owner restrictions, fee unit/calculation and total. Assistance cases are separate, subject to local specialist validation (`PRD/prd.md:256`, `:258`).
- Private-home exact address/private owner contact only to authorized confirmed guests; hotel's public business address may stay public (`PRD/prd.md:280`).
- Booking-linked issue intake reuses support, keeps relevant booking context, accepts credible non-photo evidence, and does not require owner response first. Collect discovery time/affected rooms or nights/remedy. Normal target is 72h from discovery, urgent access/safety promptly; no automatic cancellation/refund from filing a report (`PRD/prd.md:278`, `:280`, `:286`).
- Genuine reviews, honest no-review states; ordinary compliant review auto-publishes, flagged/reported content goes to admin. Arrival-but-could-not-stay eligibility exception is reviewed. Preserve 30-day window, invite post-checkout and one day-7 reminder; no owner veto or new public-reply feature unless already supported (`PRD/prd.md:300`, `:302`).

## Settled owner and admin experience

- UJ-1 Raj can prepare private draft while identity verification is pending; owner verification, property evidence approval, publication completeness, date availability, owner pause and other restrictions remain distinct (`PRD/prd.md:46`, `:48`, `:91`, `:133`, `:135`). Automatically publish once all prerequisites are satisfied, with at least one future sellable priced period rather than opening all dates.
- Evidence checks distinguish documents/video/physical visit. Selective physical inspection is allowed, not mandatory; public claims must describe performed checks (`PRD/prd.md:99`). Material identity/authority/address/unit changes need recheck; routine rates/calendar edits do not inherently need identity review (`:135`).
- Corrections are itemized and draft saves remain private. Explicit Resubmit for review alerts team; no-response reviewer reminders at 7/15/30 days from original request. Direct reasoned rejection and same-listing resubmission remain possible, with full review history and private reviewer notes protected (`PRD/prd.md:105`, `:111`, `:117`, `:119`). Portal is durable record; transactional email is companion notice.
- Deactivation has two distinct choices: stop new bookings while keeping existing stays, or also cancel upcoming stays. Preview confirmed bookings and unpaid requests separately and show individual results. Upcoming is strictly before booked local check-in; current/completed stays excluded (`PRD/prd.md:133`).
- Hotels configure rooms, full facilities, plans/inclusions, beds/capacity and date rates; reuse effective nightly rate and current calendar capabilities. Default cancellation policy with explicit plan override avoids authoring every room/meal combination (`PRD/prd.md:175`, `:310`, `:312`, `:314`, `:316`).
- Apartments are exclusive whole units, nightly with min/max stays, dates, check-in/out, optional preparation buffer/cleaning fee; no leases/installments or universal 28-night cap (`PRD/prd.md:266`, `:268`, `:270`).
- Admin fee override and payout Auto/Manual override are separate owner-wide settings; owners cannot change them. Payout launch default Auto after verified capture/eligibility; initiation differs from bank settlement (`PRD/prd.md:197`, `:205`).
- Admin issue review chooses 0–100 cumulative refund target and proportional/owner-funded responsibility separately. Preview extra guest money due separately from historical responsibility reassignment; preserve reason/actor/history (`PRD/prd.md:288`, `:290`, `:292`).
- Rentra refunds guest first and collects owner obligation separately without future payout offsets or automatic bank debit. Owner repayment uses obligation-linked verified collection; day-5 reminder/day-7 due begins on evidenced receipt, not mere send. Expiry/replacement link does not reset debt. Owner-wide new-booking block persists while any overdue blocking debt remains; repayment removes only that restriction (`PRD/prd.md:207`, `:213`, `:215`, `:217`, `:219`, `:221`).

## Existing versus planned evidence

Source-confirmed baseline, not runtime certification: core farmhouse discovery/accounts/booking and owner/admin tools; default instant/manual modes and payment gating; hotel room types/beds/meal plans/fixed extra-person pricing/date rates; basic hotel child/pet settings; booking-linked support and completed-stay review gate (`PRD/prd.md:356` table; `Brief/addendum.md` sections Hotel rooms, Existing booking confirmation, Date-dependent pricing).

Known launch gaps/unproven implementation: guest-fee versus hotel owner-commission mismatch; configurable cancellation editor; rich child policies, pet counts/fees, explicit bedding/percentage pricing; full room-facility editing/display; apartment exclusive inventory/stay limits; broader incident/recovery/review exception/reminder flows (`PRD/prd.md:169`, `:356`; `PRD/addendum.md:43`, `:47`, `:101`, `:112`). Existing source must be checked before labeling any individual capability missing or implemented.

Historical tests: 8 hotel domain, 5 bedding assertions, 4 mixed-date assertions, 6 frontend display and 1 deadline test passed; request-to-book database integration skipped. No browser, hosted migration or live provider journey established (`PRD/prd.md:368`).

## Remaining meaningful UX decisions to assess against frontend/design documentation

These sources establish behavior, not final presentation. Do not ask again about adopted business rules. Check existing frontend patterns before any question about:

- How guest trip/party/room selection and inclusion/policy comparison adapt on phones while preserving current routes and useful filters.
- How to present booking, guest payment/refund, owner payout/recovery and verification/publication as distinct understandable states with one clear next action.
- How owner forms expose advanced child, bedding and cancellation controls without overcrowding, inheriting defaults and existing editor structure.
- How admin prioritizes verification, urgent support and financial exceptions using existing workspace information architecture.
- Exact honest public verification wording and explanatory evidence detail, grounded in performed checks and local operational checklist.
- Device/browser matrix, language/theme/motion needs, only where not already captured in the design system. Current user supplied mobile guest/responsive desktop owner-admin emphasis as a starting assumption, not an old PRD decision.

## Release evidence gates, not design-opinion questions

Refund reserve INR 40,000 is proposed/unfunded, with exposure limits/monitoring not approved; provider/account support for early transfers/refunds/repayment/disputes unproven; India tax/owner terms/authority evidence/retention/assistance-animal and check-in-age/cot constraints need specialist/operational validation. Actual urgent support hours/duty ownership remain absent despite approved 12h initial response. Browser/device and WCAG2.2 AA/Core Web Vitals targets require measurement, not conformance claims (`PRD/prd.md:374`, `:380`, `:392`, `:414`; `PRD/market-questions-and-answers.md:7` and final Evidence gates section).

## Supporting market research locations

- `PRD/market-stay-rules.md`: accommodation, unused-night recommendations (now approved by later addendum), actual child ages, occupancy/cot boundaries and whole-apartment practices.
- `PRD/market-money-rules.md`: provider payment/transfer/refund/recovery evidence. Historical shared-cost/pending-fee language yields to latest approvals.
- `PRD/market-operations-rules.md`: verification/publication, selected-trip totals, contact/privacy, support, reviews, pets and quality. Historical support-target/fee uncertainty yields to current register/PRD.
- `Brief/addendum.md`: earlier official platform research, source paths, screenshots and focused test limits. It is support, not authority over current finalized requirements.

No independent fresh web, runtime, browser, live financial or specialist verification performed by this extraction.
