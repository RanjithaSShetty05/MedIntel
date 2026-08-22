import api from "./api"

export const getCases = async () => {
  const response = await api.get("/cases")
  return response.data
}

export const getCaseById = async (id) => {
  const response = await api.get(`/cases/${id}`)
  return response.data
}

export const createCase = async (caseData) => {
  const response = await api.post("/cases", caseData)
  return response.data
}

export const updateCase = async (id, caseData) => {
  const response = await api.put(`/cases/${id}`, caseData)
  return response.data
}

export const deleteCase = async (id) => {
  const response = await api.delete(`/cases/${id}`)
  return response.data
}