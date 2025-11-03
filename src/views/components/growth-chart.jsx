"use client";

import { ChartCard } from "./chart-card";

export function GrowthChart({ data }) {
  const maxValue = Math.max(
    ...data.datasets.flatMap(d => d.data)
  );

  const getBarHeight = (value) => {
    return (value / maxValue) * 100;
  };

  return (
    <ChartCard title="User & Project Growth">
      <div className="h-64 space-y-4">
        {/* Legend */}
        <div className="flex justify-end gap-4 mb-4">
          {data.datasets.map((dataset, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: dataset.color }}
              />
              <span className="text-sm text-muted-foreground">{dataset.label}</span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="flex items-end justify-between h-48 gap-2">
          {data.labels.map((label, labelIdx) => (
            <div key={labelIdx} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full h-full flex items-end gap-1">
                {data.datasets.map((dataset, datasetIdx) => {
                  const height = getBarHeight(dataset.data[labelIdx]);
                  return (
                    <div
                      key={datasetIdx}
                      className="flex-1 rounded-t transition-all"
                      style={{
                        height: `${height}%`,
                        backgroundColor: dataset.color,
                        opacity: datasetIdx === 0 ? 0.9 : 0.7,
                      }}
                    />
                  );
                })}
              </div>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="flex justify-between text-xs text-muted-foreground px-1">
          <span>0</span>
          <span>1k</span>
          <span>2k</span>
          <span>3k</span>
        </div>
      </div>
    </ChartCard>
  );
}

