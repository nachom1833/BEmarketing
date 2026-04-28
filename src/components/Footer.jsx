import { useLang } from '../LangContext'
import { tx } from '../i18n'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/bemarketingstudio/' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/antonellarosa1/' }
]

const LEGAL = [
  'Nuestras empresas', 'Términos de uso',
  'Política de privacidad', 'Cookies',
]

/* Testimonios de clientes */
const TESTIMONIALS = [
  {
    name: 'Martín Gutiérrez',
    role: 'CEO, Sportify BA',
    quote: 'BE Marketing transformó nuestra presencia digital por completo. En 3 meses duplicamos el engagement y las conversiones crecieron un 40%.',
    stars: 5,
  },
  {
    name: 'Carolina Vega',
    role: 'Directora de Marketing, Urban Fit',
    quote: 'La estrategia integral que diseñaron para nuestro lanzamiento superó todas las expectativas. Profesionalismo y creatividad de primer nivel.',
    stars: 5,
  },
  {
    name: 'Federico Antúnez',
    role: 'Fundador, TriathlonLab',
    quote: 'Lo que más valoro es que entienden el negocio deportivo desde adentro. No son solo creativos, son socios estratégicos reales.',
    stars: 5,
  },
  {
    name: 'Lucía Moretti',
    role: 'Brand Manager, Oxígeno Running',
    quote: 'Nuestra identidad de marca finalmente refleja quiénes somos. El equipo de BE tiene un ojo increíble para el detalle y la coherencia visual.',
    stars: 5,
  },
  {
    name: 'Santiago Rivas',
    role: 'COO, ProSport Retail',
    quote: 'Desde el diseño del local hasta la campaña de apertura, todo fue impecable. Se nota la experiencia y el compromiso con el resultado.',
    stars: 5,
  },
  {
    name: 'Valentina Ibáñez',
    role: 'Directora Creativa, Atlas Wellness',
    quote: 'Trabajar con BE fue un antes y un después. Capturaron la esencia de nuestra marca y la llevaron a otro nivel con una ejecución impecable.',
    stars: 5,
  },
]

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#C9B99A" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const F_BG = '#0a1018'

export default function Footer() {
  const { lang } = useLang()
  const year = new Date().getFullYear()
  const wordRef  = useRef(null)
  const lineRef  = useRef(null)
  const bodyRef  = useRef(null)
  const testimonialsRef = useRef(null)

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

    /* Animate testimonial cards staggered — descomentar cuando haya testimonios reales
    if (testimonialsRef.current) {
      const cards = testimonialsRef.current.querySelectorAll('.testimonial-card')
      gsap.fromTo(cards,
        { opacity:0, y:40 },
        { opacity:1, y:0, duration:.7, stagger:.12, ease:'power3.out',
          scrollTrigger:{ trigger:testimonialsRef.current, start:'top 85%' } }
      )
    }
    */
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

      {/* ═══ TESTIMONIOS DE CLIENTES — Descomentar cuando haya testimonios reales ═══
      <div style={{ padding:'clamp(3rem,5vw,5rem) clamp(1.5rem,4vw,5rem)',
        borderBottom:'1px solid rgba(255,255,255,.05)' }}>
        <p style={{ ...M, fontWeight:500, fontSize:'.62rem',
          letterSpacing:'.42em', textTransform:'uppercase',
          color:VIZON_DIM, marginBottom:'.6rem' }}>
          ✦ &nbsp;{lang === 'ES' ? 'Lo que dicen nuestros clientes' : 'What our clients say'}
        </p>
        <h3 style={{ ...M, fontWeight:700, fontSize:'clamp(1.4rem,2.5vw,2rem)',
          color:'#FFFFFF', letterSpacing:'-0.02em', margin:'0 0 clamp(1.5rem,3vw,2.5rem)',
          lineHeight:1.15 }}>
          {lang === 'ES'
            ? 'Resultados que hablan por sí solos.'
            : 'Results that speak for themselves.'}
        </h3>

        <div ref={testimonialsRef} style={{ display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',
          gap:'clamp(1rem,2vw,1.5rem)' }}
          className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name}
              className="testimonial-card"
              style={{
                opacity:0,
                padding:'clamp(1.3rem,2.5vw,2rem)',
                borderRadius:'12px',
                border:'1px solid rgba(201,185,154,.1)',
                background:'rgba(255,255,255,.02)',
                backdropFilter:'blur(8px)',
                transition:'all .35s cubic-bezier(.25,.8,.25,1)',
                cursor:'default',
                position:'relative',
                overflow:'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background='rgba(201,185,154,.06)'
                e.currentTarget.style.borderColor='rgba(201,185,154,.25)'
                e.currentTarget.style.transform='translateY(-4px)'
                e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background='rgba(255,255,255,.02)'
                e.currentTarget.style.borderColor='rgba(201,185,154,.1)'
                e.currentTarget.style.transform='translateY(0)'
                e.currentTarget.style.boxShadow='none'
              }}>

              <span style={{ position:'absolute', top:'12px', right:'18px',
                fontSize:'3rem', lineHeight:1, color:'rgba(201,185,154,.08)',
                fontFamily:'Georgia,serif', fontWeight:700, pointerEvents:'none' }}>
                "
              </span>

              <div style={{ display:'flex', gap:'2px', marginBottom:'.8rem' }}>
                {Array.from({ length: t.stars }).map((_, i) => <StarIcon key={i} />)}
              </div>

              <p style={{ ...M, fontWeight:300, fontSize:'clamp(.82rem,1.1vw,.95rem)',
                color:'rgba(255,255,255,.65)', lineHeight:1.65,
                marginBottom:'1.2rem', minHeight:'3.5em' }}>
                "{t.quote}"
              </p>

              <div style={{ height:'1px', background:'rgba(201,185,154,.1)',
                marginBottom:'.8rem' }} />

              <div style={{ display:'flex', alignItems:'center', gap:'.7rem' }}>
                <div style={{
                  width:'36px', height:'36px', borderRadius:'50%',
                  background:`linear-gradient(135deg, rgba(201,185,154,.2), rgba(201,185,154,.08))`,
                  border:'1px solid rgba(201,185,154,.15)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  flexShrink:0,
                }}>
                  <span style={{ ...M, fontWeight:700, fontSize:'.65rem',
                    color:VIZON, letterSpacing:'.02em' }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p style={{ ...M, fontWeight:600, fontSize:'.8rem',
                    color:'#FFFFFF', letterSpacing:'-0.01em', margin:0, lineHeight:1.3 }}>
                    {t.name}
                  </p>
                  <p style={{ ...M, fontWeight:300, fontSize:'.65rem',
                    letterSpacing:'.06em', color:VIZON_DIM, margin:0, lineHeight:1.4 }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      ═══ FIN TESTIMONIOS ═══ */}

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
              textTransform:'uppercase', color:'#1A1A1A', background:'#FF6F61',
              borderRadius:'100px', padding:'.65rem 1.6rem',
              textDecoration:'none', cursor:'none',
              transition:'background .25s, transform .2s',
              boxShadow:`0 0 24px rgba(255,111,97,.2)` }}
            onMouseEnter={e=>{e.currentTarget.style.background='#FF8A7E';e.currentTarget.style.transform='scale(1.04)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='#FF6F61';e.currentTarget.style.transform='scale(1)'}}>
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
