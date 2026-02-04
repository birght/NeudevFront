
export enum UserRole {
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR',
  EVALUATOR = 'EVALUATOR',
  DEVELOPER = 'AUTHOR' // 兼容旧代码
}

export type ComponentSubmissionStatus = 'pending' | 'accepted' | 'rejected';

export interface ComponentSubmission {
  id: number;
  title: string;
  description?: string | null;
  jsxCode: string;
  coverImage?: string | null;
  status: ComponentSubmissionStatus;
  templateType: 'vue' | 'html';
  score?: number | null;
  rejectReason?: string | null;
  appealText?: string | null;
  appealReply?: string | null;
  
  // 新增元数据维度
  industry: string;      // 业务行业
  category: string;      // 功能分类
  scenario: string;      // 应用场景
  tone: string;          // 视觉调性
  
  tags?: string[] | null;
  createdAt: string;
  updatedAt: string;
  authorName?: string;
  downloads?: number;
}

export interface ComponentSubmissionTrendPoint {
  date: string;
  count: number;
}

export interface ComponentSubmissionOverview {
  total: number;
  accepted: number;
  rejected: number;
  pending: number;
  approvalRate: number;
  lastMonthTotal: number;
  momPercent: number | null;
}
