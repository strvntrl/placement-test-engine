import { useState, useRef, useEffect, useId } from 'react'

function Select({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error = '',
  required = false,
  disabled = false,
}) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const rootRef = useRef(null)
  const listboxId = useId()

  const selected = options.find((o) => o.value === value) || null

  useEffect(() => {
    function handleClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function commit(option) {
    onChange?.({ target: { name, value: option.value } })
    setOpen(false)
  }

  function handleTriggerKeyDown(e) {
    if (disabled) return
    if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault()
      setOpen(true)
      const idx = options.findIndex((o) => o.value === value)
      setHighlight(idx >= 0 ? idx : 0)
    }
  }

  function handleListKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (highlight >= 0) commit(options[highlight])
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div className="space-y-2" ref={rootRef}>
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

      <div className="relative">
        <button
          type="button"
          id={id}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onClick={() => {
            if (disabled) return
            setOpen((o) => !o)
            const idx = options.findIndex((o) => o.value === value)
            setHighlight(idx >= 0 ? idx : 0)
          }}
          onKeyDown={handleTriggerKeyDown}
          className={`flex w-full items-center justify-between rounded-xl border bg-white/5 px-4 py-3 text-left text-sm text-slate-50 outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-white/2 disabled:text-slate-500
            ${
              error
                ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/20'
                : 'border-white/10 focus:border-teal-400 focus:ring-teal-400/20'
            }
          `}
        >
          <span className={selected ? 'text-slate-50' : 'text-slate-400'}>
            {selected ? selected.label : placeholder}
          </span>
          <svg
            className={`ml-2 h-4 w-4 shrink-0 text-slate-400 transition-transform ${
              open ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {open && (
          <ul
            role="listbox"
            id={listboxId}
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
            aria-activedescendant={
              highlight >= 0 ? `${id}-option-${highlight}` : undefined
            }
            className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-slate-950 py-1 shadow-lg shadow-black/30 outline-none
            "
          >
            {options.map((option, idx) => {
              const isSelected = option.value === value
              const isHighlighted = idx === highlight

              return (
                <li
                  key={option.value}
                  id={`${id}-option-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlight(idx)}
                  onClick={() => commit(option)}
                  className={`cursor-pointer px-4 py-2.5 text-sm transition-colors
                    ${
                      isSelected
                        ? 'bg-teal-400/15 text-teal-300'
                        : isHighlighted
                        ? 'bg-teal-400/20 text-slate-50'
                        : 'text-slate-200'
                    }
                  `}
                >
                  {option.label}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p id={`${id}-error`} className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default Select