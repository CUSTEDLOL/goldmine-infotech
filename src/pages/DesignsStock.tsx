import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './DesignsStock.css'

gsap.registerPlugin(ScrollTrigger)

const DESIGN_CARDS = [
  { img: 'https://images.unsplash.com/photo-1654781456542-fdd1683c79c3?auto=format&fit=crop&w=400&q=80', category: 'Jewellery',  price: '₹299' },
  { img: 'https://images.unsplash.com/photo-1597480552972-de9b150b5b43?auto=format&fit=crop&w=400&q=80', category: 'Textile',    price: '₹199' },
  { img: 'https://images.unsplash.com/photo-1764874299178-a56feb233295?auto=format&fit=crop&w=400&q=80', category: 'Floral',     price: '₹399' },
  { img: 'https://images.unsplash.com/photo-1670225597315-782633cfbd2a?auto=format&fit=crop&w=400&q=80', category: 'Geometric',  price: 'Free'  },
  { img: 'https://images.unsplash.com/photo-1776484212426-404ac3527cf2?auto=format&fit=crop&w=400&q=80', category: 'Heritage',   price: '₹299' },
  { img: 'https://images.unsplash.com/photo-1584530313715-bfe628686135?auto=format&fit=crop&w=400&q=80', category: 'Minimal',    price: '₹149' },
  { img: 'https://images.unsplash.com/photo-1764640994773-d24ca3d7930c?auto=format&fit=crop&w=400&q=80', category: 'Bridal',     price: '₹499' },
  { img: 'https://images.unsplash.com/photo-1767875548584-e8fb112afeb1?auto=format&fit=crop&w=400&q=80', category: 'Abstract',   price: '₹199' },
  { img: 'https://images.unsplash.com/photo-1770977882758-b7170b72cf59?auto=format&fit=crop&w=400&q=80', category: 'Border',     price: '₹249' },
  { img: 'https://images.unsplash.com/photo-1761515315730-078ad40a3430?auto=format&fit=crop&w=400&q=80', category: 'Paisley',    price: 'Free'  },
  { img: 'https://images.unsplash.com/photo-1772404245518-b88fac824c78?auto=format&fit=crop&w=400&q=80', category: 'Wedding',    price: '₹349' },
  { img: 'https://images.unsplash.com/photo-1626784214536-d859187e0bd0?auto=format&fit=crop&w=400&q=80', category: 'Classic',    price: '₹199' },
]

const STATS = [
  { num: '50,000+',  label: 'Designs' },
  { num: '500+',     label: 'Categories' },
  { num: '10,000+',  label: 'Downloads' },
  { num: 'Commercial', label: 'License' },
]

export default function DesignsStock() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats band
      gsap.fromTo('.dss-stat',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.09, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: '.dss-stats', start: 'top 82%' },
        }
      )

      // Bento cells
      gsap.utils.toArray<HTMLElement>('.dss-bento-cell').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 28, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out',
            delay: i * 0.06,
            scrollTrigger: { trigger: '.dss-bento', start: 'top 80%' },
          }
        )
      })

      // CTA
      gsap.fromTo('.dss-cta-content',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: '.dss-cta', start: 'top 85%' },
        }
      )
    }, rootRef.current!)

    return () => ctx.revert()
  }, [])

  return (
    <div className="dss-root" ref={rootRef}>

      {/* ─── HERO — SPLIT ─── */}
      <section className="dss-hero">
        {/* Left: Black */}
        <div className="dss-hero-left">
          <motion.div
            className="dss-hero-left-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.div
              className="dss-breadcrumb"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
              <Link to="/" className="dss-bc-link">Home</Link>
              <span className="dss-bc-sep">/</span>
              <span className="dss-bc-link">Software</span>
              <span className="dss-bc-sep">/</span>
              <span>Designs Stock</span>
            </motion.div>

            <motion.h1
              className="dss-headline"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
            >
              India's largest<br />
              design stock<br />
              <em className="dss-headline-accent">library.</em>
            </motion.h1>

            <motion.p
              className="dss-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: 'easeOut' }}
            >
              Browse and download thousands of ready-to-use jewellery, textile, and product designs — licensed for commercial use.
            </motion.p>

            <motion.div
              className="dss-actions"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: 'easeOut' }}
            >
              <a href="tel:+919500036310" className="dss-btn-primary">Browse Library</a>
              <a href="tel:+919500036310" className="dss-btn-ghost">Learn More</a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: White design card grid */}
        <div className="dss-hero-right" aria-hidden>
          <div className="dss-card-grid">
            {DESIGN_CARDS.map((card, i) => (
              <motion.div
                key={i}
                className="dss-design-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 + i * 0.05, ease: 'easeOut' }}
              >
                <div className="dss-card-swatch">
                  <img src={card.img} alt={card.category} className="dss-card-img" loading="lazy" />
                </div>
                <div className="dss-card-meta">
                  <span className="dss-card-category">{card.category}</span>
                  <span className="dss-card-price">{card.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS — Orange band ─── */}
      <section className="dss-stats">
        {STATS.map((s) => (
          <div key={s.label} className="dss-stat">
            <div className="dss-stat-num">{s.num}</div>
            <div className="dss-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ─── FEATURES — BENTO GRID ─── */}
      <section className="dss-features">
        <div className="dss-bento">

          {/* Large cell 1: spans 2 cols */}
          <div className="dss-bento-cell dss-bento-cell--dark dss-bento-cell--wide">
            <div className="dss-bento-num">01</div>
            <h2 className="dss-bento-title">Massive Library</h2>
            <p className="dss-bento-desc">50,000+ commercial-use designs across jewellery, textile, fashion, and traditional art — updated every month.</p>
          </div>

          {/* Small cell: 1 col */}
          <div className="dss-bento-cell dss-bento-cell--light">
            <div className="dss-bento-num dss-bento-num--dark">02</div>
            <h3 className="dss-bento-title dss-bento-title--dark">Instant Download</h3>
            <p className="dss-bento-desc dss-bento-desc--dark">PNG, SVG, AI formats ready to use immediately after purchase.</p>
          </div>

          {/* Small cell: 1 col */}
          <div className="dss-bento-cell dss-bento-cell--light">
            <div className="dss-bento-num dss-bento-num--dark">03</div>
            <h3 className="dss-bento-title dss-bento-title--dark">Licensed for Business</h3>
            <p className="dss-bento-desc dss-bento-desc--dark">Every design is cleared for commercial use. No attribution needed.</p>
          </div>

          {/* Large cell 2: spans 2 cols — orange */}
          <div className="dss-bento-cell dss-bento-cell--orange dss-bento-cell--wide">
            <div className="dss-bento-num dss-bento-num--black">04</div>
            <h2 className="dss-bento-title dss-bento-title--black">Monthly Subscription</h2>
            <p className="dss-bento-desc dss-bento-desc--black">Unlimited access with a flat monthly fee. Download as many as you need, when you need them.</p>
          </div>

          {/* Small cell: 1 col */}
          <div className="dss-bento-cell dss-bento-cell--light">
            <div className="dss-bento-num dss-bento-num--dark">05</div>
            <h3 className="dss-bento-title dss-bento-title--dark">Search & Filter</h3>
            <p className="dss-bento-desc dss-bento-desc--dark">Find designs by style, colour, category, or occasion in seconds.</p>
          </div>

        </div>
      </section>

      {/* ─── CTA — Dark ─── */}
      <section className="dss-cta">
        <div className="dss-cta-content">
          <h2 className="dss-cta-headline">Start downloading today.</h2>
          <p className="dss-cta-sub">Thousands of designs, one subscription — cancel anytime.</p>
          <div className="dss-cta-actions">
            <a href="tel:+919500036310" className="dss-cta-btn-primary">Browse Free Designs</a>
            <a href="tel:+919500036310" className="dss-cta-btn-ghost">View Pricing</a>
          </div>
        </div>
      </section>

    </div>
  )
}
