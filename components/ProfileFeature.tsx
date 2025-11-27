import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Crown, Sparkles, Unlock, User, Clock, ChevronRight, Settings } from 'lucide-react';

const ProfileFeature: React.FC = () => {
  const { 
    isVip, 
    remainingQuota, 
    vipExpiry, 
    purchaseSingle, 
    purchaseWeekly, 
    purchaseMonthly,
    maxFree,
    usageCount
  } = useUser();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-200 to-gold-600 mb-2">
          个人中心
        </h2>
      </div>

      {/* User Status Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 mb-8 border border-white/10 shadow-2xl">
        <div className={`absolute inset-0 ${isVip ? 'bg-gradient-to-br from-gold-900/80 to-mystic-900' : 'bg-mystic-900/80'} backdrop-blur-xl z-0`}></div>
        {isVip && <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/20 rounded-full blur-3xl pointer-events-none"></div>}
        
        <div className="relative z-10 flex items-center">
          <div className={`w-20 h-20 rounded-full border-2 ${isVip ? 'border-gold-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]' : 'border-white/10'} flex items-center justify-center bg-black/20 mr-6`}>
             <User className={`w-10 h-10 ${isVip ? 'text-gold-300' : 'text-gray-400'}`} />
          </div>
          <div className="flex-1">
             <div className="flex items-center mb-2">
                <h3 className={`text-xl font-bold ${isVip ? 'text-gold-200' : 'text-white'}`}>
                  {isVip ? '尊贵会员' : '普通用户'}
                </h3>
                {isVip && <span className="ml-3 px-2 py-0.5 bg-gold-500/20 border border-gold-500/50 rounded text-[10px] text-gold-300 font-bold uppercase tracking-wider">VIP</span>}
             </div>
             
             {isVip ? (
               <div className="flex items-center text-gold-400/80 text-sm">
                 <Clock className="w-4 h-4 mr-1.5" />
                 <span>有效期至: {vipExpiry ? formatDate(vipExpiry) : '永久'}</span>
               </div>
             ) : (
               <div className="space-y-2">
                 <div className="flex justify-between text-xs text-gray-400 mb-1">
                   <span>免费额度</span>
                   <span>{Math.max(0, maxFree - usageCount)} / {maxFree}</span>
                 </div>
                 <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
                   <div 
                     className="bg-gold-500 h-full rounded-full transition-all duration-500" 
                     style={{ width: `${Math.min(100, (Math.max(0, maxFree - usageCount) / maxFree) * 100)}%` }}
                   ></div>
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Membership Plans */}
      <div className="mb-6">
        <h3 className="text-lg text-gold-300 font-serif font-bold mb-4 flex items-center">
          <Sparkles className="w-4 h-4 mr-2" /> 会员套餐
        </h3>
        <div className="space-y-4">
          
          {/* Option 2: Weekly (Popular) - Top Choice */}
          <div 
            onClick={purchaseWeekly}
            className="group relative bg-gradient-to-r from-gold-900/40 to-mystic-800 border border-gold-500/30 hover:border-gold-500/60 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-center justify-between transform hover:scale-[1.01] shadow-lg shadow-gold-900/10"
          >
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-gold-600 to-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-md">
              Most Popular
            </div>
            <div className="flex items-center">
               <div className="w-12 h-12 rounded-2xl bg-gold-500/20 flex items-center justify-center mr-5">
                  <Crown className="w-6 h-6 text-gold-300" />
               </div>
               <div>
                 <h4 className="text-gold-200 font-bold text-lg">七日周卡</h4>
                 <p className="text-xs text-gold-500/60 mt-1">无限畅享 · 每日运势 · 深度解读</p>
               </div>
            </div>
            <div className="text-right">
               <div className="text-xs text-gray-500 line-through">¥29.9</div>
               <div className="text-2xl font-bold text-gold-400">¥19.9</div>
            </div>
          </div>

          {/* Option 3: Monthly */}
          <div 
            onClick={purchaseMonthly}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center">
               <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mr-5">
                  <Sparkles className="w-6 h-6 text-purple-300" />
               </div>
               <div>
                 <h4 className="text-white font-bold text-lg">尊贵月卡</h4>
                 <p className="text-xs text-gray-400 mt-1">30天全解锁 · 性价比首选</p>
               </div>
            </div>
            <div className="text-right">
               <div className="text-2xl font-bold text-white">¥49.9</div>
            </div>
          </div>

          {/* Option 1: Single */}
          <div 
            onClick={purchaseSingle}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center">
               <div className="w-12 h-12 rounded-2xl bg-gray-700/50 flex items-center justify-center mr-5">
                  <Unlock className="w-6 h-6 text-gray-300" />
               </div>
               <div>
                 <h4 className="text-gray-200 font-bold text-lg">单次解锁</h4>
                 <p className="text-xs text-gray-500 mt-1">仅本次咨询 · 深度分析</p>
               </div>
            </div>
            <div className="text-right">
               <div className="text-xl font-bold text-gray-300">¥9.9</div>
            </div>
          </div>

        </div>
      </div>

      {/* Support / Reset */}
      <div className="mt-10 border-t border-white/5 pt-6">
        <div className="flex justify-between items-center text-gray-500 text-xs">
           <p>用户 ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
           <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="hover:text-red-400 transition-colors">
             重置数据
           </button>
        </div>
        <p className="text-center text-[10px] text-gray-600 mt-4">
          灵机 AI 仅供娱乐咨询，请勿沉迷。<br/>
          最终解释权归灵机团队所有。
        </p>
      </div>

    </div>
  );
};

export default ProfileFeature;