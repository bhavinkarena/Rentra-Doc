# Money and status clarity review

26 October 2026. Verdict: **strong**. **0 blockers, 0 high, 0 medium, 1 low finding.** No commercial decision needs reopening.

Reviewed DESIGN.md, EXPERIENCE.md, the complete decision log, approved checkout/status/support/refund-decision HTML and their notes against finalized PRD FR-11–15/FR-20/NFR-2, the addendum and money decision register. Later approved decisions govern; current implementation is not the target specification. This was a document/specimen-source review, not a fresh browser or transaction check.

## Finding

**M1 — Low: promoted refund reference still denies its visual approval.** [Refund HTML, line 25](mockups/key-admin-refund-decision.html) says it is “not … an approved visual result.” This contradicts the later approval in [.memlog.md](.memlog.md), [DESIGN.md, Components](DESIGN.md#components) and [refund notes](mockups/refund-decision-notes.md). It does not alter the displayed money, but leaves the handoff's approved-versus-proposed status ambiguous. **Fix:** update that sentence to describe the approved visual direction while preserving the planned/unimplemented financial-workflow and disabled-command limits. Source artifacts were not edited by this reviewer.

## Confirmed coverage

- Checkout and status lead with the selected two-night/one-room/two-adult total. INR8,000 rent + 5% INR400 fee + explicitly illustrative INR480 tax = INR8,880; no duplicate service fee or gateway surcharge. PRD FR-12 remains authoritative for paid-extra fee base, owner-wide authorized overrides and immutable booked snapshots. A default-rate fixture does not prohibit overrides.
- EXPERIENCE UJ-2 and checkout disclosures retain full payment, manual approval before payment, quote-change acceptance, holds and authoritative recovery. Unknown outcomes prevent a new charge; late capture without stock does not manufacture confirmation.
- Every guest scenario identifies Test and actual bank collection/refund INR0. Confirmed booking requires verified Test capture plus inventory. Owner cancellation, refund initiation and verified refund completion are separate. Reporting an issue does not automatically cancel or award money.
- UJ-3 and the refund specimen distinguish the final cumulative target, prior/in-flight refunds, additional guest due, responsibility and historical reassignment. Both allocations pay only INR5,000 more to the guest. Owner-funded responsibility rises by INR5,250, including the prior INR250 Rentra share, and totals INR10,000. The INR10,000 = INR9,500 + INR500 fixture is repeatedly labelled historical allocation, not a 5%-of-rent launch quote.
- Prior assumed verified collection INR2,000 is subtracted: projected recovery is INR8,000 owner-funded or INR7,500 proportional, versus current outstanding INR2,750. Projection is distinct from execution. Rentra's retained fee is gross before costs, not profit; above-proceeds owner liability and owner agreement are disclosed.
- Guest refund remains independent of recovery. Receipt evidence starts the separate debt clock; sending/link creation does not prove receipt or collection. Missing receipt has no invented due date. Replacing a link preserves the clock. UJ-4 retains owner-wide overdue restrictions and verified full repayment; no future-payout offset or automatic bank debit is introduced.

The concise spines deliberately inherit product rules by reference. Unrendered zero/lower-target cases, precise day-5/day-7 timing, multiple obligations, effective override settings and payout modes remain governed by PRD FR-12–14/FR-20/NFR-2; their absence from these frozen fixtures is not a contrary requirement or a new mockup blocker. Implementation must preserve those cases.

## Disclosed implementation and live gates

Fee/payout reconciliation, executable incident/recovery workflows, available refund liquidity, provider/account/channel evidence, authoritative calculations/concurrency/authorization, owner terms and validated tax/accounting treatment remain delivery or release gates. They are disclosed dependencies, not evidence that the UX money contract is broken. Approved mockups and historical local checks establish neither running-app parity nor live readiness.

Cross-lens observation for synthesis: the support fixture's current access-denial report defaults to Normal priority although PRD FR-19 classifies denied access as urgent. Assess that under support/state coverage; it is separate from refund entitlement and is not counted as a money finding here.

Skipped: fresh browser, running-app, provider, bank and legal/accounting validation. Risk: static reference accuracy cannot certify financial execution.


## Resolution recorded by facilitator

26 October 2026. Stale visual-status wording resolved in promoted and working refund specimens. Supplemental urgency observation resolved by selecting Urgent for the denied-access support example; no response-time promise or escalation command is executed. These are corrections to documentation/specimens, not application changes. See validation-report.md for final disposition and bounded confirmation evidence.
