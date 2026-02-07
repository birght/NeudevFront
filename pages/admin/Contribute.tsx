
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { componentService } from '../../services/api';
import { 
  Layout, Code2, MonitorPlay, Sparkles, Briefcase, 
  Settings2, Box, Info, Check, Copy, Terminal, 
  RotateCcw, Globe, Cpu, Zap, Beaker,
  Building2, HeartPulse, CarFront, Wallet, Scale, Radio, Factory, GraduationCap, 
  Monitor, Briefcase as HR, Stethoscope, Landmark, Leaf, ShieldAlert, ChevronLeft, ChevronRight
} from 'lucide-react';

const industries = [
  { key: 'reform', name: '发改', icon: Landmark, color: 'text-rose-700', bg: 'bg-rose-50' },
  { key: 'medical', name: '医疗健康', icon: HeartPulse, color: 'text-blue-500', bg: 'bg-blue-50' },
  { key: 'traffic', name: '交通', icon: CarFront, color: 'text-rose-500', bg: 'bg-rose-50' },
  { key: 'finance', name: '金融', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { key: 'tax', name: '财政税务', icon: Scale, color: 'text-emerald-700', bg: 'bg-emerald-50' },
  { key: 'telecom', name: '通信', icon: Radio, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { key: 'energy', name: '能源', icon: Factory, color: 'text-amber-500', bg: 'bg-amber-50' },
  { key: 'education', name: '教育', icon: GraduationCap, color: 'text-sky-500', bg: 'bg-sky-50' },
  { key: 'manufacturing', name: '制造', icon: Cpu, color: 'text-slate-600', bg: 'bg-slate-100' },
  { key: 'media', name: '媒体', icon: MonitorPlay, color: 'text-violet-500', bg: 'bg-violet-50' },
  { key: 'hr', name: '人社保障', icon: HR, color: 'text-blue-700', bg: 'bg-blue-50' },
  { key: 'med-insure', name: '医疗保障', icon: Stethoscope, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { key: 'eco', name: '环保', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
  { key: 'food-safety', name: '食药安全', icon: ShieldAlert, color: 'text-orange-600', bg: 'bg-orange-50' }
];

const categories = [
  { key: 'Layout', name: '布局' },
  { key: 'Navigation', name: '导航' },
  { key: 'Data Entry', name: '数据录入' },
  { key: 'Data Display', name: '数据展示' },
  { key: 'Feedback', name: '反馈' },
  { key: 'Overlay', name: '浮层' },
  { key: 'Media', name: '媒体' },
  { key: 'Charts & Visualization', name: '图表与可视化' },
  { key: 'Utilities', name: '工具' },
  { key: 'Advanced / Labs', name: '高级 / 实验室' }
];

const scenarios = [
  { key: 'admin', name: '管理后台' },
  { key: 'dashboard', name: '大屏可视化' },
  { key: 'app', name: '移动端应用' },
  { key: 'portal', name: '门户官网' }
];

const tones = [
  { key: 'standard', name: '国企稳重' },
  { key: 'modern', name: '互联网极简' },
  { key: 'dark-tech', name: '深色科技' }
];

const AdminContribute: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [envReady, setEnvReady] = useState(false);
  const [useElementPlus, setUseElementPlus] = useState(true);
  const [isConfigCollapsed, setIsConfigCollapsed] = useState(false);
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    jsxCode: `<template>
  <div class="p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
    <div class="flex items-center gap-4 mb-6">
       <el-icon class="text-indigo-600" :size="32">
          <iconify-icon icon="ph:rocket-launch-duotone"></iconify-icon>
       </el-icon>
       <h3 class="text-xl font-bold text-slate-900">DevFront 预览成功</h3>
    </div>
    
    <div class="space-y-4">
      <el-alert title="环境已就绪" type="success" :closable="false" show-icon />
      
      <div class="flex gap-2">
        <el-button type="primary">
          <iconify-icon icon="ph:user-bold" class="mr-1"></iconify-icon>
          个人中心
        </el-button>
        <el-button type="success" plain>
          <iconify-icon icon="tabler:settings" class="mr-1"></iconify-icon>
          设置项目
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>`,
    industry: 'reform',
    category: 'Layout',
    scenario: 'admin',
    tone: 'standard',
    templateType: 'vue' as 'vue' | 'html',
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const buildPreviewSrcdoc = (code: string) => {
    // 编码处理以防止特殊字符破坏 srcdoc 结构
    const codeBase64 = btoa(unescape(encodeURIComponent(code)));
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js"></script>
          <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
          ${useElementPlus ? `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus/dist/index.css">
            <script src="https://cdn.jsdelivr.net/npm/element-plus"></script>
          ` : ''}
          <style>
            body { 
              margin: 0; 
              padding: 24px; 
              background: #f8fafc; 
              display: flex; 
              justify-content: center; 
              align-items: flex-start; 
              min-height: 100vh;
              font-family: system-ui, -apple-system, sans-serif;
            }
            #app { width: 100%; display: flex; justify-content: center; }
          </style>
        </head>
        <body>
          <div id="app"></div>
          <script>
            const { loadModule } = window['vue3-sfc-loader'];
            const userCode = decodeURIComponent(escape(atob("${codeBase64}")));

            const options = {
              moduleCache: {
                vue: window.Vue
              },
              async getFile(url) {
                if (url === '/component.vue') return userCode;
              },
              addStyle(textContent) {
                const style = document.createElement('style');
                style.textContent = textContent;
                document.head.appendChild(style);
              },
            };

            const app = Vue.createApp({
              components: {
                'my-component': Vue.defineAsyncComponent(() => loadModule('/component.vue', options))
              },
              template: '<my-component />'
            });

            ${useElementPlus ? 'app.use(ElementPlus);' : ''}
            
            // 捕获渲染错误
            app.config.errorHandler = (err) => {
              console.error('Vue Render Error:', err);
              document.body.innerHTML = '<div style="color:red;padding:20px;font-family:mono;font-size:12px;">渲染错误: ' + err.message + '</div>';
            };

            app.mount('#app');
          </script>
        </body>
      </html>
    `;
  };

  useEffect(() => {
    if (iframeRef.current) {
      setEnvReady(false);
      const timer = setTimeout(() => {
        iframeRef.current!.srcdoc = buildPreviewSrcdoc(form.jsxCode);
        setEnvReady(true);
      }, 300); // 稍微缩短延迟，提升响应感
      return () => clearTimeout(timer);
    }
  }, [form.jsxCode, useElementPlus]);

  const handleSubmission = async () => {
    if(!form.title) return alert('请输入组件名称');
    setLoading(true);
    try {
      await componentService.createSubmission(form);
      alert('组件发布成功，请等待管理员审核！');
      navigate('/admin/my-items');
    } catch (err) {
      alert('提交异常，请稍后重试');
    } finally { setLoading(false); }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row bg-[#fbfcfd] overflow-hidden">
      
      {/* 左侧：配置面板 */}
      <div className={`transition-all duration-300 border-r border-slate-200 bg-white flex flex-col h-full overflow-hidden ${isConfigCollapsed ? 'w-12' : 'w-full lg:w-[280px]'}`}>
        <div className={`p-6 border-b border-slate-50 flex items-center justify-between ${isConfigCollapsed ? 'px-2' : ''}`}>
           {!isConfigCollapsed && (
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-theme rounded-xl flex items-center justify-center text-white shadow-lg shadow-theme/20">
                  <Box size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-black text-slate-900 tracking-tight">艺术品参数</h2>
                </div>
             </div>
           )}
           <button onClick={() => setIsConfigCollapsed(!isConfigCollapsed)} className="p-1 hover:bg-slate-50 rounded-lg text-slate-400">
              {isConfigCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
           </button>
        </div>

        {!isConfigCollapsed && (
          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scroll">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Info size={12} /> 1. 基本信息
              </label>
              <input 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-theme/5 focus:border-theme transition-all text-xs font-bold"
                placeholder="组件名称..." 
              />
            </div>

            <div className="space-y-3">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Zap size={12} /> 2. 增强框架
               </label>
               <button 
                 onClick={() => setUseElementPlus(!useElementPlus)}
                 className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${useElementPlus ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
               >
                  <div className="flex items-center gap-2">
                     <div className={`p-1.5 rounded-lg ${useElementPlus ? 'bg-white' : 'bg-slate-200'} shadow-sm`}>
                        <Globe size={14} />
                     </div>
                     <span className="text-[10px] font-black">Element Plus</span>
                  </div>
                  <div className={`w-8 h-4.5 rounded-full relative transition-colors ${useElementPlus ? 'bg-theme' : 'bg-slate-300'}`}>
                     <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-all ${useElementPlus ? 'left-4' : 'left-0.5'}`}></div>
                  </div>
               </button>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Building2 size={12} /> 3. 业务行业
              </label>
              <div className="grid grid-cols-2 gap-2">
                 {industries.map(ind => (
                   <button 
                     key={ind.key} 
                     onClick={() => setForm({...form, industry: ind.key})}
                     className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl text-[9px] font-bold border transition-all ${form.industry === ind.key ? `${ind.bg} ${ind.color} border-current shadow-sm` : 'bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100'}`}
                   >
                      <ind.icon size={12} /> {ind.name}
                   </button>
                 ))}
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-slate-100">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">功能分类</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold outline-none">
                     {categories.map(cat => <option key={cat.key} value={cat.key}>{cat.name}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">应用场景</label>
                  <select value={form.scenario} onChange={e => setForm({...form, scenario: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold outline-none">
                     {scenarios.map(sc => <option key={sc.key} value={sc.key}>{sc.name}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">视觉调性</label>
                  <select value={form.tone} onChange={e => setForm({...form, tone: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold outline-none">
                     {tones.map(t => <option key={t.key} value={t.key}>{t.name}</option>)}
                  </select>
               </div>
            </div>

            <button onClick={handleSubmission} disabled={loading || !form.title} className="w-full py-4 bg-slate-900 text-white text-xs font-black rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50">
               {loading ? '发布中...' : '提交作品'} <Zap size={14} />
            </button>
          </div>
        )}
      </div>

      {/* 中间：代码编辑器 */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-slate-200">
         <div className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
               <div className="p-1.5 bg-theme/5 text-theme rounded-lg"><Code2 size={16} /></div>
               <span className="text-xs font-black text-slate-900">代码实验室 (Vue SFC)</span>
            </div>
            <div className="flex gap-1">
               <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><RotateCcw size={14} /></button>
               <button onClick={() => { navigator.clipboard.writeText(form.jsxCode); alert('代码已复制'); }} className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><Copy size={14} /></button>
            </div>
         </div>

         <div className="bg-slate-900 py-2.5 px-6 flex items-center gap-6 overflow-x-auto shrink-0 scrollbar-hide">
            <div className="flex items-center gap-2 whitespace-nowrap">
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">ICON前缀:</span>
               <span className="px-1.5 py-0.5 bg-theme/20 text-theme rounded text-[9px] font-bold">ph:</span>
               <span className="px-1.5 py-0.5 bg-theme/20 text-theme rounded text-[9px] font-bold">tabler:</span>
            </div>
            <div className="h-3 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2 whitespace-nowrap">
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">推荐:</span>
               <span className="text-[9px] font-bold text-slate-400 hover:text-white cursor-pointer">&lt;el-button /&gt;</span>
               <span className="text-[9px] font-bold text-slate-400 hover:text-white cursor-pointer">&lt;el-card /&gt;</span>
            </div>
         </div>

         <div className="flex-1 relative bg-slate-950 overflow-hidden">
            <textarea 
              value={form.jsxCode} 
              onChange={e => setForm({...form, jsxCode: e.target.value})} 
              spellCheck={false}
              className="w-full h-full p-8 bg-transparent text-emerald-400 font-mono text-sm resize-none outline-none selection:bg-theme/30 selection:text-white custom-scroll leading-relaxed" 
            />
         </div>
      </div>

      {/* 右侧：预览面板 */}
      <div className={`transition-all duration-300 bg-slate-50 flex flex-col shrink-0 overflow-hidden ${isPreviewCollapsed ? 'w-12' : 'w-full lg:w-[380px]'}`}>
        <div className={`h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 ${isPreviewCollapsed ? 'px-2' : ''}`}>
           <button onClick={() => setIsPreviewCollapsed(!isPreviewCollapsed)} className="p-1 hover:bg-slate-50 rounded-lg text-slate-400">
              {isPreviewCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
           </button>
           {!isPreviewCollapsed && (
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-black text-slate-900 tracking-tight">预览终端</span>
             </div>
           )}
           {!isPreviewCollapsed && (
             <button onClick={() => { iframeRef.current!.srcdoc = buildPreviewSrcdoc(form.jsxCode); }} className="p-1 text-slate-400 hover:text-slate-900 transition-colors"><RotateCcw size={16} /></button>
           )}
        </div>

        {!isPreviewCollapsed && (
          <div className="flex-1 p-6 flex flex-col relative overflow-hidden">
             <div className="flex-grow bg-white rounded-[2rem] border border-slate-200/50 shadow-xl overflow-hidden relative z-10">
                {!envReady && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur flex flex-col items-center justify-center gap-4 z-20">
                     <div className="w-6 h-6 border-2 border-theme border-t-transparent rounded-full animate-spin"></div>
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">编译中...</span>
                  </div>
                )}
                <iframe ref={iframeRef} className="w-full h-full border-none" title="lab-preview" />
             </div>

             <div className="mt-6 p-5 bg-white rounded-2xl border border-slate-200/50 shadow-sm relative z-10 flex gap-3">
                <div className="p-2 bg-amber-50 text-amber-500 rounded-lg h-fit">
                   <Beaker size={16} />
                </div>
                <div>
                   <h5 className="text-xs font-black text-slate-900">预览说明</h5>
                   <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1">
                      支持 <b>Vue 3 SFC</b> 语法，自动注入 <b>Tailwind</b>、<b>Element Plus</b> 和 <b>Iconify</b>。
                   </p>
                </div>
             </div>
          </div>
        )}
      </div>
      
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default AdminContribute;
