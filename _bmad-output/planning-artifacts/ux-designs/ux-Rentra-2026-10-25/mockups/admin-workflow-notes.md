# Admin verification and support mockups

Updated 26 October 2026. Visual directions approved by the user on 26 October after review of both candidates in Rentra-Doc. No application source or live record changed.

## References and proposed improvements

- [Property evidence review](key-admin-verification.html): existing full-page review, assignment, revision-specific outcomes and verification scheduling retained. Candidate hierarchy leads with the evidence task and separates owner identity, property review, publication and bookability. Approve for verification does not publish a listing.
- [Booking-linked support](key-admin-support.html): existing conversation, internal notes, request context, assignment/escalation, history and reply/status patterns retained. Candidate hierarchy leads with the reported problem and next task; booking, payment and refund facts remain separate.
- Native audience selection shows who can see a draft. Internal-note mode hides status-changing controls and shows Save internal note, matching the existing behavior boundary. All commands are disabled here; nothing is sent.

Source checked in sibling frontend: `components/admin/PropertyReviewForm.jsx`, `VerificationPanel.jsx`, `AdminSupport.jsx`, `SupportManagement.jsx`, `components/customer/SupportForms.jsx` and their admin property/support routes. Shared historical runbooks live under `frontend/docs/` in Rentra-Doc. Current source governs existing-functionality claims; finalized PRD/addendum govern target requirements.

## Scope and fidelity limits

Records, identities, dates and evidence descriptions are illustrative. No private document is included; no evidence download, message, approval, scheduling, assignment, refund or publication command executes. Input values reset on navigation; static record summaries do not update from edits.

The correction checklist is shortened, not a replacement for category-specific review fields. The issue summary is a proposed presentation of the example message, not automatic extraction or an implemented structured incident form. Incident remedy and responsibility allocation are planned requirements; the support specimen does not implement financial execution. Cross-module booking/payment/refund facts require independent read permissions and authoritative data. Test capture does not imply real bank collection. No urgent staffing coverage or response guarantee is invented.

## Fresh verification — 26 October

Microsoft Edge/Playwright checks passed for both pages at 320, 390, 768 and 1440px: no page overflow or broken images, local Plus Jakarta Sans loaded, labelled fields, visible field height at least 44px and text at least 16px. Native disclosures, textarea editing, visible focus, keyboard opening of mobile navigation and public/internal audience separation passed. No enabled command button or script was present. Desktop/mobile screenshots were inspected.

The audience check initially exposed a cached pre-correction page. The saved callback now cache-busts local page reads; final checks passed against the updated files. No additional visual redesign or app change was made to solve the cache issue.

- Portable browser callback: [check-admin-mocks.js](../.working/check-admin-mocks.js); run using the docs-root instructions in [README](../../../../../README.md#resume-ux-mockup-checks).
- Screenshots: [verification desktop](../.working/evidence/key-admin-verification-desktop-viewport.png), [verification phone](../.working/evidence/key-admin-verification-phone-viewport.png), [support desktop](../.working/evidence/key-admin-support-desktop-viewport.png), [support phone](../.working/evidence/key-admin-support-phone-viewport.png).

Not checked: running-app fidelity, real backend permission enforcement, screen-reader use, real-device Safari/Android, provider flows or complete WCAG conformance. These checks are not the optional multi-lens UX reviewer gate.

## Implementation handoff

The visual direction and written-only coverage are approved. DESIGN.md and EXPERIENCE.md are finalized after selected UX reviews and source/editorial reconciliation. These reference specimens and their evidence limits do not establish runtime behavior, accounting/legal validity or live readiness. Follow the canonical spines and HANDOFF.md for implementation; preserve the existing app's validation, permissions and financial safeguards.
