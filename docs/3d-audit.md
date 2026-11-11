# SchemeSathi Spatial & 3D Architectural Audit

**Document Version:** 1.0.0  
**Audit Viewports:** Desktop (1440 × 900px, 2× DPR) & Mobile (390 × 844px, 2× DPR)  
**Locale Coverage:** English (en-IN) & Hindi (hi-IN Devanagari + Bilingual Audio Guide)  
**Date:** November 2026  
**Status:** Baseline Completed  

---

## 1. Executive Summary & Design Principles

SchemeSathi is an official-standard civic welfare eligibility engine targeting two primary user groups:
1. **Rural and semi-urban citizens:** Navigating on budget Android phones (often low GPU memory, bright outdoor glare, patchy 4G connectivity).
2. **Common Service Centre (CSC) village kiosk operators:** Operating on aging desktop PCs, requiring rapid keyboard-driven navigation, high trust, and instantaneous output.

### Core Directive
Any 3D or spatial treatment must communicate verified institutional authority, tangible benefit compounding, and physical receipt reality. **It must never look like a Web3 crypto launchpad, a playful indie game, or an artificial marketing gimmick.** Decorative background noise (such as unrelated canvas particle waves) is explicitly rejected because it reduces headline legibility and degrades mobile frame rates without explaining government welfare.

---

## 2. Section-by-Section Spatial Audit

### 2.1 Sticky Header & Navigation
* **Job:** Brand anchor, trust signaling ("Civic Welfare Platform"), direct navigation to Verified Schemes directory, and primary CTA to initiate the eligibility check.
* **Current Hierarchy & Depth:**
  - Flat white backdrop (`bg-white/95`) with standard `backdrop-blur-md` and a 1px border (`border-zinc-200`).
  - Brand mark uses an obsidian rounded square (`w-8 h-8 rounded-lg bg-[#111111]`) with an emblem crest.
  - Quick action uses a high-contrast black pill button (`rounded-full bg-[#111111]`).
* **Current Weaknesses:**
  - Completely 2D/flat; feels like a standard SaaS navigation rather than an institutional civic portal.
  - Lacks tactile physical anchoring when scrolling through long content.
* **Spatial / 3D Enhancement Potential:**
  - **Apple-spec Liquid Glass Track:** Refined frosted translucency (`bg-white/75 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.02)]`).
  - **Specular Edge Sheen:** A razor-thin top specular reflection line (`inset 0 1px 0 0 rgba(255,255,255,0.8)`) that catches ambient light as content scrolls beneath.
* **Performance & Accessibility Risks:**
  - *Risk:* Heavy `backdrop-filter: blur(24px)` can cause composite layer stuttering on budget mobile WebViews during fast scrolling.
  - *Mitigation:* Cap blur at `backdrop-blur-md` (12px), use `will-change: transform`, and provide a solid `bg-[#FAF9F5]` fallback for `prefers-reduced-motion` or low-end devices.

---

### 2.2 Hero Section & Question 1 Daylight Console
* **Job:** Communicate SchemeSathi's value proposition ("Find Government Schemes You Qualify For — One Simple Question at a Time") and provide an immediate, zero-friction interactive hook where the citizen can answer Question 1 right on the homepage.
* **Current Hierarchy & Depth:**
  - **Left Column:** High-contrast Grotesque typography with a humanist italic serif accent (`One Simple Question`), audio guide pill with bilingual toggle, and reassurance metadata.
  - **Right Column:** Daylight question card (`rounded-2xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]`) with Step 1 of 4 indicator, large Yes/No radio options, and `Continue to Step 2 →` CTA.
* **Current Weaknesses:**
  - The previous decorative particle wave was disconnected from the product mission.
  - The Question 1 card floats on a flat plane without expressing the tangible physical weight of an official civic application.
* **Spatial / 3D Enhancement Potential:**
  - **Hero Spatial Anchor (Single Hero Object):** Replace disconnected background particles with a single, highly refined 3D physical object anchored behind/beside the console:
    - *SchemeSathi Shield Emblem:* A tactile, slowly hovering 3D shield emblem with soft Fresnel rim-lighting that tilts gently with cursor/gyroscope physics (inspired by Oryzo’s single-object restraint).
    - *Floating Scheme Cards:* Three dimensional glass-card planes representing Healthcare, Housing, and Agriculture that react subtly when Option 1 vs Option 2 is selected.
  - **Tactile Card Elevation (Interactive Micro-Tilt):** Subtle 3D card tilt (`perspective: 1000px, rotateX / rotateY` clamped to ±3 degrees) on the Question 1 container on desktop mouse move.
* **Performance & Accessibility Risks:**
  - *Risk:* WebGL shaders or continuous render loops drain mobile batteries and tank framerates on low-end Mali/Adreno GPUs.
  - *Mitigation:* Render 3D objects with strict draw-call budgeting (1 draw call, < 500 polygons, or pre-rendered cinematic sprite/CSS 3D transform layers). Automatically pause WebGL rendering when offscreen or window is blurred.

---

### 2.3 Featured Verified Schemes (3 Passbook Cards)
* **Job:** Showcase the primary central welfare programs (PM-KISAN, PMAY-G, Ayushman Bharat PM-JAY) with verified grant figures, official ministry links, and institutional authority.
* **Current Hierarchy & Depth:**
  - 3-column grid of white tactile cards with `border border-zinc-200`, subtle inset highlight (`inset 0 1px 0 0 rgba(255,255,255,0.9)`), live CountUp numbers (₹6,000, ₹1.30 Lakh, ₹5,00,000), and external ministry links.
* **Current Weaknesses:**
  - Cards look like standard FinTech marketing boxes; they lack the distinct tactile feel of physical government sanction letters, passbooks, or treasury bonds.
* **Spatial / 3D Enhancement Potential:**
  - **Physical Passbook Skeuomorphism (Cult UI / Linear Depth):** Multi-layered card depth:
    - 1px hairline border with top specular light (`border-t-white/80`).
    - Subtle 3D parallax on hover: the ministry badge, grant figure, and bottom hospital/cashless pill shift at staggered Z-depths (`translateZ(8px)`, `translateZ(16px)`).
    - Soft metallic deboss on ministry crests.
* **Performance & Accessibility Risks:**
  - *Risk:* Nested CSS 3D transforms (`transform-style: preserve-3d`) create new stacking contexts and blur font rendering on Windows/WebKit.
  - *Mitigation:* Keep typography on flat pixel grid; apply 3D transforms only to the outer card container and icon planes.

---

### 2.4 Compounding Entitlement Model (Household Bento Matrix)
* **Job:** The core mathematical revelation of SchemeSathi: demonstrating that Indian households qualify for multiple schemes simultaneously, compounding into significant annual value (e.g. ₹6,36,000).
* **Current Hierarchy & Depth:**
  - Apple glassmorphic profile switcher: `[Small Farmer Family] [Rural Artisan / Labourer] [Senior Citizen Household]`.
  - Giant tabular metric: `₹6,36,000 Total Annual Household Welfare Value & Cashless Cover`.
  - Proportional segmented grant bar (Sky Blue 79%, Ochre Amber 20%, Emerald 1% min-w 14px).
  - 3 detailed scheme ledger rows with color-synced tags and dwelling toggle (`[Kutcha Dwelling] [Pucca Dwelling]`).
* **Current Weaknesses:**
  - The stacked bar is currently a flat 2D horizontal progress bar (`h-2.5 bg-zinc-100 rounded-full`). It does not convey the physical "stacking" or "compounding" of wealth and security.
* **Spatial / 3D Enhancement Potential:**
  - **Extruded 3D Compounding Blocks (Wise / Stripe Architecture):**
    - Transform the flat segmented bar into 3D isometric tactile blocks that stack vertically or extrude horizontally on scroll.
    - As the user toggles between "Small Farmer" and "Rural Artisan", the 3D blocks physically shift, slide, and snap with spring physics.
    - Interactive depth on ledger rows: hover state triggers a slight forward displacement (`translateZ(4px)`) with realistic shadow expansion.
* **Performance & Accessibility Risks:**
  - *Risk:* Complex 3D bar geometry can break screen readers or slow down DOM rendering.
  - *Mitigation:* Keep the underlying DOM structure completely semantic (`aria-valuenow`, `role="meter"`). Render 3D extrusion via CSS 3D box-shadow (`box-shadow: 0 4px 0 #0284C7, 0 6px 12px rgba(0,0,0,0.08)`) which costs 0 WebGL overhead and works universally.

---

### 2.5 How SchemeSathi Works (3-Step Micro-UI Pipeline)
* **Job:** Demystify the 3-step verification pipeline (01. One Question at a Time, 02. Instant Criteria Verification, 03. Instant Kiosk Print Slip) for both citizens and village operators.
* **Current Hierarchy & Depth:**
  - 3 white cards with embedded micro-UI preview stages:
    - Step 1: Voice wave visualizer + Yes/No simulation.
    - Step 2: Criteria check list with green badges.
    - Step 3: CSC Document Checklist slip with PDF download indicator.
* **Current Weaknesses:**
  - The micro-UI stages are static boxes inside cards; they feel like screenshots rather than interactive physical mechanisms.
* **Spatial / 3D Enhancement Potential:**
  - **Spatial Card Tilt & Layer Stacking (Apple Keynote / Linear style):**
    - Step 3 (CSC Slip) can feature a physical 3D paper slip that gently peeks out of a simulated envelope or printer slot with realistic shadow falloff.
    - Step 1 (Voice Wave) can use spatial sound-rings that expand along the Z-axis.
    - Smooth scroll-triggered stagger with Apple physics: `y: 0`, slight tilt entering from viewport.
* **Performance & Accessibility Risks:**
  - *Risk:* Heavy animation loops on 3 cards simultaneously will cause jank on budget mobile devices.
  - *Mitigation:* CSS-only micro-animations; trigger only when element is in view via `IntersectionObserver`.

---

### 2.6 Dark CTA Band ("Claim What Is Rightfully Yours")
* **Job:** High-converting closing argument: "No middlemen, no bribery, no bureaucratic jargon. Answer 4 simple questions in 60 seconds."
* **Current Hierarchy & Depth:**
  - Full-width rounded obsidian box (`bg-[#111111] text-white`) with high-contrast white pill button (`Check Eligibility in 60s →`) and ghost border button (`Browse All Verified Schemes →`).
* **Current Weaknesses:**
  - A flat black rectangle that feels disconnected from the warm alabaster editorial canvas above.
* **Spatial / 3D Enhancement Potential:**
  - **Subtle Deep Space Ambient Curvature:** Add a razor-thin top ambient glow border (`border-t border-emerald-500/20`) and soft radial mesh depth (`radial-gradient(ellipse at top, rgba(5,150,105,0.12), transparent 70%)`).
  - Tactile physical button press: `shadow-[0_4px_14px_rgba(255,255,255,0.15)]` on hover with active spring compression.
* **Performance & Accessibility Risks:**
  - *Risk:* Poor contrast if background gradients bleed into body text.
  - *Mitigation:* Ensure high contrast (target: minimum 7:1 for headers, 4.5:1 for body) for all white copy on `#111111`.

---

### 2.7 Schemes Directory (`/schemes` - SchemeExplorer)
* **Job:** Comprehensive, searchable directory of verified central schemes with category tabs (`All`, `Farmer Support`, `Housing & Shelter`, `Healthcare`, `Women & Children`, `Senior Citizens`).
* **Current Hierarchy & Depth:**
  - Search input with `/` shortcut badge.
  - Apple glassmorphic category filter pills.
  - 2-column scheme card grid.
* **Current Weaknesses:**
  - Search and card list feel somewhat two-dimensional when browsing dozens of programs.
* **Spatial / 3D Enhancement Potential:**
  - **Fast & Flat Architecture (Directive Rule):** Per the design rules, this directory must remain **mostly flat and high-speed**.
  - Depth should be achieved strictly through CSS: Apple-style glassmorphic active filter pill, crisp 1px borders, and micro-hover card elevation. Zero WebGL canvas overhead here.
* **Performance & Accessibility Risks:**
  - Fast search filtering must not re-trigger 3D canvas draws or layout thrashing.

---

### 2.8 Eligibility Wizard (`/interview` - GuidedInterview & QuestionCard)
* **Job:** The high-stakes transaction: presenting 4 single-focus questions with keyboard shortcuts, voice input, and high-visibility radio options.
* **Current Hierarchy & Depth:**
  - Centered modal container with progress bar, question title, helper text, and numbered option cards (1, 2, 3).
  - Apple glassmorphic frame (`p-1.5 sm:p-2 bg-zinc-200/40 backdrop-blur-md border border-black/[0.06] rounded-2xl`).
* **Current Weaknesses:**
  - Transition between Question 1, 2, 3, 4 is an instant slide; it lacks the smooth physical glide of an official card deck.
* **Spatial / 3D Enhancement Potential:**
  - **Spatial Card-Stack Transition (Linear / Apple iOS style):**
    - As the user clicks Option 1, the completed question gently recedes (`scale: 0.96, y: -12, opacity: 0`) while the next question smoothly slides up into focus (`y: 16 -> 0, opacity: 0 -> 1`).
    - The active option button depresses with tactile spring physics (`translateY(2px)` with shadow collapse).
    - No 3D WebGL runtime needed—executed entirely with Framer-Motion hardware-accelerated transforms.
* **Performance & Accessibility Risks:**
  - *Risk:* Moving elements can disorient low-literacy users or those with vestibular disorders.
  - *Mitigation:* Respect `prefers-reduced-motion: reduce` by replacing spatial slides with instantaneous opacity crossfades.

---

### 2.9 Typography, Language & Devanagari (Hindi) Audit
* **Job:** Enable equitable civic access across India’s linguistic demographic (English + Hindi Devanagari).
* **Current Observations:**
  - Font Stack: `Plus Jakarta Sans` for English, with `Noto Sans Devanagari` in Tailwind configuration.
  - Google Fonts import in `index.html` currently only imports weights 400-800 for `Plus Jakarta Sans` and `JetBrains Mono`. `Noto Sans Devanagari` needs explicit font linking to ensure zero font-swap flash on mobile devices.
  - Hero audio guide currently supports toggle between English and Hindi, with Hindi Devanagari prompt (`योजना साथी में आपका स्वागत है...`).
* **Spatial / 3D Implications:**
  - Devanagari script has complex matras (vowel signs above/below characters). **3D text, canvas text, or heavy blur filters behind Devanagari dramatically degrade legibility.**
  - **Strict Rule:** Text must remain 100% semantic HTML with crisp antialiasing, never rendered onto 3D surfaces or canvas textures.

---

## 3. Summary of Section Scores & Spatial Potential

| Section | Current Spatial Depth (1-10) | Recommended Spatial Treatment | Tech Stack | Performance Impact |
| :--- | :---: | :--- | :--- | :--- |
| **Navbar** | 4/10 | Apple Liquid Glass with specular edge | CSS (`backdrop-blur-md`, border) | 0 KB |
| **Hero + Console** | 5/10 | Single 3D Hero Emblem (SchemeSathi Shield) | Micro-WebGL / CSS 3D | < 25 KB |
| **Featured Schemes** | 4/10 | Physical Passbook multi-layer card depth | CSS 3D Parallax & Inset Light | 0 KB |
| **Household Bento** | 5/10 | 3D Compounding Blocks (isometric stacked bar) | CSS 3D box-shadow / transforms | 0 KB |
| **How It Works** | 4/10 | Staggered 3D Paper Slip elevation & sound rings | CSS / Framer-Motion | 0 KB |
| **CTA Band** | 3/10 | Ambient Curvature & emerald horizon glow | CSS Radial Mesh | 0 KB |
| **Schemes Explorer**| 4/10 | **Stay Fast & Flat:** Glassmorphic filter pills | CSS only | 0 KB |
| **Wizard / Modal** | 5/10 | Spatial Card-Stack slide transition | Framer-Motion 3D transforms | 0 KB |
| **Footer** | 3/10 | Clean, grounding typography anchor | Semantic HTML + subtle grid | 0 KB |

---

*Audit documented and saved to `SchemeSathi/docs/3d-audit.md`.*

