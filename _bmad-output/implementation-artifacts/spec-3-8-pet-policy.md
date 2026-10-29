---
title: 'Story 3.8 - configure ordinary pet eligibility and fee units'
type: 'feature'
created: '2026-10-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
context: ['_bmad-output/implementation-artifacts/epic-3-context.md', '_bmad-output/implementation-artifacts/spec-3-6-child-age-policies.md']
baseline_commit: 'backend 2df76d1d1f0a5e4510e8273955f3ea04c38ca13c; frontend 7168c7b6d37266b16b768c530dde070d386ea3b7'
---

<frozen-after-approval reason="Story 3.8 in epics.md; user decisions 29 Oct 2026">

## Intent

**Problem:** pets today are only a yes/no.
- Farm/villa: `house_rules.petsAllowed`.
- Hotel: `hotel_profile.policies.pets`.

Owners cannot set limits or a fee, and nothing separates assistance animals.

**User decisions (29 Oct 2026):**
- **Existing "yes" listings** become `allowed`, free, max 1, any listed type. The owner portal shows a "Review your pet policy" prompt until the owner saves the pet policy. Existing "no" listings become `not_allowed`.
- **Types and size** are fixed choices:
  - `types` is a subset of `dog`, `cat`, `small_other` (at least 1 when allowed);
  - `maxSize` is one of `small` (<10 kg), `medium` (<25 kg) or `any`.
- **Fee display:** guests see allowed/not allowed, the max count, types and size now. The pet fee text is not shown to guests until Story 3.9 charges it. Owners see and save the fee now.
- **Assistance animals:** a fixed guest line on every stay listing reads "Assistance animals aren't treated as pets and aren't charged pet fees. Contact Rentra support before booking." Owners cannot block or charge them, and there is no owner field for them. No exemption rules are invented.

## Boundaries & Constraints

**Always:**
- **Policy shape (`petPolicy`):**
  - `{ status: 'allowed'|'not_allowed', maxPets: 1..5, types: [...], maxSize, fee: { unit: 'free'|'per_stay'|'per_night'|'per_pet'|'per_pet_night', amount } }`.
  - `amount` is whole rupees 0-50000; free means amount 0.
  - When not allowed, store only `status`.
  - There is no on-request status.
- **Scope:** one policy per listing (rentable), for farmhouse/villa (slot and day units) and hotel. Entertainment venues are out of scope. Whole apartment does not exist yet.
- **Storage:** `rentable.pet_policy jsonb NULL` and `rentable.pet_policy_version int NOT NULL DEFAULT 1` (migration 0087, `IF NOT EXISTS`).
  - Null means "derive from legacy": the legacy yes gives the decision default, the legacy no or missing gives not_allowed. This is a pure function `effectivePetPolicy(rentable)`.
  - Saving writes the column, mirrors `petsAllowed` / `policies.pets` (yes when allowed) so old readers stay right, and bumps the version only on a real change. The change is audited (`pet_policy_changed`), with no re-review.
- **Validation:** shared `petPolicyProblem` in the backend domain and mirrored in `Rentra/lib/domain/`. Zod plus a clear message ("Choose at least one pet type").
- **Versioning for quotes:** quotes and order terms stamp `petPolicy: {version, policy}` only when the effective policy is `allowed`, so quotes for not_allowed listings keep their digest. Earlier bookings keep their stamped terms. Story 3.9 consumes this.
- **Owner UI:** a "Pets" block in the farm/villa Rules step (`RulesSection.jsx`) and the hotel house rules section (`HotelSections.jsx`) replaces the yes/no:
  - Allowed / Not allowed;
  - max pets, type checkboxes, size, fee unit select and amount;
  - a plain preview ("Up to 2 dogs or cats, under 25 kg · ₹500 per pet per night").
  - Values survive a failed save; 44px targets and labels.
- **Guest UI:** house rules and hotel facts show "Pets allowed: up to 2 dogs or cats under 25 kg", or "No pets", with no fee, plus the assistance line. Checkout shows the same.

**Never:**
- No guest pet declaration, quote charge or search filter (Story 3.9).
- No assistance-animal owner settings.
- No on-request workflow.
- No change to the entertainment vertical.

## I/O & Edge-Case Matrix

| Scenario | Expected |
|---|---|
| Legacy petsAllowed yes, no policy | effective allowed, free, max 1, all types, size any; owner prompt shown |
| Legacy no | not_allowed |
| Save allowed with 0 types | 422 "Choose at least one pet type" |
| Save per_pet_night ₹300, max 2, dogs, medium | saves; version +1; legacy flag yes |
| Same save again | version unchanged |
| Save not_allowed | stored `{status}`; legacy flag no |
| maxPets 6 or amount 50001 | 422 |
| Guest view of allowed listing | limits shown, no fee, assistance line |
| Quote on allowed listing | terms carry petPolicy version |
| Other owner saves | 404 |

</frozen-after-approval>

## Code Map

Backend (`rentra-backend`):
- `drizzle/0087_pet_policy.sql` + journal; extend the early-departure stub pattern if needed.
- New `src/services/domain/pet-policy.js`: `effectivePetPolicy`, `petPolicyProblem`, `petPolicyLine`.
- `src/services/schemas/zod/listing.js:101` (`rulesSchema.petsAllowed`) and `:348` (`hotelRulesSchema.pets`): accept the `petPolicy` object.
- Save paths: `src/services/auth/listings.js:298,315,448` (form parse); `src/services/booking/hotel-setup.js:196-223` (hotel policies). Write the column, version and audit; follow the 3.6 change-detection pattern (`hotel-setup.js:107-120`).
- Read and public: `src/services/domain/listing-content.js:109`, `src/services/db/queries.js:445,467` expose `petPolicy` (effective) without the fee for guests; the owner read includes the fee.
- Quotes: `src/services/booking/quotes.js:114` and `hotel-checkout.js:70` stamp it when allowed.
- Tests: new `test/services/pet-policy.test.js`; an integration test for save, version, legacy mirror, 404 and the quote stamp (extend the existing listing/rules or hotel-owner-flow tests).

Frontend (`Rentra`):
- `components/partner/listing/RulesSection.jsx:75-79`, `HotelSections.jsx:1598`: the pet block + review prompt.
- `lib/validation/zod/listing.js:114`; new `lib/domain/pet-policy.js` (mirror + line) with a test.
- Guest: `components/rentra/listing/ListingSections.jsx:242-279`, `ListingDetail.jsx:678`, `hotels/HotelFacts.jsx:79-80`, `customer/checkout/parts.jsx:621`.
- Admin read-only: `app/(admin)/admin/properties/[id]/page.js:896`.

## Tasks & Acceptance

- [x] 0087 + journal; db:check
- [x] domain + validation (both sides) + tests
- [x] save/read/version/legacy mirror/audit + quote stamp
- [x] owner UI (both verticals) + guest/admin display
- [x] tests for every matrix row

**Acceptance Criteria:**
- Given an owner saves a per-pet-night fee, when the policy changes, then the version bumps and new quotes stamp the new version while earlier bookings keep theirs.
- Given any stay listing, when a guest views it, then assistance animals are described separately and never as blocked.

## Verification

- Backend suite on local PG only (command in the 3.3 spec; baseline 465). Never Neon, never db:migrate, do not commit.
- Frontend `npm test` (baseline 151), eslint/prettier on changed files, `npx next build`, `git diff --check`.

## Review Triage Log

- Review 1 found 4 items.
  1. Fixed. The quote stamp carried the pet fee to guests. `petPolicyStamp` now stamps `publicPetPolicy` (no fee). The version still bumps when only the fee changes, so the digest stays honest. Story 3.9 adds the fee when it charges it. Tests: `pet-policy.test.js` (no fee in payload, version change moves the hash) and `hotel-checkout`.
  2. Fixed. Flipping the `houseRules.petsAllowed` mirror sent a live farm listing back to review. `trustChanges` now ignores `petsAllowed` inside `houseRules`, so pet changes are audit only. Unit test in `listing-lifecycle.test.js`.
  3. Accepted deviation from the "Other owner saves → 404" row for farm/villa. `saveRules` calls `load()` first (`auth/listings.js:292-293`). `load()` scopes `getListingForEdit` by owner and redirects to `/partner/listings` when there is no match (`:83-88`), before any write. Hotels return 404 (tested in `hotel-owner-flow`).
  4. Accepted. The frontend and backend `pet-policy.js` logic matches; they need not be byte-identical.

## Results

- Backend: 471/471 on local PostgreSQL; `db:check` 88 migrations; eslint/prettier clean on changed files; `git diff --check` clean.
- Frontend: `npm test` 152/152; eslint/prettier clean on changed files; `next build` passes; `git diff --check` clean.
- Nothing committed. 0087 not on Neon (pending there: 0076-0087). Browser QA not run.

- Committed backend 57d541d, frontend 7aaf4dd; backend 471/471, frontend 152/152, db:check 88.
