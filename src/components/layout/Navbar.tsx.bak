"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { RiCodeSSlashFill } from "react-icons/ri";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = ["home", "projects", "skills", "resume", "contact"];
      
      // Check if page is scrolled to apply background effect
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine which section is in view
      const currentPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            currentPosition >= offsetTop && 
            currentPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: "home", label: "Home" },
    { href: "projects", label: "Projects" },
    { href: "skills", label: "Skills" },
    { href: "resume", label: "Resume" },
    { href: "contact", label: "Contact" }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-50 border-b border-gray-800 transition-all duration-300 ${
        scrolled 
          ? "bg-gray-950/90 backdrop-blur-md shadow-md"
          : "bg-gray-950"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="flex justify-between h-16" suppressHydrationWarning>
          <div className="flex items-center" suppressHydrationWarning>
            {/* Logo instead of text */}
            {mounted ? (
              <Link href="/" className="flex items-center relative group">
                <motion.div 
                  initial={{ rotate: -10, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-2"
                >
                  <div className="h-9 w-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center overflow-hidden">
                    <RiCodeSSlashFill size={22} className="text-white" />
                  </div>
                </motion.div>
              </Link>
            ) : (
              <div className="h-9 w-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center" suppressHydrationWarning>
                <RiCodeSSlashFill size={22} className="text-white" />
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1" suppressHydrationWarning>
            {mounted && (
              <div className="flex">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={`#${item.href}`}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeSection === item.href
                        ? "text-blue-400"
                        : "hover:text-blue-400"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.href && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center" suppressHydrationWarning>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="p-2 rounded-full bg-gray-800 shadow-sm"
              aria-label="Open menu"
            >
              {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && mounted && (
          <motion.div 
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-950 border-t border-gray-800">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link 
                    href={`#${item.href}`} 
                    className={`block px-3 py-2 rounded-md transition-colors duration-300 ${
                      activeSection === item.href
                        ? "bg-blue-900/20 text-blue-400"
                        : "hover:bg-gray-800"
                    }`}
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 