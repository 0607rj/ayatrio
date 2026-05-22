import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate as RouterNavigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth pages removed - Auth is handled by Users Repo
import DashboardHome from './pages/DashboardHome'; // 🔥 NEW MAIN DASHBOARD
import LinkedInPage from './pages/LinkedInPage';
import GitHubPage from './pages/GitHubPage';
import YouTubePage from './pages/YouTubePage';
import WebsitePage from './pages/WebsitePage';
import CredentialsPage from './pages/CredentialsPage';
import NetworkingPage from './pages/NetworkingPage';
import AIToolsPage from './pages/AIToolsPage';
import AIInterviewPage from './pages/AIInterviewPage';
import AdminPage from './pages/AdminPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminJobsPage from './pages/admin/AdminJobsPage';
import AdminInternshipsPage from './pages/admin/AdminInternshipsPage';
import AdminJobFormPage from './pages/admin/AdminJobFormPage';
import AdminInternshipFormPage from './pages/admin/AdminInternshipFormPage';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage';

// Additionals
import ApplicationStatusPage from './pages/ApplicationStatusPage';
import CounselingPage from './pages/CounselingPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import DashboardOverview from './pages/DashboardOverview';

// Custom Navigate component to preserve URL query parameters (like ?code=...)
const Navigate = ({ to, replace }) => {
  const location = useLocation();
  const toObj = typeof to === 'string'
    ? { pathname: to, search: location.search }
    : { pathname: to.pathname, search: to.search || location.search, state: to.state };
  return <RouterNavigate to={toObj} replace={replace} />;
};

const getDefaultRoute = (user) => {
  const role = String(user?.role || '').toLowerCase();
  if (role === 'admin' || role === 'recruiter') return '/admin';
  if (role === 'user') return '/dashboard-overview';
  return '/home';
};

// 🔐 Protected route (logged-in users)
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) {
    // Redirect to Users Repo for login
    const mainUrl = process.env.REACT_APP_MAIN_APP_URL || 'http://localhost:3000';
    window.location.href = `${mainUrl}/login`;
    return null;
  }

  const role = String(user.role || '').toLowerCase();
  if (role === 'admin' || role === 'recruiter') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

// 🔐 Admin-only route
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader />;

  if (!user) {
    const mainUrl = process.env.REACT_APP_MAIN_APP_URL || 'http://localhost:3000';
    window.location.href = `${mainUrl}/login`;
    return null;
  }

  const role = String(user.role || '').toLowerCase();
  if (role !== 'admin' && role !== 'recruiter') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

// 🔄 Loader
const PageLoader = () => (
  <div className="page-loader">
    <div className="page-loader__spinner" />
  </div>
);

function AppRoutes() {
  const { user } = useAuth();
  const defaultRoute = getDefaultRoute(user);

  return (
    <Routes>
      {/* Auth is now handled by the Users Repo */}

      {/* 🔥 MAIN DASHBOARD */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />

      {/* Profile Branding (existing system) */}
      <Route
        path="/dashboard"
        element={
          <Navigate to={defaultRoute} replace />
        }
      />

      {/* Tools */}
      <Route path="/linkedin" element={<ProtectedRoute><LinkedInPage /></ProtectedRoute>} />
      <Route path="/github" element={<ProtectedRoute><GitHubPage /></ProtectedRoute>} />
      <Route path="/youtube" element={<ProtectedRoute><YouTubePage /></ProtectedRoute>} />
      <Route path="/website" element={<ProtectedRoute><WebsitePage /></ProtectedRoute>} />
      <Route path="/credentials" element={<ProtectedRoute><CredentialsPage /></ProtectedRoute>} />
      <Route path="/networking" element={<ProtectedRoute><NetworkingPage /></ProtectedRoute>} />
      <Route path="/ai-tools" element={<ProtectedRoute><AIToolsPage /></ProtectedRoute>} />
      <Route path="/ai-interview" element={<ProtectedRoute><AIInterviewPage /></ProtectedRoute>} />
      <Route path="/ai-interview/:id" element={<ProtectedRoute><AIInterviewPage /></ProtectedRoute>} />

      {/* Additionals */}
      <Route path="/application-status" element={<ProtectedRoute><ApplicationStatusPage /></ProtectedRoute>} />
      <Route path="/counseling" element={<ProtectedRoute><CounselingPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
      <Route path="/dashboard-overview" element={<ProtectedRoute><DashboardOverview /></ProtectedRoute>} />

      {/* 🔥 ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <Navigate to="/admin" replace />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/jobs"
        element={
          <AdminRoute>
            <AdminJobsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/jobs/create"
        element={
          <AdminRoute>
            <AdminJobFormPage mode="create" />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/jobs/:id/edit"
        element={
          <AdminRoute>
            <AdminJobFormPage mode="edit" />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/jobs/:id/applications"
        element={
          <AdminRoute>
            <AdminApplicationsPage type="jobs" />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/internships"
        element={
          <AdminRoute>
            <AdminInternshipsPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/internships/create"
        element={
          <AdminRoute>
            <AdminInternshipFormPage mode="create" />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/internships/:id/edit"
        element={
          <AdminRoute>
            <AdminInternshipFormPage mode="edit" />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/internships/:id/applications"
        element={
          <AdminRoute>
            <AdminApplicationsPage type="internships" />
          </AdminRoute>
        }
      />

      {/* Default routes */}
      <Route path="/" element={<Navigate to={defaultRoute} replace />} />
      <Route path="*" element={<Navigate to={defaultRoute} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />

        <Toaster
          position="top-right"
          toastOptions={{
            className: 'app-toast',
            success: {
              iconTheme: {
                primary: 'var(--green)',
                secondary: 'var(--bg-card)'
              }
            },
            error: {
              iconTheme: {
                primary: 'var(--red)',
                secondary: 'var(--bg-card)'
              }
            }
          }}
        />
      </Router>
    </AuthProvider>
  );
}
