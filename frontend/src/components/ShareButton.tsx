'use client';

import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Copy, Check } from 'lucide-react';

interface ShareButtonProps {
  post: {
    id: string;
    title_en: string;
    title_ar: string;
    slug: string;
  };
  isRTL: boolean;
  className?: string;
}

export default function ShareButton({ post, isRTL, className = '' }: ShareButtonProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : '';
  const title = isRTL ? post.title_ar : post.title_en;

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'hover:text-blue-500',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
        setShowShareOptions(false);
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'hover:text-blue-400',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
        setShowShareOptions(false);
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:text-blue-600',
      action: () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank', 'width=600,height=400');
        setShowShareOptions(false);
      }
    },
    {
      name: isRTL ? 'نسخ الرابط' : 'Copy Link',
      icon: copied ? Check : LinkIcon,
      color: copied ? 'text-green-500' : 'hover:text-gray-300',
      action: async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          setShowShareOptions(false);
        } catch (error) {
          console.error('Failed to copy link:', error);
        }
      }
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className={`p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-300 ${className}`}
      >
        <Share2 className="w-4 h-4 text-gray-400 hover:text-blue-500" />
      </button>

      {showShareOptions && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowShareOptions(false)}
          />
          
          {/* Share Options */}
          <div className="absolute right-0 bottom-full mb-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 min-w-[200px]">
            <div className="p-2">
              <div className="text-xs text-gray-400 mb-2 px-2">
                {isRTL ? 'شارك المقال' : 'Share Article'}
              </div>
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-md transition-colors duration-200 ${option.color}`}
                >
                  <option.icon className="w-4 h-4" />
                  <span>{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
