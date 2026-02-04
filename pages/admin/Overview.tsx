
import React, { useState, useEffect } from 'react';
import { ComponentSubmissionOverview, ComponentSubmissionTrendPoint } from '../../types';
import { componentService } from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Layers, Zap, TrendingUp } from 'lucide-react';

const AdminOverview: React.FC = () => {
  const [overview, setOverview] = useState<ComponentSubmissionOverview | null>(null);
  const [trends, setTrends] = useState<ComponentSubmissionTrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    componentService.getOverview().then(setOverview);
    componentService.getTrends(7).then(setTrends).finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-12 animate-in fade-in duration-500">
       <div className="flex justify-between items-center mb-12">
         <div>
           <h2 className="text-4xl font-black text-slate-900 tracking-tighter">社区生态看板</h2>
           <p className="text-slate-500 font-medium mt-1">每一行代码都在为全人类的前端事业做出微小贡献。</p>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-10 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50 relative group">
            <span className="text-[11px] font-black text-blue-400 uppercase tracking-widest">已沉淀资产</span>
            <div className="text-5xl font-black text-slate-900 mt-3 tracking-tighter">{overview?.total}</div>
            <div className="absolute bottom-6 right-6 p-4 bg-white rounded-3xl shadow-sm text-blue-500 group-hover:scale-110 transition-transform"><Layers size={24} /></div>
          </div>
          <div className="p-10 bg-emerald-50/50 rounded-[2.5rem] border border-emerald-100/50 relative group">
            <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">平均准入分</span>
            <div className="text-5xl font-black text-slate-900 mt-3 tracking-tighter">94.2</div>
            <div className="absolute bottom-6 right-6 p-4 bg-white rounded-3xl shadow-sm text-emerald-500 group-hover:scale-110 transition-transform"><Zap size={24} /></div>
          </div>
          <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white relative group">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">全球总引用</span>
            <div className="text-5xl font-black mt-3 tracking-tighter">24.5k</div>
            <div className="absolute bottom-6 right-6 p-4 bg-white/10 rounded-3xl text-theme group-hover:scale-110 transition-transform"><TrendingUp size={24} /></div>
          </div>
       </div>

       <div className="h-80 w-full bg-slate-50/50 rounded-[2.5rem] p-10 border border-slate-100">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#94a3b8'}} dy={10} />
              <YAxis hide />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="count" fill="var(--theme-color)" radius={[12, 12, 0, 0]} barSize={40}>
                 {trends.map((_, i) => <Cell key={i} fill={i === trends.length -1 ? 'var(--theme-color)' : '#cbd5e1'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
       </div>
    </div>
  );
};

export default AdminOverview;
