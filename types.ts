
export enum UserRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER'
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
  category?: string | null;
  tags?: string[] | null;
  metaTags?: string[] | null;
  frameworks?: string[] | null;
  createdAt: string;
  updatedAt: string;
  authorName?: string;
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
