import { motion } from 'framer-motion'

interface Props {
  height?: number | string
  width?: string
  dark?: boolean
  style?: React.CSSProperties
  className?: string
}

const GridIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
)

export default function VisualPlaceholder({ height = 400, width = '100%', dark = false, style, className }: Props) {
  return (
    <motion.div
      className={`vp${dark ? ' dark' : ''}${className ? ` ${className}` : ''}`}
      style={{ height, width, ...style }}
    >
      <div className="vp-icon">
        <GridIcon />
      </div>
      Visual Missing
    </motion.div>
  )
}
