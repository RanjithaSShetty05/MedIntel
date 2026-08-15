import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiActivity,
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiSearch,
} from "react-icons/fi"

import Card from "../../components/Card"
import Badge from "../../components/Badge"
import { timelineEvents } from "../../data/timelineData"

const typeVariants = {
  "Case Review": "info",
  "AI Analysis": "success",
  "Drug Safety": "warning",
  "Doctor Note": "info",
  "Patient Created": "success",
}

const Timeline = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")

  const filteredEvents = useMemo(() => {
    const value = search.toLowerCase().trim()

    return timelineEvents.filter((event) => {
      const matchesSearch =
        !value ||
        event.patient.toLowerCase().includes(value) ||
        event.patientId.toLowerCase().includes(value) ||
        event.description.toLowerCase().includes(value)

      const matchesType =
        typeFilter === "All" ||
        event.type === typeFilter

      return matchesSearch && matchesType
    })
  }, [search, typeFilter])

  const eventTypes = [
    ...new Set(timelineEvents.map((event) => event.type)),
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Clinical Activity
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Timeline
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Track important clinical activities and patient
          events.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search patient, case ID, or activity..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
            className="rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">
              All activities
            </option>

            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Timeline */}
      <Card
        title="Clinical Activity Timeline"
        subtitle={`${filteredEvents.length} activities found`}
      >
        {filteredEvents.length > 0 ? (
          <div className="relative">

            {/* Vertical line */}
            <div className="absolute bottom-0 left-[19px] top-0 w-px bg-slate-200" />

            <div className="space-y-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative flex gap-5"
                >

                  {/* Timeline icon */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-blue-50 text-blue-600 shadow-sm">
                    <FiActivity className="h-4 w-4" />
                  </div>

                  {/* Event */}
                  <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-blue-100 hover:bg-blue-50/30">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-slate-800">
                            {event.description}
                          </h3>

                          <Badge
                            variant={
                              typeVariants[event.type] ||
                              "info"
                            }
                          >
                            {event.type}
                          </Badge>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">

                          <span className="flex items-center gap-1.5">
                            <FiCalendar className="h-3.5 w-3.5" />
                            {event.date}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <FiClock className="h-3.5 w-3.5" />
                            {event.time}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          navigate(
                            `/cases/${event.patientId}`
                          )
                        }
                        className="flex shrink-0 items-center gap-1.5 self-start text-xs font-medium text-blue-600 transition hover:text-blue-700"
                      >
                        {event.patient}
                        <FiArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <FiSearch className="h-5 w-5 text-slate-400" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-800">
              No timeline events found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or activity filter.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default Timeline