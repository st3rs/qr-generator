import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import MerchantsPage from './pages/merchants/MerchantsPage';
import MerchantDetailPage from './pages/merchants/MerchantDetailPage';
import TransactionsPage from './pages/transactions/TransactionsPage';
import SettlementsPage from './pages/settlements/SettlementsPage';
import WebhooksPage from './pages/webhooks/WebhooksPage';
import LogsPage from './pages/logs/LogsPage';
import SettingsPage from './pages/settings/SettingsPage';
import RequireAuth from './components/shared/RequireAuth';
import RequireRole from './components/shared/RequireRole';
import LoginPage from './pages/LoginPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/access-denied" element={<AccessDeniedPage />} />
    <Route element={<RequireAuth />}>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/merchants" element={<MerchantsPage />} />
        <Route path="/merchants/:merchantId" element={<MerchantDetailPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/settlements" element={<SettlementsPage />} />
        <Route path="/webhooks" element={<WebhooksPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route element={<RequireRole allowedRoles={['super_admin']} />}>
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
