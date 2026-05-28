import { useState, useCallback } from "react"
import { login as apiLogin, register as apiRegister } from "@/api/client"
import type { AuthCredentials } from "@/api/types"

const TOKEN_KEY = "access_token"

export function useAuth() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  )
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (credentials: AuthCredentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await apiLogin(credentials)
      localStorage.setItem(TOKEN_KEY, data.access_token)
      setToken(data.access_token)
    } catch {
      setError("Invalid username or password")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (credentials: AuthCredentials) => {
    setIsLoading(true)
    setError(null)
    try {
      await apiRegister(credentials)
      await login(credentials)
    } catch (err: unknown) {
      const detail =
        (err as { response?: { data?: { detail?: string } } })?.response?.data
          ?.detail
      setError(detail ?? "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }, [login])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setError(null)
  }, [])

  return {
    token,
    isAuthenticated: !!token,
    isLoading,
    error,
    login,
    register,
    logout,
  }
}
