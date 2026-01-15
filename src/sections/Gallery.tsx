import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

interface GalleryImage {
  id: number
  title: string
  category: string
  emoji: string
  image: string
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
    { id: 1, title: 'Nigiri Mastery', category: 'Craftsmanship', emoji: '🍣', image: '/Nigiri Mastery.JPG' },
    { id: 2, title: 'Knife Work', category: 'Technique', emoji: '🔪', image: '/Knife Work.JPG' },
    { id: 3, title: 'Plating Art', category: 'Presentation', emoji: '🎨', image: '/Plating Art.JPG' },
    { id: 4, title: 'Fish Selection', category: 'Ingredients', emoji: '🐟', image: '/Fish Selection.jpg' },
    { id: 5, title: 'Kitchen Details', category: 'Craftsmanship', emoji: '🏮', image: '/Kitchen Details.JPG' },
    { id: 6, title: 'Omakase Counter', category: 'Experience', emoji: '🍱', image: '/Omakase Counter.JPG' },
    { id: 7, title: 'Seasonal Preparation', category: 'Technique', emoji: '🌸', image: '/Seasonal Preparation.JPG' },
    { id: 8, title: 'Traditional Tools', category: 'Craftsmanship', emoji: '⚒️', image: '/Traditional Tools.JPG' },
    { id: 9, title: 'Final Presentation', category: 'Presentation', emoji: '✨', image: '/Final Presentation.JPG' },
    { id: 10, title: 'Ingredient Focus', category: 'Ingredients', emoji: '🥢', image: '/Ingrediant Focus.JPG' },
    { id: 11, title: 'Chef at Work', category: 'Experience', emoji: '👨‍🍳', image: '/Chef at Work.JPG' },
    { id: 12, title: 'Detail Shot', category: 'Craftsmanship', emoji: '🔍', image: '/Detail Shot.JPG' },
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
                {/* Actual Image */}
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Permanent Bottom Overlay for Text */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-8 pb-4 px-4">
                  <p 
                    className="text-gold font-heading text-lg md:text-xl mb-1 font-bold text-center"
                    style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.8)',
                      WebkitTextStroke: '0.5px rgba(0,0,0,0.5)',
                    }}
                  >
                    {image.title}
                  </p>
                  <p 
                    className="text-text-primary text-xs md:text-sm uppercase tracking-wider font-medium text-center"
                    style={{
                      textShadow: '1px 1px 3px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.8)',
                      WebkitTextStroke: '0.3px rgba(0,0,0,0.5)',
                    }}
                  >
                    {image.category}
                  </p>
                </div>

                {/* Overlay - Darker for better contrast on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover Info - Enhanced version */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <div className="text-center px-4 py-6 bg-black/80 backdrop-blur-sm rounded-lg border border-gold/40 shadow-2xl">
                    <p 
                      className="text-gold font-heading text-xl md:text-2xl mb-2 font-bold"
                      style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.8)',
                        WebkitTextStroke: '0.5px rgba(0,0,0,0.5)',
                      }}
                    >
                      {image.title}
                    </p>
                    <p 
                      className="text-text-primary text-sm md:text-base uppercase tracking-wider font-medium"
                      style={{
                        textShadow: '1px 1px 3px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.8)',
                        WebkitTextStroke: '0.3px rgba(0,0,0,0.5)',
                      }}
                    >
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
                    <img
                      src={image?.image}
                      alt={image?.title}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                    <div className="p-6 text-center bg-black/80 backdrop-blur-sm border-t border-gold/30">
                      <h3 className="text-3xl font-heading text-gold mb-2 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {image?.title}
                      </h3>
                      <p className="text-text-primary uppercase tracking-wider font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                        {image?.category}
                      </p>
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
