import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiX,
  FiSliders,
} from "react-icons/fi"

import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { clinicalCases } from "../../data/casesData"

const urgencyVariants = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
}

const statusVariants = {
  Reviewed: "success",
  Pending: "warning",
}

const ClinicalCases = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [urgency, setUrgency] = useState("All")
  const [status, setStatus] = useState("All")
  const [gender, setGender] = useState("All")
  const [age, setAge] = useState("All")

  const [sortField, setSortField] = useState("createdDate")
  const [sortDirection, setSortDirection] = useState("desc")

  const [currentPage, setCurrentPage] = useState(1)

  const [showFilters, setShowFilters] = useState(false)

  const itemsPerPage = 8

  // Filtering
  const filteredCases = useMemo(() => {
    return clinicalCases.filter((patient) => {
      const searchValue = search.toLowerCase().trim()

      const matchesSearch =
        !searchValue ||
        patient.patientName.toLowerCase().includes(searchValue) ||
        patient.symptoms.toLowerCase().includes(searchValue) ||
        patient.id.toLowerCase().includes(searchValue)

      const matchesUrgency =
        urgency === "All" ||
        patient.urgency === urgency

      const matchesStatus =
        status === "All" ||
        patient.status === status

      const matchesGender =
        gender === "All" ||
        patient.gender === gender

      const matchesAge =
        age === "All" ||
        (age === "18-30" &&
          patient.age >= 18 &&
          patient.age <= 30) ||
        (age === "31-45" &&
          patient.age >= 31 &&
          patient.age <= 45) ||
        (age === "46-60" &&
          patient.age >= 46 &&
          patient.age <= 60) ||
        (age === "60+" &&
          patient.age >= 60)

      return (
        matchesSearch &&
        matchesUrgency &&
        matchesStatus &&
        matchesGender &&
        matchesAge
      )
    })
  }, [search, urgency, status, gender, age])

  // Sorting
  const sortedCases = useMemo(() => {
    const sorted = [...filteredCases]

    sorted.sort((a, b) => {
      let valueA = a[sortField]
      let valueB = b[sortField]

      if (sortField === "age") {
        valueA = Number(valueA)
        valueB = Number(valueB)
      } else {
        valueA = String(valueA).toLowerCase()
        valueB = String(valueB).toLowerCase()
      }

      if (valueA < valueB) {
        return sortDirection === "asc" ? -1 : 1
      }

      if (valueA > valueB) {
        return sortDirection === "asc" ? 1 : -1
      }

      return 0
    })

    return sorted
  }, [filteredCases, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(
    sortedCases.length / itemsPerPage
  )

  const paginatedCases = sortedCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(
        sortDirection === "asc" ? "desc" : "asc"
      )
    } else {
      setSortField(field)
      setSortDirection("asc")
    }

    setCurrentPage(1)
  }

  const handleSearch = (value) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearch("")
    setUrgency("All")
    setStatus("All")
    setGender("All")
    setAge("All")
    setCurrentPage(1)
  }

  const hasActiveFilters =
    search ||
    urgency !== "All" ||
    status !== "All" ||
    gender !== "All" ||
    age !== "All"

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return null
    }

    return sortDirection === "asc" ? (
      <FiChevronUp className="h-3.5 w-3.5" />
    ) : (
      <FiChevronDown className="h-3.5 w-3.5" />
    )
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Patient Management
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Clinical Cases
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Search, review, and manage clinical patient cases.
          </p>
        </div>

        <Button
          onClick={() => navigate("/cases/new")}
        >
          Add Patient
        </Button>
      </div>

      <Card className="overflow-hidden">

        {/* Search + Filter Controls */}
        <div className="border-b border-slate-100 p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="Search by patient name, symptoms, or case ID..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <Button
              variant="outline"
              onClick={() =>
                setShowFilters(!showFilters)
              }
              icon={FiSliders}
            >
              Filters
            </Button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-1.5 px-2 text-sm font-medium text-red-500 hover:text-red-600"
              >
                <FiX className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Urgency */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Risk / Urgency
                </label>

                <select
                  value={urgency}
                  onChange={(e) => {
                    setUrgency(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All urgency levels</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All statuses</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              {/* Gender */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Gender
                </label>

                <select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-500">
                  Age
                </label>

                <select
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All ages</option>
                  <option value="18-30">18–30</option>
                  <option value="31-45">31–45</option>
                  <option value="46-60">46–60</option>
                  <option value="60+">60+</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <FiFilter className="h-4 w-4 text-slate-400" />

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {sortedCases.length}
              </span>{" "}
              clinical cases
            </p>
          </div>
        </div>

        {/* Table */}
        {paginatedCases.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">

              <thead>
                <tr className="border-y border-slate-100 bg-slate-50/70">

                  <th className="px-5 py-3">
                    <button
                      onClick={() =>
                        handleSort("patientName")
                      }
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-700"
                    >
                      Patient
                      <SortIcon field="patientName" />
                    </button>
                  </th>

                  <th className="px-5 py-3">
                    <button
                      onClick={() =>
                        handleSort("age")
                      }
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-700"
                    >
                      Age
                      <SortIcon field="age" />
                    </button>
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Gender
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Symptoms
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Urgency
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3">
                    <button
                      onClick={() =>
                        handleSort("createdDate")
                      }
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-700"
                    >
                      Created
                      <SortIcon field="createdDate" />
                    </button>
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedCases.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50/60"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {patient.patientName}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {patient.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {patient.age}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {patient.gender}
                    </td>

                    <td className="max-w-[280px] px-5 py-4">
                      <p
                        className="truncate text-sm text-slate-600"
                        title={patient.symptoms}
                      >
                        {patient.symptoms}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          urgencyVariants[patient.urgency]
                        }
                      >
                        {patient.urgency}
                      </Badge>
                    </td>

                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          statusVariants[patient.status]
                        }
                      >
                        {patient.status}
                      </Badge>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                      {patient.createdDate}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          navigate(
                            `/cases/${patient.id}`
                          )
                        }
                        title="View patient"
                        className="inline-flex rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <FiEye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <FiSearch className="h-5 w-5 text-slate-400" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-800">
              No cases found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Try changing your search or filter criteria.
            </p>

            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-slate-500">
              Page{" "}
              <span className="font-medium text-slate-800">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-800">
                {totalPages}
              </span>
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
                className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronLeft className="h-4 w-4" />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`
                    min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition
                    ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
                className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default ClinicalCases