# Personas Section Design

**Date:** 2026-03-26

**Goal:** Redesign the PersonasSection to match the structure and feel of the provided reference: a single light rounded shell, five equal-width illustrated persona cards across the top, and a cleaner editorial content area beneath.

## Section Header

Add a proper section intro above the shell so the block has a stronger entrance on the page:

- eyebrow: `Who We Serve`
- headline: `Technology that fits the way you work`
- short supporting line beneath the headline

This header should sit outside the shell, centered, and feel editorial rather than promotional.

## Direction

This section should no longer feel like a standard tab strip plus boxed feature cards. Instead, it should read like one premium product story module:

- outer rounded shell on a white background
- top row of five equal-width persona cards
- each card has a label at the top and a large illustration area below
- active card gets a stronger outline/shadow and a subtle accent bloom near the bottom
- lower content area is more open and editorial, with a large left headline and a clean stacked details column on the right

## Top Persona Cards

Desktop:

- Keep all five cards in one equal-width row
- Each card should be tall enough to showcase illustration space
- Labels live at the top of each card
- The illustration area should be a visual placeholder for now, ready to be swapped with PNGs from `src/assets`

Placeholder behavior for now:

- Use the current Lucide icon as a soft stand-in visual
- Add a small “PNG placeholder” style note or equivalent subtle placeholder cue
- Structure the markup so swapping to `<img>` later is straightforward

Active card treatment:

- stronger border
- slightly brighter surface
- deeper shadow
- subtle accent texture/glow at the lower edge, inspired by the reference

Inactive cards:

- lighter border
- lower-contrast text
- minimal hover lift

## Lower Content Area

The lower content should sit inside the same outer shell, separated from the top cards by a subtle divider.

Left side:

- large persona headline
- simple ghost/outline CTA

Right side:

- stacked feature rows with divider lines, not floating cards
- bold feature title
- quieter supporting paragraph

This is closer to the reference than the current multi-card right column.

## Visual Language

- mostly white and soft-neutral surfaces
- plum/dark text for headings
- very restrained accent use
- subtle shadows, not loud gradients
- the section should feel editorial and premium, not like a dashboard widget

## Responsive Behavior

- On mobile, the top persona cards become a horizontal scroll row
- Card proportions stay tall enough to preserve the illustration-first feeling
- The lower content stacks naturally under the selected card
- Feature rows remain readable and separated by divider lines

## Implementation Notes

- Update `src/components/PersonasSection.tsx` to add a top-card visual placeholder area per persona
- Restructure the bottom content into a left intro column and right stacked feature rows
- Replace the current tab-strip styling in `src/components/PersonasSection.css` with a shell/card layout inspired by the reference
- Keep `SecuritySection` and hero unchanged in this pass
