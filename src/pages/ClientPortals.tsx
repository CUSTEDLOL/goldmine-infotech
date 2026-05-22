import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ClientPortals.css'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { num: '100%', label: 'White-Label' },
  { num: 'Zero', label: 'IT Setup' },
  { num: '24/7', label: 'Access' },
  { num: 'All', label: 'Devices' },
]

const FEATURES = [
  {
    num: '01',
    title: 'Branded Client Login',
    desc: 'Your logo, your colours, your domain. Clients log in to a portal that looks like it was built just for them.',
  },
  {
    num: '02',
    title: 'Invoice & Payment Access',
    desc: 'Clients view all their invoices, payment history, and outstanding amounts — no phone calls needed.',
  },
  {
    num: '03',
    title: 'Document Sharing',
    desc: 'Share contracts, reports, and files securely. Clients download what they need, when they need it.',
  },
  {
    num: '04',
    title: 'Real-Time Support',
    desc: 'Built-in messaging and ticket system. Clients raise issues, you resolve them — all tracked and logged.',
  },
]

export default function ClientPortals() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats bar
      gsap.fromTo(
        '.cp-stat',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cp-stats', start: 'top 82%' },
        }
      )

      // Feature bento cells
      gsap.utils.toArray<HTMLElement>('.cp-feature-cell').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            delay: i * 0.07,
            scrollTrigger: { trigger: '.cp-features', start: 'top 80%' },
          }
        )
      })

      // CTA section
      gsap.fromTo(
        '.cp-cta-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.cp-cta', start: 'top 82%' },
        }
      )

      // Portal card float animation
      gsap.to('.cp-portal-card', {
        y: -8,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, rootRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <div className="cp-root" ref={rootRef}>

      {/* ─── HERO ─── */}
      <section className="cp-hero">
        {/* Left dark panel */}
        <div className="cp-hero-left">
          <motion.div
            className="cp-breadcrumb"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Link to="/" className="cp-bc-link">Home</Link>
            <span className="cp-bc-sep">/</span>
            <Link to="/#software" className="cp-bc-link">Software</Link>
            <span className="cp-bc-sep">/</span>
            <span className="cp-bc-current">Client Portals</span>
          </motion.div>

          <motion.h1
            className="cp-headline"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            Your clients.<br />
            Deserve a portal<br />
            <em className="cp-headline-em">this good.</em>
          </motion.h1>

          <motion.p
            className="cp-sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26, ease: 'easeOut' }}
          >
            A fully branded, white-label client portal that your customers can actually use — invoices, documents, support, and payments in one place.
          </motion.p>

          <motion.div
            className="cp-actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <a href="tel:+919500036310" className="cp-btn-primary">Book a Demo</a>
            <a href="tel:+919500036310" className="cp-btn-ghost">See How It Works</a>
          </motion.div>
        </div>

        {/* Right photo panel */}
        <div className="cp-hero-right">
          <div className="cp-hero-photo-wrap">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=85"
              alt="Professional working on client portal dashboard"
              className="cp-hero-photo"
            />
            {/* Left gradient overlay blending into dark panel */}
            <div className="cp-hero-overlay" aria-hidden="true" />
          </div>

          {/* Floating portal card mockup */}
          <motion.div
            className="cp-portal-card"
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            {/* Card header */}
            <div className="cp-portal-card-header">
              <span className="cp-portal-label">CLIENT PORTAL</span>
              <span className="cp-portal-badge">3 new</span>
            </div>

            {/* Welcome text */}
            <p className="cp-portal-welcome">Welcome back, Priya.</p>

            {/* Menu rows */}
            <div className="cp-portal-menu">
              <div className="cp-portal-menu-row">
                <div className="cp-portal-menu-line" />
                <div className="cp-portal-menu-dot" />
              </div>
              <div className="cp-portal-menu-row">
                <div className="cp-portal-menu-line" />
                <div className="cp-portal-menu-dot" />
              </div>
              <div className="cp-portal-menu-row">
                <div className="cp-portal-menu-line" />
                <div className="cp-portal-menu-dot" />
              </div>
            </div>

            {/* Update strip */}
            <div className="cp-portal-update">
              3 pending invoices
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="cp-stats">
        {STATS.map((s) => (
          <div key={s.label} className="cp-stat">
            <div className="cp-stat-num">{s.num}</div>
            <div className="cp-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ─── FEATURES BENTO ─── */}
      <section className="cp-features">
        {FEATURES.map((f) => (
          <div key={f.num} className="cp-feature-cell">
            <span className="cp-feature-num">{f.num}</span>
            <h3 className="cp-feature-title">{f.title}</h3>
            <p className="cp-feature-desc">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* ─── CTA ─── */}
      <section className="cp-cta">
        <div className="cp-cta-content">
          <h2 className="cp-cta-headline">
            Give your clients a portal<br />they'll actually use.
          </h2>
          <p className="cp-cta-sub">
            Branded, fast, and built to impress. Your clients deserve better than email threads and shared folders.
          </p>
          <a href="tel:+919500036310" className="cp-cta-btn">Book a Demo</a>
        </div>
      </section>

    </div>
  )
}
