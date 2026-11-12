import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Sprout,
  Home as HomeIcon,
  HeartPulse,
  Sliders,
  FileCheck,
  ReceiptText,
  Clock,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Check,
  Volume2,
  Landmark
} from 'lucide-react';
import CountUp from '../components/common/CountUp';
import { speakAudio, stopAudio } from '../services/api';
import HouseholdEntitlementBento from '../components/home/HouseholdEntitlementBento';
import SpatialSchemeCard from '../components/home/SpatialSchemeCard';

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
        handleSelectOption(1);
      } else if (e.key === '2') {
        handleSelectOption(2);
      } else if (e.key === 'Enter') {
        handleProceed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectOption = (opt) => {
    setSelectedOption(opt);
    setTimeout(() => {
      onStart({
        has_land: {
          value: opt === 1,
          label: opt === 1 ? 'Yes, family owns cultivable land' : 'No agricultural land owned'
        }
      });
    }, 240);
  };

  const featuredSchemes = [
    {
      id: 'pm-kisan',
      rawAmount: 6000,
      amount: '₹6,000',
      period: '/ year',
      tag: 'Farmer Income Support',
      name: 'PM Kisan Samman Nidhi',
      description: 'Direct income support of ₹6,000 per year transferred in 3 equal installments of ₹2,000 directly via DBT to eligible landholding farmer families.',
      ministry: 'Ministry of Agriculture',
      portalUrl: 'https://pmkisan.gov.in',
      portalDomain: 'pmkisan.gov.in',
      accent: 'emerald',
      icon: Sprout,
      highlightTag: 'Direct DBT Bank Transfer'
    },
    {
      id: 'pm-awas',
      rawAmount: 130000,
      amount: '₹1,30,000',
      period: 'Pucca Housing Grant',
      tag: 'Rural Housing Support',
      name: 'PM Awas Yojana (Gramin)',
      description: 'Financial assistance of ₹1.20 to ₹1.30 Lakh for construction of a permanent pucca house + 90 days of dedicated MGNREGA unskilled labour wages.',
      ministry: 'Ministry of Rural Development',
      portalUrl: 'https://pmayg.nic.in',
      portalDomain: 'pmayg.nic.in',
      accent: 'amber',
      icon: HomeIcon,
      highlightTag: 'Pucca House + MGNREGA'
    },
    {
      id: 'pm-jay',
      rawAmount: 500000,
      amount: '₹5,00,000',
      period: '/ family / year',
      tag: 'Cashless Healthcare',
      name: 'Ayushman Bharat PM-JAY',
      description: 'Comprehensive secondary and tertiary care hospitalization coverage up to ₹5 Lakh per family per year, completely cashless across 27,000+ empanelled hospitals.',
      ministry: 'National Health Authority',
      portalUrl: 'https://pmjay.gov.in',
      portalDomain: 'pmjay.gov.in',
      accent: 'sky',
      icon: HeartPulse,
      highlightTag: '27,000+ Cashless Hospitals'
    }
  ];

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
    <div className="space-y-12 sm:space-y-14 pb-14">
      
      {/* ───────────────────────────────────────────────────────────
          1. ASYMMETRIC 2-COLUMN HERO & INTERACTIVE CONSOLE
          ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FAF9F5] text-[#0C0A09] border-y border-[#E5E3DC] -mx-4 sm:-mx-6 lg:-mx-8">
        
        {/* Main Framed Container with Vertical Architectural Rails */}
        <div className="relative mx-auto max-w-7xl border-x border-[#E5E3DC] px-5 sm:px-8 lg:px-12 py-10 lg:py-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:gap-12 lg:grid-cols-12">
            
            {/* LEFT 6 COLUMNS: Editorial Headline + Vapi Audio + Trust Metrics */}
            <div className="lg:col-span-6 space-y-5">

              {/* Calm Official Civic Eyebrow */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-tight">
                <Landmark className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Verified Central Welfare Portal</span>
              </div>

              {/* Display Headline with Humanist Italic Accent */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.035em] leading-[1.14] text-[#111111]">
                Find Government Schemes You Qualify For — <span className="italic font-serif font-normal text-zinc-700">One Simple Question</span> at a Time.
              </h1>

              {/* Plain Language Subtitle */}
              <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#57534E]">
                No bureaucratic forms, no login needed. Answer 4 simple questions one by one with voice or tap, verified against official central ministry guidelines.
              </p>

              {/* High-Impact Action Row: Vapi Voice Pill & Quick Tip */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                
                {/* Vapi-Style Interactive Audio Guide Pill with Live Equalizer & Bilingual Toggle */}
                <div className="inline-flex items-center rounded-full spatial-glass border border-zinc-200/90 shadow-2xs p-1">
                  <button
                    type="button"
                    onClick={() => handleToggleAudio()}
                    className={`inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-150 active:scale-[0.985] ${
                      isAudioPlaying
                        ? 'spatial-glass-button-dark text-white'
                        : 'text-[#111111] hover:bg-black/[0.04]'
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

                  {/* Bilingual Switcher */}
                  <div className="flex items-center gap-1 border-l border-zinc-200/80 pl-1.5 pr-1 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => handleToggleAudio('en')}
                      className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                        audioLang === 'en'
                          ? 'spatial-segmented-pill-active'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleAudio('hi')}
                      className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                        audioLang === 'hi'
                          ? 'spatial-segmented-pill-active'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>

                <span className="text-xs text-zinc-500 font-medium">
                  Takes 60 seconds · Voice or tap
                </span>
              </div>

              {/* Trust Ledger Strip with Lucide Icons */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E5E3DC]">
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
                    <FileCheck className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>Questions</span>
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-bold text-[#0C0A09]">
                    4 Simple Steps
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Privacy</span>
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-bold text-emerald-700">
                    Zero Document Uploads
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT 6 COLUMNS: Apple Glassmorphic Interactive Question 1 Card */}
            <div className="lg:col-span-6 perspective-container">
              
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
                      <span className="h-1.5 w-6 rounded-full bg-emerald-600" />
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

                {/* GOV.UK Tactile Keycap Option Rows with Instant Proceed */}
                <div className="space-y-3 pt-1">
                  
                  {/* Option 1: Yes */}
                  <button
                    type="button"
                    onClick={() => handleSelectOption(1)}
                    onMouseEnter={() => setHoveredOption(1)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={`group relative flex w-full items-center justify-between rounded-xl p-4 text-left transition-all duration-150 active:translate-y-[1px] focus:outline-hidden ${
                      selectedOption === 1
                        ? 'spatial-glass-emerald border-2 border-emerald-600 shadow-sm'
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
                          Qualifies for PM-KISAN ₹6k & agricultural safety nets
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                        Select →
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        selectedOption === 1
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-zinc-300 bg-white'
                      }`}>
                        {selectedOption === 1 && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </button>

                  {/* Option 2: No */}
                  <button
                    type="button"
                    onClick={() => handleSelectOption(2)}
                    onMouseEnter={() => setHoveredOption(2)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={`group relative flex w-full items-center justify-between rounded-xl p-4 text-left transition-all duration-150 active:translate-y-[1px] focus:outline-hidden ${
                      selectedOption === 2
                        ? 'spatial-glass-button border-2 border-zinc-900 shadow-sm'
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
                          Routes directly to rural housing (PMAY-G) & healthcare (PM-JAY)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                        Select →
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        selectedOption === 2
                          ? 'border-zinc-900 bg-zinc-900 text-white'
                          : 'border-zinc-300 bg-white'
                      }`}>
                        {selectedOption === 2 && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </button>

                </div>

                {/* Clean Micro Status Line (Zero Clutter, Image 1 Completely Purged) */}
                <div className="pt-2 flex items-center justify-between text-xs text-zinc-400 font-medium border-t border-black/[0.04]">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Tap 1 or 2 to advance · No login needed</span>
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-400">Step 1 of 4</span>
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

        {/* 3 Spatial 3D Passbook Cards with Lantern Spotlight Interaction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSchemes.map((scheme) => (
            <SpatialSchemeCard
              key={scheme.id}
              scheme={scheme}
              onCheckEligibility={() => onStart({})}
            />
          ))}
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
          <div className="group rounded-3xl spatial-glass p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 space-y-5">
            
            {/* Micro-UI Stage: Voice Wave & Keycap Simulation */}
            <div className="h-44 rounded-2xl bg-[#F7F6F2] border border-black/[0.06] p-4 flex flex-col justify-between overflow-hidden relative transition-all">
              
              {/* Mini Console Header */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[10px] font-bold text-zinc-700 border border-zinc-200 shadow-2xs">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Question 1 of 4</span>
                </span>

                {/* Oscillating Voice Wave Visualizer */}
                <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-zinc-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="flex items-end gap-[1.5px] h-3 w-3.5">
                    <span className="w-[1.5px] bg-emerald-600 rounded-full animate-eq-bar-1" />
                    <span className="w-[1.5px] bg-emerald-600 rounded-full animate-eq-bar-2" />
                    <span className="w-[1.5px] bg-emerald-600 rounded-full animate-eq-bar-3" />
                  </span>
                  <span className="text-[9px] font-bold text-zinc-700">VOICE ACTIVE</span>
                </div>
              </div>

              {/* Simulated Keycap Buttons */}
              <div className="space-y-1.5">
                <div className="spatial-glass-emerald rounded-xl p-2.5 flex items-center justify-between text-xs transition-transform group-hover:scale-[1.01]">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-2xs">
                      1
                    </span>
                    <span className="font-bold text-[11px] text-emerald-950">
                      Yes, family owns cultivable land
                    </span>
                  </div>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                </div>

                <div className="bg-white/70 border border-zinc-200/80 rounded-xl p-2 flex items-center justify-between text-xs opacity-50">
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
              <div className="w-full bg-zinc-200/80 h-1.5 rounded-full overflow-hidden">
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

          {/* STEP 02: Deterministic Logic Stage */}
          <div className="group rounded-3xl spatial-glass p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 space-y-5">
            
            {/* Micro-UI Stage: Logic Verification Nodes */}
            <div className="h-44 rounded-2xl bg-[#F7F6F2] border border-black/[0.06] p-4 flex flex-col justify-between overflow-hidden relative transition-all">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[10px] text-zinc-600 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rule Verification</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                  3/3 PASSED
                </span>
              </div>

              {/* Clean Rule Verification Criteria */}
              <div className="space-y-1.5">
                <div className="rounded-lg bg-white p-2 border border-zinc-200/90 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-[11px] font-medium text-zinc-700 truncate">
                    Cultivable Agricultural Land Title
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    <span>PM-KISAN</span>
                  </span>
                </div>

                <div className="rounded-lg bg-white p-2 border border-zinc-200/90 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-[11px] font-medium text-zinc-700 truncate">
                    Kutcha or Temporary Dwelling
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                    <span>PMAY-G</span>
                  </span>
                </div>

                <div className="rounded-lg bg-white p-2 border border-zinc-200/90 flex items-center justify-between text-xs shadow-2xs">
                  <span className="text-[11px] font-medium text-zinc-700 truncate">
                    Socio-Economic Deprivation Criteria
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
                <span>Verified against official guidelines · Zero intermediaries</span>
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

          {/* STEP 03: 3D Tactile Kiosk Print Slip (Moment 3) */}
          <div className="group rounded-3xl spatial-glass p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200 space-y-5">
            
            {/* 3D Tactile Micro-UI Stage: Emerging Thermal Receipt with Realistic Shadow */}
            <div className="h-44 rounded-2xl bg-[#F7F6F2] border border-black/[0.06] p-3 flex flex-col items-center justify-start overflow-hidden relative perspective-container">
              
              {/* Embossed Kiosk Printer Slot */}
              <div className="w-32 h-2 rounded-full bg-[#18181B] mb-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.8)] shrink-0" />

              {/* 3D Dimensional Paper Slip (Tactile Emerge with CSS 3D Depth) */}
              <div 
                style={{
                  transform: 'perspective(700px) rotateX(10deg) translateY(-2px)',
                  transformOrigin: 'top center'
                }}
                className="w-full bg-white rounded-xl border border-zinc-300/90 p-3 shadow-[0_12px_28px_-4px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:rotate-x-0 group-hover:translate-y-1 space-y-2 relative"
              >
                {/* Top Paper Highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-white" />
                
                <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <ReceiptText className="w-3.5 h-3.5 text-zinc-700" />
                    <span className="font-bold text-[10px] text-[#111111] tracking-wide">
                      CSC APPLICATION SLIP
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
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
