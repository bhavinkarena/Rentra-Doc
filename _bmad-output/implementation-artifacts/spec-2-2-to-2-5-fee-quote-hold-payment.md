---
title: 'Stories 2.2-2.5 - service fee, quote retention, holds and payment verification'
type: 'feature'
created: '2026-10-26'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Stories 2.2-2.5 approved in epics.md; user decided the fee questions on 26 October 2026">

## User decisions (26 October 2026)

- Hotels move to the guest fee for new bookings only. Existing commission rules and payouts are kept as history, and no new commission rule may start.
- No GST on the fee for now. GST-on-fee remains an open tax/accounting gate.
- The fee is rounded once per order, half up, then split over visits or rooms by largest remainder.
- An owner override may be 0%. A change may take effect in the future; backdating is refused.
- An unpaid held quote keeps its accepted fee. Before acceptance, any rate change shows as QUOTE_CHANGED.

## Story 2.2 - one inclusive service fee (FR-12)

- Migration 0074 adds `service_fee_setting`. It is append-only (a trigger refuses edits), seeded with a global 5% row, keyed by global or owner-wide scope with a unique effective time, and has no category, property or city scope.
- `resolveServiceFee` picks the owner override in force, then the global rate, then the 5% default.
- Admin changes go through `/admin/payments/service-fee` (`admin.payments.write`). Each change is audited with before, after, reason and actor; a stale form gets `FEE_SETTING_CHANGED`.
- The base is rent plus paid extras before tax. Hotels use rooms (including extras), never tax.
- Quote snapshots record `platformFeeBps`, `feeSource`, `feeSettingId` and `feeModel='guest_service_fee'`.
- Hotel stays:
  - the fee is its own payment component;
  - a refund returns the fee in the same share as the stay money refunded, and the whole remaining fee when the last rooms are fully refunded;
  - guest-fee stays carry no owner commission.
- Owner payout summaries and admin hotel analytics exclude Rentra's fee.
- The frontend has a Service fee admin page, marks commission as retired, uses a 5% local estimate and says "Rentra service fee" in its copy.

## Story 2.3 - retain accepted trip terms through login

Already present:
- the listing selection survives login through a signed cookie;
- a fresh owned quote is required afterwards;
- held terms are revalidated, with QUOTE_CHANGED or QUOTE_EXPIRED and no silent substitution.

Added: a customer-area page with an ended session sends the guest to `/login?next=<path>`, and after the OTP the API returns there. Only allow-listed same-origin customer paths are accepted (unit-tested).

## Story 2.4 - holds and booking modes

The lock protocol, request mode, 24-hour reply window, 12-hour pay window, arrival cap and decline release already exist. New test evidence:
- the arrival cap;
- a pending request surviving an instant-book toggle;
- an expired hold cannot be paid;
- both race orders give exactly one hold.

## Story 2.5 - full payment verification

Pinned credential, amount, currency, order and capture checks already exist, along with durable webhook deduplication, late-capture refunds and unknown-on-timeout. New test evidence:
- approval alone never confirms;
- a replayed callback is idempotent, with one capture;
- Test collection is zero;
- a provider timeout becomes `unknown` with no second provider order;
- quoting still works with payments disabled.

Provider account binding comes from fetching with the pinned `credential_key_id` and verifying the signing secret. Razorpay payment objects carry no account id.

</frozen-after-approval>

## Verification

Backend `880e8bb64cc212559bff895e5c089038b54de0d8` and frontend `e4c5f46d702699ed13052245a20f1bf37cfa8b74` are **local and unpushed**: the backend needs migration 0074 on Neon first, and the frontend's 5% estimate should ship with that backend.

- Backend full suite: 334 of 334, 0 skipped. Frontend: 115 of 115. `db:check`: 75 migration files.
- New tests: `service-fee.integration.test.js` (rounding property test plus settings rules), `customer-return-path.test.js`, and the extended `request-to-book`. Updated for the new model: hotel checkout, growth, post-stay and admin, hourly booking, and the pricing policy test.

## Review Triage Log

- high / fixed: the owner payout refunds tile counted Rentra fee refunds.
- high / fixed: non-refundable hotel cancellations refunded the whole fee.
- medium / fixed:
  - Analytics included the fee in GMV.
  - 60-second backdating was allowed.
  - The admin form's stale-check could break past 200 history rows.
  - Two partial refunds could strand one paisa of fee.
- accepted:
  - The listing headline "from" price uses the 5% estimate; the server quote is authoritative.
  - The owner override takes precedence over later global changes (an override replaces the global rate, FR-12).
  - Pure quote callers default to 5%.

## Open gates

- GST on the fee, and accounting treatment.
- Actual contracted gateway costs.
- The published policy text `policies-2026-10-04` still says 8%. A new policy version must be published through content admin; versioned legal text was not edited in place.
- Hosted acceptance.
