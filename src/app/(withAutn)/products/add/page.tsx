import InputForm from "@/components/productsForm/inputForm";
import InputFormm from "@/components/productsForm/inputFormm";
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

  return (
    <div>
      {/* <InputForm models={models} /> */}
      <InputFormm models={models} />
    </div>
  );
};

export default AddProductPage;
