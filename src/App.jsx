import { useState, useEffect } from 'react'
import './App.css'
import MagazineCard     from './components/MagazineCard'
import MagazineInterior from './components/MagazineInterior'
import VinylPlayer      from './components/VinylPlayer'
import useAudio         from './hooks/useAudio'
import { makeContactPage } from './components/ContactSpread'
import PersonalSection     from './components/PersonalSection'
import {
  CareerPage1, CareerPage2, CareerPage3,
  CareerPage4, CareerPage6,
} from './components/career/CareerPages'
import {
  AcademiaPage1, AcademiaPage2,
  AcademiaPage3, AcademiaPage4,
} from './components/academia/AcademiaPages'
import {
  ProjectsPage1, ProjectsPage2,
  ProjectsPage3, ProjectsPage4,
  ProjectsPage5, ProjectsPage6,
  ProjectsPage7,
} from './components/projects/ProjectsPages'
import {
  SkillsPage1, SkillsPage2,
} from './components/skills/SkillsPages'

/* ── Contact page — Career only ── */
const CareerContact = makeContactPage({ dark: '#111111', light: '#800020', issueName: 'THE INNOVATION ISSUE' })

const COVERS = [
  {
    id: 'career',
    photo: '/assets/career-cover.jpeg',
    objectPosition: 'center 20%',
    masthead: 'CAREER',
    issue: 'THE INNOVATION ISSUE',
    quote: 'from government to fashion,\nfiguring it out as I went',
    quotePosition: 'top-right',
    interiorPages: [CareerPage1, CareerPage2, CareerPage3, CareerPage4, CareerPage6, CareerContact],
  },
  {
    id: 'academia',
    photo: '/assets/academia-cover.jpeg',
    objectPosition: 'center top',
    masthead: 'ACADEMIA',
    issue: 'THE EDUCATION ISSUE',
    quote: 'the degree that opened\nevery door after it',
    quotePosition: 'bottom-right',
    interiorPages: [AcademiaPage1, AcademiaPage2, AcademiaPage3, AcademiaPage4],
  },
  {
    id: 'projects',
    photo: '/assets/projects-cover.jpeg',
    objectPosition: 'center center',
    masthead: 'PROJECTS',
    issue: 'THE BUILD ISSUE',
    quote: 'what I built when\nthere was no manual',
    quotePosition: 'bottom-left',
    interiorPages: [ProjectsPage1, ProjectsPage2, ProjectsPage3, ProjectsPage4, ProjectsPage5, ProjectsPage6, ProjectsPage7],
  },
  {
    id: 'skills',
    photo: '/assets/skills-cover.jpeg',
    objectPosition: 'center center',
    masthead: 'SKILLS',
    issue: 'THE TOOLKIT ISSUE',
    quote: 'certified, self-taught\n& still learning',
    quotePosition: 'top-left',
    interiorPages: [SkillsPage1, SkillsPage2],
  },
]

/* ── Splash screen ── */
function SplashScreen({ onEnter }) {
  const [fading, setFading] = useState(false)

  const handleClick = () => {
    setFading(true)
    setTimeout(onEnter, 500)
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Click to enter portfolio"
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#0a0806',
        cursor: 'pointer',
        animation: fading ? 'splashFadeOut 0.5s ease forwards' : undefined,
      }}
    >
      {/* Subtle marble texture overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/assets/marble-bg.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', textAlign: 'center', userSelect: 'none' }}>
        {/* Main wordmark */}
        <div style={{ fontFamily: "'VogueTTF', serif", fontSize: 'clamp(48px, 12vw, 96px)', color: '#f8f5ef', lineHeight: 0.88, letterSpacing: '0.04em', marginBottom: '16px', animation: 'splashPulse 3s ease-in-out infinite' }}>
          ANANYA<br />JHA
        </div>

        {/* Rule */}
        <div style={{ width: '60px', height: '1px', background: '#c9b99a', margin: '0 auto 16px' }} />

        {/* Subline */}
        <p style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(12px, 2vw, 16px)', color: '#c9b99a', letterSpacing: '0.14em', marginBottom: '32px' }}>
          PORTFOLIO · 2026
        </p>

        {/* Enter prompt */}
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 'clamp(10px, 1.5vw, 13px)', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', animation: 'splashBlink 2s ease-in-out infinite' }}>
          click anywhere to enter
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [entered,   setEntered]   = useState(false)
  const [openCover, setOpenCover] = useState(null)
  const { muted, toggleMute, playPageTurn, startBgm, nextTrack, prevTrack } = useAudio()

  const handleEnter = () => {
    startBgm()
    setEntered(true)
  }

  const handleOpen = (cover) => {
    setOpenCover(cover)
  }

  if (!entered) {
    return <SplashScreen onEnter={handleEnter} />
  }

  return (
    <>
      {/* ── Vinyl player — spins when music is on ── */}
      <VinylPlayer muted={muted} onToggle={toggleMute} onNext={nextTrack} onPrev={prevTrack} />

      {/* ── Homepage: marble table with magazine grid ── */}
      <div className="magazine-scene">
        <div className="marble-overlay" />

        <div className="homepage-wrapper">
          {/* Header */}
          <div className="homepage-header">
            <p className="homepage-subtitle">
              everything you need to know, professionally.
            </p>
          </div>

          {/* Magazine grid */}
          <div className="covers-grid">
            {COVERS.map((cover) => (
              <MagazineCard
                key={cover.id}
                cover={cover}
                onOpen={() => handleOpen(cover)}
              />
            ))}
          </div>

          {/* Personal about me */}
          <PersonalSection />
        </div>
      </div>

      {/* ── Magazine interior overlay ── */}
      {openCover && (
        <MagazineInterior
          cover={openCover}
          onClose={() => setOpenCover(null)}
          playPageTurn={playPageTurn}
        />
      )}
    </>
  )
}
