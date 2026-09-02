import { useCallback, useEffect, useMemo, useState } from 'react'

import questions from '../data/questions.json'
import programs from '../data/programs.json'

import {
  getQuizProgress,
  saveQuizProgress,
  saveQuizResult,
} from '../utils/storage'

import {
  calculateScore,
  getAnsweredCount,
  getLevel,
  getProgressPercentage,
  getRecommendation,
} from '../utils/quizUtils'

const initialState = {
  currentQuestion: 0,
  answers: {},
  isSubmitted: false,
  score: null,
  level: null,
}

const useQuiz = () => {
  const [quizState, setQuizState] = useState(() => {
    const savedProgress = getQuizProgress()

    if (!savedProgress) {
      return initialState
    }

    return {
      ...initialState,
      ...savedProgress,
      isSubmitted: false,
      score: null,
      level: null,
    }
  })

  const {
    currentQuestion,
    answers,
    isSubmitted,
    score,
    level,
  } = quizState

  const totalQuestions = questions.length

  const currentQuestionData = questions[currentQuestion]

  const answeredCount = useMemo(
    () => getAnsweredCount(answers),
    [answers]
  )

  const progressPercentage = useMemo(
    () => getProgressPercentage(answers, totalQuestions),
    [answers, totalQuestions]
  )

  useEffect(() => {
    if (isSubmitted) {
      return
    }

    saveQuizProgress({
      currentQuestion,
      answers,
    })
  }, [currentQuestion, answers, isSubmitted])

  const selectAnswer = useCallback((questionId, answerIndex) => {
    setQuizState((previous) => ({
      ...previous,
      answers: {
        ...previous.answers,
        [questionId]: answerIndex,
      },
    }))
  }, [])

  const goToQuestion = useCallback((questionIndex) => {
    if (
      questionIndex < 0 ||
      questionIndex >= totalQuestions
    ) {
      return
    }

    setQuizState((previous) => ({
      ...previous,
      currentQuestion: questionIndex,
    }))
  }, [totalQuestions])

  const nextQuestion = useCallback(() => {
    setQuizState((previous) => {
      const nextIndex = previous.currentQuestion + 1

      if (nextIndex >= totalQuestions) {
        return previous
      }

      return {
        ...previous,
        currentQuestion: nextIndex,
      }
    })
  }, [totalQuestions])

  const previousQuestion = useCallback(() => {
    setQuizState((previous) => {
      const previousIndex = previous.currentQuestion - 1

      if (previousIndex < 0) {
        return previous
      }

      return {
        ...previous,
        currentQuestion: previousIndex,
      }
    })
  }, [])

  const submitQuiz = useCallback(() => {
    const calculatedScore = calculateScore(
      questions,
      answers
    )

    const levelResult = getLevel(calculatedScore)

    const recommendation = getRecommendation(
      programs,
      levelResult.level
    )

    const result = {
      score: calculatedScore,
      level: levelResult.level,
      description: levelResult.description,
      recommendation: levelResult.recommendation,
      program: recommendation,
    }

    saveQuizResult(result)

    setQuizState((previous) => ({
      ...previous,
      isSubmitted: true,
      score: calculatedScore,
      level: levelResult,
    }))

    return result
  }, [answers])

  return {
    questions,
    currentQuestion,
    currentQuestionData,
    answers,
    isSubmitted,
    score,
    level,

    totalQuestions,
    answeredCount,
    progressPercentage,

    selectAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    submitQuiz,
  }
}

export default useQuiz