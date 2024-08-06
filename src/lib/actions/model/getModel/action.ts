import axios from "axios";

export const getMedel = async ({
  setLoading,
}: {
  setLoading: (load: boolean) => void;
}) => {
  try {
    const res = await axios.get("/api/model/getModel");
    return res.data.models;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
