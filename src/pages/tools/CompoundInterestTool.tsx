import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useContactModal } from '../../context/ContactModalContext'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './CompoundInterestTool.css'

// ─── Types ────────────────────────────────────────────────────────────────────

interface YearRow {
  year: number
  opening: number
  interest: number
  closing: number
}

interface ChartPoint {
  year: number
  'Total Amount': number
  Principal: number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(val: number) {
  return '₹' + Math.round(val).toLocaleString('en-IN')
}

function fmtShort(val: number) {
  if (val >= 1_00_00_000) return '₹' + (val / 1_00_00_000).toFixed(1) + 'Cr'
  if (val >= 1_00_000) return '₹' + (val / 1_00_000).toFixed(1) + 'L'
  if (val >= 1_000) return '₹' + (val / 1_000).toFixed(0) + 'K'
  return '₹' + Math.round(val).toLocaleString('en-IN')
}

const FREQ_OPTIONS = [
  { label: 'Annually', value: 1 },
  { label: 'Semi-Annually', value: 2 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
  { label: 'Daily', value: 365 },
]

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: number
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="ci-tooltip">
      <p className="ci-tooltip-year">Year {label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="ci-tooltip-row" style={{ color: entry.color }}>
          <span>{entry.name}</span>
          <strong>{fmt(entry.value)}</strong>
        </p>
      ))}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CompoundInterestTool() {
  const { openModal } = useContactModal()
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('12')
  const [years, setYears] = useState('10')
  const [freq, setFreq] = useState(12)

  const P = parseFloat(principal) || 0
  const r = parseFloat(rate) || 0
  const t = Math.min(Math.max(parseInt(years) || 0, 0), 50)
  const n = freq

  const { finalAmount, totalInterest, interestPct, chartData, tableRows } = useMemo(() => {
    if (P <= 0 || r <= 0 || t <= 0) {
      return { finalAmount: 0, totalInterest: 0, interestPct: 0, chartData: [], tableRows: [] }
    }

    const rRate = r / 100
    const final = P * Math.pow(1 + rRate / n, n * t)
    const interest = final - P
    const pct = (interest / P) * 100

    const chart: ChartPoint[] = [{ year: 0, 'Total Amount': P, Principal: P }]
    const table: YearRow[] = []

    for (let y = 1; y <= t; y++) {
      const opening = P * Math.pow(1 + rRate / n, n * (y - 1))
      const closing = P * Math.pow(1 + rRate / n, n * y)
      const yearInterest = closing - opening
      chart.push({ year: y, 'Total Amount': Math.round(closing), Principal: P })
      table.push({
        year: y,
        opening: Math.round(opening),
        interest: Math.round(yearInterest),
        closing: Math.round(closing),
      })
    }

    return {
      finalAmount: final,
      totalInterest: interest,
      interestPct: pct,
      chartData: chart,
      tableRows: table,
    }
  }, [P, r, t, n])

  const hasResult = P > 0 && r > 0 && t > 0

  return (
    <div className="ci-root">
      {/* Breadcrumb */}
      <div className="ci-breadcrumb">
        <Link to="/tools" className="ci-breadcrumb-link">Free Tools</Link>
        <span className="ci-breadcrumb-sep">›</span>
        <span className="ci-breadcrumb-current">Compound Interest Calculator</span>
      </div>

      {/* Hero */}
      <div className="ci-hero">
        <div className="ci-hero-badge">FREE CALCULATOR</div>
        <h1 className="ci-hero-title">
          Compound Interest
          <span className="ci-hero-accent"> Calculator</span>
        </h1>
        <p className="ci-hero-sub">
          See how your money grows with the power of compounding. Live results, year-by-year breakdown, no sign-up needed.
        </p>
      </div>

      {/* Two-panel layout */}
      <div className="ci-layout">

        {/* LEFT: Form + Stats */}
        <div className="ci-left">
          <div className="ci-form-card">
            <h2 className="ci-section-title">Investment Details</h2>

            <div className="ci-form-grid">
              <div className="ci-field">
                <label className="ci-label" htmlFor="ci-principal">Principal Amount (₹)</label>
                <input
                  id="ci-principal"
                  className="ci-input"
                  type="number"
                  placeholder="e.g. 1,00,000"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  min="0"
                />
              </div>

              <div className="ci-field">
                <label className="ci-label" htmlFor="ci-rate">Annual Interest Rate (%)</label>
                <input
                  id="ci-rate"
                  className="ci-input"
                  type="number"
                  placeholder="e.g. 12"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="ci-field">
                <label className="ci-label" htmlFor="ci-years">Time Period (Years)</label>
                <input
                  id="ci-years"
                  className="ci-input"
                  type="number"
                  placeholder="e.g. 10"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  min="1"
                  max="50"
                />
              </div>

              <div className="ci-field">
                <label className="ci-label" htmlFor="ci-freq">Compound Frequency</label>
                <select
                  id="ci-freq"
                  className="ci-input ci-select"
                  value={freq}
                  onChange={(e) => setFreq(Number(e.target.value))}
                >
                  {FREQ_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stat boxes */}
          <div className="ci-stats">
            <div className="ci-stat-box ci-stat-box--orange">
              <span className="ci-stat-label">Final Amount</span>
              <span className="ci-stat-value ci-stat-value--orange">
                {hasResult ? fmt(finalAmount) : '—'}
              </span>
              <span className="ci-stat-hint">After {hasResult ? t : '—'} years</span>
            </div>

            <div className="ci-stat-box ci-stat-box--dark">
              <span className="ci-stat-label">Total Interest</span>
              <span className="ci-stat-value ci-stat-value--dark">
                {hasResult ? fmt(totalInterest) : '—'}
              </span>
              <span className="ci-stat-hint">Interest earned</span>
            </div>

            <div className="ci-stat-box ci-stat-box--green">
              <span className="ci-stat-label">Wealth Gain</span>
              <span className="ci-stat-value ci-stat-value--green">
                {hasResult ? `+${interestPct.toFixed(1)}%` : '—'}
              </span>
              <span className="ci-stat-hint">Return on principal</span>
            </div>
          </div>

          {/* Formula note */}
          <div className="ci-formula-note">
            <span className="ci-formula-label">Formula:</span>
            <span className="ci-formula-text">A = P(1 + r/n)^(nt)</span>
            <span className="ci-formula-sub">where r = rate/100, n = frequency/year, t = time in years</span>
          </div>
        </div>

        {/* RIGHT: Chart + Table */}
        <div className="ci-right">
          {/* Chart */}
          <div className="ci-chart-card">
            <div className="ci-chart-header">
              <h2 className="ci-section-title">Growth Over Time</h2>
              <div className="ci-chart-legend-custom">
                <span className="ci-legend-dot ci-legend-dot--orange" />
                <span className="ci-legend-text">Total Amount</span>
                <span className="ci-legend-dot ci-legend-dot--grey" />
                <span className="ci-legend-text">Principal</span>
              </div>
            </div>

            {hasResult ? (
              <div className="ci-chart-wrap">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="year"
                      tick={{ fontSize: 11, fill: '#888' }}
                      axisLine={false}
                      tickLine={false}
                      label={{ value: 'Years', position: 'insideBottomRight', offset: -4, fontSize: 11, fill: '#aaa' }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#888' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={fmtShort}
                      width={60}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ display: 'none' }} />
                    <Line
                      type="monotone"
                      dataKey="Total Amount"
                      stroke="#fca311"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5, fill: '#fca311', stroke: '#fff', strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Principal"
                      stroke="#bbbbbb"
                      strokeWidth={1.5}
                      strokeDasharray="5 4"
                      dot={false}
                      activeDot={{ r: 4, fill: '#bbb', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="ci-chart-empty">
                <div className="ci-chart-empty-icon">
                  <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
                    <polyline points="4,38 16,22 28,28 44,10" stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="44" cy="10" r="3" fill="#e0e0e0" />
                  </svg>
                </div>
                <p className="ci-chart-empty-text">Enter values above to see the growth chart</p>
              </div>
            )}
          </div>

          {/* Amortization Table */}
          {hasResult && tableRows.length > 0 && (
            <div className="ci-table-card">
              <h2 className="ci-section-title ci-section-title--table">Year-by-Year Breakdown</h2>
              <div className="ci-table-scroll">
                <table className="ci-table">
                  <thead>
                    <tr>
                      <th className="ci-th">Year</th>
                      <th className="ci-th ci-th--right">Opening Balance</th>
                      <th className="ci-th ci-th--right">Interest Earned</th>
                      <th className="ci-th ci-th--right">Closing Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row) => (
                      <tr key={row.year} className="ci-tr">
                        <td className="ci-td ci-td--year">{row.year}</td>
                        <td className="ci-td ci-td--right">{fmt(row.opening)}</td>
                        <td className="ci-td ci-td--right ci-td--interest">{fmt(row.interest)}</td>
                        <td className="ci-td ci-td--right ci-td--closing">{fmt(row.closing)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
