import { Link } from 'react-router-dom'
import { useContactModal } from '../context/ContactModalContext'
import './ServicesPage.css'

const CATEGORIES = [
  {
    name: 'Web & Hosting',
    desc: 'Everything you need to get online — domains, hosting, SSL, email, and professional website design.',
    accent: '#6366f1',
    to: '/services/web-hosting',
    services: [
      'Domain Registration',
      'Web Hosting & VPS',
      'SSL Certificates',
      'Email Solutions',
      'Website Design & Redesign',
    ],
  },
  {
    name: 'Build & Deploy',
    desc: 'Custom software development and digital solutions built for Indian businesses.',
    accent: '#fca311',
    to: '/services/build-deploy',
    services: [
      'E-Commerce Websites',
      'CMS & Mobile Apps',
      'Bulk SMS Service',
      'Panoramic 360° View',
      'eNACH Integration',
    ],
  },
  {
    name: 'Manage & Support',
    desc: 'Ongoing IT support, maintenance, and consulting so your business never skips a beat.',
    accent: '#10b981',
    to: '/services/manage-support',
    services: [
      'Website Maintenance',
      'Annual Maintenance (AMC)',
      'Payment Gateway Setup',
      'IT Consultation',
      'Remote Support',
    ],
  },
]

const STATS = [
  { num: '25+',   label: 'Years Experience' },
  { num: '5,000+', label: 'Projects Delivered' },
  { num: '1,200+', label: 'Active Clients' },
  { num: 'Chennai', label: 'Based Team' },
]

export default function ServicesPage() {
  const { openModal } = useContactModal()

  return (
    <div className="svp-root">

      {/* ── HERO ── */}
      <section className="svp-hero">
        <div className="svp-hero-inner">
          <p className="svp-eyebrow">Services · Goldmine Infotech</p>
          <h1 className="svp-hero-headline">
            {`Web. Software. Support.\nAll under one roof.`}
          </h1>
          <p className="svp-hero-sub">
            From domain registration to full IT support — one team handles it all.
          </p>
          <div className="svp-hero-ctas">
            <button
              className="svp-btn-primary"
              onClick={() => openModal({
                badge: 'Services',
                badgeColor: 'purple',
                title: 'Get a Free Quote',
                prefillMessage: 'Hi, I\'d like to enquire about your services.',
              })}
            >
              Get a Free Quote
            </button>
            <a
              href="https://wa.me/919500036310"
              target="_blank"
              rel="noopener noreferrer"
              className="svp-btn-ghost"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
        <div className="svp-hero-stats">
          {STATS.map(s => (
            <div key={s.label} className="svp-hero-stat">
              <div className="svp-hero-stat-num">{s.num}</div>
              <div className="svp-hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORY CARDS ── */}
      <section className="svp-categories">
        <div className="svp-categories-inner">
          <p className="svp-section-label">What we offer</p>
          <div className="svp-cat-grid">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="svp-cat-card">
                <div className="svp-cat-accent" style={{ background: c.accent }} />
                <h2 className="svp-cat-name">{c.name}</h2>
                <p className="svp-cat-desc">{c.desc}</p>
                <ul className="svp-cat-list">
                  {c.services.map((svc) => (
                    <li key={svc}>{svc}</li>
                  ))}
                </ul>
                <Link to={c.to} className="svp-cat-link">
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="svp-cta">
        <div className="svp-cta-inner">
          <p className="svp-cta-eyebrow">Let's work together</p>
          <h2 className="svp-cta-headline">Ready to get started?</h2>
          <p className="svp-cta-sub">
            Tell us what you need and we'll put together the right solution — no jargon, no pressure.
          </p>
          <div className="svp-cta-actions">
            <button
              className="svp-cta-btn-primary"
              onClick={() => openModal({
                badge: 'Services',
                badgeColor: 'purple',
                title: 'Get a Free Quote',
                prefillMessage: 'Hi, I\'d like to enquire about your services.',
              })}
            >
              Get a Free Quote
            </button>
            <a
              href="https://wa.me/919500036310"
              target="_blank"
              rel="noopener noreferrer"
              className="svp-cta-btn-outline"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
