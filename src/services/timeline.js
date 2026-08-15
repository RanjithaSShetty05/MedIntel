export const getTimeline = async (patientId) => {
  console.log("Getting timeline for:", patientId)

  return []
}

export const createTimelineEvent = async (eventData) => {
  console.log("Creating timeline event:", eventData)

  return {
    success: true,
  }
}

export const deleteTimelineEvent = async (id) => {
  console.log("Deleting timeline event:", id)

  return {
    success: true,
  }
}