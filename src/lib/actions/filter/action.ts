import axios from "axios";

interface ICategory {
  setCategory: (category: any) => void;
  CATEGORIES: (option: string, updatedSeries: any) => any;
}

export const getProductCategories = async ({
  setCategory,
  CATEGORIES,
}: ICategory) => {
  try {
    const res = await axios.get("/api/model/getNameAndIdModel");
    setCategory(CATEGORIES("Product", res.data.seriesModel));
  } catch (e: any) {
    console.log(e);
  }
};
