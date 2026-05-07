import { useEffect, useRef, useState } from 'react'
import styles from './SectionHeader.module.css'

// ── Intersection Observer hook for scroll-reveal ──────────────────────────
export function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}

// ── Section label + title + subtitle ─────────────────────────────────────
export function SectionHeader({ label, title, sub, center = false }) {
  const { ref, visible } = useReveal()

  return (
    <div
      ref={ref}
      className={`${styles.wrap} ${center ? styles.center : ''} ${visible ? styles.visible : ''}`}
    >
      <div className={styles.label}>{label}</div>
      <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  )
}
