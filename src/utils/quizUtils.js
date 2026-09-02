export const calculateScore = (questions, answers) => {
  if (!questions.length) {
    return 0
  }

  const correctAnswers = questions.reduce((total, question) => {
    return total + (answers[question.id] === question.answer ? 1 : 0)
  }, 0)

  return Math.round((correctAnswers / questions.length) * 100)
}

export const getLevel = (score) => {
  if (score <= 40) {
    return {
      level: 'Beginner',
      description:
        'You are building your foundation in web development.',
      recommendation:
        'Strengthen your fundamentals in HTML, CSS, and JavaScript.',
    }
  }

  if (score <= 75) {
    return {
      level: 'Intermediate',
      description:
        'You have a solid understanding of web development fundamentals.',
      recommendation:
        'Develop your frontend skills further with React and modern web practices.',
    }
  }

  return {
    level: 'Advanced',
    description:
      'You have demonstrated strong fundamentals in web development.',
    recommendation:
      'Continue developing advanced React and modern web development skills.',
  }
}

export const getRecommendation = (programs, level) => {
  return programs.find((program) => program.level === level) || null
}

export const getAnsweredCount = (answers) => {
  return Object.keys(answers).length
}

export const getProgressPercentage = (answers, totalQuestions) => {
  if (!totalQuestions) {
    return 0
  }

  return Math.round(
    (getAnsweredCount(answers) / totalQuestions) * 100
  )
}