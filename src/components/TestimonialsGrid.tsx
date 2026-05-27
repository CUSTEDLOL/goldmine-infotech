import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './TestimonialsGrid.css'

const CARDS = [
  {
    text: 'Goldmine completely transformed our online presence. Our new website brought in enquiries within the first week of going live.',
    name: 'Ravi Shankar',
    role: 'Business Owner',
  },
  {
    text: 'The CCTV installation was seamless. Four cameras across two floors, done in half a day. The remote viewing app works perfectly.',
    name: 'Priya Natarajan',
    role: 'Store Manager',
  },
  {
    text: "We switched our hosting to Goldmine three years ago and haven't had a single outage. Their support team is extraordinary.",
    name: 'Anand Krishnamurthy',
    role: 'IT Manager',
  },
  {
    text: 'Best investment our school has made. Biometric attendance for 800 students, working flawlessly since day one.',
    name: 'Dr. Meena Subramanian',
    role: 'Principal',
  },
  {
    text: 'The quotation software Goldmine built for us is exactly what we needed. Our sales team generates professional quotes in seconds.',
    name: 'Karthik Rajendran',
    role: 'Sales Director',
  },
  {
    text: 'Our team went from managing three IT vendors to one call with Goldmine. The peace of mind alone is worth it.',
    name: 'Senthil Kumar',
    role: 'Director',
  },
  {
    text: 'Goldmine built our complex mobile app and backend system flawlessly. Their technical understanding of our specific logistics needs was impressive.',
    name: 'Arun Venkatesh',
    role: 'CTO',
  },
  {
    text: 'Having our cloud hosting and security managed by the same team that built our platform has completely eliminated our vendor coordination headaches.',
    name: 'Deepika Mohan',
    role: 'Operations Head',
  },
  {
    text: 'The ongoing IT support is fantastic. Whenever we have a server issue or network hiccup, they handle it before we even notice.',
    name: 'Rajesh Chandran',
    role: 'Facility Manager',
  }
]

const MOBILE_CARDS = [...CARDS, ...CARDS]

const column1Cards = [CARDS[0], CARDS[3], CARDS[6]]
const column2Cards = [CARDS[1], CARDS[4], CARDS[7]]
const column3Cards = [CARDS[2], CARDS[5], CARDS[8]]
const column1 = [...column1Cards, ...column1Cards]
const column2 = [...column2Cards, ...column2Cards]
const column3 = [...column3Cards, ...column3Cards]

function Card({ text, name, role }: { text: string; name: string; role: string }) {
  return (
    <div className="tcard">
      <p className="tcard-text">"{text}"</p>
      <div className="tcard-foot">
        <div className="tcard-avatar">👤</div>
        <div>
          <div className="tcard-name">{name}</div>
          <div className="tcard-role">{role}</div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsGrid() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <motion.section className="tgrid-section">
      <div className="container">
        <motion.div className="tgrid-header">
          <h2>Some <span className="heart">❤️</span> from our customers!</h2>
        </motion.div>

        <div className="tgrid-wrapper">
          {isMobile ? (
            /* Single rolling column on mobile */
            <div className="tgrid-column tgrid-column--mobile">
              {MOBILE_CARDS.map((card, i) => (
                <Card key={i} {...card} />
              ))}
            </div>
          ) : (
            /* 3-column masonry on desktop */
            <div className="tgrid">
              <div className="tgrid-column roll-up">
                {column1.map((card, i) => <Card key={i} {...card} />)}
              </div>
              <div className="tgrid-column roll-down">
                {column2.map((card, i) => <Card key={i} {...card} />)}
              </div>
              <div className="tgrid-column roll-up">
                {column3.map((card, i) => <Card key={i} {...card} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}
