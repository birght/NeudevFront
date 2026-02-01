
import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  MousePointer2, 
  Layers, 
  Waves, 
  Zap, 
  Code2, 
  Copy, 
  Check,
  ExternalLink,
  ChevronRight,
  // Added Trophy and Terminal imports to fix "Cannot find name" errors
  Trophy,
  Terminal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MotionArt: React.FC = () => {
  const navigate = useNavigate();
  const [activeEffect, setActiveEffect] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const effects = [
    {
      id: 'liquid-aurora',
      name: '极光流体文字',
      description: '基于 CSS 混合模式与动画的关键帧，实现如同极光般流动的文字色彩，常用于高端品牌展示。',
      award: '2024 年度最佳视觉表现奖提名',
      tags: ['CSS Animation', 'Mix-blend-mode', 'Typography'],
      preview: (
        <div className="relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden rounded-[2rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.2),transparent_70%)]"></div>
          <h2 className="text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text animate-aurora">
            AURORA
          </h2>
          <style>{`
            @keyframes aurora {
              0% { background-image: linear-gradient(135deg, #4f46e5, #ec4899, #06b6d4); background-size: 200%; background-position: 0% 50%; }
              50% { background-image: linear-gradient(135deg, #06b6d4, #4f46e5, #ec4899); background-size: 200%; background-position: 100% 50%; }
              100% { background-image: linear-gradient(135deg, #4f46e5, #ec4899, #06b6d4); background-size: 200%; background-position: 0% 50%; }
            }
            .animate-aurora { animation: aurora 6s linear infinite; }
          `}</style>
        </div>
      ),
      code: `/* CSS Only Aurora Effect */
.aurora-text {
  background: linear-gradient(135deg, #4f46e5, #ec4899, #06b6d4);
  background-size: 200% auto;
  -webkit-background-clip: text;
  color: transparent;
  animation: move 6s linear infinite;
}

@keyframes move {
  to { background-position: 200% center; }
}`
    },
    {
      id: 'magnetic-card',
      name: '三维磁吸视差卡片',
      description: '捕捉鼠标坐标并在三维空间内进行实时转换，营造出卡片“漂浮”在手指尖的深邃质感。',
      award: 'FWA 每日最佳组件候选',
      tags: ['3D Transform', 'Parallax', 'Interaction'],
      preview: (
        <div 
          className="w-full h-full flex items-center justify-center bg-slate-50 rounded-[2rem] perspective-1000"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            setMousePos({ x, y });
          }}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        >
          <div 
            className="w-64 h-80 bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 flex flex-col justify-between transition-transform duration-200 ease-out preserve-3d"
            style={{ 
              transform: `rotateY(${mousePos.x * 30}deg) rotateX(${mousePos.y * -30}deg)` 
            }}
          >
            <div className="w-12 h-12 bg-theme rounded-2xl flex items-center justify-center text-white shadow-lg translate-z-20">
              <Zap size={24} />
            </div>
            <div>
              <div className="h-2 w-12 bg-theme/20 rounded-full mb-3 translate-z-10"></div>
              <h3 className="text-xl font-black text-slate-900 translate-z-15">Quantum Core</h3>
              <p className="text-xs text-slate-400 mt-2 translate-z-5">Next-gen acceleration protocol</p>
            </div>
          </div>
          <style>{`
            .perspective-1000 { perspective: 1000px; }
            .preserve-3d { transform-style: preserve-3d; }
            .translate-z-20 { transform: translateZ(40px); }
            .translate-z-15 { transform: translateZ(30px); }
            .translate-z-10 { transform: translateZ(20px); }
            .translate-z-5 { transform: translateZ(10px); }
          `}</style>
        </div>
      ),
      code: `// React Mouse Parallax Hook Logic
const onMouseMove = (e) => {
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  setRotation({ y: x * 30, x: y * -30 });
};`
    },
    {
      id: 'fluid-blob',
      name: '动态流体聚合 (Gooey)',
      description: '利用 SVG 滤镜的矩阵转换，实现两个或多个圆形在靠近时产生的“液体融合”效果。',
      award: 'CSS Design Awards 创意动效奖',
      tags: ['SVG Filter', 'Matrix Transform', 'Fluid'],
      preview: (
        <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-[2rem] overflow-hidden relative">
          <svg className="absolute w-0 h-0">
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </svg>
          <div className="flex gap-4" style={{ filter: 'url(#goo)' }}>
            <div className="w-20 h-20 bg-emerald-500 rounded-full animate-blob-1"></div>
            <div className="w-20 h-20 bg-indigo-500 rounded-full animate-blob-2"></div>
          </div>
          <style>{`
            @keyframes blob-1 {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(40px); }
            }
            @keyframes blob-2 {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(-40px); }
            }
            .animate-blob-1 { animation: blob-1 3s ease-in-out infinite; }
            .animate-blob-2 { animation: blob-2 3s ease-in-out infinite; }
          `}</style>
        </div>
      ),
      code: `<svg>
  <filter id="goo">
    <feGaussianBlur stdDeviation="10" />
    <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
  </filter>
</svg>
<div style="filter: url(#goo)">...</div>`
    },
    {
      id: 'glimmer-path',
      name: '微光路径生命线',
      description: '模拟生物脉动的线条描边动画，通过设置 stroke-dasharray 的动态偏移实现能量流转的视觉反馈。',
      award: 'Awwwards 最佳细节表现',
      tags: ['SVG Path', 'Dash Offset', 'Animation'],
      preview: (
        <div className="w-full h-full flex items-center justify-center bg-slate-950 rounded-[2rem]">
          <svg width="200" height="100" viewBox="0 0 200 100" className="drop-shadow-[0_0_10px_rgba(79,70,229,0.8)]">
            <path 
              d="M 10,50 Q 50,10 100,50 T 190,50" 
              fill="none" 
              stroke="#4f46e5" 
              strokeWidth="4" 
              strokeLinecap="round"
              className="animate-path"
            />
          </svg>
          <style>{`
            @keyframes path-anim {
              0% { stroke-dasharray: 0, 300; stroke-dashoffset: 0; }
              50% { stroke-dasharray: 150, 300; stroke-dashoffset: -75; }
              100% { stroke-dasharray: 0, 300; stroke-dashoffset: -300; }
            }
            .animate-path { animation: path-anim 3s linear infinite; }
          `}</style>
        </div>
      ),
      code: `.path {
  stroke-dasharray: 100, 200;
  stroke-dashoffset: 0;
  animation: move-path 2s linear infinite;
}
@keyframes move-path {
  to { stroke-dashoffset: -300; }
}`
    },
    {
      id: 'grid-interaction',
      name: '混沌粒子网格交互',
      description: '当鼠标掠过网格时，邻近的粒子会产生排斥或吸引力，通过算法实现有机且灵动的交互感。',
      award: '2023 全球数字交互艺术展参展作品',
      tags: ['Algorithm', 'Grid', 'Mouse Event'],
      preview: (
        <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-[2rem] relative overflow-hidden group">
          <div className="grid grid-cols-10 gap-4">
            {Array.from({ length: 60 }).map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 bg-slate-700 rounded-full transition-all duration-300 group-hover:bg-theme group-hover:scale-150"
                style={{ 
                  transitionDelay: `${(i % 10) * 50 + Math.floor(i / 10) * 50}ms` 
                }}
              ></div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-[10px] font-black text-white/20 uppercase tracking-[1em]">Hover Matrix</div>
          </div>
        </div>
      ),
      code: `// Staggered Grid Animation
<div className="grid">
  {items.map((i) => (
    <div style={{ transitionDelay: i * 50 }} />
  ))}
</div>`
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(effects[activeEffect].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center border-b border-slate-50">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-theme hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Waves className="text-theme" size={28} /> 动效艺术博物馆
            </h1>
            <p className="text-slate-400 text-sm font-medium mt-1">探索 Web 动效的极致表现与代码实现</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex -space-x-3">
             {[1,2,3,4].map(i => (
               <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="avatar" />
               </div>
             ))}
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">目前有 42 位艺术家在线</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-80 shrink-0 space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Curated Effects</h3>
          {effects.map((effect, index) => (
            <button
              key={effect.id}
              onClick={() => setActiveEffect(index)}
              className={`w-full group flex items-center justify-between p-4 rounded-[1.5rem] transition-all text-left ${
                activeEffect === index 
                ? 'bg-theme text-white shadow-xl shadow-theme/20 translate-x-2' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                 <div className={`p-2 rounded-xl ${activeEffect === index ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-theme group-hover:text-white'} transition-colors`}>
                    {index === 0 && <Layers size={18} />}
                    {index === 1 && <MousePointer2 size={18} />}
                    {index === 2 && <Waves size={18} />}
                    {index === 3 && <Zap size={18} />}
                    {index === 4 && <Sparkles size={18} />}
                 </div>
                 <span className="font-bold text-sm">{effect.name}</span>
              </div>
              <ChevronRight size={16} className={`${activeEffect === index ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
            </button>
          ))}

          <div className="mt-12 p-6 bg-slate-900 rounded-[2rem] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-theme/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <h4 className="text-sm font-black mb-2 flex items-center gap-2 relative z-10"><Trophy size={16} className="text-amber-400" /> 荣誉徽章</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6 relative z-10">贡献高质量动效组件可解锁“动效大师”全球认证勋章。</p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">了解详情</button>
          </div>
        </aside>

        {/* Main Exhibit */}
        <main className="flex-grow space-y-8 animate-in fade-in duration-700">
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Preview Canvas */}
              <section className="space-y-4">
                 <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Exhibit</span>
                    <div className="flex gap-2">
                       <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded uppercase border border-emerald-100">GPU Accelerated</span>
                    </div>
                 </div>
                 <div className="aspect-square xl:aspect-auto xl:h-[500px] shadow-2xl">
                    {effects[activeEffect].preview}
                 </div>
              </section>

              {/* Info & Code */}
              <section className="flex flex-col gap-6">
                 <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
                    <div className="flex items-center gap-2 text-theme text-[10px] font-black uppercase tracking-widest mb-4">
                      <Sparkles size={14} /> Curated Artwork
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">{effects[activeEffect].name}</h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-6">
                       {effects[activeEffect].description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                       {effects[activeEffect].tags.map(tag => (
                         <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600">#{tag}</span>
                       ))}
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                       <div className="p-2 bg-white rounded-lg text-amber-500 shadow-sm"><Trophy size={16} /></div>
                       <span className="text-xs font-bold text-amber-900/80">{effects[activeEffect].award}</span>
                    </div>
                 </div>

                 <div className="flex-grow flex flex-col bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-emerald-400"><Code2 size={18} /></div>
                          <span className="text-xs font-black text-white uppercase tracking-widest">Implementation</span>
                       </div>
                       <button 
                         onClick={handleCopy}
                         className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition-all active:scale-95"
                       >
                         {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                         {copied ? 'Copied' : 'Copy Snippet'}
                       </button>
                    </div>
                    <pre className="flex-grow font-mono text-sm text-emerald-400/90 overflow-auto custom-scroll leading-relaxed">
                       {effects[activeEffect].code}
                    </pre>
                    <div className="absolute bottom-0 right-0 p-8 pointer-events-none opacity-10">
                       <Terminal size={120} className="text-white" />
                    </div>
                 </div>
              </section>
           </div>

           {/* More Insights */}
           <div className="p-10 bg-indigo-50/50 border border-indigo-100 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex gap-6 items-center">
                 <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-theme transition-transform hover:scale-110">
                    <ExternalLink size={32} />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">想要在你的项目中使用？</h4>
                    <p className="text-slate-500 text-sm font-medium mt-1">这些动效均适配 Tailwind v3.0+。如需更多控制，可查看完整版源码仓库。</p>
                 </div>
              </div>
              <button className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200 flex items-center gap-3">
                 前往代码仓库 <ChevronRight size={20} />
              </button>
           </div>
        </main>
      </div>
    </div>
  );
};

export default MotionArt;
