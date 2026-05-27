import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useContactModal } from '../context/ContactModalContext'
import LogoBarDark from '../components/LogoBarDark'
import './BiometricPage.css'

const SYSTEMS = [
  {
    id: 'fingerprint',
    name: 'Fingerprint Systems',
    tag: 'Most Popular',
    badge: 'High Precision',
    desc: 'Capacitive fingerprint sensors with 1:N matching. Works for 10,000+ enrolled users without slowdown.',
    img: 'https://images.pexels.com/photos/4125683/pexels-photo-4125683.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'face',
    name: 'Face Recognition',
    tag: 'New',
    badge: 'Contactless',
    desc: '3D facial recognition with liveness detection. Works in low light and with masks.',
    img: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'access',
    name: 'Access Control',
    tag: 'Secure Entry',
    badge: 'Multi-layer',
    desc: 'Restrict and log access to rooms, floors, and buildings. Card, PIN, and biometric combinations.',
    img: 'https://images.pexels.com/photos/4481323/pexels-photo-4481323.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'attendance',
    name: 'Attendance Systems',
    tag: 'HR Ready',
    badge: 'Auto-Payroll',
    desc: 'Time and attendance tracking with direct integration to payroll software. Eliminates manual entry.',
    img: 'https://images.pexels.com/photos/3825578/pexels-photo-3825578.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'card',
    name: 'Card-Based Systems',
    tag: 'Fast Access',
    badge: 'RFID/NFC',
    desc: 'Proximity and smart card systems for high-traffic entry points. Fast, reliable, and tamper-proof.',
    img: 'https://images.pexels.com/photos/5699502/pexels-photo-5699502.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'amc',
    name: 'Biometric AMC',
    tag: 'Support Plan',
    badge: 'Priority',
    desc: 'Annual maintenance covering calibration, updates, database backup, and emergency callouts.',
    img: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

const SPECS = [
  { value: '< 1 sec', label: 'Identification Speed' },
  { value: '99.9%', label: 'Accuracy Rate' },
  { value: '10,000+', label: 'Fingerprint Capacity' },
  { value: '24/7', label: 'System Uptime' },
]

const BIOMETRIC_BRANDS = [
  { name: 'ZKTeco' },
  { name: 'Honeywell', url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Honeywell_logo.svg' },
  { name: 'Godrej' },
  { name: 'Matrix' },
  { name: 'ESSL' },
  { name: 'HID' },
  { name: 'Suprema' },
  { name: 'Anviz' },
]

const WHY = [
  {
    num: '01',
    title: 'Certified integrators',
    desc: 'Our team is trained and certified by the manufacturers. Every system is configured to spec, not guesswork.',
  },
  {
    num: '02',
    title: 'Seamless HR integration',
    desc: 'We connect your biometric system directly to your existing payroll and HR software. No double entry.',
  },
  {
    num: '03',
    title: 'Ongoing calibration & support',
    desc: 'Biometric systems drift over time. Our AMC keeps accuracy high and downtime zero.',
  },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const rise = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } } }

export default function BiometricPage() {
  const { openModal } = useContactModal()

  return (
    <div className="bio-root">

      {/* ── HERO ── */}
      <section className="bio-hero">
        <div className="bio-hero-inner">
          <motion.div className="bio-hero-left" variants={stagger} initial="hidden" animate="visible">
            <motion.div className="bio-breadcrumb" variants={rise}>
              <Link to="/" className="bio-bc-link">Home</Link>
              <span className="bio-bc-sep">/</span>
              <Link to="/security" className="bio-bc-link">Security</Link>
              <span className="bio-bc-sep">/</span>
              <span>Biometric Systems</span>
            </motion.div>

            <motion.p className="bio-eyebrow" variants={rise}>
              Biometric Systems · Chennai
            </motion.p>

            <motion.h1 className="bio-headline" variants={rise}>
              Identity. Access.<br />
              <span className="bio-headline-thin">All controlled.</span>
            </motion.h1>

            <motion.p className="bio-sub" variants={rise}>
              Fingerprint, face recognition, and card-based attendance and access control — installed
              and integrated across Chennai.
            </motion.p>

            <motion.div className="bio-hero-ctas" variants={rise}>
              <button
                className="bio-btn-primary"
                onClick={() => openModal({
                  badge: 'Biometric Systems',
                  badgeColor: 'blue',
                  title: 'Get a Free Survey',
                  subtitle: 'We\'ll assess your access control needs and recommend the right biometric solution.',
                  prefillMessage: 'Hi, I\'d like a free biometric survey. We need attendance/access control for ___ employees.',
                })}
              >
                Get a Free Survey
              </button>
              <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="bio-btn-secondary">
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="bio-hero-right"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bio-hero-img-wrap">
              <img
                src="https://images.pexels.com/photos/4125683/pexels-photo-4125683.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Biometric fingerprint scanner device"
                className="bio-hero-img"
              />
              <div className="bio-hero-img-overlay" />
              <div className="bio-hero-stat-card">
                <div className="bio-hero-stat-num">500+</div>
                <div className="bio-hero-stat-label">Biometric systems deployed</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Spec strip */}
        <div className="bio-spec-strip">
          {SPECS.map(s => (
            <div key={s.label} className="bio-spec-item">
              <span className="bio-spec-value">{s.value}</span>
              <span className="bio-spec-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SYSTEM TYPES ── */}
      <section className="bio-types">
        <div className="bio-types-inner">
          <div className="bio-section-header">
            <p className="bio-section-label">Biometric range</p>
            <h2 className="bio-section-title">Six systems. Total access control.</h2>
          </div>

          <div className="bio-sys-grid">
            {SYSTEMS.map((sys, i) => (
              <motion.div
                key={sys.id}
                className="bio-sys-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
              >
                <div className="bio-sys-img-wrap">
                  <img src={sys.img} alt={sys.name} className="bio-sys-img" loading="lazy" />
                  <span className="bio-sys-tag">{sys.tag}</span>
                  <span className="bio-sys-badge">{sys.badge}</span>
                </div>
                <div className="bio-sys-body">
                  <h3 className="bio-sys-name">{sys.name}</h3>
                  <p className="bio-sys-desc">{sys.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <LogoBarDark brands={BIOMETRIC_BRANDS} label="Brands we install" />

      {/* ── WHY GOLDMINE ── */}
      <section className="bio-why">
        <div className="bio-why-inner">
          <p className="bio-section-label">Why choose us</p>
          <div className="bio-why-grid">
            {WHY.map((w) => (
              <motion.div
                key={w.num}
                className="bio-why-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span className="bio-why-num">{w.num}</span>
                <h3 className="bio-why-title">{w.title}</h3>
                <p className="bio-why-desc">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bio-cta">
        <div className="bio-cta-inner">
          <div className="bio-cta-left">
            <p className="bio-cta-eyebrow">Upgrade your security</p>
            <h2 className="bio-cta-headline">
              Control who goes where.<br />And when.
            </h2>
            <p className="bio-cta-sub">
              From a single door to a 10-floor building — we design, install and maintain the full system.
            </p>
          </div>
          <div className="bio-cta-right">
            <button
              className="bio-cta-btn-primary"
              onClick={() => openModal({
                badge: 'Biometric Systems',
                badgeColor: 'blue',
                title: 'Get a Free Survey',
                subtitle: 'We\'ll assess your access control needs and recommend the right biometric solution.',
                prefillMessage: 'Hi, I\'d like a free biometric survey. We need attendance/access control for ___ employees.',
              })}
            >
              Get a Free Survey
            </button>
            <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="bio-cta-btn-secondary">
              WhatsApp Us
            </a>
            <p className="bio-cta-note">Response within 2 hours · Free site survey</p>
          </div>
        </div>
      </section>

    </div>
  )
}
