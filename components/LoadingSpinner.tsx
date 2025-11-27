import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "正在沟通宇宙能量...",
  "推演星辰轨迹...",
  "解析五行生克...",
  "连接灵性磁场...",
  "洞察命运玄机..."
];

const LoadingSpinner: React.FC<{ text?: string }> = ({ text }) => {
  const [currentText, setCurrentText] = useState(text || MESSAGES[0]);

  useEffect(() => {
    if (text) return; // If explicit text provided, use it
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % MESSAGES.length;
      setCurrentText(MESSAGES[index]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-8 animate-fade-in">
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-2 border-dashed border-gold-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
        
        {/* Inner Ring */}
        <div className="absolute inset-2 border border-gold-500/20 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
        
        {/* Core Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-gold-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="w-3 h-3 bg-gold-400 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.8)] animate-ping"></div>
        </div>
        
        {/* Orbiting particles */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
          <div className="w-2 h-2 bg-gold-300 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-lg"></div>
        </div>
      </div>
      
      <div className="text-center h-12">
        <p className="text-gold-200 font-serif text-xl tracking-widest animate-pulse transition-all duration-500">
          {currentText}
        </p>
        <p className="text-gold-500/40 text-xs mt-2 uppercase tracking-[0.3em]">Computing Fate</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;