import axios from "axios";

interface ProductGetAll {
  filter: string;
  search: string;
  skip: string;
  take: string;
  setLoading: (loading: boolean) => void;
}

export const DetAllProduct = async ({
  filter,
  search,
  skip,
  take,
  setLoading,
}: ProductGetAll) => {
  try {
    const res = await axios.get(
      `/api/products/getProduct?filter=${filter}&search=${search}&skip=${skip}&take=${take}`
    );

    const products = res.data.products || [];
    const totalProducts = res.data.totalProducts || 0;
    return { products, totalProducts };
  } catch (err) {
    console.log(err);
    return { products: [], totalProducts: 0 };
  } finally {
    setLoading(false);
  }
};
