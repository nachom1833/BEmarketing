import { useLang } from '../LangContext'
import { tx } from '../i18n'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ACTIVATION_IMAGES = [
  { src: '/images/activation-event.png', labelKey: 'svc2_sub' },
  { src: '/images/wellness-space.png',   labelKey: 'svc2_t3'  },
]

const DEFAULT_BG = '#0d1219'

export default function Services() {
  const { lang } = useLang()
  const sectionRef  = useRef(null)
  const titleRef    = useRef(null)
  const imgARef     = useRef(null)
  const imgBRef     = useRef(null)
  const imgWrapRef  = useRef(null)
  const labelRef    = useRef(null)
  const itemsRef    = useRef([])
  const cycleRef    = useRef(null)
  const [activeIdx, setActiveIdx]     = useState(-1)
  const [cycleImgIdx, setCycleImgIdx] = useState(0)
  const quickRX = useRef(null), quickRY = useRef(null)

  const services = [
    { number:'01', titleKey:'svc1_title', subKey:'svc1_sub', descKey:'svc1_desc',
      tags:['svc1_t1','svc1_t2','svc1_t3'], bg:'#0e1018', accentColor:'#FF6F61',
      image:'/images/retail-sports.png', imageCycle:null },
    { number:'02', titleKey:'svc2_title', subKey:'svc2_sub', descKey:'svc2_desc',
      tags:['svc2_t1','svc2_t2','svc2_t3'], bg:'#0c1410', accentColor:'#C9B99A',
      image:'/images/activation-event.png', imageCycle:ACTIVATION_IMAGES },
    { number:'03', titleKey:'svc3_title', subKey:'svc3_sub', descKey:'svc3_desc',
      tags:['svc3_t1','svc3_t2','svc3_t3'], bg:'#100e08', accentColor:'#E8DDD1',
      image:'/images/branding-studio.png', imageCycle:null },
    { number:'04', titleKey:'svc4_title', subKey:'svc4_sub', descKey:'svc4_desc',
      tags:['svc4_t1','svc4_t2','svc4_t3'], bg:'#080c14', accentColor:'#C9B99A',
      image:'/images/social-media-team.png', imageCycle:null },
    { number:'05', titleKey:'svc5_title', subKey:'svc5_sub', descKey:'svc5_desc',
      tags:['svc5_t1','svc5_t2','svc5_t3'], bg:'#0d0b16', accentColor:'#C9B99A',
      image:'/images/ia-automation.png', imageCycle:null },
  ]

  useEffect(() => {
    gsap.fromTo(titleRef.current, { opacity:0, y:50 },
      { opacity:1, y:0, duration:.9, ease:'power3.out',
        scrollTrigger:{ trigger:titleRef.current, start:'top 85%' } })
    itemsRef.current.forEach((el,i) => {
      if (!el) return
      gsap.fromTo(el, { opacity:0, y:30 },
        { opacity:1, y:0, duration:.6, ease:'power3.out', delay:i*.06,
          scrollTrigger:{ trigger:el, start:'top 90%' } })
    })
    if (imgWrapRef.current) {
      quickRX.current = gsap.quickTo(imgWrapRef.current,'rotateY',{ duration:.6, ease:'power3.out' })
      quickRY.current = gsap.quickTo(imgWrapRef.current,'rotateX',{ duration:.6, ease:'power3.out' })
    }
  }, [])

  const crossfadeTo = useCallback((src, labelKey) => {
    const a = imgARef.current, b = imgBRef.current
    if (!a || !b) return
    b.src = src
    gsap.timeline()
      .to(a, { opacity:0, duration:.55, ease:'power2.inOut' })
      .to(b, { opacity:1, duration:.55, ease:'power2.inOut' }, 0)
      .call(() => { a.src = src; gsap.set(a,{opacity:1}); gsap.set(b,{opacity:0}) })
    if (labelRef.current) {
      gsap.to(labelRef.current, { opacity:0, y:4, duration:.2,
        onComplete:() => {
          if (labelRef.current) {
            labelRef.current.textContent = tx(labelKey, lang)
            gsap.to(labelRef.current, { opacity:1, y:0, duration:.25 })
          }
        }
      })
    }
  }, [lang])

  const startCycle = useCallback((svc) => {
    stopCycle()
    if (!svc.imageCycle) return
    let i = 0
    cycleRef.current = setInterval(() => {
      i = (i + 1) % svc.imageCycle.length
      const { src, labelKey } = svc.imageCycle[i]
      setCycleImgIdx(i)
      crossfadeTo(src, labelKey)
    }, 2500)
  }, [crossfadeTo])

  const stopCycle = () => {
    if (cycleRef.current) { clearInterval(cycleRef.current); cycleRef.current = null }
  }

  const handleEnter = (idx) => {
    setActiveIdx(idx)
    const svc = services[idx]
    gsap.to(sectionRef.current, { backgroundColor:svc.bg, duration:.5, ease:'power2.out' })
    itemsRef.current.forEach((el,i) => el && gsap.to(el, { opacity:i===idx?1:.13, duration:.3 }))
    if (imgWrapRef.current) gsap.to(imgWrapRef.current, { opacity:1, x:0, duration:.5, ease:'power3.out' })
    if (imgARef.current) imgARef.current.src = svc.image
    if (labelRef.current) labelRef.current.textContent = tx(svc.subKey, lang)
    startCycle(svc)
  }

  const handleLeave = () => {
    setActiveIdx(-1)
    stopCycle()
    gsap.to(sectionRef.current, { backgroundColor:DEFAULT_BG, duration:.55 })
    itemsRef.current.forEach(el => el && gsap.to(el, { opacity:1, duration:.35 }))
    if (imgWrapRef.current) gsap.to(imgWrapRef.current, { opacity:0, x:20, duration:.4 })
    if (imgARef.current) gsap.set(imgARef.current, { opacity:1 })
    if (imgBRef.current) gsap.set(imgBRef.current, { opacity:0 })
  }

  const handlePanelMove = e => {
    if (activeIdx===-1||!imgWrapRef.current) return
    const r = imgWrapRef.current.getBoundingClientRect()
    quickRX.current?.((e.clientX-r.left-r.width/2)/(r.width/2)*8)
    quickRY.current?.(-(e.clientY-r.top-r.height/2)/(r.height/2)*6)
  }
  const resetTilt = () => { quickRX.current?.(0); quickRY.current?.(0) }

  const activeSvc = activeIdx>=0 ? services[activeIdx] : null
  const M = { fontFamily:"'Montserrat',sans-serif" }

  return (
    <section id="servicios" ref={sectionRef}
      style={{ backgroundColor:DEFAULT_BG, overflow:'hidden',
        paddingTop:'clamp(4rem,8vw,7rem)', paddingBottom:'clamp(3rem,6vw,6rem)' }}>
      <div className="rail">

        {/* Header */}
        <div ref={titleRef} style={{ opacity:0, marginBottom:'clamp(2.5rem,5vw,4rem)' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <p style={{ ...M, fontWeight:500, fontSize:'.65rem', letterSpacing:'.42em',
              textTransform:'uppercase', color:'rgba(201,185,154,.4)' }}>
              ✦ &nbsp;{tx('svc_badge', lang)}
            </p>
            <h2 style={{ ...M, fontWeight:900,
              fontSize:'clamp(2rem,5vw,4.5rem)', letterSpacing:'-0.025em',
              lineHeight:1.05, color:'#FFFFFF', margin:0 }}>
              {tx('svc_h2a', lang)}{' '}
              <span style={{ color:'#C9B99A' }}>{tx('svc_h2b', lang)}</span>
            </h2>
          </div>
          <div style={{ height:'1px', background:'rgba(255,255,255,.07)', marginTop:'2.5rem' }} />
        </div>

        {/* Two-col */}
        <div style={{ display:'flex', gap:'clamp(2rem,5vw,6rem)' }}
          onMouseLeave={handleLeave} onMouseMove={handlePanelMove}>

          {/* List */}
          <ul style={{ flex:1, display:'flex', flexDirection:'column', listStyle:'none', margin:0, padding:0 }}>
            {services.map((svc, i) => (
              <ServiceRow key={svc.number} svc={svc} index={i} lang={lang}
                isActive={activeIdx===i} isDimmed={activeIdx!==-1&&activeIdx!==i}
                itemRef={el=>itemsRef.current[i]=el}
                onEnter={()=>handleEnter(i)} />
            ))}
          </ul>

          {/* Sticky image panel */}
          <div className="hidden md:flex" style={{ width:'40%', flexShrink:0,
            position:'sticky', top:'50%', alignSelf:'center',
            height:'fit-content', perspective:'800px' }}
            onMouseLeave={resetTilt}>
            <div ref={imgWrapRef} style={{ opacity:0, width:'100%', willChange:'transform',
              transformStyle:'preserve-3d' }}>
              <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden',
                aspectRatio:'4/5',
                boxShadow:'0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.06)' }}>
                <img ref={imgBRef} src={services[0].image} alt=""
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%',
                    objectFit:'cover', opacity:0, zIndex:1 }} />
                <img ref={imgARef} src={services[0].image} alt="BE Marketing"
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%',
                    objectFit:'cover', opacity:1, zIndex:2, filter:'brightness(.8) saturate(1.1)' }} />
                <div style={{ position:'absolute', inset:0, zIndex:3,
                  background:'linear-gradient(to bottom,transparent 45%,rgba(0,0,0,.7) 100%)' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'2px', zIndex:4,
                  background:activeSvc?.accentColor ?? '#C9B99A', transition:'background .5s ease' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1.5rem', zIndex:4 }}>
                  <p ref={labelRef} style={{ ...M, fontWeight:500, fontSize:'.62rem',
                    letterSpacing:'.3em', textTransform:'uppercase',
                    color:activeSvc?.accentColor ?? '#C9B99A', marginBottom:'.3rem',
                    transition:'color .4s ease' }}>
                    {activeSvc ? tx(activeSvc.subKey, lang) : 'BE Marketing Studio'}
                  </p>
                  {activeIdx===1 && (
                    <div style={{ display:'flex', gap:'.4rem', marginTop:'.5rem' }}>
                      {ACTIVATION_IMAGES.map((_,di) => (
                        <span key={di} style={{
                          display:'inline-block', width:'5px', height:'5px', borderRadius:'50%',
                          background: cycleImgIdx===di ? '#C9B99A' : 'rgba(201,185,154,.3)',
                          transition:'background .3s' }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop:'3rem', paddingTop:'1.5rem',
          borderTop:'1px solid rgba(255,255,255,.06)',
          display:'flex', flexDirection:'column', gap:'1rem' }}
          className="sm:flex-row sm:items-center sm:justify-between">
          <p style={{ ...M, fontWeight:300, fontSize:'.85rem',
            color:'rgba(255,255,255,.3)' }}>
            {tx('svc_bottom', lang)}
          </p>
          <a href="https://calendly.com/be-marketing-studio/30min"
            target="_blank" rel="noopener noreferrer"
            style={{ ...M, display:'inline-flex', alignItems:'center', gap:'.5rem',
              fontWeight:700, fontSize:'.7rem', letterSpacing:'.18em',
              textTransform:'uppercase', color:'#1A1A1A', background:'#C9B99A',
              borderRadius:'100px', padding:'.6rem 1.6rem', textDecoration:'none',
              cursor:'none', boxShadow:'0 0 20px rgba(201,185,154,.2)',
              transition:'background .25s, transform .2s' }}
            onMouseEnter={e=>{ e.currentTarget.style.background='#E8DDD1'; e.currentTarget.style.transform='scale(1.04)' }}
            onMouseLeave={e=>{ e.currentTarget.style.background='#C9B99A'; e.currentTarget.style.transform='scale(1)' }}>
            {tx('svc_cta', lang)}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 3l3 3-3 3" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ svc, index, isActive, isDimmed, itemRef, onEnter, lang }) {
  const arrowRef = useRef(null)
  const M = { fontFamily:"'Montserrat',sans-serif" }
  const onEnterRow = () => {
    onEnter()
    gsap.fromTo(arrowRef.current, { opacity:0, scale:.5, x:-8 }, { opacity:1, scale:1, x:0, duration:.3, ease:'back.out(2.5)' })
  }
  const onLeaveRow = () => gsap.to(arrowRef.current, { opacity:0, scale:.6, x:-6, duration:.18, ease:'power2.in' })

  return (
    <li ref={itemRef} onMouseEnter={onEnterRow} onMouseLeave={onLeaveRow}
      style={{ borderBottom:'1px solid rgba(255,255,255,.05)', cursor:'none',
        padding:'clamp(.85rem,1.8vw,1.5rem) 0', transition:'opacity .3s ease' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'clamp(.8rem,2vw,1.8rem)' }}>
        <span style={{ ...M, fontWeight:700, fontSize:'.68rem', letterSpacing:'.15em',
          flexShrink:0, minWidth:'2rem',
          color:isActive ? svc.accentColor : 'rgba(201,185,154,.25)',
          transition:'color .3s ease' }}>
          {svc.number}
        </span>
        <h3 style={{ ...M, fontWeight:900,
          fontSize:'clamp(1rem,2.6vw,3rem)', letterSpacing:'-0.018em',
          lineHeight:1.1, flex:1, margin:0,
          color:isActive?'#FFFFFF':isDimmed?'rgba(255,255,255,.1)':'rgba(255,255,255,.78)',
          transition:'color .3s ease' }}>
          {tx(svc.titleKey, lang)}
        </h3>
        <div ref={arrowRef} style={{ flexShrink:0,
          width:'clamp(1.8rem,3vw,2.8rem)', height:'clamp(1.8rem,3vw,2.8rem)',
          borderRadius:'50%', background:svc.accentColor, opacity:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:`0 0 16px ${svc.accentColor}66` }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{transform:'rotate(-45deg)'}}>
            <path d="M2 6.5h9M7 3l3.5 3.5L7 10" stroke="#1A1A1A" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="md:hidden" style={{ maxHeight:isActive?'80px':'0', overflow:'hidden',
        opacity:isActive?1:0, marginTop:isActive?'.5rem':'0',
        paddingLeft:'calc(2rem + clamp(.8rem,2vw,1.8rem))',
        transition:'max-height .4s ease, opacity .3s ease, margin .3s ease' }}>
        <p style={{ ...M, fontWeight:300, fontSize:'.8rem',
          color:'rgba(201,185,154,.5)', lineHeight:1.6 }}>
          {tx(svc.descKey, lang)}
        </p>
      </div>
    </li>
  )
}
