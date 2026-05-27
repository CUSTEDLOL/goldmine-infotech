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
  onCtaPrimary?: () => void
  heroLayout?:   'left' | 'right'
}

const UPTIMES = [100,100,98,100,100,100,92,100,100,96,100,100,100,98,100,100,100]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}
const itemVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
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
  onCtaPrimary,
  heroLayout = 'left',
}: SharedServicePageProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [line1, line2] = headline.split('\n')
  const reversed = heroLayout === 'right'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ssp-fcard',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: '.ssp-feature-cards', start: 'top 82%' } })
      gsap.fromTo('.ssp-metric',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.ssp-metrics', start: 'top 84%' } })
      gsap.fromTo('.ssp-step',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.14, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: '.ssp-steps-track', start: 'top 82%' } })
    }, rootRef.current!)
    return () => ctx.revert()
  }, [])

  const visualAnim = reversed
    ? { initial: { opacity: 0, x: -32 }, animate: { opacity: 1, x: 0 } }
    : { initial: { opacity: 0, x: 32 },  animate: { opacity: 1, x: 0 } }

  return (
    <div className="ssp-root" ref={rootRef}>

      {/* ── HERO ── */}
      <section className="ssp-hero">
        <div className="ssp-hero-grid" aria-hidden />
        <div className="ssp-hero-glow-a" aria-hidden />
        <div className="ssp-hero-glow-b" aria-hidden />

        <div className={`ssp-hero-inner${reversed ? ' ssp-hero-inner--reversed' : ''}`}>

          {/* Copy */}
          <motion.div
            className="ssp-hero-copy"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="ssp-breadcrumb" variants={itemVariant}>
              <Link to="/" className="ssp-back">Home</Link>
              <span className="ssp-sep">/</span>
              <span>{breadcrumb}</span>
            </motion.div>

            <motion.h1 className="ssp-headline" variants={itemVariant}>
              {line1}<br />
              <span className="ssp-headline-dim">{line2}</span>
            </motion.h1>

            <motion.p className="ssp-sub" variants={itemVariant}>{subtext}</motion.p>

            <motion.div className="ssp-hero-actions" variants={itemVariant}>
              <button className="ssp-btn-primary" onClick={onCtaPrimary} type="button">
                {ctaPrimary}
              </button>
              <a href="tel:+919500036310" className="ssp-btn-secondary">+91 95000 36310</a>
            </motion.div>

            <motion.div className="ssp-trust-row" variants={itemVariant}>
              {highlights.map((h) => (
                <span key={h.label} className="ssp-trust-chip">
                  <span className="ssp-trust-tick" />
                  <strong>{h.value}</strong>&nbsp;{h.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="ssp-hero-visual"
            {...visualAnim}
            transition={{ duration: 0.8, delay: 0.22, ease: 'easeOut' }}
            aria-hidden
          >
            <div className="ssp-panel">
              <div className="ssp-panel-bar">
                <div className="ssp-panel-dots">
                  <span className="ssp-dot ssp-dot--red" />
                  <span className="ssp-dot ssp-dot--yellow" />
                  <span className="ssp-dot ssp-dot--green" />
                </div>
                <div className="ssp-panel-status">
                  <span className="ssp-status-pulse" />
                  All services operational
                </div>
                <div className="ssp-panel-crumb">{breadcrumb}</div>
              </div>

              <div className="ssp-panel-kpis">
                {highlights.slice(0, 2).map((h, i) => (
                  <div key={i} className="ssp-pkpi">
                    <div className="ssp-pkpi-val">{h.value}</div>
                    <div className="ssp-pkpi-lbl">{h.label}</div>
                  </div>
                ))}
              </div>

              <div className="ssp-panel-list">
                {highlights.map((h, i) => (
                  <div key={i} className="ssp-panel-row">
                    <div className="ssp-panel-check" />
                    <span className="ssp-panel-row-val">{h.value}</span>
                    <span className="ssp-panel-row-lbl">{h.label}</span>
                  </div>
                ))}
              </div>

              <div className="ssp-panel-chart">
                <span className="ssp-chart-label">Uptime</span>
                <div className="ssp-chart-bars">
                  {UPTIMES.map((v, i) => (
                    <div
                      key={i}
                      className={`ssp-chart-bar${v >= 99 ? '' : ' ssp-chart-bar--low'}`}
                      style={{ height: `${Math.round(v * 0.32)}px` }}
                    />
                  ))}
                </div>
                <span className="ssp-chart-pct">99.9%</span>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* ── METRICS ── */}
      <div className="ssp-metrics">
        {metrics.map((m, i) => (
          <div key={m.label} className="ssp-metric">
            {i > 0 && <div className="ssp-metric-divider" />}
            <div className="ssp-metric-value">{m.value}</div>
            <div className="ssp-metric-label">{m.label}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURES ── */}
      <section className="ssp-features">
        <div className="ssp-features-inner">
          <div className="ssp-section-top">
            <span className="ssp-eyebrow">What's included</span>
            <h2 className="ssp-features-h2">Everything you need, nothing you don't.</h2>
            <p className="ssp-features-sub">
              Every service is handled end-to-end by our team — no outsourcing, no guesswork.
            </p>
          </div>
          <div className="ssp-feature-cards">
            {features.map((f) => (
              <div key={f.num} className="ssp-fcard">
                <div className="ssp-fcard-top">
                  <span className="ssp-fcard-num">{f.num}</span>
                  <span className="ssp-fcard-tag">{f.tag}</span>
                </div>
                <h3 className="ssp-fcard-title">{f.title}</h3>
                <p className="ssp-fcard-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="ssp-steps">
        <div className="ssp-steps-inner">
          <div className="ssp-steps-header">
            <span className="ssp-eyebrow">How it works</span>
            <h2 className="ssp-steps-h2">Up and running, step by step.</h2>
          </div>
          <div className="ssp-steps-track">
            {steps.map((s, i) => (
              <div key={s.num} className="ssp-step">
                <div className="ssp-step-head">
                  <div className="ssp-step-circle">
                    <span>{s.num}</span>
                  </div>
                  {i < steps.length - 1 && <div className="ssp-step-line" />}
                </div>
                <h3 className="ssp-step-title">{s.title}</h3>
                <p className="ssp-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ssp-cta">
        <div className="ssp-cta-glow" aria-hidden />
        <div className="ssp-cta-inner">
          <p className="ssp-cta-eyebrow">Ready to get started?</p>
          <h2 className="ssp-cta-headline">{ctaHeadline}</h2>
          <p className="ssp-cta-sub">{ctaSub}</p>
          <div className="ssp-cta-actions">
            <button className="ssp-cta-btn-primary" onClick={onCtaPrimary} type="button">
              {ctaPrimary}
            </button>
            <a href="tel:+919500036310" className="ssp-cta-btn-ghost">
              +91 95000 36310
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
