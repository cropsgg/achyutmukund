'use client';

import { useSection } from '@/components/SectionProvider';
import GlobalBackground from './GlobalBackground';
import StaticBackground from './StaticBackground';

const ConditionalBackground = () => {
  const { currentSection } = useSection();
  
  return currentSection === 'home' ? <GlobalBackground /> : <StaticBackground />;
};

export default ConditionalBackground; 