function LoadingState({
  message = 'Loading...',
}) {
  return (
    <div className="flex min-h-75 items-center justify-center">
      <div className="text-center">
        <div
          className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-teal-600"
          aria-hidden="true"
        />

        <p className="mt-4 text-sm text-slate-500">
          {message}
        </p>
      </div>
    </div>
  )
}

export default LoadingState