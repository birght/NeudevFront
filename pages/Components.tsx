
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
  Coins, Unlock, BookmarkCheck
} from 'lucide-react';
import { componentService } from '../services/api';

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

const Components: React.FC = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [components, setComponents] = useState<any[]>([]);
  const [unlockedIds, setUnlockedIds] = useState<number[]>([]);
  const [showOnlyUnlocked, setShowOnlyUnlocked] = useState(false);

  useEffect(() => {
    componentService.listMySubmissions().then(setComponents);
    const savedIds = JSON.parse(localStorage.getItem('devfront_unlocked_ids') || '[]');
    setUnlockedIds(savedIds);
  }, []);

  const resetFilters = () => {
    setSelectedIndustry('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setShowOnlyUnlocked(false);
  };

  const filteredComponents = components.filter(c => 
    (selectedIndustry === 'all' || c.industry === selectedIndustry) &&
    (selectedCategory === 'all' || c.category === selectedCategory) &&
    (c.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!showOnlyUnlocked || unlockedIds.includes(c.id))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6 md:gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 md:p-2.5 bg-theme rounded-xl md:rounded-2xl shadow-xl shadow-theme/20 text-white shrink-0">
              <LayoutGrid size={20} className="md:w-6 md:h-6" />
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">组件资产社区</h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 font-medium max-w-xl">
            沉淀全行业外包交付经验，打造高审美、高性能、高复用的内部设计语言系统。
          </p>
        </div>
        <div className="relative group w-full md:w-96">
          <input
            type="text"
            placeholder="搜索行业解决方案..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-theme/10 transition-all outline-none font-bold text-sm shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-theme transition-colors" size={18} />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 p-5 md:p-8 shadow-2xl shadow-slate-200/40 mb-10 overflow-hidden">
        <div className={isExpanded ? 'mb-8 md:mb-10' : 'mb-0'}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <Briefcase size={12} /> 1. 业务行业 (Industry)
            </label>
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar sm:overflow-visible pb-1 sm:pb-0">
               <button 
                onClick={() => setShowOnlyUnlocked(!showOnlyUnlocked)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all border shrink-0 ${
                  showOnlyUnlocked ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200 hover:text-emerald-600'
                }`}
               >
                 <BookmarkCheck size={12} className={showOnlyUnlocked ? 'animate-pulse' : ''} />
                 {showOnlyUnlocked ? '我的资产' : `已解锁 (${unlockedIds.length})`}
               </button>

               <div className="h-4 w-px bg-slate-100 mx-1 shrink-0"></div>

               <button onClick={resetFilters} className="flex items-center gap-1.5 px-2 py-1.5 text-[10px] font-black text-slate-400 hover:text-theme shrink-0 active:scale-95 transition-transform">
                 <RotateCcw size={12} /> <span className="hidden sm:inline">重置</span>
               </button>
               <button 
                 onClick={() => setIsExpanded(!isExpanded)}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all border shrink-0 active:scale-95 ${
                   isExpanded ? 'bg-theme/5 border-theme/20 text-theme' : 'bg-slate-50 border-slate-100 text-slate-500'
                 }`}
               >
                 <SlidersHorizontal size={12} />
                 <span className="hidden sm:inline">{isExpanded ? '收起' : '高级'}</span>
                 {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
               </button>
            </div>
          </div>
          
          <div className="relative group/scroll overflow-hidden rounded-2xl">
             {/* 渐变遮罩指示器 */}
             <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 opacity-0 group-hover/scroll:opacity-100 sm:hidden transition-opacity"></div>
             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 opacity-100 sm:hidden transition-opacity"></div>
             
             <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-3 md:pb-0 px-0.5 scroll-smooth">
               <button
                 onClick={() => setSelectedIndustry('all')}
                 className={`px-4 md:py-2.5 py-2 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-black transition-all border shrink-0 ${
                   selectedIndustry === 'all' ? 'bg-slate-900 text-white border-transparent shadow-lg' : 'bg-slate-50 text-slate-500 border-slate-100'
                 }`}
               >
                 全部
               </button>
               {industries.map((ind) => (
                 <button
                   key={ind.id}
                   onClick={() => setSelectedIndustry(ind.id)}
                   className={`flex items-center gap-2 px-4 md:py-2.5 py-2 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-black transition-all border shrink-0 ${
                     selectedIndustry === ind.id ? `${ind.bg} ${ind.color} border-current shadow-md` : 'bg-white text-slate-500 border-slate-100'
                   }`}
                 >
                   <ind.icon size={14} />
                   {ind.name}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="mb-4 md:mb-10 pt-6 md:pt-8 border-t border-slate-50">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-4 md:mb-6 flex items-center gap-2">
                <Tags size={12} /> 2. 功能类别 (Category)
              </label>
              
              <div className="relative group/scroll overflow-hidden rounded-2xl">
                 <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 opacity-0 group-hover/scroll:opacity-100 sm:hidden transition-opacity"></div>
                 <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 opacity-100 sm:hidden transition-opacity"></div>
                 
                 <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-3 md:pb-0 px-0.5 scroll-smooth">
                   {categories.map((cat) => (
                     <button
                       key={cat.id}
                       onClick={() => setSelectedCategory(cat.id)}
                       className={`flex items-center gap-2 px-4 md:py-2.5 py-2 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-black transition-all border shrink-0 ${
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
          </div>
        )}
      </div>

      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in fade-in duration-500">
          {filteredComponents.map((comp) => {
            const industryInfo = industries.find(i => i.id === comp.industry) || industries[0];
            const isUnlocked = unlockedIds.includes(comp.id);
            return (
              <div 
                key={comp.id} 
                onClick={() => navigate(`/components/${comp.id}`)}
                className="group relative bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 cursor-pointer active:scale-[0.98] md:active:scale-100"
              >
                <div className={`h-40 md:h-52 ${industryInfo.bg} flex items-center justify-center relative overflow-hidden transition-colors duration-700`}>
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
                  <div className={`absolute inset-0 flex items-center justify-center ${industryInfo.color} opacity-[0.04] scale-[4] rotate-12 transition-transform duration-1000 group-hover:scale-[4.5]`}>
                     <industryInfo.icon size={64} />
                  </div>
                  <div className={`relative z-10 ${industryInfo.color} transition-all duration-700 group-hover:scale-110`}>
                     <industryInfo.icon size={48} className="md:w-14 md:h-14" strokeWidth={1.5} />
                  </div>
                  
                  <div className="absolute top-4 right-4">
                     {isUnlocked ? (
                       <div className="px-3 py-1 bg-emerald-500 text-white backdrop-blur rounded-full shadow-lg shadow-emerald-200 flex items-center gap-1.5 border border-white/20">
                          <ShieldCheck size={12} />
                          <span className="text-[9px] md:text-[10px] font-black uppercase">已解锁</span>
                       </div>
                     ) : (
                       <div className="px-3 py-1 bg-white/90 backdrop-blur rounded-full border border-white shadow-sm flex items-center gap-2">
                          <Coins size={10} className="text-amber-500" />
                          <span className="text-[9px] md:text-[10px] font-black text-slate-900">{comp.pointsPerCopy} pts</span>
                       </div>
                     )}
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                    <span className="text-[8px] md:text-[9px] font-black text-theme uppercase bg-theme/10 px-2 md:px-3 py-1 rounded-full tracking-widest">{comp.category}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 group-hover:text-theme transition-colors tracking-tight line-clamp-1">{comp.title}</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-2 font-medium">{comp.description}</p>
                  
                  <div className="mt-6 md:mt-8 flex items-center justify-between pt-5 md:pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wider">引用: {comp.copyCount}</span>
                    </div>
                    <button className="text-theme text-[10px] md:text-xs font-black flex items-center gap-1 uppercase tracking-widest group/btn">
                      {isUnlocked ? '查看' : '解锁'} <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200 animate-in fade-in">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-200 shadow-sm mb-6">
              {showOnlyUnlocked ? <Unlock size={32} /> : <Search size={32} />}
           </div>
           <h3 className="text-lg font-black text-slate-900 tracking-tight">
             {showOnlyUnlocked ? '暂无已解锁资产' : '未找到匹配资产'}
           </h3>
           <p className="text-xs text-slate-400 font-medium mt-1 px-8">
             请调整筛选条件或搜索关键词。
           </p>
        </div>
      )}
    </div>
  );
};

export default Components;
