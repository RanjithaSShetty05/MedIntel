import api from "./api"

export const getReportById = async (id) => {
  const response = await api.get(`/cases/${id}/report`, {
    responseType: "blob",
  })

  return response.data
}

export const downloadReport = async (id, patientName = "patient") => {
  const response = await api.get(`/cases/${id}/report`, {
    responseType: "blob",
  })

  const blob = new Blob([response.data], {
    type: "application/pdf",
  })

  const url = window.URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = `MedIntel_Report_${patientName}.pdf`

  document.body.appendChild(link)
  link.click()
  link.remove()

  window.URL.revokeObjectURL(url)

  return true
}