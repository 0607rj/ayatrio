export const getDashboardUrl = (role: string): string => {
  if (role === 'admin' || role === 'recruiter') {
    return '/admin/dashboard';
  }
  return '/dashboard-overview';
};

export const isAdminOrRecruiter = (role: string): boolean => {
  return role === 'admin' || role === 'recruiter';
};
