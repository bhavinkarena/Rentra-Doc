# Addendum input reconciliation

26 October 2026. Read the complete PRD `addendum.md` and the current draft architecture spine. Later approved fee, early-departure, liability and receipt decisions take precedence over historical proposals. This is a source-to-contract check, not a new implementation audit.

**Verdict:** The draft preserves the principal approved financial boundaries, but four binding source decisions need an explicit rule or an exact normative requirement reference before handoff.

## Findings

1. **High — payout timing and configuration remain underspecified.** Addendum line 80 fixes payout after verified guest payment, global Auto by default, authorized owner-specific Auto/Manual override, and initiation distinct from completion. AD-8 coordinates current eligibility, but no AD fixes that timing or mode precedence. A payout feature that retains Tuesday/after-check-in eligibility and one that initiates after capture could both follow the present AD wording. `source-evidence.md` identifying the legacy mismatch does not itself bind its replacement. Add the approved timing/default/override rule, common eligibility checks for both modes, and current-mode recheck for uninitiated work without duplicating initiated/uncertain transfers (per finalized PRD FR-13).

2. **Medium — ordinary cancellation entitlement and automatic initiation are not explicit.** Addendum lines 53, 55 and 76 bind the full paid component basis, equal-percentage proportional owner/Rentra allocation, and policy-entitled cancellation refund initiation after guest confirmation without routine admin approval. AD-9 covers incident targets and full owner-cancellation entitlement, while AD-10 covers scope/time; neither expressly governs this ordinary flow. Two implementations could agree on caps/snapshots yet calculate room-only refunds or wait for admin approval. Add a compact rule or precise normative FR-9/FR-11 reference fixing the basis, allocation and automatic initiation; preserve the unused-night exception and exception review path.

3. **Medium — reusable hotel policy inheritance is implicit.** Addendum line 66 requires one default hotel cancellation policy, replaced only by an explicit rate-plan override. AD-4 freezes effective terms and AD-10 handles mixed policies but does not bind resolution precedence. Owner editor and quote engine could independently require per-plan policies or choose different fallback behavior. Bind default-to-plan override resolution before snapshotting; room type or meal inclusion alone does not require a new cancellation policy.

4. **Medium — review publication/moderation ownership lacks the approved transition rule.** Addendum line 121 approves ordinary eligible reviews publishing after basic checks, flagged/reported content going to admin, and reviewed arrival/access eligibility. AD-13 fixes the window/reminder, while the structural seed names the eligibility gap; it does not prohibit a new owner-approval or universal prepublication-admin queue. Bind the approved publication path and reasoned moderation, including no removal solely for negativity; no imported or reciprocal-host reviews are implied.

## Preserved correctly

- One 5% launch guest service fee with authorized owner-wide override; ordinary gateway cost belongs to Rentra; historic cost-sharing proposals are not adopted.
- Confirmed voluntary early departure uses only unused future nights and original allocations, with current/commenced nights consumed and no automatic hourly proration.
- Cumulative owner-funded liability, retrospective reassignment and above-proceeds liability remain distinct from additional guest money; no automatic bank debit or unrelated payout offsets.
- Owner repayment is separate from payout/refund, capped/reserved against debt, and cannot undo completed guest refunds.
- Original receipt-evidenced day-5/day-7 clock, replacement-link continuity, composed owner restrictions and multiple-debt handling remain intact.
- INR 40,000 is still proposed; funding/exposure response is unresolved. No new automatic payout pause, booking cap or reserve commitment is silently selected.
- Provider/account, specialist accounting/legal, staffing and runtime evidence remain gates. Existing generic code does not prove delivery.

No spine edits were made. No application, provider, database or runtime checks were run; exact implementation shapes remain downstream work.
