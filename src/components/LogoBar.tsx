import { motion } from 'framer-motion'
import './LogoBar.css'

const CLIENTS = [
  'Client 01', 'Client 02', 'Client 03', 'Client 04',
  'Client 05', 'Client 06', 'Client 07', 'Client 08',
]

export default function LogoBar() {
  return (
    <motion.section className="logo-bar">
      <div className="container">
        <p className="logo-bar-label">Trusted by Chennai's leading businesses</p>
        <div className="logo-bar-row">
          {CLIENTS.map((name) => (
            <motion.span key={name} className="logo-pill">{name}</motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
