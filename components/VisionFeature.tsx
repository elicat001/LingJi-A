import React, { useState, useRef } from 'react';
import { VisionType } from '../types';
import { getVisionAnalysis } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import MarkdownResult from './MarkdownResult';
import { Camera, Upload, Eye, Image as ImageIcon, X, Sparkles } from 'lucide-react';
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

    // Check Membership Logic
    if (!checkAccess()) return;

    setLoading(true);
    setResult(null);
    try {
      const analysis = await getVisionAnalysis(image, mode as 'palm'|'face'|'fengshui', query);
      setResult(analysis);
      consumeQuota(); // Deduct on success
    } catch (e) {
      setResult("分析失败，请检查网络或图片质量。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-200 to-gold-600 mb-4 drop-shadow-sm">
          灵视解读
        </h2>
        <p className="text-mystic-100/60 font-light tracking-wide text-sm md:text-base">
          观相识人，风水堪舆，洞察环境与命运的联系
        </p>
      </div>

       <div className="flex justify-center mb-10">
         <div className="bg-white/5 border border-white/10 p-1 rounded-2xl inline-flex backdrop-blur-md">
            {[
              { id: VisionType.PALM, label: '看手相' },
              { id: VisionType.FENGSHUI, label: '看风水' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setMode(item.id); setImage(null); setResult(null); }}
                className={`px-8 py-3 rounded-xl font-serif text-sm md:text-base transition-all duration-300 ${
                  mode === item.id 
                    ? 'bg-gold-600 text-white shadow-lg shadow-gold-900/30' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
         </div>
      </div>

      <div className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-6">
           <h3 className="text-lg text-gold-300 font-serif border-b border-white/5 pb-4 mb-4">
            {mode === VisionType.PALM ? '请上传手掌照片' : '请上传环境照片'}
          </h3>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            {mode === VisionType.PALM ? '纹路清晰 · 光线充足' : '整体布局 · 关键细节'}
          </p>
        </div>

        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group relative border-2 border-dashed border-white/10 hover:border-gold-500/50 rounded-2xl h-72 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 bg-black/20 hover:bg-black/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-4 bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/10">
               <Camera className="w-8 h-8 text-gold-400" />
            </div>
            <span className="text-gray-400 font-medium group-hover:text-gold-200 transition-colors">点击上传或拍摄</span>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="relative h-72 w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 group">
              <img src={image} alt="Upload" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-red-900/80 text-white p-2 rounded-full border border-white/20 backdrop-blur-sm transition-all transform hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative">
              <label className="block text-gold-400/80 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                特别关注 (选填)
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-gold-100 placeholder-gray-600 focus:outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all duration-300 h-24 resize-none"
                placeholder={mode === VisionType.PALM ? "例如：感情线分叉代表什么？" : "例如：卧室床头朝向是否合适？"}
              />
            </div>

            {!loading ? (
              <button
                onClick={handleAnalyze}
                className="w-full bg-gradient-to-r from-gold-600 to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-900/20 hover:shadow-amber-900/40 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="flex items-center justify-center tracking-widest">
                  <Eye className="w-5 h-5 mr-2" /> 开始解读
                </span>
              </button>
            ) : (
              <LoadingSpinner text="正在运用慧眼识别..." />
            )}
          </div>
        )}

        {result && (
          <div className="mt-10 animate-fade-in pt-8 border-t border-white/10">
            <h4 className="text-xl text-gold-300 font-serif font-bold mb-6 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-gold-500" /> 分析报告
            </h4>
            <MarkdownResult content={result} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VisionFeature;