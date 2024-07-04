import { ConvertTime } from "@/components/dateTime";
import { stringToHex } from "@/lib/generateRandomHref";
import Link from "next/link";
import React from "react";
import { ColorProductStatus } from "../../color";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import ViewImg from "../../historyProduct/view/historyProductViewImg";

interface UserHistoryMobileViewProps {
  item: any;
  isEditor: boolean;
  isEditing: { [key: string]: boolean };
  setIsEditing: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  handleUpdateUserHistory: (
    id: string,
    history: { description: string; category: string; imageProves: File[] },
    imageToDelete: string[]
  ) => Promise<void>;
}

export default function UserHistoryMobileView({
  item,
  isEditor,
  isEditing,
  setIsEditing,
  handleUpdateUserHistory,
}: UserHistoryMobileViewProps) {
  const { formattedDate } = ConvertTime(item.createdAt);
  return (
    <div key={item.id} className="mt-3 card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <div className="card-actions flex justify-end">Edit</div>
        <div className="card-title flex justify-between">
          <Link
            href={`/products/history/${stringToHex(
              item.product.serialNumber
            )}?skip=0&take=7`}
            className="link link-primary"
          >
            {item.product.serialNumber.slice(0, 6) + "XXXX"}
          </Link>
          <div>
            <h2 className="text-sm">{formattedDate}</h2>
          </div>
        </div>
        <p>{item.description}</p>
        <div className="flex justify-between">
          <div
            className={`badge badge-${ColorProductStatus(
              ConvertStatus(item.category)
            )} badge-outline badge-md`}
          >
            <p>{ConvertStatus(item.category)}</p>
          </div>
          <ViewImg id={item.id} image={item.imageProve} />
        </div>
      </div>
    </div>
  );
}
