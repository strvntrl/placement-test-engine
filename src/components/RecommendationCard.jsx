function RecommendationCard({
  program,
  onWhatsAppClick,
}) {
  if (!program) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <h2 className="text-lg font-bold text-slate-50">
          Recommended Program
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          No recommendation is available at the moment.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-teal-400/20 bg-white/6 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-teal-300">
            Recommended Program
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-50">
            {program.name}
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {program.description}
          </p>
        </div>

        <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Duration
          </p>

          <p className="mt-1 text-sm font-bold text-slate-50">
            {program.duration}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onWhatsAppClick}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98]"
      >
        Ask About This Program on WhatsApp
      </button>
    </div>
  )
}

export default RecommendationCard