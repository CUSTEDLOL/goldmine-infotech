/**
 * HeroBeamArt — the pointed-beam gradient art for the hero background.
 *
 * Shape: wide rounded left, sharp tip pointing right.
 * Palette: Goldmine orange-red → teal channel → deep purple.
 * Overlaid: PCB circuit traces + film-grain texture.
 * Left/top/bottom edges fade to white via gradient masks.
 */

/* Beam outer path (points extend slightly off-canvas on left for natural fade) */
const BEAM =
  'M 1440 360 ' +
  'C 1280 190, 972 72, 664 108 ' +
  'C 462 130, 245 154, 56 238 ' +
  'C 8 262, -24 314, -8 362 ' +
  'C 6 408, 60 455, 168 500 ' +
  'C 340 560, 542 590, 722 584 ' +
  'C 962 572, 1240 510, 1440 360 Z'

export default function HeroBeamArt() {
  return (
    <svg
      viewBox="0 0 1440 720"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      style={{ width: '100%', height: '100%', display: 'block' }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* ── Grain filter ──────────────────────────────────────────── */}
        <filter
          id="hba-grain"
          x="-5%" y="-5%" width="110%" height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.63"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feComposite in="gray" in2="SourceAlpha" operator="in" />
        </filter>

        {/* ── Clip path: the beam shape ────────────────────────────── */}
        <clipPath id="hba-clip">
          <path d={BEAM} />
        </clipPath>

        {/* ── Main linear: transparent-orange → teal → purple ─────── */}
        <linearGradient
          id="hba-main"
          x1="0" y1="0" x2="1440" y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#E84020" stopOpacity="0"    />
          <stop offset="7%"   stopColor="#E84020" stopOpacity="0.95" />
          <stop offset="28%"  stopColor="#E85030" stopOpacity="0.9"  />
          <stop offset="50%"  stopColor="#3EC8D8" stopOpacity="0.88" />
          <stop offset="73%"  stopColor="#7038C0" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#4A18A0" stopOpacity="1"    />
        </linearGradient>

        {/* ── Upper-left warm orange radial glow ───────────────────── */}
        <radialGradient
          id="hba-warm"
          cx="215" cy="188" r="375"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#FAB060" stopOpacity="0.88" />
          <stop offset="40%"  stopColor="#F07030" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#E06020" stopOpacity="0"    />
        </radialGradient>

        {/* ── Teal/cyan center channel ──────────────────────────────── */}
        <radialGradient
          id="hba-teal"
          cx="695" cy="335" r="258"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#5CD8E8" stopOpacity="0.75" />
          <stop offset="55%"  stopColor="#38B8CC" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#38B8CC" stopOpacity="0"    />
        </radialGradient>

        {/* ── Pink/salmon lower bloom ───────────────────────────────── */}
        <radialGradient
          id="hba-pink"
          cx="488" cy="548" r="272"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#F07888" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#F07888" stopOpacity="0"    />
        </radialGradient>

        {/* ── Purple right depth ────────────────────────────────────── */}
        <radialGradient
          id="hba-purple"
          cx="1185" cy="375" r="308"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   stopColor="#5828A0" stopOpacity="0.50" />
          <stop offset="100%" stopColor="#5828A0" stopOpacity="0"    />
        </radialGradient>

        {/* ── White overlays for soft edge fade ────────────────────── */}
        {/* Left → transparent */}
        <linearGradient id="hba-lfade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Top → transparent */}
        <linearGradient id="hba-tfade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Bottom → transparent */}
        <linearGradient id="hba-bfade" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%"   stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* White canvas base */}
      <rect width="1440" height="720" fill="white" />

      {/* ══ BEAM: gradient fill layers (all clipped) ═══════════════ */}
      <g clipPath="url(#hba-clip)">
        {/* 1 — base linear gradient */}
        <rect width="1440" height="720" fill="url(#hba-main)" />
        {/* 2 — warm upper-left glow */}
        <rect width="1440" height="720" fill="url(#hba-warm)" />
        {/* 3 — teal center channel */}
        <rect width="1440" height="720" fill="url(#hba-teal)" />
        {/* 4 — pink lower bloom */}
        <rect width="1440" height="720" fill="url(#hba-pink)" />
        {/* 5 — purple right depth */}
        <rect width="1440" height="720" fill="url(#hba-purple)" />
      </g>

      {/* ══ FLOW LINES: subtle white wave through center ════════════ */}
      <g
        clipPath="url(#hba-clip)"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M 230 344 C 445 314, 644 335, 842 350 C 994 361, 1158 356, 1342 359" />
        <path d="M 230 370 C 445 400, 644 376, 842 362 C 994 351, 1158 355, 1342 362" />
      </g>

      {/* ══ CIRCUIT TRACES ═════════════════════════════════════════ */}
      <g clipPath="url(#hba-clip)">

        {/* — Sparse upper traces — */}
        <g
          stroke="rgba(28,12,68,0.28)"
          strokeWidth="0.85"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="96"  y1="228" x2="652" y2="244" />
          <polyline points="130,262 316,262 316,257 696,270" />
          <line x1="170" y1="297" x2="746" y2="307" />
        </g>
        {/* Upper pads */}
        <g fill="rgba(44,20,86,0.55)">
          <circle cx="96"  cy="228" r="3.5" />
          <circle cx="254" cy="231" r="3.0" />
          <circle cx="130" cy="262" r="3.5" />
          <circle cx="316" cy="262" r="3.0" />
          <circle cx="316" cy="257" r="3.0" />
          <circle cx="652" cy="244" r="3.0" />
          <circle cx="170" cy="297" r="3.0" />
        </g>

        {/* — Main PCB cluster — */}
        <g
          stroke="rgba(28,12,68,0.43)"
          strokeWidth="1.05"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* 6 inputs → stage-1 junction at x=904 */}
          <polyline points="570,312 836,312 836,324 904,324" />
          <polyline points="550,330 850,330 850,333 904,333" />
          <polyline points="534,348 904,348" />
          <polyline points="534,366 904,366" />
          <polyline points="550,382 850,382 850,379 904,379" />
          <polyline points="570,399 836,399 836,388 904,388" />

          {/* Stage 1 → stage 2 at x=1082 */}
          <polyline points="904,324 962,324 962,313 1022,313 1022,330 1082,330" />
          <polyline points="904,333 962,333 962,337 1082,337" />
          <polyline points="904,348 1082,348" />
          <polyline points="904,366 1082,366" />
          <polyline points="904,379 962,379 962,372 1082,372" />
          <polyline points="904,388 962,388 962,381 1022,381 1022,366 1082,381" />

          {/* Stage 2 → stage 3 at x=1202 */}
          <polyline points="1082,330 1142,330 1142,347 1202,347" />
          <polyline points="1082,337 1142,337 1142,347" />
          <polyline points="1082,348 1202,348" />
          <polyline points="1082,366 1202,366" />
          <polyline points="1082,372 1142,372 1142,366" />
          <polyline points="1082,381 1142,381 1142,366" />

          {/* Stage 3 → tip */}
          <polyline points="1202,347 1302,347 1302,355 1382,355 1382,360 1440,360" />
          <polyline points="1202,357 1302,357" />
          <polyline points="1202,366 1302,366 1302,362 1382,362 1382,360" />
        </g>

        {/* PCB pads — inputs */}
        <g fill="rgba(30,14,70,0.52)">
          <circle cx="570" cy="312" r="3.2" /><circle cx="550" cy="330" r="3.2" />
          <circle cx="534" cy="348" r="3.2" /><circle cx="534" cy="366" r="3.2" />
          <circle cx="550" cy="382" r="3.2" /><circle cx="570" cy="399" r="3.2" />
          {/* Stage 1 junctions */}
          <circle cx="904" cy="324" r="3.2" /><circle cx="904" cy="333" r="3.2" />
          <circle cx="904" cy="348" r="3.2" /><circle cx="904" cy="366" r="3.2" />
          <circle cx="904" cy="379" r="3.2" /><circle cx="904" cy="388" r="3.2" />
          <circle cx="962" cy="324" r="2.8" /><circle cx="962" cy="333" r="2.8" />
          <circle cx="962" cy="379" r="2.8" /><circle cx="962" cy="388" r="2.8" />
          <circle cx="1022" cy="313" r="2.8" /><circle cx="1022" cy="381" r="2.8" />
          {/* Stage 2 */}
          <circle cx="1082" cy="330" r="3.0" /><circle cx="1082" cy="337" r="3.0" />
          <circle cx="1082" cy="348" r="3.0" /><circle cx="1082" cy="366" r="3.0" />
          <circle cx="1082" cy="372" r="3.0" /><circle cx="1082" cy="381" r="3.0" />
          <circle cx="1142" cy="330" r="2.5" /><circle cx="1142" cy="347" r="2.5" />
          <circle cx="1142" cy="372" r="2.5" /><circle cx="1142" cy="381" r="2.5" />
          {/* Stage 3 */}
          <circle cx="1202" cy="347" r="3.0" /><circle cx="1202" cy="357" r="3.0" />
          <circle cx="1202" cy="366" r="3.0" />
          <circle cx="1302" cy="347" r="2.5" /><circle cx="1302" cy="357" r="2.5" />
          <circle cx="1302" cy="366" r="2.5" />
          <circle cx="1382" cy="355" r="2.5" /><circle cx="1382" cy="362" r="2.5" />
        </g>

        {/* Scattered lower dots */}
        <g fill="rgba(54,24,102,0.42)">
          <circle cx="186" cy="424" r="3.5" />
          <circle cx="141" cy="468" r="3.0" />
          <circle cx="80"  cy="510" r="3.5" />
          <circle cx="375" cy="486" r="2.8" />
          <circle cx="86"  cy="640" r="3.0" />
        </g>

        {/* Grain — overlay pass */}
        <rect
          width="1440" height="720"
          fill="rgba(88,48,148,0.17)"
          filter="url(#hba-grain)"
        />
        {/* Grain — multiply pass for depth */}
        <rect
          width="1440" height="720"
          fill="rgba(120,120,120,0.07)"
          filter="url(#hba-grain)"
        />
      </g>

      {/* ══ EDGE FADES: white overlays on top of beam ══════════════ */}
      {/* Left  — 172px wide */}
      <rect width="172" height="720" fill="url(#hba-lfade)" />
      {/* Top   — 108px tall */}
      <rect width="1440" height="108" fill="url(#hba-tfade)" />
      {/* Bottom — 108px tall from bottom */}
      <rect y="612" width="1440" height="108" fill="url(#hba-bfade)" />
    </svg>
  )
}
