import { useState } from "react"
import { Outlet } from "react-router-dom"

import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div
        className={`
          min-h-screen transition-all duration-300
          ${sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"}
        `}
      >
        <Navbar />

        <main className="min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout