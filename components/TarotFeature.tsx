import React, { useState } from 'react';
import { TAROT_DECK_MAJOR } from '../constants';
import { TarotCard } from '../types';
import { getTarotInterpretation } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import MarkdownResult from './MarkdownResult';
import { Sparkles, RefreshCcw, Send, Moon } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const TarotFeature: React.FC = () => {
  const { checkAccess, consumeQuota } = useUser();
  const [step, setStep] = useState<'input' | 'shuffling' | 'drawn' | 'interpreting' | 'result'>('input');
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<(TarotCard)[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const startDivination = () => {
    if (!question.trim()) return;
    
    // Check Membership Logic before shuffling
    if (!checkAccess()) return;
    
    setStep('shuffling');
    
    // Simulate shuffling time
    setTimeout(() => {
      drawCards();
    }, 2500);
  };

  const drawCards = () => {
    const deck = [...TAROT_DECK_MAJOR];
    const drawn: TarotCard[] = [];
    
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const cardBase = deck.splice(randomIndex, 1)[0];
      const isReversed = Math.random() > 0.5;
      drawn.push({ ...cardBase, isReversed });
    }
    
    setDrawnCards(drawn);
    setStep('drawn');
  };

  const interpret = async () => {
    setStep('interpreting');
    try {
      const formatCardName = (c: TarotCard) => `${c.nameCN} (${c.isReversed ? '逆位' : '正位'})`;
      
      const interpretation = await getTarotInterpretation(question, {
        past: formatCardName(drawnCards[0]),
        present: formatCardName(drawnCards[1]),
        future: formatCardName(drawnCards[2]),
      });
      setResult(interpretation);
      setStep('result');
      consumeQuota(); // Deduct only after interpretation
    } catch (e) {
      setStep('drawn');
      alert("解读失败，请重试");
    }
  };

  const reset = () => {
    setStep('input');
    setQuestion('');
    setDrawnCards([]);
    setResult(null);
  };

  // CSS pattern for card back
  const cardBackPattern = {
    backgroundImage: `radial-gradient(circle, #7a4b9b 2px, transparent 2.5px), radial-gradient(circle, #7a4b9b 2px, transparent 2.5px)`,
    backgroundSize: '14px 14px',
    backgroundPosition: '0 0, 7px 7px',
    backgroundColor: '#2d1b3e'
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="text-center mb-10 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-200 to-purple-500 mb-4 drop-shadow-sm">
          塔罗占卜
        </h2>
        <p className="text-mystic-100/60 font-light tracking-wide text-sm md:text-base">
          聆听宇宙的指引，探索过去、现在与未来
        </p>
      </div>

      {step === 'input' && (
        <div className="bg-glass backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-lg mx-auto animate-fade-in">
          <label className="block text-left text-gold-400/80 text-xs font-bold uppercase tracking-widest mb-4">
            心中默念你的问题
          </label>
          <div className="relative mb-8">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-lg placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
              placeholder="例如：我和他会有未来吗？"
              onKeyDown={(e) => e.key === 'Enter' && startDivination()}
            />
            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-500/50 w-5 h-5" />
          </div>
          <button
            onClick={startDivination}
            disabled={!question}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-900/30 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <span className="flex items-center justify-center tracking-widest">
              <Sparkles className="w-5 h-5 mr-2" /> 开始洗牌
            </span>
          </button>
        </div>
      )}

      {step === 'shuffling' && (
        <div className="py-20 relative">
           <div className="flex justify-center items-center h-64 perspective-[1000px]">
             {[1, 2, 3].map((i) => (
               <div 
                  key={i} 
                  className="absolute w-40 h-64 rounded-xl border-2 border-gold-500/30 shadow-2xl animate-float"
                  style={{ 
                    ...cardBackPattern,
                    animationDelay: `${i * 0.2}s`,
                    transform: `translateX(${(i-2)*20}px) rotate(${(i-2)*5}deg)`,
                    zIndex: 10 - i
                  }}
               >
                 <div className="w-full h-full flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full border border-gold-500/20 flex items-center justify-center">
                      <Moon className="w-8 h-8 text-gold-500/40" />
                   </div>
                 </div>
               </div>
             ))}
           </div>
           <p className="mt-8 text-gold-300 font-serif text-lg animate-pulse tracking-widest">
             洗牌中... 请保持专注
           </p>
        </div>
      )}

      {(step === 'drawn' || step === 'interpreting' || step === 'result') && (
        <div className="space-y-10 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {['过去', '现在', '未来'].map((label, idx) => (
              <div key={idx} className="flex flex-col items-center group perspective-[1000px]">
                <span className="text-gray-400 mb-4 text-xs font-bold uppercase tracking-[0.2em]">{label}</span>
                
                <div 
                  className={`relative w-48 h-80 rounded-xl shadow-2xl transition-all duration-1000 transform-style-3d 
                    ${drawnCards[idx].isReversed ? 'rotate-180' : ''} 
                    bg-gradient-to-b from-gray-900 to-black border border-gold-500/40 p-3
                    hover:shadow-gold-500/20 hover:-translate-y-2
                  `}
                >
                   <div className="w-full h-full border border-gold-500/20 flex flex-col items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                      <div className="text-gold-500/60 text-[10px] font-serif text-center w-full border-b border-gold-500/10 pb-2 tracking-widest">
                        {drawnCards[idx].isReversed ? 'REVERSED' : 'UPRIGHT'}
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center py-4">
                        <h3 className={`text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-500 text-center ${drawnCards[idx].isReversed ? 'rotate-180' : ''}`}>
                          {drawnCards[idx].nameCN}
                        </h3>
                        <div className={`w-8 h-[1px] bg-gold-500/30 my-3 ${drawnCards[idx].isReversed ? 'rotate-180' : ''}`}></div>
                        <p className={`text-xs text-gray-500 text-center font-serif italic ${drawnCards[idx].isReversed ? 'rotate-180' : ''}`}>
                           {drawnCards[idx].name}
                        </p>
                      </div>
                      <div className="text-gold-500/60 text-[10px] text-center w-full border-t border-gold-500/10 pt-2">
                        ✦
                      </div>
                   </div>
                </div>

                <div className="mt-6 text-center opacity-0 animate-fade-in" style={{ animationDelay: `${0.5 + idx * 0.2}s`, animationFillMode: 'forwards' }}>
                    <p className="text-gold-300 font-bold text-lg">{drawnCards[idx].nameCN} <span className="text-sm font-normal text-gold-500/70">{drawnCards[idx].isReversed ? '(逆位)' : '(正位)'}</span></p>
                    <p className="text-xs text-gray-400 mt-2 max-w-[200px] mx-auto leading-relaxed">
                      {drawnCards[idx].isReversed ? drawnCards[idx].meaningReversed : drawnCards[idx].meaningUpright}
                    </p>
                </div>
              </div>
            ))}
          </div>
          
          {step === 'drawn' && (
            <button
              onClick={interpret}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-full shadow-lg shadow-purple-900/40 text-lg transition-all transform hover:scale-105"
            >
              <span className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 animate-pulse" /> 解读牌意
              </span>
            </button>
          )}

          {step === 'interpreting' && <LoadingSpinner text="灵机正在沟通宇宙能量..." />}

          {step === 'result' && result && (
            <div className="text-left mt-12 bg-glass backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 animate-fade-in shadow-2xl">
               <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                 <h3 className="text-2xl text-gold-300 font-serif font-bold flex items-center">
                   <Sparkles className="w-6 h-6 mr-3 text-gold-500" /> 占卜解读
                 </h3>
                 <button onClick={reset} className="flex items-center text-gray-400 hover:text-white text-xs uppercase tracking-widest transition-colors">
                   <RefreshCcw className="w-3 h-3 mr-2" /> 重新占卜
                 </button>
               </div>
               <MarkdownResult content={result} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TarotFeature;