import { useState } from 'react'
import { useContactModal } from '../context/ContactModalContext'
import './ProductsPage.css'

import fleet1 from '../../screenshots/fleet-management/img1.jpg'
import fleet2 from '../../screenshots/fleet-management/img2.jpg'
import fleet3 from '../../screenshots/fleet-management/img3.jpg'
import quote1 from '../../screenshots/online-quotation-software/quote1.jpg'
import quote2 from '../../screenshots/online-quotation-software/quote2.jpg'
import quote3 from '../../screenshots/online-quotation-software/quote3.jpg'
import member1 from '../../screenshots/member-management/img1.jpg'
import member2 from '../../screenshots/member-management/img2.jpg'
import member3 from '../../screenshots/member-management/img3.jpg'
import matrimony1 from '../../screenshots/matrimony/img1.jpg'
import matrimony2 from '../../screenshots/matrimony/img2.jpg'
import matrimony3 from '../../screenshots/matrimony/img3.jpg'
import cable1 from '../../screenshots/cabletv-ott-internet/img1.jpg'
import cable2 from '../../screenshots/cabletv-ott-internet/img2.jpg'
import cable3 from '../../screenshots/cabletv-ott-internet/img3.jpg'
import cctv1 from '../../screenshots/cctv-quote/img1.jpg'
import cctv2 from '../../screenshots/cctv-quote/img2.jpg'
import cctv3 from '../../screenshots/cctv-quote/img3.jpg'



/* ── Screenshot Slider ─────────────────────────────────────────────────────── */

function ScreenshotSlider({ images, light }: { images: string[], light: boolean }) {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)
  return (
    <div className="pp-slider">
      <div className="pp-slider-frame">
        <img src={images[idx]} alt={`Screenshot ${idx + 1}`} className="pp-slider-img" />
        <button className="pp-slider-btn pp-slider-btn--prev" onClick={prev} aria-label="Previous">&#8249;</button>
        <button className="pp-slider-btn pp-slider-btn--next" onClick={next} aria-label="Next">&#8250;</button>
      </div>
      <div className="pp-slider-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`pp-slider-dot${i === idx ? ' pp-slider-dot--active' : ''}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to ${i + 1}`}
            style={i === idx ? { background: '#fca311' } : { background: light ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.25)' }}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Products data ─────────────────────────────────────────────────────────── */

type Product = {
  num: string
  id: string
  name: string
  tagline: string
  desc: string
  features: string[]
  bg: string
  accent: string
  light: boolean
  flip: boolean
  Mock?: React.ComponentType
  screenshots?: string[]
}

const PRODUCTS: Product[] = [
  {
    num: '01',
    id: 'quotation',
    name: 'Quotation Software',
    tagline: 'Professional quotes. Sent in minutes.',
    desc: 'Build, send, and track professional quotations without spreadsheets. Maintain an item library, apply GST automatically, export branded PDFs, and let clients approve quotes digitally — all in one place.',
    features: ['Quote Builder', 'PDF Export', 'Item Library', 'Client Database', 'Digital Approval', 'GST Auto-Calc'],
    bg: '#0f172a',
    accent: '#38bdf8',
    light: false,
    flip: false,
    screenshots: [quote1, quote2, quote3],
  },
  {
    num: '02', id: 'transport',
    name: 'Transport Management System',
    tagline: 'Freight, logistics & billing under one roof',
    desc: 'Built for importers, exporters, and logistics companies. Track job cards, manage container movement, generate freight invoices, handle vendor bills, and produce GST-compliant tax invoices — all from a single dashboard.',
    features: ['Job Card Management', 'Container Tracking', 'Freight Invoice', 'Vendor Billing', 'GST Tax Invoice', 'Import/Export Logs'],
    bg: '#0a1628', accent: '#38bdf8', light: false, flip: true,
    screenshots: [fleet1, fleet2, fleet3],
  },
  {
    num: '03', id: 'member',
    name: 'Member Management System',
    tagline: 'Memberships, receipts & renewals — organised',
    desc: 'Designed for clubs, associations, and societies. Manage 1000s of member profiles, track active and lapsed subscriptions, collect dues, generate e-receipts, monitor income & expenses, and send bulk WhatsApp messages.',
    features: ['Member Profiles', 'Subscription Tracking', 'E-Receipts', 'Income & Expense', 'Renewal Alerts', 'WhatsApp Notifications'],
    bg: '#1a0a2e', accent: '#a855f7', light: false, flip: false,
    screenshots: [member1, member2, member3],
  },
  {
    num: '04', id: 'matrimony',
    name: 'Matrimony & Hall Booking',
    tagline: 'Profiles, bookings & bilingual receipts',
    desc: 'A complete system for community associations managing matrimony services and venue bookings. Maintain active and inactive profiles, handle hall bookings with a calendar, collect payments, and print receipts in English and Tamil.',
    features: ['Profile Management', 'Hall Booking Calendar', 'Bilingual Receipts', 'Visitor Tracking', 'Photo Gallery', 'Flash News'],
    bg: '#0d2010', accent: '#22c55e', light: false, flip: true,
    screenshots: [matrimony1, matrimony2, matrimony3],
  },
  {
    num: '05', id: 'cabletv',
    name: 'Cable TV / Internet / OTT Billing',
    tagline: 'Multi-service billing for MSOs and ISPs',
    desc: 'A unified platform for cable TV operators, ISPs, and OTT resellers. Manage BSNL, Cable TV, Internet, and OTT subscriptions together. Handle complaints, top up partner wallets, track unpaid customers, and accept payments via Razorpay.',
    features: ['Multi-Service Billing', 'Complaint Management', 'OTT Activation', 'Partner Wallet', 'Razorpay Payments', 'Subscriber Reports'],
    bg: '#001a10', accent: '#10b981', light: false, flip: false,
    screenshots: [cable1, cable2, cable3],
  },
  {
    num: '06', id: 'cctv',
    name: 'CCTV Quotation Software',
    tagline: 'Instant estimates by brand, camera & accessories',
    desc: 'Built for CCTV installers and security dealers. Choose from Hikvision, Dahua, CP Plus, or Shingo. Select HD or IP cameras, DVRs, hard disks, cabling, and accessories. Generate a branded, itemised estimate PDF in seconds.',
    features: ['Brand-wise Estimates', 'HD & IP Camera Support', 'DVR/NVR Selector', 'Combo Estimates', 'Accessories Module', 'PDF Export'],
    bg: '#2d1b69', accent: '#f59e0b', light: false, flip: true,
    screenshots: [cctv1, cctv2, cctv3],
  },
]

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function ProductsPage() {
  const { openModal } = useContactModal()
  return (
    <div className="pp-root">

      {/* ── HERO ── */}
      <section className="pp-hero">
        <div className="pp-hero-inner">
          <div className="pp-eyebrow">Our Work · Goldmine Infotech</div>
          <h1 className="pp-hero-h1">
            Software we've built.<br />
            <span className="pp-hero-accent">For real businesses.</span>
          </h1>
          <p className="pp-hero-sub">
            From jewellery shops to car rental companies — each product here is live,
            in daily use, and built by our team for actual clients.
          </p>
          <div className="pp-hero-pills">
            {PRODUCTS.map(p => (
              <a key={p.id} href={`#${p.id}`} className="pp-hero-pill">
                <span className="pp-pill-num">{p.num}</span>
                {p.name}
              </a>
            ))}
          </div>
        </div>
        <div className="pp-hero-scroll-hint">Scroll to explore ↓</div>
      </section>

      {/* ── PRODUCTS ── */}
      {PRODUCTS.map((p) => (
        <section
          key={p.id}
          id={p.id}
          className={`pp-product${p.light ? ' pp-product--light' : ' pp-product--dark'}${p.flip ? ' pp-product--flip' : ''}`}
          style={{ '--accent': p.accent, background: p.bg } as React.CSSProperties}
        >
          {/* Big background number */}
          <div className="pp-bg-num">{p.num}</div>

          <div className="pp-product-inner">
            {/* Text side */}
            <div className="pp-text">
              <div className="pp-product-num" style={{ color: p.accent }}>{p.num}</div>
              <h2 className="pp-product-name">{p.name}</h2>
              <p className="pp-product-tagline">{p.tagline}</p>
              <p className="pp-product-desc">{p.desc}</p>
              <div className="pp-features">
                {p.features.map(f => (
                  <span key={f} className="pp-feature-chip" style={{ borderColor: `${p.accent}40`, color: p.light ? p.accent : p.accent }}>
                    {f}
                  </span>
                ))}
              </div>
              <button
                className="pp-enquire-btn"
                onClick={() => openModal({
                  badge: p.name,
                  badgeColor: 'purple',
                  title: `Enquire about ${p.name}`,
                  subtitle: p.tagline,
                  prefillMessage: `Hi, I'm interested in the ${p.name}. Please share more details and pricing.`,
                })}
              >
                Enquire Now
              </button>
            </div>

            {/* Mock UI / Screenshot side */}
            <div className="pp-mock-wrap">
              {p.screenshots ? (
                <ScreenshotSlider images={p.screenshots} light={p.light} />
              ) : p.Mock ? (
                <p.Mock />
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="pp-cta">
        <div className="pp-cta-inner">
          <div className="pp-cta-eyebrow">Get a live demo</div>
          <h2 className="pp-cta-h2">See it running<br />in your business.</h2>
          <p className="pp-cta-sub">Call us and we will walk you through any product live — no slides, just the real thing.</p>
          <div className="pp-cta-actions">
            <a href="tel:+919500036310" className="pp-cta-btn-primary">+91 95000 36310</a>
            <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="pp-cta-btn-ghost">WhatsApp Us</a>
          </div>
        </div>
      </section>

    </div>
  )
}
