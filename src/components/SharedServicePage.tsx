import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SharedServicePage.css'

gsap.registerPlugin(ScrollTrigger)

export interface SSPHighlight { value: string; label: string }
export interface SSPMetric    { value: string; label: string }
export interface SSPFeature   { num: string; tag: string; title: string; desc: string }
export interface SSPStep      { num: string; title: string; desc: string }

export interface SharedServicePageProps {
  breadcrumb:    string
  headline:      string
  subtext:       string
  highlights:    SSPHighlight[]
  metrics:       SSPMetric[]
  features:      SSPFeature[]
  steps:         SSPStep[]
  ctaHeadline:   string
  ctaSub:        string
  ctaPrimary?:   string
  heroLayout?:   'left' | 'right'
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const itemVariant = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

export default function SharedServicePage({
  breadcrumb,
  headline,
  subtext,
  highlights,
  metrics,
  features,
  steps,
  ctaHeadline,
  ctaSub,
  ctaPrimary = 'Get a Free Quote',
  heroLayout = 'left',
}: SharedServicePageProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [line1, line2] = headline.split('\n')
  const reversed = heroLayout === 'right'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ssp-metric',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.ssp-metrics', start: 'top 84%' } })
      gsap.fromTo('.ssp-feature-row',
        { x: -18, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.08, duration: 0.55, ease: 'power2.out',
          scrollTrigger: { trigger: '.ssp-feature-list', start: 'top 80%' } })
      gsap.fromTo('.ssp-step',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: '.ssp-steps-grid', start: 'top 82%' } })
      gsap.fromTo('.ssp-cta-inner',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '.ssp-cta', start: 'top 86%' } })
    }, rootRef.current!)
    return () => ctx.revert()
  }, [])

  const visualMotion = reversed
    ? { initial: { opacity: 0, x: -28 }, animate: { opacity: 1, x: 0 } }
    : { initial: { opacity: 0, x: 28 },  animate: { opacity: 1, x: 0 } }

  return (
    <div className="ssp-root" ref={rootRef}>

      {/* ─── HERO ─── */}
      <section className="ssp-hero">
        <div className="ssp-hero-grid" aria-hidden />
        <div className={`ssp-hero-inner${reversed ? ' ssp-hero-inner--reversed' : ''}`}>

          {/* Copy */}
          <motion.div className="ssp-hero-copy" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="ssp-breadcrumb" variants={itemVariant}>
              <Link to="/" className="ssp-back">Home</Link>
              <span className="ssp-sep">/</span>
              <span>{breadcrumb}</span>
            </motion.div>
            <motion.h1 className="ssp-headline" variants={itemVariant}>
              {line1}<br />{line2}
            </motion.h1>
            <motion.p className="ssp-sub" variants={itemVariant}>{subtext}</motion.p>
            <motion.div className="ssp-hero-actions" variants={itemVariant}>
              <a href="#contact" className="ssp-btn-primary">{ctaPrimary}</a>
              <a href="tel:+919500036310" className="ssp-btn-secondary">+91 95000 36310</a>
            </motion.div>
          </motion.div>

          {/* Visual — 2×2 stat grid card */}
          <motion.div
            className={`ssp-hero-visual${reversed ? ' ssp-hero-visual--left' : ''}`}
            {...visualMotion}
            transition={{ duration: 0.75, delay: 0.28, ease: 'easeOut' }}
            aria-hidden
          >
            <div className="ssp-stat-card">
              <div className="ssp-stat-grid">
                {highlights.map((h, i) => (
                  <div key={i} className="ssp-stat-tile">
                    <div className="ssp-stat-value">{h.value}</div>
                    <div className="ssp-stat-label">{h.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── METRICS ─── */}
      <div className="ssp-metrics">
        {metrics.map((m, i) => (
          <div key={m.label} className="ssp-metric">
            {i > 0 && <div className="ssp-metric-divider" />}
            <div className="ssp-metric-value">{m.value}</div>
            <div className="ssp-metric-label">{m.label}</div>
          </div>
        ))}
      </div>

      {/* ─── FEATURES ─── */}
      <section className="ssp-features">
        <div className="ssp-features-inner">
          <p className="ssp-section-label">What's included</p>
          <div className="ssp-feature-list">
            {features.map((f) => (
              <div key={f.num} className="ssp-feature-row">
                <span className="ssp-feature-num">{f.num}</span>
                <div className="ssp-feature-body">
                  <div className="ssp-feature-header">
                    <h3 className="ssp-feature-title">{f.title}</h3>
                    <span className="ssp-feature-tag">{f.tag}</span>
                  </div>
                  <p className="ssp-feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STEPS ─── */}
      <section className="ssp-steps">
        <div className="ssp-steps-inner">
          <p className="ssp-section-label">How it works</p>
          <div className="ssp-steps-grid">
            {steps.map((s) => (
              <div key={s.num} className="ssp-step">
                <div className="ssp-step-num">{s.num}</div>
                <h3 className="ssp-step-title">{s.title}</h3>
                <p className="ssp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="ssp-cta">
        <div className="ssp-cta-inner">
          <p className="ssp-cta-eyebrow">Ready to get started?</p>
          <h2 className="ssp-cta-headline">{ctaHeadline}</h2>
          <p className="ssp-cta-sub">{ctaSub}</p>
          <a href="tel:+919500036310" className="ssp-cta-btn">Call us now →</a>
        </div>
      </section>

    </div>
  )
}
