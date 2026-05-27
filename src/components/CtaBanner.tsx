import { useState } from 'react'
import { motion } from 'framer-motion'
import { useContactModal } from '../context/ContactModalContext'
import './CtaBanner.css'

export default function CtaBanner() {
  const { openModal } = useContactModal()
  const [email, setEmail] = useState('')

  function handleGetStarted() {
    openModal({
      badge: 'Get Started',
      badgeColor: 'purple',
      title: 'How can we help you?',
      subtitle: 'Tell us what you need and our team will get back to you within 2 hours.',
      prefillMessage: email
        ? `Hi, my email is ${email}. I'd like to learn more about your services.`
        : "Hi, I'd like to learn more about your services.",
    })
  }

  return (
    <motion.section className="cta-banner">
      <div className="cta-banner-shell">
        <div className="cta-banner-glow" />
        <div className="cta-banner-content">
          <p className="cta-stars">★ ★ ★ ★ ★</p>
          <h2 className="cta-banner-title">
            Get this <br />
            <span className="cta-banner-title__gradient">Ecosystem</span> Today
          </h2>
          <div className="cta-email-row">
            <input
              type="email"
              className="cta-email-input"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleGetStarted()}
            />
            <button className="btn btn-white" onClick={handleGetStarted}>Get started →</button>
          </div>
          <p className="cta-note">No commitment required · Chennai-based team · Response within 2 hours</p>
        </div>
      </div>
    </motion.section>
  )
}
