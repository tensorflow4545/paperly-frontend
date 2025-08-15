// Auth utility functions for managing user authentication

// Get auth token from storage
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null
  
  // Check localStorage first (remember me), then sessionStorage
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
}

// Get user data from storage
export const getUserData = () => {
  if (typeof window === 'undefined') return null
  
  const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData')
  return userData ? JSON.parse(userData) : null
}

// Store auth data
export const storeAuthData = (token, userData, remember = false) => {
  if (typeof window === 'undefined') return
  
  const storage = remember ? localStorage : sessionStorage
  storage.setItem('authToken', token)
  storage.setItem('userData', JSON.stringify(userData))
}

// Clear auth data (logout)
export const clearAuthData = () => {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
  sessionStorage.removeItem('authToken')
  sessionStorage.removeItem('userData')
}

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken()
}

// Get auth headers for API requests
export const getAuthHeaders = () => {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

// Logout function
export const logout = () => {
  clearAuthData()
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/sign-in'
  }
}
