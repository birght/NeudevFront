
import React, { useState } from 'react';
import { Search, FileText, Code, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';

const Documentation: React.FC = () => {
  const [activeItem, setActiveItem] = useState('Introduction');
  const [search, setSearch] = useState('');

  const sidebarItems = [
    { title: '入门指南', items: ['Introduction', 'Installation', 'Workflow'] },
    { title: '开发者手册', items: ['贡献指南', '代码规范', '命名建议'] },
    { title: '管理员手册', items: ['审核流程', '权限分配', '数据洞察'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-8">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="搜索文档..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl text-xs outline-none focus:ring-2 focus:ring-theme/20 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
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
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                          item === activeItem ? 'bg-theme/10 text-theme font-bold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {item}
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
      <article className="flex-grow max-w-4xl">
        {activeItem === 'Introduction' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Introduction</h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-10">
              DevFront 是一个专为组织内部设计的组件共建平台。我们致力于通过“共同维护”的方式，消除重复造轮子，沉淀最佳实践。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                 <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-theme mb-4">
                    <Code size={20} />
                 </div>
                 <h4 className="font-bold text-slate-900 mb-2">组件化沉淀</h4>
                 <p className="text-sm text-slate-500 leading-relaxed">每一个审核通过的组件都经过了严格的代码和无障碍测试。</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                 <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-500 mb-4">
                    <CheckCircle2 size={20} />
                 </div>
                 <h4 className="font-bold text-slate-900 mb-2">开箱即用</h4>
                 <p className="text-sm text-slate-500 leading-relaxed">一键复制代码或下载资产，完美适配组织现有的 Tailwind 基础设施。</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">核心工作流</h2>
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-theme text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h5 className="font-bold text-slate-900">选择模板并编码</h5>
                    <p className="text-sm text-slate-500 mt-1">在管理后台使用预设模板快速开始，并在实时环境中调整效果。</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-theme text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h5 className="font-bold text-slate-900">提交审核</h5>
                    <p className="text-sm text-slate-500 mt-1">填写组件说明和分类，提交后技术委员会将进行自动化与人工双重审计。</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-theme text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h5 className="font-bold text-slate-900">上线共享</h5>
                    <p className="text-sm text-slate-500 mt-1">审核通过后，组件将出现在“组件库”中，供全公司团队使用并累积您的贡献点数。</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeItem === 'Installation' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Installation</h1>
            <p className="text-lg text-slate-500 mb-8">要使用 DevFront 提供的组件，您需要确保本地项目已正确配置 Tailwind CSS 和 Lucide 图标库。</p>
            
            <div className="bg-slate-900 rounded-2xl p-6 mb-8">
               <div className="flex items-center gap-2 mb-4">
                  <Terminal className="text-slate-400" size={16} />
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Terminal</span>
               </div>
               <code className="text-emerald-400 font-mono text-sm">
                 npm install lucide-react clsx tailwind-merge
               </code>
            </div>

            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
               <AlertTriangle className="text-amber-500 shrink-0" size={24} />
               <div>
                  <h4 className="font-bold text-amber-900">版本提示</h4>
                  <p className="text-sm text-amber-800/80 mt-1">所有组件库代码均基于 Tailwind v3.0+。如果您项目使用的是更低版本，部分组合类可能无法生效。</p>
               </div>
            </div>
          </div>
        )}

        {activeItem !== 'Introduction' && activeItem !== 'Installation' && (
           <div className="flex flex-col items-center justify-center py-32 text-slate-400">
              <FileText size={48} className="mb-4 opacity-20" />
              <h3 className="text-xl font-bold text-slate-900">文档建设中</h3>
              <p className="mt-2">正在同步最新的内部规范文档...</p>
           </div>
        )}
      </article>
    </div>
  );
};

export default Documentation;
