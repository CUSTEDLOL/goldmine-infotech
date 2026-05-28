import { Link } from 'react-router-dom'
import './TelevisionsPage.css'
import { useContactModal } from '../context/ContactModalContext'
import LogoBarDark from '../components/LogoBarDark'

/* ── Brand Logos ────────────────────────────────────────────────── */
const TV_BRANDS = [
  { name: 'Samsung',  url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/samsung.svg', className: 'logo-xlarge' },
  { name: 'LG',       url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg' },
  { name: 'Sony',     url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
  { name: 'Panasonic', url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/panasonic.svg', className: 'logo-xlarge' },
  { name: 'Philips',  url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Philips_logo_new.svg' },
  { name: 'Xiaomi',   url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/xiaomi.svg', className: 'logo-xlarge' },
]

/* ── Image URLs ────────────────────────────────────────────────── */
const COLLAGE_IMGS = [
  'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=800&q=85',
  'https://images.pexels.com/photos/5721869/pexels-photo-5721869.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=85',
]

const PROD_IMGS = {
  samsung: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80',
  lg: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
  sony: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=600&q=80',
  tcl: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=600',
  mi: 'https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg?auto=compress&cs=tinysrgb&w=600',
  frame: 'https://images.pexels.com/photos/6802052/pexels-photo-6802052.jpeg?auto=compress&cs=tinysrgb&w=600',
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
    title: 'Smart TVs',
    desc: 'Android & Tizen OS. Stream Netflix, Prime, and Disney+ effortlessly.',
    band: 'tvs-cat-band--purple',
  },
  {
    title: '4K Ultra HD',
    desc: 'Crystal-clear resolution. Cinema-quality visuals from your living room.',
    band: 'tvs-cat-band--blue',
  },
  {
    title: 'OLED & QLED',
    desc: 'Infinite contrast, a billion colours. The premium viewing experience.',
    band: 'tvs-cat-band--dark',
  },
  {
    title: 'Commercial Displays',
    desc: 'Digital signage for offices, hotels, and retail spaces.',
    band: 'tvs-cat-band--gold',
  },
]

const PRODUCTS: Product[] = [
  {
    brand: 'Samsung',
    brandColor: '#1428A0',
    brandBg: 'rgba(20,40,160,0.08)',
    name: 'Samsung Crystal 4K 43"',
    specs: '4K UHD Smart TV, HDR10+\nTizen OS, 3× HDMI',
    price: 'Starts from ₹39,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #0d1a6e 0%, #1428A0 100%)',
    img: PROD_IMGS.samsung,
  },
  {
    brand: 'LG',
    brandColor: '#a50034',
    brandBg: 'rgba(165,0,52,0.08)',
    name: 'LG OLED 55" C3',
    specs: 'OLED evo, 4K, 120Hz\nDolby Vision, webOS 23',
    price: 'Starts from ₹1,29,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #6b0022 0%, #a50034 100%)',
    img: PROD_IMGS.lg,
  },
  {
    brand: 'Sony',
    brandColor: '#000000',
    brandBg: 'rgba(0,0,0,0.07)',
    name: 'Sony Bravia 50"',
    specs: '4K HDR, Google TV\nDolby Atmos, HDMI 2.1',
    price: 'Starts from ₹64,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #111111 0%, #333333 100%)',
    img: PROD_IMGS.sony,
  },
  {
    brand: 'TCL',
    brandColor: '#e00034',
    brandBg: 'rgba(224,0,52,0.07)',
    name: 'TCL 65" Q-Series QLED',
    specs: 'QLED 4K, HDR10+\nGoogle TV, Dolby Vision IQ',
    price: 'Starts from ₹54,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #8b0000 0%, #e00034 100%)',
    img: PROD_IMGS.tcl,
  },
  {
    brand: 'Mi',
    brandColor: '#ff6900',
    brandBg: 'rgba(255,105,0,0.08)',
    name: 'Mi TV 4X 43"',
    specs: '4K Ultra HD, Android TV\nDolby Vision, 20W Speakers',
    price: 'Starts from ₹28,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #8b3700 0%, #ff6900 100%)',
    img: PROD_IMGS.mi,
  },
  {
    brand: 'Samsung',
    brandColor: '#1428A0',
    brandBg: 'rgba(20,40,160,0.08)',
    name: 'Samsung 75" The Frame',
    specs: 'QLED 4K, Art Mode\nBezel-less Design, Wi-Fi 5',
    price: 'Starts from ₹1,94,999',
    badge: 'blue',
    badgeLabel: 'On Order',
    gradient: 'linear-gradient(135deg, #060e40 0%, #0d1a6e 100%)',
    img: PROD_IMGS.frame,
  },
]

/* ── Component ─────────────────────────────────────────────────── */
export default function TelevisionsPage() {
  const { openModal } = useContactModal()
  return (
    <div className="tvs-root">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="tvs-hero">
        <div className="tvs-hero-inner">

          <div className="tvs-hero-left">
            <span className="tvs-hero-eyebrow">Televisions</span>

            <h1 className="tvs-hero-headline">{'Every frame.\nPerfected.'}</h1>

            <p className="tvs-hero-sub">
              Samsung, LG, Sony &amp; more — 4K, OLED, QLED, Smart TVs.
              All screen sizes. All budgets. Always in stock.
            </p>

            <div className="tvs-hero-ctas">
              <Link to="/electronics" className="tvs-btn-primary">
                Browse Collection
              </Link>
              <button
                className="tvs-btn-ghost"
                onClick={() => openModal({
                  badge: 'Televisions',
                  badgeColor: 'purple',
                  title: 'Get Expert Help',
                  subtitle: 'Tell us your room size and budget — we\'ll find the right TV for you.',
                  prefillMessage: 'Hi, I need help choosing a TV. Please recommend the best option for my room and budget.',
                })}
              >
                Get Expert Help
              </button>
            </div>

            <div className="tvs-hero-trust">
              {['Home Delivery', 'Wall Mounting', '1-Year Warranty', 'Expert Setup'].map(
                (badge) => (
                  <span key={badge} className="tvs-trust-badge">
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="tvs-hero-right">
            <div className="tvs-hero-visual">
              <div className="tvs-collage">
                {COLLAGE_IMGS.map((src, i) => (
                  <img key={i} src={src} alt="" className="tvs-collage-img" loading="lazy" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. BRAND STRIP ──────────────────────────────────────── */}
      <LogoBarDark brands={TV_BRANDS} label="Brands we carry" />

      {/* ── 3. CATEGORY CARDS ───────────────────────────────────── */}
      <section className="tvs-categories">
        <div className="tvs-categories-inner">
          <div className="tvs-section-header">
            <span className="tvs-section-label">Shop by Type</span>
            <h2 className="tvs-section-title">Find your TV</h2>
          </div>

          <div className="tvs-cat-grid">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="tvs-cat-card">
                <div className={`tvs-cat-band ${cat.band}`} />
                <div className="tvs-cat-body">
                  <div>
                    <h3 className="tvs-cat-title">{cat.title}</h3>
                    <p className="tvs-cat-desc">{cat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="tvs-products">
        <div className="tvs-products-inner">
          <div className="tvs-section-header">
            <span className="tvs-section-label tvs-section-label--dark">In Stock Now</span>
            <h2 className="tvs-section-title tvs-section-title--dark">Featured Televisions</h2>
          </div>

          <div className="tvs-prod-grid">
            {PRODUCTS.map((prod) => (
              <div key={prod.name} className="tvs-prod-card">
                <span className={`tvs-prod-badge tvs-prod-badge--${prod.badge}`}>
                  {prod.badgeLabel}
                </span>

                <div className="tvs-prod-img-wrap">
                  {prod.img ? (
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="tvs-prod-img"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="tvs-prod-placeholder"
                      style={{ background: prod.gradient }}
                    >
                      <span className="tvs-prod-placeholder-label">{prod.brand}</span>
                    </div>
                  )}
                </div>

                <div className="tvs-prod-body">
                  <span
                    className="tvs-prod-brand-tag"
                    style={{ color: prod.brandColor, background: prod.brandBg }}
                  >
                    {prod.brand}
                  </span>
                  <h3 className="tvs-prod-name">{prod.name}</h3>
                  <p className="tvs-prod-specs">{prod.specs}</p>
                  <p className="tvs-prod-price">{prod.price}</p>
                  <button
                    className="tvs-prod-quote-btn"
                    onClick={() => openModal({
                      badge: prod.brand,
                      badgeColor: 'purple',
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
      <section className="tvs-why">
        <div className="tvs-why-inner">
          <div className="tvs-why-header">
            <h2 className="tvs-why-title">Why Buy From Us?</h2>
            <p className="tvs-why-sub">Chennai's trusted electronics dealer since day one.</p>
          </div>

          <div className="tvs-why-grid">
            <div className="tvs-why-item">
              <div className="tvs-why-num">01</div>
              <h3 className="tvs-why-item-title">Authorised Dealer</h3>
              <p className="tvs-why-item-desc">
                Official dealer for Samsung, LG, Sony, and TCL. Every unit carries
                genuine brand warranty and authorised service centre support.
              </p>
            </div>

            <div className="tvs-why-item">
              <div className="tvs-why-num">02</div>
              <h3 className="tvs-why-item-title">Wall Mounting &amp; Setup</h3>
              <p className="tvs-why-item-desc">
                We deliver, mount, and configure your smart TV — apps, streaming,
                and sound system fully set up before we leave.
              </p>
            </div>

            <div className="tvs-why-item">
              <div className="tvs-why-num">03</div>
              <h3 className="tvs-why-item-title">EMI &amp; Bulk Orders</h3>
              <p className="tvs-why-item-desc">
                0% EMI for homes. Volume pricing and dedicated project support for
                hotels, schools, and corporate installations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA STRIP ────────────────────────────────────────── */}
      <section className="tvs-cta">
        <div className="tvs-cta-inner">
          <span className="tvs-cta-eyebrow">We're here to help</span>
          <h2 className="tvs-cta-headline">Need help choosing?</h2>
          <p className="tvs-cta-sub">
            Tell us your room size and budget — we'll recommend the perfect screen
            size, panel type, and smart OS for your setup.
          </p>
          <div className="tvs-cta-btns">
            <a
              href="https://wa.me/919500036310"
              target="_blank"
              rel="noopener noreferrer"
              className="tvs-btn-whatsapp"
            >
              WhatsApp Us
            </a>
            <Link to="/electronics" className="tvs-btn-store">
              Visit Our Store
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
