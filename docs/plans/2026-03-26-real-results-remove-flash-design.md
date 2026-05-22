# Real Results Landing Flash Removal Design

**Date:** 2026-03-26

**Goal:** Keep the slot-machine reel animation for the Real Results stats, but remove the bright landing flash so the numbers settle more cleanly.

## Approved Direction

Remove the landing shimmer entirely.

- Keep the rolling per-digit reel motion.
- Keep the fade masks that help the numbers feel like they sit inside a slot window.
- Remove the extra flash sweep that appears after the reels land.

## Implementation Notes

- Delete the flash-specific CSS pseudo-element and keyframes from `src/components/RealResults.css`.
- Remove the landing-state bookkeeping from `src/components/RollingStatNumber.tsx` if it is only used to trigger that flash.
- Preserve reduced-motion behavior and the existing reel timing.
