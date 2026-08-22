import api from "./api"

export const getDashboardData = async () => {
  const response = await api.get("/cases")

  const cases = Array.isArray(response.data)
    ? response.data
    : []

  const totalPatients = cases.length

  const criticalCases = cases.filter(
    (item) =>
      String(item.urgencyLevel || "").toLowerCase() ===
      "critical"
  ).length

  const highCases = cases.filter(
    (item) =>
      String(item.urgencyLevel || "").toLowerCase() ===
      "high"
  ).length

  const mediumCases = cases.filter(
    (item) =>
      String(item.urgencyLevel || "").toLowerCase() ===
      "medium"
  ).length

  const lowCases = cases.filter(
    (item) =>
      String(item.urgencyLevel || "").toLowerCase() ===
      "low"
  ).length

  const pendingCases = cases.filter(
    (item) =>
      String(item.status || "").toLowerCase() ===
      "waiting"
  ).length

  const reviewedCases = cases.filter(
    (item) =>
      String(item.status || "").toLowerCase() ===
      "reviewed"
  ).length

  // Monthly case count
  const monthMap = {}

  cases.forEach((item) => {
    if (!item.createdAt) return

    const date = new Date(item.createdAt)

    if (Number.isNaN(date.getTime())) return

    const month = date.toLocaleString("en-US", {
      month: "short",
    })

    monthMap[month] = (monthMap[month] || 0) + 1
  })

  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const monthlyCases = monthOrder
    .filter((month) => monthMap[month] !== undefined)
    .map((month) => ({
      month,
      cases: monthMap[month],
    }))

  // Disease distribution
  const diseaseMap = {}

  cases.forEach((item) => {
    const predictions = Array.isArray(
      item.diseasePredictions
    )
      ? item.diseasePredictions
      : []

    const condition =
      predictions[0]?.condition ||
      "Unknown"

    diseaseMap[condition] =
      (diseaseMap[condition] || 0) + 1
  })

  const diseaseDistribution = Object.entries(
    diseaseMap
  ).map(([name, value]) => ({
    name,
    value,
  }))

  // Risk distribution
  const riskDistribution = [
    {
      name: "Critical",
      value: criticalCases,
    },
    {
      name: "High",
      value: highCases,
    },
    {
      name: "Medium",
      value: mediumCases,
    },
    {
      name: "Low",
      value: lowCases,
    },
  ]

  // Recent patients
  const recentPatients = [...cases]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5)
    .map((item) => {
      const predictions = Array.isArray(
        item.diseasePredictions
      )
        ? item.diseasePredictions
        : []

      const condition =
        predictions[0]?.condition ||
        item.summary ||
        "Clinical case"

      const risk =
        String(item.urgencyLevel || "low")
          .charAt(0)
          .toUpperCase() +
        String(item.urgencyLevel || "low")
          .slice(1)

      const status =
        String(item.status || "waiting")
          .toLowerCase() === "reviewed"
          ? "Reviewed"
          : "Pending"

      return {
        id: item.id,
        name: item.patientName,
        age: item.patientAge,
        gender:
          String(item.patientGender || "")
            .charAt(0)
            .toUpperCase() +
          String(item.patientGender || "")
            .slice(1),
        condition,
        risk,
        status,
        date: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )
          : "-",
      }
    })

  // Recent activities based on actual cases
  const recentActivities = [...cases]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5)
    .map((item, index) => ({
      id: item.id || index,
      title: "New patient added",
      description: `${item.patientName} was added to clinical cases`,
      time: item.createdAt
        ? new Date(item.createdAt).toLocaleString()
        : "",
      type: "patient",
    }))

  return {
    totalPatients,
    criticalCases,
    highCases,
    mediumCases,
    lowCases,
    pendingCases,
    reviewedCases,

    monthlyCases,
    diseaseDistribution,
    riskDistribution,
    recentPatients,
    recentActivities,
  }
}