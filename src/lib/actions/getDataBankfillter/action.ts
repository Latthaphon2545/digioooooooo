import axios from "axios";

export const getDataBank = async () => {
  try {
    const res = await axios.get("/api/bank/getAllBank");
    return res.data.bank;
  } catch (err) {
    console.log(err);
    return [];
  }
};
