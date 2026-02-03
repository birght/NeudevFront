
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Documentation from './pages/Documentation';
import Components from './pages/Components';
import Designs from './pages/Designs';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import MotionArt from './pages/MotionArt';
import UltimateLayouts from './pages/UltimateLayouts';
import InteractionLab from './pages/InteractionLab';
import VisualExpression from './pages/VisualExpression';
import { UserRole } from './types';
import { SettingsProvider } from './context/SettingsContext';
import { Mail, Twitter, MessageCircle, ArrowUpRight } from 'lucide-react';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.DEVELOPER);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleLogin = (role: UserRole) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUser({ 
      name: role === UserRole.ADMIN ? 'Admin User' : 'Dev Hero', 
      email: 'user@devfront.internal' 
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <SettingsProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar 
            userRole={userRole} 
            isLoggedIn={isLoggedIn}
            onRoleSwitch={(role) => setUserRole(role)} 
            onLogout={handleLogout}
          />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/doces/introduction" element={<Documentation />} />
              <Route path="/components" element={<Components />} />
              <Route path="/designs" element={<Designs />} />
              <Route path="/motion-art" element={<MotionArt />} />
              <Route path="/ultimate-layouts" element={<UltimateLayouts />} />
              <Route path="/interaction-lab" element={<InteractionLab />} />
              <Route path="/visual-expression" element={<VisualExpression />} />
              <Route path="/admin" element={<AdminDashboard userRole={userRole} />} />
              <Route path="/login" element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          <footer className="bg-white border-t pt-16 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              {/* Branding Section */}
              <div className="col-span-1 md:col-span-2">
                 <div className="flex items-center space-x-2 mb-6">
                    <div className="w-10 h-10 bg-theme rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-theme/20">D</div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">DevFront</span>
                 </div>
                 <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
                   全球前端艺术家的共建圣殿。我们致力于通过代码沉淀设计之美，为团队协作打造极致的工程底座。
                 </p>
              </div>

              {/* Contact & Social Section */}
              <div>
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">连接我们</h4>
                 <div className="space-y-4">
                    <a href="mailto:hero@shiwanyu.com" className="flex items-center gap-3 text-slate-600 hover:text-theme transition-all font-bold group">
                      <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center group-hover:bg-theme group-hover:text-white transition-all">
                        <Mail size={18} />
                      </div>
                      <span className="text-sm">hero@shiwanyu.com</span>
                    </a>
                    <div className="flex items-center gap-3 pt-2">
                       <a href="#" className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm" title="Follow on X">
                          <Twitter size={20} />
                       </a>
                       <a href="#" className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-[#00D26A] hover:text-white transition-all transform hover:-translate-y-1 shadow-sm" title="Contact on 飞书">
                          <MessageCircle size={20} />
                       </a>
                    </div>
                 </div>
              </div>

              {/* Navigation Section */}
              <div>
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">快速导航</h4>
                 <ul className="space-y-3 text-sm font-bold text-slate-500">
                    <li>
                      <Link to="/motion-art" className="hover:text-theme transition-colors flex items-center gap-1 group">
                        动效艺术馆 <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/ultimate-layouts" className="hover:text-theme transition-colors flex items-center gap-1 group">
                        极致布局殿堂 <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/doces/introduction" className="hover:text-theme transition-colors flex items-center gap-1 group">
                        开发者手册 <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                 </ul>
              </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
               <span>&copy; {new Date().getFullYear()} DevFront Community Hub. 版权所有.</span>
               <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-theme rounded-full animate-pulse"></span>
                  Built for teams, by teams.
               </div>
            </div>
          </footer>
        </div>
      </HashRouter>
    </SettingsProvider>
  );
};

export default App;
