import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import { ArrowIcon, PhoneIcon } from './ui/Icons.jsx'

const Spline = lazy(() => import('@splinetool/react-spline'))

function AceternitySpotlight() {
  return (
    <svg
      className={styles.spotlight}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#acFilter)">
        <ellipse
          cx="1924.71" cy="273.501"
          rx="1924.71" ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill="#F5C400"
          fillOpacity="0.2"
        />
      </g>
      <defs>
        <filter
          id="acFilter"
          x="0.860352" y="0.838989"
          width="3785.16" height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  )
}

function SplineLoader() {
  return (
    <div className={styles.splineLoader}>
      <div className={styles.spinRing} />
      <p>Cargando escena 3D…</p>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className={styles.section}>
      <div className={styles.pageGlow} />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <AceternitySpotlight />

        {/* Single chip — Servicio garantizado */}
        <div className={`${styles.chip} ${styles.chip2}`}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          Servicio garantizado
        </div>

        {/* Left: text */}
        <div className={styles.left}>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className={styles.badgeDot} />
            Servicio Industrial Premium
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Soluciones<br />Eléctricas &<br />
            <span className={styles.accent}>Electrónicas</span>
          </motion.h1>

          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Mantenimiento industrial, reparación de tarjetas electrónicas (PCB),
            variadores de frecuencia y asistencia en averías eléctricas.
          </motion.p>

          <motion.div
            className={styles.btns}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a href="#servicios" className={styles.btnPrimary}>
              <ArrowIcon /> Ver servicios
            </a>
            <a href="#contacto" className={styles.btnGhost}>
              <PhoneIcon /> Contáctanos
            </a>
          </motion.div>
        </div>

        {/* Right: Spline 3D */}
        <div className={styles.right}>
          <Suspense fallback={<SplineLoader />}>
            <Spline
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className={styles.spline}
            />
          </Suspense>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className={styles.statsRow}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.7 }}
      >
        {[
          { num: '500+', lbl: 'Equipos reparados' },
          { num: '98%',  lbl: 'Clientes satisfechos' },
          { num: '10+',  lbl: 'Años de experiencia' },
          { num: '24/7', lbl: 'Disponibilidad' },
        ].map(s => (
          <div key={s.num} className={styles.stat}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLbl}>{s.lbl}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
