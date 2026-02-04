
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  KeyRound,
  UserPlus,
  LogIn,
  Fingerprint,
  Github,
  Chrome,
  ShieldAlert,
  UserCog,
  ShieldEllipsis,
  MousePointerClick
} from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  isLoggedIn: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoggedIn }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const defaultAccounts = [
    { role: UserRole.ADMIN, email: 'admin@devfront.com', pass: 'admin123', label: '超级管理员', icon: ShieldAlert, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { role: UserRole.AUTHOR, email: 'author@devfront.com', pass: 'author123', label: '核心创作者', icon: UserCog, color: 'text-theme', bg: 'bg-theme/5' },
    { role: UserRole.EVALUATOR, email: 'evaluator@devfront.com', pass: 'eval123', label: '社区评委', icon: ShieldEllipsis, color: 'text-violet-600', bg: 'bg-violet-50' }
  ];

  const quickFill = (acc: typeof defaultAccounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.pass);
    setMode('login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 模拟登录校验逻辑
    setTimeout(() => {
      let role = UserRole.AUTHOR;
      const lowerEmail = email.toLowerCase();
      
      if (lowerEmail.includes('admin')) {
        role = UserRole.ADMIN;
      } else if (lowerEmail.includes('eval')) {
        role = UserRole.EVALUATOR;
      } else {
        role = UserRole.AUTHOR;
      }

      onLogin(role);
      setLoading(false);
      navigate('/admin'); // 登录后直接跳转到管理后台查看效果
    }, 800);
  };

  const BackgroundDecor = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8fafc]">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[0%] left-[-5%] w-[600px] h-[600px] bg-violet-200/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center relative py-12 px-6">
      <BackgroundDecor />

      <div className="relative z-10 w-full max-w-[1000px] flex flex-col lg:flex-row gap-12 items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* 左侧：品牌与预设账号引导 */}
        <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-indigo-50 mb-6">
              <div className="w-10 h-10 bg-theme rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-theme/30">D</div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
              欢迎进入 <br/><span className="text-theme">DevFront 实验室</span>
            </h1>
            <p className="text-slate-500 mt-4 font-medium max-w-md mx-auto lg:mx-0">
              请使用企业账号接入。如果您是初次访问，可以点击下方的预设角色快速体验。
            </p>
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">
                快速接入通道 (Quick Access)
             </label>
             <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                {defaultAccounts.map(acc => (
                  <button 
                    key={acc.role}
                    onClick={() => quickFill(acc)}
                    className="group flex items-center gap-4 p-4 bg-white/60 backdrop-blur border border-slate-100 rounded-2xl hover:border-theme hover:shadow-xl hover:shadow-theme/5 transition-all text-left active:scale-[0.98]"
                  >
                    <div className={`p-3 rounded-xl ${acc.bg} ${acc.color} group-hover:bg-theme group-hover:text-white transition-colors`}>
                       <acc.icon size={20} />
                    </div>
                    <div>
                       <div className="text-xs font-black text-slate-900 flex items-center gap-2">
                         {acc.label}
                         <MousePointerClick size={12} className="opacity-0 group-hover:opacity-100 text-theme transition-opacity" />
                       </div>
                       <div className="text-[10px] text-slate-400 font-bold mt-0.5">{acc.email} / {acc.pass}</div>
                    </div>
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* 右侧：登录卡片 */}
        <div className="w-full lg:w-[460px]">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white/80 ring-1 ring-slate-200/50">
            
            {/* 切换 Tabs */}
            <div className="flex p-1.5 bg-slate-100/80 rounded-2xl mb-8">
              <button 
                onClick={() => setMode('login')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  mode === 'login' 
                  ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <LogIn size={16} /> 账号登录
              </button>
              <button 
                onClick={() => setMode('signup')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  mode === 'signup' 
                  ? 'bg-white text-slate-900 shadow-md ring-1 ring-slate-200/50' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <UserPlus size={16} /> 申请加入
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[13px] font-bold text-slate-700 ml-1">企业邮箱</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-theme transition-colors" size={18} />
                  <input 
                    type="email" 
                    required
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 h-12 bg-white/50 border border-slate-200 rounded-1.5xl outline-none focus:ring-4 focus:ring-theme/5 focus:border-theme transition-all text-slate-900 font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[13px] font-bold text-slate-700">访问密码</label>
                  {mode === 'login' && (
                    <button type="button" className="text-[12px] font-bold text-theme hover:underline transition-all">忘记密码？</button>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-theme transition-colors" size={18} />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 h-12 bg-white/50 border border-slate-200 rounded-1.5xl outline-none focus:ring-4 focus:ring-theme/5 focus:border-theme transition-all text-slate-900 font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-slate-700 ml-1">确认密码</label>
                    <div className="relative group">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-theme transition-colors" size={18} />
                      <input 
                        type="password" 
                        required
                        placeholder="再次输入密码"
                        className="w-full pl-11 pr-4 h-12 bg-white/50 border border-slate-200 rounded-1.5xl outline-none focus:ring-4 focus:ring-theme/5 focus:border-theme transition-all text-slate-900 font-medium"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-slate-700 ml-1">邀请码</label>
                    <div className="relative group">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-theme transition-colors" size={18} />
                      <input 
                        type="text" 
                        required
                        placeholder="内部邀请代码"
                        className="w-full pl-11 pr-4 h-12 bg-white/50 border border-slate-200 rounded-1.5xl outline-none focus:ring-4 focus:ring-theme/5 focus:border-theme transition-all text-slate-900 font-medium"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="group relative w-full h-12 mt-4 flex items-center justify-center gap-2 bg-theme text-white font-bold rounded-2xl shadow-xl shadow-theme/20 hover:bg-theme-dark transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{mode === 'login' ? '立即接入系统' : '创建开发者账号'}</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <div className="relative flex items-center justify-center my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <span className="relative px-4 bg-white text-[11px] font-bold text-slate-400 uppercase tracking-widest">或使用 SS0 接入</span>
              </div>

              <div className="flex gap-4">
                <button type="button" className="flex-1 h-12 flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm">
                  <Github size={20} className="text-slate-900" /> GitHub
                </button>
                <button type="button" className="flex-1 h-12 flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 text-sm">
                  <Chrome size={20} className="text-slate-900" /> Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .rounded-1.5xl { border-radius: 0.875rem; }
      `}</style>
    </div>
  );
};

export default Login;
