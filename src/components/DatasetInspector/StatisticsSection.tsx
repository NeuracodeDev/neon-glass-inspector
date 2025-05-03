
import React from 'react';

interface ClassDistribution {
  name: string;
  count: number;
}

interface ImageStats {
  dimensions: {
    min: string;
    max: string;
    avg: string;
  };
  colorMode: string;
}

interface StatisticsSectionProps {
  classDistribution: ClassDistribution[];
  imageStats: ImageStats;
}

const StatisticsSection = ({ classDistribution, imageStats }: StatisticsSectionProps) => {
  // Calculate max count for bars scaling
  const maxCount = Math.max(...classDistribution.map(c => c.count));
  
  return (
    <div className="glass-panel rounded-lg p-4 flex-1 min-h-[300px]">
      <h2 className="text-lg font-medium mb-4 neon-text">Summary</h2>
      
      <div className="mb-6">
        <h3 className="text-neon-text mb-2">Class Distribution:</h3>
        <div className="space-y-2">
          {classDistribution.map((cls) => (
            <div key={cls.name} className="flex flex-col">
              <div className="flex justify-between mb-1">
                <span className="text-sm">{cls.name}</span>
                <span className="text-sm neon-text">{cls.count}</span>
              </div>
              <div className="h-2 w-full bg-neon-panel2 rounded-full overflow-hidden">
                <div 
                  className="h-full neon-bar animate-glow rounded-full"
                  style={{ width: `${(cls.count / maxCount) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-neon-text mb-2">Image Dimensions (WxH):</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="block text-sm">Min</span>
            <span className="neon-text">{imageStats.dimensions.min}</span>
          </div>
          <div>
            <span className="block text-sm">Max</span>
            <span className="neon-text">{imageStats.dimensions.max}</span>
          </div>
          <div>
            <span className="block text-sm">Avg</span>
            <span className="neon-text">{imageStats.dimensions.avg}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-neon-text mb-2">Color Mode:</h3>
        <span className="neon-text">{imageStats.colorMode}</span>
      </div>
    </div>
  );
};

export default StatisticsSection;
