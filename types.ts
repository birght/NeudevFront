
export enum UserRole {
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR',
  EVALUATOR = 'EVALUATOR',
  DEVELOPER = 'AUTHOR' 
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

export type ComponentSubmissionStatus = 'pending' | 'accepted' | 'rejected' | 'published_unscored';

export interface ScoreBreakdown {
  design: number;      // 权重 25%
  code: number;        // 权重 30%
  usability: number;   // 权重 25%
  innovation: number;  // 权重 20%
}

export interface ComponentSubmission {
  id: number;
  title: string;
  description?: string | null;
  jsxCode: string;
  coverImage?: string | null;
  status: ComponentSubmissionStatus;
  templateType: 'vue' | 'html';
  
  // 评分体系
  score?: number | null; 
  scoreBreakdown?: ScoreBreakdown;
  
  rejectReason?: string | null;
  appealText?: string | null;
  appealReply?: string | null;
  
  // 元数据维度
  industry: string;      
  category: string;      
  scenario: string;      
  tone: string;          
  
  // 经济系统字段
  copyCount: number;        
  basePrice: number;        // 基础定价 (由组件类型决定)
  pointsPerCopy: number;    // 最终计算出的解锁积分
  totalPointsEarned: number; 
  
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
