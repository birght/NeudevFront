
export enum UserRole {
  ADMIN = 'ADMIN',
  AUTHOR = 'AUTHOR',
  EVALUATOR = 'EVALUATOR',
  DEVELOPER = 'AUTHOR' 
}

export type ContributionLevel = 'Bronze' | 'Silver' | 'Gold' | 'Master' | 'Grandmaster';

export interface UserSocials {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

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
  // 评委增强字段
  bio?: string;
  location?: string;
  socials?: UserSocials;
  specialties?: string[];
  coverImage?: string;
  totalReviewed?: number;
  averageScore?: number;
}

export type ComponentSubmissionStatus = 'pending' | 'accepted' | 'rejected' | 'published_unscored';

export interface ScoreBreakdown {
  design: number;      
  code: number;        
  usability: number;   
  innovation: number;  
}

export interface ComponentSubmission {
  id: number;
  title: string;
  description?: string | null;
  jsxCode: string;
  coverImage?: string | null;
  status: ComponentSubmissionStatus;
  templateType: 'vue' | 'html';
  
  score?: number | null; 
  scoreBreakdown?: ScoreBreakdown;
  
  rejectReason?: string | null;
  appealText?: string | null;
  appealReply?: string | null;
  
  industry: string;      
  category: string;      
  scenario: string;      
  tone: string;          
  
  copyCount: number;        
  basePrice: number;        
  pointsPerCopy: number;    
  totalPointsEarned: number; 
  
  tags?: string[] | null;
  dependencies?: string[]; // 新增：远程依赖列表，如 ["three", "gsap"]
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
