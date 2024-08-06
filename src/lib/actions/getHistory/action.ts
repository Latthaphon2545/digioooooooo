import { hexToString } from "@/lib/generateRandomHref";
import axios from "axios";

export const GetHistory = async ({
  slug,
  skip,
  take,
}: {
  slug: string;
  skip: number;
  take: number;
}) => {
  try {
    const res = await axios.get(
      `/api/products/getHistory?sn=${hexToString(
        slug
      )}&skip=${skip}&take=${take}`
    );

    const data = res.data;
    const dataCustomer = data.product;
    const history = data.productsHistory;
    const lengthHistory = data.lengthHistory;

    return { dataCustomer, history, lengthHistory };
  } catch (error) {
    console.log(error);
    return { dataCustomer: [], history: [], lengthHistory: 0 };
  } finally {
  }
};
