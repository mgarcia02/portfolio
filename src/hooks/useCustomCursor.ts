import { useEffect, useRef } from 'react'

export function useCustomCursor() {
    const dotRef  = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current

        if (!dot || !ring) return

        let mx = 0, my = 0, rx = 0, ry = 0
        let rafId: number

        const onMove = (e: MouseEvent) => {
            mx = e.clientX
            my = e.clientY
            dot.style.left = `${mx}px`
            dot.style.top  = `${my}px`
        }

        const tick = () => {
            rx += (mx - rx) * 0.12
            ry += (my - ry) * 0.12
            ring.style.left = `${rx}px`
            ring.style.top  = `${ry}px`
            rafId = requestAnimationFrame(tick)
        }

        const onLeave  = () => { dot.style.opacity = '0'; ring.style.opacity = '0' }
        const onEnter  = () => { dot.style.opacity = '1'; ring.style.opacity = '1' }

        const onLinkEnter = () => { ring.style.transform = 'translate(-50%,-50%) scale(1.8)' }
        const onLinkLeave = () => { ring.style.transform = 'translate(-50%,-50%) scale(1)' }

        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseleave', onLeave)
        document.addEventListener('mouseenter', onEnter)

        const links = document.querySelectorAll('a, button')
        links.forEach(el => {
            el.addEventListener('mouseenter', onLinkEnter)
            el.addEventListener('mouseleave', onLinkLeave)
        })

        rafId = requestAnimationFrame(tick)

        return () => {
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseleave', onLeave)
            document.removeEventListener('mouseenter', onEnter)
            links.forEach(el => {
                el.removeEventListener('mouseenter', onLinkEnter)
                el.removeEventListener('mouseleave', onLinkLeave)
            })
            cancelAnimationFrame(rafId)
        }
    }, [])

    return { dotRef, ringRef }
}