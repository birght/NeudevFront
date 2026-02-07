
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, Map, Keyboard, Database, MessageSquare, Layers, PlaySquare, 
  BarChart3, Zap, FlaskConical, Search, Download, Sparkles, X, Copy, 
  Check, Maximize2, Briefcase, HeartPulse, Radio, 
  Factory, GraduationCap, Building2, ShieldCheck, Leaf, 
  Wallet, CarFront, MonitorPlay, Filter,
  Stethoscope, Landmark, Scale, ShieldAlert, Cpu, 
  Tags, LayoutGrid, Palette, ChevronRight, ChevronDown, ChevronUp, SlidersHorizontal, RotateCcw,
  // Fix: Added Coins import to resolve "Cannot find name 'Coins'" error on line 220
  Coins
} from 'lucide-react';
import { componentService } from '../services/api';

// 1. 行业维度
const industries = [
  { id: 'medical', name: '医疗健康', icon: HeartPulse, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'telecom', name: '通信', icon: Radio, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'energy', name: '能源', icon: Factory, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'finance', name: '金融', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'traffic', name: '交通', icon: CarFront, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'education', name: '教育', icon: GraduationCap, color: 'text-sky-500', bg: 'bg-sky-50' },
  { id: 'manufacturing', name: '制造', icon: Cpu, color: 'text-slate-600', bg: 'bg-slate-100' },
  { id: 'media', name: '媒体', icon: MonitorPlay, color: 'text-violet-500', bg: 'bg-violet-50' },
  { id: 'hr', name: '人社保障', icon: Briefcase, color: 'text-blue-700', bg: 'bg-blue-100/50' },
  { id: 'med-insure', name: '医疗保障', icon: Stethoscope, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { id: 'dev-reform', name: '发改', icon: Landmark, color: 'text-rose-700', bg: 'bg-rose-100/50' },
  { id: 'tax', name: '财政税务', icon: Scale, color: 'text-emerald-700', bg: 'bg-emerald-100/50' },
  { id: 'eco', name: '环保', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'food-safety', name: '食药安全', icon: ShieldAlert, color: 'text-orange-600', bg: 'bg-orange-50' }
];

// 2. 功能分类维度
const categories = [
  { id: 'all', name: '全部功能', icon: Sparkles },
  { id: 'Layout', name: '布局 (Layout)', icon: Layout },
  { id: 'Navigation', name: '导航 (Navigation)', icon: Map },
  { id: 'Data Entry', name: '录入 (Data Entry)', icon: Keyboard },
  { id: 'Data Display', name: '展示 (Data Display)', icon: Database },
  { id: 'Feedback', name: '反馈 (Feedback)', icon: MessageSquare },
  { id: 'Overlay', name: '遮罩 (Overlay)', icon: Layers },
  { id: 'Media', name: '媒体 (Media)', icon: MonitorPlay },
  { id: 'Charts & Visualization', name: '图表 (Charts)', icon: BarChart3 },
  { id: 'Utilities', name: '工具 (Utilities)', icon: Zap },
  { id: 'Advanced / Labs', name: '实验室 (Labs)', icon: FlaskConical }
];

// 3. 场景维度
const scenarios = [
  { id: 'all', name: '全部场景' },
  { id: 'admin', name: '管理后台' },
  { id: 'dashboard', name: '大屏可视化' },
  { id: 'app', name: '移动端应用' },
  { id: 'portal', name: '门户官网' }
];

// 4. 调性维度
const tones = [
  { id: 'all', name: '全部调性' },
  { id: 'standard', name: '国企稳重 (Corporate)' },
  { id: 'modern', name: '互联网极简 (Modern)' },
  { id: 'dark-tech', name: '深色科技 (Cyber)' }
];

const Components: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScenario, setSelectedScenario] = useState('all');
  const [selectedTone, setSelectedTone] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [components, setComponents] = useState<any[]>([]);

  useEffect(() => {
    // 实际项目中应从 API 加载，此处模拟
    componentService.listMySubmissions().then(setComponents);
  }, []);

  const activeAdvancedCount = [
    selectedCategory !== 'all',
    selectedScenario !== 'all',
    selectedTone !== 'all'
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedIndustry('all');
    setSelectedCategory('all');
    setSelectedScenario('all');
    setSelectedTone('all');
    setSearchQuery('');
  };

  const filteredComponents = components.filter(c => 
    (selectedIndustry === 'all' || c.industry === selectedIndustry) &&
    (selectedCategory === 'all' || c.category === selectedCategory) &&
    (selectedScenario === 'all' || c.scenario === selectedScenario) &&
    (selectedTone === 'all' || c.tone === selectedTone) &&
    (c.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-theme rounded-2xl shadow-xl shadow-theme/20 text-white">
              <LayoutGrid size={24} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">组件资产社区</h1>
          </div>
          <p className="text-slate-500 font-medium max-w-xl">
            沉淀全行业外包交付经验，打造“高审美、高性能、高复用”的内部设计语言系统。
          </p>
        </div>
        <div className="relative group w-full md:w-96">
          <input
            type="text"
            placeholder="在全行业解决方案中搜索..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-theme/10 transition-all outline-none font-bold text-sm shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-4 text-slate-400 group-focus-within:text-theme transition-colors" size={20} />
        </div>
      </div>

      {/* 筛选面板 (保留原有逻辑) */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-2xl shadow-slate-200/40 mb-12">
        <div className={isExpanded ? 'mb-10' : 'mb-0 transition-all'}>
          <div className="flex justify-between items-center mb-6">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <Briefcase size={12} /> 1. 业务行业 (Industry)
            </label>
            <div className="flex items-center gap-3">
               <button onClick={resetFilters} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-slate-400 hover:text-theme">
                 <RotateCcw size={12} /> 重置所有
               </button>
               <button 
                 onClick={() => setIsExpanded(!isExpanded)}
                 className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black transition-all border ${
                   isExpanded || activeAdvancedCount > 0 ? 'bg-theme/5 border-theme/20 text-theme' : 'bg-slate-50 border-slate-100 text-slate-500'
                 }`}
               >
                 <SlidersHorizontal size={12} />
                 {isExpanded ? '收起高级筛选' : '高级筛选'}
                 {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
               </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3">
             <button
               onClick={() => setSelectedIndustry('all')}
               className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${
                 selectedIndustry === 'all' ? 'bg-slate-900 text-white border-transparent shadow-lg' : 'bg-slate-50 text-slate-500 border-slate-100'
               }`}
             >
               全部行业
             </button>
             {industries.map((ind) => (
               <button
                 key={ind.id}
                 onClick={() => setSelectedIndustry(ind.id)}
                 className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${
                   selectedIndustry === ind.id ? `${ind.bg} ${ind.color} border-current shadow-md scale-105` : 'bg-white text-slate-500 border-slate-100'
                 }`}
               >
                 <ind.icon size={14} />
                 {ind.name}
               </button>
             ))}
          </div>
        </div>

        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="mb-10 pt-8 border-t border-slate-50">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-6 flex items-center gap-2">
                <Tags size={12} /> 2. 功能类别 (Category)
              </label>
              <div className="flex flex-wrap gap-2 md:gap-3">
                 {categories.map((cat) => (
                   <button
                     key={cat.id}
                     onClick={() => setSelectedCategory(cat.id)}
                     className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${
                       selectedCategory === cat.id ? 'bg-theme text-white shadow-lg' : 'bg-slate-50 text-slate-500'
                     }`}
                   >
                     <cat.icon size={14} />
                     {cat.name}
                   </button>
                 ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 列表区域 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredComponents.map((comp) => {
          const industryInfo = industries.find(i => i.id === comp.industry) || industries[0];
          return (
            <div 
              key={comp.id} 
              onClick={() => navigate(`/components/${comp.id}`)}
              className="group relative bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div className={`h-52 ${industryInfo.bg} flex items-center justify-center relative overflow-hidden transition-colors duration-700`}>
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
                <div className={`absolute inset-0 flex items-center justify-center ${industryInfo.color} opacity-[0.04] scale-[4] rotate-12 transition-transform duration-1000 group-hover:scale-[4.5]`}>
                   <industryInfo.icon size={64} />
                </div>
                <div className={`relative z-10 ${industryInfo.color} transition-all duration-700 group-hover:scale-110`}>
                   <industryInfo.icon size={56} strokeWidth={1.5} />
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full border border-white shadow-sm flex items-center gap-2">
                   <Coins size={10} className="text-amber-500" />
                   <span className="text-[10px] font-black text-slate-900">{comp.pointsPerCopy} pts</span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[9px] font-black text-theme uppercase bg-theme/10 px-3 py-1 rounded-full tracking-widest">{comp.category}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-theme transition-colors tracking-tight">{comp.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 font-medium">{comp.description}</p>
                
                <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">授权数: {comp.copyCount}</span>
                  </div>
                  <button className="text-theme text-xs font-black flex items-center gap-1 uppercase tracking-widest group/btn">
                    进入详情 <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Components;
