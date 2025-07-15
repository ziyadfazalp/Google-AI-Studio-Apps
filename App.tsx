import React, { useState, useCallback } from 'react';
import PromptForm from './components/PromptForm';
import ImageDisplay from './components/ImageDisplay';
import { generateThumbnail } from './services/geminiService';

const App: React.FC = () => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const imageUrl = await generateThumbnail(prompt);
      setGeneratedImage(imageUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans">
      <header className="p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
          AI YouTube Thumbnail Generator
        </h1>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Controls */}
          <div className="bg-dark-card p-6 rounded-xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-6 text-gray-100">1. Enter Your Details</h2>
            <PromptForm onGenerate={handleGenerate} isLoading={isLoading} />
          </div>

          {/* Right Column: Display */}
          <div className="bg-dark-card p-6 rounded-xl shadow-2xl">
             <h2 className="text-xl font-semibold mb-6 text-gray-100">2. Your AI-Generated Thumbnail</h2>
            <ImageDisplay imageUrl={generatedImage} isLoading={isLoading} error={error} />
          </div>

        </div>

        <footer className="text-center text-gray-500 text-sm mt-12 pb-4">
            <p>Powered by Google Gemini. Designed for 16:9 aspect ratio.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;