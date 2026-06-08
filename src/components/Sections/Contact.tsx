import styles from './Contact.module.css'

export function Contact() {
    return (
        <div className={styles.wrapper}>
            <section id="contact" className={styles.section}>
                <p className={styles.sectionLabel}>03 / Contacto</p>
                <h2 className={styles.title}>
                    ¿Construimos<br />
                    algo <span className={styles.outline}>juntos?</span>
                </h2>
                <p className={styles.sub}>
                    Abierto a nuevas oportunidades, colaboraciones y proyectos interesantes.
                    Si tienes una idea o quieres hablar, escríbeme.
                </p>

                <div className={styles.contact}>
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
