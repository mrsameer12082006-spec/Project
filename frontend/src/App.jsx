import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import GuidedInterview from './pages/GuidedInterview';
import ReviewAnswers from './pages/ReviewAnswers';
import EligibilityResults from './pages/EligibilityResults';
import SchemeGuide from './pages/SchemeGuide';
import CscPrintSlip from './components/results/CscPrintSlip';
import SchemeExplorer from './pages/SchemeExplorer';
import { evaluateEligibilityLocally, playSuccessChime } from './services/api';
import { VERIFIED_SCHEMES } from './data/schemesData';

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'interview' | 'review' | 'results' | 'guide' | 'slip' | 'explorer'
  const [previousScreen, setPreviousScreen] = useState('home');
  const [interviewStep, setInterviewStep] = useState(0);
  const language = 'en'; // Strict English Only
  const [mode, setMode] = useState('citizen'); // 'citizen' | 'operator'
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);

  // ── Lenis Smooth Inertial Scroll (Oryzo.ai Physics) ─────────
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2
    });

    let reqId;
    function raf(time) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }
    reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  const handleNavigateHome = () => {
    setPreviousScreen(screen);
    setScreen('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrowseSchemes = () => {
    setPreviousScreen(screen);
    setScreen('explorer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartInterview = (initialAnswers, step = null) => {
    if (initialAnswers && typeof initialAnswers === 'object') {
      setAnswers(prev => ({ ...prev, ...initialAnswers }));
    }
    const nextStep = typeof step === 'number' ? step : (initialAnswers && initialAnswers.has_land ? 1 : 0);
    setInterviewStep(nextStep);
    setPreviousScreen(screen);
    setScreen('interview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditAnswer = (stepIndex) => {
    setInterviewStep(typeof stepIndex === 'number' ? stepIndex : 0);
    setPreviousScreen(screen);
    setScreen('interview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInterviewComplete = () => {
    playSuccessChime();
    setPreviousScreen('interview');
    setScreen('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmReview = () => {
    const profile = {};
    Object.keys(answers).forEach(key => {
      profile[key] = answers[key].value;
    });

    const evaluated = evaluateEligibilityLocally(profile);
    setResults(evaluated);
    playSuccessChime();
    setPreviousScreen('review');
    setScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDetails = (scheme, fromScreen = null) => {
    const targetScheme = scheme || VERIFIED_SCHEMES[0];
    setSelectedScheme(targetScheme);
    setPreviousScreen(fromScreen || screen);
    setScreen('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrintSlip = (scheme, fromScreen = null) => {
    const defaultScheme = scheme || (results.length > 0 ? results[0] : VERIFIED_SCHEMES[0]);
    setSelectedScheme(defaultScheme);
    setPreviousScreen(fromScreen || screen);
    setScreen('slip');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSmartBack = () => {
    // Return to the logical originating screen without leaving dead ends
    const target = (previousScreen && previousScreen !== 'slip' && previousScreen !== 'guide') 
      ? previousScreen 
      : 'home';
    setScreen(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#141417] transition-all font-sans selection:bg-[#141417] selection:text-white">
      {/* 1. Sleek Sticky Header */}
      <Navbar
        currentScreen={screen}
        setScreen={setScreen}
        onNavigateHome={handleNavigateHome}
        onNavigateExplorer={handleBrowseSchemes}
        onStartCheck={() => handleStartInterview({}, 0)}
        mode={mode}
        setMode={setMode}
      />

      {/* 2. Main Viewport */}
      <main className={`flex-1 w-full mx-auto ${screen === 'home' ? 'max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8' : 'max-w-5xl px-4 sm:px-6 py-6 sm:py-8'}`}>
        {screen === 'home' && (
          <Home
            onStart={handleStartInterview}
            onBrowse={handleBrowseSchemes}
            onSelectScheme={handleOpenDetails}
            language={language}
          />
        )}

        {screen === 'explorer' && (
          <SchemeExplorer
            onBack={handleNavigateHome}
            onStartCheck={() => handleStartInterview({}, 0)}
            onSelectScheme={(s) => handleOpenDetails(s, 'explorer')}
            language={language}
          />
        )}

        {screen === 'interview' && (
          <GuidedInterview
            answers={answers}
            setAnswers={setAnswers}
            onComplete={handleInterviewComplete}
            onBack={() => {
              if (previousScreen === 'review') {
                setScreen('review');
              } else {
                handleNavigateHome();
              }
            }}
            language={language}
            mode={mode}
            initialStep={interviewStep}
          />
        )}

        {screen === 'review' && (
          <ReviewAnswers
            answers={answers}
            onEditIndex={handleEditAnswer}
            onConfirm={handleConfirmReview}
            onBack={() => {
              setInterviewStep(3);
              setScreen('interview');
            }}
            language={language}
          />
        )}

        {screen === 'results' && (
          <EligibilityResults
            results={results.length > 0 ? results : evaluateEligibilityLocally({})}
            answers={answers}
            onEditAnswers={() => setScreen('review')}
            onOpenDetails={(s) => handleOpenDetails(s, 'results')}
            onPrintSlip={(s) => handlePrintSlip(s, 'results')}
            onBrowse={handleBrowseSchemes}
            onHome={handleNavigateHome}
            onStartOver={() => {
              setAnswers({});
              handleStartInterview({}, 0);
            }}
            language={language}
          />
        )}

        {screen === 'guide' && (
          <SchemeGuide
            scheme={selectedScheme || (results.length > 0 ? results[0] : VERIFIED_SCHEMES[0])}
            userAnswers={answers}
            onBack={handleSmartBack}
            onStartCheck={() => handleStartInterview({}, 0)}
            onPrintSlip={(s) => handlePrintSlip(s, 'guide')}
            onBrowse={handleBrowseSchemes}
            previousScreen={previousScreen}
            language={language}
          />
        )}

        {screen === 'slip' && (
          <CscPrintSlip
            scheme={selectedScheme || (results.length > 0 ? results[0] : VERIFIED_SCHEMES[0])}
            userAnswers={answers}
            onBack={handleSmartBack}
            onBrowse={handleBrowseSchemes}
            onHome={handleNavigateHome}
            language={language}
          />
        )}
      </main>

      {/* 4. Minimalist Footer */}
      <div className="no-print">
        <Footer
          onStart={() => handleStartInterview({}, 0)}
          onBrowse={handleBrowseSchemes}
          onPrintSlip={() => handlePrintSlip(null, 'home')}
          onHome={handleNavigateHome}
          setScreen={setScreen}
          currentScreen={screen}
        />
      </div>
    </div>
  );
}
