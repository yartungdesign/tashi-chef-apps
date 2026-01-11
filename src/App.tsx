import { BrowserRouter as Router } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import OmakaseExperience from './sections/OmakaseExperience'
import Gallery from './sections/Gallery'
import MediaRecognition from './sections/MediaRecognition'
import Contact from './sections/Contact'
import CustomCursor from './components/CustomCursor'
import Navigation from './components/Navigation'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Apply dark mode class (always dark)
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <LanguageProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="min-h-screen bg-background">
          <CustomCursor />
          <Navigation />
        
        {isLoading ? (
          <Hero isInitialLoad={true} onLoadComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <Hero isInitialLoad={false} />
            <About />
            <OmakaseExperience />
            <Gallery />
            <MediaRecognition />
            <Contact />
          </>
        )}
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
