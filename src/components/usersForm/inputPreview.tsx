import { DataItem } from "@/lib/types";
import ProductPreview from "../productsForm/productPreview";
import UserInputPreview from "./userInputPreview";

type InputPreviewProps = {
  data: Array<DataItem>;
  headers: string[];
  model?: string[];
  uploading?: boolean;
};

export function InputPreview({
  data,
  headers,
  model,
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
      <div className="badge badge-primary badge-lg py-4 px-2 absolute top-2 right-2">
        {data.length}
      </div>
      <div className="">
        {headers[0] === "email" ? (
          <UserInputPreview data={data} />
        ) : (
          <ProductPreview data={data} model={model!} />
        )}
      </div>
    </div>
  );
}
