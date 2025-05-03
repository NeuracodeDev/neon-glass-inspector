
import React from 'react';
import { 
  BarChart2, 
  Wand2, 
  Settings, 
  FileSearch, 
  Table, 
  FileText, 
  FileSpreadsheet, 
  FileImage, 
  FileAudio,
  FileVideo 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DatasetType } from './types';

interface ActionButtonsProps {
  dataType: DatasetType;
}

const ActionButtons = ({ dataType }: ActionButtonsProps) => {
  // Render different action buttons based on data type
  const renderDataTypeButtons = () => {
    switch (dataType) {
      case 'image':
        return (
          <>
            <button className="neon-btn flex items-center" id="image-augment-btn">
              <Wand2 size={18} className="mr-1" /> Augment Images
            </button>
          </>
        );
      case 'tabular':
        return (
          <>
            <button className="neon-btn flex items-center" id="feature-engineer-btn">
              <Table size={18} className="mr-1" /> Feature Engineering
            </button>
          </>
        );
      case 'text':
        return (
          <>
            <button className="neon-btn flex items-center" id="tokenize-btn">
              <FileText size={18} className="mr-1" /> Tokenize Text
            </button>
          </>
        );
      case 'audio':
        return (
          <>
            <button className="neon-btn flex items-center" id="extract-features-btn">
              <FileAudio size={18} className="mr-1" /> Extract Features
            </button>
          </>
        );
      case 'video':
        return (
          <>
            <button className="neon-btn flex items-center" id="extract-frames-btn">
              <FileVideo size={18} className="mr-1" /> Extract Frames
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 glass-panel py-4 px-3">
      <button className="neon-btn flex items-center" id="distribution-plot-btn">
        <BarChart2 size={18} className="mr-1" /> Show Full Distribution Plot
      </button>
      
      {/* Data type specific buttons */}
      {renderDataTypeButtons()}
      
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
