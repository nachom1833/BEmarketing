import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useLang } from '../LangContext'
import { tx } from '../i18n'

export default function Nav() {
  const navRef   = useRef(null)
  const { lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: tx('nav_services', lang), href: '#servicios' },
    { label: tx('nav_method',   lang), href: '#metodo' },
    { label: tx('nav_about',    lang), href: '#nosotros' },
    { label: tx('nav_contact',  lang), href: '#contacto' },
  ]

  const toggleLang = () => setLang(l => l === 'ES' ? 'EN' : 'ES')

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
    )
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  /* ── palette ── */
  const NAV_BG_SCROLL = 'rgba(15,22,30,0.82)'
  const NAV_BORDER    = 'rgba(201,185,154,0.12)'

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50"
        style={{ padding: '0', margin: 0 }}>

        <div className="flex items-center justify-between"
          style={{
            padding: 'clamp(.9rem,1.8vw,1.4rem) clamp(1.5rem,4vw,5rem)',
            background:  scrolled ? NAV_BG_SCROLL : 'transparent',
            backdropFilter: scrolled ? 'blur(18px)' : 'none',
            borderBottom: scrolled ? `1px solid ${NAV_BORDER}` : '1px solid transparent',
            transition: 'background .4s ease, backdrop-filter .4s ease, border-color .4s ease',
          }}>

          {/* ── LOGO ── */}
          <a href="/" onClick={e => scrollTo(e,'#')}
            style={{ cursor: 'none', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 0, lineHeight: 1 }}>
            {/* Main wordmark */}
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(.95rem,1.6vw,1.25rem)',
              color: '#FFFFFF',
              letterSpacing: '0.08em',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}>
              BE MARKETING
            </span>
            {/* Tagline */}
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(.5rem,.75vw,.62rem)',
              color: 'rgba(201,185,154,0.75)',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}>
              DO IT SIMPLE
            </span>
          </a>

          {/* ── DESKTOP LINKS ── */}
          <div className="hidden md:flex items-center gap-10">
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={e => scrollTo(e, l.href)}
                style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:500,
                  fontSize:'clamp(.7rem,1vw,.82rem)', letterSpacing:'.15em',
                  textTransform:'uppercase', color:'rgba(255,255,255,.65)',
                  textDecoration:'none', cursor:'none', transition:'color .25s ease',
                  position:'relative' }}
                onMouseEnter={e => {
                  e.target.style.color = '#C9B99A'
                }}
                onMouseLeave={e => {
                  e.target.style.color = 'rgba(255,255,255,.65)'
                }}>
                {l.label}
              </a>
            ))}
          </div>

          {/* ── RIGHT: LANG + CTA ── */}
          <div className="hidden md:flex items-center gap-5">
            {/* Language toggle */}
            <button onClick={toggleLang}
              style={{ cursor:'none', background:'none', border:'none', padding:0,
                display:'flex', alignItems:'center', gap:'.35rem' }}>
              {['ES','EN'].map(l => (
                <span key={l}
                  style={{
                    fontFamily:"'Montserrat',sans-serif", fontWeight: lang===l ? 700 : 400,
                    fontSize:'.7rem', letterSpacing:'.12em',
                    color: lang===l ? '#C9B99A' : 'rgba(255,255,255,.3)',
                    transition:'color .2s,font-weight .2s',
                  }}>
                  {l}
                </span>
              ))}
            </button>
            {/* Divider */}
            <div style={{ width:'1px', height:'18px', background:'rgba(255,255,255,.12)' }} />
            {/* CTA */}
            <a href="https://calendly.com/be-marketing-studio/30min"
              target="_blank" rel="noopener noreferrer"
              style={{ cursor:'none', textDecoration:'none',
                fontFamily:"'Montserrat',sans-serif", fontWeight:600,
                fontSize:'clamp(.65rem,.9vw,.75rem)', letterSpacing:'.18em',
                textTransform:'uppercase', color:'#1A1A1A',
                background:'#C9B99A', borderRadius:'100px',
                padding:'.55rem 1.4rem', transition:'background .25s, transform .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='#E8DDD1'; e.currentTarget.style.transform='scale(1.04)' }}
              onMouseLeave={e => { e.currentTarget.style.background='#C9B99A'; e.currentTarget.style.transform='scale(1)' }}>
              {tx('nav_cta', lang)}
            </a>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            style={{ cursor:'none', background:'none', border:'none' }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display:'block', width:'22px', height:'1.5px',
                background:'#fff', borderRadius:'2px',
                transform: menuOpen
                  ? i===0 ? 'rotate(45deg) translateY(7px)'
                  : i===2 ? 'rotate(-45deg) translateY(-7px)' : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i===1 ? 0 : 1,
                transition:'transform .3s ease, opacity .2s ease',
              }} />
            ))}
          </button>
        </div>

        {/* ── MOBILE MENU ── */}
        <div style={{
          maxHeight: menuOpen ? '400px' : '0',
          overflow: 'hidden',
          background: 'rgba(15,22,30,.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: menuOpen ? `1px solid ${NAV_BORDER}` : '1px solid transparent',
          transition: 'max-height .5s cubic-bezier(.77,0,.18,1), border-color .3s',
        }}>
          <div style={{ padding:'1.5rem clamp(1.5rem,4vw,5rem) 2rem', display:'flex', flexDirection:'column', gap:'1.4rem' }}>
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={e => scrollTo(e, l.href)}
                style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:600, fontSize:'1.2rem',
                  letterSpacing:'.05em', color:'#fff', textDecoration:'none', cursor:'none' }}>
                {l.label}
              </a>
            ))}
            <div style={{ display:'flex', gap:'1rem', marginTop:'.5rem' }}>
              <a href="https://calendly.com/be-marketing-studio/30min"
                target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:'.8rem',
                  color:'#1A1A1A', background:'#C9B99A', borderRadius:'100px',
                  padding:'.6rem 1.6rem', textDecoration:'none', cursor:'none' }}>
                {tx('nav_cta', lang)}
              </a>
              <button onClick={toggleLang}
                style={{ cursor:'none', background:'none', border:'1px solid rgba(201,185,154,.3)',
                  borderRadius:'100px', padding:'.6rem 1rem',
                  fontFamily:"'Montserrat',sans-serif", fontWeight:600,
                  fontSize:'.75rem', color:'#C9B99A' }}>
                {lang === 'ES' ? '🌐 EN' : '🌐 ES'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
