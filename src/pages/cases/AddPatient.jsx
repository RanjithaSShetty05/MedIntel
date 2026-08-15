import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiArrowLeft,
  FiMic,
  FiMicOff,
  FiUser,
  FiCalendar,
  FiSave,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi"
import { toast } from "react-toastify"

import Button from "../../components/Button"
import Card from "../../components/Card"

const AddPatient = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    clinicalNotes: "",
  })

  const [errors, setErrors] = useState({})
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)

  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setSpeechSupported(false)
      return
    }

    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-IN"

    recognition.onresult = (event) => {
      let finalTranscript = ""

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const transcript =
          event.results[i][0].transcript

        if (event.results[i].isFinal) {
          finalTranscript += transcript
        }
      }

      if (finalTranscript) {
        setFormData((previous) => ({
          ...previous,
          clinicalNotes:
            previous.clinicalNotes +
            (previous.clinicalNotes ? " " : "") +
            finalTranscript.trim(),
        }))
      }
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)

      setIsListening(false)

      if (event.error === "not-allowed") {
        toast.error(
          "Microphone permission was denied. Please allow microphone access."
        )
      } else if (event.error !== "aborted") {
        toast.error(
          "Speech recognition could not be started."
        )
      }
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
      recognitionRef.current = null
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }))
  }

  const toggleSpeechRecognition = () => {
    if (!speechSupported) {
      toast.error(
        "Speech recognition is not supported in this browser."
      )
      return
    }

    if (!recognitionRef.current) {
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      toast.info("Voice recording stopped.")
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        toast.success("Listening... Start speaking.")
      } catch (error) {
        console.error(error)
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required."
    }

    if (!formData.age) {
      newErrors.age = "Age is required."
    } else if (
      Number(formData.age) < 1 ||
      Number(formData.age) > 120
    ) {
      newErrors.age = "Please enter a valid age."
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender."
    }

    if (!formData.clinicalNotes.trim()) {
      newErrors.clinicalNotes =
        "Clinical notes are required."
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error(
        "Please complete all required fields."
      )
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    }

    // Dummy submission for now.
    // Later this will call the Spring Boot API.
    console.log("New patient:", formData)

    toast.success(
      "Patient added successfully."
    )

    setTimeout(() => {
      navigate("/cases")
    }, 700)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/cases")}
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to Clinical Cases
        </button>

        <p className="text-sm font-medium text-blue-600">
          Patient Management
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Add New Patient
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create a new clinical case and record the patient's
          initial clinical information.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card
          title="Patient Information"
          subtitle="Enter the patient's basic clinical information."
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Patient Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Patient Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter patient's full name"
                  className={`
                    w-full rounded-lg border bg-white py-3 pl-10 pr-4
                    text-sm text-slate-900 outline-none transition
                    placeholder:text-slate-400
                    focus:ring-2
                    ${
                      errors.patientName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                    }
                  `}
                />
              </div>

              {errors.patientName && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                  <FiAlertCircle />
                  {errors.patientName}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Age
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <FiCalendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="number"
                  name="age"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  className={`
                    w-full rounded-lg border bg-white py-3 pl-10 pr-4
                    text-sm text-slate-900 outline-none transition
                    placeholder:text-slate-400
                    focus:ring-2
                    ${
                      errors.age
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                    }
                  `}
                />
              </div>

              {errors.age && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                  <FiAlertCircle />
                  {errors.age}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Gender
                <span className="ml-1 text-red-500">*</span>
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`
                  w-full rounded-lg border bg-white px-3.5 py-3
                  text-sm text-slate-700 outline-none transition
                  focus:ring-2
                  ${
                    errors.gender
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }
                `}
              >
                <option value="">
                  Select gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              {errors.gender && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                  <FiAlertCircle />
                  {errors.gender}
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Clinical Notes */}
        <Card
          title="Clinical Notes"
          subtitle="Record symptoms, observations, medical history, or other relevant clinical information."
          className="mt-6"
        >
          <div className="relative">

            <textarea
              name="clinicalNotes"
              value={formData.clinicalNotes}
              onChange={handleChange}
              rows={10}
              placeholder="Enter clinical notes here, or use the microphone to dictate..."
              className={`
                w-full resize-none rounded-xl border bg-white
                px-4 py-4 pr-16 text-sm leading-6 text-slate-800
                outline-none transition
                placeholder:text-slate-400
                focus:ring-2
                ${
                  errors.clinicalNotes
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                }
              `}
            />

            {/* Microphone */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              title={
                isListening
                  ? "Stop recording"
                  : "Start voice recording"
              }
              className={`
                absolute bottom-4 right-4 flex h-11 w-11
                items-center justify-center rounded-full
                transition-all duration-200
                focus:outline-none focus:ring-4
                ${
                  isListening
                    ? "animate-pulse bg-red-500 text-white shadow-lg shadow-red-200 focus:ring-red-100"
                    : "bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 focus:ring-blue-100"
                }
              `}
            >
              {isListening ? (
                <FiMicOff className="h-5 w-5" />
              ) : (
                <FiMic className="h-5 w-5" />
              )}
            </button>
          </div>

          {errors.clinicalNotes && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
              <FiAlertCircle />
              {errors.clinicalNotes}
            </p>
          )}

          {/* Speech status */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span
                className={`
                  h-2 w-2 rounded-full
                  ${
                    isListening
                      ? "animate-pulse bg-red-500"
                      : speechSupported
                        ? "bg-emerald-500"
                        : "bg-slate-300"
                  }
                `}
              />

              {isListening
                ? "Listening... Speak clearly into your microphone."
                : speechSupported
                  ? "Click the microphone to dictate clinical notes."
                  : "Speech recognition is not supported in this browser."}
            </div>

            {isListening && (
              <span className="text-xs font-medium text-red-500">
                Recording
              </span>
            )}
          </div>

          {/* Privacy note */}
          <div className="mt-5 flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
            <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

            <p className="text-xs leading-5 text-blue-700">
              Voice transcription is handled through your
              browser's speech recognition capability. You
              can edit the generated text before submitting
              the patient record.
            </p>
          </div>
        </Card>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/cases")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            icon={FiSave}
          >
            Save Patient
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddPatient