import { SKILL_CATEGORIES, SOCIAL_LINKS } from '@/data/portfolioInfo'
import styles from './About.module.css'

export function About() {
    return (
        <section id="about" className={styles.section}>
            <div>
                <div>
                    <p>01 / Sobre mí</p>
                    <h2>
                        Donde el<br />
                        código <em>piensa</em>.
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

                    <div>
                        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('mailto') ? undefined : '_blank'}
                                rel="noopener noreferrer"
                            >
                                <Icon />
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    {SKILL_CATEGORIES.map(({ label, skills }) => (
                        <div key={label}>
                            <p>{label}</p>
                            <div>
                                {skills.map(skill => (
                                    <span key={skill}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}