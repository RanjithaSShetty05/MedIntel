import { Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard/Dashboard"
import MainLayout from "./layouts/MainLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/auth/Login"
import ClinicalCases from "./pages/cases/ClinicalCases"
import AddPatient from "./pages/cases/AddPatient"
import PatientDetails from "./pages/cases/PatientDetails"
import Timeline from "./pages/timeline/Timeline"
import DoctorNotes from "./pages/doctor-notes/DoctorNotes"
import DrugSafety from "./pages/drug-safety/DrugSafety"
import Reports from "./pages/reports/Reports"
import AuditLogs from "./pages/audit-logs/AuditLogs"
import Profile from "./pages/profile/Profile"
import NotFound from "./pages/errors/NotFound"

function App() {
  return (
    <Routes>

      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected application */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/cases"
            element={<ClinicalCases />}
          />

          <Route
            path="/cases/new"
            element={<AddPatient />}
          />

          <Route
            path="/cases/:id"
            element={<PatientDetails />}
          />

          <Route
            path="/timeline"
            element={<Timeline />}
          />

          <Route
            path="/doctor-notes"
            element={<DoctorNotes />}
          />

          <Route
            path="/drug-safety"
            element={<DrugSafety />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/audit-logs"
            element={<AuditLogs />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>
      </Route>

      {/* Default route */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default App