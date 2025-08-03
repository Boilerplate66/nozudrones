/* src/components/ContactForm.jsx */
"use client";

import React, { useState } from 'react';
import { Mail, User, BookOpen, Send, XCircle, CheckCircle } from 'lucide-react';

// A simple, modern React component for a contact form using Tailwind CSS for styling.
const ContactForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // State for form status (loading, success, error)
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });

  // The Getform endpoint URL provided by the user.
  const formEndpoint = 'https://getform.io/f/bwnwxeoa';

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false, message: '' });

    // Simple validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Please fill in all fields.'
      });
      return;
    }

    try {
      // Real API call to the Getform endpoint
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // If the submission is successful
      setStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Thank you for your message! We will get back to you shortly.'
      });

      // Clear the form after a successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Something went wrong. Please try again later.'
      });
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
            placeholder="Your Name"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="text-gray-400" size={20} />
          </div>
        </div>

        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
            placeholder="Your Email Address"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="text-gray-400" size={20} />
          </div>
        </div>

        {/* Subject Input */}
        <div className="relative">
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
            placeholder="Subject"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BookOpen className="text-gray-400" size={20} />
          </div>
        </div>

        {/* Message Textarea */}
        <div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200 resize-none"
            placeholder="Your message..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={status.loading}
          >
            {status.loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>

        {/* Status Messages */}
        {status.success && (
          <div className="mt-4 p-4 flex items-center space-x-2 text-green-900 bg-green-50 rounded-lg" role="alert">
            <CheckCircle size={20} />
            <p className="font-medium">{status.message}</p>
          </div>
        )}
        {status.error && (
          <div className="mt-4 p-4 flex items-center space-x-2 text-red-900 bg-red-50 rounded-lg" role="alert">
            <XCircle size={20} />
            <p className="font-medium">{status.message}</p>
          </div>
        )}

      </form>
    </div>
  );
};

export default ContactForm;