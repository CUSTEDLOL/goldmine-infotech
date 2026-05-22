import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './CCTVCamerasPage.css'

const CAMERAS = [
  {
    id: 'hd',
    name: 'HD Cameras',
    resolution: '1080p / 2MP',
    tag: 'Most Installed',
    desc: 'Crystal-clear 1080p footage for homes, offices, and retail. Day and night coverage with wide-angle lenses.',
    img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 'ip',
    name: 'IP Cameras',
    resolution: '4MP–8MP / 4K',
    tag: 'Enterprise Grade',
    desc: 'Network-based cameras with remote access, cloud storage, and AI-powered motion detection.',
    img: 'https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?auto=format&fit=crop&w=600&q=85',
  },
  {
    id: 'wifi',
    name: 'WiFi Cameras',
    resolution: '1080p',
    tag: 'Easy Setup',
    desc: 'Wireless installation, mobile-app viewing, and two-way audio. No cable runs required.',
    img: 'https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
  },
  {
    id: 'dome',
    name: 'Dome Cameras',
    resolution: '2MP–4MP',
    tag: 'Vandal-Proof',
    desc: 'Tamper-resistant ceiling mount. Discreet design for indoor lobbies, corridors, and retail floors.',
    img: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
  },
  {
    id: 'bullet',
    name: 'Bullet Cameras',
    resolution: '2MP–5MP',
    tag: 'Long Range',
    desc: 'Visible deterrent with long-range focus. Ideal for perimeters, gates, and outdoor coverage.',
    img: 'https://images.pexels.com/photos/3862627/pexels-photo-3862627.jpeg?auto=compress&cs=tinysrgb&w=600&q=85',
  },
  {
    id: 'ptz',
    name: 'PTZ Cameras',
    resolution: '2MP–4K',
    tag: 'Full Control',
    desc: 'Pan, tilt, zoom — remotely controlled. One camera covers what six fixed cameras cannot.',
    img: 'https://images.unsplash.com/photo-1609429019995-8c40f49535a5?auto=format&fit=crop&w=600&q=85',
  },
]

const SPECS = [
  { value: 'Up to 8MP', label: 'Resolution' },
  { value: '0.001 lux', label: 'Night Vision' },
  { value: '100m IR', label: 'Range' },
  { value: '30 fps', label: 'Frame Rate' },
]

const BRANDS = ['Hikvision', 'Dahua', 'CP Plus', 'Bosch', 'Honeywell', 'Axis', 'Hanwha']

const WHY = [
  {
    num: '01',
    title: 'Free site survey',
    desc: 'We visit your premises, map blind spots, and recommend the exact camera count and placement — at no cost.',
  },
  {
    num: '02',
    title: 'End-to-end installation',
    desc: 'Cabling, mounting, NVR/DVR setup, and app configuration. We hand over a working system on day one.',
  },
  {
    num: '03',
    title: 'Post-installation support',
    desc: 'Remote diagnostics, on-site maintenance visits, and replacement — all covered under our AMC plans.',
  },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const rise = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } } }

export default function CCTVCamerasPage() {
  return (
    <div className="cctv-root">

      {/* ── HERO ── */}
      <section className="cctv-hero">
        <div className="cctv-hero-inner">
          <motion.div className="cctv-hero-left" variants={stagger} initial="hidden" animate="visible">
            <motion.div className="cctv-breadcrumb" variants={rise}>
              <Link to="/" className="cctv-bc-link">Home</Link>
              <span className="cctv-bc-sep">/</span>
              <Link to="/security" className="cctv-bc-link">Security</Link>
              <span className="cctv-bc-sep">/</span>
              <span>CCTV Cameras</span>
            </motion.div>

            <motion.p className="cctv-eyebrow" variants={rise}>
              Professional Surveillance · Chennai
            </motion.p>

            <motion.h1 className="cctv-headline" variants={rise}>
              Every angle.<br />
              <span className="cctv-headline-thin">Always watching.</span>
            </motion.h1>

            <motion.p className="cctv-sub" variants={rise}>
              HD, IP, WiFi, Dome, Bullet and PTZ cameras — surveyed, supplied,
              installed and maintained by our certified team across Chennai.
            </motion.p>

            <motion.div className="cctv-hero-ctas" variants={rise}>
              <a href="tel:+919500036310" className="cctv-btn-primary">Get a Free Survey</a>
              <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="cctv-btn-secondary">
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="cctv-hero-right"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cctv-hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=85"
                alt="CCTV surveillance camera"
                className="cctv-hero-img"
              />
              <div className="cctv-hero-img-overlay" />
              {/* Floating stat card */}
              <div className="cctv-hero-stat-card">
                <div className="cctv-hero-stat-num">1,000+</div>
                <div className="cctv-hero-stat-label">Cameras installed in Chennai</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Spec strip pinned to hero bottom */}
        <div className="cctv-spec-strip">
          {SPECS.map(s => (
            <div key={s.label} className="cctv-spec-item">
              <span className="cctv-spec-value">{s.value}</span>
              <span className="cctv-spec-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CAMERA TYPES ── */}
      <section className="cctv-types">
        <div className="cctv-types-inner">
          <div className="cctv-section-header">
            <p className="cctv-section-label">Camera range</p>
            <h2 className="cctv-section-title">Six types. Every scenario covered.</h2>
          </div>

          <div className="cctv-cam-grid">
            {CAMERAS.map((cam, i) => (
              <motion.div
                key={cam.id}
                className="cctv-cam-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
              >
                <div className="cctv-cam-img-wrap">
                  <img src={cam.img} alt={cam.name} className="cctv-cam-img" loading="lazy" />
                  <span className="cctv-cam-tag">{cam.tag}</span>
                  <span className="cctv-cam-res">{cam.resolution}</span>
                </div>
                <div className="cctv-cam-body">
                  <h3 className="cctv-cam-name">{cam.name}</h3>
                  <p className="cctv-cam-desc">{cam.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <div className="cctv-brands">
        <p className="cctv-brands-label">Brands we install</p>
        <div className="cctv-brands-row">
          {BRANDS.map(b => <span key={b} className="cctv-brand">{b}</span>)}
        </div>
      </div>

      {/* ── WHY GOLDMINE ── */}
      <section className="cctv-why">
        <div className="cctv-why-inner">
          <p className="cctv-section-label">Why choose us</p>
          <div className="cctv-why-grid">
            {WHY.map((w) => (
              <motion.div
                key={w.num}
                className="cctv-why-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span className="cctv-why-num">{w.num}</span>
                <h3 className="cctv-why-title">{w.title}</h3>
                <p className="cctv-why-desc">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cctv-cta">
        <div className="cctv-cta-inner">
          <div className="cctv-cta-left">
            <p className="cctv-cta-eyebrow">Start with a free survey</p>
            <h2 className="cctv-cta-headline">
              Know your blind spots<br />before someone else does.
            </h2>
            <p className="cctv-cta-sub">
              We visit, assess, and recommend — free of charge. No obligation, no pressure.
            </p>
          </div>
          <div className="cctv-cta-right">
            <a href="tel:+919500036310" className="cctv-cta-btn-primary">+91 95000 36310</a>
            <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="cctv-cta-btn-secondary">
              WhatsApp Us
            </a>
            <p className="cctv-cta-note">Response within 2 hours · Free site survey</p>
          </div>
        </div>
      </section>

    </div>
  )
}
