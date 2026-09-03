const scoreBands = [
  {
    min: 80,
    label: 'Excellent',
    message: "You're ready for advanced material, keep pushing forward.",
    ring: 'border-emerald-400/20 bg-emerald-400/10',
    scoreText: 'text-emerald-300',
    badge: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
    accent: 'text-emerald-300',
  },
  {
    min: 50,
    label: 'Good',
    message: "Solid foundation, a bit more practice will take you far.",
    ring: 'border-teal-400/20 bg-teal-400/10',
    scoreText: 'text-teal-300',
    badge: 'border-teal-400/20 bg-teal-400/10 text-teal-300',
    accent: 'text-teal-300',
  },
  {
    min: 0,
    label: 'Needs Improvement',
    message: "Start with the fundamentals, everyone begins somewhere.",
    ring: 'border-orange-400/20 bg-orange-400/10',
    scoreText: 'text-orange-300',
    badge: 'border-orange-400/20 bg-orange-400/10 text-orange-300',
    accent: 'text-orange-300',
  },
]

function getScoreTheme(score) {
  return (
    scoreBands.find((band) => score >= band.min) ??
    scoreBands[scoreBands.length - 1]
  )
}

function ResultCard({
  score,
  level,
  description,
  userName,
}) {
  const theme = getScoreTheme(score)

  return (
    <div className="rounded-2xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-8">
      <div className="text-center">
        <p className="text-sm font-medium text-teal-300">
          Your Placement Test Result
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-50 sm:text-4xl">
          Great job, {userName}!
        </h1>

        <div
          className={`mx-auto mt-8 flex h-32 w-32 items-center justify-center rounded-full border transition-colors ${theme.ring}`}
        >
          <div className="text-center">
            <p className={`text-4xl font-bold transition-colors ${theme.scoreText}`}>
              {score}
            </p>

            <p className="text-sm font-medium text-slate-400">
              / 100
            </p>
          </div>
        </div>

        <div className="mt-4">
          <span
            className={`text-xs font-semibold uppercase tracking-wide ${theme.accent}`}
          >
            {theme.label}
          </span>
        </div>

        <div className="mt-3">
          <span
            className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${theme.badge}`}
          >
            {level}
          </span>
        </div>

        <p className={`mx-auto mt-4 max-w-xl text-sm font-medium ${theme.accent}`}>
          {theme.message}
        </p>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  )
}

export default ResultCard