
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { componentService } from '../services/api';
import { ComponentSubmission } from '../types';
import { 
  ArrowLeft, Copy, Check, Lock, Unlock, 
  Coins, TrendingUp, Download, Eye, 
  Sparkles, Code2, HeartPulse, ShieldCheck, 
  X, ExternalLink, Box, Terminal, Zap, Trophy,
  AlertCircle, Loader2, BadgeCheck, ChevronRight
} from 'lucide-react';

const ComponentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [component, setComponent] = useState<ComponentSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userPoints, setUserPoints] = useState(2500); // 模拟用户积分
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (id) {
      // 检查本地存储中是否存在解锁记录
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

    // 模拟真实的积分抵扣与授权签名过程
    setTimeout(() => {
      setUserPoints(prev => prev - component.pointsPerCopy);
      setIsUnlocked(true);
      setIsUnlocking(false);
      setShowSuccessToast(true);
      
      // 持久化解锁记录
      const unlockedIds = JSON.parse(localStorage.getItem('devfront_unlocked_ids') || '[]');
      if (!unlockedIds.includes(component.id)) {
        localStorage.setItem('devfront_unlocked_ids', JSON.stringify([...unlockedIds, component.id]));
      }

      // 更新组件统计表现
      setComponent(prev => prev ? {
        ...prev, 
        copyCount: prev.copyCount + 1,
        totalPointsEarned: prev.totalPointsEarned + prev.pointsPerCopy
      } : null);

      // 3秒后自动隐藏成功提示
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
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">正在载入数字资产...</span>
       </div>
    </div>
  );

  if (!component) return <div className="p-20 text-center font-bold text-slate-400">资产已失效或未找到。</div>;

  const isLowBalance = userPoints < component.pointsPerCopy;

  return (
    <div className="bg-white min-h-screen selection:bg-theme/10 selection:text-theme">
      
      {/* 成功提示 Toast */}
      {showSuccessToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="px-6 py-4 bg-emerald-600 text-white rounded-2xl shadow-2xl flex items-center gap-3">
              <BadgeCheck className="text-emerald-200" size={20} />
              <div className="flex flex-col">
                 <span className="text-sm font-black tracking-tight">资产解锁成功</span>
                 <span className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">已划扣 {component.pointsPerCopy} 积分，获得永久代码授权。</span>
              </div>
           </div>
        </div>
      )}

      {/* 顶部导航 */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <button 
          onClick={() => navigate('/components')}
          className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-theme hover:text-white transition-all shadow-sm flex items-center gap-2 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">返回资产大厅</span>
        </button>
        
        <div className="flex items-center gap-4">
           {isUnlocked && (
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 animate-in zoom-in">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">已获得永久授权</span>
             </div>
           )}
           <div className="flex items-center gap-3 px-5 py-2.5 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm transition-all hover:scale-105">
              <Coins size={18} className="text-amber-500 animate-bounce" />
              <div className="flex flex-col leading-none">
                 <span className="text-[9px] text-amber-600 font-black uppercase tracking-tighter mb-0.5">我的积分余额</span>
                 <span className="text-sm font-black text-amber-900 tabular-nums">{userPoints.toLocaleString()}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 mt-4">
        
        {/* 左侧：内容主区 */}
        <div className="lg:col-span-8 space-y-10 animate-in fade-in duration-700">
           
           {/* 1. 标题与头部 */}
           <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-theme/5 text-theme text-[10px] font-black rounded-lg border border-theme/10 uppercase tracking-widest">{component.industry}</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg border border-slate-200 uppercase tracking-widest">{component.category}</span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">{component.title}</h1>
              <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">{component.description}</p>
           </div>

           {/* 2. 预览区域 */}
           <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-2.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                   <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Live Prototype Sandbox</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <button onClick={updatePreview} className="text-[10px] font-black text-slate-400 hover:text-theme flex items-center gap-1.5 transition-colors uppercase tracking-widest">
                       <TrendingUp size={12} /> 刷新实时渲染
                    </button>
                 </div>
              </div>
              <div className="aspect-video bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] relative group">
                 <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:32px_32px]"></div>
                 <iframe ref={iframeRef} className="w-full h-full border-none relative z-10" title="sandbox" />
              </div>
           </div>

           {/* 3. 代码区 (核心解锁逻辑) */}
           <div className="space-y-5">
              <div className="flex items-center justify-between px-2">
                 <div className="flex items-center gap-2.5 text-slate-900">
                    <Terminal size={18} className="text-slate-400" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Source Implementation</span>
                 </div>
                 {isUnlocked && (
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-[11px] font-black rounded-xl shadow-xl hover:bg-black transition-all active:scale-95 group"
                    >
                      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="group-hover:rotate-12" />}
                      {copied ? '已成功复制源码' : '复制核心组件代码'}
                    </button>
                 )}
              </div>
              
              <div className="relative group overflow-hidden rounded-[2.5rem]">
                 {!isUnlocked && (
                    <div className="absolute inset-0 z-20 bg-slate-900/60 backdrop-blur-3xl flex flex-col items-center justify-center text-white p-12 text-center animate-in zoom-in duration-500">
                       <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-theme mb-8 border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                          {isUnlocking ? <Loader2 size={36} className="animate-spin" /> : <Lock size={36} />}
                       </div>
                       <h3 className="text-3xl font-black mb-4 tracking-tight">受版权保护的内容</h3>
                       <p className="text-slate-300 text-sm font-medium max-w-sm mb-10 leading-relaxed opacity-90">
                         该组件属于高级数字资产。解锁后，您将获得完整的源代码使用权及未来版本更新。
                       </p>
                       
                       <div className="flex flex-col gap-4 w-full max-w-xs">
                          <button 
                            disabled={isUnlocking || isLowBalance}
                            onClick={handleUnlock}
                            className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                              isLowBalance ? 'bg-slate-700/50 text-white/50 border border-white/5' : 'bg-theme text-white hover:bg-theme-dark shadow-theme/30'
                            }`}
                          >
                             {isUnlocking ? (
                               <>
                                 <Loader2 size={20} className="animate-spin" />
                                 正在划扣积分...
                               </>
                             ) : (
                               <>
                                 <Unlock size={20} /> 立即消耗 {component.pointsPerCopy} pts 解锁
                               </>
                             )}
                          </button>
                          
                          {isLowBalance && (
                            <div className="flex items-center justify-center gap-2 text-rose-300 animate-pulse">
                               <AlertCircle size={14} />
                               <span className="text-[10px] font-black uppercase">积分不足：还差 {component.pointsPerCopy - userPoints} pts</span>
                            </div>
                          )}
                       </div>
                    </div>
                 )}
                 <div className={`bg-[#0b0e14] p-12 overflow-hidden border border-slate-800 shadow-inner transition-all duration-1000 ease-in-out ${!isUnlocked ? 'grayscale blur-[3px] scale-[1.02]' : 'scale-100'}`}>
                    <div className="flex items-center gap-2 mb-8 opacity-20 select-none">
                       <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                       <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    </div>
                    <pre className="text-emerald-400 font-mono text-sm leading-[1.8] overflow-x-auto custom-scroll max-h-[600px] scroll-smooth">
                       {component.jsxCode}
                    </pre>
                 </div>
              </div>
           </div>
        </div>

        {/* 右侧：统计与作者面板 */}
        <div className="lg:col-span-4 space-y-8 h-fit lg:sticky lg:top-24">
           
           {/* 经济数据卡片 */}
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl group">
              <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 transition-transform group-hover:scale-125 duration-1000">
                 <Trophy size={140} />
              </div>
              <div className="relative z-10">
                 <div className="flex items-center gap-2 text-theme text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                    <TrendingUp size={14} /> Ecosystem Performance
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10 hover:bg-white/10 transition-colors">
                       <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <Download size={10} /> 已引用
                       </div>
                       <div className="text-3xl font-black text-white tabular-nums">
                          {component.copyCount} <span className="text-[9px] opacity-40 uppercase">次</span>
                       </div>
                    </div>
                    <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10 hover:bg-white/10 transition-colors">
                       <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <Eye size={10} /> 授权费
                       </div>
                       <div className="text-3xl font-black text-white tabular-nums">
                          {component.pointsPerCopy} <span className="text-[9px] opacity-40 uppercase">pts</span>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">资产总营收</span>
                          <span className="text-4xl font-black text-theme tracking-tighter tabular-nums">
                             {component.totalPointsEarned.toLocaleString()} <span className="text-xs uppercase opacity-40 ml-1">pts</span>
                          </span>
                       </div>
                       <div className="w-10 h-10 bg-theme/20 rounded-xl flex items-center justify-center text-theme border border-theme/20 animate-pulse">
                          <Sparkles size={18} />
                       </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
                       <div className="bg-theme h-full w-[72%] rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
                    </div>
                 </div>
              </div>
           </div>

           {/* 作者卡片 */}
           <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:border-slate-200 transition-all">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Artisan Profile</div>
              <div className="flex items-center gap-4 mb-8">
                 <div className="relative group">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${component.authorAvatar}`} 
                      className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[1.5rem] group-hover:scale-105 transition-transform" 
                      alt="author"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 bg-theme rounded-lg text-white shadow-lg ring-4 ring-white">
                       <ShieldCheck size={14} />
                    </div>
                 </div>
                 <div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight">{component.authorName}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-theme"></span>
                       <span className="text-[10px] font-black text-theme uppercase tracking-tight">Grandmaster Creator</span>
                    </div>
                 </div>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-8">
                该创作者是 DevFront 实验室的核心贡献者，其组件已被用于全球 40+ 关键业务系统中。
              </p>
              <button className="w-full py-3.5 border border-slate-200 rounded-2xl text-[11px] font-black text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2 group">
                 查看他的数字足迹 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>

           {/* 合规建议 */}
           <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100/50">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">商业及生产环境合规</label>
              <div className="space-y-4">
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-500 shrink-0 shadow-sm"><Box size={16} /></div>
                    <div>
                       <h6 className="text-[11px] font-black text-slate-900">MIT 衍生授权</h6>
                       <p className="text-[10px] text-slate-400 font-medium mt-0.5">允许在所有组织内部商业项目中使用并二次开发。</p>
                    </div>
                 </div>
                 <div className="p-4 bg-white/80 rounded-2xl border border-slate-200/50 flex gap-3">
                    <AlertCircle size={14} className="text-amber-500 shrink-0" />
                    <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                       注意：该组件依赖 Tailwind CSS v3.4+。在较低版本的样式框架中可能需要进行微量适配。
                    </p>
                 </div>
              </div>
           </div>

        </div>
      </div>
      
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ComponentDetail;
