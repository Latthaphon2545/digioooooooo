"use client";

import BankPage from "@/components/bank/bankPage";
import FloatingActionButton from "@/components/floatingActionButton";
import LoadingBankPage from "@/components/loading/loadingBank/BankPage";
import { getBank } from "@/lib/actions/bank/getBank/action";
import { useEditor } from "@/lib/context/EditorProvider";
import { useEffect, useState } from "react";

export default function Page() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  const isEditor = useEditor();

  useEffect(() => {
    const fetchData = async () => {
      const bankRes = await getBank({ setLoading });
      setBanks(bankRes);
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? <LoadingBankPage /> : <BankPage banks={banks} />}
      {isEditor && <FloatingActionButton page="bank" />}
    </div>
  );
}
