function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]'

  const variants = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary:
      'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button