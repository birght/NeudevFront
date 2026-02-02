
import React, { useState } from 'react';
import { 
  Boxes, 
  ArrowLeft, 
  Layout, 
  Columns, 
  Grid3X3, 
  Maximize, 
  Monitor, 
  Code2, 
  Copy, 
  Check,
  ChevronRight,
  Trophy,
  Sparkles,
  ExternalLink,
  Smartphone,
  // Fix: Added Layers import to resolve "Cannot find name 'Layers'" error on line 278
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UltimateLayouts: React.FC = () => {
  const navigate = useNavigate();
  const [activeLayout, setActiveLayout] = useState(0);
  const [copied, setCopied] = useState(false);

  const layouts = [
    {
      id: 'bento-grid',
      name: 'Bento Grid (本托网格)',
      description: '模块化的非均匀网格系统，利用 grid-span 实现极具视觉张力的信息层级，是目前顶级科技公司首选的仪表盘布局。',
      award: '2024 UI 设计趋势金奖',
      tags: ['CSS Grid', 'Modular', 'Dynamic'],
      preview: (
        <div className="w-full h-full bg-slate-50 p-6 md:p-8 rounded-[2rem] overflow-auto">
          <div className="grid grid-cols-4 grid-rows-4 gap-4 h-full min-h-[400px]">
            <div className="col-span-2 row-span-2 bg-theme text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl shadow-theme/20">
              <Sparkles size={24} />
              <h4 className="text-xl font-black">Feature Alpha</h4>
            </div>
            <div className="col-span-2 row-span-1 bg-white border border-slate-100 rounded-3xl p-6 flex items-center justify-center">
              <Monitor size={20} className="text-slate-400" />
            </div>
            <div className="col-span-1 row-span-1 bg-emerald-500 text-white rounded-3xl flex items-center justify-center font-bold">12k</div>
            <div className="col-span-1 row-span-1 bg-white border border-slate-100 rounded-3xl"></div>
            <div className="col-span-1 row-span-2 bg-slate-900 text-white rounded-3xl"></div>
            <div className="col-span-3 row-span-2 bg-white border border-slate-100 rounded-3xl p-8">
               <div className="h-2 w-1/3 bg-slate-100 rounded-full mb-4"></div>
               <div className="space-y-3">
                  <div className="h-1 w-full bg-slate-50 rounded-full"></div>
                  <div className="h-1 w-full bg-slate-50 rounded-full"></div>
                  <div className="h-1 w-2/3 bg-slate-50 rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      ),
      code: `/* CSS Bento Grid Logic */
.bento-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 1rem;
}

.bento-item-large {
  grid-column: span 2;
  grid-row: span 2;
}`
    },
    {
      id: 'split-narrative',
      name: '非对称双屏叙事',
      description: '左右分割的视觉对比，通常采用左侧固定视差背景，右侧流式内容的交互方式，营造极佳的阅读节奏。',
      award: 'Awwwards 年度最佳布局架构',
      tags: ['Flexbox', 'Parallax', 'Storytelling'],
      preview: (
        <div className="w-full h-full flex bg-white rounded-[2rem] overflow-hidden shadow-inner border border-slate-50">
          <div className="w-1/3 bg-slate-900 p-8 flex flex-col justify-end relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-theme rounded-full blur-[80px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10">
                <div className="w-10 h-10 bg-theme rounded-xl mb-4"></div>
                <h4 className="text-white font-black text-xl">The Core Narrative</h4>
             </div>
          </div>
          <div className="flex-grow p-10 overflow-auto">
             <h5 className="text-[10px] font-black text-theme uppercase tracking-widest mb-6">Introduction</h5>
             <div className="space-y-6">
                <div className="h-4 w-full bg-slate-50 rounded-full"></div>
                <div className="h-4 w-5/6 bg-slate-50 rounded-full"></div>
                <div className="h-4 w-full bg-slate-50 rounded-full"></div>
                <div className="h-4 w-2/3 bg-slate-50 rounded-full"></div>
                <div className="mt-12 p-6 border border-slate-100 rounded-2xl">
                   <div className="h-20 bg-slate-50 rounded-xl"></div>
                </div>
             </div>
          </div>
        </div>
      ),
      code: `<div className="flex flex-col lg:flex-row h-screen">
  <div className="lg:w-1/3 sticky top-0 bg-dark">
    {/* Background Content */}
  </div>
  <div className="flex-1 p-20 overflow-y-auto">
    {/* Narrative Content */}
  </div>
</div>`
    },
    {
      id: 'stacked-sections',
      name: '吸附堆叠布局',
      description: '利用 CSS sticky 属性实现的多层级卡片堆叠效果，随着用户滚动，旧内容被新内容逐渐覆盖，产生极强的层次感。',
      award: 'CSS Design Awards 最佳交互布局',
      tags: ['Position Sticky', 'Z-Index', 'Layered'],
      preview: (
        <div className="w-full h-full bg-slate-100 rounded-[2rem] p-10 overflow-auto space-y-4">
           {[1,2,3].map(i => (
             <div key={i} className="sticky top-0 bg-white border border-slate-200 h-48 rounded-3xl shadow-xl p-8 transition-transform" style={{ marginTop: i > 1 ? '-2rem' : '0' }}>
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-8 h-8 rounded-full bg-theme/10 text-theme flex items-center justify-center font-bold">{i}</div>
                   <h4 className="font-bold text-slate-800">Layered Card 0{i}</h4>
                </div>
                <div className="space-y-2">
                   <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                   <div className="h-2 w-3/4 bg-slate-50 rounded-full"></div>
                </div>
             </div>
           ))}
        </div>
      ),
      code: `.stacked-card {
  position: sticky;
  top: 20px;
  background: white;
  transition: transform 0.5s ease;
  z-index: var(--index);
}`
    },
    {
      id: 'z-pattern-hero',
      name: 'Z-型视觉导航布局',
      description: '经典的营销页布局，通过引导用户的眼睛从左上角移动到右上角，再对角线穿过屏幕到左下角，最后横向移动到右下角，最大化转化率。',
      award: '2023 营销设计卓越奖',
      tags: ['Marketing', 'Visual Flow', 'Conversion'],
      preview: (
        <div className="w-full h-full bg-white rounded-[2rem] p-12 overflow-hidden flex flex-col justify-center">
           <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                 <div className="inline-flex gap-2 px-3 py-1 bg-theme/10 text-theme text-[9px] font-black uppercase rounded-full">Launch Protocol</div>
                 <h3 className="text-4xl font-black text-slate-900 tracking-tight">Design the future of interfaces</h3>
                 <p className="text-slate-500 font-medium">Experience the fusion of art and technology through our curated design framework.</p>
                 <div className="flex gap-4 pt-4">
                    <div className="h-12 w-32 bg-theme rounded-xl shadow-lg shadow-theme/20"></div>
                    <div className="h-12 w-32 border border-slate-100 rounded-xl"></div>
                 </div>
              </div>
              <div className="md:w-1/2 relative">
                 <div className="aspect-square bg-slate-50 rounded-3xl border border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                    <Maximize size={48} />
                 </div>
              </div>
           </div>
        </div>
      ),
      code: `/* Standard Z-Pattern Grid */
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4rem;
}

@media (max-width: 768px) {
  .hero-grid { grid-template-columns: 1fr; }
}`
    },
    {
      id: 'sidebar-canvas',
      name: '画布+侧边控制台',
      description: '专为生产力工具设计的布局方案。核心画布占据大部分空间，侧边栏承载复杂的参数控制与属性编辑。',
      award: 'ProductHunt 最佳工具布局',
      tags: ['Productivity', 'SAAS', 'Dashboard'],
      preview: (
        <div className="w-full h-full flex bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100">
           <div className="w-16 bg-white border-r border-slate-100 flex flex-col items-center py-6 gap-6">
              {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-xl bg-slate-50"></div>)}
           </div>
           <div className="flex-grow p-8 flex items-center justify-center">
              <div className="w-full max-w-lg aspect-video bg-white rounded-3xl shadow-2xl border border-slate-100 p-8">
                 <div className="flex justify-between items-center mb-6">
                    <div className="h-2 w-24 bg-slate-100 rounded-full"></div>
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-slate-100"></div>
                       <div className="w-2 h-2 rounded-full bg-slate-100"></div>
                    </div>
                 </div>
                 <div className="h-40 bg-slate-50 rounded-2xl border border-dashed border-slate-200"></div>
              </div>
           </div>
           <div className="w-64 bg-white border-l border-slate-100 p-6 space-y-8">
              <div>
                 <div className="h-2 w-12 bg-slate-900 rounded-full mb-4"></div>
                 <div className="space-y-3">
                    <div className="h-8 w-full bg-slate-50 rounded-xl"></div>
                    <div className="h-8 w-full bg-slate-50 rounded-xl"></div>
                 </div>
              </div>
              <div className="h-32 w-full bg-theme/5 rounded-2xl border border-theme/10"></div>
           </div>
        </div>
      ),
      code: `/* App Shell Layout */
.app-shell {
  display: grid;
  grid-template-columns: 64px 1fr 260px;
  height: 100vh;
}

.main-canvas {
  overflow: auto;
  background: #f8fafc;
}`
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(layouts[activeLayout].code);
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
              <Boxes className="text-theme" size={28} /> 极致布局殿堂
            </h1>
            <p className="text-slate-400 text-sm font-medium mt-1">探索 UI 骨骼的秩序、韵律与空间之美</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">
             <Smartphone size={16} /> 响应式视图
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all">
             <Monitor size={16} /> 桌面端视图
           </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-80 shrink-0 space-y-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">Master Layouts</h3>
          {layouts.map((layout, index) => (
            <button
              key={layout.id}
              onClick={() => setActiveLayout(index)}
              className={`w-full group flex items-center justify-between p-4 rounded-[1.5rem] transition-all text-left ${
                activeLayout === index 
                ? 'bg-theme text-white shadow-xl shadow-theme/20 translate-x-2' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                 <div className={`p-2 rounded-xl ${activeLayout === index ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-theme group-hover:text-white'} transition-colors`}>
                    {index === 0 && <Grid3X3 size={18} />}
                    {index === 1 && <Columns size={18} />}
                    {index === 2 && <Layers size={18} />}
                    {index === 3 && <Layout size={18} />}
                    {index === 4 && <Maximize size={18} />}
                 </div>
                 <span className="font-bold text-sm tracking-tight">{layout.name}</span>
              </div>
              <ChevronRight size={16} className={`${activeLayout === index ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
            </button>
          ))}

          <div className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                  <Trophy size={16} className="text-amber-500" /> 全球贡献排行榜
                </h4>
                <div className="space-y-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-6 h-6 rounded-full bg-white shadow-sm overflow-hidden border border-slate-100">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+20}`} alt="avatar" />
                           </div>
                           <span className="text-xs font-bold text-slate-600">Dev_{i}20</span>
                        </div>
                        <span className="text-[10px] font-black text-theme">#{i}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow space-y-8 animate-in fade-in duration-700">
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Preview Canvas */}
              <section className="space-y-4">
                 <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-theme"></div> Blueprint Canvas
                    </span>
                    <div className="flex gap-2">
                       <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-black rounded uppercase">Responsive</span>
                    </div>
                 </div>
                 <div className="h-[500px] shadow-2xl relative group">
                    {layouts[activeLayout].preview}
                 </div>
              </section>

              {/* Layout Metadata & Code */}
              <section className="flex flex-col gap-6">
                 <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
                       <Sparkles size={120} />
                    </div>
                    <div className="relative z-10">
                       <div className="flex items-center gap-2 text-theme text-[10px] font-black uppercase tracking-widest mb-4">
                         <Sparkles size={14} /> Design Excellence
                       </div>
                       <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">{layouts[activeLayout].name}</h2>
                       <p className="text-slate-500 font-medium leading-relaxed mb-6">
                          {layouts[activeLayout].description}
                       </p>
                       <div className="flex flex-wrap gap-2 mb-8">
                          {layouts[activeLayout].tags.map(tag => (
                            <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600">#{tag}</span>
                          ))}
                       </div>
                       <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                          <div className="p-2 bg-white rounded-lg text-amber-500 shadow-sm"><Trophy size={16} /></div>
                          <span className="text-xs font-bold text-amber-900/80">{layouts[activeLayout].award}</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex-grow flex flex-col bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-emerald-400"><Code2 size={18} /></div>
                          <span className="text-xs font-black text-white uppercase tracking-widest">Blueprint Code</span>
                       </div>
                       <button 
                         onClick={handleCopy}
                         className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition-all active:scale-95"
                       >
                         {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                         {copied ? '已复制' : '复制核心代码'}
                       </button>
                    </div>
                    <pre className="flex-grow font-mono text-sm text-emerald-400/90 overflow-auto custom-scroll leading-relaxed">
                       {layouts[activeLayout].code}
                    </pre>
                 </div>
              </section>
           </div>

           {/* Call to Action Box */}
           <div className="p-10 bg-theme/5 border border-theme/10 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex gap-6 items-center">
                 <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-theme">
                    <ExternalLink size={32} />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">有更好的布局方案？</h4>
                    <p className="text-slate-500 text-sm font-medium mt-1">DevFront 欢迎全球开发者提交更具创新性的布局架构。获得审计通过后将进入此殿堂。</p>
                 </div>
              </div>
              <button 
                onClick={() => navigate('/admin')}
                className="px-10 py-5 bg-theme text-white font-black rounded-2xl hover:bg-theme-dark transition-all shadow-xl shadow-theme/20 flex items-center gap-3"
              >
                 立即提交作品 <ChevronRight size={20} />
              </button>
           </div>
        </main>
      </div>
    </div>
  );
};

export default UltimateLayouts;
