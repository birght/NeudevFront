
import { 
  ComponentSubmission, 
  ComponentSubmissionOverview, 
  ComponentSubmissionTrendPoint,
  UserProfile,
  UserRole
} from '../types';

// 初始模拟用户/评委数据
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
  },
  { 
    id: '4', name: 'James Wilson', email: 'wilson@devfront.com', role: UserRole.EVALUATOR, points: 1800, level: 'Master', avatarSeed: 'James', joinedAt: '2024-01-05', submissionCount: 8, lastActive: '5小时前',
    bio: 'System Architect at Heart. Auditing code for scalability and performance is my passion.', location: 'London, UK', socials: { github: 'jwilson-tech', website: 'wilson.tech' }, specialties: ['React', 'Performance', 'Infrastructure'], totalReviewed: 156, averageScore: 9.3
  }
];

let mockSubmissions: ComponentSubmission[] = [
  {
    id: 101, title: '智慧医疗 - 患者生命体征看板', description: '采用高对比度布局设计。', jsxCode: `<template><div>Medical Dashboard</div></template>`, status: 'accepted', templateType: 'vue', score: 9.2, scoreBreakdown: { design: 9.5, code: 9, usability: 9.2, innovation: 8.8 }, industry: 'medical', category: 'Charts & Visualization', scenario: 'dashboard', tone: 'dark-tech', copyCount: 154, basePrice: 50, pointsPerCopy: 58, totalPointsEarned: 7700, authorName: 'Alex Rivera', authorAvatar: 'Alex', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
  }
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
