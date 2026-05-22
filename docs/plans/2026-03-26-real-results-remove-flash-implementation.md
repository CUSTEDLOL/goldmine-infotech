# Real Results Landing Flash Removal Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the ending flash from the Real Results number animation while keeping the slot-machine reel effect intact.

**Architecture:** Simplify the reel component so it no longer tracks a landed state, and delete the CSS shimmer overlay and keyframes that create the flash. Leave the reel structure, timing, and reduced-motion fallback unchanged.

**Tech Stack:** React 18, TypeScript, Framer Motion, CSS, Vite

---

### Task 1: Remove Flash Styling

**Files:**
- Modify: `src/components/RealResults.css`

**Step 1: Write the minimal implementation**

Delete:
- the `rolling-stat::after` shimmer overlay
- the `rolling-stat--landed` shimmer rule
- the `@keyframes stat-shimmer` block

**Step 2: Verify the stylesheet still supports the reel**

Confirm the slot window masks and digit reel styles remain in place.

### Task 2: Remove Flash State From The Component

**Files:**
- Modify: `src/components/RollingStatNumber.tsx`

**Step 1: Write the minimal implementation**

Remove:
- `useEffect`
- `useState`
- landed-state class toggling

Keep:
- in-view triggering
- reduced-motion rendering
- reel timing and sequence logic

**Step 2: Verify the component still renders the same final values**

Check that it still renders the same formatted strings and reel columns.

### Task 3: Build Verification

**Files:**
- Review: `src/components/RollingStatNumber.tsx`
- Review: `src/components/RealResults.css`

**Step 1: Run build verification**

Run: `npm run build`
Expected: Successful TypeScript compile and Vite build.
