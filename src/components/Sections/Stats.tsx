import { STATS } from '@/data/portfolioInfo'
import styles from './Stats.module.css'

export function Stats() {
    return (
        <div className={styles.band}>
            <div>
                {STATS.map(({ prefix, value, suffix, label }) => (
                    <div key={label}>
                        <div>
                            <span>{prefix}</span>{value}<span>{suffix}</span>
                        </div>
                        <div>{label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}