
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { componentService } from '../services/api';
import { UserProfile } from '../types';
import { Search, MapPin, Trophy, ShieldCheck, Globe, Star, ArrowRight } from 'lucide-react';

const Judges: React.FC = () => {
  const navigate = useNavigate();
  const [judges, setJudges] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    componentService.listJudges().then(data => {
      setJudges(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
         <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">THE JUDGES</h1>
         <p className="text-slate-500 font-medium max-w-xl mx-auto mb-10 leading-relaxed text-lg">
           全公司最挑剔的眼光，负责确保每一行被收录的代码都符合极致的设计与性能标准。
         </p>
         
         <div className="flex justify-center gap-4">
            {['All', 'Grandmaster', 'Master'].map(lvl => (
              <button 
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${filter === lvl ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
              >
                {lvl}
              </button>
            ))}
         </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {judges.filter(j => filter === 'All' || j.level === filter).map((judge) => (
              <div 
                key={judge.id} 
                onClick={() => navigate(`/judges/${judge.id}`)}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] bg-slate-100 rounded-[2.5rem] overflow-hidden relative shadow-sm transition-all group-hover:-translate-y-3 group-hover:shadow-2xl">
                   <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${judge.avatarSeed}`} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    alt={judge.name}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   
                   <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex items-center gap-2 mb-2">
                         <MapPin size={12} className="text-white/60" />
                         <span className="text-[10px] text-white font-bold uppercase tracking-widest">{judge.location}</span>
                      </div>
                      <button className="w-full py-3 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2">
                         View Profile <ArrowRight size={14} />
                      </button>
                   </div>
                   
                   {/* Level Badge */}
                   <div className="absolute top-6 right-6">
                      <div className={`px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-black text-white uppercase tracking-tighter`}>
                         {judge.level}
                      </div>
                   </div>
                </div>
                
                <div className="mt-6 text-center">
                   <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-theme transition-colors">{judge.name}</h3>
                   <div className="flex items-center justify-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase">
                         <Trophy size={12} className="text-amber-500" /> {judge.totalReviewed} Reviewed
                      </div>
                      <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase">
                         <Star size={12} className="text-theme" /> {judge.averageScore} AVG
                      </div>
                   </div>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Judges;
