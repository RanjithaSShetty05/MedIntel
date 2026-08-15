export const patientDetails = {
  "C-1001": {
    id: "C-1001",
    patientName: "Arjun Rao",
    age: 52,
    gender: "Male",
    symptoms: [
      "Chest pain",
      "Fatigue",
      "Shortness of breath",
    ],
    urgency: "High",
    status: "Reviewed",
    createdDate: "15 Aug 2026",

    aiSummary:
      "The patient presents with symptoms that may indicate an underlying cardiovascular condition. Further clinical evaluation and monitoring are recommended.",

    riskFactors: [
      "Hypertension",
      "Family history of cardiovascular disease",
      "Sedentary lifestyle",
    ],

    medications: [
      "Amlodipine 5 mg",
      "Aspirin 75 mg",
      "Atorvastatin 20 mg",
    ],

    diseasePredictions: [
      {
        disease: "Coronary Artery Disease",
        probability: 78,
        level: "High",
      },
      {
        disease: "Hypertension",
        probability: 65,
        level: "Medium",
      },
      {
        disease: "Angina",
        probability: 54,
        level: "Medium",
      },
    ],

    drugSafety: [
      {
        medication: "Amlodipine",
        status: "Safe",
        warnings: "No major warnings detected.",
      },
      {
        medication: "Aspirin",
        status: "Warning",
        warnings:
          "Monitor for increased bleeding risk when combined with other anticoagulants.",
      },
      {
        medication: "Atorvastatin",
        status: "Safe",
        warnings: "No significant interaction detected.",
      },
    ],

    timeline: [
      {
        date: "15 Aug 2026",
        time: "10:30 AM",
        description:
          "Clinical case reviewed by Dr. Sharma.",
      },
      {
        date: "15 Aug 2026",
        time: "10:10 AM",
        description:
          "AI disease prediction analysis completed.",
      },
      {
        date: "15 Aug 2026",
        time: "09:45 AM",
        description:
          "Drug safety analysis completed.",
      },
      {
        date: "15 Aug 2026",
        time: "09:30 AM",
        description:
          "Patient case created.",
      },
    ],

    doctorNotes: [
      {
        doctor: "Dr. Sharma",
        diagnosis: "Possible cardiovascular condition",
        remarks:
          "Patient advised to undergo further cardiac evaluation.",
        prescription: "Continue current medication.",
        date: "15 Aug 2026",
      },
    ],
  },
}