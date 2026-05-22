# Navbar Light Palette Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle the navbar system to match the new light-first palette while keeping the hero unchanged and preserving existing navigation behavior.

**Architecture:** Keep the implementation mostly CSS-driven so the existing navbar logic and animation behavior stay intact. Update `Navbar.css` for the visual system, and make only small `Navbar.tsx` data changes where dropdown featured-card backgrounds or category accents need to align with the new palette.

**Tech Stack:** React 18, TypeScript, Framer Motion, CSS, Vite

---

### Task 1: Confirm Verification Path For A UI-Only Navbar Redesign

**Files:**
- Review: `package.json`
- Review: `src/components/Navbar.css`
- Review: `src/components/Navbar.tsx`

**Step 1: Confirm current scripts**

Run: `sed -n '1,220p' package.json`
Expected: No dedicated component test runner is configured.

**Step 2: Record the verification path**

Use:
- `npm run build`
- browser visual review for navbar states

**Step 3: Record the scope guard**

Do not modify hero files during this implementation.

### Task 2: Restyle Desktop Navbar Chrome

**Files:**
- Modify: `src/components/Navbar.css`

**Step 1: Write the minimal implementation**

Update:
- top navbar text/logo colors to use plum-led tones
- scrolled navbar shell to use refined white surface + plum-tinted border/shadow
- hover and active trigger states to use pale blue/orange-accent treatment
- primary CTA to use blue as the dominant action color

**Step 2: Verify the CSS remains coherent**

Check that:
- resting navbar still reads clearly over the hero
- scrolled navbar remains compact and legible
- CTA remains visually dominant without overpowering the nav

### Task 3: Restyle Mega Menu Dropdowns

**Files:**
- Modify: `src/components/Navbar.css`
- Modify: `src/components/Navbar.tsx`

**Step 1: Write the minimal implementation**

Update:
- dropdown shell border/shadow tones
- featured cards to use soft category tints:
  - services → plum tint
  - software → blue tint
  - electronics → orange tint
  - security → green tint
- column headers to muted plum
- hovered links to pale blue background
- badges to align with orange/green/plum accents

**Step 2: Keep behavior unchanged**

Do not alter:
- dropdown positioning logic
- open/close behavior
- desktop nav structure

### Task 4: Restyle Mobile Navigation Sheet

**Files:**
- Modify: `src/components/Navbar.css`

**Step 1: Write the minimal implementation**

Update:
- mobile overlay background, borders, and shadows
- accordion trigger text and hover states
- mobile links and section headers
- mobile CTA button from gold to blue-led styling

**Step 2: Verify consistency**

Check that mobile colors feel like the same design system as desktop.

### Task 5: Build Verification

**Files:**
- Review: `src/components/Navbar.css`
- Review: `src/components/Navbar.tsx`

**Step 1: Run build verification**

Run: `npm run build`
Expected: Successful TypeScript compile and Vite build.

**Step 2: Perform visual review**

Confirm:
- hero files remain untouched
- desktop top navbar is light and readable
- scrolled navbar capsule feels premium
- dropdown cards and hover states reflect the new palette
- mobile overlay and mobile CTA match the new navbar language

**Step 3: Commit**

If a Git repository becomes available later:

```bash
git add docs/plans/2026-03-26-navbar-light-palette-design.md docs/plans/2026-03-26-navbar-light-palette-implementation.md src/components/Navbar.css src/components/Navbar.tsx
git commit -m "feat: redesign navbar with light palette accents"
```
