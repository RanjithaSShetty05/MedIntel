import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiActivity,
  FiArrowRight,
} from "react-icons/fi"

import { useAuth } from "../../context/AuthContext"
import Button from "../../components/Button"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Please enter your username and password.")
      return
    }

    setLoading(true)

    try {
      const result = await login(username, password)

      if (result.success) {
        navigate("/dashboard")
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Unable to connect to the server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">

      {/* Left Branding Section */}
      <div className="relative hidden overflow-hidden bg-blue-700 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/30" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-800/40" />

        <div className="relative z-10 p-10 xl:p-14">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-bold text-blue-700 shadow-lg">
              M
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                MedIntel
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-widest text-blue-200">
                Clinical Intelligence
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-10 pb-16 xl:px-14">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur">
            <FiActivity className="h-7 w-7" />
          </div>

          <h2 className="max-w-xl text-4xl font-bold leading-tight text-white xl:text-5xl">
            Smarter decisions.
            <br />
            Better patient care.
          </h2>

          <p className="mt-6 max-w-lg text-base leading-7 text-blue-100">
            MedIntel brings clinical intelligence, AI-powered
            insights, and patient information together in one
            secure workspace.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-blue-100">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Secure clinical environment
          </div>
        </div>

        <div className="relative z-10 p-10 text-xs text-blue-200 xl:px-14">
          © 2026 MedIntel. Clinical Decision Support System.
        </div>
      </div>

      {/* Login Section */}
      <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              M
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                MedIntel
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                Clinical Intelligence
              </p>
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-2 text-sm font-medium text-blue-600">
              Welcome back
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Sign in to MedIntel
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Access your clinical workspace and patient insights.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Username
              </label>

              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="text-sm text-slate-600">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                onClick={() =>
                  setError("Password recovery will be available soon.")
                }
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Login */}
            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Sign In

              {!loading && (
                <FiArrowRight className="h-4 w-4" />
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
            <p className="text-xs font-semibold text-blue-800">
              Demo access
            </p>

            <p className="mt-1 text-xs text-blue-600">
              Username: <strong>doctor</strong>
              {"  "}•{"  "}
              Password: <strong>doctor123</strong>
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Authorized healthcare personnel only.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login