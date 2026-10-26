# Hotel room selection mockups

Visual direction approved by the user; no application files changed. Governed by DESIGN.md Layout & Spacing / Components, EXPERIENCE.md Room card and rate plan / Booking summary / Selection / Interaction Primitives / UJ-2.

- `key-hotel-rooms.html`: proposed responsive photo-first room selection, details left / total right where readable, native offer radios and facilities/price disclosures.
- `baseline-hotel-rooms.html`: source-derived reconstruction of current compact room structure; phone image hidden below 640px and 112px desktop thumbnail. It is not a screenshot of the running app.
- Both use the same fixture, so price differences do not bias layout comparison. Room-only: ₹8,000 rent + ₹400 service fee + ₹480 illustrative tax = ₹8,880. Breakfast: ₹8,800 + ₹440 + ₹528 = ₹9,768. Fixture math asserted during generation. Taxes are illustrative, not approved policy.
- Offer radios simplify current quantity steppers to a one-room specimen. Date/party editing, API quotes, real inventory, authentication, booking, payment, focus-return overlays and provider outcomes are not simulated.
- Existing `partner-login.jpg` is copied as illustrative photography; it is not evidence of an actual hotel listing. Local Rentra SVG and Plus Jakarta Sans are copied for offline rendering.
- Current backend fee alignment remains a separate gap. The baseline's fixture is not a claim that current backend fee behavior matches the approved model.
- The demonstrated room-selection direction is approved. Static alternate-state examples and broader specifications remain drafts. This is not usability proof or production readiness; implementation must preserve real quantity, quote, inventory and payment behavior.

- Following visual inspection, both specimens retain the existing narrow-screen booking-bar pattern as a fixed example-total/Review stay bar. It navigates to the local summary, not checkout.
