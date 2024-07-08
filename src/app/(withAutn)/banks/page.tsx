"use client";

import BankPage from "@/components/bank/bankPage";
import FloatingActionButton from "@/components/floatingActionButton";
import LoadingBankPage from "@/components/loading/loadingBank/BankPage";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bankRes = await axios.get("/api/bank/getBank");
        setBanks(bankRes.data.bankStatus);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? <LoadingBankPage /> : <BankPage banks={banks} />}
      <FloatingActionButton page="bank" />
    </div>
  );
}
