import { useEffect, useState } from 'react'
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

  const [isLeaving, setIsLeaving] = useState(false)

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

  const navigateWithExit = (path, action) => {
    setIsLeaving(true)
    setTimeout(() => {
      action?.()
      navigate(path)
    }, 350)
  }

  const handleBackToHome = () => {
    navigateWithExit('/')
  }

  const handleRestartTest = () => {
    navigateWithExit('/test', restartQuiz)
  }

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-slate-950 ${
        isLeaving ? 'animate-page-out' : 'animate-page-in'
      }`}
    >
      <div className="pointer-events-none absolute -top-32 left-[-5%] h-96 w-96 rounded-full bg-teal-400/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-[-7%] h-112 w-md rounded-full bg-orange-400/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-15%] left-1/4 h-96 w-96 rounded-full bg-cyan-400/25 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: '0ms' }}
        >
          <ResultCard
            score={result.score}
            level={result.level}
            description={result.description}
            userName={user.fullName}
          />
        </div>

        <div
          className="mt-6 animate-fade-in-up"
          style={{ animationDelay: '150ms' }}
        >
          <RecommendationCard
            program={result.program}
            onWhatsAppClick={handleWhatsAppClick}
          />
        </div>

        <div
          className="mt-6 flex flex-col justify-center gap-3 animate-fade-in-up sm:flex-row"
          style={{ animationDelay: '300ms' }}
        >
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