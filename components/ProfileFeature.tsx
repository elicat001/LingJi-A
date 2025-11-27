import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Crown, Sparkles, Unlock, User, Clock, ChevronRight, History, ShieldCheck, CreditCard } from 'lucide-react';

const ProfileFeature: React.FC = () => {
  const { 
    userId,
    isVip, 
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
    <div className="max-w-2xl mx-auto animate-fade-in pb-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2">
          个人中心
        </h2>
      </div>

      {/* User Status Card - Holographic Effect */}
      <div className="relative overflow-hidden rounded-3xl p-8 mb-10 border border-white/10 shadow-2xl group transition-transform hover:scale-[1.01] duration-500">
        {/* Animated Gradient Background */}
        <div className={`absolute inset-0 ${isVip ? 'bg-gradient-to-br from-gold-900 via-mystic-900 to-black' : 'bg-gradient-to-br from-mystic-800 via-mystic-900 to-black'} z-0`}></div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          <div className={`w-24 h-24 rounded-full border-4 ${isVip ? 'border-gold-500/50 shadow-[0_0_30px_rgba(251,191,36,0.2)]' : 'border-white/10'} flex items-center justify-center bg-black/40 mb-4 md:mb-0 md:mr-8 backdrop-blur-md`}>
             <User className={`w-10 h-10 ${isVip ? 'text-gold-300' : 'text-gray-400'}`} />
          </div>
          <div className="flex-1 w-full">
             <div className="flex flex-col md:flex-row items-center md:justify-between mb-4">
                <div className="flex items-center">
                    <h3 className={`text-2xl font-bold font-serif ${isVip ? 'text-transparent bg-clip-text bg-gradient-to-r from-gold-200 to-gold-500' : 'text-white'}`}>
                    {isVip ? '尊贵会员' : '普通用户'}
                    </h3>
                    {isVip && <span className="ml-3 px-2 py-0.5 bg-gold-500/20 border border-gold-500/50 rounded text-[10px] text-gold-300 font-bold uppercase tracking-wider animate-pulse">VIP</span>}
                </div>
                <div className="mt-2 md:mt-0 text-[10px] text-gray-500 font-mono bg-black/30 px-2 py-1 rounded">
                    ID: {userId}
                </div>
             </div>
             
             {isVip ? (
               <div className="flex items-center justify-center md:justify-start text-gold-400/80 text-sm bg-gold-900/20 border border-gold-500/10 rounded-xl px-4 py-3 w-fit">
                 <Clock className="w-4 h-4 mr-2" />
                 <span>有效期至: <span className="text-gold-200 font-bold ml-1">{vipExpiry ? formatDate(vipExpiry) : '永久'}</span></span>
               </div>
             ) : (
               <div className="space-y-3 w-full">
                 <div className="flex justify-between text-xs text-gray-400 tracking-wider">
                   <span>今日免费额度</span>
                   <span className="text-white font-bold">{Math.max(0, maxFree - usageCount)} / {maxFree}</span>
                 </div>
                 <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                   <div 
                     className="bg-gradient-to-r from-gold-600 to-gold-400 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(251,191,36,0.5)]" 
                     style={{ width: `${Math.min(100, (Math.max(0, maxFree - usageCount) / maxFree) * 100)}%` }}
                   ></div>
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Function Grid */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors hover:border-white/10">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 border border-blue-500/20">
                    <History className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                    <h4 className="text-gray-200 font-bold text-sm">测算记录</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">查看历史解读</p>
                </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
        </div>
        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors hover:border-white/10">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mr-4 border border-green-500/20">
                    <ShieldCheck className="w-5 h-5 text-green-300" />
                </div>
                <div>
                    <h4 className="text-gray-200 font-bold text-sm">隐私设置</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">管理个人信息</p>
                </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      {/* Membership Plans */}
      <div className="mb-8">
        <h3 className="text-lg text-gold-200 font-serif font-bold mb-6 flex items-center pl-3 border-l-2 border-gold-500/50">
           <Sparkles className="w-4 h-4 mr-2 text-gold-500" /> 会员套餐
        </h3>
        <div className="space-y-5">
          
          {/* Option 2: Weekly (Popular) */}
          <div 
            onClick={purchaseWeekly}
            className="group relative bg-gradient-to-r from-gold-900/20 to-mystic-800 border border-gold-500/30 hover:border-gold-500/60 rounded-2xl p-6 cursor-pointer transition-all duration-300 flex items-center justify-between transform hover:scale-[1.02] shadow-lg shadow-gold-900/10 overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-gold-600 to-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-md border border-white/10">
              Most Popular
            </div>
            
            <div className="flex items-center relative z-10">
               <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-amber-600/10 flex items-center justify-center mr-5 border border-gold-500/20 shadow-inner">
                  <Crown className="w-7 h-7 text-gold-300" />
               </div>
               <div>
                 <h4 className="text-gold-100 font-bold text-xl">七日周卡</h4>
                 <p className="text-xs text-gold-500/60 mt-1 font-medium tracking-wide">无限畅享 · 每日运势 · 深度解读</p>
               </div>
            </div>
            <div className="text-right relative z-10">
               <div className="text-xs text-gray-500 line-through mb-1">¥29.9</div>
               <div className="text-2xl font-bold text-gold-400">¥19.9</div>
            </div>
          </div>

          {/* Option 3: Monthly */}
          <div 
            onClick={purchaseMonthly}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center">
               <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mr-5 border border-purple-500/20">
                  <CreditCard className="w-6 h-6 text-purple-300" />
               </div>
               <div>
                 <h4 className="text-gray-100 font-bold text-lg">尊贵月卡</h4>
                 <p className="text-xs text-gray-400 mt-1">30天全解锁 · 性价比首选</p>
               </div>
            </div>
            <div className="text-right">
               <div className="text-xl font-bold text-white">¥49.9</div>
            </div>
          </div>

          {/* Option 1: Single */}
          <div 
            onClick={purchaseSingle}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center">
               <div className="w-12 h-12 rounded-2xl bg-gray-700/30 flex items-center justify-center mr-5 border border-gray-600/30">
                  <Unlock className="w-6 h-6 text-gray-300" />
               </div>
               <div>
                 <h4 className="text-gray-300 font-bold text-lg">单次解锁</h4>
                 <p className="text-xs text-gray-500 mt-1">仅本次咨询 · 深度分析</p>
               </div>
            </div>
            <div className="text-right">
               <div className="text-xl font-bold text-gray-400">¥9.9</div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-12 border-t border-white/5 pt-8">
        <div className="flex justify-between items-center text-gray-600 text-[10px] tracking-wider uppercase">
           <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="hover:text-red-400 transition-colors border-b border-transparent hover:border-red-400/30 pb-0.5">
             重置本地数据
           </button>
           <p className="opacity-50">Version 2.0.0 Pro</p>
        </div>
        <p className="text-center text-[10px] text-gray-700 mt-6 leading-relaxed opacity-60">
          灵机 AI 仅供娱乐咨询，请勿沉迷 · 天机自在人心
        </p>
      </div>

    </div>
  );
};

export default ProfileFeature;