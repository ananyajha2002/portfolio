import { useRef, useState, useCallback, useEffect } from 'react'

export default function useAudio() {
  const bgmRef  = useRef(null)
  const sfxRef  = useRef(null)
  const [muted,   setMuted]   = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const bgm = new Audio('/assets/vogue-madonna.mp3')
    bgm.loop   = true
    bgm.volume = 0.2
    bgmRef.current = bgm

    const sfx = new Audio('/assets/page-turn.mp3')
    sfx.volume = 0.55
    sfxRef.current = sfx

    return () => {
      bgm.pause()
      sfx.pause()
    }
  }, [])

  const startBgm = useCallback(() => {
    if (!started && bgmRef.current) {
      bgmRef.current.play().catch(() => {})
      setStarted(true)
    }
  }, [started])

  const toggleMute = useCallback(() => {
    setMuted(m => {
      const next = !m
      if (bgmRef.current) bgmRef.current.muted = next
      return next
    })
  }, [])

  const playPageTurn = useCallback(() => {
    const sfx = sfxRef.current
    if (!sfx || muted) return
    sfx.currentTime = 0
    sfx.play().catch(() => {})
  }, [muted])

  return { muted, toggleMute, playPageTurn, startBgm }
}
