import axios from "axios";

export const FindProductWhenChangeStatus = async ({
  code,
  setLoading,
  setFindingProduct,
  setMessage,
  setNextStep,
  setCode,
}: {
  code: string;
  setLoading: (value: boolean) => void;
  setFindingProduct: (value: boolean) => void;
  setMessage: (value: string) => void;
  setNextStep: (value: boolean) => void;
  setCode: (value: string) => void;
}) => {
  try {
    setLoading(true);
    setFindingProduct(true);
    const res = await axios.get(
      `/api/products/getProduct/findProduct?sn=${code}`
    );
    if (res.status === 200) {
      setMessage("Click next to continue");
      setFindingProduct(true);
    }
  } catch (error: any) {
    setMessage(error.response.data.error);
    setFindingProduct(false);
  } finally {
    setTimeout(() => {
      setNextStep(true);
      setCode(code);
      setLoading(false);
    }, 1000);
  }
};
