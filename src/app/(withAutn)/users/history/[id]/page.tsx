"use client";
import TablePageLoading from "@/components/loading/loadingTable/tablePage";
import UserHistory from "@/components/table/userHistory/userHistory";
import { decode } from "@/lib/generateRandomHref";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function GetHistory({ params }: { params: { id: string } }) {
  const [userHistory, setUserHistory] = useState([]);
  const [totalHistory, setTotalHistory] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const path = useSearchParams();
  const { skip, take } = decode(path.toString());
  console.log("skip", skip);
  console.log("take", take);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/getUserHistory/${params.id}?skip=${skip}&take=${take}`
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
  }, [skip, take]);

  return (
    <>
      <div className="h-full px-4">
        {loading ? (
          <div>
            <div className="font-bold text-3xl pt-4 pl-4 mb-20">
              Halo Halo Good Good Good
            </div>
            <TablePageLoading Type="User_History" length={7} />
          </div>
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
