function QuizHeader({
  currentQuestion,
  totalQuestions,
  answeredCount,
}) {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Placement Test
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Question {currentQuestion + 1} of {totalQuestions}
          </h1>
        </div>

        <p className="text-sm text-slate-500">
          {answeredCount} / {totalQuestions} answered
        </p>
      </div>
    </header>
  )
}

export default QuizHeader