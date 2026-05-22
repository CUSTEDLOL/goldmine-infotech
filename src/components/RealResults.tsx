import { motion } from 'framer-motion'
import RollingStatNumber from './RollingStatNumber'
import './RealResults.css'

const STATS = [
  { value: '25 yrs', desc: 'Trusted since 2000' },
  { value: '1,200+', desc: 'Happy clients across Chennai' },
  { value: '5,000+', desc: 'Projects delivered' },
]

const CARDS = [
  {
    brand: 'Kavitha Jewellers',
    stat: '8×',
    desc: '"Goldmine\'s jewellery business suite cut our manual billing time by 8x. What used to take our team all morning now takes minutes."',
    name: '[Name], Owner',
    role: 'Kavitha Jewellers',
  },
  {
    brand: 'Chennai Car Rentals',
    stat: '100%',
    desc: '"Every single branch now has working CCTV with remote access. Goldmine installed everything in two days. Outstanding service."',
    name: '[Name], Operations Head',
    role: 'Chennai Car Rentals',
  },
  {
    brand: '[School / Office Client]',
    stat: '3→1',
    desc: '"We replaced three separate IT vendors with Goldmine. Web hosting, office computers, CCTV — all managed by one team now."',
    name: '[Name], Admin Director',
    role: '[School Name]',
  },
]

export default function RealResults() {
  return (
    <motion.section className="real-results">
      <div className="container">
        <motion.div className="rr-header">
          <p className="section-label">Real results</p>
          <h2>Real results from real clients</h2>
          <p>Numbers from businesses we've served across Chennai.</p>
        </motion.div>

        <div className="stats-row">
          {STATS.map((s, index) => (
            <motion.div key={s.value} className="stat">
              <div className="stat-num">
                <RollingStatNumber value={s.value} startDelay={index * 0.22} />
              </div>
              <div className="stat-desc">{s.desc}</div>
            </motion.div>
          ))}
        </div>

        <div className="results-grid">
          {CARDS.map((c, i) => (
            <motion.div key={c.brand} className={`rc rc--${i}`}>
              <div className="rc-brand">{c.brand}</div>
              <div className="rc-stat">{c.stat}</div>
              <div className="rc-desc">{c.desc}</div>
              <div className="rc-author">{c.name}</div>
              <div className="rc-role">{c.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
