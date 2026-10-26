# Adversarial divergence review

26 October 2026. Independent review of the current draft architecture spine at initiative altitude. No code or runtime/provider tests performed.

**Verdict:** Three compact invariant clarifications are needed. The ownership, snapshot, state separation, API compatibility and prerequisite shared-feature-contract rules otherwise prevent material independent-feature divergence; exact DTO/table detail need not be duplicated here.

## High - expired worker lease does not fence an external financial side effect

**Location:** AD-7, AD-8.

**Compliant pair:** Provider worker A holds a durable lease, persists an intent and pauses just before dispatch. Worker B takes its expired lease and also dispatches the persisted intent, using a fresh provider request identity. A later resumes. Both can fence local result writes, retain the local operation ID and obey local idempotency, yet the provider may accept two transfers/refunds. A lease token fences the database update; it does not fence an external provider that does not understand that token. The current rule does not explicitly require the same external idempotency identity or mark lease takeover of a potentially dispatched intent as uncertain.

**Minimal rule:** Persist the dispatch/attempt identity before network I/O and reuse a provider-supported idempotency identity for the same movement whenever supported. An expired claim cannot establish that a prior call was never sent. A replacement worker must treat potentially dispatched work as uncertain and reconcile it before another create call. Where the provider lacks a safe duplicate-prevention/reconciliation primitive, disable automatic redispatch and require the exception path. Keep the original reserved amount until resolved. This is a target adapter contract, not a claim that every provider product supports it.

## Medium - timed owner debt can become overdue without a guarded database mutation

**Location:** AD-3, AD-11, AD-13.

**Compliant pair:** Recovery/scheduler feature A derives a persisted owner restriction during its durable periodic due scan. Booking feature B serializes against writes to that owner flag, then checks the current flag while confirming. Between a day-7 deadline and A's next scan (or during a worker outage), B sees no flag. The lock correctly prevents concurrent changes but cannot lock the passage of time. The broad intended prohibition is clear; the normative admission rule does not say whether it evaluates debt itself or trusts this asynchronously refreshed projection.

**Minimal rule:** The shared owner admission service evaluates the canonical overdue outstanding-balance/receipt-deadline predicate at authoritative database time under the owner guard (or uses an equivalently proven fresh projection). A reminder/worker outage cannot permit otherwise-blocked new admissions/confirmations. Worker projection updates remain useful for lists/notifications, not the only booking gate. Preserve the existing-booking/no-offset rules.

## Medium - immutable receipt clock conflicts with late earlier receipt evidence

**Location:** AD-11.

**Compliant pair:** Delivery feature A records a confirmed delivery and freezes the original clock. Portal feature B later contributes independently verified evidence that an authenticated owner viewed the notice earlier. One implementation treats the frozen clock as immutable; another follows the earliest-evidenced rule and advances it. Both phrases currently appear in the same Rule, and the resulting reminder/due dates differ. Link replacement is correctly prohibited from resetting it; verified out-of-order evidence is a different case.

**Minimal rule:** Distinguish immutable receipt evidence/history from the canonical earliest verified receipt timestamp. Late earlier evidence is reconciled through an audited correction using the same obligation, not a replacement-link reset; derive the milestones from the canonical timestamp. If operations needs a policy for already-issued reminders or retroactive blocking, surface that narrow acceptance case rather than silently inventing an additional grace period. At minimum, remove the implication that an erroneous/non-earliest first timestamp can never be corrected.

## Scope boundaries retained

- Producer/consumer shapes, percentage scales and line IDs can remain in the required shared feature contracts before dependent implementation; independent guessing is already prohibited.
- No independent financial service, shared package, infrastructure change or new commercial policy is recommended.
- These findings concern written coordination rules. They do not establish current application bugs, actual provider duplicate behavior or deployment readiness.

## Bounded closure check - 26 October 2026

Re-read only the revised AD-3, AD-7 and AD-11 against the three findings above.

- **Closed - external dispatch fencing:** AD-7 now persists dispatch identity before network I/O, reuses supported provider idempotency, treats potentially dispatched lease takeover as uncertain, forbids unsafe automatic redispatch and retains its reservation.
- **Closed - timed owner-debt admission:** AD-3 now evaluates canonical overdue debt and receipt deadlines at authoritative database time and expressly forbids stale projections or worker outage from bypassing the gate.
- **Closed - earlier receipt evidence:** AD-11 now separates retained evidence/history from the canonical earliest verified timestamp, requires audited corrections to the same clock/milestones, applies the corrected deadline to subsequent admission and preserves already-confirmed bookings. Feature acceptance tests explicitly cover late-evidence/reminder order.

**Residual unresolved findings from this review: none.** This was a bounded document closure check, not a broad second review or runtime/provider test. The rules still require implementation and acceptance evidence.
