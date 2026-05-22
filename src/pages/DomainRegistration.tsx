import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './DomainRegistrationPage.css'

gsap.registerPlugin(ScrollTrigger)

const DOMAIN_ROWS = [
  { tld: '.com',   status: 'available' },
  { tld: '.in',    status: 'available' },
  { tld: '.net',   status: 'taken'     },
  { tld: '.org',   status: 'available' },
  { tld: '.co.in', status: 'available' },
  { tld: '.io',    status: 'available' },
  { tld: '.tech',  status: 'taken'     },
]

const FEATURES = [
  { num: '01', tag: '100+ TLDs',      title: 'All Major Extensions',      desc: 'Register .com, .in, .net, .org, .co.in and 100+ more under one account. Competitive pricing with no hidden renewal fees.' },
  { num: '02', tag: 'WHOIS Shield',   title: 'Domain Privacy Protection', desc: 'Your personal contact details stay hidden from public WHOIS databases — no spam, no cold calls from domain scrapers.' },
  { num: '03', tag: 'Zero Downtime',  title: 'Easy Transfer & Renewal',   desc: 'Seamless transfers from any registrar with full auth-code support. Automated reminders ensure you never miss a renewal.' },
  { num: '04', tag: 'Full Control',   title: 'Free DNS Management',       desc: 'Complete DNS control panel — A, MX, CNAME, TXT, and SPF records. Point your domain anywhere in minutes.' },
  { num: '05', tag: '< 5 Minutes',    title: 'Instant Activation',        desc: 'Domain goes live within minutes of registration. No delays, no paperwork — just a confirmation and you\'re live.' },
  { num: '06', tag: 'Always Secure',  title: 'Domain Lock',               desc: 'Registrar lock is enabled by default, blocking unauthorised transfers. Your domain stays yours until you decide otherwise.' },
]

const STEPS = [
  { num: '01', title: 'Search',   desc: 'Check availability across 100+ TLD extensions instantly.' },
  { num: '02', title: 'Register', desc: 'Complete registration in under five minutes. No paperwork.' },
  { num: '03', title: 'Go Live',  desc: 'Your domain activates immediately. DNS propagates within minutes.' },
]

const METRICS = [
  { value: '100+',    label: 'TLD Extensions'  },
  { value: '< 5 min', label: 'Activation Time' },
  { value: '24 / 7',  label: 'DNS Uptime SLA'  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariant = {
  hidden:   { opacity: 0, y: 18 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

export default function DomainRegistration() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dr-metric',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.dr-metrics', start: 'top 84%' } }
      )

      gsap.fromTo(
        '.dr-feature-row',
        { x: -18, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.55, ease: 'power2.out',
          scrollTrigger: { trigger: '.dr-feature-list', start: 'top 80%' } }
      )

      gsap.fromTo(
        '.dr-step',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: '.dr-steps-grid', start: 'top 82%' } }
      )

      gsap.fromTo(
        '.dr-cta-inner',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '.dr-cta', start: 'top 86%' } }
      )
    }, rootRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <div className="dr-root" ref={rootRef}>

      {/* ─── HERO ─── */}
      <section className="dr-hero">
        <div className="dr-hero-grid" aria-hidden />

        <div className="dr-hero-inner">
          {/* Left — copy */}
          <motion.div
            className="dr-hero-copy"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="dr-breadcrumb" variants={itemVariant}>
              <Link to="/" className="dr-back">Home</Link>
              <span className="dr-sep">/</span>
              <span>Domain Registration</span>
            </motion.div>

            <motion.h1 className="dr-headline" variants={itemVariant}>
              Own your name<br />on the internet.
            </motion.h1>

            <motion.p className="dr-sub" variants={itemVariant}>
              Domain registration, privacy protection, and DNS management —
              delivered in minutes, managed for years.
            </motion.p>

            <motion.div className="dr-hero-actions" variants={itemVariant}>
              <a href="#contact" className="dr-btn-primary">Get a Free Quote</a>
              <a href="tel:+919500036310" className="dr-btn-secondary">+91 95000 36310</a>
            </motion.div>
          </motion.div>

          {/* Right — domain availability card */}
          <motion.div
            className="dr-hero-visual"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: 'easeOut' }}
            aria-hidden
          >
            <div className="dr-domain-card">
              <div className="dr-domain-card-header">
                <span className="dr-domain-query">yourbrand</span>
                <span className="dr-domain-searching">checking availability</span>
              </div>

              <div className="dr-domain-card-body">
                {DOMAIN_ROWS.map((row, i) => (
                  <div
                    key={row.tld}
                    className="dr-domain-row"
                    style={{ animationDelay: `${0.45 + i * 0.11}s` }}
                  >
                    <span className="dr-domain-name">
                      yourbrand<span className="dr-domain-tld">{row.tld}</span>
                    </span>
                    <span className={`dr-domain-badge dr-domain-badge--${row.status}`}>
                      {row.status === 'available' ? 'Available' : 'Taken'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── METRICS ─── */}
      <div className="dr-metrics">
        {METRICS.map((m, i) => (
          <div key={m.label} className="dr-metric">
            {i > 0 && <div className="dr-metric-divider" />}
            <div className="dr-metric-value">{m.value}</div>
            <div className="dr-metric-label">{m.label}</div>
          </div>
        ))}
      </div>

      {/* ─── FEATURES ─── */}
      <section className="dr-features">
        <div className="dr-features-inner">
          <p className="dr-section-label">What's included</p>

          <div className="dr-feature-list">
            {FEATURES.map((f) => (
              <div key={f.num} className="dr-feature-row">
                <span className="dr-feature-num">{f.num}</span>
                <div className="dr-feature-body">
                  <div className="dr-feature-header">
                    <h3 className="dr-feature-title">{f.title}</h3>
                    <span className="dr-feature-tag">{f.tag}</span>
                  </div>
                  <p className="dr-feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="dr-steps">
        <div className="dr-steps-inner">
          <p className="dr-section-label">How it works</p>

          <div className="dr-steps-grid">
            {STEPS.map((s) => (
              <div key={s.num} className="dr-step">
                <div className="dr-step-num">{s.num}</div>
                <h3 className="dr-step-title">{s.title}</h3>
                <p className="dr-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="dr-cta">
        <div className="dr-cta-inner">
          <p className="dr-cta-eyebrow">Ready to register?</p>
          <h2 className="dr-cta-headline">Secure your domain today.</h2>
          <p className="dr-cta-sub">
            Our team handles the setup end-to-end — registration, DNS, privacy, and beyond.
          </p>
          <a href="tel:+919500036310" className="dr-cta-btn">Call us now →</a>
        </div>
      </section>

    </div>
  )
}
