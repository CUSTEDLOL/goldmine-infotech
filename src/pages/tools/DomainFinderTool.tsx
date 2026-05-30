import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useContactModal } from '../../context/ContactModalContext'
import './DomainFinderTool.css'

// ─── Types & Constants ────────────────────────────────────────────────────────

type DomainStatus = 'idle' | 'checking' | 'available' | 'registered' | 'unknown'

interface DomainResult {
  domain: string
  status: DomainStatus
}

const ALL_TLDS = [
  '.com', '.in', '.co.in', '.net', '.org',
  '.com.in', '.net.in', '.org.in', '.info', '.io', '.tech', '.app',
]

// ─── Domain availability check via Cloudflare DNS-over-HTTPS (SOA lookup) ────
// API: https://cloudflare-dns.com/dns-query?name=<domain>&type=SOA
// SOA records exist on all registered domains → most reliable registration signal.
// NXDOMAIN (Status 3) = not registered = Available.

async function checkDomain(domain: string): Promise<DomainStatus> {
  try {
    const res = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=SOA`,
      {
        headers: { Accept: 'application/dns-json' },
        signal: AbortSignal.timeout(6000),
      }
    )
    if (!res.ok) return 'unknown'
    const data = await res.json()
    if (data.Status === 3) return 'available'   // NXDOMAIN = not registered
    if (data.Status === 0) return 'registered'  // SOA present = registered
    return 'unknown'
  } catch {
    return 'unknown'
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: DomainStatus }) {
  if (status === 'checking') {
    return (
      <span className="df-badge df-badge--checking">
        <span className="df-spinner" aria-hidden="true" />
        Checking...
      </span>
    )
  }
  if (status === 'available') {
    return <span className="df-badge df-badge--available">Available</span>
  }
  if (status === 'registered') {
    return <span className="df-badge df-badge--registered">Registered</span>
  }
  return <span className="df-badge df-badge--unknown">Unknown</span>
}

function ResultRow({ result }: { result: DomainResult }) {
  return (
    <div className={`df-result-row df-result-row--${result.status}`}>
      <span className="df-result-domain">{result.domain}</span>
      <div className="df-result-right">
        <StatusBadge status={result.status} />
        {result.status === 'available' && (
          <Link to="/services/domain-registration" className="df-result-cta">
            Register Now →
          </Link>
        )}
        {(result.status === 'registered' || result.status === 'unknown') && (
          <span className="df-result-cta df-result-cta--muted">
            {result.status === 'registered' ? 'Try another' : 'Unavailable'}
          </span>
        )}
        {result.status === 'checking' && (
          <span className="df-result-cta df-result-cta--ghost"> </span>
        )}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DomainFinderTool() {
  const { openModal } = useContactModal()
  const [domainInput, setDomainInput]     = useState('')
  const [selectedTLDs, setSelectedTLDs]   = useState<string[]>(ALL_TLDS)
  const [results, setResults]             = useState<DomainResult[]>([])
  const [isSearching, setIsSearching]     = useState(false)
  const [hasSearched, setHasSearched]     = useState(false)
  const [inputError, setInputError]       = useState('')

  const toggleTLD = useCallback((tld: string) => {
    setSelectedTLDs((prev) =>
      prev.includes(tld) ? prev.filter((t) => t !== tld) : [...prev, tld]
    )
  }, [])

  const handleSearch = useCallback(async () => {
    const input = domainInput.trim().toLowerCase().replace(/^https?:\/\//i, '').replace(/\//g, '').replace(/\s+/g, '')

    if (!input) {
      setInputError('Please enter a domain name to search.')
      return
    }
    if (selectedTLDs.length === 0) {
      setInputError('Select at least one domain extension.')
      return
    }
    setInputError('')

    const tlds = selectedTLDs
    const initialResults: DomainResult[] = tlds.map((tld) => ({
      domain: `${input}${tld}`,
      status: 'checking',
    }))

    setResults(initialResults)
    setHasSearched(true)
    setIsSearching(true)

    // Run all checks in parallel
    const checks = tlds.map(async (tld) => {
      const domain = `${input}${tld}`
      const status = await checkDomain(domain)
      return { domain, status }
    })

    // Update results as each resolves
    const settled = await Promise.all(checks)
    setResults(settled)
    setIsSearching(false)
  }, [domainInput, selectedTLDs])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !isSearching) handleSearch()
    },
    [handleSearch, isSearching]
  )

  const availableCount = results.filter((r) => r.status === 'available').length

  return (
    <div className="df-root">

      {/* Breadcrumb */}
      <div className="df-breadcrumb">
        <Link to="/tools" className="df-breadcrumb-link">Free Tools</Link>
        <span className="df-breadcrumb-sep">›</span>
        <span className="df-breadcrumb-current">Domain Finder</span>
      </div>

      {/* Hero */}
      <div className="df-hero">
        <div className="df-hero-badge">FREE DOMAIN FINDER</div>
        <h1 className="df-hero-title">
          Find the perfect domain<br />
          <span className="df-hero-accent">for your business.</span>
        </h1>
        <p className="df-hero-sub">
          Check availability across 10+ domain extensions instantly.
        </p>
      </div>

      {/* Search + TLDs */}
      <div className="df-search-section">

        {/* Search bar */}
        <div className="df-search-bar-wrap">
          <div className={`df-search-bar${inputError ? ' df-search-bar--error' : ''}`}>
            <svg className="df-search-icon" viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
              <circle cx="9" cy="9" r="6.5" stroke="#aaa" strokeWidth="1.6" />
              <path d="M14 14l3 3" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              id="df-domain-input"
              className="df-search-input"
              type="text"
              placeholder="Enter your business name..."
              value={domainInput}
              onChange={(e) => { setDomainInput(e.target.value); setInputError('') }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Domain name to search"
              aria-describedby={inputError ? 'df-input-error' : undefined}
            />
            <button
              className="df-search-btn"
              onClick={handleSearch}
              disabled={isSearching}
              aria-label="Search domain availability"
            >
              {isSearching ? (
                <>
                  <span className="df-btn-spinner" aria-hidden="true" />
                  Searching
                </>
              ) : 'Search'}
            </button>
          </div>
          {inputError && (
            <p id="df-input-error" className="df-input-error" role="alert">{inputError}</p>
          )}
        </div>

        {/* TLD Tabs */}
        <div className="df-tld-section">
          <p className="df-tld-label">Select extensions to check:</p>
          <div className="df-tld-pills" role="group" aria-label="Domain extensions">
            {ALL_TLDS.map((tld) => {
              const active = selectedTLDs.includes(tld)
              return (
                <button
                  key={tld}
                  className={`df-tld-pill${active ? ' df-tld-pill--active' : ''}`}
                  onClick={() => toggleTLD(tld)}
                  aria-pressed={active}
                >
                  {tld}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      {hasSearched && (
        <div className="df-results-section">
          <div className="df-results-header">
            <h2 className="df-results-title">
              {isSearching
                ? 'Checking availability...'
                : `${availableCount} domain${availableCount !== 1 ? 's' : ''} available`}
            </h2>
            {!isSearching && results.length > 0 && (
              <span className="df-results-count">{results.length} checked</span>
            )}
          </div>

          <div className="df-results-list" role="list" aria-label="Domain availability results" aria-live="polite">
            {results.map((result) => (
              <ResultRow key={result.domain} result={result} />
            ))}
          </div>

          {/* Disclaimer */}
          <p className="df-disclaimer">
            Results are based on DNS lookup and may not reflect recent registrations. Always verify with your registrar before purchase.
          </p>
        </div>
      )}

      {/* Empty state prompt */}
      {!hasSearched && (
        <div className="df-empty-state">
          <div className="df-empty-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
              <circle cx="22" cy="22" r="14" stroke="#e0e0e0" strokeWidth="2" />
              <path d="M22 10c0 0 4 6 4 12s-4 12-4 12" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 22h24" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 10c0 0-4 6-4 12s4 12 4 12" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" />
              <path d="M34 34l6 6" stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="df-empty-text">Enter your business name above to check domain availability across multiple extensions.</p>
        </div>
      )}

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
