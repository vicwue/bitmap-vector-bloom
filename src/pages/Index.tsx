import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import FileUploader from '@/components/FileUploader';
import VectorizeButton from '@/components/VectorizeButton';
import VectorizeSettings from '@/components/VectorizeSettings';
import MatrixPreview from '@/components/MatrixPreview';
import { vectorizeImage, downloadSvg, defaultVectorizeSettings } from '@/utils/vectorizer';
import { Sparkles, Image } from 'lucide-react';
import type { VectorizeSettings as VectorizeSettingsType } from '@/components/VectorizeSettings';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [vectorSvg, setVectorSvg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState<VectorizeSettingsType>(defaultVectorizeSettings);
  const [isLivePreview, setIsLivePreview] = useState(true);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setVectorSvg(null);
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      handleVectorize();
    } else {
      setImageUrl(null);
    }
  };

  const handleVectorize = async () => {
    if (!selectedFile) {
      toast.error('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    
    try {
      const imageUrl = URL.createObjectURL(selectedFile);
      const svg = await vectorizeImage(imageUrl, settings);
      setVectorSvg(svg);
      toast.success('Image vectorized successfully!');
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('Vectorization error:', error);
      toast.error('Failed to vectorize image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSettingsChange = (newSettings: VectorizeSettingsType) => {
    setSettings(newSettings);
    if (isLivePreview) {
      handleVectorize();
    }
  };

  const handleDownload = () => {
    if (vectorSvg && selectedFile) {
      const fileName = selectedFile.name.replace(/\.[^/.]+$/, '') + '.svg';
      downloadSvg(vectorSvg, fileName);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary-500" />
          Bitmap Vectorizer
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Transform your bitmap images into crisp, scalable vector graphics
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5 text-primary-500" />
            Image Upload & Vectorization
          </CardTitle>
          <CardDescription>
            Upload a bitmap image (PNG, JPG, BMP) and convert it to a vector SVG
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <FileUploader onFileSelect={handleFileSelect} />
            
            {selectedFile && (
              <>
                <VectorizeSettings
                  settings={settings}
                  onSettingsChange={handleSettingsChange}
                />
                <VectorizeButton 
                  onVectorize={handleVectorize}
                  isProcessing={isProcessing}
                  hasVectorResult={!!vectorSvg}
                  onDownload={handleDownload}
                  isLivePreview={isLivePreview}
                  onLivePreviewChange={setIsLivePreview}
                  className="mt-4"
                />
              </>
            )}

            {vectorSvg && (
              <div className="mt-6 border rounded-lg p-4 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Vector Preview</h3>
                <div 
                  className="bg-white p-4 rounded border flex items-center justify-center min-h-[300px]"
                >
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{
                      __html: vectorSvg.replace(
                        '<svg',
                        '<svg style="width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;"'
                      )
                    }}
                  />
                </div>
              </div>
            )}

            {imageUrl && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Matrix Preview</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Preview showing different threshold and optimization settings combinations
                </p>
                <MatrixPreview 
                  imageUrl={imageUrl} 
                  baseSettings={settings} 
                  onSettingsSelect={(newSettings) => {
                    setSettings(newSettings);
                    toast.success('Settings updated from preview selection');
                  }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default Index;
