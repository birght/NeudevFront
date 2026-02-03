
import React, { useState } from 'react';
import { 
  Palette, 
  ArrowLeft, 
  Layers, 
  Sparkles, 
  Zap, 
  Code2, 
  Copy, 
  Check,
  ChevronRight,
  Trophy,
  Sun,
  Moon,
  Wind,
  Glasses
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VisualExpression: React.FC = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(0);
  const [copied, setCopied] = useState(false);

  const items = [
    {
      id: 'holographic-foil',
      name: '全息幻彩折射',
      description: '利用 CSS 变量动态计算背景渐变的角度与色值，模拟信用卡或收藏卡片在光线下的全息色彩偏移感。',
      award: '2024 年度最佳视觉动效',
      tags: ['Holographic', 'Gradient', 'Refraction'],
      preview: (
        <div className="w-full h-full flex items-center justify-center bg-slate-950 rounded-[2rem] overflow-hidden group">
           <div className="w-64 h-96 rounded-3xl relative overflow-hidden animate-hologram-shift shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-rose-500 to-emerald-500 opacity-50 mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.8)_0%,transparent_50%)]"></div>
              <div className="p-8 h-full flex flex-col justify-between">
                 <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-md"></div>
                 <div className="space-y-3">
                    <div className="h-4 w-32 bg-white/20 rounded-full"></div>
                    <div className="h-2 w-48 bg-white/10 rounded-full"></div>
                 </div>
              </div>
           </div>
           <style>{`
             @keyframes hologram-shift {
               0%, 100% { --x: 20%; --y: 20%; }
               50% { --x: 80%; --y: 80%; }
             }
             .animate-hologram-shift { animation: hologram-shift 6s ease-in-out infinite; }
           `}</style>
        </div>
      ),
      code: `.hologram {
  background: linear-gradient(135deg, #4f46e5, #ec4899, #06b6d4);
  background-size: 200%;
  mix-blend-mode: overlay;
  filter: contrast(1.2) brightness(1.1);
}`
    },
    {
      id: 'glass-pro',
      name: '多层景深玻璃拟态',
      description: '不仅是简单的模糊。通过结合内阴影、边缘描边、以及细微的噪点纹理，实现极其逼真的层级通透感。',
      award: 'FWA 每日最佳视觉奖',
      tags: ['Glassmorphism', 'Depth', 'Noise'],
      preview: (
        <div className="w-full h-full bg-[url('https://picsum.photos/seed/glass/1200/800')] bg-cover bg-center rounded-[2rem] flex items-center justify-center p-12">
           <div className="w-full max-w-sm aspect-video bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-8 flex flex-col justify-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full border border-white/30"></div>
              <div className="h-4 w-full bg-white/10 rounded-full"></div>
              <div className="h-4 w-2/3 bg-white/10 rounded-full"></div>
           </div>
        </div>
      ),
      code: `.glass-pro {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1);
}`
    },
    {
      id: 'neumorphism-2',
      name: '新拟态 2.0 (微光拟感)',
      description: '摒弃了第一代生硬的阴影，采用更细腻的多重扩散阴影与内部凹陷效果，实现类似苹果系统控制中心的触觉感。',
      award: 'Dribbble 年度趋势首选',
      tags: ['Neumorphism', 'Tactile', 'Soft UI'],
      preview: (
        <div className="w-full h-full bg-[#e0e5ec] flex items-center justify-center gap-8 rounded-[2rem]">
           <div className="w-24 h-24 bg-[#e0e5ec] rounded-3xl shadow-[9px_9px_16px_#bec4cc,-9px_-9px_16px_#fff] flex items-center justify-center text-slate-400">
              <Sun size={32} />
           </div>
           <div className="w-24 h-24 bg-[#e0e5ec] rounded-3xl shadow-[inset_6px_6px_12px_#bec4cc,inset_-6px_-6px_12px_#fff] flex items-center justify-center text-theme">
              <Moon size={32} />
           </div>
        </div>
      ),
      code: `.soft-ui-out {
  box-shadow: 9px 9px 16px #bec4cc, -9px -9px 16px #ffffff;
}
.soft-ui-in {
  box-shadow: inset 6px 6px 12px #bec4cc, inset -6px -6px 12px #ffffff;
}`
    },
    {
      id: 'fluid-noise',
      name: '有机噪点流体背景',
      description: '通过 SVG 湍流滤镜生成的噪点纹理，与动态渐变混合，创造出具有呼吸感、非人工机械式的有机背景。',
      award: 'CSS Design Awards 创意金奖',
      tags: ['Noise', 'SVG Filter', 'Organic'],
      preview: (
        <div className="w-full h-full bg-theme rounded-[2rem] relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500"></div>
           <svg className="absolute inset-0 w-full h-full opacity-20 contrast-125">
              <filter id="noise">
                 <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)" />
           </svg>
           <div className="absolute inset-0 flex items-center justify-center">
              <h4 className="text-white font-black text-2xl tracking-[0.5em] uppercase">Organic Texture</h4>
           </div>
        </div>
      ),
      code: `<svg>
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" />
  </filter>
</svg>`
    },
    {
      id: 'crt-retro',
      name: '复古 CRT 扫描线',
      description: '通过重复线性渐变模拟老式大头显示器的扫描线，配合色散偏移与微弱的屏幕闪烁，重塑赛博朋克美学。',
      award: 'Retro Design 年度最佳复现奖',
      tags: ['Retro', 'CRT', 'Filter'],
      preview: (
        <div className="w-full h-full bg-slate-900 flex items-center justify-center rounded-[2rem] relative overflow-hidden">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 pointer-events-none"></div>
           <div className="text-emerald-500 font-mono text-4xl animate-flicker">SYSTEM READY_</div>
           <style>{`
             @keyframes flicker {
               0%, 100% { opacity: 0.9; }
               50% { opacity: 1; }
               2% { opacity: 0.4; }
               98% { opacity: 0.8; }
             }
             .animate-flicker { animation: flicker 0.1s infinite; }
           `}</style>
        </div>
      ),
      code: `.crt-screen {
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
  animation: flicker 0.15s infinite;
}`
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(items[activeItem].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center border-b border-slate-50">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-theme hover:text-white transition-all shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Palette className="text-theme" size={28} /> 视觉表现馆
            </h1>
            <p className="text-slate-400 text-sm font-medium mt-1">探索 Web 渲染的色彩深度、纹理质感与光影美学</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 shrink-0 space-y-3">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(index)}
              className={`w-full group flex items-center justify-between p-4 rounded-[1.5rem] transition-all text-left ${
                activeItem === index ? 'bg-theme text-white shadow-xl shadow-theme/20 translate-x-2' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                 <div className={`p-2 rounded-xl ${activeItem === index ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-theme group-hover:text-white'}`}>
                    {index === 0 && <Sparkles size={18} />}
                    {index === 1 && <Layers size={18} />}
                    {index === 2 && <Sun size={18} />}
                    {index === 3 && <Wind size={18} />}
                    {index === 4 && <Glasses size={18} />}
                 </div>
                 <span className="font-bold text-sm">{item.name}</span>
              </div>
              <ChevronRight size={16} className={activeItem === index ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </aside>

        {/* Exhibit */}
        <main className="flex-grow space-y-8 animate-in fade-in duration-700">
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <section className="space-y-4">
                 <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visual Output</span>
                    <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[9px] font-black rounded uppercase">Art Direction</span>
                 </div>
                 <div className="aspect-square xl:aspect-auto xl:h-[500px] shadow-2xl">
                    {items[activeItem].preview}
                 </div>
              </section>

              <section className="flex flex-col gap-6">
                 <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">{items[activeItem].name}</h2>
                    <p className="text-slate-500 font-medium leading-relaxed mb-6">{items[activeItem].description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                       {items[activeItem].tags.map(tag => (
                         <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600">#{tag}</span>
                       ))}
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                       <Trophy size={16} className="text-amber-500" />
                       <span className="text-xs font-bold text-amber-900/80">{items[activeItem].award}</span>
                    </div>
                 </div>

                 <div className="flex-grow flex flex-col bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                       <div className="flex items-center gap-3"><Code2 size={18} className="text-emerald-400" /><span className="text-xs font-black text-white uppercase">Visual Specs</span></div>
                       <button onClick={handleCopy} className="text-xs font-bold text-white flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl">
                         {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />} {copied ? '已复制' : '复制样式'}
                       </button>
                    </div>
                    <pre className="flex-grow font-mono text-sm text-emerald-400/90 overflow-auto leading-relaxed">{items[activeItem].code}</pre>
                 </div>
              </section>
           </div>
        </main>
      </div>
    </div>
  );
};

export default VisualExpression;
