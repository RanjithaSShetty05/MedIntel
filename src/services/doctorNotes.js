export const getDoctorNotes = async () => {
  return []
}

export const createDoctorNote = async (noteData) => {
  console.log("Creating doctor note:", noteData)

  return {
    success: true,
  }
}

export const deleteDoctorNote = async (id) => {
  console.log("Deleting doctor note:", id)

  return {
    success: true,
  }
}