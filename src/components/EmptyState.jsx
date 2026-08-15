import { FiInbox } from "react-icons/fi"

const EmptyState = ({
  title = "No data found",
  description = "There is no information to display.",
  icon: Icon = FiInbox,
  action = null,
}) => {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center px-4 text-center">
      
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {description}
      </p>

      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  )
}

export default EmptyState