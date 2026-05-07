import { useReveal } from './ui/SectionHeader.jsx'
import AnimatedFolder from './ui/FolderCard.jsx'
import styles from './Services.module.css'

// Unsplash images for each service category
const SERVICES = [
  {
    title: 'Asesoría Técnica',
    color: '#F5C400',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    items: [
      { id: 'a1', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800', title: 'Diagnóstico Industrial' },
      { id: 'a2', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800', title: 'Análisis de Fallas' },
      { id: 'a3', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800', title: 'Consultoría Técnica' },
    ],
  },
  {
    title: 'Maquinaria & Puesta en Marcha',
    color: '#3B82F6',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    items: [
      { id: 'm1', image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&q=80&w=800', title: 'Puesta en Marcha CNC' },
      { id: 'm2', image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800', title: 'Configuración Máquinas' },
      { id: 'm3', image: 'https://images.unsplash.com/photo-1611534581280-b00e1b6f2d61?auto=format&fit=crop&q=80&w=800', title: 'Arranque de Equipos' },
    ],
  },
  {
    title: 'Mantenimiento Industrial',
    color: '#22C55E',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    items: [
      { id: 'mt1', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800', title: 'Mantenimiento Preventivo' },
      { id: 'mt2', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800', title: 'Mantenimiento Correctivo' },
      { id: 'mt3', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800', title: 'Inspección Eléctrica' },
    ],
  },
  {
    title: 'Variadores de Frecuencia',
    color: '#A855F7',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    items: [
      { id: 'v1', image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800', title: 'Diagnóstico Variador' },
      { id: 'v2', image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800', title: 'Reparación VFD' },
      { id: 'v3', image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=800', title: 'Parametrización' },
    ],
  },
  {
    title: 'Reparación de PCB',
    color: '#F97316',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    items: [
      { id: 'p1', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', title: 'Tarjetas de Control' },
      { id: 'p2', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800', title: 'Reparación SMD' },
      { id: 'p3', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800', title: 'Fuentes Industriales' },
    ],
  },
  {
    title: 'Inspección Termográfica',
    color: '#EF4444',
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>,
    items: [
      { id: 't1', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800', title: 'Análisis Térmico' },
      { id: 't2', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800', title: 'Detección de Fallas' },
      { id: 't3', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800', title: 'Reporte Termográfico' },
    ],
  },
]

// Additional services as simple list cards
const EXTRA_SERVICES = [
  'Adecuaciones eléctricas en maquinaria e infraestructura',
  'Fuentes de alimentación industriales',
  'Modificación en serie de tarjetas electrónicas',
  'Asistencia técnica en averías',
  'Suministro de componentes eléctricos y electrónicos de difícil consecución',
]

export default function Services() {
  const { ref, visible } = useReveal()

  return (
    <section id="servicios" className={styles.section}>
      <div ref={ref} className={`${styles.header} ${visible ? styles.headerVisible : ''}`}>
        <div className={styles.label}>Servicios</div>
        <h2 className={styles.title}>Soluciones integrales<br/>para la industria</h2>
        <p className={styles.sub}>
          Hover sobre cada carpeta para ver ejemplos de trabajos.
          Haz clic en las imágenes para verlas en detalle.
        </p>
      </div>

      {/* 3D Folder grid */}
      <div className={styles.folderGrid}>
        {SERVICES.map(s => (
          <AnimatedFolder key={s.title} title={s.title} items={s.items} color={s.color} icon={s.icon} />
        ))}
      </div>

      {/* Extra services list */}
      <div className={styles.extraWrap}>
        <div className={styles.extraTitle}>Servicios adicionales</div>
        <div className={styles.extraGrid}>
          {EXTRA_SERVICES.map(s => (
            <div key={s} className={styles.extraItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5C400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
