"use client"
import ProjectsClient from "@/pages/dashboard/projectClient/projectClient";
import UserClient from "@/pages/dashboard/userClient/userClient";
import { useProject } from "@/services/dashboard/project";
import { useUser } from "@/services/dashboard/user";
import { CloudCog } from "lucide-react";
import { useEffect, useState } from "react";

const ProjectPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboardproject = async () => {
      const token = localStorage.getItem("token");
      console.log("token", token)

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const result = await useProject(token);
        console.log("result", result)

        setData(result?.data.data.data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardproject();
  }, []);
  console.log("projectatable data", data)
  return (
    <ProjectsClient projects={data} loading={loading} />
  );
};

export default ProjectPage;
