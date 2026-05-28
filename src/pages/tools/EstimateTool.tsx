import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import './EstimateTool.css'

interface LineItem {
  id: number
  name: string
  qty: string
  rate: string
}

interface FormState {
  estimateNumber: string
  date: string
  validUntil: string
  fromName: string
  fromAddress: string
  fromPhone: string
  fromEmail: string
  toName: string
  toAddress: string
  toPhone: string
  notes: string
}

function today(): string {
  return new Date().toISOString().split('T')[0]
}

function fmtINR(n: number): string {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2 })
}

function lineTotal(item: LineItem): number {
  return (parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0)
}

let nextId = 2

function newItem(): LineItem {
  return { id: nextId++, name: '', qty: '1', rate: '' }
}

export default function EstimateTool() {
  const [form, setForm] = useState<FormState>({
    estimateNumber: 'EST-001',
    date: today(),
    validUntil: '',
    fromName: '',
    fromAddress: '',
    fromPhone: '',
    fromEmail: '',
    toName: '',
    toAddress: '',
    toPhone: '',
    notes: '',
  })

  const [items, setItems] = useState<LineItem[]>([
    { id: 1, name: '', qty: '1', rate: '' },
  ])

  const setField = useCallback((key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }, [])

  const updateItem = useCallback((id: number, key: keyof LineItem, value: string) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, [key]: value } : it))
  }, [])

  const addItem = useCallback(() => setItems(prev => [...prev, newItem()]), [])

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.length > 1 ? prev.filter(it => it.id !== id) : prev)
  }, [])

  const grandTotal = items.reduce((s, it) => s + lineTotal(it), 0)

  function generatePDF() {
    const doc = new jsPDF('p', 'mm', 'a4')
    const pageW = 210
    const mL = 15
    const mR = 15

    let y = 15

    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(10, 10, 10)
    doc.text(form.fromName || 'Your Business', mL, y)

    doc.setFontSize(15)
    doc.setTextColor(252, 163, 17)
    doc.text('ESTIMATE', pageW - mR, y, { align: 'right' })

    y += 6
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(120, 120, 120)
    doc.text(`Estimate #: ${form.estimateNumber}`, pageW - mR, y, { align: 'right' })

    y += 5
    doc.text(`Date: ${form.date}`, pageW - mR, y, { align: 'right' })
    if (form.validUntil) {
      y += 5
      doc.text(`Valid Until: ${form.validUntil}`, pageW - mR, y, { align: 'right' })
    }

    y += 5
    doc.setDrawColor(252, 163, 17)
    doc.setLineWidth(0.5)
    doc.line(mL, y, pageW - mR, y)

    y += 8
    const col2x = mL + (pageW - mL - mR) / 2 + 5

    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(170, 170, 170)
    doc.text('FROM', mL, y)
    doc.text('ESTIMATE FOR', col2x, y)

    y += 5
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(10, 10, 10)
    doc.text(form.fromName || '—', mL, y)
    doc.text(form.toName || '—', col2x, y)

    y += 5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(80, 80, 80)

    const fromLines = [form.fromAddress, form.fromPhone, form.fromEmail].filter(Boolean)
    const toLines = [form.toAddress, form.toPhone].filter(Boolean)

    fromLines.forEach(line => { doc.text(line, mL, y); y += 4.5 })
    const toStartY = y - fromLines.length * 4.5
    toLines.forEach((line, i) => doc.text(line, col2x, toStartY + i * 4.5))

    y += 6

    autoTable(doc, {
      startY: y,
      margin: { left: mL, right: mR },
      head: [['#', 'Item / Description', 'Qty', 'Rate (₹)', 'Amount (₹)']],
      body: items.map((it, i) => [
        String(i + 1),
        it.name || '—',
        it.qty || '0',
        fmtINR(parseFloat(it.rate) || 0),
        fmtINR(lineTotal(it)),
      ]),
      styles: { fontSize: 9, cellPadding: 4, textColor: [40, 40, 40] },
      headStyles: { fillColor: [248, 248, 248], textColor: [120, 120, 120], fontStyle: 'bold', fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 80 },
        2: { halign: 'right' },
        3: { halign: 'right' },
        4: { halign: 'right' },
      },
      theme: 'plain',
      tableLineColor: [235, 235, 235],
      tableLineWidth: 0.3,
    })

    // @ts-ignore
    y = (doc as any).lastAutoTable.finalY + 8

    const totalsX = pageW - mR - 65
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.text('Subtotal', totalsX, y)
    doc.text(`₹ ${fmtINR(grandTotal)}`, pageW - mR, y, { align: 'right' })

    y += 8
    doc.setDrawColor(220, 220, 220)
    doc.line(totalsX, y - 2, pageW - mR, y - 2)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(10, 10, 10)
    doc.text('Total', totalsX, y + 4)
    doc.setTextColor(252, 163, 17)
    doc.text(`₹ ${fmtINR(grandTotal)}`, pageW - mR, y + 4, { align: 'right' })

    if (form.notes) {
      y += 16
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(170, 170, 170)
      doc.text('NOTES / TERMS', mL, y)
      y += 5
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(80, 80, 80)
      doc.text(doc.splitTextToSize(form.notes, 90), mL, y)
    }

    const footerY = 285
    doc.setDrawColor(235, 235, 235)
    doc.line(mL, footerY, pageW - mR, footerY)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 180)
    doc.text('Generated free at goldmineinfotech.com/tools/estimate', pageW / 2, footerY + 5, { align: 'center' })

    doc.save(`Estimate-${form.estimateNumber}.pdf`)
  }

  return (
    <div className="est-root">
      {/* Breadcrumb */}
      <nav className="est-breadcrumb">
        <Link to="/" className="est-bc-link">Home</Link>
        <span className="est-bc-sep">/</span>
        <Link to="/tools" className="est-bc-link">Tools</Link>
        <span className="est-bc-sep">/</span>
        <span className="est-bc-cur">Estimate Generator</span>
      </nav>

      {/* Hero */}
      <header className="est-hero">
        <div className="est-hero-badge">Free Tool</div>
        <h1 className="est-hero-title">
          Estimate <span className="est-hero-accent">Generator</span>
        </h1>
        <p className="est-hero-sub">
          Create professional estimates and quotes. Download as PDF. Free, no login required.
        </p>
      </header>

      <div className="est-layout">

        {/* ── LEFT: Form ── */}
        <div className="est-form-card">

          {/* Estimate Info */}
          <div className="est-section">
            <div className="est-section-title">Estimate Info</div>
            <div className="est-row-2">
              <div className="est-field">
                <label className="est-label">Estimate Number</label>
                <input className="est-input" type="text" value={form.estimateNumber} onChange={e => setField('estimateNumber', e.target.value)} />
              </div>
              <div className="est-field">
                <label className="est-label">Date</label>
                <input className="est-input" type="date" value={form.date} onChange={e => setField('date', e.target.value)} />
              </div>
            </div>
            <div className="est-field" style={{ marginTop: 12 }}>
              <label className="est-label">Valid Until <span className="est-optional">(optional)</span></label>
              <input className="est-input" type="date" value={form.validUntil} onChange={e => setField('validUntil', e.target.value)} />
            </div>
          </div>

          {/* From */}
          <div className="est-section">
            <div className="est-section-title">From (Your Business)</div>
            <div className="est-field">
              <label className="est-label">Business / Name</label>
              <input className="est-input" type="text" placeholder="Goldmine Infotech" value={form.fromName} onChange={e => setField('fromName', e.target.value)} />
            </div>
            <div className="est-field">
              <label className="est-label">Address</label>
              <textarea className="est-textarea" rows={2} value={form.fromAddress} onChange={e => setField('fromAddress', e.target.value)} />
            </div>
            <div className="est-row-2">
              <div className="est-field">
                <label className="est-label">Phone</label>
                <input className="est-input" type="text" value={form.fromPhone} onChange={e => setField('fromPhone', e.target.value)} />
              </div>
              <div className="est-field">
                <label className="est-label">Email</label>
                <input className="est-input" type="email" value={form.fromEmail} onChange={e => setField('fromEmail', e.target.value)} />
              </div>
            </div>
          </div>

          {/* To */}
          <div className="est-section">
            <div className="est-section-title">Estimate For (Client)</div>
            <div className="est-field">
              <label className="est-label">Client / Company Name</label>
              <input className="est-input" type="text" value={form.toName} onChange={e => setField('toName', e.target.value)} />
            </div>
            <div className="est-field">
              <label className="est-label">Address</label>
              <textarea className="est-textarea" rows={2} value={form.toAddress} onChange={e => setField('toAddress', e.target.value)} />
            </div>
            <div className="est-field">
              <label className="est-label">Phone <span className="est-optional">(optional)</span></label>
              <input className="est-input" type="text" value={form.toPhone} onChange={e => setField('toPhone', e.target.value)} />
            </div>
          </div>

          {/* Line Items */}
          <div className="est-section">
            <div className="est-section-title">Items</div>
            <div className="est-items-scroll">
              <div className="est-items-header">
                <div className="est-col-label">#</div>
                <div className="est-col-label">Item / Description</div>
                <div className="est-col-label">Qty</div>
                <div className="est-col-label">Rate ₹</div>
                <div className="est-col-label">Amount</div>
                <div />
              </div>
              {items.map((item, idx) => (
                <div key={item.id} className="est-item-row">
                  <div className="est-item-num">{idx + 1}</div>
                  <input
                    className="est-item-input"
                    type="text"
                    placeholder="Item name or description"
                    value={item.name}
                    onChange={e => updateItem(item.id, 'name', e.target.value)}
                  />
                  <input
                    className="est-item-input est-item-input--sm"
                    type="number"
                    min="0"
                    value={item.qty}
                    onChange={e => updateItem(item.id, 'qty', e.target.value)}
                  />
                  <input
                    className="est-item-input est-item-input--sm"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={item.rate}
                    onChange={e => updateItem(item.id, 'rate', e.target.value)}
                  />
                  <input
                    className="est-item-input est-item-input--sm est-item-input--ro"
                    type="text"
                    readOnly
                    value={fmtINR(lineTotal(item))}
                  />
                  <button type="button" className="est-item-remove" onClick={() => removeItem(item.id)} aria-label="Remove">
                    &times;
                  </button>
                </div>
              ))}
              <button type="button" className="est-add-btn" onClick={addItem}>+ Add Item</button>
            </div>
          </div>

          {/* Notes */}
          <div className="est-section">
            <div className="est-section-title">Notes / Terms</div>
            <textarea
              className="est-textarea"
              rows={3}
              placeholder="This estimate is valid for 30 days."
              value={form.notes}
              onChange={e => setField('notes', e.target.value)}
            />
          </div>

          <button type="button" className="est-download-btn" onClick={generatePDF}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
            </svg>
            Download PDF Estimate
          </button>
        </div>

        {/* ── RIGHT: Live Preview ── */}
        <div className="est-preview-card">
          <div className="est-preview-label">Live Preview</div>

          <div className="est-doc">
            <div className="est-doc-header">
              <div>
                <div className="est-doc-biz">{form.fromName || 'Your Business Name'}</div>
              </div>
              <div className="est-doc-title-block">
                <div className="est-doc-title">ESTIMATE</div>
                <div className="est-doc-meta">
                  <div>#{form.estimateNumber}</div>
                  <div>{form.date}</div>
                  {form.validUntil && <div>Valid until: {form.validUntil}</div>}
                </div>
              </div>
            </div>

            <div className="est-doc-addresses">
              <div>
                <div className="est-doc-addr-label">From</div>
                <div className="est-doc-addr-name">{form.fromName || '—'}</div>
                {form.fromAddress && <p className="est-doc-addr-line">{form.fromAddress}</p>}
                {form.fromPhone && <p className="est-doc-addr-line">{form.fromPhone}</p>}
                {form.fromEmail && <p className="est-doc-addr-line">{form.fromEmail}</p>}
              </div>
              <div>
                <div className="est-doc-addr-label">Estimate For</div>
                <div className="est-doc-addr-name">{form.toName || '—'}</div>
                {form.toAddress && <p className="est-doc-addr-line">{form.toAddress}</p>}
                {form.toPhone && <p className="est-doc-addr-line">{form.toPhone}</p>}
              </div>
            </div>

            <table className="est-doc-table">
              <thead>
                <tr>
                  <th className="est-doc-th">#</th>
                  <th className="est-doc-th">Item</th>
                  <th className="est-doc-th est-doc-th--right">Qty</th>
                  <th className="est-doc-th est-doc-th--right">Rate ₹</th>
                  <th className="est-doc-th est-doc-th--right">Amount ₹</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="est-doc-td est-doc-td--muted">{idx + 1}</td>
                    <td className="est-doc-td">{item.name || '—'}</td>
                    <td className="est-doc-td est-doc-td--right est-doc-td--num">{item.qty || '0'}</td>
                    <td className="est-doc-td est-doc-td--right est-doc-td--num">{fmtINR(parseFloat(item.rate) || 0)}</td>
                    <td className="est-doc-td est-doc-td--right est-doc-td--num">{fmtINR(lineTotal(item))}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="est-doc-footer">
              <div className="est-doc-notes">
                {form.notes && (
                  <>
                    <div className="est-doc-notes-label">Notes / Terms</div>
                    <p className="est-doc-notes-text">{form.notes}</p>
                  </>
                )}
              </div>
              <div className="est-doc-totals">
                <div className="est-doc-total-row">
                  <span>Subtotal</span>
                  <span>₹ {fmtINR(grandTotal)}</span>
                </div>
                <div className="est-doc-total-row est-doc-total-row--grand">
                  <span>Total</span>
                  <span>₹ {fmtINR(grandTotal)}</span>
                </div>
              </div>
            </div>

            <div className="est-doc-sig">Authorised Signatory</div>
            <div className="est-doc-page-footer">Generated free at goldmineinfotech.com/tools/estimate</div>
          </div>
        </div>

      </div>

      <div className="est-cta">
        <p className="est-cta-text">Need a full quotation or invoicing system?</p>
        <Link to="/software/billing-invoicing" className="est-cta-link">
          Explore our Billing &amp; Invoicing Software
        </Link>
      </div>
    </div>
  )
}
