
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

export interface VectorizeSettings {
  turdSize: number;
  alphaMax: number;
  threshold: number;
  optCurve: boolean;
  optTolerance: number;
  color: string;
  background: string;
}

interface VectorizeSettingsProps {
  settings: VectorizeSettings;
  onSettingsChange: (settings: VectorizeSettings) => void;
}

const VectorizeSettings = ({ settings, onSettingsChange }: VectorizeSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateSetting = <K extends keyof VectorizeSettings>(
    key: K,
    value: VectorizeSettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200">
        Vectorization Settings
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 mt-4 px-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="threshold">Threshold ({settings.threshold})</Label>
            <Slider
              id="threshold"
              min={1}
              max={255}
              step={1}
              value={[settings.threshold]}
              onValueChange={([value]) => updateSetting('threshold', value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="turdSize">Noise Removal ({settings.turdSize})</Label>
            <Slider
              id="turdSize"
              min={0}
              max={10}
              step={0.1}
              value={[settings.turdSize]}
              onValueChange={([value]) => updateSetting('turdSize', value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alphaMax">Corner Threshold ({settings.alphaMax})</Label>
            <Slider
              id="alphaMax"
              min={0}
              max={1.5}
              step={0.1}
              value={[settings.alphaMax]}
              onValueChange={([value]) => updateSetting('alphaMax', value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="optTolerance">Optimization Tolerance ({settings.optTolerance})</Label>
            <Slider
              id="optTolerance"
              min={0}
              max={1}
              step={0.1}
              value={[settings.optTolerance]}
              onValueChange={([value]) => updateSetting('optTolerance', value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="optCurve"
              checked={settings.optCurve}
              onCheckedChange={(checked) => updateSetting('optCurve', checked)}
            />
            <Label htmlFor="optCurve">Optimize Curves</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Foreground Color</Label>
            <Input
              id="color"
              type="color"
              value={settings.color}
              onChange={(e) => updateSetting('color', e.target.value)}
              className="h-10 w-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="background">Background Color</Label>
            <Input
              id="background"
              type="color"
              value={settings.background}
              onChange={(e) => updateSetting('background', e.target.value)}
              className="h-10 w-20"
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default VectorizeSettings;
