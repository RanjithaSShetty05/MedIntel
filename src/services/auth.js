import api from "./api"

export const login = async (username, password) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  })

  const { token, username: loggedInUsername, role } = response.data

  const userData = {
    username: loggedInUsername,
    role,
  }

  localStorage.setItem("medintel_token", token)
  localStorage.setItem(
    "medintel_user",
    JSON.stringify(userData)
  )

  return {
    success: true,
    user: userData,
    token,
  }
}

export const logout = () => {
  localStorage.removeItem("medintel_token")
  localStorage.removeItem("medintel_user")
}