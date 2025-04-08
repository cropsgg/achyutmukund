'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Section = 'home' | 'other';
type SectionContextType = {
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider = ({ children }: { children: ReactNode }) => {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  
  // Set active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const homeSection = document.getElementById('home');
      
      if (homeSection && scrollPosition < homeSection.offsetHeight - 100) {
        setCurrentSection('home');
      } else {
        setCurrentSection('other');
      }
    };
    
    // Initialize on load
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <SectionContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
}; 