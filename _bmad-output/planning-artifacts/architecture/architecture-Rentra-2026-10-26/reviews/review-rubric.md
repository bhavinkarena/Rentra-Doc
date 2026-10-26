# Architecture rubric review

26 October 2026. Independent document-level gate against the current draft `ARCHITECTURE-SPINE.md`, source-evidence record and relevant finalized PRD quality requirements. No implementation changes.

**Verdict: pass at initiative altitude.** No critical, high or medium rubric findings. The contract is suitable for feature planning with its recorded release gates intact; this is not financial, deployment or implementation acceptance.

## Checklist result

| Criterion | Assessment |
| --- | --- |
| Real divergence points | AD-1-15 bind authority, ownership, API compatibility, inventory admission, snapshots, financial allocation/state/coordination, restrictions, privacy, delivery, UI caches and deployment. These are shared feature boundaries rather than a source-tree inventory. |
| Enforceable decisions | Every AD has Binds/Prevents/Rule. Commands must reject stale consequences, serialize relevant state, reserve uncertain amounts, retain operation identity and preserve accepted terms. These are testable requirements rather than goals alone. |
| Brownfield ratification | The frontend/API/worker arrangement, adapters, Postgres mutation protocol and event jobs are retained. Source evidence explicitly identifies hotel fee/payout conflicts and distinguishes target additions from existing capability. No new service split or upgrade is disguised as a preservation task. |
| Capability coverage | All FR-1-24 and NFR-1-5 appear in the capability map/frontmatter. Normative source precedence prevents compact wording from replacing detailed child/pet/bedding, review and other requirements. |
| Data and mutation consistency | Immutable accepted allocations, integer minor units, deterministic allocation, distinct movement domains and common booking obligations establish the cross-feature model without prematurely freezing full schemas. |
| Operational/environmental envelope | Separate processes, environment isolation, initiation gates, migration ordering, compatible rollback, worker health and unresolved work visibility are explicit. Hosting, server version, backup/restore, measured capacity and numeric alarms have owners and acceptance conditions. No whole dimension is silent. |
| Safe deferral | Feature schemas, lock-table design and provider claim details are deferred only behind published shared contracts before dependent parallel implementation. Funding, provider, legal/accounting, staffing and device/load evidence remain acceptance blockers rather than inferred answers. |
| Honesty of status | The document remains draft and explicitly describes target rules. Test activity cannot imply bank movement. No runtime, account eligibility, hosted migration or accessibility certification is claimed. |

## Non-blocking implementation caution

The owner-before-listing guard in AD-3 is a target extension to the inspected listing-first protocol, as source-evidence.md already states. Feature implementation must migrate every affected writer coherently and prove concurrent admission, blocking and recovery cases. Existing code presence alone does not satisfy that target. This is already required by the shared-contract prerequisite and existing release-test gates, so it is not an additional finding or a request to duplicate lower-level design here.

No runtime, database concurrency, provider, deployment, browser or screen-reader checks were performed. Other independent lenses may identify holes this rubric review did not find.
