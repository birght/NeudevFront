
import { 
  ComponentSubmission, 
  ComponentSubmissionOverview, 
  ComponentSubmissionTrendPoint,
  UserProfile,
  UserRole
} from '../types';

// 模拟 API 响应
const mockSubmissions: ComponentSubmission[] = [
  {
    id: 101,
    title: '智慧医疗 - 患者生命体征看板',
    description: '采用高对比度布局设计，适配 4K 医疗监护屏。',
    jsxCode: '<template><div class="p-6 bg-slate-950 text-blue-400 rounded-3xl border border-blue-500/20">Live Vital Signs</div></template>',
    status: 'accepted',
    templateType: 'vue',
    score: 98,
    industry: 'medical',
    category: 'Charts & Visualization',
    scenario: 'dashboard',
    tone: 'dark-tech',
    downloads: 1240,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const mockUsers: UserProfile[] = [
  { id: '1', name: 'Alex Rivera', email: 'admin@devfront.com', role: UserRole.ADMIN, points: 2500, level: 'Master', avatarSeed: 'Alex', joinedAt: '2024-01-15', submissionCount: 45, lastActive: '2分钟前' },
  { id: '2', name: 'Sarah Chen', email: 'author@devfront.com', role: UserRole.AUTHOR, points: 1200, level: 'Gold', avatarSeed: 'Sarah', joinedAt: '2024-02-10', submissionCount: 22, lastActive: '1小时前' },
  { id: '3', name: 'Ivan Sokolov', email: 'evaluator@devfront.com', role: UserRole.EVALUATOR, points: 850, level: 'Silver', avatarSeed: 'Ivan', joinedAt: '2024-03-05', submissionCount: 5, lastActive: '昨天' },
  { id: '4', name: 'Maria Garcia', email: 'maria@devfront.com', role: UserRole.AUTHOR, points: 450, level: 'Bronze', avatarSeed: 'Maria', joinedAt: '2024-04-01', submissionCount: 12, lastActive: '4小时前' },
  { id: '5', name: 'James Wilson', email: 'james@devfront.com', role: UserRole.AUTHOR, points: 3100, level: 'Grandmaster', avatarSeed: 'James', joinedAt: '2023-11-20', submissionCount: 88, lastActive: '现在' },
];

export const componentService = {
  async listMySubmissions(): Promise<ComponentSubmission[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockSubmissions), 500));
  },

  async createSubmission(payload: Partial<ComponentSubmission>): Promise<ComponentSubmission> {
    console.log('Sending to Backend:', payload);
    return { 
      ...payload, 
      id: Math.floor(Math.random() * 1000), 
      status: 'pending', 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as ComponentSubmission;
  },

  async getOverview(): Promise<ComponentSubmissionOverview> {
    return {
      total: 156,
      accepted: 142,
      rejected: 4,
      pending: 10,
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
    console.log(`Updating user ${userId} to role ${newRole}`);
    return new Promise(resolve => setTimeout(() => resolve(true), 300));
  }
};
