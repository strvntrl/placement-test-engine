function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-5
        py-3
        text-sm
        font-semibold
        transition-all
        duration-200
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-indigo-500
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        bg-indigo-600
        text-white
        hover:bg-indigo-700
        active:scale-[0.98]
        ${className}
      `}
    >
      {children}
    </button>
  )
}

export default Button