"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";
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

// Generate deterministic particle positions to avoid hydration mismatch
const generateDeterministicParticles = () => {
  const particles = [];
  let seed = 12345;
  
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  for (let i = 0; i < 45; i++) {
    particles.push({
      id: `particle-${i}`,
      initialX: `${pseudoRandom() * 100}%`,
      initialY: `${pseudoRandom() * 100}%`,
      size: pseudoRandom() * 6 + 1.5,
      duration: 12 + pseudoRandom() * 18,
      delay: pseudoRandom() * 5,
      twinkle: {
        duration: 1.2 + pseudoRandom() * 3,
        delay: pseudoRandom() * 2,
        intensity: [0.4, 0.9, 0.4],
      },
      color: {
        r: Math.floor(pseudoRandom() * 120) + 135,
        g: Math.floor(pseudoRandom() * 120) + 135,
        b: Math.floor(pseudoRandom() * 50) + 100
      },
      positions: {
        x: [
          `${pseudoRandom() * 100}%`,
          `${pseudoRandom() * 100}%`,
          `${pseudoRandom() * 100}%`,
        ],
        y: [
          `${pseudoRandom() * 100}%`,
          `${pseudoRandom() * 100}%`,
          `${pseudoRandom() * 100}%`,
        ]
      }
    });
  }
  
  return particles;
};

// Pre-generate particles before component renders to ensure SSR/CSR match
const particlesData = generateDeterministicParticles();

// Enhanced interactive background
const ParticleBackground = () => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 -z-10 overflow-hidden" />;
  }
  
  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div 
        className="relative h-full w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated gradient background with more dynamic movement */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gray-800/40 via-gray-950 to-gray-800/40"
          style={{
            backgroundSize: "200% 200%",
            backgroundPosition: "center",
          }}
          animate={{
            opacity: [0.65, 0.85, 0.65],
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
          }}
          transition={{
            opacity: {
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            },
            backgroundPosition: {
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }
          }}
        />
        
        {/* Subtle nebula-like effect */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 30% 40%, rgba(200, 200, 200, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(200, 200, 200, 0.1) 0%, transparent 50%)",
            filter: "blur(40px)",
          }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(60,60,80,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(60,60,80,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Enhanced particles with more pronounced twinkling */}
        {particlesData.map((particle, index) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.initialX,
              top: particle.initialY,
              background: `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0.7)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.size / 2}px rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0.5)`,
            }}
            animate={{
              x: particle.positions.x,
              y: particle.positions.y,
              scale: [1, 1.3, 0.9, 1.2, 1],
              opacity: particle.twinkle?.intensity || [0.6, 0.9, 0.6],
              boxShadow: [
                `0 0 ${particle.size * 1.5}px ${particle.size / 3}px rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0.4)`,
                `0 0 ${particle.size * 3}px ${particle.size / 1.5}px rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0.7)`,
                `0 0 ${particle.size * 1.5}px ${particle.size / 3}px rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0.4)`,
              ]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay || 0,
              repeat: Infinity,
              ease: "linear",
              opacity: {
                duration: particle.twinkle?.duration || 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: particle.twinkle?.delay || 0,
              },
              scale: {
                duration: particle.twinkle?.duration || 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: particle.twinkle?.delay || 0,
              },
              boxShadow: {
                duration: particle.twinkle?.duration || 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: particle.twinkle?.delay || 0,
              }
            }}
          />
        ))}
        
        {/* Shooting stars that appear randomly */}
        <motion.div
          className="absolute h-[1px] w-[100px] bg-white"
          style={{
            top: "15%",
            left: "-10%",
            rotate: 15,
            opacity: 0,
            transformOrigin: "left center",
            boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.7)"
          }}
          animate={{
            opacity: [0, 1, 0],
            x: ["0%", "120%"],
            width: ["0px", "100px", "0px"]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 15,
            ease: "easeOut",
            delay: 5
          }}
        />
        
        <motion.div
          className="absolute h-[1px] w-[80px] bg-white"
          style={{
            top: "45%",
            left: "-8%",
            rotate: 30,
            opacity: 0,
            transformOrigin: "left center",
            boxShadow: "0 0 8px 1px rgba(255, 255, 255, 0.7)"
          }}
          animate={{
            opacity: [0, 1, 0],
            x: ["0%", "120%"],
            width: ["0px", "80px", "0px"]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 20,
            ease: "easeOut",
            delay: 12
          }}
        />
        
        {/* Static glowing orbs for visual interest */}
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none left-1/4 top-1/4"
          style={{
            background: "radial-gradient(circle, rgba(200, 200, 200, 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.12, 0.16, 0.12],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full pointer-events-none right-1/4 bottom-1/4"
          style={{
            background: "radial-gradient(circle, rgba(200, 200, 200, 0.09) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 5
          }}
        />
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    setMounted(true);
    
    if (isInView) {
      // Assuming controls.start("visible") is called elsewhere in the component
    }
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
      {/* Include ParticleBackground only for the Hero section */}
      <ParticleBackground />
      
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
                  Hi, I&apos;m <span className="text-blue-400">Achyut Mukund</span>
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
                  Hi, I&apos;m <span className="text-blue-400">Achyut Mukund</span>
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
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full blur-md opacity-60" suppressHydrationWarning></div>
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
                  className="absolute -z-10 w-full h-full rounded-full border border-gray-500/30 top-0 left-0"
                  suppressHydrationWarning
                />
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    opacity: [0.5, 0.2, 0.5]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -z-10 w-[110%] h-[110%] rounded-full border border-gray-500/20 -top-[5%] -left-[5%]"
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