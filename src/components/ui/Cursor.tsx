import { useCustomCursor } from '@/hooks/useCustomCursor'
import styles from './Cursor.module.css'

function Cursor() {
    const { dotRef, ringRef } = useCustomCursor()

    return (
        <>
            <div ref={dotRef}  className={styles.dot}  />
            <div ref={ringRef} className={styles.ring} />
        </>
    )
}

export default Cursor