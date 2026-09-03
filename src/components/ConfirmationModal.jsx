import Button from './Button'

function ConfirmationModal({
  isOpen,
  answeredCount,
  totalQuestions,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) {
    return null
  }

  const unansweredCount =
    totalQuestions - answeredCount

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-7">
        <h2
          id="confirmation-title"
          className="mt-5 text-xl font-bold text-slate-50"
        >
          Submit your test?
        </h2>

        {unansweredCount > 0 ? (
          <p className="mt-3 text-sm leading-6 text-slate-400">
            You have{' '}
            <span className="font-semibold text-red-400">
              {unansweredCount} unanswered question
              {unansweredCount > 1 ? 's' : ''}
            </span>
            . Are you sure you want to submit your test?
          </p>
        ) : (
          <p className="mt-3 text-sm leading-6 text-slate-400">
            You have answered all {totalQuestions}{' '}
            questions. Are you ready to see your result?
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Continue Test
          </Button>

          <Button onClick={onConfirm}>
            Submit Test
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal