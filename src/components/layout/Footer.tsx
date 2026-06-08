import styles from './Footer.module.css'

export function Footer() {
    return (
        <footer className={styles.footer}>
            <span>
                <span>Mario García</span> · Full Stack Dev
            </span>
            <span>
                Hecho con <span>♥</span> y mucho café · Madrid, ES
            </span>
        </footer>
    )
}