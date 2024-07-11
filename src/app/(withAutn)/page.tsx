"use client";

import BankPage from "@/components/home/Bank/bankPage";
import ModelPage from "@/components/home/model/modelPage";
import BankHomeLoading from "@/components/loading/loadingHome/bank";
import ModelHomeLoading from "@/components/loading/loadingHome/model";
import { getDataHome } from "@/lib/actions/getDataHome/action";
import { useEffect, useState } from "react";

const Name = "Latthaphon";

export default function Home() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bank, setBank] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDataHome({ setLoading });
      setModels(res.models);
      setBank(res.bankStatus);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center m-auto">
      {loading ? <BankHomeLoading /> : <BankPage banks={bank} />}
      <div className="divider my-1">
        <p>
          <span className="text-xs">Welcome to digio inventory,{`\n\n`}</span>
          <span className="text-primary font-bold mobile:text-xl laptop:text-lg">
            {Name}
          </span>
        </p>
      </div>
      {loading ? <ModelHomeLoading /> : <ModelPage models={models} />}
    </div>
  );
}
