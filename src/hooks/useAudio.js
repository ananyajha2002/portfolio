import { useRef, useState, useCallback, useEffect } from 'react'

const TRACKS = [
  '/assets/Dominic Fike - Açaí Bowl (Official Audio).mp3',
  '/assets/Linger (SiriusXM Session).mp3',
  '/assets/Blackbird (Remastered 2009).mp3',
  '/assets/The Killers - Mr. Brightside (Official Music Video).mp3',
  '/assets/Dexys Midnight Runners, Kevin Rowland - Come On Eileen (1982 Version).mp3',
]

export default function useAudio() {
  const bgmRef      = useRef(null)
  const sfxRef      = useRef(null)
  const [muted,      setMuted]      = useState(false)
  const [started,    setStarted]    = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const mutedRef     = useRef(false)
  const trackIdxRef  = useRef(0)

  // Keep refs in sync so event handlers always see current values
  useEffect(() => { mutedRef.current = muted }, [muted])
  useEffect(() => { trackIdxRef.current = trackIndex }, [trackIndex])

  useEffect(() => {
    const sfx = new Audio('/assets/page-turn.mp3')
    sfx.volume = 0.55
    sfxRef.current = sfx
    return () => sfx.pause()
  }, [])

  const loadTrack = useCallback((idx, autoplay) => {
    const prev = bgmRef.current
    if (prev) { prev.pause(); prev.src = '' }

    const audio = new Audio(TRACKS[idx])
    audio.volume = 0.2
    audio.muted  = mutedRef.current
    audio.onended = () => {
      const next = (trackIdxRef.current + 1) % TRACKS.length
      setTrackIndex(next)
      trackIdxRef.current = next
      loadTrack(next, true)
    }
    bgmRef.current = audio
    if (autoplay) audio.play().catch(() => {})
  }, [])

  const startBgm = useCallback(() => {
    if (started) return
    setStarted(true)
    loadTrack(0, true)
  }, [started, loadTrack])

  const toggleMute = useCallback(() => {
    setMuted(m => {
      const next = !m
      mutedRef.current = next
      if (bgmRef.current) bgmRef.current.muted = next
      return next
    })
  }, [])

  const nextTrack = useCallback(() => {
    const next = (trackIdxRef.current + 1) % TRACKS.length
    setTrackIndex(next)
    trackIdxRef.current = next
    loadTrack(next, started)
  }, [started, loadTrack])

  const prevTrack = useCallback(() => {
    const prev = (trackIdxRef.current - 1 + TRACKS.length) % TRACKS.length
    setTrackIndex(prev)
    trackIdxRef.current = prev
    loadTrack(prev, started)
  }, [started, loadTrack])

  const playPageTurn = useCallback(() => {
    const sfx = sfxRef.current
    if (!sfx || mutedRef.current) return
    sfx.currentTime = 0
    sfx.play().catch(() => {})
  }, [])

  return { muted, toggleMute, playPageTurn, startBgm, nextTrack, prevTrack, trackIndex }
}
