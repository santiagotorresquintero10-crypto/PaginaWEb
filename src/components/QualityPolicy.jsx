import { useReveal } from './ui/SectionHeader.jsx'
import styles from './QualityPolicy.module.css'

const POINTS = [
  {
    num: '01',
    text: 'Analizamos todas las situaciones para ofrecer servicios integrales que garanticen tranquilidad en los procesos de manufactura de nuestros clientes, evitando fallas en equipos y maquinaria.',
  },
  {
    num: '02',
    text: 'Es nuestra política brindar servicios con honestidad, puntualidad y discreción.',
  },
  {
    num: '03',
    text: 'Nuestros valores influyen en la forma como trabajamos y representan nuestras creencias fundamentales.',
  },
]

export default function QualityPolicy() {
  const { ref: headRef, visible: headVis } = useReveal()

  return (
    <section id="calidad" className={styles.section}>
      {/* Background decorative line */}
      <div className={styles.bgLine} />

      <div className={styles.inner}>
        {/* Left: title + image */}
        <div className={styles.left}>
          <div
            ref={headRef}
            className={`${styles.headWrap} ${headVis ? styles.headVisible : ''}`}
          >
            <div className={styles.label}>Políticas de Calidad</div>
            <h2 className={styles.title}>
              Comprometidos con<br />
              <span className={styles.accent}>la excelencia</span>
            </h2>
            <p className={styles.intro}>
              Nuestro sistema de gestión de calidad garantiza que cada intervención técnica cumpla con los más altos estándares del sector industrial.
            </p>
          </div>

          <div className={styles.imgCard}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=700"
              alt="Técnico certificado en planta industrial"
              className={styles.img}
            />
            <div className={styles.imgOverlay} />
            <div className={styles.imgBadge}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Calidad Certificada</span>
            </div>
          </div>
        </div>

        {/* Right: policy points */}
        <div className={styles.points}>
          {POINTS.map((p, i) => (
            <PolicyPoint key={p.num} {...p} delay={i * 120} />
          ))}

          <div className={styles.quoteCard}>
            <div className={styles.quoteIcon}>"</div>
            <p className={styles.quoteText}>
              La honestidad, puntualidad y discreción son los pilares que sostienen cada uno de nuestros servicios.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function PolicyPoint({ num, text, delay }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`${styles.point} ${visible ? styles.pointVisible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.pointNum}>{num}</div>
      <div className={styles.pointContent}>
        <div className={styles.pointBar} />
        <p className={styles.pointText}>{text}</p>
      </div>
    </div>
  )
}
