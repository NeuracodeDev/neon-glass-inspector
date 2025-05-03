
import React from 'react';
import InfoBar from './InfoBar';
import StatisticsSection from './StatisticsSection';
import DataPreviewSection from './DataPreviewSection';
import ActionButtons from './ActionButtons';

const DatasetInspector = () => {
  // Mock data - in a real application, this would come from props or API
  const datasetInfo = {
    name: '/data/imagenette2-320.zip',
    type: 'Image Folder',
    itemCount: 13368
  };

  const classDistribution = [
    { name: 'n01440764 (tench)', count: 1300 },
    { name: 'n02102040 (English springer)', count: 1340 },
    { name: 'n02979186 (cassette player)', count: 1290 },
    { name: 'n03000684 (chain saw)', count: 1270 },
    { name: 'n03028079 (church)', count: 1310 }
  ];

  const imageStats = {
    dimensions: { min: '320x240', max: '500x480', avg: '350x330' },
    colorMode: 'RGB'
  };

  // Mock image data for preview grid
  const sampleImages = Array(9).fill(null).map((_, idx) => ({
    id: idx + 1,
    src: '/placeholder.svg',  // Using placeholder from public folder
    label: `Image ${idx + 1}`
  }));

  return (
    <div className="flex flex-col h-screen bg-neon-dark text-neon-text font-sans">
      <InfoBar 
        datasetName={datasetInfo.name} 
        datasetType={datasetInfo.type} 
        itemCount={datasetInfo.itemCount} 
      />
      
      <div className="flex flex-col lg:flex-row gap-4 p-4 flex-grow overflow-auto">
        <StatisticsSection 
          classDistribution={classDistribution}
          imageStats={imageStats}
        />
        
        <DataPreviewSection images={sampleImages} />
      </div>
      
      <ActionButtons />
    </div>
  );
};

export default DatasetInspector;
