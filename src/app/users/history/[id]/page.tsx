"use client";
import UserHistory from "@/components/table/userHistory/userHistory";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function GetHistory({ params }: { params: { id: string } }) {
  const [userHistory, setUserHistory] = useState([]);
  const [totalHistory, setTotalHistory] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const path = useSearchParams();
  const filter = path.get("filter") || "";
  const search = path.get("search") || "";
  const skip = path.get("skip") || "";
  const take = path.get("take") || "";

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/getUserHistory/${params.id}?search=${search}&skip=${skip}&take=${take}`
        );

        const data = res.data;
        console.log(data);

        setUserHistory(data.userHistory);
        setTotalHistory(data.totalHistory);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getHistory();
  }, [filter, search, skip, take]);

  return (
    <>
      <div className="h-full">
        {loading ? (
          <div>Loading Noi</div>
        ) : (
          <UserHistory
            history={userHistory}
            editor={true}
            totalHistory={totalHistory}
          />
        )}
      </div>
    </>
  );
}
