
import React, { useState } from 'react';
import { 
  Layout, 
  Map, 
  SquarePen, 
  MessageSquare, 
  Database, 
  Search, 
  Download, 
  Code2, 
  Layers,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const categories = [
  { name: 'All', icon: Sparkles },
  { name: 'Layout', icon: Layout },
  { name: 'Navigation', icon: Map },
  { name: 'Forms', icon: SquarePen },
  { name: 'Feedback', icon: MessageSquare },
  { name: 'Data Display', icon: Database }
];

const Components: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useSettings();

  // Enhanced mock data with specific types
  const components = [
    { id: '1', name: 'Responsive Sidebar', category: 'Navigation', description: 'Collapsible navigation with nested menu support.', author: 'UI Core', downloads: 1420 },
    { id: '2', name: 'Smart Data Table', category: 'Data Display', description: 'Server-side pagination, sorting, and inline editing.', author: 'Data Team', downloads: 890 },
    { id: '3', name: 'Validation Form', category: 'Forms', description: 'Declarative form builder with built-in validation rules.', author: 'Frontend Dev', downloads: 2100 },
    { id: '4', name: 'Grid System', category: 'Layout', description: 'Flexible 12-column grid with custom breakpoints.', author: 'Style Guide', downloads: 540 },
    { id: '5', name: 'Status Toast', category: 'Feedback', description: 'Non-blocking notifications with automatic dismiss.', author: 'UX Hub', downloads: 1250 },
    { id: '6', name: 'Wizard Stepper', category: 'Navigation', description: 'Multi-step process tracker for complex workflows.', author: 'UI Core', downloads: 730 },
    { id: '7', name: 'Metric Card', category: 'Data Display', description: 'Information cards with sparkline integration.', author: 'Analytics', downloads: 910 },
    { id: '8', name: 'Upload Zone', category: 'Forms', description: 'Drag and drop file uploader with progress indicators.', author: 'Frontend Dev', downloads: 1600 },
    { id: '9', name: 'Skeleton Loader', category: 'Feedback', description: 'Content placeholders for smoother loading states.', author: 'Style Guide', downloads: 3200 },
  ];

  const filteredComponents = components.filter(c => 
    (selectedCategory === 'All' || c.category === selectedCategory) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCategoryIcon = (catName: string) => {
    const cat = categories.find(c => c.name === catName);
    const IconComp = cat ? cat.icon : Layers;
    return <IconComp size={48} strokeWidth={1.5} />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-theme/10 rounded-lg text-theme transition-colors">
                <Layers size={24} />
             </div>
             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">组件库</h1>
          </div>
          <p className="text-slate-500 max-w-lg">经过审计的、可直接用于生产环境的 UI 区块，助力快速搭建企业级应用。</p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <input
            type="text"
            placeholder="搜索组件 (e.g. Table, Form...)"
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-theme/10 focus:border-theme transition-all outline-none shadow-sm group-hover:border-slate-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-theme transition-colors" size={20} />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              selectedCategory === cat.name
                ? 'bg-theme text-white shadow-lg shadow-theme/30'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-theme hover:text-theme hover:shadow-md'
            }`}
          >
            <cat.icon size={16} />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredComponents.map((comp) => (
          <div key={comp.id} className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-2">
            <div className="h-48 bg-slate-50 flex items-center justify-center border-b border-slate-50 overflow-hidden relative">
              {/* Animated Background Decor */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-theme/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              </div>

              {/* Central Icon Representation */}
              <div className="text-slate-300 group-hover:text-theme transition-all duration-500 group-hover:scale-125 transform group-hover:animate-float">
                {getCategoryIcon(comp.category)}
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-extrabold text-theme uppercase bg-theme/5 px-2.5 py-1 rounded-full tracking-wider transition-colors">{comp.category}</span>
                <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-600 transition-colors">
                   <Download size={14} />
                   <span className="text-xs font-medium">{comp.downloads}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-theme transition-colors">{comp.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-8">{comp.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center space-x-2.5">
                   <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${comp.author}`} className="w-8 h-8 rounded-full bg-slate-100" alt="avatar" />
                   <span className="text-xs text-slate-600 font-semibold">{comp.author}</span>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-theme shadow-md hover:shadow-theme/40 transition-all">
                  <Code2 size={14} />
                  获取代码
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredComponents.length === 0 && (
        <div className="text-center py-32 flex flex-col items-center">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6 animate-pulse">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">未找到相关组件</h3>
          <p className="text-slate-500 mt-2">换个关键词试试，或者联系管理员提交新需求。</p>
        </div>
      )}
    </div>
  );
};

export default Components;
