# Rentra discovery: evidence and supporting detail

Compiled 2026-10-24 to 2026-10-25. The [brief](brief.md) records the current founder decisions. These notes preserve evidence, alternatives and unresolved implementation details; they do not establish deployment or live payment readiness.

## Business model research and tradeoffs

Booking.com charges properties commission per booking, with the applicable percentage disclosed during registration. [Official FAQ](https://join.booking.com/faq.html)

Airbnb reports transitioning home hosts from split fees to a single fee deducted from host payouts. Most hosts on that structure pay 15.5%, with exceptions. [Official fee policy](https://www.airbnb.com/help/article/1857)

Vrbo documents owner-side booking fees and a variable guest service fee. Required fees are included in the displayed guest total; rates and regional arrangements vary. [Payment breakdown](https://www.vrbo.com/en-au/help/articles/How-do-I-read-my-payment-details), [guest service fee](https://help.vrbo.com/articles/What-is-the-service-fee)

Owner-paid commission was considered as a way to simplify guest pricing. The founder prefers adding Rentra's percentage fee to the owner's rental amount so the owner retains that rental amount. Either model can show transparent totals; neither guarantees lower guest prices. The fee percentage/base, payment costs, tax handling, cancellation/refund terms and settlement deductions remain open. Competitor examples do not establish a sustainable Rentra rate. Subscriptions are deferred.

## Hotel rooms, meals and facilities: source findings

- **Existing room setup:** `Rentra/components/partner/listing/HotelSections.jsx:249` edits bed types/counts; size, view, occupancy, room counts and fixed extra-person charges are editable. `rentra-backend/src/services/schemas/zod/listing.js:209` and `src/services/booking/hotel-setup.js:50` validate/save room types. Shared components serve both onboarding and existing listing edits.
- **Existing meal plans:** `HotelSections.jsx:479` supplies derived breakfast plans; EP/CP/MP/AP represent room-only, breakfast, breakfast plus a meal and all meals. `Rentra/components/rentra/hotels/HotelRooms.jsx:150` sends the selected plan to quotes; `rentra-backend/src/services/domain/hotel.js:76` prices derived plans. Child meal and extra-bed meal policies still need definition.
- **Amenity editing gap:** server validation/storage accept room amenities (`schemas/zod/listing.js:222`, `booking/hotel-setup.js:74`); discovery returns them (`db/queries.js:455`). The owner payload preserves them (`HotelSections.jsx:191`) but no room-amenity editing controls were found. Property-level facilities cannot establish which rooms have AC, refrigerators, fans, hot water, hairdryers or toiletries.
- **Amenity display gap:** the guest room card shows only the first eight supplied amenities (`HotelRooms.jsx:560`), with no expanded room list observed. Required content should distinguish hotel facilities, room facilities and plan inclusions; available at extra charge is different from included.
- **Fee-model mismatch:** hotel checkout sets `feeMinor: 0` (`booking/hotel-checkout.js:58`), while `finance/hotel-payouts.js:43` deducts owner commission. This conflicts with the selected owner-price-plus-guest-fee model. Assess quotes, checkout, allocations, refunds, payouts and finance UI together.
- **Delivery limits:** `frontend/docs/HOTEL-PLAN.md` reports substantial local implementation and open business/hosted/operational gates. Its headline and progress table disagree about phase completion. Local evidence is not launch certification.

## Extra bedding: intended behavior and remaining gaps

Founder requirements:
- Owners specify existing bed types/counts, guests included in the base price, maximum occupancy, whether extra bedding is allowed, its quantity and pricing.
- In the adult examples, a double bed accommodates two. Accepting three requires an additional sleeping place. A double plus single already accommodates three but may still incur an extra-person charge when the base price includes only two.
- Charge per extra bed/mattress per night, either fixed or a percentage of that night's room-only price before meals, taxes and Rentra's fee. Add charges across nights/items. Do not charge again for bedding already included in an extra-person rate.
- Clearly show the sleeping arrangement before booking and preserve the promise in booking details.

Current gaps: `hotelRoomSchema` accepts one double, maximum three adults and zero extra-person charge; its refinements compare guest limits but not sleeping capacity. The owner UI has fixed extra-adult/child fields but no extra-bed permission/count/pricing-mode controls. `priceRoomStay` charges fixed extras above base occupancy independent of beds. A separate guest bed-purchase selector is not required by the discussed occupancy-driven flow.

For adult configurations, accepted occupancy must fit existing sleeping capacity plus allowed additional places. Extra bedding disabled means no adult limit above existing capacity. When required by the limit, additional bedding and explicit pricing must be configured. Child sharing, cots, complex sofa/bunk capacities and a deliberately complimentary bedding option remain unresolved; do not change these implicitly. Charging for an additional guest and charging for bedding are distinct concepts whose overlap must be specified.

Changes must reach shared owner forms, validation/storage, admin review/publication, availability/quotes/holds, booking snapshots, guest displays, confirmations and relevant refund/finance behavior and regression tests.

### Screenshot evidence

The first matched Standard Room examples show two adults at INR 1,780 plus INR 234 taxes/fees versus three adults at INR 2,260 plus INR 296, with one extra bed/mattress included. The INR 480 rental difference does not establish a separate bed fee.

Later screenshots show a Deluxe Double room with one king bed, maximum three and multiple meal/cancellation plans including extra bedding. A Deluxe Triple room lists double plus single, maximum four, and an offer saying existing beds accommodate all selected guests. Selected guest count is not visible there; do not infer four adults fit those beds. Discounts on breakfast are distinct from breakfast included.

### Market check

Agoda separates existing-bed capacity, extra-bed quantity and the price per bed; its room setup also records bathrooms, bed configuration and room amenities. [Official room setup](https://partnerhub.agoda.com/how-do-i-set-up-manage-my-rooms/)

Booking.com supports extra-bed/cot modes including per-night and per-stay; related policy documentation distinguishes per-person nightly/stay charges. There is no single universal charge unit. [Current policy guide](https://developers.booking.com/demand/docs/accommodations/child-policies), [policy configuration](https://developers.booking.com/connectivity/docs/setting-up-children-policies-and-pricing)

These sources do not establish percentage-of-room-price extra-bed charging as prevalent. Fixed/percentage is Rentra's chosen flexibility, not a proven market standard.

## Date-dependent hotel pricing

Market practice includes manual calendar changes, scheduled rates and external revenue-management systems. Agoda accepts room/rate/date updates and date ranges through its portal/API. Cloudbeds describes recommendations using events, demand and lead time, with optional automated posting. [Agoda calendar](https://www.partnerhub.agoda.com/how-do-i-manage-my-availability/), [supply API](https://developer.agoda.com/supply/docs/availability-and-rates), [Cloudbeds RMS](https://myfrontdesk.cloudbeds.com/hc/en-us/articles/13604876981275-Revenue-Management-System-RMS)

Rentra already has:
- Nightly override, else weekday/weekend rate selection, and derived meal plans: `domain/hotel.js:76`.
- Bulk date/weekday/room-type changes, fixed/percentage updates and reset: `booking/hotel-ari.js:110`.
- Owner controls and selected holiday shortcuts: `Rentra/components/partner/HotelRatesCalendar.jsx:30`. Shortcuts select dates; they do not automatically increase rates.
- Percentage bulk edits apply to the current effective rate, including overrides, not always the original default.

`HOTEL-PLAN.md:81` defers demand automation; `:82` defers channel-manager integration. Founder confirms owner-controlled pricing for launch and automatic demand pricing as a post-launch priority. Future design needs owner limits/overrides and reliable inputs, including other-channel bookings: Rentra allotment is not hotel-wide occupancy.

## Existing booking confirmation and availability

- `rentra-backend/drizzle/0070_request_to_book.sql:2` and `db/schema/index.js:780`: `instant_book` defaults true.
- `Rentra/components/partner/listing/BookingCalendarSettings.jsx:270`: automatic/manual owner controls. The shared booking-rules page renders preferences.
- `booking/checkout.js:48`: manual mode holds inventory; approval handling exists for regular and hotel stays.
- `payments/checkout-service.js:31`: server blocks payment while approval is pending.
- `booking/booking-requests.js:31`: approval opens payment; decline cancels the request and releases inventory, including hotel rooms. Changing the listing toggle does not convert existing pending requests.
- `domain/booking-policy.js`: up to 24 hours for owner response, then 12 hours to pay; deadline is capped by arrival.
- `payments/settlement.js:97`: verified capture confirms only an eligible active hold with inventory and active accounts; ineligible capture enters resolution rather than reclaiming expired inventory.

Regular properties use open dates/owner blocks. Hotels use room-night allotment and sale restrictions. Entire-apartment inventory and maximum-stay support are intended requirements, not established implementation.

## Verification performed and limits

- Hotel domain suite: 8 existing tests passed.
- Bedding gap self-check: 5 assertions passed, demonstrating current acceptance of double/max-three/zero surcharge, absence of explicit extra-bed fields and fixed pricing independent of beds.
- Mixed-date pricing self-check: 4 assertions passed; weekday INR 2,000 + weekend INR 3,000 + override INR 4,000 gives INR 9,000, and derived breakfast adds INR 1,500 for two guests over three nights.
- Frontend checkout-display suite: 6 tests passed.
- Backend hold-deadline test: 1 passed.
- Request-to-book database integration: invoked but skipped because no disposable test database was configured. Existing test source is not an executed pass.

No application code changed. No hosted migrations or configured database mutations occurred, and no browser or provider journey was run. Tax test fixtures are not legal validation.

## Recommended BMAD handoff

Use separate contexts with this brief, addendum and repository evidence:
1. `bmad-prd`: requirements and gaps for the approved launch, preserving existing working paths.
2. `bmad-ux`: owner setup, admin approval, guest discovery/comparison and checkout.
3. `bmad-architecture`: validate inventory, pricing, authorization, snapshots, payments/refunds and payouts.
4. `bmad-review` and `bmad-qa-generate-e2e-tests`: inspect relevant artifacts and cover implemented/fixed journeys, including concurrency and failure cases.

Owner prospecting/interviews should accompany these assessments. Milestone 0 is five approved properties; Milestone 1 is five genuinely paid bookings. No owner leads, commitments or customer-demand evidence have been established. Broader scope, low-fee acquisition and sustainable unit economics remain hypotheses. Entertainment research, vehicles, subscriptions and identity APIs are outside the first launch.
