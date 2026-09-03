function QuizHeader({
  currentQuestion,
  totalQuestions,
}) {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Placement Test
          </p>

          <h1 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            Test Your Skills
          </h1>
        </div>

        <div className="text-sm font-medium text-slate-500">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
      </div>
    </header>
  )
}

export default QuizHeader