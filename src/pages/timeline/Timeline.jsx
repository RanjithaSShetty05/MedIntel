import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiActivity,
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiPlus,
  FiSearch,
  FiX,
} from "react-icons/fi"

import Card from "../../components/Card"
import Badge from "../../components/Badge"

import { getCases } from "../../services/cases"
import {
  getTimeline,
  createTimelineEvent,
} from "../../services/timeline"

const Timeline = () => {
  const navigate = useNavigate()

  const [events, setEvents] = useState([])
  const [cases, setCases] = useState([])

  const [search, setSearch] = useState("")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [showAddEvent, setShowAddEvent] =
    useState(false)

  const [selectedCaseId, setSelectedCaseId] =
    useState("")

  const [label, setLabel] = useState("")

  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState("")

  // --------------------------------------------------
  // Load all cases + their timelines
  // --------------------------------------------------

  const loadTimeline = async () => {
    try {
      setLoading(true)
      setError("")

      const caseData = await getCases()

      setCases(caseData)

      if (!caseData || caseData.length === 0) {
        setEvents([])
        return
      }

      const timelineResults =
        await Promise.all(
          caseData.map(async (patientCase) => {
            try {
              const timeline =
                await getTimeline(patientCase.id)

              return timeline.map((event) => ({
                ...event,
                patient:
                  patientCase.patientName ||
                  "Unknown patient",
                patientId: String(
                  patientCase.id
                ),
              }))
            } catch (error) {
              console.error(
                `Failed to load timeline for case ${patientCase.id}:`,
                error
              )

              return []
            }
          })
        )

      const allEvents =
        timelineResults.flat()

      // Newest events first
      allEvents.sort(
        (a, b) =>
          new Date(b.timestamp) -
          new Date(a.timestamp)
      )

      setEvents(allEvents)
    } catch (error) {
      console.error(
        "Failed to load timeline:",
        error
      )

      setError(
        "Unable to load timeline. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTimeline()
  }, [])

  // --------------------------------------------------
  // Formatting helpers
  // --------------------------------------------------

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return "-"
    }

    return new Date(
      timestamp
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (timestamp) => {
    if (!timestamp) {
      return "-"
    }

    return new Date(
      timestamp
    ).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // --------------------------------------------------
  // Search
  // --------------------------------------------------

  const filteredEvents = useMemo(() => {
    const value = search
      .toLowerCase()
      .trim()

    return events.filter((event) => {
      if (!value) {
        return true
      }

      return (
        event.patient
          ?.toLowerCase()
          .includes(value) ||
        String(event.patientId)
          .toLowerCase()
          .includes(value) ||
        event.label
          ?.toLowerCase()
          .includes(value)
      )
    })
  }, [events, search])

  // --------------------------------------------------
  // Add timeline event
  // --------------------------------------------------

  const handleAddEvent = async (e) => {
    e.preventDefault()

    setSaveError("")

    if (!selectedCaseId) {
      setSaveError(
        "Please select a patient."
      )
      return
    }

    if (!label.trim()) {
      setSaveError(
        "Please enter a timeline event."
      )
      return
    }

    try {
      setSaving(true)

      await createTimelineEvent(
        selectedCaseId,
        label.trim()
      )

      // Clear form
      setLabel("")
      setSelectedCaseId("")
      setShowAddEvent(false)

      // Reload real timeline data
      await loadTimeline()
    } catch (error) {
      console.error(
        "Failed to create timeline event:",
        error
      )

      setSaveError(
        "Unable to create timeline event. Please try again."
      )
    } finally {
      setSaving(false)
    }
  }

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <FiActivity className="h-5 w-5 animate-pulse text-blue-600" />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Loading clinical timeline...
          </p>

        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Header */}
      <div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm font-medium text-blue-600">
              Clinical Activity
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Timeline
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Track important clinical activities
              and patient events.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowAddEvent(true)
              setSaveError("")
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <FiPlus className="h-4 w-4" />
            Add Event
          </button>

        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Search */}
      <Card>
        <div className="relative">

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

                  {/* Icon */}
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-blue-50 text-blue-600 shadow-sm">
                    <FiActivity className="h-4 w-4" />
                  </div>

                  {/* Event */}
                  <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-blue-100 hover:bg-blue-50/30">

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-sm font-semibold text-slate-800">
                            {event.label}
                          </h3>

                          <Badge variant="info">
                            Timeline Event
                          </Badge>

                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">

                          <span className="flex items-center gap-1.5">
                            <FiCalendar className="h-3.5 w-3.5" />
                            {formatDate(
                              event.timestamp
                            )}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <FiClock className="h-3.5 w-3.5" />
                            {formatTime(
                              event.timestamp
                            )}
                          </span>

                        </div>
                      </div>

                      <button
                        type="button"
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
              {events.length === 0
                ? "No timeline events have been added yet."
                : "Try changing your search."}
            </p>

          </div>
        )}

      </Card>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add Timeline Event
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Add an event to a patient's clinical timeline.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddEvent(false)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <FiX className="h-4 w-4" />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleAddEvent}
              className="space-y-5 p-6"
            >

              {/* Patient */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Patient
                </label>

                <select
                  value={selectedCaseId}
                  onChange={(e) =>
                    setSelectedCaseId(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >

                  <option value="">
                    Select a patient
                  </option>

                  {cases.map(
                    (patientCase) => (
                      <option
                        key={patientCase.id}
                        value={patientCase.id}
                      >
                        {patientCase.patientName}{" "}
                        — Case #
                        {patientCase.id}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* Event */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Event
                </label>

                <input
                  type="text"
                  value={label}
                  onChange={(e) =>
                    setLabel(e.target.value)
                  }
                  placeholder="e.g. Patient shifted to ICU"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Error */}
              {saveError && (
                <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {saveError}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddEvent(false)
                  }
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : "Add Event"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default Timeline