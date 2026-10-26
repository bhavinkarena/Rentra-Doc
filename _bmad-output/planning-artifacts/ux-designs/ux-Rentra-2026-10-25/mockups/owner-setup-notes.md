# Owner setup mockups

User-approved presentation direction; no application files changed. Both offline HTML files reuse Rentra's local logo/font and current visual tokens.

- `key-owner-rooms.html`: room identity/count, beds, occupancy and included guests, additional-person charges, optional size/view and action safeguards.
- `key-owner-rates.html`: base room rent, meals, current cancellation preset, derived-plan relationship and existing calendar handoff.

## Existing versus proposed

The existing wizard already has three chapters, eleven hotel steps, a desktop step rail, mobile step disclosure, fixed save/continue, validation/version handling and unsaved-change safeguards. These are retained, not claimed as new UX. Source: `Rentra/lib/domain/listing-steps.js`, `components/partner/listing/WizardShell.jsx`, `WizardProgress.jsx`, `DraftSave.jsx` and `SectionPrimitives.jsx`.

`HotelSections.jsx` currently places four occupancy fields then extra-adult/child, optional size and view in compact peer grids. The proposal groups them by meaning, spells out total versus included occupancy, leaves required capacity/price inputs visible, and discloses optional room detail separately. This is a candidate comprehension improvement, not a proven task-performance gain.

Rates preserve the base/derived meal-plan model. Owner nightly amounts are labelled rent, distinct from the guest fee-inclusive quote. No tax percentage or new cancellation policy is invented; existing presets are illustrative selections, while richer configurable cancellation and child/bedding policies remain planned. Current frontend tax-preview behavior is not certified as the approved policy.

## Preview limits

Native input editing, selects and disclosures work. Values are example content; they reset on navigation and do not update the static readiness snapshot. No autosave, persistence, validation service, review submission or publication is simulated. The disabled Save and continue control explains this visibly. Existing save/autosave/recovery behavior must be preserved per supported step, not generalized across hotel forms.

Add/remove/reorder/duplicate controls are disabled context references. Production retains maximum types, bed options/counts, removal refusal for booked room types, derived-plan removal safeguards and restore behavior. Room photos are not added because this editor has no photo field. Mobile headers/layout are simplified specimens, not pixel-exact running-app screenshots.

## Browser targets

- Rooms inputs: `#room-name`, `#room-count`, `#bed-count`, `#bed-type`, `#max-adults`, `#max-children`, `#max-guests`, `#base-occupancy`, `#extra-adult`, `#extra-child`.
- Rooms disclosure: `#optional-room`; fields `#room-size`, `#room-view`.
- Rates inputs: `#plan-name`, `#meal-plan`, `#weekday-rate`, `#weekend-rate`, `#cancellation`.
- Rates disclosures: `#meal-plan-options`, `#date-rates`.
- Mobile step disclosure: `.mobile-steps`; footer: `.footer` and disabled `button[aria-describedby="save-note"]`.

File checks passed: unique IDs, matching labels for every input/select, local image/font references, no scripts, visibly disabled save.

Parent browser checks passed in Microsoft Edge at 320/390/768/1440px for both pages: no page overflow, images/font loaded, every visible field labelled, field height at least 44px and input text at least 16px. Native editing/minimum room-count validation, disclosures, local step navigation, focus treatment and disabled-save state checked. Desktop/mobile screenshots inspected; compact mobile occupancy grouping and footer/copy refinements confirmed in a second bounded pass.

Impeccable detector flags the local font as `jakarta sans`; the file explicitly loads the existing Plus Jakarta Sans asset, so no replacement font is introduced. Default border-color advisory is not evidence of a visible custom black border. Detector findings are not an accessibility certification. No running-app comparison, backend validation, database/provider, screen-reader or real-device checks performed. The user approved the demonstrated owner Rooms and Rates direction. Illustrative data, disabled commands and omitted production behavior are not implementation acceptance.
