
import React, { useState, useEffect, useRef } from 'react';
import { 
  Layout, Map, Keyboard, Database, MessageSquare, Layers, PlaySquare, 
  BarChart3, Zap, FlaskConical, Search, Download, Sparkles, X, Copy, 
  Check, Maximize2, Briefcase, HeartPulse, Radio, 
  Factory, GraduationCap, Building2, ShieldCheck, Leaf, 
  Wallet, CarFront, MonitorPlay, Filter,
  Stethoscope, Landmark, Scale, ShieldAlert, Cpu, 
  Tags, LayoutGrid, Palette, ChevronRight, ChevronDown, ChevronUp, SlidersHorizontal, RotateCcw
} from 'lucide-react';

// 1. 行业维度
const industries = [
  { id: 'medical', name: '医疗健康', icon: HeartPulse, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'telecom', name: '通信', icon: Radio, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'energy', name: '能源', icon: Factory, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'finance', name: '金融', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'traffic', name: '交通', icon: CarFront, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'education', name: '教育', icon: GraduationCap, color: 'text-sky-500', bg: 'bg-sky-50' },
  { id: 'manufacturing', name: '制造', icon: Cpu, color: 'text-slate-600', bg: 'bg-slate-100' },
  { id: 'media', name: '媒体', icon: MonitorPlay, color: 'text-violet-500', bg: 'bg-violet-50' },
  { id: 'hr', name: '人社保障', icon: Briefcase, color: 'text-blue-700', bg: 'bg-blue-100/50' },
  { id: 'med-insure', name: '医疗保障', icon: Stethoscope, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { id: 'dev-reform', name: '发改', icon: Landmark, color: 'text-rose-700', bg: 'bg-rose-100/50' },
  { id: 'tax', name: '财政税务', icon: Scale, color: 'text-emerald-700', bg: 'bg-emerald-100/50' },
  { id: 'eco', name: '环保', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'food-safety', name: '食药安全', icon: ShieldAlert, color: 'text-orange-600', bg: 'bg-orange-50' }
];

// 2. 功能分类维度
const categories = [
  { id: 'all', name: '全部功能', icon: Sparkles },
  { id: 'Layout', name: '布局 (Layout)', icon: Layout },
  { id: 'Navigation', name: '导航 (Navigation)', icon: Map },
  { id: 'Data Entry', name: '录入 (Data Entry)', icon: Keyboard },
  { id: 'Data Display', name: '展示 (Data Display)', icon: Database },
  { id: 'Feedback', name: '反馈 (Feedback)', icon: MessageSquare },
  { id: 'Overlay', name: '遮罩 (Overlay)', icon: Layers },
  { id: 'Media', name: '媒体 (Media)', icon: MonitorPlay },
  { id: 'Charts & Visualization', name: '图表 (Charts)', icon: BarChart3 },
  { id: 'Utilities', name: '工具 (Utilities)', icon: Zap },
  { id: 'Advanced / Labs', name: '实验室 (Labs)', icon: FlaskConical }
];

// 3. 场景维度
const scenarios = [
  { id: 'all', name: '全部场景' },
  { id: 'admin', name: '管理后台' },
  { id: 'dashboard', name: '大屏可视化' },
  { id: 'app', name: '移动端应用' },
  { id: 'portal', name: '门户官网' }
];

// 4. 调性维度
const tones = [
  { id: 'all', name: '全部调性' },
  { id: 'standard', name: '国企稳重 (Corporate)' },
  { id: 'modern', name: '互联网极简 (Modern)' },
  { id: 'dark-tech', name: '深色科技 (Cyber)' }
];

const Components: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScenario, setSelectedScenario] = useState('all');
  const [selectedTone, setSelectedTone] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedComp, setSelectedComp] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeAdvancedCount = [
    selectedCategory !== 'all',
    selectedScenario !== 'all',
    selectedTone !== 'all'
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedIndustry('all');
    setSelectedCategory('all');
    setSelectedScenario('all');
    setSelectedTone('all');
    setSearchQuery('');
  };

  const components = [
    { 
      id: 'c-1', 
      name: '政务通 - 综合审批流面板', 
      industry: 'dev-reform', 
      category: 'Data Display',
      scenario: 'admin',
      tone: 'standard',
      description: '为发改/政务部门设计的标准审批工作台，支持多级会签展示与状态流转。', 
      author: 'Gov Div', 
      downloads: 1540,
      code: `const GovWorkflow = () => (
  <div className="w-full bg-white border border-slate-200 rounded-lg shadow-sm">
    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
      <span className="font-bold text-slate-800">立项审批流程 - 20260401</span>
      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">进行中</span>
    </div>
    <div className="p-8 space-y-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white">1</div>
        <div className="flex-1 border-b border-dashed pb-4">
          <h4 className="font-bold">初步审查</h4>
          <p className="text-xs text-slate-400 mt-1">发改委规划处 - 已通过</p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">2</div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-400">财务审计</h4>
          <p className="text-xs text-slate-400 mt-1">待分配处理人...</p>
        </div>
      </div>
    </div>
  </div>
);
render(<GovWorkflow />);`
    },
    { 
      id: 'c-2', 
      name: '医疗云 - 患者心电监测组件', 
      industry: 'medical', 
      category: 'Charts & Visualization',
      scenario: 'dashboard',
      tone: 'modern',
      description: '动态心率与血氧实时展示，采用柔和配色减少视觉疲劳，适配智慧医疗监护屏。', 
      author: 'Med-Tech', 
      downloads: 2300,
      code: `const HeartMonitor = () => (
  <div className="p-6 bg-slate-950 text-white rounded-3xl border border-white/10 w-80">
    <div className="flex justify-between items-start mb-6">
      <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">Live Pulse</div>
      <div className="text-[10px] text-slate-500">Device ID: X-29</div>
    </div>
    <div className="flex items-end gap-2 mb-4">
      <span className="text-5xl font-black">72</span>
      <span className="text-xs text-slate-400 mb-1">BPM</span>
    </div>
    <div className="h-16 flex items-center gap-1">
      {[40, 60, 45, 90, 30, 70, 50].map((h, i) => (
        <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm relative">
           <div className="absolute bottom-0 w-full bg-blue-400" style={{height: h+'%'}}></div>
        </div>
      ))}
    </div>
  </div>
);
render(<HeartMonitor />);`
    },
    { 
      id: 'c-3', 
      name: '智慧交通 - 路口流量热力矩阵', 
      industry: 'traffic', 
      category: 'Charts & Visualization',
      scenario: 'dashboard',
      tone: 'dark-tech',
      description: '深色调多维度网格，利用热力色块展示交通流量密集度，常用于城市大脑可视化。', 
      author: 'Smart City', 
      downloads: 890,
      code: `render(<div className="grid grid-cols-4 gap-1 p-2 bg-[#020617] border border-cyan-500/20 rounded-lg">{Array(16).fill(0).map((_,i)=><div key={i} className="h-8 rounded-sm opacity-60" style={{backgroundColor: i % 3 === 0 ? '#0891b2' : i % 2 === 0 ? '#0e7490' : '#164e63'}}></div>)}</div>);`
    }
  ];

  const filteredComponents = components.filter(c => 
    (selectedIndustry === 'all' || c.industry === selectedIndustry) &&
    (selectedCategory === 'all' || c.category === selectedCategory) &&
    (selectedScenario === 'all' || c.scenario === selectedScenario) &&
    (selectedTone === 'all' || c.tone === selectedTone) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            <script type="importmap">{"imports": {"react": "https://esm.sh/react@^19.2.4", "react-dom": "https://esm.sh/react-dom@^19.2.4/client"}}</script>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-theme rounded-2xl shadow-xl shadow-theme/20 text-white">
              <LayoutGrid size={24} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">组件资产社区</h1>
          </div>
          <p className="text-slate-500 font-medium max-w-xl">
            沉淀全行业外包交付经验，打造“高审美、高性能、高复用”的内部设计语言系统。
          </p>
        </div>
        <div className="relative group w-full md:w-96">
          <input
            type="text"
            placeholder="在全行业解决方案中搜索..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-theme/10 transition-all outline-none font-bold text-sm shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-4 text-slate-400 group-focus-within:text-theme transition-colors" size={20} />
        </div>
      </div>

      {/* 筛选面板 */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-2xl shadow-slate-200/40 mb-12">
        {/* 1. 行业标签云 (始终可见) */}
        <div className={isExpanded ? 'mb-10' : 'mb-0 transition-all'}>
          <div className="flex justify-between items-center mb-6">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <Briefcase size={12} /> 1. 业务行业 (Industry)
            </label>
            <div className="flex items-center gap-3">
               <button 
                 onClick={resetFilters}
                 className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-slate-400 hover:text-theme transition-colors"
               >
                 <RotateCcw size={12} /> 重置所有
               </button>
               <button 
                 onClick={() => setIsExpanded(!isExpanded)}
                 className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black transition-all border ${
                   isExpanded || activeAdvancedCount > 0 
                   ? 'bg-theme/5 border-theme/20 text-theme' 
                   : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'
                 }`}
               >
                 <SlidersHorizontal size={12} />
                 {isExpanded ? '收起高级筛选' : '高级筛选'}
                 {activeAdvancedCount > 0 && !isExpanded && (
                   <span className="w-4 h-4 bg-theme text-white rounded-full flex items-center justify-center text-[8px] animate-in zoom-in">{activeAdvancedCount}</span>
                 )}
                 {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
               </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3">
             <button
               onClick={() => setSelectedIndustry('all')}
               className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${
                 selectedIndustry === 'all' ? 'bg-slate-900 text-white border-transparent shadow-lg' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-white hover:border-slate-300'
               }`}
             >
               全部行业
             </button>
             {industries.map((ind) => (
               <button
                 key={ind.id}
                 onClick={() => setSelectedIndustry(ind.id)}
                 className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${
                   selectedIndustry === ind.id 
                   ? `${ind.bg} ${ind.color} border-current shadow-md scale-105` 
                   : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                 }`}
               >
                 <ind.icon size={14} />
                 {ind.name}
               </button>
             ))}
          </div>
        </div>

        {/* 可折叠的 2, 3, 4 维度 */}
        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            {/* 2. 功能分类标签 */}
            <div className="mb-10 pt-8 border-t border-slate-50">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-6 flex items-center gap-2">
                <Tags size={12} /> 2. 功能类别 (Category)
              </label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                 {categories.map((cat) => (
                   <button
                     key={cat.id}
                     onClick={() => setSelectedCategory(cat.id)}
                     className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${
                       selectedCategory === cat.id 
                       ? 'bg-theme text-white border-transparent shadow-lg' 
                       : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-white hover:border-slate-300'
                     }`}
                   >
                     <cat.icon size={14} />
                     {cat.name}
                   </button>
                 ))}
              </div>
            </div>

            {/* 3 & 4. 场景与调性 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-4 flex items-center gap-2">
                    <Layout size={12} /> 3. 应用场景 (Scenario)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {scenarios.map(s => (
                      <button 
                        key={s.id} 
                        onClick={() => setSelectedScenario(s.id)}
                        className={`px-4 py-2 rounded-xl text-[11px] font-black transition-all ${
                          selectedScenario === s.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
               </div>

               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-4 flex items-center gap-2">
                    <Palette size={12} /> 4. 设计调性 (Design Tone)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tones.map(t => (
                      <button 
                        key={t.id} 
                        onClick={() => setSelectedTone(t.id)}
                        className={`px-4 py-2 rounded-xl text-[11px] font-black transition-all ${
                          selectedTone === t.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* 列表区域 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredComponents.map((comp) => {
          const industryInfo = industries.find(i => i.id === comp.industry) || industries[0];
          return (
            <div 
              key={comp.id} 
              onClick={() => setSelectedComp(comp)}
              className="group relative bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div className={`h-52 ${industryInfo.bg} flex items-center justify-center relative overflow-hidden transition-colors duration-700`}>
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className={`absolute inset-0 flex items-center justify-center ${industryInfo.color} opacity-[0.04] scale-[4] rotate-12 group-hover:rotate-[20deg] group-hover:scale-[4.5] transition-transform duration-1000`}>
                   <industryInfo.icon size={64} />
                </div>
                <div className={`relative z-10 ${industryInfo.color} transition-all duration-700 group-hover:scale-110`}>
                   <industryInfo.icon size={56} strokeWidth={1.5} />
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur rounded-full border border-white shadow-sm transition-all group-hover:shadow-md">
                   <industryInfo.icon size={10} className={industryInfo.color} />
                   <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter">{industryInfo.name}</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[9px] font-black text-theme uppercase bg-theme/10 px-3 py-1 rounded-full tracking-widest">{comp.category}</span>
                  <span className="text-[9px] font-black text-slate-500 uppercase bg-slate-100 px-3 py-1 rounded-full tracking-widest">{comp.scenario}</span>
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
                    详情检查 <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredComponents.length === 0 && (
          <div className="col-span-full py-32 flex flex-col items-center justify-center bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
             <div className="p-5 bg-white rounded-3xl shadow-sm text-slate-300 mb-6">
                <Search size={48} />
             </div>
             <h3 className="text-xl font-black text-slate-900 tracking-tight">暂无匹配组件</h3>
             <p className="text-slate-500 font-medium mt-2">请尝试调整筛选组合。</p>
          </div>
        )}
      </div>

      {selectedComp && (
        <>
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60]" onClick={() => setSelectedComp(null)}></div>
          <div className="fixed top-0 right-0 w-full max-w-2xl h-full bg-white z-[70] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedComp.name}</h2>
                <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                   {industries.find(i => i.id === selectedComp.industry)?.name} / {selectedComp.category}
                </div>
              </div>
              <button onClick={() => setSelectedComp(null)} className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto custom-scroll p-10">
              <div className="mb-10">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">场景化仿真渲染</label>
                <div className="h-80 bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-inner flex items-center justify-center relative">
                   <iframe ref={iframeRef} className="w-full h-full border-none" title="drawer-preview" />
                </div>
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4 px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">核心代码 (JSX)</label>
                  <button onClick={() => {navigator.clipboard.writeText(selectedComp.code); setCopied(true); setTimeout(() => setCopied(false), 2000)}} className="flex items-center gap-2 text-[11px] font-black text-theme">
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    {copied ? '已复制' : '复制组件代码'}
                  </button>
                </div>
                <div className="bg-slate-900 rounded-[2rem] p-8 overflow-x-auto shadow-2xl group">
                  <pre className="text-emerald-400 font-mono text-[13px] leading-relaxed">
                    {selectedComp.code}
                  </pre>
                </div>
              </div>

              <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100/50 flex gap-5">
                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-500 h-fit">
                   <Sparkles size={20} />
                </div>
                <div>
                   <h4 className="font-black text-blue-900 tracking-tight">业务逻辑说明</h4>
                   <p className="text-sm text-blue-700/80 mt-1 leading-relaxed font-medium">
                     该组件属于 {selectedComp.category} 类别，已针对 {industries.find(i => i.id === selectedComp.industry)?.name} 行业进行了性能与视觉优化。
                   </p>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex gap-4">
              <button className="flex-1 py-4.5 bg-theme text-white font-black rounded-2xl shadow-2xl shadow-theme/30 hover:bg-theme-dark transition-all">
                 一键导入到项目
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Components;
