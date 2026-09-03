import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useQuiz from '../hooks/useQuiz'
import { getUser } from '../utils/storage'

import QuizHeader from '../components/QuizHeader'
import QuestionCard from '../components/QuestionCard'
import QuestionNavigator from '../components/QuestionNavigator'
import Button from '../components/Button'

function TestPage() {
  const navigate = useNavigate()
  const user = getUser()

  const {
    questions,
    currentQuestion,
    currentQuestionData,
    answers,
    totalQuestions,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
  } = useQuiz()

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  const selectedAnswer =
    answers[currentQuestionData.id]

  const isFirstQuestion = currentQuestion === 0
  const isLastQuestion =
    currentQuestion === totalQuestions - 1

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <QuizHeader
          currentQuestion={currentQuestion + 1}
          totalQuestions={totalQuestions}
          userName={user.name}
        />

        <div className="mt-6">
          <QuestionCard
            question={currentQuestionData}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={(answerIndex) =>
                selectAnswer(currentQuestionData.id, answerIndex)
            }
          />
        </div>

        <div className="mt-6">
          <QuestionNavigator
            questions={questions}
            currentQuestion={currentQuestion}
            answers={answers}
            onQuestionChange={goToQuestion}
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={previousQuestion}
            disabled={isFirstQuestion}
          >
            Previous
          </Button>

          <Button
            type="button"
            onClick={nextQuestion}
            disabled={isLastQuestion}
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  )
}

export default TestPage