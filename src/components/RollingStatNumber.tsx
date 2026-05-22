import { useMemo, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type RollingStatNumberProps = {
  value: string
  startDelay?: number
}

type DigitToken = {
  type: 'digit'
  char: string
  digitIndex: number
  totalSteps: number
  sequence: string[]
}

type StaticToken = {
  type: 'static' | 'space'
  char: string
}

type Token = DigitToken | StaticToken

function buildDigitToken(char: string, digitIndex: number, totalDigits: number): DigitToken {
  const digit = Number(char)
  const loops = Math.max(2, totalDigits - digitIndex + 1)
  const totalSteps = loops * 10 + digit
  const sequence = Array.from({ length: totalSteps + 1 }, (_, index) => String(index % 10))

  return {
    type: 'digit',
    char,
    digitIndex,
    totalSteps,
    sequence,
  }
}

export default function RollingStatNumber({ value, startDelay = 0 }: RollingStatNumberProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(rootRef, { once: true, amount: 0.75 })
  const reduceMotion = useReducedMotion()

  const tokens = useMemo<Token[]>(() => {
    const chars = Array.from(value)
    const digitChars = chars.filter((char) => /\d/.test(char))
    let digitIndex = 0

    return chars.map((char) => {
      if (/\d/.test(char)) {
        const token = buildDigitToken(char, digitIndex, digitChars.length)
        digitIndex += 1
        return token
      }

      if (char === ' ') {
        return { type: 'space', char }
      }

      return { type: 'static', char }
    })
  }, [value])

  return (
    <span ref={rootRef} className="rolling-stat" aria-label={value}>
      <span className="rolling-stat__sr-only">{value}</span>
      <span className="rolling-stat__visual" aria-hidden="true">
        {tokens.map((token, index) => {
          if (token.type === 'space') {
            return <span key={`space-${index}`} className="rolling-stat__space" />
          }

          if (token.type === 'static') {
            return (
              <span key={`${token.char}-${index}`} className="rolling-stat__char">
                {token.char}
              </span>
            )
          }

          if (reduceMotion) {
            return (
              <span key={`${token.char}-${index}`} className="rolling-stat__digit-window">
                <span className="rolling-stat__digit-static">{token.char}</span>
              </span>
            )
          }

          const digitToken = token as DigitToken

          return (
            <span key={`${token.char}-${index}`} className="rolling-stat__digit-window">
              <motion.span
                className="rolling-stat__digit-reel"
                initial={{ y: '0em' }}
                animate={isInView ? { y: `-${digitToken.totalSteps}em` } : { y: '0em' }}
                transition={{
                  duration: 1.15,
                  delay: startDelay + digitToken.digitIndex * 0.08,
                  ease: [0.14, 0.94, 0.24, 1],
                }}
              >
                {digitToken.sequence.map((digit: string, reelIndex: number) => (
                  <span key={`${digitToken.digitIndex}-${reelIndex}`} className="rolling-stat__digit">
                    {digit}
                  </span>
                ))}
              </motion.span>
            </span>
          )
        })}
      </span>
    </span>
  )
}
