import InputForm from "@/components/productsForm/inputForm";
import axios from "axios";

const getAllModel = async () => {
  const res = await axios.get(
    "http://localhost:3000/api/model/getNameAndIdModel"
  );

  return res.data;
};

const AddProductPage = async () => {
  const data = await getAllModel();
  const models = data.seriesModel.map((series: string, index: string) => ({
    id: data.idModel[index],
    series,
  }));
  console.log(models);

  return (
    <div>
      <InputForm models={models} />
    </div>
  );
};

export default AddProductPage;
