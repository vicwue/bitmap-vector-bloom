
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Download, Loader2, RefreshCw } from 'lucide-react';

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
    <div className={`${className} flex gap-2`}>
      {!hasVectorResult ? (
        <Button
          onClick={() => onVectorize()}
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700"
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
        <>
          <Button
            onClick={() => onVectorize()}
            disabled={isProcessing}
            variant="outline"
            className="flex-1"
          >
            {isProcessing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Preview
          </Button>
          <Button
            onClick={onDownload}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Download SVG
          </Button>
        </>
      )}
    </div>
  );
};

export default VectorizeButton;
