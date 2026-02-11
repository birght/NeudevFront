
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, Map, Keyboard, Database, MessageSquare, Layers, 
  BarChart3, Zap, FlaskConical, Search, Sparkles, 
  Briefcase, HeartPulse, Radio, 
  Factory, GraduationCap, ShieldCheck, Leaf, 
  Wallet, CarFront, MonitorPlay, 
  Stethoscope, Landmark, Scale, ShieldAlert, Cpu, 
  Tags, LayoutGrid, ChevronRight, ChevronDown, ChevronUp, SlidersHorizontal, RotateCcw,
  Coins, Unlock, BookmarkCheck, Gem, Compass
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
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 md:p-2.5 bg-theme rounded-xl md:rounded-2xl shadow-xl shadow-theme/20 text-white shrink-0">
              <LayoutGrid size={20} className="md:w-6 md:h-6" />
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">
              {showOnlyUnlocked ? '我的数字保险库' : '组件资产社区'}
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 font-medium max-w-xl">
            {showOnlyUnlocked ? '管理并快速访问您已通过积分解锁的业务资产。' : '沉淀全行业外包交付经验，打造高复用、高性能的设计语言系统。'}
          </p>
        </div>
        
        {/* Toggle Switch Design */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 w-full md:w-auto shrink-0">
          <button 
            onClick={() => setShowOnlyUnlocked(false)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${!showOnlyUnlocked ? 'bg-white shadow-md text-theme' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Compass size={16} /> 发现社区
          </button>
          <button 
            onClick={() => setShowOnlyUnlocked(true)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${showOnlyUnlocked ? 'bg-slate-900 shadow-md text-white' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Gem size={16} className={showOnlyUnlocked ? 'text-amber-400' : ''} /> 
            我的资产
            {unlockedIds.length > 0 && <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] ${showOnlyUnlocked ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'}`}>{unlockedIds.length}</span>}
          </button>
        </div>
      </div>

      {/* Main Control Bar */}
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 p-5 md:p-8 shadow-2xl shadow-slate-200/40 mb-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Search Bar */}
          <div className="relative group w-full lg:flex-1">
            <input
              type="text"
              placeholder={showOnlyUnlocked ? "在我的库中搜索..." : "搜索行业解决方案..."}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-theme/10 transition-all outline-none font-bold text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-theme transition-colors" size={18} />
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar pb-1 lg:pb-0">
             <button onClick={resetFilters} className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 text-[11px] font-black text-slate-400 rounded-2xl hover:text-theme shrink-0 active:scale-95 transition-all">
               <RotateCcw size={14} /> 重置
             </button>
             <button 
               onClick={() => setIsExpanded(!isExpanded)}
               className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-black transition-all border shrink-0 active:scale-95 ${
                 isExpanded ? 'bg-theme text-white border-transparent shadow-xl shadow-theme/20' : 'bg-white border-slate-200 text-slate-500'
               }`}
             >
               <SlidersHorizontal size={14} />
               高级筛选
               {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
             </button>
          </div>
        </div>

        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300 mt-8 pt-8 border-t border-slate-50">
            <div className="space-y-8">
               {/* Industry Filter */}
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
                    <Briefcase size={12} /> 按行业筛选 (Industry)
                  </label>
                  <div className="relative group/scroll">
                     <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 sm:hidden"></div>
                     <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 sm:hidden"></div>
                     <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-2">
                        <button
                          onClick={() => setSelectedIndustry('all')}
                          className={`px-4 py-2 rounded-xl text-[11px] font-black transition-all border shrink-0 ${selectedIndustry === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 border-slate-100'}`}
                        >
                          全部行业
                        </button>
                        {industries.map((ind) => (
                          <button
                            key={ind.id}
                            onClick={() => setSelectedIndustry(ind.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black transition-all border shrink-0 ${selectedIndustry === ind.id ? `${ind.bg} ${ind.color} border-current shadow-md` : 'bg-white text-slate-500 border-slate-100'}`}
                          >
                            <ind.icon size={14} />
                            {ind.name}
                          </button>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Category Filter */}
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-4">
                    <Tags size={12} /> 按功能分类 (Category)
                  </label>
                  <div className="relative group/scroll">
                     <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black transition-all border shrink-0 ${selectedCategory === cat.id ? 'bg-theme text-white shadow-lg' : 'bg-slate-50 text-slate-500 border-slate-100'}`}
                          >
                            <cat.icon size={14} />
                            {cat.name}
                          </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid Area */}
      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-in fade-in duration-500">
          {filteredComponents.map((comp) => {
            const industryInfo = industries.find(i => i.id === comp.industry) || industries[0];
            const isUnlocked = unlockedIds.includes(comp.id);
            return (
              <div 
                key={comp.id} 
                onClick={() => navigate(`/components/${comp.id}`)}
                className={`group relative bg-white rounded-[2rem] md:rounded-[2.5rem] border overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 cursor-pointer active:scale-[0.98] ${
                  isUnlocked ? 'border-amber-200/50 hover:shadow-amber-100' : 'border-slate-100'
                }`}
              >
                <div className={`h-40 md:h-52 ${industryInfo.bg} flex items-center justify-center relative overflow-hidden transition-colors duration-700`}>
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
                  
                  {/* Unlocked Subtle Glow Background */}
                  {isUnlocked && <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_70%)] animate-pulse"></div>}

                  <div className={`absolute inset-0 flex items-center justify-center ${industryInfo.color} opacity-[0.04] scale-[4] rotate-12 transition-transform duration-1000 group-hover:scale-[4.5]`}>
                     <industryInfo.icon size={64} />
                  </div>
                  <div className={`relative z-10 ${industryInfo.color} transition-all duration-700 group-hover:scale-110`}>
                     <industryInfo.icon size={48} className="md:w-14 md:h-14" strokeWidth={1.5} />
                  </div>
                  
                  <div className="absolute top-4 right-4">
                     {isUnlocked ? (
                       <div className="px-3 py-1 bg-white/90 backdrop-blur-md text-amber-600 rounded-full shadow-lg border border-amber-200 flex items-center gap-1.5 animate-in zoom-in">
                          <BookmarkCheck size={12} />
                          <span className="text-[10px] font-black uppercase tracking-tight">已解锁</span>
                       </div>
                     ) : (
                       <div className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full border border-slate-100 shadow-sm flex items-center gap-2">
                          <Coins size={10} className="text-amber-500" />
                          <span className="text-[10px] font-black text-slate-900">{comp.pointsPerCopy} pts</span>
                       </div>
                     )}
                  </div>
                </div>

                <div className="p-6 md:p-8 relative">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[9px] font-black text-theme uppercase bg-theme/10 px-2.5 py-1 rounded-full tracking-widest">{comp.category}</span>
                    {isUnlocked && <span className="text-[9px] font-black text-amber-600 uppercase bg-amber-50 px-2.5 py-1 rounded-full tracking-widest">VAULT ASSET</span>}
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 group-hover:text-theme transition-colors tracking-tight line-clamp-1">{comp.title}</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-2 font-medium">{comp.description}</p>
                  
                  <div className="mt-6 md:mt-8 flex items-center justify-between pt-5 md:pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-4">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">被引用</span>
                          <span className="text-[11px] font-black text-slate-900">{comp.copyCount}</span>
                       </div>
                    </div>
                    <button className="text-theme text-xs font-black flex items-center gap-1 uppercase tracking-widest group/btn">
                      {isUnlocked ? '立即访问' : '查看详情'} <ChevronRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200 animate-in fade-in">
           <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center text-slate-200 shadow-xl mb-6 ring-4 ring-slate-50">
              {showOnlyUnlocked ? <Gem size={32} /> : <Search size={32} />}
           </div>
           <h3 className="text-xl font-black text-slate-900 tracking-tight">
             {showOnlyUnlocked ? '您的保险库空空如也' : '未找到匹配资产'}
           </h3>
           <p className="text-sm text-slate-400 font-medium mt-2 px-8 max-w-sm">
             {showOnlyUnlocked ? '前往社区浏览并使用积分解锁您感兴趣的高质量业务组件。' : '请尝试调整筛选条件或搜索关键词以寻找灵感。'}
           </p>
           {showOnlyUnlocked && (
             <button 
               onClick={() => setShowOnlyUnlocked(false)}
               className="mt-8 px-8 py-3 bg-theme text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-theme/20 hover:scale-105 active:scale-95 transition-all"
             >
               去社区逛逛
             </button>
           )}
        </div>
      )}
    </div>
  );
};

export default Components;
