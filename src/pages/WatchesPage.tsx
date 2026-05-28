import { Link } from 'react-router-dom'
import './WatchesPage.css'
import { useContactModal } from '../context/ContactModalContext'
import LogoBarDark from '../components/LogoBarDark'

/* ── Brand Logos ────────────────────────────────────────────────── */
const WATCH_BRANDS = [
  { name: 'Samsung', url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/samsung.svg', className: 'logo-invert logo-xlarge' },
  { name: 'Apple', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', className: 'logo-invert' },
  { name: 'Garmin', url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/garmin.svg', className: 'logo-invert logo-xlarge' },
]

/* ── Image URLs ────────────────────────────────────────────────── */
const COLLAGE_IMGS = [
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1586336153815-3b8df8f0d3ce?auto=format&fit=crop&w=800&q=85',
]

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
    title: 'Analog Watches',
    desc: 'Timeless dial craftsmanship. Dress watches, sports chronographs, and everyday classics.',
    band: 'wtc-cat-band--teal',
  },
  {
    title: 'Digital Watches',
    desc: 'Precision LCD/LED displays. Lap timers, world clocks, backlight — built for utility.',
    band: 'wtc-cat-band--dark',
  },
  {
    title: 'Luxury & Premium',
    desc: 'Swiss movement, sapphire crystal, stainless steel. Statement pieces that last decades.',
    band: 'wtc-cat-band--gold',
  },
  {
    title: 'Sports & Rugged',
    desc: 'Water-resistant, shock-proof, 200m dive rating. Engineered for the outdoors.',
    band: 'wtc-cat-band--rose',
  },
]

const PRODUCTS: Product[] = [
  {
    brand: 'Casio',
    brandColor: '#00579d',
    brandBg: 'rgba(0,87,157,0.08)',
    name: 'Casio G-Shock GA-2100',
    specs: 'Carbon Core Guard, 200M Water Resistant\nMulti-Band 6 Atomic Timekeeping',
    price: '₹8,495',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #002d5a 0%, #00579d 100%)',
  },
  {
    brand: 'Fossil',
    brandColor: '#8b6914',
    brandBg: 'rgba(139,105,20,0.08)',
    name: 'Fossil Neutra Chronograph',
    specs: 'Stainless Steel Case, Leather Strap\nMineral Crystal, 50M Water Resistant',
    price: '₹11,995',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #4a3700 0%, #8b6914 100%)',
  },
  {
    brand: 'Titan',
    brandColor: '#b22222',
    brandBg: 'rgba(178,34,34,0.07)',
    name: 'Titan Raga Espana',
    specs: 'Rose Gold PVD Case, Mother of Pearl Dial\nSwarovski Crystals, 30M Water Resistant',
    price: '₹6,995',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #7a0000 0%, #b22222 100%)',
  },
  {
    brand: 'Samsung',
    brandColor: '#1428A0',
    brandBg: 'rgba(20,40,160,0.08)',
    name: 'Seiko Presage SRPD41',
    specs: 'Automatic Movement, 24 Jewels\nHardex Glass, 50M Water Resistant',
    price: '₹22,995',
    badge: 'blue',
    badgeLabel: 'On Order',
    gradient: 'linear-gradient(135deg, #0d1a6e 0%, #1428A0 100%)',
  },
  {
    brand: 'Casio',
    brandColor: '#00579d',
    brandBg: 'rgba(0,87,157,0.08)',
    name: 'Casio Edifice EQS-930',
    specs: 'Solar Powered, Tough Solar\nMulti-Band Atomic, Sapphire Crystal',
    price: '₹17,995',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #001a3a 0%, #003d70 100%)',
  },
  {
    brand: 'Garmin',
    brandColor: '#006e6e',
    brandBg: 'rgba(0,110,110,0.08)',
    name: 'Garmin Instinct 2 Solar',
    specs: 'Solar Charging, GPS + GLONASS\nHeart Rate, 100M Water Resistant',
    price: '₹34,990',
    badge: 'orange',
    badgeLabel: 'Limited Stock',
    gradient: 'linear-gradient(135deg, #003535 0%, #006e6e 100%)',
  },
]

/* ── Component ─────────────────────────────────────────────────── */
export default function WatchesPage() {
  const { openModal } = useContactModal()
  return (
    <div className="wtc-root">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="wtc-hero">
        <div className="wtc-hero-inner">

          <div className="wtc-hero-left">
            <span className="wtc-hero-eyebrow">Wristwatches</span>

            <h1 className="wtc-hero-headline">{'Time, worn\nperfectly.'}</h1>

            <p className="wtc-hero-sub">
              Casio, Fossil, Titan, Garmin &amp; more — analog, digital, and automatic.
              Every style, every budget, all genuine pieces.
            </p>

            <div className="wtc-hero-ctas">
              <Link to="/electronics" className="wtc-btn-primary">
                Browse Collection
              </Link>
              <a href="tel:+919500036310" className="wtc-btn-ghost">
                Call +91 95000 36310
              </a>
            </div>

            <div className="wtc-hero-trust">
              {['Genuine Products', 'Brand Warranty', 'EMI Available', 'Same-Day Pickup'].map(
                (badge) => (
                  <span key={badge} className="wtc-trust-badge">
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="wtc-hero-right">
            <div className="wtc-hero-visual">
              <div className="wtc-collage">
                {COLLAGE_IMGS.map((src, i) => (
                  <img key={i} src={src} alt="" className="wtc-collage-img" loading="lazy" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. BRAND STRIP ──────────────────────────────────────── */}
      <LogoBarDark brands={WATCH_BRANDS} label="Brands we carry" />

      {/* ── 3. CATEGORY CARDS ───────────────────────────────────── */}
      <section className="wtc-categories">
        <div className="wtc-categories-inner">
          <div className="wtc-section-header">
            <span className="wtc-section-label">Shop by Type</span>
            <h2 className="wtc-section-title">Find your watch</h2>
          </div>

          <div className="wtc-cat-grid">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="wtc-cat-card">
                <div className={`wtc-cat-band ${cat.band}`} />
                <div className="wtc-cat-body">
                  <div>
                    <h3 className="wtc-cat-title">{cat.title}</h3>
                    <p className="wtc-cat-desc">{cat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="wtc-products">
        <div className="wtc-products-inner">
          <div className="wtc-section-header">
            <span className="wtc-section-label wtc-section-label--dark">In Stock Now</span>
            <h2 className="wtc-section-title wtc-section-title--dark">Featured Watches</h2>
          </div>

          <div className="wtc-prod-grid">
            {PRODUCTS.map((prod) => (
              <div key={prod.name} className="wtc-prod-card">
                <span className={`wtc-prod-badge wtc-prod-badge--${prod.badge}`}>
                  {prod.badgeLabel}
                </span>

                <div className="wtc-prod-img-wrap">
                  {prod.img ? (
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="wtc-prod-img"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="wtc-prod-placeholder"
                      style={{ background: prod.gradient }}
                    >
                      <span className="wtc-prod-placeholder-label">{prod.brand}</span>
                    </div>
                  )}
                </div>

                <div className="wtc-prod-body">
                  <span
                    className="wtc-prod-brand-tag"
                    style={{ color: prod.brandColor, background: prod.brandBg }}
                  >
                    {prod.brand}
                  </span>
                  <h3 className="wtc-prod-name">{prod.name}</h3>
                  <p className="wtc-prod-specs">{prod.specs}</p>
                  <p className="wtc-prod-price">{prod.price}</p>
                  <button
                    className="wtc-prod-enquire-btn"
                    onClick={() => openModal({
                      badge: prod.brand,
                      badgeColor: 'blue',
                      title: `Get a Quote — ${prod.name}`,
                      subtitle: prod.specs.replace('\n', ' · '),
                      prefillMessage: `Hi, I'm interested in the ${prod.name} (${prod.specs.replace('\n', ', ')}). Please share pricing and availability.`,
                    })}
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHY BUY ──────────────────────────────────────────── */}
      <section className="wtc-why">
        <div className="wtc-why-inner">
          <div className="wtc-why-header">
            <h2 className="wtc-why-title">Why Buy From Us?</h2>
            <p className="wtc-why-sub">Chennai's trusted electronics dealer since day one.</p>
          </div>

          <div className="wtc-why-grid">
            <div className="wtc-why-item">
              <div className="wtc-why-num">01</div>
              <h3 className="wtc-why-item-title">Authorised Dealer</h3>
              <p className="wtc-why-item-desc">
                Every watch is genuine, box-packed, and sold with full brand warranty.
                No grey-market imports, no refurbished units.
              </p>
            </div>

            <div className="wtc-why-item">
              <div className="wtc-why-num">02</div>
              <h3 className="wtc-why-item-title">EMI &amp; Bulk Pricing</h3>
              <p className="wtc-why-item-desc">
                0% EMI on major credit cards. Special rates for gifting orders,
                corporate purchases, and bulk quantities.
              </p>
            </div>

            <div className="wtc-why-item">
              <div className="wtc-why-num">03</div>
              <h3 className="wtc-why-item-title">Expert Guidance</h3>
              <p className="wtc-why-item-desc">
                Not sure which movement or strap suits you? Our team helps you
                pick the right watch for your lifestyle and budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA STRIP ────────────────────────────────────────── */}
      <section className="wtc-cta">
        <div className="wtc-cta-inner">
          <span className="wtc-cta-eyebrow">Contact us to enquire</span>
          <h2 className="wtc-cta-headline">Looking for a specific watch?</h2>
          <p className="wtc-cta-sub">
            Tell us the brand, model, or budget and we'll source it for you.
            WhatsApp us for the fastest response.
          </p>
          <div className="wtc-cta-btns">
            <a
              href="https://wa.me/919500036310"
              target="_blank"
              rel="noopener noreferrer"
              className="wtc-btn-whatsapp"
            >
              WhatsApp Us
            </a>
            <Link to="/electronics" className="wtc-btn-store">
              Visit Our Store
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
