import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

interface FormData {
  name: string
  email: string
  phone: string
  datePreference: string
  numberOfGuests: string
  specialRequests: string
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    datePreference: '',
    numberOfGuests: '',
    specialRequests: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          datePreference: '',
          numberOfGuests: '',
          specialRequests: '',
        })
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-accent-red mx-auto mb-6" />
          <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light mb-4">
            {t('contact.subtitle')}
          </p>
          <p className="text-text-secondary text-sm max-w-xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        {/* Reservation Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-wood/30 backdrop-blur-sm border border-accent-red/20 rounded-lg p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gold text-sm font-medium mb-2 uppercase tracking-wider">
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background/50 border border-accent-red/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-red/60 focus:ring-1 focus:ring-accent-red/20 transition-all duration-300"
                placeholder="Your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gold text-sm font-medium mb-2 uppercase tracking-wider">
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background/50 border border-accent-red/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-red/60 focus:ring-1 focus:ring-accent-red/20 transition-all duration-300"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-gold text-sm font-medium mb-2 uppercase tracking-wider">
                {t('contact.phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background/50 border border-accent-red/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-red/60 focus:ring-1 focus:ring-accent-red/20 transition-all duration-300"
                placeholder="+33 7 83 57 72 38"
              />
            </div>

            {/* Date Preference */}
            <div>
              <label htmlFor="datePreference" className="block text-gold text-sm font-medium mb-2 uppercase tracking-wider">
                {t('contact.date')}
              </label>
              <input
                type="date"
                id="datePreference"
                name="datePreference"
                value={formData.datePreference}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-background/50 border border-accent-red/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-red/60 focus:ring-1 focus:ring-accent-red/20 transition-all duration-300"
              />
            </div>

            {/* Number of Guests */}
            <div>
              <label htmlFor="numberOfGuests" className="block text-gold text-sm font-medium mb-2 uppercase tracking-wider">
                {t('contact.guests')}
              </label>
              <select
                id="numberOfGuests"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background/50 border border-accent-red/20 rounded-lg text-text-primary focus:outline-none focus:border-accent-red/60 focus:ring-1 focus:ring-accent-red/20 transition-all duration-300"
              >
                <option value="">{t('contact.guestsPlaceholder')}</option>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6+ Guests</option>
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequests" className="block text-gold text-sm font-medium mb-2 uppercase tracking-wider">
                {t('contact.requests')}
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-background/50 border border-accent-red/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-red/60 focus:ring-1 focus:ring-accent-red/20 transition-all duration-300 resize-none"
                placeholder={t('contact.requestsPlaceholder')}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-accent-red hover:bg-accent-red/90 text-text-primary font-medium uppercase tracking-wider rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('contact.submitting') : t('contact.submit')}
            </motion.button>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-wasabi/20 border border-wasabi/40 rounded-lg text-center"
              >
                <div className="flex items-center justify-center space-x-2 text-wasabi">
                  <span className="text-2xl">✨</span>
                  <p className="font-medium">{t('contact.success')}</p>
                </div>
                <p className="text-text-secondary text-sm mt-2">
                  {t('contact.successMessage')}
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-accent-red/20 border border-accent-red/40 rounded-lg text-center"
              >
                <p className="text-accent-red font-medium">
                  {t('contact.error')}
                </p>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-wood/20 backdrop-blur-sm border border-accent-red/20 rounded-lg p-8"
        >
          <h3 className="text-2xl font-heading text-gold mb-6 text-center">{t('contact.contact')}</h3>
          <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
            <div className="space-y-2">
              <p className="text-gold font-medium mb-3 text-lg">{t('contact.location')}</p>
              <p className="text-text-secondary leading-relaxed">
                Paris, France
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gold font-medium mb-3 text-lg">{t('contact.contact')}</p>
              <p className="text-text-secondary leading-relaxed">
                <a href="tel:+33783577238" className="hover:text-gold transition-colors block mb-2">
                  +33 7 83 57 72 38
                </a>
                <a href="mailto:gurungdava@gmail.com" className="hover:text-gold transition-colors">
                  gurungdava@gmail.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-accent-red/20"
        >
          <p className="text-text-secondary text-sm mb-4">
            © {new Date().getFullYear()} Tashi Phuri. {t('contact.footer')}
          </p>
          <p className="text-text-secondary text-xs font-japanese mb-4">
            {t('contact.quote')}
          </p>
          <p className="text-text-secondary text-xs">
            Website designed and built by{' '}
            <a
              href="https://yartung.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-accent-red transition-colors duration-300"
            >
              Yartung
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
