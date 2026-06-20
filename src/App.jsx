import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import LoginPage          from '@/pages/auth/LoginPage';
import SignupPage         from '@/pages/auth/SignupPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import DashboardPage      from '@/pages/DashboardPage';
import EstimatesPage      from '@/pages/EstimatesPage';
import EstimateFormPage   from '@/pages/EstimateFormPage';
import EstimateDetailPage from '@/pages/EstimateDetailPage';
import ProfilePage        from '@/pages/ProfilePage';

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public */}
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/signup"          element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/estimates" element={<EstimatesPage />} />
          <Route path="/estimates/new" element={<EstimateFormPage />} />
          <Route path="/estimates/:id" element={<EstimateDetailPage />} />
          <Route path="/estimates/:id/edit" element={<EstimateFormPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
