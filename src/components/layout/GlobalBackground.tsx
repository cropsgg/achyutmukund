"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// Generate stars with more variety for realistic sky
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
    // Add more variety to star types
    const starType = pseudoRandom();
    // Distant stars (small, dim, minimal twinkle)
    // Mid-range stars (medium size, moderate twinkle)
    // Nearby stars (larger, brighter, more prominent twinkle)
    // Special stars (rare, very bright, colored)
    
    const isSpecialStar = starType > 0.92; // Rare bright stars (blue/white)
    const isBrightStar = starType > 0.8 && starType <= 0.92; // Bright stars (white/yellow)
    const isMidStar = starType > 0.5 && starType <= 0.8; // Medium stars
    // Otherwise dim distant stars
    
    // Size varies by star type
    let sizeFactor;
    if (isSpecialStar) {
      sizeFactor = pseudoRandom() * 4 + 2.5; // Largest stars
    } else if (isBrightStar) {
      sizeFactor = pseudoRandom() * 3 + 1.5; // Bright stars
    } else if (isMidStar) {
      sizeFactor = pseudoRandom() * 2 + 1; // Medium stars
    } else {
      sizeFactor = pseudoRandom() * 1 + 0.5; // Distant stars
    }
    
    // Different twinkling patterns based on star type
    let twinkleIntensity;
    if (isSpecialStar) {
      // Special stars have dramatic twinkling
      twinkleIntensity = [0.7, 1, 0.5, 0.9, 0.4, 1];
    } else if (isBrightStar) {
      // Bright stars twinkle moderately
      twinkleIntensity = [0.6, 0.9, 0.5, 0.8, 0.7];
    } else if (isMidStar) {
      // Medium stars twinkle less
      twinkleIntensity = [0.5, 0.7, 0.6];
    } else {
      // Distant stars barely twinkle
      twinkleIntensity = [0.3, 0.4, 0.3, 0.35];
    }
    
    // Star colors vary by type (using temperature-based coloring)
    let color;
    if (isSpecialStar) {
      // Blue-white hot stars (O and B type)
      color = {
        r: 220 + Math.floor(pseudoRandom() * 35),
        g: 240 + Math.floor(pseudoRandom() * 15),
        b: 255
      };
    } else if (isBrightStar) {
      // White to yellow stars (A and F type)
      color = {
        r: 255,
        g: 255 - Math.floor(pseudoRandom() * 20),
        b: 230 - Math.floor(pseudoRandom() * 50)
      };
    } else if (isMidStar) {
      // Yellow to orange stars (G and K type)
      color = {
        r: 255,
        g: 220 - Math.floor(pseudoRandom() * 40),
        b: 180 - Math.floor(pseudoRandom() * 60)
      };
    } else {
      // Distant stars, mostly white but dimmer
      color = {
        r: 220 + Math.floor(pseudoRandom() * 35),
        g: 220 + Math.floor(pseudoRandom() * 35),
        b: 230 + Math.floor(pseudoRandom() * 25)
      };
    }
    
    result.push({
      id: `star-${i}`,
      initialX: pseudoRandom() * 100,
      initialY: pseudoRandom() * 100,
      size: sizeFactor,
      twinkleSpeed: (pseudoRandom() * 3 + 1) * (isSpecialStar ? 0.7 : isBrightStar ? 1 : 1.5), // Larger stars twinkle slower
      twinkleDelay: pseudoRandom() * 5, // More varied delays for natural effect
      twinkleIntensity: twinkleIntensity,
      color: color,
      movement: {
        x: pseudoRandom() * 3 - 1.5,
        y: pseudoRandom() * 3 - 1.5
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
    // Bright bluish-white stars for constellations
    result.push({
      id: `constellation-${i}`,
      initialX: pseudoRandom() * 100,
      initialY: pseudoRandom() * 100,
      size: pseudoRandom() * 4 + 2.5,
      twinkleSpeed: pseudoRandom() * 2 + 3,
      twinkleDelay: pseudoRandom() * 3,
      twinkleIntensity: [0.6, 1, 0.7, 0.9, 0.8],
      color: {
        r: 240 + Math.floor(pseudoRandom() * 15),
        g: 240 + Math.floor(pseudoRandom() * 15),
        b: 255
      },
      // Minimal movement for constellation stars
      movement: {
        x: (pseudoRandom() * 1.5) - 0.75,
        y: (pseudoRandom() * 1.5) - 0.75
      }
    });
  }
  
  return result;
};

// Enhanced realistic meteor generation
const generateMeteors = (count: number) => {
  const result = [];
  let seed = 246810;
  
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  // Different meteor types
  const meteorTypes = [
    // Quick, thin meteor
    { 
      width: 0.5, 
      length: [20, 40], 
      speed: 1.2, 
      opacity: [0, 0.8, 0], 
      tailOpacity: 0.6, 
      tailSize: 1, 
      glowSize: 3 
    },
    // Medium, averae meteor
    { 
      width: 1, 
      length: [30, 60], 
      speed: 1, 
      opacity: [0, 1, 0], 
      tailOpacity: 0.7, 
      tailSize: 1.5, 
      glowSize: 4 
    },
    // Slow, dramatic meteor
    { 
      width: 1.5, 
      length: [40, 80], 
      speed: 1.8, 
      opacity: [0, 1, 0.2, 0], 
      tailOpacity: 0.8, 
      tailSize: 2, 
      glowSize: 6 
    },
    // Rare fireball
    { 
      width: 2.5, 
      length: [60, 120], 
      speed: 2.5, 
      opacity: [0, 1, 0.5, 0.2, 0], 
      tailOpacity: 0.9, 
      tailSize: 3, 
      glowSize: 8
    },
  ];
  
  for (let i = 0; i < count; i++) {
    // Determine meteor type (rare ones appear less frequently)
    const typeRandom = pseudoRandom();
    const meteorType = typeRandom > 0.94 ? meteorTypes[3] : // 6% fireball
                       typeRandom > 0.7 ? meteorTypes[2] : // 24% dramatic
                       typeRandom > 0.4 ? meteorTypes[1] : // 30% average
                       meteorTypes[0]; // 40% quick/thin
  
    // Angle calculation for more natural trajectories
    const angle = 20 + pseudoRandom() * 60; // Mostly from top-right to bottom-left
    
    // Direction variations
    const fromDirection = pseudoRandom() > 0.8 ? "left" : "right";
    
    // Calculate position based on direction
    const top = pseudoRandom() * 70;
    const left = fromDirection === "right" ? pseudoRandom() * 60 + 30 : pseudoRandom() * 30;
    
    // For proper rotation based on direction
    const rotate = fromDirection === "right" ? angle : 180 - angle;
    
    // Random delay between 5-40 seconds
    const meteorDelay = 5 + pseudoRandom() * 35;
    
    // Meteor speed (duration of animation)
    const speed = (1.2 + pseudoRandom() * 0.8) / meteorType.speed;
    
    result.push({
      id: `meteor-${i}`,
      top: top,
      left: left,
      width: meteorType.width,
      rotate: rotate,
      fromDirection: fromDirection,
      speed: speed,
      delay: meteorDelay,
      opacity: meteorType.opacity,
      tailOpacity: meteorType.tailOpacity,
      tailSize: meteorType.tailSize,
      glowSize: meteorType.glowSize,
      length: meteorType.length[0] + pseudoRandom() * (meteorType.length[1] - meteorType.length[0])
    });
  }
  
  return result;
};

// Generate distant space elements like nebulae
const generateNebulaElements = (count: number) => {
  const result = [];
  let seed = 135790;
  
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  
  // Different nebula colors
  const nebulaColors = [
    // Blue/purple nebula
    { r: 100, g: 120, b: 220 },
    // Pinkish/purplish nebula
    { r: 180, g: 100, b: 200 },
    // Greenish blue nebula
    { r: 100, g: 180, b: 180 },
    // Reddish/orange nebula
    { r: 200, g: 120, b: 100 },
  ];
  
  for (let i = 0; i < count; i++) {
    // Select random nebula color type
    const colorIndex = Math.floor(pseudoRandom() * nebulaColors.length);
    const baseColor = nebulaColors[colorIndex];
    
    // Add some variation to the base color
    const color = {
      r: baseColor.r + Math.floor(pseudoRandom() * 40 - 20),
      g: baseColor.g + Math.floor(pseudoRandom() * 40 - 20),
      b: baseColor.b + Math.floor(pseudoRandom() * 40 - 20)
    };
    
    // Size and position
    const size = 300 + pseudoRandom() * 300;
    const aspectRatio = 0.7 + pseudoRandom() * 0.6; // non-perfect circles
    
    result.push({
      id: `nebula-${i}`,
      width: size,
      height: size * aspectRatio,
      left: pseudoRandom() * 80, // Position across screen
      top: pseudoRandom() * 80,
      color: color,
      movement: {
        x: [-5 - i * 2, 5 + i * 2, -5 - i * 2],
        y: [-3 - i * 2, 3 + i * 2, -3 - i * 2]
      },
      duration: 90 + i * 20,
      opacity: 0.04 + pseudoRandom() * 0.06 // Very subtle
    });
  }
  
  return result;
};

// Pre-generate all elements with fixed positions to ensure SSR/CSR match
const stars = generateStars(200, false); // More stars
const constellationStars = generateConstellationStars(15);
const meteors = generateMeteors(6); // More meteors with better effects
const nebulaElements = generateNebulaElements(4); // More nebulae

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
  const gradientXPercent = useTransform(springX, [-1000, 1000], [-3, 3], {
    clamp: false
  });
  const gradientYPercent = useTransform(springY, [-1000, 1000], [-3, 3], {
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
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden bg-[#070b15]" suppressHydrationWarning>
      {/* Only render the interactive elements after mounting to avoid hydration issues */}
      {mounted && (
        <>
          {/* Deep space background with subtle gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-radial from-[#0c1222] via-[#070b15] to-black"
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
          
          {/* Nebulae - larger gas clouds in deep space */}
          {nebulaElements.map((nebula) => (
            <motion.div
              key={nebula.id}
              className="absolute rounded-full blur-3xl pointer-events-none"
              style={{
                width: nebula.width,
                height: nebula.height,
                left: `${nebula.left}%`,
                top: `${nebula.top}%`,
                background: `radial-gradient(ellipse, rgba(${nebula.color.r}, ${nebula.color.g}, ${nebula.color.b}, ${nebula.opacity}) 0%, rgba(${nebula.color.r}, ${nebula.color.g}, ${nebula.color.b}, ${nebula.opacity/3}) 40%, transparent 70%)`,
              }}
              animate={{
                x: nebula.movement.x,
                y: nebula.movement.y,
                opacity: [nebula.opacity*0.6, nebula.opacity, nebula.opacity*0.7]
              }}
              transition={{
                duration: nebula.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
          
          {/* Regular stars with realistic twinkling */}
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
                  scale: [1, 1.2, 0.9, 1.1, 1] // More natural size pulsing
                }}
                transition={{
                  opacity: {
                    duration: star.twinkleSpeed,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: star.twinkleDelay
                  },
                  scale: {
                    duration: star.twinkleSpeed * 1.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: star.twinkleDelay + 0.2 // Offset for more natural effect
                  },
                  x: {
                    duration: 180, // Slower movement
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  },
                  y: {
                    duration: 200, // Slower movement
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }
                }}
              />
            ))}
            
            {/* Brighter constellation stars */}
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
                  scale: [1, 1.15, 0.95, 1.2, 1]
                }}
                transition={{
                  opacity: {
                    duration: star.twinkleSpeed,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: star.twinkleDelay
                  },
                  scale: {
                    duration: star.twinkleSpeed * 1.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: star.twinkleDelay + 0.3
                  }
                }}
              />
            ))}
          </AnimatePresence>
          
          {/* Enhanced realistic meteors */}
          <div className="absolute inset-0 overflow-hidden">
            {meteors.map((meteor) => (
              <div key={meteor.id} className="absolute overflow-visible">
                <motion.div
                  className={`absolute ${meteor.fromDirection === "right" ? "origin-left" : "origin-right"}`}
                  style={{
                    top: `${meteor.top}%`,
                    left: `${meteor.left}%`,
                    rotate: `${meteor.rotate}deg`,
                    originX: meteor.fromDirection === "right" ? 0 : 1,
                    originY: 0,
                    width: meteor.width,
                    height: 2,
                    opacity: 0,
                  }}
                  animate={{
                    opacity: meteor.opacity,
                    scaleX: meteor.fromDirection === "right" ? 
                      [0, meteor.length, 0] : 
                      [0, meteor.length, 0],
                    x: meteor.fromDirection === "right" ? 
                      [`0%`, `${meteor.length}%`, `${meteor.length * 2}%`] : 
                      [`0%`, `-${meteor.length}%`, `-${meteor.length * 2}%`]
                  }}
                  transition={{
                    duration: meteor.speed,
                    repeat: Infinity,
                    repeatDelay: meteor.delay,
                    ease: "easeOut",
                    times: [0, 0.6, 1]
                  }}
                >
                  {/* Meteor head (bright point) */}
                  <motion.div
                    className="absolute rounded-full bg-white"
                    style={{
                      width: meteor.width * 3,
                      height: meteor.width * 3,
                      [meteor.fromDirection === "right" ? "left" : "right"]: "100%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      boxShadow: `0 0 ${meteor.glowSize}px 1px rgba(255, 255, 255, 0.8)`,
                    }}
                  />
                  
                  {/* Meteor trail */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-l from-white to-transparent"
                    style={{
                      opacity: meteor.tailOpacity,
                      boxShadow: `0 0 ${meteor.tailSize}px 0px rgba(255, 255, 255, 0.3)`,
                    }}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalBackground; 