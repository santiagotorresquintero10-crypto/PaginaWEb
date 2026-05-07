import { WhatsAppIcon } from './ui/Icons.jsx'
import styles from './WhatsAppFloat.module.css'

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/573135935199"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.btn}
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  )
}
