import { motion } from 'framer-motion'

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' color-interpolation-filters='linearRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export default function GradientBeamSection() {
  return (
    <section
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '80vh',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/*
       * ── Blob container ────────────────────────────────────────────────
       * All gradient layers live inside here.
       * mask-image creates a soft elliptical vignette so the blob fades
       * to white instead of hard-clipping — no border-radius needed.
       */}
      <div
        style={{
          position: 'absolute',
          width: '82%',
          height: '78%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          /* Soft-edge mask: opaque center, feathers out to transparent */
          maskImage:
            'radial-gradient(ellipse 50% 50% at 50% 50%, black 38%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0.4) 68%, transparent 84%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 50% 50% at 50% 50%, black 38%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0.4) 68%, transparent 84%)',
          overflow: 'visible',
        }}
      >
        {/* ── Background fill — warm cream inside the blob ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#F4EBE0',
          }}
        />

        {/* ── Layer 1 · Deep red-orange core ────────────────
            Hot centre off-screen lower-left; only the fan is visible. */}
        <motion.div
          animate={{ scale: [1, 1.07, 1], opacity: [0.95, 1, 0.95] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: '-30%',
            bottom: '-25%',
            width: '90%',
            height: '120%',
            background:
              'radial-gradient(ellipse at 18% 78%, #C02C08 0%, #D43A14 14%, #E05224 30%, rgba(224,82,36,0) 62%)',
            filter: 'blur(48px)',
            transform: 'rotate(-6deg)',
            transformOrigin: '18% 78%',
          }}
        />

        {/* ── Layer 2 · Mid orange bloom ──────────────────── */}
        <motion.div
          animate={{ scale: [1, 1.13, 1], opacity: [0.72, 0.9, 0.72] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{
            position: 'absolute',
            left: '-5%',
            top: '5%',
            width: '55%',
            height: '72%',
            background:
              'radial-gradient(ellipse at 22% 55%, #F07038 0%, rgba(240,112,56,0) 62%)',
            filter: 'blur(64px)',
          }}
        />

        {/* ── Layer 3 · Upper warm spill ──────────────────── */}
        <motion.div
          animate={{ x: [0, 16, 0], opacity: [0.45, 0.62, 0.45] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{
            position: 'absolute',
            left: '8%',
            top: '-8%',
            width: '50%',
            height: '58%',
            background:
              'radial-gradient(ellipse, rgba(215,78,32,0.48) 0%, rgba(215,78,32,0) 68%)',
            filter: 'blur(80px)',
          }}
        />

        {/* ── Layer 4 · Amber bridge (orange → purple) ────── */}
        <motion.div
          animate={{ opacity: [0.38, 0.55, 0.38] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{
            position: 'absolute',
            left: '30%',
            top: '18%',
            width: '40%',
            height: '55%',
            background:
              'radial-gradient(ellipse, rgba(200,110,80,0.38) 0%, rgba(200,110,80,0) 60%)',
            filter: 'blur(90px)',
          }}
        />

        {/* ── Layer 5 · Purple atmospheric body ───────────── */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.58, 0.72, 0.58] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{
            position: 'absolute',
            right: '-16%',
            top: '-10%',
            width: '65%',
            height: '88%',
            background:
              'radial-gradient(ellipse at 68% 32%, rgba(128,88,190,0.68) 0%, rgba(148,108,205,0.38) 32%, rgba(128,88,190,0) 66%)',
            filter: 'blur(76px)',
          }}
        />

        {/* ── Layer 6 · Lavender highlight ────────────────── */}
        <motion.div
          animate={{ y: [0, -12, 0], opacity: [0.42, 0.58, 0.42] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          style={{
            position: 'absolute',
            right: '6%',
            top: '2%',
            width: '40%',
            height: '55%',
            background:
              'radial-gradient(ellipse, rgba(188,158,228,0.52) 0%, rgba(188,158,228,0) 58%)',
            filter: 'blur(56px)',
          }}
        />

        {/* ── Layer 7 · Violet lower-right anchor ─────────── */}
        <motion.div
          animate={{ scale: [1, 1.09, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute',
            right: '-6%',
            bottom: '-5%',
            width: '42%',
            height: '52%',
            background:
              'radial-gradient(ellipse at 60% 70%, rgba(110,75,168,0.42) 0%, rgba(110,75,168,0) 62%)',
            filter: 'blur(88px)',
          }}
        />

        {/* ── Grain overlay ───────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: GRAIN,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
            opacity: 0.19,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: GRAIN,
            backgroundRepeat: 'repeat',
            backgroundSize: '384px 384px',
            opacity: 0.08,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
            zIndex: 21,
          }}
        />
      </div>
    </section>
  )
}
