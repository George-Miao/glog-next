import { useEffect, useState } from 'react'

export const useTop = () => {
  const [top, setTop] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setTop(window.scrollY || document.documentElement.scrollTop)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return top
}
