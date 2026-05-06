import { useEffect, useState } from 'react'

import { PanInfo } from 'framer-motion'

interface UseSliderProps {
  slideCount: number
  resetDeps: unknown[]
}

export const usePreviewSlider = ({ slideCount, resetDeps }: UseSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, resetDeps)

  const canDrag = slideCount > 1

  const handlePanEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (!canDrag) return
    const { offset, velocity } = info
    const swipeThreshold = 50

    if (offset.x < -swipeThreshold || velocity.x < -500) {
      setCurrentIndex((prev) => Math.min(prev + 1, slideCount - 1))
    } else if (offset.x > swipeThreshold || velocity.x > 500) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  return { currentIndex, canDrag, handlePanEnd }
}
