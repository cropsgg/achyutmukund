"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  SiCplusplus, 
  SiOpenjdk, 
  SiJavascript, 
  SiPython, 
  SiHtml5, 
  SiCss3, 
  SiReact,  
  SiAndroid, 
  SiDatabricks,
  SiAutodesk 
} from "react-icons/si";
import { FaMobile, FaLink } from "react-icons/fa";
import { IconType } from "react-icons";

type Skill = {
  name: string;
  color: string;
  icon: IconType;
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-800 flex flex-col items-center text-center">
        <div className="w-16 h-16 relative mb-3 flex items-center justify-center">
          <div 
            className={`w-12 h-12 rounded-full ${skill.color}`} 
            aria-hidden="true"
          />
        </div>
        <h3 className="font-medium mb-2">{skill.name}</h3>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gray-900 rounded-xl p-5 shadow-lg border border-gray-800 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundImage: isHovered 
          ? `radial-gradient(circle at center, ${skill.color.includes('bg-') ? 'var(--tw-gradient-stops)' : skill.color}, transparent 70%)`
          : '',
        backgroundSize: '200% 200%',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-16 h-16 relative mb-4 flex items-center justify-center">
        <motion.div 
          className={`w-12 h-12 rounded-full ${skill.color} flex items-center justify-center`}
          whileHover={{ rotate: 5 }}
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
          aria-hidden="true"
        >
          <skill.icon className="w-6 h-6 text-white opacity-90" />
        </motion.div>
      </div>
      <h3 className="font-bold text-lg mb-3">{skill.name}</h3>
    </motion.div>
  );
};

const Skills = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skills: Skill[] = [
    {
      name: "C++/C",
      color: "bg-blue-900",
      icon: SiCplusplus,
    },
    {
      name: "Java",
      color: "bg-red-900",
      icon: SiOpenjdk,
    },
    {
      name: "JavaScript",
      color: "bg-yellow-900",
      icon: SiJavascript,
    },
    {
      name: "Python",
      color: "bg-green-900",
      icon: SiPython,
    },
    {
      name: "HTML",
      color: "bg-orange-900",
      icon: SiHtml5,
    },
    {
      name: "CSS",
      color: "bg-indigo-900",
      icon: SiCss3,
    },
    {
      name: "React",
      color: "bg-cyan-900",
      icon: SiReact,
    },
    {
      name: "React Native",
      color: "bg-sky-900",
      icon: FaMobile,
    },
    {
      name: "Blockchain",
      color: "bg-purple-900",
      icon: FaLink,
    },
    {
      name: "App Dev",
      color: "bg-emerald-900",
      icon: SiAndroid,
    },
    {
      name: "Data Structures",
      color: "bg-gray-900",
      icon: SiDatabricks,
    },
    {
      name: "CAD",
      color: "bg-rose-900",
      icon: SiAutodesk,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-20"></div>
          <h2 className="relative text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">
            My Skills
          </h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          I've developed expertise in various technologies through academic studies and personal projects.
          Here's a look at my technical toolkit.
        </p>
      </motion.div>

      {/* Skills Grid */}
      {mounted ? (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills; 