import { useState } from 'react'

import ProgressBar from './components/ProgressBar'
import QuestionCard from './components/QuestionCard'
import QuestionNavigator from './components/QuestionNavigator'

import questions from './data/questions.json'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({
    1: 0,
    3: 2,
    5: 1,
  })

  const question = questions[currentQuestion]

  const handleSelectAnswer = (questionId, answerIndex) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: answerIndex,
    }))
  }

  const answeredCount = Object.keys(answers).length

  const progress = Math.round(
    (answeredCount / questions.length) * 100
  )

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6">

        <ProgressBar
          current={answeredCount}
          total={questions.length}
          percentage={progress}
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">

          <QuestionCard
            question={question}
            selectedAnswer={answers[question.id]}
            onSelectAnswer={handleSelectAnswer}
          />

          <QuestionNavigator
            questions={questions}
            answers={answers}
            currentQuestion={currentQuestion}
            onQuestionChange={setCurrentQuestion}
          />

        </div>

      </div>
    </main>
  )
}

export default App