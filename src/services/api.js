import axios from "axios"

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("medintel_token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Handle authentication errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("medintel_token")
      localStorage.removeItem("medintel_user")

      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default api