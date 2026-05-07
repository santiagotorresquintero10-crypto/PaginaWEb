import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionHeader, useReveal } from './ui/SectionHeader.jsx'
import { ShuffleIcon } from './ui/Icons.jsx'
import styles from './Testimonials.module.css'

const DATA = [
  { id: 3,  name: 'Carlos Martínez',  role: 'Propietario · Restaurante El Rincón',  text: 'Llamé a las 11 PM por un cortocircuito y en 25 minutos llegó el técnico. Solucionó todo rápidamente y con un profesionalismo increíble.' },
  { id: 7,  name: 'Laura Rodríguez',  role: 'Gerente · Consultora TechHub',          text: 'Excelente servicio de cableado estructurado para nuestra oficina. Trabajo limpio, organizado y con toda la documentación técnica. 100% recomendados.' },
  { id: 12, name: 'Miguel A. Torres', role: 'Administrador · Torres del Norte',       text: 'Llevamos 3 años con su plan de mantenimiento preventivo y nunca hemos tenido una sola falla eléctrica. Una empresa de confianza total.' },
]

function TestimonialCard({ t, position, onShuffle }) {
  const dragX = useRef(0)
  const isFront = position === 'front'

  const transforms = {
    front:  { rotate: '-5deg',  x: '0%',   zIndex: 3 },
    middle: { rotate: '0deg',   x: '22%',  zIndex: 2 },
    back:   { rotate: '5deg',   x: '44%',  zIndex: 1 },
  }

  return (
    <motion.div
      className={`${styles.card} ${isFront ? styles.front : ''}`}
      animate={transforms[position]}
      transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e) => { dragX.current = e.clientX }}
      onDragEnd={(e) => {
        if (dragX.current - e.clientX > 110) onShuffle()
        dragX.current = 0
      }}
      style={{ zIndex: transforms[position].zIndex }}
    >
      <div className={styles.stars}>★★★★★</div>
      <div className={styles.quote}>"</div>
      <p className={styles.text}>{t.text}</p>
      <div className={styles.foot}>
        <img
          className={styles.avatar}
          src={`https://i.pravatar.cc/80?img=${t.id}`}
          alt={t.name}
        />
        <div>
          <div className={styles.name}>{t.name}</div>
          <div className={styles.role}>{t.role}</div>
        </div>
      </div>
      {isFront && <div className={styles.hint}>← desliza</div>}
    </motion.div>
  )
}

export default function Testimonials() {
  const [positions, setPositions] = useState(['front', 'middle', 'back'])
  const { ref, visible } = useReveal()

  const shuffle = () =>
    setPositions(prev => { const n = [...prev]; n.unshift(n.pop()); return n })

  return (
    <section id="testimonios" className={styles.section}>
      <div className={styles.inner}>
        {/* Left */}
        <div
          ref={ref}
          className={`${styles.left} ${visible ? styles.visible : ''}`}
        >
          <SectionHeader
            label="Testimonios"
            title="Lo que dicen<br/>nuestros clientes"
          />
          <p className={styles.sub}>
            Más de 500 proyectos con 98% de satisfacción. Lee las experiencias
            reales de quienes confían en Soluciones Eléctricas & Electrónicas.
          </p>
          <div className={styles.avatarRow}>
            {[3, 7, 12, 18, 25].map((id, i) => (
              <img
                key={id}
                src={`https://i.pravatar.cc/40?img=${id}`}
                alt="cliente"
                className={styles.mini}
                style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 5 - i }}
              />
            ))}
            <span className={styles.avatarLbl}>+500 clientes satisfechos</span>
          </div>
          <button className={styles.shuffleBtn} onClick={shuffle}>
            <ShuffleIcon /> Ver siguiente
          </button>
        </div>

        {/* Right: card stack */}
        <div className={styles.stackWrap}>
          <div className={styles.stack}>
            {DATA.map((t, i) => (
              <TestimonialCard
                key={t.id} t={t}
                position={positions[i]}
                onShuffle={shuffle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
