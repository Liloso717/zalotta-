import React, { ReactNode } from 'react';

interface GlassProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassProps> = ({ children, className = '', onClick, interactive = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        glass-panel rounded-2xl p-6 transition-all duration-300 relative overflow-hidden
        ${interactive ? 'hover:scale-[1.02] hover:bg-white/10 cursor-pointer active:scale-95' : ''}
        ${className}
      `}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>
      {children}
    </div>
  );
};

export const GlassButton: React.FC<GlassProps & { variant?: 'primary' | 'secondary' }> = ({ 
  children, 
  className = '', 
  onClick, 
  variant = 'primary' 
}) => {
  const baseStyle = "px-6 py-3 rounded-xl font-tech font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2";
  const primaryStyle = "bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] text-white";
  const secondaryStyle = "bg-black/20 hover:bg-black/40 border border-white/5 text-white/70 hover:text-white";

  return (
    <button 
      onClick={onClick}
      className={`${baseStyle} ${variant === 'primary' ? primaryStyle : secondaryStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: ReactNode, color?: string }> = ({ children, color = "bg-blue-500" }) => (
  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/90 ${color} bg-opacity-20 border border-white/10 backdrop-blur-md`}>
    {children}
  </span>
);
