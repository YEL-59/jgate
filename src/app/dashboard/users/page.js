"use client"
import UserClient from "@/pages/dashboard/userClient/userClient";
import { useUser } from "@/services/dashboard/user";
import { CloudCog } from "lucide-react";
import { useEffect, useState } from "react";

const userPage = () => {
  const [data, setData] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDashboarduser = async () => {
      const token = localStorage.getItem("token");
      console.log("token", token)

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const result = await useUser(token, currentPage);
        console.log("result", result)

        setData(result?.data?.data?.data || []);
        setPaginationInfo(result?.data?.data || null);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboarduser();
  }, [currentPage]);
  console.log("useratable data", data)
  return (
    <UserClient 
      users={data} 
      pagination={paginationInfo} 
      onPageChange={setCurrentPage} 
      loading={loading} 
    />
  );
};

export default userPage;
