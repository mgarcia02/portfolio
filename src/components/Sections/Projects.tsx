import { PROJECTS } from '@/data/portfolioInfo'
import { ProjectCard } from './ProjectCard'
import styles from './Projects.module.css'

export function Projects() {
    return (
        <section id="projects" className={styles.section}>
            <div className={styles.projects}>
                <div className={styles.header}>
                    <div>
                        <p className={styles.sectionLabel}>02 / Proyectos</p>
                        <h2 className={styles.sectionTitle}>Lo que he<br />construido.</h2>
                    </div>
                    <a
                        href="https://github.com/mgarcia02"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ghLink}
                    >
                        Ver todo en GitHub ↗
                    </a>
                </div>

                <div className={styles.grid}>
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}