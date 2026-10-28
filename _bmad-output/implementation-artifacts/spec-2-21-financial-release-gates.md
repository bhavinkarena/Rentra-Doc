---
title: 'Story 2.21 - demonstrate financial release gates without unsafe enablement'
type: 'feature'
created: '2026-10-28'
status: 'done'
route: 'dispatch'
review_loop_iteration: 1
context: []
baseline_commit: 'backend 93cd69cb379f20df1c5c613bd3ed28df49d9dcc1; frontend 82a6b0b1aeb4241dcb19e409003356abdc2635d2'
---

<frozen-after-approval reason="Story 2.21 in epics.md; standing authorization; fail-closed engineering only">

## Intent

**Problem:** Epic 2's money rules (2.5-2.20) are engineered locally. Release still depends on external evidence: funding, exposure limits, provider evidence, specialist terms and staffing. A finance operator cannot see one truthful list of what is proven and what still blocks release. There is also no single operator switch that stops new money initiation while leaving investigation working.

**Approach:**
1. **Read-only "Financial release gates" admin page.** Gate definitions come from code, not editable. Each gate has an owner, a blocker and evidence links. Status is computed from live facts where possible; otherwise it is `blocked`. Nothing in the UI can mark a gate passed.
2. **Initiation kill switch.** `FINANCE_INITIATION_DISABLED=true` refuses every new money initiation with 503 `FINANCE_INITIATION_DISABLED`. All reads, provider re-checks, verification of already-dispatched payments, reconciliation and alerts keep working.
3. **Acceptance evidence document.** It maps each acceptance area to the local integration tests that prove it, with actual results. Hosted Test evidence stays an open blocker.

## Boundaries & Constraints

**Always:**
- **Gates** (minimum list):
  - funding source and exposure limit, monitor and breach action;
  - specialist owner terms, accounting and tax;
  - actual provider Live keys and hosted signed Test evidence;
  - staffing and support;
  - dispute caps;
  - pending Neon migrations;
  - worker, delivery, unknown-outcome and exposure alerts.
- The proposed INR 40,000 is shown as "proposal, not funded, not adequacy proof".
- **Computed facts are read-only:**
  - payment gateway environment (Test only);
  - funding allocation configured (expected none);
  - payout mode;
  - count of unknown or needs_review outcomes;
  - latest worker heartbeat;
  - kill switch state.
- **Release decision:** the overall status is `Not ready for Live money` unless every gate is passed. With external evidence absent, it always is.
- **Access:** `admin.payments.read` sees the page. No write endpoint is added.
- **Kill switch initiation points** (refuse new):
  - refund execution dispatch;
  - payout fixture reserve or dispatch;
  - repayment link create;
  - owner repayment checkout order start;
  - checkout payment start for a new provider order;
  - owner cancel-upcoming refunds. These may be recorded as obligations but must not dispatch to the provider.
- **Not blocked by the switch:**
  - GET and list endpoints;
  - verify of an already-created order or link;
  - admin check and resolve re-reads;
  - webhooks and reconciliation workers;
  - notices and receipts.

**Never:**
- Never enable Live money, flip a provider environment, set funding, or mark a gate passed.
- No change to existing money rules beyond the switch guard.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Finance read admin opens gates | list with each gate blocked + owners, facts, overall "Not ready for Live money", no-store |
| Non-finance admin / owner | 403 / 404 |
| Switch on, admin creates repayment link | 503 `FINANCE_INITIATION_DISABLED`, nothing written, no provider call |
| Switch on, guest starts new payment | 503, no provider order |
| Switch on, owner verifies already-paid link | settles normally |
| Switch on, admin check/resolve, GET lists, webhook ingest | work |
| Switch on, refund dispatch worker | no new provider refund; obligation stays pending |
| Switch off | all behave as before (full suite green) |
| Gates page with switch on | fact shows initiation disabled |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`). Find each initiation point and reuse it; do not refactor.
- `src/services/payments/checkout-service.js` `startCheckoutPayment`, just before the new provider order is created.
- `src/services/finance/owner-repayment.js` `createRepaymentLink`, before the provider order.
- Payout fixture reserve and dispatch in `src/services/finance/payout-transfer-fixtures.js`.
- Refund provider dispatch: find the refund execution worker or service that calls `createRefund` in `src/services/payments/razorpay-test.js`. Guard the call site so the claim stays pending and retries later.
- New tiny `src/services/finance/initiation-switch.js` exporting `assertInitiationEnabled(env = process.env)`. It throws a 503 error with `FINANCE_INITIATION_DISABLED`. Map it in `src/middlewares/error.middleware.js`.
- New `src/services/finance/release-gates.js` exporting `readReleaseGates(db, actor)`. Use `authorize` from `payout-modes.js`. It holds a static gate list and computes the facts with read-only queries:
  - `payment_gateway_config` latest environment;
  - funding allocation (find the table used by payout `funding_allocation_id`);
  - `PAYOUT_GATE` / payout mode;
  - counts of unknown or needs_review in refund, payout fixture and owner_repayment;
  - worker health (`recordWorkerHealth` table).

  Pending migrations: read the journal for the latest local migration and show "Neon last recorded at 0075 (from HANDOFF), apply 0076-latest" as a static gate note. Never connect to Neon.
- Route GET `/admin/payments/release-gates` (admin.route.js finance block, noStore).
- Test `test/integration/release-gates.integration.test.js`, covering every matrix row. Toggle the switch by passing env or setting `process.env` and restoring it in `finally`.

Docs (`Rentra-Doc`): new `_bmad-output/implementation-artifacts/epic-2-acceptance-evidence.md`. It maps each area to test files or names with the actual pass result:
- both race orders;
- stale, replay and takeover;
- dispute caps;
- room and unused-night allocation;
- receipt ordering;
- debt restrictions.

It lists the open hosted evidence. Grep `rentra-backend/test/integration` to find the tests; do not invent coverage. Mark missing coverage as missing.

Frontend (`Rentra`):
- New `app/(admin)/admin/finance/release-gates/page.js` plus `components/admin/ReleaseGates.jsx`. Follow the `owner-recoveries` page:
  - an overall banner;
  - gate cards (name, status chip, owner, blocker, evidence);
  - a facts list.
- Add a navigation link next to the other finance pages (`admin-navigation.js`, `AdminShell.jsx`, `finance/page.js`).
- `lib/api/endpoints.js`.
- On load failure, keep the page and show retry.

## Tasks & Acceptance

- [x] kill switch + guards + error mapping
- [x] release gates service, route, test (every matrix row)
- [x] frontend page + nav
- [x] acceptance evidence document

**Acceptance Criteria:**
- Given no external evidence, when gates are read, then the overall status is not ready and no gate is passed.
- Given the switch is on, when any initiation point runs, then no provider create call is made (assert on the fake Razorpay state file).

## Verification

- In `rentra-backend`, never against Neon: `PORTAL_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres CP01_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres DATABASE_URL=postgres://nobody@127.0.0.1:1/never node --import ./loader/register.mjs --env-file=.env --test --test-concurrency=1 "test/**/*.test.js"`. All pass (baseline 435). Never run db:migrate. Do not commit.
- Frontend `npm test` (baseline 136), targeted eslint/prettier, `git diff --check`.

## Review Triage Log

- Review 1: 0 high, 6 medium (fixture guards ignored injected env, journal fallback text, cancel-upcoming switch test missing, evidence doc totals/dispute-cap claim/name checks), 1 non-issue (page retry already via PortalState). Fixed.
- Coverage verified by grep: every `createOrder`/`createRefund`/fixture reserve/dispatch path is guarded; obligation creators dispatch nothing.
- Closure: CLOSED.

## Results

- Backend 444/444 on local PostgreSQL (DATABASE_URL unreachable); frontend 136/136; `db:check` 84 (no migration); `git diff --check` clean.
- [Acceptance evidence](epic-2-acceptance-evidence.md): takeover and dispute-cap money coverage missing; hosted Test evidence open.
- All seven gates are hard-coded `blocked`; passing one needs a code change and real evidence. Not ready for Live money.
- Not run: browser QA of the gates page.
