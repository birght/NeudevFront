
import React, { useState } from 'react';
// Added missing import for useNavigate
import { useNavigate } from 'react-router-dom';
import { 
  Search, FileText, Code, CheckCircle2, AlertTriangle, 
  Terminal, Coins, Zap, Trophy, ShieldCheck, 
  ArrowRight, Heart, Share2, Rocket, Library
} from 'lucide-react';

const Documentation: React.FC = () => {
  // Moved navigate to the top of the component for better scope and to fix "cannot find name" error
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('Introduction');
  const [search, setSearch] = useState('');

  const sidebarItems = [
    { title: '平台概览', items: ['Introduction', 'PointSystem', 'Workflow'] },
    { title: '开发者手册', items: ['Contribution', 'StyleGuide', 'CopyPasteUsage'] },
    { title: '合规与审计', items: ['AuditProcess', 'License'] },
  ];

  const renderContent = () => {
    switch (activeItem) {
      case 'Introduction':
        return (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">欢迎来到 DevFront</h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-10 font-medium">
              DevFront 不仅仅是一个 UI 库，它是组织内部的 **代码资产交易所**。我们通过积分激励机制，鼓励开发者将高质量的业务组件、动效和布局转化为可复用的资产。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="p-8 bg-theme/5 rounded-[2.5rem] border border-theme/10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                    <Share2 size={80} />
                 </div>
                 <h4 className="font-black text-slate-900 mb-3 text-lg">共享即收益</h4>
                 <p className="text-sm text-slate-500 leading-relaxed font-medium">通过分享您的业务代码，换取全平台的高级资产访问权限。</p>
              </div>
              <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={80} />
                 </div>
                 <h4 className="font-black text-slate-900 mb-3 text-lg">生产级安全</h4>
                 <p className="text-sm text-slate-500 leading-relaxed font-medium">所有组件均通过内部安全审计与性能测试，支持直接 Copy 进生产环境。</p>
              </div>
            </div>
          </div>
        );

      case 'PointSystem':
        return (
          <div className="animate-in fade-in duration-500 space-y-10">
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">积分激励体系 (Economics)</h1>
            <p className="text-slate-500 font-medium">积分是 DevFront 生态的血液，用于衡量开发者的社区贡献度与资产价值。</p>
            
            <div className="space-y-6">
               <div className="flex gap-6 p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-amber-500 shadow-sm shrink-0">
                     <Coins size={32} />
                  </div>
                  <div>
                     <h4 className="text-xl font-black text-slate-900 mb-2">如何赚取积分？</h4>
                     <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                           <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                           <span><b>资产发布奖励：</b> 提交组件并通过审核，根据质量评分获得 100 - 500 pts。</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                           <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                           <span><b>被动版税收入：</b> 其他人每复制一次您的代码，您将获得该资产设定的全额积分奖励。</span>
                        </li>
                     </ul>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white">
                     <h5 className="text-xs font-black text-theme uppercase tracking-widest mb-4">积分用途</h5>
                     <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                           <span className="text-sm font-bold">解锁高级组件源码</span>
                           <span className="text-xs font-black px-2 py-1 bg-white/10 rounded">50 - 200 pts</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                           <span className="text-sm font-bold">定制化技术咨询</span>
                           <span className="text-xs font-black px-2 py-1 bg-white/10 rounded">500 pts+</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                           <span className="text-sm font-bold">年底组织绩效加分</span>
                           <span className="text-xs font-black px-2 py-1 bg-theme rounded text-white">Top 10% 自动触发</span>
                        </div>
                     </div>
                  </div>
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex flex-col justify-center">
                     <Trophy size={48} className="text-amber-400 mb-4" />
                     <h5 className="text-lg font-black text-slate-900 mb-2">荣誉等级</h5>
                     <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        您的总积分决定了您的“工匠等级”（青铜至大宗师）。高等级用户拥有更强大的审计投票权。
                     </p>
                  </div>
               </div>
            </div>
          </div>
        );

      case 'Contribution':
        return (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">贡献您的艺术代码</h1>
            <p className="text-lg text-slate-500 mb-10 font-medium leading-relaxed">
               在 DevFront 发布资产非常简单，我们为您提供了在线实验室环境。
            </p>

            <div className="space-y-8">
               <div className="flex gap-6">
                  <div className="w-12 h-12 bg-theme text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shrink-0">1</div>
                  <div className="pt-1">
                     <h4 className="text-xl font-black text-slate-900 mb-2">进入创作实验室</h4>
                     <p className="text-sm text-slate-500 leading-relaxed font-medium">在管理后台选择“创作新艺术品”。您可以选择 Vue 3 SFC 或原生 HTML 渲染引擎。</p>
                  </div>
               </div>
               <div className="flex gap-6">
                  <div className="w-12 h-12 bg-theme text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shrink-0">2</div>
                  <div className="pt-1">
                     <h4 className="text-xl font-black text-slate-900 mb-2">编写并调试</h4>
                     <p className="text-sm text-slate-500 leading-relaxed font-medium">您可以直接粘贴现有的业务代码。利用右侧的沙盒实时观察渲染效果。支持引入外部资源如 GLTF 模型或 CDN 库。</p>
                  </div>
               </div>
               <div className="flex gap-6">
                  <div className="w-12 h-12 bg-theme text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shrink-0">3</div>
                  <div className="pt-1">
                     <h4 className="text-xl font-black text-slate-900 mb-2">设定价值属性</h4>
                     <p className="text-sm text-slate-500 leading-relaxed font-medium">填写行业标签、功能分类，并设定您认为合理的“解锁积分”。</p>
                  </div>
               </div>
            </div>
            
            <div className="mt-12 p-8 bg-indigo-900 rounded-[2.5rem] text-white flex items-center justify-between">
               <div>
                  <h5 className="text-xl font-black tracking-tight">准备好分享您的第一个组件了吗？</h5>
                  <p className="text-indigo-300 text-sm mt-1">立即开启您的贡献之旅。</p>
               </div>
               <button onClick={() => navigate('/admin/contribute')} className="px-8 py-4 bg-white text-indigo-900 font-black rounded-2xl shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
                  立即前往实验室 <ArrowRight size={20} />
               </button>
            </div>
          </div>
        );

      case 'CopyPasteUsage':
        return (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Copy-Paste 使用模式</h1>
            <p className="text-lg text-slate-500 mb-8 font-medium">
               DevFront 目前采用 **“零安装成本”** 的直接交付模式。您不需要安装繁琐的 NPM 包，只需将代码复制到您的项目中。
            </p>
            
            <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] mb-10">
               <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Library size={16} /> 环境依赖项 (Dependencies)
               </h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center gap-3">
                     <div className="p-2 bg-sky-50 text-sky-600 rounded-lg"><Zap size={18} /></div>
                     <span className="text-xs font-bold text-slate-700">Tailwind CSS v3.0+</span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center gap-3">
                     <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><Heart size={18} /></div>
                     <span className="text-xs font-bold text-slate-700">Lucide React Icons</span>
                  </div>
               </div>
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-4">使用步骤</h2>
            <div className="bg-slate-900 rounded-[2.5rem] p-8 space-y-8">
               <div className="flex gap-4">
                  <div className="shrink-0 w-6 h-6 bg-theme rounded-full flex items-center justify-center text-[10px] font-bold text-white">01</div>
                  <p className="text-sm text-slate-300">浏览<b>组件库</b>，找到您满意的业务资产。</p>
               </div>
               <div className="flex gap-4">
                  <div className="shrink-0 w-6 h-6 bg-theme rounded-full flex items-center justify-center text-[10px] font-bold text-white">02</div>
                  <p className="text-sm text-slate-300">点击<b>“解锁预览”</b>。系统将验证您的积分余额并授予代码访问权。</p>
               </div>
               <div className="flex gap-4">
                  <div className="shrink-0 w-6 h-6 bg-theme rounded-full flex items-center justify-center text-[10px] font-bold text-white">03</div>
                  <p className="text-sm text-slate-300">点击<b>“复制代码”</b>，将其粘贴到您的项目对应的 `.vue` 或 `.tsx` 文件中。</p>
               </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <FileText size={48} className="mb-4 opacity-20" />
            <h3 className="text-xl font-black text-slate-900">文档模块正在同步</h3>
            <p className="mt-2 font-medium">由于文档库涉及全行业规范，系统正在从 Git 自动同步最新版本...</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-8">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="搜索文档规则..." 
              className="w-full pl-9 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-theme/10 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
          </div>

          <nav className="space-y-8">
            {sidebarItems.map((section) => (
              <div key={section.title}>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                   <FileText size={12} /> {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => setActiveItem(item)}
                        className={`w-full text-left text-sm px-4 py-2.5 rounded-xl transition-all font-bold ${
                          item === activeItem ? 'bg-theme text-white shadow-lg shadow-theme/20' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {item === 'Introduction' && '平台愿景'}
                        {item === 'PointSystem' && '积分与经济体系'}
                        {item === 'Workflow' && '协作工作流'}
                        {item === 'Contribution' && '组件贡献指南'}
                        {item === 'CopyPasteUsage' && '零成本集成指南'}
                        {item === 'StyleGuide' && '设计与代码规范'}
                        {item === 'AuditProcess' && '审计流程'}
                        {item === 'License' && '许可协议'}
                        {!['Introduction', 'PointSystem', 'Workflow', 'Contribution', 'CopyPasteUsage', 'StyleGuide', 'AuditProcess', 'License'].includes(item) && item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <article className="flex-grow max-w-4xl pb-20">
        {renderContent()}
      </article>
    </div>
  );
};

export default Documentation;
