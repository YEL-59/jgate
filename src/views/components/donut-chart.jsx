"use client";

import { useMemo } from "react";
import { ChartCard } from "./chart-card";
import { theme } from "@/config/theme.config";

export function DonutChart({ data }) {
  const { published, draft, closed, total } = data;
  const totalPercentage = published + draft + closed;
  const centerPercentage = Math.round((totalPercentage / total) * 100);

  const segments = useMemo(() => [
    { value: published, percentage: published, color: theme.colors.chart.purple, label: 'Published' },
    { value: draft, percentage: draft, color: theme.colors.chart.yellow, label: 'Draft' },
    { value: closed, percentage: closed, color: theme.colors.chart.blue, label: 'Closed' },
  ], [published, draft, closed]);

  const radius = 70;
  const centerX = 100;
  const centerY = 100;

  const createArc = (startAngle, endAngle) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // Calculate segment angles in a deterministic way
  const segmentPaths = useMemo(() => {
    let currentAngle = -90; // Start from top
    return segments.map((segment) => {
      const startAngle = currentAngle;
      const angle = (segment.percentage / totalPercentage) * 360;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      return { ...segment, startAngle, endAngle };
    });
  }, [segments, totalPercentage]);

  return (
    <ChartCard title="Project Status Distribution">
      <div className="flex flex-col items-center justify-center space-y-6 py-4">
        {/* Donut Chart */}
        <div className="relative w-64 h-64">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {segmentPaths.map((segment, idx) => (
              <path
                key={idx}
                d={createArc(segment.startAngle, segment.endAngle)}
                fill={segment.color}
                className="transition-all"
              />
            ))}
            {/* Inner circle to create donut effect */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius - 30}
              fill="white"
            />
          </svg>
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-4xl font-bold">{centerPercentage}%</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2 w-full">
          {segments.map((segment, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm font-medium">{segment.label}</span>
              </div>
              <span className="text-sm text-muted-foreground">{segment.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

