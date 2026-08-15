export const drugSafetyData = [
  {
    id: "D-001",
    medicationName: "Aspirin 75 mg",
    found: true,
    status: "Warning",
    warnings: [
      "Increased risk of gastrointestinal bleeding.",
      "Use cautiously in patients with a history of ulcers.",
    ],
    interactions: [
      "May increase bleeding risk when combined with anticoagulants.",
      "Monitor when used with other antiplatelet medicines.",
    ],
    boxedWarning:
      "Long-term use may increase the risk of serious gastrointestinal bleeding.",
    recommendations:
      "Review bleeding history and monitor for signs of gastrointestinal bleeding.",
  },
  {
    id: "D-002",
    medicationName: "Amlodipine 5 mg",
    found: true,
    status: "Safe",
    warnings: [
      "May cause dizziness or mild ankle swelling.",
    ],
    interactions: [
      "No significant interaction detected with the current medication list.",
    ],
    boxedWarning:
      "No boxed warning identified for the current analysis.",
    recommendations:
      "Continue monitoring blood pressure and tolerance.",
  },
  {
    id: "D-003",
    medicationName: "Atorvastatin 20 mg",
    found: true,
    status: "Safe",
    warnings: [
      "Monitor for unexplained muscle pain or weakness.",
    ],
    interactions: [
      "No significant interaction detected with the current medication list.",
    ],
    boxedWarning:
      "No boxed warning identified for the current analysis.",
    recommendations:
      "Continue lipid monitoring and review liver function as clinically appropriate.",
  },
  {
    id: "D-004",
    medicationName: "Warfarin",
    found: true,
    status: "Critical",
    warnings: [
      "High bleeding risk.",
      "Requires careful dose and INR monitoring.",
    ],
    interactions: [
      "Multiple medications may increase anticoagulant effect.",
      "Potentially significant interaction with antiplatelet medicines.",
    ],
    boxedWarning:
      "Serious or fatal bleeding can occur with anticoagulant therapy.",
    recommendations:
      "Review the complete medication list and closely monitor anticoagulation parameters.",
  },
  {
    id: "D-005",
    medicationName: "Metformin 500 mg",
    found: true,
    status: "Safe",
    warnings: [
      "Gastrointestinal discomfort may occur.",
    ],
    interactions: [
      "No significant interaction detected in the current analysis.",
    ],
    boxedWarning:
      "No boxed warning identified for the current analysis.",
    recommendations:
      "Continue glucose monitoring and review renal function as clinically appropriate.",
  },
  {
    id: "D-006",
    medicationName: "Unknown Medication",
    found: false,
    status: "Not Found",
    warnings: [],
    interactions: [],
    boxedWarning:
      "Medication could not be identified in the available medication database.",
    recommendations:
      "Verify the medication name, dosage, and active ingredient before clinical use.",
  },
]