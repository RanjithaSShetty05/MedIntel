import api from "./api"

export const getDoctorNotes = async (caseId) => {
  const response = await api.get(
    `/cases/${caseId}/doctor-notes`
  )

  return response.data
}

export const createDoctorNote = async (
  caseId,
  noteData
) => {
  const response = await api.post(
    `/cases/${caseId}/doctor-notes`,
    noteData
  )

  return response.data
}