import { FiAlertCircle } from "react-icons/fi"

const Input = ({
  label,
  error,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <input
        {...props}
        className={`
          w-full rounded-lg border
          bg-white px-3.5 py-2.5
          text-sm text-slate-900
          outline-none
          transition
          placeholder:text-slate-400
          focus:ring-2
          ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
              : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
          }
          ${className}
        `}
      />

      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
          <FiAlertCircle />
          {error}
        </p>
      )}
    </div>
  )
}

export default Input