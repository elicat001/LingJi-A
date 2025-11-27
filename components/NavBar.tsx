import React from 'react';
import { AppMode } from '../types';
import { Compass, Eye, Moon, Sparkles, Crown, User } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface NavBarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentMode, setMode }) => {
  const { isVip, remainingQuota, setShowPaywall } = useUser();

  const navItems = [
    { id: AppMode.BAZI, label: '八字排盘', icon: Compass },
    { id: AppMode.VISION, label: '灵视解读', icon: Eye },
    { id: AppMode.TAROT, label: '塔罗占卜', icon: Moon },
    { id: AppMode.PROFILE, label: '我的', icon: User },
  ];

  return (
    <>
      {/* Desktop Navigation - Floating Island */}
      <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center px-2 py-2 rounded-full border border-white/10 bg-mystic-900/60 backdrop-blur-xl shadow-2xl shadow-black/20">
        <div className="flex items-center pl-6 pr-8 border-r border-white/10 mr-2">
          <Sparkles className="w-6 h-6 text-gold-400 mr-3 animate-pulse" />
          <span className="font-serif text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gold-200 to-gold-500">灵机</span>
        </div>

        <div className="flex space-x-1 p-1 mr-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all duration-300 ease-out ${
                currentMode === item.id 
                  ? 'bg-white/10 text-gold-300 shadow-[0_0_15px_rgba(251,191,36,0.1)] border border-white/5' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-4 h-4 ${currentMode === item.id ? 'text-gold-400' : ''}`} />
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Quick Status Indicator (Click to open Paywall/Profile) */}
        <div 
          onClick={() => setMode(AppMode.PROFILE)}
          className={`flex items-center space-x-2 px-4 py-1.5 rounded-full cursor-pointer transition-all border ${
            isVip 
              ? 'bg-gold-600/20 border-gold-500/50 hover:bg-gold-600/30' 
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          {isVip ? (
            <>
              <Crown className="w-4 h-4 text-gold-400" />
              <span className="text-xs font-bold text-gold-200">VIP</span>
            </>
          ) : (
            <>
              <span className="text-xs text-gray-400">免费:</span>
              <span className={`text-xs font-bold ${remainingQuota > 0 ? 'text-gold-400' : 'text-red-400'}`}>
                {remainingQuota}
              </span>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Glass Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-mystic-950/80 backdrop-blur-xl border-t border-white/10 z-50 pb-safe">
        <div className="flex justify-around items-center h-20 px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                currentMode === item.id ? 'text-gold-400' : 'text-gray-500'
              }`}
            >
              {currentMode === item.id && (
                <span className="absolute top-2 w-8 h-8 bg-gold-500/10 rounded-full blur-md" />
              )}
              <item.icon className={`w-6 h-6 relative z-10 transition-transform duration-300 ${currentMode === item.id ? 'transform -translate-y-1' : ''}`} />
              <span className="text-[10px] font-medium tracking-wide relative z-10">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavBar;