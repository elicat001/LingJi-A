import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownResultProps {
  content: string;
}

const MarkdownResult: React.FC<MarkdownResultProps> = ({ content }) => {
  return (
    <div className="bg-gradient-to-b from-mystic-900/60 to-mystic-950/90 border border-white/5 rounded-2xl p-6 md:p-10 font-serif leading-relaxed relative overflow-hidden shadow-inner">
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* Glow from bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-purple-500/5 blur-3xl pointer-events-none"></div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-500/20 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-500/20 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-500/20 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-500/20 rounded-br-lg"></div>

      <div className="prose prose-invert prose-gold max-w-none relative z-10">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-100 to-gold-400 mb-8 pb-4 border-b border-white/10" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gold-200 mt-10 mb-6 flex items-center"><span className="text-gold-500/60 mr-3 text-lg">✦</span>{props.children}</h2>,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gold-300/90 mt-8 mb-4 tracking-wide" {...props} />,
            strong: ({node, ...props}) => <strong className="text-gold-300 font-bold border-b border-gold-500/20 pb-0.5" {...props} />,
            p: ({node, ...props}) => <p className="mb-6 text-gray-300/90 leading-8 text-lg tracking-wide" {...props} />,
            ul: ({node, ...props}) => <ul className="list-none pl-4 mb-6 space-y-3" {...props} />,
            li: ({node, ...props}) => (
              <li className="relative pl-6 text-gray-300/90">
                <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-gold-500/50 rounded-full"></span>
                {props.children}
              </li>
            ),
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gold-500/30 pl-6 italic text-gray-400 my-8 py-2 bg-white/5 rounded-r-lg" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownResult;