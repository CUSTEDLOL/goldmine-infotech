import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './ServicePage.css'

interface Feature {
  icon: string
  title: string
  desc: string
}

interface ServicePageProps {
  category: string
  title: string
  tagline: string
  description: string
  features: Feature[]
  ctaText?: string
  accentColor?: string
}

export default function ServicePage({
  category,
  title,
  tagline,
  description,
  features,
  ctaText = 'Get a Free Quote',
  accentColor = '#FCA311',
}: ServicePageProps) {
  return (
    <div className="sp-root">
      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-hero-inner">
          <Link to="/" className="sp-back">← Back to Home</Link>
          <p className="sp-category">{category}</p>
          <h1 className="sp-title">{title}</h1>
          <p className="sp-tagline">{tagline}</p>
          <div className="sp-actions">
            <a href="#contact" className="sp-cta-primary">{ctaText}</a>
            <a href="tel:+919500036310" className="sp-cta-secondary">+91 95000 36310</a>
          </div>
        </div>
        <div className="sp-hero-glow" style={{ background: `radial-gradient(ellipse at 60% 40%, ${accentColor}22 0%, transparent 70%)` }} />
      </section>

      {/* Features grid */}
      <section className="sp-features">
        <div className="sp-features-inner">
          <h2 className="sp-features-title">What's included</h2>
          <div className="sp-grid">
            {features.map((f) => (
              <div key={f.title} className="sp-card">
                <span className="sp-card-icon">{f.icon}</span>
                <h3 className="sp-card-title">{f.title}</h3>
                <p className="sp-card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="sp-cta-band">
        <div className="sp-cta-band-inner">
          <h2>Ready to get started?</h2>
          <p>Talk to our team — we'll build the right solution for you.</p>
          <a href="tel:+919500036310" className="sp-cta-primary">Call us now →</a>
        </div>
      </section>
    </div>
  )
}
