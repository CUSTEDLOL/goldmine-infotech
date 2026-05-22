import { motion } from 'framer-motion'
import './Footer.css'

const COLS = [
  {
    head: 'Services',
    links: [
      'Web Design & Development',
      'Custom Software',
      'CCTV & Biometrics',
      'Systems & Electronics',
      'Domain Registration',
      'Web Hosting & VPS',
      'SSL Certificates',
      'Email Solutions',
    ],
  },
  {
    head: 'Company',
    links: [
      'About Us',
      'Our Work',
      'Clients',
      'Blog',
      'Careers',
      'Contact Us',
    ],
  },
]

export default function Footer() {
  return (
    <motion.footer className="footer">
      <div className="container">
        <div className="footer-top footer-top--4col">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand-name">
              <div className="footer-logo-mark">G</div>
              Goldmine Group
            </div>
            <p className="footer-tagline">
              The complete IT solutions group for Chennai businesses since 2000.
              Web · Software · CCTV · Systems · Hosting.
            </p>
          </div>

          {/* Services + Company */}
          {COLS.map((col) => (
            <div key={col.head}>
              <div className="footer-col-head">{col.head}</div>
              <ul className="footer-links">
                {col.links.map((link) => (
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <div className="footer-col-head">Contact</div>
            <ul className="footer-links footer-links--contact">
              <li><a href="mailto:admin@goldmineinfotech.com">admin@goldmineinfotech.com</a></li>
              <li><a href="tel:+919500036310">+91 9500036310</a></li>
              <li><a href="#">Pay Online (Razorpay)</a></li>
              <li className="footer-address">
                No.21, North Usman Road<br />
                T.Nagar, Chennai – 600 017
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2025 Goldmine Infotech Pvt Ltd. All rights reserved.</p>
          <div className="footer-social">
            <a href="#" title="LinkedIn">in</a>
            <a href="#" title="Instagram">&#9679;</a>
            <a href="#" title="YouTube">▶</a>
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
