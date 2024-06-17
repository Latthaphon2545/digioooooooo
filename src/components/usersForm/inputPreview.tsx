import { DataItem, Model } from "@/lib/types";
import ProductPreview from "../productsForm/productPreview";
import UserInputPreview from "./userInputPreview";
import MerchantInputPreview from "../merchantForm/merchantInputPreview";

type InputPreviewProps = {
  data: Array<DataItem>;
  page: string;
  modelNames?: string[];
  uploading?: boolean;
};

export function InputPreview({
  data,
  page,
  modelNames,
  uploading,
}: InputPreviewProps) {
  if (data.length === 0 && !uploading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl font-semibold text-center">Preview List</p>
      </div>
    );
  }

  return (
    <div className="relative ">
      <div className="">
        {page === "user" ? (
          <UserInputPreview data={data} />
        ) : page === "product" ? (
          <ProductPreview data={data} modelNames={modelNames!} />
        ) : (
          <MerchantInputPreview data={data} />
        )}
      </div>
    </div>
  );
}
