import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'

import { restartQuiz, saveUser } from '../utils/storage'

const targetProgramOptions = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'frontend-development', label: 'Frontend Development' },
  { value: 'fullstack-development', label: 'Fullstack Development' },
]

const initialForm = {
  fullName: '',
  email: '',
  whatsapp: '',
  domicile: '',
  targetProgram: '',
}

// decorative background
const backgroundSnippet = `function evaluatePlacement(user) {
  const answers = collect(user.responses)
  const score = grade(answers)

  if (score >= 80) return 'fullstack-development'
  if (score >= 50) return 'frontend-development'
  return 'web-development'
}

const result = evaluatePlacement(applicant)
render(result)`

function LandingPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isLeaving, setIsLeaving] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.'
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!form.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required.'
    } else if (
      !/^(?:\+62|62|0)8[1-9][0-9]{7,11}$/.test(form.whatsapp.replace(/[\s-]/g, ''))
    ) {
      newErrors.whatsapp = 'Please enter a valid WhatsApp number.'
    }

    if (!form.domicile.trim()) {
      newErrors.domicile = 'Domicile is required.'
    }

    if (!form.targetProgram) {
      newErrors.targetProgram = 'Please select a target program.'
    }

    return newErrors
  }

  const normalizeWhatsApp = (phone) => {
    const cleaned = phone.replace(/[\s-]/g, '')

    if (cleaned.startsWith('+62')) {
      return cleaned.replace('+62', '62')
    }

    if (cleaned.startsWith('0')) {
      return `62${cleaned.slice(1)}`
    }

    return cleaned
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const userData = {
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      whatsapp: normalizeWhatsApp(form.whatsapp),
      domicile: form.domicile.trim(),
    }

    restartQuiz()
    saveUser(userData)

    // play exit animation, then navigate once it finishes
    setIsLeaving(true)
    setTimeout(() => {
      navigate('/test')
    }, 350)
  }

  return (
    <main
      className={`relative min-h-screen overflow-y-auto sm:h-screen sm:overflow-hidden bg-slate-950 ${
        isLeaving ? 'animate-page-out' : 'animate-page-in'
      }`}
    >
      <div className="pointer-events-none absolute -top-32 left-[-5%] h-96 w-96 rounded-full bg-teal-400/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-[-7%] h-112 w-md rounded-full bg-orange-400/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-15%] left-1/4 h-96 w-96 rounded-full bg-cyan-400/25 blur-3xl" />

      <pre
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden whitespace-pre font-mono text-[11px] leading-5 text-teal-300/10 sm:text-xs"
      >
        {Array(6).fill(backgroundSnippet).join('\n\n')}
      </pre>

      {/* Page content */}
      <div className="relative flex min-h-screen flex-col px-3 py-3 sm:h-full sm:min-h-0 sm:overflow-hidden sm:px-6 sm:py-4 lg:px-8">
        {/* Hero */}
        <section
          className="shrink-0 pt-2 sm:pt-3 lg:pt-4 mt-2 sm:mt-10 lg:mt-8 animate-fade-in-up"
          style={{ animationDelay: '0ms' }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-teal-300 backdrop-blur-sm sm:mb-3 sm:px-4 sm:py-1.5 sm:text-xs lg:text-sm">
              <span className="text-teal-500">&lt;</span>
              PathFinder-Dev
              <span className="text-teal-500">/&gt;</span>
            </div>

            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-5xl">
              <span className="text-slate-50">Discover your </span>
              <span className="bg-linear-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
                learning level
              </span>
              <span className="text-slate-50">,</span>
              <br className="hidden sm:block" />{' '}
              <span className="bg-linear-to-r from-orange-300 to-teal-300 bg-clip-text text-transparent">
                build the right
              </span>
              <span className="text-slate-50"> skills</span>
            </h1>

            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-400 sm:mt-3 sm:text-sm lg:text-base">
              Take a quick placement test and find the right learning path
              for you.
            </p>

            <div className="mt-3 grid grid-cols-3 gap-1.5 sm:mt-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
              {[
                { icon: '◆', label: '15 Questions' },
                { icon: '◷', label: '±10 Minutes' },
                { icon: '✓', label: 'Instant Result' },
              ].map((item) => (
                <span
                  key={item.label}
                  className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 text-[10px] font-medium text-slate-300 backdrop-blur-sm sm:flex-row sm:rounded-full sm:px-4 sm:py-1.5 sm:text-xs lg:text-sm"
                >
                  <span className="text-orange-400" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Registration */}
        <section className="flex flex-1 items-center justify-center py-3 sm:py-10 sm:min-h-0 mt-8 sm:mt-12 md:mt-8 lg:mt-5">
          <div
            className="mx-auto w-full max-w-2xl animate-fade-in-up"
            style={{ animationDelay: '150ms' }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/6 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-5 md:p-6">
              <div className="mb-3 sm:mb-4">
                <h2 className="text-lg font-bold text-slate-50 sm:text-xl">
                  Start your placement test
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                  Tell us a little about yourself before starting the test.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-3.5">
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                  <Input
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    required
                  />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    label="WhatsApp Number"
                    placeholder="081234567890"
                    value={form.whatsapp}
                    onChange={handleChange}
                    error={errors.whatsapp}
                    required
                  />

                  <Input
                    id="domicile"
                    name="domicile"
                    label="Domicile"
                    placeholder="e.g. Surabaya"
                    value={form.domicile}
                    onChange={handleChange}
                    error={errors.domicile}
                    required
                  />
                </div>

                <Select
                  id="targetProgram"
                  name="targetProgram"
                  label="Target Program"
                  placeholder="Select your target program"
                  value={form.targetProgram}
                  onChange={handleChange}
                  options={targetProgramOptions}
                  error={errors.targetProgram}
                  required
                />

                <div className="pt-1 sm:pt-2">
                  <Button type="submit" className="min-h-10 w-full sm:min-h-11">
                    Start Placement Test
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default LandingPage