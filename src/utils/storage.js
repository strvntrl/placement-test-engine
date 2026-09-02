const STORAGE_KEYS = {
  USER: 'placement_user',
  QUIZ_PROGRESS: 'placement_quiz_progress',
  RESULT: 'placement_quiz_result',
}

export const saveUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER)

  return user ? JSON.parse(user) : null
}

export const saveQuizProgress = (progress) => {
  localStorage.setItem(
    STORAGE_KEYS.QUIZ_PROGRESS,
    JSON.stringify(progress)
  )
}

export const getQuizProgress = () => {
  const progress = localStorage.getItem(STORAGE_KEYS.QUIZ_PROGRESS)

  return progress ? JSON.parse(progress) : null
}

export const saveQuizResult = (result) => {
  localStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(result))
}

export const getQuizResult = () => {
  const result = localStorage.getItem(STORAGE_KEYS.RESULT)

  return result ? JSON.parse(result) : null
}

export const clearQuizSession = () => {
  localStorage.removeItem(STORAGE_KEYS.USER)
  localStorage.removeItem(STORAGE_KEYS.QUIZ_PROGRESS)
  localStorage.removeItem(STORAGE_KEYS.RESULT)
}