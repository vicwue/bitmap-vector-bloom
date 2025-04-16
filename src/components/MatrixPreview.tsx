import React, { useState, useEffect } from 'react';
import { vectorizeImage } from '@/utils/vectorizer';
import type { VectorizeSettings } from '@/components/VectorizeSettings';
import { Loader2 } from 'lucide-react';

interface MatrixPreviewProps {
  imageUrl: string;
  baseSettings: VectorizeSettings;
  onSettingsSelect: (settings: VectorizeSettings) => void;
}

const MatrixPreview = ({ imageUrl, baseSettings, onSettingsSelect }: MatrixPreviewProps) => {
  const [previews, setPreviews] = useState<(string | null)[]>(Array(25).fill(null));
  const [isLoading, setIsLoading] = useState(false);
  const [thresholdValues, setThresholdValues] = useState<number[]>([]);
  const [noiseRemovalValues, setNoiseRemovalValues] = useState<number[]>([]);

  useEffect(() => {
    const generatePreviews = async () => {
      setIsLoading(true);
      const newPreviews: (string | null)[] = [];
      
      // Generate 5 threshold values (65 to 192, evenly spaced)
      const thresholds = Array.from({ length: 5 }, (_, i) => 
        Math.round(65 + (i * (192 - 65)) / 4)
      );
      setThresholdValues(thresholds);
      
      // Generate 5 noise removal values (0 to 10, evenly spaced)
      const noiseRemovalValues = Array.from({ length: 5 }, (_, i) => 
        Number((i * 2.5).toFixed(1))
      );
      setNoiseRemovalValues(noiseRemovalValues);

      try {
        for (let row = 0; row < 5; row++) {
          for (let col = 0; col < 5; col++) {
            const settings: VectorizeSettings = {
              ...baseSettings,
              threshold: thresholds[col],
              turdSize: noiseRemovalValues[row],
            };
            
            const svg = await vectorizeImage(imageUrl, settings);
            newPreviews[row * 5 + col] = svg;
          }
        }
        setPreviews(newPreviews);
      } catch (error) {
        console.error('Error generating previews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (imageUrl) {
      generatePreviews();
    }
  }, [imageUrl, baseSettings]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Column headers (threshold values) */}
      <div className="grid grid-cols-5 gap-2 mb-1 ml-[4.5rem]">
        {thresholdValues.map((threshold, i) => (
          <div key={i} className="text-xs text-center font-mono text-gray-600">
            th: {threshold}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Row headers (noise removal values) */}
        <div className="flex flex-col justify-around mr-2 text-right">
          {noiseRemovalValues.map((noiseRemoval, i) => (
            <div key={i} className="text-xs font-mono text-gray-600 h-[20%] flex items-center justify-end w-16">
              noise: {noiseRemoval}
            </div>
          ))}
        </div>

        {/* Matrix grid */}
        <div className="grid grid-cols-5 gap-2 flex-1">
          {previews.map((svg, index) => {
            const row = Math.floor(index / 5);
            const col = index % 5;
            const settings: VectorizeSettings = {
              ...baseSettings,
              threshold: thresholdValues[col],
              turdSize: noiseRemovalValues[row],
            };

            return (
              <div 
                key={index} 
                className="aspect-square border rounded-lg overflow-hidden bg-white p-2 cursor-pointer hover:border-primary-500 transition-colors"
                onClick={() => onSettingsSelect(settings)}
              >
                {svg && (
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{
                      __html: svg.replace(
                        '<svg',
                        '<svg style="width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;"'
                      )
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatrixPreview; 