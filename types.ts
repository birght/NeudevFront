
export enum UserRole {
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR',
  EVALUATOR = 'EVALUATOR',
  DEVELOPER = 'AUTHOR' // 兼容旧代码
}

export type ContributionLevel = 'Bronze' | 'Silver' | 'Gold' | 'Master' | 'Grandmaster';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  points: number;
  level: ContributionLevel;
  avatarSeed: string;
  joinedAt: string;
  submissionCount: number;
  lastActive: string;
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
  
  // 元数据维度
  industry: string;      
  category: string;      
  scenario: string;      
  tone: string;          
  
  // 经济系统字段
  copyCount: number;        // 被复制代码次数
  pointsPerCopy: number;    // 单次复制所需积分
  totalPointsEarned: number; // 组件总收益积分
  
  tags?: string[] | null;
  createdAt: string;
  updatedAt: string;
  authorName?: string;
  authorAvatar?: string;
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
