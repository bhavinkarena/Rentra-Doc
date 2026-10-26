---
title: 'Story 2.7 - preview exact booked-policy refunds'
type: 'feature'
created: '2026-10-26'
status: 'done'
route: 'oneshot'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="Story2.7 approved in epics.md; user authorized implementation without repeated planning checkpoints">

## Intent

For bookings with booked percentage windows (Story 2.6), the refund is the policy percentage of everything paid:
- slot and hourly bookings: rent plus fee;
- hotel rooms: room, tax and the room's share of the stay fee.

It is rounded down to the paisa once per visit or room, then split over the paid components by stable largest remainder (`allocateByWeights` / `refundOfPaid`), so owner and Rentra responsibility stays proportional.

Splitting rules:
- Zero-weight lines get zero.
- A positive total over all-zero weights raises `ALLOCATION_WEIGHTS_ZERO`.
- Ties go to the earlier line.

The preview hash binds the customer, the rooms and each visit's lifecycle and policy version. Existing caps are kept: `reserved` counts every non-failed refund (completed, in flight or unknown), and zero due creates no refund row, so there is no provider call. Legacy bookings keep their rules. A deposit is outside the basis, because only captured components can be refunded.

</frozen-after-approval>

## Verification

Backend `0e1972c6d9f10ea72191f9d7285f004d908b2962`, pushed, with no migration and no frontend change.

- Backend: 340 of 340.
- New `test/services/refund-basis.test.js` covers largest-remainder properties, the zero and all-zero rules, ties, the full-paid split and window cutoffs.
- `hourly-booking` was updated to the full-paid basis.

Not run against a database: a hotel partial-percentage refund (the 100% and 0% hotel cases are covered).

## Review Triage Log

- low / accepted: per-room fee attribution orders rooms by id, while the quote split used line order. Attribution can differ by up to a paisa per room; the total equals the fee and refunds are capped.
- dismissed:
  - Mixed legacy/window rooms in one stay cannot occur for new bookings, because every plan snapshot carries a policy since 2.6.
  - Per-room rounding is intended, because each room has its own booked policy.
- open: dispute reimbursement caps (no reimbursement records exist yet; a later story) and early-departure execution (configured in 2.6; its payout is not part of 2.7).
