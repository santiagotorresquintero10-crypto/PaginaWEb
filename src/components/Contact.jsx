import { useState } from 'react'
import { useReveal } from './ui/SectionHeader.jsx'
import {
  PhoneIcon, ClockIcon, MapPinIcon, SendIcon,
  InstagramIcon, FacebookIcon, TiktokIcon, WhatsAppIcon
} from './ui/Icons.jsx'
import styles from './Contact.module.css'

const SOCIALS = [
  { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram', cls: styles.ig },
  { Icon: FacebookIcon,  href: 'https://facebook.com',  label: 'Facebook',  cls: styles.fb },
  { Icon: TiktokIcon,    href: 'https://tiktok.com',    label: 'TikTok',    cls: styles.tk },
  { Icon: WhatsAppIcon,  href: 'https://wa.me/573135935199', label: 'WhatsApp', cls: styles.wa },
]

function FormField({ label, type = 'text', placeholder, textarea, options }) {
  const [focused, setFocused] = useState(false)
  const base = `${styles.input} ${focused ? styles.focused : ''}`
  return (
    <div className={styles.fGroup}>
      <label>{label}</label>
      {textarea
        ? <textarea rows={4} placeholder={placeholder} className={base} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
        : options
        ? (
          <select className={base} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
            <option value="">Selecciona un servicio…</option>
            {options.map(o => <option key={o}>{o}</option>)}
          </select>
        )
        : <input type={type} placeholder={placeholder} className={base} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      }
    </div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const { ref: lRef, visible: lVis } = useReveal()
  const { ref: rRef, visible: rVis } = useReveal()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }

  const serviceOptions = [
    'Asesoría técnica',
    'Maquinaria y puesta en marcha',
    'Mantenimiento de equipos industriales',
    'Adecuaciones eléctricas',
    'Variadores de frecuencia',
    'Fuentes de alimentación industriales',
    'Modificación de tarjetas electrónicas',
    'Asistencia técnica en averías',
    'Reparación de tarjetas de control (PCB)',
    'Suministro de componentes eléctricos',
    'Inspección termográfica',
    'Otro',
  ]

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.inner}>
        {/* Left */}
        <div ref={lRef} className={`${styles.info} ${lVis ? styles.visible : ''}`}>
          <div className={styles.label}>Contacto</div>
          <h2 className={styles.title}>¿Listo para empezar?</h2>
          <p className={styles.sub}>
            Cuéntanos tu necesidad y te respondemos a la brevedad. Atención personalizada para tu empresa o industria.
          </p>

          {[
            { Icon: PhoneIcon,  label: 'WhatsApp / Teléfono', val: '313 593 5199' },
            { Icon: () => (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              ), label: 'Correo electrónico', val: 'see.informacion@gmail.com' },
            { Icon: ClockIcon,  label: 'Horario',    val: 'Disponibles 24/7' },
            { Icon: MapPinIcon, label: 'Ubicación',  val: 'Colombia' },
          ].map(({ Icon, label, val }) => (
            <div key={label} className={styles.detail}>
              <div className={styles.detailIco}><Icon /></div>
              <div>
                <div className={styles.detailLbl}>{label}</div>
                <div className={styles.detailVal}>{val}</div>
              </div>
            </div>
          ))}

          <div className={styles.socialsLabel}>Síguenos en redes</div>
          <div className={styles.socials}>
            {SOCIALS.map(({ Icon, href, label, cls }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className={`${styles.socBtn} ${cls}`} title={label}>
                <Icon />
              </a>
            ))}
          </div>

          <div className={styles.mapWrap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46596818944!2d-75.7312!3d6.2442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8468b1a32bda7e79%3A0xeb8aa9f3a50ef90!2sMedell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1600000000000!5m2!1ses!2sco"
              title="Mapa Colombia"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Right form */}
        <div ref={rRef} className={`${styles.formWrap} ${rVis ? styles.visible : ''}`}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <FormField label="Nombre" placeholder="Tu nombre completo" />
              <FormField label="Teléfono" type="tel" placeholder="313 000 0000" />
            </div>
            <FormField label="Correo electrónico" type="email" placeholder="tu@correo.com" />
            <FormField label="Tipo de servicio" options={serviceOptions} />
            <FormField label="Mensaje" placeholder="Cuéntanos el problema o necesidad técnica…" textarea />
            <button type="submit" className={`${styles.submit} ${sent ? styles.sent : ''}`}>
              {sent
                ? <><CheckSVG /> ¡Mensaje enviado!</>
                : <><SendIcon /> Enviar mensaje</>
              }
            </button>
            <p className={styles.note}>Te respondemos a la brevedad ⚡</p>
          </form>
        </div>
      </div>
    </section>
  )
}

function CheckSVG() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  )
}
