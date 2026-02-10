
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { componentService } from '../../services/api';
import { UserProfile, UserRole } from '../../types';
import { 
  Save, User, MapPin, Globe, Twitter, Linkedin, Github, 
  Sparkles, Bold, Italic, List, AlignLeft, Loader2, CheckCircle2,
  Tags, Info, Image as ImageIcon, X, ArrowLeft, ShieldAlert
} from 'lucide-react';

interface JudgeProfileEditProps {
  currentUserId?: string;
}

const JudgeProfileEdit: React.FC<JudgeProfileEditProps> = ({ currentUserId }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  // 决定要加载哪个 ID：优先使用 URL 中的 ID，如果没有则使用当前登录者 ID
  const targetId = id || currentUserId;

  useEffect(() => {
    if (!targetId) {
      setLoading(false);
      return;
    }

    // 加载目标评委资料
    componentService.getUserById(targetId).then(data => {
      if (data) {
        // 权限校验：如果当前用户不是管理员，且试图编辑他人 ID，则拦截
        // 此处模拟，实际需配合 Auth Context
        setProfile(data);
      } else {
        setUnauthorized(true);
      }
      setLoading(false);
    });
  }, [targetId]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    const success = await componentService.updateProfile(profile.id, profile);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
    setSaving(false);
  };

  const updateSocial = (key: string, val: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      socials: { ...profile.socials, [key]: val }
    });
  };

  if (loading) return (
    <div className="h-full flex items-center justify-center bg-white">
       <Loader2 className="animate-spin text-theme" size={40} />
    </div>
  );

  if (unauthorized || !profile) return (
    <div className="p-20 flex flex-col items-center justify-center text-center bg-white h-full">
       <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center text-rose-500 mb-6">
          <ShieldAlert size={40} />
       </div>
       <h3 className="text-xl font-black text-slate-900 tracking-tight">无权访问或资料不存在</h3>
       <p className="text-slate-400 font-medium mt-1">您仅可以编辑属于您自己的评委主页。</p>
       <button onClick={() => navigate('/admin/overview')} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest">返回概览</button>
    </div>
  );

  const isEditingSelf = profile.id === currentUserId;

  return (
    <div className="p-12 animate-in fade-in duration-700 bg-white min-h-full flex flex-col">
       
       {/* Toast */}
       {showToast && (
         <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4">
            <div className="px-6 py-3 bg-emerald-600 text-white rounded-2xl shadow-2xl flex items-center gap-3">
               <CheckCircle2 size={20} />
               <span className="text-xs font-black uppercase tracking-widest">Profile Updated Successfully</span>
            </div>
         </div>
       )}

       <div className="flex justify-between items-center mb-12 shrink-0">
          <div className="flex items-center gap-6">
             {/* 如果是管理员在编辑他人，显示返回按钮 */}
             {!isEditingSelf && (
               <button onClick={() => navigate('/admin/judges')} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-theme hover:text-white transition-all">
                  <ArrowLeft size={20} />
               </button>
             )}
             <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
                   {isEditingSelf ? '我的个人主页' : `编辑评委: ${profile.name}`}
                </h2>
                <p className="text-slate-500 font-medium mt-1">
                   {isEditingSelf ? '向社区展示您的评审哲学与技术品味。' : '正在以管理员身份协助优化该评委的品牌形象。'}
                </p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             {!isEditingSelf && (
               <div className="px-4 py-2 bg-amber-50 text-amber-600 text-[10px] font-black uppercase rounded-xl border border-amber-100 flex items-center gap-2">
                  <ShieldAlert size={14} /> 管理员代编辑模式
               </div>
             )}
             <button 
               onClick={handleSave}
               disabled={saving}
               className="px-8 py-4 bg-slate-900 text-white text-xs font-black rounded-2xl hover:bg-theme transition-all shadow-xl active:scale-95 flex items-center gap-2"
             >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                保存更新资料
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 overflow-hidden">
          
          {/* Left: Tiptap Style Editor */}
          <div className="lg:col-span-7 flex flex-col gap-8 overflow-hidden">
             
             <div className="flex flex-col flex-1 space-y-4 overflow-hidden">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Sparkles size={14} className="text-amber-500" /> 个人艺术简介 (Biography)
                </label>
                
                <div className="flex-1 flex flex-col border border-slate-200 rounded-[2.5rem] bg-white shadow-sm overflow-hidden focus-within:ring-4 focus-within:ring-theme/5 focus-within:border-theme transition-all">
                   <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
                      <div className="flex items-center gap-0.5 border-r border-slate-200 pr-4">
                         <button className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-theme transition-colors"><Bold size={16} /></button>
                         <button className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-theme transition-colors"><Italic size={16} /></button>
                         <button className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-theme transition-colors"><List size={16} /></button>
                      </div>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Rich Text v3.9 Core</span>
                   </div>
                   
                   <textarea 
                     value={profile.bio}
                     onChange={e => setProfile({...profile, bio: e.target.value})}
                     className="flex-1 p-8 text-lg font-medium text-slate-600 outline-none resize-none custom-scroll leading-relaxed"
                     placeholder="在此描述该评委的专业背景、设计哲学以及对优秀作品的定义..."
                   />
                </div>
             </div>

             <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Tags size={14} /> 专业细分领域 (Specialties)
                </label>
                <div className="flex flex-wrap gap-2">
                   {profile.specialties?.map(s => (
                     <div key={s} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black text-slate-600 flex items-center gap-2">
                        {s} <X className="cursor-pointer hover:text-rose-500" size={12} onClick={() => setProfile({...profile, specialties: profile.specialties?.filter(x => x !== s)})} />
                     </div>
                   ))}
                   <button className="px-4 py-2 border border-dashed border-slate-300 rounded-xl text-[11px] font-bold text-slate-400 hover:border-theme hover:text-theme transition-all">+ 新增领域</button>
                </div>
             </div>
          </div>

          {/* Right: Personal Meta */}
          <div className="lg:col-span-5 space-y-8 overflow-y-auto custom-scroll pr-2">
             
             <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 space-y-6">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatarSeed}`} alt="avatar" />
                   </div>
                   <div>
                      <h4 className="text-xl font-black text-slate-900">{profile.name}</h4>
                      <span className="text-[10px] font-black text-theme uppercase tracking-widest">{profile.level} Evaluator</span>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">地理位置 (Location)</label>
                      <div className="relative group">
                         <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-theme transition-colors" />
                         <input 
                           type="text" 
                           value={profile.location || ''}
                           onChange={e => setProfile({...profile, location: e.target.value})}
                           className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-theme/5 transition-all"
                         />
                      </div>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">官方网站 (Portfolio)</label>
                      <div className="relative group">
                         <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-theme transition-colors" />
                         <input 
                           type="text" 
                           value={profile.socials?.website || ''}
                           onChange={e => updateSocial('website', e.target.value)}
                           className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-theme/5 transition-all"
                         />
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-8 border border-slate-100 rounded-[2.5rem] space-y-6">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Globe size={14} /> 社交媒体矩阵 (Social Matrix)
                </label>
                <div className="grid grid-cols-1 gap-4">
                   <div className="relative group">
                      <Twitter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                      <input 
                        placeholder="Twitter Handle" 
                        value={profile.socials?.twitter || ''}
                        onChange={e => updateSocial('twitter', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none" 
                      />
                   </div>
                   <div className="relative group">
                      <Linkedin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-700 transition-colors" />
                      <input 
                        placeholder="LinkedIn Profile" 
                        value={profile.socials?.linkedin || ''}
                        onChange={e => updateSocial('linkedin', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none" 
                      />
                   </div>
                   <div className="relative group">
                      <Github size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" />
                      <input 
                        placeholder="GitHub Username" 
                        value={profile.socials?.github || ''}
                        onChange={e => updateSocial('github', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none" 
                      />
                   </div>
                </div>
             </div>
          </div>
       </div>

       <style>{`
          .custom-scroll::-webkit-scrollbar { width: 4px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
       `}</style>
    </div>
  );
};

export default JudgeProfileEdit;
