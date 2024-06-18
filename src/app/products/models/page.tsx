"use client";

import FloatingActionButton from "@/components/floatingActionButton";
import ModelLoading from "@/components/loading/loadingModel/modelPage";
import Model from "@/components/model/modelPage";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Models() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/model/getModel");
        setModels(res.data.models);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
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
            {loading ? (
              <ModelLoading length={4} />
            ) : (
              <Model models={models} edit={false} />
            )}
          </div>
          <FloatingActionButton page="model" />
        </div>
      </div>
    </>
  );
}
