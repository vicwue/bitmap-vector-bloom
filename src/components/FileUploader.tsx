
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  className?: string;
}

const FileUploader = ({ onFileSelect, className }: FileUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setCurrentFile(file);
      onFileSelect(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.bmp', '.gif']
    },
    maxFiles: 1
  });

  const clearFile = () => {
    setPreviewUrl(null);
    setCurrentFile(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {!previewUrl ? (
        <div 
          {...getRootProps()} 
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
            isDragActive 
              ? "border-primary-500 bg-primary-50" 
              : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-primary-100 rounded-full">
              <Upload className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">Drag & drop your image here</p>
              <p className="text-sm text-gray-500 mt-1">Supports PNG, JPG, JPEG, BMP, GIF</p>
            </div>
            <Button 
              type="button" 
              className="mt-4 bg-primary-600 hover:bg-primary-700"
            >
              Select File
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative border rounded-lg overflow-hidden">
          <div className="absolute top-2 right-2 z-10">
            <Button 
              variant="destructive" 
              size="icon" 
              onClick={clearFile}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4">
            <div className="bg-gray-50 rounded-md overflow-hidden">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-[400px] mx-auto object-contain" 
              />
            </div>
            <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
              <File className="h-4 w-4" />
              <span className="truncate max-w-[250px]">{currentFile?.name}</span>
              <span>({(currentFile?.size ? (currentFile.size / 1024).toFixed(2) : 0)} KB)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
