import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.omakase': 'Omakase',
    'nav.gallery': 'Gallery',
    'nav.recognition': 'Recognition',
    'nav.reservations': 'Reservations',
    
    // Hero
    'hero.subtitle': 'Master Sushi Chef • Paris, France',
    'hero.scroll': 'Scroll to Discover',
    
    // About
    'about.title': 'About the Chef',
    'about.subtitle': 'Tashi Phuri • 10+ Years of Excellence',
    'about.journey': 'Professional Summary',
    'about.summary1': 'Experienced Sushi Chef specialized in Japanese cuisine, with strong expertise in creating authentic and innovative menus. With over 10 years of experience in high-end Asian kitchens, I successfully lead teams of up to 10 people while maintaining exceptional quality standards.',
    'about.summary2': 'Specialized in creating exceptional culinary experiences, with expertise in leading high-end Asian/fusion restaurant operations as Executive Chef or Head Sushi Chef.',
    'about.summary3': 'Currently at Bar des Prés Saint-Germain under Cyril Lignac, I manage a team of 10 staff members, prepare over 100 covers daily, and work closely with specialized suppliers to ensure the highest quality fish selection. My expertise extends beyond the kitchen—I interact directly with customers at the sushi counter, offering personalized recommendations and creating memorable dining experiences.',
    'about.competencies': 'Key Competencies:',
    'about.competency1': 'Expert mastery of Japanese cuisine and cultural knowledge',
    'about.competency2': 'Advanced understanding of Japanese fermentation techniques',
    'about.competency3': 'Expert-level sushi preparation (cutting, shaping, presentation)',
    'about.competency4': 'Highly skilled in using and maintaining Japanese knives',
    'about.competency5': 'Creative seasonal menu design with modern Japanese influences',
    'about.competency6': 'Strong team leadership in high-pressure environments',
    'about.quote': '「一期一会」',
    'about.quoteTranslation': '— One encounter, one opportunity',
    'about.timeline': 'Career Highlights',
    'about.languages': 'Languages',
    
    // Omakase
    'omakase.title': 'Signature Omakase Experience',
    'omakase.subtitle': 'A curated journey through seasonal flavors, traditional techniques, and culinary artistry',
    'omakase.note': '* Menu varies seasonally based on availability of premium ingredients',
    
    // Gallery
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'A visual journey through the art of sushi craftsmanship',
    
    // Media
    'media.title': 'Professional Highlights',
    'media.subtitle': 'Key achievements and areas of expertise in Japanese cuisine',
    'media.note': 'Dedicated to excellence in Japanese cuisine, with proven expertise in executive leadership and high-end restaurant operations',
    
    // Contact
    'contact.title': 'Reservations',
    'contact.subtitle': 'By appointment only',
    'contact.description': 'Experience an exclusive omakase journey. Please provide your details and preferences, and we will contact you to confirm your reservation.',
    'contact.location': 'Location',
    'contact.contact': 'Contact',
    'contact.name': 'Full Name *',
    'contact.email': 'Email Address *',
    'contact.phone': 'Phone Number *',
    'contact.date': 'Preferred Date',
    'contact.guests': 'Number of Guests *',
    'contact.guestsPlaceholder': 'Select number of guests',
    'contact.requests': 'Special Requests or Dietary Restrictions',
    'contact.requestsPlaceholder': 'Please let us know about any allergies, dietary restrictions, or special occasions...',
    'contact.submit': 'Request Reservation',
    'contact.submitting': 'Submitting...',
    'contact.success': 'Reservation request submitted successfully!',
    'contact.successMessage': 'We will contact you shortly to confirm your reservation.',
    'contact.error': 'There was an error submitting your request. Please try again or contact us directly.',
    'contact.footer': 'All rights reserved.',
    'contact.quote': '一期一会 — One encounter, one opportunity',
  },
  fr: {
    // Navigation
    'nav.about': 'À Propos',
    'nav.omakase': 'Omakase',
    'nav.gallery': 'Galerie',
    'nav.recognition': 'Reconnaissance',
    'nav.reservations': 'Réservations',
    
    // Hero
    'hero.subtitle': 'Chef Sushi Maître • Paris, France',
    'hero.scroll': 'Découvrir',
    
    // About
    'about.title': 'À Propos du Chef',
    'about.subtitle': 'Tashi Phuri • 10+ Ans d\'Excellence',
    'about.journey': 'Résumé Professionnel',
    'about.summary1': 'Chef Sushi expérimenté spécialisé dans la cuisine japonaise, avec une solide expertise dans la création de menus authentiques et innovants. Avec plus de 10 ans d\'expérience dans des cuisines asiatiques haut de gamme, je dirige avec succès des équipes de jusqu\'à 10 personnes tout en maintenant des normes de qualité exceptionnelles.',
    'about.summary2': 'Spécialisé dans la création d\'expériences culinaires exceptionnelles, avec une expertise dans la direction d\'opérations de restaurants asiatiques/fusion haut de gamme en tant que Chef Exécutif ou Chef Sushi Principal.',
    'about.summary3': 'Actuellement au Bar des Prés Saint-Germain sous Cyril Lignac, je gère une équipe de 10 membres du personnel, prépare plus de 100 couverts par jour et travaille en étroite collaboration avec des fournisseurs spécialisés pour garantir la sélection de poissons de la plus haute qualité. Mon expertise s\'étend au-delà de la cuisine—j\'interagis directement avec les clients au comptoir à sushi, offrant des recommandations personnalisées et créant des expériences de restauration mémorables.',
    'about.competencies': 'Compétences Clés:',
    'about.competency1': 'Maîtrise experte de la cuisine japonaise et des connaissances culturelles',
    'about.competency2': 'Compréhension avancée des techniques de fermentation japonaises',
    'about.competency3': 'Préparation de sushi de niveau expert (coupe, façonnage, présentation)',
    'about.competency4': 'Très compétent dans l\'utilisation et l\'entretien des couteaux japonais',
    'about.competency5': 'Conception créative de menus saisonniers avec des influences japonaises modernes',
    'about.competency6': 'Leadership d\'équipe solide dans des environnements à haute pression',
    'about.quote': '「一期一会」',
    'about.quoteTranslation': '— Une rencontre, une opportunité',
    'about.timeline': 'Points Forts de Carrière',
    'about.languages': 'Langues',
    
    // Omakase
    'omakase.title': 'Expérience Omakase Signature',
    'omakase.subtitle': 'Un voyage organisé à travers les saveurs saisonnières, les techniques traditionnelles et l\'art culinaire',
    'omakase.note': '* Le menu varie selon les saisons en fonction de la disponibilité des ingrédients premium',
    
    // Gallery
    'gallery.title': 'Galerie',
    'gallery.subtitle': 'Un voyage visuel à travers l\'art de la fabrication de sushi',
    
    // Media
    'media.title': 'Points Forts Professionnels',
    'media.subtitle': 'Réalisations clés et domaines d\'expertise en cuisine japonaise',
    'media.note': 'Dédié à l\'excellence en cuisine japonaise, avec une expertise prouvée en leadership exécutif et opérations de restaurants haut de gamme',
    
    // Contact
    'contact.title': 'Réservations',
    'contact.subtitle': 'Sur rendez-vous uniquement',
    'contact.description': 'Vivez un voyage omakase exclusif. Veuillez fournir vos coordonnées et préférences, et nous vous contacterons pour confirmer votre réservation.',
    'contact.location': 'Localisation',
    'contact.contact': 'Contact',
    'contact.name': 'Nom Complet *',
    'contact.email': 'Adresse E-mail *',
    'contact.phone': 'Numéro de Téléphone *',
    'contact.date': 'Date Préférée',
    'contact.guests': 'Nombre d\'Invités *',
    'contact.guestsPlaceholder': 'Sélectionner le nombre d\'invités',
    'contact.requests': 'Demandes Spéciales ou Restrictions Alimentaires',
    'contact.requestsPlaceholder': 'Veuillez nous informer de toute allergie, restriction alimentaire ou occasion spéciale...',
    'contact.submit': 'Demander une Réservation',
    'contact.submitting': 'Envoi en cours...',
    'contact.success': 'Demande de réservation soumise avec succès!',
    'contact.successMessage': 'Nous vous contacterons sous peu pour confirmer votre réservation.',
    'contact.error': 'Une erreur s\'est produite lors de l\'envoi de votre demande. Veuillez réessayer ou nous contacter directement.',
    'contact.footer': 'Tous droits réservés.',
    'contact.quote': '一期一会 — Une rencontre, une opportunité',
  },
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
