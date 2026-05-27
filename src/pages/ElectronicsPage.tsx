import { Link } from 'react-router-dom'
import { useContactModal } from '../context/ContactModalContext'
import LogoBarDark from '../components/LogoBarDark'
import './ElectronicsPage.css'

const ELECTRONICS_BRANDS = [
  { name: 'Samsung',  url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/samsung.svg', className: 'logo-xlarge' },
  { name: 'Apple',    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Sony',     url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
  { name: 'LG',       url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg' },
  { name: 'OnePlus',  url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/oneplus.svg' },
  { name: 'Xiaomi',   url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/xiaomi.svg', className: 'logo-xlarge' },
  { name: 'Motorola', url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/motorola.svg', className: 'logo-xlarge' },
  { name: 'Panasonic', url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/panasonic.svg', className: 'logo-xlarge' },
  { name: 'Philips',  url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Philips_logo_new.svg' },
  { name: 'Nokia',    url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/nokia.svg', className: 'logo-xlarge' },
  { name: 'Garmin',   url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/garmin.svg', className: 'logo-xlarge' },
]

const CATEGORIES = [
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
    name: 'Smartwatches',
    desc: 'Apple Watch, Samsung Galaxy Watch, Garmin, Fitbit & more — fitness and lifestyle wearables.',
    tag: 'New Arrivals',
    accent: '#7c3aed',
    to: '/electronics/smartwatches',
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
  const { openModal } = useContactModal()

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
            <button
              className="elp-btn-primary"
              onClick={() => openModal({
                badge: 'Electronics',
                badgeColor: 'orange',
                title: 'Get a Quote',
                subtitle: 'Tell us what you\'re looking for and we\'ll check availability and pricing.',
                prefillMessage: 'Hi, I\'m looking for electronics. Please share availability and pricing for: ',
              })}
            >
              Get a Quote
            </button>
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

      {/* ── BRAND STRIP ── */}
      <LogoBarDark brands={ELECTRONICS_BRANDS} label="Brands we carry" />

      {/* ── SERVICES ── */}
      <section className="elp-services">
        <div className="elp-services-inner">
          <p className="elp-section-label">Services we offer</p>
          <div className="elp-services-grid">
            {SERVICES.map((s) => (
              <div key={s.label} className="elp-service-card">
                <h3 className="elp-service-title">{s.label}</h3>
                <p className="elp-service-desc">{s.desc}</p>
                <button
                  className="elp-service-cta"
                  onClick={() => openModal({
                    badge: 'Electronics',
                    badgeColor: 'orange',
                    title: 'Get a Quote',
                    subtitle: 'Tell us what you\'re looking for and we\'ll check availability and pricing.',
                    prefillMessage: 'Hi, I\'m looking for electronics. Please share availability and pricing for: ',
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
      <section className="elp-cta">
        <div className="elp-cta-inner">
          <p className="elp-cta-eyebrow">Walk in or call ahead</p>
          <h2 className="elp-cta-headline">In-store pickup.<br />Same day.</h2>
          <p className="elp-cta-sub">We're in T.Nagar, Chennai. Come see the products in person or call us to check availability.</p>
          <div className="elp-cta-actions">
            <button
              className="elp-cta-btn-dark"
              onClick={() => openModal({
                badge: 'Electronics',
                badgeColor: 'orange',
                title: 'Get a Quote',
                subtitle: 'Tell us what you\'re looking for and we\'ll check availability and pricing.',
                prefillMessage: 'Hi, I\'m looking for electronics. Please share availability and pricing for: ',
              })}
            >
              Get a Quote
            </button>
            <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="elp-cta-btn-outline">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
