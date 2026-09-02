import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import Select from '../components/Select'

import { saveUser } from '../utils/storage'

const initialForm = {
  name: '',
  email: '',
  whatsapp: '',
  domicile: '',
  targetProgram: '',
}

const programOptions = [
  {
    value: 'Frontend Development',
    label: 'Frontend Development',
  },
  {
    value: 'Full Stack Development',
    label: 'Full Stack Development',
  },
  {
    value: 'Web Development',
    label: 'Web Development',
  },
  {
    value: 'UI/UX Design',
    label: 'UI/UX Design',
  },
]

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

    const trimmedName = form.name.trim()
    const trimmedEmail = form.email.trim()
    const trimmedWhatsApp = form.whatsapp.trim()
    const trimmedDomicile = form.domicile.trim()

    if (!trimmedName) {
      newErrors.name = 'Full name is required.'
    } else if (trimmedName.length < 3) {
      newErrors.name = 'Full name must contain at least 3 characters.'
    }

    if (!trimmedEmail) {
      newErrors.email = 'Email is required.'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!trimmedWhatsApp) {
      newErrors.whatsapp = 'WhatsApp number is required.'
    } else if (!/^[0-9+\-\s()]+$/.test(trimmedWhatsApp)) {
      newErrors.whatsapp =
        'WhatsApp number can only contain valid phone characters.'
    } else if (
      trimmedWhatsApp.replace(/\D/g, '').length < 10
    ) {
      newErrors.whatsapp =
        'WhatsApp number must contain at least 10 digits.'
    }

    if (!trimmedDomicile) {
      newErrors.domicile = 'Domicile is required.'
    }

    if (!form.targetProgram) {
      newErrors.targetProgram = 'Please select your target program.'
    }

    return newErrors
  }

  const normalizeWhatsApp = (value) => {
    const digits = value.replace(/\D/g, '')

    if (digits.startsWith('0')) {
      return `62${digits.slice(1)}`
    }

    if (digits.startsWith('62')) {
      return digits
    }

    return digits
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const user = {
      name: form.name.trim(),
      email: form.email.trim(),
      whatsapp: normalizeWhatsApp(form.whatsapp),
      domicile: form.domicile.trim(),
      targetProgram: form.targetProgram,
    }

    saveUser(user)

    navigate('/test')
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
              Frontend Placement Test
            </div>

            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Discover Your Learning Level
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Take a quick placement test and find the right
              learning path for you.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-900">
                  15 Questions
                </p>
              </div>

              <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-900">
                  ±10 Minutes
                </p>
              </div>

              <div className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-semibold text-slate-900">
                  Instant Result
                </p>
              </div>
            </div>
          </div>

          {/* Registration Card */}
          <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Start Your Test
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Fill in your information before starting the
                placement test.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >
              <Input
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.name}
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                error={errors.email}
                required
              />

              <Input
                label="WhatsApp Number"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="08123456789"
                error={errors.whatsapp}
                required
              />

              <Input
                label="Domicile"
                name="domicile"
                value={form.domicile}
                onChange={handleChange}
                placeholder="e.g. Surabaya"
                error={errors.domicile}
                required
              />

              <Select
                label="Target Program"
                name="targetProgram"
                value={form.targetProgram}
                onChange={handleChange}
                options={programOptions}
                placeholder="Select your target program"
                error={errors.targetProgram}
                required
              />

              <Button
                type="submit"
                className="w-full"
              >
                Start Placement Test
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage