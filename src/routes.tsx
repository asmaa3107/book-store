/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useAuth } from "./hooks/useAuth"; // Custom hook for authentication
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import ViewBooks from "./pages/view-books";
import AddEditBooks from "./pages/add-edit-books";
import Layout from "./components/Layout";

// Protected Route Wrapper (Only for Authenticated Users)
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/" />;
// };

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Route (Login) - No Layout */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes (Require Auth) */}
      <Route
        path="/*"
        element={
          // <ProtectedRoute>
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-edit-books/:id" element={<AddEditBooks />} />
              <Route path="/view/:id" element={<ViewBooks />} />
            </Routes>
          </Layout>
          // </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
