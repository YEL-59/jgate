"use client"
import DashboardClient from "@/pages/dashboard/dashboardClient/dashboardHome"
import { useDashboard } from "@/services/dashboard/dashboard"
import { PageLoader } from "@/components/ui/loading-spinner";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const result = await useDashboard(token);

        setData(result?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <PageLoader message="Loading dashboard overview..." />;
  }

  return (
    <DashboardClient data={data} />
  );
};

export default DashboardPage
