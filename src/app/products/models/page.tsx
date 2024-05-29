"use client";

import Model from "@/components/model/modelPage";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Models() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/model/getModel");
      setModels(res.data.model);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-row max-h-screen">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mx-5">
            <h1 className="text-3xl font-bold mt-5 mb-1">Models</h1>
          </div>
          <div className="flex flex-wrap justify-center overflow-y-auto w-full h-full">
            <Model models={models} />
          </div>
        </div>
      </div>
    </>
  );
}
