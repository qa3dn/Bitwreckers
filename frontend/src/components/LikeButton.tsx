'use client';

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
  userIdentifier: string;
  className?: string;
}

export default function LikeButton({ 
  postId, 
  initialLikeCount, 
  userIdentifier, 
  className = '' 
}: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user has liked this post
    if (userIdentifier) {
      checkLikeStatus();
    }
  }, [postId, userIdentifier]);

  const checkLikeStatus = async () => {
    try {
      const response = await fetch(`/api/blog/like?postId=${postId}&userIdentifier=${userIdentifier}`);
      if (response.ok) {
        const data = await response.json();
        setLiked(data.hasLiked);
        setLikeCount(data.likeCount);
      }
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const handleLike = async () => {
    if (!userIdentifier || loading) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/blog/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          userIdentifier
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to like post');
      }

      const result = await response.json();
      
      if (result.success) {
        setLiked(result.hasLiked);
        setLikeCount(result.likeCount);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
        liked 
          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
          : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50 hover:text-gray-300'
      } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <Heart 
        className={`w-4 h-4 transition-all duration-300 ${
          liked ? 'fill-current' : ''
        }`} 
      />
      <span className="text-sm font-medium">
        {likeCount}
      </span>
    </button>
  );
}
