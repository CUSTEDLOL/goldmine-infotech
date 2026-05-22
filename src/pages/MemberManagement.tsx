import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MemberManagement.css'

gsap.registerPlugin(ScrollTrigger)

const TICKER_ITEMS = [
  'Member Profiles',
  'Role Management',
  'Access Control',
  'Attendance',
  'Renewals',
  'Bulk Messaging',
  'Reports',
  'Segmentation',
  'Member Profiles',
  'Role Management',
  'Access Control',
  'Attendance',
  'Renewals',
  'Bulk Messaging',
  'Reports',
  'Segmentation',
]

const FEATURES = [
  {
    num: '01',
    theme: 'dark' as const,
    title: 'Member Profiles',
    desc: 'Complete member records with custom fields, documents, photos, and activity logs — everything in one place.',
    flip: false,
  },
  {
    num: '02',
    theme: 'light' as const,
    title: 'Role & Access Control',
    desc: 'Define roles, permissions, and visibility rules. Admins, managers, and members each see exactly what they need.',
    flip: true,
  },
  {
    num: '03',
    theme: 'dark' as const,
    title: 'Renewals & Payments',
    desc: 'Automated renewal reminders, online payment collection, and lapsed member tracking — all handled automatically.',
    flip: false,
  },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.11 } } }
const rise = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: 'easeOut' as const } },
}

export default function MemberManagement() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats row animation
      gsap.fromTo(
        '.mm-stat',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.78,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.mm-stats', start: 'top 83%' },
        }
      )

      // Feature sections — copy slides from left or right, visual from opposite
      gsap.utils.toArray<HTMLElement>('.mm-feature').forEach((el) => {
        const copy = el.querySelector('.mm-feature-copy')
        const visual = el.querySelector('.mm-feature-visual')
        const flipped = el.classList.contains('mm-feature--flip')

        if (copy) {
          gsap.fromTo(
            copy,
            { x: flipped ? 28 : -28, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.72,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 78%' },
            }
          )
        }
        if (visual) {
          gsap.fromTo(
            visual,
            { x: flipped ? -28 : 28, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.72,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 78%' },
            }
          )
        }
      })

      // CTA
      gsap.fromTo(
        '.mm-cta-inner',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.mm-cta', start: 'top 86%' },
        }
      )
    }, rootRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <div className="mm-root" ref={rootRef}>

      {/* ─── HERO — Split Layout ─── */}
      <section className="mm-hero">

        {/* Left panel — dark with copy */}
        <motion.div
          className="mm-hero-left"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mm-breadcrumb" variants={rise}>
            <Link to="/" className="mm-bc-link">Home</Link>
            <span className="mm-bc-sep">/</span>
            <span className="mm-bc-seg">Software</span>
            <span className="mm-bc-sep">/</span>
            <span className="mm-bc-seg">Member Management</span>
          </motion.div>

          <motion.h1 className="mm-headline" variants={rise}>
            Every member.<br />
            Perfectly managed.
          </motion.h1>

          <motion.p className="mm-sub" variants={rise}>
            One platform to manage member profiles, control access, automate renewals, and send bulk communications — without the spreadsheet chaos.
          </motion.p>

          <motion.div className="mm-actions" variants={rise}>
            <a href="tel:+919500036310" className="mm-btn-primary">Book a Demo</a>
            <a href="tel:+919500036310" className="mm-btn-ghost">+91 95000 36310</a>
          </motion.div>
        </motion.div>

        {/* Right panel — full-height photo */}
        <motion.div
          className="mm-hero-right"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <img
            src="https://images.unsplash.com/photo-1758518730037-a16581a040e8?auto=format&fit=crop&w=1200&q=85"
            alt="Business team collaborating in a professional meeting"
            className="mm-hero-photo"
          />
          {/* Left gradient blends photo into dark left panel */}
          <div className="mm-hero-photo-overlay" aria-hidden />
        </motion.div>

      </section>

      {/* ─── TICKER STRIP ─── */}
      <div className="mm-ticker" aria-hidden>
        <div className="mm-ticker-track">
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="mm-ticker-item">
              {item}
              <span className="mm-ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS ROW ─── */}
      <section className="mm-stats">
        {[
          { num: '10,000+', label: 'Members Managed' },
          { num: '99%',     label: 'Retention Rate' },
          { num: 'Zero',    label: 'Manual Errors' },
        ].map((s) => (
          <div key={s.label} className="mm-stat">
            <div className="mm-stat-num">{s.num}</div>
            <div className="mm-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ─── FEATURES — Alternating ─── */}
      <div className="mm-features">

        {/* Feature 01 — dark bg, copy left, mockup right */}
        <section className="mm-feature mm-feature--dark">
          <div className="mm-feature-inner">
            <div className="mm-feature-copy">
              <span className="mm-feature-num">01</span>
              <h2 className="mm-feature-title">Member Profiles</h2>
              <p className="mm-feature-desc">
                {FEATURES[0].desc}
              </p>
              <ul className="mm-feature-bullets">
                <li>Custom fields per membership type</li>
                <li>Document uploads and photo storage</li>
                <li>Full activity log with timestamps</li>
                <li>Search, filter, and segment in seconds</li>
              </ul>
            </div>
            <div className="mm-feature-visual">
              {/* CSS member table mockup */}
              <div className="mm-mock-table" aria-hidden>
                <div className="mm-mock-table-header">
                  <span>Member</span>
                  <span>Plan</span>
                  <span>Status</span>
                  <span>Joined</span>
                </div>
                {[
                  { name: 'Priya Sharma',   plan: 'Gold',     status: 'Active',   date: 'Jan 2024' },
                  { name: 'Rahul Verma',    plan: 'Silver',   status: 'Active',   date: 'Mar 2024' },
                  { name: 'Anjali Singh',   plan: 'Platinum', status: 'Active',   date: 'Nov 2023' },
                  { name: 'Karan Mehta',    plan: 'Gold',     status: 'Lapsed',   date: 'Jun 2023' },
                  { name: 'Neha Gupta',     plan: 'Silver',   status: 'Renewing', date: 'Feb 2024' },
                ].map((row, i) => (
                  <div key={i} className="mm-mock-table-row">
                    <span className="mm-mock-member">
                      <span className="mm-mock-avatar" />
                      {row.name}
                    </span>
                    <span className="mm-mock-plan">{row.plan}</span>
                    <span className={`mm-mock-status mm-mock-status--${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                    <span className="mm-mock-date">{row.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature 02 — light bg, copy right, mockup left */}
        <section className="mm-feature mm-feature--light mm-feature--flip">
          <div className="mm-feature-inner">
            <div className="mm-feature-visual">
              {/* CSS role/permissions mockup */}
              <div className="mm-mock-roles" aria-hidden>
                <div className="mm-mock-roles-header">Role Permissions</div>
                {[
                  { role: 'Super Admin',  perms: ['Members', 'Reports', 'Billing', 'Settings'] },
                  { role: 'Manager',      perms: ['Members', 'Reports', 'Billing'] },
                  { role: 'Staff',        perms: ['Members', 'Attendance'] },
                  { role: 'Member',       perms: ['Profile', 'Renewals'] },
                ].map((r, i) => (
                  <div key={i} className="mm-mock-role-row">
                    <span className="mm-mock-role-name">{r.role}</span>
                    <div className="mm-mock-perm-tags">
                      {r.perms.map((p) => (
                        <span key={p} className="mm-mock-perm-tag">{p}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mm-feature-copy">
              <span className="mm-feature-num mm-feature-num--orange">02</span>
              <h2 className="mm-feature-title mm-feature-title--dark">Role & Access Control</h2>
              <p className="mm-feature-desc mm-feature-desc--dark">
                {FEATURES[1].desc}
              </p>
              <ul className="mm-feature-bullets mm-feature-bullets--dark">
                <li>Granular permission settings per role</li>
                <li>Unlimited custom roles</li>
                <li>Audit trail for every admin action</li>
                <li>Single sign-on ready</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Feature 03 — dark bg, copy left, mockup right */}
        <section className="mm-feature mm-feature--dark">
          <div className="mm-feature-inner">
            <div className="mm-feature-copy">
              <span className="mm-feature-num">03</span>
              <h2 className="mm-feature-title">Renewals & Payments</h2>
              <p className="mm-feature-desc">
                {FEATURES[2].desc}
              </p>
              <ul className="mm-feature-bullets">
                <li>Auto-reminders 30, 15, and 7 days before expiry</li>
                <li>Online payment link generation</li>
                <li>Lapsed member win-back campaigns</li>
                <li>Renewal receipts sent automatically</li>
              </ul>
            </div>
            <div className="mm-feature-visual">
              {/* CSS renewal tracker mockup */}
              <div className="mm-mock-renewals" aria-hidden>
                <div className="mm-mock-renewals-header">
                  <span>Upcoming Renewals</span>
                  <span className="mm-mock-renewals-count">12 due this month</span>
                </div>
                {[
                  { name: 'Amit Joshi',   days: '3 days',  amt: '₹2,400', status: 'urgent' },
                  { name: 'Sneha Patel',  days: '7 days',  amt: '₹1,800', status: 'warning' },
                  { name: 'Vikas Rao',    days: '14 days', amt: '₹3,600', status: 'ok' },
                  { name: 'Meena Iyer',   days: '21 days', amt: '₹2,400', status: 'ok' },
                ].map((r, i) => (
                  <div key={i} className="mm-mock-renewal-row">
                    <span className={`mm-mock-renewal-dot`} data-status={r.status} />
                    <span className="mm-mock-renewal-name">{r.name}</span>
                    <span className="mm-mock-renewal-days">{r.days}</span>
                    <span className="mm-mock-renewal-amt">{r.amt}</span>
                  </div>
                ))}
                <div className="mm-mock-send-row">
                  <span className="mm-mock-send-btn">Send Reminders to All</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ─── CTA ─── */}
      <section className="mm-cta">
        <div className="mm-cta-inner">
          <h2 className="mm-cta-headline">Start managing smarter.</h2>
          <p className="mm-cta-sub">
            We set up your member database in under 48 hours.
          </p>
          <a href="tel:+919500036310" className="mm-cta-btn">Book a Demo</a>
        </div>
      </section>

    </div>
  )
}
