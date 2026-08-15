const Card = ({
  children,
  title,
  subtitle,
  action,
  className = "",
}) => {
  return (
    <div
      className={`
        rounded-xl border border-slate-200
        bg-white shadow-sm
        ${className}
      `}
    >
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-slate-900">
                {title}
              </h3>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          {action && <div>{action}</div>}
        </div>
      )}

      <div className="p-5">{children}</div>
    </div>
  )
}

export default Card