
import { 
  ComponentSubmission, 
  ComponentSubmissionOverview, 
  ComponentSubmissionTrendPoint,
  UserProfile,
  UserRole,
  InvitationCode
} from '../types';

let mockInvitationCodes: InvitationCode[] = [
  { id: '1', code: 'DEV-8829-XJ21', status: 'active', expiresAt: '2025-12-31', createdAt: '2024-03-20' },
  { id: '2', code: 'ADM-1102-LL99', status: 'used', expiresAt: '2024-12-31', createdAt: '2024-01-10', usedBy: 'Alex Rivera' },
  { id: '3', code: 'EVL-4452-PQ01', status: 'expired', expiresAt: '2024-02-01', createdAt: '2024-01-01' },
];

let mockUsers: UserProfile[] = [
  { 
    id: '1', name: 'Alex Rivera', email: 'admin@devfront.com', role: UserRole.ADMIN, points: 2500, level: 'Master', avatarSeed: 'Alex', joinedAt: '2024-01-15', submissionCount: 45, lastActive: '2分钟前',
    bio: '专注于数字孪生与大屏可视化，致力于将代码与美学完美融合。', location: 'Barcelona, Spain', socials: { twitter: '@arivera', github: 'arivera', website: 'arivera.design' }, specialties: ['Data Viz', '3D Web', 'UX Architecture'], totalReviewed: 124, averageScore: 9.1
  },
  { 
    id: '2', name: 'Sarah Chen', email: 'author@devfront.com', role: UserRole.AUTHOR, points: 1200, level: 'Gold', avatarSeed: 'Sarah', joinedAt: '2024-02-10', submissionCount: 22, lastActive: '1小时前' 
  },
  { 
    id: '3', name: 'Federica Gandolfo', email: 'evaluator@devfront.com', role: UserRole.EVALUATOR, points: 3400, level: 'Grandmaster', avatarSeed: 'Federica', joinedAt: '2023-11-20', submissionCount: 12, lastActive: '刚刚',
    bio: 'UX Designer & Creative Frontend Developer. I believe in the power of micro-interactions and functional art.', location: 'Milan, Italy', socials: { twitter: '@federica_g', linkedin: 'federica-gandolfo', website: 'federica.io' }, specialties: ['Micro-interactions', 'Motion Art', 'Design Systems'], totalReviewed: 286, averageScore: 8.8
  }
];

let mockSubmissions: ComponentSubmission[] = [
  {
    id: 101, title: '智慧医疗 - 患者生命体征看板', description: '采用高对比度布局设计，适配 4K 医疗监护屏。', jsxCode: `<template>\n  <div class="p-8 text-center bg-slate-900 rounded-3xl border border-white/10">\n    <h3 class="text-emerald-400 font-black text-2xl mb-4">HEART RATE: 72 BPM</h3>\n    <div class="h-20 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">\n       <span class="text-emerald-500 animate-pulse text-sm font-mono tracking-widest">WAVEFORM ACTIVE</span>\n    </div>\n  </div>\n</template>`, 
    status: 'accepted', templateType: 'vue', score: 9.2, scoreBreakdown: { design: 9.5, code: 9, usability: 9.2, innovation: 8.8 }, industry: 'medical', category: 'Charts & Visualization', scenario: 'dashboard', tone: 'dark-tech', copyCount: 154, basePrice: 50, pointsPerCopy: 58, totalPointsEarned: 7700, authorName: 'Alex Rivera', authorAvatar: 'Alex', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
  }
];

export const componentService = {
  // 邀请码管理
  async listInvitationCodes(): Promise<InvitationCode[]> {
    return new Promise(resolve => setTimeout(() => resolve([...mockInvitationCodes]), 400));
  },
  async createInvitationCodes(count: number, days: number): Promise<InvitationCode[]> {
    const newCodes: InvitationCode[] = Array.from({ length: count }).map(() => {
      const code = `DEV-${Math.floor(Math.random() * 9000 + 1000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + days);
      return {
        id: Math.random().toString(36).substring(7),
        code,
        status: 'active',
        expiresAt: expiry.toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0]
      };
    });
    mockInvitationCodes = [...newCodes, ...mockInvitationCodes];
    return new Promise(resolve => setTimeout(() => resolve(newCodes), 600));
  },
  async deleteInvitationCode(id: string): Promise<boolean> {
    mockInvitationCodes = mockInvitationCodes.filter(c => c.id !== id);
    return new Promise(resolve => setTimeout(() => resolve(true), 300));
  },

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
    const newItem = { ...payload, id: Math.floor(Math.random() * 1000), status: 'pending', basePrice: 50, pointsPerCopy: 50, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as ComponentSubmission;
    mockSubmissions.push(newItem);
    return newItem;
  },
  async getOverview(): Promise<ComponentSubmissionOverview> {
    return { total: mockSubmissions.length, accepted: mockSubmissions.filter(s => s.status === 'accepted').length, rejected: mockSubmissions.filter(s => s.status === 'rejected').length, pending: mockSubmissions.filter(s => s.status === 'pending').length, approvalRate: 91, lastMonthTotal: 120, momPercent: 30 };
  },
  async getTrends(days: number): Promise<ComponentSubmissionTrendPoint[]> {
    return [{ date: 'Mon', count: 12 }, { date: 'Tue', count: 19 }, { date: 'Wed', count: 15 }, { date: 'Thu', count: 22 }, { date: 'Fri', count: 30 }];
  },
  async listUsers(): Promise<UserProfile[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockUsers), 400));
  },
  async listJudges(): Promise<UserProfile[]> {
    const judges = mockUsers.filter(u => u.role === UserRole.EVALUATOR || u.role === UserRole.ADMIN);
    return new Promise(resolve => setTimeout(() => resolve(judges), 400));
  },
  async getUserById(id: string): Promise<UserProfile | null> {
    const user = mockUsers.find(u => u.id === id);
    return new Promise(resolve => setTimeout(() => resolve(user || null), 300));
  },
  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<boolean> {
    const idx = mockUsers.findIndex(u => u.id === userId);
    if (idx > -1) {
      mockUsers[idx] = { ...mockUsers[idx], ...data };
      return new Promise(resolve => setTimeout(() => resolve(true), 500));
    }
    return false;
  },
  async updateUserRole(userId: string, newRole: UserRole): Promise<boolean> {
    return new Promise(resolve => setTimeout(() => resolve(true), 300));
  }
};
