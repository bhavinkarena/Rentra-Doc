# Money-flow questions: market evidence and Rentra defaults

> Research snapshot: later founder approvals and overrides are recorded in the [current question-and-answer register](market-questions-and-answers.md) and [PRD](prd.md). Pending/open wording below describes the research stage, not necessarily the current decision.

Researched 2026-10-25 against the current PRD and `review-money-flow.md`. The founder authorized using market evidence to answer remaining questions, with only unanswerable business choices returned to them. This document does not prove Rentra implementation or live-account eligibility.

**Status key:** **Adoptable** means a sourced practice or compatible correctness default can answer the question under that authorization. **Synthesis** identifies Rentra-specific engineering/product logic rather than a claim that all marketplaces use it. **External gate** requires provider/accounting evidence. **Founder** means public market research cannot choose Rentra's money, contractual risk or actual rate.

## Preserved decisions

Keep full upfront guest payment through Rentra; owner payout after verified successful payment, global Auto default with owner override; proportional ordinary refunds on full guest-paid amount; reviewed owner-funded incident refunds as a distinct exception; Rentra refunds guests first and recovers assigned owner money separately; no future-payout offsets, unauthorized bank debits or direct guest-to-owner refunds. Keep day-5 reminder, day-7 owner-wide new-booking restriction and automatic removal only when its debt condition is cleared. Other platforms' payout schedules or offset rights do not replace these choices.

## Questions and answers

### M-1. What counts as payment success for Auto payout? — Adoptable / external gate

Use verified captured payment, an eligible confirmed booking, an onboarded eligible owner and provider transfer eligibility; a browser success screen is insufficient. Initiate Auto promptly after those checks, preserving the founder's timing choice. Transfer initiation, transfer processing and bank settlement are different stages. Razorpay documents creating linked-account transfers after capture and requires linked-account onboarding. Exact bank arrival and whether Rentra's approved business/account supports this flow remain provider evidence, not founder guesswork. [Captured-payment transfers](https://razorpay.com/docs/api/payments/route/create-transfers-payments), [Route onboarding](https://razorpay.com/docs/api/payments/route/).

### M-2. What if a transfer/refund times out or notifications arrive twice? — Adoptable

Record an unresolved outcome; fetch/reconcile provider state before starting another money movement. Verify events, deduplicate them and tolerate out-of-order delivery. Use supported idempotent requests plus Rentra's own booking/operation identity; provider support must be checked for the selected endpoint. Razorpay documents asynchronous notifications, duplicates, unordered delivery and idempotent refund endpoints. [Webhook practices](https://razorpay.com/docs/webhooks/best-practices/), [Refund APIs](https://razorpay.com/docs/payments/refunds/apis).

### M-3. Can payout and refund proceed independently on the same booking? — Adoptable synthesis

No. Reconcile against one current booking obligation, counting initiated and uncertain transfers/refunds. Once cancellation or refund approval changes that obligation, prevent a new incompatible payout; resolve already-started transfers rather than assuming funds remain with Rentra. A late successful transfer creates/adjusts the same booking's owner recovery obligation. This is same-booking reconciliation, never an offset against another future booking. Provider asynchronous and concurrent-operation behavior supports the need; this exact product rule is Rentra synthesis. [Refund API concurrency errors](https://razorpay.com/docs/api/refunds/create-normal/), [Webhook practices](https://razorpay.com/docs/webhooks/best-practices/).

### M-4. Does clicking refund mean the guest has received money? — Adoptable

No. Show initiated/pending, provider-processed, failed or unresolved progress and tracking references where available. Normal Razorpay refunds are described as taking 5–7 working days; do not promise this universally or present it as Rentra's guaranteed SLA. The provider notes that processed status may precede receipt of gateway tracking confirmation. Preserve that distinction in the runbook. [Refund overview](https://razorpay.com/docs/payments/refunds/).

### M-5. Can refunds be partial or repeated? — Adoptable

Yes, where the selected payment method supports them. Sum all verified refunds and reserve amounts already in flight; never exceed captured money or resend an uncertain attempt blindly. Zero entitlement produces a recorded no-money outcome, not a zero-value refund API request. Razorpay supports multiple partial refunds up to captured total and documents zero-amount/full-refund parameter hazards. [Issue refunds](https://razorpay.com/docs/payments/refunds/issue/), [Normal refund API](https://razorpay.com/docs/api/refunds/create-normal/).

### M-6. Is a later admin percentage additional or cumulative? — Adoptable synthesis

Treat it as the **final cumulative target** for the selected booking/room scope. Preview target guest entitlement, already paid/in-flight refunds and additional money still due separately. Example: on INR 10,000, an earlier INR 5,000 refund followed by a 100% target pays only another INR 5,000. A lower proposed target never claws back an already-paid guest refund automatically. Public APIs cap refund sums but do not dictate the meaning of Rentra's percentage field; this is the least ambiguous product interpretation consistent with the founder's full/partial refund examples and prior-refund cap.

### M-7. Can later owner-funded review change responsibility for earlier refunds? — Economic/contractual decision remains

To retain Rentra's original fee after an earlier proportional refund, a later owner-funded decision would have to reassign earlier responsibility cumulatively. That economic reassignment is not established by market research and must not be silently adopted as a mechanical default. Separate liability adjustment from guest payment. Example: INR 10,000 = INR 9,500 owner + INR 500 Rentra. After an ordinary 50% refund (INR 4,750 owner responsibility + INR 250 Rentra), final 100% owner-funded responsibility means total guest refund INR 10,000 and total owner-assigned responsibility INR 10,000. Pay only the remaining INR 5,000 to the guest, while reassigning the earlier INR 250 responsibility internally; never send an extra guest refund for that reassignment. Preserve reason, admin and audit history. The founder previously approved the retained-original-fee outcome for an owner-funded incident, but successive-decision retroactivity and liability exceeding original owner proceeds still need explicit contractual/economic agreement. Until settled, do not silently reassign completed refund responsibility. Tax/cost validity and enforceable owner consent remain external gates. This example exposes the unresolved arithmetic consequence, not a verified universal market practice or authorization to collect the larger sum.

### M-8. What if owner cancellation follows an incident refund? — Adoptable synthesis

Full guest entitlement under FR-7 counts prior and in-flight refunds, so only the unpaid difference is initiated. Do not silently undo a previously reviewed responsibility allocation; show the final guest target separately from owner/Rentra assigned totals and require an audited authorized adjustment if responsibility changes. No duplicate reimbursement or retroactive owner bank debit is implied.

### M-9. Can Route always take money back from an owner's bank? — External gate, answer no guarantee

No such guarantee is established. Razorpay transfer reversal depends on available linked-account balance; provider reversal tooling is not permission for Rentra to debit an owner's bank. Its dashboard documentation also places limitations on the Reverse All shortcut. Keep the founder's separate active owner-payment link and guest-refund-first flow; validate any optional provider reversal before treating it as recovery, without double collection. [Transfer reversal documentation](https://razorpay.com/docs/payments/route/reversal/).

### M-10. Can the owner repay through a payment link? — Adoptable / external gate

Payment links support sending a unique collection link, expiry, reminders and payment-status notifications. Match each verified collection to a specific recovery obligation. Link creation/sending is not repayment; partial, expired and cancelled link states must not count as full repayment. Actual account/use-case acceptance remains a provider gate. This is an owner-to-Rentra collection, separate from guest booking collection. [Payment Links](https://razorpay.com/docs/payments/payment-links/), [Link events](https://razorpay.com/docs/payments/payment-links/subscribe-to-webhooks).

### M-11. What if two owner debts are overdue? — Adoptable synthesis

Keep each debt's assigned amount, original notice/receipt timestamp, due date, payments and adjustments independently. Payment for one obligation never satisfies another too. Keep the owner-wide block while **any overdue blocking obligation remains**; clear it only when none remains, preserving other pauses/restrictions. A new debt or replacement link cannot restart an older debt's clock. Partial payment reduces that obligation without clearing an overdue remaining balance. This follows the founder's all-properties block and no-double-recovery requirements; it is not a sourced competitor repayment policy.

### M-12. What starts day 5/day 7? — Founder/operations policy remains

Public link documentation supplies creation/expiry and payment events, not proof that an owner received the notice. Never label a successful send as a read receipt. Candidate default: post the notice in the authenticated owner portal, send email, and start the clock on the earliest auditable owner acknowledgement/view or confirmed delivery event supported by the channel. If neither is available, flag admin to confirm receipt before punitive deadline automation. Keep one stored deadline and show it in property/owner-local time; store timestamps unambiguously. This is an operational proposal, not an established market answer. Founder must choose whether this receipt-based rule is acceptable or define another enforceable notice event; engineering then verifies channel evidence. Do not reset the debt due date merely by reissuing a link.

### M-13. Should link expiry equal the repayment deadline? — Adoptable synthesis

Keep them distinct. Expired links do not forgive or extend debt. Allow admin to replace a link for only the still-outstanding amount while preserving the original obligation/deadline and preventing simultaneous excess collection. Exact link expiry is an operational/provider configuration; use the selected product's supported maximum and avoid expiry before the owner's payment due date. [Link capabilities](https://razorpay.com/docs/payments/payment-links/).

### M-14. What about overpayment or a payment arriving after an adjustment? — Adoptable synthesis

Reconcile to remaining assigned obligation before crediting recovery. Flag excess funds for admin reconciliation/return through a supported process; do not silently use them for another debt or treat them as revenue. Stop/replace collectible links after verified satisfaction or reduction; account for in-flight payments before creating a replacement. No overpayment-retention policy or automatic cross-debt netting is approved.

### M-15. What happens when Auto/Manual mode changes? — Adoptable synthesis

Record who changed the mode and when. The current setting controls new payout initiation; it does not cancel or duplicate a transfer already initiated. Reconcile queued/uninitiated work against the current eligibility/mode before execution. In Manual mode leave eligible uninitiated transfers for authorized admin; in Auto process eligible work once. A mode change never makes an uncertain transfer safe to resend. Preserve owner override precedence. No competitor-wide setting semantics were established; this is a safe state-transition default.

### M-16. What scope do owner fee overrides have and when do edits apply? — Adoptable synthesis

An owner-level override applies to all that owner's listings unless a future explicitly approved finer scope exists. Only authorized finance/admin capability can change it. New quotes resolve the effective configuration; paid bookings preserve their accepted fee and refund allocation. If a quote changes before payment, refresh and obtain guest acceptance. Keep configuration history/effective timestamp. These defaults follow the already-confirmed global/owner scope; there is no need to ask the founder about database mechanics or every transition.

### M-17. What if a payment is later disputed or reversed? — Adoptable / external gate

Open a linked admin exception, preserve provider evidence/deadlines, reconcile all guest reimbursement channels and avoid independently refunding money already returned through a dispute. Do not treat a bank dispute as a routine policy cancellation or assign an owner debt without an authorized reviewed basis. Razorpay supports dispute notifications and accepting/contesting disputes; provider outcomes can return money or debit the business. Exact account behavior and operations owner must be validated. [Disputes](https://razorpay.com/docs/payments/disputes).

### M-18. Are payment fees returned when Rentra refunds? — Market answer / business allocation unresolved

Razorpay states regular refunds have no additional refund fee, but captured-payment fees and associated provider taxes are not reversed; instant refunds can carry an additional fee. These are provider charges, distinct from accommodation taxes and Rentra's guest platform fee. Do not reduce the founder-promised guest entitlement to cover them. Who bears these costs internally (Rentra or owner under reviewed terms) is a Rentra business choice; public competitor practice cannot settle it. [Refund FAQ](https://razorpay.com/docs/payments/refunds/faqs), [Razorpay terms](https://razorpay.com/terms/).

### M-19. Who receives and refunds accommodation taxes and extras? — External gate / founder terms

Keep a booked component ledger identifying owner rental/extras, Rentra fee, tax recipient/liability and processing costs; preserve guest refund entitlement as already agreed. Owner-provided paid extras form owner proceeds before applicable accounting adjustments. Determine actual tax invoicing, remittance, credits/withholding and owner recovery with an Indian accounting specialist and provider agreement before accepting real money. No source reviewed establishes Rentra's legal entity, tax registrations, seller status or contract; copying another platform's numbers would be unsupported. Neither a legal tax rate nor a settlement formula is adopted here.

### M-20. What reserve, maximum debt and platform fee rate should Rentra use? — Founder

Market rates and provider balance requirements cannot choose Rentra's budget, exposure tolerance or commercial fee. Keep refund liquidity source, monitored reserve/exposure threshold, response before exceeding it, actual global fee rate and owner contractual liability open. Founder already said the reserve is undecided. Day-7 blocking does not finance an immediate refund. Do not silently switch to after-check-in payouts or future-payout offsets as a substitute for this answer.

### M-21. Can a configured refund always execute, including old payments? — External gate

No. Razorpay documents payment-method restrictions, minimum amounts and old-payment refund constraints. Maintain the guest's entitlement and route unsupported/failed provider execution to admin reconciliation; do not mark complete or silently replace a percentage with an executable but smaller amount. Validate long booking lead times and apartment stays against provider refund age limits. [Refund errors](https://razorpay.com/docs/payments/refunds/errors), [Normal refund API](https://razorpay.com/docs/api/refunds/create-normal/).

### M-22. Is INR rounding a founder question? — Adoptable engineering default

No. Use integer paise for stored payable amounts; compute totals deterministically and use a largest-remainder allocation with a stable line-order tie-break so allocated shared charges sum exactly to the booked component. Preserve those booked allocations for later refunds. Calculate cumulative refund targets per component and pay only the difference, bounded by paid/unrefunded amounts. Never submit zero as a refund request. Zero-price lines receive zero proportional shared allocation; an all-zero base cannot create a percentage fee and any nonzero unrelated shared charge needs an explicit allocation basis or validation error. Provider amount-in-subunits requirements support integer amounts; the particular allocation algorithm is engineering synthesis, not a claimed market standard. [Refund API amounts](https://razorpay.com/docs/api/refunds/create-normal/).

## Remaining answers research cannot supply

1. **Founder/finance:** real refund liquidity and exposure limits; actual Rentra fee rate; internal liability for payment/refund charges and enforceable owner-funded obligations beyond original owner proceeds.
2. **Founder/operations:** auditable notice event starting the owner-repayment deadline when a delivery/read confirmation is unavailable; actual team member responsible for funding/dispute monitoring.
3. **Provider/engineering gate, not a founder opinion question:** account approval and tested support for capture, early transfers, partial refunds, payment links, status reconciliation, long-lived payments and disputes under Rentra's contract.
4. **Accounting/legal gate, not a founder opinion question:** Rentra-specific taxes, invoicing, remittance and owner terms. Public market research cannot certify these.

## Checks and limits

Only this research artifact was written. No PRD/app/memlog edits, customer/owner contact, provider account calls or live payment tests. The defaults marked synthesis should be carried into requirements as adopted design choices under the user's batching instruction, not falsely attributed as universal competitor policies. None removes the unresolved funding and provider-readiness launch gates.
