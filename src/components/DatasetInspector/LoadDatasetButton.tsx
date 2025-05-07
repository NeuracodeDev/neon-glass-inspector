
import React from 'react';
import { Upload } from 'lucide-react';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DatasetType } from './types';

interface LoadDatasetButtonProps {
  onDatasetLoad: (datasetPath: string, datasetType: DatasetType) => void;
}

const LoadDatasetButton: React.FC<LoadDatasetButtonProps> = ({ onDatasetLoad }) => {
  const [datasetPath, setDatasetPath] = React.useState('');
  const [datasetType, setDatasetType] = React.useState<DatasetType>('image');
  
  const handleLoad = () => {
    if (datasetPath) {
      onDatasetLoad(datasetPath, datasetType);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="neon-btn flex items-center bg-neon-panel/60 border border-neon-blue/40 text-neon-cyan hover:bg-neon-panel hover:border-neon-cyan animate-glow"
        >
          <Upload size={18} className="mr-2" /> Load Dataset
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neon-dark border border-neon-blue/40 text-neon-text">
        <DialogHeader>
          <DialogTitle className="text-neon-cyan">Load Dataset</DialogTitle>
          <DialogDescription>
            Select your dataset location and type to load
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="datasetPath" className="text-right">
              Dataset Path
            </label>
            <input
              id="datasetPath"
              value={datasetPath}
              onChange={(e) => setDatasetPath(e.target.value)}
              placeholder="/path/to/dataset"
              className="col-span-3 bg-neon-dark border border-neon-blue/40 rounded p-2"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="datasetType" className="text-right">
              Dataset Type
            </label>
            <select
              id="datasetType"
              value={datasetType}
              onChange={(e) => setDatasetType(e.target.value as DatasetType)}
              className="col-span-3 bg-neon-dark border border-neon-blue/40 rounded p-2"
            >
              <option value="image">Image</option>
              <option value="tabular">Tabular</option>
              <option value="text">Text</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleLoad} 
            className="bg-neon-blue/20 border border-neon-blue text-neon-cyan hover:bg-neon-blue/30"
          >
            Load Dataset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoadDatasetButton;
