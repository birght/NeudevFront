
import React, { useState, useEffect, useRef } from 'react';
import { UserRole, UIComponent } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye, Code2, AlertCircle, RefreshCw, UploadCloud, TrendingUp, ShieldCheck, FileJson, Laptop, Tablet, Smartphone } from 'lucide-react';

interface AdminDashboardProps {
  userRole: UserRole;
}

const TEMPLATES = [
  {
    name: '基础计数器',
    code: `const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)} className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow">
      Count is {count}
    </button>
  );
};
render(<Counter />);`
  },
  {
    name: '通用数据卡片',
    code: `const Card = () => (
  <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white border">
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-slate-800">数据报表模版</div>
      <p className="text-slate-600 text-sm">
        这是一个可复用的卡片模版，使用了 Tailwind 基础类。
      </p>
    </div>
  </div>
);
render(<Card />);`
  },
  {
    name: '带有图标的按钮',
    code: `const IconButton = () => (
  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-theme transition-all">
    <Lucide.Sparkles size={18} />
    立即开始
  </button>
);
render(<IconButton />);`
  }
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'submissions' | 'upload'>(userRole === UserRole.ADMIN ? 'overview' : 'upload');
  const [code, setCode] = useState(TEMPLATES[0].code);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [submissions, setSubmissions] = useState<UIComponent[]>([
    {
      id: 'sub-1',
      name: 'Dynamic Search Bar',
      description: 'Auto-completing search bar with fuzzy logic support.',
      author: 'John Doe',
      category: 'Navigation',
      status: 'PENDING',
      code: 'const Search = () => { ... }',
      previewImage: '',
      createdAt: '2023-11-20',
    }
  ]);

  const statsData = [
    { name: 'Mon', count: 4 },
    { name: 'Tue', count: 7 },
    { name: 'Wed', count: 5 },
    { name: 'Thu', count: 12 },
    { name: 'Fri', count: 8 },
  ];

  const handleAudit = (id: string, approve: boolean) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: approve ? 'APPROVED' : 'REJECTED' } : s));
  };

  const updatePreview = () => {
    if (!iframeRef.current) return;
    setPreviewError(null);
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    try {
      // @ts-ignore
      const transpiledCode = window.Babel.transform(code, { presets: ['react'] }).code;
      const content = `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
            <script type="importmap">{ "imports": { "react": "https://esm.sh/react@^19.2.4", "react-dom": "https://esm.sh/react-dom@^19.2.4/client", "lucide-react": "https://esm.sh/lucide-react@0.475.0" } }</script>
            <style>body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f8fafc; font-family: sans-serif; }</style>
          </head>
          <body>
            <div id="preview-root"></div>
            <script type="module">
              import React from 'react';
              import ReactDOM from 'react-dom';
              import * as Lucide from 'lucide-react';
              window.React = React; window.Lucide = Lucide;
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
    } catch (err: any) { setPreviewError(err.message); }
  };

  useEffect(() => {
    if (activeTab === 'upload') {
      const timer = setTimeout(updatePreview, 800);
      return () => clearTimeout(timer);
    }
  }, [code, activeTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-2">
          {userRole === UserRole.ADMIN && (
            <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-theme text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}>📊 Activity Overview</button>
          )}
          <button onClick={() => setActiveTab('upload')} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'upload' ? 'bg-theme text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}>➕ Upload Component</button>
          {userRole === UserRole.ADMIN && (
            <button onClick={() => setActiveTab('submissions')} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex justify-between items-center ${activeTab === 'submissions' ? 'bg-theme text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}>
              📋 Pending Audits
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'submissions' ? 'bg-white/20' : 'bg-red-100 text-red-600'}`}>{submissions.filter(s => s.status === 'PENDING').length}</span>
            </button>
          )}
        </div>

        <div className="flex-grow bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden min-h-[700px]">
          {activeTab === 'overview' && userRole === UserRole.ADMIN && (
            <div className="p-10">
               <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">System Analytics</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  <div className="p-8 bg-slate-50/50 rounded-[1.5rem] border border-slate-100">
                    <span className="text-xs text-slate-400 font-black uppercase tracking-widest">Total Submissions</span>
                    <div className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">1,284</div>
                    <div className="text-xs text-emerald-600 font-bold mt-2 flex items-center gap-1"><TrendingUp size={14} /> 12% from last month</div>
                  </div>
                  <div className="p-8 bg-slate-50/50 rounded-[1.5rem] border border-slate-100">
                    <span className="text-xs text-slate-400 font-black uppercase tracking-widest">Approval Rate</span>
                    <div className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">94.2%</div>
                    <div className="text-xs text-theme font-bold mt-2">Maintaining standards</div>
                  </div>
               </div>
               <div className="h-80 w-full">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Submission Trends</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#94a3b8'}} />
                      <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="count" fill="var(--theme-color)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="h-full flex flex-col">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Contribute Code</h2>
                  <p className="text-slate-500 text-sm">选择一个模板开始您的创作，系统会自动校验代码质量。</p>
                </div>
                <div className="flex gap-4">
                   <div className="relative group">
                      <select 
                        onChange={(e) => setCode(e.target.value)}
                        className="appearance-none bg-slate-100 border-none px-4 py-2 rounded-xl text-xs font-bold text-slate-600 outline-none pr-10 focus:ring-2 focus:ring-theme/20"
                      >
                        {TEMPLATES.map(t => <option key={t.name} value={t.code}>{t.name}</option>)}
                      </select>
                      <FileJson className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={14} />
                   </div>
                </div>
              </div>

              <div className="flex-grow flex flex-col lg:flex-row min-h-0">
                <div className="flex-1 p-8 flex flex-col border-r border-slate-50">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">组件名称</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-theme/10 text-sm font-medium" placeholder="例如：玻璃质感卡片" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">分类</label>
                      <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-medium"><option>Layout</option><option>Navigation</option><option>Forms</option></select>
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col min-h-[300px]">
                    <textarea value={code} onChange={(e) => setCode(e.target.value)} className="flex-grow w-full p-6 bg-slate-900 text-emerald-400 font-mono text-[13px] border-none rounded-2xl outline-none custom-scroll resize-none shadow-inner" />
                  </div>
                  <button className="mt-6 w-full py-4 bg-theme text-white font-black rounded-2xl hover:bg-theme-dark shadow-xl shadow-theme/30 transition-all flex items-center justify-center gap-2"><UploadCloud size={20} /> 提交并进入审核阶段</button>
                </div>

                <div className="flex-1 bg-slate-50/30 p-8 flex flex-col relative overflow-hidden">
                   <div className="flex items-center justify-between mb-4">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Eye size={14} /> 响应式预览</label>
                      <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                         <button onClick={() => setViewport('desktop')} className={`p-1.5 rounded-md ${viewport === 'desktop' ? 'bg-slate-100 text-theme' : 'text-slate-400'}`}><Laptop size={14}/></button>
                         <button onClick={() => setViewport('tablet')} className={`p-1.5 rounded-md ${viewport === 'tablet' ? 'bg-slate-100 text-theme' : 'text-slate-400'}`}><Tablet size={14}/></button>
                         <button onClick={() => setViewport('mobile')} className={`p-1.5 rounded-md ${viewport === 'mobile' ? 'bg-slate-100 text-theme' : 'text-slate-400'}`}><Smartphone size={14}/></button>
                      </div>
                   </div>
                   <div className={`flex-grow bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden transition-all duration-500 mx-auto ${viewport === 'desktop' ? 'w-full' : viewport === 'tablet' ? 'w-[450px]' : 'w-[320px]'}`}>
                      {previewError ? (
                        <div className="flex-grow p-8 bg-slate-900 text-rose-400 font-mono text-xs overflow-auto"><pre>{previewError}</pre></div>
                      ) : (
                        <iframe ref={iframeRef} className="w-full h-full border-none" title="responsive-preview" />
                      )}
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && userRole === UserRole.ADMIN && (
            <div className="p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">待处理审核</h2>
              <div className="space-y-6">
                {submissions.filter(s => s.status === 'PENDING').map((sub) => (
                  <div key={sub.id} className="p-8 border border-slate-100 rounded-[1.5rem] hover:border-theme hover:bg-slate-50/50 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div><h3 className="text-xl font-bold text-slate-900 group-hover:text-theme">{sub.name}</h3><p className="text-xs text-slate-400 mt-2 font-medium">By <span className="text-theme font-bold">{sub.author}</span> • {sub.createdAt}</p></div>
                      <span className="text-[10px] bg-theme/10 text-theme px-3 py-1 rounded-full font-black uppercase tracking-widest">{sub.category}</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed mb-8">{sub.description}</p>
                    <div className="flex gap-4">
                      <button onClick={() => handleAudit(sub.id, true)} className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-black rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all">批准并上线</button>
                      <button onClick={() => handleAudit(sub.id, false)} className="px-6 py-2.5 bg-white text-rose-600 border border-rose-100 text-xs font-black rounded-xl hover:bg-rose-50 transition-all">打回修改</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
