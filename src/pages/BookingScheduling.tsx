import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './BookingScheduling.css'

gsap.registerPlugin(ScrollTrigger)

/* ── Animation variants ── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const rise = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

/* ── Calendar data ── */
const CALENDAR_CELLS = [
  { date: '', empty: true },
  { date: '', empty: true },
  { date: '', empty: true },
  { date: '1' },
  { date: '2', bookings: ['10:00 — Priya'] },
  { date: '3' },
  { date: '4', bookings: ['09:00 — Raj'], confirmed: true },
  { date: '5' },
  { date: '6', bookings: ['11:30 — Maya'] },
  { date: '7', bookings: ['14:00 — Asha'], confirmed: true },
  { date: '8' },
  { date: '9', bookings: ['09:30 — Dev'] },
  { date: '10', isToday: true, bookings: ['10:00 — Sneha'] },
  { date: '11', bookings: ['15:00 — Rohit'], confirmed: true },
  { date: '12' },
  { date: '13', bookings: ['12:00 — Karan'] },
  { date: '14', bookings: ['10:30 — Nisha'], confirmed: true },
  { date: '15' },
  { date: '16', bookings: ['11:00 — Arun'] },
  { date: '17', bookings: ['09:00 — Pooja'], confirmed: true },
  { date: '18', bookings: ['14:30 — Vivek'] },
  { date: '19' },
  { date: '20', bookings: ['10:00 — Sana'] },
  { date: '21', bookings: ['15:00 — Jay'], confirmed: true },
]

/* ── Sync events ── */
const SYNC_EVENTS = [
  { time: '09:00', title: 'Hair & Styling — Priya S.', sub: 'Added via Online Booking', status: 'synced', active: false },
  { time: '10:30', title: 'Consultation — Raj M.', sub: 'Google Calendar synced', status: 'synced', active: true },
  { time: '12:00', title: 'Full Treatment — Asha K.', sub: 'Pending confirmation', status: 'pending', active: false },
  { time: '14:30', title: 'Walk-in — Nisha P.', sub: 'Added manually, syncing...', status: 'synced', active: false },
]

/* ── Staff rows ── */
const STAFF = [
  { name: 'Priya', slots: ['booked', 'full', 'booked', 'off', 'full'] },
  { name: 'Arun', slots: ['full', 'off', 'booked', 'full', 'booked'] },
  { name: 'Maya', slots: ['booked', 'booked', 'off', 'full', 'booked'] },
  { name: 'Rohit', slots: ['off', 'full', 'booked', 'booked', 'off'] },
]

/* ── Reminder items ── */
const REMINDERS = [
  { type: 'SMS', variant: 'sms', title: 'Reminder: Tomorrow 10:00 AM', detail: 'Priya S. — Hair Styling', time: '24h before' },
  { type: 'Email', variant: 'email', title: 'Your appointment is confirmed', detail: 'Raj M. — Consultation — 10:30 AM', time: 'Instant' },
  { type: 'SMS', variant: 'sms', title: 'Reminder: In 1 hour', detail: 'Asha K. — Full Treatment', time: '1h before' },
]

export default function BookingScheduling() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Stats rows */
      gsap.fromTo(
        '.bks-stat-row',
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.bks-stats', start: 'top 80%' },
        }
      )

      /* Feature panels */
      gsap.utils.toArray<HTMLElement>('.bks-feat').forEach((el) => {
        const copy = el.querySelector('.bks-feat-copy')
        const visual = el.querySelector('.bks-feat-visual')
        if (copy) {
          gsap.fromTo(
            copy,
            { x: -28, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 78%' } }
          )
        }
        if (visual) {
          gsap.fromTo(
            visual,
            { x: 28, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 78%' } }
          )
        }
      })

      /* CTA section */
      gsap.fromTo(
        '.bks-cta-inner',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.bks-cta-section', start: 'top 80%' } }
      )
    }, rootRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bks-root" ref={rootRef}>
      {/* ═══════════════════════════════════
          HERO — 3-panel layout
      ═══════════════════════════════════ */}
      <section className="bks-hero">
        <div className="bks-hero-inner">
          {/* Breadcrumb */}
          <motion.nav
            className="bks-breadcrumb"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">Home</Link>
            <span className="bks-breadcrumb-sep">/</span>
            <Link to="/software">Software</Link>
            <span className="bks-breadcrumb-sep">/</span>
            <span className="bks-breadcrumb-current">Booking &amp; Scheduling</span>
          </motion.nav>

          {/* Headline */}
          <motion.h1
            className="bks-hero-headline"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.span variants={rise} style={{ display: 'block' }}>Book it.</motion.span>
            <motion.span variants={rise} style={{ display: 'block' }}>Schedule it.</motion.span>
            <motion.span variants={rise} style={{ display: 'block' }}>
              <em className="bks-headline-orange">Done.</em>
            </motion.span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            className="bks-hero-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            A complete online booking and scheduling platform built for service businesses.
            Let clients book 24/7, automate reminders, and manage your calendar from one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="bks-hero-ctas"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6 }}
          >
            <Link to="/contact" className="bks-btn-primary">Get a Free Demo</Link>
            <Link to="/software" className="bks-btn-ghost">View All Products</Link>
          </motion.div>

          {/* ── Booking Widget ── */}
          <motion.div
            className="bks-widget-wrap"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
          >
            <div className="bks-widget">
              <div className="bks-widget-header">
                <div className="bks-widget-dot" />
                <div className="bks-widget-dot" />
                <div className="bks-widget-dot" />
                <span className="bks-widget-title">Online Booking Portal</span>
              </div>
              <div className="bks-widget-body">
                {/* Service Type */}
                <div className="bks-widget-field">
                  <span className="bks-widget-label">Service Type</span>
                  <div className="bks-widget-value">Hair &amp; Styling</div>
                  <div className="bks-widget-value-sub">60 min · 2 staff available</div>
                </div>
                {/* Date */}
                <div className="bks-widget-field">
                  <span className="bks-widget-label">Date</span>
                  <div className="bks-widget-value">15 Jun 2025</div>
                  <div className="bks-widget-value-sub">Saturday · 6 slots open</div>
                </div>
                {/* Time */}
                <div className="bks-widget-field">
                  <span className="bks-widget-label">Time</span>
                  <div className="bks-widget-value">10:30 AM</div>
                  <div className="bks-widget-value-sub">With Priya</div>
                </div>
                {/* Book button */}
                <button className="bks-widget-cta">Book Now</button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          STATS
      ═══════════════════════════════════ */}
      <section className="bks-stats">
        <div className="bks-stats-inner">
          <p className="bks-stats-label">Proven Results</p>
          <div className="bks-stat-row">
            <div className="bks-stat-border" />
            <div className="bks-stat-num">60%</div>
            <p className="bks-stat-text">Reduction in no-shows with automated SMS and email reminders sent before every appointment.</p>
          </div>
          <div className="bks-stat-row">
            <div className="bks-stat-border" />
            <div className="bks-stat-num">24/7</div>
            <p className="bks-stat-text">Online booking availability. Clients book at any hour — you wake up to a full calendar.</p>
          </div>
          <div className="bks-stat-row">
            <div className="bks-stat-border" />
            <div className="bks-stat-num">2 min</div>
            <p className="bks-stat-text">Average setup time per new staff member. Add team, set availability, start booking — instantly.</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FEATURE 01 — Online Booking (light)
      ═══════════════════════════════════ */}
      <section className="bks-feat bks-feat--light">
        <div className="bks-feat-inner">
          {/* Copy LEFT */}
          <div className="bks-feat-copy">
            <span className="bks-feat-num">01</span>
            <h2 className="bks-feat-title">Online Booking</h2>
            <p className="bks-feat-desc">
              Let clients book appointments, sessions, or slots 24/7 — no phone calls needed.
              A clean, branded booking page your clients will actually use.
            </p>
            <p className="bks-feat-detail">
              Clients pick service, staff, date, and time. Instant confirmation via SMS and email.
              Works on mobile, tablet, and desktop without any app download.
            </p>
          </div>
          {/* Visual RIGHT — Calendar */}
          <div className="bks-feat-visual">
            <div className="bks-cal-card">
              <div className="bks-cal-header">
                <span className="bks-cal-month">June 2025</span>
                <div className="bks-cal-nav">
                  <span>&#8249;</span>
                  <span>&#8250;</span>
                </div>
              </div>
              <div className="bks-cal-days-row">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div key={d} className="bks-cal-day-label">{d}</div>
                ))}
              </div>
              <div className="bks-cal-grid">
                {CALENDAR_CELLS.map((cell, i) => (
                  <div
                    key={i}
                    className={[
                      'bks-cal-cell',
                      cell.empty ? 'bks-cal-cell--empty' : '',
                      cell.isToday ? 'bks-cal-cell--today' : '',
                      cell.bookings && !cell.isToday ? 'bks-cal-cell--active' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {!cell.empty && <span className="bks-cal-date">{cell.date}</span>}
                    {cell.bookings?.map((b, bi) => (
                      <div
                        key={bi}
                        className={`bks-cal-booking${cell.confirmed ? ' bks-cal-booking--confirmed' : ''}`}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FEATURE 02 — Calendar Sync (dark)
      ═══════════════════════════════════ */}
      <section className="bks-feat bks-feat--dark">
        <div className="bks-feat-inner">
          {/* Visual LEFT */}
          <div className="bks-feat-visual">
            <div className="bks-sync-card">
              <div className="bks-sync-header">
                <span className="bks-sync-label">Today's Schedule — Synced</span>
                <span className="bks-sync-badge">Live</span>
              </div>
              {SYNC_EVENTS.map((ev, i) => (
                <div key={i} className="bks-sync-event">
                  <div className="bks-sync-time-col">
                    <div className="bks-sync-time">{ev.time}</div>
                  </div>
                  <div
                    className={[
                      'bks-sync-dot',
                      ev.active ? 'bks-sync-dot--active' : '',
                      ev.status === 'synced' && !ev.active ? 'bks-sync-dot--confirmed' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                  <div style={{ flex: 1 }}>
                    <div className="bks-sync-event-title">{ev.title}</div>
                    <div className="bks-sync-event-sub">{ev.sub}</div>
                  </div>
                  <span
                    className={[
                      'bks-sync-status',
                      ev.status === 'synced' ? 'bks-sync-status--synced' : 'bks-sync-status--pending',
                    ].join(' ')}
                  >
                    {ev.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Copy RIGHT */}
          <div className="bks-feat-copy">
            <span className="bks-feat-num">02</span>
            <h2 className="bks-feat-title">Calendar Sync</h2>
            <p className="bks-feat-desc">
              Two-way sync with Google Calendar. Every booking appears instantly — no double-bookings, ever.
            </p>
            <p className="bks-feat-detail">
              New bookings flow directly into your team's calendars. Cancellations remove themselves.
              View all appointments in one unified timeline — no manual updates, no conflicts.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FEATURE 03 — Automated Reminders (light)
      ═══════════════════════════════════ */}
      <section className="bks-feat bks-feat--light">
        <div className="bks-feat-inner">
          {/* Copy LEFT */}
          <div className="bks-feat-copy">
            <span className="bks-feat-num">03</span>
            <h2 className="bks-feat-title">Automated Reminders</h2>
            <p className="bks-feat-desc">
              SMS and email reminders sent automatically before every appointment.
              Reduce no-shows by up to 60%.
            </p>
            <p className="bks-feat-detail">
              Configure reminder timing — 24 hours, 2 hours, 30 minutes before. Clients confirm,
              reschedule, or cancel with a single tap. You stay informed in real time.
            </p>
          </div>
          {/* Visual RIGHT — Reminder Panel */}
          <div className="bks-feat-visual">
            <div className="bks-reminder-card">
              <div className="bks-reminder-header">
                <span className="bks-reminder-header-label">Automated Reminders</span>
                <span className="bks-reminder-dot" />
              </div>
              <div className="bks-reminder-list">
                {REMINDERS.map((r, i) => (
                  <div
                    key={i}
                    className={`bks-reminder-item bks-reminder-item--${r.variant}`}
                  >
                    <span className="bks-reminder-item-type">{r.type}</span>
                    <div className="bks-reminder-item-body">
                      <div className="bks-reminder-item-title">{r.title}</div>
                      <div className="bks-reminder-item-detail">{r.detail}</div>
                    </div>
                    <span className="bks-reminder-item-time">{r.time}</span>
                  </div>
                ))}
              </div>
              <div className="bks-noshow-bar">
                <span className="bks-noshow-label">No-Show Reduction</span>
                <div className="bks-noshow-track">
                  <div className="bks-noshow-fill" />
                </div>
                <span className="bks-noshow-text">60% fewer no-shows after enabling reminders</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FEATURE 04 — Staff Scheduling (dark)
      ═══════════════════════════════════ */}
      <section className="bks-feat bks-feat--dark">
        <div className="bks-feat-inner">
          {/* Visual LEFT */}
          <div className="bks-feat-visual">
            <div className="bks-staff-card">
              <div className="bks-staff-header">
                <span className="bks-staff-label">Staff Schedule</span>
                <span className="bks-staff-week">Week of 9 Jun</span>
              </div>
              {/* Day labels */}
              <div className="bks-staff-row">
                <div />
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
                  <div key={d} className="bks-staff-day-label">{d}</div>
                ))}
              </div>
              {/* Staff rows */}
              {STAFF.map((s, i) => (
                <div key={i} className="bks-staff-row">
                  <span className="bks-staff-name">{s.name}</span>
                  {s.slots.map((slot, j) => (
                    <div
                      key={j}
                      className={[
                        'bks-staff-slot',
                        slot === 'booked' ? 'bks-staff-slot--booked' : '',
                        slot === 'off' ? 'bks-staff-slot--off' : '',
                        slot === 'full' ? 'bks-staff-slot--full' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Copy RIGHT */}
          <div className="bks-feat-copy">
            <span className="bks-feat-num">04</span>
            <h2 className="bks-feat-title">Staff Scheduling</h2>
            <p className="bks-feat-desc">
              Manage staff availability, shift planning, and workload distribution from a single calendar view.
            </p>
            <p className="bks-feat-detail">
              Set working hours per staff member. Block leave days. The system auto-assigns bookings
              to available staff and prevents overbooking — no spreadsheets, no confusion.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════ */}
      <section className="bks-cta-section">
        <div className="bks-cta-inner">
          <h2 className="bks-cta-headline">
            Fill your calendar.<br />
            <span>Automatically.</span>
          </h2>
          <p className="bks-cta-sub">
            We set up your booking page, configure your services, and have you live within a day.
            No tech skills needed.
          </p>
          <Link to="/contact" className="bks-btn-primary">Get Started Today</Link>
        </div>
      </section>
    </div>
  )
}
