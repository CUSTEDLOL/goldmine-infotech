import { motion } from 'framer-motion'
import { CyberneticBentoGrid } from '@/components/ui/cybernetic-bento-grid'
import LogoBarDark from './LogoBarDark'
import './DarkFeature.css'

export default function DarkFeature() {
  return (
    <motion.section className="dark-feature">
      <motion.div className="dark-feature-content">
        <div className="dark-feature-badge">
          <span className="eyebrow eyebrow-dark">
            <span className="eyebrow-dot" />
            Goldmine Infotech
          </span>
        </div>
        <motion.h2 className="dark-feature-title">
          Transform the way your business runs with Goldmine
        </motion.h2>
        <motion.p className="dark-feature-subtitle">
          We handle your website, software, security cameras, IT hardware and
          hosting — so you can focus on what you do best.
        </motion.p>
        <a href="#" className="btn btn-white">See what we offer →</a>
      </motion.div>

      <motion.div className="dark-feature-grid">
        <CyberneticBentoGrid dark />
      </motion.div>

      <div style={{ marginTop: '4rem', overflow: 'hidden' }}>
        <LogoBarDark />
      </div>
    </motion.section>
  )
}
