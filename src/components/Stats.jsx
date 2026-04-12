import { useLang } from '../LangContext'
import { tx } from '../i18n'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS_DATA = [
  { value:80, suffix:'+', labelES:'Proyectos ejecutados', labelEN:'Projects executed', descES:'con impacto medible', descEN:'with measurable impact' },
  { value:5,  suffix:'+', labelES:'Años de experiencia',  labelEN:'Years of experience', descES:'en mercados globales', descEN:'in global markets' },
  { value:3,  suffix:'',  labelES:'Continentes',           labelEN:'Continents', descES:'de alcance internacional', descEN:'of international reach' },
  { value:98, suffix:'%', labelES:'Satisfacción',           labelEN:'Satisfaction', descES:'de clientes recurrentes', descEN:'of returning clients' },
]

export default function Stats() {
  const { lang } = useLang()
  const sectionRef = useRef(null)
  const numbersRef = useRef([])
  const counters = useRef(STATS_DATA.map(() => ({ val: 0 })))

  useEffect(() => {
    numbersRef.current.forEach((el, i) => {
      if (!el) return
      const counter = counters.current[i]
      const target = STATS_DATA[i].value

      gsap.to(counter, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          if (el) el.textContent = Math.round(counter.val)
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        }
      })
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: '#0d1821' }}
    >
      {/* Diagonal line decoration */}
      <div
        className="absolute inset-0 stripe-bg"
        style={{ opacity: 0.4 }}
      />

      <div className="rail relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {STATS_DATA.map((s, i) => (
            <div
              key={s.labelES}
              className="text-center glass rounded-2xl p-8"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="stat-number font-poppins font-black flex items-baseline justify-center gap-1">
                <span
                  ref={el => numbersRef.current[i] = el}
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: '#FF6F61',
                    lineHeight: 1,
                  }}
                >
                  0
                </span>
                <span
                  className="font-montserrat font-black"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#FF6F61' }}
                >
                  {s.suffix}
                </span>
              </div>
              <div
                className="font-poppins font-bold text-white mt-2"
                style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
              >
                {lang==='EN' ? s.labelEN : s.labelES}
              </div>
              <div
                className="font-lato text-xs mt-1 uppercase tracking-wider"
                style={{ color: 'rgba(209,213,219,0.5)' }}
              >
                {lang==='EN' ? s.descEN : s.descES}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
