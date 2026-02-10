
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { componentService } from '../services/api';
import { ComponentSubmission } from '../types';
import { 
  ArrowLeft, Copy, Check, Lock, Unlock, 
  Coins, TrendingUp, Download, Eye, 
  Sparkles, Code2, HeartPulse, ShieldCheck, 
  X, ExternalLink, Box, Terminal, Zap, Trophy,
  AlertCircle, Loader2, BadgeCheck, ChevronRight, Package,
  Star, Quote, Fingerprint, ShieldAlert, Award, MousePointer2
} from 'lucide-react';

const ComponentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [component, setComponent] = useState<ComponentSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userPoints, setUserPoints] = useState(2500); 
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (id) {
      const unlockedIds = JSON.parse(localStorage.getItem('devfront_unlocked_ids') || '[]');
      if (unlockedIds.includes(Number(id))) {
        setIsUnlocked(true);
      }

      componentService.getComponentById(Number(id)).then(data => {
        setComponent(data);
        setLoading(false);
      });
    }
  }, [id]);

  const updatePreview = () => {
    if (!iframeRef.current || !component) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    const elPlusScripts = component.pointsPerCopy > 0 ? `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus/dist/index.css">
      <script src="https://cdn.jsdelivr.net/npm/element-plus"></script>
    ` : '';

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js"></script>
          <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
          ${elPlusScripts}
          <style>
            body { margin: 0; padding: 48px; background: transparent; display: flex; justify-content: center; min-height: 100vh; font-family: system-ui; }
            #app { width: 100%; display: flex; justify-content: center; }
          </style>
        </head>
        <body>
          <div id="app"></div>
          <script>
            const { loadModule } = window['vue3-sfc-loader'];
            const userCode = \`${component.jsxCode.replace(/`/g, '\\`')}\`;
            const options = {
              moduleCache: { vue: window.Vue },
              async getFile(url) { if (url === '/component.vue') return userCode; },
              addStyle(textContent) {
                const style = document.createElement('style');
                style.textContent = textContent;
                document.head.appendChild(style);
              },
              async handleModule(type, name) {
                if (type === 'module') {
                  return import(\`https://esm.sh/\${name}?external=vue\`);
                }
              }
            };
            const app = Vue.createApp({
              components: { 'my-component': Vue.defineAsyncComponent(() => loadModule('/component.vue', options)) },
              template: '<my-component />'
            });
            ${component.templateType === 'vue' ? 'app.mount("#app");' : 'document.getElementById("app").innerHTML = userCode;'}
          </script>
        </body>
      </html>
    `;
    doc.open(); doc.write(content); doc.close();
  };

  useEffect(() => {
    if (component) updatePreview();
  }, [component]);

  const handleUnlock = () => {
    if (!component) return;
    if (userPoints < component.pointsPerCopy) return;
    setIsUnlocking(true);
    setTimeout(() => {
      setUserPoints(prev => prev - component.pointsPerCopy);
      setIsUnlocked(true);
      setIsUnlocking(false);
      setShowSuccessToast(true);
      const unlockedIds = JSON.parse(localStorage.getItem('devfront_unlocked_ids') || '[]');
      if (!unlockedIds.includes(component.id)) {
        localStorage.setItem('devfront_unlocked_ids', JSON.stringify([...unlockedIds, component.id]));
      }
      setComponent(prev => prev ? {
        ...prev, 
        copyCount: prev.copyCount + 1,
        totalPointsEarned: prev.totalPointsEarned + prev.pointsPerCopy
      } : null);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }, 1500);
  };

  const handleCopy = () => {
    if (!isUnlocked) return;
    navigator.clipboard.writeText(component!.jsxCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
       <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-theme animate-spin" />
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">正在解析数字资产...</span>
       </div>
    </div>
  );

  if (!component) return <div className="p-20 text-center font-bold text-slate-400">资产已失效。</div>;

  return (
    <div className="bg-white min-h-screen selection:bg-theme/10 selection:text-theme">
      {showSuccessToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="px-6 py-4 bg-emerald-600 text-white rounded-2xl shadow-2xl flex items-center gap-3">
              <BadgeCheck className="text-emerald-200" size={20} />
              <span className="text-sm font-black tracking-tight">资产解锁成功，获得永久代码授权</span>
           </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <button onClick={() => navigate('/components')} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-theme hover:text-white transition-all shadow-sm flex items-center gap-2 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">返回资产大厅</span>
        </button>
        <div className="flex items-center gap-4">
           {isUnlocked && (
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">已授权</span>
             </div>
           )}
           <div className="flex items-center gap-3 px-5 py-2.5 bg-amber-50 rounded-2xl border border-amber-100">
              <Coins size={18} className="text-amber-500" />
              <span className="text-sm font-black text-amber-900 tabular-nums">{userPoints.toLocaleString()}</span>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 mt-4">
        <div className="lg:col-span-8 space-y-10 animate-in fade-in duration-700">
           <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-theme/5 text-theme text-[10px] font-black rounded-lg border border-theme/10 uppercase tracking-widest">{component.industry}</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg border border-slate-200 uppercase tracking-widest">{component.category}</span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">{component.title}</h1>
              <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">{component.description}</p>
           </div>

           {/* 渲染沙盒 */}
           <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-2.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Live Prototype</span>
                 </div>
              </div>
              <div className="aspect-video bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-2xl relative group">
                 <iframe ref={iframeRef} className="w-full h-full border-none relative z-10" title="sandbox" />
              </div>
           </div>

           {/* 依赖清单展示 */}
           {component.dependencies && component.dependencies.length > 0 && (
              <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Package size={14} /> 运行环境依赖 (NPM Packages)
                 </h4>
                 <div className="flex flex-wrap gap-3">
                    {component.dependencies.map(dep => (
                      <div key={dep} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm">
                         <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                         {dep}
                      </div>
                    ))}
                 </div>
              </div>
           )}

           {/* 代码解锁区域 */}
           <div className="space-y-5">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-2.5 text-slate-900">
                    <Terminal size={18} className="text-slate-400" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Source Implementation</span>
                 </div>
                 {isUnlocked && (
                    <button onClick={handleCopy} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-[11px] font-black rounded-xl shadow-xl active:scale-95 transition-all">
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copied ? '已复制' : '复制代码'}
                    </button>
                 )}
              </div>
              
              <div className="relative group overflow-hidden rounded-[2.5rem]">
                 {!isUnlocked && (
                    <div className="absolute inset-0 z-20 bg-slate-900/60 backdrop-blur-3xl flex flex-col items-center justify-center text-white p-12 text-center animate-in zoom-in duration-500">
                       <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-theme mb-8 border border-white/20">
                          {isUnlocking ? <Loader2 size={36} className="animate-spin" /> : <Lock size={36} />}
                       </div>
                       <h3 className="text-3xl font-black mb-4 tracking-tight">代码资产已锁定</h3>
                       <p className="text-slate-300 text-sm font-medium max-w-sm mb-10 opacity-90">解锁后即可获取完整源码、远程依赖配置及该作者的持续维护支持。</p>
                       <button 
                         disabled={isUnlocking || userPoints < component.pointsPerCopy}
                         onClick={handleUnlock}
                         className="px-10 py-5 bg-theme text-white rounded-2xl font-black shadow-2xl shadow-theme/30 active:scale-95 disabled:opacity-50"
                       >
                          {isUnlocking ? '正在扣除积分...' : `消耗 ${component.pointsPerCopy} pts 永久解锁`}
                       </button>
                    </div>
                 )}
                 <div className={`bg-[#0b0e14] p-12 overflow-hidden border border-slate-800 transition-all duration-1000 ${!isUnlocked ? 'grayscale blur-[4px]' : 'scale-100'}`}>
                    <pre className="text-emerald-400 font-mono text-sm leading-[1.8] overflow-x-auto custom-scroll max-h-[600px]">
                       {component.jsxCode}
                    </pre>
                 </div>
              </div>
           </div>

           {/* --- 参考 CSSDA 的专家评审信息区域 --- */}
           {component.status === 'accepted' && (
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 pt-16">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="h-px bg-slate-100 flex-1"></div>
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Expert Audit Verdict</h3>
                    <div className="h-px bg-slate-100 flex-1"></div>
                 </div>

                 <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    {/* 1. Score Breakdown (Left) */}
                    <div className="xl:col-span-5 bg-slate-900 text-white rounded-[3rem] p-10 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:scale-110 transition-transform duration-1000">
                          <Award size={180} />
                       </div>
                       
                       <div className="relative z-10 flex flex-col items-center text-center">
                          <span className="text-[10px] font-black text-theme uppercase tracking-widest mb-2">Overall Score</span>
                          <div className="text-8xl font-black tracking-tighter mb-8 tabular-nums">
                             {component.score?.toFixed(1) || 'N/A'}
                          </div>
                          
                          <div className="w-full space-y-5">
                             {[
                                { label: 'UI DESIGN', val: component.scoreBreakdown?.design || 8.5 },
                                { label: 'UX LOGIC', val: component.scoreBreakdown?.usability || 8.0 },
                                { label: 'CODE QUALITY', val: component.scoreBreakdown?.code || 9.0 },
                                { label: 'INNOVATION', val: component.scoreBreakdown?.innovation || 7.5 }
                             ].map((score, idx) => (
                                <div key={idx} className="space-y-2">
                                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                      <span className="text-slate-500">{score.label}</span>
                                      <span className="text-theme">{score.val.toFixed(1)}</span>
                                   </div>
                                   <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-theme transition-all duration-1000 delay-300" 
                                        style={{ width: `${score.val * 10}%` }}
                                      ></div>
                                   </div>
                                </div>
                             ))}
                          </div>

                          <div className="mt-10 pt-8 border-t border-white/5 w-full">
                             <div className="inline-flex items-center gap-2 px-4 py-2 bg-theme/20 text-theme border border-theme/20 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                                <BadgeCheck size={14} /> S-Tier Verified Asset
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* 2. Reviewer Endorsement (Right) */}
                    <div className="xl:col-span-7 flex flex-col gap-8">
                       <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] relative overflow-hidden flex-1">
                          <Quote className="absolute top-8 right-8 text-slate-200" size={48} />
                          
                          <div className="flex items-center gap-4 mb-8">
                             <img 
                               src="https://api.dicebear.com/7.x/avataaars/svg?seed=Federica" 
                               className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm"
                               alt="judge-avatar"
                             />
                             <div>
                                <h4 className="text-xl font-black text-slate-900 tracking-tight">Federica Gandolfo</h4>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                   <ShieldCheck size={12} className="text-theme" /> Senior Code Auditor
                                </div>
                             </div>
                          </div>

                          <p className="text-xl font-medium text-slate-600 leading-relaxed italic mb-8 relative z-10">
                             "该组件在视觉表达与工程健壮性之间取得了极佳的平衡。特别是在三维坐标映射的算法处理上，展现了超越常规外包组件的细腻感，是极具参考价值的优质资产。"
                          </p>

                          <div className="grid grid-cols-2 gap-4">
                             <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Zap size={14} /></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Zero Latency</span>
                             </div>
                             <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><MousePointer2 size={14} /></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">A11y Compliant</span>
                             </div>
                          </div>
                       </div>

                       <div className="p-8 border border-theme/20 bg-theme/5 rounded-[2.5rem] flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-theme shadow-sm">
                                <Fingerprint size={24} />
                             </div>
                             <div>
                                <h5 className="text-sm font-black text-slate-900">资产质量证明 (QoC)</h5>
                                <p className="text-[10px] text-slate-400 font-medium">已通过 14 项生产环境合规性检查。</p>
                             </div>
                          </div>
                          <button className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-theme transition-all">查看完整报告</button>
                       </div>
                    </div>
                 </div>
              </div>
           )}
        </div>

        {/* 右侧边栏 */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl group">
              <div className="relative z-10">
                 <div className="flex items-center gap-2 text-theme text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                    <TrendingUp size={14} /> Asset Performance
                 </div>
                 <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10">
                       <div className="text-[9px] text-slate-400 font-black uppercase mb-1.5 flex items-center gap-1.5"><Download size={10} /> 引用</div>
                       <div className="text-3xl font-black text-white">{component.copyCount}</div>
                    </div>
                    <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10">
                       <div className="text-[9px] text-slate-400 font-black uppercase mb-1.5 flex items-center gap-1.5"><Coins size={10} /> 营收</div>
                       <div className="text-2xl font-black text-theme">{component.totalPointsEarned}</div>
                    </div>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="bg-theme h-full w-[65%]"></div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${component.authorAvatar}`} className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl" alt="avatar" />
                 <div>
                    <h4 className="font-black text-slate-900">{component.authorName}</h4>
                    <span className="text-[10px] font-black text-theme uppercase">Grandmaster</span>
                 </div>
              </div>
              <button className="w-full py-3.5 border border-slate-200 rounded-2xl text-[11px] font-black text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                 查看他的数字足迹
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetail;
