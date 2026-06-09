import { useEffect, useRef } from 'react'

export function useScrollReveal<T extends HTMLElement>() {
    const ref = useRef<T>(null)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            element.classList.add('visible')
            observer.disconnect()
            }
        },
        { threshold: 0.2}
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    return ref
}