import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import './GSTInvoiceTool.css'

// ─── Types ────────────────────────────────────────────────────────────────────

interface LineItem {
  id: number
  name: string
  qty: string
  unit: string
  rate: string
  gstPct: string
}

interface FormState {
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  fromName: string
  fromGST: string
  fromAddress: string
  fromCity: string
  fromState: string
  fromPhone: string
  fromEmail: string
  toName: string
  toGST: string
  toAddress: string
  toCity: string
  toState: string
  notes: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function today(): string {
  return new Date().toISOString().split('T')[0]
}

function fmtINR(n: number): string {
  return n.toLocaleString('en-IN', { minimumFractionDigits: 2 })
}

function itemAmount(item: LineItem): number {
  const qty = parseFloat(item.qty) || 0
  const rate = parseFloat(item.rate) || 0
  return qty * rate
}

function itemTax(item: LineItem): number {
  return itemAmount(item) * (parseFloat(item.gstPct) || 0) / 100
}

let nextId = 2

function newItem(): LineItem {
  return { id: nextId++, name: '', qty: '1', unit: 'pcs', rate: '', gstPct: '18' }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GSTInvoiceTool() {
  const [form, setForm] = useState<FormState>({
    invoiceNumber: 'INV-001',
    invoiceDate: today(),
    dueDate: '',
    fromName: '',
    fromGST: '',
    fromAddress: '',
    fromCity: '',
    fromState: '',
    fromPhone: '',
    fromEmail: '',
    toName: '',
    toGST: '',
    toAddress: '',
    toCity: '',
    toState: '',
    notes: '',
  })

  const [items, setItems] = useState<LineItem[]>([
    { id: 1, name: '', qty: '1', unit: 'pcs', rate: '', gstPct: '18' },
  ])

  const setField = useCallback((key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }, [])

  const updateItem = useCallback((id: number, key: keyof LineItem, value: string) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, [key]: value } : it))
  }, [])

  const addItem = useCallback(() => {
    setItems(prev => [...prev, newItem()])
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.length > 1 ? prev.filter(it => it.id !== id) : prev)
  }, [])

  // ─── Calculations ──────────────────────────────────────────────────────────

  const subtotal = items.reduce((s, it) => s + itemAmount(it), 0)
  const totalTax = items.reduce((s, it) => s + itemTax(it), 0)

  const isSameState =
    form.fromState.trim() !== '' &&
    form.toState.trim() !== '' &&
    form.fromState.trim().toLowerCase() === form.toState.trim().toLowerCase()

  const cgst = isSameState ? totalTax / 2 : 0
  const sgst = isSameState ? totalTax / 2 : 0
  const igst = isSameState ? 0 : totalTax
  const grandTotal = subtotal + totalTax

  // ─── PDF Generation ────────────────────────────────────────────────────────

  function generatePDF() {
    const doc = new jsPDF('p', 'mm', 'a4')
    const pageW = 210
    const marginL = 15
    const marginR = 15
    const contentW = pageW - marginL - marginR

    let y = 15

    // Header
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(10, 10, 10)
    doc.text(form.fromName || 'Your Business', marginL, y)

    doc.setFontSize(14)
    doc.setTextColor(252, 163, 17)
    doc.text('TAX INVOICE', pageW - marginR, y, { align: 'right' })

    y += 6
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(120, 120, 120)
    if (form.fromGST) doc.text(`GSTIN: ${form.fromGST}`, marginL, y)
    doc.text(`Invoice #: ${form.invoiceNumber}`, pageW - marginR, y, { align: 'right' })

    y += 5
    doc.text(`Date: ${form.invoiceDate}`, pageW - marginR, y, { align: 'right' })
    if (form.dueDate) {
      y += 5
      doc.text(`Due: ${form.dueDate}`, pageW - marginR, y, { align: 'right' })
    }

    y += 4
    doc.setDrawColor(252, 163, 17)
    doc.setLineWidth(0.5)
    doc.line(marginL, y, pageW - marginR, y)

    // Addresses
    y += 8
    const col2x = marginL + contentW / 2 + 5

    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(170, 170, 170)
    doc.text('FROM', marginL, y)
    doc.text('BILL TO', col2x, y)

    y += 5
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(10, 10, 10)
    doc.setFontSize(10)
    doc.text(form.fromName || '—', marginL, y)
    doc.text(form.toName || '—', col2x, y)

    y += 5
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(80, 80, 80)

    const fromLines = [
      form.fromAddress,
      [form.fromCity, form.fromState].filter(Boolean).join(', '),
      form.fromPhone,
      form.fromEmail,
      form.fromGST ? `GSTIN: ${form.fromGST}` : '',
    ].filter(Boolean)

    const toLines = [
      form.toAddress,
      [form.toCity, form.toState].filter(Boolean).join(', '),
      form.toGST ? `GSTIN: ${form.toGST}` : '',
    ].filter(Boolean)

    fromLines.forEach(line => {
      doc.text(line, marginL, y)
      y += 4.5
    })

    const toStartY = y - fromLines.length * 4.5
    toLines.forEach((line, i) => {
      doc.text(line, col2x, toStartY + i * 4.5)
    })

    y += 4

    // Items Table
    autoTable(doc, {
      startY: y,
      margin: { left: marginL, right: marginR },
      head: [['Item', 'Qty', 'Unit', 'Rate (₹)', 'GST%', 'Amount (₹)']],
      body: items.map(it => [
        it.name || '—',
        it.qty || '0',
        it.unit || '',
        fmtINR(parseFloat(it.rate) || 0),
        `${it.gstPct}%`,
        fmtINR(itemAmount(it)),
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 4,
        textColor: [40, 40, 40],
      },
      headStyles: {
        fillColor: [248, 248, 248],
        textColor: [120, 120, 120],
        fontStyle: 'bold',
        fontSize: 8,
      },
      columnStyles: {
        0: { cellWidth: 55 },
        3: { halign: 'right' },
        5: { halign: 'right' },
      },
      theme: 'plain',
      tableLineColor: [235, 235, 235],
      tableLineWidth: 0.3,
    })

    // Totals
    // @ts-ignore
    y = (doc as any).lastAutoTable.finalY + 8

    const totalsX = pageW - marginR - 70
    doc.setFontSize(9)

    const totalsRows: [string, string][] = [
      ['Subtotal', `₹ ${fmtINR(subtotal)}`],
    ]
    if (isSameState) {
      totalsRows.push(['CGST', `₹ ${fmtINR(cgst)}`])
      totalsRows.push(['SGST', `₹ ${fmtINR(sgst)}`])
    } else {
      totalsRows.push(['IGST', `₹ ${fmtINR(igst)}`])
    }

    totalsRows.forEach(([label, value]) => {
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text(label, totalsX, y)
      doc.text(value, pageW - marginR, y, { align: 'right' })
      y += 6
    })

    doc.setDrawColor(220, 220, 220)
    doc.line(totalsX, y - 1, pageW - marginR, y - 1)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(10, 10, 10)
    doc.text('Grand Total', totalsX, y + 5)
    doc.setTextColor(252, 163, 17)
    doc.text(`₹ ${fmtINR(grandTotal)}`, pageW - marginR, y + 5, { align: 'right' })

    // Notes
    if (form.notes) {
      y += 16
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(170, 170, 170)
      doc.text('NOTES / TERMS', marginL, y)
      y += 5
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(80, 80, 80)
      const noteLines = doc.splitTextToSize(form.notes, 90)
      doc.text(noteLines, marginL, y)
    }

    // Footer
    const footerY = 285
    doc.setDrawColor(235, 235, 235)
    doc.line(marginL, footerY, pageW - marginR, footerY)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 180)
    doc.text('Generated free at goldmineinfotech.com/tools/gst-invoice', pageW / 2, footerY + 5, { align: 'center' })

    doc.save(`Invoice-${form.invoiceNumber}.pdf`)
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="gst-root">
      {/* Breadcrumb */}
      <nav className="gst-breadcrumb">
        <Link to="/" className="gst-breadcrumb-link">Home</Link>
        <span className="gst-breadcrumb-sep">/</span>
        <Link to="/tools" className="gst-breadcrumb-link">Tools</Link>
        <span className="gst-breadcrumb-sep">/</span>
        <span className="gst-breadcrumb-current">GST Invoice Generator</span>
      </nav>

      {/* Hero */}
      <header className="gst-hero">
        <div className="gst-hero-badge">Free Tool</div>
        <h1 className="gst-hero-title">
          GST Invoice <span className="gst-hero-accent">Generator</span>
        </h1>
        <p className="gst-hero-sub">
          Create GST-compliant invoices and download as PDF. Free, no login required.
        </p>
      </header>

      {/* Two-column layout */}
      <div className="gst-layout">

        {/* ── LEFT: Form ───────────────────────────────────────────────────── */}
        <div className="gst-form-card">

          {/* Section 1: Invoice Info */}
          <div className="gst-section">
            <div className="gst-section-title">Invoice Info</div>
            <div className="gst-row-2">
              <div className="gst-field">
                <label className="gst-label">Invoice Number</label>
                <input
                  className="gst-input"
                  type="text"
                  value={form.invoiceNumber}
                  onChange={e => setField('invoiceNumber', e.target.value)}
                />
              </div>
              <div className="gst-field">
                <label className="gst-label">Invoice Date</label>
                <input
                  className="gst-input"
                  type="date"
                  value={form.invoiceDate}
                  onChange={e => setField('invoiceDate', e.target.value)}
                />
              </div>
            </div>
            <div className="gst-field" style={{ marginTop: 12 }}>
              <label className="gst-label">Due Date <span style={{ color: '#bbb', fontWeight: 400 }}>(optional)</span></label>
              <input
                className="gst-input"
                type="date"
                value={form.dueDate}
                onChange={e => setField('dueDate', e.target.value)}
              />
            </div>
          </div>

          {/* Section 2: From */}
          <div className="gst-section">
            <div className="gst-section-title">From (Your Business)</div>
            <div className="gst-field">
              <label className="gst-label">Business Name</label>
              <input className="gst-input" type="text" value={form.fromName} onChange={e => setField('fromName', e.target.value)} />
            </div>
            <div className="gst-field">
              <label className="gst-label">GST Number</label>
              <input className="gst-input" type="text" placeholder="22AAAAA0000A1Z5" value={form.fromGST} onChange={e => setField('fromGST', e.target.value)} />
            </div>
            <div className="gst-field">
              <label className="gst-label">Address</label>
              <textarea className="gst-textarea" rows={2} value={form.fromAddress} onChange={e => setField('fromAddress', e.target.value)} />
            </div>
            <div className="gst-row-2">
              <div className="gst-field">
                <label className="gst-label">City</label>
                <input className="gst-input" type="text" value={form.fromCity} onChange={e => setField('fromCity', e.target.value)} />
              </div>
              <div className="gst-field">
                <label className="gst-label">State</label>
                <input className="gst-input" type="text" value={form.fromState} onChange={e => setField('fromState', e.target.value)} />
              </div>
            </div>
            <div className="gst-row-2" style={{ marginTop: 12 }}>
              <div className="gst-field">
                <label className="gst-label">Phone</label>
                <input className="gst-input" type="text" value={form.fromPhone} onChange={e => setField('fromPhone', e.target.value)} />
              </div>
              <div className="gst-field">
                <label className="gst-label">Email</label>
                <input className="gst-input" type="email" value={form.fromEmail} onChange={e => setField('fromEmail', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Section 3: Bill To */}
          <div className="gst-section">
            <div className="gst-section-title">Bill To (Client)</div>
            <div className="gst-field">
              <label className="gst-label">Client Name</label>
              <input className="gst-input" type="text" value={form.toName} onChange={e => setField('toName', e.target.value)} />
            </div>
            <div className="gst-field">
              <label className="gst-label">Client GST <span style={{ color: '#bbb', fontWeight: 400 }}>(optional)</span></label>
              <input className="gst-input" type="text" placeholder="22AAAAA0000A1Z5" value={form.toGST} onChange={e => setField('toGST', e.target.value)} />
            </div>
            <div className="gst-field">
              <label className="gst-label">Address</label>
              <textarea className="gst-textarea" rows={2} value={form.toAddress} onChange={e => setField('toAddress', e.target.value)} />
            </div>
            <div className="gst-row-2">
              <div className="gst-field">
                <label className="gst-label">City</label>
                <input className="gst-input" type="text" value={form.toCity} onChange={e => setField('toCity', e.target.value)} />
              </div>
              <div className="gst-field">
                <label className="gst-label">State</label>
                <input className="gst-input" type="text" value={form.toState} onChange={e => setField('toState', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Section 4: Line Items */}
          <div className="gst-section">
            <div className="gst-section-title">Line Items</div>
            <div className="gst-items-scroll">
              <div className="gst-items-header">
                <div className="gst-items-col-label">Item</div>
                <div className="gst-items-col-label">Qty</div>
                <div className="gst-items-col-label">Unit</div>
                <div className="gst-items-col-label">Rate ₹</div>
                <div className="gst-items-col-label">GST%</div>
                <div className="gst-items-col-label">Amount</div>
                <div />
              </div>

              {items.map(item => (
                <div key={item.id} className="gst-item-row">
                  <input
                    className="gst-item-input"
                    type="text"
                    placeholder="Item name"
                    value={item.name}
                    onChange={e => updateItem(item.id, 'name', e.target.value)}
                  />
                  <input
                    className="gst-item-input"
                    type="number"
                    min="0"
                    value={item.qty}
                    onChange={e => updateItem(item.id, 'qty', e.target.value)}
                  />
                  <input
                    className="gst-item-input"
                    type="text"
                    placeholder="pcs"
                    value={item.unit}
                    onChange={e => updateItem(item.id, 'unit', e.target.value)}
                  />
                  <input
                    className="gst-item-input"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={item.rate}
                    onChange={e => updateItem(item.id, 'rate', e.target.value)}
                  />
                  <select
                    className="gst-item-select"
                    value={item.gstPct}
                    onChange={e => updateItem(item.id, 'gstPct', e.target.value)}
                  >
                    {['0', '5', '12', '18', '28'].map(p => (
                      <option key={p} value={p}>{p}%</option>
                    ))}
                  </select>
                  <input
                    className="gst-item-input gst-item-input--readonly"
                    type="text"
                    readOnly
                    value={fmtINR(itemAmount(item))}
                  />
                  <button
                    type="button"
                    className="gst-item-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    &times;
                  </button>
                </div>
              ))}

              <button type="button" className="gst-add-item-btn" onClick={addItem}>
                + Add Item
              </button>
            </div>
          </div>

          {/* Section 5: Notes */}
          <div className="gst-section">
            <div className="gst-section-title">Notes / Terms</div>
            <div className="gst-field">
              <textarea
                className="gst-textarea"
                rows={3}
                placeholder="Payment due within 30 days"
                value={form.notes}
                onChange={e => setField('notes', e.target.value)}
              />
            </div>
          </div>

          {/* Generate PDF */}
          <button type="button" className="gst-generate-btn" onClick={generatePDF}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
            </svg>
            Download PDF Invoice
          </button>
        </div>

        {/* ── RIGHT: Live Preview ───────────────────────────────────────────── */}
        <div className="gst-preview-card">
          <div className="gst-preview-label">Live Preview</div>

          <div className="gst-inv">
            {/* Invoice Header */}
            <div className="gst-inv-header">
              <div>
                <div className="gst-inv-biz-name">{form.fromName || 'Your Business Name'}</div>
                {form.fromGST && <div className="gst-inv-biz-gst">GSTIN: {form.fromGST}</div>}
              </div>
              <div className="gst-inv-title-block">
                <div className="gst-inv-title">TAX INVOICE</div>
                <div className="gst-inv-meta">
                  <div>#{form.invoiceNumber}</div>
                  <div>{form.invoiceDate}</div>
                  {form.dueDate && <div>Due: {form.dueDate}</div>}
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="gst-inv-addresses">
              <div>
                <div className="gst-inv-addr-label">From</div>
                <div className="gst-inv-addr-name">{form.fromName || '—'}</div>
                {form.fromAddress && <p className="gst-inv-addr-line">{form.fromAddress}</p>}
                {(form.fromCity || form.fromState) && (
                  <p className="gst-inv-addr-line">{[form.fromCity, form.fromState].filter(Boolean).join(', ')}</p>
                )}
                {form.fromPhone && <p className="gst-inv-addr-line">{form.fromPhone}</p>}
                {form.fromEmail && <p className="gst-inv-addr-line">{form.fromEmail}</p>}
              </div>
              <div>
                <div className="gst-inv-addr-label">Bill To</div>
                <div className="gst-inv-addr-name">{form.toName || '—'}</div>
                {form.toAddress && <p className="gst-inv-addr-line">{form.toAddress}</p>}
                {(form.toCity || form.toState) && (
                  <p className="gst-inv-addr-line">{[form.toCity, form.toState].filter(Boolean).join(', ')}</p>
                )}
                {form.toGST && <div className="gst-inv-addr-gst">GSTIN: {form.toGST}</div>}
              </div>
            </div>

            {/* Items Table */}
            <table className="gst-inv-table">
              <thead>
                <tr>
                  <th className="gst-inv-th">Item</th>
                  <th className="gst-inv-th gst-inv-th--right">Qty</th>
                  <th className="gst-inv-th">Unit</th>
                  <th className="gst-inv-th gst-inv-th--right">Rate ₹</th>
                  <th className="gst-inv-th gst-inv-th--right">GST%</th>
                  <th className="gst-inv-th gst-inv-th--right">Amount ₹</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="gst-inv-td">{item.name || '—'}</td>
                    <td className="gst-inv-td gst-inv-td--right gst-inv-td--num">{item.qty || '0'}</td>
                    <td className="gst-inv-td">{item.unit}</td>
                    <td className="gst-inv-td gst-inv-td--right gst-inv-td--num">{fmtINR(parseFloat(item.rate) || 0)}</td>
                    <td className="gst-inv-td gst-inv-td--right">{item.gstPct}%</td>
                    <td className="gst-inv-td gst-inv-td--right gst-inv-td--num">{fmtINR(itemAmount(item))}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer: notes + totals */}
            <div className="gst-inv-footer">
              <div className="gst-inv-notes">
                {form.notes && (
                  <>
                    <div className="gst-inv-notes-label">Notes / Terms</div>
                    <p className="gst-inv-notes-text">{form.notes}</p>
                  </>
                )}
              </div>
              <div className="gst-inv-totals">
                <div className="gst-inv-total-row">
                  <span className="gst-inv-total-label">Subtotal</span>
                  <span className="gst-inv-total-val">₹ {fmtINR(subtotal)}</span>
                </div>
                {isSameState ? (
                  <>
                    <div className="gst-inv-total-row">
                      <span className="gst-inv-total-label">CGST</span>
                      <span className="gst-inv-total-val">₹ {fmtINR(cgst)}</span>
                    </div>
                    <div className="gst-inv-total-row">
                      <span className="gst-inv-total-label">SGST</span>
                      <span className="gst-inv-total-val">₹ {fmtINR(sgst)}</span>
                    </div>
                  </>
                ) : (
                  <div className="gst-inv-total-row">
                    <span className="gst-inv-total-label">IGST</span>
                    <span className="gst-inv-total-val">₹ {fmtINR(igst)}</span>
                  </div>
                )}
                <div className="gst-inv-total-row gst-inv-total-row--grand">
                  <span className="gst-inv-total-label">Grand Total</span>
                  <span className="gst-inv-total-val">₹ {fmtINR(grandTotal)}</span>
                </div>
              </div>
            </div>

            <div className="gst-inv-sig-line">Authorised Signatory</div>
            <div className="gst-inv-page-footer">
              Generated free at goldmineinfotech.com/tools/gst-invoice
            </div>
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="gst-cta">
        <p className="gst-cta-text">Need a custom billing solution?</p>
        <Link to="/software/billing-invoicing" className="gst-cta-link">
          Explore our Billing &amp; Invoicing Software
        </Link>
      </div>
    </div>
  )
}
