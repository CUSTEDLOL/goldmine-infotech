import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import './QRCodeTool.css'

const PRESETS = [
  { label: 'Website URL', placeholder: 'https://example.com' },
  { label: 'WhatsApp', placeholder: 'https://wa.me/919500036310' },
  { label: 'Email', placeholder: 'mailto:hello@example.com' },
  { label: 'Phone', placeholder: 'tel:+919500036310' },
  { label: 'Plain Text', placeholder: 'Enter any text...' },
]

const SIZES = [128, 192, 256, 320, 400]
const ERROR_LEVELS = ['L', 'M', 'Q', 'H'] as const

export default function QRCodeTool() {
  const [value, setValue] = useState('https://goldmineinfotech.com')
  const [size, setSize] = useState(256)
  const [fgColor, setFgColor] = useState('#0a0a0a')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M')
  const [activePreset, setActivePreset] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  const handlePreset = (i: number, placeholder: string) => {
    setActivePreset(i)
    setValue(placeholder)
  }

  const downloadSVG = () => {
    const svg = svgRef.current
    if (!svg) return
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svg)
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'qrcode.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadPNG = () => {
    const svg = svgRef.current
    if (!svg) return
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svg)
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = 'qrcode.png'
      a.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)))
  }

  return (
    <div className="qr-root">

      {/* Header */}
      <div className="qr-header">
        <div className="qr-breadcrumb">
          <Link to="/tools" className="qr-bc-link">Free Tools</Link>
          <span className="qr-bc-sep">/</span>
          <span>QR Code Generator</span>
        </div>
        <span className="qr-eyebrow">FREE TOOL</span>
        <h1 className="qr-headline">QR Code Generator</h1>
        <p className="qr-sub">Generate QR codes for URLs, WhatsApp, email, phone numbers or any text. Download as PNG or SVG — free, no login.</p>
      </div>

      {/* Main tool */}
      <div className="qr-tool">

        {/* Left — controls */}
        <div className="qr-controls">

          {/* Preset tabs */}
          <div className="qr-section">
            <label className="qr-label">Content type</label>
            <div className="qr-presets">
              {PRESETS.map((p, i) => (
                <button
                  key={p.label}
                  className={`qr-preset${activePreset === i ? ' qr-preset--active' : ''}`}
                  onClick={() => handlePreset(i, p.placeholder)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content input */}
          <div className="qr-section">
            <label className="qr-label" htmlFor="qr-value">Content</label>
            <textarea
              id="qr-value"
              className="qr-textarea"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder={PRESETS[activePreset].placeholder}
              rows={3}
            />
          </div>

          {/* Size */}
          <div className="qr-section">
            <label className="qr-label">Size — {size}×{size}px</label>
            <div className="qr-size-row">
              {SIZES.map(s => (
                <button
                  key={s}
                  className={`qr-size-btn${size === s ? ' qr-size-btn--active' : ''}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="qr-section">
            <label className="qr-label">Colors</label>
            <div className="qr-colors">
              <div className="qr-color-row">
                <label className="qr-color-label">Foreground</label>
                <div className="qr-color-wrap">
                  <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="qr-color-input" />
                  <span className="qr-color-hex">{fgColor.toUpperCase()}</span>
                </div>
              </div>
              <div className="qr-color-row">
                <label className="qr-color-label">Background</label>
                <div className="qr-color-wrap">
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="qr-color-input" />
                  <span className="qr-color-hex">{bgColor.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error correction */}
          <div className="qr-section">
            <label className="qr-label">Error correction level</label>
            <div className="qr-error-row">
              {ERROR_LEVELS.map(lvl => (
                <button
                  key={lvl}
                  className={`qr-error-btn${errorLevel === lvl ? ' qr-error-btn--active' : ''}`}
                  onClick={() => setErrorLevel(lvl)}
                  title={{ L: 'Low (7%)', M: 'Medium (15%)', Q: 'Quartile (25%)', H: 'High (30%)' }[lvl]}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <p className="qr-hint">Higher = more damage-resistant. Use H if adding a logo.</p>
          </div>

        </div>

        {/* Right — preview + download */}
        <div className="qr-preview-panel">
          <div className="qr-preview-wrap">
            {value.trim() ? (
              <QRCodeSVG
                ref={svgRef}
                value={value}
                size={size}
                fgColor={fgColor}
                bgColor={bgColor}
                level={errorLevel}
                className="qr-svg"
              />
            ) : (
              <div className="qr-empty">Enter content to generate QR code</div>
            )}
          </div>

          {value.trim() && (
            <div className="qr-download-row">
              <button className="qr-btn-download qr-btn-png" onClick={downloadPNG}>
                Download PNG
              </button>
              <button className="qr-btn-download qr-btn-svg" onClick={downloadSVG}>
                Download SVG
              </button>
            </div>
          )}

          <p className="qr-preview-note">Scan with any camera app to test</p>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="qr-footer-cta">
        <p>Need a custom QR code solution for your business?</p>
        <a href="tel:+919500036310" className="qr-footer-link">Talk to our team →</a>
      </div>

    </div>
  )
}
