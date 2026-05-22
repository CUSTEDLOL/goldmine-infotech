import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import JsBarcode from 'jsbarcode'
import './BarcodeTool.css'

// ─── Types & Constants ────────────────────────────────────────────────────────

type BarcodeFormat =
  | 'CODE128'
  | 'CODE39'
  | 'EAN13'
  | 'EAN8'
  | 'UPC'
  | 'ITF14'
  | 'MSI'
  | 'pharmacode'

const FORMAT_OPTIONS: { value: BarcodeFormat; label: string; hint: string }[] = [
  { value: 'CODE128',    label: 'CODE128',    hint: 'General purpose. Works with any text or numbers.' },
  { value: 'CODE39',     label: 'CODE39',     hint: 'Alphanumeric. Used in automotive and defense industries.' },
  { value: 'EAN13',      label: 'EAN-13',     hint: 'Retail products. Requires exactly 12 digits (13th is check digit).' },
  { value: 'EAN8',       label: 'EAN-8',      hint: 'Small retail products. Requires exactly 7 digits.' },
  { value: 'UPC',        label: 'UPC-A',      hint: 'North American retail. Requires exactly 11 digits.' },
  { value: 'ITF14',      label: 'ITF-14',     hint: 'Shipping containers. Requires exactly 13 digits.' },
  { value: 'MSI',        label: 'MSI',        hint: 'General purpose. Used in retail shelving and inventory.' },
  { value: 'pharmacode', label: 'Pharmacode', hint: 'Pharmaceutical packaging. Numeric only (1–131070).' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function BarcodeTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [content, setContent]         = useState('123456789012')
  const [format, setFormat]           = useState<BarcodeFormat>('CODE128')
  const [barWidth, setBarWidth]       = useState(2)
  const [barHeight, setBarHeight]     = useState(80)
  const [showText, setShowText]       = useState(true)
  const [lineColor, setLineColor]     = useState('#000000')
  const [background, setBackground]   = useState('#ffffff')
  const [error, setError]             = useState<string | null>(null)

  const currentHint = FORMAT_OPTIONS.find((f) => f.value === format)?.hint ?? ''

  // Regenerate barcode whenever any setting changes
  useEffect(() => {
    if (!canvasRef.current) return
    if (!content.trim()) {
      setError('Enter barcode content above.')
      return
    }

    try {
      JsBarcode(canvasRef.current, content.trim(), {
        format,
        width: barWidth,
        height: barHeight,
        displayValue: showText,
        lineColor,
        background,
        margin: 16,
        fontOptions: 'bold',
        fontSize: 14,
        textMargin: 6,
      })
      setError(null)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid input for selected format.'
      setError(msg)
    }
  }, [content, format, barWidth, barHeight, showText, lineColor, background])

  const handleDownload = useCallback(() => {
    if (!canvasRef.current || error) return
    const link = document.createElement('a')
    link.download = 'barcode.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }, [error])

  const activeFormat = FORMAT_OPTIONS.find((f) => f.value === format)

  return (
    <div className="bc-root">
      {/* Breadcrumb */}
      <div className="bc-breadcrumb">
        <Link to="/tools" className="bc-breadcrumb-link">Free Tools</Link>
        <span className="bc-breadcrumb-sep">›</span>
        <span className="bc-breadcrumb-current">Barcode Generator</span>
      </div>

      {/* Hero */}
      <div className="bc-hero">
        <div className="bc-hero-badge">FREE TOOL</div>
        <h1 className="bc-hero-title">
          Barcode
          <span className="bc-hero-accent"> Generator</span>
        </h1>
        <p className="bc-hero-sub">
          Generate high-quality barcodes in 8 formats. Customise colours, size, and style — then download as PNG, instantly.
        </p>
      </div>

      {/* Main container */}
      <div className="bc-container">

        {/* Settings card */}
        <div className="bc-card">
          <h2 className="bc-section-title">Barcode Settings</h2>

          <div className="bc-form">
            {/* Content */}
            <div className="bc-field">
              <label className="bc-label" htmlFor="bc-content">Barcode Content</label>
              <input
                id="bc-content"
                className="bc-input"
                type="text"
                placeholder="Enter text or numbers to encode…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Format */}
            <div className="bc-field">
              <label className="bc-label" htmlFor="bc-format">Barcode Format</label>
              <select
                id="bc-format"
                className="bc-input bc-select"
                value={format}
                onChange={(e) => setFormat(e.target.value as BarcodeFormat)}
              >
                {FORMAT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {currentHint && (
                <p className="bc-format-hint">
                  <svg className="bc-hint-icon" viewBox="0 0 16 16" fill="none" width="12" height="12">
                    <circle cx="8" cy="8" r="7" stroke="#fca311" strokeWidth="1.5" />
                    <path d="M8 7v4M8 5.5v.5" stroke="#fca311" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {currentHint}
                </p>
              )}
            </div>

            {/* Width + Height sliders */}
            <div className="bc-row-2">
              <div className="bc-field">
                <label className="bc-label" htmlFor="bc-width">
                  Bar Width: <strong>{barWidth}px</strong>
                </label>
                <input
                  id="bc-width"
                  className="bc-slider"
                  type="range"
                  min={1}
                  max={4}
                  step={0.5}
                  value={barWidth}
                  onChange={(e) => setBarWidth(Number(e.target.value))}
                />
                <div className="bc-slider-range">
                  <span>1</span><span>4</span>
                </div>
              </div>

              <div className="bc-field">
                <label className="bc-label" htmlFor="bc-height">
                  Bar Height: <strong>{barHeight}px</strong>
                </label>
                <input
                  id="bc-height"
                  className="bc-slider"
                  type="range"
                  min={20}
                  max={150}
                  step={5}
                  value={barHeight}
                  onChange={(e) => setBarHeight(Number(e.target.value))}
                />
                <div className="bc-slider-range">
                  <span>20px</span><span>150px</span>
                </div>
              </div>
            </div>

            {/* Colors row */}
            <div className="bc-row-3">
              <div className="bc-field">
                <label className="bc-label" htmlFor="bc-linecolor">Line Color</label>
                <div className="bc-color-field">
                  <input
                    id="bc-linecolor"
                    className="bc-color-input"
                    type="color"
                    value={lineColor}
                    onChange={(e) => setLineColor(e.target.value)}
                  />
                  <span className="bc-color-hex">{lineColor.toUpperCase()}</span>
                </div>
              </div>

              <div className="bc-field">
                <label className="bc-label" htmlFor="bc-bgcolor">Background</label>
                <div className="bc-color-field">
                  <input
                    id="bc-bgcolor"
                    className="bc-color-input"
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                  />
                  <span className="bc-color-hex">{background.toUpperCase()}</span>
                </div>
              </div>

              <div className="bc-field">
                <label className="bc-label">Show Text</label>
                <label className="bc-toggle">
                  <input
                    type="checkbox"
                    checked={showText}
                    onChange={(e) => setShowText(e.target.checked)}
                  />
                  <span className="bc-toggle-track">
                    <span className="bc-toggle-thumb" />
                  </span>
                  <span className="bc-toggle-label">{showText ? 'Visible' : 'Hidden'}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Preview card */}
        <div className="bc-card bc-preview-card">
          <div className="bc-preview-header">
            <h2 className="bc-section-title">Preview</h2>
            {activeFormat && (
              <span className="bc-format-pill">{activeFormat.label}</span>
            )}
          </div>

          {error ? (
            <div className="bc-error-state">
              <div className="bc-error-icon">
                <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
                  <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M12 8v4M12 16v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="bc-error-title">Invalid Input</p>
              <p className="bc-error-msg">{error}</p>
              <p className="bc-error-hint">{currentHint}</p>
            </div>
          ) : null}

          <div className={`bc-canvas-wrap${error ? ' bc-canvas-wrap--hidden' : ''}`}
               style={{ backgroundColor: background }}>
            <canvas ref={canvasRef} className="bc-canvas" />
          </div>

          <button
            className="bc-download-btn"
            onClick={handleDownload}
            disabled={!!error || !content.trim()}
          >
            <svg viewBox="0 0 20 20" fill="none" width="16" height="16" className="bc-download-icon">
              <path d="M10 3v10M6 9l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Download PNG
          </button>
        </div>

      </div>

      {/* Format reference */}
      <div className="bc-formats-section">
        <div className="bc-formats-inner">
          <h3 className="bc-formats-title">Format Reference</h3>
          <div className="bc-formats-grid">
            {FORMAT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`bc-format-card${format === opt.value ? ' bc-format-card--active' : ''}`}
                onClick={() => setFormat(opt.value)}
              >
                <span className="bc-format-card-name">{opt.label}</span>
                <span className="bc-format-card-hint">{opt.hint}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bc-cta">
        <p className="bc-cta-text">Need inventory or POS software with barcode support?</p>
        <a href="tel:+919500036310" className="bc-cta-link">Talk to Goldmine Infotech →</a>
      </div>
    </div>
  )
}
