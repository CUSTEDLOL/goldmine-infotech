import { Link } from 'react-router-dom'
import { useContactModal } from '../context/ContactModalContext'
import LogoBarDark from '../components/LogoBarDark'
import './ComputersPage.css'

/* ── Brand Logos ────────────────────────────────────────────────── */
const COMPUTER_BRANDS = [
  { name: 'HP',        url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
  { name: 'Dell',      url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
  { name: 'Lenovo',    url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/lenovo.svg' },
  { name: 'ASUS',      url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
  { name: 'Acer',      url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/acer.svg' },
  { name: 'Apple',     url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Samsung',   url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/samsung.svg', className: 'logo-xlarge' },
  { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'Intel',     url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg' },
]

const CATEGORIES = [
  {
    name: 'Laptops',
    desc: 'HP, Dell, Lenovo, Asus & more — ultrabooks to gaming rigs',
    tag: 'Most Popular',
    accent: '#0066cc',
    to: '/electronics/laptops',
  },
  {
    name: 'Desktop Computers',
    desc: 'Office towers, all-in-ones, and custom builds for every budget',
    tag: 'In Stock',
    accent: '#e31837',
    to: '/electronics/desktops',
  },
  {
    name: 'Printers & Scanners',
    desc: 'Laser, inkjet, and multifunction printers from HP, Epson, Canon',
    tag: 'Fast Delivery',
    accent: '#059669',
    to: '/electronics/printers',
  },
]

const SERVICES = [
  {
    label: 'Annual Maintenance (AMC)',
    desc: 'Hardware and software AMC contracts covering all your devices — preventive care, priority support, and guaranteed response times.',
    cta: 'Get AMC Quote',
  },
  {
    label: 'Repair & Servicing',
    desc: 'On-site and in-store repair for laptops, desktops, and printers. Same-day service for common issues.',
    cta: 'Book a Repair',
  },
  {
    label: 'Corporate Bulk Orders',
    desc: 'Setting up an office or school lab? We supply, configure, and install in bulk — with volume pricing and dedicated support.',
    cta: 'Request Bulk Quote',
  },
]

export default function ComputersPage() {
  const { openModal } = useContactModal()

  return (
    <div className="cmp-root">

      {/* ── HERO ── */}
      <section className="cmp-hero">
        <div className="cmp-hero-inner">
          <p className="cmp-eyebrow">Computers &amp; Peripherals · Chennai</p>
          <h1 className="cmp-hero-headline">
            The right computer<br />for every desk.
          </h1>
          <p className="cmp-hero-sub">
            Laptops, desktops, and printers — all top brands, always in stock.
            Walk in or call ahead. Same-day pickup available.
          </p>
          <div className="cmp-hero-ctas">
            <button
              className="cmp-btn-primary"
              onClick={() => openModal({
                badge: 'Computers',
                badgeColor: 'blue',
                title: 'Get a Quote',
                subtitle: 'Tell us your requirements and we\'ll find the right computer for your budget.',
                prefillMessage: 'Hi, I\'m looking for a computer. My requirements are: ',
              })}
            >
              Get a Quote
            </button>
            <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="cmp-btn-ghost">
              WhatsApp Us
            </a>
          </div>
        </div>
        <div className="cmp-hero-stats">
          {[
            { num: '200+',   label: 'Models in Stock' },
            { num: '10+',    label: 'Brands Carried' },
            { num: '25 yrs', label: 'In Business' },
          ].map(s => (
            <div key={s.label} className="cmp-hero-stat">
              <div className="cmp-hero-stat-num">{s.num}</div>
              <div className="cmp-hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="cmp-categories">
        <div className="cmp-categories-inner">
          <p className="cmp-section-label">What we sell</p>
          <div className="cmp-cat-grid">
            {CATEGORIES.map((c) => (
              <Link key={c.name} to={c.to} className="cmp-cat-card">
                <div className="cmp-cat-accent" style={{ background: c.accent }} />
                <div className="cmp-cat-tag">{c.tag}</div>
                <h3 className="cmp-cat-name">{c.name}</h3>
                <p className="cmp-cat-desc">{c.desc}</p>
                <span className="cmp-cat-link">Browse →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <LogoBarDark brands={COMPUTER_BRANDS} label="Brands we carry" />

      {/* ── SERVICES ── */}
      <section className="cmp-services">
        <div className="cmp-services-inner">
          <p className="cmp-section-label">Services we offer</p>
          <div className="cmp-services-grid">
            {SERVICES.map((s) => (
              <div key={s.label} className="cmp-service-card">
                <h3 className="cmp-service-title">{s.label}</h3>
                <p className="cmp-service-desc">{s.desc}</p>
                <button
                  className="cmp-service-cta"
                  onClick={() => openModal({
                    badge: 'Computers',
                    badgeColor: 'blue',
                    title: 'Get a Quote',
                    subtitle: 'Tell us your requirements and we\'ll find the right computer for your budget.',
                    prefillMessage: 'Hi, I\'m looking for a computer. My requirements are: ',
                  })}
                >
                  {s.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cmp-cta">
        <div className="cmp-cta-inner">
          <p className="cmp-cta-eyebrow">Walk in or call ahead</p>
          <h2 className="cmp-cta-headline">In-store pickup.<br />Same day.</h2>
          <p className="cmp-cta-sub">We are in T.Nagar, Chennai. Come see the products in person or call us to check availability.</p>
          <div className="cmp-cta-actions">
            <button
              className="cmp-cta-btn-dark"
              onClick={() => openModal({
                badge: 'Computers',
                badgeColor: 'blue',
                title: 'Get a Quote',
                subtitle: 'Tell us your requirements and we\'ll find the right computer for your budget.',
                prefillMessage: 'Hi, I\'m looking for a computer. My requirements are: ',
              })}
            >
              Get a Quote
            </button>
            <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="cmp-cta-btn-outline">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
