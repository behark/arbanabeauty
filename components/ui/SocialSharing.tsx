"use client";

import React from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaPinterest,
  FaLinkedin,
  FaWhatsapp
} from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { usePathname } from "next/navigation";

interface SocialSharingProps {
  title?: string;
  description?: string;
  className?: string;
  showCopyLink?: boolean;
  showWhatsapp?: boolean;
  showLinkedin?: boolean;
  showPinterest?: boolean;
  size?: "sm" | "md" | "lg";
  iconSize?: number;
}

export default function SocialSharing({
  title = "Arbana Kabashi Beauty",
  description = "Professional makeup artist, educator, and beauty entrepreneur",
  className = "",
  showCopyLink = true,
  showWhatsapp = true,
  showLinkedin = true,
  showPinterest = true,
  size = "md",
  iconSize = 20,
}: SocialSharingProps) {
  const pathname = usePathname();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const url = `${baseUrl}${pathname}`;
  
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getButtonSize = () => {
    switch (size) {
      case "sm": return "p-2";
      case "lg": return "p-4";
      default: return "p-3";
    }
  };

  const buttonSize = getButtonSize();
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonSize} bg-[#1877f2] text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center`}
        aria-label="Share on Facebook"
      >
        <FaFacebook size={iconSize} />
      </a>
      
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonSize} bg-[#1da1f2] text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center`}
        aria-label="Share on Twitter"
      >
        <FaTwitter size={iconSize} />
      </a>
      
      <a
        href={`https://www.instagram.com/arbanakabashi_beauty/`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonSize} bg-gradient-to-r from-[#405de6] via-[#833ab4] to-[#fd1d1d] text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center`}
        aria-label="Follow on Instagram"
      >
        <FaInstagram size={iconSize} />
      </a>
      
      {showPinterest && (
        <a
          href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(description)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonSize} bg-[#e60023] text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center`}
          aria-label="Share on Pinterest"
        >
          <FaPinterest size={iconSize} />
        </a>
      )}
      
      {showLinkedin && (
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonSize} bg-[#0077b5] text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center`}
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin size={iconSize} />
        </a>
      )}
      
      {showWhatsapp && (
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonSize} bg-[#25d366] text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center`}
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp size={iconSize} />
        </a>
      )}
      
      {showCopyLink && (
        <button
          onClick={copyToClipboard}
          className={`${buttonSize} bg-gray-700 dark:bg-gray-600 text-white rounded-full hover:opacity-90 transition-opacity flex items-center justify-center relative`}
          aria-label="Copy link"
        >
          <MdContentCopy size={iconSize} />
          {copied && (
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </button>
      )}
    </div>
  );
}
