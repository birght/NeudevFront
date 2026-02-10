
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, RotateCcw, Info, Type, Tags, Globe, 
  Terminal, Sparkles, Beaker, ChevronDown, 
  CheckCircle2, X, Github, ExternalLink, 
  Lightbulb, FileJson, FileCode2, Zap, Cpu,
  Bold, Italic, List, AlignLeft
} from 'lucide-react';

// 全维度元数据定义
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
  },
  {
    label: '应用场景 (Scenarios)',
    options: [
      { value: 'admin', label: '管理后台' },
      { value: 'dashboard', label: '大屏可视化' },
      { value: 'app', label: '移动端应用' },
      { value: 'portal', label: '门户官网' }
    ]
  },
  {
    label: '视觉调性 (Tones)',
    options: [
      { value: 'standard', label: '国企稳重' },
      { value: 'modern', label: '互联网极简' },
      { value: 'dark-tech', label: '深色科技' }
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
  
  const [form, setForm] = useState({
    title: '',
    description: '', 
    selectedTags: [] as string[], 
    jsxCode: '', 
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const richEditorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultVue = `<template>\n  <div class="p-8 text-center">\n    <iconify-icon icon="ph:sketch-logo-duotone" width="48" class="text-theme mx-auto mb-4"></iconify-icon>\n    <h3 class="font-black text-slate-900">Vue 3 SFC 工程环境</h3>\n    <p class="text-sm text-slate-500 mt-2">支持 Tailwind CSS 与 10万+ Iconify 图标</p>\n    <el-button v-if="hasEl" type="primary" class="mt-6">已加载 Element Plus</el-button>\n  </div>\n</template>\n\n<script setup>\nimport { ref } from 'vue';\nconst hasEl = ref(${useElementPlus});\n</script>`;
    
    const defaultHtml = `<div class="p-8">\n  <div class="bg-slate-900 rounded-[2rem] p-12 text-center border border-white/10 shadow-2xl">\n    <iconify-icon icon="tabler:rocket" width="40" class="text-indigo-400 mb-4 animate-bounce"></iconify-icon>\n    <h2 class="text-white text-2xl font-black mb-4">HTML5 原生渲染模式</h2>\n    <p class="text-slate-400 text-sm mb-8">在这里你可以直接粘贴包含 &lt;script&gt; 标签的完整 HTML 代码。</p>\n    <button onclick="greet()" class="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:scale-105 transition-all">触发交互</button>\n  </div>\n</div>\n\n<script>\n  function greet() {\n    alert('Hello from Native HTML Sandbox!');\n  }\n</script>`;
    
    setForm(prev => ({ ...prev, jsxCode: templateType === 'vue' ? defaultVue : defaultHtml }));
  }, [templateType]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (richEditorRef.current) {
      setForm(prev => ({ ...prev, description: richEditorRef.current!.innerHTML }));
    }
  };

  const buildPreviewSrcdoc = (code: string) => {
    const codeBase64 = btoa(unescape(encodeURIComponent(code)));
    const elPlusScripts = useElementPlus ? `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus/dist/index.css">
      <script src="https://cdn.jsdelivr.net/npm/element-plus"></script>
    ` : '';

    if (templateType === 'vue') {
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
    } else {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
            ${elPlusScripts}
            <style>body { margin: 0; padding: 48px; background: #f8fafc; display: flex; justify-content: center; min-height: 100vh; font-family: system-ui; }</style>
          </head>
          <body>
            ${code}
          </body>
        </html>
      `;
    }
  };

  useEffect(() => {
    if (iframeRef.current) {
      setEnvReady(false);
      const timer = setTimeout(() => {
        iframeRef.current!.srcdoc = buildPreviewSrcdoc(form.jsxCode);
        setEnvReady(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [form.jsxCode, useElementPlus, templateType]);

  const toggleTag = (val: string) => {
    setForm(prev => {
      const exists = prev.selectedTags.includes(val);
      const next = exists ? prev.selectedTags.filter(t => t !== val) : [...prev.selectedTags, val];
      return { ...prev, selectedTags: next };
    });
  };

  return (
    <div className="h-full flex flex-col lg:flex-row bg-white overflow-hidden">
      
      {/* 左侧：增强配置面板 (420px 固定宽度) */}
      <div className="w-full lg:w-[420px] border-r border-slate-100 flex flex-col h-full bg-slate-50/10 overflow-hidden shrink-0">
        <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-theme rounded-xl flex items-center justify-center text-white shadow-lg">
                <Plus size={18} />
             </div>
             <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">创作实验室</h2>
          </div>
          <button onClick={() => window.location.reload()} className="text-[10px] font-black text-slate-400 hover:text-theme flex items-center gap-1 transition-colors uppercase tracking-widest">
             <RotateCcw size={12} /> 重置环境
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
          
          {/* 1. 基础配置：标题与类型 */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Info size={12} /> 组件名称
              </label>
              <input 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-theme/5 focus:border-theme transition-all text-xs font-bold shadow-sm"
                placeholder="例如：智慧水务实时监控看板" 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Cpu size={12} /> 渲染引擎类型
              </label>
              <div className="flex p-1 bg-slate-100 rounded-xl">
                 <button 
                  onClick={() => setTemplateType('vue')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black transition-all ${templateType === 'vue' ? 'bg-white shadow-sm text-theme' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   <FileJson size={14} /> Vue 3 SFC
                 </button>
                 <button 
                  onClick={() => setTemplateType('html')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black transition-all ${templateType === 'html' ? 'bg-white shadow-sm text-theme' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                   <FileCode2 size={14} /> HTML5 原生
                 </button>
              </div>
            </div>
          </div>

          {/* 2. 业务富文本描述 */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Type size={12} /> 业务价值说明
            </label>
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-4 focus-within:ring-theme/5 focus-within:border-theme transition-all">
               <div className="flex items-center gap-0.5 p-1 bg-slate-50 border-b border-slate-100">
                  <button onClick={() => execCommand('bold')} className="p-1.5 hover:bg-white rounded text-slate-500 hover:text-theme"><Bold size={14} /></button>
                  <button onClick={() => execCommand('insertUnorderedList')} className="p-1.5 hover:bg-white rounded text-slate-500 hover:text-theme"><List size={14} /></button>
                  <button onClick={() => execCommand('justifyLeft')} className="p-1.5 hover:bg-white rounded text-slate-500 hover:text-theme"><AlignLeft size={14} /></button>
               </div>
               {/* Fixed: Use data-placeholder instead of placeholder to avoid TS error on div */}
               <div 
                 ref={richEditorRef}
                 contentEditable 
                 onInput={() => setForm(prev => ({ ...prev, description: richEditorRef.current?.innerHTML || '' }))}
                 className="p-3 min-h-[80px] max-h-[100px] overflow-y-auto text-[11px] text-slate-600 outline-none leading-relaxed"
                 data-placeholder="描述组件解决的痛点及业务场景..."
               ></div>
            </div>
          </div>

          {/* 3. 分组全维度选择器 */}
          <div className="space-y-1.5 relative">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Tags size={12} /> 核心维度分类
            </label>
            <div 
              onClick={() => setShowTagSelector(!showTagSelector)}
              className={`min-h-[44px] w-full p-2 bg-white border rounded-xl flex flex-wrap gap-1.5 cursor-pointer transition-all ${showTagSelector ? 'border-theme ring-4 ring-theme/5' : 'border-slate-200 shadow-sm'}`}
            >
              {form.selectedTags.length === 0 ? (
                <span className="text-xs text-slate-400 px-2 py-1.5 font-medium">点击展开选择行业与场景...</span>
              ) : (
                form.selectedTags.map(val => {
                  const label = unifiedMetadataGroups.flatMap(g => g.options).find(o => o.value === val)?.label;
                  return (
                    <span key={val} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-theme/5 text-theme text-[10px] font-black rounded-lg border border-theme/20 animate-in zoom-in">
                      {label}
                      <X size={10} className="hover:text-rose-500" onClick={(e) => { e.stopPropagation(); toggleTag(val); }} />
                    </span>
                  );
                })
              )}
              <div className="ml-auto px-1 flex items-center text-slate-300">
                <ChevronDown size={14} className={`transition-transform duration-300 ${showTagSelector ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {showTagSelector && (
              <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 max-h-64 overflow-y-auto custom-scroll animate-in fade-in slide-in-from-top-2 duration-200">
                 {unifiedMetadataGroups.map(group => (
                   <div key={group.label} className="mb-4 last:mb-0">
                      <div className="px-3 py-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 rounded-lg">{group.label}</div>
                      <div className="grid grid-cols-1 gap-0.5 mt-1">
                         {group.options.map(opt => (
                           <button 
                             key={opt.value}
                             onClick={() => toggleTag(opt.value)}
                             className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${form.selectedTags.includes(opt.value) ? 'bg-theme text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50'}`}
                           >
                              {opt.label}
                              {form.selectedTags.includes(opt.value) && <CheckCircle2 size={14} />}
                           </button>
                         ))}
                      </div>
                   </div>
                 ))}
              </div>
            )}
          </div>

          {/* 4. GitHub 资源引入指南 (核心新功能) */}
          <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm overflow-hidden border-l-4 border-l-indigo-500">
             <button 
               onClick={() => setShowAssetGuide(!showAssetGuide)}
               className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
             >
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center animate-pulse">
                      <Lightbulb size={18} />
                   </div>
                   <div>
                      <div className="text-[11px] font-black text-slate-900 tracking-tight uppercase">需要引入外部大文件?</div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">GLTF、大型 JS 或资源文件引入指南</div>
                   </div>
                </div>
                <ChevronDown size={14} className={`text-slate-300 transition-transform ${showAssetGuide ? 'rotate-180' : ''}`} />
             </button>
             
             {showAssetGuide && (
               <div className="p-4 pt-0 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="h-px bg-indigo-50"></div>
                  <div className="space-y-3">
                     <div className="flex gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">1</div>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                          将资源上传至 <b>GitHub 仓库</b>。
                        </p>
                     </div>
                     <div className="flex gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">2</div>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                          在文件详情页点击 <b>[Raw]</b> 按钮。
                        </p>
                     </div>
                     <div className="flex gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">3</div>
                        <p className="text-[10px] text-slate-600 leading-relaxed">
                          使用生成的 <b>raw.githubusercontent.com</b> 地址：
                        </p>
                     </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl relative group">
                     <div className="text-[9px] font-mono text-indigo-300 break-all leading-relaxed pr-6">
                        https://raw.githubusercontent.com/birght/3dbodyfiles/main/3dbody.gltf
                     </div>
                     <button className="absolute top-2 right-2 text-white/20 hover:text-white transition-colors">
                        <Github size={12} />
                     </button>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-theme/5 text-theme text-[9px] font-black rounded-lg border border-theme/10">
                     <CheckCircle2 size={12} />
                     RAW 链接支持跨域引用，非常适合 3D 模型渲染。
                  </div>
               </div>
             )}
          </div>

          {/* 5. 增强模式开关 */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-theme/30">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl transition-all ${useElementPlus ? 'bg-theme text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                <Globe size={18} />
              </div>
              <div>
                <div className="text-[11px] font-black text-slate-900 tracking-tight uppercase">Element Plus</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">开启后即可在代码中使用 el-xxx</div>
              </div>
            </div>
            <button 
              onClick={() => setUseElementPlus(!useElementPlus)}
              className={`w-9 h-5.5 rounded-full relative transition-all duration-300 ${useElementPlus ? 'bg-theme shadow-inner' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-0.75 w-4 h-4 bg-white rounded-full transition-all duration-300 ${useElementPlus ? 'left-4.25' : 'left-0.75'}`}></div>
            </button>
          </div>

          {/* 6. 紧凑型代码粘贴区 */}
          <div className="space-y-2 pb-4">
            <div className="flex items-center justify-between px-1">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Terminal size={12} /> SFC / HTML5 实现代码
               </label>
               <span className="text-[9px] font-black text-theme bg-theme/5 px-2 py-0.5 rounded border border-theme/20">LIVE EDITOR</span>
            </div>
            <div className="relative group">
               <textarea 
                 value={form.jsxCode} 
                 onChange={e => setForm({...form, jsxCode: e.target.value})} 
                 spellCheck={false}
                 className="w-full h-[220px] p-4 bg-[#0b0e14] text-emerald-400 font-mono text-[11px] rounded-2xl resize-none outline-none ring-offset-2 focus:ring-4 focus:ring-theme/20 transition-all leading-relaxed custom-scroll border border-slate-800 shadow-inner"
                 placeholder="在这里粘贴您的 Vue 3 SFC 代码或完整 HTML 源码..."
               />
               <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="px-2 py-1 bg-white/10 rounded-lg text-white/30 text-[9px] font-black uppercase flex items-center gap-2 backdrop-blur-md">
                     <ExternalLink size={10} /> Paste Ready
                  </div>
               </div>
            </div>
          </div>

          <button 
            onClick={() => { if(!form.title) return alert('请先命名您的作品'); setLoading(true); setTimeout(() => navigate('/admin/my-items'), 1000); }}
            className="w-full py-4.5 bg-slate-900 text-white text-xs font-black rounded-2xl shadow-2xl hover:bg-theme-dark transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
             {loading ? '正在处理代码资产...' : '发布到组件实验室'} 
             <Zap size={14} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>

      {/* 右侧：沉浸式预览画布 (2/3 宽度) */}
      <div className="flex-1 bg-slate-50 flex flex-col relative overflow-hidden">
        {/* 画布页眉 */}
        <div className="h-14 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0 relative z-10">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Sandboxed Prototype</span>
              </div>
              <div className="h-3 w-px bg-slate-200"></div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-tight border border-indigo-100/50">
                 <Sparkles size={10} /> {templateType.toUpperCase()} Engine
              </div>
           </div>
           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4 text-slate-400">
                 <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-black uppercase">Tailwind v3.4</span>
                 </div>
                 <div className="h-2 w-2 rounded-full bg-slate-200"></div>
                 <div className="flex items-center gap-1.5">
                    <span className="text-[8px] font-black uppercase">Iconify ph/tabler</span>
                 </div>
              </div>
              <button 
                onClick={() => { iframeRef.current!.srcdoc = buildPreviewSrcdoc(form.jsxCode); }} 
                className="p-2.5 text-slate-400 hover:text-theme hover:bg-theme/5 rounded-xl transition-all active:rotate-180 duration-500 shadow-sm bg-white border border-slate-100"
              >
                <RotateCcw size={18} />
              </button>
           </div>
        </div>

        {/* 预览主画布 */}
        <div className="flex-1 p-12 lg:p-16 flex flex-col relative overflow-hidden">
           <div className="flex-grow bg-white rounded-[4rem] border border-slate-200 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] overflow-hidden relative z-10">
              {!envReady && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20">
                   <div className="w-8 h-8 border-2 border-theme border-t-transparent rounded-full animate-spin"></div>
                   <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Environment Synchronizing...</div>
                </div>
              )}
              <iframe ref={iframeRef} className="w-full h-full border-none" title="lab-preview" />
           </div>

           {/* 浮动提示组件 */}
           <div className="absolute bottom-20 right-20 p-6 bg-slate-900/90 backdrop-blur rounded-[2.5rem] text-white shadow-2xl max-w-[320px] z-20 border border-white/10 animate-in slide-in-from-bottom-4 duration-700">
              <div className="flex gap-4">
                 <div className="p-3 bg-white/10 rounded-2xl h-fit">
                    <Beaker size={24} className="text-theme" />
                 </div>
                 <div>
                    <h5 className="text-sm font-black tracking-tight mb-1 flex items-center gap-2">
                       预览沙盒说明
                    </h5>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed opacity-80">
                       您可以在代码中使用任何 CDN JS 库。如果需要加载大型 3D 资产（如 .gltf），请务必参考左侧的 <b>GitHub RAW</b> 指引。
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      {/* Fixed: Updated CSS selector to use data-placeholder */}
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        [contentEditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default AdminContribute;
