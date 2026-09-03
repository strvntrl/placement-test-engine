import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import ConfirmationModal from '../components/ConfirmationModal'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'
import QuestionNavigator from '../components/QuestionNavigator'
import QuizHeader from '../components/QuizHeader'

import useQuiz from '../hooks/useQuiz'
import {
  getQuizResult,
  getUser,
} from '../utils/storage'

function TestPage() {
  const navigate = useNavigate()

  const user = getUser()
  const existingResult = getQuizResult()

  const {
    questions,
    currentQuestion,
    currentQuestionData,
    answers,
    isSubmitted,
    totalQuestions,
    answeredCount,
    progressPercentage,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    submitQuiz,
  } = useQuiz()

  const [showConfirmation, setShowConfirmation] =
    useState(false)

  // Prevent accessing the test after it has already been submitted
  useEffect(() => {
    if (isSubmitted || existingResult) {
      navigate('/result', { replace: true })
    }
  }, [isSubmitted, existingResult, navigate])

  // User has not registered yet
  if (!user) {
    return <Navigate to="/" replace />
  }

  // Empty question data
  if (!questions || questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            !
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-950">
            Unable to Load Test
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            The question data is currently unavailable.
            Please try again.
          </p>

          <Button
            className="mt-6"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </main>
    )
  }

  const handleSubmitRequest = () => {
    setShowConfirmation(true)
  }

  const handleConfirmSubmit = () => {
    const result = submitQuiz()

    setShowConfirmation(false)

    if (result) {
      navigate('/result')
    }
  }

  const isLastQuestion =
    currentQuestion === totalQuestions - 1

  return (
    <>
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <QuizHeader
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
          />

          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <ProgressBar
              current={answeredCount}
              total={totalQuestions}
              percentage={progressPercentage}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            {/* Question */}
            <section className="min-w-0">
              <QuestionCard
                question={currentQuestionData}
                selectedAnswer={
                  answers[currentQuestionData?.id]
                }
                onSelectAnswer={selectAnswer}
              />

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <Button
                  variant="secondary"
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>

                {!isLastQuestion ? (
                  <Button onClick={nextQuestion}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmitRequest}>
                    Submit Test
                  </Button>
                )}
              </div>
            </section>

            {/* Question Navigator */}
            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
              <QuestionNavigator
                questions={questions}
                answers={answers}
                currentQuestion={currentQuestion}
                onQuestionChange={goToQuestion}
              />
            </aside>
          </div>
        </div>
      </main>

      <ConfirmationModal
        isOpen={showConfirmation}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleConfirmSubmit}
      />
    </>
  )
}

export default TestPage