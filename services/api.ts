
import { 
  ComponentSubmission, 
  ComponentSubmissionOverview, 
  ComponentSubmissionTrendPoint 
} from '../types';

// 模拟 API 响应，实际项目中请替换为真实的 axios/fetch 调用
const mockSubmissions: ComponentSubmission[] = [
  {
    id: 101,
    title: '玻璃质感卡片',
    description: '采用最新玻璃拟态设计的卡片组件',
    jsxCode: '<template><div class="p-6 bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl">Glass Card</div></template>',
    status: 'accepted',
    templateType: 'vue',
    score: 95,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: 'Layout'
  }
];

export const componentService = {
  async listMySubmissions(): Promise<ComponentSubmission[]> {
    // return http.get("/component-submissions/mine");
    return mockSubmissions;
  },

  async createSubmission(payload: any): Promise<ComponentSubmission> {
    // return http.post("/component-submissions", payload);
    console.log('Creating submission:', payload);
    return { ...payload, id: Math.random(), status: 'pending', createdAt: new Date().toISOString() };
  },

  async getOverview(): Promise<ComponentSubmissionOverview> {
    return {
      total: 128,
      accepted: 110,
      rejected: 8,
      pending: 10,
      approvalRate: 92.5,
      lastMonthTotal: 105,
      momPercent: 12.5
    };
  },

  async getTrends(days: number): Promise<ComponentSubmissionTrendPoint[]> {
    return [
      { date: 'Mon', count: 4 },
      { date: 'Tue', count: 7 },
      { date: 'Wed', count: 5 },
      { date: 'Thu', count: 12 },
      { date: 'Fri', count: 8 },
    ];
  },

  async moderate(id: number, payload: any) {
    // return http.post(`/component-submissions/${id}/moderate`, payload);
  },

  async appeal(id: number, appealText: string) {
    // return http.post(`/component-submissions/${id}/appeal`, { appealText });
  }
};
