import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PromptInput } from './components/PromptInput';
import { MoodSelector } from './components/MoodSelector';
import { GenerateButton } from './components/GenerateButton';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImage } from './services/geminiService';
import { Mood } from './types';
import { MOODS } from './constants';

export default function App(): React.ReactNode {
  const [prompt, setPrompt] = useState<string>('A synthwave landscape with a retro car driving into the sunset.');
  const [mood, setMood] = useState<Mood>(Mood.Chill);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt to generate an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImage(prompt, mood);
      setGeneratedImage(imageUrl);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error(errorMessage);
      setError(`Failed to generate image. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, mood]);

  return (
    <div className="min-h-screen bg-[#0B0E13] text-white font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-start">
            <div className="w-full flex flex-col gap-6">
                <h2 className="text-4xl font-bold text-slate-100">Create your art</h2>
                
                <div className="bg-[#171c26] rounded-xl p-5 flex flex-col gap-3">
                  <label htmlFor="prompt" className="font-medium text-slate-400 text-sm">1. Describe your vision</label>
                  <PromptInput value={prompt} onChange={setPrompt} />
                </div>

                <div className="bg-[#171c26] rounded-xl p-5 flex flex-col gap-4">
                  <label className="font-medium text-slate-400 text-sm">2. Select the mood</label>
                  <MoodSelector moods={MOODS} selectedMood={mood} onSelectMood={setMood} />
                </div>
                
                <GenerateButton isLoading={isLoading} onClick={handleGenerateClick} />

                {error && (
                  <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
            </div>
            
            <div className="w-full lg:sticky lg:top-24">
              <ImageDisplay imageUrl={generatedImage} isLoading={isLoading} />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}