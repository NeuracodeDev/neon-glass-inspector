
import React from 'react';
import { BarChart2, Wand2, Settings, FileSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ActionButtons = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 glass-panel py-4 px-3">
      <button className="neon-btn flex items-center" id="distribution-plot-btn">
        <BarChart2 size={18} className="mr-1" /> Show Full Distribution Plot
      </button>
      <button className="neon-btn flex items-center" id="augmentation-btn">
        <Wand2 size={18} className="mr-1" /> Recommend Augmentation
      </button>
      <button className="neon-btn flex items-center" id="configure-btn">
        <Settings size={18} className="mr-1" /> Configure Data Loading
      </button>
      <button className="neon-btn flex items-center" id="preprocess-btn">
        <FileSearch size={18} className="mr-1" /> Preprocess
      </button>
    </div>
  );
};

export default ActionButtons;
