
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sage-400 to-sage-600 rounded-lg animate-pulse-subtle" />
        {/* Changed logo to display "FS" for FinSage */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-full">
          <span className="font-display font-bold text-white text-xl tracking-tighter">FS</span>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent to-white/20 rounded-lg" />
      </div>
      <div className="font-display font-semibold text-xl">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sage-600 to-sage-700">Fin</span>
        <span className="text-sage-500">Sage</span>
      </div>
    </div>
  );
};

export default Logo;
