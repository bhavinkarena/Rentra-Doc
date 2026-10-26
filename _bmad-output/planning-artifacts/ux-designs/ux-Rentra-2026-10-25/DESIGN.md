---
project: Rentra
status: draft
created: 2026-10-25
updated: 2026-10-25
sources:
  - ../../prds/prd-Rentra-2026-10-25/prd.md
  - ../../prds/prd-Rentra-2026-10-25/addendum.md
  - ../../prds/prd-Rentra-2026-10-25/market-questions-and-answers.md
  - ../../briefs/brief-Rentra-2026-10-24/brief.md
  - ../../briefs/brief-Rentra-2026-10-24/addendum.md
  - ../../prds/prd-Rentra-2026-10-25/market-stay-rules.md
  - ../../prds/prd-Rentra-2026-10-25/market-money-rules.md
  - ../../prds/prd-Rentra-2026-10-25/market-operations-rules.md
  - ../../../../frontend/DESIGN.md
  - ../../../../frontend/docs/rentra-emerald-champagne-design-system.md
  - ../../../../../Rentra/app/globals.css
name: RENTRA
description: A bright, nature-led rental marketplace with precise operational workspaces.
colors:
  brand-50: '#ecf4ef'
  brand-100: '#ddece3'
  brand-200: '#bbd8c8'
  brand-300: '#8dbca4'
  brand-400: '#609a7d'
  brand-500: '#257454'
  brand-600: '#064e3b'
  brand-700: '#043d2e'
  brand-800: '#033326'
  brand-900: '#032d23'
  brand-950: '#021f18'
  amber-100: '#fdf2de'
  amber-300: '#f3c77e'
  amber-500: '#d98a1f'
  amber-700: '#a6640f'
  ink-0: '#ffffff'
  ink-25: '#faf9f6'
  ink-50: '#f3f4ef'
  ink-100: '#eceee8'
  ink-200: '#e1e5de'
  ink-300: '#c4ccc5'
  ink-400: '#7c8780'
  ink-500: '#59655d'
  ink-600: '#4d5a52'
  ink-700: '#38463e'
  ink-800: '#2b3931'
  ink-900: '#1f2924'
  success: '#14532d'
  success-bg: '#ecf5ee'
  warning: '#9a4d0a'
  warning-bg: '#fff4e5'
  danger: '#b42318'
  danger-bg: '#fef3f2'
  info: '#1d4ed8'
  info-bg: '#eff6ff'
  whatsapp: '#1fa855'
  forest-deep: '#032d23'
  forest-line: '#386054'
  paper: '#f8f5ee'
  champagne: '#f8e7c9'
  champagne-hover: '#f2dab0'
  champagne-active: '#eacf9f'
  champagne-subtle: '#fcf5e9'
  champagne-foreground: '#064e3b'
  on-dark-muted: '#d5dad5'
  event-adjustment: '#6b3fa0'
  event-adjustment-bg: '#f5f0fa'
typography:
  display:
    fontFamily: "'Plus Jakarta Sans', 'Noto Sans Devanagari', 'Noto Sans Gujarati', system-ui, -apple-system, sans-serif"
    fontSize: '2.75rem'
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: '-0.035em'
  h1:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: '2.125rem'
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: '-0.03em'
  h2:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: '1.625rem'
    fontWeight: 700
    lineHeight: 1.22
    letterSpacing: '-0.025em'
  h3:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: '1.25rem'
    fontWeight: 600
    lineHeight: 1.32
    letterSpacing: '-0.02em'
  h4:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: '1.0625rem'
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: '1.0625rem'
    lineHeight: 1.62
  body:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: '1rem'
    lineHeight: 1.62
  meta:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: '0.875rem'
    lineHeight: 1.5
  tiny:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1.4
  portal-h1:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: '1.875rem'
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: '-0.03em'
  portal-body:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: '0.875rem'
    lineHeight: 1.62
rounded:
  sm: '8px'
  md: '12px'
  lg: '16px'
  xl: '24px'
  full: '9999px'
spacing:
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '16px'
  '5': '20px'
  '6': '24px'
  '7': '28px'
  '8': '32px'
  '10': '40px'
  '12': '48px'
  '14': '56px'
components:
  button-primary:
    backgroundColor: '{colors.brand-600}'
    textColor: '{colors.ink-0}'
    rounded: '{rounded.full}'
    padding: '0 16px'
    height: '44px'
  button-primary-hover:
    backgroundColor: '{colors.brand-700}'
    textColor: '{colors.ink-0}'
  button-outline:
    backgroundColor: '{colors.ink-25}'
    textColor: '{colors.ink-900}'
    rounded: '{rounded.md}'
    padding: '0 16px'
    height: '44px'
  button-secondary:
    backgroundColor: '{colors.ink-50}'
    textColor: '{colors.ink-900}'
    rounded: '{rounded.md}'
    height: '44px'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.ink-900}'
    rounded: '{rounded.md}'
    height: '44px'
  button-destructive:
    backgroundColor: '{colors.danger-bg}'
    textColor: '{colors.danger}'
    rounded: '{rounded.md}'
    height: '44px'
  button-link:
    textColor: '{colors.brand-600}'
    height: '44px'
  input:
    backgroundColor: '{colors.ink-0}'
    textColor: '{colors.ink-900}'
    rounded: '{rounded.md}'
    padding: '8px 12px'
    height: '44px'
  chip-selected:
    backgroundColor: '{colors.ink-0}'
    textColor: '{colors.brand-800}'
    rounded: '{rounded.md}'
    padding: '0 6px'
    height: '44px'
  portal-nav-active:
    backgroundColor: '#164738'
    textColor: '{colors.ink-0}'
    rounded: '{rounded.md}'
    padding: '0 10px'
  listing-photo:
    backgroundColor: '{colors.ink-100}'
    rounded: '{rounded.md}'
  chip:
    backgroundColor: '{colors.ink-0}'
    textColor: '{colors.ink-700}'
    rounded: '{rounded.full}'
    height: '40px'
  footer:
    backgroundColor: '{colors.forest-deep}'
    textColor: '{colors.paper}'
  booking-summary:
    backgroundColor: '{colors.ink-0}'
    textColor: '{colors.ink-900}'
    rounded: '{rounded.lg}'
    padding: '20px'
---

# Rentra — Visual Design Draft

## Brand & Style

Premium, trustworthy, relaxing, modern and simple. Preserve Rentra's delivered identity: sunlit property photography, Emerald Ink actions, warm light surfaces and Champagne used with restraint. Guest discovery invites a closer look; owner and admin workspaces make the next task obvious. Premium quality comes from clear hierarchy, careful image crops, readable totals and precise interaction feedback.

This draft inherits the existing Rentra system on Tailwind 4 and shadcn/Radix. Frontmatter carries the existing token record, not a new palette. Unlisted primitives inherit the current application. Current runtime values in `Rentra/app/globals.css` describe what exists; approved later product decisions govern target behavior. Resolve discrepancies explicitly before implementation.

**Change threshold:** retain the incumbent unless a comparison demonstrates clearer information, easier action, stronger accessibility or more useful visual hierarchy. Taste and Impeccable inform the proposals; they do not override Rentra's established brand. No application code has been changed by this draft. These two spines take precedence over mockups once finalized; they remain drafts until open items and visual coverage are resolved.

## Colors

| Token family | Role |
|---|---|
| `{colors.brand-600}` / `{colors.brand-700}` | Primary action and hover/link hierarchy. Keep one clear primary action in each task region. |
| `{colors.ink-25}` / `{colors.ink-0}` | Warm page ground and white working surface; photography supplies richness. |
| `{colors.ink-900}` / `{colors.ink-500}` | Primary and secondary reading text. Never use decorative pale values for essential information. |
| `{colors.champagne}` / `{colors.champagne-foreground}` | Restrained accent or inverse-surface action; never a status color. |
| `{colors.success}` / `{colors.warning}` / `{colors.danger}` / `{colors.info}` | Domain states, always with an explicit text label and matching background token. |
| `{colors.forest-deep}` / `{colors.paper}` / `{colors.on-dark-muted}` | Existing footer and operational sidebar identity; preserve visible inverse focus treatment. |

Contrast targets: normal text at least 4.5:1, large text at least 3:1, meaningful control boundaries/focus at least 3:1 against adjacent colors. Verify the rendered combinations; token inheritance is not accessibility certification. White text on brand actions and dark text on Champagne remain the established roles. Do not recolor financial exceptions as decorative brand accents.

The delivered product is light-themed. Dark mode and additional language delivery are not implied by fallback fonts or inverse surfaces.

## Typography

Inherit locally served Plus Jakarta Sans and the existing fallback stack. Use `{typography.h1}` for guest page titles, `{typography.h4}` for room names and prices, `{typography.body}` for explanations and `{typography.meta}` for concise supporting facts. Operational workspaces inherit `{typography.portal-h1}` and `{typography.portal-body}`. Preserve the existing hero's `{typography.display}` rather than spreading display type into operational tools.

Money uses tabular figures and the existing INR formatter. The total is visually stronger than a supplementary nightly equivalent. State what period, room count and party the price covers. Policies, errors and fee explanations must remain comfortably readable; do not compress them into `{typography.tiny}` to fit a card. Inputs remain at least 16px below 768px to avoid mobile zoom.

## Layout & Spacing

Inherit the 1280px page container, `{spacing.4}` phone gutters, `{spacing.6}` wider gutters and 4px spacing base. Preserve existing public header/search geometry and route shell behavior unless their measured defects require change. Owner/admin density remains task-appropriate; do not turn their queues into marketing layouts.

**Approved room composition:** photo first; details left and price right. The user approved the demonstrated mobile/desktop mockup. Show the room photograph above its information on phones, with a readable facts/total row beneath it. Keep a trailing total where it fits; stack price below details when text zoom or narrow width requires it. Larger screens can preserve useful side-by-side comparison. Do not sacrifice room identity, included meals, cancellation terms or full-trip context to force columns.

The candidate addresses an observed source gap: current room-card images are hidden below `sm`. It does not justify replacing the working room/rate-plan selection flow. The existing property portfolio's photo-led cards and overview remain the owner baseline.

Approved visual direction: [photo-first hotel room mockup](mockups/key-hotel-rooms.html), compared with a [simplified source reconstruction](mockups/baseline-hotel-rooms.html). Both use labelled example content; the baseline is not a running-app screenshot. [Comparison notes](mockups/mockup-notes.md) describe scope and limitations. Approval covers presentation and demonstrated interactions; illustrative prices, policies and photography are not production listing data. Application behavior remains unchanged.

## Elevation & Depth

Flat listing and operational surfaces by default. Use the inherited small shadows for floating controls, stronger elevation for popovers/dialogs and the established booking summary. Image content and spacing carry hierarchy; do not add a shadow to every card. Preserve the current 2px focus outline and offset, including on inverse surfaces.

## Shapes

Inherit `{rounded.sm}` 8px, `{rounded.md}` 12px, `{rounded.lg}` 16px, `{rounded.xl}` 24px and `{rounded.full}`. Public actions and chips keep their existing pill shape; labelled fields and operational commands retain the established 12px treatment. Photos follow their container corners. Do not introduce another radius scale.

## Components

Approved owner setup direction: [Rooms](mockups/key-owner-rooms.html) and [Rates](mockups/key-owner-rates.html) preserve the current wizard and propose clearer field grouping and optional-detail disclosure. [Scope and existing behavior](mockups/owner-setup-notes.md) distinguish these visual references from delivered functionality. The user approved the demonstrated Rooms and Rates layouts.

These names match EXPERIENCE.md. Existing native/shadcn primitives inherit their established specifications; the table describes product compositions and proposed deltas.

| Component | Visual specification |
|---|---|
| Navigation | Preserve current public header and deep emerald operational sidebar, real Rentra artwork, readable active labels and inverse focus. Responsive navigation must not obscure the task. |
| Search and filters | Inherit labelled search controls and selection styles. Optional property-type filter sits within the existing filtering hierarchy; selected values remain visible and removable. |
| Listing card | Reuse the shared photo-led card: real 4:3 photograph, clear identity, honest rating/new state, capacity and dated total context. Save remains a separate control. |
| Room card and rate plan | Photo leads. Room facts and inclusions align left; selected-trip total aligns right where readable. Plan rows expose meaningful differences without competing primary buttons. Mobile photo treatment follows the approved mockup; preserve production quantity and availability rules. |
| Forms and setup | Shared labelled fields, help and error linkage, inherited `{components.input}` styling. Proposed grouping of required basics and optional advanced settings uses existing sections rather than a new wizard unless evidence warrants it. |
| Calendar | Inherit current date cells, selected/open/blocked states and property-local date presentation. Preserve contrast and labels; unavailable dates must not resemble payment downtime. |
| Booking summary | Inherit `{components.booking-summary}`. Total, trip context and primary next action lead; itemized money rows stay aligned. Policy and payment-environment disclosure remain visible. |
| State badge and trust details | Labelled semantic state treatment. Verification wording describes actual checks; supporting detail must be readable without implying universal physical inspection. |
| Record list and detail | Preserve existing guest record rows/photo booking cards, owner tables and admin contextual detail. Align numeric columns and keep reference/identity prominent. Retain list context when opening detail. |
| Review and confirm | A focused consequence preview with amounts, scope and destructive action clearly distinguished. Existing safeguards and permissions remain visible. No generic decorative success screen. |
| Feedback and loading | Geometry-matched skeletons, stable pending controls, nearby field errors and durable task outcomes. Use semantic states rather than decorative shimmer or repeated toasts. |
| Photo gallery | Real property/room photos with honest missing-image treatment, stable aspect ratio, labelled controls and readable captions. Proposed room photo expansion reuses existing gallery affordances where available. |

## Do's and Don'ts

| Do | Don't |
|---|---|
| Keep brand and working compositions unless a comparison demonstrates improvement. | Redesign every screen merely for visual novelty. |
| Let photos invite exploration and totals enable comparison. | Hide room photos on phones or promote a nightly teaser over a known trip total. |
| Keep meaningful policy/facility information accessible through clear disclosure. | Silently truncate the only facilities list or bury mandatory charges. |
| Preserve accessible focus, pending/error recovery and unsaved-change protection. | Add motion that delays actions, shifts controls or hides uncertainty. |
| Use real imagery, real states and real provider evidence. | Invent verification, urgency, ratings, availability or live payment success. |
| Treat proposed layouts and timings as candidates until rendered and checked. | Present this draft as implementation completion or production readiness. |
