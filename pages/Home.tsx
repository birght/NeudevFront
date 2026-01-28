
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  ArrowRight, 
  Layout, 
  ShieldCheck, 
  Users, 
  Zap, 
  Star, 
  TrendingUp, 
  Package 
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { translations } from '../translations';

const Home: React.FC = () => {
  const { lang, theme } = useSettings();
  const t = translations[lang];
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const personalStats = {
    linesContributed: '12,450',
    componentsCount: 14,
    points: 2450,
    copies: 382
  };

  const teamStats = {
    totalComponents: 156,
    mostUsed: [
      { name: 'Auth Modal', uses: 120, rating: 4.9 },
      { name: 'Data Table Pro', uses: 98, rating: 4.7 },
      { name: 'Sidebar Nav', uses: 85, rating: 4.8 }
    ],
    topRated: [
      { name: 'Glass Card', rating: 5.0, category: 'UI' },
      { name: 'Chart Suite', rating: 4.9, category: 'Data' }
    ]
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-50 pt-20 pb-12 sm:pt-32">
        <div className="absolute inset-y-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-theme/10 text-theme rounded-full text-xs font-bold mb-8 transition-colors">
            <Zap size={14} className="fill-current" />
            <span>v2.5 Now Available with New Templates</span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-7xl mb-6">
            {t.home.hero.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 mb-10 leading-relaxed">
            {t.home.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link to="/components" className="group flex items-center justify-center gap-2 px-8 py-4 bg-theme text-white font-bold rounded-2xl hover:bg-theme-dark transition-all shadow-xl shadow-theme/30 transform hover:-translate-y-1">
              <Rocket size={20} className="group-hover:rotate-12 transition-transform" />
              {t.home.btn.browse}
              <ArrowRight size={18} />
            </Link>
            <button 
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 font-bold rounded-2xl hover:bg-slate-50 transition-all hover:shadow-lg"
            >
              {isLoggedIn ? t.home.btn.logoutDemo : t.home.btn.loginDemo}
            </button>
          </div>

          {/* Monitoring Panel */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
              <div className="bg-theme px-8 py-4 flex justify-between items-center transition-colors">
                <span className="text-white text-sm font-bold tracking-wider uppercase flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-400/50 rounded-full"></span>
                  </div>
                  {isLoggedIn ? t.home.monitor.personal : t.home.monitor.team}
                </span>
                <span className="text-white/80 text-xs font-bold flex items-center gap-2">
                   <TrendingUp size={14} />
                   {t.home.monitor.realtime}
                </span>
              </div>
              
              <div className="p-10">
                {isLoggedIn ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    <div className="text-center group">
                      <div className="text-4xl font-black text-slate-900 group-hover:text-theme transition-colors">{personalStats.linesContributed}</div>
                      <div className="text-[10px] text-slate-400 font-extrabold uppercase mt-2 tracking-widest">{t.home.monitor.codeLines}</div>
                    </div>
                    <div className="text-center border-l border-slate-100 group">
                      <div className="text-4xl font-black text-slate-900 group-hover:text-theme transition-colors">{personalStats.componentsCount}</div>
                      <div className="text-[10px] text-slate-400 font-extrabold uppercase mt-2 tracking-widest">{t.home.monitor.components}</div>
                    </div>
                    <div className="text-center border-l border-slate-100 group">
                      <div className="text-4xl font-black text-theme transition-colors animate-float">{personalStats.points}</div>
                      <div className="text-[10px] text-slate-400 font-extrabold uppercase mt-2 tracking-widest">{t.home.monitor.points}</div>
                    </div>
                    <div className="text-center border-l border-slate-100 group">
                      <div className="text-4xl font-black text-slate-900 group-hover:text-theme transition-colors">{personalStats.copies}</div>
                      <div className="text-[10px] text-slate-400 font-extrabold uppercase mt-2 tracking-widest">{t.home.monitor.downloads}</div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    <div className="text-center md:text-left">
                      <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                         <Package className="text-theme" size={32} />
                         <span className="text-5xl font-black text-theme transition-colors tracking-tighter">{teamStats.totalComponents}</span>
                      </div>
                      <div className="text-sm text-slate-500 font-semibold mt-1 tracking-tight">{t.home.monitor.totalComps}</div>
                      <Link to="/admin" className="inline-flex items-center gap-1 mt-6 text-xs font-black text-theme hover:underline uppercase transition-all hover:gap-2">
                        {t.home.monitor.contribute}
                      </Link>
                    </div>
                    
                    <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-slate-50/50 rounded-3xl p-6 text-left border border-slate-100 hover:bg-white transition-all">
                        <div className="flex items-center gap-2 mb-4">
                           <TrendingUp size={16} className="text-theme" />
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.home.monitor.trending}</h4>
                        </div>
                        <div className="space-y-4">
                          {teamStats.mostUsed.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <span className="text-slate-700 font-bold">{item.name}</span>
                              <span className="text-[10px] bg-white px-2.5 py-1 rounded-full border border-slate-200 text-slate-500 font-bold">{item.uses}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-slate-50/50 rounded-3xl p-6 text-left border border-slate-100 hover:bg-white transition-all">
                        <div className="flex items-center gap-2 mb-4">
                           <Star size={16} className="text-amber-500 fill-amber-500" />
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.home.monitor.topRated}</h4>
                        </div>
                        <div className="space-y-4">
                          {teamStats.topRated.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <span className="text-slate-700 font-bold">{item.name}</span>
                              <div className="flex items-center gap-1 font-black text-amber-500 text-xs">
                                 {item.rating}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Value Props */}
      <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
         <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
               <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Enterprise Grade</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Every piece of code is audited for security, accessibility, and performance by our internal team.</p>
         </div>
         <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-theme/10 text-theme rounded-3xl flex items-center justify-center mb-6 shadow-sm transition-colors">
               <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Collaborative</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Built by developers for developers. Contribute your own components and get recognized across the company.</p>
         </div>
         <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
               <Layout size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Modular Design</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Atomic design principles ensure that every component is highly composable and customizable for any project.</p>
         </div>
      </div>
    </div>
  );
};

export default Home;
