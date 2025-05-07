
import React, { useState } from 'react';
import InfoBar from './InfoBar';
import StatisticsSection from './StatisticsSection';
import DataPreviewSection from './DataPreviewSection';
import ActionButtons from './ActionButtons';
import LoadDatasetButton from './LoadDatasetButton';
import { 
  DatasetInfo, 
  ImageStats, 
  TabularStats, 
  TextStats, 
  AudioStats,
  VideoStats,
  DatasetType
} from './types';

const DatasetInspector = () => {
  // State to track the current dataset type
  const [dataType, setDataType] = useState<DatasetType>('image');
  // State for dataset info
  const [datasetInfo, setDatasetInfo] = useState<DatasetInfo>({
    name: '/data/imagenette2-320.zip',
    type: dataType,
    itemCount: 13368
  });
  
  // Mock data for different dataset types - in a real application, this would come from props or API
  // Class distribution works for all data types
  const classDistribution = [
    { name: 'n01440764 (tench)', count: 1300 },
    { name: 'n02102040 (English springer)', count: 1340 },
    { name: 'n02979186 (cassette player)', count: 1290 },
    { name: 'n03000684 (chain saw)', count: 1270 },
    { name: 'n03028079 (church)', count: 1310 }
  ];

  // Type-specific stats
  const imageStats: ImageStats = {
    dimensions: { min: '320x240', max: '500x480', avg: '350x330' },
    colorMode: 'RGB'
  };

  const tabularStats: TabularStats = {
    columns: [
      { name: 'id', type: 'int', missing: 0, unique: 13368 },
      { name: 'filename', type: 'string', missing: 0, unique: 13368 },
      { name: 'class_id', type: 'int', missing: 0, unique: 10 },
      { name: 'width', type: 'int', missing: 0 },
      { name: 'height', type: 'int', missing: 0 },
    ],
    rowCount: 13368,
    columnCount: 5
  };

  const textStats: TextStats = {
    averageLength: 1250,
    languages: ['English', 'Spanish'],
    encoding: 'UTF-8'
  };

  const audioStats: AudioStats = {
    averageDuration: '3.5 sec',
    sampleRate: '44.1 kHz',
    channels: 2
  };

  const videoStats: VideoStats = {
    averageDuration: '15.2 sec',
    resolution: '1280x720',
    frameRate: '30 fps'
  };

  // Mock image data for preview grid
  const sampleImages = Array(18).fill(null).map((_, idx) => ({
    id: idx + 1,
    src: '/placeholder.svg', 
    label: `Image ${idx + 1}`
  }));

  // Mock tabular data
  const tabularData = Array(25).fill(null).map((_, idx) => ({
    id: idx + 1,
    row: {
      'id': idx + 1,
      'filename': `img_${idx + 1000}.jpg`,
      'class_id': idx % 5,
      'width': 320 + (idx % 10) * 10,
      'height': 240 + (idx % 8) * 15
    }
  }));

  // Mock text data
  const textData = Array(15).fill(null).map((_, idx) => ({
    id: idx + 1,
    content: `This is a sample text document ${idx + 1}. It contains information related to the dataset and can be analyzed for natural language processing tasks.`,
    label: `Text ${idx + 1}`
  }));

  // Mock audio data
  const audioData = Array(12).fill(null).map((_, idx) => ({
    id: idx + 1,
    src: '#', // In a real app, this would be an audio file URL
    duration: `${(idx % 5) + 1}.${idx % 10} sec`,
    label: `Audio ${idx + 1}`
  }));

  // Mock video data
  const videoData = Array(12).fill(null).map((_, idx) => ({
    id: idx + 1,
    src: '#', // In a real app, this would be a video file URL
    thumbnail: '/placeholder.svg',
    duration: `${(idx % 8) + 2}.${idx % 10} sec`,
    label: `Video ${idx + 1}`
  }));

  const columns = ['id', 'filename', 'class_id', 'width', 'height'];

  // Handler to change dataset type - for demo purposes
  const handleTypeChange = (type: DatasetType) => {
    setDataType(type);
    setDatasetInfo(prevInfo => ({
      ...prevInfo,
      type
    }));
  };

  // Handler for loading a new dataset
  const handleDatasetLoad = (datasetPath: string, datasetType: DatasetType) => {
    setDataType(datasetType);
    setDatasetInfo({
      name: datasetPath,
      type: datasetType,
      itemCount: Math.floor(Math.random() * 10000) + 1000, // Mock item count
      fileFormat: getFileFormatForType(datasetType)
    });
    console.log(`Loading ${datasetType} dataset from: ${datasetPath}`);
  };

  // Helper function to get file format based on type
  const getFileFormatForType = (type: DatasetType): string => {
    switch (type) {
      case 'image': return 'JPEG, PNG';
      case 'tabular': return 'CSV, XLSX';
      case 'text': return 'TXT, JSON';
      case 'audio': return 'MP3, WAV';
      case 'video': return 'MP4, AVI';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-neon-dark text-neon-text font-sans">
      {/* Header with Dataset Type Selector and Load Button */}
      <div className="flex justify-between p-2 glass-panel">
        <div className="flex gap-2">
          {['image', 'tabular', 'text', 'audio', 'video'].map((type) => (
            <button 
              key={type}
              className={`px-3 py-1 rounded ${dataType === type ? 'bg-neon-blue/20 neon-border text-neon-cyan' : 'text-neon-text hover:bg-neon-blue/10'}`}
              onClick={() => handleTypeChange(type as DatasetType)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <LoadDatasetButton onDatasetLoad={handleDatasetLoad} />
      </div>

      {/* Info Bar */}
      <InfoBar datasetInfo={datasetInfo} />
      
      <div className="flex flex-col lg:flex-row gap-4 p-4 flex-grow overflow-auto">
        {/* Statistics Section - pass different stats based on data type */}
        <StatisticsSection 
          dataType={dataType}
          classDistribution={classDistribution}
          imageStats={dataType === 'image' ? imageStats : undefined}
          tabularStats={dataType === 'tabular' ? tabularStats : undefined}
          textStats={dataType === 'text' ? textStats : undefined}
          audioStats={dataType === 'audio' ? audioStats : undefined}
          videoStats={dataType === 'video' ? videoStats : undefined}
        />
        
        {/* Data Preview Section - pass different data based on type */}
        <DataPreviewSection 
          dataType={dataType}
          images={dataType === 'image' ? sampleImages : undefined}
          tabularData={dataType === 'tabular' ? tabularData : undefined}
          textData={dataType === 'text' ? textData : undefined}
          audioData={dataType === 'audio' ? audioData : undefined}
          videoData={dataType === 'video' ? videoData : undefined}
          columns={columns}
        />
      </div>
      
      {/* Action Buttons with context awareness */}
      <ActionButtons dataType={dataType} />
    </div>
  );
};

export default DatasetInspector;
