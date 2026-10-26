# Experience input reconciliation

26 October 2026. Compared final EXPERIENCE.md with the current draft architecture spine, including its newly added payout-mode, ordinary-refund and urgent-routing constraints. Document reconciliation only.

Verdict: the role surfaces, authoritative totals/accepted terms, separate financial states, authentication recovery, private-cache isolation, timing rules, responsive/accessibility requirements and explicit implementation/release boundaries are carried through directly or through binding UX references. One cross-feature command boundary should be explicit.

## Material finding

- **Medium - internal-note command isolation (EXPERIENCE / Component Patterns; approved admin support reference).** The UX explicitly separates guest replies from internal notes and hides status-changing controls in internal-note mode. AD-12 protects the private audience, but neither AD-2 nor AD-14 binds the note command's allowed effects. Support API and UI could agree on a private note that also accepts a case-status field, recreating the exact prohibited behavior while obeying the stated privacy rule. Require explicit message audience/command semantics and state that saving an internal note cannot change case, booking or financial status. Status changes must use their separately authorized action and confirmation rules. This is a shared API mutation boundary, not a demand to copy presentation detail.

## Preserved scope

The source-priority paragraph correctly leaves the full EXPERIENCE behavior binding. No new route, caretaker redesign, offline write queue, motion library or live-payment capability is required. Component-specific layout and gesture details appropriately remain in final DESIGN/EXPERIENCE rather than this initiative spine.

No application code, browser journey, device/screen-reader behavior or provider operation was checked. This report does not establish runtime compliance.
