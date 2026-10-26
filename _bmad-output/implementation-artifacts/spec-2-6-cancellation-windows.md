---
title: 'Story 2.6 - percentage cancellation windows and hotel plan inheritance'
type: 'feature'
created: '2026-10-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Story2.6 approved in epics.md; user decided units, migration, presets and check-in rules on 26 October 2026">

## User decisions (26 October 2026)

- Windows are set in hours, from 1 to 720, with at most 6 windows.
- Existing presets map to windows. Hotel plans become 100% before their free-cancellation hours, then 0%.
- flexible, moderate, strict and non-refundable remain only as quick-fill presets; only the windows are stored.
- There is one percentage for requests at or after check-in, and an optional early-departure percentage for unused nights.

## Behavior

- **Policy shape:** `{version: 1, windows: [{hoursBefore, pct}], atOrAfterCheckInPct, earlyDeparture: {offered, pct}}`.
  - Windows are strictly descending, and the last one is 0.
  - A window applies to a request made more than `hoursBefore` hours before check-in; at an exact cutoff the later window applies.
  - Blank values are refused, never saved as 0%.
  - A no-show alone never refunds.
- **Storage (migration 0075):**
  - `rentable.cancellation_policy` holds the listing policy or the hotel default.
  - `rate_plan.cancellation_policy`: NULL means the rate inherits the hotel default.
  - The backfill maps existing tiers exactly. Each existing hotel plan keeps its own terms explicitly, and the hotel default starts as the oldest plan's terms.
  - A listing with no stored policy falls back to its tier preset.
- **Snapshots:**
  - Quotes store `policy_snapshot.cancellationPolicy`.
  - Hotel rooms store `plan_snapshot.cancellationPolicy`, so mixed rooms each keep their own.
  - Hotel quote hashes cover the plan snapshot, so a held quote changes if the owner edits; accepted bookings never do.
- **Refund engines:**
  - With booked windows, the percentage comes from the windows. After check-in, a 0% result means `VISIT_STARTED` / `STAY_STARTED`.
  - A 100% result also returns the fee.
  - Bookings without windows keep the legacy rules.
  - The full-paid basis and allocation remain Story 2.7.
- **Owner saves:**
  - Farmhouse and venue terms use the existing preview token, `expectedVersion` and audit.
  - Hotel rates save the hotel default, and each rate picks default, a preset or custom.
  - Legacy plan columns are kept consistent.
- **Frontend:** one `CancellationPolicyEditor` for terms (property page and wizard) and for the hotel default and each rate. Presets only fill the windows, and a plain-language summary shows what guests will see.

</frozen-after-approval>

## Verification

Backend `9c8f2c9860a9002215680580decaefb6b0d28683` and frontend `01b718f38d36b3f8588d1e7f1fa713b1450ac04a` are local and unpushed: they need migration 0075 first, because the live hotel rates schema would refuse the new `default` value.

- Backend: 338 of 338.
  - New unit tests cover cutoff and equality rules, validation, migration mapping and blank values.
  - The new integration test covers the save contract (preview, stale, unauthorized, gap refused, audit), the hotel default versus a non-refundable override, inheritance in a quote, and mixed-room refunds after check-in.
  - Updated: the CP11 exact-cutoff test (FR-9 at/after semantics) and the hourly refund test (the fee comes back on 100%).
- Frontend: 115 of 115. No browser gate was run.

## Review Triage Log

- high / fixed: for a property with no stored policy, the editor started from the Flexible preset. It now starts from the property's tier, as quotes do.
- medium / fixed:
  - With windows, fee return followed the old tier flag; it now follows a 100% result.
  - A blank percentage saved as 0%.
- dismissed:
  - Night-listing default backfill: every existing hotel plan carries its own terms explicitly, so no booking terms change.
  - The relaxed derived-rate rule is intended: different terms are a reason for a derived rate.
- open gap: the discovery "cancellation" filter still matches `cancellation_tier`, the preset a listing started from, so custom windows can be mislabelled in search. It needs a policy-based filter later.

## Open gates

Story 2.7 (the full-paid refund basis, including tax and extras), the discovery filter, and hosted acceptance.
