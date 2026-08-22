import { useEffect, useMemo, useState } from "react"

import {
  FiActivity,
  FiCalendar,
  FiClock,
  FiFileText,
  FiSearch,
  FiShield,
  FiUser,
} from "react-icons/fi"

import Card from "../../components/Card"
import Badge from "../../components/Badge"

import { getAuditLogs } from "../../services/audit"


const actionVariants = {
  "Viewed Patient": "info",
  "Case Reviewed": "success",
  "AI Analysis": "info",
  "Drug Safety Analysis": "warning",
  "Created Patient": "success",
  "Added Note": "info",
  "Generated Report": "success",
  "User Login": "success",
  LOGIN: "success",
  CREATE: "success",
  UPDATE: "info",
  DELETE: "danger",
}


const entityIcons = {
  "Clinical Case": FiUser,
  "Disease Prediction": FiActivity,
  "Drug Safety": FiShield,
  "Doctor Note": FiFileText,
  "Clinical Report": FiFileText,
  Authentication: FiShield,

  CASE: FiUser,
  PATIENT: FiUser,
  "DOCTOR NOTE": FiFileText,
  REPORT: FiFileText,
  "DRUG SAFETY": FiShield,
}


const AuditLogs = () => {

  const [auditLogs, setAuditLogs] = useState([])

  const [search, setSearch] = useState("")

  const [currentPage, setCurrentPage] =
    useState(1)

  const [loading, setLoading] =
    useState(true)

  const logsPerPage = 6


  // --------------------------------------------------
  // Load real audit logs
  // --------------------------------------------------

  useEffect(() => {

    const loadAuditLogs = async () => {

      try {

        setLoading(true)

        const data = await getAuditLogs()

        setAuditLogs(
          Array.isArray(data)
            ? data
            : []
        )

      } catch (error) {

        console.error(
          "Failed to load audit logs:",
          error
        )

        setAuditLogs([])

      } finally {

        setLoading(false)

      }

    }

    loadAuditLogs()

  }, [])


  // --------------------------------------------------
  // Format backend date
  // --------------------------------------------------

  const formatDate = (dateValue) => {

    if (!dateValue) {
      return {
        date: "—",
        time: "—",
      }
    }

    const date = new Date(dateValue)

    if (Number.isNaN(date.getTime())) {
      return {
        date: String(dateValue),
        time: "",
      }
    }

    return {
      date: date.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),

      time: date.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    }

  }


  // --------------------------------------------------
  // Format entity type
  // --------------------------------------------------

  const formatEntity = (entityType) => {

    if (!entityType) {
      return "Unknown"
    }

    const value =
      String(entityType)

    const formatted =
      value
        .replaceAll("_", " ")
        .replaceAll("-", " ")
        .toLowerCase()
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        )

    return formatted

  }


  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const filteredLogs = useMemo(() => {

    const value =
      search.toLowerCase().trim()

    return auditLogs.filter((log) => {

      const action =
        String(
          log.action || ""
        ).toLowerCase()

      const entityType =
        String(
          log.entityType ||
          log.entity ||
          ""
        ).toLowerCase()

      const entityId =
        String(
          log.entityId || ""
        ).toLowerCase()

      const performedBy =
        String(
          log.performedBy || ""
        ).toLowerCase()

      const details =
        String(
          log.details || ""
        ).toLowerCase()

      const createdAt =
        String(
          log.createdAt || ""
        ).toLowerCase()

      return (
        !value ||
        action.includes(value) ||
        entityType.includes(value) ||
        entityId.includes(value) ||
        performedBy.includes(value) ||
        details.includes(value) ||
        createdAt.includes(value)
      )

    })

  }, [
    auditLogs,
    search,
  ])


  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const totalPages = Math.ceil(
    filteredLogs.length /
      logsPerPage
  )

  const startIndex =
    (currentPage - 1) *
    logsPerPage

  const currentLogs =
    filteredLogs.slice(
      startIndex,
      startIndex + logsPerPage
    )


  // --------------------------------------------------
  // Search handler
  // --------------------------------------------------

  const handleSearch = (value) => {

    setSearch(value)

    setCurrentPage(1)

  }


  // --------------------------------------------------
  // Get icon
  // --------------------------------------------------

  const getEntityIcon = (
    entityType
  ) => {

    const formatted =
      formatEntity(entityType)

    return (
      entityIcons[entityType] ||
      entityIcons[formatted] ||
      FiFileText
    )

  }


  // --------------------------------------------------
  // Main UI
  // --------------------------------------------------

  return (

    <div className="mx-auto max-w-[1500px] space-y-6">


      {/* Header */}

      <div>

        <p className="text-sm font-medium text-blue-600">
          System Monitoring
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Audit Logs
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Track system activity and important actions
          performed within MedIntel.
        </p>

      </div>


      {/* Summary */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">


        {/* Total Activities */}

        <Card>

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

              <FiActivity className="h-5 w-5" />

            </div>

            <div>

              <p className="text-xs text-slate-400">
                Total Activities
              </p>

              <p className="text-xl font-bold text-slate-900">
                {auditLogs.length}
              </p>

            </div>

          </div>

        </Card>


        {/* System Status */}

        <Card>

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

              <FiShield className="h-5 w-5" />

            </div>

            <div>

              <p className="text-xs text-slate-400">
                System Status
              </p>

              <p className="text-xl font-bold text-slate-900">
                Active
              </p>

            </div>

          </div>

        </Card>


        {/* Current Results */}

        <Card>

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">

              <FiUser className="h-5 w-5" />

            </div>

            <div>

              <p className="text-xs text-slate-400">
                Current Results
              </p>

              <p className="text-xl font-bold text-slate-900">
                {filteredLogs.length}
              </p>

            </div>

          </div>

        </Card>

      </div>


      {/* Search */}

      <Card>

        <div className="relative">

          <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              handleSearch(
                e.target.value
              )
            }
            placeholder="Search action, entity, user, case ID, or details..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </Card>


      {/* Audit Table */}

      <Card className="overflow-hidden">

        <div className="border-b border-slate-100 px-5 py-4">

          <p className="text-sm text-slate-500">

            Showing{" "}

            <span className="font-semibold text-slate-800">
              {currentLogs.length}
            </span>

            {" "}of{" "}

            <span className="font-semibold text-slate-800">
              {filteredLogs.length}
            </span>

            {" "}activities

          </p>

        </div>


        {/* Loading */}

        {loading ? (

          <div className="flex min-h-[280px] items-center justify-center">

            <div className="text-center">

              <FiActivity className="mx-auto h-6 w-6 animate-pulse text-blue-600" />

              <p className="mt-3 text-sm text-slate-500">
                Loading audit logs...
              </p>

            </div>

          </div>

        ) : currentLogs.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1050px] text-left">


              {/* Table Header */}

              <thead>

                <tr className="border-b border-slate-100 bg-slate-50/70">

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Date & Time
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Action
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Entity
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Performed By
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Details
                  </th>

                </tr>

              </thead>


              {/* Table Body */}

              <tbody>

                {currentLogs.map(
                  (log) => {

                    const EntityIcon =
                      getEntityIcon(
                        log.entityType ||
                        log.entity
                      )

                    const date =
                      formatDate(
                        log.createdAt ||
                        log.date
                      )

                    return (

                      <tr
                        key={
                          log.id
                        }
                        className="border-b border-slate-100 transition hover:bg-slate-50/60"
                      >


                        {/* Date */}

                        <td className="whitespace-nowrap px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">

                              <FiCalendar className="h-4 w-4" />

                            </div>

                            <div>

                              <p className="text-sm font-medium text-slate-700">
                                {date.date}
                              </p>

                              <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">

                                <FiClock className="h-3 w-3" />

                                {date.time}

                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Action */}

                        <td className="px-5 py-4">

                          <Badge
                            variant={
                              actionVariants[
                                log.action
                              ] ||
                              "info"
                            }
                          >
                            {log.action ||
                              "Unknown action"}
                          </Badge>

                        </td>


                        {/* Entity */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">

                              <EntityIcon className="h-4 w-4" />

                            </div>

                            <div>

                              <p className="text-sm font-medium text-slate-700">

                                {
                                  formatEntity(
                                    log.entityType ||
                                    log.entity
                                  )
                                }

                              </p>

                              <p className="text-xs text-slate-400">

                                {log.entityId
                                  ? `ID: ${log.entityId}`
                                  : "—"}

                              </p>

                            </div>

                          </div>

                        </td>


                        {/* Performed By */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-2">

                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">

                              <FiUser className="h-3.5 w-3.5" />

                            </div>

                            <span className="text-sm text-slate-700">

                              {
                                log.performedBy ||
                                "Unknown"
                              }

                            </span>

                          </div>

                        </td>


                        {/* Details */}

                        <td className="max-w-[350px] px-5 py-4">

                          <p
                            className="truncate text-sm text-slate-500"
                            title={
                              log.details ||
                              ""
                            }
                          >

                            {
                              log.details ||
                              "—"
                            }

                          </p>

                        </td>

                      </tr>

                    )

                  }
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="flex min-h-[280px] flex-col items-center justify-center text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">

              <FiSearch className="h-5 w-5 text-slate-400" />

            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-800">
              No audit logs found
            </h3>

            <p className="mt-1 text-sm text-slate-500">

              {auditLogs.length === 0
                ? "No audit activity has been recorded yet."
                : "Try changing your search keywords."}

            </p>

          </div>

        )}


        {/* Pagination */}

        {!loading &&
          totalPages > 1 && (

            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-xs text-slate-400">

                Page{" "}
                {currentPage}
                {" "}of{" "}
                {totalPages}

              </p>


              <div className="flex items-center gap-1">

                <button
                  disabled={
                    currentPage ===
                    1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.max(
                          page - 1,
                          1
                        )
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>


                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (_, index) =>
                    index + 1
                ).map((page) => (

                  <button
                    key={page}
                    onClick={() =>
                      setCurrentPage(
                        page
                      )
                    }
                    className={`
                      h-8 min-w-8 rounded-lg px-2 text-xs font-medium transition
                      ${
                        currentPage ===
                        page
                          ? "bg-blue-600 text-white"
                          : "text-slate-500 hover:bg-slate-100"
                      }
                    `}
                  >
                    {page}
                  </button>

                ))}


                <button
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          page + 1,
                          totalPages
                        )
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>

              </div>

            </div>

          )}

      </Card>


      {/* Disclaimer */}

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

        <p className="text-xs leading-5 text-blue-700">

          Audit logs provide a record of important
          system activities to support accountability,
          traceability, and clinical system security.

        </p>

      </div>

    </div>

  )

}


export default AuditLogs