import React from 'react';

const StaticBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-950">
      {/* Base gradient (static) */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900 via-gray-950 to-black" />
      
      {/* Very subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(60,60,80,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(60,60,80,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem]" />
      
      {/* Static star field effect */}
      <div className="absolute inset-0">
        {/* Few static bright stars */}
        <div className="absolute w-1.5 h-1.5 rounded-full bg-blue-200 top-[15%] left-[20%] shadow-[0_0_4px_1px_rgba(191,219,254,0.7)]" />
        <div className="absolute w-2 h-2 rounded-full bg-white top-[30%] left-[70%] shadow-[0_0_5px_2px_rgba(255,255,255,0.7)]" />
        <div className="absolute w-1 h-1 rounded-full bg-indigo-200 top-[70%] left-[30%] shadow-[0_0_3px_1px_rgba(199,210,254,0.7)]" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-purple-200 top-[50%] left-[85%] shadow-[0_0_4px_1px_rgba(233,213,255,0.7)]" />
        <div className="absolute w-1 h-1 rounded-full bg-blue-100 top-[85%] left-[15%] shadow-[0_0_3px_1px_rgba(219,234,254,0.7)]" />
        <div className="absolute w-2 h-2 rounded-full bg-indigo-100 top-[40%] left-[45%] shadow-[0_0_5px_2px_rgba(224,231,255,0.7)]" />
        <div className="absolute w-1 h-1 rounded-full bg-white top-[20%] left-[60%] shadow-[0_0_3px_1px_rgba(255,255,255,0.7)]" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-blue-200 top-[60%] left-[10%] shadow-[0_0_4px_1px_rgba(191,219,254,0.7)]" />
      </div>
      
      {/* Static nebula-like effect */}
      <div className="absolute opacity-5 blur-3xl pointer-events-none w-[300px] h-[300px] left-[10%] top-[20%] bg-[radial-gradient(circle,rgba(120,100,180,0.3)_0%,transparent_70%)]" />
      <div className="absolute opacity-5 blur-3xl pointer-events-none w-[400px] h-[400px] left-[40%] top-[35%] bg-[radial-gradient(circle,rgba(140,130,200,0.3)_0%,transparent_70%)]" />
      <div className="absolute opacity-5 blur-3xl pointer-events-none w-[500px] h-[500px] left-[70%] top-[50%] bg-[radial-gradient(circle,rgba(160,120,220,0.3)_0%,transparent_70%)]" />
    </div>
  );
};

export default StaticBackground; 