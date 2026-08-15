import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiPlus,
  FiSearch,
  FiEye,
  FiTrash2,
  FiX,
  FiCalendar,
  FiUser,
  FiFileText,
  FiAlertTriangle,
} from "react-icons/fi"
import { toast } from "react-toastify"

import Card from "../../components/Card"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import { doctorNotes } from "../../data/doctorNotesData"

const statusVariants = {
  Reviewed: "success",
  "Follow-up": "info",
  Pending: "warning",
}

const DoctorNotes = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] =
    useState(false)

  const [selectedNote, setSelectedNote] =
    useState(null)

  const [newNote, setNewNote] = useState({
    doctorName: "",
    diagnosis: "",
    remarks: "",
    prescription: "",
    status: "Pending",
    followUpDate: "",
  })

  const filteredNotes = doctorNotes.filter((note) => {
    const searchValue = search.toLowerCase().trim()

    const matchesSearch =
      !searchValue ||
      note.doctorName
        .toLowerCase()
        .includes(searchValue) ||
      note.patientName
        .toLowerCase()
        .includes(searchValue) ||
      note.patientId
        .toLowerCase()
        .includes(searchValue) ||
      note.diagnosis
        .toLowerCase()
        .includes(searchValue)

    const matchesStatus =
      statusFilter === "All" ||
      note.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setNewNote((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleAddNote = (e) => {
    e.preventDefault()

    if (
      !newNote.doctorName.trim() ||
      !newNote.diagnosis.trim() ||
      !newNote.remarks.trim() ||
      !newNote.prescription.trim() ||
      !newNote.followUpDate
    ) {
      toast.error(
        "Please complete all required fields."
      )
      return
    }

    // Dummy submission for now.
    console.log("New doctor note:", newNote)

    toast.success(
      "Doctor note added successfully."
    )

    setShowModal(false)

    setNewNote({
      doctorName: "",
      diagnosis: "",
      remarks: "",
      prescription: "",
      status: "Pending",
      followUpDate: "",
    })
  }

  const handleDelete = () => {
    // Dummy delete for now.
    console.log(
      "Delete doctor note:",
      selectedNote?.id
    )

    toast.success(
      "Doctor note deleted successfully."
    )

    setShowDeleteModal(false)
    setSelectedNote(null)
  }

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Clinical Documentation
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Doctor Notes
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create and manage clinical notes recorded by
            physicians.
          </p>
        </div>

        <Button
          icon={FiPlus}
          onClick={() => setShowModal(true)}
        >
          Add Doctor Note
        </Button>
      </div>

      {/* Filters */}
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
              placeholder="Search doctor, patient, case ID, or diagnosis..."
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
            <option value="Reviewed">
              Reviewed
            </option>
            <option value="Follow-up">
              Follow-up
            </option>
            <option value="Pending">
              Pending
            </option>
          </select>
        </div>
      </Card>

      {/* Notes Table */}
      <Card className="overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-4">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredNotes.length}
            </span>{" "}
            doctor notes
          </p>
        </div>

        {filteredNotes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">

              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Doctor
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Patient
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Diagnosis
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Remarks
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Prescription
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Follow-up
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredNotes.map((note) => (
                  <tr
                    key={note.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50/60"
                  >

                    {/* Doctor */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <FiUser className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {note.doctorName}
                          </p>

                          <p className="text-xs text-slate-400">
                            {note.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Patient */}
                    <td className="px-5 py-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/cases/${note.patientId}`
                          )
                        }
                        className="text-left"
                      >
                        <p className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                          {note.patientName}
                        </p>

                        <p className="text-xs text-slate-400">
                          {note.patientId}
                        </p>
                      </button>
                    </td>

                    {/* Diagnosis */}
                    <td className="max-w-[220px] px-5 py-4">
                      <p className="text-sm text-slate-700">
                        {note.diagnosis}
                      </p>
                    </td>

                    {/* Remarks */}
                    <td className="max-w-[280px] px-5 py-4">
                      <p
                        className="truncate text-sm text-slate-500"
                        title={note.remarks}
                      >
                        {note.remarks}
                      </p>
                    </td>

                    {/* Prescription */}
                    <td className="max-w-[220px] px-5 py-4">
                      <p
                        className="truncate text-sm text-slate-500"
                        title={note.prescription}
                      >
                        {note.prescription}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          statusVariants[note.status]
                        }
                      >
                        {note.status}
                      </Badge>
                    </td>

                    {/* Follow-up */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <FiCalendar className="h-4 w-4 text-slate-400" />
                        {note.followUpDate}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-1">

                        <button
                          title="View patient"
                          onClick={() =>
                            navigate(
                              `/cases/${note.patientId}`
                            )
                          }
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>

                        <button
                          title="Delete note"
                          onClick={() => {
                            setSelectedNote(note)
                            setShowDeleteModal(true)
                          }}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <FiFileText className="h-5 w-5 text-slate-400" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-800">
              No doctor notes found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or status filter.
            </p>
          </div>
        )}
      </Card>

      {/* Add Note Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Add Doctor Note
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Record clinical observations and follow-up
                  information.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleAddNote}
              className="space-y-5 p-6"
            >

              {/* Doctor Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Doctor Name
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="doctorName"
                  value={newNote.doctorName}
                  onChange={handleInputChange}
                  placeholder="e.g. Dr. Sharma"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Diagnosis */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Diagnosis
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  name="diagnosis"
                  value={newNote.diagnosis}
                  onChange={handleInputChange}
                  placeholder="Enter diagnosis"
                  className="w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Remarks */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Doctor Remarks
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <textarea
                  name="remarks"
                  value={newNote.remarks}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Enter clinical observations or remarks"
                  className="w-full resize-none rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Prescription */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Prescription
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <textarea
                  name="prescription"
                  value={newNote.prescription}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter prescription details"
                  className="w-full resize-none rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Status + Follow-up */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={newNote.status}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Reviewed">
                      Reviewed
                    </option>

                    <option value="Follow-up">
                      Follow-up
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Follow-up Date
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="date"
                    name="followUpDate"
                    value={newNote.followUpDate}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </Button>

                <Button type="submit">
                  Save Doctor Note
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && selectedNote && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiAlertTriangle className="h-5 w-5" />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Delete Doctor Note?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete the note
              recorded by{" "}
              <span className="font-medium text-slate-700">
                {selectedNote.doctorName}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedNote(null)
                }}
              >
                Cancel
              </Button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorNotes