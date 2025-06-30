"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { TodoDashboard } from "@/components/todo-dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.removeItem("todos")
  }

  if (isAuthenticated && user) {
    return <TodoDashboard user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {showRegister ? (
          <RegisterForm onRegister={handleLogin} onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
          <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />
        )}
      </div>
    </div>
  )
}
