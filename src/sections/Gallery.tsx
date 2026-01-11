import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

interface GalleryImage {
  id: number
  title: string
  category: string
  emoji: string
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [forceVisible, setForceVisible] = useState(false)
  const ref = useRef<HTMLElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1, margin: '-100px' })

  // Force visibility check when section comes into view or on mount
  useEffect(() => {
    const checkVisibility = () => {
      if (ref.current instanceof HTMLElement) {
        const rect = ref.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        if (isVisible) {
          setForceVisible(true)
        }
      }
    }
    
    checkVisibility()
    window.addEventListener('scroll', checkVisibility)
    window.addEventListener('resize', checkVisibility)
    
    return () => {
      window.removeEventListener('scroll', checkVisibility)
      window.removeEventListener('resize', checkVisibility)
    }
  }, [])

  const images: GalleryImage[] = [
    { id: 1, title: 'Nigiri Mastery', category: 'Craftsmanship', emoji: '🍣' },
    { id: 2, title: 'Knife Work', category: 'Technique', emoji: '🔪' },
    { id: 3, title: 'Plating Art', category: 'Presentation', emoji: '🎨' },
    { id: 4, title: 'Fish Selection', category: 'Ingredients', emoji: '🐟' },
    { id: 5, title: 'Kitchen Details', category: 'Craftsmanship', emoji: '🏮' },
    { id: 6, title: 'Omakase Counter', category: 'Experience', emoji: '🍱' },
    { id: 7, title: 'Seasonal Preparation', category: 'Technique', emoji: '🌸' },
    { id: 8, title: 'Traditional Tools', category: 'Craftsmanship', emoji: '⚒️' },
    { id: 9, title: 'Final Presentation', category: 'Presentation', emoji: '✨' },
    { id: 10, title: 'Ingredient Focus', category: 'Ingredients', emoji: '🥢' },
    { id: 11, title: 'Chef at Work', category: 'Experience', emoji: '👨‍🍳' },
    { id: 12, title: 'Detail Shot', category: 'Craftsmanship', emoji: '🔍' },
  ]

  // Create masonry-like heights
  const getHeight = (index: number) => {
    const heights = [400, 300, 350, 280, 320, 360, 290, 340, 310, 330, 300, 350]
    return heights[index % heights.length]
  }

  return (
    <section id="gallery" ref={ref} className="min-h-screen py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={(isInView || forceVisible) ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            Gallery
          </h2>
          <div className="w-24 h-1 bg-accent-red mx-auto mb-6" />
          <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light">
            A visual journey through the art of sushi craftsmanship
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              animate={(isInView || forceVisible) ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedImage(image.id)}
              onTouchStart={() => setSelectedImage(image.id)}
              className="break-inside-avoid mb-6 group cursor-pointer"
            >
              <div
                className="relative bg-wood/30 backdrop-blur-sm border border-accent-red/20 rounded-lg overflow-hidden hover:border-accent-red/40 transition-all duration-500 w-full"
                style={{ height: `${getHeight(index)}px`, minHeight: '250px' }}
              >
                {/* Placeholder Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-wood via-wood-light to-background flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-8xl mb-4"
                  >
                    {image.emoji}
                  </motion.div>
                  <p className="text-text-primary font-heading text-lg mb-1">{image.title}</p>
                  <p className="text-text-secondary text-sm">{image.category}</p>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover Info */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-center">
                    <p className="text-gold font-heading text-xl mb-2">{image.title}</p>
                    <p className="text-text-secondary text-sm uppercase tracking-wider">
                      {image.category}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              {(() => {
                const image = images.find((img) => img.id === selectedImage)
                return (
                  <div className="bg-wood/50 backdrop-blur-sm border border-accent-red/40 rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-wood via-wood-light to-background flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-9xl mb-6">{image?.emoji}</div>
                        <h3 className="text-3xl font-heading text-gold mb-2">{image?.title}</h3>
                        <p className="text-text-secondary">{image?.category}</p>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-gold hover:text-accent-red transition-colors duration-300 text-3xl"
                aria-label="Close"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
