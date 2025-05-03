
export type DatasetType = 'image' | 'tabular' | 'text' | 'audio' | 'video';

export interface DatasetInfo {
  name: string;
  type: DatasetType;
  itemCount: number;
  fileFormat?: string;
}

// For image datasets
export interface ImageStats {
  dimensions: {
    min: string;
    max: string;
    avg: string;
  };
  colorMode: string;
}

// For tabular datasets
export interface TabularStats {
  columns: {
    name: string;
    type: string;
    missing: number;
    unique?: number;
  }[];
  rowCount: number;
  columnCount: number;
}

// For text datasets
export interface TextStats {
  averageLength: number;
  languages?: string[];
  encoding: string;
}

// For audio datasets
export interface AudioStats {
  averageDuration: string;
  sampleRate: string;
  channels: number;
}

// For video datasets
export interface VideoStats {
  averageDuration: string;
  resolution: string;
  frameRate: string;
}

export interface ClassDistribution {
  name: string;
  count: number;
}

export interface SampleImage {
  id: number;
  src: string;
  label: string;
}

export interface TabularSample {
  id: number;
  row: Record<string, string | number>;
}

export interface TextSample {
  id: number;
  content: string;
  label?: string;
}

export interface AudioSample {
  id: number;
  src: string;
  duration: string;
  label?: string;
}

export interface VideoSample {
  id: number;
  src: string;
  thumbnail?: string;
  duration: string;
  label?: string;
}
