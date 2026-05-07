import { useEffect, useRef, useState } from 'react'
import { SectionHeader, useReveal } from './ui/SectionHeader.jsx'
import { ClockIcon, ShieldIcon, CheckIcon } from './ui/Icons.jsx'
import styles from './WhyUs.module.css'

function AnimatedCounter({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const { ref, visible } = useReveal(0.4)

  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = target / 55
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setVal(target); clearInterval(timer) }
      else { setVal(Math.floor(start)) }
    }, 22)
    return () => clearInterval(timer)
  }, [visible, target])

  return <div ref={ref} className={styles.statNum}>{val}{suffix}</div>
}

const FEATURES = [
  { icon: <ClockIcon />, title: 'Respuesta en menos de 30 minutos', desc: 'Equipos disponibles en toda la ciudad para atender emergencias eléctricas de inmediato.' },
  { icon: <ShieldIcon />, title: 'Técnicos certificados RETIE', desc: 'Personal con certificaciones vigentes y seguros de responsabilidad civil activos.' },
  { icon: <CheckIcon />, title: 'Garantía de 6 meses', desc: 'Todos nuestros trabajos cuentan con garantía escrita y seguimiento post-servicio incluido.' },
]

const STATS = [
  { target: 500, suffix: '+', label: 'Proyectos completados', accent: false },
  { display: '98%', label: 'Clientes satisfechos', accent: true },
  { display: '10+', label: 'Años de experiencia', accent: false },
  { display: '24/7', label: 'Disponibilidad', accent: false },
]

export default function WhyUs() {
  const { ref: leftRef, visible: leftVis } = useReveal()
  const { ref: rightRef, visible: rightVis } = useReveal()

  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.inner}>
        {/* Left */}
        <div
          ref={leftRef}
          className={`${styles.left} ${leftVis ? styles.visible : ''}`}
        >
          <SectionHeader
            label="¿Por qué elegirnos?"
            title="Confianza respaldada<br/>por resultados"
            sub="Más de una década llevando electricidad segura y confiable a hogares y empresas de Colombia."
          />
          <div className={styles.features}>
            {FEATURES.map((f, i) => (
              <div key={i} className={styles.feat}>
                <div className={styles.featIco}>{f.icon}</div>
                <div>
                  <div className={styles.featTitle}>{f.title}</div>
                  <div className={styles.featDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: stats */}
        <div
          ref={rightRef}
          className={`${styles.statsGrid} ${rightVis ? styles.visible : ''}`}
        >
          {STATS.map((s, i) => (
            <div key={i} className={`${styles.statCard} ${s.accent ? styles.accent : ''}`}>
              {s.target != null
                ? <AnimatedCounter target={s.target} suffix={s.suffix} />
                : <div className={styles.statNum}>{s.display}</div>
              }
              <div className={styles.statLbl}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
