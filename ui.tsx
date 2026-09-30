import React, { useState } from 'react';
import { Info } from 'lucide-react';
import type { StepType } from './types';

export const StepTag: React.FC<{ step: StepType; size?: 'sm' | 'md' }> = ({ step, size = 'md' }) => {
  const getStyle = () => {
    switch (step) {
      case 'STEP_1':
        return 'bg-[#151B8D]/50 text-blue-300 border-[#151B8D] shadow-[0_0_12px_rgba(21,27,141,0.5)]';
      case 'STEP_2':
        return 'bg-[#4B1785]/50 text-purple-300 border-[#4B1785] shadow-[0_0_12px_rgba(75,23,133,0.5)]';
      case 'STEP_3':
        return 'bg-[#22578C]/50 text-cyan-300 border-[#22578C] shadow-[0_0_12px_rgba(34,87,140,0.5)]';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  const getLabel = () => {
    switch (step) {
      case 'STEP_1': return 'STEP 1';
      case 'STEP_2': return 'STEP 2 CK';
      case 'STEP_3': return 'STEP 3';
    }
  };

  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center font-extrabold tracking-wider rounded-md border ${getStyle()} ${sizeClass}`}>
      {getLabel()}
    </span>
  );
};

export const InfoTooltip: React.FC<{ content: string; title?: string }> = ({ content, title }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(!visible)}
        className="text-gray-400 hover:text-cyan-400 transition-colors p-1 focus:outline-none"
        aria-label="Information tooltip"
      >
        <Info className="w-4 h-4" />
      </button>
      {visible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 p-3 bg-[#0D1122] border border-[#22578C]/80 rounded-xl shadow-[0_0_20px_rgba(34,87,140,0.4)] z-50 text-xs text-gray-200 pointer-events-none">
          {title && <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">{title}</div>}
          <div className="leading-relaxed text-gray-300">{content}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#0D1122]" />
        </div>
      )}
    </div>
  );
};
