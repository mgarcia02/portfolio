export interface Project {
    id: number
    slug: string
    badge: string
    title: string
    description: string
    features: string[]
    stack: string[]
    githubUrl: string
    liveUrl?: string
}

export interface ProjectCardProps {
    project: Project
    index: number
}

export interface SkillCategory {
    label: string
    skills: string[]
}

export interface SocialLink {
    label: string
    href: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}
