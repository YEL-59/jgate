"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "@/views/dashboard/components/metric-card";
import { GrowthChart } from "@/views/dashboard/components/growth-chart";
import { SceneChallengeChart } from "@/views/dashboard/components/scene-challenge-chart";

const defaultData = {
  growthData: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Users",
        data: [1200, 1300, 1400, 1500, 1450, 1600, 1600, 1450, 1500, 1400, 1300, 1200],
        color: "#6D28D9",
      },
      {
        label: "Projects",
        data: [180, 190, 200, 210, 205, 220, 220, 205, 210, 200, 190, 180],
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
    totalUsers: dashboardData?.total_users ?? 0,
    totalProjects: dashboardData?.total_projects ?? 0,
    totalScenes: dashboardData?.total_scenes ?? 0,
    totalAuditions: dashboardData?.total_auditions ?? 0,
  };

  const userGrowth = dashboardData?.user_growth || [];
  const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const usersData = allMonths.map(month => {
    const found = userGrowth.find(item => item.month === month);
    return found ? found.users : 0;
  });

  const projectsData = allMonths.map(month => {
    const found = userGrowth.find(item => item.month === month);
    return found ? found.projects : 0;
  });

  const formattedGrowthData = {
    labels: allMonths,
    datasets: [
      {
        label: "Users",
        data: usersData,
        color: "#6D28D9",
      },
      {
        label: "Projects",
        data: projectsData,
        color: "#9333EA",
      },
    ],
  };

  const sceneChallengeGrowth = dashboardData?.scene_challenge_growth || [];
  const scenesData = allMonths.map(month => {
    const found = sceneChallengeGrowth.find(item => item.month === month);
    return found ? found.scene_uploads : 0;
  });

  const challengesData = allMonths.map(month => {
    const found = sceneChallengeGrowth.find(item => item.month === month);
    return found ? found.challenge_uploads : 0;
  });

  const formattedSceneData = {
    labels: allMonths,
    datasets: [
      {
        label: "Scenes",
        data: scenesData,
        color: "#F59E0B",
      },
      {
        label: "Challenges",
        data: challengesData,
        color: "#3B82F6",
      },
    ],
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GrowthChart data={formattedGrowthData} />
        <SceneChallengeChart data={formattedSceneData} />
      </div>
    </div>
  );
}
