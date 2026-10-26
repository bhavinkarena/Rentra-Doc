---
title: "Rentra product vision"
status: draft
created: 2026-10-24
updated: 2026-10-25
---

# Product Brief: Rentra

Discovery consolidated for founder review. Confirmed intent is separated from implementation evidence; this brief does not certify launch readiness.

## Vision and first customers

Rentra's long-term vision is one marketplace for anything rentable. It begins with accommodation and may later expand into vehicles and other assets. The founder wants to build an independently owned million-dollar business; the financial measure and timeframe remain undefined.

The customer problem is difficulty finding a suitable rental with trustworthy information and reviews. The desired experience combines reliable listings, straightforward booking, competitive total prices and useful choice. These are goals, not validated competitive advantages.

Early demand is expected mainly from people booking farms or villas to relax and spend leisure time. Ahmedabad is the probable starting market because the founder is based there; the launch location will also depend on where owners agree to list their properties. Hotel and apartment customer segments need further validation. Owners supply listings; the founder and one or two teammates review them and operate the marketplace.

## Initial scope and business model

Launch includes farms, villas, entire apartments and hotels. Apartments are exclusive whole-unit rentals, with an owner-configured maximum stay length. Individual apartment rooms, recurring monthly billing and lease management are not established requirements.

Listings are free. Owners set their rental amount; Rentra adds a percentage-based guest platform fee. The intention is to preserve the owner's rental amount rather than deduct Rentra commission from it. The fee rate, calculation base, taxes, processing costs and settlement/refund treatment remain unresolved. Platform fees are revenue before expenses. A smaller fee does not guarantee a cheaper guest total.

Preserve the existing owner-controlled availability and booking modes. Automatic confirmation after verified successful payment is the default. Manual mode requires owner approval before payment becomes available; approval alone does not complete the booking.

Hotel launch requirements include:
- Multiple room types, existing bed types/counts, occupancy limits and room-specific facilities.
- Distinct rate plans for room-only and meal-inclusive offers, with clear cancellation terms.
- Extra bedding permission, quantity and nightly pricing, using a fixed amount or percentage of the room-only nightly price. Distinguish sleeping capacity from guests included in the price, and prevent duplicate bedding charges. The addendum preserves examples and calculation exclusions.
- Owner-controlled weekday/weekend prices, date overrides and bulk calendar edits at launch.

## Trust and operations

Only team-approved properties should appear to guests. Owners submit forms, documents and photos; the founder and one or two teammates review each submission. Video is optional initially and may be requested to resolve questions. No mandatory physical inspection has been agreed.

Identity review, permission to rent and property-condition checks are distinct. The evidence checklist and public badge wording remain open. Remote checks must not imply a physical inspection; existing documentation reserves "Physically Verified" for a passed physical visit.

The founder has no current owner contacts or acquisition experience. The intended sequence is to recruit supply first, then attract guests. Public prospect research and outreach preparation are needed; no owner leads have been researched or contacted in this discovery. Supply alone does not establish guest demand.

## Success and launch boundary

- **Milestone 0:** five real properties approved by the team. Leads, owner registrations and unfinished listings do not count.
- **Milestone 1:** five genuine bookings on initial supply with successful payments. Count verified booking payments once, not attempts or duplicate callbacks. Completed stays are a separate outcome to observe.

No deadline or category quota is set. Launch requires tested, reliable end-to-end booking journeys; detailed readiness criteria still need definition.

Post-launch priorities: automatic demand pricing to reduce owner work, with reliable demand inputs and owner controls. Subscriptions and third-party identity/document verification are future possibilities. Entertainment and its research are deferred; vehicles and other rental assets remain longer-term scope.

## Existing functionality versus gaps

| Area | Evidence and current boundary |
| --- | --- |
| Core marketplace | Documentation describes farmhouse discovery, booking, accounts, owner tools and administration. Broad runtime readiness is unverified. |
| Booking modes and date pricing | Source checks confirm the automatic/manual toggle, payment gating, weekday/weekend rates, date overrides and bulk edits. Preserve and validate these paths. |
| Hotels | Room types, beds, meal plans and fixed extra-person pricing exist. Owner room-amenity editing, full guest amenity visibility, extra-bedding policy and percentage pricing have identified gaps. |
| Hotel business model | Inspected checkout adds no guest fee while payouts deduct owner commission; this conflicts with the selected model. |
| Apartments | Intended for launch; existing whole-unit inventory and owner-defined stay-limit support have not been established. |
| Release readiness | Historical documents describe open hosted, provider and operational gates. Focused tests do not close them. |

The [addendum](addendum.md) holds source references, research, screenshot interpretations and test limits. Historical entertainment implementation does not make it launch scope.

## Uncertainties and next assessments

Validate owner willingness, guest acquisition, fee economics, trust evidence, hotel/apartment demand and operating capacity. Resolve child-sharing rules, complex bed capacity, stay ceilings and cancellation/refund terms before treating affected flows as complete. Broad launch coverage must be tested against the team's small initial supply and operating capacity.

Next: `bmad-prd` to turn this baseline into prioritized launch requirements and gaps; `bmad-ux` to assess owner/admin/guest journeys; `bmad-architecture` to validate inventory, pricing and money flows; then `bmad-review` and targeted `bmad-qa-generate-e2e-tests` for implemented changes. Run separate workflows with this brief and addendum as inputs. Owner research should accompany the assessments.
