import { motion } from 'framer-motion'
import VisualPlaceholder from './VisualPlaceholder'
import './BuiltForHeroes.css'

const CARDS = [
  {
    title: 'One partner, all services',
    desc: 'No more juggling multiple vendors. Web, software, hardware, CCTV and hosting — one team, one bill, one call.',
  },
  {
    title: 'Chennai-based, always reachable',
    desc: 'Our team is based in T.Nagar. Same-day support, on-site visits, and a team that actually picks up the phone.',
  },
  {
    title: '25 years of proven delivery',
    desc: 'Since 2000, we\'ve delivered over 5,000 projects for businesses across Chennai. We don\'t just build — we maintain and grow with you.',
  },
]

export default function BuiltForHeroes() {
  return (
    <motion.section className="built-for">
      <div className="container">
        <motion.div className="built-for-header">
          <p className="section-label">Built for Chennai businesses</p>
          <h2>Built to power businesses<br />like yours</h2>
          <p>Whether you're a startup, a retailer, a school, or an enterprise — Goldmine gives every business the technology it deserves.</p>
        </motion.div>

        <div className="built-for-grid">
          {CARDS.map((card) => (
            <motion.div key={card.title} className="bf-card">
              <div className="bf-visual">
                <VisualPlaceholder height={200} />
              </div>
              <div className="bf-title">{card.title}</div>
              <div className="bf-desc">{card.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
