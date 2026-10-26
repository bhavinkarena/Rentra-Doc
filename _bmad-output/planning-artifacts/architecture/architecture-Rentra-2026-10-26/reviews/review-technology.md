# Technology and current-code fit review

26 October 2026. Independent configured architecture lens against `ARCHITECTURE-SPINE.md` and `source-evidence.md`.

**Verdict: pass for the written target contract. No material technology/provenance finding.** The draft retains the current foundation, distinguishes target rules from delivered support and does not select an unverified upgrade or Live provider integration.

## Reality checks

- Frontend HEAD is `726c966ec463daebc6a6399a6aadd7109b06a2de`; backend HEAD is `7612e4a8c46c66c16057d10412a86679ec859bbc`, matching the recorded source evidence.
- All eight seeded installed versions match both local package metadata and `package-lock.json`: Next 16.3.4, React 19.2.8, Tailwind 4.3.3, Redux Toolkit 2.12.0, Express 4.22.3, Drizzle ORM 0.45.3, postgres client 3.4.9 and backend Zod 4.6.5. They are explicitly retained versions, not latest-release claims.
- `src/services/booking/inventory.js:50-90` implements the cited listing mutex, sorted order/visit/reservation locks, bounded whole-transaction retry and exclusion of provider calls from the callback. The owner-wide guard in AD-3 is an additional target rule; the introduction and source-evidence row do not claim it exists today. Feature contracts must design and migrate that extension coherently.
- `src/services/booking/hotel-checkout.js:58-69` really records zero fee components. `src/services/finance/hotel-payouts.js:10-29` really describes check-in/Tuesday payouts. The draft identifies these as implementation gaps instead of ratifying them as launch behavior.
- `src/services/payments/webhooks.js:11-36` verifies raw signatures and atomically records deduplicated Test-scoped events/jobs; its later worker code uses leased claims. `settlement.js:96-120` distinguishes eligible Test confirmation from late-capture resolution. The draft does not infer Live account/provider capability.
- `src/cron/runner.js:4-17` uses process-local interval bookkeeping and heartbeats. The target requirement to derive business deadlines from persisted timestamps appropriately avoids presenting that bookkeeping as a durable reminder clock.
- `src/services/notifications/delivery.js:28-30` distinguishes accepted/delivered/undelivered and verifies delivery scope. The evidence expressly declines to treat it as proof of the required email/portal repayment receipt flow.
- `src/services/db/schema/index.js:61-65` documents minor-unit booking money and preserved legacy-major semantics. Frontend transport and RTK Query files confirm the cited cookie/envelope/error/disposal/read-retry behavior.

The official mechanism links in source evidence support the retained App Router, routing, Postgres locking and asynchronous webhook approach. Local source and lockfiles establish the version-specific reality needed here; no starter, new database, hosting platform or external broker is selected. Database server version, deployed versions and account-specific capabilities remain explicit gates.

## Findings

None. No request to upgrade dependencies or duplicate implementation contracts is warranted by this lens.

No application tests, hosted deployment, database operations, security exploit testing or provider transactions were run. This review confirms documented code fit, not runtime correctness or launch readiness.
