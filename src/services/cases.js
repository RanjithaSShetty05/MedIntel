export const getCases = async () => {
  return []
}

export const getCaseById = async (id) => {
  console.log("Getting case:", id)

  return null
}

export const createCase = async (caseData) => {
  console.log("Creating case:", caseData)

  return {
    success: true,
  }
}

export const updateCase = async (id, caseData) => {
  console.log("Updating case:", id, caseData)

  return {
    success: true,
  }
}

export const deleteCase = async (id) => {
  console.log("Deleting case:", id)

  return {
    success: true,
  }
}