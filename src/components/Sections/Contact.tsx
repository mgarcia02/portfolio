import styles from './Contact.module.css'

export function Contact() {
    return (
        <div className={styles.wrapper}>
            <section id="contact" className={styles.section}>
                <p>03 / Contacto</p>
                <h2>
                    ¿Construimos<br />
                    algo <span>juntos?</span>
                </h2>
                <p>
                    Abierto a nuevas oportunidades, colaboraciones y proyectos interesantes.
                    Si tienes una idea o quieres hablar, escríbeme.
                </p>

                <div>
                    <a href="mailto:mariogrdg02@outlook.com">
                        mariogrdg02@outlook.com →
                    </a>
                    <a
                        href="https://www.linkedin.com/in/mario-garc%C3%ADa-rela%C3%B1o-b66878284/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn ↗
                    </a>
                </div>
            </section>
        </div>
    )
}
