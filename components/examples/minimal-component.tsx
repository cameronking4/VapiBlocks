"use client";
import React, { useEffect, useRef, useState } from 'react';
import { MicOff, Mic } from 'lucide-react';
import useVapi from '@/hooks/use-vapi';

interface AudioVisualizerProps {
  audioData: Uint8Array;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    draw();
  }, [audioData]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);

    const sliceWidth = (width * 4.44) / (audioData.length - 1);
    const centerY = height / 2;
    const maxAmplitude = height / 3;

    context.lineWidth = 2.7;
    context.strokeStyle = '#9E9E9E';
    context.beginPath();
    context.moveTo(0, centerY);

    for (let i = 1; i < audioData.length; i++) {
      const v = audioData[i] / 255.0;
      const y = centerY + (v - 0.5) * maxAmplitude;
      const x = i * sliceWidth;

      const cp1x = x - sliceWidth / 2;
      const cp1y = centerY;
      const cp2x = x - sliceWidth / 2;
      const cp2y = y;

      context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }

    context.stroke();
  };

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

interface AudioAnalyzerProps {
  volumeLevel: number;
}

const AudioAnalyzer: React.FC<AudioAnalyzerProps> = ({ volumeLevel }) => {
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(128));

  useEffect(() => {
    const updateAudioData = () => {
      const dataArray = new Uint8Array(128);
      const baseValue = 128; // Base value to keep the line centered

      for (let i = 0; i < dataArray.length; i++) {
        const variability = Math.random() * 0.2 + 0.9; // Add slight variability to the volume level
        const newValue = baseValue + volumeLevel * variability * 127;
        dataArray[i] = newValue;
      }
      setAudioData(dataArray);
    };

    const tick = () => {
      updateAudioData();
      animationFrameId = requestAnimationFrame(tick);
    };
    
    let animationFrameId = requestAnimationFrame(tick);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [volumeLevel]);

  return <AudioVisualizer audioData={audioData} />;
};

const MinimalComponent: React.FC = () => {
  const { volumeLevel, isSessionActive, toggleCall } = useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div key="visualizer" className="flex items-center justify-center">
        <button
          key="callButton"
          onClick={toggleCall}
          className="px-4 rounded-md"
        >
          {isSessionActive ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <div className="rounded-4xl p-4">
          <AudioAnalyzer volumeLevel={volumeLevel} />
        </div>
      </div>
    </div>
  );
};

export default MinimalComponent;
