
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
    description: '采用高对比度布局设计，适配 4K 医疗监护屏。',
    jsxCode: `<template><div>Medical Dashboard</div></template>`,
    status: 'accepted',
    templateType: 'vue',
    score: 9.2,
    scoreBreakdown: { design: 9.5, code: 9, usability: 9.2, innovation: 8.8 },
    industry: 'medical',
    category: 'Charts & Visualization',
    scenario: 'dashboard',
    tone: 'dark-tech',
    copyCount: 154,
    basePrice: 50,
    pointsPerCopy: 58, 
    totalPointsEarned: 7700,
    authorName: 'Alex Rivera',
    authorAvatar: 'Alex',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 102,
    title: '金融风控 - 异常交易追踪图谱',
    description: '复杂的 D3.js 关系图谱。',
    jsxCode: `<template><div class="p-8">Financial Graph</div></template>`,
    status: 'pending',
    templateType: 'vue',
    industry: 'finance',
    category: 'Data Visualization',
    scenario: 'admin',
    tone: 'modern',
    copyCount: 0,
    basePrice: 100,
    pointsPerCopy: 100,
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
      basePrice: 50,
      pointsPerCopy: 50,
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
