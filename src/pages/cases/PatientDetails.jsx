import { useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  FiArrowLeft,
  FiUser,
  FiActivity,
  FiAlertTriangle,
  FiShield,
  FiFileText,
  FiClock,
  FiDownload,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi"

import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { patientDetails } from "../../data/patientDetailsData"

const urgencyVariants = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
}

const safetyVariants = {
  Safe: "success",
  Warning: "warning",
  Critical: "danger",
}

const PatientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const patient = useMemo(
    () => patientDetails[id],
    [id]
  )

  if (!patient) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <FiUser className="h-6 w-6 text-slate-400" />
          </div>

          <h1 className="mt-4 text-xl font-bold text-slate-900">
            Patient not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The requested clinical case could not be found
            in the current dummy data.
          </p>

          <Button
            variant="outline"
            className="mt-5"
            onClick={() => navigate("/cases")}
            icon={FiArrowLeft}
          >
            Back to Clinical Cases
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">

      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/cases")}
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to Clinical Cases
        </button>

        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Clinical Case
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {patient.patientName}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Case ID: {patient.id} • Created{" "}
              {patient.createdDate}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant={urgencyVariants[patient.urgency]}
            >
              {patient.urgency} Risk
            </Badge>

            <Badge variant="success">
              {patient.status}
            </Badge>

            <Button
              icon={FiDownload}
              onClick={() =>
                console.log(
                  "Generate report for",
                  patient.id
                )
              }
            >
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Patient Overview */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Patient Information */}
        <Card
          title="Patient Information"
          subtitle="Basic patient details"
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Patient ID
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {patient.id}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Age
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {patient.age} years
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Gender
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {patient.gender}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Urgency
              </p>

              <div className="mt-1">
                <Badge
                  variant={urgencyVariants[patient.urgency]}
                >
                  {patient.urgency}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Risk Status */}
        <Card title="Risk Status">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
              <FiAlertTriangle className="h-7 w-7 text-orange-500" />
            </div>

            <div>
              <p className="text-2xl font-bold text-slate-900">
                {patient.urgency}
              </p>

              <p className="text-sm text-slate-500">
                Current urgency level
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-slate-50 p-3">
            <p className="text-xs leading-5 text-slate-500">
              Clinical risk classification based on the
              available patient information and AI-assisted
              analysis.
            </p>
          </div>
        </Card>
      </section>

      {/* AI Summary */}
      <Card
        title="AI Clinical Summary"
        subtitle="AI-assisted overview of the clinical case"
      >
        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-5">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FiActivity className="h-5 w-5" />
            </div>

            <p className="text-sm leading-7 text-slate-700">
              {patient.aiSummary}
            </p>
          </div>
        </div>
      </Card>

      {/* Symptoms + Risk Factors */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <Card
          title="Symptoms"
          subtitle="Reported clinical symptoms"
        >
          <div className="flex flex-wrap gap-2">
            {patient.symptoms.map((symptom) => (
              <span
                key={symptom}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
              >
                {symptom}
              </span>
            ))}
          </div>
        </Card>

        <Card
          title="Risk Factors"
          subtitle="Known factors associated with the patient"
        >
          <div className="space-y-3">
            {patient.riskFactors.map((factor) => (
              <div
                key={factor}
                className="flex items-center gap-3"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <FiAlertTriangle className="h-3.5 w-3.5" />
                </div>

                <span className="text-sm text-slate-700">
                  {factor}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Disease Predictions */}
      <Card
        title="Disease Predictions"
        subtitle="AI-assisted disease prediction results"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {patient.diseasePredictions.map(
            (prediction) => (
              <div
                key={prediction.disease}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {prediction.disease}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Prediction confidence
                    </p>
                  </div>

                  <Badge
                    variant={
                      urgencyVariants[prediction.level]
                    }
                  >
                    {prediction.level}
                  </Badge>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Probability
                    </span>

                    <span className="font-bold text-slate-900">
                      {prediction.probability}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{
                        width: `${prediction.probability}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </Card>

      {/* Medications + Drug Safety */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Medications */}
        <Card
          title="Current Medications"
          subtitle="Medications associated with this patient"
        >
          <div className="space-y-3">
            {patient.medications.map(
              (medication, index) => (
                <div
                  key={medication}
                  className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                    <FiShield className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {medication}
                    </p>

                    <p className="text-xs text-slate-400">
                      Medication {index + 1}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </Card>

        {/* Drug Safety */}
        <Card
          title="Drug Safety Findings"
          subtitle="Medication safety analysis"
        >
          <div className="space-y-3">
            {patient.drugSafety.map((item) => (
              <div
                key={item.medication}
                className="rounded-lg border border-slate-100 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.medication}
                  </p>

                  <Badge
                    variant={
                      safetyVariants[item.status]
                    }
                  >
                    {item.status}
                  </Badge>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {item.warnings}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Timeline */}
      <Card
        title="Clinical Timeline"
        subtitle="Recent patient activity"
      >
        <div className="relative ml-2 border-l border-slate-200 pl-7">
          {patient.timeline.map((event, index) => (
            <div
              key={`${event.date}-${event.time}`}
              className={`relative ${
                index !== patient.timeline.length - 1
                  ? "pb-7"
                  : ""
              }`}
            >
              <div className="absolute -left-[35px] top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-blue-600 ring-1 ring-blue-100" />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-slate-800">
                  {event.description}
                </p>

                <p className="whitespace-nowrap text-xs text-slate-400">
                  {event.date} • {event.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Doctor Notes */}
      <Card
        title="Doctor Notes"
        subtitle="Clinical notes recorded by physicians"
      >
        <div className="space-y-4">
          {patient.doctorNotes.map((note) => (
            <div
              key={`${note.doctor}-${note.date}`}
              className="rounded-xl border border-slate-200 p-5"
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {note.doctor}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {note.date}
                  </p>
                </div>

                <Badge variant="info">
                  Clinical Note
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Diagnosis
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {note.diagnosis}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Remarks
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {note.remarks}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Prescription
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {note.prescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Disclaimer */}
      <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
        <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

        <div>
          <p className="text-sm font-semibold text-amber-800">
            Clinical decision support
          </p>

          <p className="mt-1 text-xs leading-5 text-amber-700">
            AI-generated predictions and summaries are
            intended to support clinical decision-making and
            should be reviewed by qualified healthcare
            professionals.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PatientDetails