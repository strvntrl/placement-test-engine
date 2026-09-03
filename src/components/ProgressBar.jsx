function ProgressBar({
  current = 0,
  total = 0,
  percentage = 0,
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-300">
          {current} / {total} Questions Answered
        </span>

        <span className="text-sm font-semibold text-teal-300">
          {percentage}%
        </span>
      </div>

      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Quiz progress"
      >
        <div
          className="h-full rounded-full bg-teal-400 transition-all duration-300 ease-out"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar