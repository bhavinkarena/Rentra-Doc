---
title: 'Story 2.13: Locally verify owner payout transfers'
type: 'feature'
created: '2026-10-28'
status: 'done'
route: 'dispatch'
baseline_commit: '26a964282146641d9ff75edfb8f92c89e72fd5bb'
review_loop_iteration: 0
---

<frozen-after-approval reason="User selected fixture-only lifecycle and unset funding controls on28 October2026">

## Intent

Build a persistent local payout lifecycle with provider fixtures, keeping every network transfer blocked. Demonstrate one coordinated operation, current Auto/authorized Manual eligibility, stable identity, one-shot durable dispatch outside locks and verified scoped reconciliation. Owners/admins must distinguish fixture expected amounts and outcomes from bank proceeds.

## Boundaries & Constraints

User decisions: use local provider fixtures only; actual provider/account and final transferable tax/component calculation remain unapproved. Funded reserve, exposure limit, monitor and pre-breach rules stay unset. INR40,000 remains a proposal. This is local engineering progress, not full financial or hosted acceptance.

Fixture operations reference verified real-mode Test rent captures only. Their hypothetical amount is remaining captured rent after refund reservations, explicitly not an approved net owner payable calculation. Store actual bank proceeds0; never insert funded payout, real recovery debt or funding-authority records. Preserve the real refunds+payout cash cap unchanged. After a refund/late fixture success, show simulated overlap exposure/funding authority unset, not funded refund money or an assigned debt.

Use immutable booked owner, supported confirmation, active owner, current verified destination, remaining hypothetical capacity and current policy under ordered shared locks. Mode toggles govern uninitiated work; already dispatched unknown operations retain pinned identity. Lost responses/failure never release or resend a possibly dispatched operation. No owner-bank debit, future-booking offset, guessed tax/gateway deduction, provider credentials, network adapter or production worker/creation endpoint.

Fixture mutation/dispatch must fail closed outside actual disposable localhost databases named rentra_test_*; validate the actual connection before writes, not a client flag. Missing/unsupported adapter refuses. Reuse authenticated actor permissions; owners may read their scoped fixture facts but cannot create/dispatch. Production reads may display no fixture rows but cannot make a transfer.

## I/O & Edge-Case Matrix

| Scenario | Expected behavior |
| --- | --- |
| Auto / Manual | One hypothetical reservation per source; current Auto may dispatch; Manual additionally requires current reviewed hash and explicit admin consent |
| Queued mode/destination/refund change | Recheck under locks; stale/unsupported work holds/refuses without a fixture provider call; a fresh authorized Manual confirmation can dispatch an existing uninitiated operation without duplicating it |
| Retry/race | Actor/scope/payload-bound request key replays recorded result; changed payload conflicts; durable dispatched_at claim wins once; later workers only look up |
| Unknown/mismatch/late success | Validate fixture provider/account, operation, source, destination, amount, currency and environment; wrong evidence never completes; missing/failure stays unknown; matching late success applies once |
| Refund before / after dispatch | Earlier refund prevents incompatible dispatch; later refund retains entitlement and real cash cap, fixture uncertainty/success and explicitly simulated overlap exposure |
| Isolation/read models | Nonlocal/owner/unsupported/Live writes refuse; owner-scoped DTOs and UI label fixture expected amount, state and bank0; no funded payout/recovery/funding record is created |

</frozen-after-approval>

## Code Map

Paths relative to this spec directory:

- `../../../rentra-backend/src/services/finance/payout-modes.js`: reuse resolvePayoutMode and lockPayoutPolicy; service-level finance read/write authorization. Auto evaluation is explicitly invoked by the local test harness, not a registered production job.
- `../../../rentra-backend/src/services/finance/payout-transfer-fixtures.js` (new): preview/reserve/dispatch/reconcile/read functions. One source per operation; bind hashes to actor/current records/mode; record Manual dispatch consent at claim time. A claimed operation uses pinned facts for lookup despite later mode changes. All fixture calls outside transactions, never before durable claim commit. No fetch/network transport in this service.
- `../../../rentra-backend/drizzle/0078_payout_transfer_fixture.sql` and journal (new): one isolated payout_transfer_fixture table, unique source allocation and scoped request key, immutable source/owner/destination/mode/expected terms, stable operation ID, state reserved/processing/unknown/succeeded, irreversible dispatch timestamp, verified fixture identity/evidence and actual_bank_minor=0. Keep status/evidence transitions monotonic and expected amount in checked integer paise. No historical backfill or real payout schema rewrite.
- `../../../rentra-backend/drizzle/0009_customer_payment_ledger.sql`, `0077_payout_mode.sql`: real payout funding allocation is unique and refund+payout reservations are bounded by cash. Keep those protections. Reuse supported booking/capture checks; hold unsupported/multiple captures rather than guessing. Fixture expected reservations do not consume cash capacity.
- `../../../rentra-backend/src/services/booking/inventory.js`, `payments/refunds.js`, `payouts/destinations.js`: reuse listing/order/booking/payment-order serialization, pinned versions and one-shot refund dispatch pattern. Choose one consistent deadlock-safe order with mode/owner guards. Re-read refunds before dispatch; derive simulated exposure after dispatch without altering guest refund records.
- `../../../rentra-backend/src/services/finance/statements.js`, `../../../Rentra/components/finance/Statements.jsx`: add small owner/admin-safe fixture summaries to existing statement/detail data, keeping real totals/CSV/payout statuses unchanged. Label expected fixture amounts, source identity, simulated exposure and actual bank0 clearly. No new public mutation routes or production queue.
- `../../../rentra-backend/test/integration/payout-transfer-fixtures.integration.test.js`, `test/helpers/` and `../../../Rentra/test/`: real disposable database and pure in-memory/file-backed fixture provider, no HTTP; test mismatch/late/race/permission/upgrade and actual component rendering. Read installed Next docs before unfamiliar APIs.

## Tasks & Acceptance

- [x] Inspect clean matching revisions, independently trace gaps, and record user decisions.
- [x] Add focused tests first where practical, including every matrix row and actual preclaim blocked-lock races.
- [x] Add migration0078/journal; prove populated0077 upgrade preserves real payouts/refunds, history and cash-cap rejection.
- [x] Implement local-only fixture lifecycle, current Auto/Manual authorization, one-shot durable dispatch and exact pinned reconciliation.
- [x] Add scoped reader/UI labels; verify fixture amounts never affect real totals, bank proceeds or recovery debt.
- [x] Finish targeted checks then hand back uncommitted; parent runs final full suites, three independent reviews, docs and attributed local commits.

Given current supported Test evidence and an authorized local fixture operation, when reviewed/retried/raced, then one stable operation is reserved and reconciled once. Given missing real provider/funding or nonlocal input, when creation/dispatch is attempted, then no money operation/network call occurs. Given a refund after fixture dispatch, then guest entitlement and real caps remain unchanged while simulated exposure stays visible.

## Implementation Notes

Step3 implementer owns backend/migration/frontend/focused tests sequentially; leave source uncommitted. Parent has already rendered bmad-build successfully from Rentra-Doc with python-m-uv fallback; do not rerender or restart discovery/approval. Parent handles final full verification/review/docs/commits and cluster cleanup. No new product question remains inside the ratified fixture slice.

Baseline backend26a964282146641d9ff75edfb8f92c89e72fd5bb, frontend02c38a6ae4125e3312245beaf65d352eb6f3968c, docsbc2ad81bb03183c190186155c74fc188e0c300f9; prior checks371/133. Hosted migrations0076/0077 remain user-pending;0078 will also be local. Never access Neon or push. Existing service files are intentionally lint/format ignored; preserve style and node--check them. SQL newly-added enums need ::text in multi-file transactions; JSON writes use ::text::jsonb.

Parent starts PostgreSQL127.0.0.1:55432. Set PORTAL_TEST_DATABASE_URL and CP01_TEST_DATABASE_URL=postgres://postgres@127.0.0.1:55432/postgres; DATABASE_URL=postgres://nobody@127.0.0.1:1/never. Only disposable rentra_test_* databases. No dependencies or network provider calls.

## Spec Change Log

28 October: user selected local fixture-only implementation and kept funding/exposure controls unset. Narrowed from actual transfer execution; actual adapter/funding/accounting acceptance remains open. Keep the real cash cap, historical data and blocked Live paths.

## Review Triage Log

Three context-free layers reviewed the combined backend/frontend diff including new migration/helper/tests. Each finding is recorded separately before grouping; blind finding-floor arithmetic is metadata.

| ID | Verdict / route | Evidence and decision |
| --- | --- | --- |
| B1 | low / reject | Privileged direct SQL can assign a first claim without the service's current-policy/eligibility locks. The only supported creation/dispatch caller is the locally guarded, finance-authorized service, which rechecks under those locks; a preclaimed SQL row is lookup-only and cannot make a provider create. There is no public mutation route/production worker. Extending trusted local SQL maintenance into another dispatch authorization engine/lock protocol is more than a direct correction and not an everyday supported caller. Actual nonlocal writes remain rejected by the SQL guard. |
| B2 | medium / patch | INSERT checks currently permit an initially claimed processing/unknown/succeeded row when companion fields are supplied. Require reserved/undispatched initial state so a fixture record cannot bypass its modeled claim transition. |
| B3 | low / reject | Local privileged SQL accepts any FK-valid admin ID, while every supported service mutation verifies active finance-write permissions and pins actor at claim. Arbitrary SQL maintenance is not an application authorization surface; duplicating service ACL decisions in this isolated fixture table is unnecessary. Actual network/bank movement remains absent. |
| B4 | false / reject | A verified destination is necessarily the current active destination:0033's unique payout_destination_current_idx permits only one submitted/verified row per owner. The service additionally holds owner and selected destination locks. An older verified row cannot coexist with a new submitted/verified version as alleged. |
| B5 | false / reject | visit_provenance has real/test/seed/legacy_unknown, not simulated; the specific simulated-provenance visit is unreachable. Requiring real visit provenance would reject legitimate Test captures/fixtures, contrary to the user-selected scope. Actual simulated payment sources already refuse on verified real-mode Test capture checks; real funded-payout eligibility is not being reused as proof of bank money. |
| B6 | false / reject | Byte/Unicode inspection of the actual UTF8 component/test shows zero U+00C2-U+00B7 mojibake pairs; separators are correct U+00B7. The apparent corruption came from shell decoding, not source or rendered expectations. |
| B7 | medium / patch | Existing destination race uses direct SQL under a listing blocker. Add a race against the actual destination writer/revocation service and its real guard path. |
| B8 | medium / patch | Provider callbacks are textually outside transactions, but tests do not prove committed claim/lock release. Add independent-connection observation and NOWAIT/try-lock assertions during create and lookup. |
| E1 | low / patch | Null/undefined preview input destructuring throws TypeError. Return a controlled validation failure with no side effect. |
| E2 | low / patch | Explicit null Manual dispatch input reaches consent property access and throws TypeError. Reject it with a controlled operational error. |
| E3 | medium / patch | A never-settling supplied fixture promise leaves the harness waiting in processing indefinitely. Bound local fixture calls, clear timers and preserve lookup-only unknown state; no new network/configuration surface. |
| V1 | medium / patch | Pre-verified regression gap: statement fixture attachment is never asserted; frontend tests inject a fixture and allocation detail uses a separate path. Assert actual matching owner/admin statement item source/state/exposure before and after reconciliation. |
| P1 | medium / patch | Parent post-patch trace found the opposite destination race: fixture owns user FOR UPDATE then waits for destination SHARE; failDestination owns destination UPDATE then client_update INSERT needs user FK KEY SHARE (0030). Use FOR SHARE for the read-only owner guard, preserving account-change exclusion while allowing notification FK checks; prove the reverse overlap. |

E1/E2 share malformed-input handling; other outcomes remain separate. No product intent changed or finding deferred. User-approved fixture/funding/network boundaries remain frozen.

Closure: all three original reviewers inspected the final combined diff and confirmed B2/B7/B8, E1-E3 and V1 closed, with no unresolved material defect in the bounded outcomes. P1's owner guard is FOR SHARE and the actual revocation/owner-FK reverse-overlap test passed. No reviewer claimed full-suite/database execution; parent owns that evidence.

## Verification

Pre-review actual results: fixture integration8/8, zero skips; frontend real rendering2/2. Earlier affected finance/mode/fixture regression batch11/11 passed. Targeted configured lint/format, two changed-service syntax checks, journal79 and whitespace passed. Final full suites are intentionally reserved until review patches finish, avoiding mixed-source acceptance runs.

First review patches passed12/12 integration cases, zero skips, including actual authenticated destination revocation, independent-connection commit/NOWAIT lock checks inside both callbacks, bounded never-settling create/lookup recovery, malformed inputs, reserved-only inserts and owner/admin statement attachments. A final one-line owner lock refinement and reverse-overlap regression were sent back before starting full suites.

Final focused integration13/13 passed, zero skips, after P1. Parent targeted configured backend/frontend ESLint/Prettier, both changed-service syntax checks, migration journal79 and whitespace passed. No source was edited after the final full suites started.

**Final local verification,28 October2026:** full serialized backend **384/384**, zero failures/skips (394355ms); frontend **135/135**, zero failures/skips. Backend ran with both explicit disposable localhost test URLs and poisoned application DATABASE_URL=postgres://nobody@127.0.0.1:1/never. The default discovery p95316ms passed its2000ms shared test budget, not the separate strict300ms acceptance gate. The task PostgreSQL cluster was stopped and its verified temporary directory removed; task logs/control files were removed. No hosted database or provider/network operation occurred.

**Local, unpushed commits:** backend `12527f36ef8dcb3375b5c6c7aaf5aba62585c1d2`; frontend `17767b3d4d786ab0419cff82f4ecb3adfc255fab`. Both have the Codex attribution trailer. Matching documentation is recorded in this checkpoint commit; [HANDOFF](../../HANDOFF.md) records the exact continuation. No sprint-status.yaml exists.

Matrix audit: all covering cases ran in the13/13 focused integration test. Auto/replay/unique-source/concurrent dispatch; queued current-mode and Manual consent; blocked refund and actual destination revocation in both lock orders; lost/failed/mismatched/missing/late fixture evidence; committed claim and every shared lock released in callback; bounded hanging create/lookup recovery; non-disposable connection/SQL guard, owner/read-only/Live/simulated/unsupported/multi-capture refusal; populated0077 upgrade, unchanged cash-cap/payout history/totals/CSV, hypothetical exposure and owner/admin statement attachment. Real component tests render reserved/processing/unknown/succeeded, expected amounts, bank0, funding unset and no money command.

## Open Release Gates

This completed scope is the user-approved **local fixture slice**, not actual transfer delivery or financial acceptance. There is no real adapter, beneficiary verification producer, production dispatch endpoint/job or approved net payable calculation. Reserve funding, exposure cap/monitor/pre-breach rules remain unset; INR40,000 is still a proposal. An unknown local callback may complete later, but the one-shot claim prevents resend. Simulated exposure does not establish funded refund money or assigned recovery debt.

Migrations0076/0077 and the new0078 remain local until the user applies them. Then verify schema/journal read-only; release backend before frontend only under explicit push authorization. Existing statement/allocation/CSV reads now depend on0078 when they include allocation records. No production build, browser/responsive/device/screen-reader, actual provider/bank/hosted or strict performance acceptance is claimed. Existing strict300ms discovery gate remains open.

Focused integration/pure/component tests must execute all matrix rows without skips. Full serialized backend and frontend suites only after source edits finish; targeted configured lint/format, changed-service syntax, journal79 and whitespace. No production build/browser/provider/hosted/strict performance acceptance is implied.
