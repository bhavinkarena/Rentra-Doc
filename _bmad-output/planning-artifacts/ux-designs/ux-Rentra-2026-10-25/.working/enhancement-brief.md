# Rentra UX enhancement brief

Status: proposed refinement within the approved brand; not an application delivery record.

## Purpose

Help guests confidently choose and book a suitable stay; help owners configure sellable inventory and act on bookings; help admins resolve verification, support and financial exceptions without losing context. Preserve the working product. Each proposed replacement needs a specific observed problem and a checked improvement.

## Visual authority

The finalized PRD and later approved decisions govern product truth. Current Rentra runtime tokens, brand artwork and shared components govern the inherited visual world. Retain Emerald Ink, Champagne, warm light surfaces, Plus Jakarta Sans, real photos and operational workspace density. Skill presets are references, not authority to replace these choices. The taste-generated achromatic-ledger proposal is not selected because it replaces the established emerald actions and sidebar.

## Proposed enhancements

| Surface | Existing evidence / job | Proposed refinement | Proof required before replacement |
|---|---|---|---|
| Guest discovery | Browse suitable stays; user approved optional property-type filtering | Keep broad discovery, expose selected filters and a clear reset; preserve trip and search context | Phone and desktop search remain understandable, filters recover across navigation, no invalid cross-category slot/date semantics |
| Hotel rooms | Current room-card photo is hidden on phones | Photo-first room presentation; details left, total right; wrap without squeezing price or readable content | Compare against existing card at 390, 768 and 1440px plus 320px stress; no overflow or lost availability/selection behavior |
| Hotel facilities/plans | Facilities currently truncated; room/meal/occupancy/date pricing already exists | Make complete relevant facilities reachable; show essential bedding, capacity, inclusions and policy distinctions next to offer choice | Guest can identify included and required extra items; no hidden mandatory cost; disclosures usable by keyboard and touch |
| Quote and booking | Existing quote, request approval, payment verification and confirmation are separate | One prominent selected-trip total and breakdown; persistent explanation of pending outcome and supported next action | Quote changes reviewed explicitly; unknown payment never shown failed or confirmed; Test mode unmistakable |
| Owner setup | Existing draft, rooms, pricing, calendar and review workflows | Keep current steps; group new approved policy controls by the task, expose inherited defaults and explicit overrides | Owner can identify what is missing, save privately and return without losing work; no assumption that save resubmits |
| Owner operations | Existing lists, calendars, booking details and unsaved guards | Preserve filter/scroll context, clear state-specific actions and next steps | Return from details restores context; guarded edits survive accidental close; unavailable actions explain why |
| Admin operations | Existing capability-aware queues, finance records and command previews | Make urgent/blocked work and evidence discoverable within existing queues; distinguish guest refund, owner liability and settlement | No unsupported urgency promise; independent grants preserved; reason, preview, confirm and audit history remain intact |

## Interaction thesis

The distinctive moment is continuity from viewing a room to understanding the chosen offer and its complete trip total. Selection must feel immediate without presenting a stale amount as authoritative.

- Reuse current popover, dialog, sheet, field, button and state components before adding patterns.
- Keep photo navigation manual and labelled; no new auto-advancing room gallery.
- On selection, acknowledge the selected control immediately. If a quote is recalculating, label the total as updating and prevent committing a stale quote. Preserve the prior selection if recovery is supported.
- On return from room details, owner forms or admin records, retain the supported search/filter/selection context.
- Use existing easing and short state transitions; timing changes are proposals to verify, not new global tokens. Routine work must not wait for an entrance sequence.
- Pending buttons state the action in progress and prevent duplicate submission. Toasts supplement durable record/error states.
- Closing overlays restores focus to the invoking control. Every action remains available without hover or drag. Reduced motion removes nonessential spatial movement while retaining state feedback.
- Financial confirmation follows server evidence. No animation or optimistic label creates a booking, payment, refund or payout fact.

## Comparison rule

For each candidate: capture the current state, name the problem, render the proposed state at matching widths and content, inspect both, and check the relevant task and error path. Retain the incumbent where the result is equivalent or worse. Review loading, empty, unavailable, long-content and failure states alongside the happy path. Performance, focus, readability and truthfulness are part of improvement.

## Boundaries and open work

This brief and draft spines are UX planning. No application source, backend behavior, live gateway configuration or deployment changes are made here. Source inspection is not a rendered before/after usability comparison. Key-screen mocks, visual choices, mock coverage and optional reviewer validation remain open; both spines stay draft until those steps are resolved.
