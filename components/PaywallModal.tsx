import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Sparkles, Crown, Unlock, X, Check, Star } from 'lucide-react';

const PaywallModal: React.FC = () => {
  const { showPaywall, setShowPaywall, purchaseSingle, purchaseWeekly, purchaseMonthly } = useUser();

  if (!showPaywall) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-mystic-950/80 backdrop-blur-xl transition-opacity animate-fade-in"
        onClick={() => setShowPaywall(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-mystic-900 border border-gold-500/20 w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl shadow-gold-900/30 animate-fade-in transform transition-all scale-100 flex flex-col">
        
        {/* Glow Effects */}
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-gold-500/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-purple-600/20 rounded-full blur-[60px] pointer-events-none"></div>

        {/* Header */}
        <div className="p-8 text-center relative z-10">
          <button 
            onClick={() => setShowPaywall(false)}
            className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors p-1 bg-white/5 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-gradient-to-br from-gold-400/20 to-gold-600/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-gold-500/20 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
             <Crown className="w-8 h-8 text-gold-400 animate-[pulse_3s_ease-in-out_infinite]" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400">解锁灵机无限</h2>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed max-w-[200px] mx-auto">
            您的免费额度已用完<br/>升级会员获取更深度的命运指引
          </p>
        </div>

        {/* Options */}
        <div className="px-6 pb-8 space-y-3 relative z-10">
          
          {/* Weekly (Highlighted) */}
          <div 
            onClick={purchaseWeekly}
            className="group relative bg-gradient-to-r from-gold-900/40 to-mystic-800 border border-gold-500/50 rounded-2xl p-4 cursor-pointer transition-all duration-300 flex items-center justify-between transform hover:scale-[1.02] shadow-[0_0_20px_rgba(251,191,36,0.1)] overflow-hidden"
          >
             {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] animate-shimmer"></div>

            <div className="absolute top-0 right-0 bg-gold-600 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl tracking-widest uppercase">
              Recommend
            </div>

            <div className="flex items-center">
               <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center mr-3 border border-gold-500/20">
                  <Star className="w-5 h-5 text-gold-400 fill-gold-400" />
               </div>
               <div className="text-left">
                 <h3 className="text-gold-100 font-bold text-base">七日周卡</h3>
                 <p className="text-[10px] text-gold-500/80">无限次畅享</p>
               </div>
            </div>
            <div className="text-right pr-2">
               <span className="text-[10px] text-gray-500 line-through block">¥29.9</span>
               <span className="text-xl font-bold text-gold-300">¥19.9</span>
            </div>
          </div>

          {/* Monthly */}
          <div 
            onClick={purchaseMonthly}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold-500/30 rounded-2xl p-4 cursor-pointer transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center">
               <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mr-3 border border-purple-500/20">
                  <Sparkles className="w-5 h-5 text-purple-300" />
               </div>
               <div className="text-left">
                 <h3 className="text-gray-200 font-bold text-sm">尊贵月卡</h3>
                 <p className="text-[10px] text-gray-500">超值 30 天</p>
               </div>
            </div>
            <div className="text-right pr-2">
               <span className="text-lg font-bold text-white">¥49.9</span>
            </div>
          </div>

          {/* Single */}
          <div 
            onClick={purchaseSingle}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl p-4 cursor-pointer transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center">
               <div className="w-10 h-10 rounded-full bg-gray-700/30 flex items-center justify-center mr-3">
                  <Unlock className="w-5 h-5 text-gray-400" />
               </div>
               <div className="text-left">
                 <h3 className="text-gray-300 font-bold text-sm">单次解锁</h3>
               </div>
            </div>
            <div className="text-right pr-2">
               <span className="text-lg font-bold text-gray-400">¥9.9</span>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="px-6 pb-6 pt-0 relative z-10">
           <p className="text-[9px] text-center text-gray-600 border-t border-white/5 pt-4">
             确认支付即代表您同意《用户服务协议》与《会员服务条款》
           </p>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;