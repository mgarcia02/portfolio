import styles from "./Hero.module.css"
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Hero() {
    const topRowRef = useScrollReveal<HTMLDivElement>()
    const mainRef   = useScrollReveal<HTMLDivElement>()
    const bottomRowRef   = useScrollReveal<HTMLDivElement>()

    return (
        <section className={styles.hero}>
            <div className={`${styles.gridLine} ${styles.vAccent}`} style={{ left: '30%' }} />
            <div className={`${styles.gridLine} ${styles.v}`} style={{ left: '60%' }} />
            <div className={`${styles.gridLine} ${styles.v}`} style={{ left: '80%' }} />
            <div className={`${styles.gridLine} ${styles.h}`} style={{ top:  '38%' }} />
            
            <div ref={topRowRef} className={`${styles.topRow} reveal`}>
                <span className={styles.tag}>Disponible para trabajar · 2026</span>
                <span className={styles.location}>Madrid, España — Full Stack Dev</span>
            </div>
            <div ref={mainRef} className={`${styles.main} reveal`} style={{ transitionDelay: "0.6s" }}>
                <p className={styles.job}>Full Stack Developer</p>
                <h1 className={styles.title}>Mario<br/><span className={styles.titleAccent}> García.</span></h1>
            </div>
            <div ref={bottomRowRef} className={`${styles.bottomRow} reveal`} style={{ transitionDelay: "1s" }}>
                <p className={styles.desc}>
                    Desarrollador Full Stack enfocado en crear aplicaciones potenciadas por IA.
                    Construyo sistemas claros, eficientes y preparados para escalar.
                </p>
                <div className={styles.info}>
                    <a href="#projects" className={`${styles.btn} ${styles.btnPrimary}`}>
                        Ver proyectos →
                    </a>
                    <a
                        href="https://www.linkedin.com/in/mario-garc%C3%ADa-rela%C3%B1o-b66878284/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.btn} ${styles.btnGhost}`}
                    >
                        LinkedIn ↗
                    </a>
                </div>
            </div>
        </section>
    )
}  
