import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes.tsx'
import { AuthProvider } from './authWrapper/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      {/* <App /> */}
      <AuthProvider>
      <AppRoutes />
      </AuthProvider>
  </StrictMode>,
)
