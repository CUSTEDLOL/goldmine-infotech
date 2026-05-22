# Real Results Reel Design

**Date:** 2026-03-25

**Goal:** Add a unique slot-machine reel animation to the three headline stats in the Real Results section while preserving the existing layout, readability, and brand tone.

## Context

The current stats in `src/components/RealResults.tsx` are rendered as static text inside a centered three-column row. The typography is already large and high-contrast, which makes it a strong foundation for motion-led emphasis without restructuring the section.

This project is a Vite + React + TypeScript app that already uses `framer-motion`, so the animation should build on that existing dependency instead of introducing a new motion library.

## Approved Direction

Use a slot-machine reel effect with per-digit vertical motion.

- Numeric characters animate as individual reels inside masked windows.
- Reels overspin through repeated `0-9` sequences before landing on the final digit.
- Non-digit characters such as commas, `+`, and `yrs` remain anchored to keep the value legible.
- Reels settle with a brief restrained shimmer so the numbers feel premium rather than playful.

## Interaction Design

The animation should trigger once when the Real Results section enters the viewport. Each stat should start slightly after the previous one so the row feels choreographed. Within a stat, each digit column should also have a tiny stagger so the lock-in feels mechanical and satisfying.

The effect should feel energetic but controlled:

- Fast enough to feel alive.
- Slow enough to read the destination number.
- Not so exaggerated that it distracts from the section headline or testimonial cards below.

## Accessibility And Responsiveness

- Respect `prefers-reduced-motion` by showing the final values without the reel movement.
- Keep line-height and container sizing stable so the section does not jump during animation.
- Use shorter timing and travel distances on smaller screens if needed, but preserve the same overall visual language.

## Implementation Notes

- Create a reusable rolling number component in `src/components`.
- Feed the Real Results stats through structured values rather than preformatted strings so the component can distinguish digits from separators and suffixes.
- Keep styling local to `RealResults.css` unless a small component-specific CSS file makes the reel easier to maintain.

## Constraints

- No Git repository is available in the current workspace, so this design document cannot be committed from here.
