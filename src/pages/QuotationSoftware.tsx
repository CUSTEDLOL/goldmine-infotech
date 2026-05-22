import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './QuotationSoftware.css'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    num: '01',
    title: 'Custom Templates',
    desc: 'Build quotes from your own templates — logos, terms, product catalogue, and pricing all pre-loaded.',
  },
  {
    num: '02',
    title: 'PDF & WhatsApp Share',
    desc: 'One-click professional PDF generation. Share directly via WhatsApp or email with a client link.',
  },
  {
    num: '03',
    title: 'Digital Approval',
    desc: 'Clients approve quotes online with a signature. You get notified the moment it is signed.',
  },
  {
    num: '04',
    title: 'CRM Integration',
    desc: 'Quotes sync with your customer records — track open quotes, follow-up dates, and conversion rates.',
  },
]

export default function QuotationSoftware() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.qts-stat',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.qts-stats', start: 'top 82%' },
        }
      )

      gsap.utils.toArray<HTMLElement>('.qts-feature-cell').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            delay: i * 0.07,
            scrollTrigger: { trigger: '.qts-features-grid', start: 'top 80%' },
          }
        )
      })

      gsap.fromTo(
        '.qts-cta-content',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.qts-cta', start: 'top 85%' },
        }
      )
    }, rootRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <div className="qts-root" ref={rootRef}>

      {/* ─── HERO ─── */}
      <section className="qts-hero">

        {/* Left — dark panel */}
        <div className="qts-hero-left">
          <div className="qts-hero-left-inner">
            <motion.div className="qts-breadcrumb" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link to="/" className="qts-bc-link">Home</Link>
              <span className="qts-bc-sep">/</span>
              <span className="qts-bc-seg">Software</span>
              <span className="qts-bc-sep">/</span>
              <span className="qts-bc-seg">Quotation Software</span>
            </motion.div>

            <motion.h1 className="qts-headline" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}>
              Quote fast.<br />
              <span className="qts-headline-accent">Close faster.</span>
            </motion.h1>

            <motion.p className="qts-sub" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}>
              PDF generation, client portals, and digital signatures — built for Indian businesses.
            </motion.p>

            <motion.div className="qts-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}>
              <a href="tel:+919500036310" className="qts-btn-primary">Request Demo</a>
              <a href="tel:+919500036310" className="qts-btn-ghost">+91 95000 36310</a>
            </motion.div>

            {/* Quote document — now left-aligned inside dark panel */}
            <motion.div className="qts-doc-wrap" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.4 }} aria-hidden>
              <div className="qts-doc">
                <div className="qts-doc-header">
                  <span className="qts-doc-tag">QUOTATION</span>
                  <span className="qts-doc-num">#QT-2025-0847</span>
                </div>
                <div className="qts-doc-divider" />
                <div className="qts-doc-meta">
                  <div className="qts-doc-meta-row"><span className="qts-doc-meta-line qts-doc-meta-line--lg" /><span className="qts-doc-meta-line qts-doc-meta-line--sm" /></div>
                  <div className="qts-doc-meta-row"><span className="qts-doc-meta-line qts-doc-meta-line--md" /><span className="qts-doc-meta-line qts-doc-meta-line--xs" /></div>
                </div>
                <div className="qts-doc-items">
                  <div className="qts-doc-item-head"><span className="qts-doc-col-desc" /><span className="qts-doc-col-qty" /><span className="qts-doc-col-price" /></div>
                  {[{price:'₹12,500'},{price:'₹8,000'},{price:'₹4,750'}].map((item, i) => (
                    <div key={i} className="qts-doc-item-row">
                      <span className="qts-doc-line qts-doc-line--desc" />
                      <span className="qts-doc-line qts-doc-line--qty" />
                      <span className="qts-doc-price">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="qts-doc-totals">
                  <div className="qts-total-row"><span className="qts-total-label">Subtotal</span><span className="qts-total-val">₹25,250</span></div>
                  <div className="qts-total-row"><span className="qts-total-label">GST (18%)</span><span className="qts-total-val">₹4,545</span></div>
                  <div className="qts-total-row qts-total-row--grand"><span className="qts-total-label-bold">Total</span><span className="qts-total-val-bold">₹29,795</span></div>
                </div>
                <div className="qts-doc-stamp">APPROVED</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right — business photo */}
        <motion.div
          className="qts-hero-right"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          aria-hidden
        >
          <img
            src="https://images.pexels.com/photos/5324856/pexels-photo-5324856.jpeg?auto=compress&cs=tinysrgb&w=1200&q=85"
            alt=""
            className="qts-hero-photo"
          />
          <div className="qts-hero-photo-overlay" />
        </motion.div>

      </section>

      {/* ─── STATS ─── */}
      <section className="qts-stats">
        {[
          { num: '10,000+', label: 'Quotes' },
          { num: '3x',      label: 'Faster Close' },
          { num: '100%',    label: 'Digital' },
        ].map((s) => (
          <div key={s.label} className="qts-stat">
            <div className="qts-stat-num">{s.num}</div>
            <div className="qts-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ─── FEATURES — 2×2 grid ─── */}
      <section className="qts-features">
        <div className="qts-features-inner">
          <div className="qts-features-grid">
            {FEATURES.map((f) => (
              <div key={f.num} className="qts-feature-cell">
                <span className="qts-feature-num">{f.num}</span>
                <h2 className="qts-feature-title">{f.title}</h2>
                <p className="qts-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA — minimal, white ─── */}
      <section className="qts-cta">
        <div className="qts-cta-content">
          <h2 className="qts-cta-headline">Start quoting in under an hour.</h2>
          <a href="tel:+919500036310" className="qts-cta-btn">Get Started</a>
        </div>
      </section>

    </div>
  )
}
