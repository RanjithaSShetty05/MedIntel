export const dashboardStats = [
  {
    title: "Total Patients",
    value: "1,284",
    change: "+12.5%",
    changeType: "positive",
    icon: "patients",
  },
  {
    title: "Critical Cases",
    value: "18",
    change: "+3.2%",
    changeType: "negative",
    icon: "critical",
  },
  {
    title: "High Risk",
    value: "64",
    change: "-4.8%",
    changeType: "positive",
    icon: "high",
  },
  {
    title: "Medium Risk",
    value: "142",
    change: "+2.1%",
    changeType: "neutral",
    icon: "medium",
  },
  {
    title: "Low Risk",
    value: "1,060",
    change: "+8.4%",
    changeType: "positive",
    icon: "low",
  },
  {
    title: "Pending Cases",
    value: "27",
    change: "+5",
    changeType: "negative",
    icon: "pending",
  },
  {
    title: "Reviewed Cases",
    value: "936",
    change: "+14.2%",
    changeType: "positive",
    icon: "reviewed",
  },
]

export const monthlyCases = [
  { month: "Jan", cases: 82 },
  { month: "Feb", cases: 96 },
  { month: "Mar", cases: 110 },
  { month: "Apr", cases: 104 },
  { month: "May", cases: 128 },
  { month: "Jun", cases: 142 },
  { month: "Jul", cases: 156 },
  { month: "Aug", cases: 171 },
]

export const diseaseDistribution = [
  { name: "Cardiovascular", value: 32 },
  { name: "Respiratory", value: 24 },
  { name: "Diabetes", value: 18 },
  { name: "Neurological", value: 14 },
  { name: "Other", value: 12 },
]

export const riskDistribution = [
  { name: "Critical", value: 18 },
  { name: "High", value: 64 },
  { name: "Medium", value: 142 },
  { name: "Low", value: 1060 },
]

export const recentPatients = [
  {
    id: "P-1001",
    name: "Arjun Rao",
    age: 52,
    gender: "Male",
    condition: "Hypertension",
    risk: "High",
    status: "Reviewed",
    date: "15 Aug 2026",
  },
  {
    id: "P-1002",
    name: "Priya Sharma",
    age: 44,
    gender: "Female",
    condition: "Diabetes",
    risk: "Medium",
    status: "Pending",
    date: "15 Aug 2026",
  },
  {
    id: "P-1003",
    name: "Rahul Mehta",
    age: 61,
    gender: "Male",
    condition: "Cardiovascular",
    risk: "Critical",
    status: "Reviewed",
    date: "14 Aug 2026",
  },
  {
    id: "P-1004",
    name: "Ananya Patel",
    age: 35,
    gender: "Female",
    condition: "Respiratory",
    risk: "Low",
    status: "Reviewed",
    date: "14 Aug 2026",
  },
  {
    id: "P-1005",
    name: "Vikram Singh",
    age: 57,
    gender: "Male",
    condition: "Neurological",
    risk: "High",
    status: "Pending",
    date: "13 Aug 2026",
  },
]

export const recentActivities = [
  {
    id: 1,
    title: "AI analysis completed",
    description: "Risk assessment generated for Rahul Mehta",
    time: "10 minutes ago",
    type: "ai",
  },
  {
    id: 2,
    title: "New patient added",
    description: "Priya Sharma was added to clinical cases",
    time: "32 minutes ago",
    type: "patient",
  },
  {
    id: 3,
    title: "Doctor note added",
    description: "Dr. Sharma updated patient P-1001",
    time: "1 hour ago",
    type: "note",
  },
  {
    id: 4,
    title: "Drug safety analysis",
    description: "Medication interaction check completed",
    time: "2 hours ago",
    type: "drug",
  },
  {
    id: 5,
    title: "Clinical report generated",
    description: "Report generated for patient P-1003",
    time: "3 hours ago",
    type: "report",
  },
]