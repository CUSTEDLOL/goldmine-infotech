import { useContactModal } from '../context/ContactModalContext'
import './ProductsPage.css'

/* ── Mock UIs ─────────────────────────────────────────────────────────────── */

function JewelleryMock() {
  const rows = [
    { gem: '#D4AF37', name: '22K Gold Chain 10g', weight: '10.00g', price: '₹45,000' },
    { gem: '#C0C0C0', name: 'Silver Anklet Pair', weight: '28.50g', price: '₹8,200' },
    { gem: '#D4AF37', name: '18K Diamond Ring', weight: '3.20g', price: '₹12,500' },
    { gem: '#b9f2ff', name: 'Platinum Bracelet', weight: '6.80g', price: '₹3,100' },
  ]
  const navItems = [
    { icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', label: 'Home' },
    { icon: 'M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM1 7h4M19 7h4', label: 'POS' },
    { icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', label: 'Clients', active: true },
    { icon: 'M12 20V10M18 20V4M6 20v-4', label: 'Reports' },
    { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'Stock' },
  ]
  return (
    <div className="mock mock--jewel">
      <div className="mock-bar">
        <div className="mock-dots"><span /><span /><span /></div>
        <div className="mock-bar-title">Jewellery Suite · Billing</div>
      </div>
      <div className="mock-body">
        <div className="mock-sidebar mock-sidebar--wide">
          {navItems.map((item, i) => (
            <div key={i} className={`mock-nav-item${item.active ? ' active' : ''}`}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span className="mock-nav-label">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mock-main">
          <div className="mock-customer-row">
            <div className="mock-cust-avatar">RK</div>
            <div className="mock-cust-info">
              <div className="mock-cust-name">Ravi Kumar</div>
              <div className="mock-cust-sub">Walk-in · Bill #2847</div>
            </div>
            <div className="mock-topbar-val jewel-gold">₹68,800</div>
          </div>
          <div className="mock-table-head">
            <span>Item</span><span>Wt.</span><span>Amount</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="mock-row">
              <div className="mock-row-gem" style={{ background: r.gem }} />
              <div className="mock-row-name">{r.name}</div>
              <div className="mock-row-weight">{r.weight}</div>
              <div className="mock-row-price jewel-gold">{r.price}</div>
            </div>
          ))}
          <div className="mock-subtotals">
            <div className="mock-subtotal-line"><span>Subtotal</span><span>₹68,800</span></div>
            <div className="mock-subtotal-line gst"><span>GST (3%)</span><span>₹2,064</span></div>
          </div>
          <div className="mock-total">
            <span className="mock-total-label">TOTAL</span>
            <span className="mock-total-val jewel-gold">₹70,864</span>
          </div>
          <div className="mock-action-row">
            <div className="mock-btn mock-btn--gold">Print Bill</div>
            <div className="mock-btn mock-btn--ghost">Save Draft</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CarRentalMock() {
  const cars = [
    { name: 'Honda City', plate: 'TN09 AB 1234', driver: 'Suresh M.', status: 'booked',  fuel: 78 },
    { name: 'Swift Dzire', plate: 'TN07 CD 5678', driver: 'Rajan K.', status: 'free',   fuel: 92 },
    { name: 'Toyota Fortuner', plate: 'TN22 EF 9012', driver: 'Muthu V.', status: 'free', fuel: 45 },
    { name: 'Maruti Brezza', plate: 'TN04 GH 3456', driver: '—', status: 'maintenance', fuel: 30 },
  ]
  return (
    <div className="mock mock--cars">
      <div className="mock-bar mock-bar--light">
        <div className="mock-dots dark"><span /><span /><span /></div>
        <div className="mock-bar-title dark">Fleet Manager · Overview</div>
        <div className="mock-bar-btn">+ New Booking</div>
      </div>
      <div className="mock-fleet-stats">
        <div className="mock-fleet-tile">
          <div className="mock-fleet-tile-val">4</div>
          <div className="mock-fleet-tile-label">Total Fleet</div>
        </div>
        <div className="mock-fleet-tile active">
          <div className="mock-fleet-tile-val">1</div>
          <div className="mock-fleet-tile-label">On Trip</div>
        </div>
        <div className="mock-fleet-tile avail">
          <div className="mock-fleet-tile-val">2</div>
          <div className="mock-fleet-tile-label">Available</div>
        </div>
      </div>
      <div className="mock-cars-header">
        <span>Vehicle</span><span>Driver</span><span>Status</span><span>Fuel</span>
      </div>
      <div className="mock-cars-list">
        {cars.map((c, i) => (
          <div key={i} className="mock-car-row">
            <div className="mock-car-icon-svg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h13l4 4v4a2 2 0 0 1-2 2h-1"/>
                <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
              </svg>
            </div>
            <div className="mock-car-info">
              <div className="mock-car-name">{c.name}</div>
              <div className="mock-car-plate">{c.plate}</div>
            </div>
            <div className="mock-car-driver">{c.driver}</div>
            <div className={`mock-car-status mock-car-status--${c.status}`}>
              {c.status === 'booked' ? 'On Trip' : c.status === 'free' ? 'Available' : 'Service'}
            </div>
            <div className="mock-fuel-wrap">
              <div className="mock-fuel-bar">
                <div className="mock-fuel-fill" style={{ width: `${c.fuel}%`, background: c.fuel > 60 ? '#22c55e' : c.fuel > 30 ? '#f59e0b' : '#ef4444' }} />
              </div>
              <span className="mock-fuel-val">{c.fuel}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mock-cars-footer">
        <div className="mock-stat-chip">4 Vehicles</div>
        <div className="mock-stat-chip booked">1 Booked</div>
        <div className="mock-stat-chip free">2 Available</div>
      </div>
    </div>
  )
}

function QuotationMock() {
  const items = [
    { label: 'Website Design & Development', qty: 1, amt: '₹35,000' },
    { label: 'Cloud Hosting Setup (Annual)', qty: 1, amt: '₹8,500' },
    { label: 'SSL Certificate + Domain', qty: 2, amt: '₹3,200' },
    { label: 'Mobile App (Android + iOS)', qty: 1, amt: '₹75,000' },
  ]
  return (
    <div className="mock mock--quote">
      <div className="mock-doc">
        <div className="mock-doc-header">
          <div className="mock-doc-logo">
            <span className="mock-doc-logo-text">Goldmine</span>
          </div>
          <div className="mock-doc-meta">
            <div className="mock-doc-tag">QUOTATION</div>
            <div className="mock-doc-num">#QT-2024-047</div>
            <div className="mock-doc-date">Dated: 15 May 2024</div>
          </div>
        </div>
        <div className="mock-doc-divider" />
        <div className="mock-doc-to">
          <div className="mock-doc-label">PREPARED FOR</div>
          <div className="mock-doc-client-name">Ravi Kumar</div>
          <div className="mock-doc-client-sub">Kumar Enterprises · Chennai</div>
        </div>
        <div className="mock-doc-cols">
          <span>Description</span><span>Qty</span><span>Amount</span>
        </div>
        {items.map((it, i) => (
          <div key={i} className="mock-doc-item">
            <div className="mock-doc-item-label">{it.label}</div>
            <span className="mock-doc-qty">{it.qty}</span>
            <span className="mock-doc-amt">{it.amt}</span>
          </div>
        ))}
        <div className="mock-doc-divider" />
        <div className="mock-doc-totals">
          <div className="mock-doc-subtotal"><span>Subtotal</span><span>₹1,21,700</span></div>
          <div className="mock-doc-subtotal"><span>GST (18%)</span><span>₹21,906</span></div>
          <div className="mock-doc-final"><span>Total</span><span>₹1,43,606</span></div>
        </div>
        <div className="mock-doc-footer-row">
          <div className="mock-doc-pdf-btn">Export PDF</div>
          <div className="mock-doc-send-btn">Send to Client</div>
        </div>
      </div>
    </div>
  )
}

function PhotographerMock() {
  const photos = [
    { color: '#2d1b69', label: 'Wedding' },
    { color: '#1a0533', label: 'Portrait' },
    { color: '#3b0764', label: 'Nature' },
    { color: '#4c1d95', label: 'Events' },
    { color: '#1e1b4b', label: 'Studio' },
    { color: '#312e81', label: 'Street' },
  ]
  return (
    <div className="mock mock--photo">
      <div className="mock-bar mock-bar--photo">
        <div className="mock-dots"><span /><span /><span /></div>
        <div className="mock-photo-tabs">
          <span className="active">Portfolio</span>
          <span>Bookings</span>
          <span>Community</span>
        </div>
      </div>
      <div className="mock-photo-profile">
        <div className="mock-avatar" />
        <div className="mock-photo-profile-info">
          <div className="mock-profile-name">Arjun Visuals</div>
          <div className="mock-profile-handle">@arjunvisuals · Chennai</div>
        </div>
        <div className="mock-photo-stats">
          <div className="mock-pstat"><strong>142</strong><span>shoots</span></div>
          <div className="mock-pstat"><strong>2.4k</strong><span>followers</span></div>
          <div className="mock-pstat"><strong>98%</strong><span>rating</span></div>
        </div>
      </div>
      <div className="mock-photo-grid">
        {photos.map((p, i) => (
          <div key={i} className="mock-photo-tile" style={{ background: p.color }}>
            <div className="mock-photo-overlay" />
            <div className="mock-photo-tile-label">{p.label}</div>
          </div>
        ))}
      </div>
      <div className="mock-photo-footer">
        <div className="mock-photo-action">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          234
        </div>
        <div className="mock-photo-action">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          Share
        </div>
        <div className="mock-photo-action purple">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Book Session
        </div>
      </div>
    </div>
  )
}

function DesignsMock() {
  const tiles = [
    { label: 'Logo Pack', type: 'SVG', size: '2.4 MB', color: '#d1fae5', typeColor: '#065f46', ext: 'SVG' },
    { label: 'UI Kit', type: 'Figma', size: '18 MB', color: '#dbeafe', typeColor: '#1e40af', ext: 'FIG' },
    { label: 'Icon Set', type: 'PNG', size: '890 KB', color: '#fef3c7', typeColor: '#92400e', ext: 'PNG' },
    { label: 'Banners', type: 'PSD', size: '5.1 MB', color: '#ede9fe', typeColor: '#5b21b6', ext: 'PSD' },
    { label: 'Social Kit', type: 'SVG', size: '1.2 MB', color: '#fee2e2', typeColor: '#991b1b', ext: 'SVG' },
    { label: 'Templates', type: 'AI', size: '9.8 MB', color: '#d1fae5', typeColor: '#065f46', ext: 'AI' },
  ]
  const categories = ['All', 'Logos', 'UI Kits', 'Icons', 'Print', 'Social']
  return (
    <div className="mock mock--designs">
      <div className="mock-bar mock-bar--light">
        <div className="mock-dots dark"><span /><span /><span /></div>
        <div className="mock-bar-title dark">Design Assets · Library</div>
      </div>
      <div className="mock-designs-search">
        <div className="mock-search-real">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span>Search assets…</span>
        </div>
        <div className="mock-filter-pill">Type ▾</div>
      </div>
      <div className="mock-category-tags">
        {categories.map((cat, i) => (
          <div key={i} className={`mock-cat-tag${i === 0 ? ' active' : ''}`}>{cat}</div>
        ))}
      </div>
      <div className="mock-designs-grid">
        {tiles.map((t, i) => (
          <div key={i} className="mock-asset-tile" style={{ background: t.color }}>
            <div className="mock-asset-preview">
              <div className="mock-asset-ext-badge" style={{ color: t.typeColor, background: `${t.typeColor}18` }}>{t.ext}</div>
            </div>
            <div className="mock-asset-info">
              <span className="mock-asset-name">{t.label}</span>
              <span className="mock-asset-meta">{t.size}</span>
            </div>
            <div className="mock-asset-dl">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className="mock-designs-footer">
        <span className="mock-designs-count">48 assets · 3 selected</span>
        <div className="mock-designs-btn">Download Selected</div>
      </div>
    </div>
  )
}

/* ── Products data ─────────────────────────────────────────────────────────── */

const PRODUCTS = [
  {
    num: '01',
    id: 'jewellery',
    name: 'Jewellery Business Suite',
    tagline: 'POS, billing & inventory for jewellers',
    desc: 'A complete management platform built for jewellery retailers. Track stock by weight and purity, sync live gold rates, generate GST bills, manage customer ledgers, and print hallmark certificates — all from one screen.',
    features: ['POS Billing', 'Gold Rate Sync', 'Stock by Weight', 'Customer Ledger', 'Hallmark Tracking', 'GST Reports'],
    bg: '#0a0a0a',
    accent: '#D4AF37',
    light: false,
    flip: false,
    Mock: JewelleryMock,
  },
  {
    num: '02',
    id: 'carrental',
    name: 'Car Rental Software',
    tagline: 'Fleet management & bookings, simplified',
    desc: 'End-to-end fleet management for rental businesses. Track every vehicle in real time, manage driver assignments, handle bookings with a calendar view, generate invoices, and log maintenance schedules automatically.',
    features: ['Fleet Tracking', 'Booking Calendar', 'Driver Management', 'Billing & GST', 'Fuel Log', 'Maintenance Alerts'],
    bg: '#f5f5f5',
    accent: '#0f172a',
    light: true,
    flip: true,
    Mock: CarRentalMock,
  },
  {
    num: '03',
    id: 'quotation',
    name: 'Quotation Software',
    tagline: 'Professional quotes. Sent in minutes.',
    desc: 'Build, send, and track professional quotations without spreadsheets. Maintain an item library, apply GST automatically, export branded PDFs, and let clients approve quotes digitally — all in one place.',
    features: ['Quote Builder', 'PDF Export', 'Item Library', 'Client Database', 'Digital Approval', 'GST Auto-Calc'],
    bg: '#0f172a',
    accent: '#38bdf8',
    light: false,
    flip: false,
    Mock: QuotationMock,
  },
  {
    num: '04',
    id: 'photographers',
    name: 'Photographers Community Portal',
    tagline: 'Portfolio, bookings & community — one home',
    desc: 'Built for professional photographers. Showcase your work with a curated portfolio, accept client bookings, share galleries with download controls, connect with the community, and generate invoices automatically.',
    features: ['Portfolio Builder', 'Client Booking', 'Gallery Sharing', 'Download Control', 'Community Feed', 'Auto Invoice'],
    bg: '#0c0c0c',
    accent: '#a855f7',
    light: false,
    flip: true,
    Mock: PhotographerMock,
  },
  {
    num: '05',
    id: 'designs',
    name: 'Designs Stock Software',
    tagline: 'Your design asset library, organised',
    desc: 'A central hub for storing, tagging, and distributing digital design assets. Upload logos, templates, icons, and UI kits. Control licensing, manage team access, track downloads, and search across everything instantly.',
    features: ['Asset Library', 'Category Tags', 'Search & Filter', 'License Control', 'Team Access', 'Download History'],
    bg: '#fafafa',
    accent: '#10b981',
    light: true,
    flip: false,
    Mock: DesignsMock,
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
          style={{ '--accent': p.accent } as React.CSSProperties}
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

            {/* Mock UI side */}
            <div className="pp-mock-wrap">
              <p.Mock />
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
