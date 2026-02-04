
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
  AlertCircle,
  Briefcase,
  Palette,
  Layout,
  Star,
  Zap,
  Check,
  HeartPulse, Radio, Factory, Wallet, CarFront, GraduationCap, Cpu, MonitorPlay, Landmark, Scale, Leaf, ShieldAlert, Stethoscope, Briefcase as HR
} from 'lucide-react';
import { componentService } from '../services/api';

interface AdminDashboardProps {
  userRole: UserRole;
}

const industries = [
  { id: 'medical', name: '医疗健康', icon: HeartPulse, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'finance', name: '金融', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'traffic', name: '交通', icon: CarFront, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'dev-reform', name: '发改', icon: Landmark, color: 'text-rose-700', bg: 'bg-rose-100/50' },
  { id: 'manufacturing', name: '制造', icon: Cpu, color: 'text-slate-600', bg: 'bg-slate-100' }
];

const categories = ['Layout', 'Navigation', 'Data Entry', 'Data Display', 'Feedback', 'Charts & Visualization', 'Media'];
const scenarios = ['admin', 'dashboard', 'app', 'portal'];
const tones = ['standard', 'modern', 'dark-tech'];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'contribute' | 'my-items' | 'moderate'>(
    userRole === UserRole.ADMIN ? 'overview' : 'contribute'
  );

  const [items, setItems] = useState<ComponentSubmission[]>([]);
  const [overview, setOverview] = useState<ComponentSubmissionOverview | null>(null);
  const [trends, setTrends] = useState<ComponentSubmissionTrendPoint[]>([]);
  const [loading, setLoading] = useState(false);

  // 扩展后的投稿表单
  const [form, setForm] = useState({
    title: '',
    description: '',
    jsxCode: `<template>\n  <div class="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl">\n    <h3 class="text-xl font-bold">New Component</h3>\n    <p class="text-slate-500 mt-2">Start building your masterpiece...</p>\n  </div>\n</template>`,
    industry: 'medical',
    category: 'Layout',
    scenario: 'admin',
    tone: 'standard',
    templateType: 'vue' as 'vue' | 'html',
  });

  const [previewError, setPreviewError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => { loadData(); }, [activeTab]);

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
    } catch (err) {} finally { setLoading(false); }
  };

  const buildPreviewSrcdoc = (code: string) => {
    if (!code.trim()) return '';
    let finalCode = code;
    if (!code.includes('<template') && !code.includes('<script')) {
      finalCode = `<template>${code}</template>`;
    }
    const codeBase64 = btoa(unescape(encodeURIComponent(finalCode)));
    return `<!DOCTYPE html><html><head><meta charset="UTF-8" /><script src="https://cdn.tailwindcss.com"></script><style>body { margin: 0; padding: 40px; min-height: 100vh; background-color: transparent; font-family: sans-serif; display: flex; align-items: center; justify-content: center; }</style><script src="https://unpkg.com/vue@3/dist/vue.global.js"></script><script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js"></script></head><body><div id="app"></div><script>const userCode = decodeURIComponent(escape(atob("${codeBase64}")));const options = { moduleCache: { vue: window.Vue }, async getFile() { return userCode; }, addStyle(textContent) { const style = document.createElement('style'); style.textContent = textContent; document.head.appendChild(style); } };const { loadModule } = window['vue3-sfc-loader'];try { const app = Vue.createApp(Vue.defineAsyncComponent(() => loadModule('/component.vue', options))); app.mount('#app'); } catch(e) { console.error(e); }</script></body></html>`;
  };

  useEffect(() => {
    if (activeTab === 'contribute' && iframeRef.current) {
      const timer = setTimeout(() => {
        iframeRef.current!.srcdoc = buildPreviewSrcdoc(form.jsxCode);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [form.jsxCode, activeTab]);

  const handleSubmission = async () => {
    setLoading(true);
    try {
      await componentService.createSubmission(form);
      alert('艺术品已加入待审序列！');
      setActiveTab('my-items');
    } catch (err) {
      alert('提交失败');
    } finally { setLoading(false); }
  };

  const selectedIndustryInfo = industries.find(i => i.id === form.industry) || industries[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 space-y-2">
          <div className="px-4 mb-6">
             <h2 className="text-xl font-black text-slate-900 tracking-tight">实验室控制台</h2>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Creator Workspace</p>
          </div>
          
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-theme text-white shadow-xl shadow-theme/20' : 'text-slate-600 hover:bg-slate-50'}`}>
            <LayoutDashboard size={18} /> 社区数据洞察
          </button>
          
          <button onClick={() => setActiveTab('contribute')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'contribute' ? 'bg-theme text-white shadow-xl shadow-theme/20' : 'text-slate-600 hover:bg-slate-50'}`}>
            <PlusCircle size={18} /> 创作新艺术品
          </button>
          
          <button onClick={() => setActiveTab('my-items')} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'my-items' ? 'bg-theme text-white shadow-xl shadow-theme/20' : 'text-slate-600 hover:bg-slate-50'}`}>
            <Layers size={18} /> 个人贡献资产
          </button>
          
          {userRole === UserRole.ADMIN && (
            <button onClick={() => setActiveTab('moderate')} className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'moderate' ? 'bg-theme text-white shadow-xl shadow-theme/20' : 'text-slate-600 hover:bg-slate-50'}`}>
              <div className="flex items-center gap-3"><ClipboardCheck size={18} /> 审核中央</div>
              <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">12</span>
            </button>
          )}

          <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-theme/30 blur-2xl rounded-full"></div>
             <h4 className="text-xs font-black mb-2 flex items-center gap-2 relative z-10"><Star size={14} className="text-amber-400" /> 贡献等级</h4>
             <p className="text-[10px] text-slate-400 leading-relaxed mb-4 relative z-10">当前等级：黄金工匠<br/>还需 3 个组件升级至大师</p>
             <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-theme w-2/3 h-full"></div>
             </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-grow bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[800px]">
          
          {/* TAB: Overview */}
          {activeTab === 'overview' && (
            <div className="p-12 animate-in fade-in duration-500">
               <div className="flex justify-between items-center mb-12">
                 <div>
                   <h2 className="text-4xl font-black text-slate-900 tracking-tighter">社区生态看板</h2>
                   <p className="text-slate-500 font-medium mt-1">每一行代码都在为全人类的前端事业做出微小贡献。</p>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <div className="p-10 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50 relative group">
                    <span className="text-[11px] font-black text-blue-400 uppercase tracking-widest">已沉淀资产</span>
                    <div className="text-5xl font-black text-slate-900 mt-3 tracking-tighter">{overview?.total}</div>
                    <div className="absolute bottom-6 right-6 p-4 bg-white rounded-3xl shadow-sm text-blue-500 group-hover:scale-110 transition-transform"><Layers size={24} /></div>
                  </div>
                  <div className="p-10 bg-emerald-50/50 rounded-[2.5rem] border border-emerald-100/50 relative group">
                    <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">平均准入分</span>
                    <div className="text-5xl font-black text-slate-900 mt-3 tracking-tighter">94.2</div>
                    <div className="absolute bottom-6 right-6 p-4 bg-white rounded-3xl shadow-sm text-emerald-500 group-hover:scale-110 transition-transform"><Zap size={24} /></div>
                  </div>
                  <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white relative group">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">全球总引用</span>
                    <div className="text-5xl font-black mt-3 tracking-tighter">24.5k</div>
                    <div className="absolute bottom-6 right-6 p-4 bg-white/10 rounded-3xl text-theme group-hover:scale-110 transition-transform"><TrendingUp size={24} /></div>
                  </div>
               </div>

               <div className="h-80 w-full bg-slate-50/50 rounded-[2.5rem] p-10 border border-slate-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trends}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} dy={10} />
                      <YAxis hide />
                      <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)'}} />
                      <Bar dataKey="count" fill="var(--theme-color)" radius={[12, 12, 0, 0]} barSize={40}>
                         {trends.map((_, i) => <Cell key={i} fill={i === trends.length -1 ? 'var(--theme-color)' : '#cbd5e1'} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
          )}

          {/* TAB: Contribute (Refactored) */}
          {activeTab === 'contribute' && (
            <div className="h-full flex flex-col lg:flex-row animate-in slide-in-from-bottom-8 duration-700">
               {/* Form Section */}
               <div className="w-full lg:w-[480px] border-r border-slate-50 flex flex-col h-full overflow-y-auto custom-scroll p-10">
                  <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">发布新作品</h2>
                    <p className="text-slate-500 font-medium mt-1">定义您的业务维度，帮助更多人发现它。</p>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Layout size={12}/> 1. 组件名称</label>
                        <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-theme focus:bg-white transition-all text-sm font-bold outline-none" placeholder="例如：智慧发改审批流..." />
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Briefcase size={12}/> 2. 业务行业 (Industry)</label>
                        <div className="grid grid-cols-2 gap-2">
                           {industries.map(ind => (
                             <button key={ind.id} onClick={() => setForm({...form, industry: ind.id})} className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all border ${form.industry === ind.id ? `${ind.bg} ${ind.color} border-current` : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'}`}>
                                <ind.icon size={14} /> {ind.name}
                             </button>
                           ))}
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">3. 应用场景</label>
                           <select value={form.scenario} onChange={e => setForm({...form, scenario: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold border-none outline-none">
                              {scenarios.map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                           </select>
                        </div>
                        <div className="space-y-3">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">4. 视觉调性</label>
                           <select value={form.tone} onChange={e => setForm({...form, tone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 rounded-xl text-xs font-bold border-none outline-none">
                              {tones.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                           </select>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Code2 size={12}/> 5. 核心代码 (Vue SFC)</label>
                        <textarea value={form.jsxCode} onChange={e => setForm({...form, jsxCode: e.target.value})} className="w-full h-80 px-6 py-6 bg-slate-900 text-emerald-400 font-mono text-xs rounded-[2rem] border-none outline-none custom-scroll resize-none shadow-2xl" />
                     </div>

                     <button onClick={handleSubmission} disabled={loading || !form.title} className="w-full py-5 bg-theme text-white font-black rounded-2xl shadow-2xl shadow-theme/30 hover:bg-theme-dark transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]">
                        {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <><UploadCloud size={20}/> 提交社区并造福全人类</>}
                     </button>
                  </div>
               </div>

               {/* Preview Section */}
               <div className="flex-grow p-12 bg-slate-50/50 relative overflow-hidden flex flex-col">
                  <div className={`absolute inset-0 opacity-10 transition-colors duration-1000 ${selectedIndustryInfo.bg} ${selectedIndustryInfo.color}`}>
                     <selectedIndustryInfo.icon size={400} className="absolute -right-20 -bottom-20 opacity-20 rotate-12" />
                  </div>
                  
                  <div className="flex justify-between items-center mb-8 relative z-10">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400"><MonitorPlay size={20}/></div>
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Real-time Lab</span>
                          <h4 className="text-sm font-black text-slate-900">艺术品预览</h4>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-400">Vue 3.5</div>
                        <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-400">Tailwind 3.4</div>
                     </div>
                  </div>

                  <div className="flex-grow bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white shadow-2xl overflow-hidden relative z-10 flex items-center justify-center">
                     <iframe ref={iframeRef} className="w-full h-full border-none" title="lab-preview" />
                  </div>

                  <div className="mt-8 p-8 bg-white/80 backdrop-blur rounded-[2rem] border border-white relative z-10 flex gap-6">
                     <div className="p-4 bg-theme/10 rounded-2xl text-theme h-fit"><Sparkles size={24}/></div>
                     <div>
                        <h5 className="font-black text-slate-900">质量检测建议</h5>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed mt-1">您选择的 <b>{selectedIndustryInfo.name}</b> 行业组件通常需要考虑高频率的数据交互，建议为关键按钮添加磁吸动效 (Magnetic Effect)。</p>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* TAB: My Items */}
          {activeTab === 'my-items' && (
            <div className="p-12 animate-in fade-in duration-500">
               <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">我的贡献足迹</h2>
                    <p className="text-slate-500 font-medium mt-1">沉淀的每一行代码都是您的技术品牌。</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {items.map(sub => {
                    const ind = industries.find(i => i.id === sub.industry) || industries[0];
                    return (
                      <div key={sub.id} className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl transition-all relative overflow-hidden">
                         <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${sub.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                            {sub.status === 'accepted' ? '已上线' : '审核中'}
                         </div>
                         <div className="flex items-center gap-2 mb-4">
                            <ind.icon size={16} className={ind.color} />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{ind.name} / {sub.category}</span>
                         </div>
                         <h3 className="text-xl font-black text-slate-900 group-hover:text-theme transition-colors">{sub.title}</h3>
                         <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed font-medium">{sub.description || '暂无详细业务描述...'}</p>
                         
                         <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                            <div className="flex gap-4">
                               <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><Clock size={12}/> {new Date(sub.createdAt).toLocaleDateString()}</div>
                               <div className="flex items-center gap-1.5 text-[10px] font-bold text-theme"><TrendingUp size={12}/> {sub.downloads} 次引用</div>
                            </div>
                            <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-theme hover:text-white transition-all"><ChevronRight size={18}/></button>
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
