
import React, { useState } from 'react';
import { DatasetType, SampleImage, TabularSample, TextSample, AudioSample, VideoSample } from './types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DataPreviewSectionProps {
  dataType: DatasetType;
  images?: SampleImage[];
  tabularData?: TabularSample[];
  textData?: TextSample[];
  audioData?: AudioSample[];
  videoData?: VideoSample[];
  columns?: string[];
}

const DataPreviewSection = ({ 
  dataType,
  images,
  tabularData,
  textData,
  audioData,
  videoData,
  columns = []
}: DataPreviewSectionProps) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = dataType === 'tabular' ? 5 : 9;
  
  // Get the correct data based on type
  const getData = () => {
    switch (dataType) {
      case 'image':
        return images || [];
      case 'tabular':
        return tabularData || [];
      case 'text':
        return textData || [];
      case 'audio':
        return audioData || [];
      case 'video':
        return videoData || [];
      default:
        return [];
    }
  };

  const data = getData();
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
  const renderDataPreview = () => {
    switch (dataType) {
      case 'image':
        return (
          <div className="grid grid-cols-3 gap-4">
            {(currentItems as SampleImage[]).map((image) => (
              <div 
                key={image.id}
                className={`relative cursor-pointer ${selectedItem === image.id ? 'neon-border ring-1 ring-neon-blue' : 'border border-neon-panel'}`}
                onClick={() => setSelectedItem(image.id)}
              >
                <img 
                  src={image.src} 
                  alt={image.label} 
                  className="w-full h-24 object-cover"
                />
                <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs text-center py-1">
                  {image.label}
                </span>
              </div>
            ))}
          </div>
        );

      case 'tabular':
        if (!tabularData || tabularData.length === 0) return <div className="text-center py-6 text-neon-text">No data available</div>;
        
        return (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col, i) => (
                    <TableHead key={i} className="text-neon-cyan">{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {(currentItems as TabularSample[]).map((item) => (
                  <TableRow 
                    key={item.id}
                    className={selectedItem === item.id ? 'bg-neon-blue/10 neon-border' : ''}
                    onClick={() => setSelectedItem(item.id)}
                  >
                    {columns.map((col, i) => (
                      <TableCell key={i}>{item.row[col]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-3">
            {(currentItems as TextSample[]).map((item) => (
              <div 
                key={item.id}
                className={`p-3 text-sm rounded ${selectedItem === item.id ? 'bg-neon-blue/10 neon-border' : 'bg-neon-panel'}`}
                onClick={() => setSelectedItem(item.id)}
              >
                <p className="text-neon-text line-clamp-3">{item.content}</p>
                {item.label && <span className="block mt-1 text-xs text-neon-cyan">{item.label}</span>}
              </div>
            ))}
          </div>
        );

      case 'audio':
        return (
          <div className="grid grid-cols-3 gap-4">
            {(currentItems as AudioSample[]).map((item) => (
              <div 
                key={item.id}
                className={`p-3 relative cursor-pointer ${selectedItem === item.id ? 'neon-border ring-1 ring-neon-blue' : 'border border-neon-panel'}`}
                onClick={() => setSelectedItem(item.id)}
              >
                <div className="flex flex-col items-center">
                  <audio controls className="w-full mb-2 h-10">
                    <source src={item.src} />
                  </audio>
                  <span className="text-xs text-neon-cyan">{item.duration}</span>
                  {item.label && <span className="text-xs text-neon-text">{item.label}</span>}
                </div>
              </div>
            ))}
          </div>
        );

      case 'video':
        return (
          <div className="grid grid-cols-3 gap-4">
            {(currentItems as VideoSample[]).map((item) => (
              <div 
                key={item.id}
                className={`relative cursor-pointer ${selectedItem === item.id ? 'neon-border ring-1 ring-neon-blue' : 'border border-neon-panel'}`}
                onClick={() => setSelectedItem(item.id)}
              >
                <img 
                  src={item.thumbnail || item.src} 
                  alt={item.label || `Video ${item.id}`} 
                  className="w-full h-24 object-cover"
                />
                <span className="absolute top-0 right-0 bg-black/70 text-xs px-1">{item.duration}</span>
                {item.label && (
                  <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs text-center py-1">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return <div className="text-center py-6 text-neon-text">No preview available</div>;
    }
  };

  // Title text based on data type
  const getPreviewTitle = () => {
    switch (dataType) {
      case 'image': return 'Sample Images';
      case 'tabular': return 'Data Preview';
      case 'text': return 'Text Samples';
      case 'audio': return 'Audio Samples';
      case 'video': return 'Video Samples';
      default: return 'Data Preview';
    }
  };
  
  return (
    <div className="glass-panel-alt rounded-lg p-4 flex-1 min-h-[300px] flex flex-col">
      <h2 className="text-lg font-medium mb-4 neon-text">{getPreviewTitle()}</h2>
      
      <div className="flex-1 overflow-auto mb-4">
        {renderDataPreview()}
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => Math.max(prev - 1, 1));
                }}
                className={`neon-text ${page === 1 ? 'opacity-50 pointer-events-none' : ''}`}
              />
            </PaginationItem>
            
            {/* Show page numbers if not too many */}
            {totalPages <= 5 && Array.from({length: totalPages}, (_, i) => i + 1).map(pageNum => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(pageNum);
                  }}
                  isActive={page === pageNum}
                  className="neon-text"
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => Math.min(prev + 1, totalPages));
                }}
                className={`neon-text ${page === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default DataPreviewSection;
