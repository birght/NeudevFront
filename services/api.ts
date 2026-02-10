
import { 
  ComponentSubmission, 
  ComponentSubmissionOverview, 
  ComponentSubmissionTrendPoint,
  UserProfile,
  UserRole
} from '../types';

// 模拟 API 响应
let mockSubmissions: ComponentSubmission[] = [
  {
    id: 101,
    title: '智慧医疗 - 患者生命体征看板',
    description: '采用高对比度布局设计，适配 4K 医疗监护屏，实时展示多维生命体征指标。',
    jsxCode: `<template>
  <div class="p-8 bg-slate-950 rounded-[2.5rem] border border-blue-500/20 shadow-2xl overflow-hidden relative">
    <div class="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full"></div>
    <div class="flex justify-between items-center mb-10">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
          <iconify-icon icon="ph:heartbeat-duotone" width="24"></iconify-icon>
        </div>
        <div>
          <h3 class="text-white font-black tracking-tight">VITAL SIGNS MONITOR</h3>
          <p class="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Real-time Telemetry</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6">
      <div class="p-6 bg-white/5 rounded-3xl border border-white/10 text-rose-500">
        <span class="text-[10px] text-slate-400 font-black uppercase">Heart Rate</span>
        <div class="text-4xl font-black mt-2">72 bpm</div>
      </div>
      <div class="p-6 bg-white/5 rounded-3xl border border-white/10 text-emerald-500">
        <span class="text-[10px] text-slate-400 font-black uppercase">SpO2 Level</span>
        <div class="text-4xl font-black mt-2">98 %</div>
      </div>
    </div>
  </div>
</template>`,
    status: 'accepted',
    templateType: 'vue',
    score: 98,
    industry: 'medical',
    category: 'Charts & Visualization',
    scenario: 'dashboard',
    tone: 'dark-tech',
    copyCount: 154,
    pointsPerCopy: 50,
    totalPointsEarned: 7700,
    authorName: 'Alex Rivera',
    authorAvatar: 'Alex',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 102,
    title: '金融风控 - 异常交易追踪图谱',
    description: '复杂的 D3.js 关系图谱，用于可视化资金流向及异常节点。',
    jsxCode: `<template><div class="p-8 bg-white text-slate-900"><h3>Financial Graph Placeholder</h3></div></template>`,
    status: 'pending',
    templateType: 'vue',
    industry: 'finance',
    category: 'Data Visualization',
    scenario: 'admin',
    tone: 'modern',
    copyCount: 0,
    pointsPerCopy: 200,
    totalPointsEarned: 0,
    authorName: 'Sarah Chen',
    authorAvatar: 'Sarah',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockUsers: UserProfile[] = [
  { id: '1', name: 'Alex Rivera', email: 'admin@devfront.com', role: UserRole.ADMIN, points: 2500, level: 'Master', avatarSeed: 'Alex', joinedAt: '2024-01-15', submissionCount: 45, lastActive: '2分钟前' },
  { id: '2', name: 'Sarah Chen', email: 'author@devfront.com', role: UserRole.AUTHOR, points: 1200, level: 'Gold', avatarSeed: 'Sarah', joinedAt: '2024-02-10', submissionCount: 22, lastActive: '1小时前' },
];

export const componentService = {
  async listMySubmissions(): Promise<ComponentSubmission[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockSubmissions), 500));
  },

  async listAllSubmissions(): Promise<ComponentSubmission[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockSubmissions), 400));
  },

  async getComponentById(id: number): Promise<ComponentSubmission | null> {
    const item = mockSubmissions.find(s => s.id === id);
    return new Promise(resolve => setTimeout(() => resolve(item || null), 400));
  },

  async updateSubmissionStatus(id: number, data: Partial<ComponentSubmission>): Promise<boolean> {
    const idx = mockSubmissions.findIndex(s => s.id === id);
    if (idx > -1) {
      mockSubmissions[idx] = { ...mockSubmissions[idx], ...data, updatedAt: new Date().toISOString() };
      return new Promise(resolve => setTimeout(() => resolve(true), 500));
    }
    return false;
  },

  async createSubmission(payload: Partial<ComponentSubmission>): Promise<ComponentSubmission> {
    const newItem = { 
      ...payload, 
      id: Math.floor(Math.random() * 1000), 
      status: 'pending', 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as ComponentSubmission;
    mockSubmissions.push(newItem);
    return newItem;
  },

  async getOverview(): Promise<ComponentSubmissionOverview> {
    return {
      total: mockSubmissions.length,
      accepted: mockSubmissions.filter(s => s.status === 'accepted').length,
      rejected: mockSubmissions.filter(s => s.status === 'rejected').length,
      pending: mockSubmissions.filter(s => s.status === 'pending').length,
      approvalRate: 91,
      lastMonthTotal: 120,
      momPercent: 30
    };
  },

  async getTrends(days: number): Promise<ComponentSubmissionTrendPoint[]> {
    return [
      { date: 'Mon', count: 12 },
      { date: 'Tue', count: 19 },
      { date: 'Wed', count: 15 },
      { date: 'Thu', count: 22 },
      { date: 'Fri', count: 30 },
    ];
  },

  async listUsers(): Promise<UserProfile[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockUsers), 400));
  },

  async updateUserRole(userId: string, newRole: UserRole): Promise<boolean> {
    return new Promise(resolve => setTimeout(() => resolve(true), 300));
  }
};
