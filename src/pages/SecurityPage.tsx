import { Link } from 'react-router-dom'
import { useContactModal } from '../context/ContactModalContext'
import LogoBarDark from '../components/LogoBarDark'
import './SecurityPage.css'

const CATEGORIES = [
  {
    name: 'HD Cameras',
    desc: 'Clear 1080p/4K footage for homes, offices, and retail — day and night coverage.',
    tag: 'Most Popular',
    accent: '#0066cc',
    to: '/security/cctv-cameras',
  },
  {
    name: 'IP Cameras',
    desc: 'PoE-powered, remote access, and cloud storage — enterprise-grade surveillance.',
    tag: 'Network Ready',
    accent: '#0a0a0a',
    to: '/security/cctv-cameras',
  },
  {
    name: 'WiFi Cameras',
    desc: 'Wireless setup with mobile app viewing. No cable runs needed.',
    tag: 'Easy Install',
    accent: '#059669',
    to: '/security/cctv-cameras',
  },
  {
    name: 'Dome Cameras',
    desc: 'Discreet ceiling-mount cameras for indoor surveillance. Tamper-resistant housing.',
    tag: 'Vandal-Proof',
    accent: '#7c3aed',
    to: '/security/cctv-cameras',
  },
  {
    name: 'Biometric Attendance',
    desc: 'Fingerprint, face, and card-based attendance with auto-payroll integration.',
    tag: 'Time & Attendance',
    accent: '#e31837',
    to: '/security/biometric',
  },
  {
    name: 'Access Control',
    desc: 'Restrict and log access to rooms, floors, and buildings — all controlled from one panel.',
    tag: 'Secure Entry',
    accent: '#fca311',
    to: '/security/biometric',
  },
]

const SECURITY_BRANDS = [
  { name: 'Hikvision', url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hikvision_logo.svg' },
  { name: 'Dahua',     url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dahua_Technology_logo.svg' },
  { name: 'CP Plus' },
  { name: 'Bosch',     url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/bosch.svg' },
  { name: 'Honeywell', url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Honeywell_logo.svg' },
  { name: 'ZKTeco' },
  { name: 'Godrej' },
  { name: 'Samsung',   url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/samsung.svg', className: 'logo-xlarge' },
  { name: 'Axis' },
  { name: 'Hanwha' },
]

const SERVICES = [
  {
    label: 'CCTV Installation',
    desc: 'Full camera survey, cabling, NVR/DVR setup, and configuration. We handle everything from planning to handover.',
    cta: 'Get Installation Quote',
  },
  {
    label: 'Biometric Setup',
    desc: 'Fingerprint, face recognition, and card systems for attendance and access control — installed and integrated with your HR software.',
    cta: 'Get Biometric Quote',
  },
  {
    label: 'AMC & Support',
    desc: 'Annual maintenance contracts with scheduled servicing, emergency callouts, and remote monitoring support.',
    cta: 'Get AMC Quote',
  },
]

export default function SecurityPage() {
  const { openModal } = useContactModal()

  return (
    <div className="sec-root">

      {/* ── HERO ── */}
      <section className="sec-hero">
        <div className="sec-hero-inner">
          <p className="sec-eyebrow">CCTV &amp; Biometric Systems · Chennai</p>
          <h1 className="sec-hero-headline">
            Security you can<br />count on.
          </h1>
          <p className="sec-hero-sub">
            HD cameras, IP surveillance, biometric attendance and access control — professionally
            installed and maintained across Chennai.
          </p>
          <div className="sec-hero-ctas">
            <button
              className="sec-btn-primary"
              onClick={() => openModal({
                badge: 'Security',
                badgeColor: 'green',
                title: 'Get a Free Survey',
                subtitle: 'Our security experts will assess your premises and recommend the ideal CCTV and biometric setup.',
                prefillMessage: 'Hi, I\'d like a free security survey for my premises.',
              })}
            >
              Get a Free Survey
            </button>
            <a
              href="https://wa.me/919500036310"
              target="_blank"
              rel="noopener noreferrer"
              className="sec-btn-ghost"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
        <div className="sec-hero-stats">
          {[
            { num: '1000+',  label: 'Cameras Installed' },
            { num: '500+',   label: 'Sites Secured' },
            { num: '25 yrs', label: 'Experience' },
          ].map(s => (
            <div key={s.label} className="sec-hero-stat">
              <div className="sec-hero-stat-num">{s.num}</div>
              <div className="sec-hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="sec-categories">
        <div className="sec-categories-inner">
          <p className="sec-section-label">What we install</p>
          <div className="sec-cat-grid">
            {CATEGORIES.map((c) => (
              <Link key={c.name} to={c.to} className="sec-cat-card">
                <div className="sec-cat-accent" style={{ background: c.accent }} />
                <div className="sec-cat-tag">{c.tag}</div>
                <h3 className="sec-cat-name">{c.name}</h3>
                <p className="sec-cat-desc">{c.desc}</p>
                <span className="sec-cat-link">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <LogoBarDark brands={SECURITY_BRANDS} label="Brands we install" />

      {/* ── SERVICES ── */}
      <section className="sec-services">
        <div className="sec-services-inner">
          <p className="sec-section-label">Services we offer</p>
          <div className="sec-services-grid">
            {SERVICES.map((s) => (
              <div key={s.label} className="sec-service-card">
                <h3 className="sec-service-title">{s.label}</h3>
                <p className="sec-service-desc">{s.desc}</p>
                <button
                  className="sec-service-cta"
                  onClick={() => openModal({
                    badge: 'Security',
                    badgeColor: 'green',
                    title: 'Get a Free Survey',
                    subtitle: 'Our security experts will assess your premises and recommend the ideal CCTV and biometric setup.',
                    prefillMessage: 'Hi, I\'d like a free security survey for my premises.',
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
      <section className="sec-cta">
        <div className="sec-cta-inner">
          <p className="sec-cta-eyebrow">Professional installation</p>
          <h2 className="sec-cta-headline">Your security.<br />Installed right.</h2>
          <p className="sec-cta-sub">
            We survey, supply, install, and maintain — all from our T.Nagar base in Chennai.
          </p>
          <div className="sec-cta-actions">
            <button
              className="sec-cta-btn-dark"
              onClick={() => openModal({
                badge: 'Security',
                badgeColor: 'green',
                title: 'Get a Free Survey',
                subtitle: 'Our security experts will assess your premises and recommend the ideal CCTV and biometric setup.',
                prefillMessage: 'Hi, I\'d like a free security survey for my premises.',
              })}
            >
              Get a Free Survey
            </button>
            <a
              href="https://wa.me/919500036310"
              target="_blank"
              rel="noopener noreferrer"
              className="sec-cta-btn-outline"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
