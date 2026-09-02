import OptionButton from './OptionButton'

function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
}) {
  if (!question) {
    return null
  }

  const optionLabels = ['A', 'B', 'C', 'D']

  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      aria-labelledby="question-title"
    >
      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-indigo-600">
          {question.category} · {question.difficulty}
        </p>

        <h2
          id="question-title"
          className="text-lg font-semibold leading-7 text-slate-900 sm:text-xl"
        >
          {question.question}
        </h2>
      </div>

      <div
        className="space-y-3"
        role="group"
        aria-label="Answer options"
      >
        {question.options.map((option, index) => (
          <OptionButton
            key={option}
            label={optionLabels[index]}
            text={option}
            selected={selectedAnswer === index}
            onClick={() => onSelectAnswer(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default QuestionCard