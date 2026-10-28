---
title: 'Story 2.14 - pause new bookings while retaining commitments'
type: 'feature'
created: '2026-10-28'
status: 'done'
route: 'dispatch'
review_loop_iteration: 1
context: []
---

<frozen-after-approval reason="Story2.14 approved in epics.md; standing authorization; no new product decision needed (PRD FR-6 settles the open points)">

## Intent

PRD FR-6: "stop-new-only prevents new approvals/confirmations while inactive but preserves existing holds until decline/expiry". Cancel-upcoming execution is Story 2.15.

The read-only gap analysis found:
- an owner pause toggle with no preview of affected bookings;
- a replayed "pause" resumed the property, and there was no version guard;
- owners could approve requests while paused;
- a paused hotel still let a guest start paying for an existing hold, while slot/hourly listings were already blocked.

Quotes and new holds were already refused in every vertical. Settlement already refuses to confirm a capture on a non-live property.

## Behavior

- **Preview:** `GET /partner/listings/:id/pause-preview` (owner-scoped; another owner gets 404) returns:
  - confirmed upcoming stays (total, the Story 2.15-cancellable count, and items);
  - pending requests awaiting the owner;
  - holds awaiting guest payment;
  - the `lifecycle_version`;
  - the choices: stop-new-only available, cancel-upcoming unavailable.
- **Command:** `toggleListingPause` accepts an explicit `action` (pause or resume) and `expectedVersion`.
  - A same-state request, including a concurrent identical one, returns `replayed: true` and changes nothing.
  - A stale version returns `stale: true` and leaves the property unchanged.
  - The conditional update also checks `lifecycle_version`. The old toggle without an action still works.
  - The audit `after` records `mode: stop_new` and the retained counts (`null` if counting fails; the pause, audit and cache refresh still complete).
- **While a property is not live:**
  - `decideBookingRequest` refuses approval: `LISTING_PAUSED` when paused, `APPROVAL_UNAVAILABLE` when restricted. Decline remains available.
  - `listBookingRequests` adds `canApprove` and `approveBlocked`.
  - `startCheckoutPayment` refuses a new dispatch in every vertical (`LISTING_UNAVAILABLE`). An already-dispatched payment is still returned as status.
  - A capture that lands during the pause is not confirmed: settlement releases the dates and records a refund obligation for the captured money.
  - Holds keep their deadlines. Nothing uncaptured is refunded.
- **Frontend:**
  - The pause dialog shows the three lists, stop-new-only (selected) and cancel-upcoming (disabled, with the reason), and says the lists are as of now. It sends the action and version; a stale result refetches the preview.
  - The Accept button is disabled, with paused- or restricted-specific copy.
- No migration.

</frozen-after-approval>

## Verification

Backend `9f51fc1e973868ea932d7a804e90c0d57107f326` and frontend `4ff34bde36e550415fcea77ba9b80a67686f9c04` are local commits. They have not been pushed.

The starting revisions matched the checkpoint (backend `12527f36ef8dcb3375b5c6c7aaf5aba62585c1d2`, frontend `17767b3d4d786ab0419cff82f4ecb3adfc255fab`, docs `f666206142110f3837fb88f629020ca510c87ab2`). The baseline reproduced 384/384 on this machine (PostgreSQL 14.19).

- **New `pause-bookings.integration.test.js`:**
  - preview split and scoping;
  - stale refused, then pause, then replay as a no-op;
  - audit counts;
  - commitments unchanged;
  - new hold, approval and payment refused, with the paused reason in the list;
  - in-flight payment still readable;
  - a capture racing the pause is not confirmed: refund obligation, no committed reservation, no refund for uncaptured holds;
  - decline works;
  - resume makes the hold payable, and a repeated resume is a no-op.

  It fails with the approval and payment guards removed.
- **`hotel-checkout`:** a paused hotel starts no payment for an existing hold, and refuses a new quote or hold.
- **Final runs:**
  - Backend full suite with `--test-concurrency=1`: **386/386**, 0 failed, 0 skipped.
  - Frontend: **135/135**.
  - `db:check`: 79 files.
  - Service syntax checks, targeted ESLint and Prettier, and `git diff --check` pass.
- **Not run:** browser, responsive, device or screen-reader checks; hosted acceptance.

## Review Triage Log

- **high / withdrawn by the reviewer:** "hotel admissions open while paused". The hotel `buildQuote` already refuses non-live hotels; a test now proves a new hotel quote or hold is refused.
- **medium / fixed:**
  - A concurrent duplicate pause now reports a replay instead of a conflict.
  - A failure counting retained bookings no longer skips the audit or cache refresh.
  - The stale signal now reaches the UI, and specific error text replaces the generic summary.
  - The payment guard sits after the in-flight check, so dispatched payments stay readable.
  - Restricted properties get their own wording and error code.
- **medium / accepted, disclosed:** the preview version covers the property state, not booking activity. The dialog states the lists are "as of now", and no new booking can start once paused.
- **question / intended:** a capture landing while paused is refunded, not confirmed. This is FR-6's "prevents new confirmations", and the test covers it.
- **low / accepted:** a retained-count failure is recorded as `retained: null` without a log line.
- Bounded closure check by the same reviewer: all findings closed, with no new high or medium defect.

## Open gates

- Story 2.15: cancel upcoming stays with full entitlement.
- Production build, browser, device and accessibility checks; hosted acceptance.
- All Story 2.13 transfer/funding/provider gates are unchanged.
- Migrations 0076-0078 are still unapplied on Neon; this story adds none.
