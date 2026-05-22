import { Laptop, Monitor, Printer, Tv, Smartphone, ScanLine } from 'lucide-react'
import { ElectronicsAnim } from '@/components/ui/cybernetic-bento-grid'
import './ElectronicsSection.css'

const PRODUCTS = [
  { icon: Laptop,     name: 'Laptops' },
  { icon: Monitor,    name: 'Desktops' },
  { icon: Printer,    name: 'Printers' },
  { icon: ScanLine,   name: 'Scanners' },
  { icon: Tv,         name: 'Televisions' },
  { icon: Smartphone, name: 'Phones' },
]

const B2B_ITEMS = ['Office Bulk Orders', 'School & Labs', 'Corporate Setups', 'IT Procurement']
const B2C_ITEMS = ['Walk-in Retail', 'Home Users', 'Students', 'Personal Upgrades']

export default function ElectronicsSection() {
  return (
    <section className="elec-section">
      <div className="elec-inner">
        <div className="elec-header">
          <div className="elec-badge">
            <span className="elec-badge-dot" />
            Systems &amp; Electronics
          </div>
          <h2 className="elec-title">Your complete IT &amp; electronics partner</h2>
          <p className="elec-subtitle">
            From a single laptop to a full office setup — we supply, install, and support
            every device your business or home needs, with same-day availability.
          </p>
        </div>

        <div className="elec-grid">
          <div className="elec-card elec-card--large">
            <div className="elec-card__eyebrow">Live Inventory</div>
            <div className="elec-card__title">68 Products Ready</div>
            <div className="elec-card__desc">Real-time stock across all categories — walk in or order online.</div>
            <div className="elec-inv-wrap ba-dark">
              <ElectronicsAnim />
            </div>
          </div>

          <div className="elec-card">
            <div className="elec-card__eyebrow">What We Stock</div>
            <div className="elec-card__title">Every device, one place</div>
            <div className="elec-card__desc">Full range of consumer and enterprise hardware, always in stock.</div>
            <div className="elec-products">
              {PRODUCTS.map(({ icon: Icon, name }) => (
                <div key={name} className="elec-product-item">
                  <Icon size={22} className="elec-product-item__icon" />
                  <span className="elec-product-item__name">{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="elec-card">
            <div className="elec-card__eyebrow">Who We Serve</div>
            <div className="elec-card__title">B2B &amp; B2C</div>
            <div className="elec-card__desc">Whether you're a business or an individual — we've got you covered.</div>
            <div className="elec-audience">
              <div className="elec-audience__col">
                <div className="elec-audience__label">Business</div>
                {B2B_ITEMS.map(item => (
                  <div key={item} className="elec-audience__item">{item}</div>
                ))}
              </div>
              <div className="elec-audience__col">
                <div className="elec-audience__label">Personal</div>
                {B2C_ITEMS.map(item => (
                  <div key={item} className="elec-audience__item">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
