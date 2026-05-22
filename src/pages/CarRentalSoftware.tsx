import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CarRentalSoftware.css'

gsap.registerPlugin(ScrollTrigger)

const FLEET_GRID = [
  [true,  false, true,  true,  false, true ],
  [false, false, true,  false, true,  false],
  [true,  true,  false, false, true,  true ],
]

const FEATURES = [
  {
    num: '01',
    title: 'Fleet Management',
    desc: 'Real-time vehicle availability across your entire fleet. Assign drivers, track usage, and set maintenance schedules.',
  },
  {
    num: '02',
    title: 'Smart Booking',
    desc: 'Online and offline bookings with instant confirmation, PDF receipts, and automated reminders.',
  },
  {
    num: '03',
    title: 'Billing & Reports',
    desc: 'GST invoices, daily revenue reports, driver-wise earnings, and vehicle-wise profitability.',
  },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

export default function CarRentalSoftware() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.crs-stat',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.crs-stats', start: 'top 82%' },
        }
      )

      gsap.utils.toArray<HTMLElement>('.crs-feature-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: '.crs-features-row', start: 'top 80%' },
          }
        )
      })

      gsap.fromTo(
        '.crs-fleet-grid',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.crs-fleet-section', start: 'top 82%' },
        }
      )

      gsap.fromTo(
        '.crs-cta-inner',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.crs-cta', start: 'top 85%' },
        }
      )
    }, rootRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <div className="crs-root" ref={rootRef}>

      {/* ─── HERO ─── */}
      <section className="crs-hero">
        <div className="crs-hero-photo-bg" aria-hidden>
          <img
            src="https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&w=1400&q=85"
            alt=""
            className="crs-hero-photo-img"
          />
          <div className="crs-hero-photo-overlay" />
        </div>
        <div className="crs-hero-inner">

          <motion.div
            className="crs-hero-copy"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="crs-breadcrumb" variants={rise}>
              <Link to="/" className="crs-bc-link">Home</Link>
              <span className="crs-bc-sep">/</span>
              <span className="crs-bc-seg">Software</span>
              <span className="crs-bc-sep">/</span>
              <span className="crs-bc-seg">Car Rental Software</span>
            </motion.div>

            <motion.h1 className="crs-headline" variants={rise}>
              Fleet management<br />
              that drives growth.
            </motion.h1>

            <motion.p className="crs-sub" variants={rise}>
              Bookings, billing, driver management, and GPS tracking — one platform for your entire rental business.
            </motion.p>

            <motion.div className="crs-actions" variants={rise}>
              <a href="tel:+919500036310" className="crs-btn-primary">Request Demo</a>
              <a href="tel:+919500036310" className="crs-btn-ghost">+91 95000 36310</a>
            </motion.div>
          </motion.div>

          {/* Booking form mockup */}
          <motion.div
            className="crs-hero-visual"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3, ease: 'easeOut' }}
            aria-hidden
          >
            <div className="crs-booking-card">
              <div className="crs-card-header">
                <span className="crs-card-title">New Booking</span>
              </div>
              <div className="crs-card-body">
                <div className="crs-form-row">
                  <span className="crs-form-label">Customer</span>
                  <span className="crs-form-value crs-form-value--long" />
                </div>
                <div className="crs-form-row">
                  <span className="crs-form-label">Pick-up Date</span>
                  <span className="crs-form-value crs-form-value--med" />
                </div>
                <div className="crs-form-row">
                  <span className="crs-form-label">Return Date</span>
                  <span className="crs-form-value crs-form-value--med" />
                </div>
                <div className="crs-form-row">
                  <span className="crs-form-label">Vehicle</span>
                  <span className="crs-form-value-text">Sedan</span>
                </div>
              </div>
              <div className="crs-card-footer">
                <button className="crs-avail-btn">Check Availability →</button>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="crs-stats">
        {[
          { num: '200+',       label: 'Vehicles' },
          { num: '5,000+',     label: 'Trips' },
          { num: '₹2 Cr+',    label: 'Revenue Tracked' },
        ].map((s) => (
          <div key={s.label} className="crs-stat">
            <div className="crs-stat-num">{s.num}</div>
            <div className="crs-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ─── FEATURES ─── */}
      <section className="crs-features">
        <div className="crs-features-inner">
          <div className="crs-features-row">
            {FEATURES.map((f) => (
              <div key={f.num} className="crs-feature-card">
                <div className="crs-feature-num">{f.num}</div>
                <h2 className="crs-feature-title">{f.title}</h2>
                <p className="crs-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FLEET GRID VISUAL ─── */}
      <section className="crs-fleet-section">
        <div className="crs-fleet-car-banner" aria-hidden>
          <img
            src="https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80"
            alt="Rental fleet vehicle"
            className="crs-fleet-car-img"
            loading="lazy"
          />
          <div className="crs-fleet-car-overlay" />
        </div>
        <div className="crs-fleet-inner">
          <div className="crs-fleet-header">
            <span className="crs-fleet-label">Fleet Availability — Live View</span>
            <div className="crs-fleet-legend">
              <span className="crs-legend-item crs-legend-booked">Booked</span>
              <span className="crs-legend-item crs-legend-avail">Available</span>
            </div>
          </div>
          <div className="crs-fleet-grid" aria-hidden>
            {FLEET_GRID.map((row, ri) => (
              <div key={ri} className="crs-fleet-row">
                {row.map((booked, ci) => (
                  <div
                    key={ci}
                    className={`crs-fleet-slot${booked ? ' crs-fleet-slot--booked' : ' crs-fleet-slot--avail'}`}
                  />
                ))}
              </div>
            ))}
            <div className="crs-fleet-labels">
              {['V-01','V-02','V-03','V-04','V-05','V-06'].map((v) => (
                <span key={v} className="crs-fleet-vehicle-label">{v}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="crs-cta">
        <div className="crs-cta-inner">
          <h2 className="crs-cta-headline">Get your fleet online in 48 hours.</h2>
          <p className="crs-cta-sub">
            We configure the software around your fleet — vehicles, pricing, and billing ready from day one.
          </p>
          <a href="tel:+919500036310" className="crs-cta-btn">Book a Setup Call</a>
        </div>
      </section>

    </div>
  )
}
