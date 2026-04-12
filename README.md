# BE Marketing Studio — Website

Sitio web de BE Marketing Studio. Stack: React 19 + Vite + Tailwind CSS + GSAP + Lenis + Three.js.

## Setup local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy a Vercel via GitHub

1. Sube este proyecto a un repositorio en GitHub
2. Entra a [vercel.com](https://vercel.com) y conecta el repo
3. Vercel detecta Vite automáticamente — solo hace falta darle click a **Deploy**
4. (Opcional) Agrega tu dominio personalizado en Project Settings → Domains

## Actualizar el link de Calendly

Busca `https://calendly.com/be-marketing-studio/30min` en:
- `src/components/Hero.jsx`
- `src/components/Nav.jsx`
- `src/components/Services.jsx`
- `src/components/About.jsx`
- `src/components/CallCTA.jsx`
- `src/components/Footer.jsx`

Y reemplaza con tu link real de Calendly.

## Estructura

```
src/
├── components/
│   ├── Cursor.jsx      — Custom cursor con coral glow
│   ├── Preloader.jsx   — Animación de carga inicial
│   ├── Nav.jsx         — Navbar glassmorphism fijo
│   ├── Hero.jsx        — Hero con Three.js particles
│   ├── Marquee.jsx     — Ticker de servicios
│   ├── Services.jsx    — Grid de servicios (5 cards)
│   ├── Stats.jsx       — Contadores animados
│   ├── BEMethod.jsx    — Método BE (Brand/Experience/Business)
│   ├── About.jsx       — Nosotros + imagen activation
│   ├── CallCTA.jsx     — CTA final para agendar call
│   └── Footer.jsx      — Footer completo
├── App.jsx             — Root con Lenis smooth scroll
├── main.jsx            — Entry point
└── index.css           — Design tokens + estilos globales
```
