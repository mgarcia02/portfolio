import styles from "./Hero.module.css"

export function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.topRow}>
                <span className={styles.tag}>Disponible para trabajar · 2026</span>
                <span className={styles.location}>Madrid, España — Full Stack Dev</span>
            </div>
            <div className={styles.main}>
                <p className={styles.job}>Full Stack Developer</p>
                <h1 className={styles.title}>Mario<br/><span className={styles.titleAccent}> García.</span></h1>
            </div>
            <div className={styles.bottomRow}>
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
