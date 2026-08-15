import {
  FiUsers,
  FiAlertTriangle,
  FiActivity,
  FiClock,
  FiCheckCircle,
  FiUserPlus,
  FiFileText,
  FiShield,
  FiBarChart2,
  FiTrendingUp,
  FiTrendingDown,
  FiMinus,
} from "react-icons/fi"

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

import Card from "../../components/Card"
import Badge from "../../components/Badge"

import {
  dashboardStats,
  monthlyCases,
  diseaseDistribution,
  riskDistribution,
  recentPatients,
  recentActivities,
} from "../../data/dashboardData"

const statIcons = {
  patients: FiUsers,
  critical: FiAlertTriangle,
  high: FiActivity,
  medium: FiClock,
  low: FiCheckCircle,
  pending: FiClock,
  reviewed: FiCheckCircle,
}

const statIconStyles = {
  patients: "bg-blue-50 text-blue-600",
  critical: "bg-red-50 text-red-600",
  high: "bg-orange-50 text-orange-600",
  medium: "bg-amber-50 text-amber-600",
  low: "bg-emerald-50 text-emerald-600",
  pending: "bg-purple-50 text-purple-600",
  reviewed: "bg-teal-50 text-teal-600",
}

const activityIcons = {
  ai: FiActivity,
  patient: FiUserPlus,
  note: FiFileText,
  drug: FiShield,
  report: FiBarChart2,
}

const activityIconStyles = {
  ai: "bg-blue-50 text-blue-600",
  patient: "bg-emerald-50 text-emerald-600",
  note: "bg-purple-50 text-purple-600",
  drug: "bg-orange-50 text-orange-600",
  report: "bg-cyan-50 text-cyan-600",
}

const riskBadgeVariants = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
}

const statusBadgeVariants = {
  Reviewed: "success",
  Pending: "warning",
}

const diseaseColors = [
  "#2563eb",
  "#14b8a6",
  "#f59e0b",
  "#8b5cf6",
  "#94a3b8",
]

const riskColors = [
  "#dc2626",
  "#f97316",
  "#f59e0b",
  "#10b981",
]

const StatCard = ({ stat }) => {
  const Icon = statIcons[stat.icon]

  const TrendIcon =
    stat.changeType === "positive"
      ? FiTrendingUp
      : stat.changeType === "negative"
        ? FiTrendingDown
        : FiMinus

  const trendColor =
    stat.changeType === "positive"
      ? "text-emerald-600"
      : stat.changeType === "negative"
        ? "text-red-600"
        : "text-slate-500"

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${statIconStyles[stat.icon]}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          <TrendIcon className="h-3.5 w-3.5" />
          {stat.change}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-slate-500">
          {stat.title}
        </p>

        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          {stat.value}
        </p>
      </div>
    </div>
  )
}

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Clinical Overview
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor patient activity, clinical risks, and AI-assisted insights.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 shadow-sm">
          <span className="font-medium text-slate-900">
            Today
          </span>
          {" • "}
          15 August 2026
        </div>
      </div>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.title}
            stat={stat}
          />
        ))}
      </section>

      {/* Main Charts */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Monthly Cases */}
        <Card
          title="Monthly Cases"
          subtitle="Clinical cases recorded over the past months"
          className="xl:col-span-2"
        >
          <div className="h-[300px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart data={monthlyCases}>
                <defs>
                  <linearGradient
                    id="casesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#2563eb"
                      stopOpacity={0.2}
                    />

                    <stop
                      offset="95%"
                      stopColor="#2563eb"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="cases"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fill="url(#casesGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Disease Distribution */}
        <Card
          title="Disease Distribution"
          subtitle="Distribution of identified conditions"
        >
          <div className="h-[300px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={diseaseDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {diseaseDistribution.map((entry, index) => (
                    <Cell
                      key={`disease-${index}`}
                      fill={diseaseColors[index % diseaseColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {diseaseDistribution.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        diseaseColors[index % diseaseColors.length],
                    }}
                  />

                  <span className="text-slate-600">
                    {item.name}
                  </span>
                </div>

                <span className="font-medium text-slate-900">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Risk Distribution */}
      <section>
        <Card
          title="Risk Distribution"
          subtitle="Current patient risk classification"
        >
          <div className="h-[260px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={riskDistribution}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                  }}
                />

                <Bar
                  dataKey="value"
                  radius={[6, 6, 0, 0]}
                  fill="#2563eb"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* Recent Patients + Activities */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Recent Patients */}
        <Card
          title="Recent Patients"
          subtitle="Latest clinical cases"
          className="xl:col-span-2"
          action={
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all
            </button>
          }
        >
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Patient
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Age / Gender
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Condition
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Risk
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {patient.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {patient.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {patient.age} / {patient.gender}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {patient.condition}
                    </td>

                    <td className="px-5 py-4">
                      <Badge variant={riskBadgeVariants[patient.risk]}>
                        {patient.risk}
                      </Badge>
                    </td>

                    <td className="px-5 py-4">
                      <Badge variant={statusBadgeVariants[patient.status]}>
                        {patient.status}
                      </Badge>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                      {patient.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Activities */}
        <Card
          title="Recent Activities"
          subtitle="Latest system activity"
        >
          <div className="space-y-5">
            {recentActivities.map((activity) => {
              const Icon = activityIcons[activity.type]

              return (
                <div
                  key={activity.id}
                  className="flex gap-3"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${activityIconStyles[activity.type]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800">
                      {activity.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {activity.description}
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </section>
    </div>
  )
}

export default Dashboard