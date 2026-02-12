
import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { componentService } from '../../services/api';
import { InvitationCode } from '../../types';
import { 
  Settings2, Globe, Palette, ShieldAlert, Key, 
  Plus, Trash2, Copy, Check, ChevronLeft, ChevronRight,
  Zap, Calendar, Clock, Loader2, Sparkles, Filter, 
  UserPlus, Hash, ShieldCheck
} from 'lucide-react';

const AdminSystemSettings: React.FC = () => {
  const { lang, setLang, theme, setTheme, themes, isMourning, setIsMourning } = useSettings();
  
  // 邀请码管理状态
  const [codes, setCodes] = useState<InvitationCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // 生成器表单
  const [genCount, setGenCount] = useState(10);
  const [genExpiry, setGenExpiry] = useState(30); // 天数

  // 翻页状态
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    loadCodes();
  }, []);

  const loadCodes = async () => {
    setLoading(true);
    const data = await componentService.listInvitationCodes();
    setCodes(data);
    setLoading(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await componentService.createInvitationCodes(genCount, genExpiry);
    await loadCodes();
    setIsGenerating(false);
  };

  const handleDelete = async (id: string) => {
    const success = await componentService.deleteInvitationCode(id);
    if (success) {
      setCodes(codes.filter(c => c.id !== id));
    }
  };

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 翻页逻辑
  const totalPages = Math.ceil(codes.length / itemsPerPage);
  const currentCodes = codes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const StatusBadge = ({ status }: { status: InvitationCode['status'] }) => {
    switch (status) {
      case 'active': return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg border border-emerald-100 uppercase">有效</span>;
      case 'used': return <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[9px] font-black rounded-lg border border-blue-100 uppercase">已使用</span>;
      case 'expired': return <span className="px-2.5 py-1 bg-slate-100 text-slate-400 text-[9px] font-black rounded-lg border border-slate-200 uppercase">已过期</span>;
      default: return null;
    }
  };

  return (
    <div className="p-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">系统综合配置</h2>
          <p className="text-slate-500 font-medium mt-1">管理社区核心环境变量与准入策略。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* 左侧：偏好设置面板 */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 space-y-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <Settings2 size={14} /> 全局偏好 (Preferences)
            </h3>

            {/* 语言设置 */}
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-900 flex items-center gap-2">
                <Globe size={14} className="text-theme" /> 默认系统语言
              </label>
              <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                <button onClick={() => setLang('zh')} className={`flex-1 py-2.5 text-[11px] font-black rounded-xl transition-all ${lang === 'zh' ? 'bg-theme text-white shadow-lg shadow-theme/20' : 'text-slate-400'}`}>中文 (ZH)</button>
                <button onClick={() => setLang('en')} className={`flex-1 py-2.5 text-[11px] font-black rounded-xl transition-all ${lang === 'en' ? 'bg-theme text-white shadow-lg shadow-theme/20' : 'text-slate-400'}`}>ENGLISH (EN)</button>
              </div>
            </div>

            {/* 主题设置 */}
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-900 flex items-center gap-2">
                <Palette size={14} className="text-theme" /> 品牌核心视觉
              </label>
              <div className="grid grid-cols-5 gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                {themes.map(t => (
                  <button 
                    key={t.name}
                    onClick={() => setTheme(t)}
                    className={`aspect-square rounded-full border-4 transition-all hover:scale-110 ${theme.name === t.name ? 'border-slate-900 scale-125' : 'border-transparent'}`}
                    style={{ backgroundColor: t.main }}
                  />
                ))}
              </div>
            </div>

            {/* 哀悼模式 */}
            <div className="pt-6 border-t border-slate-200">
               <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-xl transition-colors ${isMourning ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <ShieldAlert size={18} />
                     </div>
                     <div>
                        <div className="text-xs font-black text-slate-900">哀悼模式</div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">全站灰度渲染</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => setIsMourning(!isMourning)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all ${isMourning ? 'bg-slate-900' : 'bg-slate-200'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isMourning ? 'translate-x-6' : 'translate-x-2'}`} />
                  </button>
               </div>
            </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:scale-125 transition-transform duration-700">
                <Zap size={140} />
             </div>
             <h4 className="text-sm font-black mb-2 flex items-center gap-2 relative z-10"><Sparkles size={16} className="text-amber-400" /> 生态治理说明</h4>
             <p className="text-[11px] text-slate-400 leading-relaxed relative z-10">
               配置修改将实时应用至生产环境。如有大规模变更，建议在非高峰时段操作以降低缓存不一致风险。
             </p>
          </div>
        </div>

        {/* 右侧：邀请码管理中心 */}
        <div className="lg:col-span-8 space-y-8">
           {/* 生成控制台 */}
           <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-2xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Key size={14} /> 邀请码中心 (Invitation Hub)
                 </h3>
                 <div className="px-3 py-1 bg-amber-50 text-amber-600 text-[9px] font-black rounded-full border border-amber-100 flex items-center gap-2">
                    <UserPlus size={12} /> 开发者准入必备
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">批量生成数量</label>
                    <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
                       {[10, 20, 50].map(v => (
                         <button key={v} onClick={() => setGenCount(v)} className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${genCount === v ? 'bg-white shadow-sm text-theme' : 'text-slate-400'}`}>{v}</button>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">邀请码有效期 (天)</label>
                    <select 
                      value={genExpiry}
                      onChange={e => setGenExpiry(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none appearance-none"
                    >
                       <option value={1}>1天 (紧急接入)</option>
                       <option value={7}>7天 (临时合规)</option>
                       <option value={30}>30天 (标准周期)</option>
                       <option value={999}>永久 (核心成员)</option>
                    </select>
                 </div>
                 <div className="flex items-end">
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full py-3.5 bg-theme text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-theme/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                       {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                       立即生成批次
                    </button>
                 </div>
              </div>
           </div>

           {/* 列表展示区域 */}
           <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">邀请码字符串</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">当前状态</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">到期时间</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">操作</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {loading ? (
                          <tr><td colSpan={4} className="py-20 text-center"><Loader2 size={32} className="animate-spin text-slate-200 mx-auto" /></td></tr>
                       ) : currentCodes.map(code => (
                          <tr key={code.id} className="group hover:bg-slate-50/50 transition-colors">
                             <td className="px-8 py-5">
                                <div className="flex items-center gap-3">
                                   <div className="p-2 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-theme group-hover:text-white transition-colors">
                                      <Hash size={14} />
                                   </div>
                                   <span className="text-xs font-mono font-bold text-slate-900 tracking-wider">{code.code}</span>
                                </div>
                             </td>
                             <td className="px-8 py-5 text-center"><StatusBadge status={code.status} /></td>
                             <td className="px-8 py-5">
                                <div className="flex flex-col">
                                   <span className="text-xs font-bold text-slate-700">{code.expiresAt}</span>
                                   <span className="text-[9px] text-slate-400 font-medium uppercase mt-0.5 flex items-center gap-1">
                                      <Calendar size={10} /> Created: {code.createdAt}
                                   </span>
                                </div>
                             </td>
                             <td className="px-8 py-5 text-right">
                                <div className="flex items-center justify-end gap-2">
                                   <button 
                                     onClick={() => handleCopy(code.id, code.code)}
                                     className={`p-2 rounded-xl transition-all ${copiedId === code.id ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400 hover:text-theme hover:bg-theme/10'}`}
                                   >
                                      {copiedId === code.id ? <Check size={16} /> : <Copy size={16} />}
                                   </button>
                                   <button 
                                     onClick={() => handleDelete(code.id)}
                                     className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                   >
                                      <Trash2 size={16} />
                                   </button>
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              {/* 翻页控制 */}
              <div className="px-8 py-6 bg-slate-50/30 flex items-center justify-between border-t border-slate-100">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   Showing {currentCodes.length} of {codes.length} Codes
                 </span>
                 <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 disabled:opacity-30 hover:shadow-md transition-all"
                    >
                       <ChevronLeft size={16} />
                    </button>
                    <div className="flex gap-1.5">
                       {Array.from({ length: totalPages }).map((_, i) => (
                         <button 
                           key={i} 
                           onClick={() => setCurrentPage(i + 1)}
                           className={`w-8 h-8 rounded-xl text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-theme text-white shadow-lg shadow-theme/20' : 'bg-white text-slate-400 border border-slate-100'}`}
                         >
                           {i + 1}
                         </button>
                       ))}
                    </div>
                    <button 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 disabled:opacity-30 hover:shadow-md transition-all"
                    >
                       <ChevronRight size={16} />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSystemSettings;
