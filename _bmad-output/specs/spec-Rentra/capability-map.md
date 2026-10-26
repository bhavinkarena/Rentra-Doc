# Capability coverage and implementation boundaries

Derived from the spec decision log and adopted sources on 26 October 2026. These groups do not replace detailed FR/NFR acceptance rules or certify implementation. All NFR-1-5 and architecture AD-1-15 apply wherever relevant; the table emphasizes each capability's primary decisions.

| Capability | Primary PRD requirements | Architecture | Existing / target boundary |
| --- | --- | --- | --- |
| CAP-1 | FR-1-5 | AD-1-4, AD-11-13 | Existing onboarding/review; approved correction and evidence rules require feature verification. |
| CAP-2 | FR-6, FR-23 | AD-3-4, AD-10-13 | Existing activation/calendar; composed restrictions and cancellation consequences need reconciliation. |
| CAP-3 | FR-8, FR-24 | AD-1, AD-3-6, AD-12, AD-14 | Existing discovery/accounts; refined presentation and complete eligibility need integrated validation. |
| CAP-4 | FR-10, FR-22 | AD-3-5, AD-10, AD-14 | Existing rooms/rates; full facilities, bedding rules and policy editor/inheritance require work. |
| CAP-5 | FR-16 | AD-3-5, AD-12, AD-14 | Basic child settings exist; richer policies and cot/eligibility confirmation remain target work. |
| CAP-6 | FR-17 | AD-3-5, AD-12, AD-14 | Basic pets yes/no exists in inspected hotel paths; declared counts/charges and policy handling need validation. |
| CAP-7 | FR-18 | AD-3-5, AD-10, AD-14 | Approved scope; whole-apartment implementation remains unverified. |
| CAP-8 | FR-12, FR-15, FR-23-24 | AD-1-8, AD-10, AD-12, AD-14-15 | Existing holds/Test checkout; hotel fee and full launch-policy reconciliation remain required. |
| CAP-9 | FR-7, FR-9-11 | AD-3-10, AD-12-15 | Existing cancellation/refund paths; dynamic policies, partial-room/unused-night and cumulative acceptance need reconciliation. |
| CAP-10 | FR-13, FR-15 | AD-5-8, AD-12-15 | Hotel check-in/Tuesday payout and owner-deducted commission conflict with approved launch model; provider/funding sign-off remains gated. |
| CAP-11 | FR-19-20 | AD-4, AD-6-10, AD-12-15 | Existing support/disputes; approved incident remedies and cumulative allocation require implementation proof. |
| CAP-12 | FR-14 | AD-3, AD-5-9, AD-11-15 | Planned assigned-debt/receipt/repayment flow; link creation is not collection and provider support is unverified. |
| CAP-13 | FR-21 | AD-12-14 | Completed-stay review baseline exists; arrival exception and approved publication/moderation need validation. |

## Preservation and planning rules

The final PRD, approved addendum and 83-entry register retain every detailed scope, formula, timing, eligibility, policy and evidence gate. DESIGN and EXPERIENCE retain all visual tokens, 20-surface behavior coverage, accessibility/state patterns and approved mockups. The architecture retains its 15 decisions and target-versus-code evidence. These are adopted companions, not audit-only sources that downstream may skip.

Read the architecture source evidence before defining implementation tasks. Inspect current feature code at story preparation; documented generic functionality is not proof of an approved new flow. Preserve stable CAP, FR/NFR and AD IDs. No feature is marked ready for Live merely because its story can be drafted.

This spec does not introduce feature DTOs, migration SQL or new endpoints. Shared feature contracts and the owner/listing/order locking extension must be settled before dependent frontend/backend implementation; stories must preserve this ordering. Release evidence tasks are distinct from implementation completion.
