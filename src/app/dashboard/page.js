"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "@/views/dashboard/components/metric-card";
import { GrowthChart } from "@/views/dashboard/components/growth-chart";
import { StatusDonutChart } from "@/views/dashboard/components/status-donut-chart";
import { dashboardController } from "@/controllers/dashboard.controller";

// Default data to prevent loading state issues
const defaultData = {
  metrics: {
    totalUsers: { value: 1247, change: 12.5, isPositive: true },
    totalProjects: { value: 216, change: 8.3, isPositive: true },
    totalScenes: { value: 3482, change: 15.7, isPositive: true },
    totalAuditions: { value: 8921, change: -2.4, isPositive: false },
  },
  growthData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Users', data: [1200, 1300, 1400, 1500, 1450, 1600], color: '#6D28D9' },
      { label: 'Projects', data: [180, 190, 200, 210, 205, 220], color: '#9333EA' },
    ],
  },
  statusData: {
    total: 100,
    percentages: { published: 50, draft: 20, closed: 15 },
  },
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    async function fetchData() {
      try {
        setLoading(true);
        const data = await dashboardController.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Keep default data on error
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [mounted]);

  const { metrics, growthData, statusData } = dashboardData || {};

  if (!dashboardData || !metrics || !growthData || !statusData) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center', color: '#666666' }}>
          <div style={{ fontSize: '18px' }}>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      padding: '0',
    }}>
      {/* Header */}
      <div>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginBottom: '8px',
          margin: 0,
        }}>
          Dashboard
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666666',
          margin: 0,
        }}>
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
        gap: '24px',
      }}>
        <MetricCard
          title="Total Users"
          value={metrics.totalUsers.value}
          change={metrics.totalUsers.change}
          icon="users"
          isPositive={metrics.totalUsers.isPositive}
        />
        <MetricCard
          title="Total Projects"
          value={metrics.totalProjects.value}
          change={metrics.totalProjects.change}
          icon="projects"
          isPositive={metrics.totalProjects.isPositive}
        />
        <MetricCard
          title="Total Scenes"
          value={metrics.totalScenes.value}
          change={metrics.totalScenes.change}
          icon="scenes"
          isPositive={metrics.totalScenes.isPositive}
        />
        <MetricCard
          title="Total Auditions"
          value={metrics.totalAuditions.value}
          change={metrics.totalAuditions.change}
          icon="auditions"
          isPositive={metrics.totalAuditions.isPositive}
        />
      </div>

      {/* Charts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: '24px',
      }}>
        <GrowthChart data={growthData} />
        <StatusDonutChart
          data={{
            published: statusData.percentages.published,
            draft: statusData.percentages.draft,
            closed: statusData.percentages.closed,
            total: statusData.total,
          }}
        />
      </div>
    </div>
  );
}
