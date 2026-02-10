
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, RotateCcw, Info, Type, Tags, Globe, 
  Terminal, Sparkles, Beaker, ChevronDown, 
  CheckCircle2, X, Github, ExternalLink, 
  Lightbulb, FileJson, FileCode2, Zap, Cpu,
  Bold, Italic, List, AlignLeft, Package, Trash2,
  // Fix: Added missing Loader2 import
  Loader2
} from 'lucide-react';

const unifiedMetadataGroups = [
  {
    label: '业务行业 (Industries)',
    options: [
      { value: 'medical', label: '医疗健康' },
      { value: 'finance', label: '金融科技' },
      { value: 'traffic', label: '智慧交通' },
      { value: 'energy', label: '能源电力' },
      { value: 'reform', label: '政务发改' },
      { value: 'manufacturing', label: '智能制造' }
    ]
  },
  {
    label: '功能分类 (Categories)',
    options: [
      { value: 'Layout', label: '布局组件' },
      { value: 'Navigation', label: '导航系统' },
      { value: 'DataEntry', label: '数据录入' },
      { value: 'Display', label: '数据展示' },
      { value: 'Feedback', label: '反馈提示' },
      { value: 'Charts', label: '可视化图表' }
    ]
  }
];

const AdminContribute: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [envReady, setEnvReady] = useState(false);
  const [useElementPlus, setUseElementPlus] = useState(false);
  const [templateType, setTemplateType] = useState<'vue' | 'html'>('vue');
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [showAssetGuide, setShowAssetGuide] = useState(false);
  const [newDep, setNewDep] = useState('');
  
  const [form, setForm] = useState({
    title: '',
    description: '', 
    selectedTags: [] as string[], 
    jsxCode: '', 
    dependencies: [] as string[] // 远程依赖
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const richEditorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultVue = `<template>\n  <div class="p-8 text-center">\n    <iconify-icon icon="ph:cube-duotone" width="48" class="text-theme mx-auto mb-4"></iconify-icon>\n    <h3 class="font-black text-slate-900">Vue 3 远程依赖测试</h3>\n    <p class="text-sm text-slate-500 mt-2">试试在左侧添加 "canvas-confetti" 依赖并取消下面代码注释</p>\n  </div>\n</template>\n\n<script setup>\n// import confetti from 'canvas-confetti';\n// import { onMounted } from 'vue';\n// onMounted(() => { confetti(); });\n</script>`;
    const defaultHtml = `<div class="p-8">HTML Mode Ready</div>`;
    setForm(prev => ({ ...prev, jsxCode: templateType === 'vue' ? defaultVue : defaultHtml }));
  }, [templateType]);

  const addDependency = () => {
    if (!newDep || form.dependencies.includes(newDep)) return;
    setForm(prev => ({ ...prev, dependencies: [...prev.dependencies, newDep] }));
    setNewDep('');
  };

  const removeDependency = (dep: string) => {
    setForm(prev => ({ ...prev, dependencies: prev.dependencies.filter(d => d !== dep) }));
  };

  const buildPreviewSrcdoc = (code: string, deps: string[]) => {
    const codeBase64 = btoa(unescape(encodeURIComponent(code)));
    const elPlusScripts = useElementPlus ? `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus/dist/index.css">
      <script src="https://cdn.jsdelivr.net/npm/element-plus"></script>
    ` : '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader/dist/vue3-sfc-loader.js"></script>
          <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
          ${elPlusScripts}
          <style>body { margin: 0; padding: 48px; background: #f8fafc; display: flex; justify-content: center; min-height: 100vh; font-family: system-ui; }</style>
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
              // 关键：处理远程依赖模块
              async handleModule(type, name) {
                if (type === 'module') {
                  // 从 esm.sh 动态加载依赖，并将 vue 标记为外部依赖以使用我们环境中的同一个 Vue 实例
                  return import(\`https://esm.sh/\${name}?external=vue\`);
                }
              }
            };
            
            const app = Vue.createApp({
              components: { 'my-component': Vue.defineAsyncComponent(() => loadModule('/component.vue', options)) },
              template: '<my-component />'
            });
            ${useElementPlus ? 'app.use(ElementPlus);' : ''}
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
        iframeRef.current!.srcdoc = buildPreviewSrcdoc(form.jsxCode, form.dependencies);
        setEnvReady(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [form.jsxCode, form.dependencies, useElementPlus, templateType]);

  return (
    <div className="h-full flex flex-col lg:flex-row bg-white overflow-hidden">
      <div className="w-full lg:w-[420px] border-r border-slate-100 flex flex-col h-full bg-slate-50/10 overflow-hidden shrink-0">
        <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-theme rounded-xl flex items-center justify-center text-white shadow-lg"><Plus size={18} /></div>
             <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">创作实验室</h2>
          </div>
          <button onClick={() => window.location.reload()} className="text-[10px] font-black text-slate-400 hover:text-theme flex items-center gap-1 uppercase tracking-widest"><RotateCcw size={12} /> 重置</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
          {/* 基础信息 */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Info size={12} /> 组件名称</label>
              <input 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-theme/5 text-xs font-bold shadow-sm"
                placeholder="例如：3D 粒子流光地球" 
              />
            </div>
            
            {/* 远程依赖管理 (核心改进) */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Package size={12} /> 远程依赖库 (NPM)</label>
              <div className="flex gap-2">
                 <input 
                   value={newDep}
                   onChange={e => setNewDep(e.target.value)}
                   onKeyDown={e => e.key === 'Enter' && addDependency()}
                   className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none text-xs font-bold"
                   placeholder="输入包名如: three"
                 />
                 <button onClick={addDependency} className="px-4 bg-slate-900 text-white rounded-xl text-xs font-black">添加</button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                 {form.dependencies.map(dep => (
                   <div key={dep} className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-[10px] font-black text-indigo-600 flex items-center gap-2 animate-in zoom-in">
                      {dep} <X size={12} className="cursor-pointer hover:text-rose-500" onClick={() => removeDependency(dep)} />
                   </div>
                 ))}
                 {form.dependencies.length === 0 && <span className="text-[10px] text-slate-400 italic">暂无外部依赖，环境保持纯净。</span>}
              </div>
              <p className="text-[9px] text-slate-400 font-medium leading-relaxed mt-1">
                支持 ESM 加载。添加后在代码中通过 <code>import pkg from 'name'</code> 即可直接引用。
              </p>
            </div>
          </div>

          {/* 代码实现 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Terminal size={12} /> SFC 实现代码</label>
               <div className="flex gap-2">
                  <button onClick={() => setTemplateType('vue')} className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${templateType === 'vue' ? 'bg-theme text-white' : 'bg-slate-100 text-slate-400'}`}>Vue</button>
                  <button onClick={() => setTemplateType('html')} className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${templateType === 'html' ? 'bg-theme text-white' : 'bg-slate-100 text-slate-400'}`}>HTML</button>
               </div>
            </div>
            <textarea 
              value={form.jsxCode} 
              onChange={e => setForm({...form, jsxCode: e.target.value})} 
              spellCheck={false}
              className="w-full h-[350px] p-4 bg-[#0b0e14] text-emerald-400 font-mono text-[11px] rounded-2xl resize-none outline-none focus:ring-4 focus:ring-theme/20 transition-all leading-relaxed custom-scroll border border-slate-800"
            />
          </div>

          <button 
            onClick={() => { setLoading(true); setTimeout(() => navigate('/admin/my-items'), 1000); }}
            className="w-full py-4 bg-slate-900 text-white text-xs font-black rounded-2xl shadow-2xl hover:bg-theme transition-all flex items-center justify-center gap-2"
          >
             {loading ? '正在同步云端...' : '提交组件审计'} <Zap size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 flex flex-col relative overflow-hidden">
        <div className="h-14 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-10">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">沙盒预览模式</span>
              </div>
           </div>
           <div className="flex items-center gap-4">
              {form.dependencies.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-100 animate-in fade-in">
                   <Package size={12} />
                   <span className="text-[9px] font-black uppercase">依赖预热中...</span>
                </div>
              )}
           </div>
        </div>

        <div className="flex-1 p-12 flex flex-col relative overflow-hidden">
           <div className="flex-grow bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden relative z-10">
              {!envReady && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20">
                   <Loader2 className="animate-spin text-theme" size={32} />
                </div>
              )}
              <iframe ref={iframeRef} className="w-full h-full border-none" title="lab-preview" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContribute;
