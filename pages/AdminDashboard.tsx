
import React, { useState, useEffect, useRef } from 'react';
import { 
  UserRole, 
  ComponentSubmission, 
  ComponentSubmissionOverview, 
  ComponentSubmissionTrendPoint 
} from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Eye, 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardCheck, 
  TrendingUp, 
  Layers, 
  Terminal, 
  Code2, 
  UploadCloud, 
  Search,
  ChevronRight,
  Sparkles,
  Info,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { componentService } from '../services/api';

interface AdminDashboardProps {
  userRole: UserRole;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'contribute' | 'my-items' | 'moderate'>(
    userRole === UserRole.ADMIN ? 'overview' : 'contribute'
  );

  // 状态管理
  const [items, setItems] = useState<ComponentSubmission[]>([]);
  const [overview, setOverview] = useState<ComponentSubmissionOverview | null>(null);
  const [trends, setTrends] = useState<ComponentSubmissionTrendPoint[]>([]);
  const [loading, setLoading] = useState(false);

  // 编辑器状态
  const [form, setForm] = useState({
    title: '',
    description: '',
    jsxCode: '',
    category: 'Layout',
    templateType: 'vue' as 'vue' | 'html',
    tags: [] as string[]
  });
  const [previewError, setPreviewError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 初始化加载
  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'overview') {
        const [ov, tr] = await Promise.all([componentService.getOverview(), componentService.getTrends(7)]);
        setOverview(ov);
        setTrends(tr);
      } else if (activeTab === 'my-items') {
        const data = await componentService.listMySubmissions();
        setItems(data);
      }
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  // --- Vue SFC 预览逻辑 (移植自 Vue 代码) ---
  const buildPreviewSrcdoc = (code: string) => {
    if (!code.trim()) return '';
    let finalCode = code;
    if (!code.includes('<template') && !code.includes('<script')) {
      finalCode = `<template>${code}</template>`;
    }
    const codeBase64 = btoa(unescape(encodeURIComponent(finalCode)));
    const origin = window.location.origin;

    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { margin: 0; padding: 24px; min-height: 100vh; background-color: transparent; font-family: sans-serif; display: flex; align-items: center; justify-content: center; }
    </style>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script>
      const userCode = decodeURIComponent(escape(atob("${codeBase64}")));
      const options = {
        moduleCache: { vue: window.Vue },
        async getFile() { return userCode; },
        addStyle(textContent) {
          const style = document.createElement('style');
          style.textContent = textContent;
          document.head.appendChild(style);
        }
      };
      const { loadModule } = window['vue3-sfc-loader'];
      try {
        const app = Vue.createApp(Vue.defineAsyncComponent(() => loadModule('/component.vue', options)));
        app.mount('#app');
      } catch(e) { window.parent.postMessage({type: 'error', message: e.message}, '*'); }
    </script>
  </body>
</html>`;
  };

  useEffect(() => {
    if (activeTab === 'contribute') {
      const timer = setTimeout(() => {
        if (iframeRef.current && form.jsxCode) {
          iframeRef.current.srcdoc = buildPreviewSrcdoc(form.jsxCode);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [form.jsxCode, activeTab]);

  // 处理提交
  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await componentService.createSubmission({ ...form, coverImage: null });
      alert('提交成功，请等待管理员审核！');
      setActiveTab('my-items');
    } catch (err) {
      alert('提交失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* 左侧导航栏 */}
        <aside className="w-full lg:w-64 space-y-1">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Workspace</h3>
          
          {userRole === UserRole.ADMIN && (
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-theme text-white shadow-lg shadow-theme/20' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <LayoutDashboard size={18} /> 数据概览
            </button>
          )}
          
          <button 
            onClick={() => setActiveTab('contribute')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'contribute' ? 'bg-theme text-white shadow-lg shadow-theme/20' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <PlusCircle size={18} /> 新建投稿
          </button>
          
          <button 
            onClick={() => setActiveTab('my-items')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'my-items' ? 'bg-theme text-white shadow-lg shadow-theme/20' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Layers size={18} /> 我的组件
          </button>
          
          {userRole === UserRole.ADMIN && (
            <button 
              onClick={() => setActiveTab('moderate')} 
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${activeTab === 'moderate' ? 'bg-theme text-white shadow-lg shadow-theme/20' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <div className="flex items-center gap-3"><ClipboardCheck size={18} /> 审核中心</div>
              <span className={`px-2 py-0.5 rounded-lg text-[10px] ${activeTab === 'moderate' ? 'bg-white/20' : 'bg-rose-100 text-rose-600'}`}>12</span>
            </button>
          )}
        </aside>

        {/* 主内容区域 */}
        <main className="flex-grow bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden min-h-[720px]">
          
          {/* TAB: Overview */}
          {activeTab === 'overview' && overview && (
            <div className="p-10 animate-in fade-in duration-500">
               <div className="flex justify-between items-center mb-10">
                 <div>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Analytics</h2>
                   <p className="text-slate-500 font-medium mt-1">DevFront 社区组件协作实时数据看板</p>
                 </div>
                 <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white transition-all"><Clock size={14} /> 24小时前更新</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="p-8 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Total Components</span>
                        <div className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">{overview.total}</div>
                      </div>
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600"><Layers size={20} /></div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-indigo-600 font-bold">
                       <TrendingUp size={14} /> {overview.momPercent}% 较上月增长
                    </div>
                  </div>
                  
                  <div className="p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Approval Rate</span>
                        <div className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">{overview.approvalRate}%</div>
                      </div>
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-emerald-600"><CheckCircle2 size={20} /></div>
                    </div>
                    <div className="mt-4 text-xs text-emerald-600 font-bold">高质量准入标准</div>
                  </div>

                  <div className="p-8 bg-amber-50/50 rounded-3xl border border-amber-100/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Pending Audit</span>
                        <div className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">{overview.pending}</div>
                      </div>
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-amber-600"><Terminal size={20} /></div>
                    </div>
                    <div className="mt-4 text-xs text-amber-600 font-bold animate-pulse">待处理工作流...</div>
                  </div>
               </div>

               <div className="h-72 w-full mt-12 bg-white rounded-3xl border border-slate-100 p-6">
                  <div className="flex items-center justify-between mb-8 px-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><TrendingUp size={16} className="text-theme" /> 投稿趋势分析</h3>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400"><div className="w-2 h-2 rounded-full bg-theme"></div> 投稿数量</div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trends}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#cbd5e1'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#cbd5e1'}} />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}} 
                        contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -5px rgba(0,0,0,0.1)', padding: '12px'}}
                        labelStyle={{fontWeight: 800, color: '#1e293b', marginBottom: '4px'}}
                      />
                      <Bar dataKey="count" fill="var(--theme-color)" radius={[6, 6, 0, 0]} barSize={32}>
                        {trends.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === trends.length - 1 ? 'var(--theme-color)' : '#e2e8f0'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
          )}

          {/* TAB: Contribute (Create Component) */}
          {activeTab === 'contribute' && (
            <div className="h-full flex flex-col animate-in slide-in-from-right duration-500">
              <div className="p-10 border-b border-slate-50 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Contribute Code</h2>
                  <p className="text-slate-500 font-medium mt-1">支持 Vue 3 SFC 写法，代码将实时渲染并提交审核。</p>
                </div>
                <div className="flex gap-3">
                   <select 
                     value={form.templateType}
                     onChange={(e) => setForm({...form, templateType: e.target.value as any})}
                     className="bg-slate-100 border-none px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-theme/20"
                   >
                     <option value="vue">Vue SFC (TS)</option>
                     <option value="html">Pure HTML</option>
                   </select>
                </div>
              </div>

              <div className="flex-grow flex flex-col lg:flex-row min-h-0 bg-slate-50/30">
                {/* Editor Section */}
                <div className="flex-1 p-8 flex flex-col border-r border-slate-100 bg-white">
                  <div className="grid grid-cols-2 gap-5 mb-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">组件名称</label>
                      <input 
                        type="text" 
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-theme focus:bg-white transition-all text-sm font-bold shadow-inner" 
                        placeholder="例如: 简约卡片..." 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">分类</label>
                      <select 
                        value={form.category}
                        onChange={(e) => setForm({...form, category: e.target.value})}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-theme text-sm font-bold"
                      >
                        <option>Layout</option>
                        <option>Navigation</option>
                        <option>Forms</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col min-h-[400px]">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source Code</label>
                      <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-1.5"><Sparkles size={12} /> 实时语法检查已启用</div>
                    </div>
                    <textarea 
                      value={form.jsxCode} 
                      onChange={(e) => setForm({...form, jsxCode: e.target.value})}
                      spellCheck={false}
                      className="flex-grow w-full p-6 bg-slate-900 text-emerald-400 font-mono text-[13px] border-none rounded-3xl outline-none custom-scroll resize-none shadow-2xl" 
                      placeholder="<template>\n  <div class='p-4'>Hello World</div>\n</template>"
                    />
                  </div>

                  <button 
                    onClick={handleSubmission}
                    disabled={loading || !form.jsxCode}
                    className="mt-8 w-full py-4.5 bg-theme text-white font-black rounded-2xl hover:bg-theme-dark shadow-xl shadow-theme/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <><UploadCloud size={20} /> 提交并进入审核阶段</>}
                  </button>
                </div>

                {/* Preview Section */}
                <div className="flex-1 p-10 flex flex-col relative overflow-hidden">
                   <div className="flex items-center justify-between mb-6">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> 实时预览 (Live Sandbox)
                      </label>
                      <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-bold text-slate-400">Vue 3.x + Tailwind CSS</div>
                   </div>
                   <div className="flex-grow bg-white rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden transition-all duration-500 flex items-center justify-center relative">
                      {!form.jsxCode ? (
                        <div className="text-center px-8 flex flex-col items-center">
                          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4 border border-slate-100">
                            <Code2 size={32} />
                          </div>
                          <p className="text-xs font-bold text-slate-400 tracking-wide">在左侧输入代码以实时查看效果</p>
                        </div>
                      ) : (
                        <iframe 
                          ref={iframeRef} 
                          className="w-full h-full border-none bg-transparent" 
                          title="vue-sfc-preview" 
                        />
                      )}
                      
                      {previewError && (
                        <div className="absolute inset-0 bg-rose-50/95 backdrop-blur-sm p-10 overflow-auto animate-in fade-in">
                          <div className="flex items-center gap-2 text-rose-600 font-black text-sm mb-4"><AlertCircle size={18} /> Runtime Error</div>
                          <pre className="text-xs text-rose-800 font-mono leading-relaxed p-4 bg-rose-100/50 rounded-2xl">{previewError}</pre>
                        </div>
                      )}
                   </div>
                   
                   <div className="mt-8 p-6 bg-blue-50/50 border border-blue-100/50 rounded-3xl flex gap-4">
                     <Info className="text-blue-500 shrink-0" size={20} />
                     <p className="text-[11px] text-blue-700/70 font-medium leading-relaxed">
                       <b>贡献小贴士：</b> 组件采纳率与代码质量、注释完整度及无障碍 (ARIA) 支持直接挂钩。提交前请确保响应式布局完美。
                     </p>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: My Items (List) */}
          {activeTab === 'my-items' && (
            <div className="p-10 animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">My Contributions</h2>
                <div className="relative group">
                  <input type="text" placeholder="搜索我的投稿..." className="pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-xs font-bold border-none outline-none focus:ring-2 focus:ring-theme/20 transition-all w-64" />
                  <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                </div>
              </div>

              {items.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                  <LayoutDashboard size={48} className="opacity-20 mb-4" />
                  <p className="font-bold">尚未提交任何组件</p>
                  <button onClick={() => setActiveTab('contribute')} className="mt-4 text-theme text-sm font-bold hover:underline">立即开始您的第一次投稿 →</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map(sub => (
                    <div key={sub.id} className="group p-8 border border-slate-100 rounded-[2rem] hover:border-theme/30 hover:shadow-xl hover:shadow-theme/5 transition-all bg-white relative overflow-hidden">
                      <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[9px] font-black uppercase tracking-widest ${
                        sub.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' : 
                        sub.status === 'rejected' ? 'bg-rose-50 text-rose-600' : 
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {sub.status === 'accepted' ? '已通过' : sub.status === 'rejected' ? '已拒绝' : '审核中'}
                      </div>
                      
                      <div className="mb-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub.category || 'UI Component'}</span>
                        <h3 className="text-xl font-black text-slate-900 mt-1 group-hover:text-theme transition-colors">{sub.title}</h3>
                      </div>
                      
                      <p className="text-sm text-slate-500 line-clamp-2 mb-8 leading-relaxed font-medium">
                        {sub.description || '暂无详细描述...'}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                          <div className="flex items-center gap-1"><Clock size={12}/> {new Date(sub.createdAt).toLocaleDateString()}</div>
                          {sub.score && <div className="flex items-center gap-1 text-emerald-600"><Sparkles size={12}/> Score: {sub.score}</div>}
                        </div>
                        <button className="flex items-center gap-1.5 text-xs font-black text-theme group-hover:gap-2 transition-all">
                          查看详情 <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: Moderation (Admin only) */}
          {activeTab === 'moderate' && (
            <div className="p-10 animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-10">Audit Pending</h2>
              <div className="space-y-6">
                <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row gap-10">
                   <div className="w-full md:w-64 h-40 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-center justify-center text-slate-300">
                      <Eye size={32} />
                   </div>
                   <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-black text-slate-900">Dynamic Search Panel</h3>
                          <p className="text-sm font-bold text-slate-400 mt-1">Author: <span className="text-theme">Alex Dev</span></p>
                        </div>
                        <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-black uppercase text-indigo-500 tracking-widest border border-indigo-100 shadow-sm">Forms</span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 max-w-xl">
                        实现了基于模糊匹配的搜索面板，适配所有主流浏览器的暗色模式，并包含完整的 ARIA 标签。
                      </p>
                      <div className="flex gap-4">
                        <button className="px-8 py-3 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">批准并上线</button>
                        <button className="px-8 py-3 bg-white text-rose-600 border border-rose-100 text-xs font-black rounded-xl hover:bg-rose-50 transition-all">打回修改</button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
