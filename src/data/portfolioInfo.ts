import type { Project, SkillCategory, SocialLink, TechMarquee } from '@/types'

import LinkedInIcon from '@/assets/icons/linkedin.svg?react'
import GitHubIcon from '@/assets/icons/github.svg?react'
import EmailIcon from '@/assets/icons/email.svg?react'
import ReactIcon from '@/assets/icons/react.svg?react'
import TypeScriptIcon from '@/assets/icons/typescript.svg?react'
import VueIcon from '@/assets/icons/vue.svg?react'
import HTMLIcon from '@/assets/icons/html5.svg?react'
import CSSIcon from '@/assets/icons/css.svg?react'
import PythonIcon from '@/assets/icons/python.svg?react'
import MySQLIcon from '@/assets/icons/mysql.svg?react'
import NodeIcon from '@/assets/icons/nodejs.svg?react'
import MongoIcon from '@/assets/icons/mongodb.svg?react'
import SpringIcon from '@/assets/icons/springboot.svg?react'
import GitIcon from '@/assets/icons/git.svg?react'
import DockerIcon from '@/assets/icons/docker.svg?react'
import VSCodeIcon from '@/assets/icons/vscode.svg?react'

export const NAV_LINKS = [
    { href: '#about',    label: '01 / Sobre mí' },
    { href: '#projects', label: '02 / proyectos' },
    { href: '#contact',  label: '03 / contacto' },
]

export const PROJECTS: Project[] = [
    {
        id: 1,
        slug: 'sentiment-dashboard',
        badge: 'LLM · Full Stack',
        title: 'Sentiment Analysis Dashboard',
        description: 'Aplicación full-stack de análisis de sentimientos impulsada por Gemini. Procesa texto en tiempo real para detectar emociones, extraer palabras clave y generar métricas visuales mediante una arquitectura moderna basada en FastAPI y React.',
        features: [
            'Análisis estructurado mediante Gemini con respuesta validada por Pydantic',
            'Detección de emociones, palabras clave y nivel de confianza',
            'Dashboard interactivo con gráficas Radar, Gauge y evolución histórica',
            'Arquitectura desacoplada (router → service → client) preparada para escalar',
        ],
        stack: ['React', 'TypeScript', 'FastAPI', 'Gemini API', 'Recharts', 'Pydantic'],
        githubUrl: 'https://github.com/mgarcia02/sentimentai.git',
    },
    {
        id: 2,
        slug: 'url-shortener',
        badge: 'Full Stack · REST API',
        title: 'URL Shortener Service',
        description: 'Servicio full-stack para generación y gestión de URLs cortas con redirección instantánea, validación de enlaces y arquitectura REST. Diseñado para practicar diseño de APIs, persistencia de datos y flujo completo cliente-servidor.',
        features: [
            'Generación automática de identificadores únicos para enlaces',
            'API REST con validación robusta de entradas y errores',
            'Persistencia de URLs y resolución eficiente de redirecciones',
            'Frontend ligero para creación y gestión de enlaces cortos',
        ],
        stack: ['React', 'TypeScript', 'Node.js','Express', 'MongoDB'],
        githubUrl: 'https://github.com/mgarcia02/url-shortener.git',
    },
    {
        id: 3,
        slug: 'chat-tiempo-real',
        badge: 'Real-Time · Authentication',
        title: 'Chat en Tiempo Real',
        description: 'Aplicación de mensajería en tiempo real basada en WebSockets que permite comunicación instantánea entre usuarios y sincronización bidireccional de eventos. Construida para explorar sistemas reactivos y conexiones persistentes.',
        features: [
            'Comunicación bidireccional en tiempo real mediante Socket.IO',
            'Autenticación y gestión de sesiones con JWT en cookies HTTP-only',
            'Actualización instantánea de mensajes sin recargar la página',
            'Arquitectura cliente-servidor orientada a eventos',
        ],
        stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Socket.IO'],
        githubUrl: 'https://github.com/mgarcia02/chat-tiempo-real.git',
    },
]

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        label: 'Frontend',
        skills: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Vue', 'HTML/CSS'],
    },
    {
        label: 'Backend',
        skills: ['FastAPI', 'Python', 'MySQL', 'Node.js', 'MongoDB', 'Spring Boot'],
    },
    {
        label: 'AI / LLMs',
        skills: ['Gemini API', 'RAG', 'Prompt Eng.', 'NLP'],
    },
    {
        label: 'Herramientas',
        skills: ['Git & GitHub', 'Docker', 'WSL', 'VS Code'],
    },
]

export const SOCIAL_LINKS: SocialLink[] = [
    {
        label: 'GitHub',
        href: 'https://github.com/mgarcia02',
        icon: GitHubIcon,
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/mario-garc%C3%ADa-rela%C3%B1o-b66878284/',
        icon: LinkedInIcon,
    },
    {
        label: 'Email',
        href: 'mailto:mariogrdg02@outlook.com',
        icon: EmailIcon,
    },
]

export const TECH_MARQUEE: TechMarquee[] = [
    { label: 'React', icon: ReactIcon },
    { label: 'TypeScript', icon: TypeScriptIcon },
    { label: 'MySQL', icon: MySQLIcon },
    { label: 'Node.js', icon: NodeIcon },
    { label: 'CSS', icon: CSSIcon },
    { label: 'Python', icon: PythonIcon },
    { label: 'MongoDB', icon: MongoIcon },
    { label: 'Spring Boot', icon: SpringIcon },
    { label: 'Git', icon: GitIcon },
    { label: 'Docker', icon: DockerIcon },
    { label: 'Vue', icon: VueIcon },
    { label: 'HTML', icon: HTMLIcon },
    { label: 'VS Code', icon: VSCodeIcon },
]

export const STATS = [
    { prefix: '', value: '2', suffix: '+', label: 'Proyectos IA' },
    { prefix: '#', value: '1', suffix: '', label: 'Stack: React + FastAPI' },
    { prefix: '', value: '∞', suffix: '', label: 'Líneas de código' },
    { prefix: '', value: '100', suffix: '%', label: 'Open source' },
]
