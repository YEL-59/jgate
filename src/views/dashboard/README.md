# Dashboard Components Structure

This folder contains all dashboard-specific components following MVC pattern.

## Folder Structure

```
src/views/dashboard/
└── components/
    ├── metric-card.jsx       # Metric card component (reusable)
    ├── growth-chart.jsx      # User & Project Growth bar chart
    └── status-donut-chart.jsx # Project Status Distribution donut chart
```

## Components

### MetricCard
Displays a single metric with:
- Icon
- Value (formatted with commas)
- Title
- Trend indicator (percentage change)

**Props:**
- `title`: Metric title
- `value`: Numeric value
- `change`: Percentage change
- `icon`: Icon type (users, projects, scenes, auditions)
- `isPositive`: Boolean for trend direction

### GrowthChart
Stacked bar chart showing User & Project Growth over time.

**Props:**
- `data`: Object with `labels` array and `datasets` array

### StatusDonutChart
Donut chart showing Project Status Distribution.

**Props:**
- `data`: Object with `published`, `draft`, `closed`, `total`

## Usage

```jsx
import { MetricCard } from "@/views/dashboard/components/metric-card";
import { GrowthChart } from "@/views/dashboard/components/growth-chart";
import { StatusDonutChart } from "@/views/dashboard/components/status-donut-chart";

// In your page component
<MetricCard
  title="Total Users"
  value={1247}
  change={12.5}
  icon="users"
  isPositive={true}
/>
```

