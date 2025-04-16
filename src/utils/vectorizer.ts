
import * as potrace from 'potrace';
import { saveAs } from 'file-saver';

// Function to vectorize an image using potrace
export const vectorizeImage = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    potrace.trace(imageUrl, {
      turdSize: 2,
      turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY,
      alphaMax: 1,
      optCurve: true,
      optTolerance: 0.2,
      threshold: 128,
      blackOnWhite: true,
      color: '#000000',
      background: '#FFFFFF',
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
