
import React from 'react';
import { 
  ClassDistribution, 
  ImageStats, 
  TabularStats, 
  TextStats,
  AudioStats,
  VideoStats,
  DatasetType
} from './types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StatisticsSectionProps {
  dataType: DatasetType;
  classDistribution: ClassDistribution[];
  imageStats?: ImageStats;
  tabularStats?: TabularStats;
  textStats?: TextStats;
  audioStats?: AudioStats;
  videoStats?: VideoStats;
}

const StatisticsSection = ({ 
  dataType,
  classDistribution, 
  imageStats,
  tabularStats,
  textStats,
  audioStats,
  videoStats
}: StatisticsSectionProps) => {
  // Calculate max count for bars scaling
  const maxCount = Math.max(...classDistribution.map(c => c.count));
  
  return (
    <div className="glass-panel rounded-lg p-4 flex-1 min-h-[300px] overflow-auto">
      <h2 className="text-lg font-medium mb-4 neon-text">Summary</h2>
      
      {classDistribution.length > 0 && (
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
      )}
      
      {dataType === 'image' && imageStats && (
        <>
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
        </>
      )}

      {dataType === 'tabular' && tabularStats && (
        <>
          <div className="mt-4">
            <h3 className="text-neon-text mb-2">Column Statistics:</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Column</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Missing</TableHead>
                    <TableHead>Unique</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tabularStats.columns.map((col) => (
                    <TableRow key={col.name}>
                      <TableCell className="font-medium">{col.name}</TableCell>
                      <TableCell className="text-neon-cyan">{col.type}</TableCell>
                      <TableCell>{col.missing}</TableCell>
                      <TableCell>{col.unique || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-sm">Rows</span>
                <span className="neon-text">{tabularStats.rowCount.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-sm">Columns</span>
                <span className="neon-text">{tabularStats.columnCount}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {dataType === 'text' && textStats && (
        <>
          <div className="mt-4">
            <h3 className="text-neon-text mb-2">Text Statistics:</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="block text-sm">Avg Length</span>
                <span className="neon-text">{textStats.averageLength} chars</span>
              </div>
              <div>
                <span className="block text-sm">Encoding</span>
                <span className="neon-text">{textStats.encoding}</span>
              </div>
              {textStats.languages && (
                <div>
                  <span className="block text-sm">Languages</span>
                  <span className="neon-text">{textStats.languages.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {dataType === 'audio' && audioStats && (
        <>
          <div className="mt-4">
            <h3 className="text-neon-text mb-2">Audio Statistics:</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="block text-sm">Avg Duration</span>
                <span className="neon-text">{audioStats.averageDuration}</span>
              </div>
              <div>
                <span className="block text-sm">Sample Rate</span>
                <span className="neon-text">{audioStats.sampleRate}</span>
              </div>
              <div>
                <span className="block text-sm">Channels</span>
                <span className="neon-text">{audioStats.channels}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {dataType === 'video' && videoStats && (
        <>
          <div className="mt-4">
            <h3 className="text-neon-text mb-2">Video Statistics:</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="block text-sm">Avg Duration</span>
                <span className="neon-text">{videoStats.averageDuration}</span>
              </div>
              <div>
                <span className="block text-sm">Resolution</span>
                <span className="neon-text">{videoStats.resolution}</span>
              </div>
              <div>
                <span className="block text-sm">Frame Rate</span>
                <span className="neon-text">{videoStats.frameRate}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatisticsSection;
