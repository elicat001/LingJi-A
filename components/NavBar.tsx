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
    { id: AppMode.BAZI, label: '排盘', icon: Compass },
    { id: AppMode.VISION, label: '灵视', icon: Eye },
    { id: AppMode.TAROT, label: '塔罗', icon: Moon },
    { id: AppMode.PROFILE, label: '我的', icon: User },
  ];

  return (
    <>
      {/* Desktop Navigation - Floating Island with Spotlight Effect */}
      <nav className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center px-3 py-2 rounded-full border border-white/10 bg-mystic-900/40 backdrop-blur-2xl shadow-2xl shadow-black/40">
        <div className="flex items-center pl-6 pr-8 border-r border-white/5 mr-2">
          <Sparkles className="w-5 h-5 text-gold-400 mr-3 animate-pulse" />
          <span className="font-serif text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400">灵机</span>
        </div>

        <div className="flex space-x-1 p-1 mr-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`relative flex items-center space-x-2 px-6 py-2.5 rounded-full transition-all duration-500 ease-out overflow-hidden group ${
                currentMode === item.id 
                  ? 'text-gold-200' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {/* Active Background Glow */}
              {currentMode === item.id && (
                <div className="absolute inset-0 bg-white/10 border border-white/5 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
              )}
              
              {/* Hover Spotlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              <item.icon className={`w-4 h-4 relative z-10 transition-colors ${currentMode === item.id ? 'text-gold-400' : 'group-hover:text-gold-300'}`} />
              <span className="text-sm font-medium tracking-wide relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Quick Status Indicator */}
        <div 
          onClick={() => setMode(AppMode.PROFILE)}
          className={`flex items-center space-x-2 px-5 py-2 rounded-full cursor-pointer transition-all border group ${
            isVip 
              ? 'bg-gradient-to-r from-gold-600/20 to-amber-600/20 border-gold-500/30 hover:border-gold-500/60' 
              : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          {isVip ? (
            <>
              <Crown className="w-3.5 h-3.5 text-gold-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-gold-200 tracking-wider">VIP</span>
            </>
          ) : (
            <>
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">额度</span>
              <span className={`text-xs font-bold ${remainingQuota > 0 ? 'text-gold-400' : 'text-red-400'}`}>
                {remainingQuota}
              </span>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Glass Bar with Blur */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-mystic-950/80 backdrop-blur-2xl border-t border-white/5 z-50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-20 px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`relative flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-300 ${
                currentMode === item.id ? 'text-gold-400 scale-105' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {currentMode === item.id && (
                <div className="absolute top-0 w-12 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50 blur-[2px]"></div>
              )}
              
              <item.icon className={`w-6 h-6 stroke-[1.5px] ${currentMode === item.id ? 'fill-gold-500/10' : ''}`} />
              <span className="text-[10px] font-medium tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavBar;