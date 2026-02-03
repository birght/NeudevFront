
import React, { useState, useEffect, useRef } from 'react';
import { 
  Layout, 
  Map, 
  Keyboard, 
  Database, 
  MessageSquare, 
  Layers, 
  PlaySquare, 
  BarChart3, 
  Zap, 
  FlaskConical,
  Search, 
  Download, 
  Code2, 
  Sparkles,
  X,
  Copy,
  Check,
  Maximize2,
  Globe,
  Flag
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const categories = [
  { name: 'All', icon: Sparkles },
  { name: 'Layout', icon: Layout },
  { name: 'Navigation', icon: Map },
  { name: 'Data Entry', icon: Keyboard },
  { name: 'Data Display', icon: Database },
  { name: 'Feedback', icon: MessageSquare },
  { name: 'Overlay', icon: Layers },
  { name: 'Charts & Visualization', icon: BarChart3 },
  { name: 'Advanced / Labs', icon: FlaskConical }
];

const regions = [
  { id: 'Global', name: '全域通用', icon: Globe, color: 'text-slate-400' },
  { id: 'China', name: '中国 (SOE Style)', icon: Flag, color: 'text-rose-600' },
  { id: 'USA', name: '北美 (Silicon Valley)', icon: Flag, color: 'text-blue-600' },
  { id: 'Japan', name: '日本 (Zen/Minimal)', icon: Flag, color: 'text-emerald-600' },
  { id: 'Europe', name: '欧洲 (Swiss Design)', icon: Flag, color: 'text-indigo-600' }
];

const Components: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('Global');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComp, setSelectedComp] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const components = [
    { 
      id: 'soe-1', 
      name: '政务/国企风格公文卡片', 
      category: 'Data Display', 
      region: 'China',
      description: '采用典型的稳重构图，红头标题装饰，适配严谨的办公自动化与政务公开系统。', 
      author: 'Gov Designer', 
      downloads: 4500,
      code: `const OfficialCard = () => (
  <div className="w-80 bg-white border-t-4 border-rose-600 shadow-xl overflow-hidden">
    <div className="px-6 py-4 bg-rose-50/50 border-b border-rose-100 flex justify-between items-center">
      <span className="text-rose-700 font-black text-sm tracking-widest">重要通知</span>
      <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3">关于开展 2026 年度前端工程化审计工作的通知</h3>
      <div className="space-y-2 mb-6">
        <div className="h-2 w-full bg-slate-100 rounded"></div>
        <div className="h-2 w-5/6 bg-slate-100 rounded"></div>
      </div>
      <div className="flex justify-end pt-4 border-t border-slate-50">
        <span className="text-[10px] text-slate-400 font-bold">发文单位：技术委员会</span>
      </div>
    </div>
  </div>
);
render(<OfficialCard />);`
    },
    { 
      id: 'soe-2', 
      name: '工业级智慧监测看板', 
      category: 'Charts & Visualization', 
      region: 'China',
      description: '深邃蓝背景配合科技感边框，常用于大型国企生产监控、调度中心与数据可视化大屏。', 
      author: 'Industry Pro', 
      downloads: 2800,
      code: `const IndustrialMonitor = () => (
  <div className="w-96 bg-[#020617] p-6 border border-cyan-500/30 rounded shadow-[0_0_30px_rgba(6,182,212,0.1)] relative">
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
    <div className="flex justify-between items-center mb-6">
       <span className="text-cyan-400 text-xs font-black tracking-widest uppercase">Reactor Status</span>
       <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded">Normal</span>
    </div>
    <div className="flex items-end gap-1 mb-4">
      <span className="text-4xl font-black text-white">98.2</span>
      <span className="text-cyan-400 text-xs mb-1">%</span>
    </div>
    <div className="h-12 flex items-end gap-1">
       {[40, 70, 45, 90, 65, 80].map((h, i) => (
         <div key={i} className="flex-1 bg-cyan-500/20 relative group">
           <div className="absolute bottom-0 w-full bg-cyan-400 transition-all duration-500" style={{height: h + '%'}}></div>
         </div>
       ))}
    </div>
  </div>
);
render(<IndustrialMonitor />);`
    },
    { 
      id: 'us-1', 
      name: '硅谷风 Z-Pattern 引导页', 
      category: 'Layout', 
      region: 'USA',
      description: '极简且具有极强冲击力的欧美互联网审美，强调留白、大字重与清晰的行为呼吁。', 
      author: 'SV Studio', 
      downloads: 8900,
      code: `render(<div className="p-12 text-center max-w-lg bg-white rounded-3xl shadow-2xl"><h1 className="text-6xl font-black tracking-tighter mb-6">Build the future fast.</h1><p className="text-slate-500 text-xl font-medium mb-10">Minimal interfaces for high-growth engineering teams.</p><button className="px-10 py-5 bg-black text-white font-black rounded-2xl">Get Started Free</button></div>);`
    },
    { 
      id: 'jp-1', 
      name: '禅意简约多功能列表', 
      category: 'Data Display', 
      region: 'Japan',
      description: '受日本工业设计启发，注重细节、纤细的线条与大面积的冷色调留白，极具克制美感。', 
      author: 'Kyoto Dev', 
      downloads: 1200,
      code: `const ZenList = () => (
  <div className="w-80 bg-white p-10">
    <h4 className="text-xs font-light text-slate-400 mb-8 border-b border-slate-100 pb-4">INDEX / 项目索引</h4>
    <div className="space-y-6">
      {['Philosophy', 'Artifacts', 'Presence'].map(t => (
        <div key={t} className="flex justify-between items-center group cursor-pointer">
          <span className="text-sm font-medium text-slate-600 group-hover:text-black transition-colors">{t}</span>
          <div className="w-1.5 h-1.5 rounded-full border border-slate-200 group-hover:bg-slate-800 transition-colors"></div>
        </div>
      ))}
    </div>
  </div>
);
render(<ZenList />);`
    }
  ];

  const filteredComponents = components.filter(c => 
    (selectedCategory === 'All' || c.category === selectedCategory) &&
    (selectedRegion === 'Global' || c.region === selectedRegion) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getRegionAccent = (region: string) => {
    switch(region) {
      case 'China': return 'from-rose-500/10 via-white to-rose-600/5';
      case 'USA': return 'from-blue-500/10 via-white to-blue-600/5';
      case 'Japan': return 'from-emerald-500/5 via-white to-slate-200/5';
      case 'Europe': return 'from-indigo-500/10 via-white to-violet-600/5';
      default: return 'from-theme/5 via-white to-theme/10';
    }
  };

  const getCategoryIcon = (catName: string, size = 48) => {
    const cat = categories.find(c => c.name === catName);
    const IconComp = cat ? cat.icon : Layers;
    return <IconComp size={size} strokeWidth={1.5} />;
  };

  const updatePreview = () => {
    if (!iframeRef.current || !selectedComp) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    try {
      // @ts-ignore
      const transpiledCode = window.Babel.transform(selectedComp.code, { presets: ['react'] }).code;
      const content = `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
            <script type="importmap">
            {
              "imports": {
                "react": "https://esm.sh/react@^19.2.4",
                "react-dom": "https://esm.sh/react-dom@^19.2.4/client",
                "lucide-react": "https://esm.sh/lucide-react@0.475.0"
              }
            }
            </script>
            <style>body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: transparent; font-family: sans-serif; }</style>
          </head>
          <body>
            <div id="preview-root"></div>
            <script type="module">
              import React from 'react';
              import ReactDOM from 'react-dom';
              window.React = React;
              const render = (comp) => {
                const root = ReactDOM.createRoot(document.getElementById('preview-root'));
                root.render(comp);
              };
              try { ${transpiledCode} } catch (err) { console.error(err); }
            </script>
          </body>
        </html>
      `;
      doc.open(); doc.write(content); doc.close();
    } catch (err) {}
  };

  useEffect(() => {
    if (selectedComp) updatePreview();
  }, [selectedComp]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-theme/10 rounded-lg text-theme">
                <Layers size={24} />
             </div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight">全球视觉实验室</h1>
          </div>
          <p className="text-slate-500 max-w-lg font-medium">支持多国审美偏好的工业级 React 组件矩阵。</p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <input
            type="text"
            placeholder="在 10,000+ 跨文化资产中搜索..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-theme/10 transition-all outline-none font-bold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-theme transition-colors" size={20} />
        </div>
      </div>

      {/* Region Selector */}
      <div className="mb-8 p-1.5 bg-slate-100 rounded-[2rem] inline-flex flex-wrap gap-1">
        {regions.map((reg) => (
          <button
            key={reg.id}
            onClick={() => setSelectedRegion(reg.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-[1.75rem] text-xs font-black transition-all ${
              selectedRegion === reg.id ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <reg.icon size={14} className={reg.color} />
            {reg.name}
          </button>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              selectedCategory === cat.name ? 'bg-theme text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-50 hover:border-theme hover:text-theme'
            }`}
          >
            <cat.icon size={14} />
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredComponents.map((comp) => (
          <div 
            key={comp.id} 
            onClick={() => setSelectedComp(comp)}
            className="group relative bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          >
            <div className={`h-48 bg-slate-50 flex items-center justify-center relative overflow-hidden`}>
               <div className={`absolute inset-0 bg-gradient-to-br ${getRegionAccent(comp.region)} opacity-60`}></div>
               
               {/* Aesthetic Elements */}
               <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
               <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] scale-[3.5] rotate-12 group-hover:rotate-[20deg] transition-transform duration-1000">
                  {getCategoryIcon(comp.category, 64)}
               </div>

               <div className="relative z-10 text-slate-300 group-hover:text-theme transition-all duration-700 group-hover:scale-110 drop-shadow-sm">
                  {getCategoryIcon(comp.category, 56)}
               </div>
               
               {/* Region Label Overlay */}
               <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur rounded-full border border-white shadow-sm transition-all group-hover:shadow-md">
                  <Flag size={10} className={regions.find(r => r.id === comp.region)?.color} />
                  <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter">{comp.region}</span>
               </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-black text-theme uppercase bg-theme/10 px-3 py-1 rounded-full tracking-widest">{comp.category}</span>
                <span className="text-[10px] text-slate-400 font-black flex items-center gap-1 uppercase tracking-tighter"><Download size={12} /> {comp.downloads} Uses</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-theme transition-colors tracking-tight">{comp.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 font-medium">{comp.description}</p>
              
              <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${comp.author}`} alt="author" />
                   </div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{comp.author}</span>
                </div>
                <button className="text-theme text-xs font-black flex items-center gap-1 uppercase tracking-widest group/btn">
                  Inspect <Maximize2 size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      {selectedComp && (
        <>
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60]" onClick={() => setSelectedComp(null)}></div>
          <div className="fixed top-0 right-0 w-full max-w-2xl h-full bg-white z-[70] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedComp.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Regional Aesthetic:</span>
                   <span className="text-xs font-black text-theme px-2 py-0.5 bg-theme/5 rounded border border-theme/10">{selectedComp.region}</span>
                </div>
              </div>
              <button onClick={() => setSelectedComp(null)} className="p-3 hover:bg-slate-50 rounded-2xl transition-all">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto custom-scroll p-10">
              <div className="mb-10">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Style Spec Rendering</label>
                <div className="h-72 bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-inner flex items-center justify-center">
                  <iframe ref={iframeRef} className="w-full h-full border-none bg-transparent" title="drawer-preview" />
                </div>
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4 px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Source Code (JSX)</label>
                  <button onClick={() => {navigator.clipboard.writeText(selectedComp.code); setCopied(true); setTimeout(() => setCopied(false), 2000)}} className="flex items-center gap-2 text-[11px] font-black text-theme">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy Snippet'}
                  </button>
                </div>
                <div className="bg-slate-900 rounded-[2rem] p-8 overflow-x-auto shadow-2xl">
                  <pre className="text-emerald-400 font-mono text-[13px] leading-relaxed">
                    {selectedComp.code}
                  </pre>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex gap-4">
              <button className="flex-1 py-4.5 bg-theme text-white font-black rounded-2xl shadow-xl shadow-theme/30">
                 复制 JSX 代码
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Components;
