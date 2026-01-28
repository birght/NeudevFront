
export enum UserRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER'
}

export type ComponentStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface UIComponent {
  id: string;
  name: string;
  description: string;
  author: string;
  category: string;
  status: ComponentStatus;
  code: string;
  previewImage: string;
  createdAt: string;
}

export interface DesignSystemItem {
  id: string;
  title: string;
  category: 'Colors' | 'Typography' | 'Icons' | 'Layout';
  description: string;
  imageUrl: string;
}
