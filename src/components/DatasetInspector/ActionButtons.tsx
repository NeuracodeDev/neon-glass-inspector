
import React from 'react';
import { BarChart2, Wand2, Settings, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ActionButtons = () => {
  return (
    <div className="flex justify-center space-x-4 glass-panel py-4">
      <button className="neon-btn flex items-center">
        <BarChart2 size={18} className="mr-1" /> Show Full Distribution Plot
      </button>
      <button className="neon-btn flex items-center">
        <Wand2 size={18} className="mr-1" /> Recommend Augmentation
      </button>
      <button className="neon-btn flex items-center">
        <Settings size={18} className="mr-1" /> Configure Data Loading
      </button>
      <button className="neon-btn flex items-center">
        <FileSearch size={18} className="mr-1" /> Preprocess
      </button>
    </div>
  );
};

export default ActionButtons;
