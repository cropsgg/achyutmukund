"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { FiMail, FiMapPin, FiPhone, FiSend, FiMessageCircle, FiX } from "react-icons/fi";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowForm(false);
      }, 3000);
    } catch (error) {
      setSubmitError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 max-w-3xl"
      >
        <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Get in Touch</h3>
        <p className="text-gray-300 mb-8">
          I'm always open to discussing new projects, creative ideas or
          opportunities to collaborate. Feel free to reach out!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30 text-blue-400 mx-auto mb-4">
              <FiMapPin size={20} />
            </div>
            <h4 className="font-medium mb-2">Location</h4>
            <p className="text-gray-400">Chennai, Tamil Nadu, India</p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30 text-blue-400 mx-auto mb-4">
              <FiMail size={20} />
            </div>
            <h4 className="font-medium mb-2">Email</h4>
            <p className="text-gray-400 text-sm break-words">mukundachyut305@gmail.com</p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-900/30 text-blue-400 mx-auto mb-4">
              <FiPhone size={20} />
            </div>
            <h4 className="font-medium mb-2">Phone</h4>
            <p className="text-gray-400">+91 7070598212</p>
          </div>
        </div>
        
        {!showForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FiMessageCircle className="mr-2" />
            Send Me a Message
          </motion.button>
        )}
      </motion.div>
      
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md relative"
          >
            <div className="bg-gray-900 rounded-xl shadow-xl p-8 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Contact Form</h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-900/30 text-green-200 rounded-lg">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitError && (
                <div className="mb-6 p-4 bg-red-900/30 text-red-200 rounded-lg">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800"
                    placeholder="Your name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800"
                    placeholder="your@email.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800"
                    placeholder="Your message here..."
                    {...register("message", { required: "Message is required" })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact; 