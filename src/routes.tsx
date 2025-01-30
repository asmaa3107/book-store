import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth'; // Custom hook for authentication
import Login from './pages/Login';
import Dashboard from './pages/dashboard';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); 
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;