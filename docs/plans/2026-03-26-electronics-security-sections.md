# Electronics & Security Sections Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing `DarkFeature` bento grid with two focused dark sections — Electronics/Systems (B2B + B2C hardware sales) and Security (CCTV + Biometrics).

**Architecture:** Two new standalone components (`ElectronicsSection`, `SecuritySection`) each with their own CSS and bento-style card grid. They reuse existing animation primitives (`ElectronicsAnim`, `CctvAnim`) from `cybernetic-bento-grid.tsx` and add two new ones (`ProductGridAnim`, `BiometricAnim`). Both sections are inserted in `App.tsx` replacing `DarkFeature`.

**Tech Stack:** React, TypeScript, Framer Motion, Lucide React, existing CSS variables

---

### Task 1: ElectronicsSection component + CSS scaffold

**Files:**
- Create: `src/components/ElectronicsSection.tsx`
- Create: `src/components/ElectronicsSection.css`

**Step 1: Create the CSS file**

```css
/* ElectronicsSection.css */
.elec-section {
  background: var(--black);
  padding: 100px 0 80px;
  overflow: hidden;
}

.elec-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

/* Header */
.elec-header {
  text-align: center;
  margin-bottom: 64px;
}

.elec-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 40px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.elec-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #FCA311;
}

.elec-title {
  font-size: clamp(28px, 3.8vw, 50px);
  font-weight: 800;
  color: #fff;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.elec-subtitle {
  font-size: 17px;
  color: rgba(255,255,255,0.45);
  line-height: 1.65;
  max-width: 600px;
  margin: 0 auto;
}

/* Bento grid */
.elec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
}

.elec-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 32px;
  position: relative;
  overflow: hidden;
}

.elec-card--large {
  grid-row: span 2;
}

.elec-card__eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #FCA311;
  margin-bottom: 10px;
}

.elec-card__title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.elec-card__desc {
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  line-height: 1.6;
  margin-bottom: 24px;
}

/* Product grid card */
.elec-products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 8px;
}

.elec-product-item {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}

.elec-product-item:hover {
  background: rgba(252,163,17,0.1);
  border-color: rgba(252,163,17,0.25);
}

.elec-product-item__icon {
  color: #FCA311;
}

.elec-product-item__name {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  text-align: center;
}

/* B2B / B2C audience card */
.elec-audience {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 8px;
}

.elec-audience__col {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 16px;
}

.elec-audience__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #FCA311;
  margin-bottom: 10px;
}

.elec-audience__item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  padding: 4px 0;
}

.elec-audience__item::before {
  content: '';
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
  flex-shrink: 0;
}

/* Inventory anim container */
.elec-inv-wrap {
  height: 100%;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .elec-grid {
    grid-template-columns: 1fr;
  }
  .elec-card--large {
    grid-row: span 1;
  }
  .elec-products {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**Step 2: Create the TSX component**

```tsx
import { Laptop, Monitor, Printer, Tv, Smartphone, ScanLine, Building2, Users, ShoppingBag, Briefcase } from 'lucide-react'
import { ElectronicsAnim } from '@/components/ui/cybernetic-bento-grid'
import './ElectronicsSection.css'

const PRODUCTS = [
  { icon: Laptop,      name: 'Laptops' },
  { icon: Monitor,     name: 'Desktops' },
  { icon: Printer,     name: 'Printers' },
  { icon: ScanLine,    name: 'Scanners' },
  { icon: Tv,          name: 'Televisions' },
  { icon: Smartphone,  name: 'Phones' },
]

const B2B_ITEMS = ['Office Bulk Orders', 'School & Labs', 'Corporate Setups', 'IT Procurement']
const B2C_ITEMS = ['Walk-in Retail', 'Home Users', 'Students', 'Personal Upgrades']

export default function ElectronicsSection() {
  return (
    <section className="elec-section">
      <div className="elec-inner">
        <div className="elec-header">
          <div className="elec-badge">
            <span className="elec-badge-dot" />
            Systems & Electronics
          </div>
          <h2 className="elec-title">Your complete IT &amp; electronics partner</h2>
          <p className="elec-subtitle">
            From a single laptop to a full office setup — we supply, install, and support
            every device your business or home needs, with same-day availability.
          </p>
        </div>

        <div className="elec-grid">
          {/* Large card: live inventory */}
          <div className="elec-card elec-card--large">
            <div className="elec-card__eyebrow">Live Inventory</div>
            <div className="elec-card__title">68 Products Ready</div>
            <div className="elec-card__desc">Real-time stock across all categories — walk in or order online.</div>
            <div className="elec-inv-wrap">
              <ElectronicsAnim />
            </div>
          </div>

          {/* Top right: product categories */}
          <div className="elec-card">
            <div className="elec-card__eyebrow">What We Stock</div>
            <div className="elec-card__title">Every device, one place</div>
            <div className="elec-card__desc">Full range of consumer and enterprise hardware, always in stock.</div>
            <div className="elec-products">
              {PRODUCTS.map(({ icon: Icon, name }) => (
                <div key={name} className="elec-product-item">
                  <Icon size={22} className="elec-product-item__icon" />
                  <span className="elec-product-item__name">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom right: B2B vs B2C */}
          <div className="elec-card">
            <div className="elec-card__eyebrow">Who We Serve</div>
            <div className="elec-card__title">B2B &amp; B2C</div>
            <div className="elec-card__desc">Whether you're a business or an individual — we've got you covered.</div>
            <div className="elec-audience">
              <div className="elec-audience__col">
                <div className="elec-audience__label">Business</div>
                {B2B_ITEMS.map(item => (
                  <div key={item} className="elec-audience__item">{item}</div>
                ))}
              </div>
              <div className="elec-audience__col">
                <div className="elec-audience__label">Personal</div>
                {B2C_ITEMS.map(item => (
                  <div key={item} className="elec-audience__item">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### Task 2: Add BiometricAnim to cybernetic-bento-grid.tsx

**Files:**
- Modify: `src/components/ui/cybernetic-bento-grid.tsx` — add after `CctvAnim`

**Step 1: Add the animation component**

```tsx
/* ================================================================
   BIOMETRIC ANIM  —  Access log with fingerprint + face scan
   ================================================================ */
const ACCESS_LOG = [
  { name: 'Ravi Sharma',   type: 'Fingerprint', time: '08:42', status: 'Granted' },
  { name: 'Priya Mehta',   type: 'Face ID',     time: '08:51', status: 'Granted' },
  { name: 'Unknown',       type: 'Fingerprint', time: '09:03', status: 'Denied'  },
  { name: 'Suresh Nair',   type: 'Face ID',     time: '09:11', status: 'Granted' },
]

export const BiometricAnim = () => (
  <div className="ba-wrap ba-bio">
    <div className="ba-bio__card">
      <div className="ba-bio__header">
        <span className="ba-bio__title">Access Log</span>
        <span className="ba-bio__live">● Live</span>
      </div>
      <div className="ba-bio__divider" />
      {ACCESS_LOG.map((entry, i) => (
        <div key={i} className="ba-bio__row">
          <div className={`ba-bio__dot ba-bio__dot--${entry.status === 'Granted' ? 'green' : 'red'}`} />
          <span className="ba-bio__name">{entry.name}</span>
          <span className="ba-bio__type">{entry.type}</span>
          <span className="ba-bio__time">{entry.time}</span>
          <span className={`ba-bio__badge ba-bio__badge--${entry.status === 'Granted' ? 'green' : 'red'}`}>
            {entry.status}
          </span>
        </div>
      ))}
    </div>
  </div>
)
```

**Step 2: Add CSS to bento-animations.css**

```css
/* ── Biometric Anim ── */
.ba-bio {
  align-items: stretch;
}

.ba-bio__card {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 16px;
}

.ba-bio__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.ba-bio__title {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
}

.ba-bio__live {
  font-size: 11px;
  font-weight: 600;
  color: #22c55e;
  letter-spacing: 0.04em;
}

.ba-bio__divider {
  height: 1px;
  background: rgba(255,255,255,0.08);
  margin-bottom: 10px;
}

.ba-bio__row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 12px;
}

.ba-bio__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ba-bio__dot--green { background: #22c55e; }
.ba-bio__dot--red   { background: #EF2D56; }

.ba-bio__name  { flex: 1; color: rgba(255,255,255,0.7); font-weight: 500; }
.ba-bio__type  { color: rgba(255,255,255,0.35); font-size: 11px; min-width: 70px; }
.ba-bio__time  { color: rgba(255,255,255,0.3); font-size: 11px; min-width: 36px; }

.ba-bio__badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  letter-spacing: 0.04em;
}
.ba-bio__badge--green { background: rgba(34,197,94,0.15); color: #22c55e; }
.ba-bio__badge--red   { background: rgba(239,45,86,0.15);  color: #EF2D56; }
```

---

### Task 3: SecuritySection component + CSS scaffold

**Files:**
- Create: `src/components/SecuritySection.tsx`
- Create: `src/components/SecuritySection.css`

**Step 1: Create the CSS file**

```css
/* SecuritySection.css */
.sec-section {
  background: #010d1f;
  padding: 100px 0 80px;
  overflow: hidden;
}

.sec-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.sec-header {
  text-align: center;
  margin-bottom: 64px;
}

.sec-badge {
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

.sec-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #EF2D56;
  animation: pulse-red 2s ease-in-out infinite;
}

@keyframes pulse-red {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(0.8); }
}

.sec-title {
  font-size: clamp(28px, 3.8vw, 50px);
  font-weight: 800;
  color: #fff;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.sec-subtitle {
  font-size: 17px;
  color: rgba(255,255,255,0.4);
  line-height: 1.65;
  max-width: 600px;
  margin: 0 auto;
}

/* Grid */
.sec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.sec-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 32px;
  position: relative;
  overflow: hidden;
}

.sec-card__eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #EF2D56;
  margin-bottom: 10px;
}

.sec-card__title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.sec-card__desc {
  font-size: 14px;
  color: rgba(255,255,255,0.4);
  line-height: 1.6;
  margin-bottom: 24px;
}

/* Coverage tags */
.sec-coverage {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.sec-coverage__tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(239,45,86,0.1);
  border: 1px solid rgba(239,45,86,0.2);
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.65);
}

.sec-coverage__tag-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #EF2D56;
}

/* CCTV anim container */
.sec-cctv-wrap {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Bio anim container */
.sec-bio-wrap {
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .sec-grid {
    grid-template-columns: 1fr;
  }
}
```

**Step 2: Create the TSX component**

```tsx
import { School, Home, Building2, Store } from 'lucide-react'
import { CctvAnim, BiometricAnim } from '@/components/ui/cybernetic-bento-grid'
import './SecuritySection.css'

const CCTV_COVERAGE = [
  { label: 'Schools & Colleges' },
  { label: 'Homes & Villas' },
  { label: 'Offices & Shops' },
  { label: 'Warehouses' },
  { label: 'Institutions' },
]

export default function SecuritySection() {
  return (
    <section className="sec-section">
      <div className="sec-inner">
        <div className="sec-header">
          <div className="sec-badge">
            <span className="sec-badge-dot" />
            Security Solutions
          </div>
          <h2 className="sec-title">Protect what matters most</h2>
          <p className="sec-subtitle">
            End-to-end surveillance and access control — IP cameras, NVR systems,
            fingerprint scanners, and face recognition deployed and monitored by our team.
          </p>
        </div>

        <div className="sec-grid">
          {/* CCTV card */}
          <div className="sec-card">
            <div className="sec-card__eyebrow">CCTV Surveillance</div>
            <div className="sec-card__title">Full-coverage camera systems</div>
            <div className="sec-card__desc">
              IP cameras, NVR/DVR setups, and remote monitoring for every environment —
              installed, configured, and maintained by us.
            </div>
            <div className="sec-coverage">
              {CCTV_COVERAGE.map(c => (
                <span key={c.label} className="sec-coverage__tag">
                  <span className="sec-coverage__tag-dot" />
                  {c.label}
                </span>
              ))}
            </div>
            <div className="sec-cctv-wrap">
              <CctvAnim />
            </div>
          </div>

          {/* Biometrics card */}
          <div className="sec-card">
            <div className="sec-card__eyebrow">Biometric Access Control</div>
            <div className="sec-card__title">Fingerprint &amp; face recognition</div>
            <div className="sec-card__desc">
              Modern biometric terminals for attendance, door access, and time tracking —
              deployed for offices, schools, and gated communities.
            </div>
            <div className="sec-bio-wrap">
              <BiometricAnim />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### Task 4: Wire both sections into App.tsx

**Files:**
- Modify: `src/App.tsx`

**Step 1: Replace DarkFeature with both new sections**

```tsx
// Remove:
import DarkFeature from './components/DarkFeature'

// Add:
import ElectronicsSection from './components/ElectronicsSection'
import SecuritySection from './components/SecuritySection'
```

```tsx
// In JSX, replace:
<DarkFeature />

// With:
<ElectronicsSection />
<SecuritySection />
```

---

### Task 5: Polish pass

- Verify `ElectronicsAnim` and `CctvAnim` render correctly on dark backgrounds (they use orange/green tones — should be fine)
- Check responsive layout at 768px
- Verify `BiometricAnim` export is present in `cybernetic-bento-grid.tsx`
- Confirm no TypeScript errors

---
