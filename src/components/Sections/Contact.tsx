import styles from './Contact.module.css'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Contact() {
    const titleRef = useScrollReveal<HTMLHeadingElement>()
    const subRef   = useScrollReveal<HTMLParagraphElement>()
    const contactRef   = useScrollReveal<HTMLDivElement>()

    return (
        <div className={styles.wrapper}>
            <section id="contact" className={styles.section}>
                <p className={styles.sectionLabel}>03 / Contacto</p>
                <h2 ref={titleRef} className={`${styles.title} reveal`}>
                    ¿Construimos<br />
                    algo <span className={styles.outline}>juntos?</span>
                </h2>
                <p ref={subRef} className={`${styles.sub} reveal`}>
                    Abierto a nuevas oportunidades, colaboraciones y proyectos interesantes.
                    Si tienes una idea o quieres hablar, escríbeme.
                </p>

                <div ref={contactRef} className={`${styles.contact} reveal`}>
                    <a href="mailto:mariogrdg02@outlook.com" className={`${styles.btn} ${styles.btnPrimary}`}>
                        mariogrdg02@outlook.com →
                    </a>
                    <a
                        href="https://www.linkedin.com/in/mario-garc%C3%ADa-rela%C3%B1o-b66878284/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.btn} ${styles.btnGhost}`}
                    >
                        LinkedIn ↗
                    </a>
                </div>
            </section>
        </div>
    )
}
