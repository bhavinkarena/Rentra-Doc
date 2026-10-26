---
id: SPEC-Rentra
status: final
created: 2026-10-26
updated: 2026-10-26
companions:
  - ../../planning-artifacts/prds/prd-Rentra-2026-10-25/prd.md
  - ../../planning-artifacts/prds/prd-Rentra-2026-10-25/addendum.md
  - ../../planning-artifacts/prds/prd-Rentra-2026-10-25/market-questions-and-answers.md
  - ../../planning-artifacts/ux-designs/ux-Rentra-2026-10-25/DESIGN.md
  - ../../planning-artifacts/ux-designs/ux-Rentra-2026-10-25/EXPERIENCE.md
  - ../../planning-artifacts/architecture/architecture-Rentra-2026-10-26/ARCHITECTURE-SPINE.md
  - ../../planning-artifacts/architecture/architecture-Rentra-2026-10-26/source-evidence.md
  - capability-map.md
sources: []
---

# Rentra launch implementation spec

This spec and every adopted companion form the implementation contract. Companion detail remains authoritative; final status means ready for planning, not implemented or approved for release.

## Why

Rentra needs to reconcile its existing marketplace with approved launch behavior for guests, owners and admins. Guests must find a suitable verified stay, understand the full price, book and track money; owners must list and operate properties; admins must handle verification, support and financial exceptions. This contract directs incremental work on farms, villas, whole apartments and hotels while preserving supported functionality.

## Capabilities

- **CAP-1**
  - **intent:** Owners can prepare properties and obtain evidence-based review.
  - **success:** Private drafts remain non-public; correction saves do not resubmit; explicit resubmission and reasoned review preserve complete history and notices.

- **CAP-2**
  - **intent:** Owners can control whether verified, ready properties accept bookings.
  - **success:** Publication requires owner/property approval and complete sellable setup; pauses and owner-wide debt restrictions cannot be bypassed; deactivation previews separate unpaid requests and upcoming confirmed stays.

- **CAP-3**
  - **intent:** Guests can find suitable stays and retain valid trip/account context.
  - **success:** Optional category filters and eligibility-aware results show honest photos/facilities and fee-inclusive trip totals; authentication retains safe valid selections without account leakage.

- **CAP-4**
  - **intent:** Hotel owners can configure rooms, offers, facilities, bedding and date prices.
  - **success:** Selected room-night capacity, sleeping places, facilities, meal inclusions and effective policy are accurate; fixed/percentage bedding uses the approved nightly room-only basis without duplicate charges.

- **CAP-5**
  - **intent:** Owners and guests can price and accommodate children accurately.
  - **success:** Actual ages and room-local adults remain distinct from price categories; effective age policies, occupancy, meals, cots and bedding produce a complete authoritative quote with no zero-adult division.

- **CAP-6**
  - **intent:** Owners and guests can declare pets and understand their eligibility and charges.
  - **success:** Allowed/not-allowed policies, limits and four supported fee units apply across launch accommodations; declared pets are priced before payment and assistance-animal cases remain separate.

- **CAP-7**
  - **intent:** Guests can book an apartment as one exclusive whole unit.
  - **success:** Actual occupants, owner min/max nights, arrival restrictions, optional turnover buffer and disclosed one-off cleaning are enforced without room rental, leases or installments.

- **CAP-8**
  - **intent:** Guests can accept authoritative terms and pay the full booking total safely.
  - **success:** Automatic bookings confirm only after verified full payment and valid inventory; manual approval precedes payment; changed quotes require review; retries and late captures cannot duplicate bookings or reclaim expired stock.

- **CAP-9**
  - **intent:** Guests and owners can cancel eligible booking scope and track refunds.
  - **success:** Booked full-paid proportional policies, per-room allocations and the unused-night early-departure exception determine previews; entitled refunds initiate automatically, remain capped and distinct from cancellation, and preserve retained inventory.

- **CAP-10**
  - **intent:** Owners can receive eligible payouts under authorized payout settings.
  - **success:** Global Auto default or owner override governs initiation after verified capture and confirmation; Manual shares eligibility; initiated/uncertain transfers are reconciled and cannot conflict with refund obligations.

- **CAP-11**
  - **intent:** Guests can report booking problems and admins can decide reviewed remedies.
  - **success:** Urgent intake routes immediately without owner-response prerequisites; private notes cannot change status; cumulative refund target and responsibility adjustments are previewed separately with evidence, reason and permissions.

- **CAP-12**
  - **intent:** Admins can recover assigned owner obligations without altering later payouts.
  - **success:** Verified owner repayment reduces only its assigned debt; evidenced receipt drives reminders/due dates; any overdue balance blocks owner-wide new admission while payment clears only the relevant debt restriction.

- **CAP-13**
  - **intent:** Genuine booking-linked guests can submit reviews with fair moderation.
  - **success:** Eligible ordinary reviews publish after checks; arrival/access exceptions use reviewed evidence; reminders/window follow booked schedule and owners cannot veto negative reviews.

## Constraints

- All adopted companions are binding. Later approved addendum/register decisions supersede earlier proposals; retain original FR/NFR and AD IDs. The capability map groups work without replacing detailed acceptance rules.
- Preserve existing supported routes, contracts, design system and behavior unless a confirmed gap warrants change. Improve UI only against the incumbent; retain the premium emerald/champagne direction and approved mockups.
- Backend owns authoritative eligibility, money and mutations. Keep existing repositories and layered frontend/API/worker architecture; publish feature API/state/schema contracts before dependent work.
- Show one fee-inclusive total and an understandable breakdown. Launch fee is 5% globally with authorized owner-wide overrides; Rentra funds ordinary gateway costs. Accepted quotes, policies and allocations remain frozen.
- Use full upfront payment, manual approval before payment and guarded inventory confirmation. Distinguish booking, payment, refund, payout and recovery; Test activity is not bank money.
- Preserve integer-paise totals, deterministic allocations, cumulative refund caps including in-flight/uncertain and dispute reimbursements, stable operation identity and uncertain-outcome reconciliation.
- Keep guest refund entitlement separate from owner responsibility and recovery. No automatic owner-bank debit, unrelated payout offset or duplicate collection; receipt evidence and canonical overdue debt govern owner-wide restrictions.
- Enforce ownership/capability/privacy in backend commands and reads; internal notes remain private and cannot change status. Required notices and schedules are durable and auditable.
- Target WCAG 2.2 AA and PRD Core Web Vitals thresholds through complete-flow checks. Validate mobile-friendly guest and responsive owner/admin device emphasis; design approval is not measured usage or conformance.
- Provider/account, actual reserve/exposure, specialist accounting/legal, receipt evidence, staffing and runtime acceptance gates remain open. Final planning artifacts do not authorize money movement or release.

## Non-goals

- Entertainment, vehicles, other rental categories, owner subscriptions, third-party identity APIs and automatic demand pricing are post-launch.
- No apartment room rental, recurring residential rent, leases, installments, guest advance-plus-balance or pay-at-property collection.
- No ordinary-pet on-request approval flow, imported/fabricated reviews or reciprocal host-review system.
- No automatic owner-bank debit, unrelated future-payout recovery offset, interest/penalty feature, new shared code package or speculative platform rewrite.

## Success signal

- Demonstrate UJ-1 through UJ-4 against the approved acceptance cases, with no duplicate movements, confirmed overselling, unauthorized private access or ineligible confirmations in the release checks.
- After release prerequisites are met, achieve five team-approved real properties, then five genuine successfully paid bookings; report completed stays, cancellations/refunds, recovery and support outcomes separately.

## Open Questions

- Founder/finance: what funding, exposure ceiling, monitor and breach action are committed? INR 40,000 remains proposed, not funded or certified adequate (PRD OQ-2).
- Engineering/provider: which account capabilities, signed hosted Test journeys and receipt-channel evidence demonstrate the promised flows? Resolve before affected financial architecture sign-off/Live enablement (OQ-1, OQ-8, OQ-10).
- Founder and appropriate specialists: validate tax/invoice/remittance, owner liability terms, assistance-animal handling and private evidence retention before affected acceptance (OQ-3, OQ-12).
- Operations/product: confirm authority-document sufficiency, child supervision/cot supply, supported apartment duration and truthful urgent support ownership/coverage (OQ-4, OQ-6-7, OQ-11).
- Engineering/QA/UX: record feature concurrency/failure acceptance, browser/device/screen-reader coverage, deployment load/restore and quality measurements before release (OQ-5, OQ-8, OQ-13).
