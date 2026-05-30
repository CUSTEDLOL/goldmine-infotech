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
  thumb?: string
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
  newBadge?: boolean
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
        desc: 'Custom-built software for Indian businesses — in daily use by real clients across industries.',
        bg: '#edf3ff',
        cta: 'View all our products',
        href: '/products',
      },
      columns: [
        {
          head: 'OUR SOFTWARE',
          headHref: '/software',
          isList: true,
          links: [
            { label: 'Quotation Software' },
            { label: 'Member Management' },
            { label: 'Transport Management System' },
            { label: 'Matrimony & Hall Booking' },
            { label: 'Cable TV / Internet / OTT Billing' },
            { label: 'CCTV Quotation Software' },
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
            { label: 'DVR / NVR' },
            { label: 'Hard Disk' },
            { label: 'Cabling & Accessories' },
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
    newBadge: true,
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
            { label: 'Estimate Generator',           href: '/tools/estimate' },
          ],
        },
      ],
    },
  },
  {
    label: 'About Us',
    href: '/about',
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
                    <Link to={link.href} className={`dd-link${link.thumb ? ' dd-link--thumb' : ''}`} onClick={() => {}}>
                      {link.thumb && <img src={link.thumb} className="dd-link-thumb" alt="" />}
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
                      <div key={col.head} className={`mob-col${col.headHref ? ' mob-col--nav' : ''}`}>
                        {col.headHref ? (
                          <Link to={col.headHref} className="mob-col-head mob-col-head--link" onClick={onClose}>
                            <span>{col.head}</span>
                            <span className="mob-col-head-arrow">→</span>
                          </Link>
                        ) : (
                          <p className="mob-col-head">{col.head}</p>
                        )}
                        <ul className={`mob-col-links${col.isList ? ' mob-col-links--tags' : ''}`}>
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
          <div className="mob-contact-btns">
            <a href="tel:+919500036310" className="mob-call-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call
            </a>
            <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="mob-whatsapp-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
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
      <div className="nav-inner">

        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => { setOpen(null); setMobileOpen(false) }}>
          <img src={goldmineLogo} alt="Goldmine Infotech" className="nav-logo-img" />
          <span className="nav-logo-name">
            <span className="nav-logo-name__top">Goldmine</span>
            <span className="nav-logo-name__bottom">
              <span>Infotech</span><span>and</span><span>Systems</span>
            </span>
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
                    {item.newBadge && <span className="nav-new-dot" aria-label="New" />}
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
