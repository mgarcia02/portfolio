import { STATS } from '@/data/portfolioInfo'
import styles from './Stats.module.css'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Stats() {
    const ref = useScrollReveal<HTMLDivElement>()

    return (
        <div className={styles.band}>
            <div ref={ref} className={`${styles.stats} reveal`}>
                {STATS.map(({ prefix, value, suffix, label }, i) => (
                    <div
                        key={label}
                        className={`${styles.item} reveal`}
                        style={{ transitionDelay: `${i * 0.3}s` }}
                    >
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