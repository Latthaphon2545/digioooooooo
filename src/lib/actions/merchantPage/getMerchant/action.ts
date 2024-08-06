import axios from "axios";

export const GetMerchant = async (
  search: string,
  skip: string,
  take: string,
  setLoading: (loading: boolean) => void
) => {
  try {
    const res = await axios.get(
      `/api/merchants/getMerchant?search=${search}&skip=${skip}&take=${take}`
    );
    const data = res.data;
    const merchant = data.merchant;
    const totalMerchant = data.totalMerchant;
    return { merchant, totalMerchant };
  } catch (err) {
    console.log(err);
    return { merchant: [], totalMerchant: 0 };
  } finally {
    setLoading(false);
  }
};
