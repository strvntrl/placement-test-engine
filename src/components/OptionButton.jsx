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
      className={`
        group
        flex
        w-full
        items-center
        gap-4
        rounded-xl
        border
        p-4
        text-left
        transition-all
        duration-200
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-indigo-500
        focus-visible:ring-offset-2
        ${
          selected
            ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500'
            : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
        }
      `}
    >
      <span
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          text-sm
          font-semibold
          transition-colors
          ${
            selected
              ? 'border-indigo-500 bg-indigo-600 text-white'
              : 'border-slate-200 bg-slate-50 text-slate-600 group-hover:border-indigo-300'
          }
        `}
      >
        {label}
      </span>

      <span
        className={`
          text-sm
          leading-6
          ${
            selected
              ? 'font-medium text-indigo-950'
              : 'text-slate-700'
          }
        `}
      >
        {text}
      </span>
    </button>
  )
}

export default OptionButton