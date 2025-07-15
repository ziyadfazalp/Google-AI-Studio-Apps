import React, { useState } from 'react';
import { THUMBNAIL_STYLES } from '../constants';
import SparklesIcon from './icons/SparklesIcon';

interface PromptFormProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState<string>('');

  const handleStyleClick = (styleSuffix: string) => {
    setPrompt((prev) => (prev.trim().endsWith(',') ? `${prev.trim()} ${styleSuffix.substring(2)}` : `${prev.trim()}${styleSuffix}`));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Video Title or Thumbnail Idea
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Unboxing the new SuperPhone Pro Max"
          className="w-full h-32 p-4 bg-dark-input border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-brand-blue focus:outline-none transition-all"
          disabled={isLoading}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">Add a Style (Optional)</h3>
        <div className="flex flex-wrap gap-2">
          {THUMBNAIL_STYLES.map((style) => (
            <button
              key={style.name}
              type="button"
              onClick={() => handleStyleClick(style.prompt_suffix)}
              disabled={isLoading}
              className="px-4 py-2 bg-dark-input text-gray-300 text-sm font-semibold rounded-full hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <SparklesIcon className="w-6 h-6" />
            <span>Generate Thumbnail</span>
          </>
        )}
      </button>
    </form>
  );
};

export default PromptForm;