import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './InstallationsPage.css'

const ENVIRONMENTS = [
  {
    id: 'home',
    name: 'Home & Villa',
    tag: 'Residential',
    badge: 'Most Popular',
    desc: 'Protect your family with indoor and outdoor cameras, smart doorbells, and mobile app access.',
    img: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
  },
  {
    id: 'office',
    name: 'Office Security',
    tag: 'Corporate',
    badge: 'Access Control',
    desc: 'Comprehensive CCTV and biometric access for offices of every size. Entry logs, remote view, and NVR backup.',
    img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
  },
  {
    id: 'school',
    name: 'School & College',
    tag: 'Education',
    badge: 'Child Safety',
    desc: 'Campus-wide coverage with perimeter cameras, entry access control, and real-time alerts for staff.',
    img: 'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
  },
  {
    id: 'factory',
    name: 'Factory & Warehouse',
    tag: 'Industrial',
    badge: 'High Coverage',
    desc: 'Heavy-duty weatherproof cameras covering loading docks, production floors, and perimeter fencing.',
    img: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
  },
  {
    id: 'retail',
    name: 'Retail Shops',
    tag: 'Retail',
    badge: 'Loss Prevention',
    desc: 'Strategic camera placement covering checkout counters, storage rooms, and all customer-facing areas.',
    img: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
  },
  {
    id: 'apartment',
    name: 'Apartment Complex',
    tag: 'Residential',
    badge: 'Community',
    desc: 'Lobby, lift, parking, and perimeter coverage with intercom integration and resident mobile access.',
    img: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
  },
]

const SPECS = [
  { value: 'Free', label: 'Site Survey' },
  { value: '1 day', label: 'Avg Install Time' },
  { value: '1 year', label: 'Warranty Included' },
  { value: '24/7', label: 'Remote Monitoring' },
]

const BRANDS = ['Hikvision', 'Dahua', 'CP Plus', 'Bosch', 'Honeywell', 'Axis', 'ZKTeco', 'Samsung']

const WHY = [
  {
    num: '01',
    title: 'Free site survey first',
    desc: 'We visit, map your space, identify blind spots, and give you a detailed camera placement plan — before you spend anything.',
  },
  {
    num: '02',
    title: 'Single-day installation',
    desc: 'Most residential and small office setups are done in a day. No prolonged disruption to your operations.',
  },
  {
    num: '03',
    title: 'Warranty + AMC options',
    desc: 'Every installation comes with a 1-year warranty. Extend with our AMC for ongoing maintenance and priority support.',
  },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const rise = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } } }

export default function InstallationsPage() {
  return (
    <div className="inst-root">

      {/* ── HERO ── */}
      <section className="inst-hero">
        <div className="inst-hero-inner">
          <motion.div className="inst-hero-left" variants={stagger} initial="hidden" animate="visible">
            <motion.div className="inst-breadcrumb" variants={rise}>
              <Link to="/" className="inst-bc-link">Home</Link>
              <span className="inst-bc-sep">/</span>
              <Link to="/security" className="inst-bc-link">Security</Link>
              <span className="inst-bc-sep">/</span>
              <span>Security Installations</span>
            </motion.div>

            <motion.p className="inst-eyebrow" variants={rise}>
              Security Installations · Chennai
            </motion.p>

            <motion.h1 className="inst-headline" variants={rise}>
              Every space.<br />
              <span className="inst-headline-thin">Professionally secured.</span>
            </motion.h1>

            <motion.p className="inst-sub" variants={rise}>
              Complete CCTV and biometric installations for homes, offices, schools, factories, and retail —
              surveyed, installed and maintained by our team.
            </motion.p>

            <motion.div className="inst-hero-ctas" variants={rise}>
              <a href="tel:+919500036310" className="inst-btn-primary">Get a Free Survey</a>
              <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="inst-btn-secondary">
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="inst-hero-right"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inst-hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85"
                alt="Professional security installation at a modern office"
                className="inst-hero-img"
              />
              <div className="inst-hero-img-overlay" />
              <div className="inst-hero-stat-card">
                <div className="inst-hero-stat-num">500+</div>
                <div className="inst-hero-stat-label">Sites secured across Chennai</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Spec strip */}
        <div className="inst-spec-strip">
          {SPECS.map(s => (
            <div key={s.label} className="inst-spec-item">
              <span className="inst-spec-value">{s.value}</span>
              <span className="inst-spec-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ENVIRONMENTS ── */}
      <section className="inst-types">
        <div className="inst-types-inner">
          <div className="inst-section-header">
            <p className="inst-section-label">Installation environments</p>
            <h2 className="inst-section-title">We install everywhere you need coverage.</h2>
          </div>

          <div className="inst-env-grid">
            {ENVIRONMENTS.map((env, i) => (
              <motion.div
                key={env.id}
                className="inst-env-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
              >
                <div className="inst-env-img-wrap">
                  <img src={env.img} alt={env.name} className="inst-env-img" loading="lazy" />
                  <span className="inst-env-tag">{env.tag}</span>
                  <span className="inst-env-badge">{env.badge}</span>
                </div>
                <div className="inst-env-body">
                  <h3 className="inst-env-name">{env.name}</h3>
                  <p className="inst-env-desc">{env.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <div className="inst-brands">
        <p className="inst-brands-label">Brands we install</p>
        <div className="inst-brands-row">
          {BRANDS.map(b => <span key={b} className="inst-brand">{b}</span>)}
        </div>
      </div>

      {/* ── WHY GOLDMINE ── */}
      <section className="inst-why">
        <div className="inst-why-inner">
          <p className="inst-section-label">Why choose us</p>
          <div className="inst-why-grid">
            {WHY.map((w) => (
              <motion.div
                key={w.num}
                className="inst-why-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span className="inst-why-num">{w.num}</span>
                <h3 className="inst-why-title">{w.title}</h3>
                <p className="inst-why-desc">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="inst-cta">
        <div className="inst-cta-inner">
          <div className="inst-cta-left">
            <p className="inst-cta-eyebrow">Get started</p>
            <h2 className="inst-cta-headline">
              Book a free survey.<br />See your blind spots.
            </h2>
            <p className="inst-cta-sub">
              Our team visits, assesses, and gives you a written camera plan — completely free, no obligation.
            </p>
          </div>
          <div className="inst-cta-right">
            <a href="tel:+919500036310" className="inst-cta-btn-primary">+91 95000 36310</a>
            <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="inst-cta-btn-secondary">
              WhatsApp Us
            </a>
            <p className="inst-cta-note">Same-day response · Free site survey</p>
          </div>
        </div>
      </section>

    </div>
  )
}
