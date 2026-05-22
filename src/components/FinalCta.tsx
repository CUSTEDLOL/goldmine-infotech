import { motion } from 'framer-motion'
import './FinalCta.css'

export default function FinalCta() {
  return (
    <motion.section className="final-cta">
      <div className="container">
        <motion.h2 className="final-cta-title">
          Your complete<br />technology partner
        </motion.h2>
        <div className="cta-email-row" style={{ maxWidth: 440, margin: '0 auto 16px' }}>
          <input type="tel" className="cta-email-input" placeholder="Enter your WhatsApp number" />
          <button className="btn btn-white">Contact us →</button>
        </div>
        <p className="cta-note">No commitment required · Chennai-based team · Response within 2 hours</p>
      </div>
    </motion.section>
  )
}
