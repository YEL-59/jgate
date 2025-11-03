"use client";

import { Card } from "@/components/ui/card";
import { Users, Film, Video, Clapperboard, TrendingUp, TrendingDown } from "lucide-react";
import { theme } from "@/config/theme.config";

const iconMap = {
  users: Users,
  projects: Film,
  scenes: Video,
  auditions: Clapperboard,
};

export function MetricCard({ title, value, change, icon, isPositive }) {
  const Icon = iconMap[icon] || Users;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card 
      className="border-0 shadow-lg"
      style={{ 
        backgroundColor: theme.colors.dashboard.card.background,
        color: theme.colors.dashboard.card.foreground 
      }}
    >
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <Icon className="h-8 w-8" style={{ color: theme.colors.dashboard.card.foreground }} />
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold" style={{ color: theme.colors.dashboard.card.foreground }}>
            {value.toLocaleString()}
          </div>
          <div className="text-sm opacity-90" style={{ color: theme.colors.dashboard.card.foreground }}>
            {title}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              <TrendIcon 
                className="h-4 w-4" 
                style={{ 
                  color: isPositive ? theme.colors.chart.positive : theme.colors.chart.negative 
                }}
              />
              <span 
                className="text-sm font-medium"
                style={{ 
                  color: isPositive ? theme.colors.chart.positive : theme.colors.chart.negative 
                }}
              >
                {change >= 0 ? '+' : ''}{change}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

