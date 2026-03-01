import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from "./pages/LoginPage.tsx"
import { AuthProvider } from "./auth/AuthProvider.tsx"
import { useAuth } from "./auth/AuthContext.tsx"
import TestMic from "./pages/TestMic.tsx"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test-mic" element={<TestMic />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div>
                <h1>Welcome Home</h1>
                <p>You are logged in!</p>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
