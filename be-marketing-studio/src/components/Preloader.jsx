import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onComplete }) {
  const preRef = useRef(null)
  const logoRef = useRef(null)
  const barRef = useRef(null)
  const counterRef = useRef(null)
  const progressRef = useRef({ val: 0 })

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power3.inOut',
          delay: 0.2,
          onComplete,
        })
      }
    })

    // Animate counter from 0 to 100
    tl.to(progressRef.current, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(progressRef.current.val)
        }
        if (barRef.current) {
          barRef.current.style.width = `${progressRef.current.val}%`
        }
      }
    })

    // Logo reveal
    tl.fromTo(logoRef.current,
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' },
      0.3
    )

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={preRef} className="preloader">
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <div ref={logoRef} className="opacity-0 flex flex-col items-center leading-none" style={{ gap: '0px' }}>
          <span className="font-poppins font-black text-white" style={{ fontSize: '2rem', letterSpacing: '-0.01em', lineHeight: 1 }}>BE</span>
          <span className="font-poppins font-black text-white" style={{ fontSize: '2rem', letterSpacing: '-0.01em', lineHeight: 1 }}>MARKETING</span>
          <span className="font-lato uppercase" style={{ fontSize: '9px', letterSpacing: '0.38em', color: 'rgba(255,111,97,0.7)', marginTop: '6px' }}>Studio</span>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-px bg-gray-800 relative overflow-hidden">
          <div
            ref={barRef}
            className="absolute top-0 left-0 h-full transition-none"
            style={{ background: '#FF6F61', width: '0%' }}
          />
        </div>

        {/* Counter */}
        <div
          className="font-poppins font-black text-6xl tabular-nums"
          style={{ color: '#FF6F61', lineHeight: 1 }}
        >
          <span ref={counterRef}>0</span>
          <span className="text-2xl">%</span>
        </div>
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Ambient glow */}
      <div
        className="absolute"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,111,97,0.06) 0%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}
