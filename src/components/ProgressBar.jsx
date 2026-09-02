function ProgressBar({
  value = 0,
  label,
}) {
  const safeValue = Math.min(
    100,
    Math.max(0, value)
  )

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">
            {label}
          </span>

          <span className="text-slate-500">
            {safeValue}%
          </span>
        </div>
      )}

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar