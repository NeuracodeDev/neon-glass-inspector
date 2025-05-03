
import React from 'react';

const ActionButtons = () => {
  return (
    <div className="flex justify-center space-x-4 glass-panel py-4">
      <button className="neon-btn flex items-center">
        <span className="mr-1">📊</span> Show Full Distribution Plot
      </button>
      <button className="neon-btn flex items-center">
        <span className="mr-1">🧬</span> Recommend Augmentation
      </button>
      <button className="neon-btn flex items-center">
        <span className="mr-1">⚙️</span> Configure Data Loading
      </button>
    </div>
  );
};

export default ActionButtons;
