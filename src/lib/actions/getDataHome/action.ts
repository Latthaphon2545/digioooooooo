import axios from "axios";

export const getDataHome = async ({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) => {
  try {
    setLoading(true);
    const resModels = await axios.get("/api/model/getModel");
    const resBank = await axios.get("/api/bank/home");

    const res = {
      models: resModels.data.models,
      bankStatus: resBank.data.bankStatus,
    };
    return res;
  } catch (e) {
    console.log("Error fetching data: ", e);
    return { models: [], bankStatus: [] };
  } finally {
    setLoading(false);
  }
};
