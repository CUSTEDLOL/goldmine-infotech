import { useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import heroImg from '@/assets/heropage.png'
import heroMp4 from '@/assets/Goldmine.mp4'
import './Hero.css'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const rise = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

const TAGS = ['Web & Hosting', 'Software', 'Hardware', 'CCTV & Security']

/* ── Video Player ─────────────────────────────────────────── */
function HeroVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { if (v.currentTime === 1 && !playing) v.currentTime = 0; v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }, [playing])

  const toggleMute = useCallback(() => {
    const v = videoRef.current; if (!v) return
    v.muted = !v.muted; setMuted(v.muted)
  }, [])

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current; if (!v || !v.duration) return
    setProgress(v.currentTime / v.duration)
  }, [])

  const onLoadedMetadata = useCallback(() => {
    const v = videoRef.current; if (!v) return
    setDuration(v.duration); v.currentTime = 1
  }, [])

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current; if (!v) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    v.currentTime = ratio * v.duration; setProgress(ratio)
  }, [])

  const fmt = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`

  const revealControls = useCallback(() => {
    setShowControls(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    if (playing) hideTimer.current = setTimeout(() => setShowControls(false), 2800)
  }, [playing])

  return (
    <div className="hero-player" onMouseMove={revealControls} onMouseLeave={() => playing && setShowControls(false)}>
      <video ref={videoRef} src={heroMp4} className="hero-player__video"
        onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setPlaying(false)} onClick={togglePlay} playsInline />

      {!playing && (
        <button className="hero-player__big-play" onClick={togglePlay} aria-label="Play">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7-11-7z" /></svg>
        </button>
      )}

      <div className={`hero-player__bar ${showControls || !playing ? 'hero-player__bar--visible' : ''}`}>
        <div className="hero-player__track" onClick={seek}>
          <div className="hero-player__fill" style={{ width: `${progress * 100}%` }} />
          <div className="hero-player__thumb" style={{ left: `${progress * 100}%` }} />
        </div>
        <div className="hero-player__controls">
          <button className="hero-player__btn" onClick={togglePlay}>
            {playing
              ? <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v14l11-7-11-7z"/></svg>}
          </button>
          <span className="hero-player__time">{fmt(progress * duration)} / {fmt(duration)}</span>
          <div style={{ flex: 1 }} />
          <button className="hero-player__btn" onClick={toggleMute}>
            {muted
              ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
              : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1-3.29-2.5-4.03v8.05c1.5-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>}
          </button>
          <button className="hero-player__btn" onClick={() => videoRef.current?.requestFullscreen()}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.72, 1.0])
  const borderRadius = useTransform(scrollYProgress, [0, 1], [20, 0])

  return (
    <>
      {/* ── Split hero ── */}
      <section className="hero-split">

        {/* Left — copy */}
        <motion.div className="hero-split__left" variants={stagger} initial="hidden" animate="visible">

          <motion.div className="hero-split__badge" variants={rise}>
            <span className="hero-split__badge-dot" />
            Chennai's trusted IT partner · Since 2000
          </motion.div>

          <motion.h1 className="hero-split__headline" variants={rise}>
            Everything your<br />
            business needs.<br />
            <span className="hero-split__accent">Under one roof.</span>
          </motion.h1>

          <motion.p className="hero-split__sub" variants={rise}>
            Web, software, hardware, CCTV and hosting — all from one team in Chennai.
            One call covers it all.
          </motion.p>

          <motion.div className="hero-split__ctas" variants={rise}>
            <a href="tel:+919500036310" className="hero-split__btn-primary">Get a Free Quote</a>
            <a href="https://wa.me/919500036310" target="_blank" rel="noopener noreferrer" className="hero-split__btn-secondary">
              WhatsApp Us
            </a>
          </motion.div>

          <motion.div className="hero-split__tags" variants={rise}>
            {TAGS.map((t) => <span key={t} className="hero-split__tag">{t}</span>)}
          </motion.div>

        </motion.div>

        {/* Right — image */}
        <motion.div
          className="hero-split__right"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={heroImg} alt="" className="hero-split__img" />
        </motion.div>

      </section>

      {/* ── Video below hero ── */}
      <div ref={wrapperRef} className="hero-viz-wrapper">
        <motion.div className="hero-viz" style={{ scale, borderRadius }}
          initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}>
          <HeroVideoPlayer />
        </motion.div>
      </div>
    </>
  )
}
