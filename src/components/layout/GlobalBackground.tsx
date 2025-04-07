"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// Generate stars outside component to ensure consistency between server and client renders
const generateStars = (count: number, isTwinkling: boolean) => {
  const result = [];
  // Use a fixed seed approach to generate deterministic "random" values
  let seed = isTwinkling ? 123456 : 654321;
  
  const pseudoRandom = () => {
    // Simple linear congruential generator
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  for (let i = 0; i < count; i++) {
    const isSpecialStar = pseudoRandom() > 0.7;
    const sizeFactor = isSpecialStar ? 
      pseudoRandom() * 3 + 1 : // Twinkling stars are smaller
      pseudoRandom() * 2 + 0.5; // Regular stars are very small
    
    result.push({
      id: `star-${isTwinkling ? 'twinkle' : 'regular'}-${i}`,
      initialX: pseudoRandom() * 100,
      initialY: pseudoRandom() * 100,
      size: sizeFactor,
      twinkleSpeed: pseudoRandom() * 3 + 1,
      twinkleDelay: pseudoRandom() * 2,
      twinkleIntensity: isSpecialStar ? [0.1, 1, 0.3, 0.8, 0.2] : [0.4, 0.7, 0.5],
      color: {
        r: isSpecialStar ? 220 + Math.floor(pseudoRandom() * 35) : 180 + Math.floor(pseudoRandom() * 50),
        g: isSpecialStar ? 220 + Math.floor(pseudoRandom() * 35) : 180 + Math.floor(pseudoRandom() * 50),
        b: isSpecialStar ? 255 : 200 + Math.floor(pseudoRandom() * 55)
      },
      movement: {
        x: pseudoRandom() * 5 - 2.5,
        y: pseudoRandom() * 5 - 2.5
      }
    });
  }
  
  return result;
};

// Generate constellation stars with fixed positions
const generateConstellationStars = (count: number) => {
  const result = [];
  let seed = 987654;
  
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  for (let i = 0; i < count; i++) {
    result.push({
      id: `constellation-${i}`,
      initialX: pseudoRandom() * 100,
      initialY: pseudoRandom() * 100,
      size: pseudoRandom() * 4 + 2,
      twinkleSpeed: pseudoRandom() * 2 + 3,
      twinkleDelay: pseudoRandom() * 3,
      twinkleIntensity: [0.5, 1, 0.6, 0.9, 0.7],
      color: {
        r: 240 + Math.floor(pseudoRandom() * 15),
        g: 240 + Math.floor(pseudoRandom() * 15),
        b: 255
      },
      movement: {
        x: pseudoRandom() * 3 - 1.5,
        y: pseudoRandom() * 3 - 1.5
      }
    });
  }
  
  return result;
};

// Generate shooting stars with fixed positions
const generateShootingStars = (count: number) => {
  const result = [];
  let seed = 246810;
  
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  for (let i = 0; i < count; i++) {
    result.push({
      id: `shooting-star-${i}`,
      top: pseudoRandom() * 50,
      left: pseudoRandom() * 80,
      rotate: 30 + pseudoRandom() * 40,
      delay: i * 10
    });
  }
  
  return result;
};

// Generate nebula clouds with fixed positions
const generateNebulaElements = (count: number) => {
  const result = [];
  let seed = 135790;
  
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  for (let i = 0; i < count; i++) {
    result.push({
      id: `nebula-${i}`,
      width: 300 + i * 100,
      height: 300 + i * 100,
      left: 10 + i * 30,
      top: 20 + i * 15,
      color: {
        r: 120 + i * 20,
        g: 100 + i * 30,
        b: 180 + i * 20
      },
      movement: {
        x: [-20 - i * 5, 20 + i * 5, -20 - i * 5],
        y: [-15 - i * 5, 15 + i * 5, -15 - i * 5]
      },
      duration: 80 + i * 30
    });
  }
  
  return result;
};

// Pre-generate all elements with fixed positions to ensure SSR/CSR match
const stars = generateStars(100, false);
const constellationStars = generateConstellationStars(15);
const shootingStars = generateShootingStars(3);
const nebulaElements = generateNebulaElements(3);

const GlobalBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef<number>(0);
  
  // Mouse position values for subtle animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation with very light response
  const springX = useSpring(mouseX, { stiffness: 20, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 30 });

  // Very subtle transform for background elements - convert to percentage strings
  const gradientXPercent = useTransform(springX, [-1000, 1000], [-5, 5], {
    clamp: false
  });
  const gradientYPercent = useTransform(springY, [-1000, 1000], [-5, 5], {
    clamp: false
  });
  
  // Add autonomous movement for cursor not moving
  const autonomousX = useMotionValue(0);
  const autonomousY = useMotionValue(0);
  const autoSpringX = useSpring(autonomousX, { stiffness: 5, damping: 50 });
  const autoSpringY = useSpring(autonomousY, { stiffness: 5, damping: 50 });
  
  // Format our motion values as CSS percentage values
  const gradientX = useMotionValue("0%");
  const gradientY = useMotionValue("0%");
  
  // Update percentage values
  useEffect(() => {
    const updateGradients = () => {
      gradientX.set(`${gradientXPercent.get()}%`);
      gradientY.set(`${gradientYPercent.get()}%`);
      requestAnimationFrame(updateGradients);
    };
    
    const animationFrame = requestAnimationFrame(updateGradients);
    return () => cancelAnimationFrame(animationFrame);
  }, [gradientX, gradientY, gradientXPercent, gradientYPercent]);
  
  // Format autonomous values as CSS percentage values
  const autoGradientX = useMotionValue("0%");
  const autoGradientY = useMotionValue("0%");
  
  // Update auto percentage values
  useEffect(() => {
    const updateAutoGradients = () => {
      autoGradientX.set(`${autoSpringX.get()}%`);
      autoGradientY.set(`${autoSpringY.get()}%`);
      requestAnimationFrame(updateAutoGradients);
    };
    
    const animationFrame = requestAnimationFrame(updateAutoGradients);
    return () => cancelAnimationFrame(animationFrame);
  }, [autoGradientX, autoGradientY, autoSpringX, autoSpringY]);

  // Autonomous animation when cursor isn't moving
  useEffect(() => {
    if (!mounted) return;
    
    const autoAnimate = () => {
      const now = Date.now();
      if (now - lastMoveTime.current > 2000) {
        setIsMoving(false);
        
        // Create subtle wave-like movement
        const newX = Math.sin(now / 5000) * 5;
        const newY = Math.cos(now / 7000) * 5;
        
        autonomousX.set(newX);
        autonomousY.set(newY);
      }
      
      requestAnimationFrame(autoAnimate);
    };
    
    const animationFrame = requestAnimationFrame(autoAnimate);
    return () => cancelAnimationFrame(animationFrame);
  }, [mounted, autonomousX, autonomousY]);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Update last move time
      lastMoveTime.current = Date.now();
      setIsMoving(true);
      
      // Get mouse position relative to viewport
      const x = (e.clientX / window.innerWidth - 0.5) * 2000;
      const y = (e.clientY / window.innerHeight - 0.5) * 2000;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    // Also handle touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !e.touches[0]) return;
      
      // Update last move time
      lastMoveTime.current = Date.now();
      setIsMoving(true);
      
      const touch = e.touches[0];
      const x = (touch.clientX / window.innerWidth - 0.5) * 2000;
      const y = (touch.clientY / window.innerHeight - 0.5) * 2000;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [mouseX, mouseY]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Reset positions on resize to prevent layout issues
      if (!isMoving) {
        autonomousX.set(0);
        autonomousY.set(0);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [autonomousX, autonomousY, isMoving]);

  // During SSR, return a simple placeholder that exactly matches the client first render
  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden bg-gray-950" suppressHydrationWarning>
      {/* Only render the interactive elements after mounting to avoid hydration issues */}
      {mounted && (
        <>
          {/* Base gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-radial from-gray-900 via-gray-950 to-black"
            style={{
              x: isMoving ? gradientX : autoGradientX,
              y: isMoving ? gradientY : autoGradientY,
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 120,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
          
          {/* Very subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(60,60,80,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(60,60,80,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem]" />
          
          {/* Twinkling Stars */}
          <AnimatePresence>
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  width: star.size,
                  height: star.size,
                  left: `${star.initialX}%`,
                  top: `${star.initialY}%`,
                  background: `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 1)`,
                  boxShadow: `0 0 ${star.size * 2}px 0 rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 0.7)`,
                }}
                animate={{
                  x: [
                    star.movement.x + 'vw', 
                    -star.movement.x + 'vw', 
                    star.movement.x + 'vw'
                  ],
                  y: [
                    star.movement.y + 'vh', 
                    -star.movement.y + 'vh', 
                    star.movement.y + 'vh'
                  ],
                  opacity: star.twinkleIntensity,
                  scale: [1, 1.1, 0.9, 1.2, 1]
                }}
                transition={{
                  opacity: {
                    duration: star.twinkleSpeed,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: star.twinkleDelay
                  },
                  scale: {
                    duration: star.twinkleSpeed * 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: star.twinkleDelay
                  },
                  x: {
                    duration: 120,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  },
                  y: {
                    duration: 100,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }
                }}
              />
            ))}
            
            {/* Constellation stars - brighter and more prominent */}
            {constellationStars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full"
                style={{
                  width: star.size,
                  height: star.size,
                  left: `${star.initialX}%`,
                  top: `${star.initialY}%`,
                  background: `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 1)`,
                  boxShadow: `0 0 ${star.size * 3}px ${star.size / 2}px rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 0.8)`,
                }}
                animate={{
                  opacity: star.twinkleIntensity,
                  scale: [1, 1.2, 0.95, 1.3, 1]
                }}
                transition={{
                  opacity: {
                    duration: star.twinkleSpeed,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: star.twinkleDelay
                  },
                  scale: {
                    duration: star.twinkleSpeed * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: star.twinkleDelay
                  }
                }}
              />
            ))}
          </AnimatePresence>
          
          {/* Occasional shooting stars */}
          <div className="absolute inset-0">
            {shootingStars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute w-0.5 h-[1px] bg-white"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  rotate: `${star.rotate}deg`,
                  originX: 0,
                  originY: 0,
                  opacity: 0
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleX: [0, 30, 0],
                  x: ['0%', '10%', '20%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 15 + star.delay,
                  ease: "easeOut",
                  delay: star.delay
                }}
              >
                <motion.div
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: '100%',
                    top: '50%',
                    boxShadow: '0 0 4px 1px rgba(255, 255, 255, 0.6)',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Subtle nebula-like clouds */}
          {nebulaElements.map((nebula) => (
            <motion.div
              key={nebula.id}
              className="absolute rounded-full opacity-5 blur-3xl pointer-events-none"
              style={{
                width: nebula.width,
                height: nebula.height,
                left: `${nebula.left}%`,
                top: `${nebula.top}%`,
                background: `radial-gradient(circle, rgba(${nebula.color.r}, ${nebula.color.g}, ${nebula.color.b}, 0.3) 0%, transparent 70%)`,
              }}
              animate={{
                x: nebula.movement.x,
                y: nebula.movement.y,
                opacity: [0.05, 0.08, 0.05]
              }}
              transition={{
                duration: nebula.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default GlobalBackground; 