import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useContactModal } from '../context/ContactModalContext'
import './ContactModal.css'

const BADGE_COLORS: Record<string, string> = {
  purple: '#7c3aed',
  blue: '#2563eb',
  green: '#059669',
  orange: '#ea580c',
  red: '#dc2626',
  default: '#23022e',
}

function CheckIcon() {
  return (
    <svg className="cm-success-icon" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
      <motion.path
        d="M14 26l9 9 15-17"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
      />
    </svg>
  )
}

export default function ContactModal() {
  const { isOpen, config, closeModal } = useContactModal()

  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [phone, setPhone]     = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors]   = useState<{ name?: string; email?: string }>({})

  const nameRef = useRef<HTMLInputElement>(null)

  // Reset form when modal opens with new config
  useEffect(() => {
    if (isOpen && config) {
      setMessage(config.prefillMessage)
      setName('')
      setEmail('')
      setPhone('')
      setErrors({})
      setSuccess(false)
      setLoading(false)
      setTimeout(() => nameRef.current?.focus(), 120)
    }
  }, [isOpen, config])

  // Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, closeModal])

  function validate() {
    const errs: { name?: string; email?: string } = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name, email, phone, message, context: config?.title },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setSuccess(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setErrors({ email: 'Failed to send — please try again or call us directly.' })
    } finally {
      setLoading(false)
    }
  }

  const accentColor = BADGE_COLORS[config?.badgeColor ?? 'default'] ?? BADGE_COLORS.default

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            className="cm-shell"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Contact us"
          >
            {/* Close */}
            <button className="cm-close" onClick={closeModal} aria-label="Close">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>

            {/* Left panel */}
            <div className="cm-left">
              <div className="cm-left-inner">
                <div className="cm-brand-mark">
                  <svg className="cm-brand-icon" viewBox="0 0 28 28" fill="none">
                    <rect width="28" height="28" rx="8" fill="rgba(255,255,255,0.1)" />
                    <path d="M8 14h12M14 8v12" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="cm-brand-name">Goldmine Infotech</span>
                </div>

                {config?.badge && (
                  <span className="cm-badge" style={{ background: `${accentColor}28`, color: accentColor }}>
                    {config.badge}
                  </span>
                )}

                <h2 className="cm-title">{config?.title}</h2>

                {config?.subtitle && (
                  <p className="cm-subtitle">{config.subtitle}</p>
                )}

                <div className="cm-divider" />

                <div className="cm-contact-info">
                  <div className="cm-info-row">
                    <svg className="cm-info-icon" viewBox="0 0 20 20" fill="none">
                      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm0 0l8 5 8-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>contact@gischennai.com</span>
                  </div>
                  <div className="cm-info-row">
                    <svg className="cm-info-icon" viewBox="0 0 20 20" fill="none">
                      <path d="M3.055 6.53C4.22 12.39 7.61 15.78 13.47 16.945l1.803-1.803a1 1 0 011.03-.244c1.126.376 2.346.58 3.597.58a1 1 0 011 1V19a1 1 0 01-1 1C9.612 20 0 10.388 0 1a1 1 0 011-1h3.5a1 1 0 011 1c0 1.254.205 2.474.58 3.6a1 1 0 01-.244 1.03L3.055 6.53z" fill="currentColor" />
                    </svg>
                    <span>+91 95000 36310</span>
                  </div>
                  <div className="cm-info-row">
                    <svg className="cm-info-icon" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" fill="currentColor" />
                    </svg>
                    <span>Chennai, Tamil Nadu</span>
                  </div>
                </div>

                <p className="cm-response-note">Typically responds within 2 hours</p>
              </div>
            </div>

            {/* Right panel */}
            <div className="cm-right">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    className="cm-success"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckIcon />
                    <h3 className="cm-success-title">We'll be in touch!</h3>
                    <p className="cm-success-sub">
                      Our team has received your message and will get back to you within 2 hours.
                    </p>
                    <button className="cm-success-close" onClick={closeModal}>
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="cm-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                  >
                    <div className="cm-form-header">
                      <p className="cm-form-label">Your details</p>
                      <p className="cm-form-hint">We'll never share your information.</p>
                    </div>

                    <div className="cm-field">
                      <label className="cm-label" htmlFor="cm-name">Full Name</label>
                      <input
                        ref={nameRef}
                        id="cm-name"
                        className={`cm-input${errors.name ? ' cm-input--error' : ''}`}
                        type="text"
                        placeholder="Rajesh Kumar"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })) }}
                        autoComplete="name"
                      />
                      {errors.name && <span className="cm-error">{errors.name}</span>}
                    </div>

                    <div className="cm-row">
                      <div className="cm-field">
                        <label className="cm-label" htmlFor="cm-email">Email</label>
                        <input
                          id="cm-email"
                          className={`cm-input${errors.email ? ' cm-input--error' : ''}`}
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })) }}
                          autoComplete="email"
                        />
                        {errors.email && <span className="cm-error">{errors.email}</span>}
                      </div>
                      <div className="cm-field">
                        <label className="cm-label" htmlFor="cm-phone">Phone <span className="cm-optional">(optional)</span></label>
                        <input
                          id="cm-phone"
                          className="cm-input"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div className="cm-field">
                      <label className="cm-label" htmlFor="cm-message">Message</label>
                      <textarea
                        id="cm-message"
                        className="cm-textarea"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`cm-submit${loading ? ' cm-submit--loading' : ''}`}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="cm-spinner" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg className="cm-submit-arrow" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
