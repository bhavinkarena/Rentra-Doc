# Accessibility and responsive review

26 October 2026. Verdict: **strong** as a design handoff; this is not a WCAG conformance assessment or production acceptance.

Scope: DESIGN.md, EXPERIENCE.md, approved `mockups/key-*.html`, their scope/check notes, and `.working/final-mock-coverage.md`. Existing brand, approved layouts and written-only coverage were retained. Review was by document/HTML inspection; existing browser evidence was read, not rerun. No source artifact was edited.

## Findings

**A11Y-1 — Low: lead-guest field label describes the room rather than the required information.**

Evidence: `mockups/key-guest-checkout.html:17`, `<label for="guest-name">Room 1 · Twin room</label>`. The surrounding section explains the lead guest's name, but that instruction is neither the field's accessible name nor its linked description. A person navigating by form controls hears room identity without the requested data. This falls short of EXPERIENCE.md's descriptive labels requirement in Accessibility Floor; the input does have a valid label, so this is a clarity defect rather than an absent-name claim.

Minimal fix: change the visible label to `Lead guest name · Room 1 · Twin room`. Keep the existing autocomplete, validation and room context. No layout change or new interaction is needed. Check that the resulting visible/accessibility-tree label identifies the name field. Apply the same wording to the retained working preview if that file remains a supported review link.

Counts: 0 critical, 0 high, 0 medium, 1 low. No blocking design contradiction found.

## What is sufficiently specified

- **Keyboard, focus and errors:** EXPERIENCE.md:119 and :150–159 require preserved field values, linked errors, error-directed focus, reading-order traversal, dialog initial/contained/return focus, unobscured focused elements, programmatic selection/expansion/pending states and polite meaningful updates. DESIGN.md:255 preserves inverse focus. Native labels, fieldsets, radios and disclosures in the references support this direction.
- **Responsive hierarchy and density:** DESIGN.md:241–247 protects legible inputs, policies, room identity and full-trip amounts, with stacking when columns stop fitting. EXPERIENCE.md:157 and :161–169 specifies reflow, labelled local table scrolling, safe-area/keyboard visibility and current breakpoints. The checkout summary precedes the form in DOM order and on phones; its desktop rail position does not conceal the task context. Owner/admin references retain useful operational density and collapse navigation without imposing a new shell.
- **States and permissions:** EXPERIENCE.md:97, :106 and :117–125 explicitly preserve identity isolation, capability-based visibility, absence of mutation controls for read-only roles, stale-preview recovery and non-final money uncertainty. Support's local internal/public audience specimen is expressly distinguished from real authorization. Text-labelled booking/payment/refund and verification/publication/bookability facts avoid dependence on color alone.
- **Boundaries are honest:** the coverage map approves written behavior plus inherited layouts for remaining surfaces. It does not claim exhaustive mocked states. Native preview editing and disabled operational commands deliberately exclude server validation, persistence and transactions.

## Implementation and release checks already required

Keep the existing obligations; they are not newly discovered missing design decisions. EXPERIENCE.md:159 and :169 explicitly requires screen-reader naming, calendar keyboard operation, zoom and actual phone ergonomics, including real iOS Safari/Android Chrome. The recorded preview width checks cover 320/390/768/1440px; they do not establish the separate 1024px, zoom, device or assistive-technology gates. DESIGN.md:233 requires rendered contrast measurement. Production must implement announcements, error linkage and authorization against authoritative states rather than copying static HTML as a complete component.

The guest-status scenario radios and frozen refund-allocation comparisons are offline reviewer controls; their CSS-switched example panels are not evidence that production status updates fail announcement requirements. Those requirements are already explicit in EXPERIENCE.md:156 and the scope notes. Likewise, disabled financial buttons in these references do not contradict the separate production rule that read-only roles receive no mutation controls.

Skipped: repeat browser gates, running-app parity, real-device/screen-reader use and production authorization checks. Risk: approved design and bounded preview evidence do not establish production accessibility conformance.


## Resolution recorded by facilitator

26 October 2026. A11Y-1 resolved: visible name field label now includes Lead guest name, in both promoted and working specimens. These are corrections to documentation/specimens, not application changes. See validation-report.md for final disposition and bounded confirmation evidence.
