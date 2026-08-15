import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("medintel_user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = (username, password) => {
    // Dummy authentication for now.
    // Later this will be replaced with the Spring Boot JWT API.

    if (username === "doctor" && password === "doctor123") {
      const userData = {
        username: "doctor",
        name: "Dr. Sharma",
        role: "Physician",
      }

      setUser(userData)
      localStorage.setItem(
        "medintel_user",
        JSON.stringify(userData)
      )

      return {
        success: true,
      }
    }

    return {
      success: false,
      message: "Invalid username or password",
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("medintel_user")
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