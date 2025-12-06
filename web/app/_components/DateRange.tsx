"use client";

import { Input } from "@bluevoid-test/ui/input";
import { Label } from "@bluevoid-test/ui/label";

interface DateRangeSelectorProps {
	dateRange: { start: string; end: string };
	onChange: (range: { start: string; end: string }) => void;
}

export function DateRangeSelector({
	dateRange,
	onChange,
}: DateRangeSelectorProps) {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="start-date">Start Date</Label>
				<Input
					id="start-date"
					type="month"
					value={dateRange.start}
					onChange={(e) => onChange({ ...dateRange, start: e.target.value })}
					max={dateRange.end}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="end-date">End Date</Label>
				<Input
					id="end-date"
					type="month"
					value={dateRange.end}
					onChange={(e) => onChange({ ...dateRange, end: e.target.value })}
					min={dateRange.start}
				/>
			</div>
		</div>
	);
}
