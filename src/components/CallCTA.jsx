import { useLang } from '../LangContext'
import { tx } from '../i18n'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CallCTA() {
  const { lang } = useLang()
  const sectionRef = useRef(null)
  const innerRef   = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(innerRef.current, { opacity:0, y:60, scale:.97 },
      { opacity:1, y:0, scale:1, duration:1, ease:'power3.out',
        scrollTrigger:{ trigger:sectionRef.current, start:'top 80%' } })
    const words = headingRef.current?.querySelectorAll('.cta-word')
    words && gsap.fromTo(words, { opacity:0, y:40 },
      { opacity:1, y:0, duration:.6, stagger:.08, ease:'power3.out',
        scrollTrigger:{ trigger:sectionRef.current, start:'top 75%' } })
  }, [])

  const M = { fontFamily:"'Montserrat',sans-serif" }
  const VIZON = '#C9B99A'

  const indicators = {
    ES: [
      { icon:'⚡', text:'Respuesta en 24hs' },
      { icon:'🔒', text:'Sin compromiso' },
      { icon:'🌎', text:'Clientes en 3 continentes' },
    ],
    EN: [
      { icon:'⚡', text:'Reply within 24h' },
      { icon:'🔒', text:'No commitment' },
      { icon:'🌎', text:'Clients on 3 continents' },
    ],
  }

  const h2a = tx('call_h2a', lang)
  const h2b = tx('call_h2b', lang)
  const heading = `${h2a} ${h2b}`

  return (
    <section id="contacto" ref={sectionRef}
      style={{ background:'#0d1219', padding:'clamp(4rem,8vw,7rem) 0', position:'relative', overflow:'hidden' }}>

      {/* BG ghost */}
      <div style={{ position:'absolute', fontFamily:"'Montserrat',sans-serif", fontWeight:900,
        fontSize:'clamp(80px,18vw,220px)', color:'rgba(201,185,154,.025)',
        top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        lineHeight:1, letterSpacing:'-0.05em', whiteSpace:'nowrap',
        userSelect:'none', pointerEvents:'none', zIndex:0 }}>
        CALL US
      </div>

      <div className="rail" style={{ position:'relative', zIndex:1 }}>
        <div ref={innerRef} style={{ opacity:0, borderRadius:'24px', overflow:'hidden',
          background:'linear-gradient(135deg,rgba(20,28,40,.85) 0%,rgba(30,40,55,.7) 100%)',
          border:'1px solid rgba(201,185,154,.15)', backdropFilter:'blur(20px)' }}>

          <div style={{ height:'2px', background:`linear-gradient(90deg,${VIZON},transparent)` }} />

          <div style={{ padding:'clamp(2.5rem,5vw,5rem)', textAlign:'center' }}>

            <p style={{ ...M, fontWeight:500, fontSize:'.6rem', letterSpacing:'.42em',
              textTransform:'uppercase', color:'rgba(201,185,154,.4)', marginBottom:'1.5rem' }}>
              ✦ &nbsp;{tx('call_badge', lang)}
            </p>

            <h2 ref={headingRef} style={{ ...M, fontWeight:900,
              fontSize:'clamp(2rem,5vw,4rem)', lineHeight:1.1,
              maxWidth:'700px', margin:'0 auto 1.5rem' }}>
              {heading.split(' ').map((word, i) => (
                <span key={i} className="cta-word"
                  style={{ display:'inline-block', opacity:0, marginRight:'.25em',
                    color: (lang==='ES' ? ['tu','marca?'] : ['your','brand?']).includes(word)
                      ? VIZON : '#FFFFFF' }}>
                  {word}
                </span>
              ))}
            </h2>

            <p style={{ ...M, fontWeight:300,
              fontSize:'clamp(.9rem,1.3vw,1.05rem)', color:'rgba(255,255,255,.45)',
              maxWidth:'480px', margin:'0 auto 2.5rem', lineHeight:1.8 }}>
              {tx('call_sub', lang)}
            </p>

            <a href="https://calendly.com/be-marketing-studio/30min"
              target="_blank" rel="noopener noreferrer"
              style={{ ...M, display:'inline-flex', alignItems:'center', gap:'.7rem',
                fontWeight:700, fontSize:'.75rem', letterSpacing:'.18em',
                textTransform:'uppercase', color:'#1A1A1A',
                background:VIZON, borderRadius:'100px',
                padding:'.9rem 2.5rem', textDecoration:'none', cursor:'none',
                boxShadow:`0 0 40px rgba(201,185,154,.25)`,
                transition:'background .25s, transform .2s' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='#E8DDD1'; e.currentTarget.style.transform='scale(1.05) translateY(-2px)' }}
              onMouseLeave={e=>{ e.currentTarget.style.background=VIZON; e.currentTarget.style.transform='scale(1)' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="3" width="14" height="13" rx="2" stroke="#1A1A1A" strokeWidth="1.5"/>
                <path d="M6 1v3M12 1v3M2 7h14" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {tx('call_cta', lang)}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M7 3l3.5 3.5L7 10" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <p style={{ ...M, fontWeight:300, fontSize:'.6rem',
              letterSpacing:'.2em', textTransform:'uppercase',
              color:'rgba(255,255,255,.2)', marginTop:'1.2rem' }}>
              {tx('call_note', lang)}
            </p>

            {/* Trust indicators */}
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center',
              gap:'clamp(1.5rem,4vw,3rem)', marginTop:'2.5rem',
              paddingTop:'2rem', borderTop:'1px solid rgba(255,255,255,.06)' }}>
              {(indicators[lang]||indicators.ES).map(ind => (
                <div key={ind.text} style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
                  <span>{ind.icon}</span>
                  <span style={{ ...M, fontWeight:300, fontSize:'.75rem',
                    color:'rgba(255,255,255,.3)' }}>{ind.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
