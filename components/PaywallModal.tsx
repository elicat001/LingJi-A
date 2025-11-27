import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Sparkles, Crown, Unlock, X, Check } from 'lucide-react';

const PaywallModal: React.FC = () => {
  const { showPaywall, setShowPaywall, purchaseSingle, purchaseWeekly, purchaseMonthly } = useUser();

  if (!showPaywall) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-mystic-950/90 backdrop-blur-md transition-opacity"
        onClick={() => setShowPaywall(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-mystic-900 border border-gold-500/30 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl shadow-gold-900/40 animate-fade-in transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-mystic-800 to-mystic-900 p-6 text-center border-b border-white/5 relative">
          <button 
            onClick={() => setShowPaywall(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
             <Crown className="w-6 h-6 text-gold-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gold-200">升级灵机会员</h2>
          <p className="text-sm text-gray-400 mt-2">免费额度已用完，解锁无限探索</p>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4">
          
          {/* Option 1: Single */}
          <div 
            onClick={purchaseSingle}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-500/50 rounded-xl p-4 cursor-pointer transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center">
               <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center mr-4 group-hover:bg-gold-500/20 transition-colors">
                  <Unlock className="w-5 h-5 text-gray-300 group-hover:text-gold-400" />
               </div>
               <div className="text-left">
                 <h3 className="text-white font-bold">单次解锁</h3>
                 <p className="text-xs text-gray-400">本次咨询深度解读</p>
               </div>
            </div>
            <div className="text-right">
               <span className="text-xl font-bold text-gold-400">¥9.9</span>
            </div>
          </div>

          {/* Option 2: Weekly (Popular) */}
          <div 
            onClick={purchaseWeekly}
            className="group relative bg-gradient-to-r from-gold-900/40 to-mystic-800 border-2 border-gold-500/40 rounded-xl p-4 cursor-pointer transition-all duration-300 flex items-center justify-between transform hover:scale-[1.02] shadow-lg shadow-gold-900/20"
          >
            <div className="absolute -top-3 left-4 bg-gold-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase">
              Most Popular
            </div>
            <div className="flex items-center">
               <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center mr-4">
                  <Sparkles className="w-5 h-5 text-gold-400" />
               </div>
               <div className="text-left">
                 <h3 className="text-white font-bold">七日周卡</h3>
                 <p className="text-xs text-gold-200/60">无限次畅享所有功能</p>
               </div>
            </div>
            <div className="text-right">
               <span className="text-xs text-gray-400 line-through mr-2">¥29.9</span>
               <span className="text-2xl font-bold text-gold-300">¥19.9</span>
            </div>
          </div>

          {/* Option 3: Monthly */}
          <div 
            onClick={purchaseMonthly}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-500/50 rounded-xl p-4 cursor-pointer transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center">
               <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 group-hover:bg-purple-500/30">
                  <Crown className="w-5 h-5 text-purple-300 group-hover:text-purple-200" />
               </div>
               <div className="text-left">
                 <h3 className="text-white font-bold">尊贵月卡</h3>
                 <p className="text-xs text-gray-400">30天全解锁 · 超值之选</p>
               </div>
            </div>
            <div className="text-right">
               <span className="text-xl font-bold text-gold-400">¥49.9</span>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="px-6 pb-6 pt-2">
           <p className="text-[10px] text-center text-gray-500">
             确认支付即代表您同意《用户服务协议》与《会员服务条款》
           </p>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;