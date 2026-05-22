"use client";

import { motion } from "framer-motion";

// ─── Blob background ──────────────────────────────────────────────────────────
// Pure CSS radial-gradient blobs with blur + grain — no SVG paths, no glitch.
// Each blob is a fixed-position div that drifts slowly via CSS @keyframes.
// They overlap and their colours mix naturally, creating the aurora effect.
function BlobBackground() {
  return (
    <>
      <style>{`
        @keyframes blob1 {
          0%   { transform: translate(0px,   0px)   scale(1);    filter: blur(80px)  hue-rotate(0deg);   }
          33%  { transform: translate(60px,  -50px) scale(1.12); filter: blur(80px)  hue-rotate(120deg); }
          66%  { transform: translate(-30px,  40px) scale(0.94); filter: blur(80px)  hue-rotate(240deg); }
          100% { transform: translate(0px,   0px)   scale(1);    filter: blur(80px)  hue-rotate(360deg); }
        }
        @keyframes blob2 {
          0%   { transform: translate(0px,  0px)   scale(1);    filter: blur(90px) hue-rotate(60deg);  }
          33%  { transform: translate(-50px, 40px) scale(1.08); filter: blur(90px) hue-rotate(190deg); }
          66%  { transform: translate( 40px,-30px) scale(1.05); filter: blur(90px) hue-rotate(310deg); }
          100% { transform: translate(0px,  0px)   scale(1);    filter: blur(90px) hue-rotate(420deg); }
        }
        @keyframes blob3 {
          0%   { transform: translate(0px, 0px)   scale(1);    filter: blur(70px) hue-rotate(30deg);  }
          50%  { transform: translate(40px,50px)  scale(1.15); filter: blur(70px) hue-rotate(210deg); }
          100% { transform: translate(0px, 0px)   scale(1);    filter: blur(70px) hue-rotate(390deg); }
        }
        @keyframes blob4 {
          0%   { transform: translate(0px,  0px)   scale(1);    filter: blur(100px) hue-rotate(90deg);  }
          40%  { transform: translate(-40px,-20px) scale(1.1);  filter: blur(100px) hue-rotate(240deg); }
          80%  { transform: translate( 20px, 50px) scale(0.92); filter: blur(100px) hue-rotate(390deg); }
          100% { transform: translate(0px,  0px)   scale(1);    filter: blur(100px) hue-rotate(450deg); }
        }
      `}</style>

      {/*
        ── SVG clip defines the flame/cone shape ──────────────────────────
        viewBox 0 0 100 100 so all coords are % of the element size.
        Shape: wide at the top (rocket exhaust base), tapering to a soft
        rounded tip at the bottom — centred horizontally.
      */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="flame-clip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.50,0.00
              C 0.78,0.00  1.00,0.08  1.00,0.22
              C 1.00,0.44  0.88,0.62  0.72,0.76
              C 0.64,0.83  0.57,0.92  0.50,1.00
              C 0.43,0.92  0.36,0.83  0.28,0.76
              C 0.12,0.62  0.00,0.44  0.00,0.22
              C 0.00,0.08  0.22,0.00  0.50,0.00
              Z
            " />
          </clipPath>
        </defs>
      </svg>

      {/* Flame container — centred, clipped to the teardrop/flame path */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -48%)",
        width:  "70vw",
        height: "85vh",
        clipPath: "url(#flame-clip)",
        overflow: "hidden",
      }}>
        {/* Blob 1 — orange / salmon */}
        <div style={{
          position: "absolute",
          top: "5%", left: "15%",
          width: "70%", height: "60%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(255,140,80,0.95) 0%, rgba(255,100,60,0.6) 40%, transparent 70%)",
          animation: "blob1 14s ease-in-out infinite",
          willChange: "transform",
        }} />

        {/* Blob 2 — purple / violet */}
        <div style={{
          position: "absolute",
          top: "20%", left: "5%",
          width: "65%", height: "65%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(160,100,220,0.90) 0%, rgba(120,80,200,0.5) 45%, transparent 70%)",
          animation: "blob2 18s ease-in-out infinite",
          willChange: "transform",
        }} />

        {/* Blob 3 — warm peach */}
        <div style={{
          position: "absolute",
          top: "10%", left: "30%",
          width: "55%", height: "50%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(255,180,120,0.75) 0%, rgba(240,140,100,0.4) 50%, transparent 72%)",
          animation: "blob3 22s ease-in-out infinite",
          willChange: "transform",
        }} />

        {/* Blob 4 — blue accent */}
        <div style={{
          position: "absolute",
          top: "30%", left: "20%",
          width: "55%", height: "55%",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(100,140,255,0.55) 0%, rgba(80,120,240,0.25) 52%, transparent 72%)",
          animation: "blob4 16s ease-in-out infinite",
          willChange: "transform",
        }} />
      </div>

      {/* Grain overlay */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
        opacity: 0.06,
        mixBlendMode: "multiply",
        pointerEvents: "none",
        zIndex: 2,
      }} />
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function VolumetricPaths({
  title = "Human Intelligence. AI Speed.",
}: {
  title?: string;
}) {
  const words = title.split(" ");

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", background: "#f5f2ee" }}
    >
      {/* Blob layer */}
      <BlobBackground />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div
        className="relative w-full max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{ zIndex: 10, minHeight: "100vh" }}
      >
        {/* ── Left: Typography ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full text-xs tracking-widest uppercase"
            style={{
              fontFamily: "'Karla', sans-serif",
              fontWeight: 500,
              background: "rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.10)",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400" />
            </span>
            Human + AI Sales Platform
          </motion.div>

          {/* Headline */}
          <h1
            className="mb-8 tracking-tight leading-[1.02]"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              color: "#0a0a0a",
            }}
          >
            {words.map((word, wi) => (
              <span key={wi} className="inline-block mr-[0.22em] last:mr-0 whitespace-nowrap">
                {word.split("").map((letter, li) => (
                  <motion.span
                    key={`${wi}-${li}`}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.5 + wi * 0.13 + li * 0.032,
                      type: "spring",
                      stiffness: 130,
                      damping: 22,
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.9 }}
            className="mb-10 leading-relaxed max-w-[440px]"
            style={{
              fontFamily: "'Karla', sans-serif",
              fontSize: "1.125rem",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            Your team's instincts, amplified by machine-speed insight.
            Close every deal before the competition knows it's open.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              style={{
                borderRadius: "9999px",
                padding: "0.875rem 2.25rem",
                fontSize: "1rem",
                fontWeight: 700,
                background: "#0a0a0a",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Karla', sans-serif",
                letterSpacing: "-0.01em",
                boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                transition: "box-shadow 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 32px rgba(0,0,0,0.28)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.18)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get Started →
            </button>

            <motion.button
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(0,0,0,0.45)",
                fontFamily: "'Karla', sans-serif",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Watch the demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── Right: Image placeholder ─────────────────────────────────── */}
        <div className="hidden lg:flex items-center justify-end pr-4">
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%", maxWidth: "26rem" }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "4/3",
                borderRadius: "16px",
                background: "rgba(0,0,0,0.04)",
                border: "1.5px dashed rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                color: "rgba(0,0,0,0.25)",
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
  );
}
