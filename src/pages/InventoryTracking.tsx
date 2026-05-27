import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContactModal } from '../context/ContactModalContext'
import './InventoryTracking.css'

gsap.registerPlugin(ScrollTrigger)

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

/* ── Images ── */
const HERO_IMG =
  'https://images.unsplash.com/photo-1749244768351-2726dc23d26c?fm=jpg&q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0'

const CTA_IMG =
  'https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?fm=jpg&q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0'

/* ── Dashboard inventory rows ── */
const DASH_ROWS: Array<{
  category: string
  count: string
  status: 'ok' | 'low' | 'critical'
  dotVariant: 'ok' | 'low' | 'critical'
  alert?: boolean
}> = [
  { category: 'Electronics', count: '2,840', status: 'ok', dotVariant: 'ok' },
  { category: 'Apparel — M/L', count: '48', status: 'low', dotVariant: 'low', alert: true },
  { category: 'Raw Materials', count: '1,205', status: 'ok', dotVariant: 'ok' },
  { category: 'Packaging', count: '12', status: 'critical', dotVariant: 'critical', alert: true },
  { category: 'Accessories', count: '730', status: 'ok', dotVariant: 'ok' },
]

/* ── Ticker items ── */
const TICKER_ITEMS = [
  'Stock Tracking',
  'Barcode Support',
  'Low Stock Alerts',
  'Supplier Management',
  'Batch Tracking',
  'Expiry Dates',
  'Stock Transfers',
  'Reports',
]

/* ── Feature 01: Real-Time Stock ── */
const STOCK_ROWS: Array<{
  name: string
  count: string
  status: 'ok' | 'low'
  alert: boolean
}> = [
  { name: 'Electronics — A-Grade', count: '2,840', status: 'ok', alert: false },
  { name: 'Apparel — Medium / Large', count: '48', status: 'low', alert: true },
  { name: 'Packaging Boxes (L)', count: '12', status: 'low', alert: true },
  { name: 'Raw Material — Fabric', count: '1,205', status: 'ok', alert: false },
  { name: 'Accessories Kit', count: '730', status: 'ok', alert: false },
]

/* ── Feature 02: Low Stock Alerts ── */
const ALERT_ITEMS: Array<{
  name: string
  detail: string
  badge: 'warning' | 'critical' | 'ok'
  variant: 'triggered' | 'critical' | ''
}> = [
  {
    name: 'Apparel — Medium / Large',
    detail: 'Current: 48 units · Min threshold: 200',
    badge: 'warning',
    variant: 'triggered',
  },
  {
    name: 'Packaging Boxes (L)',
    detail: 'Current: 12 units · Min threshold: 100',
    badge: 'critical',
    variant: 'critical',
  },
  {
    name: 'Electronics — B-Grade',
    detail: 'Current: 340 units · Min threshold: 300',
    badge: 'ok',
    variant: '',
  },
]

/* ── Feature 03: Barcode recent scans ── */
const RECENT_SCANS = [
  { name: 'Electronics A-Grade', qty: '+120 units', time: '2m ago' },
  { name: 'Apparel — S / XS', qty: '-24 units', time: '8m ago' },
  { name: 'Packaging Box M', qty: '+500 units', time: '15m ago' },
]

/* ── Barcode bars pattern ── */
const BARCODE_PATTERN: Array<{ type: 'wide' | 'thin' | 'normal' }> = [
  { type: 'wide' }, { type: 'thin' }, { type: 'normal' }, { type: 'wide' },
  { type: 'thin' }, { type: 'normal' }, { type: 'thin' }, { type: 'wide' },
  { type: 'normal' }, { type: 'thin' }, { type: 'wide' }, { type: 'thin' },
  { type: 'normal' }, { type: 'normal' }, { type: 'wide' }, { type: 'thin' },
  { type: 'wide' }, { type: 'normal' }, { type: 'thin' }, { type: 'normal' },
]

export default function InventoryTracking() {
  const rootRef = useRef<HTMLDivElement>(null)
  const { openModal } = useContactModal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Stats */
      gsap.fromTo(
        '.inv-stat',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.13,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.inv-stats', start: 'top 80%' },
        }
      )

      /* Feature panels */
      gsap.utils.toArray<HTMLElement>('.inv-feat').forEach((el) => {
        const copy = el.querySelector('.inv-feat-copy')
        const visual = el.querySelector('.inv-feat-visual')
        if (copy) {
          gsap.fromTo(
            copy,
            { x: -28, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 78%' } }
          )
        }
        if (visual) {
          gsap.fromTo(
            visual,
            { x: 28, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 78%' } }
          )
        }
      })

      /* CTA */
      gsap.fromTo(
        '.inv-cta-content',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: '.inv-cta-section', start: 'top 80%' } }
      )
    }, rootRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <div className="inv-root" ref={rootRef}>
      {/* ═══════════════════════════════════
          HERO — Full-bleed editorial
      ═══════════════════════════════════ */}
      <section className="inv-hero">
        {/* Background photo */}
        <div className="inv-hero-photo">
          <img
            src={HERO_IMG}
            alt="Warehouse inventory shelves"
            className="inv-hero-img"
          />
        </div>
        {/* Overlays */}
        <div className="inv-hero-overlay" />
        <div className="inv-hero-overlay-bottom" />

        {/* Content grid */}
        <div className="inv-hero-inner">
          {/* Left */}
          <div className="inv-hero-content">
            {/* Breadcrumb */}
            <motion.nav
              className="inv-breadcrumb"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/">Home</Link>
              <span className="inv-breadcrumb-sep">/</span>
              <Link to="/software">Software</Link>
              <span className="inv-breadcrumb-sep">/</span>
              <span className="inv-breadcrumb-current">Inventory Tracking</span>
            </motion.nav>

            {/* Headline */}
            <motion.h1
              className="inv-hero-headline"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="inv-headline-line" variants={fadeUp}>
                Every item.
              </motion.span>
              <motion.span className="inv-headline-line" variants={fadeUp}>
                Every location.
              </motion.span>
              <motion.span className="inv-headline-line inv-headline-orange" variants={fadeUp}>
                Real-time.
              </motion.span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              className="inv-hero-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Complete inventory control across all your locations. Track stock levels, receive low-stock
              alerts, and sync every movement — automatically.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="inv-hero-ctas"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.65 }}
            >
              <button
                className="inv-btn-primary"
                onClick={() => openModal({
                  badge: 'Inventory Tracking',
                  badgeColor: 'orange',
                  title: 'Get a Free Demo',
                  subtitle: 'See how our inventory system tracks stock, alerts, and supplier orders in real time.',
                  prefillMessage: 'Hi, I\'d like a free demo of the Inventory Tracking software.',
                })}
              >Get a Free Demo</button>
              <Link to="/software" className="inv-btn-ghost">View All Products</Link>
            </motion.div>
          </div>

          {/* Right — Floating Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.55, ease: 'easeOut' }}
          >
            <div className="inv-dashboard-card">
              <div className="inv-dash-header">
                <span className="inv-dash-label">Inventory Overview</span>
                <div className="inv-dash-live">
                  <div className="inv-dash-live-dot" />
                  Live
                </div>
              </div>

              <div className="inv-dash-rows">
                {DASH_ROWS.map((row, i) => (
                  <div
                    key={i}
                    className={`inv-dash-row${row.alert ? ' inv-dash-row--alert' : ''}`}
                  >
                    <div className={`inv-dash-dot inv-dash-dot--${row.dotVariant}`} />
                    <span className="inv-dash-category">{row.category}</span>
                    <span className={`inv-dash-count${row.status === 'ok' ? ' inv-dash-count--ok' : ' inv-dash-count--low'}`}>
                      {row.count}
                    </span>
                    <span className={`inv-dash-status inv-dash-status--${row.status}`}>
                      {row.status === 'ok' ? 'In Stock' : row.status === 'low' ? 'Low' : 'Critical'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="inv-dash-footer">
                <span className="inv-dash-footer-text">Last updated just now</span>
                <span className="inv-dash-footer-sync">Syncing...</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          TICKER
      ═══════════════════════════════════ */}
      <div className="inv-ticker">
        <div className="inv-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inv-ticker-item">
              {item}
              <span className="inv-ticker-sep"> · </span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════
          STATS
      ═══════════════════════════════════ */}
      <section className="inv-stats">
        <div className="inv-stats-inner">
          <div className="inv-stat">
            <div className="inv-stat-num">50,000<span>+</span></div>
            <div className="inv-stat-label">SKUs Tracked</div>
            <p className="inv-stat-sub">Handle large catalogs across multiple warehouses and categories without slowdowns.</p>
          </div>
          <div className="inv-stat">
            <div className="inv-stat-num">Real-Time</div>
            <div className="inv-stat-label">Stock Updates</div>
            <p className="inv-stat-sub">Every sale, purchase, and transfer reflects immediately — no batch updates, no delays.</p>
          </div>
          <div className="inv-stat">
            <div className="inv-stat-num">&lt; 1 min</div>
            <div className="inv-stat-label">Sync Time</div>
            <p className="inv-stat-sub">From scan to system. Stock levels update across all locations in under a minute.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FEATURE 01 — Real-Time Stock Tracking
      ═══════════════════════════════════ */}
      <section className="inv-feat inv-feat--white">
        <div className="inv-feat-inner">
          <div className="inv-feat-copy">
            <span className="inv-feat-num">01</span>
            <h2 className="inv-feat-title">Real-Time Stock Tracking</h2>
            <p className="inv-feat-desc">
              See live stock levels across all locations, warehouses, and categories.
              Updated the moment a sale or purchase happens.
            </p>
            <p className="inv-feat-detail">
              No more guessing. Every movement — sale, return, transfer, or purchase — is reflected
              immediately. Your team always sees the same accurate numbers, everywhere.
            </p>
          </div>
          <div className="inv-feat-visual">
            <div className="inv-grid-card">
              <div className="inv-grid-card-header">
                <span className="inv-grid-card-label">Stock Levels — All Locations</span>
                <span className="inv-grid-card-badge">Live</span>
              </div>
              <div className="inv-grid-rows">
                {STOCK_ROWS.map((row, i) => (
                  <div
                    key={i}
                    className={`inv-grid-row${row.alert ? ' inv-grid-row--alert' : ''}`}
                  >
                    <span className="inv-grid-row-name">{row.name}</span>
                    <span className={`inv-grid-row-count${row.alert ? ' inv-grid-row-count--alert' : ''}`}>
                      {row.count}
                    </span>
                    <span className={`inv-grid-row-status inv-grid-row-status--${row.status}`}>
                      {row.status === 'ok' ? 'In Stock' : 'Low Stock'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FEATURE 02 — Low Stock Alerts
      ═══════════════════════════════════ */}
      <section className="inv-feat inv-feat--offwhite">
        <div className="inv-feat-inner">
          <div className="inv-feat-copy">
            <span className="inv-feat-num">02</span>
            <h2 className="inv-feat-title">Low Stock Alerts</h2>
            <p className="inv-feat-desc">
              Set minimum stock levels and receive instant alerts before you run out.
              Never lose a sale due to stockouts.
            </p>
            <p className="inv-feat-detail">
              Define minimum thresholds per SKU, category, or location. Alerts are sent
              via email or in-app the moment stock drops below your set level —
              giving you time to reorder before shelves go empty.
            </p>
          </div>
          <div className="inv-feat-visual">
            <div className="inv-alert-card">
              <div className="inv-alert-card-header">
                <span className="inv-alert-card-label">Active Alerts</span>
              </div>
              <div className="inv-alert-list">
                {ALERT_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className={[
                      'inv-alert-item',
                      item.variant === 'triggered' ? 'inv-alert-item--triggered' : '',
                      item.variant === 'critical' ? 'inv-alert-item--critical' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <div className={`inv-alert-icon-wrap${item.badge === 'critical' ? ' inv-alert-icon-wrap--critical' : ''}`}>
                      <div className="inv-alert-icon-bar">
                        {[14, 10, 14].map((w, n) => (
                          <div
                            key={n}
                            className={`inv-alert-icon-bar-item${item.badge === 'critical' ? ' inv-alert-icon-bar-item--critical' : ''}`}
                            style={{ width: `${w}px` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="inv-alert-body">
                      <div className="inv-alert-name">{item.name}</div>
                      <div className="inv-alert-detail">{item.detail}</div>
                    </div>
                    <span className={`inv-alert-badge inv-alert-badge--${item.badge}`}>
                      {item.badge === 'ok' ? 'OK' : item.badge === 'warning' ? 'Low' : 'Critical'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FEATURE 03 — Barcode & QR Integration
      ═══════════════════════════════════ */}
      <section className="inv-feat inv-feat--white">
        <div className="inv-feat-inner">
          <div className="inv-feat-copy">
            <span className="inv-feat-num">03</span>
            <h2 className="inv-feat-title">Barcode &amp; QR Integration</h2>
            <p className="inv-feat-desc">
              Scan to add stock, process sales, or do a stock audit. Works with any
              standard barcode scanner or phone camera.
            </p>
            <p className="inv-feat-detail">
              Generate barcodes and QR codes for any product in seconds. Scan during
              receiving, picking, or auditing. Every scan logs automatically —
              no manual entry, no human error.
            </p>
          </div>
          <div className="inv-feat-visual">
            <div className="inv-scan-card">
              <div className="inv-scan-card-header">
                <span className="inv-scan-card-label">Barcode Scanner — Active</span>
                <div className="inv-scan-status">
                  <div className="inv-scan-status-dot" />
                  Ready
                </div>
              </div>

              <div className="inv-scan-view">
                {/* CSS Barcode art */}
                <div className="inv-barcode">
                  {BARCODE_PATTERN.map((bar, i) => (
                    <div
                      key={i}
                      className={[
                        'inv-barcode-bar',
                        bar.type === 'thin' ? 'inv-barcode-bar--thin' : '',
                        bar.type === 'wide' ? 'inv-barcode-bar--wide' : '',
                      ].filter(Boolean).join(' ')}
                      style={{ height: `${48 + (i % 3) * 8}px` }}
                    />
                  ))}
                </div>

                {/* Product info */}
                <div className="inv-scan-info">
                  <div className="inv-scan-sku">SKU: GI-ELEC-2201</div>
                  <div className="inv-scan-product-name">Electronics — A-Grade Unit</div>
                  <div className="inv-scan-meta">
                    <div className="inv-scan-meta-row">
                      <span className="inv-scan-meta-key">In Stock</span>
                      <span className="inv-scan-meta-val inv-scan-meta-val--orange">2,840</span>
                    </div>
                    <div className="inv-scan-meta-row">
                      <span className="inv-scan-meta-key">Location</span>
                      <span className="inv-scan-meta-val">Shelf B-12</span>
                    </div>
                    <div className="inv-scan-meta-row">
                      <span className="inv-scan-meta-key">Last scan</span>
                      <span className="inv-scan-meta-val">2 min ago</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="inv-scan-recent">
                <span className="inv-scan-recent-label">Recent Scans</span>
                {RECENT_SCANS.map((s, i) => (
                  <div key={i} className="inv-scan-recent-row">
                    <span className="inv-scan-recent-name">{s.name}</span>
                    <span className="inv-scan-recent-qty">{s.qty}</span>
                    <span className="inv-scan-recent-time">{s.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════ */}
      <section className="inv-cta-section">
        <div className="inv-cta-inner">
          <div className="inv-cta-content">
            <h2 className="inv-cta-headline">
              Know your stock.<br />
              <span>Know your business.</span>
            </h2>
            <p className="inv-cta-sub">
              We configure your inventory categories, opening stock, and alerts in one
              setup session. You are tracking from day one.
            </p>
            <button
              className="inv-btn-primary"
              onClick={() => openModal({
                badge: 'Inventory Tracking',
                badgeColor: 'orange',
                title: 'Get a Free Demo',
                subtitle: 'See how our inventory system tracks stock, alerts, and supplier orders in real time.',
                prefillMessage: 'Hi, I\'d like a free demo of the Inventory Tracking software.',
              })}
            >Get Started</button>
          </div>

          {/* Right image strip */}
          <div className="inv-cta-image-strip">
            <img
              src={CTA_IMG}
              alt="Warehouse forklift and inventory"
              className="inv-cta-strip-img"
            />
            <div className="inv-cta-strip-overlay" />
          </div>
        </div>
      </section>
    </div>
  )
}
