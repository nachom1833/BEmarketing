import { useLang } from '../LangContext'
import { tx } from '../i18n'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'Facebook',  href: '#' },
  { label: 'Behance',   href: '#' },
]

const LEGAL = [
  'Nuestras empresas', 'Términos de uso',
  'Política de privacidad', 'Cookies',
]

/* Partners — replace Equipo */
const PARTNERS = [
  { name: 'Nike',       sector: 'Retail Deportivo' },
  { name: 'Adidas',     sector: 'Retail & Lifestyle' },
  { name: 'Asics',      sector: 'Running & Performance' },
  { name: 'Decathlon',  sector: 'Mass Market Sport' },
  { name: 'Lululemon',  sector: 'Wellness & Apparel' },
  { name: 'Under Armour', sector: 'Sports Performance' },
]

const F_BG = '#0a1018'

export default function Footer() {
  const { lang } = useLang()
  const year = new Date().getFullYear()
  const wordRef  = useRef(null)
  const lineRef  = useRef(null)
  const bodyRef  = useRef(null)

  useEffect(() => {
    gsap.fromTo(wordRef.current,
      { clipPath:'inset(0 100% 0 0)' },
      { clipPath:'inset(0 0% 0 0)', duration:1.2, ease:'power3.inOut',
        scrollTrigger:{ trigger:wordRef.current, start:'top 90%' } }
    )
    gsap.fromTo(lineRef.current,
      { scaleX:0, transformOrigin:'left' },
      { scaleX:1, duration:1, ease:'power3.inOut',
        scrollTrigger:{ trigger:lineRef.current, start:'top 92%' } }
    )
    gsap.fromTo(bodyRef.current,
      { opacity:0, y:30 },
      { opacity:1, y:0, duration:.9, ease:'power3.out',
        scrollTrigger:{ trigger:bodyRef.current, start:'top 90%' } }
    )
  }, [])

  const M = { fontFamily:"'Montserrat',sans-serif" }
  const VIZON = '#C9B99A'
  const VIZON_DIM = 'rgba(201,185,154,.35)'

  return (
    <footer style={{ background:F_BG, WebkitFontSmoothing:'antialiased', position:'relative', overflow:'hidden' }}>

      {/* Top hairline — vizon */}
      <div style={{ height:'1px', background:`linear-gradient(90deg,transparent,${VIZON},transparent)` }} />

      {/* ═══ MONUMENTAL TYPE ═══ */}
      <div style={{ padding:'clamp(4rem,7vw,7rem) clamp(1.5rem,4vw,5rem) 0', overflow:'hidden' }}>
        <div ref={wordRef} style={{ lineHeight:.88 }}>
          <h2 style={{ ...M, fontWeight:900,
            fontSize:'clamp(4rem,13vw,14rem)', color:'#FFFFFF',
            letterSpacing:'-0.04em', lineHeight:.88, margin:0,
            textTransform:'uppercase' }}>
            BE MARKETING
          </h2>
          <h2 style={{ ...M, fontWeight:900,
            fontSize:'clamp(4rem,13vw,14rem)',
            WebkitTextStroke:'1.5px rgba(255,255,255,.15)',
            WebkitTextFillColor:'transparent',
            letterSpacing:'-0.04em', lineHeight:.88, margin:0,
            textTransform:'uppercase',
            paddingLeft:'clamp(3rem,8vw,10rem)',
          }}>
            STUDIO
          </h2>
        </div>
        <div ref={lineRef} style={{ height:'1px', background:`rgba(201,185,154,.2)`,
          marginTop:'clamp(3rem,5vw,5rem)' }} />
      </div>

      {/* ═══ PARTNERS SECTION ═══ */}
      <div style={{ padding:'clamp(3rem,5vw,5rem) clamp(1.5rem,4vw,5rem)',
        borderBottom:'1px solid rgba(255,255,255,.05)' }}>
        <p style={{ ...M, fontWeight:500, fontSize:'.62rem',
          letterSpacing:'.42em', textTransform:'uppercase',
          color:VIZON_DIM, marginBottom:'clamp(1.5rem,3vw,2.5rem)' }}>
          ✦ &nbsp;Partners
        </p>
        <div style={{ display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',
          gap:'0' }}>
          {PARTNERS.map((p, i) => (
            <div key={p.name}
              style={{ padding:'clamp(1rem,2vw,1.6rem) 0',
                borderBottom:'1px solid rgba(255,255,255,.05)',
                borderRight: (i % 3 !== 2) ? '1px solid rgba(255,255,255,.04)' : 'none',
                transition:'background .25s',
                cursor:'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(201,185,154,.03)' }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent' }}>
              <div style={{ padding:'0 clamp(1rem,2vw,1.6rem)' }}>
                <p style={{ ...M, fontWeight:700,
                  fontSize:'clamp(1rem,1.8vw,1.4rem)', color:'#FFFFFF',
                  letterSpacing:'-0.01em', marginBottom:'.3rem' }}>
                  {p.name}
                </p>
                <p style={{ ...M, fontWeight:300, fontSize:'.65rem',
                  letterSpacing:'.15em', textTransform:'uppercase',
                  color:VIZON_DIM }}>
                  {p.sector}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ ...M, fontWeight:300, fontSize:'.7rem',
          color:'rgba(255,255,255,.15)', marginTop:'1.5rem',
          letterSpacing:'.04em', fontStyle:'italic' }}>
          * Experience gained while working with top-tier brands
        </p>
      </div>

      {/* ═══ BODY — 2 col ═══ */}
      <div ref={bodyRef} style={{ opacity:0,
        display:'grid', gridTemplateColumns:'1fr 1.6fr',
        gap:'clamp(2rem,4vw,5rem)',
        padding:'clamp(3rem,5vw,5rem) clamp(1.5rem,4vw,5rem)' }}
        className="footer-grid">

        {/* LEFT */}
        <div>
          {/* Logo */}
          <div style={{ marginBottom:'clamp(1.5rem,2.5vw,2rem)' }}>
            <p style={{ ...M, fontWeight:900, fontSize:'1.15rem',
              color:'#fff', letterSpacing:'.06em', textTransform:'uppercase', lineHeight:1, margin:0 }}>
              BE MARKETING
            </p>
            <p style={{ ...M, fontWeight:300, fontSize:'.55rem',
              letterSpacing:'.42em', color:VIZON_DIM,
              textTransform:'uppercase', marginTop:'4px', margin:'4px 0 0' }}>
              DO IT SIMPLE
            </p>
          </div>

          <p style={{ ...M, fontWeight:300, fontSize:'.85rem',
            color:'rgba(201,185,154,.4)', lineHeight:1.75,
            maxWidth:'280px', marginBottom:'clamp(1.8rem,3vw,2.5rem)' }}>
            {tx('footer_desc', lang)}
          </p>

          {/* CTA */}
          <a href="https://calendly.com/be-marketing-studio/30min"
            target="_blank" rel="noopener noreferrer"
            style={{ ...M, display:'inline-flex', alignItems:'center', gap:'.5rem',
              fontWeight:700, fontSize:'.7rem', letterSpacing:'.18em',
              textTransform:'uppercase', color:'#1A1A1A', background:VIZON,
              borderRadius:'100px', padding:'.65rem 1.6rem',
              textDecoration:'none', cursor:'none',
              transition:'background .25s, transform .2s',
              boxShadow:`0 0 24px rgba(201,185,154,.2)` }}
            onMouseEnter={e=>{e.currentTarget.style.background='#E8DDD1';e.currentTarget.style.transform='scale(1.04)'}}
            onMouseLeave={e=>{e.currentTarget.style.background=VIZON;e.currentTarget.style.transform='scale(1)'}}>
            {tx('footer_cta', lang)}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5V7.5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
        </div>

        {/* RIGHT */}
        <div>
          <p style={{ ...M, fontWeight:300,
            fontSize:'clamp(.9rem,1.5vw,1.25rem)',
            color:'rgba(255,255,255,.65)', lineHeight:1.2,
            letterSpacing:'-0.015em', marginBottom:'clamp(1.8rem,3vw,2.8rem)',
            maxWidth:'550px' }}>
            {tx('footer_right', lang)}
          </p>

          {/* Social */}
          <div style={{ marginBottom:'clamp(1.8rem,3vw,2.5rem)' }}>
            {SOCIAL.map(s => <SocialLink key={s.label} {...s} vizon={VIZON} />)}
          </div>

          <div style={{ height:'1px', background:'rgba(255,255,255,.06)', marginBottom:'1.5rem' }} />

          {/* Legal */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem 2rem', marginBottom:'1.5rem' }}>
            {LEGAL.map(item => (
              <a key={item} href="#" style={{ ...M, fontWeight:400, fontSize:'.65rem',
                color:'rgba(255,255,255,.22)', textDecoration:'none', cursor:'none',
                letterSpacing:'.04em', transition:'color .2s' }}
                onMouseEnter={e=>e.target.style.color=VIZON}
                onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.22)'}>
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div style={{ display:'flex', alignItems:'center',
            justifyContent:'space-between', flexWrap:'wrap', gap:'.5rem' }}>
            <span style={{ ...M, fontWeight:300, fontSize:'.62rem',
              color:'rgba(255,255,255,.15)', letterSpacing:'.05em' }}>
              © {year} BE Marketing Studio — {tx('footer_rights', lang)}
            </span>
            <div style={{ display:'flex', alignItems:'center', gap:'.4rem' }}>
              <span style={{ width:'5px', height:'5px', borderRadius:'50%',
                background:VIZON, display:'inline-block',
                boxShadow:`0 0 8px ${VIZON}88`,
                animation:'coral-pulse 2.8s ease-in-out infinite' }} />
              <span style={{ ...M, fontWeight:300, fontSize:'.6rem',
                color:'rgba(255,255,255,.15)', letterSpacing:'.08em' }}>
                BE Method™ · {year}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div style={{ position:'absolute', width:'500px', height:'300px', borderRadius:'50%',
        background:`radial-gradient(ellipse,rgba(201,185,154,.04) 0%,transparent 70%)`,
        bottom:'-80px', right:'-60px', pointerEvents:'none' }} />

      <style>{`
        @media(max-width:768px){ .footer-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </footer>
  )
}

function SocialLink({ label, href, vizon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'.75rem 0', borderBottom:'1px solid rgba(255,255,255,.05)',
        textDecoration:'none', cursor:'none', position:'relative', overflow:'hidden' }}
      onMouseEnter={e=>{
        e.currentTarget.querySelector('.sl-l').style.color = vizon
        e.currentTarget.querySelector('.sl-a').style.color = vizon
        e.currentTarget.querySelector('.sl-line').style.width = '100%'
      }}
      onMouseLeave={e=>{
        e.currentTarget.querySelector('.sl-l').style.color = '#FFFFFF'
        e.currentTarget.querySelector('.sl-a').style.color = 'rgba(255,255,255,.3)'
        e.currentTarget.querySelector('.sl-line').style.width = '0%'
      }}>
      <span className="sl-line" style={{ position:'absolute', bottom:0, left:0,
        height:'1px', width:'0%', background:vizon,
        transition:'width .45s cubic-bezier(.76,0,.24,1)' }} />
      <span className="sl-l" style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:600,
        fontSize:'clamp(.9rem,1.5vw,1.2rem)', color:'#FFFFFF',
        transition:'color .25s', letterSpacing:'-0.01em' }}>
        {label}
      </span>
      <span className="sl-a" style={{ color:'rgba(255,255,255,.3)', transition:'color .25s',
        fontSize:'1rem' }}>↗</span>
    </a>
  )
}
