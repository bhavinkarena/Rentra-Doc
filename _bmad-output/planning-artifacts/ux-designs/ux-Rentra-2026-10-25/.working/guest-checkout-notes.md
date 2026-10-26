# Guest checkout and payment/refund tracking

26 October 2026. Visual candidates; user approval is pending. No application code, provider setting or live record changed.

## References and existing behavior

- [Checkout](key-guest-checkout.html): one selected-trip total, itemized fee/tax context, lead guest for the room, arrival, requests, optional invoice information, booked terms and explicit quote acceptance. The summary is beside the form on desktop and precedes it on phones.
- [Booking/payment/refund tracking](key-guest-booking-status.html): a review-only selector compares four static records: checking payment, confirmed, owner cancellation with refund processing, and owner cancellation with refund verified. This selector is not a new guest control in the application.
- [Status specimen details](guest-status-notes.md) document the state fixture and limits.

Current source read: sibling frontend `components/customer/Checkout.jsx`, `checkout/StayGuestForm.jsx`, `checkout/PaymentVerification.jsx`, `BookingDisplay.jsx` and `CancelVisits.jsx`. Existing checkout already has request-before-payment, quote/hold failures, payment verification and recovery. This design refines hierarchy and disclosure rather than inventing these features. Real cancellation keeps the existing selection, authoritative preview, acceptance and recorded outcome; this specimen does not replace it.

## Fixture and product boundaries

One twin room, two adults, 18–20 November 2026: room rent INR 8,000 + 5% service fee INR 400 + illustrative tax INR 480 = INR 8,880. The tax amount is example content, not an approved rate. Current hotel code still needs approved fee-model reconciliation; the specimen does not claim that gap is implemented.

Every payment/refund outcome shown is Test; actual bank collection/refund is INR 0. A confirmed state requires verified capture and valid inventory. An unknown payment is not confirmed or automatically failed, and does not invite another charge. Owner cancellation uses the approved full-refund entitlement; a refund request is distinct from verified completion. No refund turnaround or live readiness is promised. The example guest non-refundable offer does not change the separate owner-cancellation entitlement.

Inputs, consent, radios and native disclosures operate locally. All financial buttons are disabled. There is no session, quote refresh, inventory hold, provider order, cancellation, refund, persistence or automatic recovery. Native review changes do not represent live transaction progress. Production must preserve accessible announcements and authoritative server outcomes.

## Fresh checks

Edge/Playwright passed at 320/390/768/1440px for both candidates: no overflow/broken images, local font loaded, labelled inputs and minimum 44px field height/16px input text. All four status scenarios were checked at every width. Guest-name minimum length, local acceptance, invoice/policy disclosures, keyboard scenario selection, linked navigation and Test-versus-bank distinctions passed. Commands stayed disabled; no scripts are present. Desktop/mobile screenshots inspected and status styling uses distinct labelled info/success treatments.

Portable callback: [check-guest-checkout-mocks.js](check-guest-checkout-mocks.js), run from Rentra-Doc with the existing [README instructions](../../../../../README.md#resume-ux-mockup-checks). Screenshots: [checkout desktop](evidence/key-guest-checkout-desktop-viewport.png), [checkout phone](evidence/key-guest-checkout-phone-viewport.png), [status phone](evidence/key-guest-booking-status-phone-viewport.png), [refund processing](evidence/guest-refund-pending-desktop.png).

Impeccable detector ran once; its report is [saved](evidence/guest-checkout-detector.json). Font-family/overused-font warnings do not authorize replacing the approved Plus Jakarta Sans. Default-color, type/radius and wording advisories remain draft polish inputs, not a clean-detector claim. No optional multi-lens reviewer gate ran.

Not verified: running-app parity, backend money/policy calculations, authorization, hosted Test flows, real-device/screen-reader use or complete accessibility conformance. Checks prove the specimen's bounded behavior, not production readiness or a measured conversion improvement.

## Next action

Obtain the user's decision on both candidates. Only after approval promote them and their notes with local links intact. Guest policy/price snapshots and all established backend safeguards must be preserved in any later implementation. Keep both spines draft while remaining financial-exception coverage, spine-only choices and reviewer-gate choice are unresolved.
