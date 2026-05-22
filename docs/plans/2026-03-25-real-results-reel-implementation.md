# Real Results Reel Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static Real Results stat numbers with a slot-machine reel animation that plays once on scroll into view and remains readable across desktop and mobile.

**Architecture:** Add a reusable rolling-number component that renders digit reels plus anchored punctuation/suffix characters, then update the Real Results stats to pass structured values into that component. Keep the motion logic in React with `framer-motion` viewport detection and CSS handling the masked reel styling, shimmer, and responsive sizing.

**Tech Stack:** React 18, TypeScript, Framer Motion, CSS, Vite

---

### Task 1: Verification Setup Decision

**Files:**
- Review: `package.json`

**Step 1: Confirm available test tooling**

Run: `sed -n '1,220p' package.json`
Expected: No test runner script is defined.

**Step 2: Ask for verification direction**

Ask whether to:
- add lightweight component testing support for this UI behavior, or
- treat this as a UI-only enhancement verified by build plus browser behavior

**Step 3: Continue based on decision**

- If testing is requested, add the smallest viable test setup first.
- If not, proceed with build/manual verification and state the limitation clearly.

### Task 2: Add a Failing Test Or Explicitly Accepted Verification Path

**Files:**
- Create if approved: test setup files and a component test for the rolling stat behavior
- Otherwise: no test files, but record the agreed verification limitation

**Step 1: Write the failing test**

If test tooling is approved, add a test that verifies:
- numeric digits are split into reels
- separators and suffixes stay static
- reduced-motion users see the final value without reel animation

**Step 2: Run test to verify it fails**

Run the narrowest possible test command once tooling exists.
Expected: FAIL for missing implementation or missing behavior.

**Step 3: If no tests are approved**

Document that the feature will be verified with `npm run build` and in-browser behavior only.

### Task 3: Build the Rolling Number Component

**Files:**
- Create: `src/components/RollingStatNumber.tsx`
- Create or modify: `src/components/RealResults.css`

**Step 1: Write minimal implementation**

Implement a component that:
- accepts a final formatted value
- identifies digit vs non-digit characters
- renders each digit as a vertical reel window
- animates once when in view
- respects reduced motion

**Step 2: Add styling**

Add CSS for:
- reel window masking
- stacked digit column layout
- subtle shimmer on settle
- stable alignment for commas and suffixes

**Step 3: Verify**

Run the approved verification path for this task.

### Task 4: Integrate With Real Results

**Files:**
- Modify: `src/components/RealResults.tsx`
- Modify: `src/components/RealResults.css`

**Step 1: Reshape stat data**

Replace the current plain `num` strings with values that can still render the same text while allowing per-character animation.

**Step 2: Swap in the rolling number component**

Render the new component inside each stat card and preserve the current copy and spacing.

**Step 3: Verify**

Run the approved verification path and confirm the layout remains intact.

### Task 5: Final Verification

**Files:**
- Review: `src/components/RollingStatNumber.tsx`
- Review: `src/components/RealResults.tsx`
- Review: `src/components/RealResults.css`

**Step 1: Run build verification**

Run: `npm run build`
Expected: Successful TypeScript compile and Vite build.

**Step 2: Spot-check motion behavior**

Confirm:
- the reels animate once on scroll into view
- the final values are `25 yrs`, `1,200+`, and `5,000+`
- the section remains readable on smaller screens
- reduced-motion users are not forced through the animation

**Step 3: Commit**

If a Git repository becomes available later:

```bash
git add docs/plans/2026-03-25-real-results-reel-design.md docs/plans/2026-03-25-real-results-reel-implementation.md src/components/RollingStatNumber.tsx src/components/RealResults.tsx src/components/RealResults.css
git commit -m "feat: add slot reel stats to real results"
```
