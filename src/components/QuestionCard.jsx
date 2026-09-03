import OptionButton from './OptionButton'

const OPTION_LABELS = ['A', 'B', 'C', 'D']

function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
}) {
  if (!question) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-6">
        <p className="text-sm font-medium text-red-400">
          Unable to load this question.
        </p>
      </div>
    )
  }

  return (
    <section
      aria-labelledby={`question-${question.id}`}
      className="rounded-2xl border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-7"
    >
      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold text-teal-300">
          Question {question.id}
        </p>

        <h2
          id={`question-${question.id}`}
          className="text-lg font-semibold leading-8 text-slate-50 sm:text-xl"
        >
          {question.question}
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
            {question.category}
          </span>

          <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
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