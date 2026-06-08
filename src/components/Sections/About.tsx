import { SKILL_CATEGORIES, SOCIAL_LINKS } from '@/data/portfolioInfo'
import styles from './About.module.css'

export function About() {
    return (
        <section id="about" className={styles.section}>
            <div className={styles.grid}>
                <div className={styles.text}>
                    <p className={styles.sectionLabel}>01 / Sobre mí</p>
                    <h2 className={styles.sectionTitle}>
                        Donde el<br />
                        código <em className={styles.accentWord}>piensa</em>.
                    </h2>
                    <p>
                        Soy desarrollador <strong>Full Stack</strong> con background en IA, apasionado
                        por construir aplicaciones donde la inteligencia artificial deja de ser un
                        buzzword y se convierte en valor real para el usuario.
                    </p>
                    <p>
                        Mi stack principal gira en torno a <strong>React + TypeScript</strong> en el
                        frontend y <strong>Node.js + Python</strong> en el backend, con integración de
                        modelos de lenguaje grandes en aplicaciones reales.
                    </p>
                    <p>
                        Me obsesiona la <strong>arquitectura limpia</strong>: código modular, patrones
                        bien aplicados y proyectos que escalan sin deuda técnica.
                    </p>

                    <div className={styles.links}>
                        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('mailto') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                className={styles.linkChip}
                            >
                                <Icon />
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className={styles.skillsGrid}>
                    {SKILL_CATEGORIES.map(({ label, skills }) => (
                        <div key={label} className={styles.skillCard}>
                            <p className={styles.skillLabel}>{label}</p>
                            <div className={styles.skillTags}>
                                {skills.map(skill => (
                                    <span key={skill} className={styles.skillTag}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}