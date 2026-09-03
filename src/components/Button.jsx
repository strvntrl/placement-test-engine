function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]'

  const variants = {
    primary:
      'bg-teal-500 text-slate-950 hover:bg-teal-400',
    secondary:
      'border border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10',
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