function RecommendationCard({
  program,
  onWhatsAppClick,
}) {
  if (!program) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-950">
          Recommended Program
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          No recommendation is available at the moment.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Recommended Program
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            {program.name}
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {program.description}
          </p>
        </div>

        <div className="shrink-0 rounded-xl bg-slate-50 px-4 py-3 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Duration
          </p>

          <p className="mt-1 text-sm font-bold text-slate-900">
            {program.duration}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onWhatsAppClick}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:scale-[0.98]"
      >
        Ask About This Program on WhatsApp
      </button>
    </div>
  )
}

export default RecommendationCard