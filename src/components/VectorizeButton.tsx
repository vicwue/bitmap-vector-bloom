
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Download, Loader2 } from 'lucide-react';

interface VectorizeButtonProps {
  onVectorize: () => Promise<void>;
  isProcessing: boolean;
  hasVectorResult: boolean;
  onDownload: () => void;
  className?: string;
}

const VectorizeButton = ({ 
  onVectorize, 
  isProcessing, 
  hasVectorResult,
  onDownload,
  className 
}: VectorizeButtonProps) => {
  return (
    <div className={className}>
      {!hasVectorResult ? (
        <Button
          onClick={() => onVectorize()}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Vectorize Image
            </>
          )}
        </Button>
      ) : (
        <Button
          onClick={onDownload}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
        >
          <Download className="mr-2 h-4 w-4" />
          Download SVG
        </Button>
      )}
    </div>
  );
};

export default VectorizeButton;
