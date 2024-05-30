"use client";

import ActionButton from "@/components/actionButton";
import Model from "@/components/model/modelPage";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbDeviceMobilePlus } from "react-icons/tb";

export default function Models() {
  const router = useRouter();
  const [models, setModels] = useState([]);
  const [isEditor, setIseditor] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/model/getModel");
      setModels(res.data.model);
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-row min-h-screen">
          <div className="flex flex-col w-full relative">
            <div className="flex justify-between items-center mx-5 mt-5 mb-1 h-14">
              <h1 className="text-3xl font-bold">Model</h1>
              <div className={`${isEditor ? "" : "cursor-not-allowed"}`}>
                <ActionButton
                  action={() => {
                    router.push("/products/models/add");
                  }}
                  styles={`btn-primary`}
                  disabled={!isEditor}
                >
                  Add Model
                </ActionButton>
              </div>
            </div>
            <Model models={models} />
          </div>
        </div>
      </div>
    </>
  );
}
