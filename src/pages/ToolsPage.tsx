import { useState, useCallback, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import './ToolsPage.css'

// ─── Tool 1: QR Code Generator ────────────────────────────────────────────────

function QRCodeTool() {
  const [value, setValue] = useState('https://goldmineinfotech.com')
  const svgRef = useRef<HTMLDivElement>(null)

  const handleDownload = useCallback(() => {
    if (!svgRef.current) return
    const svg = svgRef.current.querySelector('svg')
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
  }, [])

  return (
    <div className="tools-widget">
      <input
        className="tools-input"
        type="text"
        placeholder="Enter URL or text..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value.trim() && (
        <div className="tools-qr-wrap">
          <div ref={svgRef} className="tools-qr-svg">
            <QRCodeSVG
              value={value.trim()}
              size={160}
              bgColor="#ffffff"
              fgColor="#0a0a0a"
              level="M"
            />
          </div>
          <button className="tools-btn tools-btn--outline" onClick={handleDownload}>
            Download SVG
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Tool 2: GST Calculator ───────────────────────────────────────────────────

const GST_RATES = [5, 12, 18, 28]

function GSTCalculator() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState(18)

  const num = parseFloat(amount) || 0
  const gstAmt = (num * rate) / 100
  const total = num + gstAmt
  const hasResult = num > 0

  return (
    <div className="tools-widget">
      <div className="tools-row">
        <div className="tools-field">
          <label className="tools-label">Amount (₹)</label>
          <input
            className="tools-input"
            type="number"
            placeholder="e.g. 10000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
          />
        </div>
        <div className="tools-field">
          <label className="tools-label">GST Rate</label>
          <select
            className="tools-input tools-select"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          >
            {GST_RATES.map((r) => (
              <option key={r} value={r}>{r}%</option>
            ))}
          </select>
        </div>
      </div>
      {hasResult && (
        <div className="tools-results">
          <div className="tools-result-row">
            <span>GST Amount ({rate}%)</span>
            <strong>₹{gstAmt.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
          </div>
          <div className="tools-result-row tools-result-row--highlight">
            <span>Total Amount</span>
            <strong>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Tool 3: EMI Calculator ───────────────────────────────────────────────────

function EMICalculator() {
  const [principal, setPrincipal] = useState('')
  const [rateVal, setRateVal] = useState('')
  const [tenure, setTenure] = useState('')

  const P = parseFloat(principal) || 0
  const annualRate = parseFloat(rateVal) || 0
  const n = parseInt(tenure) || 0
  const r = annualRate / 12 / 100

  let emi = 0
  let totalPayable = 0
  let totalInterest = 0

  if (P > 0 && r > 0 && n > 0) {
    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    totalPayable = emi * n
    totalInterest = totalPayable - P
  } else if (P > 0 && r === 0 && n > 0) {
    emi = P / n
    totalPayable = P
    totalInterest = 0
  }

  const hasResult = P > 0 && n > 0 && emi > 0

  const fmt = (v: number) => '₹' + v.toLocaleString('en-IN', { maximumFractionDigits: 0 })

  return (
    <div className="tools-widget">
      <div className="tools-row tools-row--3">
        <div className="tools-field">
          <label className="tools-label">Principal (₹)</label>
          <input className="tools-input" type="number" placeholder="5,00,000" value={principal} onChange={(e) => setPrincipal(e.target.value)} min="0" />
        </div>
        <div className="tools-field">
          <label className="tools-label">Interest Rate (%)</label>
          <input className="tools-input" type="number" placeholder="8.5" value={rateVal} onChange={(e) => setRateVal(e.target.value)} min="0" step="0.1" />
        </div>
        <div className="tools-field">
          <label className="tools-label">Tenure (months)</label>
          <input className="tools-input" type="number" placeholder="60" value={tenure} onChange={(e) => setTenure(e.target.value)} min="1" />
        </div>
      </div>
      {hasResult && (
        <div className="tools-results">
          <div className="tools-result-row tools-result-row--highlight">
            <span>Monthly EMI</span>
            <strong>{fmt(emi)}</strong>
          </div>
          <div className="tools-result-row">
            <span>Total Payable</span>
            <strong>{fmt(totalPayable)}</strong>
          </div>
          <div className="tools-result-row">
            <span>Total Interest</span>
            <strong>{fmt(totalInterest)}</strong>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Tool 4: Profit Margin Calculator ────────────────────────────────────────

function ProfitMarginCalculator() {
  const [cost, setCost] = useState('')
  const [sell, setSell] = useState('')

  const C = parseFloat(cost) || 0
  const S = parseFloat(sell) || 0
  const profit = S - C
  const margin = S > 0 ? (profit / S) * 100 : 0
  const markup = C > 0 ? (profit / C) * 100 : 0
  const hasResult = C > 0 && S > 0
  const isLoss = profit < 0

  const fmt = (v: number) => '₹' + Math.abs(v).toLocaleString('en-IN', { maximumFractionDigits: 2 })

  return (
    <div className="tools-widget">
      <div className="tools-row">
        <div className="tools-field">
          <label className="tools-label">Cost Price (₹)</label>
          <input className="tools-input" type="number" placeholder="1000" value={cost} onChange={(e) => setCost(e.target.value)} min="0" />
        </div>
        <div className="tools-field">
          <label className="tools-label">Selling Price (₹)</label>
          <input className="tools-input" type="number" placeholder="1500" value={sell} onChange={(e) => setSell(e.target.value)} min="0" />
        </div>
      </div>
      {hasResult && (
        <div className="tools-results">
          <div className={`tools-result-row tools-result-row--highlight ${isLoss ? 'tools-result--loss' : 'tools-result--gain'}`}>
            <span>{isLoss ? 'Loss Amount' : 'Profit Amount'}</span>
            <strong>{isLoss ? '-' : '+'}{fmt(profit)}</strong>
          </div>
          <div className="tools-result-row">
            <span>Margin %</span>
            <strong>{margin.toFixed(2)}%</strong>
          </div>
          <div className="tools-result-row">
            <span>Markup %</span>
            <strong>{markup.toFixed(2)}%</strong>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Tool 5: Password Generator ──────────────────────────────────────────────

const CHARS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
}

function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    let pool = ''
    if (upper) pool += CHARS.upper
    if (lower) pool += CHARS.lower
    if (numbers) pool += CHARS.numbers
    if (symbols) pool += CHARS.symbols
    if (!pool) { setPassword('Select at least one character type'); return }
    let pwd = ''
    for (let i = 0; i < length; i++) {
      pwd += pool[Math.floor(Math.random() * pool.length)]
    }
    setPassword(pwd)
    setCopied(false)
  }, [length, upper, lower, numbers, symbols])

  const copy = useCallback(() => {
    if (!password) return
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [password])

  return (
    <div className="tools-widget">
      <div className="tools-slider-row">
        <label className="tools-label">Length: <strong>{length}</strong></label>
        <input
          type="range" min={8} max={32} value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="tools-slider"
        />
      </div>
      <div className="tools-checkboxes">
        {[
          { label: 'Uppercase (A-Z)', val: upper, set: setUpper },
          { label: 'Lowercase (a-z)', val: lower, set: setLower },
          { label: 'Numbers (0-9)',   val: numbers, set: setNumbers },
          { label: 'Symbols (!@#…)', val: symbols, set: setSymbols },
        ].map(({ label, val, set }) => (
          <label key={label} className="tools-checkbox-label">
            <input type="checkbox" checked={val} onChange={(e) => set(e.target.checked)} />
            <span>{label}</span>
          </label>
        ))}
      </div>
      <button className="tools-btn tools-btn--primary" onClick={generate}>
        Generate Password
      </button>
      {password && (
        <div className="tools-password-row">
          <span className="tools-password-box">{password}</span>
          <button className="tools-btn tools-btn--outline tools-btn--sm" onClick={copy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Tool 6: Word & Character Counter ────────────────────────────────────────

function WordCounter() {
  const [text, setText] = useState('')

  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const charsWithSpaces = text.length
  const charsNoSpaces = text.replace(/\s/g, '').length
  const readingTime = Math.ceil(words / 200)

  return (
    <div className="tools-widget">
      <textarea
        className="tools-textarea"
        rows={4}
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="tools-stats-grid">
        <div className="tools-stat">
          <span className="tools-stat-val">{words}</span>
          <span className="tools-stat-lbl">Words</span>
        </div>
        <div className="tools-stat">
          <span className="tools-stat-val">{charsWithSpaces}</span>
          <span className="tools-stat-lbl">Characters (with spaces)</span>
        </div>
        <div className="tools-stat">
          <span className="tools-stat-val">{charsNoSpaces}</span>
          <span className="tools-stat-lbl">Characters (no spaces)</span>
        </div>
        <div className="tools-stat">
          <span className="tools-stat-val">{readingTime} min</span>
          <span className="tools-stat-lbl">Reading Time</span>
        </div>
      </div>
    </div>
  )
}

// ─── Tool 7: Age Calculator ───────────────────────────────────────────────────

function AgeCalculator() {
  const [dob, setDob] = useState('')

  let years = 0, months = 0, days = 0
  let nextBdayDays = 0
  let hasResult = false

  if (dob) {
    const birth = new Date(dob)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    birth.setHours(0, 0, 0, 0)

    if (!isNaN(birth.getTime()) && birth <= today) {
      hasResult = true
      years = today.getFullYear() - birth.getFullYear()
      months = today.getMonth() - birth.getMonth()
      days = today.getDate() - birth.getDate()

      if (days < 0) {
        months--
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
        days += prevMonth.getDate()
      }
      if (months < 0) { years--; months += 12 }

      // Next birthday
      const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
      if (nextBday <= today) nextBday.setFullYear(today.getFullYear() + 1)
      nextBdayDays = Math.round((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    }
  }

  return (
    <div className="tools-widget">
      <div className="tools-field">
        <label className="tools-label">Date of Birth</label>
        <input
          className="tools-input"
          type="date"
          value={dob}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      {hasResult && (
        <div className="tools-results">
          <div className="tools-result-row tools-result-row--highlight">
            <span>Your Age</span>
            <strong>{years} yrs, {months} mo, {days} days</strong>
          </div>
          <div className="tools-result-row">
            <span>Next Birthday in</span>
            <strong>{nextBdayDays === 0 ? 'Today! 🎂' : `${nextBdayDays} days`}</strong>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Tool 8: Percentage Calculator ───────────────────────────────────────────

type PctMode = 'pct-of' | 'is-what-pct' | 'pct-change'

function PercentageCalculator() {
  const [mode, setMode] = useState<PctMode>('pct-of')
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  const numA = parseFloat(a) || 0
  const numB = parseFloat(b) || 0

  let result = ''
  if (mode === 'pct-of' && a && b) {
    result = ((numA / 100) * numB).toFixed(4).replace(/\.?0+$/, '')
    result = `${numA}% of ${numB} = ${result}`
  } else if (mode === 'is-what-pct' && a && b && numB !== 0) {
    const pct = (numA / numB) * 100
    result = `${numA} is ${pct.toFixed(2)}% of ${numB}`
  } else if (mode === 'pct-change' && a && b && numA !== 0) {
    const change = ((numB - numA) / numA) * 100
    const dir = change >= 0 ? 'increase' : 'decrease'
    result = `${Math.abs(change).toFixed(2)}% ${dir} from ${numA} to ${numB}`
  }

  const tabs: { key: PctMode; label: string }[] = [
    { key: 'pct-of',      label: 'X% of Y' },
    { key: 'is-what-pct', label: 'X is what % of Y' },
    { key: 'pct-change',  label: '% Change' },
  ]

  const labels: Record<PctMode, [string, string]> = {
    'pct-of':      ['Percentage (X)', 'Number (Y)'],
    'is-what-pct': ['X', 'Y (total)'],
    'pct-change':  ['From value', 'To value'],
  }

  return (
    <div className="tools-widget">
      <div className="tools-tabs">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            className={`tools-tab-btn${mode === key ? ' tools-tab-btn--active' : ''}`}
            onClick={() => { setMode(key); setA(''); setB('') }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tools-row">
        <div className="tools-field">
          <label className="tools-label">{labels[mode][0]}</label>
          <input className="tools-input" type="number" placeholder="0" value={a} onChange={(e) => setA(e.target.value)} />
        </div>
        <div className="tools-field">
          <label className="tools-label">{labels[mode][1]}</label>
          <input className="tools-input" type="number" placeholder="0" value={b} onChange={(e) => setB(e.target.value)} />
        </div>
      </div>
      {result && (
        <div className="tools-result-banner">
          {result}
        </div>
      )}
    </div>
  )
}

// ─── Tool 9: HEX ↔ RGB Converter ─────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return null
  const num = parseInt(clean, 16)
  if (isNaN(num)) return null
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

function ColorConverter() {
  const [hex, setHex] = useState('#fca311')
  const [r, setR] = useState(252)
  const [g, setG] = useState(163)
  const [b, setB] = useState(17)

  const handleHexChange = (val: string) => {
    setHex(val)
    const rgb = hexToRgb(val)
    if (rgb) { setR(rgb.r); setG(rgb.g); setB(rgb.b) }
  }

  const handleRgbChange = (channel: 'r' | 'g' | 'b', val: number) => {
    const nr = channel === 'r' ? val : r
    const ng = channel === 'g' ? val : g
    const nb = channel === 'b' ? val : b
    if (channel === 'r') setR(val)
    if (channel === 'g') setG(val)
    if (channel === 'b') setB(val)
    setHex(rgbToHex(nr, ng, nb))
  }

  const validHex = hexToRgb(hex) !== null
  const swatchColor = validHex ? hex : '#e8e8e8'

  return (
    <div className="tools-widget">
      <div className="tools-color-swatch" style={{ background: swatchColor }} />
      <div className="tools-row tools-row--align-end">
        <div className="tools-field">
          <label className="tools-label">HEX</label>
          <input
            className="tools-input tools-input--mono"
            type="text"
            value={hex}
            maxLength={7}
            placeholder="#ffffff"
            onChange={(e) => handleHexChange(e.target.value)}
          />
        </div>
        <div className="tools-field">
          <label className="tools-label">RGB</label>
          <div className="tools-rgb-display">rgb({r}, {g}, {b})</div>
        </div>
      </div>
      {[
        { ch: 'r' as const, label: 'Red',   val: r, color: '#ef4444' },
        { ch: 'g' as const, label: 'Green', val: g, color: '#22c55e' },
        { ch: 'b' as const, label: 'Blue',  val: b, color: '#3b82f6' },
      ].map(({ ch, label, val, color }) => (
        <div key={ch} className="tools-slider-row">
          <label className="tools-label tools-label--mono">{label}: <strong>{val}</strong></label>
          <input
            type="range" min={0} max={255} value={val}
            style={{ accentColor: color }}
            onChange={(e) => handleRgbChange(ch, Number(e.target.value))}
            className="tools-slider"
          />
        </div>
      ))}
    </div>
  )
}

// ─── Tool 10: Text Case Converter ─────────────────────────────────────────────

function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
}

function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase())
}

function TextCaseConverter() {
  const [text, setText] = useState('')

  const apply = (fn: (s: string) => string) => setText((prev) => fn(prev))

  return (
    <div className="tools-widget">
      <textarea
        className="tools-textarea"
        rows={4}
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="tools-case-btns">
        <button className="tools-btn tools-btn--ghost" onClick={() => apply((s) => s.toUpperCase())}>UPPERCASE</button>
        <button className="tools-btn tools-btn--ghost" onClick={() => apply((s) => s.toLowerCase())}>lowercase</button>
        <button className="tools-btn tools-btn--ghost" onClick={() => apply(toTitleCase)}>Title Case</button>
        <button className="tools-btn tools-btn--ghost" onClick={() => apply(toCamelCase)}>camelCase</button>
      </div>
    </div>
  )
}

// ─── Tool Cards Data ──────────────────────────────────────────────────────────

const TOOLS = [
  {
    id: 'qr',
    name: 'QR Code Generator',
    desc: 'Turn any URL or text into a scannable QR code. Download as SVG — zero watermarks.',
    component: QRCodeTool,
  },
  {
    id: 'gst',
    name: 'GST Calculator',
    desc: 'Calculate GST at 5%, 12%, 18% or 28% instantly. Get net + gross amounts.',
    component: GSTCalculator,
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    desc: 'Find your monthly instalment, total payable and interest for any loan.',
    component: EMICalculator,
  },
  {
    id: 'profit',
    name: 'Profit Margin Calculator',
    desc: 'Instantly compute profit amount, margin % and markup % from cost and selling price.',
    component: ProfitMarginCalculator,
  },
  {
    id: 'password',
    name: 'Password Generator',
    desc: 'Generate strong, random passwords with custom length and character rules.',
    component: PasswordGenerator,
  },
  {
    id: 'words',
    name: 'Word & Character Counter',
    desc: 'Live word count, character count, and estimated reading time for any text.',
    component: WordCounter,
  },
  {
    id: 'age',
    name: 'Age Calculator',
    desc: 'Find exact age in years, months and days — plus how many days until your next birthday.',
    component: AgeCalculator,
  },
  {
    id: 'pct',
    name: 'Percentage Calculator',
    desc: 'Three modes: X% of Y, X is what % of Y, and % change between two values.',
    component: PercentageCalculator,
  },
  {
    id: 'color',
    name: 'HEX ↔ RGB Converter',
    desc: 'Convert between hex and RGB colour values with a live colour swatch preview.',
    component: ColorConverter,
  },
  {
    id: 'case',
    name: 'Text Case Converter',
    desc: 'Switch text between UPPERCASE, lowercase, Title Case and camelCase in one click.',
    component: TextCaseConverter,
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ToolsPage() {
  return (
    <div className="tools-root">
      {/* Hero */}
      <section className="tools-hero">
        <p className="tools-eyebrow">FREE BUSINESS TOOLS</p>
        <h1 className="tools-headline">
          Tools that save time.<br />
          <span className="tools-headline--accent">Free, forever.</span>
        </h1>
        <p className="tools-sub">
          10 free tools built for Indian businesses — no login, no cost, no catch.
        </p>
      </section>

      {/* Grid */}
      <section className="tools-grid-section">
        <div className="tools-grid">
          {TOOLS.map(({ id, name, desc, component: Widget }) => (
            <div key={id} className="tools-card">
              <div className="tools-card-header">
                <div className="tools-card-meta">
                  <h2 className="tools-card-name">{name}</h2>
                  <span className="tools-free-pill">Free</span>
                </div>
                <p className="tools-card-desc">{desc}</p>
              </div>
              <hr className="tools-divider" />
              <Widget />
            </div>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section className="tools-coming-soon">
        <div className="tools-coming-inner">
          <span className="tools-coming-text">More tools coming soon</span>
          <span className="tools-coming-dot" />
          <span className="tools-coming-hint">Invoice generator, GST number lookup, business name checker…</span>
        </div>
      </section>

      {/* CTA */}
      <section className="tools-cta-section">
        <p className="tools-cta-text">Need custom software? We build it.</p>
        <a href="tel:+919500036310" className="tools-cta-link">
          Call +91 95000 36310 →
        </a>
      </section>
    </div>
  )
}
