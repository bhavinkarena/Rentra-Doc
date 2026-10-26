# Room presentation reference check

2026-10-25. Discovery evidence only; no application changes or rendered-screen comparison.

## User direction

Photos first; details left and price right. Adapt familiar Airbnb/hotel-booking patterns to Rentra. Retain existing UI unless a concrete improvement is established.

## Existing source

`Rentra/components/rentra/hotels/HotelRooms.jsx`, `RoomCard`: room image is `hidden ... sm:block`, so the room-card photograph is hidden below the small breakpoint. Larger screens currently show a small square thumbnail beside facts. `PlanRow` already separates plan details and controls/price using a wrapping flex layout. Amenities are truncated to eight without a complete facilities disclosure in this card.

Candidate improvement: expose useful room photography on phones and test photo-first hierarchy with details left and price right. Reuse plan selection, availability, pricing and controls. Keep full trip-total context and readable wrapping at narrow widths. This is a proposed UX delta, not a verified usability improvement until a rendered comparison is inspected.

## Official reference sources

- Airbnb announces default fee-inclusive total prices in search: https://news.airbnb.com/total-price-display-is-now-standard-globally
- Airbnb explains price breakdown/tax variation: https://www.airbnb.com/help/article/3610
- Booking.com guest FAQ describes full-stay room pricing and room/accommodation facilities: https://secure.booking.com/faq.en-gb.html?aid=330843
- Booking.com accommodation documentation describes room photos, beds, occupancy and facilities: https://developers.booking.com/demand/docs/accommodations/look-accommodation-details

These sources support price transparency and relevant comparison information. They do not establish the current visual geometry of platform cards. No authenticated platform flow or live screenshot was inspected. Rentra's approved pricing/tax rules take precedence over reference-platform policies.
