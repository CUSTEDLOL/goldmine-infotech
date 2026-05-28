import { Link } from 'react-router-dom'
import './WatchesPage.css'
import { useContactModal } from '../context/ContactModalContext'
import LogoBarDark from '../components/LogoBarDark'

/* ── Brand Logos ────────────────────────────────────────────────── */
const WATCH_BRANDS = [
  { name: 'Samsung', url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/samsung.svg', className: 'logo-xlarge' },
  { name: 'Apple',   url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Garmin',  url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/garmin.svg', className: 'logo-xlarge' },
  { name: 'Google',  url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/google.svg' },
  { name: 'Fitbit',  url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/fitbit.svg' },
  { name: 'Huawei',  url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/huawei.svg' },
  { name: 'Xiaomi',  url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/xiaomi.svg', className: 'logo-xlarge' },
]

/* ── Image URLs ────────────────────────────────────────────────── */
const COLLAGE_IMGS = [
  'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=800&q=85',
  'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=800&q=85',
]

const PROD_IMGS = {
  applewatch:      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=600&q=80',
  samsungwatch:    'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=600&q=80',
  garmin:          'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
  fitbit:          'https://images.unsplash.com/photo-1575311373937-040b8e97fd29?auto=format&fit=crop&w=600&q=80',
  xiaomi:          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
  applewatchultra: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
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
    title: 'Health & Fitness',
    desc: 'SpO2, continuous heart rate, stress tracking, sleep analysis. Your 24/7 health companion.',
    band: 'sw-cat-band--green',
  },
  {
    title: 'GPS & Navigation',
    desc: 'Built-in GPS, route mapping, and multi-sport modes for runners, cyclists, and hikers.',
    band: 'sw-cat-band--sky',
  },
  {
    title: 'Premium & Luxury',
    desc: 'Titanium cases, sapphire crystal, cellular connectivity. The pinnacle of wearable tech.',
    band: 'sw-cat-band--dark',
  },
  {
    title: 'Kids & Safety',
    desc: 'Location tracking, SOS alerts, geo-fencing. Smart watches designed for peace of mind.',
    band: 'sw-cat-band--purple',
  },
]

const PRODUCTS: Product[] = [
  {
    brand: 'Apple',
    brandColor: '#1d1d1f',
    brandBg: 'rgba(29,29,31,0.07)',
    name: 'Apple Watch Series 9 GPS',
    specs: 'Always-On Retina Display, S9 Chip\nBlood Oxygen, ECG, Crash Detection',
    price: 'Starts from ₹41,900',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #111111 0%, #3a3a3c 100%)',
    img: PROD_IMGS.applewatch,
  },
  {
    brand: 'Samsung',
    brandColor: '#1428A0',
    brandBg: 'rgba(20,40,160,0.08)',
    name: 'Samsung Galaxy Watch 6',
    specs: '1.5" Super AMOLED, BioActive Sensor\nBody Composition, Advanced Sleep Tracking',
    price: 'Starts from ₹29,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #0d1a6e 0%, #1428A0 100%)',
    img: PROD_IMGS.samsungwatch,
  },
  {
    brand: 'Garmin',
    brandColor: '#006e6e',
    brandBg: 'rgba(0,110,110,0.08)',
    name: 'Garmin Venu 3',
    specs: 'AMOLED Display, GPS + Compass\nBody Battery, Nap Detection, 14-Day Battery',
    price: 'Starts from ₹44,990',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #003535 0%, #006e6e 100%)',
    img: PROD_IMGS.garmin,
  },
  {
    brand: 'Fitbit',
    brandColor: '#00b0b9',
    brandBg: 'rgba(0,176,185,0.08)',
    name: 'Fitbit Versa 4',
    specs: 'Built-in GPS, 6-Day Battery\nActive Zone Minutes, Google Wallet',
    price: 'Starts from ₹20,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #005a5e 0%, #00b0b9 100%)',
    img: PROD_IMGS.fitbit,
  },
  {
    brand: 'Xiaomi',
    brandColor: '#ff6900',
    brandBg: 'rgba(255,105,0,0.08)',
    name: 'Xiaomi Watch S3',
    specs: '1.43" AMOLED, HyperOS\nBlood Glucose Monitoring, 5ATM Water Resistant',
    price: 'Starts from ₹16,999',
    badge: 'green',
    badgeLabel: 'In Stock',
    gradient: 'linear-gradient(135deg, #8b3700 0%, #ff6900 100%)',
    img: PROD_IMGS.xiaomi,
  },
  {
    brand: 'Apple',
    brandColor: '#1d1d1f',
    brandBg: 'rgba(29,29,31,0.07)',
    name: 'Apple Watch Ultra 2',
    specs: 'Titanium Case, 49mm, Cellular\nDual-frequency GPS, 60-Hour Battery',
    price: 'Starts from ₹89,900',
    badge: 'blue',
    badgeLabel: 'On Order',
    gradient: 'linear-gradient(135deg, #060606 0%, #1a1a1a 100%)',
    img: PROD_IMGS.applewatchultra,
  },
]

/* ── Component ─────────────────────────────────────────────────── */
export default function SmartwatchesPage() {
  const { openModal } = useContactModal()
  return (
    <div className="sw-root">

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="sw-hero">
        <div className="sw-hero-inner">

          <div className="sw-hero-left">
            <span className="sw-hero-eyebrow">Smartwatches</span>

            <h1 className="sw-hero-headline">{'Your health,\non your wrist.'}</h1>

            <p className="sw-hero-sub">
              Apple Watch, Samsung Galaxy Watch, Garmin, Fitbit &amp; more.
              Track fitness, health metrics, and stay connected all day.
            </p>

            <div className="sw-hero-ctas">
              <Link to="/electronics" className="sw-btn-primary">
                Browse Collection
              </Link>
              <a href="tel:+919500036310" className="sw-btn-ghost">
                Call +91 95000 36310
              </a>
            </div>

            <div className="sw-hero-trust">
              {['Genuine Products', 'Brand Warranty', 'EMI Available', 'Same-Day Pickup'].map(
                (badge) => (
                  <span key={badge} className="sw-trust-badge">
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="sw-hero-right">
            <div className="sw-hero-visual">
              <div className="sw-collage">
                {COLLAGE_IMGS.map((src, i) => (
                  <img key={i} src={src} alt="" className="sw-collage-img" loading="lazy" />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. BRAND STRIP ──────────────────────────────────────── */}
      <LogoBarDark brands={WATCH_BRANDS} label="Brands we carry" />

      {/* ── 3. CATEGORY CARDS ───────────────────────────────────── */}
      <section className="sw-categories">
        <div className="sw-categories-inner">
          <div className="sw-section-header">
            <span className="sw-section-label">Shop by Use Case</span>
            <h2 className="sw-section-title">Find your smartwatch</h2>
          </div>

          <div className="sw-cat-grid">
            {CATEGORIES.map((cat) => (
              <div key={cat.title} className="sw-cat-card">
                <div className={`sw-cat-band ${cat.band}`} />
                <div className="sw-cat-body">
                  <div>
                    <h3 className="sw-cat-title">{cat.title}</h3>
                    <p className="sw-cat-desc">{cat.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="sw-products">
        <div className="sw-products-inner">
          <div className="sw-section-header">
            <span className="sw-section-label sw-section-label--dark">In Stock Now</span>
            <h2 className="sw-section-title sw-section-title--dark">Featured Smartwatches</h2>
          </div>

          <div className="sw-prod-grid">
            {PRODUCTS.map((prod) => (
              <div key={prod.name} className="sw-prod-card">
                <span className={`sw-prod-badge sw-prod-badge--${prod.badge}`}>
                  {prod.badgeLabel}
                </span>

                <div className="sw-prod-img-wrap">
                  {prod.img ? (
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="sw-prod-img"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="sw-prod-placeholder"
                      style={{ background: prod.gradient }}
                    >
                      <span className="sw-prod-placeholder-label">{prod.brand}</span>
                    </div>
                  )}
                </div>

                <div className="sw-prod-body">
                  <span
                    className="sw-prod-brand-tag"
                    style={{ color: prod.brandColor, background: prod.brandBg }}
                  >
                    {prod.brand}
                  </span>
                  <h3 className="sw-prod-name">{prod.name}</h3>
                  <p className="sw-prod-specs">{prod.specs}</p>
                  <p className="sw-prod-price">{prod.price}</p>
                  <button
                    className="sw-prod-enquire-btn"
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
      <section className="sw-why">
        <div className="sw-why-inner">
          <div className="sw-why-header">
            <h2 className="sw-why-title">Why Buy From Us?</h2>
            <p className="sw-why-sub">Chennai's trusted electronics dealer since day one.</p>
          </div>

          <div className="sw-why-grid">
            <div className="sw-why-item">
              <div className="sw-why-num">01</div>
              <h3 className="sw-why-item-title">Authorised Dealer</h3>
              <p className="sw-why-item-desc">
                All smartwatches are sealed, genuine, and carry full brand warranty.
                Apple, Samsung, and Garmin authorised stock only.
              </p>
            </div>

            <div className="sw-why-item">
              <div className="sw-why-num">02</div>
              <h3 className="sw-why-item-title">Setup &amp; Pairing Help</h3>
              <p className="sw-why-item-desc">
                We pair your new smartwatch with your phone, sync health apps,
                and configure notifications before you leave the store.
              </p>
            </div>

            <div className="sw-why-item">
              <div className="sw-why-num">03</div>
              <h3 className="sw-why-item-title">EMI &amp; Upgrade Offers</h3>
              <p className="sw-why-item-desc">
                0% EMI on all major cards. Exchange your old wearable and get
                an instant discount on your upgrade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA STRIP ────────────────────────────────────────── */}
      <section className="sw-cta">
        <div className="sw-cta-inner">
          <span className="sw-cta-eyebrow">Contact us to enquire</span>
          <h2 className="sw-cta-headline">Not sure which smartwatch to pick?</h2>
          <p className="sw-cta-sub">
            Tell us your phone OS, health goals, and budget — we'll recommend
            the best smartwatch for your lifestyle.
          </p>
          <div className="sw-cta-btns">
            <a
              href="https://wa.me/919500036310"
              target="_blank"
              rel="noopener noreferrer"
              className="sw-btn-whatsapp"
            >
              WhatsApp Us
            </a>
            <Link to="/electronics" className="sw-btn-store">
              Visit Our Store
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
