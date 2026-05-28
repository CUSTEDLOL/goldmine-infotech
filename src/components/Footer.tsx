import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import goldmineLogo from '../assets/goldminelogo.png'
import './Footer.css'

const SERVICES: { label: string; href: string }[] = [
  { label: 'Website Design & Development', href: '/services/website-design' },
  { label: 'Web Hosting & VPS',            href: '/services/web-hosting-vps' },
  { label: 'Domain Registration',          href: '/services/domain-registration' },
  { label: 'SSL Certificates',             href: '/services/ssl-certificates' },
  { label: 'Email Solutions',              href: '/services/email-solutions' },
  { label: 'Custom Software',              href: '/software' },
  { label: 'CCTV & Biometrics',           href: '/security' },
  { label: 'Electronics & Computers',      href: '/electronics' },
]

const PRODUCTS: { label: string; href: string }[] = [
  { label: 'Laptops',           href: '/electronics/laptops' },
  { label: 'Desktop Computers', href: '/electronics/desktops' },
  { label: 'Mobile Phones',     href: '/electronics/mobiles' },
  { label: 'Televisions',       href: '/electronics/televisions' },
  { label: 'Smartwatches',      href: '/electronics/smartwatches' },
  { label: 'Printers',          href: '/electronics/printers' },
  { label: 'CCTV Cameras',      href: '/security/cctv-cameras' },
  { label: 'Biometric Systems', href: '/security/biometric' },
]

export default function Footer() {
  return (
    <motion.footer className="footer">
      <div className="container">
        <div className="footer-top footer-top--4col">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-brand-logo">
              <img src={goldmineLogo} alt="Goldmine Infotech" className="footer-logo-img" />
              <div className="footer-logo-text">
                <span className="footer-logo-top">Goldmine</span>
                <span className="footer-logo-sub">Infotech and Systems</span>
              </div>
            </Link>
            <p className="footer-tagline">
              The complete IT solutions group for Chennai businesses since 2000.
              Web · Software · CCTV · Systems · Hosting.
            </p>
          </div>

          {/* Services */}
          <div>
            <div className="footer-col-head">Services</div>
            <ul className="footer-links">
              {SERVICES.map(s => (
                <li key={s.label}><Link to={s.href}>{s.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <div className="footer-col-head">Products</div>
            <ul className="footer-links">
              {PRODUCTS.map(p => (
                <li key={p.label}><Link to={p.href}>{p.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-col-head">Contact</div>
            <ul className="footer-links footer-links--contact">
              <li><a href="mailto:contact@gischennai.com">contact@gischennai.com</a></li>
              <li><a href="tel:+919500036310">+91 9500036310</a></li>
              <li><a href="https://www.goldmineinfotech.com/payonline" target="_blank" rel="noopener noreferrer">Pay Online (Razorpay)</a></li>
              <li className="footer-address">
                No.21, North Usman Road<br />
                T.Nagar, Chennai – 600 017
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Goldmine Infotech and Systems. All rights reserved.</p>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/goldmine-infotech-pvt-ltd/posts/?feedView=all" target="_blank" rel="noopener noreferrer" title="LinkedIn">in</a>
            <a href="https://www.instagram.com/goldmine.infotech/" target="_blank" rel="noopener noreferrer" title="Instagram">&#9679;</a>
            <a href="https://www.facebook.com/goldmineinfotechpvtltd/" target="_blank" rel="noopener noreferrer" title="Facebook">f</a>
          </div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
