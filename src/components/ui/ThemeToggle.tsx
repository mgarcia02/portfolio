import { useTheme } from '@/context/theme/useTheme'
import styles from './ThemeToggle.module.css'

function ThemeToggle() {
    const { theme, toggle } = useTheme()
    const isDark = theme === 'dark'

    return (
        <button
            className={styles.toggle}
            onClick={toggle}
            aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
        >
            <span className={styles.icon}>{isDark ? '☀️' : '🌙'}</span>
            <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>
    )
}

export default ThemeToggle