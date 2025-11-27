import React, { useState } from 'react';
import NavBar from './components/NavBar';
import BaZiFeature from './components/BaZiFeature';
import VisionFeature from './components/VisionFeature';
import TarotFeature from './components/TarotFeature';
import ProfileFeature from './components/ProfileFeature';
import PaywallModal from './components/PaywallModal';
import { UserProvider } from './contexts/UserContext';
import { AppMode } from './types';
import { Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.BAZI);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-cosmos z-[-2]"></div>
      
      {/* Noise Overlay for Texture */}
      <div className="fixed inset-0 opacity-[0.03] z-[-1] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Ambient Orbs */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-float-slow z-[-1]"></div>
      <div className="fixed bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-gold-600/10 rounded-full blur-[120px] pointer-events-none animate-float z-[-1]"></div>

      <PaywallModal />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-center p-5 border-b border-white/5 bg-mystic-950/80 backdrop-blur-xl sticky top-0 z-40 shadow-lg">
         <Sparkles className="w-5 h-5 mr-2 text-gold-400" />
         <span className="font-serif text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">灵机 AI</span>
      </div>

      <NavBar currentMode={currentMode} setMode={setCurrentMode} />

      <main className="container mx-auto px-4 py-6 pb-32 md:pt-28 md:pb-12 max-w-5xl relative z-10 min-h-[80vh]">
        <div className="transition-all duration-700 ease-out">
          {currentMode === AppMode.BAZI && <BaZiFeature />}
          {currentMode === AppMode.VISION && <VisionFeature />}
          {currentMode === AppMode.TAROT && <TarotFeature />}
          {currentMode === AppMode.PROFILE && <ProfileFeature />}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="text-center text-gray-600 text-[10px] pb-28 md:pb-8 font-light tracking-wider uppercase">
        <p className="opacity-70">© 2024 LingJi AI Project · Google Gemini Inside</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;