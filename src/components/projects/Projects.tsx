"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiCalendar, FiCode } from "react-icons/fi";
import Image from "next/image";

type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string;
  topics: string[];
};

const ProjectCard = ({ repo, index }: { repo: Repository; index: number }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const [isHovered, setIsHovered] = useState(false);

  // Generate a color based on the project name for the card gradients
  const getProjectColor = (name: string) => {
    const colors = [
      "from-blue-500 to-indigo-500",
      "from-indigo-500 to-purple-500",
      "from-purple-500 to-pink-500",
      "from-pink-500 to-rose-500",
      "from-rose-500 to-red-500",
      "from-red-500 to-orange-500",
      "from-orange-500 to-amber-500",
      "from-amber-500 to-yellow-500",
      "from-yellow-500 to-lime-500",
      "from-lime-500 to-green-500",
      "from-green-500 to-emerald-500",
      "from-emerald-500 to-teal-500",
      "from-teal-500 to-cyan-500",
      "from-cyan-500 to-sky-500",
      "from-sky-500 to-blue-500",
    ];
    
    // Use the name to pick a color deterministically
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  const projectColor = getProjectColor(repo.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-800 h-full flex flex-col transform transition-all duration-300"
    >
      <div className={`relative h-48 bg-gradient-to-br ${projectColor} overflow-hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 p-4 rounded-full"
          >
            {repo.language === "JavaScript" && <FiCode size={40} className="text-yellow-500" />}
            {repo.language === "Python" && <FiCode size={40} className="text-blue-500" />}
            {repo.language === "TypeScript" && <FiCode size={40} className="text-blue-700" />}
            {!["JavaScript", "Python", "TypeScript"].includes(repo.language) && <FiGithub size={40} className="text-gray-300" />}
          </motion.div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white truncate">{repo.name}</h3>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <div className="flex justify-end items-start mb-4 -mt-2">
          <div className="flex space-x-3">
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              aria-label="View source code"
            >
              <FiGithub size={20} />
            </a>
            {repo.homepage && (
              <a 
                href={repo.homepage} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                aria-label="View deployed site"
              >
                <FiExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
        <p className="text-gray-300 mb-6 line-clamp-3 text-sm leading-relaxed">
          {repo.description || "No description provided."}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics && repo.topics.slice(0, 5).map((topic) => (
            <motion.span 
              key={topic} 
              whileHover={{ scale: 1.05 }}
              className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-200 border border-gray-700 shadow-sm"
            >
              {topic}
            </motion.span>
          ))}
          {repo.language && (
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${projectColor} text-white shadow-sm`}
            >
              {repo.language}
            </motion.span>
          )}
        </div>
      </div>
      <div className="border-t border-gray-800 px-6 py-4 flex items-center justify-between text-sm text-gray-400 bg-gray-800/40">
        <div className="flex items-center space-x-4">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center"
          >
            <FiStar className="mr-1 text-amber-500" />
            <span>{repo.stargazers_count}</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center"
          >
            <FiGitBranch className="mr-1 text-blue-500" />
            <span>{repo.forks_count}</span>
          </motion.div>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <FiCalendar className="mr-1 text-green-500" />
          <span>Updated {formatDate(repo.updated_at)}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real implementation, fetch from GitHub API
    // For demo purposes, using placeholder data
    const demoRepos: Repository[] = [
      {
        id: 1,
        name: "FitFortune - Game Changer HealthFi Platform",
        description: "Developed a platform to give users challenges and store their data on the Aptos Blockchain, while providing multiple health and fitness features to enhance user experience.",
        html_url: "https://github.com/cropsgg/FitFortune",
        homepage: "https://fitfortune.vercel.app",
        stargazers_count: 12,
        forks_count: 3,
        updated_at: new Date().toISOString(),
        language: "JavaScript",
        topics: ["blockchain", "aptos", "health", "fitness", "web3"]
      },
      {
        id: 2,
        name: "ReScroll - Research-Based Content Platform",
        description: "Developed an app to provide the user with research-backed content with the added feature of infinite scrolling and a sophisticated recommendation model.",
        html_url: "https://www.rescroll.in/",
        homepage: "https://www.rescroll.in/",
        stargazers_count: 8,
        forks_count: 2,
        updated_at: new Date().toISOString(),
        language: "JavaScript",
        topics: ["react-native", "research", "content", "recommendation-system"]
      },
      {
        id: 3,
        name: "SRocket - Solid Rocket Motor Prediction",
        description: "Built a predictive web tool for calculating solid rocket motor flight time and chamber pressure, aiding engineers in precise planning.",
        html_url: "https://github.com/cropsgg/SRocket.com",
        homepage: "https://srocket.vercel.app",
        stargazers_count: 15,
        forks_count: 4,
        updated_at: new Date().toISOString(),
        language: "JavaScript",
        topics: ["rocket", "prediction", "engineering", "physics"]
      }
    ];

    // Simulate API fetch
    setTimeout(() => {
      setRepos(demoRepos);
      setLoading(false);
    }, 1000);

    // In a real implementation, use fetch or Octokit
    // async function fetchGitHubRepos() {
    //   try {
    //     const response = await fetch('https://api.github.com/users/achyutmukund/repos?sort=updated&per_page=10');
    //     if (!response.ok) throw new Error('Failed to fetch repositories');
    //     const data = await response.json();
    //     setRepos(data);
    //     setLoading(false);
    //   } catch (err: any) {
    //     setError(err.message);
    //     setLoading(false);
    //   }
    // }
    // 
    // fetchGitHubRepos();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-60">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>Error loading projects: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Title section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-20"></div>
          <h2 className="relative text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-3">
            Featured Projects
          </h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore a selection of my recent projects that showcase my technical skills and creative problem-solving.
        </p>
      </motion.div>

      {/* Projects grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {repos.map((repo, index) => (
          <ProjectCard key={repo.id} repo={repo} index={index} />
        ))}
      </motion.div>

      {/* View more projects button */}
      <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a 
          href="https://github.com/cropsgg" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-200 hover:bg-gray-700"
        >
          <FiGithub className="text-gray-400" />
          <span>View More on GitHub</span>
        </a>
      </motion.div>
    </div>
  );
};

export default Projects; 