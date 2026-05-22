import { useState, useRef, ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Briefcase, Calendar, Smartphone, Building2, Users } from 'lucide-react'
import {
  BusinessWebsiteAnim,
  PortfolioAnim,
  BookingAnim,
  AppDevelopmentAnim,
  FashionAnim,
  HRAnim,
} from '@/components/ui/cybernetic-bento-grid'
import './PlatformFeatures.css'

interface Feature {
  id: string
  icon: React.ElementType
  title: string
  description: string
  visual: ReactNode
  accent: string
}

const features: Feature[] = [
  {
    id: 'business-websites',
    icon: Globe,
    title: 'Business Websites',
    description: 'Professional, high-performance websites built to elevate your brand and drive growth.',
    visual: <BusinessWebsiteAnim />,
    accent: '#FCA311',
  },
  {
    id: 'personal-portfolio',
    icon: Briefcase,
    title: 'Personal Portfolio Websites',
    description: 'Stand out with stunning portfolio sites designed to showcase your work and attract opportunities.',
    visual: <PortfolioAnim />,
    accent: '#6B5CE7',
  },
  {
    id: 'booking-apps',
    icon: Calendar,
    title: 'Booking & Other Apps',
    description: 'Seamless booking systems and custom applications tailored to streamline your operations.',
    visual: <BookingAnim />,
    accent: '#059669',
  },
  {
    id: 'app-development',
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile experiences that engage users and deliver real value.',
    visual: <AppDevelopmentAnim />,
    accent: '#ec4899',
  },
  {
    id: 'fabric-jewellery',
    icon: Building2,
    title: 'Fabric / Jewellery Business Software',
    description: 'Curated, industry-specific software solutions to manage inventory, sales, and customer relations.',
    visual: <FashionAnim />,
    accent: '#eab308',
  },
  {
    id: 'hr-software',
    icon: Users,
    title: 'HR Software',
    description: 'Comprehensive human resources management systems to simplify payroll, attendance, and employee data.',
    visual: <HRAnim />,
    accent: '#3b82f6',
  }
]

export default function PlatformFeatures() {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Pick whichever item's center is closest to the viewport center — works in both scroll directions
  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight / 2
      let closest = 0
      let minDist = Infinity
      itemRefs.current.forEach((ref, i) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const dist = Math.abs((rect.top + rect.bottom) / 2 - mid)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setActiveIndex(closest)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const active = features[activeIndex]

  return (
    <section className="platform" id="features">
      <div className="pf-inner">

        {/* ── Header exactly like screenshot ── */}
        <div className="pf-header">
          <div className="pf-header-left">
            <h2>We build it. You run it.</h2>
          </div>
          <div className="pf-header-right">
            <p>You give us the brief. We design, build, and deliver — business websites, apps, software, and more. All done for you.</p>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="pf-two-col">

          {/* LEFT: Full List of Features */}
          <div className="pf-left-list">
            {features.map((f, i) => {
              const isActive = i === activeIndex
              const Icon = f.icon
              return (
                <div
                  key={f.id}
                  className="pf-list-item"
                  data-active={isActive ? 'true' : 'false'}
                  data-index={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                >
                  <div className="pf-list-item-icon">
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
                  </div>
                  <div className="pf-list-item-content">
                    <h3 className="pf-list-item-title">{f.title}</h3>
                    <p className="pf-list-item-desc">
                      {f.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RIGHT: Visual (Sticky) */}
          <div className="pf-right-container">
            <div className={`pf-visual-frame${active.id === 'app-development' ? ' pf-visual-frame--apps' : ''}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  className="pf-visual-inner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {active.visual}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
