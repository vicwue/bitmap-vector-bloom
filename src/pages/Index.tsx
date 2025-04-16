
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import FileUploader from '@/components/FileUploader';
import VectorizeButton from '@/components/VectorizeButton';
import { vectorizeImage, downloadSvg } from '@/utils/vectorizer';
import { Sparkles, Image } from 'lucide-react';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [vectorSvg, setVectorSvg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setVectorSvg(null);
  };

  const handleVectorize = async () => {
    if (!selectedFile) {
      toast.error('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Create a URL for the selected file
      const imageUrl = URL.createObjectURL(selectedFile);
      
      // Vectorize the image
      const svg = await vectorizeImage(imageUrl);
      setVectorSvg(svg);
      toast.success('Image vectorized successfully!');
      
      // Release the object URL
      URL.revokeObjectURL(imageUrl);
    } catch (error) {
      console.error('Vectorization error:', error);
      toast.error('Failed to vectorize image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (vectorSvg && selectedFile) {
      const fileName = selectedFile.name.replace(/\.[^/.]+$/, '') + '.svg';
      downloadSvg(vectorSvg, fileName);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
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
                <VectorizeButton 
                  onVectorize={handleVectorize}
                  isProcessing={isProcessing}
                  hasVectorResult={!!vectorSvg}
                  onDownload={handleDownload}
                  className="mt-4"
                />
              )}

              {vectorSvg && (
                <div className="mt-6 border rounded-lg p-4 bg-gray-50">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Vector Preview</h3>
                  <div 
                    className="bg-white p-4 rounded border"
                    dangerouslySetInnerHTML={{ __html: vectorSvg }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Supported formats: PNG, JPG, JPEG, BMP, GIF</p>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Index;
