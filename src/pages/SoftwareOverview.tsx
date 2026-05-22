import { Link } from 'react-router-dom'
import PlatformFeatures from '../components/PlatformFeatures'
import './SoftwareOverview.css'

const BY_PRODUCT = [
  { label: 'Jewellery Business Suite', to: '/software/jewellery-suite', badge: 'Popular' },
  { label: 'Car Rental Software',      to: '/software/car-rental-software', badge: 'Popular' },
  { label: 'Quotation Software',       to: '/software/quotation-software' },
  { label: 'Photographers Community Portal', to: '/software/photographer-portal' },
  { label: 'Designs Stock Software',   to: '/software/designs-stock' },
]

const BY_NEED = [
  { label: 'Member Management',    to: '/software/member-management' },
  { label: 'Billing & Invoicing',  to: '/software/billing-invoicing' },
  { label: 'Booking & Scheduling', to: '/software/booking-scheduling' },
  { label: 'Inventory Tracking',   to: '/software/inventory-tracking' },
  { label: 'Client Portals',       to: '/software/client-portals' },
]

export default function SoftwareOverview() {
  return (
    <div className="swo-root">

      {/* ── Hero ── */}
      <section className="swo-hero">
        <div className="swo-hero-inner">
          <span className="swo-eyebrow">Software Products</span>
          <h1 className="swo-headline">
            {'Software built for\nthe businesses that run India.'}
          </h1>
          <p className="swo-sub">
            From jewellers to car rental companies — custom software that fits how Indian businesses actually work.
          </p>
        </div>
      </section>

      {/* ── Platform Features ── */}
      <PlatformFeatures />

      {/* ── Software Navigation ── */}
      <section className="swo-nav-section">
        <div className="swo-nav-inner">
          <p className="swo-nav-title">All Software Products</p>
          <div className="swo-nav-grid">

            {/* By Product */}
            <div>
              <p className="swo-nav-group-label">By Product</p>
              <div className="swo-nav-list">
                {BY_PRODUCT.map((item) => (
                  <Link key={item.to} to={item.to} className="swo-nav-link">
                    <span className="swo-nav-link-left">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="swo-nav-badge">{item.badge}</span>
                      )}
                    </span>
                    <span className="swo-nav-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* By Need */}
            <div>
              <p className="swo-nav-group-label">By Need</p>
              <div className="swo-nav-list">
                {BY_NEED.map((item) => (
                  <Link key={item.to} to={item.to} className="swo-nav-link">
                    <span className="swo-nav-link-left">
                      <span>{item.label}</span>
                    </span>
                    <span className="swo-nav-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
