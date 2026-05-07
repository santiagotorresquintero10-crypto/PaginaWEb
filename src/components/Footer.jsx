import { BoltIcon, InstagramIcon, FacebookIcon, TiktokIcon, WhatsAppIcon } from './ui/Icons.jsx'
import styles from './Footer.module.css'

const SOCIALS = [
  { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram', cls: styles.ig },
  { Icon: FacebookIcon,  href: 'https://facebook.com',  label: 'Facebook',  cls: styles.fb },
  { Icon: TiktokIcon,    href: 'https://tiktok.com',    label: 'TikTok',    cls: styles.tk },
  { Icon: WhatsAppIcon,  href: 'https://wa.me/573135935199', label: 'WhatsApp', cls: styles.wa },
]

const COLS = [
  {
    title: 'Servicios',
    links: [
      'Asesoría técnica',
      'Mantenimiento industrial',
      'Variadores de frecuencia',
      'Reparación de PCB',
      'Puesta en marcha',
      'Inspección termográfica',
    ],
  },
  {
    title: 'Empresa',
    links: ['Quiénes Somos','Nuestros Valores','Políticas de Calidad','Proceso','Testimonios'],
  },
  {
    title: 'Contacto',
    links: ['313 593 5199','see.informacion@gmail.com','Colombia','Disponibles 24/7'],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}><BoltIcon /></div>
            <div>
              <div className={styles.logoMain}>SEE</div>
              <div className={styles.logoSub}>Soluciones Eléctricas & Electrónicas</div>
            </div>
          </div>
          <p>Empresa especializada en mantenimiento industrial, reparación electrónica (PCB), variadores de frecuencia y asistencia en averías eléctricas.</p>
          <div className={styles.socials}>
            {SOCIALS.map(({ Icon, href, label, cls }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className={`${styles.socBtn} ${cls}`} title={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {COLS.map(col => (
          <div key={col.title} className={styles.col}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Soluciones Eléctricas & Electrónicas. Todos los derechos reservados.</p>
        <div className={styles.legal}>
          <a href="#">Política de privacidad</a>
          <a href="#">Términos y condiciones</a>
        </div>
      </div>
    </footer>
  )
}
