# Decision-register reconciliation

26 October 2026. Read all 83 entries of `market-questions-and-answers.md` and the architecture draft. Source precedence is explicit founder approval, then adopted compatible defaults; evidence-dependent provider/legal/operational claims remain gates. No code or runtime review performed.

Verdict: broad agreement, with three quiet constraints worth making explicit before finalization. No contradictory commercial choice was identified. Detailed child/pet/bedding pricing, policy inputs and review moderation can remain in the binding upstream requirements rather than being copied into an initiative spine.

## Findings

1. **High — include disputes/reversals in the shared reimbursement budget.** Register M-17 (line 62) requires reconciliation across all reimbursement channels and forbids refunding money already returned through a dispute. AD-8 (line 91) currently defines capacity only from completed and reserved refunds against verified paid money. Two implementations could obey that literal cap while one refunds a payment already reimbursed by chargeback. Extend AD-8 to link disputes/reversals to the same order obligation and deduct/hold reconciled returned or disputed amounts before additional disbursement; retain provider deadlines and unresolved cases in the exception workflow. Provider integration details may remain gated, but cross-channel coordination cannot be deferred.

2. **Medium — make payout-mode changes part of initiation eligibility.** Register M-15 (line 60) says new initiation uses the current Auto/Manual setting, while initiated/uncertain transfers are reconciled rather than cancelled or resent after a toggle. AD-8 names refund/cancellation eligibility but no AD fixes this timing. Add the current effective global/owner-override setting to payout initiation and preserve existing operation identity for already-started/unknown transfers. This prevents the worker pinning an old mode in booked terms while an admin command uses current mode.

3. **Medium — retain the assistance-animal separation while specialist details are deferred.** Register OP-31 (line 103) already adopts separation from ordinary pets and no automatic pet-rule blocking/charging. The spine only lists assistance-animal handling in the Deferred table (line 206). Add that adopted boundary to authoritative eligibility/quote or privacy rules; defer only exact local accommodation/exemption/documentation validation. Otherwise a general pet-rule implementation could apply its normal eligibility and fees to these cases while claiming compliance with the spine.

## Covered without additional architecture detail

- Accepted booking snapshots, mixed-room/unused-night scope and deterministic allocation: AD-4/5/10.
- Fee scope, cumulative responsibility, payment/refund/payout/recovery separation, owner restriction composition and receipt-based clock: AD-5-11.
- Backend authorization, private evidence, delivery/receipt distinction, scheduled milestones and cache isolation: AD-12-14.
- Funding, provider support, actual staffing, tax/legal/retention, duration/cot/eligibility evidence and measured quality remain named gates; no proposed reserve is represented as funded.
- Source binding preserves actual ages, child formula/inheritance, four pet fee units, policy moderation and guest disclosure details without reproducing their full schemas here.

No application execution, live financial verification or external-source revalidation was performed. This report evaluates source-to-document consistency only.
