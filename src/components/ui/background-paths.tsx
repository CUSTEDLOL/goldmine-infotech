"use client";

import { motion } from "framer-motion";
// ─── Grain overlay ────────────────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 4,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "192px 192px",
        opacity: 0.038,
        mixBlendMode: "overlay",
      }}
    />
  );
}

// ─── Data-stream paths ────────────────────────────────────────────────────────
//
// Uses pure CSS stroke-dashoffset animation instead of Framer Motion pathOffset.
// FM's repeatType:"loop" resets 1→0 as a hard jump (always visible as flicker).
// CSS animating dashoffset 0 → -CYCLE is seamless: DASH+GAP = CYCLE so the
// pattern tiles perfectly at every loop boundary with no glitch.
//
function DataStreamPaths() {
  const COUNT = 42;
  const DASH  = 220;  // 22% visible segment  (DASH + GAP = 1000 = path length)
  const GAP   = 780;  // 78% gap  (DASH + GAP = CYCLE)

  const paths = Array.from({ length: COUNT }, (_, i) => {
    const t    = (i / (COUNT - 1)) * 2 - 1;
    const absT = Math.abs(t);
    const spread = t * 152;

    const d = [
      `M 830 ${158 + spread * 0.03}`,
      `C 635 ${158 + spread * 0.16}`,
      `  355 ${158 + spread * 0.58}`,
      `  -90 ${158 + spread}`,
    ].join(" ");

    const opacity     = 0.45 - absT * 0.28;
    const strokeWidth = 1.2  - absT * 0.72;
    const duration    = 7    + absT * 5 + (i % 7) * 0.8;

    // Negative CSS delay = already N seconds into the animation on mount
    const preSeek   = -(duration * ((i * 0.137) % 1));
    const fadeDelay = i * 0.055;

    return { id: i, d, opacity, strokeWidth, duration, preSeek, fadeDelay };
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient
          id="streamGradient"
          x1="-90" y1="0" x2="830" y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%"   className="sg-stop-a" />
          <stop offset="48%"  className="sg-stop-b" />
          <stop offset="100%" className="sg-stop-c" />
        </linearGradient>
      </defs>

      {paths.map((p) => (
        <path
          key={p.id}
          d={p.d}
          stroke="url(#streamGradient)"
          strokeWidth={p.strokeWidth}
          fill="none"
          style={{
            strokeDasharray: `${DASH} ${GAP}`,
            animationName: "pathFlow, pathFadeIn",
            animationDuration: `${p.duration}s, 1.5s`,
            animationTimingFunction: "linear, ease-in",
            animationDelay: `${p.preSeek}s, ${p.fadeDelay}s`,
            animationIterationCount: "infinite, 1",
            animationFillMode: "none, forwards",
            opacity: 0,
          }}
        />
      ))}
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BackgroundPaths() {
  return (
    <>
      <style>{`
        @keyframes pathFlow {
          from { stroke-dashoffset: 0;     }
          to   { stroke-dashoffset: -1000; }
        }
        @keyframes pathFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes sgStop1 {
          0%,100% { stop-color: #FF9500; }
          33%     { stop-color: #AF52DE; }
          66%     { stop-color: #FFE566; }
        }
        @keyframes sgStop2 {
          0%,100% { stop-color: #AF52DE; }
          33%     { stop-color: #FFE566; }
          66%     { stop-color: #FF9500; }
        }
        @keyframes sgStop3 {
          0%,100% { stop-color: #FFE566; }
          33%     { stop-color: #FF9500; }
          66%     { stop-color: #AF52DE; }
        }
        .sg-stop-a { animation: sgStop1 9s ease-in-out infinite; }
        .sg-stop-b { animation: sgStop2 9s ease-in-out infinite; }
        .sg-stop-c { animation: sgStop3 9s ease-in-out infinite; }
      `}</style>

      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0" style={{ zIndex: 0, background: "#ffffff" }} />

        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          <DataStreamPaths />
        </div>

        <GrainOverlay />

        <div
          className="relative w-full max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-[56%_44%] gap-8 items-center"
          style={{ zIndex: 10 }}
        >
          <div />

          <div className="relative hidden lg:flex items-center justify-end pr-4">
            <motion.div
              initial={{ opacity: 0, x: 55, scale: 0.94 }}
              animate={{ opacity: 1, x: 0,  scale: 1    }}
              transition={{ delay: 0.55, duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%", maxWidth: "22rem" }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #f0ede8 0%, #e8e4de 100%)",
                  border: "1.5px dashed #c8c0b8",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  color: "#a09890",
                  userSelect: "none",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.04em" }}>
                  Image placeholder
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
