import { Link } from 'react-router-dom'
import { useContactModal } from '../context/ContactModalContext'
import logo26 from '../assets/26years.jpeg'
import vinodPhoto from '../assets/vinod.jpeg'
import './AboutPage.css'

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const { openModal } = useContactModal()

  return (
    <div className="ab-root">

      {/* ── BREADCRUMB ── */}
      <nav className="ab-breadcrumb">
        <Link to="/" className="ab-bc-link">Home</Link>
        <span className="ab-bc-sep">/</span>
        <span className="ab-bc-cur">About Us</span>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — Hero split: 26yr visual + company summary
      ══════════════════════════════════════════════════════════════ */}
      <section className="ab-hero-split">

        {/* Left — 26 years visual */}
        <div className="ab-visual-wrap">
          <img src={logo26} alt="Goldmine Infotech — 26 Years of Excellence" className="ab-visual-img" />
        </div>

        {/* Right — company summary */}
        <div className="ab-summary-wrap">
          <div className="ab-summary-inner">
            <p className="ab-summary-eyebrow">Who We Are</p>
            <h1 className="ab-summary-title">
              Chennai's most trusted<br />
              <span className="ab-summary-accent">end-to-end technology partner.</span>
            </h1>
            <p className="ab-summary-body">
              Since 2000, Goldmine Infotech and Systems has been the single call that Chennai businesses make
              when they need technology to work — not tomorrow, but today.
            </p>
            <p className="ab-summary-body">
              We design and build websites, develop custom software for every kind of business, supply and
              install CCTV security systems, and deliver laptops, desktops, printers, and electronics —
              all under one roof, backed by one team, with one promise: <em>we get it done.</em>
            </p>
            <p className="ab-summary-body">
              From a startup's first website to a corporation's full surveillance network, our clients trust
              us because we have been here for 26 years and we plan to be here for 26 more.
            </p>
            <div className="ab-summary-stats">
              <div className="ab-stat">
                <div className="ab-stat-num">26<span>+</span></div>
                <div className="ab-stat-label">Years in business</div>
              </div>
              <div className="ab-stat">
                <div className="ab-stat-num">500<span>+</span></div>
                <div className="ab-stat-label">Clients served</div>
              </div>
              <div className="ab-stat">
                <div className="ab-stat-num">6</div>
                <div className="ab-stat-label">Service verticals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — Founder
      ══════════════════════════════════════════════════════════════ */}
      <section className="ab-founder">
        <div className="ab-founder-inner">

          {/* Left — photo */}
          <div className="ab-founder-photo-col">
            <div className="ab-founder-photo-wrap">
              <img src={vinodPhoto} alt="Mr. Vinod M Jain" className="ab-founder-avatar-img" />
              <div className="ab-founder-photo-label">
                <div className="ab-founder-photo-name">Mr. Vinod M Jain</div>
                <div className="ab-founder-photo-role">Managing Partner</div>
              </div>
            </div>
          </div>

          {/* Right — story */}
          <div className="ab-founder-story-col">
            <p className="ab-founder-eyebrow">Our Founder</p>
            <h2 className="ab-founder-name">Mr. Vinod M Jain</h2>
            <p className="ab-founder-designation">Managing Partner · Goldmine Infotech and Systems</p>

<div className="ab-founder-bio">
              <p>
                Born and raised on the streets of Chennai, Mr. Vinod M Jain is a GNIIT graduate
                who, in 2000, when entrepreneurship was looked upon with quiet scepticism,
                backed himself and founded Goldmine Infotech.
              </p>
              <p>
                He started with websites — one client at a time, learning what businesses actually
                needed. When those same clients began asking for computers, laptops, and IT systems,
                he did not turn them away. He built the capability and delivered. When the need for
                CCTV and security installations arose, he learnt it, sourced the right partners,
                and expanded again. Custom software followed the same way — a client needed it,
                and Mr. Vinod M Jain made it happen.
              </p>
              <p>
                Today, Goldmine Infotech and Systems is a Chennai institution — twenty-six years of
                showing up, getting it done, and earning the trust of hundreds of businesses across the city.
              </p>
            </div>

            {/* Founder's note */}
            <div className="ab-founder-note">
              <div className="ab-note-quote-mark">&ldquo;</div>
              <blockquote className="ab-note-text">
                I started Goldmine because Chennai's businesses needed someone who would just get it done —
                no excuses, no runaround. Twenty-six years later, that is still the only thing I care about.
                Every client is not a transaction. It is a relationship I carry with me.
              </blockquote>
              <div className="ab-note-attribution">— Mr. Vinod M Jain</div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="ab-cta">
        <div className="ab-cta-inner">
          <p className="ab-cta-eyebrow">26 years. Still going.</p>
          <h2 className="ab-cta-title">Ready to work with us?</h2>
          <p className="ab-cta-sub">From your first website to your full IT infrastructure — we've got you.</p>
          <div className="ab-cta-actions">
            <button
              className="ab-cta-btn-primary"
              onClick={() => openModal({
                badge: 'Get in Touch',
                badgeColor: 'orange',
                title: 'How can we help you?',
                subtitle: 'Tell us what you need and we\'ll get back within 2 hours.',
                prefillMessage: 'Hi, I\'d like to work with Goldmine Infotech.',
              })}
            >
              Contact Us
            </button>
            <Link to="/services" className="ab-cta-btn-ghost">See Our Services</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
