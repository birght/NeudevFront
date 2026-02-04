
import React, { useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../../types';
import { componentService } from '../../services/api';
import { 
  Search, 
  MoreHorizontal, 
  ShieldCheck, 
  UserCog, 
  ShieldEllipsis, 
  Trophy, 
  Zap, 
  Users as UsersIcon,
  Filter,
  ArrowUpDown,
  Check,
  ChevronDown,
  TrendingUp,
  Mail,
  Calendar,
  Clock,
  // Fix: Added Star icon to imports
  Star
} from 'lucide-react';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await componentService.listUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setUpdatingId(userId);
    try {
      const success = await componentService.updateUserRole(userId, newRole);
      if (success) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      }
    } catch (err) {
      alert('更新失败');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return <ShieldCheck size={16} className="text-indigo-600" />;
      case UserRole.EVALUATOR: return <ShieldEllipsis size={16} className="text-violet-600" />;
      default: return <UserCog size={16} className="text-theme" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Grandmaster': return 'bg-rose-500 text-white shadow-rose-200';
      case 'Master': return 'bg-indigo-600 text-white shadow-indigo-200';
      case 'Gold': return 'bg-amber-500 text-white shadow-amber-100';
      case 'Silver': return 'bg-slate-300 text-slate-700 shadow-slate-100';
      default: return 'bg-amber-700 text-white shadow-amber-900/20';
    }
  };

  return (
    <div className="p-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">用户管理中心</h2>
          <p className="text-slate-500 font-medium mt-1">管理社区核心资产 —— 全球开发者及其贡献权重。</p>
        </div>
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-grow lg:w-80">
            <input 
              type="text" 
              placeholder="搜索姓名或邮箱..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-theme/10 outline-none font-bold text-sm transition-all"
            />
            <Search size={18} className="absolute left-4 top-4 text-slate-400" />
          </div>
          <button className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all text-slate-500">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 relative group overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-100/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <UsersIcon size={12} /> 总注册人才
          </div>
          <div className="text-4xl font-black text-slate-900">1,248</div>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-indigo-600">
            <TrendingUp size={12} /> 本月增长 12%
          </div>
        </div>
        <div className="p-8 bg-theme/5 rounded-[2.5rem] border border-theme/10 relative group overflow-hidden">
          <div className="text-[10px] font-black text-theme uppercase tracking-widest mb-2 flex items-center gap-2">
            <Trophy size={12} /> 核心创作者
          </div>
          <div className="text-4xl font-black text-slate-900">86</div>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-theme">
            {/* Fix: Star icon is now imported */}
            <Star size={12} /> 黄金等级以上
          </div>
        </div>
        <div className="p-8 bg-emerald-50/50 rounded-[2.5rem] border border-emerald-100 relative group overflow-hidden">
          <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Zap size={12} /> 社区总积分
          </div>
          <div className="text-4xl font-black text-slate-900">420.5k</div>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
            <Check size={12} /> 已兑现权益 2.4k
          </div>
        </div>
        <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative group overflow-hidden">
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">活跃指数</div>
           <div className="text-4xl font-black">94.8%</div>
           <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-theme">
            <Clock size={12} /> 7天内有贡献
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2">基本身份信息 <ArrowUpDown size={12} /></div>
              </th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                系统角色权重
              </th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                贡献成就维度
              </th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                活跃状态
              </th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                管理操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.map(user => (
              <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                   <div className="flex items-center gap-4">
                      <div className="relative">
                         <img 
                           src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}`} 
                           className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm"
                           alt="avatar"
                         />
                         <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                         <div className="text-sm font-black text-slate-900 tracking-tight">{user.name}</div>
                         <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                            <Mail size={10} /> {user.email}
                         </div>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <div className="relative">
                      <select 
                        value={user.role} 
                        disabled={updatingId === user.id}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                        className={`appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-10 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-theme/20 transition-all cursor-pointer disabled:opacity-50 ${updatingId === user.id ? 'animate-pulse' : ''}`}
                      >
                         <option value={UserRole.ADMIN}>超级管理员</option>
                         <option value={UserRole.AUTHOR}>核心创作者</option>
                         <option value={UserRole.EVALUATOR}>社区评委</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                         <ChevronDown size={14} />
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <div className="space-y-2">
                      <div className="flex items-center justify-between">
                         <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${getLevelColor(user.level)}`}>
                            {user.level} Level
                         </span>
                         <span className="text-[10px] font-black text-slate-900">{user.points.toLocaleString()} pts</span>
                      </div>
                      <div className="w-40 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                         <div className="bg-theme h-full" style={{ width: `${(user.points % 1000) / 10}%` }}></div>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                         <Zap size={12} className="text-amber-500" /> {user.submissionCount} 作品
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                         <Clock size={10} /> 上次活跃 {user.lastActive}
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6 text-right">
                   <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-theme hover:text-white transition-all shadow-sm">
                      <MoreHorizontal size={18} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-300 mb-6">
                <Search size={40} />
             </div>
             <h3 className="text-xl font-black text-slate-900 tracking-tight">未能找到该成员</h3>
             <p className="text-slate-500 font-medium mt-1">请尝试使用其他关键词搜索。</p>
          </div>
        )}
      </div>

      <div className="mt-12 p-10 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
         <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-theme/20 rounded-full blur-[100px]"></div>
         <div className="flex gap-6 items-center relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-theme shadow-inner border border-white/5">
               <Calendar size={32} />
            </div>
            <div>
               <h4 className="text-2xl font-black tracking-tight">人才流动审计</h4>
               <p className="text-slate-400 font-medium mt-1">点击下载本季度社区贡献度审计报告，用于年底绩效参考。</p>
            </div>
         </div>
         <button className="px-10 py-5 bg-theme text-white font-black rounded-2xl hover:bg-theme-dark shadow-2xl shadow-theme/30 transition-all flex items-center gap-3 relative z-10">
            导出全局数据表格 <TrendingUp size={20} />
         </button>
      </div>
    </div>
  );
};

export default AdminUsers;
