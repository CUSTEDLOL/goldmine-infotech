import { motion } from 'framer-motion'
import './BadgesStrip.css'

const BADGES = [
  'ICANN Accredited',
  'Google Partner',
  '25 Years',
  '1,200+ Clients',
  '5,000+ Projects',
  "Chennai's Most Trusted",
  'Razorpay Partner',
  'ISO Certified',
]

const TRACK = [...BADGES, ...BADGES]

export default function BadgesStrip() {
  return (
    <motion.section className="badges-strip">
      <div className="marquee-outer">
        <div className="badges-track">
          {TRACK.map((label, i) => (
            <div key={i} className="badge-box">
              <span className="badge-icon">★</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
