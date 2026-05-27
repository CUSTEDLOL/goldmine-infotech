import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import retailersImage from '../assets/retailers.png'
import schoolsImage from '../assets/Schools.png'
import corporationsImage from '../assets/corporation.png'
import startupsImage from '../assets/startups.png'
import manufacturersImage from '../assets/manufacturers.png'
import './PersonasSection.css'

interface Feature {
  title: string
  desc: string
}

interface Persona {
  id: string
  label: string
  image: string
  headline: string
  cta: string
  features: Feature[]
}

const PERSONAS: Persona[] = [
  {
    id: 'retailers',
    label: 'Retailers',
    image: retailersImage,
    headline: 'Streamline your shop,\nsell smarter',
    cta: 'Explore Retailer solutions',
    features: [
      {
        title: 'Custom Invoicing Software',
        desc: 'Automated GST invoices, inventory tracking, and customer records built for Indian retail. Handles billing, returns, and daily reports in one place.',
      },
      {
        title: 'Security & Surveillance',
        desc: 'CCTV coverage and biometric staff entry tailored for shops, showrooms, and warehouses. Installed and maintained by our team.',
      },
      {
        title: 'Hardware at Best Price',
        desc: 'Desktops, billing machines, and barcode scanners sourced, configured, and delivered. Lifelong servicing guarantee included.',
      },
    ],
  },
  {
    id: 'schools',
    label: 'Schools & Colleges',
    image: schoolsImage,
    headline: 'Build a smarter campus,\none system at a time',
    cta: 'Explore Education solutions',
    features: [
      {
        title: 'Attendance & Management Software',
        desc: 'Automated biometric attendance, fee collection, and report generation for schools and colleges. Parents get live updates.',
      },
      {
        title: 'Campus Security',
        desc: 'IP cameras for every corridor, biometric entry at gates, and real-time monitoring dashboards deployed and maintained by us.',
      },
      {
        title: 'Computer Labs & Staff Systems',
        desc: 'Bulk desktops and laptops with educational software pre-configured. Ongoing AMC support keeps everything running.',
      },
    ],
  },
  {
    id: 'offices',
    label: 'Offices & Corporates',
    image: corporationsImage,
    headline: 'Your complete IT partner\nfrom day one',
    cta: 'Explore Office solutions',
    features: [
      {
        title: 'HR & Payroll Software',
        desc: 'Biometric attendance linked to automated payroll, leave management, and employee records — zero manual effort.',
      },
      {
        title: 'Network & Security Infrastructure',
        desc: 'Structured cabling, Wi-Fi deployment, CCTV, and access control installed and maintained by our team.',
      },
      {
        title: 'Workstation Procurement',
        desc: 'Desktops, laptops, and servers at competitive prices with lifelong servicing and rapid replacement guarantees.',
      },
    ],
  },
  {
    id: 'startups',
    label: 'Startups & Founders',
    image: startupsImage,
    headline: 'Launch your digital\nfrontier fast',
    cta: 'Explore Startup solutions',
    features: [
      {
        title: 'Website & Custom Software',
        desc: 'Professional websites, booking platforms, and business apps built and maintained by our in-house team. You focus on growth.',
      },
      {
        title: 'Full-Stack IT Setup',
        desc: 'Office hardware, security cameras, and networking deployed in days. One team handles everything from cabling to cloud.',
      },
      {
        title: 'Growth Packages',
        desc: 'Bundled plans covering tech infrastructure, software, and ongoing support. Predictable costs, no surprise bills.',
      },
    ],
  },
  {
    id: 'manufacturers',
    label: 'Manufacturers',
    image: manufacturersImage,
    headline: 'Keep production\nrunning, always',
    cta: 'Explore Manufacturing solutions',
    features: [
      {
        title: 'Inventory & Billing Systems',
        desc: 'Track raw materials, finished goods, and sales with custom GST-ready invoicing built for your workflow.',
      },
      {
        title: 'Factory Security',
        desc: 'High-coverage CCTV, biometric worker entry, and shift-based access control for production floors and entry points.',
      },
      {
        title: 'Bulk Hardware Supply',
        desc: 'Rugged desktops and industrial peripherals at B2B pricing, with guaranteed servicing and same-day support on-site.',
      },
    ],
  },
]

export default function PersonasSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 640 : false
  )
  const active = PERSONAS[activeIndex]

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const header = (
    <div className="personas-header">
      <div className="personas-badge">
        <span className="personas-badge-dot" />
        Who We Serve
      </div>
      <h2 className="personas-title">Technology that fits the way you work</h2>
      <p className="personas-subtitle">
        Explore the business profile closest to yours and see how Goldmine combines
        software, hardware, security, and support into one working system.
      </p>
    </div>
  )

  if (isMobile) {
    return (
      <section className="personas-section">
        <div className="personas-inner">
          {header}
          <div className="personas-mobile-stack">
            {PERSONAS.map((persona) => (
              <div key={persona.id} className="personas-mobile-item">
                <div className="personas-mobile-label-row">
                  <span className="personas-mobile-label">{persona.label}</span>
                </div>
                <h2 className="personas-mobile-headline">
                  {persona.headline.split('\n').map((line, i, lines) => (
                    <span key={line}>
                      {line}
                      {i < lines.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
                <button type="button" className="personas-cta">{persona.cta}</button>
                <div className="personas-mobile-details">
                  {persona.features.map((feature) => (
                    <article key={feature.title} className="personas-detail">
                      <h3 className="personas-detail__title">{feature.title}</h3>
                      <p className="personas-detail__desc">{feature.desc}</p>
                    </article>
                  ))}
                </div>
                <div className="personas-mobile-visual">
                  <img
                    src={persona.image}
                    alt={persona.label}
                    className="personas-mobile-visual-img"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="personas-section">
      <div className="personas-inner">
        {header}

        <div className="personas-shell">
          <div className="personas-tabs" role="tablist" aria-label="Who we serve personas">
            {PERSONAS.map((persona, index) => (
              <button
                key={persona.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                className={`personas-tab${index === activeIndex ? ' personas-tab--active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="personas-tab__label">{persona.label}</span>
                <div className="personas-tab__visual">
                  <div className={`personas-tab__visual-frame personas-tab__visual-frame--${persona.id}`}>
                    <img
                      className="personas-tab__visual-image"
                      src={persona.image}
                      alt=""
                      loading="lazy"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="personas-body">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="personas-body__inner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="personas-body__intro">
                  <h2 className="personas-body__headline">
                    {active.headline.split('\n').map((line, index, lines) => (
                      <span key={line}>
                        {line}
                        {index < lines.length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                  <button type="button" className="personas-cta">{active.cta}</button>
                </div>

                <div className="personas-body__details">
                  {active.features.map((feature) => (
                    <article key={feature.title} className="personas-detail">
                      <h3 className="personas-detail__title">{feature.title}</h3>
                      <p className="personas-detail__desc">{feature.desc}</p>
                    </article>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
