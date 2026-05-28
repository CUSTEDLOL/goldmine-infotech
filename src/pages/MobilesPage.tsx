import { Link } from 'react-router-dom'
import './MobilesPage.css'
import { useContactModal } from '../context/ContactModalContext'
import LogoBarDark from '../components/LogoBarDark'

/* ── Brand Logos ────────────────────────────────────────────────── */
const MOBILE_BRANDS = [
  { name: 'Samsung',  url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/samsung.svg', className: 'logo-xlarge' },
  { name: 'Apple',    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'OnePlus',  url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/oneplus.svg' },
  { name: 'Xiaomi',   url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/xiaomi.svg', className: 'logo-xlarge' },
  { name: 'Motorola', url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/motorola.svg', className: 'logo-xlarge' },
  { name: 'Sony',     url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
  { name: 'Nokia',    url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/nokia.svg', className: 'logo-xlarge' },
]

/* ── Image URLs ────────────────────────────────────────────────── */
const COLLAGE_IMGS = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=85',
  'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=85',
]

const PROD_IMGS = {
  samsung: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
  iphone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
  oneplus: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600',
  xiaomi: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
  realme: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
  samsungs24: 'https://images.unsplash.com/photo-1610945264803-c22b62831e6b?auto=format&fit=crop&w=600&q=80',
}

/* ── Types ─────────────────────────────────────────────────────── */
interface CategoryCard {
  title: string
  desc: string
  band: string
}

interface Product {
  brand: string
  brandColor: string
  brandBg: string
  name: string
  specs: string
  price: string
  badge: 'green' | 'blue' | 'orange'
  badgeLabel: string
  gradient: string
  img?: string
}

/* ── Data ──────────────────────────────────────────────────────── */
const CATEGORIES: CategoryCard[] = [
  {
    title: 'Budget Phones',
    desc: '₹8,000–₹15,000. Reliable daily drivers with great battery life.',
    band: 'mob-cat-band--blue',
  },
  {
    title: 'Mid-Range Phones',
    desc: '₹15,000–₹30,000. Best performance-per-rupee on the market.',
    band: 'mob-cat-band--gold',
  },
  {
    title: 'Flagship Phones',
    desc: '₹30,000+. Best-in-class cameras, speed, and display technology.',
    band: 'mob-cat-band--dark',
  },
  {
    title: 'Business Phones',
    desc: 'Knox, MDM-ready, enterprise security. Built for professional use.',
    band: 'mob-cat-band--green',
  },
]

const PRODUCTS: Product[] = [
  {
    brand: 'Samsung',
    brandColor: '#1428A0',
    brandBg: 'rgba(20,40,160,0.08)',
    name: 'Samsung Galaxy A55 5G',
    specs: '6.6" AMOLED, 50MP Camera\n5000mAh, 5G Ready',
    price: 'Starts from ₹34,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #0d1a6e 0%, #1428A0 100%)',
    img: PROD_IMGS.samsung,
  },
  {
    brand: 'Apple',
    brandColor: '#1d1d1f',
    brandBg: 'rgba(29,29,31,0.07)',
    name: 'iPhone 15 128GB',
    specs: '6.1" OLED, A16 Bionic\n48MP Camera, USB-C',
    price: 'Starts from ₹69,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #111111 0%, #3a3a3c 100%)',
    img: PROD_IMGS.iphone,
  },
  {
    brand: 'OnePlus',
    brandColor: '#F5010C',
    brandBg: 'rgba(245,1,12,0.07)',
    name: 'OnePlus 12R',
    specs: '6.78" AMOLED, Snapdragon 8 Gen 2\n100W SuperVOOC Charging',
    price: 'Starts from ₹42,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #8b0000 0%, #F5010C 100%)',
    img: PROD_IMGS.oneplus,
  },
  {
    brand: 'Xiaomi',
    brandColor: '#ff6900',
    brandBg: 'rgba(255,105,0,0.08)',
    name: 'Redmi Note 13 Pro+',
    specs: '6.67" AMOLED, 200MP Camera\n120W HyperCharge',
    price: 'Starts from ₹29,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #8b3700 0%, #ff6900 100%)',
    img: PROD_IMGS.xiaomi,
  },
  {
    brand: 'Realme',
    brandColor: '#c2a000',
    brandBg: 'rgba(194,160,0,0.09)',
    name: 'Realme 12 Pro+',
    specs: '6.7" AMOLED, 50MP Periscope\n67W SuperDart Charging',
    price: 'Starts from ₹26,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #6b5800 0%, #c2a000 100%)',
    img: PROD_IMGS.realme,
  },
  {
    brand: 'Samsung',
    brandColor: '#1428A0',
    brandBg: 'rgba(20,40,160,0.08)',
    name: 'Samsung Galaxy S24',
    specs: '6.2" Dynamic AMOLED\nSnapdragon 8 Gen 3, 50MP AI Cam',
    price: 'Starts from ₹74,999',
    badge: 'orange',
    badgeLabel: 'Limited Stock',
    gradient: 'linear-gradient(135deg, #060e40 0%, #0d1a6e 100%)',
    img: PROD_IMGS.samsungs24,
  },
]

/* ── Component ─────────────────────────────────────────────────── */
export default function MobilesPage() {
  const { openModal } = useContactModal()
  return (
    <div className="mob-root">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="mob-hero">
        <div className="mob-hero-inner">

          <div className="mob-hero-left">
            <span className="mob-hero-eyebrow">Mobile Phones</span>

            <h1 className="mob-hero-headline">{'Always\nconnected.'}</h1>

            <p className="mob-hero-sub">
              Samsung, Apple, OnePlus &amp; more — unlocked, box-packed, with warranty.
              Budget to flagship, we stock them all.
            </p>

            <div className="mob-hero-ctas">
              <Link to="/electronics" className="mob-btn-primary">
                Browse Collection
              </Link>
              <a href="tel:+919500036310" className="mob-btn-ghost">
                Call +91 95000 36310
              </a>
            </div>

            <div className="mob-hero-trust">
              {['Same-Day Pickup', 'EMI Available', 'Box Packed', '1-Year Warranty'].map(
                (badge) => (
                  <span key={badge} className="mob-trust-badge">
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="mob-hero-right">
            <div className="mob-hero-visual">
              <div className="mob-collage">
                {COLLAGE_IMGS.map((src, i) => (
                  <img key={i} src={src} alt="" className="mob-collage-img" loading="lazy" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. BRAND STRIP ──────────────────────────────────────── */}
      <LogoBarDark brands={MOBILE_BRANDS} label="Brands we carry" />

      {/* ── 3. CATEGORY CARDS ───────────────────────────────────── */}
      <section className="mob-categories">
        <div className="mob-categories-inner">
          <div className="mob-section-header">
            <span className="mob-section-label">Shop by Budget</span>
            <h2 className="mob-section-title">Find your phone</h2>
          </div>

          <div className="mob-cat-grid">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="mob-cat-card">
                <div className={`mob-cat-band ${cat.band}`} />
                <div className="mob-cat-body">
                  <div>
                    <h3 className="mob-cat-title">{cat.title}</h3>
                    <p className="mob-cat-desc">{cat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="mob-products">
        <div className="mob-products-inner">
          <div className="mob-section-header">
            <span className="mob-section-label mob-section-label--dark">In Stock Now</span>
            <h2 className="mob-section-title mob-section-title--dark">Featured Phones</h2>
          </div>

          <div className="mob-prod-grid">
            {PRODUCTS.map((prod) => (
              <div key={prod.name} className="mob-prod-card">
                <span className={`mob-prod-badge mob-prod-badge--${prod.badge}`}>
                  {prod.badgeLabel}
                </span>

                <div className="mob-prod-img-wrap">
                  {prod.img ? (
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="mob-prod-img"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="mob-prod-placeholder"
                      style={{ background: prod.gradient }}
                    >
                      <span className="mob-prod-placeholder-label">{prod.brand}</span>
                    </div>
                  )}
                </div>

                <div className="mob-prod-body">
                  <span
                    className="mob-prod-brand-tag"
                    style={{ color: prod.brandColor, background: prod.brandBg }}
                  >
                    {prod.brand}
                  </span>
                  <h3 className="mob-prod-name">{prod.name}</h3>
                  <p className="mob-prod-specs">{prod.specs}</p>
                  <p className="mob-prod-price">{prod.price}</p>
                  <button
                    className="mob-prod-quote-btn"
                    onClick={() => openModal({
                      badge: prod.brand,
                      badgeColor: 'blue',
                      title: `Get a Quote — ${prod.name}`,
                      subtitle: prod.specs.replace('\n', ' · '),
                      prefillMessage: `Hi, I'm interested in the ${prod.name} (${prod.specs.replace('\n', ', ')}). Please share pricing and availability.`,
                    })}
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHY BUY ──────────────────────────────────────────── */}
      <section className="mob-why">
        <div className="mob-why-inner">
          <div className="mob-why-header">
            <h2 className="mob-why-title">Why Buy From Us?</h2>
            <p className="mob-why-sub">Chennai's trusted electronics dealer since day one.</p>
          </div>

          <div className="mob-why-grid">
            <div className="mob-why-item">
              <div className="mob-why-num">01</div>
              <h3 className="mob-why-item-title">Authorised Dealer</h3>
              <p className="mob-why-item-desc">
                All handsets are genuine, box-packed, and carry full brand warranty —
                no refurbished, no grey-market units.
              </p>
            </div>

            <div className="mob-why-item">
              <div className="mob-why-num">02</div>
              <h3 className="mob-why-item-title">EMI &amp; Easy Payment</h3>
              <p className="mob-why-item-desc">
                0% EMI on all major credit and debit cards. Get the flagship
                you want without stretching your monthly budget.
              </p>
            </div>

            <div className="mob-why-item">
              <div className="mob-why-num">03</div>
              <h3 className="mob-why-item-title">Setup &amp; Data Transfer</h3>
              <p className="mob-why-item-desc">
                We set up your new phone, transfer contacts and data, and configure
                your accounts — walk out ready to go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA STRIP ────────────────────────────────────────── */}
      <section className="mob-cta">
        <div className="mob-cta-inner">
          <span className="mob-cta-eyebrow">We're here to help</span>
          <h2 className="mob-cta-headline">Need help choosing?</h2>
          <p className="mob-cta-sub">
            Tell us your budget and what matters most — camera, battery, or speed.
            Our team will shortlist the best options for you.
          </p>
          <div className="mob-cta-btns">
            <a
              href="https://wa.me/919500036310"
              target="_blank"
              rel="noopener noreferrer"
              className="mob-btn-whatsapp"
            >
              WhatsApp Us
            </a>
            <Link to="/electronics" className="mob-btn-store">
              Visit Our Store
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
