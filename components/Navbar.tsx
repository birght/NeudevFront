
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { useSettings } from '../context/SettingsContext';
import { translations } from '../translations';
import { Settings, LogOut, User, ChevronDown, Menu, X, Sparkles, Globe, Palette, ArrowRight } from 'lucide-react';

interface NavbarProps {
  userRole: UserRole;
  isLoggedIn: boolean;
  onRoleSwitch: (role: UserRole) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, isLoggedIn, onRoleSwitch, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang, theme, setTheme, isMourning, setIsMourning, themes } = useSettings();
  const t = translations[lang];
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.docs, path: '/doces/introduction' },
    { label: t.nav.components, path: '/components' },
    { label: '评委', path: '/judges' },
    { label: t.nav.designs, path: '/designs' },
    { label: t.nav.management, path: '/admin' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 路由切换或窗口调整时关闭菜单
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : '';
  };

  const handleAvatarClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setShowUserMenu(!showUserMenu);
    }
  };

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full items-center">
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-theme rounded-lg flex items-center justify-center text-white font-bold transition-colors">D</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tighter">DevFront</span>
            </Link>
            
            {/* PC Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname.startsWith(item.path) && item.path !== '/' || (location.pathname === '/' && item.path === '/')
                      ? 'bg-slate-100 text-theme'
                      : 'text-slate-600 hover:text-theme hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Settings Trigger (PC) */}
            <div className="hidden md:block relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{translations[lang].settings.title}</h4>
                  <div className="mb-5">
                    <span className="text-[11px] font-bold text-slate-500 block mb-2">{translations[lang].settings.lang}</span>
                    <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                      <button onClick={() => setLang('zh')} className={`flex-1 py-1.5 text-[10px] rounded-lg font-black transition-all ${lang === 'zh' ? 'bg-white shadow-sm text-theme' : 'text-slate-400'}`}>中文</button>
                      <button onClick={() => setLang('en')} className={`flex-1 py-1.5 text-[10px] rounded-lg font-black transition-all ${lang === 'en' ? 'bg-white shadow-sm text-theme' : 'text-slate-400'}`}>ENGLISH</button>
                    </div>
                  </div>
                  <div className="mb-5">
                    <span className="text-[11px] font-bold text-slate-500 block mb-2">{translations[lang].settings.theme}</span>
                    <div className="flex gap-2.5">
                      {themes.map(t => (
                        <button 
                          key={t.name} 
                          onClick={() => setTheme(t)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-125 ${theme.name === t.name ? 'border-slate-800' : 'border-transparent'}`}
                          style={{ backgroundColor: t.main }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Trigger */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={handleAvatarClick}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 transition-all outline-none"
              >
                <div className={`h-8 w-8 md:h-9 md:w-9 rounded-full overflow-hidden ring-2 ${isLoggedIn ? 'ring-theme shadow-lg shadow-theme/20' : 'ring-slate-100'} transition-all`}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isLoggedIn ? userRole : 'guest'}`} alt="avatar" />
                </div>
                {isLoggedIn && <ChevronDown size={14} className="hidden md:block text-slate-400" />}
              </button>

              {isLoggedIn && showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl py-3 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-5 py-3 border-b border-slate-50 mb-2">
                    <p className="text-xs font-black text-slate-900 truncate">
                      {userRole === UserRole.ADMIN ? 'ADMINISTRATOR' : userRole === UserRole.EVALUATOR ? 'EVALUATOR' : 'DEVELOPER'}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">dev@front.internal</p>
                  </div>
                  <button className="w-full flex items-center space-x-3 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-theme transition-colors">
                    <User size={16} />
                    <span>个人中心</span>
                  </button>
                  <button 
                    onClick={() => {
                      onLogout();
                      setShowUserMenu(false);
                      navigate('/');
                    }}
                    className="w-full flex items-center space-x-3 px-5 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>退出登录</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors active:scale-95"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-[100] bg-white animate-in slide-in-from-bottom duration-500 h-[calc(100vh-64px)] overflow-hidden flex flex-col">
          {/* Main Navigation Area */}
          <div className="flex-1 px-6 py-8 space-y-2 overflow-y-auto no-scrollbar">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 pl-2">Navigation</h4>
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center justify-between p-5 rounded-[2rem] transition-all duration-300 ${
                  location.pathname === item.path 
                  ? 'bg-theme text-white shadow-2xl shadow-theme/20' 
                  : 'text-slate-600 hover:bg-slate-50 active:scale-95'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span className="text-xl font-black tracking-tight">{item.label}</span>
                <div className={`p-2 rounded-full ${location.pathname === item.path ? 'bg-white/20' : 'bg-slate-100'}`}>
                  <ArrowRight size={18} className={location.pathname === item.path ? 'translate-x-0' : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all'} />
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Settings Area */}
          <div className="bg-slate-50 p-8 border-t border-slate-100 space-y-8 pb-12">
             <div className="grid grid-cols-1 gap-6">
                {/* Language Switch */}
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 flex items-center gap-2">
                     <Globe size={14} /> {translations[lang].settings.lang}
                   </label>
                   <div className="flex bg-white p-1 rounded-2xl border border-slate-200">
                      <button onClick={() => setLang('zh')} className={`flex-1 py-3 text-xs rounded-xl font-black transition-all ${lang === 'zh' ? 'bg-theme text-white shadow-lg' : 'text-slate-400'}`}>中文 (ZH)</button>
                      <button onClick={() => setLang('en')} className={`flex-1 py-3 text-xs rounded-xl font-black transition-all ${lang === 'en' ? 'bg-theme text-white shadow-lg' : 'text-slate-400'}`}>ENGLISH (EN)</button>
                   </div>
                </div>

                {/* Theme Selection */}
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3 flex items-center gap-2">
                     <Palette size={14} /> {translations[lang].settings.theme}
                   </label>
                   <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
                      <div className="flex gap-4">
                        {themes.map(t => (
                          <button 
                            key={t.name} 
                            onClick={() => setTheme(t)}
                            className={`w-8 h-8 rounded-full border-4 transition-all active:scale-90 ${theme.name === t.name ? 'border-slate-800 scale-125' : 'border-transparent'}`}
                            style={{ backgroundColor: t.main }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase">{theme.name}</span>
                   </div>
                </div>
             </div>

             <div className="flex items-center justify-center gap-2 pt-4">
                <Sparkles size={14} className="text-theme" />
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">DevFront Internal v2.4</span>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
