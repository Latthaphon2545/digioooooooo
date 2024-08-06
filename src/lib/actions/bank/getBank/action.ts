import axios from "axios";

export const getBank = async ({ setLoading }: { setLoading: any }) => {
  try {
    const res = await axios.get("/api/bank/getBank");
    return res.data.bankStatus;
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
