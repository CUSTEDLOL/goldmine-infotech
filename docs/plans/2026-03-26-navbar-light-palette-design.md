# Navbar Light Palette Redesign

**Date:** 2026-03-26

**Goal:** Redesign the navbar around the new palette `#23022e`, `#6184d8`, `#f77f00`, `#ffffff`, `#43aa8b` while keeping the overall site mostly light and leaving the hero untouched.

## Scope

This design applies only to the navigation system:

- desktop navbar
- scrolled navbar state
- mega menu dropdowns
- mobile navigation overlay
- navbar CTA and badges

Out of scope for this pass:

- hero changes
- site-wide palette rollout outside the navbar
- CTA banner, cards, or content sections
- `.claude/skills/ai-context/SKILL.md` updates for the broader brand system

## Approved Direction

Use a mostly white navbar with deliberate palette accents instead of a fully colored bar.

- `#23022e` becomes the core brand anchor for logo text, primary nav text, and stronger outlines.
- `#6184d8` becomes the primary action color for the main CTA and active emphasis.
- `#f77f00` is used sparingly for hover sparks, “Trending” emphasis, and warm accent moments.
- `#43aa8b` is reserved for trust/success signals such as “New” badges and subtle supportive accents.
- `#ffffff` remains the main surface for a light, editorial look.

## Visual Strategy

### Top Navbar

The resting navbar should stay clean and airy so the site still feels open. The logo and links should use a dark plum tone rather than neutral black to make the brand feel more distinctive. Hover states should feel lighter and more intentional than the current gray pills.

### Scrolled Navbar

The scrolled state should become a refined floating capsule rather than generic frosted glass. It should stay mostly white, but use a plum-tinted border/shadow so the palette is present even when the component is at its smallest.

### Desktop Dropdowns

The mega menu should feel curated instead of grayscale:

- dropdown shell stays white
- left featured cards use soft palette tints by category
- column headers shift from plain gray to muted plum
- hovered links use pale blue backgrounds instead of neutral gray
- badges get palette-correct emphasis rather than arbitrary colors

This keeps the dropdown premium and readable while tying it back to the new brand system.

### Mobile Navigation

The mobile overlay should feel like a premium sheet:

- white background
- plum text and dividers
- blue primary CTA
- orange micro-accent for interaction

The mobile CTA should no longer use the current gold tone, since it conflicts with the new palette.

## Implementation Notes

- Most of the work should live in `src/components/Navbar.css`.
- `src/components/Navbar.tsx` should only change where category card background colors or text treatment need to be updated.
- Existing hero styles should not be touched.
- Existing global tokens in `src/styles/globals.css` already include the new base palette colors, so this pass should mainly consume those values instead of inventing unrelated colors.

## Verification

This repository currently does not have component test tooling configured. For this navbar-only visual redesign, verification should be:

- production build via `npm run build`
- visual spot-check of desktop navbar, dropdowns, and mobile overlay in the browser

## Constraints

- The workspace is not currently inside a Git repository, so the usual design-doc commit step cannot be completed here.
