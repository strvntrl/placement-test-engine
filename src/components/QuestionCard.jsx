import OptionButton from './OptionButton'

const OPTION_LABELS = ['A', 'B', 'C', 'D']

function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
}) {
  if (!question) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">
          Unable to load this question.
        </p>
      </div>
    )
  }

  return (
    <section
      aria-labelledby={`question-${question.id}`}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold text-indigo-600">
          Question {question.id}
        </p>

        <h2
          id={`question-${question.id}`}
          className="text-lg font-semibold leading-8 text-slate-900 sm:text-xl"
        >
          {question.question}
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {question.category}
          </span>

          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            {question.difficulty}
          </span>
        </div>
      </div>

      <div
        className="space-y-3"
        role="group"
        aria-label={`Answer options for question ${question.id}`}
      >
        {question.options.map((option, index) => (
          <OptionButton
            key={`${question.id}-${index}`}
            label={OPTION_LABELS[index]}
            text={option}
            selected={selectedAnswer === index}
            onClick={() =>
              onSelectAnswer(question.id, index)
            }
          />
        ))}
      </div>
    </section>
  )
}

export default QuestionCard