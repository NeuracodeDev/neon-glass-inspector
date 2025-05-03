
import React from 'react';

interface InfoBarProps {
  datasetName: string;
  datasetType: string;
  itemCount: number;
}

const InfoBar = ({ datasetName, datasetType, itemCount }: InfoBarProps) => {
  return (
    <div className="glass-panel py-3 px-4 border-t-2 flex items-center space-x-6">
      <div className="flex items-center">
        <span className="text-neon-text mr-2">Dataset:</span>
        <span className="neon-text-glow font-medium">{datasetName}</span>
      </div>

      <div className="flex items-center">
        <span className="text-neon-text mr-2">Type:</span>
        <span className="neon-text">{datasetType}</span>
      </div>

      <div className="flex items-center">
        <span className="text-neon-text mr-2">Items:</span>
        <span className="neon-text">{itemCount.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default InfoBar;
