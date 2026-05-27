import { motion } from 'framer-motion'
import './LogoBarDark.css'

/* ─── Types ───────────────────────────────────────────────────── */

interface BrandLogo {
  name: string
  url?: string
  className?: string
}

interface LogoBarDarkProps {
  brands?: BrandLogo[]
  fadeTo?: string
  label?: string
}

/* ─── Official Brand Logos — all rendered white on dark background ─ */

const BRAND_LOGOS: BrandLogo[] = [
	{ name: 'Dell',      url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
	{ name: 'HP',        url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
	{ name: 'Lenovo',    url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/lenovo.svg' },
	{ name: 'ASUS',      url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
	{ name: 'Acer',      url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/acer.svg' },
	{ name: 'Apple',     url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
	{ name: 'Samsung',   url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/samsung.svg', className: 'logo-xlarge' },
	{ name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
	{ name: 'Intel',     url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg' },
	{ name: 'Sony',      url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
	{ name: 'LG',        url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg' },
	{ name: 'Panasonic', url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/panasonic.svg', className: 'logo-xlarge' },
	{ name: 'Canon',     url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Canon_wordmark.svg' },
	{ name: 'Epson',     url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Epson_logo.svg' },
	{ name: 'Brother',   url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Brother_logo.svg' },
	{ name: 'Hikvision', url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hikvision_logo.svg' },
	{ name: 'Dahua',     url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dahua_Technology_logo.svg' },
	{ name: 'Cisco',     url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/cisco.svg', className: 'logo-xlarge' },
]

export default function LogoBarDark({ brands, fadeTo, label }: LogoBarDarkProps) {
	const logos = brands ?? BRAND_LOGOS
	const track = [...logos, ...logos]

	return (
		<motion.section
			className="logo-bar-dark"
			style={{ '--fade-to': fadeTo ?? '#0a0a0a' } as React.CSSProperties}
		>
			{label && <div className="lbd-label">{label}</div>}
			<div className="marquee-outer">
				<div className="marquee-track">
					{track.map(({ name, url, className }, i) => (
						<div
							key={`${i}-${name}`}
							className="logo-pill logo-pill--dark"
							title={name}
							data-logo={name.toLowerCase()}
						>
							{url ? (
								<img
									src={url}
									alt={`${name} logo`}
									loading="lazy"
									className={`logo-img ${className || ''}`}
								/>
							) : (
								<span className="logo-text">{name}</span>
							)}
						</div>
					))}
				</div>
			</div>
		</motion.section>
	)
}
