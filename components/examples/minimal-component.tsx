"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MicOff, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useVapi from '@/hooks/use-vapi'; // Adjust the import path as needed

const AudioVisualizer: React.FC<{ audioData: Uint8Array; isSessionActive: boolean }> = ({ audioData, isSessionActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isSessionActive) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');

      if (canvas && context) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }

      draw();
    }
  }, [audioData, isSessionActive]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);

    const sliceWidth = (width / (audioData.length - 1)) * 2;
    const centerY = height / 2;

    context.lineWidth = 2;
    context.strokeStyle = '#9E9E9E';
    context.beginPath();

    let prevX = 0;
    let prevY = centerY;

    context.moveTo(prevX, prevY);

    for (let i = 0; i < audioData.length; i++) {
      const avgValue = (audioData[i] + audioData[Math.max(0, i - 1)]) / 2; // Averaging current and previous data points
      const v = avgValue / 255.0;
      const y = centerY + (v - 0.5) * height;
      const x = i * sliceWidth;

      context.bezierCurveTo((prevX + x) / 2, prevY, (prevX + x) / 2, y, x, y);

      prevX = x;
      prevY = y;
    }

    context.stroke();
  };

  return (
    <motion.canvas
      ref={canvasRef}
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: isSessionActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />
  );
};

const AudioAnalyzer: React.FC<{ volumeLevel: number; isSessionActive: boolean }> = ({ volumeLevel, isSessionActive }) => {
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(128));

  useEffect(() => {
    if (!isSessionActive) {
      setAudioData(new Uint8Array(128));
      return;
    }

    const updateAudioData = () => {
      const dataArray = new Uint8Array(128);

      for (let i = 0; i < dataArray.length; i++) {
        const variability = (Math.random() - 0.5) * 0.5; // Reduced variability for less noise
        dataArray[i] = Math.min(Math.max(128 + volumeLevel * variability * 128, 0), 255);
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
  }, [volumeLevel, isSessionActive]);

  return <AudioVisualizer audioData={audioData} isSessionActive={isSessionActive} />;
};

const MinimalComponent: React.FC = () => {
  const { volumeLevel, isSessionActive, toggleCall } = useVapi();
  const [showVisualizer, setShowVisualizer] = useState(false);

  const handleToggleCall = () => {
    toggleCall();
    setShowVisualizer(!isSessionActive);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div className="flex items-center justify-center">
        <motion.button
          key="callButton"
          onClick={handleToggleCall}
          className="p-2 rounded-xl bg-secondary"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          initial={{ x: 0 }}
          animate={{ x: showVisualizer ? -40 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: 10, position: 'relative' }}
        >
          {isSessionActive ? <MicOff size={20} /> : <Mic size={20} />}
        </motion.button>
        <AnimatePresence>
          {showVisualizer && (
            <motion.div
              className="rounded-4xl p-4 overflow-hidden"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginLeft: '10px' }}
            >
              <AudioAnalyzer volumeLevel={volumeLevel} isSessionActive={isSessionActive} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MinimalComponent;
