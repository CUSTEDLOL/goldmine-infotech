import { CctvAnim, BiometricAnim } from '@/components/ui/cybernetic-bento-grid'
import './SecuritySection.css'

const CCTV_COVERAGE = [
  { label: 'Schools & Colleges' },
  { label: 'Homes & Villas' },
  { label: 'Offices & Shops' },
  { label: 'Warehouses' },
  { label: 'Institutions' },
]

export default function SecuritySection() {
  return (
    <section className="sec-section">
      <div className="sec-inner">
        <div className="sec-header">
          <div className="sec-badge">
            <span className="sec-badge-dot" />
            Security Solutions
          </div>
          <h2 className="sec-title">Protect what matters most</h2>
          <p className="sec-subtitle">
            End-to-end surveillance and access control — IP cameras, NVR systems,
            fingerprint scanners, and face recognition deployed and monitored by our team.
          </p>
        </div>

        <div className="sec-grid">
          <div className="sec-card">
            <div className="sec-card__eyebrow">CCTV Surveillance</div>
            <div className="sec-card__title">Full-coverage camera systems</div>
            <div className="sec-card__desc">
              IP cameras, NVR/DVR setups, and remote monitoring for every environment —
              installed, configured, and maintained by us.
            </div>
            <div className="sec-coverage">
              {CCTV_COVERAGE.map(c => (
                <span key={c.label} className="sec-coverage__tag">
                  <span className="sec-coverage__tag-dot" />
                  {c.label}
                </span>
              ))}
            </div>
            <div className="sec-cctv-wrap">
              <CctvAnim />
            </div>
          </div>

          <div className="sec-card">
            <div className="sec-card__eyebrow">Biometric Access Control</div>
            <div className="sec-card__title">Fingerprint &amp; face recognition</div>
            <div className="sec-card__desc">
              Modern biometric terminals for attendance, door access, and time tracking —
              deployed for offices, schools, and gated communities.
            </div>
            <div className="sec-bio-wrap">
              <BiometricAnim />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
