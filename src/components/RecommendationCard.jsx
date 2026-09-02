import Button from './Button'

function RecommendationCard({
  program,
  onClick,
}) {
  if (!program) {
    return null
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Recommended Program
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900">
            {program.title}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            {program.description}
          </p>

          <p className="mt-4 text-sm font-medium text-slate-500">
            Duration: {program.duration}
          </p>
        </div>

        {onClick && (
          <Button
            variant="secondary"
            onClick={onClick}
            className="shrink-0"
          >
            {program.cta}
          </Button>
        )}
      </div>
    </section>
  )
}

export default RecommendationCard