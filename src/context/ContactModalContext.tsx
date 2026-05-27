import { createContext, useContext, useState, ReactNode } from 'react'

export interface ContactConfig {
  badge?: string
  badgeColor?: string
  title: string
  subtitle?: string
  prefillMessage: string
}

interface ModalCtx {
  isOpen: boolean
  config: ContactConfig | null
  openModal: (config: ContactConfig) => void
  closeModal: () => void
}

const ContactModalContext = createContext<ModalCtx | null>(null)

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<ContactConfig | null>(null)

  function openModal(cfg: ContactConfig) {
    setConfig(cfg)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <ContactModalContext.Provider value={{ isOpen, config, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext)
  if (!ctx) throw new Error('useContactModal must be used within ContactModalProvider')
  return ctx
}
