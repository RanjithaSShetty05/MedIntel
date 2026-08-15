import { FiLoader } from "react-icons/fi"

const LoadingSpinner = ({
  size = "md",
  text = "Loading...",
}) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <FiLoader
        className={`${sizes[size]} animate-spin text-blue-600`}
      />

      {text && (
        <p className="text-sm text-slate-500">
          {text}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner