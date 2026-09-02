import Button from './Button'

function ConfirmationModal({
  isOpen,
  unansweredCount = 0,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="presentation"
      onMouseDown={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="mb-5">
          <h2
            id="confirmation-title"
            className="text-xl font-bold text-slate-900"
          >
            Submit your test?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Are you sure you want to submit your test?
          </p>

          {unansweredCount > 0 && (
            <div className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              <strong>
                {unansweredCount} question
                {unansweredCount > 1 ? 's' : ''}{' '}
                {unansweredCount > 1 ? 'are' : 'is'} still
                unanswered.
              </strong>

              <p className="mt-1">
                You can continue testing or submit
                anyway.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Continue Testing
          </Button>

          <Button
            variant="primary"
            onClick={onConfirm}
          >
            Submit Anyway
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal