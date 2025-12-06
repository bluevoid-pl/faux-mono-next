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
import { useMemo, useState } from "react";
import { DateRangeSelector } from "./DateRange";
import { GrowthChart } from "./GrowthChart";

export type GrowthFactor = {
	id: string;
	label: string;
	color: string;
	enabled: boolean;
};

const initialGrowthFactors: GrowthFactor[] = [
	{ id: "revenue", label: "Revenue", color: "#3b82f6", enabled: true },
	{ id: "employees", label: "Employees", color: "#8b5cf6", enabled: true },
	{
		id: "marketShare",
		label: "Market Share",
		color: "#06b6d4",
		enabled: false,
	},
	{ id: "profit", label: "Profit", color: "#10b981", enabled: false },
	{ id: "assets", label: "Assets", color: "#f59e0b", enabled: false },
];

export function GrowthDashboard() {
	const [growthFactors, setGrowthFactors] =
		useState<GrowthFactor[]>(initialGrowthFactors);
	const [dateRange, setDateRange] = useState({
		start: "2020-01",
		end: "2024-12",
	});

	const toggleFactor = (id: string) => {
		setGrowthFactors((factors) =>
			factors.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)),
		);
	};

	const enabledFactors = useMemo(
		() => growthFactors.filter((f) => f.enabled),
		[growthFactors],
	);

	return (
		<div className="flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)] bg-background">
			<div className="flex-1 p-4 lg:p-6">
				<GrowthChart factors={enabledFactors} dateRange={dateRange} />
			</div>

			<div className="w-full lg:w-80 xl:w-96 border-l border-border bg-blue-100">
				<div className="p-4 lg:p-6 space-y-6">
					<div>
						<h2 className="text-lg font-semibold mb-4">Parameters</h2>
					</div>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Date Range</CardTitle>
							<CardDescription>
								Select the time period to analyze
							</CardDescription>
						</CardHeader>
						<CardContent>
							<DateRangeSelector
								dateRange={dateRange}
								onChange={setDateRange}
							/>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Growth Factors</CardTitle>
							<CardDescription>
								Select metrics to display on the chart
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{growthFactors.map((factor) => (
									<div key={factor.id} className="flex items-center space-x-3">
										<Checkbox
											id={factor.id}
											checked={factor.enabled}
											onCheckedChange={() => toggleFactor(factor.id)}
										/>
										<Label
											htmlFor={factor.id}
											className="flex items-center gap-2 cursor-pointer font-normal"
										>
											<div
												className="w-3 h-3 rounded-full"
												style={{ backgroundColor: factor.color }}
											/>
											{factor.label}
										</Label>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
