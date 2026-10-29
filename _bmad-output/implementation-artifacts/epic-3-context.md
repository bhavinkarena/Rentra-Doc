# Epic 3 Context: Guests find the right stay with accurate accommodation details

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Guests can browse broadly or optionally filter by property type (farm, villa, hotel, whole apartment), compare photo-first rooms with full-trip totals, and book eligible stays with accurate children, bedding, meal and pet rules. Owners can configure the matching supply, rooms, offers and date prices clearly. Each extension is end-to-end, from setup through discovery, selection, authoritative quote, accepted-term snapshot and booking validation. If an extension cannot do that, it is shown as unavailable. It is never display-only and never falsely promised. The epic builds on Epic 2's booking, quote, fee, cancellation and admission core.

## Stories

- Story 3.1: Browse categories while retaining guest search context
- Story 3.2: Compare photo-first rooms and complete facilities
- Story 3.3: Configure accurate rooms offers and inclusions
- Story 3.4: Quote fixed or percentage bedding per night
- Story 3.5: Apply effective date rates and safe calendar edits
- Story 3.6: Configure explicit child age and accommodation policies
- Story 3.7: Price actual child ages with room-local adults
- Story 3.8: Configure ordinary pet eligibility and fee units
- Story 3.9: Declare pets and include their complete trip charge
- Story 3.10: Configure exclusive whole-apartment stays
- Story 3.11: Book apartments with exclusive stock and buffers
- Story 3.12: Verify suitable-stay journeys across categories and devices

## Requirements & Constraints

- **Search:** location, dates and party are required; category is optional. Results respect publication/active status, dates, actual party and room capacity, declared pets, owner stay limits and hotel room/plan allocation. Show the full trip total with every mandatory known charge (bedding, pet, Rentra fee), tax status and an itemized payable amount before payment. Never add a late surcharge. Revalidate price and eligibility before payment. Show changed or invalid selections explicitly and never silently substitute another trip.
- **Children:** owners define infant/child age bands and an adult-rate threshold. Bands must cover accepted ages with no gaps or overlaps. No universal age cutoff or free-child rule. Ages are whole years at check-in (0 = under one); no date of birth is needed. Paid child stays use a fixed amount per child per night, or a percentage of that night's room-only price ÷ adults allocated to that room (room-local count). The percentage base excludes meals, beds, tax, fee and extra-adult supplements. Example: INR 4,000 with 2 adults at 25% gives INR 500 per child per night. Reject zero-adult rooms. Free children still count toward physical occupancy. An adult-priced minor is not a supervising adult. If a cot is needed for the party to fit, it must be confirmed before accommodation is promised. Property defaults apply unless an explicit room or rate-plan override exists.
- **Bedding:** allowed or not, type/count, and a fixed or percentage charge per bed per night. The percentage base is that night's room-only price. Existing beds, price-included guests and maximum occupancy are distinct. No fictitious extra-bed charge (2 adults in a double, or a double plus single taking 3). Do not charge twice when the extra-person rate already includes bedding.
- **Rooms/offers:** room types, quantity, beds, occupancy, photos and the full facility list (no 8-item truncation). Keep hotel-wide and room facilities separate. Offers can be room-only or meal-inclusive, and each must keep an identifiable room-only component. Included and chargeable items are separate (a breakfast discount does not mean breakfast is included). Weekday/weekend/date overrides set the effective nightly rate, and linked offers derive from it.
- **Pets:** policy is Allowed or Not allowed only (no on-request or approval workflow). Fee unit is per stay, per night, per pet or per pet per night; zero is allowed. Disclose maximum count, types/size and limits. Pet count is separate from guest count. Applies across all four categories. Assistance animals have a separate path and are never blocked or charged automatically under ordinary pet rules (specialist-gated).
- **Apartments:** one booking reserves the whole unit. No overlapping reservations and no individual room sales. Owners set bedrooms, beds, bathrooms and facilities; minimum/maximum nights plus arrival-date/day minimums; check-in/out times; an optional preparation buffer; and an optional one-off cleaning fee (zero allowed). Declare all occupants. Do not copy hotel child tariffs. No lease or installment product, no universal 28-night cap, and no change to farm/villa booking units.
- **Money:** integer paise with deterministic rounding. Bedding, child, pet and cleaning amounts are paid extras inside the existing one-service-fee and refund allocation model.
- **Release gates:** passing a story does not authorize release. Each of these stays open until evidence is recorded:
  - supervising-adult and cot supply checks before family release
  - specialist assistance-animal review
  - supported apartment duration, lead time and local rules
  - real-device, accessibility and load evidence
- **Accessibility and performance:** target WCAG 2.2 AA, with 44px primary targets. Check reflow at 320/390/768/1024/1440. Target p75 LCP ≤2.5s, INP ≤200ms and CLS ≤0.1.

## Technical Decisions

- The backend owns eligibility, price, policy and authorization. The frontend sends a selection reference and consent, never payable amounts. Each changed API contract needs request/response examples, stable error codes, money units and compatibility checks before dependent work. Extend contracts compatibly and never branch on message text.
- Inventory: reuse the listing-inventory lock protocol (listing → sorted orders → visits → sorted reservations, with bounded retries). Make no provider calls inside that transaction. Hotel stock is room-type/night capacity. An apartment is one exclusive unit with buffers. Search is advisory.
- Accepted terms snapshot: component amounts and allocations, effective policies, party ages, pets, room/night scope, sleeping arrangement, facilities, meals, bedding and config versions. Later owner edits never rewrite existing bookings. A stale unpaid quote requires a fresh guest review.
- Child, pet and room-plan policies are versioned: new quotes use the current version, and existing bookings keep theirs.
- UI uses the existing adapters and design system with no optimistic success. Private caches are scoped to identity, and the public cache holds only public projections. There is no offline money or inventory queue.
- Create only the migrations a story needs. Deploy backend/schema before dependent frontend. Do not build a generic new wizard or theme.

## UX & Interaction Patterns

- **Browse:** the category filter is optional and removable. Location, dates and party persist through navigation and login. Distinguish "no inventory", "no match" and "refresh failed", keep the existing results and offer a retry. Listing cards use real 4:3 photos, an honest rating or "new" label, and a dated total. Save and navigation are separate controls.
- **Room card:** photos lead, including on phones. Details sit on the left and the trip total on the right, stacking on narrow widths or zoom. The full facility list is in an accessible disclosure. The gallery has labelled previous/next/close controls, does not hijack selection, does not rely on swipe alone and shows honest missing-photo states.
- **Selection:** explain invalid dates, party, age, pet, occupancy or stay limits. Announce recalculated totals politely without moving focus. Keep the valid selection after sold-out, quote-changed or expired-hold outcomes.
- **Owner Rooms/Rates:** keep the current wizard grouping, show inherited defaults and explicit overrides, and keep required child, bedding and cancellation settings out of optional detail. Saving a draft is separate from submitting. Use dirty-change guards. Save buttons in approved specimens are only examples.
- **Calendar:** property-local dates and keyboard selection. Show open/blocked labels and effective rates. Bulk percentage edits apply to current effective rates. Holiday shortcuts only select dates. Show a preview and run a version check before changes. Payment downtime does not mean no stock.

## Cross-Story Dependencies

- From Epic 2: 2.1 (approval), 2.2 (fee), 2.3 (trip terms through login), 2.4 (holds and booking modes), 2.6 (cancellation policy), and 2.10/2.11 (room cancellation and early departure, used by apartments). Epic 1's review flow is also a prerequisite. This epic must keep the Epic 2 behaviour for hotel policy inheritance, fee, availability/confirmation modes and guest records.
- Within this epic, each line lists the stories it depends on:
  - 3.2 ← 3.1
  - 3.3 ← 3.2
  - 3.4 ← 3.3
  - 3.5 ← 3.3, 3.4
  - 3.6 ← 3.3
  - 3.7 ← 3.4, 3.5, 3.6
  - 3.8 ← 3.3
  - 3.9 ← 3.1, 3.8
  - 3.11 ← 3.9, 3.10
  - 3.12 ← 3.2, 3.5, 3.7, 3.9, 3.11
- 3.10 depends only on Epic 2.
