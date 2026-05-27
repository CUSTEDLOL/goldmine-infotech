import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContactModal } from '../context/ContactModalContext'
import './BillingInvoicing.css'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    num: '01',
    title: 'Auto Invoice Generation',
    desc: 'Create GST-compliant invoices in seconds. Party name, items, tax, and totals — all auto-filled from your records.',
  },
  {
    num: '02',
    title: 'Payment Tracking',
    desc: 'Know exactly who has paid, who has not, and who is overdue. Send reminders in one click.',
  },
  {
    num: '03',
    title: 'Recurring Billing',
    desc: 'Set up subscription billing, EMI schedules, or retainer invoices. Run once, collect automatically.',
  },
  {
    num: '04',
    title: 'Reports & Reconciliation',
    desc: 'Daily collection reports, outstanding statements, and GST returns — ready any time.',
  },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const rise = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function BillingInvoicing() {
  const rootRef = useRef<HTMLDivElement>(null)
  const { openModal } = useContactModal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats strip
      gsap.fromTo(
        '.bil-stat',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.bil-stats', start: 'top 83%' },
        }
      )

      // Feature cells stagger
      gsap.fromTo(
        '.bil-feature-cell',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.bil-features-grid', start: 'top 78%' },
        }
      )

      // CTA
      gsap.fromTo(
        '.bil-cta-inner',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.bil-cta', start: 'top 86%' },
        }
      )

      // Section header
      gsap.fromTo(
        '.bil-features-header',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.bil-features-section', start: 'top 82%' },
        }
      )
    }, rootRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bil-root" ref={rootRef}>

      {/* ─── HERO — Full-bleed photo background ─── */}
      <section className="bil-hero">
        {/* Background photo layer */}
        <div className="bil-hero-bg" aria-hidden>
          <img
            src="https://images.unsplash.com/photo-1735825764485-93a381fd5779?auto=format&fit=crop&w=1600&q=85"
            alt=""
            className="bil-hero-bg-img"
          />
          <div className="bil-hero-bg-overlay" />
        </div>

        {/* Hero content */}
        <div className="bil-hero-inner">

          {/* Left copy */}
          <motion.div
            className="bil-hero-copy"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="bil-breadcrumb" variants={rise}>
              <Link to="/" className="bil-bc-link">Home</Link>
              <span className="bil-bc-sep">/</span>
              <span className="bil-bc-seg">Software</span>
              <span className="bil-bc-sep">/</span>
              <span className="bil-bc-seg">Billing &amp; Invoicing</span>
            </motion.div>

            <motion.h1 className="bil-headline" variants={rise}>
              Billing that<br />runs itself.
            </motion.h1>

            <motion.p className="bil-sub" variants={rise}>
              GST-compliant invoices, automated payment collection, recurring billing, and real-time reconciliation — all in one platform built for Indian businesses.
            </motion.p>

            <motion.div className="bil-actions" variants={rise}>
              <button
                className="bil-btn-primary"
                onClick={() => openModal({
                  badge: 'Billing & Invoicing',
                  badgeColor: 'blue',
                  title: 'Get a Free Demo',
                  subtitle: 'See how our billing software handles GST invoices, payment tracking, and reports.',
                  prefillMessage: 'Hi, I\'d like a free demo of the Billing & Invoicing software.',
                })}
              >Get a Free Demo</button>
              <a href="tel:+919500036310" className="bil-btn-ghost">+91 95000 36310</a>
            </motion.div>
          </motion.div>

          {/* Right — CSS-only invoice card mockup */}
          <motion.div
            className="bil-hero-visual"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            aria-hidden
          >
            <div className="bil-invoice-card">
              {/* Card header */}
              <div className="bil-invoice-header">
                <div className="bil-invoice-header-left">
                  <span className="bil-invoice-label">INVOICE</span>
                  <span className="bil-invoice-id">#INV-2025-0847</span>
                </div>
                <div className="bil-invoice-header-right">
                  <span className="bil-invoice-date-label">Date</span>
                  <span className="bil-invoice-date">20 May 2025</span>
                </div>
              </div>

              {/* Party info */}
              <div className="bil-invoice-party">
                <div className="bil-invoice-to-label">Bill To</div>
                <div className="bil-invoice-party-name">Rajesh Industries Pvt. Ltd.</div>
                <div className="bil-invoice-party-gstin">GSTIN: 29AABCR1234D1Z5</div>
              </div>

              {/* Line items */}
              <div className="bil-invoice-items-header">
                <span>Description</span>
                <span>Qty</span>
                <span>Amount</span>
              </div>

              {[
                { desc: 'Annual Software License',  qty: '1',  amt: '₹48,000' },
                { desc: 'Implementation Support',   qty: '1',  amt: '₹12,000' },
                { desc: 'GST Training Module',      qty: '3',  amt: '₹9,000'  },
              ].map((item, i) => (
                <div key={i} className="bil-invoice-item-row">
                  <span className="bil-invoice-item-desc">{item.desc}</span>
                  <span className="bil-invoice-item-qty">{item.qty}</span>
                  <span className="bil-invoice-item-amt">{item.amt}</span>
                </div>
              ))}

              {/* Divider */}
              <div className="bil-invoice-divider" />

              {/* Tax + Total */}
              <div className="bil-invoice-tax-row">
                <span>GST 18%</span>
                <span>₹12,420</span>
              </div>
              <div className="bil-invoice-total-row">
                <span>Total Due</span>
                <span className="bil-invoice-total-amt">₹81,420</span>
              </div>

              {/* Footer */}
              <div className="bil-invoice-footer">
                <span className="bil-invoice-badge">SENT</span>
                <span className="bil-invoice-due">Due: 30 May 2025</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bil-stats">
        {[
          { num: '₹100 Cr+',  label: 'Invoiced to Date'   },
          { num: '< 2 min',   label: 'Per Invoice'         },
          { num: '100%',      label: 'GST Compliant'       },
        ].map((s) => (
          <div key={s.label} className="bil-stat">
            <div className="bil-stat-num">{s.num}</div>
            <div className="bil-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ─── FEATURES 2×2 GRID ─── */}
      <section className="bil-features-section">
        <div className="bil-features-inner">
          <div className="bil-features-header">
            <span className="bil-features-eyebrow">What it does</span>
            <h2 className="bil-features-title">Everything billing needs to cover.</h2>
            <p className="bil-features-sub">
              From the first invoice to year-end reconciliation, every step is handled — so your team can focus on growing.
            </p>
          </div>

          <div className="bil-features-grid">
            {FEATURES.map((f) => (
              <div key={f.num} className="bil-feature-cell">
                <div className="bil-feature-cell-num">{f.num}</div>
                <h3 className="bil-feature-cell-title">{f.title}</h3>
                <p className="bil-feature-cell-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section className="bil-trust">
        <div className="bil-trust-inner">
          {[
            { num: '5,000+',   label: 'Invoices Generated Monthly' },
            { num: '99.9%',    label: 'Platform Uptime'            },
            { num: '48 hrs',   label: 'Setup & Go Live'            },
            { num: 'Zero',     label: 'Data Entry Required'        },
          ].map((t) => (
            <div key={t.label} className="bil-trust-item">
              <div className="bil-trust-num">{t.num}</div>
              <div className="bil-trust-label">{t.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA — Orange pop moment ─── */}
      <section className="bil-cta">
        <div className="bil-cta-inner">
          <h2 className="bil-cta-headline">Automate your billing today.</h2>
          <p className="bil-cta-sub">
            Our team configures your invoicing workflow from scratch. Go live in 48 hours — no tech team needed.
          </p>
          <button
            className="bil-cta-btn"
            onClick={() => openModal({
              badge: 'Billing & Invoicing',
              badgeColor: 'blue',
              title: 'Get a Free Demo',
              subtitle: 'See how our billing software handles GST invoices, payment tracking, and reports.',
              prefillMessage: 'Hi, I\'d like a free demo of the Billing & Invoicing software.',
            })}
          >Book a Free Setup Call</button>
        </div>
      </section>

    </div>
  )
}
