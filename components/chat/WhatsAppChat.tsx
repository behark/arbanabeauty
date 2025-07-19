"use client";

import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

interface WhatsAppChatProps {
  phoneNumber: string; // Format: country code + number (e.g., "38349633634")
  welcomeMessage?: string;
  position?: "right" | "left";
  delay?: number; // Delay in ms before showing the widget
}

export default function WhatsAppChat({
  phoneNumber,
  welcomeMessage = "Hello! 👋 How can I help you today?",
  position = "right",
  delay = 3000,
}: WhatsAppChatProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showWidget, setShowWidget] = useState(false);

  // Show widget after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWidget(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Format the message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // Reset the form
    setMessage("");
  };

  const positionClass = position === "right" ? "right-5" : "left-5";
  
  if (!showWidget) return null;

  return (
    <div className={`fixed bottom-5 ${positionClass} z-40`}>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full ${
          isOpen ? "bg-red-500" : "bg-green-500"
        } text-white shadow-lg hover:shadow-xl transition-all duration-300`}
        aria-label={isOpen ? "Close chat" : "Open WhatsApp chat"}
      >
        {isOpen ? <FaTimes size={20} /> : <FaWhatsapp size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300">
          {/* Chat Header */}
          <div className="bg-green-500 text-white p-4 flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
              <FaWhatsapp className="text-green-500" size={24} />
            </div>
            <div>
              <h3 className="font-medium">Arbana Kabashi Beauty</h3>
              <p className="text-xs opacity-80">{t('chat.onlineNow')}</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 bg-gray-50 h-64 overflow-y-auto">
            <div className="bg-green-100 p-3 rounded-lg inline-block max-w-xs">
              <p className="text-sm">{welcomeMessage}</p>
              <span className="text-xs text-gray-500 mt-1 block">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('chat.typeMessage')}
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Type a message"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition-colors"
                aria-label="Send message"
              >
                {t('chat.send')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
