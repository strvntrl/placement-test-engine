import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import RecommendationCard from '../components/RecommendationCard'
import ResultCard from '../components/ResultCard'

import {
  getQuizResult,
  getUser,
  restartQuiz,
} from '../utils/storage'

import { generateWhatsAppUrl } from '../utils/whatsapp'

function ResultPage() {
  const navigate = useNavigate()

  const user = getUser()
  const result = getQuizResult()

  useEffect(() => {
    if (!user || !result) {
      navigate('/', { replace: true })
    }
  }, [user, result, navigate])

  if (!user || !result) {
    return <Navigate to="/" replace />
  }

  const handleWhatsAppClick = () => {
    const whatsappUrl = generateWhatsAppUrl(
      user,
      result,
      result.program
    )

    window.open(
      whatsappUrl,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleBackToHome = () => {
    navigate('/')
  }

  const handleRestartTest = () => {
    restartQuiz()
    navigate('/test')
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <ResultCard
          score={result.score}
          level={result.level}
          description={result.description}
          userName={user.fullName}
        />

        <div className="mt-6">
          <RecommendationCard
            program={result.program}
            onWhatsAppClick={handleWhatsAppClick}
          />
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            variant="secondary"
            onClick={handleBackToHome}
          >
            Back to Home
          </Button>

          <Button onClick={handleRestartTest}>
            Retake Test
          </Button>
        </div>
      </div>
    </main>
  )
}

export default ResultPage