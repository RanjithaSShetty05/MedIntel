import {
  createContext,
  useContext,
  useState,
} from "react"

import {
  login as loginUser,
  logout as logoutUser,
} from "../services/auth"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("medintel_user")

    return savedUser
      ? JSON.parse(savedUser)
      : null
  })

  const login = async (username, password) => {
    try {
      const result = await loginUser(
        username,
        password
      )

      if (result.success) {
        setUser(result.user)

        return {
          success: true,
        }
      }

      return {
        success: false,
        message: "Login failed",
      }
    } catch (error) {
      console.error("Login error:", error)

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Unable to connect to the server.",
      }
    }
  }

  const logout = () => {
    logoutUser()
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    )
  }

  return context
}