"use client"
import ProjectsClient from "@/pages/dashboard/projectClient/projectClient";
import UserClient from "@/pages/dashboard/userClient/userClient";
import { useProject } from "@/services/dashboard/project";
import { useUser } from "@/services/dashboard/user";
import { CloudCog } from "lucide-react";
import { useEffect, useState } from "react";
import { PageLoader } from "@/components/ui/loading-spinner";

const ProjectPage = () => {
  const [data, setData] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDashboardproject = async () => {
      const token = localStorage.getItem("token");
      console.log("token", token)

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await useProject(token, currentPage);
        console.log("result", result)

        setData(result?.data?.data?.data || []);
        setPaginationInfo(result?.data?.data || null);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardproject();
  }, [currentPage]);
  console.log("projectatable data", data)
  if (loading) {
    return <PageLoader message="Fetching projects..." />;
  }

  return (
    <ProjectsClient 
      projects={data} 
      projectPagination={paginationInfo}
      onProjectPageChange={setCurrentPage}
      loading={loading} 
    />
  );
};

export default ProjectPage;
