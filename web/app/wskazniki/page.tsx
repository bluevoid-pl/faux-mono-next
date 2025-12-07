"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bluevoid-test/ui/card";
import { Checkbox } from "@bluevoid-test/ui/checkbox";
import { Label } from "@bluevoid-test/ui/label";
import { ScrollArea } from "@bluevoid-test/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";
import { orpc } from "@/lib/orpc";
import { Chart } from "../_components/Chart";
import GroupFilterSelector from "../_components/GroupFilterSelector";
import LevelSelector from "../_components/LevelSelector";
import {
  type Level,
  useCacheDataTransform,
} from "../_hooks/useCacheDataTransform";
import { group_desc, groups } from "../_utils/group";
import { sections2 } from "../_utils/pkd";

const pkd_ids_groups = Object.keys(groups)
  .reduce((arr: string[], next: string) => {
    return [...arr, ...groups[next as keyof typeof groups]];
  }, [])
  .map((v) => ({ id: v, label: v, enabled: false }));
export type DataLegend = {
  id: string;
  label: string;
  enabled: boolean;
};

// TODO: preload some data
// TODO: precache all groupselections
// TODO: unshit this code

export function WskaznikiPage() {
  const uuid = useId();
  const [level, setLevel] = useState<Level>("group");
  const [selection, setSelection] = useState<DataLegend[]>(pkd_ids_groups);
  const [groupFilter, setGroupFilter] = useState<string>("A");

  const { newData, legendX, legendY } = useCacheDataTransform(
    selection.filter((v) => v.enabled).map((v) => v.label),
    "firms",
  );
  if (!newData) return null;

  const toggleItem = (label: string) => {
    setSelection((items) =>
      items.map((f) => (f.label === label ? { ...f, enabled: !f.enabled } : f)),
    );
  };

  const onGroupFilterChange = (groupFilter: string) => {
    setGroupFilter(groupFilter);
    setSelection((prev) =>
      prev.map((item) => ({
        ...item,
        enabled: groups[groupFilter as keyof typeof groups].includes(
          item.label,
        ),
      })),
    );
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: HACK
  useEffect(() => {
    if (level === "group") {
      onGroupFilterChange("A");
    }
  }, []);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col bg-background lg:flex-row">
      <div className="flex-1 p-4 lg:p-6">
        <LevelSelector onValueChange={() => {}} value={level} />
        {level === "group" && (
          <GroupFilterSelector
            onValueChange={onGroupFilterChange}
            value={groupFilter}
          />
        )}
        <Chart data={newData} dataLegend={selection} />
      </div>

      <div className="w-full border-border border-l bg-blue-100 lg:w-80 xl:w-96">
        <div className="space-y-6 p-4 lg:p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filtry PKD</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-3.5rem-9.5rem)]">
                <div className="space-y-4">
                  {selection?.map((item, index) => (
                    <div className="flex items-center space-x-3" key={item.id}>
                      <Checkbox
                        checked={item.enabled}
                        id={`${uuid}${item.id}`}
                        onCheckedChange={() => toggleItem(item.label)}
                      />
                      <Label
                        className="flex cursor-pointer items-center gap-2 font-normal"
                        htmlFor={`${uuid}${item.id}`}
                      >
                        <div
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{
                            backgroundColor: `var(--chart-${(index % 10) + 1})`,
                          }}
                        />
                        {item.label}{" "}
                        <span className="text-sm lowercase first-letter:capitalize">
                          {group_desc?.[
                            item.label as keyof typeof group_desc
                          ] ?? ""}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WskaznikiPage;
