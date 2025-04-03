import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 border-t dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Achyut Mukund. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link 
              href="https://github.com/achyutmukund" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </Link>
            <Link 
              href="https://linkedin.com/in/achyutmukund" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </Link>
            <Link 
              href="mailto:mukundachyut305@gmail.com" 
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              aria-label="Email"
            >
              <FiMail size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 