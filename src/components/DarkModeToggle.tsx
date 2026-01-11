import { motion } from 'framer-motion'

interface DarkModeToggleProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeToggle = ({ darkMode, toggleDarkMode }: DarkModeToggleProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      onClick={toggleDarkMode}
      className="fixed top-8 right-8 z-50 p-3 rounded-full bg-wood/50 backdrop-blur-sm border border-accent-red/20 hover:border-accent-red/40 transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      <motion.div
        animate={{ rotate: darkMode ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        className="text-gold text-xl"
      >
        {darkMode ? '🌙' : '☀️'}
      </motion.div>
    </motion.button>
  )
}

export default DarkModeToggle
