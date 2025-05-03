import { useState, useEffect } from 'react'

export default function useCompHeight(compId: string) {
  const [compHeight, setCompHeight] = useState(0)

  useEffect(() => {
    if (!compId) return

    const comp = document.getElementById(compId)
    const updateCompHeight = () => {
      if (comp) {
        const compRect = comp.getBoundingClientRect()
        setCompHeight(compRect.height)
      }
    }

    updateCompHeight()
    window.addEventListener('resize', updateCompHeight)

    return () => window.removeEventListener('resize', updateCompHeight)
  }, [compId])

  return { compHeight }
}
