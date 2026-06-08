import { TECH_MARQUEE } from '@/data/portfolioInfo'
import styles from './Marquee.module.css'

export function Marquee() {
    const doubled = [...TECH_MARQUEE, ...TECH_MARQUEE]

    return (
        <div className={styles.band}>
            <div className={styles.track}>
                {doubled.map((item, i) => (
                    <span key={i}>{item}</span>
                ))}
            </div>
        </div>
    )
}