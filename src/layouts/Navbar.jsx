import {
  FiBell,
  FiSearch,
  FiUser,
} from "react-icons/fi"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const displayName = user?.name || "Doctor"
  const role = user?.role || "Physician"

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left side */}
        <div className="ml-12 lg:ml-0">
          <p className="text-xs font-medium text-slate-400">
            Clinical Decision Support
          </p>

          <h2 className="text-sm font-semibold text-slate-800 sm:text-base">
            Welcome back, {displayName}
          </h2>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Search */}
          <button
            type="button"
            className="hidden rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 sm:block"
            title="Search"
          >
            <FiSearch className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative rounded-lg p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            title="Notifications"
          >
            <FiBell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* User / Profile */}
          <button
            type="button"
            onClick={() => navigate("/profile")}
            title="View Profile"
            className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <FiUser className="h-4 w-4" />
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {displayName}
              </p>

              <p className="text-xs text-slate-400">
                {role}
              </p>
            </div>
          </button>

        </div>
      </div>
    </header>
  )
}

export default Navbar