
# Personas Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive "Who We Serve" personas section with 5 clickable tabs and detailed feature content per persona, all on a `#011936` navy background; also unify SecuritySection's background to the same navy.

**Architecture:** Three self-contained tasks — background fix, new component, App.tsx wiring. PersonasSection uses local `useState` for the active tab, `AnimatePresence` + `motion.div` for content transitions, and Lucide icons for persona tabs.

**Tech Stack:** React, TypeScript, Framer Motion, Lucide React, CSS modules (plain CSS files).

---

### Task 1: Fix SecuritySection background to #011936

**Files:**
- Modify: `src/components/SecuritySection.css`

**Step 1: Edit the background declaration**

In `src/components/SecuritySection.css`, find this block at the top:

```css
.sec-section {
  /* Deep navy — intentionally distinct from var(--black) to visually separate security section */
  background: #010d1f;
```

Replace `#010d1f` with `#011936`:

```css
.sec-section {
  /* Deep navy — matches brand navy #011936, unifying with PersonasSection */
  background: #011936;
```

**Step 2: Verify TypeScript still clean**

```bash
cd "/Users/visheshjain/Desktop/Goldmine Infotech" && npx tsc --noEmit 2>&1
```
Expected: no output (zero errors).

**Step 3: Commit**

```bash
cd "/Users/visheshjain/Desktop/Goldmine Infotech"
git add src/components/SecuritySection.css
git commit -m "fix: unify SecuritySection background to brand navy #011936"
```

---

### Task 2: Create PersonasSection component

**Files:**
- Create: `src/components/PersonasSection.tsx`
- Create: `src/components/PersonasSection.css`

**Step 1: Create `src/components/PersonasSection.tsx`**

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, GraduationCap, Building2, Rocket, Factory } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './PersonasSection.css'

interface Feature {
  title: string
  desc: string
}

interface Persona {
  id: string
  label: string
  Icon: LucideIcon
  headline: string
  cta: string
  features: Feature[]
}

const PERSONAS: Persona[] = [
  {
    id: 'retailers',
    label: 'Retailers',
    Icon: ShoppingBag,
    headline: 'Streamline your shop,\nsell smarter',
    cta: 'Explore Retailer solutions',
    features: [
      {
        title: 'Custom Invoicing Software',
        desc: 'Automated GST invoices, inventory tracking, and customer records built for Indian retail. Handles billing, returns, and daily reports in one place.'
      },
      {
        title: 'Security & Surveillance',
        desc: 'CCTV coverage and biometric staff entry tailored for shops, showrooms, and warehouses. Installed and maintained by our team.'
      },
      {
        title: 'Hardware at Best Price',
        desc: 'Desktops, billing machines, and barcode scanners sourced, configured, and delivered. Lifelong servicing guarantee included.'
      },
    ]
  },
  {
    id: 'schools',
    label: 'Schools & Colleges',
    Icon: GraduationCap,
    headline: 'Build a smarter campus,\none system at a time',
    cta: 'Explore Education solutions',
    features: [
      {
        title: 'Attendance & Management Software',
        desc: 'Automated biometric attendance, fee collection, and report generation for schools and colleges. Parents get live updates.'
      },
      {
        title: 'Campus Security',
        desc: 'IP cameras for every corridor, biometric entry at gates, and real-time monitoring dashboards deployed and maintained by us.'
      },
      {
        title: 'Computer Labs & Staff Systems',
        desc: 'Bulk desktops and laptops with educational software pre-configured. Ongoing AMC support keeps everything running.'
      },
    ]
  },
  {
    id: 'offices',
    label: 'Offices & Corporates',
    Icon: Building2,
    headline: 'Your complete IT partner\nfrom day one',
    cta: 'Explore Office solutions',
    features: [
      {
        title: 'HR & Payroll Software',
        desc: 'Biometric attendance linked to automated payroll, leave management, and employee records — zero manual effort.'
      },
      {
        title: 'Network & Security Infrastructure',
        desc: 'Structured cabling, Wi-Fi deployment, CCTV, and access control installed and maintained by our team.'
      },
      {
        title: 'Workstation Procurement',
        desc: 'Desktops, laptops, and servers at competitive prices with lifelong servicing and rapid replacement guarantees.'
      },
    ]
  },
  {
    id: 'startups',
    label: 'Startups & Founders',
    Icon: Rocket,
    headline: 'Launch your digital\nfrontier fast',
    cta: 'Explore Startup solutions',
    features: [
      {
        title: 'Website & Custom Software',
        desc: 'Professional websites, booking platforms, and business apps built and maintained by our in-house team. You focus on growth.'
      },
      {
        title: 'Full-Stack IT Setup',
        desc: 'Office hardware, security cameras, and networking deployed in days. One team handles everything from cabling to cloud.'
      },
      {
        title: 'Growth Packages',
        desc: 'Bundled plans covering tech infrastructure, software, and ongoing support. Predictable costs, no surprise bills.'
      },
    ]
  },
  {
    id: 'manufacturers',
    label: 'Manufacturers',
    Icon: Factory,
    headline: 'Keep production\nrunning, always',
    cta: 'Explore Manufacturing solutions',
    features: [
      {
        title: 'Inventory & Billing Systems',
        desc: 'Track raw materials, finished goods, and sales with custom GST-ready invoicing built for your workflow.'
      },
      {
        title: 'Factory Security',
        desc: 'High-coverage CCTV, biometric worker entry, and shift-based access control for production floors and entry points.'
      },
      {
        title: 'Bulk Hardware Supply',
        desc: 'Rugged desktops and industrial peripherals at B2B pricing, with guaranteed servicing and same-day support on-site.'
      },
    ]
  },
]

export default function PersonasSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = PERSONAS[activeIndex]

  return (
    <section className="personas-section">
      <div className="personas-inner">

        <div className="personas-header">
          <div className="personas-badge">
            <span className="personas-badge-dot" />
            Who We Serve
          </div>
          <h2 className="personas-title">One partner, every frontier</h2>
          <p className="personas-subtitle">
            From a neighbourhood shop to a factory floor — we bring the full technology
            stack to transform your business, space, and operations.
          </p>
        </div>

        <div className="personas-tabs">
          {PERSONAS.map((p, i) => (
            <button
              key={p.id}
              className={`personas-tab${i === activeIndex ? ' personas-tab--active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <p.Icon className="personas-tab__icon" />
              <span className="personas-tab__label">{p.label}</span>
            </button>
          ))}
        </div>

        <div className="personas-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="personas-panel-inner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="personas-panel-left">
                <h3 className="personas-panel-headline">
                  {active.headline.split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                </h3>
                <button className="personas-cta">{active.cta}</button>
              </div>
              <div className="personas-panel-right">
                {active.features.map(f => (
                  <div key={f.title} className="personas-feature">
                    <div className="personas-feature__title">{f.title}</div>
                    <div className="personas-feature__desc">{f.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
```

**Step 2: Create `src/components/PersonasSection.css`**

```css
/* ============================================================
   Personas Section — Who We Serve
   ============================================================ */

.personas-section {
  background: #011936;
  padding: 100px 0 100px;
}

.personas-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

/* ── Header ── */
.personas-header {
  text-align: center;
  margin-bottom: 56px;
}

.personas-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 40px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.personas-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #FCA311;
}

.personas-title {
  font-size: clamp(28px, 3.8vw, 50px);
  font-weight: 800;
  color: #fff;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.personas-subtitle {
  font-size: 17px;
  color: rgba(255,255,255,0.4);
  line-height: 1.65;
  max-width: 560px;
  margin: 0 auto;
}

/* ── Tab Strip ── */
.personas-tabs {
  display: flex;
  gap: 4px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  padding: 16px 16px 0;
}

.personas-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 12px 20px;
  border-radius: 12px 12px 0 0;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  color: rgba(255,255,255,0.35);
  position: relative;
  font-family: inherit;
}

.personas-tab:hover:not(.personas-tab--active) {
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.65);
}

.personas-tab--active {
  background: rgba(255,255,255,0.07);
  color: #fff;
}

.personas-tab--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20%;
  right: 20%;
  height: 2px;
  background: #FCA311;
  border-radius: 2px 2px 0 0;
}

.personas-tab__icon {
  width: 22px;
  height: 22px;
}

.personas-tab__label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-align: center;
  line-height: 1.3;
}

/* ── Content Panel ── */
.personas-panel {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 0 0 20px 20px;
  padding: 52px 48px;
  min-height: 260px;
}

.personas-panel-inner {
  display: flex;
  gap: 56px;
  align-items: flex-start;
}

.personas-panel-left {
  flex: 0 0 34%;
}

.personas-panel-headline {
  font-size: clamp(26px, 2.8vw, 38px);
  font-weight: 700;
  color: #fff;
  line-height: 1.18;
  letter-spacing: -0.03em;
  margin: 0 0 28px;
}

.personas-cta {
  display: inline-flex;
  align-items: center;
  padding: 11px 22px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  background: transparent;
  color: rgba(255,255,255,0.75);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s, color 0.18s;
  font-family: inherit;
  letter-spacing: 0.01em;
}

.personas-cta:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.35);
  color: #fff;
}

.personas-panel-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.personas-feature__title {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
  letter-spacing: -0.01em;
}

.personas-feature__desc {
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
  margin: 0;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .personas-section { padding: 72px 0 72px; }
  .personas-inner { padding: 0 16px; }
  .personas-header { margin-bottom: 36px; }

  .personas-tabs {
    overflow-x: auto;
    padding: 12px 12px 0;
    gap: 4px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    border-radius: 16px 16px 0 0;
  }
  .personas-tabs::-webkit-scrollbar { display: none; }

  .personas-tab {
    flex: 0 0 auto;
    min-width: 80px;
    padding: 12px 10px 16px;
  }
  .personas-tab__label { font-size: 11px; }

  .personas-panel { padding: 28px 20px; min-height: unset; }

  .personas-panel-inner {
    flex-direction: column;
    gap: 28px;
  }
  .personas-panel-left { flex: unset; width: 100%; }
}
```

**Step 3: TypeScript check**

```bash
cd "/Users/visheshjain/Desktop/Goldmine Infotech" && npx tsc --noEmit 2>&1
```
Expected: no output.

**Step 4: Commit**

```bash
cd "/Users/visheshjain/Desktop/Goldmine Infotech"
git add src/components/PersonasSection.tsx src/components/PersonasSection.css
git commit -m "feat: add PersonasSection with 5 interactive persona tabs"
```

---

### Task 3: Wire PersonasSection into App.tsx

**Files:**
- Modify: `src/App.tsx`

**Step 1: Add import**

In `src/App.tsx`, after the `import SecuritySection` line, add:

```tsx
import PersonasSection from './components/PersonasSection'
```

**Step 2: Add to JSX**

In the JSX, after `<SecuritySection />` and before `<CtaBanner />`, add:

```tsx
<PersonasSection />
```

So the relevant portion becomes:
```tsx
<ElectronicsSection />
<SecuritySection />
<PersonasSection />
<CtaBanner />
```

**Step 3: TypeScript check**

```bash
cd "/Users/visheshjain/Desktop/Goldmine Infotech" && npx tsc --noEmit 2>&1
```
Expected: no output.

**Step 4: Commit**

```bash
cd "/Users/visheshjain/Desktop/Goldmine Infotech"
git add src/App.tsx
git commit -m "feat: wire PersonasSection into App between SecuritySection and CtaBanner"
```
