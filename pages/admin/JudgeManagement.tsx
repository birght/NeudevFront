
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { componentService } from '../../services/api';
import { UserProfile } from '../../types';
import { 
  Users, Search, Filter, Edit3, Eye, 
  MapPin, Trophy, Star, ChevronRight, Loader2 
} from 'lucide-react';

const AdminJudgeManagement: React.FC = () => {
  const navigate = useNavigate();
  const [judges, setJudges] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    componentService.listJudges().then(data => {
      setJudges(data);
      setLoading(false);
    });
  }, []);

  const filtered = judges.filter(j => 
    j.name.toLowerCase().includes(search.toLowerCase()) || 
    j.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-12 animate-in fade-in duration-500">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
             <h2 className="text-4xl font-black text-slate-900 tracking-tighter">评委库管理</h2>
             <p className="text-slate-500 font-medium mt-1">管理社区顶层评审团队的公开形象资料。</p>
          </div>
          <div className="relative w-full md:w-80">
             <input 
               type="text" 
               placeholder="搜索评委姓名或地点..." 
               value={search}
               onChange={e => setSearch(e.target.value)}
               className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-theme/10 transition-all"
             />
             <Search className="absolute left-4 top-4 text-slate-400" size={18} />
          </div>
       </div>

       {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <Loader2 className="animate-spin text-theme" size={40} />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">同步评委元数据...</span>
          </div>
       ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {filtered.map(judge => (
                <div key={judge.id} className="group p-6 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl transition-all relative overflow-hidden">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden ring-4 ring-white shadow-lg">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${judge.avatarSeed}`} alt={judge.name} />
                      </div>
                      <div>
                         <h4 className="text-lg font-black text-slate-900 tracking-tight">{judge.name}</h4>
                         <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <MapPin size={10} /> {judge.location || '未知位置'}
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3 mb-8">
                      <div className="p-3 bg-slate-50 rounded-2xl">
                         <div className="text-[9px] font-black text-slate-400 uppercase mb-1">评审总数</div>
                         <div className="text-xl font-black text-slate-900 flex items-center gap-2">
                            <Trophy size={14} className="text-amber-500" /> {judge.totalReviewed || 0}
                         </div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-2xl">
                         <div className="text-[9px] font-black text-slate-400 uppercase mb-1">质量均分</div>
                         <div className="text-xl font-black text-slate-900 flex items-center gap-2">
                            <Star size={14} className="text-theme" /> {judge.averageScore || 0}
                         </div>
                      </div>
                   </div>

                   <div className="flex gap-2">
                      <button 
                        onClick={() => navigate(`/admin/judge-profile/${judge.id}`)}
                        className="flex-1 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-theme transition-all flex items-center justify-center gap-2"
                      >
                         <Edit3 size={14} /> 编辑主页
                      </button>
                      <button 
                        onClick={() => window.open(`/#/judges/${judge.id}`, '_blank')}
                        className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-200 hover:text-slate-600 transition-all"
                      >
                         <Eye size={18} />
                      </button>
                   </div>
                </div>
             ))}
          </div>
       )}
    </div>
  );
};

export default AdminJudgeManagement;
