import { useState, useEffect } from 'react'
import { getAuthToken, getUserData, logout } from '@/utils/auth'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = () => {
      const authToken = getAuthToken()
      const userData = getUserData()
      
      setToken(authToken)
      setUser(userData)
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = (token, userData, remember = false) => {
    setToken(token)
    setUser(userData)
    // Store in storage
    const storage = remember ? localStorage : sessionStorage
    storage.setItem('authToken', token)
    storage.setItem('userData', JSON.stringify(userData))
  }

  const logoutUser = () => {
    setToken(null)
    setUser(null)
    logout()
  }

  const isAuthenticated = () => {
    return !!token && !!user
  }

  return {
    user,
    token,
    isLoading,
    login,
    logout: logoutUser,
    isAuthenticated: isAuthenticated()
  }
}
