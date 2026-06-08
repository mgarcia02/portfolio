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
                    Desarrollador Full Stack especializado en aplicaciones con IA integrada.
                    React, Node.js, TypeScript — arquitectura limpia y código que escala.
                </p>
                <div className={styles.info}>
                    <a href="#projects" className={`${styles.btn} ${styles.btnPrimary}`}>
                        Ver proyectos →
                    </a>
                    <a
                        href="#"
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
