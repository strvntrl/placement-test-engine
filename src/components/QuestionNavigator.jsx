function QuestionNavigator({
  questions,
  answers,
  currentQuestion,
  onQuestionChange,
}) {
  return (
    <nav
      aria-label="Question navigation"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Questions
        </h3>

        <p className="mt-1 text-xs text-slate-500">
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
              className={`
                flex
                aspect-square
                items-center
                justify-center
                rounded-lg
                border
                text-sm
                font-semibold
                transition-all
                duration-200
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-indigo-500
                focus-visible:ring-offset-2
                ${
                  isCurrent
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : isAnswered
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300 hover:text-indigo-600'
                }
              `}
            >
              {question.id}
            </button>
          )
        })}
      </div>

      <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
        <LegendItem
          className="bg-indigo-600"
          label="Current"
        />

        <LegendItem
          className="bg-emerald-100 ring-1 ring-emerald-200"
          label="Answered"
        />

        <LegendItem
          className="bg-slate-100 ring-1 ring-slate-200"
          label="Unanswered"
        />
      </div>
    </nav>
  )
}

function LegendItem({ className, label }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <span
        className={`h-3 w-3 rounded ${className}`}
        aria-hidden="true"
      />

      <span>{label}</span>
    </div>
  )
}

export default QuestionNavigator