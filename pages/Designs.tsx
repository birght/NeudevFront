
import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Boxes, 
  Sparkles, 
  Terminal, 
  Fingerprint,
  ArrowRight,
  Copy,
  Check,
  MousePointer2,
  BadgeCheck,
  Code2,
  Cpu,
  Package,
  FileCode,
  Image as ImageIcon,
  Cpu as ChipIcon,
  Box as CubeIcon
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { translations } from '../translations';

const Designs: React.FC = () => {
  const { lang, theme } = useSettings();
  const t = translations[lang];
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colorPalette = [
    { label: 'Brand Primary', hex: theme.main, desc: '用于核心动作与品牌强调' },
    { label: 'Deep Slate', hex: '#0f172a', desc: '用于核心排版与深度背景' },
    { label: 'Emerald Success', hex: '#10b981', desc: '用于审计通过与状态确认' },
    { label: 'Rose Error', hex: '#f43f5e', desc: '用于错误拦截与审计驳回' },
    { label: 'Amber Warning', hex: '#f59e0b', desc: '用于风险警告与积分消耗' },
    { label: 'Surface White', hex: '#ffffff', desc: '用于卡片背景与工作台画布' },
  ];

  return (
    <div className="bg-white min-h-screen selection:bg-theme/10 selection:text-theme">
      {/* 1. Hero Manifesto */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-theme/5 rounded-full blur-[120px] -z-10"></div>
         <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles size={16} className="text-theme" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Digital Craftsmanship Standard</span>
         </div>
         <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
           {t.designs.manifesto.title}
         </h1>
         <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed">
           {t.designs.manifesto.subtitle}
         </p>
      </section>

      {/* 2. Engineering Standards - 核心新增模块 */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-slate-950 rounded-[4rem] text-white overflow-hidden relative group">
         <div className="absolute top-0 right-0 p-24 opacity-5 -rotate-12 transition-transform group-hover:scale-110">
            <Code2 size={400} />
         </div>
         <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
               <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">{t.designs.tech.title}</h2>
                  <p className="text-slate-400 text-lg font-medium leading-relaxed">
                    DevFront 不仅关注视觉，更关注代码的“可维护主权”。我们强制要求所有入库组件遵循以下工程级协议。
                  </p>
               </div>
               <div className="flex gap-4">
                  <div className="px-6 py-3 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">ESM v2.0 Ready</div>
                  <div className="px-6 py-3 bg-theme/20 text-theme rounded-2xl text-[10px] font-black uppercase tracking-widest border border-theme/20">Audit Certified</div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {[
                 { 
                   id: 'naming', 
                   title: t.designs.tech.naming, 
                   desc: t.designs.tech.naming_desc, 
                   icon: Fingerprint, 
                   code: "Component Title: [Industry]-[Function]" 
                 },
                 { 
                   id: 'tailwind', 
                   title: t.designs.tech.tailwind, 
                   desc: t.designs.tech.tailwind_desc, 
                   icon: Package, 
                   code: "class='p-4 bg-slate-100 rounded-xl'" 
                 },
                 { 
                   id: 'iconify', 
                   title: t.designs.tech.iconify, 
                   desc: t.designs.tech.iconify_desc, 
                   icon: CubeIcon, 
                   code: "<iconify-icon icon='ph:cube' />" 
                 },
                 { 
                   id: 'element', 
                   title: t.designs.tech.element, 
                   desc: t.designs.tech.element_desc, 
                   icon: ChipIcon, 
                   code: "app.use(ElementPlus)" 
                 },
                 { 
                   id: 'assets', 
                   title: t.designs.tech.assets, 
                   desc: t.designs.tech.assets_desc, 
                   icon: ImageIcon, 
                   code: "import model from 'https://cdn...'" 
                 },
                 { 
                   id: 'dependency', 
                   title: '依赖隔离协议', 
                   desc: '利用 esm.sh 动态引入 NPM 包，禁止在局部代码中定义复杂的全局变量。', 
                   icon: Zap, 
                   code: "import confetti from 'canvas-confetti'" 
                 }
               ].map(tech => (
                 <div key={tech.id} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all group/card">
                    <div className="w-12 h-12 bg-theme/20 text-theme rounded-xl flex items-center justify-center mb-6">
                       <tech.icon size={24} />
                    </div>
                    <h4 className="text-lg font-black mb-3">{tech.title}</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6">{tech.desc}</p>
                    <div className="p-3 bg-black/40 rounded-xl font-mono text-[9px] text-emerald-400 border border-white/5 opacity-60 group-hover/card:opacity-100 transition-opacity">
                       {tech.code}
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 3. Asset DNA Matrix */}
      <section className="max-w-7xl mx-auto px-6 py-32">
         <div className="flex items-center gap-4 mb-16">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">{t.designs.dna.title}</h2>
            <div className="h-px bg-slate-100 flex-1"></div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'atomic', icon: Boxes, title: t.designs.dna.atomic, desc: t.designs.dna.atomic_desc, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { id: 'performant', icon: Zap, title: t.designs.dna.performant, desc: t.designs.dna.performant_desc, color: 'text-amber-500', bg: 'bg-amber-50' },
              { id: 'accessible', icon: MousePointer2, title: t.designs.dna.accessible, desc: t.designs.dna.accessible_desc, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { id: 'resilient', icon: ShieldCheck, title: t.designs.dna.resilient, desc: t.designs.dna.resilient_desc, color: 'text-rose-600', bg: 'bg-rose-50' }
            ].map(item => (
              <div key={item.id} className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500">
                 <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-6`}>
                    <item.icon size={28} />
                 </div>
                 <h4 className="text-lg font-black text-slate-900 mb-4">{item.title}</h4>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* 4. Color System Gallery */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-slate-50 rounded-[4rem] mb-20">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-md">
               <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">{t.designs.foundations.colors}</h2>
               <p className="text-slate-500 font-medium">采用语义化色彩模型，确保每个色值在不同行业资产中具备统一的行为预期。</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-900 shadow-sm hover:shadow-xl transition-all">
               下载配色方案 (ASE) <ArrowRight size={14} />
            </button>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {colorPalette.map(color => (
              <div key={color.hex} className="space-y-4">
                 <div 
                   onClick={() => copyToClipboard(color.hex)}
                   className="aspect-square rounded-[2rem] shadow-inner flex items-center justify-center cursor-pointer group relative overflow-hidden"
                   style={{ backgroundColor: color.hex }}
                 >
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       {copiedColor === color.hex ? <Check className="text-white" /> : <Copy className="text-white" size={24} />}
                    </div>
                 </div>
                 <div>
                    <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{color.label}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{color.hex}</div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 5. Typography Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row gap-20">
         <div className="lg:w-1/3">
            <div className="sticky top-32">
               <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">{t.designs.foundations.typography}</h2>
               <p className="text-slate-500 font-medium mb-8">
                 排版是信息的骨骼。DevFront 采用 <b>Inter</b> 变体，优化了数字资产在大屏看板与移动端应用中的可读性。
               </p>
               <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                     <Type size={120} />
                  </div>
                  <h4 className="text-6xl font-black italic tracking-tighter mb-2">Aa</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Font: Inter</p>
               </div>
            </div>
         </div>
         
         <div className="flex-1 space-y-12">
            {[
              { label: 'Display Hero', size: 'text-8xl', weight: 'font-black', desc: '用于头条标题，负间距 -0.05em' },
              { label: 'Header Section', size: 'text-4xl', weight: 'font-black', desc: '用于模块标题， tracking-tight' },
              { label: 'Body Lead', size: 'text-xl', weight: 'font-medium', desc: '用于导读文字，line-relaxed' },
              { label: 'Caption Label', size: 'text-[10px]', weight: 'font-black', desc: '用于标签、证章与元数据，uppercase tracking-[0.3em]' },
            ].map((typo, i) => (
              <div key={i} className="group border-b border-slate-100 pb-12 hover:translate-x-4 transition-transform duration-500">
                 <div className="flex justify-between items-end mb-4">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{typo.label}</span>
                 </div>
                 <div className={`${typo.size} ${typo.weight} text-slate-900 tracking-tighter`}>
                    The Art of Digital Engineering.
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 6. Compliance Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-40">
         <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-24 opacity-5 -rotate-12">
               <Fingerprint size={320} />
            </div>
            
            <div className="relative z-10 max-w-3xl">
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8">
                  <BadgeCheck size={18} className="text-theme" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Quality Assurance</span>
               </div>
               <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
                 准备好提交您的代码艺术品了吗？
               </h2>
               <p className="text-slate-400 text-xl font-medium mb-12">
                 通过“创作实验室”提交的每一项资产都将接受基于此规范的深度审计。
               </p>
               <div className="flex flex-col sm:flex-row gap-6">
                  <button className="px-10 py-5 bg-theme text-white font-black rounded-2xl shadow-2xl shadow-theme/30 hover:bg-theme-dark transition-all flex items-center justify-center gap-3">
                     进入实验室 <Zap size={20} />
                  </button>
                  <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all">
                     查阅审计细则
                  </button>
               </div>
            </div>
         </div>
      </section>

      <footer className="py-20 text-center border-t border-slate-50">
         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-4">
            <span>© 2024 DevFront Hub</span>
            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
            <span>Digital Assets v2.4.0</span>
            <span className="w-1 h-1 rounded-full bg-slate-200"></span>
            <span>Awwwards SOTD Runner</span>
         </div>
      </footer>
    </div>
  );
};

export default Designs;
