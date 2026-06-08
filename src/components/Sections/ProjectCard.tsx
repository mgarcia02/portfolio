import type { ProjectCardProps } from '@/types'
import styles from './ProjectCard.module.css'
import { SOCIAL_LINKS } from '@/data/portfolioInfo'

export function ProjectCard({ project, index }: ProjectCardProps) {
    const github = SOCIAL_LINKS.find(s => s.label === 'GitHub')
    if (!github) return null
    const GitHubIcon = github.icon

    return (
        <div className={styles.card}>
            <div className={styles.number}>0{index + 1}</div>
            <div className={styles.badge}>
                <div className={styles.badgeDot} />
                {project.badge}
            </div>

            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.desc}>{project.description}</p>

            <ul className={styles.features}>
                {project.features.map(f => (
                    <li key={f}>{f}</li>
                ))}
            </ul>

            <div className={styles.stack}>
                {project.stack.map(tech => (
                    <span key={tech} className={styles.stackTag}>{tech}</span>
                ))}
            </div>

            <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
            >
                {GitHubIcon && <GitHubIcon />}
                Código fuente
            </a>
        </div>
    )
}