import { motion } from 'framer-motion'
import { useReveal } from './ui/SectionHeader.jsx'
import styles from './AboutUs.module.css'

const STATS = [
  { num: '500+', lbl: 'Equipos reparados' },
  { num: '98%',  lbl: 'Satisfacción' },
  { num: '10+',  lbl: 'Años de experiencia' },
  { num: '24/7', lbl: 'Disponibles' },
]

export default function AboutUs() {
  const { ref: leftRef, visible: leftVis } = useReveal()
  const { ref: rightRef, visible: rightVis } = useReveal()

  return (
    <section id="quienes-somos" className={styles.section}>
      <div className={styles.inner}>

        {/* Left: image mockup */}
        <div
          ref={leftRef}
          className={`${styles.imgWrap} ${leftVis ? styles.visible : ''}`}
        >
          <div className={styles.imgCard}>
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=900"
              alt="Técnico trabajando en tablero eléctrico industrial"
              className={styles.img}
            />
            <div className={styles.imgOverlay} />
          </div>

          {/* Floating badge */}
          <div className={styles.floatBadge}>
            <div className={styles.floatBadgeIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <div className={styles.floatBadgeNum}>10+</div>
              <div className={styles.floatBadgeLbl}>Años de experiencia</div>
            </div>
          </div>

          {/* Mini stats */}
          <div className={styles.miniStats}>
            {STATS.slice(0,2).map(s => (
              <div key={s.num} className={styles.miniStat}>
                <span className={styles.miniNum}>{s.num}</span>
                <span className={styles.miniLbl}>{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: text */}
        <div
          ref={rightRef}
          className={`${styles.content} ${rightVis ? styles.visible : ''}`}
        >
          <div className={styles.label}>¿Quiénes Somos?</div>
          <h2 className={styles.title}>
            Expertos en soluciones<br />
            <span className={styles.accent}>eléctricas industriales</span>
          </h2>

          <p className={styles.text}>
            Somos una empresa que se dedica a la prestación de servicios de <strong>mantenimiento industrial</strong>, reparación de tarjetas electrónicas de control (PCB), variadores de frecuencia, puesta en marcha de maquinaria y asistencia en averías eléctricas.
          </p>
          <p className={styles.text}>
            Todo nuestro enfoque está en lograr la <strong>satisfacción de nuestros clientes</strong> brindándoles el mejor servicio con técnicos altamente capacitados y respaldo de fábrica.
          </p>

          <div className={styles.pills}>
            {['Mantenimiento Industrial','Electrónica PCB','Variadores de Frecuencia','Puesta en Marcha','Averías Eléctricas'].map(p => (
              <span key={p} className={styles.pill}>{p}</span>
            ))}
          </div>

          <a href="#contacto" className={styles.btn}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
            Solicitar servicio
          </a>
        </div>

      </div>
    </section>
  )
}
