import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import { BoltIcon } from './ui/Icons.jsx'

const links = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Quiénes Somos', href: '#quienes-somos' },
  { label: 'Valores', href: '#valores' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#hero" className={styles.logo}>
          <div className={styles.logoIcon}><BoltIcon /></div>
          <span className={styles.logoText}>
            <span className={styles.logoMain}>SEE</span>
            <span className={styles.logoSub}>Soluciones Eléctricas</span>
          </span>
        </a>

        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a
          href="https://wa.me/573135935199"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          WhatsApp ⚡
        </a>

        <button
          className={`${styles.hamburger} ${open ? styles.open : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Menú"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`${styles.mobileMenu} ${open ? styles.menuOpen : ''}`}>
        {links.map(l => (
          <a key={l.label} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <a
          href="https://wa.me/573135935199"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          onClick={close}
        >
          WhatsApp ⚡
        </a>
      </div>
    </>
  )
}
