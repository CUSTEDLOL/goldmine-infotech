import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PhotographerPortal.css'

gsap.registerPlugin(ScrollTrigger)

const PHOTO_BOXES = [
  { src: 'https://images.unsplash.com/photo-1742891602017-40b3a924f476?auto=format&fit=crop&w=600&q=80', height: 180, alt: 'Indian bride portrait' },
  { src: 'https://images.unsplash.com/photo-1754782915842-aa4fca6c203a?auto=format&fit=crop&w=600&q=80', height: 240, alt: 'Indian wedding ceremony' },
  { src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', height: 160, alt: 'Professional headshot' },
  { src: 'https://images.unsplash.com/photo-1633934542430-0905ccb5f050?auto=format&fit=crop&w=600&q=80', height: 200, alt: 'Gold jewellery photography' },
  { src: 'https://images.unsplash.com/photo-1444090542259-0af8fa96557e?auto=format&fit=crop&w=600&q=80', height: 180, alt: 'Golden hour landscape' },
  { src: 'https://images.unsplash.com/photo-1763994199943-dac78a9bb620?auto=format&fit=crop&w=600&q=80', height: 220, alt: 'Indian architecture' },
  { src: 'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?auto=format&fit=crop&w=600&q=80', height: 240, alt: 'Food photography' },
  { src: 'https://images.unsplash.com/photo-1580060092295-dbe639fffda3?auto=format&fit=crop&w=600&q=80', height: 160, alt: 'Street photography India' },
  { src: 'https://plus.unsplash.com/premium_photo-1681910349368-c34121e9ba77?auto=format&fit=crop&w=600&q=80', height: 200, alt: 'Family portrait outdoor' },
]

const STATS = [
  { num: '2,500+',  label: 'Photographers' },
  { num: '80,000+', label: 'Photos Hosted' },
  { num: '12,000+', label: 'Client Deliveries' },
  { num: '4.9',     label: 'Avg Rating' },
]

const FEATURES = [
  {
    num: '01',
    title: 'Portfolio Hosting',
    desc: 'Unlimited photo uploads with custom subdomain, password-protected galleries, and client-specific access.',
  },
  {
    num: '02',
    title: 'Client Delivery',
    desc: 'Deliver full-resolution galleries to clients with download tracking, expiry dates, and watermarking.',
  },
  {
    num: '03',
    title: 'Booking & Contracts',
    desc: 'Online session bookings, digital contracts, advance payment collection — everything before the shoot.',
  },
  {
    num: '04',
    title: 'Community Network',
    desc: 'Connect with photographers across India, share work, discover collaborators, and build referral networks.',
  },
]

const GALLERY_CARDS = [
  { bg: '#1a1a1a', name: 'Wedding Series', count: '84 photos' },
  { bg: '#222222', name: 'Portrait Studio', count: '52 photos' },
  { bg: '#1e1e1e', name: 'Commercial Work', count: '37 photos' },
]

const CTA_METRICS = [
  { num: '1.2M+', label: 'Portfolio Views' },
  { num: '12K+',  label: 'Client Deliveries' },
  { num: '98%',   label: 'Satisfaction Rate' },
  { num: '₹0',    label: 'Setup Cost' },
]

export default function PhotographerPortal() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats section
      gsap.fromTo('.pcp-stat',
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.pcp-stats', start: 'top 80%' },
        }
      )

      // Feature rows
      gsap.utils.toArray<HTMLElement>('.pcp-feature-row').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: i * 0.05,
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })

      // Portfolio preview
      gsap.fromTo('.pcp-gallery-cards',
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '.pcp-portfolio-preview', start: 'top 82%' },
        }
      )

      // CTA section
      gsap.fromTo('.pcp-cta-left',
        { x: -24, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: '.pcp-cta', start: 'top 80%' },
        }
      )
      gsap.fromTo('.pcp-cta-right',
        { x: 24, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: '.pcp-cta', start: 'top 80%' },
        }
      )
    }, rootRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <div className="pcp-root" ref={rootRef}>

      {/* ─── HERO ─── */}
      <section className="pcp-hero">
        <div className="pcp-hero-inner">

          {/* Left content */}
          <div className="pcp-hero-content">
            <motion.div
              className="pcp-breadcrumb"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Link to="/" className="pcp-bc-link">Home</Link>
              <span className="pcp-bc-sep">/</span>
              <span className="pcp-bc-link">Software</span>
              <span className="pcp-bc-sep">/</span>
              <span>Photographer Portal</span>
            </motion.div>

            <motion.h1
              className="pcp-headline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              The platform built<br />
              <em>for photographers.</em>
            </motion.h1>

            <motion.p
              className="pcp-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: 'easeOut' }}
            >
              Portfolio hosting, client delivery, community features, and booking management — all in one platform.
            </motion.p>

            <motion.div
              className="pcp-actions"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: 'easeOut' }}
            >
              <a href="tel:+919500036310" className="pcp-btn-primary">Join Free</a>
              <a href="tel:+919500036310" className="pcp-btn-ghost">See Demo</a>
            </motion.div>
          </div>

          {/* Photo Grid Mosaic */}
          <div className="pcp-photo-mosaic" aria-hidden>
            <div className="pcp-mosaic-grid">
              {PHOTO_BOXES.map((box, i) => (
                <motion.div
                  key={i}
                  className="pcp-photo-box"
                  style={{ height: `${box.height}px` }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
                >
                  <img src={box.src} alt={box.alt} className="pcp-photo-img" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="pcp-stats">
        {STATS.map((s) => (
          <div key={s.label} className="pcp-stat">
            <div className="pcp-stat-num">{s.num}</div>
            <div className="pcp-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ─── FEATURES ─── */}
      <section className="pcp-features">
        <div className="pcp-features-inner">
          {FEATURES.map((f) => (
            <div key={f.num} className="pcp-feature-row">
              <span className="pcp-feature-num">{f.num}</span>
              <span className="pcp-feature-title">{f.title}</span>
              <span className="pcp-feature-desc">{f.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PORTFOLIO PREVIEW ─── */}
      <section className="pcp-portfolio-preview">
        <div className="pcp-gallery-cards">
          {GALLERY_CARDS.map((card) => (
            <div key={card.name} className="pcp-gallery-card">
              <div className="pcp-gallery-cover" style={{ backgroundColor: card.bg }} />
              <div className="pcp-gallery-info">
                <div className="pcp-gallery-name-placeholder" />
                <div className="pcp-gallery-count">{card.count}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="pcp-cta">
        <div className="pcp-cta-inner">
          <div className="pcp-cta-left">
            <h2 className="pcp-cta-headline">
              Join 2,500+<br />photographers.
            </h2>
            <a href="tel:+919500036310" className="pcp-cta-btn">Create Free Account</a>
          </div>
          <div className="pcp-cta-right">
            <div className="pcp-metric-grid">
              {CTA_METRICS.map((m) => (
                <div key={m.label} className="pcp-metric-cell">
                  <div className="pcp-metric-num">{m.num}</div>
                  <div className="pcp-metric-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
