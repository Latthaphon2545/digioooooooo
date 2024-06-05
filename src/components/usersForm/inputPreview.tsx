import { DataItem, Model } from "@/lib/types";
import ProductPreview from "../productsForm/productPreview";
import UserInputPreview from "./userInputPreview";

type InputPreviewProps = {
  data: Array<DataItem>;
  headers: string[];
  modelNames?: string[];
  uploading?: boolean;
};

export function InputPreview({
  data,
  headers,
  modelNames,
  uploading,
}: InputPreviewProps) {
  if (data.length === 0 && !uploading) {
    return (
      <div className="flex items-center justify-center min-h-[30rem] max-h-[30rem]">
        <p className="text-xl font-semibold text-center">Preview List</p>
      </div>
    );
  }

  return (
    <div className="relative ">
      <div className="">
        {headers[0] === "email" ? (
          <UserInputPreview data={data} />
        ) : (
          <ProductPreview data={data} modelNames={modelNames!} />
        )}
      </div>
    </div>
  );
}
