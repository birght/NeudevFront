
import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { UserRole } from './types';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Layers, 
  ShieldCheck, 
  Star,
  Users,
  Trophy,
  UserCircle,
  Settings,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

interface AdminLayoutProps {
  userRole: UserRole;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ userRole }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const modules = [
    { id: 'overview', name: '社区数据洞察', icon: LayoutDashboard, path: '/admin/overview', roles: [UserRole.ADMIN, UserRole.AUTHOR, UserRole.EVALUATOR] },
    { id: 'contribute', name: '创作新艺术品', icon: PlusCircle, path: '/admin/contribute', roles: [UserRole.ADMIN, UserRole.AUTHOR] },
    { id: 'my-items', name: '个人贡献资产', icon: Layers, path: '/admin/my-items', roles: [UserRole.ADMIN, UserRole.AUTHOR] },
    { id: 'moderate', name: '资产审计中心', icon: Trophy, path: '/admin/moderate', roles: [UserRole.ADMIN, UserRole.EVALUATOR] },
    { id: 'judge-management', name: '评委库管理', icon: Settings, path: '/admin/judges', roles: [UserRole.ADMIN] },
    { id: 'judge-profile', name: '个人主页编辑', icon: UserCircle, path: '/admin/judge-profile', roles: [UserRole.EVALUATOR] },
    { id: 'users', name: '用户管理中心', icon: Users, path: '/admin/users', roles: [UserRole.ADMIN] },
    { id: 'roles', name: '角色权限配置', icon: ShieldCheck, path: '/admin/roles', roles: [UserRole.ADMIN] },
  ];

  const visibleModules = modules.filter(m => m.roles.includes(userRole));
  const currentModule = visibleModules.find(m => location.pathname.startsWith(m.path));

  const SidebarContent = () => (
    <>
      <div className="px-4 mb-6 hidden lg:block">
         <h2 className="text-xl font-black text-slate-900 tracking-tight">实验室控制台</h2>
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Creator Workspace</p>
      </div>
      
      <div className="space-y-1.5">
        {visibleModules.map(module => (
          <Link 
            key={module.id}
            to={module.path} 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-95 ${location.pathname.startsWith(module.path) ? 'bg-theme text-white shadow-xl shadow-theme/20' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <div className="flex items-center gap-3">
              <module.icon size={18} /> {module.name}
            </div>
            {module.id === 'moderate' && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">2</span>}
          </Link>
        ))}
      </div>

      <div className="mt-8 lg:mt-12 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
         <div className="absolute -top-4 -right-4 w-24 h-24 bg-theme/30 blur-2xl rounded-full"></div>
         <h4 className="text-xs font-black mb-2 flex items-center gap-2 relative z-10"><Star size={14} className="text-amber-400" /> 贡献等级</h4>
         <p className="text-[10px] text-slate-400 leading-relaxed mb-4 relative z-10">当前身份：{userRole}<br/>负责维护社区资产质量</p>
         <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-theme w-2/3 h-full"></div>
         </div>
      </div>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* 移动端顶部状态条 (确保在 Navbar 下方，且不会被全屏菜单覆盖) */}
        <div className="lg:hidden flex items-center justify-between bg-white/95 backdrop-blur px-5 py-4 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-[72px] z-[40] transition-all">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-theme text-white rounded-xl shadow-lg shadow-theme/10">
                {currentModule?.icon ? <currentModule.icon size={18} /> : <LayoutDashboard size={18} />}
              </div>
              <span className="text-sm font-black text-slate-900 tracking-tight">
                 {currentModule?.name || '管理后台'}
              </span>
           </div>
           <button 
             onClick={() => setIsMobileMenuOpen(true)}
             className="p-2.5 text-slate-500 hover:text-theme transition-colors bg-slate-50 rounded-xl"
           >
              <Menu size={20} />
           </button>
        </div>

        {/* 移动端侧边抽屉 (z-index 高于状态条) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[120] animate-in fade-in duration-300">
             <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
             <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white p-6 shadow-2xl animate-in slide-in-from-left duration-500 flex flex-col">
                <div className="flex justify-between items-center mb-8 px-2">
                   <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic">Console</h2>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Workspace v2.4</p>
                   </div>
                   <button onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                      <X size={20} />
                   </button>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                   <SidebarContent />
                </div>
             </div>
          </div>
        )}

        {/* PC 端侧边栏 */}
        <aside className="hidden lg:block w-64 space-y-2 shrink-0">
          <SidebarContent />
        </aside>

        {/* 主内容区域 */}
        <main className="flex-grow bg-white border border-slate-100 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[500px] md:min-h-[800px] transition-all">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
