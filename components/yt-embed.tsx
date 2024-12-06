import React, { useMemo } from 'react';

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  padding?: string;
  className?: string;
}

const extractYouTubeId = (url: string): string | null => {
  // Regular expressions to match various YouTube URL formats
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/ // Plain video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  url, 
  title = 'YouTube Video', 
  padding = '1rem',
  className = ''
}) => {
  const videoId = useMemo(() => extractYouTubeId(url), [url]);

  if (!videoId) {
    console.error('Invalid YouTube URL');
    return null;
  }

  return (
    <div 
      className={`w-full aspect-video ${className}`} 
      style={{ padding }}
    >
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;