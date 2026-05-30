import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './DomainFinderSection.css'

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
    if (data.Status === 3) return 'available'
    if (data.Status === 0) return 'registered'
    return 'unknown'
  } catch {
    return 'unknown'
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: DomainStatus }) {
  if (status === 'checking') {
    return (
      <span className="dfs-badge dfs-badge--checking">
        <span className="dfs-spinner" aria-hidden="true" />
        Checking...
      </span>
    )
  }
  if (status === 'available') {
    return <span className="dfs-badge dfs-badge--available">Available</span>
  }
  if (status === 'registered') {
    return <span className="dfs-badge dfs-badge--registered">Registered</span>
  }
  return <span className="dfs-badge dfs-badge--unknown">Unknown</span>
}

function ResultRow({ result }: { result: DomainResult }) {
  return (
    <div className={`dfs-result-row dfs-result-row--${result.status}`}>
      <span className="dfs-result-domain">{result.domain}</span>
      <div className="dfs-result-right">
        <StatusBadge status={result.status} />
        {result.status === 'available' && (
          <Link to="/services/domain-registration" className="dfs-result-cta">
            Register Now →
          </Link>
        )}
        {(result.status === 'registered' || result.status === 'unknown') && (
          <span className="dfs-result-cta dfs-result-cta--muted">
            {result.status === 'registered' ? 'Try another' : 'Unavailable'}
          </span>
        )}
        {result.status === 'checking' && (
          <span className="dfs-result-cta dfs-result-cta--ghost" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}

// ─── Main Section Component ───────────────────────────────────────────────────

export default function DomainFinderSection() {
  const [domainInput, setDomainInput]   = useState('')
  const [selectedTLDs, setSelectedTLDs] = useState<string[]>(ALL_TLDS)
  const [results, setResults]           = useState<DomainResult[]>([])
  const [isSearching, setIsSearching]   = useState(false)
  const [hasSearched, setHasSearched]   = useState(false)
  const [inputError, setInputError]     = useState('')

  const toggleTLD = useCallback((tld: string) => {
    setSelectedTLDs((prev) =>
      prev.includes(tld) ? prev.filter((t) => t !== tld) : [...prev, tld]
    )
  }, [])

  const handleSearch = useCallback(async () => {
    const input = domainInput
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//i, '')
      .replace(/\//g, '')
      .replace(/\s+/g, '')

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

    const checks = tlds.map(async (tld) => {
      const domain = `${input}${tld}`
      const status = await checkDomain(domain)
      return { domain, status }
    })

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
    <section className="dfs-section" aria-labelledby="dfs-heading">
      <div className="dfs-inner">

        {/* Section heading */}
        <header className="dfs-header">
          <span className="dfs-eyebrow">FREE TOOL</span>
          <h2 id="dfs-heading" className="dfs-headline">
            Find your perfect domain.
          </h2>
          <p className="dfs-subtext">
            Check availability across 10+ extensions instantly — no sign-up needed.
          </p>
        </header>

        {/* Search bar */}
        <div className="dfs-search-bar-wrap">
          <div className={`dfs-search-bar${inputError ? ' dfs-search-bar--error' : ''}`}>
            <svg
              className="dfs-search-icon"
              viewBox="0 0 20 20"
              fill="none"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <circle cx="9" cy="9" r="6.5" stroke="#aaa" strokeWidth="1.6" />
              <path d="M14 14l3 3" stroke="#aaa" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              id="dfs-domain-input"
              className="dfs-search-input"
              type="text"
              placeholder="Enter your business name..."
              value={domainInput}
              onChange={(e) => {
                setDomainInput(e.target.value)
                setInputError('')
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="Domain name to search"
              aria-describedby={inputError ? 'dfs-input-error' : undefined}
            />
            <button
              className="dfs-search-btn"
              onClick={handleSearch}
              disabled={isSearching}
              aria-label="Search domain availability"
            >
              {isSearching ? (
                <>
                  <span className="dfs-btn-spinner" aria-hidden="true" />
                  Searching
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>
          {inputError && (
            <p id="dfs-input-error" className="dfs-input-error" role="alert">
              {inputError}
            </p>
          )}
        </div>

        {/* TLD pills */}
        <div className="dfs-tld-section">
          <p className="dfs-tld-label">Select extensions to check:</p>
          <div className="dfs-tld-pills" role="group" aria-label="Domain extensions">
            {ALL_TLDS.map((tld) => {
              const active = selectedTLDs.includes(tld)
              return (
                <button
                  key={tld}
                  className={`dfs-tld-pill${active ? ' dfs-tld-pill--active' : ''}`}
                  onClick={() => toggleTLD(tld)}
                  aria-pressed={active}
                >
                  {tld}
                </button>
              )
            })}
          </div>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="dfs-results-section">
            <div className="dfs-results-header">
              <h3 className="dfs-results-title">
                {isSearching
                  ? 'Checking availability...'
                  : `${availableCount} domain${availableCount !== 1 ? 's' : ''} available`}
              </h3>
              {!isSearching && results.length > 0 && (
                <span className="dfs-results-count">{results.length} checked</span>
              )}
            </div>

            <div
              className="dfs-results-list"
              role="list"
              aria-label="Domain availability results"
              aria-live="polite"
            >
              {results.map((result) => (
                <ResultRow key={result.domain} result={result} />
              ))}
            </div>

            <p className="dfs-disclaimer">
              Results are based on DNS lookup and may not reflect recent registrations.
              Always verify with your registrar before purchase.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!hasSearched && (
          <div className="dfs-empty-state" aria-hidden="true">
            <div className="dfs-empty-icon">
              <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
                <circle cx="22" cy="22" r="14" stroke="#e0e0e0" strokeWidth="2" />
                <path
                  d="M22 10c0 0 4 6 4 12s-4 12-4 12"
                  stroke="#e0e0e0"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M10 22h24" stroke="#e0e0e0" strokeWidth="2" strokeLinecap="round" />
                <path
                  d="M22 10c0 0-4 6-4 12s4 12 4 12"
                  stroke="#e0e0e0"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path d="M34 34l6 6" stroke="#e0e0e0" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="dfs-empty-text">
              Enter your business name above to check domain availability across multiple extensions.
            </p>
          </div>
        )}

      </div>
    </section>
  )
}
