import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const MediaRecognition = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { t } = useLanguage()

  const recognitions = [
    {
      type: 'Experience',
      title: 'Bar des Prés Saint-Germain',
      organization: 'Cyril Lignac Restaurant',
      year: '2024-Present',
      description: 'Leading sushi operations at one of Paris\'s most prestigious restaurants under renowned chef Cyril Lignac',
      icon: '⭐',
    },
    {
      type: 'Experience',
      title: 'Tigr Restaurant',
      organization: 'Saint-Tropez & Megève',
      year: '2022-2024',
      description: 'Designed complete menus and managed high-end sushi operations at luxury resort locations',
      icon: '🏔️',
    },
    {
      type: 'Expertise',
      title: 'Team Leadership',
      organization: '10+ Staff Members',
      year: 'Current',
      description: 'Successfully managing and training teams of up to 10 staff members in high-pressure kitchen environments',
      icon: '👥',
    },
    {
      type: 'Expertise',
      title: 'High Volume Service',
      organization: '100+ Covers Daily',
      year: 'Current',
      description: 'Consistently delivering exceptional quality while managing 100+ covers daily at Bar des Prés',
      icon: '🍣',
    },
    {
      type: 'Expertise',
      title: 'Menu Design',
      organization: 'Creative Seasonal Menus',
      year: 'Ongoing',
      description: 'Designing innovative seasonal menus with modern Japanese influences and traditional techniques',
      icon: '📋',
    },
    {
      type: 'Expertise',
      title: 'Customer Interaction',
      organization: 'Sushi Counter Experience',
      year: 'Ongoing',
      description: 'Direct customer interaction at the sushi counter, offering personalized recommendations and creating memorable dining experiences',
      icon: '💬',
    },
  ]

  return (
    <section id="media" ref={ref} className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-wood/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            Professional Highlights
          </h2>
          <div className="w-24 h-1 bg-accent-red mx-auto mb-6" />
          <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light">
            Key achievements and areas of expertise in Japanese cuisine
          </p>
        </motion.div>

        {/* Recognition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recognitions.map((recognition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-wood/30 backdrop-blur-sm border border-accent-red/20 rounded-lg p-6 hover:border-accent-red/40 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{recognition.icon}</div>
                <span className="text-gold text-xs uppercase tracking-wider font-medium">
                  {recognition.type}
                </span>
              </div>
              
              <h3 className="text-xl font-heading text-text-primary mb-2">
                {recognition.title}
              </h3>
              
              <p className="text-gold font-medium mb-2">{recognition.organization}</p>
              
              <p className="text-text-secondary text-sm mb-3">{recognition.year}</p>
              
              <p className="text-text-secondary text-sm leading-relaxed">
                {recognition.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-text-secondary italic text-sm">
            {t('media.note')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default MediaRecognition
