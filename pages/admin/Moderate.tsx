
import React from 'react';
import { Terminal, ShieldCheck } from 'lucide-react';

const AdminModerate: React.FC = () => {
  return (
    <div className="p-20 flex flex-col items-center justify-center text-center">
       <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-theme mb-8">
          <ShieldCheck size={48} />
       </div>
       <h3 className="text-2xl font-black text-slate-900">审核管理系统</h3>
       <p className="text-slate-500 font-medium mt-2 max-w-sm">目前有 12 个待处理的艺术品，系统正在准备审核沙箱环境...</p>
       <button className="mt-8 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all">
          进入极速审批模式
       </button>
    </div>
  );
};

export default AdminModerate;
