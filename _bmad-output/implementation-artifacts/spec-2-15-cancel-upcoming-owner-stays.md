---
title: 'Story 2.15 - cancel upcoming owner stays with full entitlement'
type: 'feature'
created: '2026-10-28'
status: 'done'
route: 'dispatch'
review_loop_iteration: 1
context: []
---

<frozen-after-approval reason="Story 2.15 approved in epics.md; product decisions taken by the user on 28 Oct 2026">

## Intent

PRD FR-6 and FR-7 (epics.md, Story 2.15). The owner can pause a property and cancel every upcoming stay without prior admin approval. Each guest gets back everything they paid.

User decisions (28 October 2026):
- Cancelling always pauses the property.
- It covers every upcoming stay; the owner cannot pick a subset.
- Guests are told by SMS and on the portal now. Guest email stays a gate.
- A reason is required, and guests see it.

## Behavior

- **Scope:** a confirmed visit whose booked check-in instant is strictly in the future. A stay at or past check-in is excluded and counted as `startedExcluded`. The check-in instant comes from the property time zone.
- **Entitlement:** everything actually captured (rent, Rentra fee, tax and extras), less refunds already recorded or reserved. A refund that lands between the preview and the confirm reduces the amount; it is never duplicated. Each refund carries the reason "Owner cancelled upcoming stay".
- **Preview:** `GET /partner/listings/:id/cancel-upcoming` is owner-scoped (another owner gets 404). It returns:
  - the stays, each with its refund, `ownerPaidOut` and any `blocked` reason;
  - the unpaid holds, with `awaitingOwner` and `paymentInFlight`;
  - the started-excluded count, the property version and a plan hash.
- **Command:** `POST /partner/listings/:id/cancel-upcoming` takes `{hash, expectedVersion, requestKey, reason (10-500)}`.
  - A changed plan or version returns `CANCELLATION_CHANGED`, and nothing changes.
  - The property pauses with no end date. If it is already paused, `paused_until` is cleared.
  - **Stays:** each order is cancelled in its own transaction through `applyCancellation`. The guest gets the `cancellation` SMS, the owner gets a portal update, and the booking record shows `hostCancellationReason`.
  - **Pending requests:** released with `owner_declined` (SMS `request_declined`).
  - **Instant or approved holds:** released with a `cancel_` event (SMS `cancellation`). No refund.
  - **Holds with a payment already sent to the provider:** `needs_rentra` with `PAYMENT_IN_FLIGHT`. The hold is never released as unpaid. A capture landing later is refunded by the Story 2.14 settlement guard.
  - **Stays Rentra must handle** (`needs_rentra`): `PAYMENT_UNVERIFIED` (legacy), `PAYMENT_UNSUPPORTED`, `HOURS_UNKNOWN`, and `FUNDS_ALREADY_PAID_OUT` (the database funds cap refused the refund; recovery is FR-14). These are left untouched.
  - **Outcomes:** each order reports `cancelled`, `released`, `changed` or `needs_rentra`. One failure never undoes another order.
- **Durability:** migration 0079 adds `owner_cancel_upcoming`.
  - The claim stores the planned orders.
  - Each order's outcome is appended in the same transaction as its change, under the command row lock.
  - The same key with the same payload resumes and returns the recorded outcomes. A different payload returns `IDEMPOTENCY_CONFLICT`.
  - Any new request first finishes an unfinished earlier command for that property, because a reload loses the browser's key.
  - Serialization and connection failures are not recorded, so the next request finishes that order.
  - The audit entry is written once, by the call that completes the command.
- **Frontend:** the pause dialog's second choice is "Stop new bookings and cancel upcoming stays". It shows:
  - each stay with its refund, or why Rentra handles it;
  - the unpaid holds, including any with a payment in progress;
  - the started-stay note;
  - a required reason field;
  - a per-booking results card after success.

  The request key is kept only across server failures. It is reset on any 4xx response or when the reason is edited.

</frozen-after-approval>

## Verification

Backend `8af21f2180d2ab18fcc9d2de33e835432a063b47` and frontend `1ec599a4b62b5bafa0047ee75ad9a21f133471de` are local commits. They have not been pushed. All test runs used the disposable PostgreSQL 14 at `127.0.0.1:55432`, with `DATABASE_URL` pointed at an unreachable address.

- **New `owner-cancel-upcoming.integration.test.js`** covers:
  - **Preview:** scoping and the 404 for another owner; a started stay is excluded; the full paid amount; an earlier refund is counted; the legacy stay is `PAYMENT_UNVERIFIED`; the hold flags.
  - **Rejected requests:** a 422 for a short reason, a 404 for another owner, and a stale hash that changes nothing.
  - **Outcomes:** cancelled with refund equal to paid; instant hold and request released; in-flight hold left held as `PAYMENT_IN_FLIGHT`.
  - **Effects:** the property is paused; the refund reason; the `cancellation` SMS for a stay and an instant hold, and `request_declined` for a request; the host reason on the guest record.
  - **Repeats:** a replay; `IDEMPOTENCY_CONFLICT`; no second refund.
  - **Crash recovery:** a crashed claim is finished by a new key, then replayed by the old key, with one refund and one audit entry.
  - **Already paused:** a property paused with an end date is cleared to "until resumed".
- **Fixture fix:** `pause-bookings` now expects cancel-upcoming to be available. A flaky fixture used separate `clock_timestamp()` calls; it now uses `now()`.
- **Final runs:**
  - Backend full suite with `--test-concurrency=1`: **387/387**, 0 failed.
  - Frontend `npm test`: **135/135**.
  - `db:check`: 80 files.
  - Service syntax checks, targeted ESLint and Prettier on changed lines, and `git diff --check` pass.
  - One Prettier error remains at `listings.controller.js:199`. It is outside this diff and was left as it was.
- **Not run:** browser, device and accessibility checks; hosted acceptance.

## Review Triage Log

**Independent review (cavecrew-reviewer):**
- **high / fixed:** results were saved only at the end, so a crash lost them. Outcomes are now saved per order and resumed.
- **high / fixed:** a hold with a dispatched payment was released as "no money taken". It now goes to Rentra as `PAYMENT_IN_FLIGHT`.
- **medium / fixed:** `paused_until` was not cleared on an already-paused property.
- **medium / fixed:** stale orders now report `changed`, and transient database errors are left for a retry.
- **medium / fixed:** instant holds got "Owner declined your request". They now get the cancellation notice.
- **medium / fixed:** the frontend request key is reset when the reason changes and on a 4xx response.

**Low / accepted, disclosed:**
- Receipt snapshot visits carry no per-visit amounts.
- Extras are folded into rent: the payment component enum is rent, fee, tax and deposit.
- In a mixed multi-visit order, a visit already started stays confirmed while its future visits are cancelled. The guest path does the same.

**Closure check by the same reviewer:** fixes 1-6 are closed. It raised two new medium findings, both now fixed:
- A command with a lost key had no resume path. A new request now finishes the unfinished command first.
- After a lost response, a changed reason gave a misleading stale message. The message is now neutral: "changed since this list was shown". With the resume path, a new request either finishes the earlier command or shows the updated list.

**Below threshold, accepted:** `awaitingOwner` is not in the plan hash. If a request is approved between preview and confirm, the guest gets the cancellation notice instead of "declined". Both notices are accurate.

## Open gates

- Guest email notices (user decision: email stays a gate).
- Recovery of owner proceeds already paid out (FR-14). Stays where the funds cap refuses the refund go to Rentra.
- Migration 0079 joins 0076-0078 as unapplied on Neon.
- All Story 2.13 transfer, funding and provider gates are unchanged. No real refund is sent; refunds stay test-environment obligations.
- Browser, device, accessibility and hosted acceptance.
