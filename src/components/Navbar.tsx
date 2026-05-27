import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import goldmineLogo from '../assets/goldminelogo.png'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import { useContactModal } from '../context/ContactModalContext'

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
        href: '/services',
      },
      columns: [
        {
          head: 'Web & Hosting',
          headHref: '/services/web-hosting',
          isList: true,
          links: [
            { label: 'Domain Registration' },
            { label: 'Web Hosting & VPS' },
            { label: 'SSL Certificates' },
            { label: 'Email Solutions' },
            { label: 'Website Design & Redesign' },
          ],
        },
        {
          head: 'Build & Deploy',
          headHref: '/services/build-deploy',
          isList: true,
          links: [
            { label: 'E-Commerce Websites' },
            { label: 'CMS & Mobile Apps' },
            { label: 'Bulk SMS Service' },
            { label: 'Panoramic 360° View' },
            { label: 'eNACH Integration' },
          ],
        },
        {
          head: 'Manage & Support',
          headHref: '/services/manage-support',
          isList: true,
          links: [
            { label: 'Website Maintenance' },
            { label: 'Annual Maintenance (AMC)' },
            { label: 'Payment Gateway Setup' },
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
        title: 'Software Solutions →',
        desc: 'Custom-built software for billing, bookings, inventory, portals, and member management.',
        bg: '#edf3ff',
        cta: 'See our software',
        href: '/software',
      },
      columns: [
        {
          head: 'BY NEED',
          links: [
            { label: 'Billing & Invoicing',  href: '/software/billing-invoicing' },
            { label: 'Booking & Scheduling', href: '/software/booking-scheduling' },
            { label: 'Inventory Tracking',   href: '/software/inventory-tracking' },
            { label: 'Client Portals',       href: '/software/client-portals' },
            { label: 'Member Management',    href: '/software/member-management' },
          ],
        },
        {
          head: 'PRODUCTS BY US',
          links: [
            { label: 'All Our Products', href: '/products' },
          ],
        },
      ],
    },
  },
  {
    label: 'Computers',
    dropdown: {
      featuredCard: {
        title: 'Computers & Peripherals →',
        desc: 'Laptops, desktops, and printers from top brands — in stock across Chennai.',
        bg: '#eaf4ff',
        cta: 'Browse computers',
        href: '/computers',
      },
      columns: [
        {
          head: 'CATEGORIES',
          links: [
            { label: 'Laptops',             href: '/electronics/laptops' },
            { label: 'Desktop Computers',   href: '/electronics/desktops' },
            { label: 'Printers & Scanners', href: '/electronics/printers' },
          ],
        },
      ],
    },
  },
  {
    label: 'Electronics',
    dropdown: {
      featuredCard: {
        title: 'Electronics →',
        desc: 'Mobile phones, TVs, and smartwatches — all brands, always in stock.',
        bg: '#fff1df',
        cta: 'Shop electronics',
        href: '/electronics',
      },
      columns: [
        {
          head: 'PRODUCTS',
          links: [
            { label: 'Mobile Phones',  href: '/electronics/mobiles' },
            { label: 'Televisions',    href: '/electronics/televisions' },
            { label: 'Smartwatches',   href: '/electronics/smartwatches' },
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
          head: 'CCTV Cameras',
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
          head: 'Biometric',
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
        cta: 'Explore tools',
        href: '/tools',
      },
      columns: [
        {
          head: 'TOOLS',
          links: [
            { label: 'QR Code Generator',            href: '/tools/qr-code' },
            { label: 'Payment Receipt Generator',    href: '/tools/payment-receipt' },
            { label: 'Compound Interest Calculator', href: '/tools/compound-interest' },
            { label: 'Barcode Generator',            href: '/tools/barcode' },
            { label: 'Domain Finder',                href: '/tools/domain-finder' },
            { label: 'Image Resize & Compress',      href: '/tools/image-resize' },
            { label: 'Image to PDF',                 href: '/tools/image-to-pdf' },
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
            className="dd-featured dd-featured--link"
            style={{ background: data.featuredCard.bg }}
            onClick={() => {}}
          >
            <div className="dd-featured-title">{data.featuredCard.title}</div>
            <div className="dd-featured-desc">{data.featuredCard.desc}</div>
            <div className="dd-featured-cta">{data.featuredCard.cta} →</div>
          </Link>
        ) : (
          <div className="dd-featured dd-featured--static" style={{ background: data.featuredCard.bg }}>
            <div className="dd-featured-title">{data.featuredCard.title}</div>
            <div className="dd-featured-desc">{data.featuredCard.desc}</div>
            <div className="dd-featured-cta">{data.featuredCard.cta} →</div>
          </div>
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
              <Link to={col.headHref} className="dd-col-head--link" onClick={() => {}}>
                <span>{col.head}</span>
                <span className="dd-link-arrow">→</span>
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
                      <span className="dd-link-arrow">→</span>
                    </Link>
                  ) : (
                    <a href="#" className="dd-link">
                      <span>{link.label}</span>
                      {link.badge && <Badge label={link.badge.label} color={link.badge.color} />}
                      <span className="dd-link-arrow">→</span>
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

// ─── Mobile Quick Bar ─────────────────────────────────────────────────────────

function MobileQuickBar() {
  const location = useLocation()
  return (
    <div className="mob-quickbar">
      {NAV_ITEMS.map((item) => {
        const href = item.dropdown?.featuredCard?.href ?? item.href ?? '/'
        const isActive = href !== '/' && location.pathname.startsWith(href)
        return (
          <Link
            key={item.label}
            to={href}
            className={`mob-quickbar-chip${isActive ? ' mob-quickbar-chip--active' : ''}`}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}

// ─── Mobile Overlay ───────────────────────────────────────────────────────────

function MobileOverlay({ onClose }: { onClose: () => void }) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
  const { openModal } = useContactModal()

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
                  {item.dropdown.featuredCard?.href && (
                    <Link
                      to={item.dropdown.featuredCard.href}
                      className="mob-featured-card"
                      style={{ background: item.dropdown.featuredCard.bg }}
                      onClick={onClose}
                    >
                      <div className="mob-featured-title">{item.dropdown.featuredCard.title}</div>
                      <div className="mob-featured-desc">{item.dropdown.featuredCard.desc}</div>
                      <div className="mob-featured-cta">{item.dropdown.featuredCard.cta} →</div>
                    </Link>
                  )}

                  <div className="mob-accordion-cols">
                    {item.dropdown.columns.map((col) => (
                      <div key={col.head} className="mob-col">
                        {col.headHref ? (
                          <Link to={col.headHref} className="mob-col-head mob-col-head--link" onClick={onClose}>
                            {col.head} →
                          </Link>
                        ) : (
                          <p className="mob-col-head">{col.head}</p>
                        )}
                        <ul className="mob-col-links">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              {col.isList ? (
                                <span className="mob-list-item">{link.label}</span>
                              ) : link.href ? (
                                <Link to={link.href} className="mob-link" onClick={onClose}>
                                  {link.label}
                                  {link.badge && <Badge label={link.badge.label} color={link.badge.color} />}
                                </Link>
                              ) : (
                                <span className="mob-list-item">{link.label}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="mob-footer">
          <a href="tel:+919500036310" className="mob-phone">+91 95000 36310</a>
          <button
            className="mob-cta-btn"
            onClick={() => { onClose(); openModal({ badge: 'Get in Touch', badgeColor: 'purple', title: 'How can we help you?', subtitle: 'Tell us what you need and we\'ll get back to you within 2 hours.', prefillMessage: 'Hi, I\'d like to learn more about your services.' }) }}
          >
            Contact Us
          </button>
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
  const { openModal } = useContactModal()

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
      <MobileQuickBar />
      <div className="nav-inner">

        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => { setOpen(null); setMobileOpen(false) }}>
          <img src={goldmineLogo} alt="Goldmine Infotech" className="nav-logo-img" />
          <span className="nav-logo-name">
            <span className="nav-logo-name__top">Goldmine</span>
            <span className="nav-logo-name__bottom">Infotech and Systems</span>
          </span>
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
          <button
            className="nav-contact-btn"
            onClick={() => openModal({
              badge: 'Get in Touch',
              badgeColor: 'purple',
              title: 'How can we help you?',
              subtitle: 'Tell us what you need and our team will get back to you within 2 hours.',
              prefillMessage: 'Hi, I\'d like to learn more about your services. Please get in touch.',
            })}
          >
            Contact Us
          </button>
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
