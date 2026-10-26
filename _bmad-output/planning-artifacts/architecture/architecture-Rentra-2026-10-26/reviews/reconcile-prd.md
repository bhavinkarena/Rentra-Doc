# PRD input reconciliation

26 October 2026. Read the complete final `prd.md` against the draft `ARCHITECTURE-SPINE.md`; document reconciliation only. No application/runtime review.

Verdict: the main ownership, inventory, accepted-terms, money-state, recovery and release-gate constraints landed. Three shared rules need tightening before finalization; none requires reopening an approved product decision.

## Material findings

1. **Medium - payout timing/configuration contract is not normative in the spine (FR-13).** AD-6/8 govern verified payment and coordination, and source evidence identifies the historical hotel payout mismatch, but no Rule fixes initiation after verified capture plus confirmed-booking/owner/provider eligibility, global default Auto, authorized owner override precedence and identical Auto/Manual eligibility. Nor does it require queued uninitiated work to reread current mode while preserving initiated/uncertain transfers. Two compliant finance/configuration features could retain after-check-in payouts or disagree about setting precedence. Add those approved requirements to AD-8 (or a dedicated invariant); do not defer them to an undefined provider policy.

2. **Medium - ordinary refund basis/default allocation is underspecified (FR-9/10/11).** AD-9 names proportional versus owner-funded responsibility, but does not state that ordinary policy percentages apply to each affected scope's full booked paid components (rental, service fee, taxes and paid extras) and allocate proportionally between owner/Rentra; reviewed owner-funded cases are the exception. An implementation could keep the fee non-refundable yet satisfy the written ADs. Add the basis/default and automatic initiation after confirmed policy-entitled cancellation, without routine admin review. Preserve the explicit unused-night early-departure exception and prior/in-flight caps already present.

3. **Medium - urgent support routing has no immediate automated invariant (FR-19).** AD-13 carries 72-hour reporting and 12-hour first response, but only mentions urgent escalation generically. Intake and notifications could each defer escalation to the general queue. Require denied-access/safety/currently-stranded classification to create immediate automated routing/escalation independently of owner response, without equating it to cancellation/refund. Actual staffing and truthful contact options properly remain operating gates.

## Scope observations

- Deferring exact schema/migration/lock-guard details is safe only with the existing prerequisite to publish shared feature contracts before parallel dependent implementation; retain that prerequisite.
- The reserve, provider, specialist, duration, staffing and measured quality gates preserve PRD ownership and revisit conditions. No unresolved commercial value was invented.
- The initiative spine need not restate every child/pet/bedding formula, review rule or success-metric detail. Make source precedence explicitly normative: final PRD + later approved addendum/register semantics remain binding, and feature contracts must trace relevant FR/NFR acceptance cases. This closes the risk of a developer treating the compact spine as a replacement requirements document.

No code, hosted behavior, financial transactions or legal/provider capabilities were checked. The findings concern the written coordination contract, not implementation defects.
