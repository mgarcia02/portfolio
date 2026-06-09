import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { NAV_LINKS } from '@/data/portfolioInfo'
import ThemeToggle from '../ui/ThemeToggle'


function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80)
        window.addEventListener('scroll', onScroll, { passive: true })

        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <a href="#hero" className={styles.logo}>
                MG<span className={styles.dot}>.</span>
            </a>

            <ul className={styles.links}>
                {NAV_LINKS.map(({ href, label }) => (
                    <li key={href}>
                        <a href={href} className={styles.link}>{label}</a>
                    </li>
                ))}
            </ul>

            <div className={styles.actions}>
                <ThemeToggle />
                <a href="mailto:mariogrdg02@outlook.com" className={styles.contactBtn}>
                    Contactar →
                </a>
            </div>
        </nav>
    )
}

export default Navbar