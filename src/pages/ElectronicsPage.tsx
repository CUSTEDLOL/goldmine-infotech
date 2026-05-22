import { Link } from 'react-router-dom'
import './ElectronicsPage.css'

const CATEGORIES = [
  {
    name: 'Laptops',
    desc: 'HP, Dell, Lenovo, Asus & more — ultrabooks to gaming rigs, all in stock.',
    tag: 'Most Popular',
    accent: '#0066cc',
    to: '/electronics/laptops',
  },
  {
    name: 'Desktop Computers',
    desc: 'Office towers, all-in-ones, and custom builds for every budget.',
    tag: 'In Stock',
    accent: '#e31837',
    to: '/electronics/desktops',
  },
  {
    name: 'Printers & Scanners',
    desc: 'Laser, inkjet, and multifunction printers from HP, Epson, and Canon.',
    tag: 'Fast Delivery',
    accent: '#059669',
    to: '/electronics/printers',
  },
  {
    name: 'Televisions',
    desc: 'Smart TVs, 4K panels, and commercial displays — all screen sizes.',
    tag: 'New Arrivals',
    accent: '#7c3aed',
    to: '/electronics/televisions',
  },
  {
    name: 'Mobile Phones',
    desc: 'Samsung, Apple, and more — unlocked handsets with warranty.',
    tag: 'In Stock',
    accent: '#fca311',
    to: '/electronics/mobiles',
  },
  {
    name: 'Computer Peripherals',
    desc: 'Keyboards, mice, webcams, headsets, UPS units and accessories.',
    tag: 'Wide Range',
    accent: '#475569',
    to: '#',
  },
]

const BRANDS = ['HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'Samsung', 'Canon', 'Epson', 'Apple', 'TVS', 'MSI', 'D-Link']

const SERVICES = [
  {
    label: 'Annual Maintenance (AMC)',
    desc: 'Hardware and software AMC contracts covering all your devices — preventive care, priority support, and guaranteed response times.',
    cta: 'Get AMC Quote',
  },
  {
    label: 'Repair & Servicing',
    desc: 'On-site and in-store repair for laptops, desktops, printers, and phones. Same-day service for common issues.',
    cta: 'Book a Repair',
  },
  {
    label: 'Corporate Bulk Orders',
    desc: 'Setting up an office or school lab? We supply, configure, and install in bulk — with volume pricing and dedicated support.',
    cta: 'Request Bulk Quote',
  },
]

export default function ElectronicsPage() {
  return (
    <div className="elp-root">

      {/* ── HERO ── */}
      <section className="elp-hero">
        <div className="elp-hero-inner">
          <p className="elp-eyebrow">Systems &amp; Electronics · Chennai</p>
          <h1 className="elp-hero-headline">
            The IT store<br />Chennai trusts.
          </h1>
          <p className="elp-hero-sub">
            Laptops, desktops, printers, TVs, phones — all brands, always in stock.
            Walk in or order online. Same-day pickup available.
          </p>
          <div className="elp-hero-ctas">
            <a href="tel:+919500036310" className="elp-btn-primary">Call +91 95000 36310</a>
            <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="elp-btn-ghost">
              WhatsApp Us
            </a>
          </div>
        </div>
        <div className="elp-hero-stats">
          {[
            { num: '500+', label: 'Products in Stock' },
            { num: '12+',  label: 'Brands Carried' },
            { num: '25 yrs', label: 'In Business' },
          ].map(s => (
            <div key={s.label} className="elp-hero-stat">
              <div className="elp-hero-stat-num">{s.num}</div>
              <div className="elp-hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="elp-categories">
        <div className="elp-categories-inner">
          <p className="elp-section-label">What we sell</p>
          <div className="elp-cat-grid">
            {CATEGORIES.map((c) => (
              <Link key={c.name} to={c.to} className="elp-cat-card">
                <div className="elp-cat-accent" style={{ background: c.accent }} />
                <div className="elp-cat-tag">{c.tag}</div>
                <h3 className="elp-cat-name">{c.name}</h3>
                <p className="elp-cat-desc">{c.desc}</p>
                <span className="elp-cat-link">Browse →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <div className="elp-brands">
        <p className="elp-brands-label">Brands we carry</p>
        <div className="elp-brands-row">
          {BRANDS.map(b => <span key={b} className="elp-brand">{b}</span>)}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="elp-services">
        <div className="elp-services-inner">
          <p className="elp-section-label">Services we offer</p>
          <div className="elp-services-grid">
            {SERVICES.map((s) => (
              <div key={s.label} className="elp-service-card">
                <h3 className="elp-service-title">{s.label}</h3>
                <p className="elp-service-desc">{s.desc}</p>
                <a href="tel:+919500036310" className="elp-service-cta">{s.cta} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="elp-cta">
        <div className="elp-cta-inner">
          <p className="elp-cta-eyebrow">Walk in or call ahead</p>
          <h2 className="elp-cta-headline">In-store pickup.<br />Same day.</h2>
          <p className="elp-cta-sub">We're in T.Nagar, Chennai. Come see the products in person or call us to check availability.</p>
          <div className="elp-cta-actions">
            <a href="tel:+919500036310" className="elp-cta-btn-dark">+91 95000 36310</a>
            <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="elp-cta-btn-outline">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
