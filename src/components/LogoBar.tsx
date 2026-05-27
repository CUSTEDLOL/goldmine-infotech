import { motion } from 'framer-motion'
import './LogoBar.css'

const LOGOS = [
  { src: 'https://www.glosilscientific.com/img/logo/logo.png',            label: 'Glosil Scientific' },
  { src: 'https://www.kapoorsfurnishing.com/img/home/logo-3-1.png',       label: 'Kapoors Furnishing' },
  { src: 'https://www.babymahal.com/img/logo.png',                        label: 'Baby Mahal',         imgFilter: 'brightness(0) saturate(100%) invert(18%) sepia(95%) saturate(2000%) hue-rotate(310deg) brightness(90%)' },
  { src: 'https://www.sps.edu.in/img/shlogo.png',                         label: 'SPS' },
  { src: 'https://www.enrootdentistry.com/assets/img/logo.png',           label: 'Enroot Dentistry' },
  { src: 'https://www.vaniyarsangamam.in/images/src/logo.png',            label: 'Vaniyar Sangamam' },
  { src: 'https://www.aatralarakattalai.com/assets/img/logo/logo.png',    label: 'Aatralara Kattalai' },
  { src: 'https://www.agrglobalschool.org/assets/img/core-img/logo-light.png', label: 'AGR Global School', imgFilter: 'brightness(0)' },
  { src: 'https://i0.wp.com/rkmvc.ac.in/wp-content/uploads/2025/01/logo-rkmvc.png?fit=1106%2C300&ssl=1', label: 'RKM Vivekananda College' },
  { src: 'https://www.noiseandgrains.com/_next/image?url=%2Fimages%2Fng_logo.png&w=256&q=75', label: 'Noise and Grains' },
]

// Duplicate for seamless infinite scroll
const LOGOS_DOUBLED = [...LOGOS, ...LOGOS]

export default function LogoBar() {
  return (
    <motion.section
      className="logo-bar"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <p className="logo-bar-label">Trusted by Chennai's leading businesses</p>
      <div className="logo-bar-track-wrap">
        <div className="logo-bar-track">
          {LOGOS_DOUBLED.map((logo, i) => (
            <div key={`${logo.label}-${i}`} className="logo-icon">
              <div className="logo-icon__card">
                <img src={logo.src} alt={logo.label} className="logo-icon__img" loading="lazy"
                  style={logo.imgFilter ? { filter: logo.imgFilter } : undefined} />
              </div>
              <span className="logo-icon__label">{logo.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
