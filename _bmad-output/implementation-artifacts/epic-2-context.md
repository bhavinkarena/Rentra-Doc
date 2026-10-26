# Epic 2 Context: Guests book and manage stays with clear money outcomes

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Let guests book eligible stays with clear accepted terms, then manage cancellation and refunds without losing retained rooms or confusing booking status with money movement. Owners and admins need truthful payout and recovery records. Financial release remains conditional on provider, funding, accounting and hosted evidence; local implementation does not authorize Live enablement.

## Stories

- Story 2.1: Approve ready properties and explain restrictions
- Story 2.2: Configure and quote one inclusive service fee
- Story 2.3: Retain accepted trip terms through login
- Story 2.4: Hold eligible inventory and respect booking modes
- Story 2.5: Verify full payment and recover uncertain checkout
- Story 2.6: Configure percentage cancellation and plan inheritance
- Story 2.7: Preview exact booked-policy refunds
- Story 2.8: Confirm cancellation and reserve eligible refund
- Story 2.9: Dispatch refunds and reconcile verified outcomes
- Story 2.10: Cancel selected rooms without repricing retained rooms
- Story 2.11: End stays using booked unused-night rules
- Story 2.12: Control effective payout modes and eligibility
- Story 2.13: Initiate and reconcile eligible owner payouts
- Story 2.14: Pause new bookings while retaining commitments
- Story 2.15: Cancel upcoming owner stays with full entitlement
- Story 2.16: Show distinct guest owner and admin money records
- Story 2.17: Assign owner recovery after funded guest refunds
- Story 2.18: Generate and verify owner repayment links
- Story 2.19: Record evidenced repayment notice receipt
- Story 2.20: Restrict overdue owners and clear only settled debt
- Story 2.21: Demonstrate financial release gates without unsafe enablement

## Requirements & Constraints

Publication requires approved current property evidence, approved owner identity and complete bookable setup. A visit is selective, not mandatory for approval; a scheduled visit holds publication. Pauses and restrictions remain independent. Automatic bookings require verified full payment and eligible inventory; manual owner approval precedes payment and is not confirmation. Preserve the manual response/payment windows capped by arrival.

One guest-paid service fee applies to rent and paid extras before tax: global 5%, replaced by an authorized owner-wide override including zero. Changes may be future-dated, never backdated. Accepted bookings retain their effective policy, fee, component amounts, allocations, dates, property timezone and schedule. Owner edits cannot rewrite them.

Cancellation uses configured percentage windows, with an exact cutoff taking the later window. Standing decisions permit up to six hour-based windows with thresholds of 1–720 hours, one at/after-check-in percentage and an optional early-departure percentage. Hotel plans inherit the property default unless explicitly overridden. Ordinary percentages apply to all attributable paid components, including rent, fee, tax and extras; prior and reserved refunds count. Each selected room uses its own booked policy. Retained rooms keep their dates, confirmation, prices and terms. Shared charges retain original room allocations rather than moving to retained rooms.

Confirmed early departure affects only nights starting strictly after the confirmed request instant; commenced nights are consumed, with no hourly proration. Release only affected inventory. No-show or an unconfirmed preview triggers no automatic refund. Owner cancellation covers upcoming check-ins strictly in the future and targets full paid entitlement, counting earlier refunds. Separate unpaid requests and raced captures from confirmed stays.

Refund entitlement, cancellation, provider completion, payout and recovery are distinct. Zero due records no money movement. Unknown outcomes require reconciliation before another create. Payout eligibility begins after verified capture and confirmation, without waiting for check-in; global Auto/Manual defaults to Auto with an optional owner override. Recovery follows funded refunds and assigned responsibility, separately from future payouts, with no automatic owner-bank debit or cross-booking offset. Receipt evidence starts the day-5 reminder/day-7 repayment clock; sending alone does not. Full verified repayment clears only debt restrictions.

Do not invent provider old-payment refund limits, timing estimates, gateway costs, dispute caps, tax/accounting treatment or funding. GST on the fee, outdated published 8% policy text, discovery cancellation filters, hosted acceptance and account capabilities remain open gates.

## Technical Decisions

Backend services own authoritative policy and transitions. Reuse the existing transaction, inventory, job and notification patterns. Monetary computation uses checked integer paise, explicit currency and deterministic largest-remainder allocation with stable line-ID ties. Zero-price lines receive no shared allocation; all-zero weights with nonzero charges require an explicit basis or rejection. Preserve legacy conversion at its existing boundary.

Bind preview/confirm to actor, action, affected records, amounts and relevant versions using a verified digest/version. Clients submit selections and consent, never trusted payable amounts. Serialize owner guards before listing locks, then sorted orders, visits and sorted reservations; use stable multi-listing order and bounded transaction retries. Recheck eligibility under these guards. Provider calls occur outside transactions.

Atomically persist authorized movement intent, reservation and domain decision. Idempotency binds actor/scope and canonical request hash: replay returns the recorded outcome; changed payload conflicts. Count completed and initiated/uncertain refunds and other reconciled reimbursements against verified paid capacity. Fence durable worker claims; lease expiry does not prove a call was unsent. Verify provider account, environment, operation, references, currency, amount and state before applying outcomes. Test, simulated and Live evidence never mix. Persist notification intent with business decisions; email failure cannot undo entitlement.

## UX & Interaction Patterns

Use the approved design system and guest checkout/status references. Show authoritative trip totals, effective policies, affected and retained rooms/nights, prior refunds and exact consequences before confirmation. Revalidate stale previews. Keep booking and refund progress separately labelled; initiation never promises bank credit or timing. Preserve valid selections across authentication and recover rejected/stale actions without optimistic success.

Primary touch targets are at least 44px. Keep visible labels/focus, readable phone inputs, accessible dialogs and keyboard recovery. Pending/error states retain context and prevent duplicate actions. Check responsive reflow and complete flows; cached money or availability is not fresh evidence.

## Cross-Story Dependencies

Fee and accepted-term snapshots support all later cancellation and money stories. Booked policies, preview/confirm and reserved refund dispatch precede selected-room cancellation; unused-night departure builds on that scoped model. Payout, owner cancellation and refund responsibility must share order-level money capacity. Recovery requires verified funded refunds, then evidence-backed receipt before overdue restrictions. Final financial acceptance depends on actual provider, hosted, funding and specialist gates rather than local tests alone.
