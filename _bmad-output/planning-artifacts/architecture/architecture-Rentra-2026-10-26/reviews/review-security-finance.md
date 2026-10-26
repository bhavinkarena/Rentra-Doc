# Security and financial-integrity architecture review

26 October 2026. Independent review of the current draft architecture contract, relevant PRD requirements and bounded current backend evidence. This is document review, not a vulnerability scan or financial acceptance test.

**Verdict:** Strong separation of authority, private evidence, internal-note commands, financial state, environment and cumulative obligations. No critical/high findings. Two medium contract clarifications should land before handoff.

## Findings

### Medium - define verified financial evidence across adapters

**Location:** AD-6/AD-7.

The contract requires verified capture, signed raw webhooks and provider-fact reconciliation, but does not define the minimum matching evidence behind a verified movement. The existing Test payment adapter does: `src/services/payments/razorpay-test.js` compares provider order/payment identity, amount, currency and expected scope, and `settlement.js` calls `assertPayment` before and inside mutation. A new payout or recovery adapter could validate a genuine signature/status while its consumer assumes this also proves the expected obligation and amount. A genuine event is not sufficient evidence for the intended movement.

**Minimal fix:** Add an AD-6/7 rule that accepted provider facts must match the pinned account/environment, expected internal operation and provider references, currency, amount and final outcome, using the relevant adapter assertions or equivalent reconciliation. A signature/client checkout callback alone does not satisfy this contract. Mismatches enter investigation without settling another obligation.

This is an explicit shared verification boundary, not a request to duplicate existing Test verification code or choose a Live provider implementation.

### Medium - overdue admission must not rely solely on a delayed worker flag

**Location:** AD-3/AD-11/AD-13.

Owner-guard serialization correctly prevents a worker changing the restriction concurrently with a booking. It does not by itself prevent a booking after a due timestamp when the worker is delayed or recovering and the persisted restriction projection is still false. The booking feature can read the current projection under the owner guard while the scheduler independently promises eventual restriction updates; both can follow the current AD wording yet permit an overdue owner to accept a new booking.

**Minimal fix:** Under the shared owner admission guard, derive or refresh the effective debt restriction from persisted receipt/due timestamps and outstanding blocking obligations using authoritative current time. Do not rely solely on worker execution or a cached flag. Workers still own reminders and materialized restriction maintenance; existing confirmed bookings remain preserved and original source semantics for unpaid holds still apply.

No new cap, business grace period, owner penalty or early block is selected by this fix.

## Boundaries checked without findings

- Backend checks current identity/record ownership/capability; private documents/notes and secrets remain outside public projections.
- Internal-note commands cannot change case, booking or financial status.
- Stable request identity/hash, durable intents, reservations and provider reconciliation protect retries and unknown outcomes.
- Refund caps include in-flight money and other reimbursement channels; cumulative responsibility does not create duplicate guest money.
- Owner recovery remains separate, receipt-evidenced, obligation-scoped and unable to clear unrelated restrictions or offset future payouts.
- Test/Live and provider configuration are pinned; actual Test bank money remains zero.
- Live funding, provider, terms/accounting and operations evidence are explicitly gated, not inferred from final planning status.

The existing API applies configured origin policy and session protections; this review did not establish a new route-level vulnerability. Exact feature schemas, lock implementation and provider account capabilities remain downstream proof obligations.

No application edits, database tests, browser/penetration tests, actual provider calls or bank movements were performed. The findings identify written-contract ambiguities, not observed production exploits.

## Bounded closure check - 26 October 2026

Both findings are resolved in the written contract:

- **Verified evidence:** AD-6 now requires provider account/environment, operation, local/provider references, currency, expected amount and authoritative outcome to match before applying the fact. Signature alone is explicitly insufficient; mismatched/excess/unlinked evidence remains available for exception reconciliation.
- **Overdue admission:** AD-3 now evaluates canonical overdue obligations and receipt-derived deadlines at authoritative database time under the shared admission guard. A stale worker projection or worker outage cannot permit blocked admission.

No residual unresolved finding from this review. This bounded check examined only these two fixes, not the whole document or subsequent unrelated changes. It establishes contract closure, not implemented security, concurrency or provider correctness. No runtime, database, provider or bank tests were performed.
