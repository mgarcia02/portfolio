import { TECH_MARQUEE } from '@/data/portfolioInfo'
import styles from './Marquee.module.css'

export function Marquee() {
    const doubled = [...TECH_MARQUEE, ...TECH_MARQUEE]

    return (
        <div className={styles.band}>
            <div className={styles.track}>
                {doubled.map(({label, icon: Icon}, i) => (
                    <div key={i} className={styles.item}>
                        <Icon className={styles.icon} />
                        <span>{label}</span>     
                    </div>
                ))}
            </div>
        </div>
    )
}