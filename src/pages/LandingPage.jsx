import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'

import { restartQuiz, saveUser } from '../utils/storage'

const targetProgramOptions = [
  {
    value: 'web-development',
    label: 'Web Development',
  },
  {
    value: 'frontend-development',
    label: 'Frontend Development',
  },
  {
    value: 'fullstack-development',
    label: 'Fullstack Development',
  },
]

const initialForm = {
  fullName: '',
  email: '',
  whatsapp: '',
  domicile: '',
  targetProgram: '',
}

function LandingPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

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

    // Full name
    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.'
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = 'Please enter a valid email address.'
    }

    // WhatsApp
    if (!form.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required.'
    } else if (
      !/^(?:\+62|62|0)8[1-9][0-9]{7,11}$/.test(
        form.whatsapp.replace(/[\s-]/g, '')
      )
    ) {
      newErrors.whatsapp =
        'Please enter a valid WhatsApp number.'
    }

    // Domicile
    if (!form.domicile.trim()) {
      newErrors.domicile = 'Domicile is required.'
    }

    // Target program
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

    navigate('/test')
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-linear-to-br from-indigo-50 via-white to-violet-50" />

        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm">
              Placement Test Engine
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Discover Your{' '}
              <span className="text-indigo-600">
                Learning Level
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Take a quick placement test and find the right
              learning path for you.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                15 Questions
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                ±10 Minutes
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                Instant Result
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="px-6 pb-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-950">
                Start Your Placement Test
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Tell us a little about yourself before starting
                the test.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
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

              <div className="pt-3">
                <Button
                  type="submit"
                  className="w-full"
                >
                  Start Placement Test
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage