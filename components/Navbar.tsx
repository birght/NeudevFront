
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../types';
import { useSettings } from '../context/SettingsContext';
import { translations } from '../translations';

interface NavbarProps {
  userRole: UserRole;
  onRoleSwitch: (role: UserRole) => void;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, onRoleSwitch }) => {
  const location = useLocation();
  const { lang, setLang, theme, setTheme, isMourning, setIsMourning, themes } = useSettings();
  const t = translations[lang];
  const [showSettings, setShowSettings] = useState(false);

  const navItems = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.docs, path: '/doces/introduction' },
    { label: t.nav.components, path: '/components' },
    { label: t.nav.designs, path: '/designs' },
    { label: t.nav.management, path: '/admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-theme rounded-lg flex items-center justify-center text-white font-bold transition-colors">D</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">DevFront</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-slate-100 text-theme'
                      : 'text-slate-600 hover:text-theme hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Settings Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-[100]">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">{translations[lang].settings.title}</h4>
                  
                  {/* Lang Switch */}
                  <div className="mb-4">
                    <span className="text-xs text-slate-500 block mb-2">{translations[lang].settings.lang}</span>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                      <button onClick={() => setLang('zh')} className={`flex-1 py-1 text-[10px] rounded font-bold transition-all ${lang === 'zh' ? 'bg-white shadow text-theme' : 'text-slate-500'}`}>中文</button>
                      <button onClick={() => setLang('en')} className={`flex-1 py-1 text-[10px] rounded font-bold transition-all ${lang === 'en' ? 'bg-white shadow text-theme' : 'text-slate-500'}`}>EN</button>
                    </div>
                  </div>

                  {/* Theme Switch */}
                  <div className="mb-4">
                    <span className="text-xs text-slate-500 block mb-2">{translations[lang].settings.theme}</span>
                    <div className="flex gap-2">
                      {themes.map(t => (
                        <button 
                          key={t.name} 
                          onClick={() => setTheme(t)}
                          className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${theme.name === t.name ? 'border-slate-800' : 'border-transparent'}`}
                          style={{ backgroundColor: t.main }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mourning Switch */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">{translations[lang].settings.mourning}</span>
                    <button 
                      onClick={() => setIsMourning(!isMourning)}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${isMourning ? 'bg-theme' : 'bg-slate-200'}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isMourning ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => onRoleSwitch(UserRole.DEVELOPER)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  userRole === UserRole.DEVELOPER ? 'bg-white shadow text-theme' : 'text-slate-500'
                }`}
              >
                Developer
              </button>
              <button
                onClick={() => onRoleSwitch(UserRole.ADMIN)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  userRole === UserRole.ADMIN ? 'bg-white shadow text-theme' : 'text-slate-500'
                }`}
              >
                Admin
              </button>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden ring-2 ring-indigo-100">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userRole}`} alt="avatar" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
