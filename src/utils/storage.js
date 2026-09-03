const STORAGE_KEYS = {
  USER: 'placement_user',
  QUIZ_PROGRESS: 'placement_quiz_progress',
  RESULT: 'placement_quiz_result',
}

export const saveUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export const getUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER)

    return user ? JSON.parse(user) : null
  } catch {
    localStorage.removeItem(STORAGE_KEYS.USER)
    return null
  }
}

export const saveQuizProgress = (progress) => {
  localStorage.setItem(
    STORAGE_KEYS.QUIZ_PROGRESS,
    JSON.stringify(progress)
  )
}

export const getQuizProgress = () => {
  try {
    const progress = localStorage.getItem(
      STORAGE_KEYS.QUIZ_PROGRESS
    )

    return progress ? JSON.parse(progress) : null
  } catch {
    localStorage.removeItem(
      STORAGE_KEYS.QUIZ_PROGRESS
    )

    return null
  }
}

export const saveQuizResult = (result) => {
  localStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(result))
}

export const getQuizResult = () => {
  try {
    const result = localStorage.getItem(
      STORAGE_KEYS.RESULT
    )

    return result ? JSON.parse(result) : null
  } catch {
    localStorage.removeItem(STORAGE_KEYS.RESULT)
    return null
  }
}

export const restartQuiz = () => {
  localStorage.removeItem(STORAGE_KEYS.QUIZ_PROGRESS)
  localStorage.removeItem(STORAGE_KEYS.RESULT)
}

export const clearQuizSession = () => {
  localStorage.removeItem(STORAGE_KEYS.USER)
  localStorage.removeItem(STORAGE_KEYS.QUIZ_PROGRESS)
  localStorage.removeItem(STORAGE_KEYS.RESULT)
}