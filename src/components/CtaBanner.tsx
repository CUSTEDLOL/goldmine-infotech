import { motion } from 'framer-motion'
import './CtaBanner.css'

export default function CtaBanner() {
  return (
    <motion.section className="cta-banner">
      <div className="container">
        <div className="cta-banner-shell">
          <div className="cta-banner-glow" />
          <div className="cta-banner-content">
            <motion.p className="cta-stars">★ ★ ★ ★ ★</motion.p>
            <motion.h2 className="cta-banner-title">
              Get this <br />
              <span className="cta-banner-title__gradient">Ecosystem</span> Today
            </motion.h2>
            <motion.div className="cta-email-row">
              <input type="tel" className="cta-email-input" placeholder="Enter your WhatsApp number" />
              <button className="btn btn-white">Get started →</button>
            </motion.div>
            <p className="cta-note">No commitment required · Chennai-based team · Response within 2 hours</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
