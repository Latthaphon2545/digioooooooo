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
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mx-5 mt-5 h-14 mobile:hidden laptop:flex">
            <h1 className="text-3xl font-bold mt-5 mb-1">Models</h1>
          </div>
          <div>
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
