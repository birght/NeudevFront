
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { useSettings } from '../context/SettingsContext';
import { translations } from '../translations';
import { Settings, LogOut, User, ChevronDown } from 'lucide-react';

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
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.docs, path: '/doces/introduction' },
    { label: t.nav.components, path: '/components' },
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

  const handleAvatarClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setShowUserMenu(!showUserMenu);
    }
  };

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
                <Settings className="w-5 h-5" />
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">{translations[lang].settings.title}</h4>
                  <div className="mb-4">
                    <span className="text-xs text-slate-500 block mb-2">{translations[lang].settings.lang}</span>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                      <button onClick={() => setLang('zh')} className={`flex-1 py-1 text-[10px] rounded font-bold transition-all ${lang === 'zh' ? 'bg-white shadow text-theme' : 'text-slate-500'}`}>中文</button>
                      <button onClick={() => setLang('en')} className={`flex-1 py-1 text-[10px] rounded font-bold transition-all ${lang === 'en' ? 'bg-white shadow text-theme' : 'text-slate-500'}`}>EN</button>
                    </div>
                  </div>
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

            {/* Avatar & User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={handleAvatarClick}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 transition-all outline-none"
              >
                <div className={`h-8 w-8 rounded-full overflow-hidden ring-2 ${isLoggedIn ? 'ring-theme' : 'ring-slate-200'} transition-all`}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isLoggedIn ? userRole : 'guest'}`} alt="avatar" />
                </div>
                {isLoggedIn && <ChevronDown size={14} className="text-slate-400" />}
              </button>

              {isLoggedIn && showUserMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-slate-50 mb-1">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {userRole === UserRole.ADMIN ? 'Administrator' : 'Developer'}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">dev@front.internal</p>
                  </div>
                  <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-theme transition-colors">
                    <User size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button 
                    onClick={() => {
                      onLogout();
                      setShowUserMenu(false);
                      navigate('/');
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
