"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "@/views/dashboard/components/metric-card";
import { GrowthChart } from "@/views/dashboard/components/growth-chart";
import { StatusDonutChart } from "@/views/dashboard/components/status-donut-chart";

const defaultData = {
  growthData: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Users",
        data: [1200, 1300, 1400, 1500, 1450, 1600],
        color: "#6D28D9",
      },
      {
        label: "Projects",
        data: [180, 190, 200, 210, 205, 220],
        color: "#9333EA",
      },
    ],
  },
  statusData: {
    total: 100,
    percentages: { published: 50, draft: 20, closed: 15 },
  },
};

export default function DashboardClient({ data }) {
  // data = full API response
  const dashboardData = data;
  const normalizedData = {
    totalUsers: dashboardData?.["Total User"] ?? 0,
    totalProjects: dashboardData?.["Total Project"] ?? 0,
    totalScenes: dashboardData?.["Total Scene"] ?? 0,
    totalAuditions: dashboardData?.["Total Audition"] ?? 0,
  };

  const totalStats = 
    normalizedData.totalUsers + 
    normalizedData.totalProjects + 
    normalizedData.totalScenes + 
    normalizedData.totalAuditions;

  const getPercentage = (value) => {
    if (totalStats === 0) return 0;
    return Number(((value / totalStats) * 100).toFixed(1));
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={normalizedData.totalUsers}
          change={getPercentage(normalizedData.totalUsers)}
          icon="users"
          isPositive={true}
        />

        <MetricCard
          title="Total Projects"
          value={normalizedData.totalProjects}
          change={getPercentage(normalizedData.totalProjects)}
          icon="projects"
          isPositive={true}
        />

        <MetricCard
          title="Total Scenes"
          value={normalizedData.totalScenes}
          change={getPercentage(normalizedData.totalScenes)}
          icon="scenes"
          isPositive={true}
        />

        <MetricCard
          title="Total Auditions"
          value={normalizedData.totalAuditions}
          change={getPercentage(normalizedData.totalAuditions)}
          icon="auditions"
          isPositive={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GrowthChart data={defaultData.growthData} />

        <StatusDonutChart
          data={{
            published: defaultData.statusData.percentages.published,
            draft: defaultData.statusData.percentages.draft,
            closed: defaultData.statusData.percentages.closed,
            total: defaultData.statusData.total,
          }}
        />
      </div>
    </div>
  );
}
