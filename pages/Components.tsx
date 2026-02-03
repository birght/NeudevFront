
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
  Maximize2
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
  { name: 'Media', icon: PlaySquare },
  { name: 'Charts & Visualization', icon: BarChart3 },
  { name: 'Utilities', icon: Zap },
  { name: 'Advanced / Labs', icon: FlaskConical }
];

const Components: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComp, setSelectedComp] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { theme } = useSettings();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Enhanced mock data with expanded categories
  const components = [
    { 
      id: '1', 
      name: 'Bento Grid Frame', 
      category: 'Layout', 
      description: '模块化的非均匀网格系统，利用 grid-span 实现极具视觉张力的信息层级。', 
      author: 'UI Core', 
      downloads: 1420,
      code: `const Bento = () => (
  <div className="grid grid-cols-4 gap-4 p-4">
    <div className="col-span-2 row-span-2 bg-slate-100 rounded-3xl h-64"></div>
    <div className="col-span-2 bg-slate-100 rounded-3xl h-32"></div>
    <div className="bg-slate-100 rounded-3xl h-28"></div>
    <div className="bg-slate-100 rounded-3xl h-28"></div>
  </div>
);
render(<Bento />);`
    },
    { 
      id: '2', 
      name: 'Fluid Navigation', 
      category: 'Navigation', 
      description: '带有平滑指示器动画的底部导航栏，适配移动端优先场景。', 
      author: 'App Team', 
      downloads: 3200,
      code: `render(<div className="p-4 bg-white border rounded">Navigation Component Preview</div>);`
    },
    { 
      id: '3', 
      name: 'Interactive Line Chart', 
      category: 'Charts & Visualization', 
      description: '基于 SVG 的轻量级折线图，支持实时数据推送与 Hover 提示。', 
      author: 'Data Lab', 
      downloads: 890,
      code: `render(<div className="p-4 bg-white border rounded">Charts & Visualization Preview</div>);`
    },
    { 
      id: '4', 
      name: 'Glass Morphism Modal', 
      category: 'Overlay', 
      description: '高阶玻璃拟态弹窗，自带多级背景模糊与光线折射效果。', 
      author: 'Art Dept', 
      downloads: 2150,
      code: `render(<div className="p-4 bg-white border rounded">Overlay Preview</div>);`
    }
  ];

  const filteredComponents = components.filter(c => 
    (selectedCategory === 'All' || c.category === selectedCategory) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

  const copyCode = () => {
    navigator.clipboard.writeText(selectedComp.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-theme/10 rounded-lg text-theme transition-colors">
                <Layers size={24} />
             </div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight">组件库中心</h1>
          </div>
          <p className="text-slate-500 max-w-lg font-medium">经过技术委员会深度审计的高性能 React + Tailwind 资产。</p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <input
            type="text"
            placeholder="搜索 1,000+ 工业级组件..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-theme/10 focus:border-theme transition-all outline-none shadow-sm group-hover:border-slate-300 font-bold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-theme transition-colors" size={20} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              selectedCategory === cat.name ? 'bg-theme text-white shadow-xl shadow-theme/20' : 'bg-white text-slate-500 border border-slate-100 hover:border-theme hover:text-theme hover:shadow-lg'
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
            {/* Aesthetic Placeholder Background */}
            <div className="h-48 bg-slate-50 flex items-center justify-center relative overflow-hidden">
               {/* Mesh Blobs */}
               <div className="absolute inset-0 bg-gradient-to-br from-theme/5 via-white to-theme/10 opacity-60"></div>
               <div className="absolute -top-12 -left-12 w-48 h-48 bg-theme/5 rounded-full blur-3xl animate-pulse"></div>
               <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-100/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
               
               {/* Background Pattern */}
               <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
               
               {/* Abstract Category Icon Projection */}
               <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] scale-[3.5] rotate-12 group-hover:scale-[4] group-hover:rotate-[20deg] transition-transform duration-1000">
                  {getCategoryIcon(comp.category, 64)}
               </div>

               {/* Central Foreground Icon */}
               <div className="relative z-10 text-slate-300 group-hover:text-theme transition-all duration-700 group-hover:scale-125 drop-shadow-sm">
                  {getCategoryIcon(comp.category, 56)}
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

      {/* Detail Drawer */}
      {selectedComp && (
        <>
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60]" onClick={() => setSelectedComp(null)}></div>
          <div className="fixed top-0 right-0 w-full max-w-2xl h-full bg-white z-[70] shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedComp.name}</h2>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Component Analysis & Sandbox</span>
              </div>
              <button onClick={() => setSelectedComp(null)} className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-slate-900 shadow-sm border border-transparent hover:border-slate-100">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto custom-scroll p-10">
              <div className="mb-10">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Runtime Simulation</label>
                <div className="h-72 bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden shadow-inner flex items-center justify-center">
                  <iframe ref={iframeRef} className="w-full h-full border-none" title="drawer-preview" />
                </div>
              </div>

              <div className="mb-10">
                <div className="flex justify-between items-center mb-4 px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Source Code (JSX)</label>
                  <button onClick={copyCode} className="flex items-center gap-2 text-[11px] font-black text-theme hover:bg-theme/5 px-3 py-1.5 rounded-xl transition-all">
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

              <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex gap-5">
                <div className="p-3.5 bg-white rounded-2xl shadow-sm h-fit text-blue-500">
                   <Sparkles size={24} />
                </div>
                <div>
                   <h4 className="font-black text-blue-900 tracking-tight">Technical Audit Passed</h4>
                   <p className="text-sm text-blue-700/80 mt-1 leading-relaxed font-medium">
                     该组件已通过 Web Accessibility (WCAG 2.1) 指南审计。在导入生产环境前，请确保您的 Tailwind 配置文件包含相应的自定义颜色变量。
                   </p>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex gap-4">
              <button onClick={copyCode} className="flex-1 py-4.5 bg-theme text-white font-black rounded-2xl shadow-2xl shadow-theme/30 hover:bg-theme-dark transition-all active:scale-[0.98]">
                 复制 JSX 代码
              </button>
              <button className="px-8 py-4.5 bg-white text-slate-600 border border-slate-200 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                 下载资产
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Components;
