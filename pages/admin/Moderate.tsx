
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Clock, 
  User, 
  ChevronRight, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  X,
  Code2,
  Trophy,
  MessageSquareText,
  Loader2,
  Terminal,
  Zap,
  ChevronDown
} from 'lucide-react';
import { componentService } from '../../services/api';
import { ComponentSubmission } from '../../types';

const Moderate: React.FC = () => {
  const [submissions, setSubmissions] = useState<ComponentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'pending' | 'accepted' | 'rejected' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ComponentSubmission | null>(null);
  
  // 审核表单状态
  const [reviewScore, setReviewScore] = useState(90);
  const [rejectReason, setRejectReason] = useState('');
  const [appealReply, setAppealReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setLoading(true);
    const data = await componentService.listAllSubmissions();
    setSubmissions(data);
    setLoading(false);
  };

  const filteredSubmissions = submissions.filter(s => {
    const statusMatch = filterStatus === 'all' || s.status === filterStatus;
    const queryMatch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       s.authorName?.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && queryMatch;
  });

  const handleOpenReview = (item: ComponentSubmission) => {
    setSelectedItem(item);
    setReviewScore(item.score || 90);
    setRejectReason(item.rejectReason || '');
    setAppealReply(item.appealReply || '');
  };

  const handleReviewAction = async (status: 'accepted' | 'rejected') => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    
    const payload: Partial<ComponentSubmission> = { status };
    if (status === 'accepted') payload.score = reviewScore;
    if (status === 'rejected') payload.rejectReason = rejectReason;
    if (selectedItem.appealText) payload.appealReply = appealReply;

    const success = await componentService.updateSubmissionStatus(selectedItem.id, payload);
    if (success) {
      await loadSubmissions();
      setSelectedItem(null);
    }
    setIsSubmitting(false);
  };

  // 沙盒预览逻辑
  useEffect(() => {
    if (selectedItem && iframeRef.current) {
      const codeBase64 = btoa(unescape(encodeURIComponent(selectedItem.jsxCode)));
      const content = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js"></script>
            <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
            <style>body { margin: 0; padding: 24px; background: #f8fafc; font-family: system-ui; display: flex; justify-content: center; }</style>
          </head>
          <body>
            <div id="app"></div>
            <script>
              const { loadModule } = window['vue3-sfc-loader'];
              const userCode = decodeURIComponent(escape(atob("${codeBase64}")));
              const options = {
                moduleCache: { vue: window.Vue },
                async getFile(url) { if (url === '/component.vue') return userCode; },
                addStyle(textContent) {
                  const style = document.createElement('style');
                  style.textContent = textContent;
                  document.head.appendChild(style);
                },
              };
              const app = Vue.createApp({
                components: { 'my-component': Vue.defineAsyncComponent(() => loadModule('/component.vue', options)) },
                template: '<my-component />'
              });
              app.mount('#app');
            </script>
          </body>
        </html>
      `;
      iframeRef.current.srcdoc = content;
    }
  }, [selectedItem]);

  return (
    <div className="h-full flex flex-col relative">
      
      {/* 1. Header & Filters */}
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shrink-0">
         <div>
            <div className="flex items-center gap-3 mb-1">
               <div className="p-2 bg-slate-900 text-white rounded-xl shadow-lg">
                  <ShieldCheck size={20} />
               </div>
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">审核管理中央</h2>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Decision Hub & Quality Control</p>
         </div>

         <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
               <input 
                 type="text" 
                 placeholder="搜索组件或作者..."
                 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-1.5xl text-xs font-bold outline-none focus:ring-4 focus:ring-theme/5 transition-all"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
               <Search size={14} className="absolute left-4 top-3.5 text-slate-400" />
            </div>
            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-theme transition-all">
               <Filter size={18} />
            </button>
         </div>
      </div>

      {/* 2. Tabs */}
      <div className="px-8 py-4 border-b border-slate-100 flex gap-8 shrink-0">
         {[
           { id: 'pending', label: '待审核', count: submissions.filter(s => s.status === 'pending').length },
           { id: 'accepted', label: '已录入', count: submissions.filter(s => s.status === 'accepted').length },
           { id: 'rejected', label: '已驳回', count: submissions.filter(s => s.status === 'rejected').length },
           { id: 'all', label: '全部列表', count: submissions.length }
         ].map(tab => (
           <button 
             key={tab.id}
             onClick={() => setFilterStatus(tab.id as any)}
             className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${filterStatus === tab.id ? 'text-theme' : 'text-slate-400 hover:text-slate-600'}`}
           >
              {tab.label}
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[9px] ${filterStatus === tab.id ? 'bg-theme text-white' : 'bg-slate-100 text-slate-400'}`}>
                {tab.count}
              </span>
              {filterStatus === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-theme rounded-full"></div>}
           </button>
         ))}
      </div>

      {/* 3. Data Table */}
      <div className="flex-1 overflow-y-auto custom-scroll">
         {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-300">
               <Loader2 size={40} className="animate-spin" />
               <span className="text-[10px] font-black uppercase">同步审核队列...</span>
            </div>
         ) : filteredSubmissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-300">
               <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
               </div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">队列已清空</h3>
               <p className="text-sm font-medium mt-1">目前没有需要审核的艺术品投稿。</p>
            </div>
         ) : (
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50/30">
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">组件资产信息</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">作者</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">元数据</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">投稿时间</th>
                     <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">操作</th>
               </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {filteredSubmissions.map(sub => (
                     <tr key={sub.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-14 h-10 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 overflow-hidden relative">
                                 {sub.coverImage ? <img src={sub.coverImage} className="w-full h-full object-cover" /> : <Code2 size={16} className="text-slate-300" />}
                                 {sub.appealText && <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-pulse ring-2 ring-white"></div>}
                              </div>
                              <div>
                                 <h4 className="text-sm font-black text-slate-900 tracking-tight">{sub.title}</h4>
                                 <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${sub.status === 'pending' ? 'bg-amber-100 text-amber-600' : sub.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                    {sub.status}
                                 </span>
                              </div>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-3">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sub.authorAvatar}`} className="w-8 h-8 rounded-xl bg-slate-50" />
                              <span className="text-xs font-bold text-slate-700">{sub.authorName}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-black text-slate-400 uppercase">{sub.industry}</span>
                              <span className="text-[10px] font-bold text-theme">{sub.category}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                              <Clock size={12} /> {new Date(sub.createdAt).toLocaleDateString()}
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <button 
                             onClick={() => handleOpenReview(sub)}
                             className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl hover:bg-theme transition-all shadow-lg active:scale-95 flex items-center gap-2 ml-auto"
                           >
                              <Eye size={12} /> 进入审核
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         )}
      </div>

      {/* 4. Review Modal Overlay */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)}></div>
           
           <div className="relative w-full max-w-5xl h-screen bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                 <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                       <Terminal size={20} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900 tracking-tight">{selectedItem.title}</h3>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">正在进行质量与安全审计 (Audit Workflow)</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setSelectedItem(null)}
                   className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all"
                 >
                    <X size={20} />
                 </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                 
                 {/* Left: Preview Sandbox */}
                 <div className="flex-grow p-8 bg-slate-50 flex flex-col gap-4 overflow-hidden">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Zap size={14} className="text-amber-500" /> 交互沙盒实时预览
                       </span>
                       <div className="flex gap-2">
                          <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[9px] font-black uppercase text-slate-500">Vue 3 SFC</span>
                       </div>
                    </div>
                    <div className="flex-grow bg-white rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative">
                       <iframe ref={iframeRef} className="w-full h-full border-none" title="moderate-preview" />
                    </div>
                    
                    {/* Source Code Inspector */}
                    <div className="h-48 bg-[#0b0e14] rounded-3xl p-6 border border-slate-800 relative overflow-hidden group">
                       <div className="absolute top-4 right-4 text-emerald-500/20"><Code2 size={40} /></div>
                       <pre className="text-emerald-400 font-mono text-[10px] leading-relaxed h-full overflow-y-auto custom-scroll">
                          {selectedItem.jsxCode}
                       </pre>
                    </div>
                 </div>

                 {/* Right: Decision Panel */}
                 <div className="w-full lg:w-96 border-l border-slate-100 flex flex-col overflow-y-auto custom-scroll p-8 space-y-8 shrink-0">
                    
                    {/* Metadata Section */}
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">资产元数据</label>
                       <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                             <span className="text-[10px] font-bold text-slate-500">作者</span>
                             <span className="text-xs font-black text-slate-900">{selectedItem.authorName}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                             <span className="text-[10px] font-bold text-slate-500">行业分类</span>
                             <span className="text-xs font-black text-theme uppercase tracking-tighter">{selectedItem.industry}</span>
                          </div>
                       </div>
                    </div>

                    {/* Appeal Section (If exists) */}
                    {selectedItem.appealText && (
                       <div className="p-6 bg-rose-50 border border-rose-100 rounded-[2rem] space-y-3 animate-in slide-in-from-top-4">
                          <div className="flex items-center gap-2 text-rose-600 font-black text-[10px] uppercase tracking-widest">
                             <AlertCircle size={14} /> 紧急异议申诉
                          </div>
                          <p className="text-xs font-medium text-rose-900/70 leading-relaxed italic">
                             "{selectedItem.appealText}"
                          </p>
                          <textarea 
                            value={appealReply}
                            onChange={e => setAppealReply(e.target.value)}
                            placeholder="填写申诉回复内容..."
                            className="w-full p-4 bg-white border border-rose-100 rounded-2xl text-xs font-medium outline-none focus:ring-4 focus:ring-rose-200 transition-all min-h-[100px]"
                          />
                       </div>
                    )}

                    {/* Decision Flow */}
                    <div className="space-y-6">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">审核决策处理</label>
                       
                       {/* Acceptance Score */}
                       <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] space-y-4">
                          <div className="flex justify-between items-end">
                             <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">资产质量评分</span>
                             <span className="text-4xl font-black text-emerald-700 tabular-nums">{reviewScore}<span className="text-xs opacity-50">/100</span></span>
                          </div>
                          <input 
                            type="range" min="0" max="100" 
                            value={reviewScore} 
                            onChange={e => setReviewScore(parseInt(e.target.value))}
                            className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
                          />
                          <button 
                            onClick={() => handleReviewAction('accepted')}
                            disabled={isSubmitting}
                            className="w-full py-4 bg-emerald-600 text-white text-xs font-black rounded-2xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                          >
                             {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                             确认采纳并上架
                          </button>
                       </div>

                       {/* Rejection */}
                       <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-4">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">驳回说明 (驳回时必填)</span>
                          <textarea 
                            value={rejectReason}
                            onChange={e => setRejectReason(e.target.value)}
                            placeholder="列出未通过的具体审计项，例如：CSS 样式污染、无障碍支持缺失..."
                            className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-xs font-medium outline-none focus:ring-4 focus:ring-theme/5 transition-all min-h-[100px]"
                          />
                          <button 
                            onClick={() => handleReviewAction('rejected')}
                            disabled={isSubmitting || !rejectReason}
                            className="w-full py-4 border border-rose-200 text-rose-600 text-xs font-black rounded-2xl hover:bg-rose-500 hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2"
                          >
                             {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <XCircle size={16} />}
                             驳回投稿
                          </button>
                       </div>
                    </div>

                 </div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .rounded-1.5xl { border-radius: 0.875rem; }
      `}</style>
    </div>
  );
};

export default Moderate;
