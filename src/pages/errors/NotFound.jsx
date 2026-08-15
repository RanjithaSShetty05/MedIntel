import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

import Button from "../../components/Button"
import Card from "../../components/Card"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-lg text-center">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <FiSearch className="h-7 w-7" />
        </div>

        {/* 404 */}
        <p className="mt-6 text-6xl font-bold tracking-tight text-blue-600">
          404
        </p>

        <h1 className="mt-3 text-xl font-bold text-slate-900">
          Page not found
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          The page you're looking for doesn't exist or may
          have been moved.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

          <Button
            variant="outline"
            icon={FiArrowLeft}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Button
            icon={FiHome}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>

        </div>

      </Card>
    </div>
  )
}

export default NotFound