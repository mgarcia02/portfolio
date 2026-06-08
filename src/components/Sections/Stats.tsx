import { STATS } from '@/data/portfolioInfo'
import styles from './Stats.module.css'

export function Stats() {
    return (
        <div className={styles.band}>
            <div className={styles.stats}>
                {STATS.map(({ prefix, value, suffix, label }) => (
                    <div key={label}>
                        <div className={styles.num}>
                            <span className={styles.accent}>{prefix}</span>{value}<span className={styles.accent}>{suffix}</span>
                        </div>
                        <div className={styles.label}>{label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}