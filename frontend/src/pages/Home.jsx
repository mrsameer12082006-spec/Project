import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Sprout,
  Home as HomeIcon,
  ShieldPlus,
  Sliders,
  FileCheck,
  ReceiptText,
  Clock,
  FileText,
  CreditCard,
  CheckCircle2,
  Check,
  Volume2
} from 'lucide-react';
import CountUp from '../components/common/CountUp';
import { speakAudio, stopAudio } from '../services/api';
import HouseholdEntitlementBento from '../components/home/HouseholdEntitlementBento';
import HeroShieldEmblem from '../components/home/HeroShieldEmblem';

// Framer-Motion Stagger & Scroll Entrance Variants (Apple / Linear Physics)
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const fadeUpCard = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Home({ onStart, onBrowse }) {
  const [selectedOption, setSelectedOption] = useState(1);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioLang, setAudioLang] = useState('en');
  const [activeAudience, setActiveAudience] = useState('citizen');
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e) => {
    // Check if on touch/coarse device
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardTilt({
      x: Math.max(-2.5, Math.min(2.5, -(y / (rect.height / 2)) * 2.5)),
      y: Math.max(-3, Math.min(3, (x / (rect.width / 2)) * 3))
    });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  const effectiveOption = hoveredOption !== null ? hoveredOption : selectedOption;

  const audioIntros = {
    en: 'Welcome to SchemeSathi. Discover verified government welfare schemes you qualify for by answering just 4 simple questions. Question 1: Do you or your family own cultivable agricultural land? Tap option 1 for Yes, or option 2 for No.',
    hi: 'योजना साथी में आपका स्वागत है। केवल 4 सरल सवालों के जवाब देकर जानिए कि आप किन सरकारी कल्याणकारी योजनाओं के पात्र हैं। सवाल 1: क्या आपके परिवार के पास खेती योग्य भूमि है? हाँ के लिए विकल्प 1 और ना के लिए विकल्प 2 चुनें।'
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Keyboard navigation for power users & CSC kiosk operators
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '1') {
        setSelectedOption(1);
      } else if (e.key === '2') {
        setSelectedOption(2);
      } else if (e.key === 'Enter') {
        handleProceed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption]);

  const handleToggleAudio = (targetLang) => {
    const langToUse = targetLang || audioLang;
    if (isAudioPlaying && (!targetLang || targetLang === audioLang)) {
      stopAudio();
      setIsAudioPlaying(false);
    } else {
      stopAudio();
      setIsAudioPlaying(true);
      if (targetLang && targetLang !== audioLang) {
        setAudioLang(targetLang);
      }
      speakAudio(audioIntros[langToUse], langToUse, {
        onStart: () => setIsAudioPlaying(true),
        onEnd: () => setIsAudioPlaying(false),
        onError: () => setIsAudioPlaying(false)
      });
    }
  };

  const handleProceed = () => {
    onStart({
      has_land: {
        value: selectedOption === 1,
        label: selectedOption === 1 ? 'Yes, family owns cultivable land' : 'No agricultural land owned'
      }
    });
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      
      {/* ───────────────────────────────────────────────────────────
          1. ASYMMETRIC 2-COLUMN HERO & INTERACTIVE CONSOLE
          ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FAF9F5] text-[#0C0A09] border-y border-[#E5E3DC] -mx-4 sm:-mx-6 lg:-mx-8">
        
        {/* Atmospheric Sunlight Dual Radial Glow (Stripe / Linear Architecture) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Warm Emerald / Mint Sunlight Glow (Top Right) */}
          <div className="absolute -top-24 -right-16 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.08)_0%,rgba(16,185,129,0.03)_40%,transparent_70%)] blur-3xl pointer-events-none" />
          
          {/* Subtle Marine Sky Glow (Top Left) */}
          <div className="absolute -top-32 -left-16 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(2,132,199,0.06)_0%,transparent_65%)] blur-3xl pointer-events-none" />

          {/* Soft Amber Warmth (Center Inset) */}
          <div className="absolute top-44 left-1/3 w-[450px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(217,119,6,0.035)_0%,transparent_60%)] blur-3xl pointer-events-none" />
        </div>

        {/* Main Framed Container with Vertical Architectural Rails */}
        <div className="relative mx-auto max-w-7xl border-x border-[#E5E3DC] px-5 sm:px-8 lg:px-12 py-10 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:gap-12 lg:grid-cols-12">
            
            {/* LEFT 6 COLUMNS: Editorial Pitch & Tactile Controls */}
            <div className="lg:col-span-6 space-y-6">

              {/* SchemeSathi 3D Shield Emblem + Gazette Status + Kiosk Switcher */}
              <HeroShieldEmblem
                activeAudience={activeAudience}
                setActiveAudience={setActiveAudience}
                className="pb-1"
              />

              {/* Display Headline with Humanist Italic Accent */}
              <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-extrabold tracking-[-0.035em] leading-[1.14] text-[#111111]">
                Find Government Schemes You Qualify For — <span className="italic font-serif font-normal text-zinc-700">One Simple Question</span> at a Time.
              </h1>

              {/* Plain Language Subtitle */}
              <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#57534E]">
                No bureaucratic forms, no login needed. Answer 4 simple questions one by one with voice or tap, verified against official central ministry guidelines.
              </p>

              {/* High-Impact Action Row: Primary CTA + Vapi Voice Pill */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                
                {/* Primary CTA Button */}
                <button
                  type="button"
                  onClick={() => onStart()}
                  className="group relative inline-flex items-center gap-3 rounded-full bg-[#111111] px-7 py-3.5 text-sm sm:text-[15px] font-bold text-white shadow-[0_8px_20px_-4px_rgba(17,17,17,0.3)] transition-all duration-150 hover:bg-[#262626] active:scale-[0.985] focus:outline-hidden"
                >
                  <span className="tracking-tight">Check Your Eligibility</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs transition-transform duration-150 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                {/* Vapi-Style Interactive Audio Guide Pill with Live Equalizer & Bilingual Toggle */}
                <div className="inline-flex items-center rounded-full bg-white border border-zinc-200/90 shadow-2xs p-1">
                  <button
                    type="button"
                    onClick={() => handleToggleAudio()}
                    className={`inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-150 active:scale-[0.985] ${
                      isAudioPlaying
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'text-[#111111] hover:bg-zinc-100'
                    }`}
                  >
                    {/* Live Oscillating Audio Equalizer */}
                    <span className="flex items-end gap-[2px] h-3.5 w-4" aria-hidden="true">
                      <span className={`eq-bar ${isAudioPlaying ? 'animate-eq-bar-1 text-emerald-400' : 'h-1.5 text-zinc-400'}`} />
                      <span className={`eq-bar ${isAudioPlaying ? 'animate-eq-bar-2 text-emerald-400' : 'h-3 text-zinc-600'}`} />
                      <span className={`eq-bar ${isAudioPlaying ? 'animate-eq-bar-3 text-emerald-400' : 'h-2 text-zinc-500'}`} />
                      <span className={`eq-bar ${isAudioPlaying ? 'animate-eq-bar-4 text-emerald-400' : 'h-3.5 text-zinc-700'}`} />
                    </span>
                    <span>{isAudioPlaying ? 'Stop Audio' : 'Audio Guide'}</span>
                  </button>

                  {/* Apple Glassmorphic Bilingual Switcher */}
                  <div className="flex items-center gap-1 border-l border-zinc-200/80 pl-1.5 pr-1 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => handleToggleAudio('en')}
                      className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                        audioLang === 'en'
                          ? 'bg-[#111111] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
                          : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/[0.04]'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleAudio('hi')}
                      className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                        audioLang === 'hi'
                          ? 'bg-[#111111] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
                          : 'text-zinc-500 hover:text-zinc-900 hover:bg-black/[0.04]'
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>

              </div>

              {/* Trust Ledger Strip with Lucide Icons */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5E3DC]">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>Time</span>
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-bold text-[#0C0A09]">
                    60 Seconds
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                    <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>Questions</span>
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-bold text-[#0C0A09]">
                    4 Simple Steps
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Privacy</span>
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-bold text-[#16A34A]">
                    Zero Document Uploads
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT 6 COLUMNS: High-Craft Interactive Question Card (Cal.com + GOV.UK Pattern) */}
            <div className="lg:col-span-6 perspective-container">
              
              {/* Apple Glassmorphic Daylight Form Card with 3D Perspective Tilt */}
              <div 
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  transform: `perspective(1200px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                  transition: 'transform 120ms ease-out'
                }}
                className="spatial-glass rounded-2xl p-6 sm:p-7 space-y-5 transition-shadow hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.08)]"
              >
                
                {/* Clean Top Progress Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-700">
                    <Sprout className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Question 1 of 4 · Agricultural Landholding</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1" aria-label="Step 1 of 4">
                      <span className="h-1.5 w-6 rounded-full bg-[#111111]" />
                      <span className="h-1.5 w-4 rounded-full bg-zinc-200" />
                      <span className="h-1.5 w-4 rounded-full bg-zinc-200" />
                      <span className="h-1.5 w-4 rounded-full bg-zinc-200" />
                    </div>
                    <span className="text-xs text-zinc-400 font-semibold">
                      1 / 4
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <div className="space-y-1">
                  <h2 className="text-lg sm:text-2xl font-bold text-[#0C0A09] leading-snug">
                    Do you or your family own cultivable agricultural land?
                  </h2>
                  <p className="text-xs sm:text-sm text-[#777169]">
                    Select your landholding status to evaluate land-linked central benefits.
                  </p>
                </div>

                {/* GOV.UK Tactile Keycap Option Rows */}
                <div className="space-y-2.5 pt-1">
                  
                  {/* Option 1: Yes */}
                  <button
                    type="button"
                    onClick={() => setSelectedOption(1)}
                    onMouseEnter={() => setHoveredOption(1)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={`group relative flex w-full items-center justify-between rounded-xl p-4 text-left transition-all duration-150 active:translate-y-[1px] focus:outline-hidden ${
                      selectedOption === 1
                        ? 'spatial-glass-emerald'
                        : 'bg-white/70 backdrop-blur-md border border-zinc-200/80 hover:border-zinc-300 hover:bg-white/95 shadow-[0_2px_0_0_#E4E4E7]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        selectedOption === 1
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-zinc-100 text-zinc-800 border border-zinc-200'
                      }`}>
                        1
                      </span>
                      <div>
                        <div className="text-sm sm:text-[15px] font-bold text-[#111111] leading-tight">
                          Yes, family owns cultivable land
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5">
                          Qualifies for PM-KISAN & landholding welfare
                        </div>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      selectedOption === 1
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-zinc-300 bg-white'
                    }`}>
                      {selectedOption === 1 && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>

                  {/* Option 2: No */}
                  <button
                    type="button"
                    onClick={() => setSelectedOption(2)}
                    onMouseEnter={() => setHoveredOption(2)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={`group relative flex w-full items-center justify-between rounded-xl p-4 text-left transition-all duration-150 active:translate-y-[1px] focus:outline-hidden ${
                      selectedOption === 2
                        ? 'bg-zinc-100/90 border-2 border-zinc-900 shadow-[0_3px_0_0_#18181B]'
                        : 'bg-white/70 backdrop-blur-md border border-zinc-200/80 hover:border-zinc-300 hover:bg-white/95 shadow-[0_2px_0_0_#E4E4E7]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                        selectedOption === 2
                          ? 'bg-zinc-900 text-white shadow-xs'
                          : 'bg-zinc-100 text-zinc-800 border border-zinc-200'
                      }`}>
                        2
                      </span>
                      <div>
                        <div className="text-sm sm:text-[15px] font-bold text-[#111111] leading-tight">
                          No agricultural land owned
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5">
                          Focus on rural housing (PMAY-G) and healthcare (PM-JAY)
                        </div>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      selectedOption === 2
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-300 bg-white'
                    }`}>
                      {selectedOption === 2 && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>

                </div>

                {/* Sleek 1-Line Dynamic Micro-Ticker (Image 3 Redesign) */}
                <div className="rounded-xl spatial-glass p-2.5 sm:p-3 border border-emerald-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                    <span className="text-zinc-600 font-medium">Live Reaction:</span>
                    <span className="font-extrabold text-[#111111] text-sm metric-tabular">
                      {effectiveOption === 1 ? '₹6,36,000 / yr' : '₹6,30,000 / yr'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[11px] border border-emerald-300/70">
                      {effectiveOption === 1 ? '3 of 3 Schemes Active' : '2 of 3 Schemes Active'}
                    </span>
                    <span className="text-zinc-500 text-[11px] hidden sm:inline">
                      {effectiveOption === 1 ? '· incl. PM-KISAN ₹6k' : '· excl. PM-KISAN (landless)'}
                    </span>
                  </div>
                </div>

                {/* Clean Bottom Action Row with Keyboard Shortcut Keycaps */}
                <div className="pt-1 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-500 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>No login or paperwork needed</span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5 text-zinc-400 text-[11px] font-medium">
                      <span>Press</span>
                      <span className="keycap-badge">1</span>
                      <span>or</span>
                      <span className="keycap-badge">2</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleProceed}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] hover:bg-[#262626] text-white font-bold px-6 py-2.5 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.15)] transition-all active:scale-[0.985] group shrink-0 whitespace-nowrap"
                    >
                      <span>Continue to Step 2</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────
          2. FEATURED SCHEMES: Crisp Passbook Cards with Lucide Icons
          ─────────────────────────────────────────────────────────── */}
      <section className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0C0A09]">
              Featured Verified Schemes
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
              Official rules grounded directly in central ministry guidelines
            </p>
          </div>

          <button
            type="button"
            onClick={onBrowse}
            className="text-xs sm:text-sm font-semibold text-[#0C0A09] hover:underline"
          >
            View all schemes →
          </button>
        </div>

        {/* 3 Featured Passbook Cards with Micro-Lift Interaction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: PM-KISAN (Farmer Support) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="tactile-card rounded-2xl overflow-hidden border border-zinc-200 hover:border-zinc-300 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200"
          >
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 shadow-2xs text-zinc-900 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Farmer Support</span>
                </span>
                <a
                  href="https://pmkisan.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-zinc-500 hover:text-emerald-800 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>pmkisan.gov.in</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0C0A09] metric-tabular tracking-tight">
                  <CountUp end={6000} prefix="₹" duration={650} />{' '}
                  <span className="text-xs font-medium text-zinc-500 font-sans">
                    / year
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0C0A09] leading-snug">
                  PM Kisan Samman Nidhi
                </h3>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Direct income support of ₹6,000 per year transferred in 3 equal installments of ₹2,000 directly via DBT to eligible landholding farmer families.
              </p>
            </div>

            <div className="p-4 sm:p-5 pt-3 border-t border-zinc-100 bg-zinc-50/50 space-y-2 text-xs text-zinc-500">
              <div className="flex items-center gap-2 text-zinc-800 bg-white border border-zinc-200 shadow-2xs px-2.5 py-1 rounded-md text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>
                  Direct DBT Bank Transfer
                </span>
              </div>
              <div className="text-zinc-400 text-[11px] pl-0.5">
                Ministry of Agriculture & Farmers Welfare
              </div>
            </div>
          </motion.div>

          {/* Card 2: PMAY-G (Rural Housing) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="tactile-card rounded-2xl overflow-hidden border border-zinc-200 hover:border-zinc-300 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200"
          >
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 shadow-2xs text-zinc-900 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight">
                  <HomeIcon className="w-3.5 h-3.5 text-amber-600" />
                  <span>Rural Housing</span>
                </span>
                <a
                  href="https://pmayg.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-zinc-500 hover:text-amber-800 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>pmayg.nic.in</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0C0A09] metric-tabular tracking-tight">
                  ₹1.20–1.30{' '}
                  <span className="text-xs font-medium text-zinc-500 font-sans">
                    Lakh Grant
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0C0A09] leading-snug">
                  PM Awas Yojana (Gramin)
                </h3>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Financial assistance of ₹1.20 to ₹1.30 Lakh for construction of a permanent pucca house + 90 days of dedicated MGNREGA unskilled labour wages.
              </p>
            </div>

            <div className="p-4 sm:p-5 pt-3 border-t border-zinc-100 bg-zinc-50/50 space-y-2 text-xs text-zinc-500">
              <div className="flex items-center gap-2 text-zinc-800 bg-white border border-zinc-200 shadow-2xs px-2.5 py-1 rounded-md text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>
                  Pucca House + 90 Days MGNREGA
                </span>
              </div>
              <div className="text-zinc-400 text-[11px] pl-0.5">
                Ministry of Rural Development
              </div>
            </div>
          </motion.div>

          {/* Card 3: PM-JAY (Free Healthcare) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="tactile-card rounded-2xl overflow-hidden border border-zinc-200 hover:border-zinc-300 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200"
          >
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-white border border-zinc-200 shadow-2xs text-zinc-900 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-tight">
                  <ShieldPlus className="w-3.5 h-3.5 text-sky-600" />
                  <span>Free Healthcare</span>
                </span>
                <a
                  href="https://pmjay.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-zinc-500 hover:text-sky-800 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>pmjay.gov.in</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0C0A09] metric-tabular tracking-tight">
                  <CountUp end={500000} prefix="₹" duration={750} />{' '}
                  <span className="text-xs font-medium text-zinc-500 font-sans">
                    / family / year
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0C0A09] leading-snug">
                  Ayushman Bharat PM-JAY
                </h3>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Comprehensive secondary and tertiary care hospitalization coverage up to ₹5 Lakh per family per year, completely cashless across 27,000+ empanelled hospitals.
              </p>
            </div>

            <div className="p-4 sm:p-5 pt-3 border-t border-zinc-100 bg-zinc-50/50 space-y-2 text-xs text-zinc-500">
              <div className="flex items-center gap-2 text-zinc-800 bg-white border border-zinc-200 shadow-2xs px-2.5 py-1 rounded-md text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                <span>
                  27,000+ Cashless Hospitals
                </span>
              </div>
              <div className="text-zinc-400 text-[11px] pl-0.5">
                National Health Authority (NHA)
              </div>
            </div>
          </motion.div>

        </div>

      </section>

      {/* ───────────────────────────────────────────────────────────
          3. HOUSEHOLD WELFARE GROWTH BENTO (Fingrow / Dribbble Inspired)
          ─────────────────────────────────────────────────────────── */}
      <HouseholdEntitlementBento onStart={onStart} onBrowse={onBrowse} />

      {/* ───────────────────────────────────────────────────────────
          4. HOW IT WORKS: Clerk-Style Self-Playing Micro-UI Bento Cards
          ─────────────────────────────────────────────────────────── */}
      <section className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Civic Service Pipeline
          </div>
          <h3 className="font-extrabold text-2xl sm:text-3xl text-[#111111] tracking-tight">
            How SchemeSathi Works
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-xl">
            A 3-step verified process designed for both individual citizens and Common Service Centre (CSC) kiosk operators
          </p>
        </div>

        {/* 3 Clerk-Style Self-Playing Micro-UI Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* STEP 01: Voice & Tap Interactive Simulation */}
          <div className="group rounded-3xl bg-white border border-zinc-200/90 p-6 flex flex-col justify-between shadow-2xs hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 transition-all duration-200 space-y-5">
            
            {/* Clerk-Style Micro-UI Stage: Voice Wave & Keycap Simulation */}
            <div className="h-44 rounded-2xl bg-[#F7F6F2] border border-zinc-200/80 p-4 flex flex-col justify-between overflow-hidden relative group-hover:border-zinc-300 transition-all">
              
              {/* Mini Console Header */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[10px] font-bold text-zinc-700 border border-zinc-200 shadow-2xs">
                  <Sprout className="w-3 h-3 text-emerald-600" />
                  <span>Question 1 of 4</span>
                </span>

                {/* Oscillating Voice Wave Visualizer */}
                <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-zinc-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="flex items-end gap-[1.5px] h-3 w-3.5">
                    <span className="w-[1.5px] bg-emerald-600 rounded-full animate-eq-bar-1" />
                    <span className="w-[1.5px] bg-emerald-600 rounded-full animate-eq-bar-2" />
                    <span className="w-[1.5px] bg-emerald-600 rounded-full animate-eq-bar-3" />
                  </span>
                  <span className="text-[9px] font-bold text-zinc-600">VOICE ACTIVE</span>
                </div>
              </div>

              {/* Simulated Keycap Buttons */}
              <div className="space-y-1.5">
                <div className="bg-emerald-50 border border-emerald-400/80 rounded-xl p-2 flex items-center justify-between text-xs shadow-2xs transition-transform group-hover:scale-[1.02]">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span className="font-bold text-[11px] text-emerald-950">
                      Yes, family owns cultivable land
                    </span>
                  </div>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                </div>

                <div className="bg-white/80 border border-zinc-200/80 rounded-xl p-2 flex items-center justify-between text-xs opacity-50">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-zinc-100 text-zinc-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span className="font-medium text-[11px] text-zinc-600">
                      No agricultural land owned
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-zinc-200/80 h-1 rounded-full overflow-hidden">
                <div className="bg-[#111111] h-full w-1/4 rounded-full" />
              </div>
            </div>

            {/* Explanatory Body */}
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                01
              </div>

              <h4 className="font-bold text-[#111111] text-lg">
                One Question at a Time
              </h4>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Answer simple, jargon-free questions one by one using voice input or touch. No complicated forms or initial document uploads.
              </p>
            </div>

            {/* Footer Tag */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                <span>Voice or Touch Input</span>
              </span>
              <span className="text-zinc-400">Step 1 of 3</span>
            </div>

          </div>

          {/* STEP 02: Attio-Style Deterministic Gazette Logic Stage */}
          <div className="group rounded-3xl bg-white border border-zinc-200/90 p-6 flex flex-col justify-between shadow-2xs hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 transition-all duration-200 space-y-5">
            
            {/* Clerk-Style Micro-UI Stage: Logic Verification Nodes */}
            <div className="h-44 rounded-2xl bg-[#F7F6F2] border border-zinc-200/80 p-4 flex flex-col justify-between overflow-hidden relative group-hover:border-zinc-300 transition-all">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[10px] text-zinc-600 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Gazette Rule Verification</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/70">
                  3/3 PASSED
                </span>
              </div>

              {/* Clean Rule Verification Criteria */}
              <div className="space-y-1.5">
                <div className="rounded-lg bg-white p-2 border border-zinc-200 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-[11px] font-medium text-zinc-700 truncate">
                    Cultivable Agricultural Land Title
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    <span>PM-KISAN</span>
                  </span>
                </div>

                <div className="rounded-lg bg-white p-2 border border-zinc-200 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-[11px] font-medium text-zinc-700 truncate">
                    Kutcha or Temporary Dwelling
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    <span>PMAY-G</span>
                  </span>
                </div>

                <div className="rounded-lg bg-white p-2 border border-zinc-200 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-[11px] font-medium text-zinc-700 truncate">
                    Socio-Economic Deprivation (D1–D7)
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    <span>PM-JAY</span>
                  </span>
                </div>
              </div>

              {/* Status Line */}
              <div className="text-[10px] text-zinc-500 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Verified against central ministry guidelines · Zero intermediaries</span>
              </div>
            </div>

            {/* Explanatory Body */}
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                02
              </div>

              <h4 className="font-bold text-[#111111] text-lg">
                Instant Criteria Verification
              </h4>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Instant criteria verification strictly grounded in official central ministry guidelines without guesswork or intermediaries.
              </p>
            </div>

            {/* Footer Tag */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-emerald-800 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                <span>Official Policy Grounded</span>
              </span>
              <span className="text-zinc-400 font-normal">Step 2 of 3</span>
            </div>

          </div>

          {/* STEP 03: Stripe Tax / Kiosk Thermal Slip Slide-Out */}
          <div className="group rounded-3xl bg-white border border-zinc-200/90 p-6 flex flex-col justify-between shadow-2xs hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 transition-all duration-200 space-y-5">
            
            {/* Clerk-Style Micro-UI Stage: Emerging Thermal Receipt */}
            <div className="h-44 rounded-2xl bg-[#F7F6F2] border border-zinc-200/80 p-3 flex flex-col items-center justify-start overflow-hidden relative group-hover:border-zinc-300 transition-all">
              
              {/* Printer Hardware Slot */}
              <div className="w-28 h-1.5 rounded-full bg-zinc-800 mb-2 shadow-xs shrink-0" />

              {/* Sliding Receipt Slip (Hover-Reactive Motion) */}
              <div className="w-full bg-white rounded-xl border border-zinc-300/90 p-3 shadow-sm transition-transform duration-300 group-hover:translate-y-1 space-y-2">
                
                <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <ReceiptText className="w-3.5 h-3.5 text-zinc-700" />
                    <span className="font-bold text-[10px] text-[#111111]">
                      CSC DOCUMENT SLIP
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-zinc-500">
                    1-PAGE PDF
                  </span>
                </div>

                {/* Checklist Preview */}
                <div className="space-y-1 text-[10px] text-zinc-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-3 h-3 rounded-xs bg-emerald-100 text-emerald-800 flex items-center justify-center text-[8px] font-bold">✓</span>
                    <span>Aadhaar-Linked Bank Account</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-3 h-3 rounded-xs bg-emerald-100 text-emerald-800 flex items-center justify-center text-[8px] font-bold">✓</span>
                    <span>Land Record (Khasra/Khatauni)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="w-3 h-3 rounded-xs bg-emerald-100 text-emerald-800 flex items-center justify-center text-[8px] font-bold">✓</span>
                    <span>Ration Card / SECC ID Proof</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-dashed border-zinc-200 text-[9px] text-center text-zinc-500 font-medium">
                  Submit directly to village VLE kiosk operator
                </div>

              </div>

            </div>

            {/* Explanatory Body */}
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                03
              </div>

              <h4 className="font-bold text-[#111111] text-lg">
                Instant Kiosk Print Slip
              </h4>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Generate a clean 1-page document checklist receipt to take directly to your nearest Common Service Centre (CSC) for physical application.
              </p>
            </div>

            {/* Footer Tag */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 inline-block" />
                <span>Document Checklist Slip</span>
              </span>
              <span className="text-zinc-400">Step 3 of 3</span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
