import { useMemo, useState } from "react"
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
  FiSearch,
  FiShield,
  FiXCircle,
} from "react-icons/fi"

import Card from "../../components/Card"
import Badge from "../../components/Badge"
import { drugSafetyData } from "../../data/drugSafetyData"

const statusVariants = {
  Safe: "success",
  Warning: "warning",
  Critical: "critical",
  "Not Found": "danger",
}

const DrugSafety = () => {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [expandedId, setExpandedId] = useState(null)

  const filteredMedications = useMemo(() => {
    const value = search.toLowerCase().trim()

    return drugSafetyData.filter((medication) => {
      const matchesSearch =
        !value ||
        medication.medicationName
          .toLowerCase()
          .includes(value) ||
        medication.warnings.some((warning) =>
          warning.toLowerCase().includes(value)
        ) ||
        medication.recommendations
          .toLowerCase()
          .includes(value)

      const matchesStatus =
        statusFilter === "All" ||
        medication.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const toggleMedication = (id) => {
    setExpandedId((current) =>
      current === id ? null : id
    )
  }

  const getStatusIcon = (status) => {
    if (status === "Safe") {
      return (
        <FiCheckCircle className="h-5 w-5 text-emerald-600" />
      )
    }

    if (status === "Critical") {
      return (
        <FiXCircle className="h-5 w-5 text-red-600" />
      )
    }

    if (status === "Not Found") {
      return (
        <FiInfo className="h-5 w-5 text-slate-500" />
      )
    }

    return (
      <FiAlertTriangle className="h-5 w-5 text-amber-600" />
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Clinical Intelligence
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Drug Safety
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Review medication warnings, interactions, and
          safety recommendations.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FiShield className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Medications
              </p>

              <p className="text-xl font-bold text-slate-900">
                {drugSafetyData.length}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FiCheckCircle className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Safe
              </p>

              <p className="text-xl font-bold text-slate-900">
                {
                  drugSafetyData.filter(
                    (item) => item.status === "Safe"
                  ).length
                }
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FiAlertTriangle className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Warnings
              </p>

              <p className="text-xl font-bold text-slate-900">
                {
                  drugSafetyData.filter(
                    (item) => item.status === "Warning"
                  ).length
                }
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <FiXCircle className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Critical
              </p>

              <p className="text-xl font-bold text-slate-900">
                {
                  drugSafetyData.filter(
                    (item) => item.status === "Critical"
                  ).length
                }
              </p>
            </div>
          </div>
        </Card>

      </div>

      {/* Search and filter */}
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search medication, warning, or recommendation..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">
              All statuses
            </option>

            <option value="Safe">
              Safe
            </option>

            <option value="Warning">
              Warning
            </option>

            <option value="Critical">
              Critical
            </option>

            <option value="Not Found">
              Not Found
            </option>
          </select>
        </div>
      </Card>

      {/* Medication list */}
      <Card
        title="Medication Safety Analysis"
        subtitle={`${filteredMedications.length} medications found`}
      >
        <div className="space-y-4">

          {filteredMedications.length > 0 ? (
            filteredMedications.map((medication) => {
              const isExpanded =
                expandedId === medication.id

              return (
                <div
                  key={medication.id}
                  className={`
                    overflow-hidden rounded-xl border transition
                    ${
                      medication.status === "Critical"
                        ? "border-red-100"
                        : medication.status ===
                            "Warning"
                          ? "border-amber-100"
                          : "border-slate-200"
                    }
                  `}
                >

                  {/* Medication Header */}
                  <button
                    type="button"
                    onClick={() =>
                      toggleMedication(medication.id)
                    }
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex min-w-0 items-center gap-4">

                      <div
                        className={`
                          flex h-11 w-11 shrink-0 items-center
                          justify-center rounded-xl
                          ${
                            medication.status ===
                            "Critical"
                              ? "bg-red-50 text-red-600"
                              : medication.status ===
                                  "Warning"
                                ? "bg-amber-50 text-amber-600"
                                : medication.status ===
                                    "Not Found"
                                  ? "bg-slate-100 text-slate-500"
                                  : "bg-emerald-50 text-emerald-600"
                          }
                        `}
                      >
                        {getStatusIcon(
                          medication.status
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-slate-800">
                            {medication.medicationName}
                          </h3>

                          <Badge
                            variant={
                              statusVariants[
                                medication.status
                              ]
                            }
                          >
                            {medication.status}
                          </Badge>
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                          {medication.found
                            ? "Medication identified in safety database"
                            : "Medication could not be identified"}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-slate-400">
                      {isExpanded ? (
                        <FiChevronUp className="h-5 w-5" />
                      ) : (
                        <FiChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/50 p-5">

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                        {/* Warnings */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <div className="flex items-center gap-2">
                            <FiAlertTriangle className="h-4 w-4 text-amber-500" />

                            <h4 className="text-sm font-semibold text-slate-800">
                              Warnings
                            </h4>
                          </div>

                          {medication.warnings.length >
                          0 ? (
                            <ul className="mt-3 space-y-2">
                              {medication.warnings.map(
                                (warning) => (
                                  <li
                                    key={warning}
                                    className="flex gap-2 text-xs leading-5 text-slate-600"
                                  >
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                                    {warning}
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            <p className="mt-3 text-xs text-slate-400">
                              No warnings available.
                            </p>
                          )}
                        </div>

                        {/* Drug Interactions */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                          <div className="flex items-center gap-2">
                            <FiActivityIcon />

                            <h4 className="text-sm font-semibold text-slate-800">
                              Drug Interactions
                            </h4>
                          </div>

                          {medication.interactions
                            .length > 0 ? (
                            <ul className="mt-3 space-y-2">
                              {medication.interactions.map(
                                (interaction) => (
                                  <li
                                    key={interaction}
                                    className="flex gap-2 text-xs leading-5 text-slate-600"
                                  >
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                                    {interaction}
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            <p className="mt-3 text-xs text-slate-400">
                              No interactions available.
                            </p>
                          )}
                        </div>

                        {/* Boxed Warning */}
                        <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
                          <div className="flex items-center gap-2">
                            <FiXCircle className="h-4 w-4 text-red-500" />

                            <h4 className="text-sm font-semibold text-red-800">
                              Boxed Warning
                            </h4>
                          </div>

                          <p className="mt-3 text-xs leading-5 text-red-700">
                            {medication.boxedWarning}
                          </p>
                        </div>

                        {/* Recommendations */}
                        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                          <div className="flex items-center gap-2">
                            <FiCheckCircle className="h-4 w-4 text-blue-600" />

                            <h4 className="text-sm font-semibold text-blue-800">
                              Recommendations
                            </h4>
                          </div>

                          <p className="mt-3 text-xs leading-5 text-blue-700">
                            {medication.recommendations}
                          </p>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <FiSearch className="h-5 w-5 text-slate-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-800">
                No medications found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Clinical disclaimer */}
      <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
        <FiInfo className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

        <div>
          <p className="text-sm font-semibold text-amber-800">
            Clinical decision support
          </p>

          <p className="mt-1 text-xs leading-5 text-amber-700">
            Medication safety findings are intended to
            support clinical review. Healthcare professionals
            should verify medication information before making
            treatment decisions.
          </p>
        </div>
      </div>
    </div>
  )
}

/*
  Small reusable icon component for the interaction
  section.
*/
const FiActivityIcon = () => (
  <FiShield className="h-4 w-4 text-blue-500" />
)

export default DrugSafety