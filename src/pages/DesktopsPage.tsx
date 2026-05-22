import { Link } from 'react-router-dom'
import './DesktopsPage.css'

/* ── Image URLs ────────────────────────────────────────────────── */
const COLLAGE_IMGS = [
  'https://images.unsplash.com/photo-1593152167544-085d3b9c4938?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1735948055457-8d816fb80a87?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1593640495253-23196b27a87f?auto=format&fit=crop&w=800&q=85',
  'https://images.pexels.com/photos/7172661/pexels-photo-7172661.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
]

const PROD_IMGS = {
  hp: 'https://images.pexels.com/photos/9072379/pexels-photo-9072379.jpeg?auto=compress&cs=tinysrgb&w=600',
  dell: 'https://images.unsplash.com/photo-1723118460404-b9c59ec3dbe0?fm=jpg&q=80&w=600&auto=format&fit=crop',
  asus: 'https://images.pexels.com/photos/18304033/pexels-photo-18304033.jpeg?auto=compress&cs=tinysrgb&w=600',
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
    title: 'Office Desktops',
    desc: 'Reliable, quiet, and efficient. Perfect for daily business use.',
    band: 'dsk-cat-band--blue',
  },
  {
    title: 'Gaming PCs',
    desc: 'High FPS. RTX-powered rigs. Built to win.',
    band: 'dsk-cat-band--red',
  },
  {
    title: 'All-in-One PCs',
    desc: 'Clean desk, powerful machine. No cables, no clutter.',
    band: 'dsk-cat-band--silver',
  },
  {
    title: 'Custom Builds',
    desc: 'You choose the parts. We build it. Exactly what you need.',
    band: 'dsk-cat-band--gold',
  },
]

const PRODUCTS: Product[] = [
  {
    brand: 'HP',
    brandColor: '#0066cc',
    brandBg: 'rgba(0,102,204,0.08)',
    name: 'HP Pavilion Desktop',
    specs: 'Core i5, 8GB RAM, 512GB SSD\nWindows 11 Home',
    price: '₹44,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #003087 0%, #0066cc 100%)',
    img: PROD_IMGS.hp,
  },
  {
    brand: 'Dell',
    brandColor: '#444444',
    brandBg: 'rgba(68,68,68,0.07)',
    name: 'Dell OptiPlex 3000',
    specs: 'Core i5, 16GB RAM, 512GB SSD\nSmall Form Factor',
    price: '₹58,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #222222 0%, #555555 100%)',
    img: PROD_IMGS.dell,
  },
  {
    brand: 'Lenovo',
    brandColor: '#e31837',
    brandBg: 'rgba(227,24,55,0.08)',
    name: 'Lenovo IdeaCentre',
    specs: 'Core i7, 16GB RAM\n1TB HDD + 256GB SSD',
    price: '₹64,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #e31837 0%, #8b0000 100%)',
  },
  {
    brand: 'Asus',
    brandColor: '#0a0a0a',
    brandBg: 'rgba(0,0,0,0.06)',
    name: 'Asus All-in-One PC',
    specs: 'Core i5, 8GB RAM, 512GB SSD\n23.8" FHD Display',
    price: '₹72,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
    img: PROD_IMGS.asus,
  },
  {
    brand: 'HP',
    brandColor: '#0066cc',
    brandBg: 'rgba(0,102,204,0.08)',
    name: 'HP Z2 Workstation',
    specs: 'Core i9, 32GB RAM, 1TB SSD\nRTX A2000 6GB',
    price: '₹1,84,999',
    badge: 'blue',
    badgeLabel: 'On Order',
    gradient: 'linear-gradient(135deg, #001a4d 0%, #003399 100%)',
  },
  {
    brand: 'Custom',
    brandColor: '#fca311',
    brandBg: 'rgba(252,163,17,0.1)',
    name: 'Custom Gaming PC',
    specs: 'Ryzen 9, 32GB RAM, RTX 4070\n2TB NVMe SSD',
    price: '₹1,20,000+',
    badge: 'orange',
    badgeLabel: 'Build to Order',
    gradient: 'linear-gradient(135deg, #1a0d00 0%, #3d2100 50%, #7a4200 100%)',
  },
]

/* ── Component ─────────────────────────────────────────────────── */
export default function DesktopsPage() {
  return (
    <div className="dsk-root">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="dsk-hero">
        <div className="dsk-hero-inner">

          <div className="dsk-hero-left">
            <span className="dsk-hero-eyebrow">Desktop Computers</span>

            <h1 className="dsk-hero-headline">{'Built to\ndominate.'}</h1>

            <p className="dsk-hero-sub">
              Towers, all-in-ones, and custom builds — for offices,
              studios, schools, and serious gamers.
            </p>

            <div className="dsk-hero-ctas">
              <Link to="/electronics" className="dsk-btn-primary">
                Explore Desktops
              </Link>
              <a href="tel:+919500036310" className="dsk-btn-ghost">
                Call us
              </a>
            </div>

            <div className="dsk-hero-trust">
              {['Custom Builds', 'Bulk Orders', '1-Year Warranty', 'On-site Setup'].map(
                (badge) => (
                  <span key={badge} className="dsk-trust-badge">
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="dsk-hero-right">
            <div className="dsk-hero-visual">
              <div className="dsk-collage">
                {COLLAGE_IMGS.map((src, i) => (
                  <img key={i} src={src} alt="" className="dsk-collage-img" loading="lazy" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. CATEGORY CARDS ───────────────────────────────────── */}
      <section className="dsk-categories">
        <div className="dsk-categories-inner">
          <div className="dsk-section-header">
            <span className="dsk-section-label">Shop by Type</span>
            <h2 className="dsk-section-title">Find your desktop</h2>
          </div>

          <div className="dsk-cat-grid">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="dsk-cat-card">
                <div className={`dsk-cat-band ${cat.band}`} />
                <div className="dsk-cat-body">
                  <div>
                    <h3 className="dsk-cat-title">{cat.title}</h3>
                    <p className="dsk-cat-desc">{cat.desc}</p>
                  </div>
                  <span className="dsk-cat-link">Shop</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="dsk-products">
        <div className="dsk-products-inner">
          <div className="dsk-section-header">
            <span className="dsk-section-label dsk-section-label--dark">Available Now</span>
            <h2 className="dsk-section-title dsk-section-title--light">Featured Desktops</h2>
          </div>

          <div className="dsk-prod-grid">
            {PRODUCTS.map((prod) => (
              <div key={prod.name} className="dsk-prod-card">
                {/* Badge */}
                <span className={`dsk-prod-badge dsk-prod-badge--${prod.badge}`}>
                  {prod.badgeLabel}
                </span>

                {/* Image / Placeholder */}
                <div className="dsk-prod-img-wrap">
                  {prod.img ? (
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="dsk-prod-img"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="dsk-prod-placeholder"
                      style={{ background: prod.gradient }}
                    >
                      <span className="dsk-prod-placeholder-label">{prod.brand}</span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="dsk-prod-body">
                  <span
                    className="dsk-prod-brand-tag"
                    style={{ color: prod.brandColor, background: prod.brandBg }}
                  >
                    {prod.brand}
                  </span>
                  <h3 className="dsk-prod-name">{prod.name}</h3>
                  <p className="dsk-prod-specs">{prod.specs}</p>
                  <p className="dsk-prod-price">{prod.price}</p>
                  <button className="dsk-prod-quote-btn">Get Quote</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BULK ORDERS BANNER ───────────────────────────────── */}
      <section className="dsk-bulk">
        <div className="dsk-bulk-inner">
          {/* Left */}
          <div className="dsk-bulk-left">
            <div className="dsk-bulk-accent-line" />
            <h2 className="dsk-bulk-headline">
              Corporate &amp; School<br />Bulk Orders
            </h2>
            <p className="dsk-bulk-desc">
              Supplying desktops to Chennai's offices, schools, and institutions for years.
              Volume discounts, guaranteed delivery timelines, and on-site installation — all
              covered under one quote.
            </p>
            <a href="tel:+919500036310" className="dsk-bulk-btn">
              Get a Bulk Quote
            </a>
          </div>

          {/* Right — Stats */}
          <div className="dsk-bulk-stats">
            <div className="dsk-bulk-big-num">
              500<span>+</span>
            </div>
            <div className="dsk-bulk-big-label">Setups Completed</div>
            <div className="dsk-bulk-stat-rows">
              <div className="dsk-bulk-stat-row">
                <span className="dsk-bulk-stat-row-label">Schools Served</span>
                <span className="dsk-bulk-stat-row-val">80+</span>
              </div>
              <div className="dsk-bulk-stat-row">
                <span className="dsk-bulk-stat-row-label">Corporate Clients</span>
                <span className="dsk-bulk-stat-row-val">120+</span>
              </div>
              <div className="dsk-bulk-stat-row">
                <span className="dsk-bulk-stat-row-label">Avg Turnaround</span>
                <span className="dsk-bulk-stat-row-val">48 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. WHY BUY ──────────────────────────────────────────── */}
      <section className="dsk-why">
        <div className="dsk-why-inner">
          <div className="dsk-why-header">
            <h2 className="dsk-why-title">Why Goldmine Infotech?</h2>
            <p className="dsk-why-sub">
              The trusted desktop supplier for Chennai homes, offices, and schools.
            </p>
          </div>

          <div className="dsk-why-grid">
            <div className="dsk-why-item">
              <div className="dsk-why-num">01</div>
              <h3 className="dsk-why-item-title">Authorised Dealer</h3>
              <p className="dsk-why-item-desc">
                Official dealer for HP, Dell, Lenovo, and Asus. Every unit comes
                with genuine brand warranty and service support.
              </p>
            </div>

            <div className="dsk-why-item">
              <div className="dsk-why-num">02</div>
              <h3 className="dsk-why-item-title">EMI &amp; Flexible Payment</h3>
              <p className="dsk-why-item-desc">
                0% EMI options on leading cards. Bulk purchase financing available
                for businesses and institutions.
              </p>
            </div>

            <div className="dsk-why-item">
              <div className="dsk-why-num">03</div>
              <h3 className="dsk-why-item-title">On-site Setup &amp; Support</h3>
              <p className="dsk-why-item-desc">
                Our technicians deliver, install, and configure everything on-site.
                Annual maintenance contracts available for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA STRIP ────────────────────────────────────────── */}
      <section className="dsk-cta">
        <div className="dsk-cta-inner">
          <span className="dsk-cta-eyebrow">Let's talk</span>
          <h2 className="dsk-cta-headline">Ready to power up?</h2>
          <p className="dsk-cta-sub">
            Whether you need one desktop or a hundred — our team will configure the right
            setup, at the right price, delivered to your door.
          </p>
          <div className="dsk-cta-btns">
            <a
              href="https://wa.me/919500036310"
              target="_blank"
              rel="noopener noreferrer"
              className="dsk-btn-whatsapp"
            >
              WhatsApp Us
            </a>
            <Link to="/electronics" className="dsk-btn-store">
              Visit Our Store
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
