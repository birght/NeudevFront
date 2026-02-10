
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { componentService } from '../services/api';
import { UserProfile } from '../types';
import { 
  ArrowLeft, MapPin, Twitter, Linkedin, Github, Globe, 
  ShieldCheck, Trophy, Star, Sparkles, MessageSquare, ExternalLink, ChevronRight
} from 'lucide-react';

const JudgeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [judge, setJudge] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      componentService.getUserById(id).then(data => {
        setJudge(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!judge) return <div className="p-20 text-center">Judge not found.</div>;

  return (
    <div className="bg-white min-h-screen pb-20 selection:bg-theme/10 selection:text-theme">
      {/* Back Header */}
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-20">
         <button onClick={() => navigate('/judges')} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-theme transition-all">
            <ArrowLeft size={16} /> Back to judges
         </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-10">
         {/* Left: Bio & Image */}
         <div className="lg:col-span-4 space-y-12">
            <div className="aspect-[4/5] bg-slate-50 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 relative group">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${judge.avatarSeed}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt={judge.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
            
            <div className="space-y-6">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block">Connect with {judge.name.split(' ')[0]}</label>
               <div className="flex flex-wrap gap-4">
                  {judge.socials?.website && (
                    <a href={`https://${judge.socials.website}`} className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-theme hover:text-white transition-all">
                       <Globe size={20} />
                    </a>
                  )}
                  {judge.socials?.twitter && (
                    <a href="#" className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-theme hover:text-white transition-all">
                       <Twitter size={20} />
                    </a>
                  )}
                  {judge.socials?.linkedin && (
                    <a href="#" className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-theme hover:text-white transition-all">
                       <Linkedin size={20} />
                    </a>
                  )}
                  {judge.socials?.github && (
                    <a href={`https://github.com/${judge.socials.github}`} className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                       <Github size={20} />
                    </a>
                  )}
               </div>
            </div>
         </div>

         {/* Right: Info & Stats */}
         <div className="lg:col-span-8 space-y-20">
            <div>
               <div className="flex items-center gap-3 mb-6">
                  <div className="px-4 py-1.5 bg-theme/5 text-theme text-[10px] font-black uppercase rounded-full border border-theme/20">
                     {judge.level}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     <MapPin size={12} /> {judge.location}
                  </div>
               </div>
               <h1 className="text-7xl font-black text-slate-900 tracking-tighter mb-8">{judge.name}</h1>
               <div className="prose prose-slate max-w-none">
                  <p className="text-2xl font-medium text-slate-500 leading-relaxed mb-10 italic">
                    "{judge.bio}"
                  </p>
               </div>
               
               <div className="grid grid-cols-3 gap-8 pt-10 border-t border-slate-50">
                  <div className="space-y-1">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reviewed</span>
                     <div className="text-3xl font-black text-slate-900 tabular-nums">{judge.totalReviewed}</div>
                  </div>
                  <div className="space-y-1">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average Score</span>
                     <div className="text-3xl font-black text-slate-900 tabular-nums">{judge.averageScore}</div>
                  </div>
                  <div className="space-y-1">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Member Since</span>
                     <div className="text-3xl font-black text-slate-900 tabular-nums">2024</div>
                  </div>
               </div>
            </div>

            <div className="space-y-10">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
                  <ShieldCheck size={14} className="text-theme" /> Expertise & Specialties
               </h3>
               <div className="flex flex-wrap gap-3">
                  {judge.specialties?.map(s => (
                    <span key={s} className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black text-slate-600 shadow-sm">
                       {s}
                    </span>
                  ))}
               </div>
            </div>

            {/* Simulated Judge Case Studies */}
            <div className="space-y-10">
               <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-3">
                     <Trophy size={14} className="text-amber-500" /> Recent Audits
                  </h3>
                  <button className="text-[10px] font-black text-theme uppercase tracking-widest flex items-center gap-2">View History <ChevronRight size={14} /></button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1,2].map(i => (
                    <div key={i} className="group p-6 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl transition-all cursor-pointer">
                       <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-10 bg-white rounded-xl border border-slate-100"></div>
                          <div className="px-3 py-1 bg-white text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-100">ACCEPTED</div>
                       </div>
                       <h4 className="text-sm font-black text-slate-900 mb-2">Advanced Data Visualization Platform v2.{i}</h4>
                       <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Star size={12} className="text-amber-500" /> 9.4 Score</span>
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

export default JudgeDetail;
