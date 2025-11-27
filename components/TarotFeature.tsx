import React, { useState } from 'react';
import { TAROT_DECK_MAJOR } from '../constants';
import { TarotCard } from '../types';
import { getTarotInterpretation } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import MarkdownResult from './MarkdownResult';
import { Sparkles, RefreshCcw, Moon, ArrowRight, Hand } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const TarotFeature: React.FC = () => {
  const { checkAccess, consumeQuota } = useUser();
  const [step, setStep] = useState<'input' | 'shuffling' | 'drawn' | 'interpreting' | 'result'>('input');
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<(TarotCard)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);
  const [result, setResult] = useState<string | null>(null);

  const startDivination = () => {
    if (!question.trim()) return;
    if (!checkAccess()) return;
    
    setStep('shuffling');
    setRevealed([false, false, false]);
    setResult(null);
    
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

  const revealCard = (index: number) => {
    if (revealed[index]) return;
    
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
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
      consumeQuota();
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
    setRevealed([false, false, false]);
  };

  const allRevealed = revealed.every(r => r);

  // Enhanced Card Back Pattern
  const cardBackStyle = {
    background: `
      radial-gradient(circle, #b45309 1px, transparent 1.5px), 
      radial-gradient(circle, #b45309 1px, transparent 1.5px),
      linear-gradient(135deg, #2d1b3e 0%, #0f0a14 100%)
    `,
    backgroundSize: '16px 16px, 16px 16px, 100% 100%',
    backgroundPosition: '0 0, 8px 8px, 0 0',
    border: '1px solid rgba(251, 191, 36, 0.3)'
  };

  return (
    <div className="max-w-5xl mx-auto text-center">
      <div className="text-center mb-10 animate-fade-in relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] -z-10"></div>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-purple-200 to-purple-500 mb-4 drop-shadow-sm">
          塔罗占卜
        </h2>
        <p className="text-mystic-100/60 font-light tracking-wide text-sm md:text-base border-t border-b border-white/5 inline-block px-8 py-2">
          聆听宇宙的指引 · 探索过去现在未来
        </p>
      </div>

      {step === 'input' && (
        <div className="bg-glass backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl max-w-xl mx-auto animate-fade-in relative overflow-hidden">
          {/* Decorative Rings */}
          <div className="absolute -top-20 -left-20 w-40 h-40 border border-white/5 rounded-full"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 border border-white/5 rounded-full"></div>

          <label className="block text-left text-gold-400/60 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            心中默念你的问题
          </label>
          <div className="relative mb-8">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-mystic-800/50 border border-white/5 rounded-xl px-6 py-5 text-white text-lg placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-mystic-800/80 transition-all duration-300 shadow-inner"
              placeholder="例如：我和他会有未来吗？"
              onKeyDown={(e) => e.key === 'Enter' && startDivination()}
            />
            <Sparkles className="absolute right-6 top-1/2 -translate-y-1/2 text-gold-500/50 w-5 h-5 animate-pulse" />
          </div>
          <button
            onClick={startDivination}
            disabled={!question}
            className="w-full bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-xl shadow-lg shadow-purple-900/30 transition-all duration-300 transform hover:scale-[1.02] tracking-widest text-lg"
          >
            <span className="flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-3" /> 开始洗牌
            </span>
          </button>
        </div>
      )}

      {step === 'shuffling' && (
        <div className="py-24 relative flex justify-center">
           <div className="relative w-40 h-64">
             {[1, 2, 3, 4, 5].map((i) => (
               <div 
                  key={i} 
                  className="absolute inset-0 rounded-xl shadow-2xl border-2 border-gold-500/20"
                  style={{ 
                    ...cardBackStyle,
                    animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                    transform: `translateX(${(i-3)*10}px) rotate(${(i-3)*5}deg)`,
                    zIndex: 10 - i
                  }}
               >
                 <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent"></div>
                    <div className="w-20 h-20 rounded-full border border-gold-500/10 flex items-center justify-center">
                       <Moon className="w-8 h-8 text-gold-500/30" />
                    </div>
                 </div>
               </div>
             ))}
           </div>
           <p className="absolute bottom-10 text-gold-300 font-serif text-lg animate-pulse tracking-widest uppercase">
             Shuffling Destiny...
           </p>
        </div>
      )}

      {(step === 'drawn' || step === 'interpreting' || step === 'result') && (
        <div className="space-y-12 animate-fade-in pb-20">
          
          {/* Instruction Text */}
          {step === 'drawn' && !allRevealed && (
            <p className="text-gold-200 animate-pulse font-serif text-lg tracking-widest flex items-center justify-center">
              <Hand className="w-5 h-5 mr-2" /> 点击牌面揭开命运
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 px-4">
            {['过去', '现在', '未来'].map((label, idx) => (
              <div key={idx} className="flex flex-col items-center group perspective-1000">
                <span className="text-gray-500 mb-6 text-[10px] font-bold uppercase tracking-[0.4em] border-b border-white/5 pb-2">{label}</span>
                
                {/* 3D Card Container */}
                <div 
                  onClick={() => revealCard(idx)}
                  className={`relative w-56 h-96 cursor-pointer transform-style-3d transition-transform duration-1000 ${revealed[idx] ? 'rotate-y-180' : ''}`}
                >
                   {/* Front of Card (Face Down / Back Pattern) */}
                   <div 
                      className="absolute inset-0 w-full h-full rounded-2xl backface-hidden shadow-2xl border-2 border-gold-500/30"
                      style={cardBackStyle}
                   >
                     <div className="w-full h-full flex items-center justify-center">
                       <Moon className="w-12 h-12 text-gold-500/30" />
                     </div>
                   </div>

                   {/* Back of Card (Face Up / Content) */}
                   <div 
                      className={`absolute inset-0 w-full h-full rounded-2xl backface-hidden bg-[#0f0a14] border-2 border-gold-500/30 shadow-[0_0_30px_rgba(126,34,206,0.2)] rotate-y-180 overflow-hidden`}
                   >
                       {/* Card Content Container - Rotates if Reversed */}
                       <div className={`w-full h-full flex flex-col items-center justify-between p-5 bg-gradient-to-br from-white/5 to-transparent relative z-10 ${drawnCards[idx].isReversed ? 'rotate-180' : ''}`}>
                          
                          {/* Inner Border */}
                          <div className="absolute inset-2 border border-gold-500/10 rounded-lg pointer-events-none"></div>

                          <div className="text-gold-500/40 text-[10px] font-serif text-center w-full pb-2 tracking-widest opacity-60">
                            {drawnCards[idx].isReversed ? 'REVERSED' : 'UPRIGHT'}
                          </div>
                          
                          <div className="flex-1 flex flex-col items-center justify-center py-4 relative z-10">
                            <div className="mb-6 w-24 h-24 rounded-full bg-gradient-to-b from-gold-500/10 to-purple-500/5 flex items-center justify-center border border-white/5">
                                 <Moon className="w-10 h-10 text-gold-200/50" />
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-600 text-center leading-tight">
                              {drawnCards[idx].nameCN}
                            </h3>
                            <p className="text-[10px] text-gray-500 text-center font-serif italic mt-2 uppercase tracking-wider">
                               {drawnCards[idx].name}
                            </p>
                          </div>
                          
                          <div className="text-gold-500/30 text-lg text-center w-full pt-2">✦</div>
                       </div>
                   </div>
                </div>

                {/* Meaning Text (Appears after reveal) */}
                <div 
                   className={`mt-8 text-center transition-all duration-700 ${revealed[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    <p className="text-gold-200 font-bold text-lg">{drawnCards[idx].nameCN}</p>
                    <p className="text-xs text-gold-500/60 font-serif italic mb-3">{drawnCards[idx].isReversed ? '逆位' : '正位'}</p>
                    <p className="text-xs text-gray-400 max-w-[200px] mx-auto leading-relaxed border-t border-white/5 pt-3">
                      {drawnCards[idx].isReversed ? drawnCards[idx].meaningReversed : drawnCards[idx].meaningUpright}
                    </p>
                </div>
              </div>
            ))}
          </div>
          
          {step === 'drawn' && allRevealed && (
            <div className="flex justify-center mt-8 animate-fade-in">
              <button
                onClick={interpret}
                className="group relative px-12 py-5 bg-transparent overflow-hidden rounded-full"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <span className="relative flex items-center text-white font-bold text-lg tracking-[0.2em] group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5 mr-3 animate-pulse" /> 解读牌意
                </span>
              </button>
            </div>
          )}

          {step === 'interpreting' && <LoadingSpinner />}

          {step === 'result' && result && (
            <div className="text-left mt-16 bg-glass backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/5 animate-fade-in shadow-2xl relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
               <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                 <h3 className="text-3xl text-gold-200 font-serif font-bold flex items-center">
                   <Sparkles className="w-6 h-6 mr-4 text-purple-400" /> 占卜解读
                 </h3>
                 <button onClick={reset} className="group flex items-center text-gray-500 hover:text-white text-xs uppercase tracking-widest transition-colors">
                   <RefreshCcw className="w-3.5 h-3.5 mr-2 group-hover:rotate-180 transition-transform duration-500" /> 重新占卜
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