import InputForm from "@/components/productsForm/inputForm";
import axios from "axios";

const getAllModel = async () => {
  const res = await axios.get("http://localhost:3000/api/model/getModel");
  return res.data;
};

const AddProductPage = async () => {
  const models = await getAllModel();
  return (
    <div>
      <InputForm models={models.model} />
    </div>
  );
};

export default AddProductPage;
