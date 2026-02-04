
import React from 'react';
import AdminLayout from '../AdminLayout';
import { UserRole } from '../types';

interface AdminDashboardProps {
  userRole: UserRole;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ userRole }) => {
  return <AdminLayout userRole={userRole} />;
};

export default AdminDashboard;
