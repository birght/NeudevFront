
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { componentService } from '../../services/api';
import { 
  HeartPulse, Wallet, CarFront, Landmark, Cpu, 
  Layout, Code2, UploadCloud, MonitorPlay, Sparkles, Briefcase
} from 'lucide-react';

const industries = [
  { id: 'medical', name: '医疗健康', icon: HeartPulse, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'finance', name: '金融', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'traffic', name: '交通', icon: CarFront, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'dev-reform', name: '发改', icon: Landmark, color: 'text-rose-700', bg: 'bg-rose-100/50' },
  { id: 'manufacturing', name: '制造', icon: Cpu, color: 'text-slate-600', bg: 'bg-slate-100' }
];

const scenarios = ['admin', 'dashboard', 'app', 'portal'];
const tones = ['standard', 'modern', 'dark-tech'];

const AdminContribute: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const buildPreviewSrcdoc = (code: string) => {
    const codeBase64 = btoa(unescape(encodeURIComponent(code)));
    return `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script><script src="https://unpkg.com/vue@3/dist/vue.global.js"></script><script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js"></script></head><body><div id="app"></div><script>const userCode = decodeURIComponent(escape(atob("${codeBase64}")));const options = { moduleCache: { vue: window.Vue }, async getFile() { return userCode; }, addStyle(textContent) { const style = document.createElement('style'); style.textContent = textContent; document.head.appendChild(style); } };const { loadModule } = window['vue3-sfc-loader'];Vue.createApp(Vue.defineAsyncComponent(() => loadModule('/component.vue', options))).mount('#app');</script></body></html>`;
  };

  useEffect(() => {
    if (iframeRef.current) {
      const timer = setTimeout(() => {
        iframeRef.current!.srcdoc = buildPreviewSrcdoc(form.jsxCode);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [form.jsxCode]);

  const handleSubmission = async () => {
    setLoading(true);
    try {
      await componentService.createSubmission(form);
      alert('发布成功！');
      navigate('/admin/my-items');
    } catch (err) {
      alert('提交失败');
    } finally { setLoading(false); }
  };

  const selectedIndustryInfo = industries.find(i => i.id === form.industry) || industries[0];

  return (
    <div className="h-full flex flex-col lg:flex-row animate-in slide-in-from-bottom-8 duration-700">
       <div className="w-full lg:w-[480px] border-r border-slate-50 flex flex-col h-full overflow-y-auto p-10">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">发布新作品</h2>
            <p className="text-slate-500 font-medium mt-1">定义您的业务维度。</p>
          </div>

          <div className="space-y-8">
             <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Layout size={12}/> 1. 组件名称</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" placeholder="例如：审批流..." />
             </div>

             <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Briefcase size={12}/> 2. 业务行业</label>
                <div className="grid grid-cols-2 gap-2">
                   {industries.map(ind => (
                     <button key={ind.id} onClick={() => setForm({...form, industry: ind.id})} className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold border ${form.industry === ind.id ? `${ind.bg} ${ind.color} border-current` : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'}`}>
                        <ind.icon size={14} /> {ind.name}
                     </button>
                   ))}
                </div>
             </div>

             <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Code2 size={12}/> 3. 代码 (Vue SFC)</label>
                <textarea value={form.jsxCode} onChange={e => setForm({...form, jsxCode: e.target.value})} className="w-full h-80 px-6 py-6 bg-slate-900 text-emerald-400 font-mono text-xs rounded-[2rem] outline-none" />
             </div>

             <button onClick={handleSubmission} disabled={loading || !form.title} className="w-full py-5 bg-theme text-white font-black rounded-2xl shadow-theme/30 hover:bg-theme-dark transition-all">
                {loading ? '提交中...' : '提交社区并造福全人类'}
             </button>
          </div>
       </div>

       <div className="flex-grow p-12 bg-slate-50/50 relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-8 relative z-10">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm text-slate-400"><MonitorPlay size={20}/></div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Real-time Lab</span>
                  <h4 className="text-sm font-black text-slate-900">艺术品预览</h4>
                </div>
             </div>
          </div>

          <div className="flex-grow bg-white rounded-[3rem] border border-white shadow-2xl overflow-hidden relative z-10">
             <iframe ref={iframeRef} className="w-full h-full border-none" title="lab-preview" />
          </div>

          <div className="mt-8 p-8 bg-white/80 backdrop-blur rounded-[2rem] border border-white relative z-10 flex gap-6">
             <div className="p-4 bg-theme/10 rounded-2xl text-theme h-fit"><Sparkles size={24}/></div>
             <div>
                <h5 className="font-black text-slate-900">质量检测建议</h5>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mt-1">您选择的 <b>{selectedIndustryInfo.name}</b> 行业组件通常需要考虑数据交互性能。</p>
             </div>
          </div>
       </div>
    </div>
  );
};

export default AdminContribute;
