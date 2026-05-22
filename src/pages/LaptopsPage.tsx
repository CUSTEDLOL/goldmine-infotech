import { Link } from 'react-router-dom'
import './LaptopsPage.css'

/* ── Image URLs ────────────────────────────────────────────────── */
const COLLAGE_IMGS = [
  'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=85',
  'https://images.pexels.com/photos/3747070/pexels-photo-3747070.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1640551497504-ec05b9e50b50?auto=format&fit=crop&w=800&q=85',
]

const PROD_IMGS = {
  hp: 'https://images.pexels.com/photos/6968164/pexels-photo-6968164.jpeg?auto=compress&cs=tinysrgb&w=600',
  dell: 'https://images.unsplash.com/photo-1536528679846-3c5a38e3026b?fm=jpg&q=80&w=600&auto=format&fit=crop',
  lenovo: 'https://images.pexels.com/photos/8533592/pexels-photo-8533592.jpeg?auto=compress&cs=tinysrgb&w=600',
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
  badge: 'green' | 'orange'
  badgeLabel: string
  gradient: string
  img?: string
}

/* ── Data ──────────────────────────────────────────────────────── */
const CATEGORIES: CategoryCard[] = [
  {
    title: 'Student Laptops',
    desc: 'Lightweight, affordable. Perfect for classrooms and hostels.',
    band: 'lap-cat-band--blue',
  },
  {
    title: 'Business Laptops',
    desc: 'Thin, powerful, secure. Built for professionals on the move.',
    band: 'lap-cat-band--dark',
  },
  {
    title: 'Gaming Laptops',
    desc: 'High refresh, powerful GPU. For serious gamers.',
    band: 'lap-cat-band--red',
  },
  {
    title: 'Workstation Laptops',
    desc: 'Heavy compute for designers, engineers, and creators.',
    band: 'lap-cat-band--purple',
  },
]

const PRODUCTS: Product[] = [
  {
    brand: 'HP',
    brandColor: '#0066cc',
    brandBg: 'rgba(0,102,204,0.1)',
    name: 'HP Pavilion 15',
    specs: 'Core i5, 8GB RAM, 512GB SSD\n15.6" FHD Display',
    price: '₹52,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #003087 0%, #0066cc 100%)',
    img: PROD_IMGS.hp,
  },
  {
    brand: 'Dell',
    brandColor: '#444444',
    brandBg: 'rgba(68,68,68,0.08)',
    name: 'Dell Inspiron 14',
    specs: 'Core i7, 16GB RAM, 512GB SSD\n14" FHD Display',
    price: '₹68,499',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #333333 0%, #555555 100%)',
    img: PROD_IMGS.dell,
  },
  {
    brand: 'Lenovo',
    brandColor: '#e31837',
    brandBg: 'rgba(227,24,55,0.08)',
    name: 'Lenovo IdeaPad Gaming',
    specs: 'Ryzen 7, 16GB RAM, RTX 3050\n15.6" FHD 144Hz',
    price: '₹74,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #e31837 0%, #cc0000 100%)',
    img: PROD_IMGS.lenovo,
  },
  {
    brand: 'HP',
    brandColor: '#0066cc',
    brandBg: 'rgba(0,102,204,0.1)',
    name: 'HP EliteBook 840',
    specs: 'Core i7, 16GB RAM, 512GB SSD\n14" FHD Sure View',
    price: '₹89,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #003087 0%, #0066cc 100%)',
  },
  {
    brand: 'Asus',
    brandColor: '#0a0a0a',
    brandBg: 'rgba(0,0,0,0.06)',
    name: 'Asus VivoBook 15',
    specs: 'Core i3, 8GB RAM, 256GB SSD\n15.6" FHD Display',
    price: '₹38,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #000000 0%, #222222 100%)',
  },
  {
    brand: 'Dell',
    brandColor: '#444444',
    brandBg: 'rgba(68,68,68,0.08)',
    name: 'Dell XPS 13',
    specs: 'Core i7, 16GB RAM, 1TB SSD\n13.4" FHD+ InfinityEdge',
    price: '₹1,12,999',
    badge: 'orange',
    badgeLabel: 'Limited Stock',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #444444 100%)',
  },
]

/* ── Component ─────────────────────────────────────────────────── */
export default function LaptopsPage() {
  return (
    <div className="lap-root">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="lap-hero">
        <div className="lap-hero-inner">

          <div className="lap-hero-left">
            <span className="lap-hero-eyebrow">Laptops</span>

            <h1 className="lap-hero-headline">{'Power in\nyour hands.'}</h1>

            <p className="lap-hero-sub">
              HP, Dell, Lenovo &amp; more — in-store, same-day.
              Student to enterprise, we stock them all.
            </p>

            <div className="lap-hero-ctas">
              <Link to="/electronics" className="lap-btn-primary">
                Browse Collection
              </Link>
              <a href="tel:+919500036310" className="lap-btn-ghost">
                Call +91 95000 36310
              </a>
            </div>

            <div className="lap-hero-trust">
              {['Same-Day Pickup', 'EMI Available', '1-Year Warranty', 'Free Setup'].map(
                (badge) => (
                  <span key={badge} className="lap-trust-badge">
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="lap-hero-right">
            <div className="lap-hero-visual">
              <div className="lap-collage">
                {COLLAGE_IMGS.map((src, i) => (
                  <img key={i} src={src} alt="" className="lap-collage-img" loading="lazy" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. BRAND STRIP ──────────────────────────────────────── */}
      <section className="lap-brands">
        <div className="lap-brands-inner">
          {['HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'Apple', 'MSI', 'Samsung'].map(
            (brand, i, arr) => (
              <span key={brand} style={{ display: 'contents' }}>
                <span className="lap-brand-name">{brand}</span>
                {i < arr.length - 1 && (
                  <span className="lap-brand-sep" aria-hidden="true">·</span>
                )}
              </span>
            )
          )}
        </div>
      </section>

      {/* ── 3. CATEGORY CARDS ───────────────────────────────────── */}
      <section className="lap-categories">
        <div className="lap-categories-inner">
          <div className="lap-section-header">
            <span className="lap-section-label">Shop by Type</span>
            <h2 className="lap-section-title">Find your laptop</h2>
          </div>

          <div className="lap-cat-grid">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="lap-cat-card">
                <div className={`lap-cat-band ${cat.band}`} />
                <div className="lap-cat-body">
                  <div>
                    <h3 className="lap-cat-title">{cat.title}</h3>
                    <p className="lap-cat-desc">{cat.desc}</p>
                  </div>
                  <span className="lap-cat-link">Shop</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="lap-products">
        <div className="lap-products-inner">
          <div className="lap-section-header">
            <span className="lap-section-label">In Stock Now</span>
            <h2 className="lap-section-title lap-section-title--dark">Featured Laptops</h2>
          </div>

          <div className="lap-prod-grid">
            {PRODUCTS.map((prod) => (
              <div key={prod.name} className="lap-prod-card">
                {/* Badge */}
                <span className={`lap-prod-badge lap-prod-badge--${prod.badge}`}>
                  {prod.badgeLabel}
                </span>

                {/* Image / Placeholder */}
                <div className="lap-prod-img-wrap">
                  {prod.img ? (
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="lap-prod-img"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="lap-prod-placeholder"
                      style={{ background: prod.gradient }}
                    >
                      <span className="lap-prod-placeholder-label">{prod.brand}</span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="lap-prod-body">
                  <span
                    className="lap-prod-brand-tag"
                    style={{
                      color: prod.brandColor,
                      background: prod.brandBg,
                    }}
                  >
                    {prod.brand}
                  </span>
                  <h3 className="lap-prod-name">{prod.name}</h3>
                  <p className="lap-prod-specs">{prod.specs}</p>
                  <p className="lap-prod-price">{prod.price}</p>
                  <button className="lap-prod-quote-btn">Get Quote</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHY BUY ──────────────────────────────────────────── */}
      <section className="lap-why">
        <div className="lap-why-inner">
          <div className="lap-why-header">
            <h2 className="lap-why-title">Why buy from Goldmine Infotech?</h2>
            <p className="lap-why-sub">Chennai's trusted electronics dealer since day one.</p>
          </div>

          <div className="lap-why-grid">
            <div className="lap-why-item">
              <div className="lap-why-num">01</div>
              <h3 className="lap-why-item-title">Authorised Dealer</h3>
              <p className="lap-why-item-desc">
                All brands, genuine warranty. Buy with confidence — every unit is
                brand-certified and covered.
              </p>
            </div>

            <div className="lap-why-item">
              <div className="lap-why-num">02</div>
              <h3 className="lap-why-item-title">EMI &amp; Easy Payment</h3>
              <p className="lap-why-item-desc">
                0% EMI options available. Pay in flexible installments that work
                for your budget.
              </p>
            </div>

            <div className="lap-why-item">
              <div className="lap-why-num">03</div>
              <h3 className="lap-why-item-title">Free Delivery &amp; Setup</h3>
              <p className="lap-why-item-desc">
                We deliver to your doorstep and set everything up — so you're
                ready to work from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA STRIP ────────────────────────────────────────── */}
      <section className="lap-cta">
        <div className="lap-cta-inner">
          <span className="lap-cta-eyebrow">We're here to help</span>
          <h2 className="lap-cta-headline">Need help choosing?</h2>
          <p className="lap-cta-sub">
            Our team will help you pick the perfect laptop for your budget —
            whether it's for school, work, or gaming.
          </p>
          <div className="lap-cta-btns">
            <a
              href="https://wa.me/919500036310"
              target="_blank"
              rel="noopener noreferrer"
              className="lap-btn-whatsapp"
            >
              WhatsApp Us
            </a>
            <Link to="/electronics" className="lap-btn-store">
              Visit Our Store
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
