import { PROJECTS } from '@/data/portfolioInfo'
import { ProjectCard } from './ProjectCard'
import styles from './Projects.module.css'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Projects() {
    const headerRef = useScrollReveal<HTMLDivElement>()
    const gridRef   = useScrollReveal<HTMLDivElement>()

    return (
        <section id="projects" className={styles.section}>
            <div className={styles.projects}>
                <div ref={headerRef} className={`${styles.header} reveal`}>
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

                <div ref={gridRef} className={`${styles.grid} reveal`}>
                    {PROJECTS.map((project, i) => (
                        <ProjectCard key={project.id} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}