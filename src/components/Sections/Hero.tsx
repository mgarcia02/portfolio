import styles from "./Hero.module.css"

export function Hero() {
    return (
        <section className={styles.hero}>
            <div>
                <span>Disponible para trabajar · 2026</span>
                <span>Madrid, España — Full Stack Dev</span>
            </div>
            <div>
                <p>Full Stack Developer</p>
                <h1>Mario<span className={styles.titleAccent}> García.</span></h1>
            </div>
            <div>
                <p>
                    Desarrollador Full Stack especializado en aplicaciones con IA integrada.
                    React, Node.js, TypeScript — arquitectura limpia y código que escala.
                </p>
                <div>
                    <a href="#projects">Ver proyectos →</a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn ↗
                    </a>
                </div>
            </div>
        </section>
    )
}  
