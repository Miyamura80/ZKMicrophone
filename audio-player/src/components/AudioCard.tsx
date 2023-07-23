import React from 'react';
import WaveAnimation from './WaveAnimation';

interface AudioCardProps {
  audioSrc: string;
  fileName: string;
}

const AudioCard: React.FC<AudioCardProps> = ({audioSrc, fileName }) => {
  return (
    <div className="flex gap-x-4">
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{fileName}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{audioSrc}</p>
      </div>
      <WaveAnimation />
    </div>
  );
};

export default AudioCard;
