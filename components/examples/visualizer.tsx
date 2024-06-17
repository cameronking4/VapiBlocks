import React, { useEffect, useState } from 'react';
import useVapi from '@/hooks/use-vapi';
import { Button } from '@/components/ui/button';
import { MicIcon, PhoneOff } from 'lucide-react';

const Visualizer: React.FC = () => {
  const { volumeLevel, isSessionActive, toggleCall } = useVapi();
  const [bars, setBars] = useState(Array(50).fill(0));

  useEffect(() => {
    if (isSessionActive) {
      updateBars(volumeLevel);
    } else {
      resetBars();
    }
  }, [volumeLevel, isSessionActive]);

  const updateBars = (volume: number) => {
    setBars(bars.map(() => Math.random() * volume * 150));
  };

  const resetBars = () => {
    setBars(Array(50).fill(0));
  };

  return (
    <div className='text-center justify-items-center p-4 rounded-2xl'>
      {isSessionActive && (
        <div className="flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="xMidYMid meet">
            {bars.map((height, index) => (
              <React.Fragment key={index}>
                <rect
                  x={500 + index * 20 - 490}
                  y={100 - height / 2}
                  width="10"
                  height={height}
                  className="fill-current text-black dark:text-white dark:opacity-10 opacity-10"
                />
                <rect
                  x={500 - index * 20 - 10}
                  y={100 - height / 2}
                  width="10"
                  height={height}
                  className="fill-current text-black dark:text-white dark:opacity-10 opacity-10"
                />
              </React.Fragment>
            ))}
          </svg>
        </div>
      )}
      <Button onClick={toggleCall} className='m-2'>
        {isSessionActive ? <PhoneOff size={18} /> : <MicIcon size={18} />}
      </Button>
    </div>
  );
};

export default Visualizer;
