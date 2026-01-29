
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
  Chrome
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const role = email.toLowerCase().includes('admin') ? UserRole.ADMIN : UserRole.DEVELOPER;
      onLogin(role);
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  const BackgroundDecor = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8fafc]">
      {/* 柔和的彩色光晕 */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[0%] left-[-5%] w-[600px] h-[600px] bg-violet-200/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-blue-200/20 rounded-full blur-[80px]"></div>
      
      {/* 微妙的网格背景 */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40"></div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center relative py-12 px-6">
      <BackgroundDecor />

      <div className="relative z-10 w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Logo 区域 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl shadow-indigo-100 border border-indigo-50 mb-4 transition-transform hover:scale-105">
            <div className="w-10 h-10 bg-theme rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-theme/30">D</div>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">欢迎回来</h1>
          <p className="text-slate-500 mt-2 font-medium">DevFront 企业级组件协作平台</p>
        </div>

        {/* 主卡片 */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white/80 ring-1 ring-slate-200/50">
          
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
            {/* 邮箱输入 */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-slate-700 ml-1">企业邮箱</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-theme transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 h-12 bg-white/50 border border-slate-200 rounded-1.5xl outline-none focus:ring-4 focus:ring-theme/5 focus:border-theme transition-all text-slate-900 font-medium placeholder:text-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* 密码输入 */}
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
                  className="w-full pl-11 pr-4 h-12 bg-white/50 border border-slate-200 rounded-1.5xl outline-none focus:ring-4 focus:ring-theme/5 focus:border-theme transition-all text-slate-900 font-medium placeholder:text-slate-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* 注册额外字段 */}
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
                      className="w-full pl-11 pr-4 h-12 bg-white/50 border border-slate-200 rounded-1.5xl outline-none focus:ring-4 focus:ring-theme/5 focus:border-theme transition-all text-slate-900 font-medium placeholder:text-slate-400"
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
                      className="w-full pl-11 pr-4 h-12 bg-white/50 border border-slate-200 rounded-1.5xl outline-none focus:ring-4 focus:ring-theme/5 focus:border-theme transition-all text-slate-900 font-medium placeholder:text-slate-400"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 提交按钮 */}
            <button 
              type="submit"
              disabled={loading}
              className="group relative w-full h-13 mt-4 flex items-center justify-center gap-2 bg-theme text-white font-bold rounded-2xl shadow-xl shadow-theme/20 hover:bg-theme-dark transition-all active:scale-[0.98] disabled:opacity-70"
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

            {/* 第三方登录分割线 */}
            <div className="relative flex items-center justify-center my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <span className="relative px-4 bg-white text-[11px] font-bold text-slate-400 uppercase tracking-widest">或使用 SS0 接入</span>
            </div>

            {/* 第三方登录按钮组 */}
            <div className="flex gap-4">
              <button type="button" className="flex-1 h-12 flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-slate-700 text-sm">
                <Github size={20} className="text-slate-900" /> GitHub
              </button>
              <button type="button" className="flex-1 h-12 flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-slate-700 text-sm">
                <Chrome size={20} className="text-slate-900" /> Google
              </button>
            </div>
          </form>
        </div>

        {/* 底部信息 */}
        <div className="mt-8 flex flex-col items-center gap-4 animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center gap-2 py-2 px-4 bg-indigo-50/50 rounded-full border border-indigo-100/50">
            <Fingerprint size={16} className="text-theme animate-pulse" />
            <span className="text-[11px] font-bold text-slate-500">已开启生物特征识别支持</span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            &copy; 2024 DevFront Community. <button className="text-theme hover:underline font-bold">获取帮助</button>
          </p>
        </div>
      </div>

      <style>{`
        .rounded-1.5xl { border-radius: 0.875rem; }
        .h-13 { height: 3.25rem; }
      `}</style>
    </div>
  );
};

export default Login;
