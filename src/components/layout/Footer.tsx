import styles from './Footer.module.css'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <span className={styles.text}>
                <span className={styles.accent}>Mario García</span> · Full Stack Dev
            </span>
            <span className={styles.text}>
                Hecho con <span className={styles.accent}>♥</span> y mucho café · Madrid, ES
            </span>
        </footer>
    )
}