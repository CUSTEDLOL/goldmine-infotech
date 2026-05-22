import { motion } from 'framer-motion'
import './Testimonial.css'

interface Props {
  quote: string
  name: string
  role: string
  company: string
  dark?: boolean
  stripe?: boolean
}

export default function Testimonial({ quote, name, role, company, dark = false, stripe = false }: Props) {
  const sectionClass = [
    'testi',
    dark ? 'testi--dark' : 'testi--light',
    stripe ? 'testi--stripe' : '',
  ].filter(Boolean).join(' ')

  return (
    <motion.section className={sectionClass}>
      <div className="container">
        <div className="testi-inner">
          <motion.p className="testi-quote">"{quote}"</motion.p>
          <div className="testi-author">
            <div className="testi-avatar">
              <div
                className="vp"
                style={{
                  width: 48, height: 48,
                  borderRadius: '50%',
                  border: 'none',
                  background: dark ? '#222' : '#e4e4e4',
                  fontSize: 0,
                }}
              />
            </div>
            <div className="testi-info">
              <div className="testi-name">{name}</div>
              <div className="testi-role">{role}</div>
            </div>
            <div className="testi-divider" />
            <span className="testi-company">{company}</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
