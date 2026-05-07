import { useState } from 'react'
import { useReveal } from './ui/SectionHeader.jsx'
import styles from './Values.module.css'

const VALUES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Seguridad',
    desc: 'Garantizamos que los equipos cumplan con los estándares de calidad para cuidar la integridad de los usuarios.',
    color: '#F5C400',
    bg: 'rgba(245,196,0,0.08)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Disponibilidad',
    desc: 'Brindamos un servicio personalizado para atender las necesidades de nuestros clientes, logrando el funcionamiento ininterrumpido de los equipos.',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'Confiabilidad',
    desc: 'Realizamos el mantenimiento con técnicos especializados, certificados y con respaldo de fábrica.',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
  },
]

function ValueCard({ icon, title, desc, color, bg, delay }) {
  const { ref, visible } = useReveal()
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Top accent line */}
      <div className={styles.topLine} style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, transform: hov ? 'scaleX(1)' : 'scaleX(0)' }} />

      <div className={styles.iconWrap} style={{ background: hov ? color : bg, border: `1px solid ${hov ? color : color + '33'}` }}>
        <div style={{ color: hov ? '#111' : color }}>{icon}</div>
      </div>

      <h3 className={styles.title} style={{ color: hov ? color : '#fff' }}>{title}</h3>
      <p className={styles.desc}>{desc}</p>

      {/* Large bg number */}
      <div className={styles.bgNum} style={{ color: color + '08' }}>0{VALUES.findIndex(v => v.title === title) + 1}</div>
    </div>
  )
}

export default function Values() {
  const { ref, visible } = useReveal()

  return (
    <section id="valores" className={styles.section}>
      <div
        ref={ref}
        className={`${styles.header} ${visible ? styles.headerVisible : ''}`}
      >
        <div className={styles.label}>Nuestros Valores</div>
        <h2 className={styles.sectionTitle}>Lo que nos define</h2>
        <p className={styles.sub}>Estos valores guían cada trabajo que realizamos y representan nuestras creencias fundamentales.</p>
      </div>

      <div className={styles.grid}>
        {VALUES.map((v, i) => (
          <ValueCard key={v.title} {...v} delay={i * 100} />
        ))}
      </div>
    </section>
  )
}
