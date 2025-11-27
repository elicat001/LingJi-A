import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownResultProps {
  content: string;
}

const MarkdownResult: React.FC<MarkdownResultProps> = ({ content }) => {
  return (
    <div className="bg-mystic-900/30 rounded-xl p-6 md:p-8 font-serif leading-relaxed relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-500/20 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-500/20 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-500/20 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-500/20 rounded-br-lg"></div>

      <div className="prose prose-invert prose-gold max-w-none">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-2xl md:text-3xl font-bold text-gold-300 mb-6 border-b border-white/10 pb-3" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl md:text-2xl font-bold text-gold-200 mt-8 mb-4 flex items-center before:content-['✦'] before:mr-2 before:text-gold-500/50 before:text-sm" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg md:text-xl font-bold text-gold-200/90 mt-6 mb-3" {...props} />,
            strong: ({node, ...props}) => <strong className="text-gold-300 font-bold" {...props} />,
            p: ({node, ...props}) => <p className="mb-4 text-gray-300/90 leading-7 md:leading-8 text-base md:text-lg tracking-wide" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-300/80 marker:text-gold-500/50" {...props} />,
            li: ({node, ...props}) => <li className="pl-1" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gold-500/30 pl-4 italic text-gray-400 my-4" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownResult;