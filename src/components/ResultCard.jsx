function ResultCard({
  score,
  level,
  description,
  userName,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="text-center">
        <p className="text-sm font-medium text-indigo-600">
          Your Placement Test Result
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
          Great job, {userName}!
        </h1>

        <div className="mx-auto mt-8 flex h-32 w-32 items-center justify-center rounded-full bg-indigo-50">
          <div className="text-center">
            <p className="text-4xl font-bold text-indigo-600">
              {score}
            </p>

            <p className="text-sm font-medium text-slate-500">
              / 100
            </p>
          </div>
        </div>

        <div className="mt-6">
          <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            {level}
          </span>
        </div>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  )
}

export default ResultCard