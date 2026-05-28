import { Link } from 'react-router-dom'
import { useContactModal } from '../context/ContactModalContext'
import './FreeToolsPage.css'

const TOOLS = [
  {
    name: 'QR Code Generator',
    desc: 'Generate QR codes for URLs, contacts, and payments instantly.',
    example: 'e.g. UPI links, website URLs, vCards',
    to: '/tools/qr-code',
  },
  {
    name: 'Payment Receipt Generator',
    desc: 'Create professional GST-ready payment receipts in seconds.',
    example: 'e.g. client invoices, rent receipts',
    to: '/tools/payment-receipt',
  },
  {
    name: 'Compound Interest Calculator',
    desc: 'Calculate returns on investments with monthly/yearly compounding.',
    example: 'e.g. FDs, RDs, SIPs, loan planning',
    to: '/tools/compound-interest',
  },
  {
    name: 'Barcode Generator',
    desc: 'Generate Code128 barcodes for products, inventory, and retail.',
    example: 'e.g. product labels, shelf tags, POS',
    to: '/tools/barcode',
  },
  {
    name: 'Domain Finder',
    desc: 'Check domain availability and find the perfect name for your business.',
    example: 'e.g. .in, .com, .co.in, .net',
    to: '/tools/domain-finder',
  },
  {
    name: 'Image Resize & Compress',
    desc: 'Resize images to passport, stamp, or visa size. Compress JPEG quality to reduce file size.',
    example: 'e.g. passport photos, ID card, stamp size',
    to: '/tools/image-resize',
  },
  {
    name: 'Image to PDF',
    desc: 'Convert JPEG, PNG, and WebP images into a single downloadable PDF file.',
    example: 'e.g. scan documents, combine photos',
    to: '/tools/image-to-pdf',
  },
  {
    name: 'Estimate Generator',
    desc: 'Create professional estimates and quotes with itemised costs. Download as PDF instantly.',
    example: 'e.g. project quotes, service estimates',
    to: '/tools/estimate',
  },
]

export default function FreeToolsPage() {
  const { openModal } = useContactModal()

  return (
    <div className="ftp-root">

      {/* ── HERO ── */}
      <section className="ftp-hero">
        <div className="ftp-hero-inner">
          <p className="ftp-eyebrow">Free Tools · No Login Required</p>
          <h1 className="ftp-hero-headline">
            {`Free tools built\nfor Indian businesses.`}
          </h1>
          <p className="ftp-hero-sub">
            No account, no cost, no catch. Use them right here in your browser.
          </p>
          <div className="ftp-badges">
            <span className="ftp-badge">100% Free</span>
            <span className="ftp-badge">No Signup</span>
            <span className="ftp-badge">Works in Browser</span>
          </div>
        </div>
      </section>

      {/* ── TOOLS GRID ── */}
      <section className="ftp-tools">
        <div className="ftp-tools-inner">
          <p className="ftp-section-label">Available tools</p>
          <div className="ftp-tools-grid">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="ftp-tool-card">
                <h2 className="ftp-tool-name">{tool.name}</h2>
                <p className="ftp-tool-desc">{tool.desc}</p>
                <p className="ftp-tool-example">{tool.example}</p>
                <Link to={tool.to} className="ftp-tool-btn">
                  Try Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="ftp-cta">
        <div className="ftp-cta-inner">
          <p className="ftp-cta-eyebrow">Custom development</p>
          <h2 className="ftp-cta-headline">Need a custom tool built?</h2>
          <p className="ftp-cta-sub">
            We build bespoke web tools and internal software for businesses of all sizes.
            Tell us what you need and we'll make it happen.
          </p>
          <div className="ftp-cta-actions">
            <button
              className="ftp-cta-btn"
              onClick={() => openModal({
                badge: 'Free Tools',
                badgeColor: 'yellow',
                title: 'Build a Custom Tool',
                prefillMessage: 'Hi, I need a custom tool built for my business: ',
              })}
            >
              Build a Custom Tool
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
