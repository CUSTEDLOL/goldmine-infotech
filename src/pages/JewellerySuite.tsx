import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './JewellerySuite.css'

gsap.registerPlugin(ScrollTrigger)

const TICKER = [
  'GST Billing', 'Gold Inventory', 'Customer CRM', 'Hallmarking',
  'Gold Schemes', 'Rate Book', 'Day Book', 'Trial Balance',
  'Loyalty Points', 'Karigar Management', 'Stone Tracking', 'Old Gold Exchange',
]

const FEATURES = [
  {
    id: 'billing', num: '01', theme: 'light' as const,
    title: 'Billing the way jewellers do it.',
    desc: 'GST-compliant invoices with making charges, wastage, stone deductions, and hallmarking details — all auto-filled. Print-ready in seconds.',
  },
  {
    id: 'inventory', num: '02', theme: 'dark' as const,
    title: 'Every gram. Accounted for.',
    desc: 'Track stock by category, weight, purity, and metal rate. Manage karigar-wise stock, set reorder levels, and reconcile daily — no spreadsheet needed.',
  },
  {
    id: 'crm', num: '03', theme: 'light' as const,
    title: 'Know your customer like family.',
    desc: 'Full purchase history, outstanding balances, loyalty points, old gold exchange records, and auto-reminders for birthdays and anniversaries.',
  },
  {
    id: 'reports', num: '04', theme: 'dark' as const,
    title: 'Every number, instantly.',
    desc: 'Day book, purchase register, stock register, GST summary, and P&L — everything your accountant needs, generated in one click.',
  },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const rise = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } } }

export default function JewellerySuite() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.jbs-stat',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.jbs-stats', start: 'top 82%' } })

      gsap.utils.toArray<HTMLElement>('.jbs-feature').forEach((el) => {
        gsap.fromTo(el.querySelector('.jbs-feature-copy'),
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 78%' } })
        gsap.fromTo(el.querySelector('.jbs-feature-visual'),
          { x: 24, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 78%' } })
      })

      gsap.fromTo('.jbs-cta-content',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '.jbs-cta', start: 'top 85%' } })
    }, rootRef.current!)
    return () => ctx.revert()
  }, [])

  return (
    <div className="jbs-root" ref={rootRef}>

      {/* ─── HERO ─── */}
      <section className="jbs-hero">

        {/* Left — dark panel with copy */}
        <div className="jbs-hero-left">
          <motion.div className="jbs-hero-left-inner" variants={stagger} initial="hidden" animate="visible">
            <motion.div className="jbs-eyebrow" variants={rise}>
              <Link to="/" className="jbs-back">Home</Link>
              <span className="jbs-sep">/</span>
              <span>Software</span>
              <span className="jbs-sep">/</span>
              <span>Jewellery Suite</span>
            </motion.div>

            <motion.h1 className="jbs-headline" variants={rise}>
              The software<br />
              jewellers<br />
              <span className="jbs-headline-accent">rely on.</span>
            </motion.h1>

            <motion.p className="jbs-sub" variants={rise}>
              Billing, inventory, CRM, and accounts — built specifically for India's gold, silver, and diamond trade.
            </motion.p>

            <motion.div className="jbs-actions" variants={rise}>
              <a href="tel:+919500036310" className="jbs-btn-primary">Request a Demo</a>
              <a href="tel:+919500036310" className="jbs-btn-ghost">+91 95000 36310</a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right — jewellery photo with floating dashboard */}
        <div className="jbs-hero-right">
          <img
            src="https://images.pexels.com/photos/10944923/pexels-photo-10944923.jpeg?auto=compress&cs=tinysrgb&w=900&q=85"
            alt=""
            className="jbs-hero-photo"
            aria-hidden
          />
          <div className="jbs-hero-photo-overlay" aria-hidden />

          <motion.div
            className="jbs-hero-dashboard-wrap"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease: 'easeOut' }}
            aria-hidden
          >
            <div className="jbs-mockup">
              <div className="jbs-mockup-bar">
                <span className="jbs-dot jbs-dot--r" />
                <span className="jbs-dot jbs-dot--y" />
                <span className="jbs-dot jbs-dot--g" />
                <span className="jbs-mockup-title">Goldmine Jewellery Suite</span>
              </div>
              <div className="jbs-mockup-body">
                <div className="jbs-mock-sidebar">
                  {['Dashboard','Billing','Inventory','Customers','Reports','Settings'].map((item, i) => (
                    <div key={item} className={`jbs-mock-nav${i === 1 ? ' jbs-mock-nav--active' : ''}`}>
                      <span className="jbs-mock-nav-line" />
                      <span className="jbs-mock-nav-text">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="jbs-mock-content">
                  <div className="jbs-mock-kpi-row">
                    {[{v:'₹2.4L',l:"Today's Sales"},{v:'48',l:'Bills'},{v:'98%',l:'Collection'}].map(k => (
                      <div key={k.l} className="jbs-mock-kpi">
                        <div className="jbs-mock-kpi-val">{k.v}</div>
                        <div className="jbs-mock-kpi-lbl">{k.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="jbs-mock-chart">
                    {[42,67,38,85,55,72,90].map((h,i) => (
                      <div key={i} className="jbs-mock-bar" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="jbs-mock-table">
                    <div className="jbs-mock-table-header"><span/><span/><span/><span/></div>
                    {[1,2,3].map(i => (
                      <div key={i} className="jbs-mock-table-row"><span/><span/><span/><span/></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TICKER ─── */}
      <div className="jbs-ticker" aria-hidden>
        <div className="jbs-ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="jbs-ticker-item">{t}</span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className="jbs-stats">
        {[
          { num: '500+',    label: 'Jewellers onboarded' },
          { num: '₹50 Cr+', label: 'Transactions tracked' },
          { num: '10 yrs',  label: 'Industry experience' },
        ].map((s) => (
          <div key={s.label} className="jbs-stat">
            <div className="jbs-stat-num">{s.num}</div>
            <div className="jbs-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ─── FEATURES ─── */}
      {FEATURES.map((f, i) => (
        <section key={f.id} className={`jbs-feature jbs-feature--${f.theme}`}>
          <div className={`jbs-feature-inner${i % 2 === 1 ? ' jbs-feature-inner--flip' : ''}`}>
            <div className="jbs-feature-copy">
              <div className="jbs-feature-num">{f.num}</div>
              <h2 className="jbs-feature-title">{f.title}</h2>
              <p className="jbs-feature-desc">{f.desc}</p>
            </div>
            <div className="jbs-feature-visual">
              <div className="jbs-placeholder">
                <FeatureVisual id={f.id} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ─── CTA ─── */}
      <section className="jbs-cta">
        <div className="jbs-cta-content">
          <p className="jbs-cta-label">Live demonstration</p>
          <h2 className="jbs-cta-headline">See it live in your store.</h2>
          <p className="jbs-cta-sub">We'll run a full demo using your own product categories — no setup, no commitment.</p>
          <a href="tel:+919500036310" className="jbs-cta-btn">Book a Free Demo</a>
        </div>
      </section>

    </div>
  )
}

function FeatureVisual({ id }: { id: string }) {
  if (id === 'billing') return (
    <div className="fv-invoice">
      <div className="fv-inv-header">
        <span className="fv-inv-title">TAX INVOICE</span>
        <span className="fv-inv-num">#INV-2847</span>
      </div>
      <div className="fv-inv-meta">
        <div className="fv-inv-meta-row"><span className="fv-line fv-line--lg" /><span className="fv-line fv-line--sm" /></div>
        <div className="fv-inv-meta-row"><span className="fv-line fv-line--md" /><span className="fv-line fv-line--xs" /></div>
      </div>
      <div className="fv-inv-table">
        <div className="fv-inv-thead"><span/><span/><span/><span/></div>
        {[1,2,3].map(i => <div key={i} className="fv-inv-trow"><span/><span/><span/><span/></div>)}
      </div>
      <div className="fv-inv-totals">
        <div className="fv-inv-total-row"><span className="fv-line fv-line--md" /><span className="fv-line fv-line--sm" /></div>
        <div className="fv-inv-total-row fv-inv-total-row--highlight">
          <span className="fv-line fv-line--md" />
          <span className="fv-amount">₹ 48,250</span>
        </div>
      </div>
      <div className="fv-inv-stamp">PAID</div>
    </div>
  )

  if (id === 'inventory') return (
    <div className="fv-inventory">
      {[{cat:'22K Gold',items:14},{cat:'18K Gold',items:9},{cat:'Diamond',items:6},{cat:'Silver',items:22},{cat:'Platinum',items:3},{cat:'Antique',items:11}].map((c) => (
        <div key={c.cat} className="fv-inv-tile">
          <div className="fv-inv-tile-cat">{c.cat}</div>
          <div className="fv-inv-tile-count">{c.items}</div>
          <div className="fv-inv-tile-label">items</div>
        </div>
      ))}
    </div>
  )

  if (id === 'crm') return (
    <div className="fv-crm">
      <div className="fv-crm-header">
        <div className="fv-crm-avatar">PS</div>
        <div>
          <div className="fv-crm-name">Priya Sharma</div>
          <div className="fv-crm-phone">+91 98765 43210</div>
        </div>
      </div>
      <div className="fv-crm-stats">
        {[{l:'Total Purchases',v:'₹3.2L'},{l:'Loyalty Points',v:'1,250'},{l:'Outstanding',v:'₹0'}].map(s => (
          <div key={s.l} className="fv-crm-stat">
            <div className="fv-crm-stat-val">{s.v}</div>
            <div className="fv-crm-stat-lbl">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="fv-crm-timeline">
        {['Purchased ring — ₹18,500','Old gold exchange — 12g','Anniversary reminder sent'].map((e,i) => (
          <div key={i} className="fv-crm-event">
            <span className="fv-crm-dot" />
            <span className="fv-crm-event-text">{e}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="fv-reports">
      <div className="fv-rep-header">
        <span className="fv-rep-title">Monthly P&L</span>
        <span className="fv-rep-badge">Jun 2025</span>
      </div>
      <div className="fv-rep-chart">
        {[55,70,48,88,62,95].map((h,i) => (
          <div key={i} className="fv-rep-bar-wrap">
            <div className="fv-rep-bar" style={{ height: `${h}%` }} />
            <span className="fv-rep-bar-label">{['Jan','Feb','Mar','Apr','May','Jun'][i]}</span>
          </div>
        ))}
      </div>
      <div className="fv-rep-summary">
        {[{l:'Revenue',v:'₹18.4L'},{l:'Expenses',v:'₹11.2L'},{l:'Profit',v:'₹7.2L'}].map(r => (
          <div key={r.l} className="fv-rep-row">
            <span className="fv-rep-row-label">{r.l}</span>
            <span className="fv-rep-row-val">{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
