import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './TestimonialsGrid.css'

const CARDS = [
  {
    text: 'Goldmine completely transformed our online presence. Our new website brought in enquiries within the first week of going live.',
    name: '[Name]',
    role: 'Business Owner · [Company]',
  },
  {
    text: 'The CCTV installation was seamless. Four cameras across two floors, done in half a day. The remote viewing app works perfectly.',
    name: '[Name]',
    role: 'Business Owner · [Company]',
  },
  {
    text: 'We switched our hosting to Goldmine three years ago and haven\'t had a single outage. Their support team is extraordinary.',
    name: '[Name]',
    role: 'IT Manager · [Company]',
  },
  {
    text: 'Best investment our school has made. Biometric attendance for 800 students, working flawlessly since day one.',
    name: '[Name]',
    role: 'Principal · [School Name]',
  },
  {
    text: 'The quotation software Goldmine built for us is exactly what we needed. Our sales team generates professional quotes in seconds.',
    name: '[Name]',
    role: 'Sales Director · [Company]',
  },
  {
    text: 'Our team went from managing three IT vendors to one call with Goldmine. The peace of mind alone is worth it.',
    name: '[Name]',
    role: 'Director · [Company]',
  },
  {
    text: 'Goldmine built our complex mobile app and backend system flawlessly. Their technical understanding of our specific logistics needs was impressive.',
    name: '[Name]',
    role: 'CTO · [Logistics firm]',
  },
  {
    text: 'Having our cloud hosting and security managed by the same team that built our platform has completely eliminated our vendor coordination headaches.',
    name: '[Name]',
    role: 'Operations Head · [Company]',
  },
  {
    text: 'The ongoing IT support is fantastic. Whenever we have a server issue or network hiccup, they handle it before we even notice.',
    name: '[Name]',
    role: 'Facility Manager · [Company]',
  }
]

export default function TestimonialsGrid() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Split the cards into 3 columns for the masonry aesthetic
  const column1Cards = [CARDS[0], CARDS[3], CARDS[6]];
  const column2Cards = [CARDS[1], CARDS[4], CARDS[7]];
  const column3Cards = [CARDS[2], CARDS[5], CARDS[8]];

  // For infinite scroll, double the cards if not on mobile
  const column1 = isMobile ? column1Cards : [...column1Cards, ...column1Cards];
  const column2 = isMobile ? column2Cards : [...column2Cards, ...column2Cards];
  const column3 = isMobile ? column3Cards : [...column3Cards, ...column3Cards];

  return (
    <motion.section className="tgrid-section">
      <div className="container">
        <motion.div className="tgrid-header">
          <h2>Some love from <span className="heart">🤍</span> our customers!</h2>
        </motion.div>

        <div className="tgrid-wrapper">
          <div className="tgrid">
            {/* Column 1 */}
            <div className={`tgrid-column ${isMobile ? '' : 'roll-up'}`}>
              {column1.map((card, i) => (
                <div key={i} className="tcard">
                  <p className="tcard-text">"{card.text}"</p>
                  <div className="tcard-foot">
                    <div className="tcard-avatar">👤</div>
                    <div>
                      <div className="tcard-name">{card.name}</div>
                      <div className="tcard-role">{card.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div className={`tgrid-column ${isMobile ? '' : 'roll-down'}`}>
              {column2.map((card, i) => (
                <div key={i} className="tcard">
                  <p className="tcard-text">"{card.text}"</p>
                  <div className="tcard-foot">
                    <div className="tcard-avatar">👤</div>
                    <div>
                      <div className="tcard-name">{card.name}</div>
                      <div className="tcard-role">{card.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3 */}
            <div className={`tgrid-column ${isMobile ? '' : 'roll-up'}`}>
              {column3.map((card, i) => (
                <div key={i} className="tcard">
                  <p className="tcard-text">"{card.text}"</p>
                  <div className="tcard-foot">
                    <div className="tcard-avatar">👤</div>
                    <div>
                      <div className="tcard-name">{card.name}</div>
                      <div className="tcard-role">{card.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
