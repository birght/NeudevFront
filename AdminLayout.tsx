
import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { UserRole } from './types';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardCheck, 
  Layers, 
  ShieldCheck, 
  Star,
  Users
} from 'lucide-react';

interface AdminLayoutProps {
  userRole: UserRole;
}

const PERMISSION_MODULES = [
  { id: 'overview', name: '社区数据洞察', icon: LayoutDashboard, path: '/admin/overview' },
  { id: 'contribute', name: '创作新艺术品', icon: PlusCircle, path: '/admin/contribute' },
  { id: 'my-items', name: '个人贡献资产', icon: Layers, path: '/admin/my-items' },
  { id: 'moderate', name: '审核管理中央', icon: ClipboardCheck, path: '/admin/moderate' },
  { id: 'users', name: '用户管理中心', icon: Users, path: '/admin/users' },
  { id: 'roles', name: '角色权限配置', icon: ShieldCheck, path: '/admin/roles' },
];

const rolePermissions: Record<UserRole, string[]> = {
  [UserRole.ADMIN]: ['overview', 'contribute', 'my-items', 'moderate', 'users', 'roles'],
  [UserRole.AUTHOR]: ['overview', 'contribute', 'my-items'],
  [UserRole.EVALUATOR]: ['overview', 'moderate'],
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ userRole }) => {
  const location = useLocation();
  const visibleModules = PERMISSION_MODULES.filter(m => rolePermissions[userRole].includes(m.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 space-y-2">
          <div className="px-4 mb-6">
             <h2 className="text-xl font-black text-slate-900 tracking-tight">实验室控制台</h2>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Creator Workspace</p>
          </div>
          
          {visibleModules.map(module => (
            <Link 
              key={module.id}
              to={module.path} 
              className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${location.pathname === module.path ? 'bg-theme text-white shadow-xl shadow-theme/20' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <module.icon size={18} /> {module.name}
              </div>
              {module.id === 'moderate' && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">12</span>}
            </Link>
          ))}

          <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-theme/30 blur-2xl rounded-full"></div>
             <h4 className="text-xs font-black mb-2 flex items-center gap-2 relative z-10"><Star size={14} className="text-amber-400" /> 贡献等级</h4>
             <p className="text-[10px] text-slate-400 leading-relaxed mb-4 relative z-10">当前等级：黄金工匠<br/>还需 3 个组件升级至大师</p>
             <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-theme w-2/3 h-full"></div>
             </div>
          </div>
        </aside>

        <main className="flex-grow bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden min-h-[800px]">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
