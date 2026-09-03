function OptionButton({
  label,
  text,
  selected = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
        ${
          selected
            ? 'border-teal-400 bg-teal-400/10 ring-1 ring-teal-400'
            : 'border-white/10 bg-white/5 hover:border-teal-400/40 hover:bg-white/10'
        }
      `}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold transition-colors
          ${
            selected
              ? 'border-teal-400 bg-teal-500 text-slate-950'
              : 'border-white/10 bg-white/5 text-slate-300 group-hover:border-teal-400/40'
          }
        `}
      >
        {label}
      </span>

      <span
        className={`text-sm leading-6
          ${
            selected
              ? 'font-medium text-teal-200'
              : 'text-slate-300'
          }
        `}
      >
        {text}
      </span>
    </button>
  )
}

export default OptionButton