import api from "./api"

export const getTimeline = async (patientId) => {
  const response = await api.get(
    `/cases/${patientId}/timeline`
  )

  return response.data
}

export const createTimelineEvent = async (
  patientId,
  label
) => {
  const response = await api.post(
    `/cases/${patientId}/timeline`,
    {
      label,
    }
  )

  return response.data
}