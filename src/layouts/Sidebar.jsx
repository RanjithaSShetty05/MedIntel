import { useState } from "react"
import {
  FiGrid,
  FiUsers,
  FiUserPlus,
  FiClock,
  FiFileText,
  FiShield,
  FiFile,
  FiActivity,
  FiUser,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
} from "react-icons/fi"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { useAuth } from "../context/AuthContext"

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  const navigation = [
    {
      label: "Dashboard",
      icon: FiGrid,
      path: "/dashboard",
    },
    {
      label: "Clinical Cases",
      icon: FiUsers,
      path: "/cases",
    },
    {
      label: "Add Patient",
      icon: FiUserPlus,
      path: "/cases/new",
    },
    {
      label: "Timeline",
      icon: FiClock,
      path: "/timeline",
    },
    {
      label: "Doctor Notes",
      icon: FiFileText,
      path: "/doctor-notes",
    },
    {
      label: "Drug Safety",
      icon: FiShield,
      path: "/drug-safety",
    },
    {
      label: "Reports",
      icon: FiFile,
      path: "/reports",
    },
    {
      label: "Audit Logs",
      icon: FiActivity,
      path: "/audit-logs",
    },
    {
      label: "Profile",
      icon: FiUser,
      path: "/profile",
    },
  ]

  const handleNavigation = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  const handleLogout = () => {
    logout()
    setMobileOpen(false)

    toast.success("Logged out successfully.")

    navigate("/login")
  }

  const isActive = (path) => {
    if (path === "/cases") {
      return (
        location.pathname === "/cases" ||
        location.pathname === "/cases/new" ||
        location.pathname.startsWith("/cases/")
      )
    }

    return location.pathname === path
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm lg:hidden"
      >
        <FiMenu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen flex-col
          border-r border-slate-200 bg-white
          transition-all duration-300

          ${
            collapsed
              ? "w-20"
              : "w-64"
          }

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              M
            </div>

            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900">
                  MedIntel
                </h1>

                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                  Clinical Intelligence
                </p>
              </div>
            )}
          </div>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p
            className={`
              mb-3 px-3 text-[10px] font-semibold
              uppercase tracking-wider text-slate-400
              ${collapsed ? "text-center" : ""}
            `}
          >
            {!collapsed ? "Main Menu" : "•••"}
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)

              return (
                <button
                  key={item.path}
                  type="button"
                  title={collapsed ? item.label : ""}
                  onClick={() =>
                    handleNavigation(item.path)
                  }
                  className={`
                    group flex w-full items-center gap-3
                    rounded-lg px-3 py-2.5
                    text-sm font-medium
                    transition-all

                    ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    }

                    ${collapsed ? "justify-center" : ""}
                  `}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />

                  {!collapsed && (
                    <span>{item.label}</span>
                  )}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={handleLogout}
            title={collapsed ? "Logout" : ""}
            className={`
              flex w-full items-center gap-3
              rounded-lg px-3 py-2.5
              text-sm font-medium text-slate-600
              transition-all
              hover:bg-red-50 hover:text-red-600
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <FiLogOut className="h-[18px] w-[18px]" />

            {!collapsed && <span>Logout</span>}
          </button>

          {/* Collapse button */}
          <button
            type="button"
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="mt-2 hidden w-full items-center justify-center rounded-lg border border-slate-200 py-2 text-slate-500 hover:bg-slate-50 lg:flex"
          >
            {collapsed ? (
              <FiChevronRight className="h-4 w-4" />
            ) : (
              <>
                <FiChevronLeft className="h-4 w-4" />

                <span className="ml-2 text-xs">
                  Collapse
                </span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar