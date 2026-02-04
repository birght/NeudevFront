
import React, { useState, useEffect } from 'react';
import { ComponentSubmission } from '../../types';
import { componentService } from '../../services/api';
import { Clock, TrendingUp, ChevronRight, HeartPulse, Wallet, CarFront, Landmark, Cpu } from 'lucide-react';

const AdminMyItems: React.FC = () => {
  const [items, setItems] = useState<ComponentSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const industries = [
    { id: 'medical', name: '医疗健康', icon: HeartPulse, color: 'text-blue-500' },
    { id: 'finance', name: '金融', icon: Wallet, color: 'text-emerald-600' },
    { id: 'traffic', name: '交通', icon: CarFront, color: 'text-rose-500' },
    { id: 'dev-reform', name: '发改', icon: Landmark, color: 'text-rose-700' },
    { id: 'manufacturing', name: '制造', icon: Cpu, color: 'text-slate-600' }
  ];

  useEffect(() => {
    componentService.listMySubmissions().then(setItems).finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-12 animate-in fade-in duration-500">
       <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">我的贡献足迹</h2>
            <p className="text-slate-500 font-medium mt-1">沉淀的每一行代码都是您的技术品牌。</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map(sub => {
            const ind = industries.find(i => i.id === sub.industry) || industries[0];
            return (
              <div key={sub.id} className="group p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-2xl transition-all relative overflow-hidden">
                 <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${sub.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {sub.status === 'accepted' ? '已上线' : '审核中'}
                 </div>
                 <div className="flex items-center gap-2 mb-4">
                    <ind.icon size={16} className={ind.color} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{ind.name} / {sub.category}</span>
                 </div>
                 <h3 className="text-xl font-black text-slate-900 group-hover:text-theme transition-colors">{sub.title}</h3>
                 <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed font-medium">{sub.description || '暂无详细业务描述...'}</p>
                 
                 <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                    <div className="flex gap-4">
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><Clock size={12}/> {new Date(sub.createdAt).toLocaleDateString()}</div>
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-theme"><TrendingUp size={12}/> {sub.downloads} 次引用</div>
                    </div>
                    <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-theme hover:text-white transition-all"><ChevronRight size={18}/></button>
                 </div>
              </div>
            );
          })}
       </div>
    </div>
  );
};

export default AdminMyItems;
