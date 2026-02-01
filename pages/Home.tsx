
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  ArrowRight, 
  Layout, 
  ShieldCheck, 
  Users, 
  Zap, 
  Star, 
  TrendingUp, 
  Package,
  Globe,
  Trophy,
  Palette,
  MousePointer2,
  Boxes,
  Waves
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { translations } from '../translations';

const Home: React.FC = () => {
  const { lang, theme } = useSettings();
  const t = translations[lang];
  const navigate = useNavigate();
  
  const [pulseIndex, setPulseIndex] = useState(0);

  const mockPulse = [
    { user: 'Alex from Tokyo', action: 'contributed', target: 'Neumorphic Button' },
    { user: 'Sarah from NYC', action: 'joined', target: 'Global Collective' },
    { user: 'Ivan from Berlin', action: 'contributed', target: 'Glassmorphism Login' },
    { user: 'Chen from Beijing', action: 'contributed', target: 'Bezier Curve Loader' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % mockPulse.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const matrixItems = [
    { title: '动效艺术', icon: Waves, color: 'text-blue-500', bg: 'bg-blue-50', path: '/motion-art' },
    { title: '极致布局', icon: Boxes, color: 'text-theme', bg: 'bg-theme/5', path: '/designs' },
    { title: '交互实验室', icon: MousePointer2, color: 'text-emerald-500', bg: 'bg-emerald-50', path: '/components' },
    { title: '视觉表现', icon: Palette, color: 'text-rose-500', bg: 'bg-rose-50', path: '/components' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white pt-20 pb-12 sm:pt-28">
        {/* 背景装饰：更灵动的极光式渐变 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.08)_0%,transparent_70%)]"></div>
        <div className="absolute inset-y-0 w-full h-full bg-[radial-gradient(#e5e7eb_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          {/* 实时动态动脉 (The Pulse) */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute w-full h-full bg-theme rounded-full animate-ping opacity-75"></span>
              <span className="relative w-2 h-2 bg-theme rounded-full"></span>
            </div>
            <div className="text-[11px] font-bold text-slate-500 overflow-hidden h-4 w-64 md:w-80 relative">
               {mockPulse.map((p, i) => (
                 <div key={i} className={`absolute inset-0 transition-all duration-700 flex items-center gap-1.5 ${i === pulseIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <span className="text-slate-900">{p.user}</span>
                    <span className="font-normal opacity-60">{p.action === 'joined' ? t.home.pulse.joined : t.home.pulse.contributed}</span>
                    <span className="text-theme font-black">{p.target}</span>
                 </div>
               ))}
            </div>
          </div>
          
          <h1 className="text-5xl font-[900] tracking-tighter text-slate-900 sm:text-7xl mb-8 leading-[1.1]">
            {t.home.hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500 mb-12 font-medium leading-relaxed">
            {t.home.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-20">
            <Link to="/components" className="group flex items-center justify-center gap-3 px-10 py-5 bg-theme text-white font-black rounded-2xl hover:bg-theme-dark transition-all shadow-[0_20px_40px_-10px_rgba(79,70,229,0.3)] transform hover:-translate-y-1">
              <Rocket size={20} className="group-hover:rotate-12 transition-transform" />
              {t.home.btn.browse}
              <ArrowRight size={18} />
            </Link>
            <button 
              onClick={() => navigate('/login')}
              className="group flex items-center justify-center gap-3 px-10 py-5 bg-white text-slate-900 border border-slate-200 font-black rounded-2xl hover:bg-slate-50 transition-all hover:shadow-xl transform hover:-translate-y-1"
            >
              <Globe size={20} className="text-slate-400 group-hover:text-theme transition-colors" />
              {t.home.btn.join}
            </button>
          </div>

          {/* 快捷灵感矩阵 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
             {matrixItems.map((item, idx) => (
               <div 
                 key={idx} 
                 onClick={() => navigate(item.path)}
                 className="group p-6 bg-white border border-slate-100 rounded-3xl hover:border-theme/30 transition-all hover:shadow-2xl hover:shadow-theme/5 cursor-pointer text-left"
               >
                  <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <item.icon size={24} />
                  </div>
                  <h4 className="font-black text-slate-900 text-sm tracking-tight">{item.title}</h4>
                  <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    进入详情 <ArrowRight size={12} />
                  </div>
               </div>
             ))}
          </div>

          {/* 每周工艺挑战 */}
          <div className="max-w-5xl mx-auto mb-20">
             <div className="relative group overflow-hidden bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-left">
                {/* 装饰光束 */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-theme rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                   <div className="flex-grow">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-theme text-[10px] font-black uppercase tracking-widest mb-6">
                        <Trophy size={14} /> Global Arena
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                        {t.home.sections.challenge.title}
                      </h2>
                      <p className="text-slate-400 font-medium max-w-md">
                        {t.home.sections.challenge.subtitle}
                        <br/><span className="text-theme">本周主题：极端动效加载 (Extreme Motion Loaders)</span>
                      </p>
                   </div>
                   <button className="shrink-0 px-10 py-5 bg-theme text-white font-black rounded-2xl hover:bg-theme-dark transition-all shadow-2xl shadow-theme/30 flex items-center gap-3">
                      {t.home.sections.challenge.join} <ArrowRight size={20} />
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Feature Value Props (Enterprise) */}
      <div className="max-w-7xl mx-auto px-4 py-24 border-t border-slate-50">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center md:items-start text-center md:text-left group">
               <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-theme group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                  <ShieldCheck size={28} />
               </div>
               <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">组织级审计</h3>
               <p className="text-slate-500 text-sm leading-relaxed font-medium">每一行代码都经过技术委员会的安全、无障碍与性能审计，确保开箱即用。</p>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left group">
               <div className="w-14 h-14 bg-theme/10 text-theme rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-theme group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                  <Users size={28} />
               </div>
               <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">开发者共建</h3>
               <p className="text-slate-500 text-sm leading-relaxed font-medium">为开发者打造，由开发者共建。贡献你的艺术代码，在全公司范围内获得身份认可。</p>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left group">
               <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                  <Layout size={28} />
               </div>
               <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">原子化设计</h3>
               <p className="text-slate-500 text-sm leading-relaxed font-medium">严格遵循原子化设计原则，确保每一个组件在任何项目中都具有极高的组合性。</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Home;
