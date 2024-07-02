"use client";

import BankPage from "@/components/home/Bank/bankPage";
import ModelPage from "@/components/home/model/modelPage";
import BankHomeLoading from "@/components/loading/loadingHome/bank";
import ModelHomeLoading from "@/components/loading/loadingHome/model";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [models, setModels] = useState([]);
  const [loadingModel, setLoadingModel] = useState(true);
  const [loadingBank, setLoadingBank] = useState(true);

  const bank = [
    {
      name: "Bank 1",
      status: {
        INSTOCK: 122,
        INSTALLED: 31,
        INSTALLING: 10,
        REPARING: 30,
        DAMAGED: 50,
        LOST: 60,
        WAITREPAIR: 30,
      },
      image:
        "https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png",
    },
    {
      name: "Bank 2",
      status: {
        INSTOCK: 212,
        INSTALLED: 31,
        INSTALLING: 12,
        REPARING: 3,
        DAMAGED: 20,
        LOST: 30,
        WAITREPAIR: 10,
      },
      image:
        "https://seeklogo.com/images/S/siam-commercial-bank-logo-B9BB3E105F-seeklogo.com.png",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingModel(true);
        setLoadingBank(true);
        const res = await axios.get("/api/model/getModel");
        setModels(res.data.models);
      } catch (e) {
        console.log("Error fetching data: ", e);
      } finally {
        setLoadingModel(false);
        setLoadingBank(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center m-auto">
      {loadingBank ? <BankHomeLoading /> : <BankPage banks={bank} />}
      <div className="divider my-1">
        <p>
          <span className="text-xs">Welcome to digio inventory,{`\n\n`}</span>
          <span className="text-primary font-bold mobile:text-xl laptop:text-lg">
            Latthaphon
          </span>
        </p>
      </div>
      {loadingModel ? <ModelHomeLoading /> : <ModelPage models={models} />}
    </div>
  );
}
