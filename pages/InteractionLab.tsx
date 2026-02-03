
import React, { useState, useRef, useEffect } from 'react';
import { 
  MousePointer2, 
  ArrowLeft, 
  Hand, 
  Maximize2, 
  Terminal, 
  Command, 
  Search,
  Code2, 
  Copy, 
  Check,
  ChevronRight,
  Trophy,
  Sparkles,
  Zap,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InteractionLab: React.FC = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(0);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const items = [
    {
      id: 'magnetic-button',
      name: '磁吸力动作按钮',
      description: '超越普通悬停，组件会感知光标位置并在一定半径内产生吸附效果，极大增强了“点击”的确定感。',
      award: '2024 UX 最佳微交互奖',
      tags: ['Physics', 'Proximity', 'Feedback'],
      preview: (
        <div 
          className="w-full h-full flex items-center justify-center bg-slate-50 rounded-[2rem] relative overflow-hidden"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
            const y = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
            setMousePos({ x, y });
          }}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        >
          <button 
            className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-2xl transition-transform duration-150 ease-out flex items-center gap-3"
            style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          >
            <Zap size={20} className="text-amber-400" /> MAGNETIC
          </button>
        </div>
      ),
      code: `// Magnetic logic
const x = (mouseX - center.x) * 0.2;
const y = (mouseY - center.y) * 0.2;
style.transform = \`translate(\${x}px, \${y}px)\`;`
    },
    {
      id: 'command-palette',
      name: '极简全局命令中心',
      description: '按下 Cmd+K 开启的未来。通过模糊搜索与快捷指令，将原本复杂的多级菜单简化为单一入口的流式体验。',
      award: 'Awwwards 最佳生产力工具界面',
      tags: ['Spotlight', 'Search', 'Efficiency'],
      preview: (
        <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-[2rem] p-12">
           <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                 <Search size={18} className="text-slate-400" />
                 <div className="h-4 w-32 bg-slate-100 rounded animate-pulse"></div>
              </div>
              <div className="p-2 space-y-1">
                 {[1,2,3].map(i => (
                   <div key={i} className={`p-3 rounded-xl flex items-center justify-between ${i === 1 ? 'bg-theme text-white' : 'hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-3">
                         <div className={`w-6 h-6 rounded flex items-center justify-center ${i === 1 ? 'bg-white/20' : 'bg-slate-100'}`}><Command size={12}/></div>
                         <span className="text-xs font-bold">Action Item 0{i}</span>
                      </div>
                      {i === 1 && <span className="text-[10px] opacity-60">Enter</span>}
                   </div>
                 ))}
              </div>
           </div>
        </div>
      ),
      code: `const CommandK = () => {
  useEffect(() => {
    const handleDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault(); toggle();
      }
    };
    window.addEventListener('keydown', handleDown);
  }, []);
}`
    },
    {
      id: 'morphing-progress',
      name: '形状拟态进度追踪',
      description: '当进度改变时，SVG 容器会通过 FLIP 动画平滑改变形状以适应新的内容层级，而非机械的尺寸突变。',
      award: 'ProductHunt 年度交互设计金奖',
      tags: ['SVG Morph', 'FLIP', 'Guidance'],
      preview: (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-[2rem]">
           <div className="w-64 h-2 bg-slate-100 rounded-full mb-10 overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 bg-theme transition-all duration-700 w-1/2"></div>
           </div>
           <div className="flex gap-4">
              {[1,2,3].map(i => (
                <div key={i} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${i <= 2 ? 'bg-theme text-white scale-110 shadow-lg' : 'bg-slate-50 text-slate-400'}`}>
                   <Check size={20} />
                </div>
              ))}
           </div>
        </div>
      ),
      code: `/* CSS Shape Transition */
.step-container {
  transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  clip-path: circle(50% at 50% 50%);
}
.step-container.active {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}`
    },
    {
      id: 'springy-drawer',
      name: '弹性感官底部抽屉',
      description: '利用 Framer Motion 等物理引擎，抽屉在拉动到边缘时会产生自然的弹性阻尼感，仿佛真实的物理材质。',
      award: 'CSS Design Awards 最佳移动交互',
      tags: ['Physics', 'Spring', 'Tactile'],
      preview: (
        <div className="w-full h-full bg-slate-50 rounded-[2rem] relative overflow-hidden flex flex-col justify-end">
           <div className="bg-white border-t border-slate-100 rounded-t-[2.5rem] p-8 shadow-2xl h-1/2 animate-bounce-soft">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
              <div className="space-y-4">
                 <div className="h-10 w-full bg-slate-50 rounded-xl"></div>
                 <div className="h-10 w-3/4 bg-slate-50 rounded-xl"></div>
              </div>
           </div>
           <style>{`
             @keyframes bounce-soft {
               0%, 100% { transform: translateY(10px); }
               50% { transform: translateY(0); }
             }
             .animate-bounce-soft { animation: bounce-soft 4s ease-in-out infinite; }
           `}</style>
        </div>
      ),
      code: `import { motion } from 'framer-motion';
<motion.div 
  drag="y" 
  dragConstraints={{ top: 0 }}
  transition={{ type: 'spring', stiffness: 300 }} 
/>`
    },
    {
      id: 'proximity-hover',
      name: '近距感知光场',
      description: '组件背景会根据鼠标距离远近动态改变光晕强度，即使光标不直接触碰组件，也能产生“呼吸”般的感官链接。',
      award: '2023 数字化艺术交互银奖',
      tags: ['Proximity', 'Lumina', 'Ambience'],
      preview: (
        <div className="w-full h-full flex items-center justify-center bg-slate-950 rounded-[2rem] relative group">
           <div className="grid grid-cols-2 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-24 h-24 bg-slate-900 border border-white/5 rounded-2xl relative transition-colors group-hover:border-theme/30 overflow-hidden">
                   <div className="absolute inset-0 bg-theme opacity-0 group-hover:opacity-10 blur-xl transition-opacity"></div>
                   <div className="absolute inset-0 flex items-center justify-center text-white/20"><Maximize2 size={24}/></div>
                </div>
              ))}
           </div>
        </div>
      ),
      code: `// Proximity Detection
const distance = Math.hypot(mouseX - cardX, mouseY - cardY);
const intensity = Math.max(0, 1 - distance / 200);
style.background = \`rgba(79, 70, 229, \${intensity})\`;`
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
              <MousePointer2 className="text-theme" size={28} /> 交互实验室
            </h1>
            <p className="text-slate-400 text-sm font-medium mt-1">探索 Web 交互的物理感、确定性与效率极限</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Nav */}
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
                    {index === 0 && <Hand size={18} />}
                    {index === 1 && <Terminal size={18} />}
                    {index === 2 && <Zap size={18} />}
                    {index === 3 && <Maximize2 size={18} />}
                    {index === 4 && <Sparkles size={18} />}
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
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Prototype</span>
                    <span className="px-2 py-0.5 bg-theme/10 text-theme text-[9px] font-black rounded">Interactive Canvas</span>
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
                       <div className="flex items-center gap-3"><Code2 size={18} className="text-emerald-400" /><span className="text-xs font-black text-white uppercase">Logic Snippet</span></div>
                       <button onClick={handleCopy} className="text-xs font-bold text-white flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl">
                         {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
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

export default InteractionLab;
