import { motion } from 'framer-motion'
import './LogoBarDark.css'

/* ─── Official Brand Logos (Wikimedia Commons SVGs) ───────────── */

const BRAND_LOGOS = [
	{
		name: 'Dell',
		url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
	},
	{
		name: 'HP',
		url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
	},
	{
		name: 'Lenovo',
		url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/lenovo.svg',
		className: 'logo-invert logo-xlarge',
	},
	{
		name: 'ASUS',
		url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg',
		className: 'logo-invert',
	},
	{
		name: 'Acer',
		url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/acer.svg',
		className: 'logo-invert logo-xlarge',
	},
	{
		name: 'Canon',
		url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Canon_wordmark.svg',
		className: 'logo-invert',
	},
	{
		name: 'Epson',
		url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Epson_logo.svg',
	},
	{
		name: 'Brother',
		url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Brother_logo.svg',
	},
	{
		name: 'Hikvision',
		url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hikvision_logo.svg',
		className: 'logo-invert',
	},
	{
		name: 'Dahua',
		url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dahua_Technology_logo.svg',
		className: 'logo-invert',
	},
	{
		name: 'Samsung',
		url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/samsung.svg',
		className: 'logo-invert logo-xlarge',
	},
	{
		name: 'LG',
		url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_symbol.svg',
	},
	{
		name: 'Sony',
		url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
		className: 'logo-invert',
	},
	{
		name: 'Panasonic',
		url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/panasonic.svg',
		className: 'logo-invert logo-xlarge',
	},
	{
		name: 'Microsoft',
		url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
	},
	{
		name: 'Cisco',
		url: 'https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/cisco.svg',
		className: 'logo-invert logo-xlarge',
	},
	{
		name: 'D-Link',
		url: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/D-Link_wordmark.svg',
		className: 'logo-invert',
	},
]

const TRACK = [...BRAND_LOGOS, ...BRAND_LOGOS]

export default function LogoBarDark() {
	return (
		<motion.section className="logo-bar-dark">
			<div className="marquee-outer">
				<div className="marquee-track">
					{TRACK.map(({ name, url, className }, i) => (
						<div
							key={`${i}-${name}`}
							className="logo-pill logo-pill--dark"
							title={name}
							data-logo={name.toLowerCase()}
						>
							<img
								src={url}
								alt={`${name} logo`}
								loading="lazy"
								className={`logo-img ${className || ''}`}
							/>
						</div>
					))}
				</div>
			</div>
		</motion.section>
	)
}
