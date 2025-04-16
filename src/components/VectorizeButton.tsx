import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Download, Loader2, RefreshCw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface VectorizeButtonProps {
  onVectorize: () => Promise<void>;
  isProcessing: boolean;
  hasVectorResult: boolean;
  onDownload: () => void;
  className?: string;
  isLivePreview: boolean;
  onLivePreviewChange: (enabled: boolean) => void;
}

const VectorizeButton = ({ 
  onVectorize, 
  isProcessing, 
  hasVectorResult,
  onDownload,
  className,
  isLivePreview,
  onLivePreviewChange
}: VectorizeButtonProps) => {
  return (
    <div className={`${className} space-y-4`}>
      <div className="flex gap-2">
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
            {!isLivePreview && (
              <Button
                onClick={() => onVectorize()}
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700"
              >
                {isProcessing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Vectorize this
              </Button>
            )}
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
      
      {hasVectorResult && (
        <div className="flex items-center space-x-2">
          <Switch
            id="live-preview"
            checked={isLivePreview}
            onCheckedChange={onLivePreviewChange}
          />
          <Label htmlFor="live-preview">Live Preview</Label>
        </div>
      )}
    </div>
  );
};

export default VectorizeButton;
