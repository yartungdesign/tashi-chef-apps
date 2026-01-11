import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false)
    
    // Small delay to ensure menu closes and DOM updates before scrolling
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        const navHeight = 80 // Approximate navigation height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = Math.max(0, elementPosition - navHeight)

        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        })
      } else {
        // Fallback: try scrolling to top if element not found
        console.warn(`Section with id "${id}" not found`)
      }
    }, 150)
  }

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'omakase', label: t('nav.omakase') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'media', label: t('nav.recognition') },
    { id: 'contact', label: t('nav.reservations') },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-accent-red/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('hero')}
              className="text-xl md:text-2xl font-heading text-gold font-bold tracking-wider"
            >
              Chef Tashi
            </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className="text-text-secondary hover:text-gold transition-colors duration-300 text-sm font-medium tracking-wider uppercase"
              >
                {item.label}
              </motion.button>
            ))}
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="text-text-secondary hover:text-gold transition-colors duration-300 text-sm font-medium tracking-wider uppercase border border-accent-red/20 px-3 py-1 rounded hover:border-accent-red/40"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gold"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-t border-accent-red/10"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    scrollToSection(item.id)
                  }}
                  className="block w-full text-left text-text-secondary hover:text-gold transition-colors duration-300 text-sm font-medium tracking-wider uppercase py-2 cursor-pointer"
                  type="button"
                >
                  {item.label}
                </button>
              ))}
              {/* Language Toggle Mobile */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                className="block w-full text-left text-text-secondary hover:text-gold transition-colors duration-300 text-sm font-medium tracking-wider uppercase py-2 border-t border-accent-red/20 mt-4 pt-4"
              >
                {language === 'en' ? 'Français' : 'English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation
