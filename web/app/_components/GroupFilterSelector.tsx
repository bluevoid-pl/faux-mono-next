import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bluevoid-test/ui/select";
import { groups } from "../_utils/group";

const groupNames = Object.keys(groups).map((value) => ({
  id: value,
  value,
}));

interface GroupFilterSelectorProps {
  onValueChange: (value: string) => void;
  value: string;
}
function GroupFilterSelector(props: GroupFilterSelectorProps) {
  const { onValueChange, value } = props;
  return (
    <div>
      <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {groupNames.map((item) => (
            <SelectItem key={item.id} value={item.value}>
              Sektor {item.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default GroupFilterSelector;
