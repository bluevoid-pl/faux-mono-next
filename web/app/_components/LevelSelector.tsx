import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bluevoid-test/ui/select";
import type { Level } from "../_hooks/useCacheDataTransform";

interface LevelSelectorProps {
  onValueChange: (value: Level) => void;
  value: Level;
}
function LevelSelector(props: LevelSelectorProps) {
  const { onValueChange, value } = props;
  return (
    <div>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sektor">Sektor</SelectItem>
          <SelectItem value="group">Group</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default LevelSelector;
