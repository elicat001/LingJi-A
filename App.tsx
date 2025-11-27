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
    <div className="min-h-screen relative">
      {/* Ambient Background Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <PaywallModal />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-center p-5 border-b border-white/5 bg-mystic-950/50 backdrop-blur-md sticky top-0 z-40">
         <Sparkles className="w-5 h-5 mr-2 text-gold-400" />
         <span className="font-serif text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">灵机 AI</span>
      </div>

      <NavBar currentMode={currentMode} setMode={setCurrentMode} />

      <main className="container mx-auto px-4 py-8 pb-32 md:pt-28 md:pb-12 max-w-5xl relative z-10">
        <div className="transition-all duration-500 ease-in-out">
          {currentMode === AppMode.BAZI && <BaZiFeature />}
          {currentMode === AppMode.VISION && <VisionFeature />}
          {currentMode === AppMode.TAROT && <TarotFeature />}
          {currentMode === AppMode.PROFILE && <ProfileFeature />}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="text-center text-gray-500 text-xs pb-28 md:pb-8 font-light">
        <p className="opacity-70">© 2024 LingJi AI Project. Powered by Google Gemini.</p>
        <p className="mt-1 opacity-50">天机自在人心 · 仅供娱乐</p>
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