
import React from 'react';
import DownloadIcon from './icons/DownloadIcon';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error }) => {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'youtube-thumbnail.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SkeletonLoader: React.FC = () => (
    <div className="w-full aspect-video bg-dark-input rounded-lg animate-pulse"></div>
  );

  const InitialState: React.FC = () => (
    <div className="w-full aspect-video bg-dark-input rounded-lg flex items-center justify-center">
      <div className="text-center text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-300">Image Output</h3>
        <p className="mt-1 text-sm text-gray-500">Your generated thumbnail will appear here.</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
        {isLoading ? (
          <SkeletonLoader />
        ) : error ? (
           <div className="w-full h-full bg-red-900/20 text-red-300 flex items-center justify-center p-4">
             <div className="text-center">
                <p className="font-semibold">Generation Failed</p>
                <p className="text-sm text-red-400 mt-1">{error}</p>
             </div>
           </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Generated YouTube Thumbnail" className="w-full h-full object-cover" />
        ) : (
          <InitialState />
        )}
      </div>

      {imageUrl && !isLoading && (
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          <DownloadIcon className="w-5 h-5" />
          <span>Download Image</span>
        </button>
      )}
    </div>
  );
};

export default ImageDisplay;
