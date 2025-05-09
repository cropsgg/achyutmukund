"use client";

import { motion } from "framer-motion";
import { FiDownload, FiBriefcase, FiBook } from "react-icons/fi";

type TimelineItem = {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string[];
  type: "education" | "experience";
};

const TimelineCard = ({ item }: { item: TimelineItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative p-6 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
    >
      <div className={`absolute top-6 left-0 -ml-3 w-6 h-6 rounded-full flex items-center justify-center ${
        item.type === "education" 
          ? "bg-indigo-100 dark:bg-indigo-900" 
          : "bg-blue-100 dark:bg-blue-900"
      }`}>
        {item.type === "education" ? (
          <FiBook className={`text-indigo-600 dark:text-indigo-400`} />
        ) : (
          <FiBriefcase className={`text-blue-600 dark:text-blue-400`} />
        )}
      </div>
      
      <div className="ml-4">
        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
        <h4 className={`text-lg ${
          item.type === "education" 
            ? "text-indigo-600 dark:text-indigo-400" 
            : "text-blue-600 dark:text-blue-400"
        }`}>
          {item.organization}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{item.date}</p>
        
        <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
          {item.description.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Resume = () => {
  const timeline: TimelineItem[] = [
    {
      id: 1,
      title: "Propulsion Engineer",
      organization: "Ignition Model Rocketry Team",
      date: "Current",
      description: [
        "Collaborated with the propulsion department to design and build rockets",
        "Applied CAD and CFD skills with ANSYS to optimize performance"
      ],
      type: "experience"
    },
    {
      id: 2,
      title: "Bachelor of Science in Computer Science",
      organization: "VIT Chennai, Tamil Nadu",
      date: "Expected Graduation: July 2027",
      description: [
        "CGPA: 8.52/10",
        "Relevant Coursework: Data Structures and Algorithms, Web Development, Blockchain, App Development"
      ],
      type: "education"
    },
    {
      id: 3,
      title: "Higher Secondary",
      organization: "12th Grade",
      date: "89.8%",
      description: [],
      type: "education"
    },
    {
      id: 4,
      title: "Secondary School",
      organization: "10th Grade",
      date: "90%",
      description: [],
      type: "education"
    }
  ];
  
  // Sort timeline items in reverse chronological order
  const sortedTimeline = [...timeline].sort((a, b) => a.id - b.id);
  
  return (
    <div>
      <div className="flex justify-center mb-8">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
        >
          View Resume
        </motion.a>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" 
          style={{ left: '12px' }}
        />
        
        <div className="space-y-8 ml-8">
          {sortedTimeline.map((item) => (
            <TimelineCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resume; 