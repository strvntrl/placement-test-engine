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
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (isSubmitted || existingResult) {
      navigate('/result', { replace: true })
    }
  }, [isSubmitted, existingResult, navigate])

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (!questions || questions.length === 0) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 animate-page-in">
        <div className="pointer-events-none absolute -top-32 left-[-5%] h-96 w-96 rounded-full bg-red-400/20 blur-3xl" />

        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/6 p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-xl animate-fade-in-up">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-400/10 text-red-400">
            !
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-50">
            Unable to Load Test
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400">
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
      // play exit animation, then navigate once it finishes
      setIsLeaving(true)
      setTimeout(() => {
        navigate('/result')
      }, 350)
    }
  }

  const isLastQuestion =
    currentQuestion === totalQuestions - 1

  return (
    <>
      <main
        className={`relative min-h-screen overflow-hidden bg-slate-950 ${
          isLeaving ? 'animate-page-out' : 'animate-page-in'
        }`}
      >
        <div className="pointer-events-none absolute -top-32 left-[-5%] h-96 w-96 rounded-full bg-teal-400/25 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 right-[-7%] h-112 w-md rounded-full bg-orange-400/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-15%] left-1/4 h-96 w-96 rounded-full bg-cyan-400/25 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <QuizHeader
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
          />

          <div className="mb-6 rounded-2xl border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-6">
            <ProgressBar
              current={answeredCount}
              total={totalQuestions}
              percentage={progressPercentage}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            {/* Question */}
            <section className="min-w-0">
              <div
                key={currentQuestionData?.id ?? currentQuestion}
                className="animate-fade-in-up"
              >
                <QuestionCard
                  question={currentQuestionData}
                  selectedAnswer={
                    answers[currentQuestionData?.id]
                  }
                  onSelectAnswer={selectAnswer}
                />
              </div>

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
            <aside className="h-fit rounded-2xl border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl lg:sticky lg:top-6 animate-fade-in-up">
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