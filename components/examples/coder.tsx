// VapiDemoComponent.tsx
import React from "react";
import useVapi from "@/hooks/code-assistant";
import SandpackComponent from "@/components/code-preview";

const VapiDemoComponent: React.FC = () => {
  const { volumeLevel, isSessionActive, conversation, toggleCall, code } = useVapi();

  return (
    <div className="flex flex-col items-center p-4  min-h-full w-full">
      <div className="w-full shadow-lg rounded-lg overflow-hidden">
        <div className="flex justify-between items-center bg-white p-4">
          <h1 className="text-xl font-bold">Vapi Sandpack Demo</h1>
          <button
            className={`px-4 py-2 rounded ${isSessionActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
            onClick={toggleCall}
          >
            {isSessionActive ? 'Stop Call' : 'Start Call'}
          </button>
        </div>

        {code && (
          <div className="mt-4">
            <SandpackComponent code={code} />
          </div>
        )}

        <div className="bg-white p-4 border-t-2 mt-4">
          <h2 className="text-lg font-semibold">Conversation</h2>
          <div className="max-h-64 overflow-y-auto">
            {conversation.map((msg, index) => (
              <div key={index} className="mt-2">
                <strong>{msg.role}:</strong> {msg.text} <span className="text-gray-500 text-xs">{msg.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 border-t-2 mt-4">
          <h2 className="text-lg font-semibold">Volume Level</h2>
          <div className="w-full rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${volumeLevel * 100}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VapiDemoComponent;
