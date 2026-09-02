function QuestionNavigator({
  questions,
  currentQuestion,
  isQuestionAnswered,
  onQuestionClick,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Questions
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Click a number to jump to a question.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8">
        {questions.map((question, index) => {
          const isCurrent =
            currentQuestion === index

          const isAnswered =
            isQuestionAnswered(question.id)

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onQuestionClick(index)}
              aria-label={`Go to question ${index + 1}`}
              aria-current={
                isCurrent ? 'step' : undefined
              }
              className={`flex h-10 w-full items-center justify-center rounded-lg text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isCurrent
                  ? 'bg-indigo-600 text-white'
                  : isAnswered
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {index + 1}
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-indigo-600" />
          Current
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-emerald-100 ring-1 ring-emerald-200" />
          Answered
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-slate-100" />
          Unanswered
        </div>
      </div>
    </div>
  )
}

export default QuestionNavigator