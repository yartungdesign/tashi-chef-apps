import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

interface HeroProps {
  isInitialLoad?: boolean
  onLoadComplete?: () => void
}

const Hero = ({ isInitialLoad = false, onLoadComplete }: HeroProps) => {
  const [showContent, setShowContent] = useState(!isInitialLoad)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const { t } = useLanguage()

  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setShowContent(true)
        onLoadComplete?.()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isInitialLoad, onLoadComplete])

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Japanese food images array
  const foodImages = Array.from({ length: 12 }, (_, i) => `/japanesefood (${i + 1}).jpg`)

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center" style={{ margin: 0, padding: 0 }}>
      {/* Image Grid Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        {/* Image Grid */}
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-0">
          {foodImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: index * 0.1 }}
              className="relative overflow-hidden"
            >
              <img
                src={image}
                alt={`Japanese food ${index + 1}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/35 to-background/45" />
            </motion.div>
          ))}
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/35 to-background/55" />
        
        {/* Subtle accent overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(161,18,42,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(212,160,23,0.025)_49%,rgba(212,160,23,0.025)_51%,transparent_52%)]" />

        {/* Rice particles animation */}
        {isInitialLoad && (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="rice-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <AnimatePresence>
          {showContent && (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold mb-6"
              >
                <span className="block text-gold mb-2">TASHI PHURI</span>
                <span className="block text-text-primary text-4xl md:text-6xl lg:text-7xl font-japanese font-light tracking-wider">
                  Sushi Chef
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                className="text-xl md:text-2xl text-text-secondary font-light tracking-widest mb-12 uppercase"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="flex flex-col items-center"
              >
                <motion.button
                  onClick={scrollToNext}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-text-secondary hover:text-gold transition-colors duration-300 text-sm font-medium tracking-wider uppercase mb-4"
                >
                  {t('hero.scroll')}
                </motion.button>
                <motion.button
                  onClick={scrollToNext}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gold hover:text-accent-red transition-colors duration-300 cursor-pointer"
                  aria-label="Scroll down"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Loading overlay */}
      {isInitialLoad && !showContent && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute inset-0 bg-background z-50 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-2 border-gold border-t-transparent rounded-full"
          />
        </motion.div>
      )}
    </section>
  )
}

export default Hero
