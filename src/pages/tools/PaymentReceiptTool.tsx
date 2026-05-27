import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { useContactModal } from '../../context/ContactModalContext'
import './PaymentReceiptTool.css'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function today(): string {
  return new Date().toISOString().split('T')[0]
}

// Indian number-to-words (handles up to crores)
function amountToWords(n: number): string {
  if (!n || isNaN(n)) return ''

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

  function twoDigit(num: number): string {
    if (num < 20) return ones[num]
    return (tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '')).trim()
  }

  function threeDigit(num: number): string {
    if (num === 0) return ''
    let result = ''
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + ' Hundred'
      num = num % 100
      if (num > 0) result += ' '
    }
    result += twoDigit(num)
    return result.trim()
  }

  const intPart = Math.floor(n)
  if (intPart === 0) return 'Zero Rupees Only'

  const crore = Math.floor(intPart / 1_00_00_000)
  const lakh  = Math.floor((intPart % 1_00_00_000) / 1_00_000)
  const thousand = Math.floor((intPart % 1_00_000) / 1000)
  const remainder = intPart % 1000

  const parts: string[] = []
  if (crore > 0)    parts.push(threeDigit(crore) + ' Crore')
  if (lakh > 0)     parts.push(threeDigit(lakh) + ' Lakh')
  if (thousand > 0) parts.push(threeDigit(thousand) + ' Thousand')
  if (remainder > 0) parts.push(threeDigit(remainder))

  return parts.join(' ') + ' Rupees Only'
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PaymentReceiptTool() {
  const { openModal } = useContactModal()
  const [receiptNumber, setReceiptNumber] = useState('REC-001')
  const [date, setDate]                   = useState(today())
  const [receivedFrom, setReceivedFrom]   = useState('')
  const [amount, setAmount]               = useState('')
  const [amountWords, setAmountWords]     = useState('')
  const [paymentMode, setPaymentMode]     = useState('Cash')
  const [refNumber, setRefNumber]         = useState('')
  const [receivedBy, setReceivedBy]       = useState('')
  const [forDesc, setForDesc]             = useState('')
  const [notes, setNotes]                 = useState('')

  // Auto-fill amount in words whenever amount changes
  useEffect(() => {
    const n = parseFloat(amount)
    setAmountWords(n > 0 ? amountToWords(n) : '')
  }, [amount])

  const displayAmount = parseFloat(amount) > 0
    ? parseFloat(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })
    : '0.00'

  // ─── PDF Generation ──────────────────────────────────────────────────────

  function generatePDF() {
    const doc = new jsPDF('p', 'mm', 'a4')
    const pageW = 210
    const marginL = 20
    const marginR = 20
    const centerX = pageW / 2

    // Border
    doc.setDrawColor(220, 220, 220)
    doc.setLineWidth(0.5)
    doc.roundedRect(marginL - 5, 20, pageW - (marginL - 5) * 2, 200, 4, 4)

    let y = 38

    // Watermark
    doc.setFontSize(60)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(252, 163, 17)
    doc.saveGraphicsState()
    // Approximate watermark via light color text
    doc.setGState(doc.GState({ opacity: 0.08 }))
    doc.text('PAID', centerX, 120, { align: 'center', angle: 30 })
    doc.restoreGraphicsState()

    // Title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(10, 10, 10)
    doc.text('PAYMENT RECEIPT', centerX, y, { align: 'center' })

    y += 5
    doc.setDrawColor(252, 163, 17)
    doc.setLineWidth(0.8)
    doc.line(marginL, y, pageW - marginR, y)

    // Receipt # and Date
    y += 8
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    doc.text(`Receipt #: ${receiptNumber}`, marginL, y)
    doc.text(`Date: ${date}`, pageW - marginR, y, { align: 'right' })

    // Amount
    y += 14
    doc.setFontSize(32)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(10, 10, 10)
    doc.text(`₹ ${displayAmount}`, centerX, y, { align: 'center' })

    y += 8
    doc.setFontSize(10)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(120, 120, 120)
    if (amountWords) doc.text(amountWords, centerX, y, { align: 'center' })

    y += 14
    doc.setDrawColor(240, 240, 240)
    doc.setLineWidth(0.3)
    doc.line(marginL, y, pageW - marginR, y)

    // Info grid
    y += 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(170, 170, 170)
    doc.text('RECEIVED FROM', marginL, y)
    doc.text('PAYMENT MODE', centerX - 10, y)
    if (refNumber) doc.text('REFERENCE #', pageW - marginR - 40, y)

    y += 5
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(10, 10, 10)
    doc.text(receivedFrom || '—', marginL, y)
    doc.text(paymentMode, centerX - 10, y)
    if (refNumber) doc.text(refNumber, pageW - marginR - 40, y)

    y += 14
    if (forDesc) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(100, 100, 100)
      doc.text('For:', marginL, y)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(10, 10, 10)
      doc.text(forDesc, marginL + 12, y)
      y += 10
    }

    if (notes) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(170, 170, 170)
      doc.text('NOTES', marginL, y)
      y += 5
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(80, 80, 80)
      const noteLines = doc.splitTextToSize(notes, pageW - marginL - marginR)
      doc.text(noteLines, marginL, y)
      y += noteLines.length * 5 + 6
    }

    // Signature
    y += 10
    doc.setDrawColor(200, 200, 200)
    doc.setLineDashPattern([1, 1], 0)
    doc.line(pageW - marginR - 60, y, pageW - marginR, y)
    doc.setLineDashPattern([], 0)
    y += 5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text('Received By', pageW - marginR - 60, y)
    if (receivedBy) {
      y += 5
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 10, 10)
      doc.text(receivedBy, pageW - marginR - 60, y)
    }

    // Footer
    y = 224
    doc.setDrawColor(235, 235, 235)
    doc.setLineWidth(0.3)
    doc.line(marginL, y, pageW - marginR, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 180)
    doc.text('goldmineinfotech.com/tools/payment-receipt', centerX, y + 5, { align: 'center' })

    doc.save(`Receipt-${receiptNumber}.pdf`)
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="rcpt-root">
      {/* Breadcrumb */}
      <nav className="rcpt-breadcrumb">
        <Link to="/" className="rcpt-breadcrumb-link">Home</Link>
        <span className="rcpt-breadcrumb-sep">/</span>
        <Link to="/tools" className="rcpt-breadcrumb-link">Tools</Link>
        <span className="rcpt-breadcrumb-sep">/</span>
        <span className="rcpt-breadcrumb-current">Payment Receipt Generator</span>
      </nav>

      {/* Hero */}
      <header className="rcpt-hero">
        <div className="rcpt-hero-badge">Free Tool</div>
        <h1 className="rcpt-hero-title">
          Payment Receipt <span className="rcpt-hero-accent">Generator</span>
        </h1>
        <p className="rcpt-hero-sub">
          Create professional payment receipts and download as PDF. Free, no login required.
        </p>
      </header>

      <div className="rcpt-container">

        {/* ── Form ─────────────────────────────────────────────────────────── */}
        <div className="rcpt-form-card">
          <div className="rcpt-form-title">Receipt Details</div>

          <div className="rcpt-grid-2">
            <div className="rcpt-field">
              <label className="rcpt-label">Receipt Number</label>
              <input
                className="rcpt-input"
                type="text"
                value={receiptNumber}
                onChange={e => setReceiptNumber(e.target.value)}
              />
            </div>
            <div className="rcpt-field">
              <label className="rcpt-label">Date</label>
              <input
                className="rcpt-input"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="rcpt-field">
            <label className="rcpt-label">Received From</label>
            <input
              className="rcpt-input"
              type="text"
              placeholder="Payer name"
              value={receivedFrom}
              onChange={e => setReceivedFrom(e.target.value)}
            />
          </div>

          <div className="rcpt-grid-2">
            <div className="rcpt-field">
              <label className="rcpt-label">Amount (₹)</label>
              <input
                className="rcpt-input"
                type="number"
                min="0"
                placeholder="0"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <div className="rcpt-field">
              <label className="rcpt-label">Amount in Words</label>
              <input
                className={`rcpt-input rcpt-input--muted`}
                type="text"
                readOnly
                value={amountWords}
                placeholder="Auto-filled from amount"
              />
            </div>
          </div>

          <div className="rcpt-grid-2">
            <div className="rcpt-field">
              <label className="rcpt-label">Payment Mode</label>
              <select
                className="rcpt-select"
                value={paymentMode}
                onChange={e => setPaymentMode(e.target.value)}
              >
                {['Cash', 'UPI', 'Cheque', 'NEFT/RTGS', 'Bank Transfer', 'Other'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="rcpt-field">
              <label className="rcpt-label">
                Reference # <span style={{ color: '#bbb', fontWeight: 400 }}>(optional)</span>
              </label>
              <input
                className="rcpt-input"
                type="text"
                placeholder="UTR / Cheque number"
                value={refNumber}
                onChange={e => setRefNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="rcpt-grid-2">
            <div className="rcpt-field">
              <label className="rcpt-label">Received By</label>
              <input
                className="rcpt-input"
                type="text"
                placeholder="Your business / person name"
                value={receivedBy}
                onChange={e => setReceivedBy(e.target.value)}
              />
            </div>
            <div className="rcpt-field">
              <label className="rcpt-label">For</label>
              <input
                className="rcpt-input"
                type="text"
                placeholder="Description of payment"
                value={forDesc}
                onChange={e => setForDesc(e.target.value)}
              />
            </div>
          </div>

          <div className="rcpt-field">
            <label className="rcpt-label">
              Notes <span style={{ color: '#bbb', fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              className="rcpt-textarea"
              rows={3}
              placeholder="Any additional notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <button type="button" className="rcpt-generate-btn" onClick={generatePDF}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
            </svg>
            Download PDF Receipt
          </button>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────────── */}
        <hr className="rcpt-divider" />

        {/* ── Live Preview ──────────────────────────────────────────────────── */}
        <div className="rcpt-preview-label">Live Preview</div>

        <div className="rcpt-card">
          {/* PAID watermark */}
          <div className="rcpt-watermark" aria-hidden="true">PAID</div>

          {/* Header */}
          <div className="rcpt-card-header">
            <div className="rcpt-card-title">PAYMENT RECEIPT</div>
            <div className="rcpt-card-subtitle">Official receipt — keep for your records</div>
          </div>

          {/* Receipt # and Date */}
          <div className="rcpt-card-meta">
            <div className="rcpt-card-meta-left">Receipt #{receiptNumber}</div>
            <div>{date}</div>
          </div>

          {/* Amount */}
          <div className="rcpt-amount-block">
            <div className="rcpt-amount-figure">₹ {displayAmount}</div>
            {amountWords && <div className="rcpt-amount-words">{amountWords}</div>}
          </div>

          {/* Info Grid */}
          <div className="rcpt-info-grid">
            <div className="rcpt-info-cell">
              <div className="rcpt-info-cell-label">Received From</div>
              <div className={`rcpt-info-cell-value${!receivedFrom ? ' rcpt-info-cell-value--muted' : ''}`}>
                {receivedFrom || '—'}
              </div>
            </div>
            <div className="rcpt-info-cell">
              <div className="rcpt-info-cell-label">Payment Mode</div>
              <div className="rcpt-info-cell-value">{paymentMode}</div>
            </div>
            <div className="rcpt-info-cell">
              <div className="rcpt-info-cell-label">Reference #</div>
              <div className={`rcpt-info-cell-value${!refNumber ? ' rcpt-info-cell-value--muted' : ''}`}>
                {refNumber || '—'}
              </div>
            </div>
          </div>

          {/* For */}
          {forDesc && (
            <div className="rcpt-for-row">
              <strong>For:</strong> {forDesc}
            </div>
          )}

          {/* Received By + Signature */}
          <div className="rcpt-sig-row">
            <div className="rcpt-sig-block">
              <div className="rcpt-sig-name">{receivedBy || 'Received By'}</div>
              <div className="rcpt-sig-line">Authorised Signature</div>
            </div>
          </div>

          {/* Footer */}
          <div className="rcpt-card-footer">
            goldmineinfotech.com/tools/payment-receipt
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="tool-cta-strip">
        <p className="tool-cta-text">Need a custom solution for your business?</p>
        <button
          className="tool-cta-btn"
          onClick={() => openModal({
            badge: 'Free Tools',
            badgeColor: 'orange',
            title: 'Talk to our team',
            subtitle: 'We build custom software and tools for businesses across Chennai.',
            prefillMessage: 'Hi, I\'ve been using your free tools and I\'m interested in a custom solution for my business.',
          })}
        >
          Talk to our team →
        </button>
      </div>
    </div>
  )
}
