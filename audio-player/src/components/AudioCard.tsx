import React from 'react';
import WaveAnimation from './WaveAnimation';

interface AudioCardProps {
  imageSrc: string;
  audioSrc: string;
  username: string;
}

const AudioCard: React.FC<AudioCardProps> = ({ imageSrc, audioSrc, username }) => {
  return (
    <div className="flex gap-x-4">
      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={imageSrc} alt="" />
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{username}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{audioSrc}</p>
      </div>
      <WaveAnimation />
    </div>
  );
};

export default AudioCard;
