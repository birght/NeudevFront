
import React, { useState, useEffect, useRef } from 'react';
import { 
  Layout, 
  Map, 
  SquarePen, 
  MessageSquare, 
  Database, 
  Search, 
  Download, 
  Code2, 
  Layers,
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
  { name: 'Forms', icon: SquarePen },
  { name: 'Feedback', icon: MessageSquare },
  { name: 'Data Display', icon: Database }
];

const Components: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComp, setSelectedComp] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { theme } = useSettings();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Enhanced mock data with code for preview
  const components = [
    { 
      id: '1', 
      name: 'Responsive Sidebar', 
      category: 'Navigation', 
      description: 'Collapsible navigation with nested menu support and active state tracking.', 
      author: 'UI Core', 
      downloads: 1420,
      code: `const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className={\`h-screen \${isOpen ? 'w-64' : 'w-20'} bg-slate-900 transition-all p-4 text-white\`}>
      <button onClick={() => setIsOpen(!isOpen)} className="mb-8 p-2 bg-slate-800 rounded">Toggle</button>
      <div className="space-y-4">
        {['Dashboard', 'Projects', 'Settings'].map(i => (
          <div key={i} className="p-2 hover:bg-indigo-600 rounded cursor-pointer truncate">
             {isOpen ? i : i[0]}
          </div>
        ))}
      </div>
    </div>
  );
};
render(<Sidebar />);`
    },
    { 
      id: '2', 
      name: 'Smart Data Table', 
      category: 'Data Display', 
      description: 'Server-side pagination, sorting, and inline editing with custom cell renderers.', 
      author: 'Data Team', 
      downloads: 890,
      code: `const Table = () => (
  <table className="w-full text-left border-collapse bg-white rounded-lg shadow">
    <thead>
      <tr className="bg-slate-50 border-b">
        <th className="p-4 font-bold">Name</th>
        <th className="p-4 font-bold">Role</th>
        <th className="p-4 font-bold">Status</th>
      </tr>
    </thead>
    <tbody>
      {[1,2,3].map(i => (
        <tr key={i} className="border-b hover:bg-slate-50">
          <td className="p-4">User {i}</td>
          <td className="p-4">Developer</td>
          <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span></td>
        </tr>
      ))}
    </tbody>
  </table>
);
render(<Table />);`
    },
    { id: '3', name: 'Validation Form', category: 'Forms', description: 'Declarative form builder with built-in validation rules.', author: 'Frontend Dev', downloads: 2100, code: `render(<div className="p-4 bg-white border rounded">Form Preview Template</div>);` },
  ];

  const filteredComponents = components.filter(c => 
    (selectedCategory === 'All' || c.category === selectedCategory) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCategoryIcon = (catName: string) => {
    const cat = categories.find(c => c.name === catName);
    const IconComp = cat ? cat.icon : Layers;
    return <IconComp size={48} strokeWidth={1.5} />;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-theme/10 rounded-lg text-theme transition-colors">
                <Layers size={24} />
             </div>
             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">组件库</h1>
          </div>
          <p className="text-slate-500 max-w-lg">由技术委员会审计的高质量 React + Tailwind 组件，一键接入您的项目。</p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <input
            type="text"
            placeholder="在库中搜索组件..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-theme/10 focus:border-theme transition-all outline-none shadow-sm group-hover:border-slate-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-theme transition-colors" size={20} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              selectedCategory === cat.name ? 'bg-theme text-white shadow-lg shadow-theme/30' : 'bg-white text-slate-600 border border-slate-200 hover:border-theme hover:text-theme hover:shadow-md'
            }`}
          >
            <cat.icon size={16} />
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredComponents.map((comp) => (
          <div 
            key={comp.id} 
            onClick={() => setSelectedComp(comp)}
            className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          >
            <div className="h-48 bg-slate-50 flex items-center justify-center relative overflow-hidden">
              <div className="text-slate-300 group-hover:text-theme transition-all duration-500 group-hover:scale-110">
                {getCategoryIcon(comp.category)}
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-extrabold text-theme uppercase bg-theme/5 px-2.5 py-1 rounded-full tracking-wider">{comp.category}</span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Download size={12} /> {comp.downloads}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-theme transition-colors">{comp.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{comp.description}</p>
              <div className="mt-6 flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-xs text-slate-400">By {comp.author}</span>
                <button className="text-theme text-sm font-bold flex items-center gap-1">
                  查看详情 <Maximize2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Drawer */}
      {selectedComp && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" onClick={() => setSelectedComp(null)}></div>
          <div className="fixed top-0 right-0 w-full max-w-2xl h-full bg-white z-[70] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedComp.name}</h2>
                <span className="text-xs text-slate-400">组件详情与预览</span>
              </div>
              <button onClick={() => setSelectedComp(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto custom-scroll p-8">
              <div className="mb-8">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">实时运行环境 (Live Demo)</label>
                <div className="h-64 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                  <iframe ref={iframeRef} className="w-full h-full border-none" title="drawer-preview" />
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">源代码 (JSX)</label>
                  <button onClick={copyCode} className="flex items-center gap-1.5 text-xs font-bold text-theme hover:underline">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? '已复制' : '复制代码'}
                  </button>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto">
                  <pre className="text-emerald-400 font-mono text-[13px] leading-relaxed">
                    {selectedComp.code}
                  </pre>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm h-fit">
                   <Sparkles className="text-blue-500" size={20} />
                </div>
                <div>
                   <h4 className="font-bold text-blue-900">使用提示</h4>
                   <p className="text-sm text-blue-700/80 mt-1 leading-relaxed">
                     该组件已通过 Web Accessibility 指南审计。在导入项目后，请确保安装了相应版本的 Lucide 图标库以获得最佳视觉效果。
                   </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-slate-50/50 flex gap-4">
              <button onClick={copyCode} className="flex-1 py-3 bg-theme text-white font-bold rounded-xl shadow-lg shadow-theme/20 hover:bg-theme-dark transition-all">
                 立即复制 JSX
              </button>
              <button className="px-6 py-3 bg-white text-slate-600 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-colors">
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
