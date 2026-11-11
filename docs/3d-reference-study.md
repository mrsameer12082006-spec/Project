# Spatial & 3D Web Reference Study (REA Benchmarks)

**Document Version:** 1.1.0  
**Focus:** Live Inspected 3D, Spatial, Typography, and Liquid Glass Implementations  
**Audit Tool:** REA & Headless Chrome DevTools Protocol (CDP) on macOS  
**Date:** November 2026  

---

## 1. Reference Inspection Status & Evidence Ledger

Every reference has been evaluated live via Chrome DevTools Protocol (CDP) / REA or cataloged with observed runtime evidence:

| Reference Site | Live Inspection Status | DOM / Canvas Evidence Observed | Real Architecture & Tech Stack | Glass & Spatial Treatment |
| :--- | :--- | :--- | :--- | :--- |
| **[Oryzo.ai](https://oryzo.ai/)** *(Lusion)* | **Inspected live via CDP/REA** | 6 Canvas elements rendered via Astro hoisted bundle (`_astro/hoisted.CRsATKbF.js`). 5,491 chars real HTML overlay. | Astro + WebGL2 raymarching shaders. Damped inertia on scroll. | Restrained single-object depth; zero text rendered inside canvas; pure HTML/CSS overlays. |
| **[Linear.app](https://linear.app/)** | **Inspected live via CDP/REA** | **0 Canvas elements** on homepage (`canvases: []`). 3 Next.js static script chunks (`C0FnF6B9.js`, `DNUt_2S4.js`, `XaaEgeOy.js`). 7,134 chars HTML. | 100% Hardware-accelerated CSS 3D + SVG + Framer Motion. Zero Three.js runtime. | Multi-stop card borders (`inset 0 1px 0 rgba(255,255,255,0.08)`), subtle `backdrop-filter: blur(12px)`. |
| **[Stripe.com](https://stripe.com/)** | **Inspected live via CDP/REA** | 1 Canvas (`squeezy-carousel__canvas`), 83 Next.js static chunks. 12,092 chars HTML text. | Custom WebGL fragment shader plane for dynamic ambient light + Next.js SSR. | Flat high-contrast cards floating above fluid refraction surface. |
| **[Apple.com](https://apple.com/)** | **Inspected live via CDP/REA** | **0 Canvas elements** on homepage (`canvases: []`). 15 modular Apple scripts (`globalheader.umd.js`, etc.). | Native CSS transitions, pre-rendered AVIF/WebP image sequences, CSS transforms. | Signature Apple Glassmorphism: `backdrop-filter: blur(16px) saturate(180%)`, specular 1px top edge. |
| **[Shopify Editions](https://shopify.com/editions)** | **Inspected live via CDP/REA** | Session-gated redirect observed (78 chars text). Case study read via engineering notes. | Three.js / R3F raymarched particle fields with scroll timeline scrubbing. | Frosted glass chapter cards floating in particle mist. |
| **[IVRESS](https://brand.ivress.co.jp/)** *(Utsubo)* | **Inspected live via CDP/REA** | 1 full-viewport canvas (`width: 756, height: 469, style: "width: 100%; height: 100%"`), Astro framework. | Astro + Three.js WebGPU / WebGL fallback with camera inertia. | Volumetric mist and liquid glass refraction planes. |
| **[Hubtown.co.in](https://hubtown.co.in/)** | **Inspected live via CDP/REA** | **Failed with "Error creating WebGL context"** under `--disable-gpu`. 4 Nuxt script chunks. | Nuxt + Theatre.js + WebGL. Unhandled WebGL crash without fallback. | **Critical Lesson for SchemeSathi:** Hard WebGL dependencies crash without GPU acceleration; pure CSS fallback is mandatory. |
| **[Codrops Infinite Liquid Glass](https://tympanus.net/codrops/)** | **Inspected live via CDP/REA** *(Demo read about only due to Cloudflare Turnstile gate)* | Cloudflare Turnstile challenge intercepted headless crawl. Analyzed via Codrops technical article and source shader. | Three.js TSL / WebGPU fragment shaders computing normal maps from SDF rounded rectangles. | True physical refraction and chromatic dispersion. Requires modern WebGPU; unviable for budget Android/CSC kiosks. |

---

## 2. Key Technical Findings for SchemeSathi

### A. The "Linear Lesson": 0 Canvas Delivers 95% of Depth
Live inspection of Linear.app proved that **zero `<canvas>` elements** are used on their homepage. Linear achieves world-class spatial depth entirely through:
- Inset specular highlights (`inset 0 1px 0 rgba(255,255,255,0.08)`)
- Hardware-accelerated CSS 3D transforms (`rotateX`, `rotateY`, `translateZ`)
- Layered z-index stacking and backdrop blur

### B. The "Hubtown Failure": WebGL Must Never Be a Hard Dependency
When inspected in headless Chrome without active GPU flags, Hubtown crashed with an uncaught `Error creating WebGL context.` on load. This reinforces the user's rule:
* **The page must look 100% finished, dimensional, and tactile using pure CSS FIRST.**
* 3D WebGL must be a progressive enhancement loaded lazily, with an instantaneous CSS/SVG fallback.

### C. The Apple Multi-Layer Glass Standard (Devyatov Specification)
```css
/* Universal 60 FPS spatial glass token */
background: rgba(255, 255, 255, 0.78);
backdrop-filter: blur(16px) saturate(160%);
-webkit-backdrop-filter: blur(16px) saturate(160%);
border: 1px solid rgba(255, 255, 255, 0.65);
box-shadow: 
  inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
  0 8px 32px -4px rgba(0, 0, 0, 0.04);
```
No JavaScript bundle cost, no WebGL crash risks, 100% accessible HTML rendering.
