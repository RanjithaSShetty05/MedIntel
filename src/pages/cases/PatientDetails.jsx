import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  FiArrowLeft,
  FiUser,
  FiActivity,
  FiAlertTriangle,
  FiShield,
  FiDownload,
  FiAlertCircle,
} from "react-icons/fi"

import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { getCaseById } from "../../services/cases"

const urgencyVariants = {
  critical: "critical",
  high: "high",
  medium: "medium",
  low: "low",
}

const statusVariants = {
  waiting: "warning",
  pending: "warning",
  reviewed: "success",
  treated: "success",
  "follow-up required": "warning",
}

const PatientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadPatient = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await getCaseById(id)

        setPatient(data)
      } catch (error) {
        console.error(
          "Failed to load patient details:",
          error
        )

        if (error.response?.status === 404) {
          setError("Patient case not found.")
        } else {
          setError(
            "Unable to load patient details. Please try again."
          )
        }
      } finally {
        setLoading(false)
      }
    }

    loadPatient()
  }, [id])

  const formatLabel = (value) => {
    if (!value) {
      return "-"
    }

    return String(value)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      )
  }

  const formatDate = (value) => {
    if (!value) {
      return "-"
    }

    return new Date(value).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    )
  }

  const formatDateTime = (value) => {
    if (!value) {
      return "-"
    }

    return new Date(value).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    )
  }

  const getPredictionConfidence = (confidence) => {
    if (!confidence) {
      return 0
    }

    if (typeof confidence === "number") {
      return confidence
    }

    const text = String(confidence).toLowerCase()

    if (text === "high") {
      return 90
    }

    if (text === "medium") {
      return 60
    }

    if (text === "low") {
      return 30
    }

    const numericValue = Number.parseFloat(
      confidence
    )

    return Number.isNaN(numericValue)
      ? 0
      : numericValue
  }

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <FiActivity className="h-5 w-5 animate-pulse text-blue-600" />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Loading patient details...
          </p>
        </div>
      </div>
    )
  }

  // Error / not found
  if (error || !patient) {
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
            {error ||
              "The requested clinical case could not be found."}
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

  const urgency =
    patient.urgencyLevel?.toLowerCase() || "low"

  const urgencyLabel = formatLabel(urgency)

  const status =
    patient.status?.toLowerCase() || "waiting"

  const statusLabel = formatLabel(status)

  const symptoms = Array.isArray(patient.symptoms)
    ? patient.symptoms
    : patient.symptoms
      ? [patient.symptoms]
      : []

  const riskFactors = Array.isArray(
    patient.riskFactors
  )
    ? patient.riskFactors
    : []

  const medications = Array.isArray(
    patient.medications
  )
    ? patient.medications
    : []

  const vitals = patient.vitals || {}

  const urgencyReasoning = Array.isArray(
    patient.urgencyReasoning
  )
    ? patient.urgencyReasoning
    : []

  const diseasePredictions = Array.isArray(
    patient.diseasePredictions
  )
    ? patient.diseasePredictions
    : []

  const drugSafetyFindings = Array.isArray(
    patient.drugSafetyFindings
  )
    ? patient.drugSafetyFindings
    : []

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
              {formatDateTime(patient.createdAt)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            <Badge
              variant={
                urgencyVariants[urgency] || "low"
              }
            >
              {urgencyLabel} Risk
            </Badge>

            <Badge
              variant={
                statusVariants[status] || "warning"
              }
            >
              {statusLabel}
            </Badge>

            <Button
              icon={FiDownload}
              onClick={() =>
                console.log(
                  "Report integration will be connected next:",
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
                {patient.patientAge} years
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Gender
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {formatLabel(patient.patientGender)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Urgency
              </p>

              <div className="mt-1">
                <Badge
                  variant={
                    urgencyVariants[urgency] || "low"
                  }
                >
                  {urgencyLabel}
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
                {urgencyLabel}
              </p>

              <p className="text-sm text-slate-500">
                Current urgency level
              </p>
            </div>
          </div>

          {urgencyReasoning.length > 0 && (
            <div className="mt-5 rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-700">
                Urgency reasoning
              </p>

              <ul className="mt-2 space-y-1">
                {urgencyReasoning.map(
                  (reason, index) => (
                    <li
                      key={index}
                      className="text-xs leading-5 text-slate-500"
                    >
                      • {reason}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
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
              {patient.summary ||
                "No clinical summary available."}
            </p>
          </div>
        </div>
      </Card>

      {/* Symptoms + Risk Factors */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Symptoms */}
        <Card
          title="Symptoms"
          subtitle="Reported clinical symptoms"
        >
          {symptoms.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {symptoms.map(
                (symptom, index) => (
                  <span
                    key={`${symptom}-${index}`}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                  >
                    {formatLabel(symptom)}
                  </span>
                )
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No symptoms recorded.
            </p>
          )}
        </Card>

        {/* Risk Factors */}
        <Card
          title="Risk Factors"
          subtitle="Known factors associated with the patient"
        >
          {riskFactors.length > 0 ? (
            <div className="space-y-3">
              {riskFactors.map(
                (factor, index) => (
                  <div
                    key={`${factor}-${index}`}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                      <FiAlertTriangle className="h-3.5 w-3.5" />
                    </div>

                    <span className="text-sm text-slate-700">
                      {formatLabel(factor)}
                    </span>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No risk factors recorded.
            </p>
          )}
        </Card>
      </section>

      {/* Vitals */}
      <Card
        title="Vitals"
        subtitle="Recorded patient vital information"
      >
        {Object.keys(vitals).length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Object.entries(vitals).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {formatLabel(key)}
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-800">
                    {String(value)}
                  </p>
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No vital information recorded.
          </p>
        )}
      </Card>

      {/* Disease Predictions */}
      <Card
        title="Disease Predictions"
        subtitle="AI-assisted disease prediction results"
      >
        {diseasePredictions.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {diseasePredictions.map(
              (prediction, index) => {
                const confidence =
                  getPredictionConfidence(
                    prediction.confidence
                  )

                return (
                  <div
                    key={
                      prediction.id ||
                      `${prediction.condition}-${index}`
                    }
                    className="rounded-xl border border-slate-200 p-5"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {prediction.condition ||
                            "Unknown condition"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Prediction confidence
                        </p>
                      </div>

                      {prediction.confidence && (
                        <Badge variant="info">
                          {prediction.confidence}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-5">

                      <div className="flex items-center justify-between text-sm">

                        <span className="text-slate-500">
                          Confidence
                        </span>

                        <span className="font-bold text-slate-900">
                          {confidence}%
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">

                        <div
                          className="h-full rounded-full bg-blue-600 transition-all"
                          style={{
                            width: `${confidence}%`,
                          }}
                        />
                      </div>
                    </div>

                    {prediction.reason && (
                      <p className="mt-4 text-xs leading-5 text-slate-500">
                        {prediction.reason}
                      </p>
                    )}
                  </div>
                )
              }
            )}
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            No disease predictions available.
          </p>
        )}
      </Card>

      {/* Medications + Drug Safety */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Medications */}
        <Card
          title="Current Medications"
          subtitle="Medications associated with this patient"
        >
          {medications.length > 0 ? (
            <div className="space-y-3">

              {medications.map(
                (medication, index) => (
                  <div
                    key={`${medication}-${index}`}
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
          ) : (
            <p className="text-sm text-slate-500">
              No medications recorded.
            </p>
          )}
        </Card>

        {/* Drug Safety */}
        <Card
          title="Drug Safety Findings"
          subtitle="Medication safety analysis"
        >
          {drugSafetyFindings.length > 0 ? (
            <div className="space-y-3">

              {drugSafetyFindings.map(
                (item, index) => (
                  <div
                    key={
                      item.medication ||
                      `${index}`
                    }
                    className="rounded-lg border border-slate-100 p-4"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <p className="text-sm font-semibold text-slate-800">
                        {item.medication ||
                          "Medication"}
                      </p>

                      {item.found !== undefined && (
                        <Badge
                          variant={
                            item.found
                              ? "warning"
                              : "success"
                          }
                        >
                          {item.found
                            ? "Finding"
                            : "No Finding"}
                        </Badge>
                      )}
                    </div>

                    {item.boxedWarning && (
                      <p className="mt-2 text-xs font-medium text-red-600">
                        Boxed warning:{" "}
                        {String(
                          item.boxedWarning
                        )}
                      </p>
                    )}

                    {item.warnings && (
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {Array.isArray(
                          item.warnings
                        )
                          ? item.warnings.join(
                              ", "
                            )
                          : item.warnings}
                      </p>
                    )}

                    {item.drugInteractions && (
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        Interactions:{" "}
                        {Array.isArray(
                          item.drugInteractions
                        )
                          ? item.drugInteractions.join(
                              ", "
                            )
                          : item.drugInteractions}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No drug safety findings available.
            </p>
          )}
        </Card>
      </section>

      {/* Source Clinical Notes */}
      <Card
        title="Clinical Notes"
        subtitle="Original clinical information submitted for analysis"
      >
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
            {patient.rawText ||
              "No clinical notes available."}
          </p>
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
            intended to support clinical decision-making
            and should be reviewed by qualified healthcare
            professionals.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PatientDetails