import Navbar from '@/components/Navbar'
import CursorLight from '@/components/CursorLight'
import Skills from '@/components/Skills'
import ExperienceSection from '@/components/Experience/ExperienceSection'
import ProjectsSection from '@/components/Projects/ProjectsSection'

import GitHubIcon from '@/assets/icons/github.svg?react'
import EmailIcon from '@/assets/icons/email.svg?react'
import LinkedInIcon from '@/assets/icons/linkedin.svg?react'

function App() {
  return (
    <main>
      <Navbar />
      <CursorLight />
      <section className="flex flex-col justify-center h-screen gap-12 md:items-center md:justify-between md:flex-row section-container">
        <div>
          <h1 className="text-4xl font-bold text-white">Mario García Relaño</h1>
          <h2 className="mt-2 text-xl text-white">Programador Full-Stack</h2>
          <p className="max-w-lg mt-4">Me centro en construir <span className='underlined-text'>productos web escalables</span>, con interés en aplicar <span className='underlined-text'>IA y automatización</span> para resolver tareas repetitivas o complejas.</p>
        </div>
        <div className="flex flex-row items-center gap-8 md:flex-col">
          <a href="https://github.com/mgarcia02" target="_blank" rel="noopener noreferrer"><GitHubIcon className="text-white transition-transform duration-1000 w-7 hover:scale-125" /></a>
          <a href="mailto:mariogrdg02@outlook.com"><EmailIcon className="text-white transition-transform duration-1000 w-7 hover:scale-125"/></a>
          <a href="https://www.linkedin.com/in/mario-garcía-relaño-b66878284" target="_blank" rel="noopener noreferrer"><LinkedInIcon className="w-6 text-white transition-transform duration-1000 hover:scale-125"/></a>
        </div>
      </section>
      <Skills />
      <ExperienceSection />
      <ProjectsSection />
      <section id='about' className="section-container">
        <h2 className="mb-12 text-3xl font-bold">Sobre mí</h2>
        <article className="space-y-6">
          <p>
            Soy un desarrollador orientado a la 
            <span className="underlined-text"> creación de aplicaciones web</span>, 
            con un interés por la 
            <span className="underlined-text"> inteligencia artificial</span>. 
            Me motiva explorar cómo la IA puede integrarse en proyectos reales para 
            <span className="underlined-text"> transformar ideas en soluciones funcionales </span> 
            y aportar un valor diferencial.
          </p>
          <p>
            He trabajado con tecnologías como 
            <span className="underlined-text"> React, TypeScript y Node.js</span>, 
            además de integrar bases de datos y servicios externos. 
            Disfruto de los retos que implican 
            <span className="underlined-text"> diseño de arquitectura</span> y 
            <span className="underlined-text"> optimización de procesos</span>.
          </p>
          <p>
            Mi objetivo es seguir desarrollándome como profesional en un entorno donde pueda 
            <span className="underlined-text"> aportar valor al equipo</span>, 
            mantener una actitud de 
            <span className="underlined-text"> aprendizaje continuo</span>. 
            Creo que la 
            <span className="underlined-text"> inteligencia artificial </span> 
            es una herramienta para 
            <span className="underlined-text"> mejorar la vida de las personas </span> 
            y abrir nuevas oportunidades en el desarrollo tecnológico.
          </p>
        </article>
      </section>
    </main>
  )
}

export default App
