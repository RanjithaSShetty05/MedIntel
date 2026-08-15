import {
  FiLogOut,
  FiShield,
  FiUser,
} from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Card from "../../components/Card"
import Button from "../../components/Button"
import { useAuth } from "../../context/AuthContext"

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const username = user?.username || "admin"
  const role = user?.role || "Administrator"

  const handleLogout = () => {
    logout()

    toast.success("Logged out successfully.")

    navigate("/login")
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Account Settings
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Profile
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          View your MedIntel account information.
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">

          {/* Avatar */}
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-100">
            {username.charAt(0).toUpperCase()}
          </div>

          {/* User Information */}
          <div className="mt-5 sm:ml-6 sm:mt-0">
            <h2 className="text-xl font-bold text-slate-900">
              {username}
            </h2>

            <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
              <FiShield className="h-4 w-4 text-blue-600" />

              <span className="text-sm text-slate-500">
                {role}
              </span>
            </div>
          </div>

        </div>

        {/* Account Details */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Username */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <FiUser className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Username
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {username}
                </p>
              </div>

            </div>
          </div>

          {/* Role */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <FiShield className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Role
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {role}
                </p>
              </div>

            </div>
          </div>

        </div>
      </Card>

      {/* Logout */}
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Sign out of MedIntel
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              End your current session and return to the
              login screen.
            </p>
          </div>

          <Button
            variant="danger"
            icon={FiLogOut}
            onClick={handleLogout}
          >
            Logout
          </Button>

        </div>
      </Card>

    </div>
  )
}

export default Profile