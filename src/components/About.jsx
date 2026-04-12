import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../LangContext'
import { tx } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const { lang } = useLang()
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)
  const imgRef     = useRef(null)

  useEffect(() => {
    gsap.fromTo(leftRef.current, { opacity:0, x:-50 },
      { opacity:1, x:0, duration:1.1, ease:'power3.out',
        scrollTrigger:{ trigger:sectionRef.current, start:'top 78%' } })
    gsap.fromTo(rightRef.current, { opacity:0, x:50 },
      { opacity:1, x:0, duration:1.1, ease:'power3.out', delay:.15,
        scrollTrigger:{ trigger:sectionRef.current, start:'top 78%' } })
    gsap.to(imgRef.current, { yPercent:-10, ease:'none',
      scrollTrigger:{ trigger:sectionRef.current, start:'top bottom', end:'bottom top', scrub:1.8 } })
  }, [])

  const M = { fontFamily:"'Montserrat',sans-serif" }
  const VIZON = '#C9B99A'

  return (
    <section id="nosotros" ref={sectionRef}
      style={{ background:'linear-gradient(180deg,#0d1219 0%,#0f1a26 100%)',
        padding:'clamp(4rem,8vw,7rem) 0', overflow:'hidden', position:'relative' }}>

      <div style={{ position:'absolute', width:'700px', height:'700px', borderRadius:'50%',
        background:'radial-gradient(circle,rgba(201,185,154,.03) 0%,transparent 70%)',
        right:'-200px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />

      <div className="rail">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:'clamp(3rem,6vw,7rem)', alignItems:'start' }}
          className="about-grid">

          {/* LEFT — image stack */}
          <div ref={leftRef} style={{ opacity:0, position:'relative' }}>
            <div style={{ position:'relative', borderRadius:'20px', overflow:'hidden', width:'100%' }}>
              <div ref={imgRef} style={{ willChange:'transform' }}>
                <img src="/images/wellness-space.png"
                  alt="BE Marketing Studio — premium space"
                  style={{ width:'100%', display:'block', filter:'brightness(.82) saturate(1.05)' }} />
              </div>
              <div style={{ position:'absolute', inset:0,
                background:'linear-gradient(to bottom,transparent 55%,rgba(10,18,25,.65) 100%)',
                pointerEvents:'none' }} />
            </div>

            {/* Second image — offset peek */}
            <div style={{ position:'absolute', bottom:'-2.5rem', right:'-1.5rem',
              width:'46%', borderRadius:'14px', overflow:'hidden',
              boxShadow:'0 20px 50px rgba(0,0,0,.5)',
              border:'2px solid rgba(255,255,255,.07)', zIndex:2 }}>
              <img src="/images/branding-studio.png" alt="Branding"
                style={{ width:'100%', display:'block', filter:'brightness(.75) saturate(1.1)' }} />
              <div style={{ position:'absolute', inset:0, background:'rgba(13,18,25,.3)', pointerEvents:'none' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0,
                padding:'.65rem .9rem',
                background:'linear-gradient(transparent,rgba(0,0,0,.65))' }}>
                <span style={{ ...M, fontWeight:600, fontSize:'.55rem',
                  letterSpacing:'.22em', textTransform:'uppercase', color:VIZON }}>
                  Brand & Strategy
                </span>
              </div>
            </div>

            {/* TRUSTED BY badge */}
            <div style={{ position:'absolute', top:'1.2rem', left:'1.2rem', zIndex:3,
              background:'rgba(10,18,25,.85)', backdropFilter:'blur(12px)',
              borderRadius:'12px', padding:'.6rem 1rem',
              border:'1px solid rgba(201,185,154,.15)' }}>
              <p style={{ ...M, fontWeight:500, fontSize:'.5rem',
                letterSpacing:'.3em', textTransform:'uppercase', color:VIZON, margin:0 }}>
                {tx('trusted_by', lang)}
              </p>
              <p style={{ ...M, fontWeight:700, fontSize:'.85rem',
                color:'#fff', margin:'2px 0 0', letterSpacing:'.02em' }}>
                {tx('trusted_label', lang)}
              </p>
            </div>
          </div>

          {/* RIGHT — content */}
          <div ref={rightRef} style={{ opacity:0 }}>
            <p style={{ ...M, fontWeight:500, fontSize:'.6rem',
              letterSpacing:'.42em', textTransform:'uppercase',
              color:'rgba(201,185,154,.4)', marginBottom:'1.8rem' }}>
              ✦ &nbsp;{tx('about_badge', lang)}
            </p>

            <h2 style={{ ...M, fontWeight:900,
              fontSize:'clamp(2rem,4vw,3.6rem)', lineHeight:1.08,
              letterSpacing:'-0.025em', color:'#FFFFFF',
              margin:'0 0 clamp(1.2rem,2vw,1.8rem)' }}>
              {tx('about_h2a', lang)}{' '}
              <span style={{ color:VIZON }}>{tx('about_h2b', lang)}</span>
            </h2>

            <p style={{ ...M, fontWeight:300,
              fontSize:'clamp(.9rem,1.3vw,1.05rem)', color:'rgba(255,255,255,.6)',
              lineHeight:1.8, margin:'0 0 .9rem' }}>
              {tx('about_p1', lang)}
            </p>

            <p style={{ ...M, fontWeight:300,
              fontSize:'clamp(.9rem,1.3vw,1.05rem)', color:'rgba(255,255,255,.45)',
              lineHeight:1.8, margin:'0 0 clamp(2rem,3.5vw,3rem)' }}>
              {tx('about_p2', lang)}
            </p>

            <a href="https://calendly.com/be-marketing-studio/30min"
              target="_blank" rel="noopener noreferrer"
              style={{ ...M, display:'inline-flex', alignItems:'center', gap:'.6rem',
                fontWeight:700, fontSize:'.72rem', letterSpacing:'.18em',
                textTransform:'uppercase', color:'#1A1A1A',
                background:VIZON, borderRadius:'100px',
                padding:'.75rem 2rem', textDecoration:'none', cursor:'none',
                transition:'background .25s, transform .2s',
                boxShadow:`0 0 28px rgba(201,185,154,.2)` }}
              onMouseEnter={e=>{ e.currentTarget.style.background='#E8DDD1'; e.currentTarget.style.transform='scale(1.04)' }}
              onMouseLeave={e=>{ e.currentTarget.style.background=VIZON; e.currentTarget.style.transform='scale(1)' }}>
              {tx('about_cta', lang)}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 3l4 4-4 4" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){ .about-grid{ grid-template-columns:1fr !important; gap:5rem !important; } }
      `}</style>
    </section>
  )
}
