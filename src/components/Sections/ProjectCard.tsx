import type { ProjectCardProps } from '@/types'
import styles from './ProjectCard.module.css'
import { SOCIAL_LINKS } from '@/data/portfolioInfo'

export function ProjectCard({ project, index }: ProjectCardProps) {
    const github = SOCIAL_LINKS.find(s => s.label === 'GitHub')
    if (!github) return null
    const GitHubIcon = github.icon

    return (
        <div className={styles.card}>
            <div>0{index + 1}</div>
            <div>
                {project.badge}
            </div>

            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <ul>
                {project.features.map(f => (
                    <li key={f}>{f}</li>
                ))}
            </ul>

            <div>
                {project.stack.map(tech => (
                    <span key={tech}>{tech}</span>
                ))}
            </div>

            <div>
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {GitHubIcon && <GitHubIcon />}
                    Código fuente
                </a>
                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Demo ↗
                    </a>
                )}
            </div>
        </div>
    )
}