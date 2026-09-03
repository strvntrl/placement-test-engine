function QuestionNavigator({
  questions,
  answers,
  currentQuestion,
  onQuestionChange,
}) {
  return (
    <nav
      aria-label="Question navigation"
      className="rounded-2xl border border-white/10 bg-white/6 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-5"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-50">
          Questions
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          Select a question to navigate.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {questions.map((question, index) => {
          const isCurrent = index === currentQuestion
          const isAnswered = Object.prototype.hasOwnProperty.call(
            answers,
            question.id
          )

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onQuestionChange(index)}
              aria-label={`Go to question ${question.id}${
                isAnswered ? ', answered' : ', unanswered'
              }`}
              aria-current={isCurrent ? 'step' : undefined}
              className={`flex aspect-square items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                ${
                  isCurrent
                    ? 'border-teal-400 bg-teal-500 text-slate-950'
                    : isAnswered
                      ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:border-emerald-400/40'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-teal-400/40 hover:text-teal-300'
                }
              `}
            >
              {question.id}
            </button>
          )
        })}
      </div>

      <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
        <LegendItem
          className="bg-teal-400"
          label="Current"
        />

        <LegendItem
          className="bg-emerald-400/10 ring-1 ring-emerald-400/20"
          label="Answered"
        />

        <LegendItem
          className="bg-white/5 ring-1 ring-white/10"
          label="Unanswered"
        />
      </div>
    </nav>
  )
}

function LegendItem({ className, label }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-400">
      <span
        className={`h-3 w-3 rounded ${className}`}
        aria-hidden="true"
      />

      <span>{label}</span>
    </div>
  )
}

export default QuestionNavigator