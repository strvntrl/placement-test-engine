function Input({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-300"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-400" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-slate-50 outline-none transition placeholder:text-slate-50 disabled:cursor-not-allowed disabled:bg-white/2 disabled:text-slate-500
          ${
            error
              ? 'border-red-400/50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-white/10 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20'
          }
        `}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="text-sm text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export default Input