import './App.css'
import LoginPage from "./pages/LoginPage.tsx"
import { AuthProvider } from "./auth/AuthProvider.tsx"

function App() {
  return (
    <AuthProvider>
      <LoginPage/>
    </AuthProvider>
  )
}

export default App
