import React, { useState } from 'react';
import { UserProfile } from '../types';
import { getBaZiAnalysis } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import MarkdownResult from './MarkdownResult';
import { Sparkles, User, Calendar, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const InputField: React.FC<{
  label: string;
  icon: React.ElementType;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}> = ({ label, icon: Icon, type = "text", value, onChange, placeholder, className }) => (
  <div className={`group ${className}`}>
    <label className="block text-gold-400/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-gold-300 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-400 transition-colors duration-300">
        <Icon className="w-5 h-5" />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-mystic-800/50 border border-white/5 rounded-xl pl-12 pr-4 py-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gold-500/30 focus:bg-mystic-800/80 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 font-sans shadow-inner"
      />
    </div>
  </div>
);

const BaZiFeature: React.FC = () => {
  const { checkAccess, consumeQuota } = useUser();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    gender: 'male',
    birthDate: '',
    birthTime: '',
  });
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name || !profile.birthDate || !profile.birthTime) return;

    if (!checkAccess()) return;

    setLoading(true);
    setResult(null);
    try {
      const analysis = await getBaZiAnalysis(
        profile.name,
        profile.gender,
        profile.birthDate,
        profile.birthTime,
        query || "综合运势"
      );
      setResult(analysis);
      consumeQuota();
    } catch (e) {
      setResult("发生错误，请重试。");
    } finally {
      setLoading(false);
    }
  };

  const todayStr = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Header */}
      <div className="text-center mb-10 animate-fade-in relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -z-10"></div>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-500 mb-4 drop-shadow-[0_2px_10px_rgba(251,191,36,0.2)]">
          八字排盘
        </h2>
        <p className="text-mystic-100/60 font-light tracking-widest text-xs md:text-sm uppercase max-w-lg mx-auto border-t border-b border-white/5 py-3">
          天干地支 · 阴阳五行 · 流年大运
        </p>
        
        <div className="mt-6 inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-gold-400 mr-2 animate-pulse" />
          <span className="text-[10px] text-gray-400 tracking-wider">今日: <span className="text-gold-300 font-serif ml-1">{todayStr}</span></span>
        </div>
      </div>

      {!result && !loading && (
        <form onSubmit={handleSubmit} className="bg-glass backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl shadow-black/20 animate-fade-in relative overflow-hidden">
          {/* Decorative shine */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
            <InputField 
              label="姓名" 
              icon={User}
              value={profile.name} 
              onChange={(e) => setProfile({...profile, name: e.target.value})} 
              placeholder="请输入您的姓名"
            />

            <div className="group">
              <label className="block text-gold-400/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ml-1">
                性别
              </label>
              <div className="flex bg-mystic-800/50 p-1 rounded-xl border border-white/5 h-[58px]">
                {['male', 'female'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setProfile({...profile, gender: g as 'male' | 'female'})}
                    className={`flex-1 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      profile.gender === g 
                        ? 'bg-gradient-to-b from-gold-600 to-amber-700 text-white shadow-lg' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{g === 'male' ? '乾造 (男)' : '坤造 (女)'}</span>
                  </button>
                ))}
              </div>
            </div>

            <InputField 
              label="出生日期" 
              icon={Calendar}
              type="date"
              value={profile.birthDate} 
              onChange={(e) => setProfile({...profile, birthDate: e.target.value})} 
              className="calendar-dark"
            />

            <InputField 
              label="出生时间" 
              icon={Clock}
              type="time"
              value={profile.birthTime} 
              onChange={(e) => setProfile({...profile, birthTime: e.target.value})} 
            />
          </div>

          <div className="mb-8 group relative z-10">
            <label className="block text-gold-400/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ml-1 group-focus-within:text-gold-300 transition-colors flex items-center">
               <HelpCircle className="w-3 h-3 mr-1" /> 心中的困惑 (选填)
            </label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-mystic-800/50 border border-white/5 rounded-xl px-4 py-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gold-500/30 focus:bg-mystic-800/80 transition-all duration-300 h-32 resize-none shadow-inner"
              placeholder="例如：近期事业发展有瓶颈，适合跳槽吗？"
            />
          </div>

          <button
            type="submit"
            className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 p-[1px] shadow-lg shadow-amber-900/20 hover:shadow-amber-900/40 transition-all duration-300 transform hover:scale-[1.005]"
          >
            <div className="relative bg-gradient-to-r from-gold-600 to-amber-600 text-white px-8 py-5 rounded-xl font-bold tracking-[0.2em] text-lg group-hover:bg-opacity-90 transition-all flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-3 animate-pulse" /> 
              <span>开始排盘</span>
              <ArrowRight className="w-5 h-5 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </div>
          </button>
        </form>
      )}

      {loading && <LoadingSpinner text="正在推演本命格局与流年运势..." />}

      {result && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-end mb-6 px-2">
             <h3 className="text-2xl text-gold-200 font-serif font-bold flex items-center">
                <Sparkles className="w-5 h-5 mr-3 text-gold-500" /> 
                批注结果
             </h3>
             <button 
               onClick={() => setResult(null)} 
               className="text-xs text-gold-400/70 hover:text-gold-300 uppercase tracking-widest border-b border-gold-500/30 hover:border-gold-300 pb-1 transition-all"
             >
               重新排盘
             </button>
          </div>
          <MarkdownResult content={result} />
        </div>
      )}
    </div>
  );
};

export default BaZiFeature;