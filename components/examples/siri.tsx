"use client";
import React from 'react';
import { Mic } from 'lucide-react';
import Siriwave from "react-siriwave";
import useVapi from '@/hooks/use-vapi';

const Siri: React.FC = () => {
  const { volumeLevel, isSessionActive, toggleCall } = useVapi();

  return (
    <div className='text-center justify-items-center p-4 rounded-2xl'>
      <div className="flex items-center justify-center h-full relative" style={{ width: '300px', height: '300px' }}>
        <Mic
          size={20}
          className="text-black dark:text-white cursor-pointer z-10"
          onClick={toggleCall}
        />
        {isSessionActive && (
          volumeLevel > 0.01 ? (
            <Siriwave theme="ios9" />
          ) : (
            <span className="text-black dark:text-white"></span>
          )
        )}
      </div>
    </div>
  );
};

export default Siri;
