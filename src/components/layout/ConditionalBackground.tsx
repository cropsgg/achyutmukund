"use client";

import { useSection } from "@/components/SectionProvider";
import GlobalBackground from "./GlobalBackground";

const ConditionalBackground = () => {
  const { currentSection } = useSection();
  
  // Only render the GlobalBackground when in the home section
  if (currentSection === 'home') {
    return <GlobalBackground />;
  }
  
  // For all other sections, just render a simple static background div
  return <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-950" />;
};

export default ConditionalBackground; 