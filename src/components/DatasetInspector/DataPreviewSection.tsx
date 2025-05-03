
import React, { useState } from 'react';

interface SampleImage {
  id: number;
  src: string;
  label: string;
}

interface DataPreviewSectionProps {
  images: SampleImage[];
}

const DataPreviewSection = ({ images }: DataPreviewSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const imagesPerPage = 9;
  
  // Pagination logic would go here for handling larger datasets
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const currentImages = images.slice((page - 1) * imagesPerPage, page * imagesPerPage);
  
  return (
    <div className="glass-panel-alt rounded-lg p-4 flex-1 min-h-[300px]">
      <h2 className="text-lg font-medium mb-4 neon-text">Sample Images</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {currentImages.map((image) => (
          <div 
            key={image.id}
            className={`relative cursor-pointer ${selectedImage === image.id ? 'neon-border ring-1 ring-neon-blue' : 'border border-neon-panel'}`}
            onClick={() => setSelectedImage(image.id)}
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
      
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
        <button 
          className="neon-btn"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          &lt; Prev
        </button>
        
        <button 
          className="neon-btn"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default DataPreviewSection;
