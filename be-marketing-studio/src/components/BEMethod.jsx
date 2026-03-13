import { useLang } from '../LangContext'
import { tx } from '../i18n'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── BE words cycling — each word has its own visual treatment ── */
const BE_WORDS = [
  {
    word: 'BOLD',
    // Coral solid fill — always vivid
    fill: '#FF6F61',
    stroke: 'rgba(255,111,97,0)',
    gradient: null,
    shadow: '0 0 80px rgba(255,111,97,0.35)',
  },
  {
    word: 'CREATIVE',
    // Vizon outline — thick stroke, transparent inside
    fill: 'transparent',
    stroke: '#C9B99A',
    strokeW: '0.025em',
    gradient: null,
    shadow: 'none',
  },
  {
    word: 'AUTHENTIC',
    // Vizon solid
    fill: '#C9B99A',
    stroke: 'rgba(0,0,0,0)',
    gradient: null,
    shadow: '0 0 60px rgba(201,185,154,0.2)',
  },
  {
    word: 'STRATEGIC',
    // Coral outline
    fill: 'transparent',
    stroke: '#FF6F61',
    strokeW: '0.025em',
    gradient: null,
    shadow: 'none',
  },
  {
    word: 'HUMAN',
    // Warm off-white — legible but soft
    fill: '#E8DDD1',
    stroke: 'rgba(0,0,0,0)',
    gradient: null,
    shadow: '0 0 40px rgba(232,221,209,0.15)',
  },
  {
    word: 'DATA-DRIVEN',
    // Vizon outline thick
    fill: 'transparent',
    stroke: '#C9B99A',
    strokeW: '0.02em',
    gradient: null,
    shadow: 'none',
  },
  {
    word: 'UNSTOPPABLE',
    // Coral solid
    fill: '#FF6F61',
    stroke: 'rgba(0,0,0,0)',
    gradient: null,
    shadow: '0 0 80px rgba(255,111,97,0.3)',
  },
]

/* ── 3 pillars — no boxes, just type ── */
const PILLARS = [
  { num:'01', wordKey:'p1_word', lineKey:'p1_line', tagKeys:['p1_t1','p1_t2','p1_t3'] },
  { num:'02', wordKey:'p2_word', lineKey:'p2_line', tagKeys:['p2_t1','p2_t2','p2_t3'] },
  { num:'03', wordKey:'p3_word', lineKey:'p3_line', tagKeys:['p3_t1','p3_t2','p3_t3'] },
]

export default function BEMethod() {
  const { lang } = useLang()
  const sectionRef  = useRef(null)
  const heroRef     = useRef(null)
  const wordRef     = useRef(null)
  const pillarsRef  = useRef(null)
  const quoteRef    = useRef(null)

  const [idx, setIdx] = useState(0)
  const currentIdx = useRef(0)

  /* GSAP slot machine — exits up, enters from below, no layout shift */
  useEffect(() => {
    const interval = setInterval(() => {
      const el = wordRef.current
      if (!el) return
      const next = (currentIdx.current + 1) % BE_WORDS.length
      // Exit: slide up + fade
      gsap.to(el, {
        yPercent: -110,
        opacity: 0,
        duration: .4,
        ease: 'power3.in',
        onComplete: () => {
          currentIdx.current = next
          setIdx(next)
          const w = BE_WORDS[next]
          // Apply styles directly so they're in sync before the enter animation
          el.style.WebkitTextFillColor = w.fill
          el.style.color = w.fill
          el.style.WebkitTextStroke = w.strokeW ? `${w.strokeW} ${w.stroke}` : '0px transparent'
          el.style.textShadow = w.shadow
          el.style.fontSize = w.word.length > 9
            ? 'clamp(2.8rem,9vw,9rem)'
            : 'clamp(5rem,16vw,15rem)'
          el.textContent = w.word
          // Snap to bottom off-screen, then enter
          gsap.set(el, { yPercent: 110, opacity: 0 })
          gsap.to(el, {
            yPercent: 0,
            opacity: 1,
            duration: .5,
            ease: 'power3.out',
          })
        }
      })
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  /* scroll reveal */
  useEffect(() => {
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: heroRef.current, start: 'top 85%' } }
    )
    const cards = pillarsRef.current?.querySelectorAll('.pillar-card')
    cards && cards.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: .85, ease: 'power3.out',
          delay: i * .15,
          scrollTrigger: { trigger: el, start: 'top 90%' } }
      )
    })
    gsap.fromTo(quoteRef.current,
      { opacity: 0 },
      { opacity: 1, duration: .9, ease: 'power2.out',
        scrollTrigger: { trigger: quoteRef.current, start: 'top 88%' } }
    )
  }, [])

  const current = BE_WORDS[idx]
  return (
    <section id="metodo" ref={sectionRef}
      style={{ background: '#0d1219', overflow: 'hidden',
        padding: 'clamp(5rem,10vw,9rem) 0 clamp(4rem,8vw,7rem)' }}>

      {/* ── HERO — BE [word] ── */}
      <div ref={heroRef} className="rail" style={{ opacity: 0 }}>

        {/* Eyebrow */}
        <p style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:500,
          fontSize:'clamp(.6rem,.85vw,.72rem)', letterSpacing:'.45em',
          textTransform:'uppercase', color:'rgba(201,185,154,.45)', marginBottom:'3rem' }}>
          ✦ &nbsp;{tx('method_badge', lang)}
        </p>

        {/* Giant "BE" — fixed, then slot machine word below */}
        <div>
          {/* BE — siempre fijo */}
          <div style={{
            fontFamily:"'Montserrat',sans-serif", fontWeight:900,
            fontSize:'clamp(5rem,16vw,15rem)',
            color:'#FFFFFF',
            letterSpacing:'-0.04em', lineHeight:.9,
          }}>
            BE
          </div>

          {/* Cycling word — fixed height container, slot machine */}
          <div style={{
            height:'clamp(5rem,16vw,15rem)',
            overflow:'hidden',
            lineHeight:.9,
            marginTop:'clamp(.5rem,1vw,.8rem)',
          }}>
            <div
              ref={wordRef}
              style={{
                fontFamily:"'Montserrat',sans-serif", fontWeight:900,
                /* Auto-shrink for long words like DATA-DRIVEN, UNSTOPPABLE */
                fontSize: current.word.length > 9
                  ? 'clamp(2.8rem,9vw,9rem)'
                  : 'clamp(5rem,16vw,15rem)',
                letterSpacing:'-0.04em', lineHeight:.9,
                display:'block',
                WebkitTextStroke: current.strokeW
                  ? `${current.strokeW} ${current.stroke}`
                  : `0px transparent`,
                WebkitTextFillColor: current.fill,
                color: current.fill,
                textShadow: current.shadow,
                willChange: 'transform, opacity',
              }}
            >
              {current.word}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:'1px', background:'rgba(201,185,154,.12)', margin:'clamp(3rem,5vw,5rem) 0' }} />
      </div>

      {/* ── PILLARS — creative staggered cards ── */}
      <div ref={pillarsRef} className="rail" style={{ marginTop:'clamp(3rem,5vw,4rem)' }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(3,1fr)',
          gap:'clamp(1rem,2vw,1.5rem)',
          alignItems:'start',
        }} className="pillars-grid">

          {/* Card 01 — BRAND — top, full height */}
          <PillarCard p={PILLARS[0]} offsetTop="0" accent="#C9B99A" lang={lang}
            cardRef={el => { if(pillarsRef.current) pillarsRef.current._cards = pillarsRef.current._cards || []; }} />
          {/* Card 02 — EXPERIENCE — pushed down */}
          <PillarCard p={PILLARS[1]} offsetTop="clamp(2.5rem,6vw,5rem)" accent="#FFFFFF" lang={lang} />
          {/* Card 03 — BUSINESS — pushed down less */}
          <PillarCard p={PILLARS[2]} offsetTop="clamp(1.2rem,3vw,2.5rem)" accent="#FF6F61" lang={lang} />
        </div>
      </div>

      {/* ── BOTTOM manifesto ── */}
      <div ref={quoteRef} className="rail" style={{ opacity:0, marginTop:'clamp(3rem,5vw,5rem)' }}>
        <p style={{
          fontFamily:"'Montserrat',sans-serif", fontWeight:300,
          fontSize:'clamp(1rem,1.8vw,1.5rem)',
          color:'rgba(255,255,255,.2)', letterSpacing:'.04em', lineHeight:1.5,
          maxWidth:'700px',
        }}>
          Creatividad humana + tecnología + datos.{' '}
          <span style={{ color:'rgba(201,185,154,.6)' }}>
            {tx('method_divider2', lang)}
          </span>
        </p>
      </div>

      <style>{`
        @media(max-width:768px){
          .pillars-grid{ grid-template-columns:1fr !important; }
          .pillar-card{ margin-top:0 !important; }
        }
      `}</style>
    </section>
  )
}

/* ── Individual pillar card ─────────────────────────────── */
function PillarCard({ p, offsetTop, accent, lang }) {
  const cardRef = useRef(null)
  const ghostRef = useRef(null)
  const lineRef = useRef(null)

  const onEnter = () => {
    gsap.to(ghostRef.current, { opacity:.18, scale:1.06, duration:.5, ease:'power3.out' })
    gsap.to(lineRef.current,  { scaleX:1, duration:.5, ease:'power3.out', transformOrigin:'left' })
    gsap.to(cardRef.current,  { y:-6, duration:.4, ease:'power3.out' })
  }
  const onLeave = () => {
    gsap.to(ghostRef.current, { opacity:.07, scale:1, duration:.4, ease:'power3.out' })
    gsap.to(lineRef.current,  { scaleX:0, duration:.4, ease:'power3.in', transformOrigin:'left' })
    gsap.to(cardRef.current,  { y:0, duration:.4, ease:'power3.out' })
  }

  return (
    <div className="pillar-card" style={{ marginTop: offsetTop }}>
      <div ref={cardRef}
        onMouseEnter={onEnter} onMouseLeave={onLeave}
        style={{
          position:'relative', overflow:'hidden',
          borderRadius:'20px', cursor:'none',
          padding:'clamp(1.8rem,3vw,2.8rem)',
          background:'rgba(255,255,255,.03)',
          border:'1px solid rgba(255,255,255,.07)',
          backdropFilter:'blur(4px)',
          minHeight:'clamp(280px,30vw,380px)',
          display:'flex', flexDirection:'column', justifyContent:'space-between',
          transition:'border-color .35s ease',
        }}>

        {/* Accent top bar */}
        <div ref={lineRef} style={{
          position:'absolute', top:0, left:0, right:0, height:'2px',
          background: accent,
          transform:'scaleX(0)', transformOrigin:'left',
          boxShadow:`0 0 12px ${accent}88`,
        }} />

        {/* Ghost letter */}
        <div ref={ghostRef} style={{
          position:'absolute', bottom:'-1.5rem', right:'-1rem',
          fontFamily:"'Montserrat',sans-serif", fontWeight:900,
          fontSize:'clamp(7rem,14vw,12rem)', lineHeight:1,
          letterSpacing:'-0.05em',
          color: accent,
          opacity:.07,
          userSelect:'none', pointerEvents:'none',
          transition:'none',
        }}>
          {tx(p.wordKey, lang)[0]}{tx(p.wordKey, lang).length > 8 ? tx(p.wordKey, lang)[1] : ''}
        </div>

        {/* Top row: number + tags */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <span style={{
            fontFamily:"'Montserrat',sans-serif", fontWeight:700,
            fontSize:'.65rem', letterSpacing:'.25em', color: accent,
          }}>
            {p.num}
          </span>
          <div style={{ display:'flex', flexDirection:'column', gap:'.3rem', alignItems:'flex-end' }}>
            {p.tagKeys.map(k => (
              <span key={k} style={{
                fontFamily:"'Montserrat',sans-serif", fontWeight:500,
                fontSize:'.55rem', letterSpacing:'.2em', textTransform:'uppercase',
                color:'rgba(255,255,255,.22)',
              }}>
                {tx(k, lang)}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: word + line */}
        <div>
          <h3 style={{
            fontFamily:"'Montserrat',sans-serif", fontWeight:900,
            fontSize:'clamp(2.2rem,4vw,3.8rem)', letterSpacing:'-0.03em',
            lineHeight:1, color:'#FFFFFF', margin:'0 0 .8rem',
          }}>
            {tx(p.wordKey, lang)}
          </h3>
          <div style={{ height:'1px', background:'rgba(255,255,255,.08)', marginBottom:'.8rem' }} />
          <p style={{
            fontFamily:"'Montserrat',sans-serif", fontWeight:300,
            fontSize:'clamp(.78rem,1.1vw,.9rem)',
            color:'rgba(201,185,154,.55)', lineHeight:1.65, margin:0,
          }}>
            {tx(p.lineKey, lang)}
          </p>
        </div>
      </div>
    </div>
  )
}
