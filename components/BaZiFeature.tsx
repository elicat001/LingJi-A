import React, { useState } from 'react';
import { UserProfile } from '../types';
import { getBaZiAnalysis } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import MarkdownResult from './MarkdownResult';
import { Sparkles } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const InputField: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}> = ({ label, type = "text", value, onChange, placeholder, className }) => (
  <div className={`group ${className}`}>
    <label className="block text-gold-400/80 text-xs font-bold uppercase tracking-widest mb-2 ml-1 group-focus-within:text-gold-300 transition-colors">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-gold-100 placeholder-gray-600 focus:outline-none focus:border-gold-500/50 focus:bg-white/10 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 font-sans"
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold-500/10 to-transparent opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500" />
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

    // Check Membership Logic
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
      consumeQuota(); // Deduct quota only on success
    } catch (e) {
      setResult("发生错误，请重试。");
    } finally {
      setLoading(false);
    }
  };

  const todayStr = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-200 to-gold-600 mb-4 drop-shadow-sm">
          八字排盘
        </h2>
        <p className="text-mystic-100/60 font-light tracking-wide text-sm md:text-base max-w-lg mx-auto">
          探究天干地支的奥秘，解析命中注定的机缘
        </p>
        
        <div className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-gold-400 mr-2 animate-pulse" />
          <span className="text-xs text-gray-400">推演日期: <span className="text-gold-300 font-serif ml-1">{todayStr}</span></span>
        </div>
      </div>

      {!result && !loading && (
        <form onSubmit={handleSubmit} className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl shadow-black/20 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <InputField 
              label="姓名" 
              value={profile.name} 
              onChange={(e) => setProfile({...profile, name: e.target.value})} 
              placeholder="请输入您的姓名"
            />

            <div className="group">
              <label className="block text-gold-400/80 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                性别
              </label>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 h-[52px]">
                {['male', 'female'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setProfile({...profile, gender: g as 'male' | 'female'})}
                    className={`flex-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                      profile.gender === g 
                        ? 'bg-gold-600 text-white shadow-lg shadow-gold-900/50' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {g === 'male' ? '乾造 (男)' : '坤造 (女)'}
                  </button>
                ))}
              </div>
            </div>

            <InputField 
              label="出生日期 (公历)" 
              type="date"
              value={profile.birthDate} 
              onChange={(e) => setProfile({...profile, birthDate: e.target.value})} 
              className="calendar-dark"
            />

            <InputField 
              label="出生时间" 
              type="time"
              value={profile.birthTime} 
              onChange={(e) => setProfile({...profile, birthTime: e.target.value})} 
            />
          </div>

          <div className="mb-8 group">
            <label className="block text-gold-400/80 text-xs font-bold uppercase tracking-widest mb-2 ml-1 group-focus-within:text-gold-300 transition-colors">
              心中的困惑 (选填)
            </label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-gold-100 placeholder-gray-600 focus:outline-none focus:border-gold-500/50 focus:bg-white/10 focus:ring-1 focus:ring-gold-500/20 transition-all duration-300 h-32 resize-none"
              placeholder="例如：近期事业发展有瓶颈，适合跳槽吗？"
            />
          </div>

          <button
            type="submit"
            className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-r from-gold-600 to-amber-600 p-px shadow-lg shadow-orange-900/20 hover:shadow-orange-900/40 transition-all duration-300 transform hover:scale-[1.01]"
          >
            <div className="relative bg-gradient-to-r from-gold-600 to-amber-600 text-white px-8 py-4 rounded-xl font-bold tracking-widest text-lg group-hover:bg-opacity-90 transition-all">
              <span className="relative z-10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 mr-2 animate-pulse" /> 开始排盘
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl"></div>
            </div>
          </button>
        </form>
      )}

      {loading && <LoadingSpinner text="正在推演本命格局与流年运势..." />}

      {result && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-end mb-6 px-2">
             <h3 className="text-2xl text-gold-300 font-serif font-bold">批注结果</h3>
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