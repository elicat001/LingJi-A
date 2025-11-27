import React, { useState, useRef } from 'react';
import { VisionType } from '../types';
import { getVisionAnalysis } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import MarkdownResult from './MarkdownResult';
import { Camera, Upload, Eye, Image as ImageIcon, X, Sparkles, ScanLine } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const VisionFeature: React.FC = () => {
  const { checkAccess, consumeQuota } = useUser();
  const [mode, setMode] = useState<VisionType>(VisionType.PALM);
  const [image, setImage] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    if (!checkAccess()) return;

    setLoading(true);
    setResult(null);
    try {
      const analysis = await getVisionAnalysis(image, mode as 'palm'|'face'|'fengshui', query);
      setResult(analysis);
      consumeQuota(); 
    } catch (e) {
      setResult("分析失败，请检查网络或图片质量。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10 animate-fade-in relative">
         <div className="absolute top-0 right-[20%] w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-100 to-gold-500 mb-4 drop-shadow-sm">
          灵视解读
        </h2>
        <p className="text-mystic-100/60 font-light tracking-wide text-sm md:text-base max-w-lg mx-auto">
          观相识人，风水堪舆，洞察环境与命运的联系
        </p>
      </div>

       <div className="flex justify-center mb-10">
         <div className="bg-mystic-900/60 border border-white/5 p-1.5 rounded-2xl inline-flex backdrop-blur-md shadow-lg">
            {[
              { id: VisionType.PALM, label: '看手相' },
              { id: VisionType.FENGSHUI, label: '看风水' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setMode(item.id); setImage(null); setResult(null); }}
                className={`px-8 py-3 rounded-xl font-serif text-sm md:text-base transition-all duration-300 ${
                  mode === item.id 
                    ? 'bg-gradient-to-b from-gold-600 to-amber-700 text-white shadow-lg shadow-gold-900/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
         </div>
      </div>

      <div className="bg-glass backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl animate-fade-in relative overflow-hidden">
        
        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative border-2 border-dashed border-white/10 hover:border-gold-500/40 rounded-2xl h-80 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 bg-mystic-900/30 hover:bg-mystic-900/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative z-10 p-5 bg-white/5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/5 shadow-xl">
               <Camera className="w-10 h-10 text-gold-400/80" />
            </div>
            <h3 className="text-gold-200 font-serif text-lg mb-2">点击上传或拍摄照片</h3>
            <p className="text-gray-500 text-xs tracking-widest uppercase">
              {mode === VisionType.PALM ? '纹路清晰 · 光线充足' : '整体布局 · 关键细节'}
            </p>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Image Preview with Scanning Effect */}
            <div className="relative h-80 w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 group shadow-2xl">
              <img src={image} alt="Upload" className="w-full h-full object-contain" />
              
              {/* Scan Animation when loading */}
              {loading && (
                 <div className="absolute inset-0 z-20 overflow-hidden">
                    <div className="w-full h-[2px] bg-gold-400/80 shadow-[0_0_15px_rgba(251,191,36,0.8)] animate-[float_3s_ease-in-out_infinite] top-1/2"></div>
                    <div className="absolute inset-0 bg-gold-500/10 animate-pulse"></div>
                 </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-red-900/80 text-white p-2 rounded-full border border-white/20 backdrop-blur-sm transition-all transform hover:scale-110 z-30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <label className="block text-gold-400/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ml-1">
                特别关注 (选填)
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-mystic-800/50 border border-white/5 rounded-xl px-4 py-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gold-500/30 focus:bg-mystic-800/80 transition-all duration-300 h-24 resize-none shadow-inner"
                placeholder={mode === VisionType.PALM ? "例如：感情线分叉代表什么？" : "例如：卧室床头朝向是否合适？"}
              />
            </div>

            {!loading ? (
              <button
                onClick={handleAnalyze}
                className="w-full bg-gradient-to-r from-gold-600 to-amber-600 text-white font-bold py-5 rounded-xl shadow-lg shadow-amber-900/20 hover:shadow-amber-900/40 transform hover:-translate-y-0.5 transition-all duration-300 text-lg tracking-widest flex items-center justify-center overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <Eye className="w-5 h-5 mr-3" /> 
                <span className="relative z-10">开始解读</span>
              </button>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                 <p className="text-gold-300 font-serif animate-pulse tracking-widest">灵机正在洞察...</p>
              </div>
            )}
          </div>
        )}

        {result && (
          <div className="mt-12 animate-fade-in pt-8 border-t border-white/5">
            <h4 className="text-xl text-gold-200 font-serif font-bold mb-6 flex items-center">
              <ScanLine className="w-5 h-5 mr-2 text-gold-500" /> 分析报告
            </h4>
            <MarkdownResult content={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionFeature;