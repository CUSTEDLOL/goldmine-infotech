import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import goldmineLogo from '../assets/goldminelogo.png'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeColor = 'green' | 'yellow' | 'orange' | 'purple' | 'red'

interface NavLink {
  label: string
  href?: string
  badge?: { label: string; color: BadgeColor }
}

interface NavColumn {
  head: string
  headHref?: string
  links: NavLink[]
  isList?: boolean
}

interface FeaturedCard {
  title: string
  desc: string
  bg: string
  cta: string
  href?: string
}

interface SecondCard {
  title: string
  icons: string[]
}

interface DropdownData {
  featuredCard: FeaturedCard
  secondCard?: SecondCard
  columns: NavColumn[]
  alignRight?: boolean
}

interface NavItem {
  label: string
  href?: string
  dropdown?: DropdownData
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Services',
    dropdown: {
      featuredCard: {
        title: 'Goldmine Infotech →',
        desc: 'Your complete B2B and B2C technology partner — web, software, hardware and security under one roof.',
        bg: '#f4edf8',
        cta: 'Explore all services',
      },
      secondCard: {
        title: 'Our Clients →',
        icons: ['🏢', '🏗️', '🏪'],
      },
      columns: [
        {
          head: 'WEB & HOSTING',
          links: [
            { label: 'Domain Registration', href: '/services/domain-registration' },
            { label: 'Web Hosting & VPS',   href: '/services/web-hosting-vps' },
            { label: 'SSL Certificates',    href: '/services/ssl-certificates' },
            { label: 'Email Solutions',     href: '/services/email-solutions' },
            { label: 'Website Design',      href: '/services/website-design' },
            { label: 'Website Redesign',    href: '/services/website-redesign' },
          ],
        },
        {
          head: 'BUILD & DEPLOY',
          links: [
            { label: 'E-Commerce Websites', href: '/services/ecommerce-websites', badge: { label: 'Trending', color: 'orange' } },
            { label: 'CMS Websites', href: '/services/cms-websites' },
            { label: 'Mobile App Development', href: '/services/mobile-app-development' },
            { label: 'Bulk SMS Service', href: '/services/bulk-sms-service' },
            { label: 'Panoramic 360° View', href: '/services/panoramic-360-view' },
            { label: 'eNACH Integration', href: '/services/enach-integration' },
          ],
        },
        {
          head: 'MANAGE & SUPPORT',
          isList: true,
          links: [
            { label: 'Website Maintenance' },
            { label: 'Annual Maintenance (AMC)' },
            { label: 'Payment Gateway Setup' },
            { label: 'Online Quotation Tools' },
            { label: 'IT Consultation' },
            { label: 'Remote Support' },
          ],
        },
      ],
    },
  },
  {
    label: 'Software',
    dropdown: {
      featuredCard: {
        title: 'Software Products →',
        desc: 'Custom-built software for jewellers, rental businesses, photographers, and more.',
        bg: '#edf3ff',
        cta: 'Browse all software',
        href: '/software',
      },
      columns: [
        {
          head: 'BY PRODUCT',
          links: [
            { label: 'Jewellery Business Suite', href: '/software/jewellery-suite', badge: { label: 'Popular', color: 'orange' } },
            { label: 'Car Rental Software', href: '/software/car-rental-software', badge: { label: 'Popular', color: 'orange' } },
            { label: 'Quotation Software', href: '/software/quotation-software' },
            { label: 'Photographers Community Portal', href: '/software/photographer-portal' },
            { label: 'Designs Stock Software', href: '/software/designs-stock' },
          ],
        },
        {
          head: 'BY NEED',
          links: [
            { label: 'Member Management',   href: '/software/member-management' },
            { label: 'Billing & Invoicing', href: '/software/billing-invoicing' },
            { label: 'Booking & Scheduling', href: '/software/booking-scheduling' },
            { label: 'Inventory Tracking',  href: '/software/inventory-tracking' },
            { label: 'Client Portals',      href: '/software/client-portals' },
          ],
        },
      ],
    },
  },
  {
    label: 'Electronics',
    dropdown: {
      featuredCard: {
        title: 'Systems & Electronics →',
        desc: 'Laptops, desktops, printers, TVs and phones — sales, repair and AMC across Chennai.',
        bg: '#fff1df',
        cta: 'Shop products',
        href: '/electronics',
      },
      columns: [
        {
          head: 'PRODUCTS',
          links: [
            { label: 'Laptops',             href: '/electronics/laptops' },
            { label: 'Desktop Computers',   href: '/electronics/desktops' },
            { label: 'Printers & Scanners', href: '/electronics/printers' },
            { label: 'Televisions',         href: '/electronics/televisions' },
            { label: 'Mobile Phones',       href: '/electronics/mobiles' },
            { label: 'Computer Peripherals' },
          ],
        },
        {
          head: 'BRANDS',
          isList: true,
          links: [
            { label: 'HP' },
            { label: 'Dell' },
            { label: 'Samsung' },
            { label: 'Lenovo' },
            { label: 'Canon' },
            { label: 'TVS' },
          ],
        },
        {
          head: 'SERVICES',
          isList: true,
          links: [
            { label: 'Hardware Sales' },
            { label: 'Annual Maintenance (AMC)' },
            { label: 'Repair & Servicing' },
            { label: 'Pre-order & Delivery' },
            { label: 'Trade-in & Upgrade' },
            { label: 'Corporate Bulk Orders' },
          ],
        },
      ],
    },
  },
  {
    label: 'Security',
    dropdown: {
      featuredCard: {
        title: 'CCTV & Biometrics →',
        desc: 'HD, IP and WiFi cameras. Biometric attendance systems. Professional installation across Chennai.',
        bg: '#e9f7f2',
        cta: 'Get a free quote',
        href: '/security',
      },
      columns: [
        {
          head: 'CCTV CAMERAS',
          headHref: '/security/cctv-cameras',
          isList: true,
          links: [
            { label: 'HD Cameras' },
            { label: 'IP Cameras' },
            { label: 'WiFi Cameras' },
            { label: 'Dome Cameras' },
            { label: 'Bullet Cameras' },
            { label: 'PTZ Cameras' },
          ],
        },
        {
          head: 'INSTALLATIONS',
          headHref: '/security/installations',
          isList: true,
          links: [
            { label: 'Home Security' },
            { label: 'Office Security' },
            { label: 'School & College' },
            { label: 'Factory & Warehouse' },
            { label: 'Retail Shops' },
            { label: 'Apartment Complexes' },
          ],
        },
        {
          head: 'BIOMETRIC',
          headHref: '/security/biometric',
          isList: true,
          links: [
            { label: 'Attendance Systems' },
            { label: 'Access Control' },
            { label: 'Face Recognition' },
            { label: 'Fingerprint Systems' },
            { label: 'Time & Attendance Software' },
            { label: 'Biometric AMC' },
          ],
        },
      ],
    },
  },
  {
    label: 'Free Tools',
    dropdown: {
      featuredCard: {
        title: 'Free Business Tools →',
        desc: 'Free tools built for Indian businesses. No login, no cost, no catch.',
        bg: '#fff8ec',
        cta: 'Browse all tools',
        href: '/tools',
      },
      columns: [
        {
          head: 'DOCUMENT TOOLS',
          links: [
            { label: 'QR Code Generator', href: '/tools/qr-code' },
            { label: 'GST Invoice Generator', href: '/tools/gst-invoice' },
            { label: 'Payment Receipt Generator', href: '/tools/payment-receipt' },
          ],
        },
        {
          head: 'FINANCE & UTILITIES',
          links: [
            { label: 'Compound Interest Calculator', href: '/tools/compound-interest' },
            { label: 'Barcode Generator', href: '/tools/barcode' },
            { label: 'Domain Finder', href: '/tools/domain-finder' },
          ],
        },
      ],
    },
  },
]

// ─── Badge ────────────────────────────────────────────────────────────────────

function Badge({ label, color }: { label: string; color: BadgeColor }) {
  return <span className={`nav-badge nav-badge--${color}`}>{label}</span>
}

// ─── Desktop Dropdown ─────────────────────────────────────────────────────────

function Dropdown({ data }: { data: DropdownData }) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  // After mount, clamp dropdown inside the viewport horizontally
  useLayoutEffect(() => {
    const el = dropdownRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const margin = 16
    if (rect.left < margin) {
      el.style.marginLeft = `${margin - rect.left}px`
    } else if (rect.right > window.innerWidth - margin) {
      el.style.marginLeft = `-${rect.right - (window.innerWidth - margin)}px`
    }
  }, [])

  return (
    <motion.div
      ref={dropdownRef}
      className={`nav-dropdown${data.alignRight ? ' nav-dropdown--right' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left — featured card(s) */}
      <div className="dd-left">
        {data.featuredCard.href ? (
          <Link
            to={data.featuredCard.href}
            className="dd-featured"
            style={{ background: data.featuredCard.bg }}
            onClick={() => {}}
          >
            <div className="dd-featured-title">{data.featuredCard.title}</div>
            <div className="dd-featured-desc">{data.featuredCard.desc}</div>
            <div className="dd-featured-cta">{data.featuredCard.cta} →</div>
          </Link>
        ) : (
          <a href="#" className="dd-featured" style={{ background: data.featuredCard.bg }}>
            <div className="dd-featured-title">{data.featuredCard.title}</div>
            <div className="dd-featured-vp">
              <div className="dd-vp-inner">Visual Missing</div>
            </div>
            <div className="dd-featured-desc">{data.featuredCard.desc}</div>
            <div className="dd-featured-cta">{data.featuredCard.cta} →</div>
          </a>
        )}

        {data.secondCard && (
          <a href="#" className="dd-second-card">
            <span className="dd-second-title">{data.secondCard.title}</span>
            <span className="dd-second-icons">
              {data.secondCard.icons.map((icon, i) => (
                <span key={i} className="dd-second-icon">{icon}</span>
              ))}
            </span>
          </a>
        )}
      </div>

      {/* Right — columns */}
      <div className="dd-cols">
        {data.columns.map((col) => (
          <div key={col.head} className="dd-col">
            {col.headHref ? (
              <Link to={col.headHref} className="dd-col-head dd-col-head--link" onClick={() => {}}>
                {col.head} →
              </Link>
            ) : (
              <p className="dd-col-head">{col.head}</p>
            )}
            <ul className="dd-col-links">
              {col.links.map((link) => (
                <li key={link.label}>
                  {col.isList ? (
                    <span className="dd-list-item">{link.label}</span>
                  ) : link.href ? (
                    <Link to={link.href} className="dd-link" onClick={() => {}}>
                      <span>{link.label}</span>
                      {link.badge && <Badge label={link.badge.label} color={link.badge.color} />}
                    </Link>
                  ) : (
                    <a href="#" className="dd-link">
                      <span>{link.label}</span>
                      {link.badge && <Badge label={link.badge.label} color={link.badge.color} />}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Mobile Overlay ───────────────────────────────────────────────────────────

function MobileOverlay({ onClose }: { onClose: () => void }) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  return (
    <motion.div
      className="mobile-overlay"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mobile-overlay-scroll">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="mob-item">
            {item.href ? (
              <Link to={item.href} className="mob-trigger" onClick={onClose}>
                <span>{item.label}</span>
              </Link>
            ) : (
              <button
                className="mob-trigger"
                onClick={() => setOpenAccordion(
                  openAccordion === item.label ? null : item.label
                )}
              >
                <span>{item.label}</span>
                {item.dropdown && (
                  <svg
                    className={`mob-chevron${openAccordion === item.label ? ' mob-chevron--up' : ''}`}
                    viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"
                  >
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                )}
              </button>
            )}

            <AnimatePresence>
              {openAccordion === item.label && item.dropdown && (
                <motion.div
                  className="mob-accordion"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  {item.dropdown.columns.map((col) => (
                    <div key={col.head} className="mob-col">
                      <p className="mob-col-head">{col.head}</p>
                      <ul className="mob-col-links">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            {link.href ? (
                              <Link to={link.href} className="mob-link" onClick={onClose}>
                                {link.label}
                                {link.badge && <Badge label={link.badge.label} color={link.badge.color} />}
                              </Link>
                            ) : (
                              <a href="#" className="mob-link" onClick={onClose}>
                                {link.label}
                                {link.badge && <Badge label={link.badge.label} color={link.badge.color} />}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="mob-footer">
          <a href="tel:+919500036310" className="mob-phone">+91 95000 36310</a>
          <a href="#" className="mob-cta-btn">Contact Us</a>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()
  const isSubpage = location.pathname !== '/'

  // Close dropdowns on navigation
  useEffect(() => {
    setOpen(null)
    setMobileOpen(false)
  }, [location.pathname])

  // Track scroll position for pill effect
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Check initial state
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { setOpen(null); setMobileOpen(false) }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function toggle(label: string, hasDropdown: boolean) {
    if (!hasDropdown) { setOpen(null); return }
    setOpen((prev) => (prev === label ? null : label))
  }

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}${isSubpage && !scrolled ? ' navbar--solid' : ''}`} ref={navRef}>
      <div className="nav-inner">

        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => { setOpen(null); setMobileOpen(false) }}>
          <img src={goldmineLogo} alt="Goldmine Infotech" className="nav-logo-img" />
        </Link>

        {/* Desktop nav items */}
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => {
            const isOpen = open === item.label
            return (
              <li key={item.label} className="nav-item">
                {item.href ? (
                  <Link
                    to={item.href}
                    className="nav-trigger"
                    onClick={() => { setOpen(null); setMobileOpen(false) }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className={`nav-trigger${isOpen ? ' nav-trigger--active' : ''}`}
                    onClick={() => toggle(item.label, !!item.dropdown)}
                    aria-expanded={isOpen}
                  >
                    {item.label}
                    {item.dropdown && (
                      <svg
                        className={`nav-chevron${isOpen ? ' nav-chevron--up' : ''}`}
                        viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"
                      >
                        <path d="M1 1l4 4 4-4" />
                      </svg>
                    )}
                  </button>
                )}

                <AnimatePresence>
                  {isOpen && item.dropdown && <Dropdown data={item.dropdown} />}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        {/* Desktop actions */}
        <div className="nav-actions">
          <a href="tel:+919500036310" className="nav-contact-btn">Contact Us</a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`ham-line${mobileOpen ? ' ham-line--1-open' : ''}`} />
          <span className={`ham-line${mobileOpen ? ' ham-line--2-open' : ''}`} />
          <span className={`ham-line${mobileOpen ? ' ham-line--3-open' : ''}`} />
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && <MobileOverlay onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </nav>
  )
}
