
import * as potrace from 'potrace';
import { saveAs } from 'file-saver';
import type { VectorizeSettings } from '@/components/VectorizeSettings';

export const defaultVectorizeSettings: VectorizeSettings = {
  turdSize: 2,
  alphaMax: 1,
  optCurve: true,
  optTolerance: 0.2,
  threshold: 128,
  color: '#000000',
  background: '#FFFFFF',
};

// Function to vectorize an image using potrace
export const vectorizeImage = (imageUrl: string, settings: VectorizeSettings = defaultVectorizeSettings): Promise<string> => {
  return new Promise((resolve, reject) => {
    potrace.trace(imageUrl, {
      ...settings,
      turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
      blackOnWhite: true,
    }, (err: Error | null, svg: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(svg);
      }
    });
  });
};

// Function to download the vectorized image
export const downloadSvg = (svgData: string, fileName: string = 'vectorized-image.svg') => {
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  saveAs(blob, fileName);
};
