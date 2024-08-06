"use client";

import Container from "@/components/container/containerTable";
import FloatingActionButton from "@/components/floatingActionButton";
import ModelLoading from "@/components/loading/loadingModel/modelPage";
import Model from "@/components/model/modelPage";
import { getMedel } from "@/lib/actions/model/getModel/action";
import { useEffect, useState } from "react";

const isEditor = false;

export default function Models() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMedel({ setLoading });
      setModels(res);
    };
    fetchData();
  }, []);

  return (
    <>
      <Container
        isEditor={isEditor}
        title="Models"
        Loading={loading}
        LoadingChild={<ModelLoading />}
        Child={<Model models={models} isEditor={isEditor} />}
        NavigatorBtn=""
        textBtn={null}
        AlertDialog={null}
        FloatingActionButton={<FloatingActionButton page="model" />}
      />
    </>
  );
}
