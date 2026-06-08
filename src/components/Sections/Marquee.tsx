import { TECH_MARQUEE } from '@/data/portfolioInfo'
import styles from './Marquee.module.css'

export function Marquee() {
    const doubled = [...TECH_MARQUEE, ...TECH_MARQUEE]

    return (
        <div className={styles.band}>
            <div className={styles.track}>
                {doubled.map(({label, icon: Icon}, i) => (
                    <div className={styles.items}>
                        <Icon className={styles.icon} />
                        <span key={i} className={styles.item}>{label}</span>     
                    </div>
                ))}
            </div>
        </div>
    )
}