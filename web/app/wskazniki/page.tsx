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
import { useMemo, useState } from "react";
import { orpc } from "@/lib/orpc";
import { Chart } from "../_components/Chart";
import { useCacheDataTransform } from "../_hooks/useCacheDataTransform";
import { sections2 } from "../_utils/pkd";

export type DataLegend = {
  id: string;
  label: string;
  enabled: boolean;
};

export function WskaznikiPage() {
  const { newData, legendX, legendY } = useCacheDataTransform(
    sections2,
    "firms",
  );

  // const toggleItem = (id: string) => {
  //   setLegend((items) =>
  //     items.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)),
  //   );
  // };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col bg-background lg:flex-row">
      <div className="flex-1 p-4 lg:p-6">
        <Chart data={newData} dataLegend={legendY} />
      </div>

      <div className="w-full border-border border-l bg-blue-100 lg:w-80 xl:w-96">
        <div className="space-y-6 p-4 lg:p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filtry PKD</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-3.5rem)]">
                <div className="space-y-4">
                  {legendY?.map((item, index) => (
                    <div className="flex items-center space-x-3" key={item.id}>
                      <Checkbox
                        checked={item.enabled}
                        id={item.id}
                        // onCheckedChange={() => toggleItem(item.id)}
                      />
                      <Label
                        className="flex cursor-pointer items-center gap-2 font-normal"
                        htmlFor={item.id}
                      >
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: `var(--chart-${(index % 10) + 1})`,
                          }}
                        />
                        {item.label}
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
