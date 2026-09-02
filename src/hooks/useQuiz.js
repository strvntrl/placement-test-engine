import { useEffect, useMemo, useState } from "react";
import questions from "../data/questions.json";
import {
  getQuizProgress,
  saveQuizProgress,
  removeQuizProgress,
  saveQuizResult,
} from "../utils/storage";
import { calculateScore, getLevel } from "../utils/quizUtils";

const INITIAL_QUESTION = 0;

export function useQuiz() {
  const [currentQuestion, setCurrentQuestion] =
    useState(INITIAL_QUESTION);

  const [answers, setAnswers] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [score, setScore] = useState(null);

  const [level, setLevel] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  /* Restore quiz progress from localStorage */
  useEffect(() => {
    try {
      if (!questions || questions.length === 0) {
        setError("Something went wrong while loading the test.");
        setIsLoading(false);
        return;
      }

      const savedProgress = getQuizProgress();

      if (savedProgress) {
        setCurrentQuestion(
          savedProgress.currentQuestion ?? INITIAL_QUESTION
        );

        setAnswers(savedProgress.answers ?? {});

        setIsSubmitted(savedProgress.isSubmitted ?? false);

        setScore(savedProgress.score ?? null);

        setLevel(savedProgress.level ?? null);
      }
    } catch (err) {
      console.error("Failed to restore quiz progress:", err);
      setError("Something went wrong while loading the test.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* Save quiz progress automatically */
  useEffect(() => {
    if (isLoading || isSubmitted) {
      return;
    }

    saveQuizProgress({
      currentQuestion,
      answers,
      isSubmitted,
      score,
      level,
    });
  }, [
    currentQuestion,
    answers,
    isSubmitted,
    score,
    level,
    isLoading,
  ]);

  /* Current question object */
  const question = questions[currentQuestion];

  /* Number of questions answered */
  const answeredCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  /* Progress percentage */
  const progressPercentage = useMemo(() => {
    if (questions.length === 0) {
      return 0;
    }

    return Math.round(
      (answeredCount / questions.length) * 100
    );
  }, [answeredCount]);

  /* Select answer */
  const selectAnswer = (answerIndex) => {
    if (isSubmitted) {
      return;
    }

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [question.id]: answerIndex,
    }));
  };

  /* Go to next question */
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  /* Go to previous question */
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  /* Jump directly to a question */
  const goToQuestion = (questionIndex) => {
    if (
      questionIndex >= 0 &&
      questionIndex < questions.length
    ) {
      setCurrentQuestion(questionIndex);
    }
  };

  /* Submit quiz */
  const submitQuiz = () => {
    if (isSubmitted) {
      return;
    }

    const calculatedScore = calculateScore(
      questions,
      answers
    );

    const calculatedLevel = getLevel(calculatedScore);

    setScore(calculatedScore);
    setLevel(calculatedLevel);
    setIsSubmitted(true);

    saveQuizResult({
      score: calculatedScore,
      level: calculatedLevel,
    });

    removeQuizProgress();
  };

  /* Get selected answer for current question */
  const selectedAnswer = question
    ? answers[question.id]
    : undefined;

  /* Check whether a question has been answered */
  const isQuestionAnswered = (questionId) => {
    return Object.prototype.hasOwnProperty.call(
      answers,
      questionId
    );
  };

  /* Number of unanswered questions */
  const unansweredCount =
    questions.length - answeredCount;

  return {
    questions,
    question,
    currentQuestion,
    answers,

    selectedAnswer,

    answeredCount,
    unansweredCount,
    progressPercentage,

    isSubmitted,
    score,
    level,

    isLoading,
    error,

    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuiz,
    isQuestionAnswered,
  };
}