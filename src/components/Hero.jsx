import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { useLang } from '../LangContext'
import { tx } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { lang } = useLang()
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)
  const headingRef = useRef(null)
  const subRef     = useRef(null)
  const ctaRef     = useRef(null)
  const badgeRef   = useRef(null)
  const scrollRef  = useRef(null)
  const imageRef   = useRef(null)

  // Three.js particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100)
    camera.position.z = 5
    const count = 1800
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const coral = new THREE.Color('#FF6F61'), blue = new THREE.Color('#2C3E50'), vizon = new THREE.Color('#C9B99A')
    for (let i = 0; i < count; i++) {
      pos[i*3]=(Math.random()-.5)*18; pos[i*3+1]=(Math.random()-.5)*10; pos[i*3+2]=(Math.random()-.5)*8
      const r = Math.random()
      const c = r<.12?coral:r<.25?vizon:blue
      col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    const mat = new THREE.PointsMaterial({ size:.04, vertexColors:true, transparent:true, opacity:.65, sizeAttenuation:true })
    const points = new THREE.Points(geo, mat)
    scene.add(points)
    let mx=0, my=0
    const onM = e => { mx=(e.clientX/window.innerWidth-.5)*2; my=-(e.clientY/window.innerHeight-.5)*2 }
    window.addEventListener('mousemove', onM)
    let animId; const clock = new THREE.Clock()
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      points.rotation.y = t*.04+mx*.15; points.rotation.x = t*.02+my*.08
      renderer.render(scene, camera)
    }
    animate()
    const onR = () => { if (!canvas) return; renderer.setSize(canvas.offsetWidth, canvas.offsetHeight); camera.aspect=canvas.offsetWidth/canvas.offsetHeight; camera.updateProjectionMatrix() }
    window.addEventListener('resize', onR)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('mousemove',onM); window.removeEventListener('resize',onR); renderer.dispose() }
  }, [])

  // GSAP entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.2 })
    tl.fromTo(badgeRef.current, { opacity:0, y:20 }, { opacity:1, y:0, duration:.6, ease:'power3.out' })
    tl.fromTo(headingRef.current, { opacity:0, y:50 }, { opacity:1, y:0, duration:.9, ease:'power3.out' }, '-=.2')
    tl.fromTo(subRef.current, { opacity:0, y:30 }, { opacity:1, y:0, duration:.7, ease:'power3.out' }, '-=.4')
    tl.fromTo(ctaRef.current, { opacity:0, y:20, scale:.95 }, { opacity:1, y:0, scale:1, duration:.6, ease:'back.out(1.7)' }, '-=.3')
    tl.fromTo(imageRef.current, { opacity:0, x:60, scale:.96 }, { opacity:1, x:0, scale:1, duration:1.1, ease:'power3.out' }, .5)
    tl.fromTo(scrollRef.current, { opacity:0 }, { opacity:1, duration:.5 }, '-=.2')
    gsap.to(imageRef.current, { yPercent:12, ease:'none', scrollTrigger:{ trigger:sectionRef.current, start:'top top', end:'bottom top', scrub:1.5 } })
    return () => tl.kill()
  }, [])

  const M = { fontFamily:"'Montserrat',sans-serif" }

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background:'linear-gradient(135deg,#0a1219 0%,#0d1821 50%,#111f2e 100%)' }}>
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1 }} />
      <div className="absolute inset-0 grid-pattern" style={{ zIndex:2 }} />
      <div style={{ position:'absolute', width:'600px', height:'600px',
        background:'radial-gradient(circle,rgba(201,185,154,.06) 0%,transparent 70%)',
        left:'-10%', top:'20%', zIndex:2, pointerEvents:'none' }} />

      <div className="rail relative w-full pt-32 pb-20 md:pt-40 md:pb-32" style={{ zIndex:10 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(2rem,4vw,5rem)', alignItems:'center' }}
          className="hero-grid">

          {/* LEFT */}
          <div>
            <div ref={badgeRef} style={{ opacity:0, marginBottom:'1.8rem' }}>
              <span style={{ ...M, fontWeight:500, fontSize:'.6rem',
                letterSpacing:'.42em', textTransform:'uppercase',
                color:'rgba(201,185,154,.5)' }}>
                ✦ &nbsp;{tx('hero_badge', lang)}
              </span>
            </div>

            <h1 ref={headingRef} style={{ ...M, fontWeight:900, opacity:0,
              fontSize:'clamp(2.2rem,4.5vw,4.8rem)', lineHeight:1.05,
              letterSpacing:'-0.03em', color:'#FFFFFF',
              margin:'0 0 clamp(1rem,2vw,1.5rem)' }}>
              {tx('hero_h1a', lang)}{' '}
              <span style={{ color:'#C9B99A' }}>{tx('hero_h1b', lang)}</span>{' '}
              {tx('hero_h1c', lang)}
            </h1>

            <p ref={subRef} style={{ ...M, fontWeight:300, opacity:0,
              color:'rgba(255,255,255,.55)', fontSize:'clamp(.9rem,1.5vw,1.1rem)',
              lineHeight:1.8, margin:'0 0 clamp(1.5rem,3vw,2.5rem)', maxWidth:'500px' }}>
              {tx('hero_sub', lang)}{' '}
              <em style={{ color:'#C9B99A', fontStyle:'normal', fontWeight:600 }}>
                {tx('hero_sub_em', lang)}
              </em>.
            </p>

            <div ref={ctaRef} style={{ opacity:0, display:'flex', flexWrap:'wrap', gap:'1rem' }}>
              <a href="https://calendly.com/be-marketing-studio/30min"
                target="_blank" rel="noopener noreferrer"
                style={{ ...M, display:'inline-flex', alignItems:'center', gap:'.6rem',
                  fontWeight:700, fontSize:'.72rem', letterSpacing:'.18em',
                  textTransform:'uppercase', color:'#1A1A1A',
                  background:'#C9B99A', borderRadius:'100px',
                  padding:'.8rem 2rem', textDecoration:'none', cursor:'none',
                  transition:'background .25s, transform .2s, box-shadow .25s',
                  boxShadow:'0 0 28px rgba(201,185,154,.25)' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='#E8DDD1'; e.currentTarget.style.transform='scale(1.05)' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='#C9B99A'; e.currentTarget.style.transform='scale(1)' }}>
                {tx('hero_cta', lang)}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 3l4 4-4 4" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#servicios" onClick={e=>{e.preventDefault();document.querySelector('#servicios')?.scrollIntoView({behavior:'smooth'})}}
                style={{ ...M, display:'inline-flex', alignItems:'center', gap:'.4rem',
                  fontWeight:600, fontSize:'.72rem', letterSpacing:'.12em',
                  textTransform:'uppercase', color:'rgba(255,255,255,.5)',
                  background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)',
                  borderRadius:'100px', padding:'.8rem 1.8rem',
                  textDecoration:'none', cursor:'none', transition:'color .2s, border-color .2s' }}
                onMouseEnter={e=>{ e.currentTarget.style.color='#C9B99A'; e.currentTarget.style.borderColor='rgba(201,185,154,.3)' }}
                onMouseLeave={e=>{ e.currentTarget.style.color='rgba(255,255,255,.5)'; e.currentTarget.style.borderColor='rgba(255,255,255,.1)' }}>
                {tx('hero_link', lang)}
              </a>
            </div>

            {/* Stats */}
            <div style={{ display:'flex', gap:'clamp(1.5rem,3vw,3rem)',
              marginTop:'clamp(2rem,4vw,3.5rem)',
              paddingTop:'clamp(1.2rem,2vw,1.8rem)',
              borderTop:'1px solid rgba(255,255,255,.07)' }}>
              {[
                { n:'+80', k:'hero_stat1' },
                { n:'+5',  k:'hero_stat2' },
                { n:'3',   k:'hero_stat3' },
              ].map(s => (
                <div key={s.k}>
                  <div style={{ ...M, fontWeight:900, fontSize:'clamp(1.3rem,2.5vw,2rem)',
                    color:'#C9B99A', letterSpacing:'-0.02em', lineHeight:1 }}>{s.n}</div>
                  <div style={{ ...M, fontWeight:400, fontSize:'.55rem',
                    letterSpacing:'.22em', textTransform:'uppercase',
                    color:'rgba(255,255,255,.3)', marginTop:'.3rem' }}>
                    {tx(s.k, lang)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — image */}
          <div ref={imageRef} style={{ opacity:0, position:'relative' }}>
            <div style={{ borderRadius:'20px', overflow:'hidden', position:'relative' }}>
              <img src="/images/hero-office.png" alt="BE Marketing Studio team"
                style={{ width:'100%', display:'block',
                  filter:'brightness(.88) saturate(1.05)' }} />
              <div style={{ position:'absolute', inset:0,
                background:'linear-gradient(135deg,rgba(13,18,25,.35) 0%,transparent 60%)' }} />
              {/* Label */}
              <div style={{ position:'absolute', bottom:'1.2rem', left:'1.2rem',
                background:'rgba(10,18,25,.8)', backdropFilter:'blur(12px)',
                borderRadius:'12px', padding:'.6rem 1rem',
                border:'1px solid rgba(201,185,154,.15)' }}>
                <div style={{ ...M, fontWeight:900, fontSize:'.9rem', color:'#fff',
                  letterSpacing:'.06em', textTransform:'uppercase' }}>BE MARKETING</div>
                <div style={{ ...M, fontWeight:300, fontSize:'.5rem',
                  letterSpacing:'.38em', color:'rgba(201,185,154,.65)',
                  textTransform:'uppercase', marginTop:'2px' }}>DO IT SIMPLE</div>
              </div>
            </div>
            {/* Decorative blobs */}
            <div style={{ position:'absolute', width:'80px', height:'80px', borderRadius:'50%',
              background:'rgba(201,185,154,.08)', border:'1px solid rgba(201,185,154,.15)',
              top:'-1.5rem', right:'-1.5rem', pointerEvents:'none' }} className="float-anim" />
            <div style={{ position:'absolute', width:'45px', height:'45px', borderRadius:'50%',
              background:'rgba(255,111,97,.08)', border:'1px solid rgba(255,111,97,.15)',
              bottom:'-1rem', left:'-1rem', pointerEvents:'none', animationDelay:'1.2s' }} className="float-anim" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} style={{ position:'absolute', bottom:'2rem', left:'50%',
        transform:'translateX(-50%)', display:'flex', flexDirection:'column',
        alignItems:'center', gap:'.5rem', opacity:0, zIndex:10 }}>
        <div style={{ ...M, fontWeight:400, fontSize:'.55rem',
          letterSpacing:'.28em', textTransform:'uppercase',
          color:'rgba(255,255,255,.3)' }}>Scroll</div>
        <div style={{ width:'1px', height:'40px',
          background:'linear-gradient(to bottom,rgba(201,185,154,.5),transparent)' }}
          className="scroll-indicator" />
      </div>

      <style>{`
        @media(max-width:768px){ .hero-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  )
}
