"use client"
import UserClient from "@/pages/dashboard/userClient/userClient";
import { useUser } from "@/services/dashboard/user";
import { CloudCog } from "lucide-react";
import { useEffect, useState } from "react";

const userPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboarduser = async () => {
      const token = localStorage.getItem("token");
      console.log("token", token)

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const result = await useUser(token);
        console.log("result", result)

        setData(result?.data.data.data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboarduser();
  }, []);
  console.log("useratable data", data)
  return (
    <UserClient users={data} loading={loading} />
  );
};

export default userPage;
