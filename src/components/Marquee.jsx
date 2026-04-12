import { useLang } from '../LangContext'
import { tx } from '../i18n'
export default function Marquee() {
  const { lang } = useLang()
  const itemsES = ['Diseño de Espacios','✦','Retail Deportivo','✦','Activaciones','✦','Brand Strategy','✦','Data-Driven','✦','Social Media','✦','Automatizaciones & IA','✦','Performance','✦','Experiencias de Marca','✦']
  const itemsEN = ['Space Design','✦','Sports Retail','✦','Activations','✦','Brand Strategy','✦','Data-Driven','✦','Social Media','✦','AI & Automation','✦','Performance','✦','Brand Experiences','✦']
  const items = lang === 'EN' ? itemsEN : itemsES
  const doubled = [...items, ...items]

  return (
    <div
      className="py-5 overflow-hidden relative"
      style={{ background: 'rgba(255,111,97,0.07)', borderTop: '1px solid rgba(255,111,97,0.15)', borderBottom: '1px solid rgba(255,111,97,0.15)' }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-poppins font-semibold text-sm tracking-wide uppercase whitespace-nowrap"
            style={{ color: item === '✦' ? '#FF6F61' : '#D1D5DB' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
