import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const OmakaseExperience = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: '-100px' })

  const courses = [
    {
      japanese: 'お通し',
      english: 'Otsumami',
      description: 'Seasonal appetizer to awaken the palate',
      ingredients: 'Seasonal vegetables, dashi, yuzu',
      technique: 'Traditional preparation with modern presentation',
      image: '🍱',
    },
    {
      japanese: '刺身盛り合わせ',
      english: 'Sashimi Assortment',
      description: 'Fresh selection of the day\'s finest fish',
      ingredients: 'Tuna, sea bream, yellowtail, seasonal catch',
      technique: 'Precision knife work, optimal temperature',
      image: '🐟',
    },
    {
      japanese: '茶碗蒸し',
      english: 'Chawanmushi',
      description: 'Silky egg custard with seasonal treasures',
      ingredients: 'Egg, dashi, ginkgo, shrimp, shiitake',
      technique: 'Steamed to perfection, layered flavors',
      image: '🥚',
    },
    {
      japanese: '握り寿司',
      english: 'Nigiri Sushi',
      description: 'Hand-pressed sushi, rice at body temperature',
      ingredients: 'Premium fish, shari (sushi rice), wasabi',
      technique: 'Edomae style, shari temperature 37°C',
      image: '🍣',
    },
    {
      japanese: '中トロ',
      english: 'Chutoro',
      description: 'Medium-fatty tuna belly, perfectly marbled',
      ingredients: 'Bluefin tuna, aged soy sauce',
      technique: 'Aged 3-5 days, optimal fat distribution',
      image: '🔴',
    },
    {
      japanese: '大トロ',
      english: 'Otoro',
      description: 'The crown jewel, fatty tuna belly',
      ingredients: 'Premium bluefin otoro, gold leaf',
      technique: 'Served at peak marbling, melts on tongue',
      image: '💎',
    },
    {
      japanese: '海胆',
      english: 'Uni',
      description: 'Sea urchin from Hokkaido, creamy and briny',
      ingredients: 'Hokkaido uni, nori, shari',
      technique: 'Fresh daily, served at optimal temperature',
      image: '🌊',
    },
    {
      japanese: '玉子焼き',
      english: 'Tamagoyaki',
      description: 'Sweet egg omelet, the final piece',
      ingredients: 'Egg, mirin, dashi, sugar',
      technique: 'Layered technique, 15-20 layers',
      image: '🥚',
    },
    {
      japanese: '味噌汁',
      english: 'Miso Soup',
      description: 'Traditional miso with seasonal ingredients',
      ingredients: 'White miso, dashi, seasonal vegetables',
      technique: 'Temperature controlled, umami balance',
      image: '🍲',
    },
    {
      japanese: 'デザート',
      english: 'Dessert',
      description: 'Seasonal Japanese sweets to conclude',
      ingredients: 'Matcha, red bean, seasonal fruit',
      technique: 'Traditional wagashi or modern interpretation',
      image: '🍡',
    },
  ]

  return (
    <section id="omakase" ref={ref} className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-wood/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            Signature Omakase Experience
          </h2>
          <div className="w-24 h-1 bg-accent-red mx-auto mb-6" />
          <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light">
            A curated journey through seasonal flavors, traditional techniques, and culinary artistry
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
              onTouchEnd={() => setHoveredIndex(null)}
              className="group relative bg-wood/30 backdrop-blur-sm border border-accent-red/20 rounded-lg overflow-hidden hover:border-accent-red/40 transition-all duration-500 cursor-pointer"
            >
              {/* Image/Icon */}
              <div className="relative h-64 bg-gradient-to-br from-wood via-wood-light to-background flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-8xl"
                >
                  {course.image}
                </motion.div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-2xl font-japanese text-gold font-light mb-1">
                    {course.japanese}
                  </h3>
                  <p className="text-text-primary font-heading text-lg">{course.english}</p>
                </div>
                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  {course.description}
                </p>

                {/* Hover/Touch Reveal */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: hoveredIndex === index ? 'auto' : 0,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-accent-red/20 space-y-2">
                    <div>
                      <span className="text-gold text-xs uppercase tracking-wider">Ingredients:</span>
                      <p className="text-text-secondary text-sm mt-1">{course.ingredients}</p>
                    </div>
                    <div>
                      <span className="text-gold text-xs uppercase tracking-wider">Technique:</span>
                      <p className="text-text-secondary text-sm mt-1">{course.technique}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-red/5 via-transparent to-gold/5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-text-secondary italic">
            * Menu varies seasonally based on availability of premium ingredients
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default OmakaseExperience
