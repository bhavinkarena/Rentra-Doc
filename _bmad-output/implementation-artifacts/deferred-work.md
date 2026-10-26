
- source_spec: `_bmad-output/implementation-artifacts/spec-2-11-unused-night-early-departure.md`
  summary: Verify and implement responsibility/recovery for refunds after an owner payout under Story2.17 and the financial release gates.
  evidence: Existing ordinary cancellation already permits post-payout refunds and payout runs exclude previously paid bookings; early departure reuses the same obligation path. This story must preserve historical payout records and guest entitlement but cannot invent the later owner-recovery/accounting contract.

- source_spec: `_bmad-output/implementation-artifacts/spec-2-11-unused-night-early-departure.md`
  summary: Profile and satisfy the strict500-hotel discovery p95<300ms gate on representative hardware without weakening its threshold.
  evidence: Isolated PERF_GATES=1 measured330ms on this change and521ms on unchanged baseline9a7501d991604c45e775e69c5c4b5054c3183872; the default parallel suite also hit2595ms against its2000ms shared budget. Discovery source/thresholds were not changed, and these samples do not identify the exact host/root cause.
