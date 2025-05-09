"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Link from "next/link";

// Typing effect component
const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, mounted]);

  // Return the full text during server-side rendering to avoid hydration mismatch
  if (!mounted) {
    return <span>{text}</span>;
  }

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    setMounted(true);
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10" suppressHydrationWarning>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" suppressHydrationWarning>
          <div className="space-y-6" suppressHydrationWarning>
            {mounted ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.h1 
                  variants={itemVariants} 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold"
                >
                  Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Achyut Mukund</span>
                </motion.h1>
                <motion.h2 
                  variants={itemVariants} 
                  className="text-xl sm:text-2xl text-gray-300"
                >
                  <TypewriterText text="Computer Science undergraduate at VIT Chennai" />
                </motion.h2>
                <motion.p 
                  variants={itemVariants} 
                  className="text-lg text-gray-300"
                >
                  Visionary and collaborative developer specializing in blockchain, web, and app development. 
                  Passionate about teamwork, inclusivity, and empowering underrepresented communities through innovative technology.
                </motion.p>
                
                <motion.div 
                  variants={itemVariants} 
                  className="flex space-x-4 pt-4"
                >
                  <Link 
                    href="https://github.com/cropsgg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800/80 p-3 rounded-full hover:text-blue-400 hover:scale-110 transition-all duration-300 shadow-md"
                    aria-label="GitHub"
                  >
                    <FiGithub size={20} />
                  </Link>
                  <Link 
                    href="https://www.linkedin.com/in/achyut-mukund-845857289/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800/80 p-3 rounded-full hover:text-blue-400 hover:scale-110 transition-all duration-300 shadow-md"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin size={20} />
                  </Link>
                  <Link 
                    href="mailto:mukundachyut305@gmail.com" 
                    className="bg-gray-800/80 p-3 rounded-full hover:text-blue-400 hover:scale-110 transition-all duration-300 shadow-md"
                    aria-label="Email"
                  >
                    <FiMail size={20} />
                  </Link>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants} 
                  className="pt-6 flex space-x-4"
                >
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-md"
                  >
                    View Projects
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#contact"
                    className="bg-gray-800 hover:bg-gray-700 border border-gray-700 px-6 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-md"
                  >
                    Contact Me
                  </motion.a>
                </motion.div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                  Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Achyut Mukund</span>
                </h1>
                <h2 className="text-xl sm:text-2xl text-gray-300">
                  Computer Science undergraduate at VIT Chennai
                </h2>
                <p className="text-lg text-gray-300">
                  Visionary and collaborative developer specializing in blockchain, web, and app development. 
                  Passionate about teamwork, inclusivity, and empowering underrepresented communities through innovative technology.
                </p>
                
                <div className="flex space-x-4 pt-4">
                  <Link 
                    href="https://github.com/cropsgg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800/80 p-3 rounded-full shadow-md"
                    aria-label="GitHub"
                  >
                    <FiGithub size={20} />
                  </Link>
                  <Link 
                    href="https://www.linkedin.com/in/achyut-mukund-845857289/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-800/80 p-3 rounded-full shadow-md"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin size={20} />
                  </Link>
                  <Link 
                    href="mailto:mukundachyut305@gmail.com"
                    className="bg-gray-800/80 p-3 rounded-full shadow-md"
                    aria-label="Email"
                  >
                    <FiMail size={20} />
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile Image */}
          <div className="flex justify-center md:justify-end md:pr-10" suppressHydrationWarning>
            {mounted ? (
              <motion.div
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-md opacity-80" suppressHydrationWarning></div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border-4 border-gray-800 overflow-hidden shadow-2xl"
                  suppressHydrationWarning
                >
                  <Image
                    src="/profile-placeholder.jpg"
                    alt="Achyut Mukund"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 288px, 384px"
                    priority
                  />
                </motion.div>
                
                {/* Animated decorative elements */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    opacity: [0.7, 0.4, 0.7]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -z-10 w-full h-full rounded-full border border-blue-500/30 top-0 left-0"
                  suppressHydrationWarning
                />
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    opacity: [0.5, 0.2, 0.5]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -z-10 w-[110%] h-[110%] rounded-full border border-indigo-500/20 -top-[5%] -left-[5%]"
                  suppressHydrationWarning
                />
              </motion.div>
            ) : (
              <div className="relative" suppressHydrationWarning>
                <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border-4 border-gray-800 overflow-hidden shadow-2xl" suppressHydrationWarning>
                  <Image
                    src="/profile-placeholder.jpg"
                    alt="Achyut Mukund"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 640px) 288px, 384px"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 