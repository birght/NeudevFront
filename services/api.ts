
import { 
  ComponentSubmission, 
  ComponentSubmissionOverview, 
  ComponentSubmissionTrendPoint 
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
  }
};
