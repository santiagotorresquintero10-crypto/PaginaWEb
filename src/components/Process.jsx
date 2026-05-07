import { useState } from 'react'
import { SectionHeader, useReveal } from './ui/SectionHeader.jsx'
import { PhoneIcon, ShieldIcon, ZapIcon, CheckIcon } from './ui/Icons.jsx'
import styles from './Process.module.css'

const STEPS = [
  { num: '01', icon: <PhoneIcon />, title: 'Contacto', desc: 'Nos escribes por WhatsApp, llamada o formulario y te respondemos de inmediato.' },
  { num: '02', icon: <ShieldIcon />, title: 'Diagnóstico', desc: 'Un técnico visita el sitio, evalúa el problema y te presenta un presupuesto claro.' },
  { num: '03', icon: <ZapIcon />, title: 'Solución', desc: 'Ejecutamos el trabajo con materiales de calidad, puntualidad y orden total.' },
  { num: '04', icon: <CheckIcon />, title: 'Seguimiento', desc: 'Te contactamos después para asegurarnos de que todo funcione perfectamente.' },
]

function Step({ num, icon, title, desc, delay }) {
  const { ref, visible } = useReveal()
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref}
      className={`${styles.step} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className={`${styles.circle} ${hov ? styles.circleHov : ''}`}>{num}</div>
      <div className={styles.ico}>{icon}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{desc}</div>
    </div>
  )
}

export default function Process() {
  return (
    <section id="proceso" className={styles.section}>
      <SectionHeader
        label="Proceso"
        title="Así trabajamos"
        sub="Simple, eficiente y transparente. Tu tranquilidad es nuestra prioridad en cada etapa."
        center
      />
      <div className={styles.wrap}>
        <div className={styles.line} />
        <div className={styles.grid}>
          {STEPS.map((s, i) => <Step key={i} {...s} delay={i * 100} />)}
        </div>
      </div>
    </section>
  )
}
