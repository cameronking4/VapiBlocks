import React from "react";
import { SandpackProvider, SandpackLayout, SandpackPreview, SandpackConsole, SandpackCodeEditor } from "@codesandbox/sandpack-react";

type SandpackComponentProps = {
  code: string;
};

const SandpackComponent: React.FC<SandpackComponentProps> = ({ code }) => {
  const files = {
    "/pages/index.js": code,
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-full">
      <div className="w-full">
        <SandpackProvider files={files} theme="light" template="nextjs">
          <SandpackLayout className="flex-col h-full">
            <SandpackPreview className="min-h-80" />
            <SandpackCodeEditor className="h-50" />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
};

export default SandpackComponent;
