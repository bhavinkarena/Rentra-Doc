# Rentra PRD money-flow review ? refreshed

Reviewed: 2026-10-25. This replaces the initial review snapshot. Inputs: current full `prd.md`, `addendum.md` and `market-questions-and-answers.md`, including the final FR-12 correction to standard gateway-cost responsibility. Explicit founder decisions and the register supersede historical proposals in the addendum.

## Verdict and counts

The routine functional money model is now sufficiently specified for downstream UX and provisional architecture work. No unresolved functional contradiction was found in this pass. The founder's early-payout, full-upfront and no-future-offset choices remain intact. Real-money launch remains blocked by three explicitly acknowledged high evidence/business gates; research and a proposed reserve do not satisfy them.

**Counts:** critical 0; high 3 (known release gates, not new functional defects); medium 0; low 0. **New functional design blockers: 0.** Detailed financial acceptance cannot be signed off until provider and component-accounting evidence is available, and launch needs committed refund liquidity/exposure controls.

## Previously raised findings: resolution

| Earlier finding | Current disposition |
| --- | --- |
| MF-1: refund-first funding/exposure | Still a known release/business gate; see RG-1. INR 40,000 is only a proposal, not committed funding or an approved cap. |
| MF-2: taxes, extras and costs | Commercial standard-gateway allocation is resolved: Rentra pays from its fee, including retained standard charges on ordinary refunds, with no ordinary owner deduction or extra guest surcharge. Owner-supplied extras are owner components. Exact statutory/component settlement remains RG-3. |
| MF-3: concurrent payout/refund | Resolved functionally by NFR-2, FR-13 and register M-2/M-3/M-15: one current obligation, reserve in-flight/uncertain movements, reconcile late outcomes, prevent incompatible new payouts. Verify both event orders downstream. |
| MF-4: cumulative refund responsibility | Resolved commercially and functionally by FR-20 and M-6?8. Percentage is a cumulative target; pay only the remaining guest difference. Audited owner-funded reassignment can include earlier Rentra responsibility and exceed original owner proceeds; deduct verified recovery already collected. Clear advance terms and enforceability remain RG-3. |
| MF-5: mixed hotel policies | Resolved by FR-10 and NFR-2: per-room booked policy, selected-room cancellation, immutable shared-charge allocation, stable integer-paise largest remainder and explicit zero-price handling. Retained rooms are not repriced. |
| MF-6: multiple owner debts | Resolved by FR-14/M-11: separate obligations, due dates and collection; block remains while any overdue blocking balance remains. No cross-debt allocation or future-payout offset is inferred. |
| MF-7: receipt-based clock | Resolved as a product rule: earliest evidenced confirmed delivery or authenticated view/acknowledgement, otherwise admin-confirmed recorded receipt. Replacements preserve the original clock. Actual channel evidence remains an implementation check. |
| MF-8: later disputes/reversals | Resolved as required lifecycle behavior through M-17 and FR-20 reconciliation of reimbursement channels. Actual provider/account outcomes and deadlines remain RG-2. |

During this rereview, FR-12 briefly retained a superseded sentence about shared gateway costs. The parent corrected it; verified current FR-12 now says standard payment-gateway cost is borne by Rentra from its service fee. This is resolved and is not counted as a residual finding. Historical shared-cost proposals in the addendum are explicitly superseded by its approved section.

## Remaining high release gates

### RG-1 ? Refund liquidity and exposure policy is not committed

**Locations:** FR-13?14, OQ-2; addendum ?Refund reserve proposal and confirmed liability/receipt rules?; register M-20/business choice 2.

OQ-2 accurately says INR 40,000 is ?not a funded commitment or approved exposure cap.? Early payouts can leave owner funds outside Rentra while guest refunds are due first. A seven-day owner deadline does not guarantee repayment or fund the refund.

**Counterexample:** four full INR 10,000 refunds consume INR 40,000 even before other obligations/costs; a fifth cannot be funded by merely issuing another owner repayment link. This arithmetic is not an adequacy assessment for actual bookings.

**Required before launch:** founder/finance must commit available refund liquidity, stress-test it against actual maximum/simultaneous refundable exposure and costs, name the monitor, and approve what happens before taking on exposure beyond the chosen limit. Do not invent a booking cap, automatic payout pause, reserve threshold or funded balance. Preserve existing guest entitlements and no-future-offset policy. Conditional UX/architecture can proceed with this gate visible; a ready-to-launch money contract cannot.

### RG-2 ? Actual provider/account capabilities remain unproven

**Locations:** OQ-1, FR-13?15, FR-20, Dependencies and launch readiness; register M-1/M-9/M-10/M-17/M-21.

The register distinguishes adopted lifecycle rules from account approval/test evidence. Public documentation does not prove Rentra can collect, initiate early transfers, refund partial/old payments, collect owner repayments, reconcile disputes or access refund funding under its actual account and contracts.

**Counterexample:** a guest remains entitled to a refund but the original payment is outside a supported refund window, or an initiated transfer has an unknown outcome. A correct PRD must not display success, retry blindly or assume funds can always be taken back from an owner's bank.

**Required before financial architecture sign-off/real money:** validate the approved provider/account model and supported booking lead/stay/refund windows; prove the relevant sandbox/account cases, event reconciliation and admin exception paths. Where a capability is unsupported, retain the entitlement and explicitly resolve an allowed alternative rather than silently promise execution. This report makes no fresh provider-specific factual claim and is not a new market-research request.

### RG-3 ? Exact component settlement and owner terms need validation

**Locations:** OQ-3, FR-7/9/10/12/13/20; register M-7/M-18/M-19.

Commercial choices are answered: 5% global guest-added fee with admin owner overrides; rental plus paid extras before tax is the fee base; Rentra absorbs standard gateway charges; owner-funded incident awards may retrospectively assign the full cumulative refund to the owner, even above original proceeds. Do not ask the founder to choose these again.

**Counterexample:** rental, cleaning/pet/breakfast extras, Rentra fee and applicable taxes are collected together, followed by selected-room cancellation or unused-night departure and then a larger reviewed owner-funded award. The guest amount can be scoped correctly while actual tax remittance/credit, payout and owner debt statements still need validated component treatment. Gross retained Rentra fee is not profit after Rentra-funded gateway costs.

**Required before financial acceptance/owner onboarding:** specialist validation of tax/invoice/remittance/credit/component accounting and enforceable owner consent to cumulative reassignment and beyond-proceeds liability; booked examples that reconcile guest cash, owner entitlement/payout, Rentra gross fee/cost and remaining recovery. This is external evidence and exact settlement work, not an unanswered ordinary processing-cost split.

## Financial acceptance cases to carry into architecture, stories and QA

These are verification obligations for already approved behavior, not extra feature proposals or new founder questions. They have not been executed by this review.

1. **Single service fee and cost responsibility:** owner subtotal INR 10,000 at the global 5% rate produces one INR 500 service fee and guest INR 10,500 before applicable tax. Show it once in total/breakdown. An owner override changes new quotes across that owner's listings, not accepted bookings. Standard gateway cost reduces Rentra margin, not the owner's ordinary accommodation subtotal, and creates no guest processing surcharge.
2. **Proportional cancellation:** on that pre-tax INR 10,500 booking, a 50% entitlement returns INR 5,250 = INR 5,000 owner component + INR 250 fee. Prior completed/in-flight amounts reduce further payable money; zero due produces no refund API call. Add validated taxes/extras cases when RG-3 is cleared.
3. **Cumulative owner-funded award:** use the preserved allocation-only historical example separately from the 5% quote: guest INR 10,000 = owner INR 9,500 + fee INR 500. After proportional INR 5,000 refund, a cumulative 100% owner-funded award pays only INR 5,000 more to the guest, reassigns earlier INR 250 responsibility, and sets total owner responsibility INR 10,000. Subtract verified recovery already collected; no duplicate guest refund or future-payout offset.
4. **Early departure:** three booked nights, first/current commenced night consumed and next two unstarted; apply any owner-offered percentage only to those two nights' attributable original components. At exact nightly start, test the commenced-night boundary explicitly. Do not reprice retained nights or refund consumed services. Also test owner 0%/no-refund policy, no submitted action, and a separately reviewed incident affecting a consumed night.
5. **Room-level scope:** refundable and non-refundable rooms retain their own terms. Cancel one room, preserve the other confirmation/rates, and release only affected inventory. Test shared charges, fractional-paise allocation, tied remainders, zero-priced rooms, all-zero invalid bases, prior partial refunds and later full-owner cancellation. Do not move cancelled-room charges to retained rooms.
6. **Concurrent and unknown movements:** verify refund-before-transfer and transfer-before-refund, timeout then late success, duplicate/out-of-order callbacks, Auto-to-Manual changes, and refund requests while another refund is uncertain. Reconcile against the same booking obligation and reserve in-flight amounts; do not independently pay both obsolete and updated obligations.
7. **Recovery and aggregate blocking:** two debts with different original receipt/due dates; one partial payment and one full payment; replacement/expired link; late/excess collection; day-5/day-7 boundary events. One settled debt must not clear another overdue debt. No receipt evidence means no automated overdue clock until receipt is evidenced/admin-confirmed. Clear only debt restrictions, preserving unrelated owner/admin/publication pauses.
8. **Capture/inventory and disputes:** raced capture after hold expiry or deactivation enters resolution without reclaiming inventory or automatically releasing an owner payout. Reconcile provider dispute/reversal reimbursements with platform refunds to avoid double reimbursement; preserve a completed guest refund while owner recovery remains pending.

## Scope and limits

No new unapproved fee, penalty, exposure cap, automatic debit, future-payout offset or delayed-payout policy is introduced. Functional design may proceed after retaining the three gates in downstream work; money launch and exact financial acceptance still require their evidence. Only this review file was updated. No application/configuration changes, financial actions, live account checks, new external research or runtime tests were performed.
