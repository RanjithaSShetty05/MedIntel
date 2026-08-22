import api from "./api"

export const getDrugSafetyAnalysis = async (caseId) => {
  const response = await api.get(
    `/cases/${caseId}`
  )

  return response.data
}