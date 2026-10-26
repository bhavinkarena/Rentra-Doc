# Architecture source evidence

26 October 2026. Read-only planning inspection, not runtime/provider acceptance.

## Authority and source revisions

Primary authority is the [final PRD](../../prds/prd-Rentra-2026-10-25/prd.md), its [addendum](../../prds/prd-Rentra-2026-10-25/addendum.md) and [83-entry decision register](../../prds/prd-Rentra-2026-10-25/market-questions-and-answers.md). Later approved sections supersede historical proposals. Final [DESIGN](../../ux-designs/ux-Rentra-2026-10-25/DESIGN.md) and [EXPERIENCE](../../ux-designs/ux-Rentra-2026-10-25/EXPERIENCE.md) preserve approved UX. Supporting brief/research and implementation context are linked in the [UX reconciliation](../../ux-designs/ux-Rentra-2026-10-25/reconcile-inputs.md).

- Frontend: `726c966ec463daebc6a6399a6aadd7109b06a2de`.
- Backend: `7612e4a8c46c66c16057d10412a86679ec859bbc`.
- These match the final UX handoff. No application files were edited.

Paths below are relative to each sibling source repository, allowing inspection at the recorded commits. Shared backend guidance: [architecture](../../../../backend/docs/ARCHITECTURE.md), [API](../../../../backend/docs/API.md). Shared frontend guidance: [architecture alignment](../../../../frontend/docs/architecture-alignment.md).

## Inspected reality

| Source | Observed fact and boundary |
| --- | --- |
| Frontend `lib/api/client.js`, `lib/api/action.js` | Existing cookie-forwarding transport, stable error codes/field data, redirect/revalidation integration. Preserve form state and intentional response semantics. |
| Frontend `lib/services/baseApi.service.js` | Existing RTK Query transport preserves envelopes and identity disposal; transient retry is read-only. No new automatic write replay required. |
| Backend `src/services/booking/inventory.js` | Existing listing mutation protocol requires listing/order/visit/reservation lock order, whole-transaction serialization/deadlock retry and no provider calls inside callback. New owner-wide guards must extend coherently, not bypass it. |
| Backend `src/services/booking/checkout.js`, `booking-requests.js` | Existing hold/idempotency path and manual approval/payment-window separation. These are preserved mechanisms, not proof that every new policy works. |
| Backend `src/services/booking/hotel-checkout.js` | `stayTerms` currently records `feeMinor: 0` and full collection. Configured launch service fee therefore needs implementation; do not add it only in frontend display. |
| Backend `src/services/finance/hotel-payouts.js` | Existing policy describes after-check-in/Tuesday payouts and owner-deducted commission/tax calculations. This conflicts with approved early Auto/Manual owner payout and guest-added fee model. Accounting constants are not ratified by this architecture. |
| Backend `src/services/payments/settlement.js` | Existing Test verification confirms eligible held inventory; ineligible capture creates refund-resolution work. Test actual bank amounts remain zero. Do not treat this as Live execution support. |
| Backend `src/services/payments/webhooks.js` | Existing raw signature check, provider/environment/event deduplication and durable event-job record with leases. Inspected ingestion is Test-scoped. |
| Backend `src/cron/jobs.js`, `runner.js` | Existing registry runs domain jobs and reports payment/notification health; interval eligibility uses process-local `lastRun`. New deadline-sensitive work must scan durable timestamps, not inherit a resettable reminder clock. |
| Backend `src/services/notifications/delivery.js` | Existing delivery adapter distinguishes accepted/delivered/undelivered and verifies scope. It is not proof of the approved email/portal recovery-receipt capability. |
| Backend `src/services/db/schema/index.js` | New booking money uses integer minor units; legacy major-unit columns retain their semantics. Database server version was not inspected. |
| Frontend/backend manifests and installed package metadata | Retained versions in the spine are installed local versions, not latest-release recommendations. No upgrade selected. |

Apartments, richer child/pet/bedding policies, cumulative responsibility/recovery and review exceptions remain the PRD's documented launch gaps unless separately proven. Finding a generic service does not establish the approved end-to-end behavior.

## Official mechanism checks

- [Next App Router documentation](https://nextjs.org/docs/app): confirms the current routing/server-component model. Local installed package is 16.3.4; the website advertises a later release, which is not adopted. Installed `node_modules/next/dist/docs/` is available for version-matched implementation guidance.
- [Express routing guide](https://expressjs.com/en/guide/routing/): routing fits the retained API layering. Existing Express 4 code is retained; this does not select an Express 5 migration.
- [Postgres explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html): transactional row/advisory locks support the existing concurrency approach. The server major version must be checked separately.
- [Razorpay webhook practices](https://razorpay.com/docs/webhooks/best-practices/): asynchronous delivery, duplication and ordering require deduplication/reconciliation. This is mechanism evidence, not Rentra account approval or hosted transaction evidence.

No new dependency, hosting platform, provider product or tax rule is bound from unverified recall. Exact provider capability and configured deployed versions remain acceptance gates.
