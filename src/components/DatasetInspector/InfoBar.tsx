
import React from 'react';
import { DatasetInfo } from './types';
import { FileImage, FileText, FileSpreadsheet, FileAudio, FileVideo } from 'lucide-react';

const DataTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'image':
      return <FileImage className="h-5 w-5 text-neon-cyan" />;
    case 'tabular':
      return <FileSpreadsheet className="h-5 w-5 text-neon-cyan" />;
    case 'text':
      return <FileText className="h-5 w-5 text-neon-cyan" />;
    case 'audio':
      return <FileAudio className="h-5 w-5 text-neon-cyan" />;
    case 'video':
      return <FileVideo className="h-5 w-5 text-neon-cyan" />;
    default:
      return null;
  }
};

interface InfoBarProps {
  datasetInfo: DatasetInfo;
}

const InfoBar = ({ datasetInfo }: InfoBarProps) => {
  return (
    <div className="glass-panel py-3 px-4 border-t-2 flex flex-wrap items-center gap-6">
      <div className="flex items-center">
        <span className="text-neon-text mr-2">Dataset:</span>
        <span className="neon-text-glow font-medium">{datasetInfo.name}</span>
      </div>

      <div className="flex items-center">
        <span className="text-neon-text mr-2">Type:</span>
        <span className="neon-text flex items-center gap-1">
          <DataTypeIcon type={datasetInfo.type} />
          {datasetInfo.type.charAt(0).toUpperCase() + datasetInfo.type.slice(1)}
          {datasetInfo.fileFormat ? ` (${datasetInfo.fileFormat})` : ''}
        </span>
      </div>

      <div className="flex items-center">
        <span className="text-neon-text mr-2">Items:</span>
        <span className="neon-text">{datasetInfo.itemCount.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default InfoBar;
