import { Link } from 'react-router-dom'
import './PrintersPage.css'
import { useContactModal } from '../context/ContactModalContext'
import LogoBarDark from '../components/LogoBarDark'

/* ── Brand Logos ────────────────────────────────────────────────── */
const PRINTER_BRANDS = [
  { name: 'HP',      url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
  { name: 'Epson',   url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Epson_logo.svg' },
  { name: 'Canon',   url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Canon_wordmark.svg' },
  { name: 'Brother', url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Brother_logo.svg' },
  { name: 'Samsung', url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/samsung.svg', className: 'logo-xlarge' },
  { name: 'Ricoh',   url: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Ricoh_logo.svg' },
]

/* ── Image URLs ────────────────────────────────────────────────── */
const COLLAGE_IMGS = [
  'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=85',
  'https://images.pexels.com/photos/4065892/pexels-photo-4065892.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
  'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=85',
  'https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=800&q=85',
]

const PROD_IMGS = {
  hp:         'https://images.pexels.com/photos/4065892/pexels-photo-4065892.jpeg?auto=compress&cs=tinysrgb&w=600',
  epson:      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
  canon:      'https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=600',
  hpofficejet:'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=80',
  brother:    'https://images.pexels.com/photos/4065892/pexels-photo-4065892.jpeg?auto=compress&cs=tinysrgb&w=600',
  canonlaser: 'https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=600',
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
    title: 'Laser Printers',
    desc: 'Sharp, fast, and cost-effective. Ideal for high-volume office printing.',
    band: 'prt-cat-band--green',
  },
  {
    title: 'Inkjet Printers',
    desc: 'Vibrant colour output. Perfect for home, design, and photo printing.',
    band: 'prt-cat-band--blue',
  },
  {
    title: 'Multifunction Printers',
    desc: 'Print, scan, copy, and fax — all in one compact unit.',
    band: 'prt-cat-band--dark',
  },
  {
    title: 'Photo Printers',
    desc: 'Studio-grade photo output for photographers and print labs.',
    band: 'prt-cat-band--teal',
  },
]

const PRODUCTS: Product[] = [
  {
    brand: 'HP',
    brandColor: '#0066cc',
    brandBg: 'rgba(0,102,204,0.08)',
    name: 'HP LaserJet Pro M404dn',
    specs: 'A4 Mono Laser, 40ppm\nAuto Duplex, LAN + USB',
    price: 'Starts from ₹19,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #003087 0%, #0066cc 100%)',
    img: PROD_IMGS.hp,
  },
  {
    brand: 'Epson',
    brandColor: '#003087',
    brandBg: 'rgba(0,48,135,0.08)',
    name: 'Epson EcoTank L3252',
    specs: 'A4 Inkjet, Wi-Fi Direct\n4-Colour Refillable Tank',
    price: 'Starts from ₹14,499',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #001a5e 0%, #003087 100%)',
    img: PROD_IMGS.epson,
  },
  {
    brand: 'Canon',
    brandColor: '#cc0000',
    brandBg: 'rgba(204,0,0,0.07)',
    name: 'Canon PIXMA G3060',
    specs: 'A4 Inkjet MFP, Wi-Fi\nPrint · Scan · Copy',
    price: 'Starts from ₹12,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #8b0000 0%, #cc0000 100%)',
    img: PROD_IMGS.canon,
  },
  {
    brand: 'HP',
    brandColor: '#0066cc',
    brandBg: 'rgba(0,102,204,0.08)',
    name: 'HP OfficeJet Pro 9020',
    specs: 'A4 Inkjet All-in-One\nADF, Auto Duplex, Wi-Fi',
    price: 'Starts from ₹22,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #003087 0%, #0066cc 100%)',
    img: PROD_IMGS.hpofficejet,
  },
  {
    brand: 'Brother',
    brandColor: '#006bb8',
    brandBg: 'rgba(0,107,184,0.08)',
    name: 'Brother DCP-L2541DW',
    specs: 'A4 Mono Laser MFP\nWi-Fi, Auto Duplex, ADF',
    price: 'Starts from ₹17,499',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #003d6e 0%, #006bb8 100%)',
    img: PROD_IMGS.brother,
  },
  {
    brand: 'Canon',
    brandColor: '#cc0000',
    brandBg: 'rgba(204,0,0,0.07)',
    name: 'Canon imageCLASS MF745Cdw',
    specs: 'A4 Colour Laser MFP\nCloud Print, ADF, 28ppm',
    price: 'Starts from ₹52,999',
    badge: 'orange',
    badgeLabel: 'Limited Stock',
    gradient: 'linear-gradient(135deg, #1a0000 0%, #8b0000 100%)',
    img: PROD_IMGS.canonlaser,
  },
]

/* ── Component ─────────────────────────────────────────────────── */
export default function PrintersPage() {
  const { openModal } = useContactModal()
  return (
    <div className="prt-root">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="prt-hero">
        <div className="prt-hero-inner">

          <div className="prt-hero-left">
            <span className="prt-hero-eyebrow">Printers &amp; Scanners</span>

            <h1 className="prt-hero-headline">{'Print with\nprecision.'}</h1>

            <p className="prt-hero-sub">
              HP, Epson, Canon &amp; Brother — laser, inkjet, multifunction.
              Office, home, or photo studio — we have it all in stock.
            </p>

            <div className="prt-hero-ctas">
              <Link to="/electronics" className="prt-btn-primary">
                Browse Collection
              </Link>
              <a href="tel:+919500036310" className="prt-btn-ghost">
                Call +91 95000 36310
              </a>
            </div>

            <div className="prt-hero-trust">
              {['Same-Day Pickup', 'EMI Available', '1-Year Warranty', 'Free Installation'].map(
                (badge) => (
                  <span key={badge} className="prt-trust-badge">
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="prt-hero-right">
            <div className="prt-hero-visual">
              <div className="prt-collage">
                {COLLAGE_IMGS.map((src, i) => (
                  <img key={i} src={src} alt="" className="prt-collage-img" loading="lazy" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. BRAND STRIP ──────────────────────────────────────── */}
      <LogoBarDark brands={PRINTER_BRANDS} label="Brands we carry" />

      {/* ── 3. CATEGORY CARDS ───────────────────────────────────── */}
      <section className="prt-categories">
        <div className="prt-categories-inner">
          <div className="prt-section-header">
            <span className="prt-section-label">Shop by Type</span>
            <h2 className="prt-section-title">Find your printer</h2>
          </div>

          <div className="prt-cat-grid">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="prt-cat-card">
                <div className={`prt-cat-band ${cat.band}`} />
                <div className="prt-cat-body">
                  <div>
                    <h3 className="prt-cat-title">{cat.title}</h3>
                    <p className="prt-cat-desc">{cat.desc}</p>
                  </div>
                  <span className="prt-cat-link">Shop</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="prt-products">
        <div className="prt-products-inner">
          <div className="prt-section-header">
            <span className="prt-section-label prt-section-label--dark">In Stock Now</span>
            <h2 className="prt-section-title prt-section-title--dark">Featured Printers</h2>
          </div>

          <div className="prt-prod-grid">
            {PRODUCTS.map((prod) => (
              <div key={prod.name} className="prt-prod-card">
                <span className={`prt-prod-badge prt-prod-badge--${prod.badge}`}>
                  {prod.badgeLabel}
                </span>

                <div className="prt-prod-img-wrap">
                  {prod.img ? (
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="prt-prod-img"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="prt-prod-placeholder"
                      style={{ background: prod.gradient }}
                    >
                      <span className="prt-prod-placeholder-label">{prod.brand}</span>
                    </div>
                  )}
                </div>

                <div className="prt-prod-body">
                  <span
                    className="prt-prod-brand-tag"
                    style={{ color: prod.brandColor, background: prod.brandBg }}
                  >
                    {prod.brand}
                  </span>
                  <h3 className="prt-prod-name">{prod.name}</h3>
                  <p className="prt-prod-specs">{prod.specs}</p>
                  <p className="prt-prod-price">{prod.price}</p>
                  <button
                    className="prt-prod-quote-btn"
                    onClick={() => openModal({
                      badge: prod.brand,
                      badgeColor: 'blue',
                      title: `Get a Quote — ${prod.name}`,
                      subtitle: prod.specs.replace('\n', ' · '),
                      prefillMessage: `Hi, I'm interested in the ${prod.name} (${prod.specs.replace('\n', ', ')}). Please share the price and availability.`,
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
      <section className="prt-why">
        <div className="prt-why-inner">
          <div className="prt-why-header">
            <h2 className="prt-why-title">Why buy from Goldmine Infotech?</h2>
            <p className="prt-why-sub">Chennai's trusted electronics dealer since day one.</p>
          </div>

          <div className="prt-why-grid">
            <div className="prt-why-item">
              <div className="prt-why-num">01</div>
              <h3 className="prt-why-item-title">Authorised Dealer</h3>
              <p className="prt-why-item-desc">
                Official dealer for HP, Epson, Canon, and Brother. Every unit comes
                with genuine brand warranty and full service support.
              </p>
            </div>

            <div className="prt-why-item">
              <div className="prt-why-num">02</div>
              <h3 className="prt-why-item-title">Toner &amp; Ink Supply</h3>
              <p className="prt-why-item-desc">
                We stock original cartridges, toner, and refill kits. Never run dry —
                order when you buy or reorder any time.
              </p>
            </div>

            <div className="prt-why-item">
              <div className="prt-why-num">03</div>
              <h3 className="prt-why-item-title">On-site Setup &amp; AMC</h3>
              <p className="prt-why-item-desc">
                Free installation and network configuration. Annual maintenance
                contracts available for offices with high print volumes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA STRIP ────────────────────────────────────────── */}
      <section className="prt-cta">
        <div className="prt-cta-inner">
          <span className="prt-cta-eyebrow">We're here to help</span>
          <h2 className="prt-cta-headline">Need help choosing?</h2>
          <p className="prt-cta-sub">
            Tell us your print volume and we'll recommend the perfect printer —
            laser vs inkjet, mono vs colour, home use vs enterprise.
          </p>
          <div className="prt-cta-btns">
            <a
              href="https://wa.me/919500036310"
              target="_blank"
              rel="noopener noreferrer"
              className="prt-btn-whatsapp"
            >
              WhatsApp Us
            </a>
            <Link to="/electronics" className="prt-btn-store">
              Visit Our Store
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
