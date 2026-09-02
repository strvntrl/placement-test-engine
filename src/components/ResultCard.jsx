function ResultCard({
  name,
  score,
  level,
  description,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
      <p className="text-sm font-medium text-indigo-600">
        Your Placement Result
      </p>

      <div className="mt-5">
        <p className="text-5xl font-bold tracking-tight text-slate-900">
          {score}%
        </p>

        <div className="mt-4 inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
          {level}
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-lg">
        <h2 className="text-lg font-semibold text-slate-900">
          Great job, {name}!
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </section>
  )
}

export default ResultCard