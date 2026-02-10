
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, Search, Filter, Clock, Eye, 
  CheckCircle2, XCircle, AlertCircle, X, Code2, 
  Trophy, Loader2, Terminal, Zap, ChevronDown,
  Palette, FileCode, HandMetal, Lightbulb, TrendingUp, 
  Coins, Smartphone, Monitor, ShieldAlert, BadgeCheck,
  Layout, Fingerprint, Info, FileJson, Check
} from 'lucide-react';
import { componentService } from '../../services/api';
import { ComponentSubmission, ScoreBreakdown } from '../../types';

const Moderate: React.FC = () => {
  const [submissions, setSubmissions] = useState<ComponentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'pending' | 'accepted' | 'rejected' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ComponentSubmission | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // 4D 评分状态
  const [scores, setScores] = useState<ScoreBreakdown>({
    design: 8.0,
    code: 8.0,
    usability: 8.0,
    innovation: 8.0
  });

  // 审计合规单
  const [checklist, setChecklist] = useState({
    accessibility: true,
    performance: true,
    security: true,
    docReady: false
  });

  const [basePrice, setBasePrice] = useState(50);
  const [rejectReason, setRejectReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const calculateFinalMetrics = () => {
    const finalScore = (scores.design * 0.25) + (scores.code * 0.3) + (scores.usability * 0.25) + (scores.innovation * 0.2);
    const qualityFactor = Math.min(Math.max(finalScore / 8, 0.7), 1.3);
    const estimatedPrice = Math.round(basePrice * qualityFactor);
    return { finalScore: finalScore.toFixed(1), qualityFactor: qualityFactor.toFixed(2), estimatedPrice };
  };

  const metrics = calculateFinalMetrics();

  useEffect(() => { loadSubmissions(); }, []);

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
    setScores(item.scoreBreakdown || { design: 8.0, code: 8.0, usability: 8.0, innovation: 8.0 });
    setBasePrice(item.basePrice || 50);
    setRejectReason(item.rejectReason || '');
    setChecklist({ accessibility: true, performance: true, security: true, docReady: false });
  };

  const handleReviewAction = async (status: 'accepted' | 'rejected') => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    
    const payload: Partial<ComponentSubmission> = { 
      status,
      score: status === 'accepted' ? parseFloat(metrics.finalScore) : null,
      scoreBreakdown: status === 'accepted' ? scores : undefined,
      pointsPerCopy: status === 'accepted' ? metrics.estimatedPrice : selectedItem.pointsPerCopy,
      rejectReason: status === 'rejected' ? rejectReason : null
    };

    const success = await componentService.updateSubmissionStatus(selectedItem.id, payload);
    if (success) {
      await loadSubmissions();
      setSelectedItem(null);
    }
    setIsSubmitting(false);
  };

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
            <style>body { margin: 0; padding: 24px; background: transparent; font-family: system-ui; display: flex; justify-content: center; }</style>
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
    <div className="h-full flex flex-col relative bg-white">
      {/* 1. Header */}
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shrink-0">
         <div>
            <div className="flex items-center gap-3 mb-1">
               <div className="p-2 bg-slate-900 text-white rounded-xl shadow-lg">
                  <ShieldCheck size={20} />
               </div>
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">资产审计工作台</h2>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Global Asset Quality & Value Assurance</p>
         </div>

         <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
               <input 
                 type="text" 
                 placeholder="搜索资产标题或作者..."
                 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-1.5xl text-xs font-bold outline-none focus:ring-4 focus:ring-theme/5 transition-all"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
               <Search size={14} className="absolute left-4 top-3.5 text-slate-400" />
            </div>
         </div>
      </div>

      {/* 2. List Control */}
      <div className="px-8 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30 shrink-0">
         <div className="flex gap-8">
            {[
              { id: 'pending', label: '待审计任务', count: submissions.filter(s => s.status === 'pending').length },
              { id: 'accepted', label: '已准入库', count: submissions.filter(s => s.status === 'accepted').length },
              { id: 'all', label: '全部历史', count: submissions.length }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setFilterStatus(tab.id as any)}
                className={`pb-3 text-xs font-black uppercase tracking-widest transition-all relative ${filterStatus === tab.id ? 'text-theme' : 'text-slate-400 hover:text-slate-600'}`}
              >
                 {tab.label}
                 <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[9px] ${filterStatus === tab.id ? 'bg-theme text-white' : 'bg-slate-200 text-slate-500'}`}>
                   {tab.count}
                 </span>
                 {filterStatus === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-theme rounded-full"></div>}
              </button>
            ))}
         </div>
         <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Clock size={12} /> 平均审计耗时: 14h
         </div>
      </div>

      {/* 3. Task List */}
      <div className="flex-1 overflow-y-auto custom-scroll p-8">
         {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
               <Loader2 size={40} className="animate-spin text-theme" />
               <span className="text-[10px] font-black uppercase text-slate-400">正在同步评审队列...</span>
            </div>
         ) : filteredSubmissions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 max-w-5xl mx-auto">
               {filteredSubmissions.map(sub => (
                  <div key={sub.id} className="group flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl transition-all border-l-4 border-l-transparent hover:border-l-theme">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                           {sub.coverImage ? <img src={sub.coverImage} className="w-full h-full object-cover" /> : <Terminal className="text-slate-300" size={24} />}
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                             {sub.title}
                             {sub.pointsPerCopy > 80 && <Zap size={14} className="text-amber-500 fill-amber-500" />}
                           </h4>
                           <div className="flex items-center gap-4 mt-1.5">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
                                <BadgeCheck size={12} className="text-theme" /> {sub.authorName}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub.industry} / {sub.category}</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-8">
                        <div className="text-right">
                           <div className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">预期价值指数</div>
                           <div className="text-lg font-black text-slate-900">{sub.pointsPerCopy} pts</div>
                        </div>
                        <button 
                          onClick={() => handleOpenReview(sub)}
                          className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black rounded-2xl hover:bg-theme transition-all shadow-xl active:scale-95 flex items-center gap-2 group-hover:translate-x-1"
                        >
                           进入资产审计 <Eye size={14} />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-300">
               <ShieldCheck size={64} strokeWidth={1} className="mb-4 opacity-20" />
               <p className="text-xs font-black uppercase tracking-widest">当前无待审计资产</p>
            </div>
         )}
      </div>

      {/* 4. Advanced Audit Workstation (Modal) */}
      {selectedItem && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setSelectedItem(null)}></div>
            
            <div className="relative w-[96%] h-[92vh] bg-white rounded-[3.5rem] shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-500">
               
               {/* Left: Component Intelligence Center */}
               <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden relative">
                  
                  {/* Top Bar */}
                  <div className="h-20 border-b border-slate-200 bg-white px-10 flex items-center justify-between shrink-0">
                     <div className="flex items-center gap-6">
                        <div className="p-3 bg-indigo-50 text-theme rounded-2xl">
                           <Layout size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-slate-900 tracking-tight">{selectedItem.title}</h3>
                           <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                 <Fingerprint size={12} className="text-theme" /> ID: {selectedItem.id}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                 {selectedItem.templateType === 'vue' ? <FileJson size={12} /> : <FileCode size={12} />} {selectedItem.templateType.toUpperCase()} Engine
                              </span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                        <button 
                          onClick={() => setPreviewMode('desktop')}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black transition-all ${previewMode === 'desktop' ? 'bg-white shadow-sm text-theme' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          <Monitor size={14} /> Desktop
                        </button>
                        <button 
                          onClick={() => setPreviewMode('mobile')}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black transition-all ${previewMode === 'mobile' ? 'bg-white shadow-sm text-theme' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          <Smartphone size={14} /> Mobile
                        </button>
                     </div>
                  </div>

                  {/* Canvas Area */}
                  <div className="flex-1 p-10 flex flex-col gap-6 overflow-hidden">
                     <div className={`flex-1 mx-auto bg-white rounded-[4rem] border border-slate-200 shadow-2xl transition-all duration-700 overflow-hidden relative ${previewMode === 'mobile' ? 'max-w-[400px]' : 'w-full'}`}>
                        <div className="absolute top-0 inset-x-0 h-10 bg-slate-50 border-b border-slate-100 flex items-center justify-center gap-1.5 px-4 pointer-events-none">
                           <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                           <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                           <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                           <div className="flex-1"></div>
                           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Sandboxed Live Component</span>
                        </div>
                        <iframe ref={iframeRef} className="w-full h-full pt-10 border-none" title="eval-preview" />
                     </div>

                     {/* Information Metadata Cards */}
                     <div className="grid grid-cols-4 gap-4 shrink-0">
                        {[
                           { label: '所属行业', val: selectedItem.industry, icon: Info },
                           { label: '功能分类', val: selectedItem.category, icon: Zap },
                           { label: '应用场景', val: selectedItem.scenario || '未定义', icon: Layout },
                           { label: '视觉调性', val: selectedItem.tone || '标准', icon: Palette }
                        ].map((meta, i) => (
                           <div key={i} className="p-4 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-4">
                              <div className="p-2.5 bg-slate-50 text-slate-400 rounded-xl"><meta.icon size={16} /></div>
                              <div>
                                 <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{meta.label}</div>
                                 <div className="text-xs font-black text-slate-900 uppercase">{meta.val}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Right: Audit Panel */}
               <div className="w-[480px] border-l border-slate-100 flex flex-col bg-white overflow-hidden shrink-0">
                  <div className="p-10 overflow-y-auto custom-scroll flex-1 space-y-10">
                     
                     {/* 1. Value Estimation Dashboard */}
                     <div className="p-10 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 group-hover:scale-125 transition-transform duration-1000">
                           <ShieldAlert size={140} />
                        </div>
                        <div className="relative z-10">
                           <span className="text-[10px] font-black text-theme uppercase tracking-[0.3em] mb-4 block text-center">资产质量加权值</span>
                           <div className="text-7xl font-black text-center mb-6 tracking-tighter tabular-nums">{metrics.finalScore}</div>
                           <div className="flex items-center gap-6 pt-8 border-t border-white/10">
                              <div className="flex-1 text-center">
                                 <div className="text-[9px] text-slate-500 font-black uppercase mb-1">市场调节系数</div>
                                 <div className="text-xl font-black text-emerald-400">x{metrics.qualityFactor}</div>
                              </div>
                              <div className="w-px h-10 bg-white/10"></div>
                              <div className="flex-1 text-center">
                                 <div className="text-[9px] text-slate-500 font-black uppercase mb-1">建议准入积分</div>
                                 <div className="text-xl font-black text-theme">{metrics.estimatedPrice} <span className="text-[10px] opacity-40">pts</span></div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* 2. Audit Checklist */}
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">审计必核清单 (COMPLIANCE)</label>
                        <div className="grid grid-cols-2 gap-3">
                           {[
                              { id: 'accessibility', label: '无障碍兼容' },
                              { id: 'performance', label: '代码执行效能' },
                              { id: 'security', label: '依赖安全性' },
                              { id: 'docReady', label: '文档描述完备' }
                           ].map(item => (
                              <button 
                                key={item.id}
                                onClick={() => setChecklist({ ...checklist, [item.id]: !(checklist as any)[item.id] })}
                                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${ (checklist as any)[item.id] ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-400' }`}
                              >
                                 <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${ (checklist as any)[item.id] ? 'bg-emerald-500 text-white' : 'bg-slate-200' }`}>
                                    <Check size={12} strokeWidth={4} />
                                 </div>
                                 <span className="text-[11px] font-black">{item.label}</span>
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* 3. Scoring Sliders */}
                     <div className="space-y-8">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block ml-1">多维主观评分 (SCORING)</label>
                        <div className="space-y-8">
                           {[
                              { id: 'design', label: 'Design (25%)', desc: '美感与原子化规范', icon: Palette, color: 'text-rose-500', bg: 'bg-rose-50' },
                              { id: 'code', label: 'Code (30%)', desc: '结构优雅与解耦', icon: FileCode, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                              { id: 'usability', label: 'Usability (25%)', desc: '组件易用性与复用', icon: HandMetal, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                              { id: 'innovation', label: 'Innovation (20%)', desc: '技术思路领先性', icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-50' }
                           ].map(dim => (
                              <div key={dim.id} className="space-y-4">
                                 <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                       <div className={`p-2.5 ${dim.bg} ${dim.color} rounded-xl`}><dim.icon size={18} /></div>
                                       <div>
                                          <div className="text-xs font-black text-slate-900">{dim.label}</div>
                                          <div className="text-[9px] text-slate-400 font-bold uppercase">{dim.desc}</div>
                                       </div>
                                    </div>
                                    <div className="text-xl font-black text-slate-900 tabular-nums">{(scores as any)[dim.id].toFixed(1)}</div>
                                 </div>
                                 <input 
                                   type="range" min="0" max="10" step="0.1" 
                                   value={(scores as any)[dim.id]} 
                                   onChange={e => setScores({ ...scores, [dim.id]: parseFloat(e.target.value) })}
                                   className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-slate-900 bg-slate-100`}
                                 />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Final Actions */}
                  <div className="p-8 border-t border-slate-100 bg-white space-y-4 shrink-0 shadow-[0_-20px_40px_-10px_rgba(0,0,0,0.02)]">
                     <div className="flex items-center justify-between px-2 mb-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">调整最终定价基准</span>
                        <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                           <button onClick={() => setBasePrice(Math.max(10, basePrice - 10))} className="w-8 h-8 rounded-lg hover:bg-white hover:shadow-sm text-slate-400 transition-all font-black">-</button>
                           <span className="text-xs font-black text-slate-900 w-8 text-center">{basePrice}</span>
                           <button onClick={() => setBasePrice(basePrice + 10)} className="w-8 h-8 rounded-lg hover:bg-white hover:shadow-sm text-slate-400 transition-all font-black">+</button>
                        </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="relative group flex-1">
                           <button 
                             disabled={isSubmitting}
                             onClick={() => handleReviewAction('accepted')}
                             className="w-full h-14 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 active:scale-95"
                           >
                              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={18} />}
                              准入并上线
                           </button>
                        </div>
                        
                        <div className="flex-1 group/reject relative">
                           <button 
                             onClick={() => setIsSubmitting(true)} // 模拟点击弹出拒绝层
                             className="w-full h-14 bg-white border-2 border-rose-100 text-rose-500 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-rose-50 hover:border-rose-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                           >
                              <XCircle size={18} /> 驳回投稿
                           </button>
                           
                           {/* Rejection Reasons Popover (Simplified implementation) */}
                           {isSubmitting && status !== 'accepted' && (
                              <div className="absolute bottom-full left-0 right-0 mb-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-2">
                                 <h5 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">驳回反馈 (REQUIRED)</h5>
                                 <textarea 
                                   value={rejectReason}
                                   onChange={e => setRejectReason(e.target.value)}
                                   placeholder="请详细描述改进建议..."
                                   className="w-full h-28 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] outline-none focus:ring-4 focus:ring-rose-50 resize-none"
                                 />
                                 <div className="flex gap-2 mt-4">
                                    <button onClick={() => setIsSubmitting(false)} className="flex-1 py-2 text-[10px] font-black text-slate-400 uppercase">取消</button>
                                    <button onClick={() => handleReviewAction('rejected')} className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase">确认驳回</button>
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Moderate;
