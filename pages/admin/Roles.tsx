
import React, { useState } from 'react';
import { UserRole } from '../../types';
import { ShieldCheck, ShieldEllipsis, UserCog, Settings2, Lock, PlusCircle, Key, LayoutDashboard, PlusCircle as Create, Layers, ClipboardCheck } from 'lucide-react';

const PERMISSION_MODULES = [
  { id: 'overview', name: '社区数据洞察', icon: LayoutDashboard, group: '数据大盘' },
  { id: 'contribute', name: '创作新艺术品', icon: Create, group: '资产创作' },
  { id: 'my-items', name: '个人贡献资产', icon: Layers, group: '资产创作' },
  { id: 'moderate', name: '审核管理中央', icon: ClipboardCheck, group: '社区治理' },
  { id: 'roles', name: '角色权限配置', icon: ShieldCheck, group: '系统治理' },
];

const AdminRoles: React.FC = () => {
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState<UserRole>(UserRole.AUTHOR);
  const [rolePermissions, setRolePermissions] = useState<Record<UserRole, string[]>>({
    [UserRole.ADMIN]: ['overview', 'contribute', 'my-items', 'moderate', 'roles'],
    [UserRole.AUTHOR]: ['overview', 'contribute', 'my-items'],
    [UserRole.EVALUATOR]: ['overview', 'moderate'],
  });

  const togglePermission = (role: UserRole, moduleId: string) => {
    if (role === UserRole.ADMIN && moduleId === 'roles') return;
    setRolePermissions(prev => {
      const current = prev[role];
      const next = current.includes(moduleId) ? current.filter(id => id !== moduleId) : [...current, moduleId];
      return { ...prev, [role]: next };
    });
  };

  return (
    <div className="p-12 animate-in fade-in slide-in-from-right-8 duration-700">
       <div className="flex justify-between items-start mb-12">
         <div>
           <h2 className="text-4xl font-black text-slate-900 tracking-tighter">角色权限中央</h2>
           <p className="text-slate-500 font-medium mt-1">配置不同角色的功能边界。</p>
         </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
             {[
               { id: UserRole.ADMIN, name: '超级管理员', desc: '系统最高控制权', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
               { id: UserRole.AUTHOR, name: '核心创作者', desc: '负责资产创作与维护', icon: UserCog, color: 'text-theme', bg: 'bg-theme/5' },
               { id: UserRole.EVALUATOR, name: '社区评委', desc: '负责资产审核与合规', icon: ShieldEllipsis, color: 'text-violet-600', bg: 'bg-violet-50' }
             ].map(role => (
               <button key={role.id} onClick={() => setSelectedRoleForEdit(role.id)} className={`w-full p-6 rounded-[2rem] border transition-all text-left flex items-start gap-4 ${selectedRoleForEdit === role.id ? `border-slate-900 bg-white shadow-2xl` : 'border-slate-100 bg-slate-50/50 hover:bg-white'}`}>
                 <div className={`p-3 rounded-2xl ${role.bg} ${role.color}`}><role.icon size={24} /></div>
                 <div><h4 className="font-black text-slate-900">{role.name}</h4><p className="text-[11px] text-slate-400">{role.desc}</p></div>
               </button>
             ))}
          </div>

          <div className="lg:col-span-8">
             <div className="bg-slate-50/50 rounded-[2.5rem] border border-slate-100 p-8">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200/60">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-900 text-white rounded-xl"><Settings2 size={18} /></div>
                      <span className="text-sm font-black text-slate-900">权限矩阵 - {selectedRoleForEdit}</span>
                   </div>
                </div>

                <div className="space-y-10">
                   {['数据大盘', '资产创作', '社区治理', '系统治理'].map(group => (
                     <div key={group}>
                       <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{group}</h5>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {PERMISSION_MODULES.filter(m => m.group === group).map(module => {
                            const isEnabled = rolePermissions[selectedRoleForEdit].includes(module.id);
                            return (
                              <div key={module.id} className={`p-5 rounded-3xl border transition-all flex items-center justify-between ${isEnabled ? 'bg-white shadow-sm' : 'bg-transparent opacity-60'}`}>
                                <div className="flex items-center gap-4">
                                  <div className={`p-2.5 rounded-2xl ${isEnabled ? 'bg-theme text-white' : 'bg-slate-100 text-slate-400'}`}><module.icon size={18} /></div>
                                  <div className="text-sm font-bold text-slate-800">{module.name}</div>
                                </div>
                                <button onClick={() => togglePermission(selectedRoleForEdit, module.id)} className={`relative inline-flex h-7 w-12 items-center rounded-full ${isEnabled ? 'bg-theme shadow-lg shadow-theme/20' : 'bg-slate-200'}`}>
                                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-2'}`} />
                                </button>
                              </div>
                            );
                          })}
                       </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default AdminRoles;
