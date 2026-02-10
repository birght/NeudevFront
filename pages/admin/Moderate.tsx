
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, Search, Filter, Clock, Eye, 
  CheckCircle2, XCircle, AlertCircle, X, Code2, 
  Trophy, Loader2, Terminal, Zap, ChevronDown,
  Palette, FileCode, HandMetal, Lightbulb, TrendingUp, Coins
} from 'lucide-react';
import { componentService } from '../../services/api';
import { ComponentSubmission, ScoreBreakdown } from '../../types';

const Moderate: React.FC = () => {
  const [submissions, setSubmissions] = useState<ComponentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'pending' | 'accepted' | 'rejected' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ComponentSubmission | null>(null);
  
  // 4D 评分状态
  const [scores, setScores] = useState<ScoreBreakdown>({
    design: 8.0,
    code: 8.0,
    usability: 8.0,
    innovation: 8.0
  });

  const [basePrice, setBasePrice] = useState(50);
  const [rejectReason, setRejectReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 计算最终得分与预估价格
  const calculateFinalMetrics = () => {
    const finalScore = (scores.design * 0.25) + (scores.code * 0.3) + (scores.usability * 0.25) + (scores.innovation * 0.2);
    // 质量系数 = clamp(score / 8, 0.7, 1.3)
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
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Evaluator Workspace & Pricing Engine</p>
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
         </div>
      </div>

      {/* 2. Tabs */}
      <div className="px-8 py-4 border-b border-slate-100 flex gap-8 shrink-0">
         {[
           { id: 'pending', label: '待评审', count: submissions.filter(s => s.status === 'pending').length },
           { id: 'accepted', label: '已上线', count: submissions.filter(s => s.status === 'accepted').length },
           { id: 'all', label: '全量库', count: submissions.length }
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

      {/* 3. List */}
      <div className="flex-1 overflow-y-auto custom-scroll">
         {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
               <Loader2 size={40} className="animate-spin text-theme" />
               <span className="text-[10px] font-black uppercase text-slate-400">正在载入评审队列...</span>
            </div>
         ) : (
            <div className="p-8 grid grid-cols-1 gap-4">
               {filteredSubmissions.map(sub => (
                  <div key={sub.id} className="group flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl transition-all">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden">
                           {sub.coverImage ? <img src={sub.coverImage} className="w-full h-full object-cover" /> : <Terminal className="text-slate-300" size={20} />}
                        </div>
                        <div>
                           <h4 className="text-sm font-black text-slate-900">{sub.title}</h4>
                           <div className="flex items-center gap-3 mt-1">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{sub.authorName}</span>
                              <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                              <span className="text-[9px] font-black text-theme uppercase tracking-widest">{sub.category}</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center gap-8">
                        {sub.score && (
                           <div className="text-right">
                              <div className="text-[9px] font-black text-slate-400 uppercase">Quality Score</div>
                              <div className="text-lg font-black text-slate-900">{sub.score}</div>
                           </div>
                        )}
                        <button 
                          onClick={() => handleOpenReview(sub)}
                          className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-xl hover:bg-theme transition-all shadow-lg active:scale-95 flex items-center gap-2"
                        >
                           <Eye size={14} /> 进入深度评审
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>

      {/* 4. Deep Review Workspace (Modal) */}
      {selectedItem && (
         <div className="fixed inset-0 z-[100] flex items-center justify-end animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)}></div>
            
            <div className="relative w-full max-w-6xl h-screen bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                  <div className="flex items-center gap-4">
                     <div className="p-2.5 bg-indigo-50 text-theme rounded-xl">
                        <Trophy size={20} />
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{selectedItem.title}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">多维价值评估模型 (Value Estimation Model)</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all">
                     <X size={20} />
                  </button>
               </div>

               <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                  {/* Left: Preview & Code */}
                  <div className="flex-grow p-8 bg-slate-50 flex flex-col gap-6 overflow-hidden">
                     <div className="flex-grow bg-white rounded-[3rem] border border-slate-200 shadow-xl overflow-hidden relative">
                        <iframe ref={iframeRef} className="w-full h-full border-none" title="eval-preview" />
                     </div>
                     <div className="h-40 bg-[#0b0e14] rounded-3xl p-6 border border-slate-800 relative">
                        <pre className="text-emerald-400 font-mono text-[10px] leading-relaxed h-full overflow-y-auto custom-scroll">
                           {selectedItem.jsxCode}
                        </pre>
                     </div>
                  </div>

                  {/* Right: Multi-D Scoring Panel */}
                  <div className="w-full lg:w-[400px] border-l border-slate-100 flex flex-col overflow-y-auto custom-scroll p-8 bg-white shrink-0">
                     
                     {/* Final Dashboard */}
                     <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white mb-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:scale-125 transition-transform">
                           <Zap size={100} />
                        </div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                           <span className="text-[10px] font-black text-theme uppercase tracking-[0.2em] mb-4">最终质量加权分</span>
                           <div className="text-6xl font-black mb-2 tracking-tighter tabular-nums">{metrics.finalScore}</div>
                           <div className="flex items-center gap-4 mt-4 w-full pt-6 border-t border-white/10">
                              <div className="flex-1">
                                 <div className="text-[9px] text-slate-400 font-black uppercase mb-1">价格系数</div>
                                 <div className="text-lg font-black text-emerald-400">x{metrics.qualityFactor}</div>
                              </div>
                              <div className="w-px h-8 bg-white/10"></div>
                              <div className="flex-1">
                                 <div className="text-[9px] text-slate-400 font-black uppercase mb-1">预估积分价格</div>
                                 <div className="text-lg font-black text-theme">{metrics.estimatedPrice} <span className="text-[10px] opacity-40">pts</span></div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Sliders */}
                     <div className="space-y-8">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">多维评审度量 (JUDGE PANEL)</label>
                        
                        {[
                           { id: 'design', label: 'Design (25%)', icon: Palette, color: 'text-rose-500', bg: 'bg-rose-50' },
                           { id: 'code', label: 'Code Quality (30%)', icon: FileCode, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                           { id: 'usability', label: 'Usability (25%)', icon: HandMetal, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                           { id: 'innovation', label: 'Innovation (20%)', icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-50' }
                        ].map(dim => (
                           <div key={dim.id} className="space-y-3">
                              <div className="flex justify-between items-end">
                                 <div className="flex items-center gap-2">
                                    <div className={`p-1.5 ${dim.bg} ${dim.color} rounded-lg`}><dim.icon size={14} /></div>
                                    <span className="text-xs font-black text-slate-900">{dim.label}</span>
                                 </div>
                                 <span className="text-sm font-black text-slate-900">{(scores as any)[dim.id]}</span>
                              </div>
                              <input 
                                type="range" min="0" max="10" step="0.5" 
                                value={(scores as any)[dim.id]} 
                                onChange={e => setScores({ ...scores, [dim.id]: parseFloat(e.target.value) })}
                                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-slate-900 bg-slate-100`}
                              />
                           </div>
                        ))}

                        <div className="pt-6 space-y-4">
                           <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <span>基准定价基数</span>
                              <div className="flex items-center gap-2">
                                 <button onClick={() => setBasePrice(Math.max(10, basePrice - 10))} className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">-</button>
                                 <span className="text-slate-900">{basePrice}</span>
                                 <button onClick={() => setBasePrice(basePrice + 10)} className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">+</button>
                              </div>
                           </div>
                           
                           <button 
                             disabled={isSubmitting}
                             onClick={() => handleReviewAction('accepted')}
                             className="w-full py-4 bg-emerald-600 text-white text-xs font-black rounded-2xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                           >
                              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                              确认定价并准入
                           </button>

                           <div className="pt-4 border-t border-slate-100">
                              <textarea 
                                value={rejectReason}
                                onChange={e => setRejectReason(e.target.value)}
                                placeholder="如果驳回，请填写详细理由..."
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-medium min-h-[80px] outline-none focus:ring-4 focus:ring-rose-50"
                              />
                              <button 
                                onClick={() => handleReviewAction('rejected')}
                                className="w-full py-3 mt-3 border border-rose-200 text-rose-600 text-[10px] font-black rounded-2xl hover:bg-rose-50 transition-all uppercase tracking-widest"
                              >
                                驳回投稿
                              </button>
                           </div>
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
