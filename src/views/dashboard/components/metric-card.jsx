"use client";

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
    <div
      style={{
        backgroundColor: theme.colors.dashboard.card.background,
        borderRadius: '12px',
        padding: '24px',
        color: theme.colors.dashboard.card.foreground,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Icon and Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Icon size={32} style={{ color: theme.colors.dashboard.card.foreground }} />
      </div>

      {/* Value and Label */}
      <div>
        <div
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: theme.colors.dashboard.card.foreground,
          }}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div
          style={{
            fontSize: '14px',
            opacity: 0.9,
            color: theme.colors.dashboard.card.foreground,
          }}
        >
          {title}
        </div>
      </div>

      {/* Trend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
        <TrendIcon
          size={16}
          style={{
            color: isPositive ? theme.colors.chart.positive : theme.colors.chart.negative,
          }}
        />
        <span
          style={{
            fontSize: '14px',
            fontWeight: '600',
            color: isPositive ? theme.colors.chart.positive : theme.colors.chart.negative,
          }}
        >
          {change >= 0 ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
}

